import type firebase from 'firebase';
import type Peer from 'simple-peer';
declare const SimplePeer: Peer.SimplePeer;

import { createContainer } from 'unstated-preact';
import { useState } from 'preact/hooks';
import { useAuth } from '../auth';
import { useChat } from './chat';

import randomRoomId from '@logic/randomRoomId';
import randomGhost from '@logic/randomGhost';
import importScript from '@logic/importScript';
import debounce from '@logic/debounce';

const simplepeer$ = importScript('simplepeer.min.js');
const firebase$database = import('@logic/firebase/database');

type Reference = firebase.database.Reference;
type Query = firebase.database.Query;
type DataSnapshot = firebase.database.DataSnapshot;
type UserData = { displayName: string; index: number };
type RoomData = { [uid: string]: UserData };

const buffer = new TextDecoder();

function alertBeforeUnload(bool: boolean) {
  window.onbeforeunload = bool ? () => 'Are you sure you want to leave this room?' : () => {};
}

function useRefSubscribe<T>(eventType: firebase.database.EventType) {
  const [data, setData] = useState<T>(null);

  type UnsubscribeRef = () => void;
  function subscribeRef(ref: Reference | Query): UnsubscribeRef {
    function handleUpdate(snap: DataSnapshot) {
      setData(snap.val() as T);
    }

    ref.on(eventType, handleUpdate); // subscribes to db

    return function unsubscribe() {
      ref.off(eventType, handleUpdate);
      setData(null);
    };
  }

  return [data, subscribeRef] as [typeof data, typeof subscribeRef];
}

type MsgType = 'ok' | 'chat';
function usePeer(handlers: { [msgType in MsgType]?: (any: any) => any }) {
  const { user } = useAuth();
  const [peers, setPeers] = useState<{ [uid: string]: Peer.Instance }>({});

  function __setupPeer(uid: string, opts?: Peer.Options) {
    const peer = new SimplePeer(opts);

    peer.on('connect', function () {
      setPeers(peers => ({ ...peers, [uid]: peer }));

      peer.on('data', function (textBuffer) {
        const data = JSON.parse(buffer.decode(textBuffer));
        const fn = handlers[data.type];
        if (fn) fn(data);
      });
    });

    peer.on('close', function () {
      setPeers(peers => (delete peers[uid], peers));
      peer.removeAllListeners().destroy();
    });

    peer.on('error', err => console.error('err', err));

    return peer;
  }

  const sendPeerOffer = (room: Reference) =>
    async function (snap: DataSnapshot) {
      await simplepeer$;
      const peer = __setupPeer(snap.key, { initiator: true });

      // send offers
      const offers = [] as Peer.SignalData[];
      const sendOffers = debounce(d => snap.ref.child('peer/offers').update(d), 500);

      peer.on('signal', function (s) {
        offers.push(s);
        sendOffers({ [user.uid]: JSON.stringify(offers) });
      });

      // wait for answer to offer
      const answers = JSON.parse(
        await new Promise(function (res) {
          const __ans = room.child(`${user.uid}/peer/answers/${snap.key}`);

          __ans.on('value', function handleAnswer(snap) {
            if (!snap.exists()) return;

            __ans.off('value', handleAnswer);
            res(snap.val());
          });
        }),
      ) as Peer.SignalData[];

      answers.forEach(s => peer.signal(s));
    };

  const makeHandlePeerOffers = (room: Reference) =>
    async function (snap: DataSnapshot) {
      await simplepeer$;
      const peer = __setupPeer(snap.key);

      // send answers
      const answers = [] as Peer.SignalData[];
      const sendAnswers = debounce(d => room.child(`${snap.key}/peer/answers`).update(d), 500);

      peer.on('signal', function (s) {
        answers.push(s);
        sendAnswers({ [user.uid]: JSON.stringify(answers) });
      });

      // accept offers
      const signals = JSON.parse(snap.val()) as Peer.SignalData[];
      signals.forEach(s => peer.signal(s));
    };

  function messagePeers(msg: { type: MsgType; data: any }) {
    Object.values(peers).forEach(peer => peer.send(JSON.stringify({ ...msg, uid: user.uid })));
  }

  return {
    sendPeerOffer,
    makeHandlePeerOffers,
    messagePeers,
  };
}

function useRoom() {
  const { user$ } = useAuth();
  const [roomData, roomSubscribe] = useRefSubscribe<RoomData>('value');
  const [[roomId, leaveRoom], setLeaveRoom] = useState<[string, () => void]>([null, null]);

  const { chats, onIncomingChat } = useChat();
  const { sendPeerOffer, makeHandlePeerOffers, messagePeers } = usePeer({ chat: onIncomingChat });

  async function joinRoom(roomId: string) {
    const { db } = await firebase$database;
    const roomRef = db.ref(`room/${roomId}`);
    const room = await roomRef.once('value');

    // throw if room does not exist
    if (!room.exists()) throw new Error(`room ${roomId} does not exist`);

    const roomData = room.val() as RoomData;
    let { uid, displayName } = await user$;

    // throw if player is already in the room
    if (roomData[uid]) throw new Error(`player already in room ${roomId}`);

    displayName = displayName ?? randomGhost();
    const index = Math.max(...Object.values(roomData).map(u => u.index)) + 1;

    await __joinRoomDangerously(roomRef, { displayName, index });

    //@ts-ignore
    room.forEach(sendPeerOffer(roomRef));
  }

  async function createRoom() {
    const roomId = randomRoomId();

    const { db } = await firebase$database;
    const roomRef = db.ref(`room/${roomId}`);
    const room = await roomRef.once('value');

    // check if room already exists
    // if exists restart function
    if (!room.exists()) {
      let { uid, displayName } = await user$;
      displayName = displayName ?? randomGhost();

      await __joinRoomDangerously(roomRef, { displayName, index: 0 });

      return roomId;
    } else return await createRoom();
  }

  async function __joinRoomDangerously(roomRef: Reference, userData: UserData) {
    const { uid } = await user$;

    roomRef.child(uid).onDisconnect().remove(); // leave room on interrupt
    await roomRef.child(uid).set(userData); // adds player to db

    const unsub = roomSubscribe(roomRef.orderByChild('index'));

    alertBeforeUnload(true);

    // listen to signals of peer connections
    const handlePeerOffers = makeHandlePeerOffers(roomRef);
    roomRef.child(`${uid}/peer/offers`).on('child_added', handlePeerOffers);

    // creates a leaveRoom for clean up
    setLeaveRoom([
      roomRef.key,
      function leaveRoom() {
        roomRef.child(`${uid}/peer/offers`).off('child_added', handlePeerOffers);
        unsub();
        roomRef.child(uid).remove(); // removes player data in db
        alertBeforeUnload(false);
        setLeaveRoom([null, null]);
      },
    ]);
  }

  return {
    joinRoom,
    createRoom,

    room: roomData
      ? {
          data: roomData,
          id: roomId,
          leave: leaveRoom,

          chat: {
            data: chats,
            send(text: string) {
              return messagePeers({ type: 'chat', data: text });
            },
          },
        }
      : null,
  };
}

const { Provider, useContainer } = createContainer(useRoom);
export { Provider as RoomProvider, useContainer as useRoom };

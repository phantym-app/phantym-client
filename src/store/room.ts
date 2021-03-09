import { createContainer } from 'unstated-preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useAuth } from './auth';
import randomRoomId from '@logic/randomRoomId';
import randomGhost from '@logic/randomGhost';
const firebase$database = import('@logic/firebase/database');

// declare const Peer;
// const peerjs$ = importScript('https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js');

import type firebase from 'firebase';
type Reference = firebase.database.Reference;
type DataSnapshot = firebase.database.DataSnapshot;
type RoomData = { [uid: string]: { displayName: string } };

function alertBeforeUnload(bool = true) {
  window.onbeforeunload = bool ? () => 'Are you sure you want to leave this room?' : () => {};
}

function useRoom() {
  const { user$ } = useAuth();
  const [roomRef, setRoomRef] = useState<null | Reference>(null);
  const [playerRef, setPlayerRef] = useState<null | Reference>(null);
  const [roomData, setRoomData] = useState<RoomData>({});

  const onRoomUpdate = useCallback((snap: DataSnapshot) => setRoomData(snap.val()), []);

  async function __joinRoomForcefully(__roomRef: Reference, index: number) {
    let { uid, displayName } = await user$;
    displayName = displayName ?? randomGhost();

    const __playerRef = __roomRef.child(uid);

    // adds player to db
    __playerRef.onDisconnect().remove();
    await __playerRef.set({ displayName, index });
    setPlayerRef(__playerRef);

    // subscribes to db
    __roomRef.orderByChild('index').on('value', onRoomUpdate);
    setRoomRef(__roomRef);

    alertBeforeUnload();
  }

  async function tryJoinRoom(roomId: string) {
    const { db } = await firebase$database;
    const __roomRef = db.ref(`room/${roomId}`);
    const room = await new Promise<DataSnapshot>(res => __roomRef.once('value', res));

    // throw if room does not exist
    if (!room.exists()) throw new Error(`room ${roomId} does not exist`);

    const roomData = room.val();
    const { uid } = await user$;

    // throw if player is already in the room
    if (roomData[uid]) throw new Error(`player already in room ${roomId}`);

    return await __joinRoomForcefully(__roomRef, Object.values(roomData).length);
  }

  async function createRoom() {
    const roomId = randomRoomId();

    const { db } = await firebase$database;
    const __roomRef = db.ref(`room/${roomId}`);
    const room = await new Promise<DataSnapshot>(res => __roomRef.once('value', res));

    // check if room already exists, if exists restart function
    if (room.exists()) return await createRoom();
    else await __joinRoomForcefully(__roomRef, 0);

    return roomId;
  }

  async function leaveRoom() {
    // unsubscribes from the db
    roomRef.orderByChild('index').off('value', onRoomUpdate);
    setRoomRef(null);

    // removes player data in db
    await playerRef.remove();
    setPlayerRef(null);

    alertBeforeUnload(false);
  }

  return {
    inRoom: !!roomRef,
    roomData,

    tryJoinRoom,
    createRoom,
    leaveRoom,
  };
}

const { Provider, useContainer } = createContainer(useRoom);
export { Provider as RoomProvider, useContainer as useRoom };

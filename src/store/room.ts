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
type RoomData = {
  [uid: string]: {
    displayName: string;
    index: number;
  };
};

function alertBeforeUnload(bool: boolean) {
  window.onbeforeunload = bool ? () => 'Are you sure you want to leave this room?' : () => {};
}

function useRoom() {
  const { user$ } = useAuth();
  const [roomData, setRoomData] = useState<RoomData>({});
  const [leaveRoom, setLeaveRoom] = useState<() => any>(null);

  const onRoomUpdate = useCallback((snap: DataSnapshot) => setRoomData(snap.val()), []);

  async function joinRoom(roomId: string) {
    const { db } = await firebase$database;
    const roomRef = db.ref(`room/${roomId}`);
    const room = await new Promise<DataSnapshot>(res => roomRef.once('value', res));

    // throw if room does not exist
    if (!room.exists()) throw new Error(`room ${roomId} does not exist`);

    const roomData = room.val();
    const { uid } = await user$;

    // throw if player is already in the room
    if (roomData[uid]) throw new Error(`player already in room ${roomId}`);

    return await __joinRoomForcefully(roomRef, Object.values(roomData).length);
  }

  async function createRoom() {
    const roomId = randomRoomId();

    const { db } = await firebase$database;
    const roomRef = db.ref(`room/${roomId}`);
    const room = await new Promise<DataSnapshot>(res => roomRef.once('value', res));

    // check if room already exists, if exists restart function
    if (room.exists()) return await createRoom();
    else await __joinRoomForcefully(roomRef);

    return roomId;
  }

  async function __joinRoomForcefully(roomRef: Reference, index = 0) {
    let { uid, displayName } = await user$;
    displayName = displayName ?? randomGhost();

    const playerRef = roomRef.child(uid);

    playerRef.onDisconnect().remove();
    await playerRef.set({ displayName, index }); // adds player to db

    roomRef.orderByChild('index').on('value', onRoomUpdate); // subscribes to db

    alertBeforeUnload(true);

    // creates a leaveRoom for clean up
    setLeaveRoom(
      () =>
        function leaveRoom() {
          roomRef.orderByChild('index').off('value', onRoomUpdate); // unsubscribes from the db
          playerRef.remove(); // removes player data in db

          alertBeforeUnload(false);

          setLeaveRoom(null);
        },
    );
  }

  return {
    inRoom: !!leaveRoom,
    roomData,

    joinRoom,
    createRoom,
    leaveRoom,
  };
}

const { Provider, useContainer } = createContainer(useRoom);
export { Provider as RoomProvider, useContainer as useRoom };

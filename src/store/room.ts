import { createContainer } from 'unstated-preact';
import { useEffect, useState } from 'preact/hooks';
import { useAuth } from './auth';
import randomRoomId from '@logic/randomRoomId';
import randomGhost from '@logic/randomGhost';
const firebase$database = import('@logic/firebase/database');

import type firebase from 'firebase';
type Reference = firebase.database.Reference;
type DataSnapshot = firebase.database.DataSnapshot;
type UserData = { displayName: string; index: number };
type RoomData = { [uid: string]: UserData };

function alertBeforeUnload(bool: boolean) {
  window.onbeforeunload = bool ? () => 'Are you sure you want to leave this room?' : () => {};
}

function useRoom() {
  const { user$ } = useAuth();
  const [roomData, setRoomData] = useState<RoomData>({});
  const [leaveRoom, setLeaveRoom] = useState<() => any>(null);

  async function joinRoom(roomId: string) {
    const { db } = await firebase$database;
    const roomRef = db.ref(`room/${roomId}`);
    const room = await new Promise<DataSnapshot>(res => roomRef.once('value', res));

    // throw if room does not exist
    if (!room.exists()) throw new Error(`room ${roomId} does not exist`);

    const roomData = room.val();
    let { uid, displayName } = await user$;

    // throw if player is already in the room
    if (roomData[uid]) throw new Error(`player already in room ${roomId}`);

    displayName = displayName ?? randomGhost();
    const index = Object.values(roomData).length;

    return await __joinRoomDangerously(roomRef.child(uid), { displayName, index });
  }

  async function createRoom() {
    const roomId = randomRoomId();

    const { db } = await firebase$database;
    const roomRef = db.ref(`room/${roomId}`);
    const room = await new Promise<DataSnapshot>(res => roomRef.once('value', res));

    // check if room already exists
    if (room.exists()) {
      //  if exists restart function
      return await createRoom();
    } else {
      let { uid, displayName } = await user$;
      displayName = displayName ?? randomGhost();
      const index = Object.values(roomData).length;

      await __joinRoomDangerously(roomRef.child(uid), { displayName, index });

      return roomId;
    }
  }

  async function __joinRoomDangerously(playerRef: Reference, userData: UserData) {
    const roomRef = playerRef.parent.orderByChild('index');

    function handleRoomChange(snap: DataSnapshot) {
      setRoomData(snap.val() as RoomData);
    }

    // leave room on interrupt
    playerRef.onDisconnect().remove();

    await playerRef.set(userData); // adds player to db
    roomRef.on('value', handleRoomChange); // subscribes to db
    alertBeforeUnload(true);

    // creates a leaveRoom for clean up
    setLeaveRoom(
      () =>
        function leaveRoom() {
          roomRef.off('value', handleRoomChange); // unsubscribes from the db
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

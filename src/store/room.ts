import { createContainer } from 'unstated-next';
import { useCallback, useState } from 'preact/hooks';
import { useAuth } from '@store/auth';
import { db } from '@logic/firebase/database';
import randomRoomId from '@logic/randomRoomId';
import randomGhost from '@logic/randomGhost';

import type firebase from 'firebase';
type Reference = firebase.database.Reference;
type DataSnapshot = firebase.database.DataSnapshot;
type RoomData = { [uid: string]: { displayName: string } };

async function refExists(__ref: Reference) {
  return (await __ref.once('value')).exists();
}

const room = id => db.ref('room').child(id);

function useRoom() {
  const { userPromise } = useAuth();
  const [roomRef, setRoomRef] = useState<null | Reference>(null);
  const [roomData, setRoomData] = useState<RoomData>({});
  const [playerRef, setPlayerRef] = useState<null | Reference>(null);

  const onRoomUpdate = useCallback((snap: DataSnapshot) => setRoomData(snap.val()), []);

  async function setRoom(__roomRef: null | Reference) {
    switch (__roomRef) {
      case null:
        // unsubscribes from the db
        roomRef.orderByChild('index').startAt(0).off('value', onRoomUpdate);
        setRoomRef(null);

        // removes player data in db
        await playerRef.remove();
        setPlayerRef(null);

        // removes alert box on refresh
        window.onbeforeunload = () => {};
        return;

      default:
        let { uid, displayName } = await userPromise;
        displayName = displayName ?? randomGhost();

        const __playerRef = __roomRef.child(uid);
        if (await refExists(__playerRef)) throw new Error('User already in room');

        // TODO this call to db is prob unnecessary
        const highestIndex =
          Object.values<{ index?: number }>(
            (await __roomRef.orderByChild('index').startAt(0).limitToFirst(1).once('value')).val() ?? {},
          )[0]?.index ?? 0;

        // adds player to db
        __playerRef.onDisconnect().remove();
        await __playerRef.set({ displayName, index: highestIndex + 1 });
        setPlayerRef(__playerRef);

        // subscribes to database
        __roomRef.orderByChild('index').startAt(0).on('value', onRoomUpdate);
        setRoomRef(__roomRef);

        // alert box on refresh
        window.onbeforeunload = () => 'Are you sure you want to leave this room?';
        return;
    }
  }

  async function tryJoinRoom(roomId: string) {
    if (!roomId?.length) throw new Error(`roomid too short`);

    const roomExists = await refExists(room(roomId));
    if (!roomExists) throw new Error(`room ${roomId} does not exist`);

    return await setRoom(room(roomId));
  }

  async function createRoom() {
    const roomId = randomRoomId();

    const roomExists = await refExists(room(roomId));

    if (roomExists) return await createRoom();
    else await setRoom(room(roomId));

    return roomId;
  }

  async function leaveRoom() {
    return await setRoom(null);
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

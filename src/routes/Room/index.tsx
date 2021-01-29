import debounce from '@logic/debounce';
import { h } from 'preact';
import styles from './Room.module.scss';
import { useRoom } from '@store/room';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'preact/hooks';
import parseSearchParams from '@logic/parseSearchParams';

function Room() {
  const { inRoom, tryJoinRoom, createRoom, leaveRoom, roomData } = useRoom();
  const { search } = useLocation();

  function urlJoin() {
    const roomId = parseSearchParams(search).join;
    history.replaceState({}, 'Phantym', '/room');
    if (roomId?.length) tryJoinRoom(roomId);
  }

  useEffect(urlJoin, []);

  if (inRoom)
    return (
      <div class={styles.root}>
        <button onClick={leaveRoom}>leave room</button>

        <h3>players:</h3>
        {Object.values(roomData).map(p => (
          <h3>{p.displayName}</h3>
        ))}
      </div>
    );

  return (
    <div class={styles.root}>
      <h3>type code below</h3>
      <input
        type='text'
        placeholder='gib room code'
        onChange={({ target: { value } }) => value.length === 5 && tryJoinRoom(value)}
      />
      <h3>or</h3>
      <button onClick={createRoom}>create room</button>
    </div>
  );
}

export default Room;

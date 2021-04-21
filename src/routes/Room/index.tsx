import { h } from 'preact';
import styles from './Room.module.scss';
import { useRoom } from '@store/room';
import { useEffect } from 'preact/hooks';
import Button from '@components/elements/button/Button';
import Icon from '@components/elements/icon';
import CodeInput from '@components/elements/codeInput/CodeInput';

function Room({ id = '' }) {
  const { inRoom, tryJoinRoom, createRoom, leaveRoom, roomData } = useRoom();

  useEffect(function urlJoin() {
    if (id.length === 5) tryJoinRoom(id);
  }, []);

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
      <div class={styles.createRoom}>
        <h1>Create a room</h1>
        <p>Create a room and play a game, enjoy to music through Spotify or chat with your friends.</p>
        <div class={styles.actions}>
          <Button onClick={createRoom}>
            <Icon variant={'door'} alt={'Create room'} />
            Create room
          </Button>
          <Button colour={'ghost'} lifted={1} onClick={() => alert('Create private room')}>
            <Icon variant={'padlock'} alt={'Private room'} />
            Private room
          </Button>
        </div>
      </div>
      <h6>or</h6>
      <div class={styles.joinRoom}>
        <h1>Join a room</h1>
        <p>Join a room by entering the room code below, or by clicking the link one of your friends has sent</p>
        <CodeInput lifted onFilled={(value: string) => tryJoinRoom(value)} />
      </div>
    </div>
  );
}

export default Room;

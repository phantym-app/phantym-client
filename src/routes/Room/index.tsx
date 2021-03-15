import { h } from 'preact';
import styles from './Room.module.scss';
import { useRoom } from '@store/room';
import { useEffect } from 'preact/hooks';

function Room({ id = '' }) {
  const { joinRoom, createRoom, room, chat } = useRoom();

  useEffect(function urlJoin() {
    if (id.length === 5) joinRoom(id);
  }, []);

  if (room)
    return (
      <div class={styles.root}>
        <h1>{room.id}</h1>
        <button onClick={room.leave}>leave room</button>

        <h3>players:</h3>
        {Object.values(room.data).map(p => (
          <h3>{p.displayName}</h3>
        ))}

        <hr />

        <h3>chat</h3>
        {chat.data.map(({ uid, text }) => (
          <p>
            {uid}: {text}
          </p>
        ))}
        <form
          onSubmit={function (e) {
            e.preventDefault();
            chat.send(e.target.children[0].value);
            e.target.children[0].value = '';
          }}>
          <input />
        </form>
      </div>
    );

  return (
    <div class={styles.root}>
      <h3>type code below</h3>
      <input
        type='text'
        placeholder='gib room code'
        onInput={({ target: { value } }) => value.length === 5 && joinRoom(value)}
      />
      <h3>or</h3>
      <button onClick={createRoom}>create room</button>
    </div>
  );
}

export default Room;

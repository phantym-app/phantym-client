import { h } from 'preact';
import styles from './Play.module.scss';

import { useState } from 'preact/hooks';
import { useGameLibrary } from '@store/gameLibrary';

import Async from 'async-preact';
import Loader from '@components/elements/loader/Loader';

function Play({ id }) {
  const { get } = useGameLibrary();

  return (
    <Async promise={get(id)}>
      <Async.Pending>{Loader}</Async.Pending>
      <Async.Success>{({ value }) => <Success game={value} />}</Async.Success>
      <Async.Error>{({ error }) => console.error(error)}</Async.Error>
    </Async>
  );
}

function Success({ game }) {
  const { compatibility, euroCents, id, popularity, thumbnail, title, minPlayers, maxPlayers } = game;

  return (
    <div class={styles.root}>
      <h1>{title}</h1>

      <GamePlayer />

      {compatibility.includes('cast') && (
        <div>
          casting available <button> cast</button>
        </div>
      )}

      {minPlayers && <div>requires at least {minPlayers} players</div>}
      {maxPlayers && <div>requires at most {maxPlayers} players</div>}
    </div>
  );
}

function GamePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  function play() {
    setIsPlaying(true);
  }

  if (isPlaying)
    return (
      <iframe
        class={styles.player}
        mozallowfullscreen='true'
        allow='autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad'
        frameborder='0'
        src='//v6p9d9t4.ssl.hwcdn.net/html/2595540/index.html'
        msallowfullscreen='true'
        scrolling='no'
        allowfullscreen='true'
        webkitallowfullscreen='true'
        allowtransparency='true'
      />
    );

  return (
    <div class={styles.player}>
      <button onClick={play}>play</button>
    </div>
  );
}

export default Play;

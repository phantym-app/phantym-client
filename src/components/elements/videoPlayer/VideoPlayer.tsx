import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styles from './VideoPlayer.module.scss';
import Icon from '@components/elements/icon';

import { useLocal } from '@store/local';

type Props = {
  source: string;
};

function VideoPlayer({ source }: Props) {
  const [video, setVideo] = useState<HTMLVideoElement>(null);

  const [isPaused, __setIsPaused] = useState(true);
  const [isSeeking, __setIsSeeking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, __setVolume] = useLocal<number>('videoVolume');
  const [isFullscreen, setIsFullscreen] = useState(false);

  function togglePlay() {
    if (video.paused) {
      video.play();
      __setIsPaused(false);
    } else {
      video.pause();
      __setIsPaused(true);
    }
  }

  function updateTime() {
    if (!isSeeking) setProgress(video.currentTime / video.duration);
  }

  function seek(e) {
    video.currentTime = (+e.target.value / 10000) * video.duration;
    setProgress(+e.target.value / 10000);
    __setIsSeeking(false);
  }

  function toggleMute() {
    if (video.muted) video.muted = false;
    else video.muted = true;
  }

  function setVolume(e) {
    video.muted = false;

    __setVolume(+e.target.value);
    video.volume = +e.target.value / 100;
  }

  function toggleFullscreen() {
    if (isFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      video.parentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  }

  function initializeVolume() {
    if (video) video.volume = volume / 100;
  }

  useEffect(initializeVolume, [video]);

  return (
    <div class={styles.root}>
      <video
        // TODO wait to see if click becomes double click
        // to prevent unintentionally pausing while doubleclicking
        onClick={togglePlay}
        onDblClick={toggleFullscreen}
        ref={setVideo}
        src={source}
        onTimeUpdate={updateTime}
      />

      <nav class={[styles.controls, { [styles.hideUI]: !isPaused }]}>
        <Progress progress={progress} onInput={() => __setIsSeeking(true)} onChange={seek} />
        <Play onClick={togglePlay} paused={isPaused} />
        <Mute volume={volume} isMuted={video?.muted} onClick={toggleMute} />
        <VolumeSlider volume={volume} onChange={setVolume} />
        <CurrentTime progress={progress} duration={video?.duration} />
        <Fullscreen onClick={toggleFullscreen} />
      </nav>
    </div>
  );
}

const Play = ({ paused, onClick }) => (
  <button class={styles.play} onClick={onClick}>
    <Icon
      variant={paused ? 'play' : 'pause'}
      // variant={currentTime === duration ? 'repeat' : video.paused ? 'play' : 'pause'}
      alt={paused ? 'play' : 'pause'}
    />
  </button>
);

const Progress = ({ progress, onInput, onChange }) => (
  <input
    type='range'
    class={styles.progress}
    value={progress * 10000}
    max={10000}
    onInput={onInput}
    onChange={onChange}
  />
);

const Mute = ({ volume, isMuted, onClick }) => (
  <button onClick={onClick}>
    <Icon
      variant={
        isMuted || volume === 0 ? 'volume-mute' : volume < 35 ? 'volume' : volume < 75 ? 'volume-down' : 'volume-up'
      }
      alt={'volume'}
    />
  </button>
);

const VolumeSlider = ({ volume, onChange }) => (
  <input class={styles.volumeSlider} type={'range'} value={volume} max={100} onChange={onChange} />
);

const CurrentTime = ({ progress, duration }) => {
  if (!duration || Number.isNaN(duration)) return <p>00:00 / 00:00</p>;

  // Formatting the seconds passed
  const pad = num => ('0' + num).slice(-2);
  const format = seconds => `${pad(Math.floor(seconds / 60))}:${pad(Math.floor(seconds % 60))}`;

  return (
    <p>
      {format(progress * duration)} / {format(duration)}
    </p>
  );
};

const Fullscreen = ({ onClick }) => (
  <button onClick={onClick}>
    <Icon variant={'arrows-fullscreen'} alt={'fullscreen'} />
  </button>
);

export default VideoPlayer;

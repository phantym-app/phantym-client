import { h } from 'preact';
import { useRef, useEffect, useCallback } from 'preact/hooks';
import styles from './VideoPlayer.module.scss';
import Icon from '@components/elements/icon';

import { useVideoPlayer } from './VideoPlayerState';

type Props = {
  video: string;
};

const VideoPlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const videoProgress = useRef<HTMLProgressElement>(null);
  const videoHandle = useRef<HTMLInputElement>(null);
  const {
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    isPaused,
    setPaused,
    isMuted,
    setMuted,
    volume,
    setVolume,
    isFullscreen,
    setFullScreen,
    video,
    setVideo,
  } = useVideoPlayer();

  useEffect(() => {
    setVideo(props.video);
  }, []);

  // Setting initial video vars
  useEffect(() => {
    const video = videoRef.current;
    video.onloadedmetadata = () => (setCurrentTime(video.currentTime), setDuration(video.duration));
  }, [videoRef.current]);

  const openFullscreen = () => {
    const fullScreenElement = videoContainer.current;
    if (document.fullscreenEnabled) {
      fullScreenElement.requestFullscreen();
    }
  };

  // Element components
  const ProgressBar = () => {
    const progressPercentage = (currentTime / duration) * 10000;
    let wasPlaying = false;
    return (
      <div class={styles.progressbar}>
        <input
          onChange={(e: any) => (
            videoRef.current.paused ? (wasPlaying = true) : (wasPlaying = false),
            wasPlaying && videoRef.current.pause(),
            (videoRef.current.currentTime = (e.target.value / 10000) * duration)
          )}
          onMouseUp={() => wasPlaying === true && videoRef.current.play()}
          ref={videoHandle}
          class={styles.handle}
          type={'range'}
          value={progressPercentage}
          max={'10000'}
        />
        <progress ref={videoProgress} value={0 | Math.round(progressPercentage)} max={10000} class={styles.progress} />
      </div>
    );
  };

  const PlayPause = () => {
    const video = videoRef.current;
    return (
      <button
        onMouseDown={(e: any) => (
          video.paused || currentTime === duration ? video.play() : video.pause(),
          handleMediaUIVisibility(e, video.paused)
        )}>
        <Icon
          variant={currentTime === duration ? 'repeat' : video.paused ? 'play' : 'pause'}
          alt={currentTime === duration ? 'repeat' : video.paused ? 'play' : 'pause'}
        />
      </button>
    );
  };

  const Volume = () => {
    const video = videoRef.current;
    return (
      <div class={styles.volumeButton}>
        <button onMouseDown={() => (video.muted ? (video.muted = false) : (video.muted = true))}>
          <Icon
            variant={
              video?.muted || volume === 0
                ? 'volume-mute'
                : volume < 35
                ? 'volume'
                : volume < 75
                ? 'volume-down'
                : 'volume-up'
            }
            alt={'volume'}
          />
        </button>
        <div class={styles.volumeSlider}>
          <input onChange={(e: any) => setVolume(e.target.value)} type={'range'} value={volume} max={'100'} />
          <progress value={volume} max={'100'} />
        </div>
      </div>
    );
  };

  const VideoTime = () => {
    // Formatting the seconds passed
    const formatTime = (timeToFormat: number) => {
      const minutes = Math.floor(timeToFormat / 60);
      const seconds = Math.floor(timeToFormat - minutes * 60);
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
      return `${formattedMinutes}:${formattedSeconds}`;
    };

    return <p>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</p>;
  };

  const ResizeScreen = () => {
    return (
      <button
        onMouseDown={() =>
          isFullscreen ? (document.exitFullscreen(), setFullScreen(false)) : (openFullscreen(), setFullScreen(true))
        }>
        <Icon variant={'arrows-fullscreen'} alt={'volume'} />
      </button>
    );
  };

  const handleMediaUIVisibility = useCallback(
    (e: any, isPlaying: boolean) => {
      const mediaUI = e.target;
      let mouseTimeOut: any;

      // Handle visibility of mouse and mediaUI with timer
      if (isPlaying === true) {
        mediaUI.style.cursor = 'default';
        mediaUI.style.opacity = '1';
        mouseTimeOut = setTimeout(() => {
          mediaUI.style.opacity = '0';
          mediaUI.style.cursor = 'none';
        }, 3000);
      } else {
        mediaUI.style.cursor = 'default';
        mediaUI.style.opacity = '1';
      }

      // Resets timer and handles visibility
      mediaUI.onmousemove = () => {
        if (isPlaying === true) {
          clearTimeout(mouseTimeOut);
          mediaUI.style.opacity = '1';
          mediaUI.style.cursor = 'default';
          mouseTimeOut = setTimeout(() => {
            mediaUI.style.opacity = '0';
            mediaUI.style.cursor = 'none';
          }, 3000);
        }
      };
    },
    [isPaused],
  );

  const hideMediaUI = (e: any) => {
    const mediaUI = e.target;
    if (isPaused === false) {
      setTimeout(() => {
        mediaUI.style.opacity = '0';
      }, 1000);
    }
  };

  return (
    <div ref={videoContainer} class={styles.root}>
      <video
        onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
        ref={videoRef}
        muted={isMuted}
        volume={volume / 100}>
        <source src={video} type='video/mp4' />
      </video>
      <div
        onDblClick={() =>
          isFullscreen ? (document.exitFullscreen(), setFullScreen(false)) : (openFullscreen(), setFullScreen(true))
        }
        onClick={(e: any) => (
          videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause(),
          handleMediaUIVisibility(e, isPaused)
        )}
        onMouseEnter={(e: any) => handleMediaUIVisibility(e, !isPaused)}
        onMouseLeave={hideMediaUI}
        class={styles.mediaUI}>
        <ProgressBar />
        <div class={styles.actions}>
          <div class={styles.leftSideVideo}>
            <PlayPause />
            <Volume />
            <VideoTime />
          </div>
          <div class={styles.rightSideVideo}>
            <ResizeScreen />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;

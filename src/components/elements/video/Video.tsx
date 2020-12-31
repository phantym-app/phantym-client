import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import styles from './Video.module.scss';
import classnames from 'classnames';

import pause from '@assets/icons/pause.svg';
import play from '@assets/icons/play.svg';
import repeat from '@assets/icons/repeat.svg';
import muted from '@assets/icons/volume-mute.svg';
import volumeLow from '@assets/icons/volume.svg';
import volumeMedium from '@assets/icons/volume-down.svg';
import volumeHigh from '@assets/icons/volume-up.svg';
import maximize from '@assets/icons/arrows-fullscreen.svg';

type Props = {
  video: string;
};

const Video = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef<HTMLDivElement>(null);
  const videoProgress = useRef<HTMLProgressElement>(null);
  const videoHandle = useRef<HTMLInputElement>(null);
  const [videoDetails, setVideoDetails] = useState<{
    currentTime: number;
    duration: number;
    isPaused: boolean;
    isMuted: boolean;
    volume: number;
    isFullscreen: boolean;
  }>({
    duration: 0,
    currentTime: 0,
    isPaused: true,
    isMuted: true,
    volume: 100,
    isFullscreen: false,
  });

  const { video } = props;

  // Setting initial video vars
  useEffect(() => {
    const video = videoRef.current;
    video.onloadedmetadata = () =>
      setVideoDetails({
        ...videoDetails,
        currentTime: video.currentTime,
        duration: video.duration,
      });
  }, [videoRef.current]);

  // Handle pause and play
  useEffect(() => {
    const video = videoRef.current;
    videoDetails.isPaused ? video.pause() : video.play();
  }, [videoDetails.isPaused]);

  const openFullscreen = () => {
    const fullScreenElement = videoContainer.current;
    if (document.fullscreenEnabled) {
      fullScreenElement.requestFullscreen();
    }
  };

  // Element components
  const ProgressBar = () => {
    const { currentTime, duration, isPaused } = videoDetails;
    const progressPercentage = (currentTime / duration) * 10000;
    let wasPlaying = false;
    return (
      <div className={classnames(styles.progressbar)}>
        <input
          onChange={(e: any) => (
            isPaused ? (wasPlaying = true) : (wasPlaying = false),
            wasPlaying && setVideoDetails({ ...videoDetails, isPaused: true }),
            (videoRef.current.currentTime = (e.target.value / 10000) * duration)
          )}
          onMouseUp={() =>
            wasPlaying && setVideoDetails({ ...videoDetails, isPaused: false })
          }
          ref={videoHandle}
          className={classnames(styles.handle)}
          type={'range'}
          value={progressPercentage}
          max={'10000'}
        />
        <progress
          ref={videoProgress}
          value={0 | Math.round(progressPercentage)}
          max={10000}
          className={classnames(styles.progress)}
        />
      </div>
    );
  };

  const PlayPause = () => {
    return (
      <button
        onMouseDown={() =>
          videoDetails.isPaused ||
          videoDetails.currentTime === videoDetails.duration
            ? setVideoDetails({
                ...videoDetails,
                isPaused: false,
              })
            : setVideoDetails({
                ...videoDetails,
                isPaused: true,
              })
        }
      >
        <img
          src={
            videoDetails.currentTime === videoDetails.duration
              ? repeat
              : videoDetails.isPaused
              ? play
              : pause
          }
          alt={
            videoDetails.currentTime === videoDetails.duration
              ? 'repeat'
              : videoDetails.isPaused
              ? 'play'
              : 'pause'
          }
        />
      </button>
    );
  };

  const Volume = () => {
    const { isMuted, volume } = videoDetails;
    const noVolume = volume === 0;
    const lowVolume = volume < 35;
    const mediumVolume = volume < 75;
    return (
      <div className={classnames(styles.volumeButton)}>
        <button
          onMouseDown={() =>
            isMuted
              ? setVideoDetails({ ...videoDetails, isMuted: false })
              : setVideoDetails({ ...videoDetails, isMuted: true })
          }
        >
          <img
            src={
              isMuted
                ? muted
                : noVolume
                ? muted
                : lowVolume
                ? volumeLow
                : mediumVolume
                ? volumeMedium
                : volumeHigh
            }
            alt={'volume'}
          />
        </button>
        <div className={classnames(styles.volumeSlider)}>
          <input
            onChange={(e: any) =>
              setVideoDetails({
                ...videoDetails,
                volume: e.target.value,
              })
            }
            type={'range'}
            value={volume}
            max={'100'}
          />
          <progress value={volume} max={'100'} />
        </div>
      </div>
    );
  };

  const VideoTime = () => {
    const currentTime = videoDetails.currentTime;
    const duration = videoDetails.duration;
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
    const { isFullscreen } = videoDetails;
    return (
      <button
        onMouseDown={() =>
          isFullscreen
            ? (document.exitFullscreen(),
              setVideoDetails({ ...videoDetails, isFullscreen: false }))
            : (openFullscreen(),
              setVideoDetails({ ...videoDetails, isFullscreen: true }))
        }
      >
        <img src={maximize} alt={'volume'} />
      </button>
    );
  };

  return (
    <div ref={videoContainer} className={classnames(styles.root)}>
      <video
        onDblClick={() =>
          videoDetails.isFullscreen
            ? (document.exitFullscreen(),
              setVideoDetails({ ...videoDetails, isFullscreen: false }))
            : (openFullscreen(),
              setVideoDetails({ ...videoDetails, isFullscreen: true }))
        }
        onClick={() =>
          videoDetails.isPaused
            ? setVideoDetails({ ...videoDetails, isPaused: false })
            : setVideoDetails({ ...videoDetails, isPaused: true })
        }
        onTimeUpdate={() =>
          setVideoDetails({
            ...videoDetails,
            currentTime: videoRef.current.currentTime,
          })
        }
        ref={videoRef}
        muted={videoDetails.isMuted}
        volume={videoDetails.volume / 100}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className={classnames(styles.mediaUI)}>
        <ProgressBar />
        <div className={classnames(styles.actions)}>
          <div className={classnames(styles.leftSideVideo)}>
            <PlayPause />
            <Volume />
            <VideoTime />
          </div>
          <div className={classnames(styles.rightSideVideo)}>
            <ResizeScreen />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

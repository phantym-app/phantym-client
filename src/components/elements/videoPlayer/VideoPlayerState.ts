import { useState } from 'preact/hooks';

export function useVideoPlayer() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPaused, setPaused] = useState<boolean>(true);
  const [isMuted, setMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(100);
  const [isFullscreen, setFullScreen] = useState<boolean>(false);
  const [video, setVideo] = useState<string>('');

  return {
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
  };
}

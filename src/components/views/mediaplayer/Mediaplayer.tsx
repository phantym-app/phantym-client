import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Mediaplayer.module.scss';

import VideoPlayer from '@components/elements/videoPlayer/VideoPlayer';

type Props = {
  type: 'onlyVideo' | 'onlyImages' | 'videoAndImages';
};

const Mediaplayer = ({ type }: Props) => {
  const [shownMedia, setShownMedia] = useState<string>('video');

  return (
    <div class={styles.root}>
      {type === 'videoAndImages' && (
        <div class={styles.select}>
          <p
            onClick={() => shownMedia !== 'video' && setShownMedia('video')}
            class={{ [styles.active]: shownMedia === 'video' }}>
            VIDEOS
          </p>
          <p
            onClick={() => shownMedia !== 'image' && setShownMedia('image')}
            class={{ [styles.active]: shownMedia === 'image' }}>
            IMAGES
          </p>
        </div>
      )}
      <div class={styles.content}>
        <div class={styles.mediaContainer}>
          <VideoPlayer video={'/assets/videos/mockVideo.mp4'} />
        </div>
        <div class={styles.mediaSelector}>
          <div class={styles.mediaSelect}></div>
          <div class={styles.mediaSelect}></div>
          <div class={styles.mediaSelect}></div>
          <div class={styles.mediaSelect}></div>
          <div class={styles.mediaSelect}></div>
          <div class={styles.mediaSelect}></div>
        </div>
      </div>
    </div>
  );
};

export default Mediaplayer;

import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Mediaplayer.module.scss';

import mockVideo from '@assets/videos/mockVideo.mp4';

import Video from '@components/elements/video/Video';

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
          <Video video={mockVideo} />
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

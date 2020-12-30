import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Mediaplayer.module.scss';
import classnames from 'classnames';

import mockVideo from '@assets/videos/mockVideo.mp4';

import Video from '../../elements/video/Video';

type Props = {
  type: 'onlyVideo' | 'onlyImages' | 'videoAndImages';
};

const Mediaplayer = (props: Props) => {
  const [shownMedia, setShownMedia] = useState<string>('video');
  const { type } = props;

  return (
    <div className={classnames(styles.root)}>
      {type === 'videoAndImages' && (
        <div className={classnames(styles.select)}>
          <p
            onClick={() => shownMedia !== 'video' && setShownMedia('video')}
            className={classnames({ [styles.active]: shownMedia === 'video' })}
          >
            VIDEOS
          </p>
          <p
            onClick={() => shownMedia !== 'image' && setShownMedia('image')}
            className={classnames({ [styles.active]: shownMedia === 'image' })}
          >
            IMAGES
          </p>
        </div>
      )}
      <div className={classnames(styles.content)}>
        <div className={classnames(styles.mediaContainer)}>
          <Video video={mockVideo} />
        </div>
        <div className={classnames(styles.mediaSelector)}>
          <div className={classnames(styles.mediaSelect)}></div>
          <div className={classnames(styles.mediaSelect)}></div>
          <div className={classnames(styles.mediaSelect)}></div>
          <div className={classnames(styles.mediaSelect)}></div>
          <div className={classnames(styles.mediaSelect)}></div>
          <div className={classnames(styles.mediaSelect)}></div>
        </div>
      </div>
    </div>
  );
};

export default Mediaplayer;

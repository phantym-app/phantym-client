import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import styles from './Game.module.scss';
import { Link } from 'react-router-dom';

import Icon from '@components/elements/icon';
import Button from '@components/elements/button/Button';
import Mediaplayer from '@components/views/mediaplayer/Mediaplayer';

import mockGame from './mockGame.json';

const Game = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const overviewRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const moreLikeThisRef = useRef<HTMLDivElement>(null);
  const { gameInfo } = mockGame;

  return (
    <div class={styles.root}>
      <div class={styles.header}>
        <div class={styles.headerContent}>
          <Link to={'/browse'}>
            <div class={styles.backContainer}>
              <Icon variant={'arrow-left'} alt={'backArrow'} />
              <p>Browse</p>
            </div>
          </Link>
          <div class={styles.navigation}>
            <p class={{ [styles.active]: currentSection === 0 }}>Overview</p>
            <p class={{ [styles.active]: currentSection === 1 }}>About</p>
            <p class={{ [styles.active]: currentSection === 2 }}>Reviews</p>
            <p class={{ [styles.active]: currentSection === 3 }}>More like this</p>
            <Button colour={'error'}>Add to cart</Button>
          </div>
        </div>
      </div>
      <div class={styles.content}>
        <div class={styles.overviewSection} ref={overviewRef}>
          <div class={styles.title}>
            <h1>{gameInfo.title}</h1>
            <div class={styles.secondaryInfo}>
              <div>
                <Icon
                  class={{ [styles.isActive]: gameInfo.availability.desktop }}
                  variant={'computer'}
                  alt={gameInfo.availability.desktop ? 'available for desktop' : 'not available for desktop'}
                />
                <Icon
                  class={{ [styles.isActive]: gameInfo.availability.mobile }}
                  variant={'phone'}
                  alt={gameInfo.availability.mobile ? 'available for mobile' : 'not available for mobile'}
                />
                <Icon
                  class={{ [styles.isActive]: gameInfo.availability.castable }}
                  variant={'cast'}
                  alt={gameInfo.availability.castable ? 'available for casting' : 'not available for casting'}
                />
              </div>
              <h4>£{gameInfo.price}</h4>
            </div>
          </div>
          <Mediaplayer type={'videoAndImages'} />
        </div>
        <div ref={aboutRef}>
          <h4>About</h4>
        </div>
        <div ref={reviewsRef}>
          <h4>Reviews</h4>
        </div>
        <div ref={moreLikeThisRef}>
          <h4>More like this</h4>
        </div>
      </div>
    </div>
  );
};

export default Game;

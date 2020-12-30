import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import styles from './Game.module.scss';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import desktop from '@assets/icons/computer.svg';
import noDesktop from '@assets/icons/no-computer.svg';
import mobile from '@assets/icons/phone.svg';
import noMobile from '@assets/icons/no-phone.svg';
import castable from '@assets/icons/cast.svg';
import notCastable from '@assets/icons/not-castable.svg';

import Button from '../../components/elements/button/Button';
import Mediaplayer from '../../components/views/mediaplayer/Mediaplayer';

import arrowLeft from '@assets/icons/arrow-left.svg';

import mockGame from './mockGame.json';

const Game = () => {
  const [currentSection, setCurrentSection] = useState<number>(0);
  const overviewRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const moreLikeThisRef = useRef<HTMLDivElement>(null);
  const { gameInfo } = mockGame;

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.header)}>
        <Link to={'/browse'}>
          <div className={classnames(styles.backContainer)}>
            <img src={arrowLeft} alt={'backArrow'} />
            <p>Browse</p>
          </div>
        </Link>
        <div className={classnames(styles.navigation)}>
          <p
            className={classnames({
              [styles.active]: currentSection === 0,
            })}
          >
            Overview
          </p>
          <p
            className={classnames({
              [styles.active]: currentSection === 1,
            })}
          >
            About
          </p>
          <p
            className={classnames({
              [styles.active]: currentSection === 2,
            })}
          >
            Reviews
          </p>
          <p
            className={classnames({
              [styles.active]: currentSection === 3,
            })}
          >
            More like this
          </p>
          <Button>Add to cart</Button>
        </div>
      </div>
      <div className={classnames(styles.content)}>
        <div className={classnames(styles.overviewSection)} ref={overviewRef}>
          <div className={classnames(styles.title)}>
            <h1>{gameInfo.title}</h1>
            <div className={classnames(styles.secondaryInfo)}>
              <div>
                <img
                  src={gameInfo.availability.desktop ? desktop : noDesktop}
                  alt={
                    gameInfo.availability.desktop
                      ? 'available for desktop'
                      : 'not available for desktop'
                  }
                />
                <img
                  src={gameInfo.availability.mobile ? mobile : noMobile}
                  alt={
                    gameInfo.availability.desktop
                      ? 'available for mobile'
                      : 'not available for mobile'
                  }
                />
                <img
                  src={gameInfo.availability.castable ? castable : notCastable}
                  alt={
                    gameInfo.availability.desktop
                      ? 'available for casting'
                      : 'not available for casting'
                  }
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

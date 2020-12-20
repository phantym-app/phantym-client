import { h } from 'preact';
import styles from './Game.module.scss';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import favouriteEmpty from '@assets/icons/heart-empty.svg';
import favouriteFull from '@assets/icons/heart-full.svg';
import desktopIcon from '@assets/icons/computer.svg';
import noDesktop from '@assets/icons/no-computer.svg';
import mobileIcon from '@assets/icons/phone.svg';
import noMobile from '@assets/icons/no-phone.svg';
import castable from '@assets/icons/cast.svg';
import notCastable from '@assets/icons/not-castable.svg';
import noPicture from '@assets/icons/picture.svg';

type Props = {
  game: {
    picture: string;
    title: string;
    favourite: boolean;
    price: number | 'FREE';
    availability: {
      desktop: boolean;
      mobile: boolean;
      casting: boolean;
    };
  };
};

function Game(props: Props) {
  const { picture, title, favourite, price, availability } = props.game;
  const { desktop, mobile, casting } = availability;

  return (
    <div className={classnames(styles.root)}>
      <Link to={`/browse/game?selected=${title}`}>
        <div
          className={classnames(styles.imageContainer, {
            [styles.noPicture]: !picture,
          })}
        >
          <img src={picture ? picture : noPicture} alt={'game-art'} />
        </div>
      </Link>

      <div className={classnames(styles.details)}>
        <div>
          <Link to={`/browse/game?selected=${title}`}>
            <p>{title}</p>
          </Link>
          <img
            className={styles.favourite}
            src={favourite ? favouriteFull : favouriteEmpty}
            alt={favourite ? 'favourite' : 'no-favourite'}
          />
        </div>
        <div>
          {price === 'FREE' ? <p>FREE</p> : <p>{`£${price}`}</p>}

          <div className={classnames(styles.availability)}>
            <div>
              <span className={styles.tooltiptext}>
                {desktop
                  ? 'This game is playable on a computer'
                  : 'This game is not playable on a computer'}
              </span>
              <img
                src={desktop ? desktopIcon : noDesktop}
                alt={desktop ? 'available-desktop' : 'unavailable-desktop'}
              />
            </div>
            <div>
              <img
                src={mobile ? mobileIcon : noMobile}
                alt={mobile ? 'available-mobile' : 'unavailable-mobile'}
              />
              <span className={styles.tooltiptext}>
                {mobile
                  ? 'This game is playable on phones'
                  : 'This game is not playable on phones'}
              </span>
            </div>
            <div>
              <img
                src={casting ? castable : notCastable}
                alt={casting ? 'castable' : 'not-castable'}
              />
              <span className={styles.tooltiptext}>
                {casting
                  ? 'This game is castable to Chromecast'
                  : 'This game is not castable to Chromecast'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;

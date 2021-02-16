import { h } from 'preact';
import styles from './Game.module.scss';
import { Link } from 'react-router-dom';
import Icon from '@components/elements/icon';

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

function Game({ game }: Props) {
  const {
    picture,
    title,
    favourite,
    price,
    availability: { desktop, mobile, casting },
  } = game;

  return (
    <div class={styles.root}>
      <Link to={`/browse/game?selected=${title}`}>
        <div class={[styles.imageContainer, { [styles.noPicture]: !picture }]}>
          {picture ? (
            <img src={picture} alt='game-art' />
          ) : (
            <Icon class={styles.picMissing} variant={'picture'} alt={'game-art'} />
          )}
        </div>
      </Link>

      <div class={styles.details}>
        <div>
          <Link to={`/browse/game?selected=${title}`}>
            <p>{title}</p>
          </Link>
          <Icon
            class={[styles.favourite, { [styles.isActive]: favourite }]}
            variant={favourite ? 'heart-f' : 'heart'}
            alt={favourite ? 'favourite' : 'no-favourite'}
          />
        </div>
        <div>
          {price === 'FREE' ? <p>FREE</p> : <p>{`£${price}`}</p>}

          <div class={styles.availability}>
            <div>
              <span class={styles.tooltiptext}>
                {desktop ? 'This game is playable on a computer' : 'This game is not playable on a computer'}
              </span>
              <Icon
                class={[styles.icon, { [styles.isActive]: desktop }]}
                variant={'computer'}
                alt={desktop ? 'available-desktop' : 'unavailable-desktop'}
              />
            </div>
            <div>
              <Icon
                class={[styles.icon, { [styles.isActive]: mobile }]}
                variant={'phone'}
                alt={mobile ? 'available-mobile' : 'unavailable-mobile'}
              />
              <span class={styles.tooltiptext}>
                {mobile ? 'This game is playable on phones' : 'This game is not playable on phones'}
              </span>
            </div>
            <div>
              <Icon
                class={[styles.icon, { [styles.isActive]: casting }]}
                variant={'cast'}
                alt={casting ? 'castable' : 'not-castable'}
              />
              <span class={styles.tooltiptext}>
                {casting ? 'This game is castable to Chromecast' : 'This game is not castable to Chromecast'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;

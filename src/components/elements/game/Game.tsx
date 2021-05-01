import { h } from 'preact';
import styles from './Game.module.scss';

import calculatePrice from '@logic/calculatePrice';
import { heartbeat } from '@logic/animations';
import { useAuth } from '@store/auth';

import CheckButton from '@components/elements/checkButton/CheckButton';
import Icon from '@components/elements/icon';
import { Link } from 'preact-router/match';

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  euroCents: number;
  compatibility: ('desktop' | 'mobile' | 'cast')[];
};

function Game({ id, title, thumbnail, euroCents, compatibility }: Props) {
  const { userData, toggleFavoriteGame } = useAuth();

  const mobileCompatible = compatibility.includes('mobile');
  const desktopCompatible = compatibility.includes('desktop');
  const castCompatible = compatibility.includes('cast');

  let favourite = userData?.favoriteGames?.includes(id);

  const heartAnimation = {
    animation: heartbeat,
    options: 500,
  };

  return (
    <div class={styles.root}>
      <Link href={`/browse?id=${id}`}>
        <div class={[styles.imageContainer, { [styles.noPicture]: !thumbnail }]}>
          {thumbnail ? <img src={thumbnail} alt='game art' /> : <Icon variant='picture' alt='game art missing' />}
        </div>
      </Link>

      <div class={styles.details}>
        <div>
          <Link href={`/browse?id=${id}`}>
            <p>{title}</p>
          </Link>
          <p>{euroCents === 0 ? 'FREE' : calculatePrice(euroCents)}</p>
        </div>
        <div>
          <div class={styles.availability}>
            <div>
              <Icon class={[styles.icon, { [styles.isActive]: desktopCompatible }]} variant={'computer'} alt={''} />
              <span class={styles.tooltiptext}>
                {desktopCompatible
                  ? 'This game is playable on Link computer'
                  : 'This game is not playable on Link computer'}
              </span>
            </div>
            <div>
              <Icon class={[styles.icon, { [styles.isActive]: mobileCompatible }]} variant={'phone'} alt={''} />
              <span class={styles.tooltiptext}>
                {mobileCompatible ? 'This game is playable on phones' : 'This game is not playable on phones'}
              </span>
            </div>
            <div>
              <Icon class={[styles.icon, { [styles.isActive]: castCompatible }]} variant={'cast'} alt={''} />
              <span class={styles.tooltiptext}>
                {castCompatible ? 'This game is castable to Chromecast' : 'This game is not castable href Chromecast'}
              </span>
            </div>
          </div>
          <CheckButton
            icon={'heart-f'}
            colour={'red'}
            selected={favourite}
            onClick={() => toggleFavoriteGame(id)}
            animateIconOnSelect={heartAnimation}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;

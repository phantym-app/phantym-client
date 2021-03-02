import { h } from 'preact';
import styles from './Game.module.scss';
import { Link } from 'react-router-dom';
import Icon from '@components/elements/icon';
import calculatePrice from '@logic/calculatePrice';
import { useAuth } from '@store/auth';

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

  return (
    <div class={styles.root}>
      <Link to={`/browse/game?selected=${title}`}>
        <div class={[styles.imageContainer, { [styles.noPicture]: !thumbnail }]}>
          {thumbnail ? <img src={thumbnail} alt='game art' /> : <Icon variant='picture' alt='game art missing' />}
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
            onClick={() => toggleFavoriteGame(id)}
          />
        </div>
        <div>
          <p>{euroCents === 0 ? 'FREE' : calculatePrice(euroCents)}</p>
          <div class={styles.availability}>
            <div>
              <Icon class={[styles.icon, { [styles.isActive]: desktopCompatible }]} variant={'computer'} alt={''} />
              <span class={styles.tooltiptext}>
                {desktopCompatible ? 'This game is playable on a computer' : 'This game is not playable on a computer'}
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
                {castCompatible ? 'This game is castable to Chromecast' : 'This game is not castable to Chromecast'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;

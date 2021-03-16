import { h } from 'preact';
import styles from './Game.module.scss';
import { Link } from 'preact-router/match';
import Icon from '@components/elements/icon';
import calculatePrice from '@logic/calculatePrice';
import { useAuth } from '@store/auth';

type Props = {
  id: string;
  title: string;
  href: string;
  thumbnail: string;
  euroCents: number;
  compatibility: ('desktop' | 'mobile' | 'cast')[];
};

function Game({ id, title, href, thumbnail, euroCents, compatibility }: Props) {
  const { userData, toggleFavoriteGame } = useAuth();

  const mobileCompatible = compatibility.includes('mobile');
  const desktopCompatible = compatibility.includes('desktop');
  const castCompatible = compatibility.includes('cast');

  let favourite = userData?.favoriteGames?.includes(id);

  return (
    <div class={styles.root}>
      <Link href={href}>
        <div class={[styles.imageContainer, { [styles.noPicture]: !thumbnail }]}>
          {thumbnail ? <img src={thumbnail} alt='game art' /> : <Icon variant='picture' alt='game art missing' />}
        </div>
      </Link>

      <div class={styles.details}>
        <div>
          <Link href={href}>
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
                {castCompatible ? 'This game is castable href Chromecast' : 'This game is not castable href Chromecast'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;

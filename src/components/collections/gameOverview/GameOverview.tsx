import { h } from 'preact';
import styles from './GameOverview.module.scss';
import Game from '@components/elements/game/Game';

type Props = {
  games: {
    picture: string;
    title: string;
    favourite: boolean;
    price: number | 'FREE';
    availability: {
      desktop: boolean;
      mobile: boolean;
      casting: boolean;
    };
  }[];
};

function GameOverview({ games }: Props) {
  return (
    <div class={styles.root}>
      {games.map((gameInfo, index) => (
        <Game key={index} game={gameInfo} />
      ))}
    </div>
  );
}

export default GameOverview;

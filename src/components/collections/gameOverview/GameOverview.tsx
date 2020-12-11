import { h } from 'preact';
import styles from './GameOverview.module.scss';
import classnames from 'classnames';
import Game from '../../elements/game/Game';

type Props = {
  games: {
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

function GameOverview(props: Props) {
  const { games } = props;

  return (
    <div className={classnames(styles.root)}>
      {games.map((gameInfo, index) => (
        <Game key={index} game={gameInfo} />
      ))}
    </div>
  );
}

export default GameOverview;

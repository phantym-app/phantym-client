import type { GameStub } from '@store/gameLibrary';

import { h } from 'preact';
import styles from './GameOverview.module.scss';
import Game from '@components/elements/game/Game';

type Props = {
  games: GameStub[];
};

const GameOverview = ({ games }: Props) => (
  <div class={styles.root}>
    {games.map((game, i) => (
      <Game {...game} key={i} />
    ))}
  </div>
);

export default GameOverview;

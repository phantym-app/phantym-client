import type { GameStub } from '@store/gameLibrary';

import { h } from 'preact';
import styles from './GameOverview.module.scss';
import Game from '@components/elements/game/Game';
import IntersectionTrigger from '@components/elements/intersectionTrigger/IntersectionTrigger';
import { useState } from 'preact/hooks';

type Props = {
  games: GameStub[];
  onScrollEnd?: () => any;
};

function GameOverview({ games, onScrollEnd }: Props) {
  const [fetchStatus, setFetchStatus] = useState<'fetching' | 'ready' | 'end'>('ready');

  async function handleScrollEnd() {
    if (fetchStatus !== 'ready') return;

    setFetchStatus('fetching');
    try {
      await onScrollEnd();
      setFetchStatus('ready');
    } catch {
      setFetchStatus('end');
    }
  }

  return (
    <div class={styles.root}>
      {games.map((game, i) => (
        <Game {...game} key={i} />
      ))}

      <IntersectionTrigger onVisible={handleScrollEnd} />
    </div>
  );
}

export default GameOverview;

import { useState } from 'preact/hooks';

export function useHero() {
  const [activeGame, setActiveGame] = useState<number>(0);

  return {
    activeGame,
    setActiveGame,
  };
}

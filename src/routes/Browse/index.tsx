import { h } from 'preact';
import styles from './Browse.module.scss';

import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import GameOverview from '@components/collections/gameOverview/GameOverview';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';
import Hero from '@components/views/hero/Hero';

import { useEffect, useState } from 'preact/hooks';
import Icon from '@components/elements/icon';

import { useGameLibrary } from '@store/gameLibrary';
import useInfiniteScroll from '@logic/hooks/useInfiniteScroll';

const Browse = () => {
  const [activeLabels, setActiveLabel] = useState<string[]>([]);

  const { gameStubs, fetchGameStubs, gameTags, fetchGameTags } = useGameLibrary();
  const isFetchingGamePreviews = useInfiniteScroll(() => fetchGameStubs(6));

  useEffect(() => gameTags.length === 0 && fetchGameTags(12), []);

  return (
    <div class={styles.root}>
      <div class={styles.actions}>
        <div class={styles.title}>
          <h1>Browse</h1>
          <div class={styles.search}>
            {/* TODO: Add Search function */}
            <Searchbar onChange={e => console.log(e.target.value)} placeholder={'Search for a game'} />
            {/* TODO: Add filter functions */}
            <Button squared colour={'secondary'}>
              <Icon variant={'filter'} alt={'filter'} />
            </Button>
          </div>
        </div>
        <div class={styles.labelsContainer}>
          <LabelOverview
            labels={gameTags}
            activeLabels={activeLabels}
            onLabelClick={(title: string) =>
              setActiveLabel(
                activeLabels.includes(title)
                  ? activeLabels.filter(_title => title !== _title)
                  : activeLabels.concat(title),
              )
            }
          />
        </div>
      </div>
      <Hero typeOfContent={'new releases'} type={'carousel'} games={gameStubs.slice(0, 3)} />
      <div class={styles.content}>
        <GameOverview games={gameStubs} />
      </div>
    </div>
  );
};

export default Browse;

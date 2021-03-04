import { h } from 'preact';
import styles from './Browse.module.scss';

import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import GameOverview from '@components/collections/gameOverview/GameOverview';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';
import Hero from '@components/views/hero/Hero';
import Icon from '@components/elements/icon';
import FilterModal from '@components/modular/modal/filter/Filter';

import { useEffect, useState } from 'preact/hooks';

import { useGameLibrary } from '@store/gameLibrary';

const Browse = () => {
  const [activeLabels, setActiveLabels] = useState<string[]>([]);
  const [releaseDateFilter, setReleaseDateFilter] = useState<{ min: number; max: number }>({ min: 1995, max: 2021 });
  const [filtersActive, setFiltersActive] = useState<boolean>(false);

  const { gameStubs, fetchGameStubs, gameLabels, fetchGameLabels } = useGameLibrary();

  function toggleLabelActive(title: string) {
    setActiveLabels(
      activeLabels.includes(title) ? activeLabels.filter(_title => title !== _title) : [...activeLabels, title],
    );
  }

  return (
    <div class={styles.root}>
      <div class={styles.actions}>
        <div class={styles.title}>
          <h1>Browse</h1>
          <div class={styles.search}>
            {/* TODO: Add Search function */}
            <Searchbar onChange={e => console.log(e.target.value)} placeholder='Search for a game' />
            {/* TODO: Add filter functions */}
            <Button squared colour='secondary' onClick={() => setFiltersActive(true)}>
              <Icon variant='filter' alt='filter' />
            </Button>
            <FilterModal
              origin={'right'}
              active={filtersActive}
              dismissModal={() => setFiltersActive(prevState => !prevState)}
              hasDimmer
              releaseDateFilter={releaseDateFilter}
              setReleaseDateFilter={setReleaseDateFilter}
            />
          </div>
        </div>
        <LabelOverview
          onScrollEnd={() => fetchGameLabels(6)}
          labels={gameLabels}
          activeLabels={activeLabels}
          onLabelClick={toggleLabelActive}
        />
      </div>

      <Hero typeOfContent='new releases' type='carousel' games={gameStubs.slice(0, 3)} />

      <div class={styles.content}>
        <GameOverview onScrollEnd={() => fetchGameStubs(6)} games={gameStubs} />
      </div>
    </div>
  );
};

export default Browse;

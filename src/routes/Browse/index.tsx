import { h } from 'preact';
import styles from './Browse.module.scss';

import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import GameOverview from '@components/collections/gameOverview/GameOverview';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';
import Hero from '@components/views/hero/Hero';

import Icon from '@components/elements/icon';
import FilterModal from '@components/modular/modal/filter/Filter';
import { Link } from 'preact-router/match';

import { useState } from 'preact/hooks';

import { useGameLibrary } from '@store/gameLibrary';

import BrowseGame from './Game';

function Browse({ id }) {
  if (id) return <BrowseGame id={id} />;

  const [activeLabels, setActiveLabels] = useState<string[]>([]);
  const [releaseDateFilter, setReleaseDateFilter] = useState<{ min: number; max: number }>({ min: 1995, max: 2021 });
  const [filtersActive, setFiltersActive] = useState<boolean>(false);

  const { gameStubs, fetchGameStubs, gameLabels, fetchGameLabels } = useGameLibrary();

  function toggleLabelActive(title: string) {
    setActiveLabels(activeLabels.includes(title) ? activeLabels.filter(t => title !== t) : [...activeLabels, title]);
  }

  return (
    <div class={styles.root}>
      <div class={styles.actions}>
        <div class={styles.title}>
          <h1>Browse</h1>
          <div class={styles.search}>
            {/* TODO: Add Search function */}
            <Searchbar onInput={e => console.log(e.target.value)} placeholder='Search for a game' />
            {/* TODO: Add filter functions */}
            <Button squared colour='secondary' onClick={() => setFiltersActive(true)}>
              <Icon variant='filter' alt='filter' />
            </Button>
            <Link href={'/cart'} class={styles.cartButton}>
              <Button squared badge={1}>
                <Icon variant='shopping-cart' alt='shopping-cart' />
              </Button>
            </Link>
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
        <GameOverview games={gameStubs} hrefBase={'/browse'} onScrollEnd={() => fetchGameStubs(6)} />
      </div>
    </div>
  );
}

export default Browse;

import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Home.module.scss';

import filter from '@assets/icons/filter.svg';
import search from '@assets/icons/search.svg';
import mockData from './mockData.json';

import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import Dropdown from '@components/elements/dropdown/Dropdown';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';
import GameOverview from '@components/collections/gameOverview/GameOverview';

import { matchesWidth } from '@logic/matchesWidth';

function Index() {
  const [activeTab, setActiveTab] = useState<string>('allGames');
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
  const [searchButton, setSearchbutton] = useState<boolean>(matchesWidth('850', 'max'));
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const searchResize = () => {
      if (matchesWidth('850', 'max')) {
        setSearchbutton(true);
      } else {
        setSearchbutton(false);
      }
    };

    window.addEventListener('resize', searchResize);
    return () => {
      window.removeEventListener('resize', searchResize);
    };
  }, []);

  return (
    <div class={styles.root}>
      <div class={styles.actions}>
        <div class={styles.title}>
          <h1>My games</h1>
          <div class={styles.search}>
            {searchButton ? (
              <Button squared colour={'secondary'}>
                <img src={search} alt={'search'} />
              </Button>
            ) : (
              <Searchbar onChange={e => setSearchQuery(e)} placeholder={'Search for a game'} />
            )}
            {/* TODO: Add filter functions */}
            <Button squared colour={'secondary'}>
              <img src={filter} alt={'filter'} />
            </Button>
          </div>
        </div>
        <div class={styles.tabs}>
          <div>
            <h6
              class={[styles.tab, { [styles.active]: activeTab === 'allGames' }]}
              onClick={() => setActiveTab('allGames')}>
              All games
            </h6>
            <h6
              class={[styles.tab, { [styles.active]: activeTab === 'favourites' }]}
              onClick={() => setActiveTab('favourites')}>
              Favourites
            </h6>
          </div>
          <div class={styles.dropdown}>
            <p>Sort by: </p>
            <Dropdown items={['Recent', 'Alphabetical A-Z', 'Alphabetical Z-A']} coloured />
          </div>
        </div>
        <LabelOverview
          labels={mockData.mockLabels}
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
      <GameOverview games={mockData.mockGames} favourites={activeTab === 'favourites'} searchQuery={searchQuery} />
    </div>
  );
}

export default Index;

import { h } from 'preact';
import styles from './Home.module.scss';

import { useEffect, useState } from 'preact/hooks';
import { useGameLibrary } from '@store/gameLibrary';
import { useDeviceWidth } from '@store/deviceWidth';

import Icon from '@components/elements/icon';
import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';
import Dropdown from '@components/elements/dropdown/Dropdown';
import GameOverview from '@components/collections/gameOverview/GameOverview';

function Index() {
  const { minTablet, minTabletLandscape } = useDeviceWidth();

  const [activeTab, setActiveTab] = useState<'all games' | 'favourites'>('all games');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeLabels, setActiveLabels] = useState<string[]>([]);

  const { gameStubs, fetchGameStubs, gameLabels, fetchGameLabels } = useGameLibrary();

  function toggleLabelActive(title: string) {
    setActiveLabels(
      activeLabels.includes(title) ? activeLabels.filter(_title => title !== _title) : [...activeLabels, title],
    );
  }

  return (
    <div class={styles.root}>
      <div class={styles.actions}>
        <div class={styles.title}>{minTablet ? <h1>My games</h1> : <h5>My games</h5>}</div>
        <Tabs large={minTablet} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Search large={minTabletLandscape} onSearch={e => setSearchQuery(e.target.value)} />
        <hr />
        <LabelOverview
          onScrollEnd={() => fetchGameLabels(6)}
          labels={gameLabels}
          activeLabels={activeLabels}
          onLabelClick={toggleLabelActive}
        />
        <SortBy />
      </div>

      <GameOverview onScrollEnd={() => fetchGameStubs(6)} games={gameStubs} />
    </div>
  );
}

export default Index;

const Tabs = ({ large, activeTab, setActiveTab }) =>
  large ? (
    <div class={styles.tabs}>
      <h6 class={{ [styles.active]: activeTab === 'all games' }} onClick={() => setActiveTab('all games')}>
        All games
      </h6>
      <h6 class={{ [styles.active]: activeTab === 'favourites' }} onClick={() => setActiveTab('favourites')}>
        Favourites
      </h6>
    </div>
  ) : (
    <div class={styles.tabs}>
      <Dropdown
        items={['All games', 'Favourites']}
        itemOnClick={tab => setActiveTab(tab.toLowerCase())}
        bigText
        alignLeft
      />
    </div>
  );

const Search = ({ onSearch, large }) => (
  <div class={styles.search}>
    {large ? (
      <Searchbar onChange={onSearch} placeholder='Search for a game' />
    ) : (
      <Button squared colour='secondary'>
        <Icon variant='search' alt='search' />
      </Button>
    )}

    {/* TODO: Add filter functions */}
    <Button squared colour='secondary'>
      <Icon variant='filter' alt='filter' />
    </Button>
  </div>
);

const SortBy = () => (
  <div class={styles.dropdown}>
    <p>Sort by: </p>
    <Dropdown items={['Recent', 'Alphabetical A-Z', 'Alphabetical Z-A']} coloured />
  </div>
);

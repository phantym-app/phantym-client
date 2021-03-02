import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Home.module.scss';

import mockData from './mockData.json';

import GameOverview from '@components/collections/gameOverview/GameOverview';
import { MinTablet, Mobile } from './ContentResizing';

import { useDeviceWidth } from '@store/deviceWidth';

function Index() {
  const { maxMobile, maxTabletPortrait } = useDeviceWidth();
  const [activeTab, setActiveTab] = useState<'all games' | 'favourites'>('all games');
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div class={styles.root}>
      {maxMobile ? (
        <Mobile
          searchButton={maxTabletPortrait}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeLabels={activeLabels}
          setActiveLabel={setActiveLabel}
        />
      ) : (
        <MinTablet
          searchButton={maxTabletPortrait}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeLabels={activeLabels}
          setActiveLabel={setActiveLabel}
        />
      )}
      <GameOverview games={mockData.mockGames} favourites={activeTab === 'favourites'} searchQuery={searchQuery} />
    </div>
  );
}

export default Index;

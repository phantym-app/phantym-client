import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Home.module.scss';

import mockData from './mockData.json';

import GameOverview from '@components/collections/gameOverview/GameOverview';
import { MinTablet, Mobile } from './ContentResizing';

import { maxMobile, maxTablet, matchesWidth } from '@logic/matchesWidth';

function Index() {
  const [activeTab, setActiveTab] = useState<string>('all games');
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
  const [searchButton, setSearchbutton] = useState<boolean>(maxTablet);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSearchbutton(matchesWidth('850', 'max'));
    });

    return () => {
      window.removeEventListener('resize', () => setSearchbutton(matchesWidth('850', 'max')));
    };
  }, []);

  return (
    <div class={styles.root}>
      {maxMobile ? (
        <Mobile
          searchButton={searchButton}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeLabels={activeLabels}
          setActiveLabel={setActiveLabel}
        />
      ) : (
        <MinTablet
          searchButton={searchButton}
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

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import styles from './Home.module.scss';

import mockData from './mockData.json';

import GameOverview from '@components/collections/gameOverview/GameOverview';
import Modal from '@components/views/modal/Modal';
import Select from '@components/elements/select/Select';
import RangeSelect from '@components/elements/rangeSelect/RangeSelect';
import { ContentResizing } from './ContentResizing';

import { maxTablet, matchesWidth } from '@logic/matchesWidth';

function Index() {
  const [activeTab, setActiveTab] = useState<string>('all games');
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
  const [searchButton, setSearchbutton] = useState<boolean>(maxTablet);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filtersActive, setFiltersActive] = useState<boolean>(false);

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
      <ContentResizing
        searchButton={searchButton}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeLabels={activeLabels}
        setActiveLabel={setActiveLabel}
        setFiltersActive={setFiltersActive}
      />
      <GameOverview games={mockData.mockGames} favourites={activeTab === 'favourites'} searchQuery={searchQuery} />
      <Modal
        title={'Filters'}
        actions={{
          primary: {
            butonText: 'Apply filters',
            buttonIcon: 'settings-alt',
            onClick: () => console.warn('test'),
          },
          secondary: {
            buttonType: 'ghost',
            butonText: 'Clear all filters',
            buttonIcon: 'trash',
            onClick: () => console.warn('test'),
          },
        }}
        location={'right'}
        origin={'right'}
        active={filtersActive}
        dismissModal={() => setFiltersActive(prevState => !prevState)}
        hasDimmer>
        <div class={styles.filterContent}>
          <div>
            <Select
              label={'compatibility'}
              options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
            />
            <Select
              label={'compatibility'}
              options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
            />
            <Select
              label={'compatibility'}
              options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
            />
            <Select
              label={'compatibility'}
              options={['All games', 'Available for Desktop', 'Available for Mobile', 'Available for Casting']}
            />
          </div>

          <RangeSelect title={'Release date'} range={{ val1: '1982', val2: 'Present' }} />
        </div>
      </Modal>
    </div>
  );
}

export default Index;

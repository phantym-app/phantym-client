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
import Button from '@components/elements/button/Button';
import Icon from '@components/elements/icon';

function Index() {
  const [activeTab, setActiveTab] = useState<string>('all games');
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
  const [searchButton, setSearchbutton] = useState<boolean>(maxTablet);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filtersActive, setFiltersActive] = useState<boolean>(false);
  const [releaseDateFilter, setReleaseDateFilter] = useState<{ min: number; max: number }>({ min: 1995, max: 2021 });

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
        origin={'right'}
        active={filtersActive}
        dismissModal={() => setFiltersActive(prevState => !prevState)}
        hasDimmer>
        <Modal.Header title={'Filters'} />
        <Modal.Body classNames={[styles.modalBody]}>
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
          <RangeSelect
            values={releaseDateFilter}
            setValues={setReleaseDateFilter}
            title={'Release date'}
            min={1995}
            max={2021}
          />
        </Modal.Body>
        <Modal.Actions>
          <Button colour={'ghost'} onClick={() => console.warn('Clear all filters')}>
            <Icon variant={'trash'} alt={'trash'} />
            Clear all filters
          </Button>
          <Button onClick={() => console.warn('Apply filters')}>
            <Icon variant={'settings-alt'} alt={'filters'} />
            Apply filters
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Index;

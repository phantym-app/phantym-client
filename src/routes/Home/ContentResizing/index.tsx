import { h } from 'preact';
import styles from '../Home.module.scss';

import filter from '@assets/icons/filter.svg';
import search from '@assets/icons/search.svg';
import mockData from '../mockData.json';

import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import Dropdown from '@components/elements/dropdown/Dropdown';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';

import { maxMobile } from '@logic/matchesWidth';

export const Mobile = ({
  searchButton,
  setSearchQuery,
  activeTab,
  setActiveTab,
  activeLabels,
  setActiveLabel,
  searchQuery,
}) => {
  return (
    <div class={styles.actions}>
      <div class={styles.title}>
        <h6>My games</h6>
      </div>
      <div class={styles.tabs}>
        <div>
          <Dropdown
            items={['All games', 'Favourites']}
            itemOnClick={tab => setActiveTab(tab.toLowerCase())}
            bigText
            alignLeft
          />
        </div>
        <div class={styles.search}>
          {searchButton ? (
            /* TODO: Add popup searchbar */
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
      <LabelOverview
        labels={mockData.mockLabels}
        activeLabels={activeLabels}
        onLabelClick={(title: string) =>
          setActiveLabel(
            activeLabels.includes(title) ? activeLabels.filter(_title => title !== _title) : activeLabels.concat(title),
          )
        }
      />
      <div class={styles.dropdown}>
        <p>Sort by: </p>
        <Dropdown items={['Recent', 'Alphabetical A-Z', 'Alphabetical Z-A']} coloured alignLeft />
      </div>
    </div>
  );
};

export const MinTablet = ({
  searchButton,
  setSearchQuery,
  activeTab,
  setActiveTab,
  activeLabels,
  setActiveLabel,
  searchQuery,
}) => {
  return (
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
            onClick={() => setActiveTab('all games')}>
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
            activeLabels.includes(title) ? activeLabels.filter(_title => title !== _title) : activeLabels.concat(title),
          )
        }
      />
    </div>
  );
};

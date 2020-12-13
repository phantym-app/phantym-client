import { h } from 'preact';
import styles from './Browse.module.scss';
import classnames from 'classnames';
import Select from '../../components/elements/select/Select';
import GameOverview from '../../components/collections/gameOverview/GameOverview';
import LabelOverview from '../../components/collections/labelOverview/LabelOverview';
import Searchbar from '../../components/elements/searchbar/Searchbar';
import { useBrowse } from './browseState';
import mockData from './mockData.json';

const Browse = () => {
  const { mockGames, mockLabels, options } = mockData;
  const { activeLabels, setActiveLabel, setSearchQuery } = useBrowse();
  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.header)}>
        <h1>Browse</h1>
        <Searchbar
          placeholder={'Find a game'}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={classnames(styles.filters)}>
        <Select options={options[0]} />
        <Select options={options[1]} />
      </div>
      <div className={classnames(styles.labelsContainer)}>
        <p>Genres</p>
        <div className={classnames(styles.labels)}>
          <LabelOverview
            labels={mockLabels}
            activeLabels={activeLabels}
            onLabelClick={(title: string) =>
              setActiveLabel(
                activeLabels.includes(title)
                  ? activeLabels.filter((_title) => title !== _title)
                  : activeLabels.concat(title),
              )
            }
          />
        </div>
      </div>
      <GameOverview games={mockGames} />
    </div>
  );
};

export default Browse;

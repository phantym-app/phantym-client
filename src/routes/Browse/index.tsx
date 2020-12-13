import { h } from 'preact';
import styles from './Browse.module.scss';
import classnames from 'classnames';
import Select from '../../components/elements/select/Select';
import GameOverview from '../../components/collections/gameOverview/GameOverview';
import LabelOverview from '../../components/collections/labelOverview/LabelOverview';
import { browseContainer } from './browseState';
import mockData from './mockData.json';

const Browse = () => {
  const { mockGames, mockLabels } = mockData;

  return (
    <div className={classnames(styles.root)}>
      <h1>Browse</h1>
      <div className={classnames(styles.filters)}>
        <Select
          options={[
            'All games',
            'Desktop support',
            'Mobile support',
            'Castable',
          ]}
        />
        <Select
          options={[
            'All games',
            'Desktop support',
            'Mobile support',
            'Castable',
          ]}
        />
      </div>
      <div className={classnames(styles.labelsContainer)}>
        <p>Genres</p>
        <div className={classnames(styles.labels)}>
          <browseContainer.Provider>
            <LabelOverview labels={mockLabels} />
          </browseContainer.Provider>
        </div>
      </div>
      <GameOverview games={mockGames} />
    </div>
  );
};

export default Browse;

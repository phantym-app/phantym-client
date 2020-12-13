import { h } from 'preact';
import styles from './Browse.module.scss';
import classnames from 'classnames';
import GameOverview from '../../components/collections/gameOverview/GameOverview';
import LabelOverview from '../../components/collections/labelOverview/LabelOverview';
import { browseContainer } from './browseState';

const Browse = () => {
  const mockGames = [
    {
      title: 'League of Legends',
      favourite: false,
      price: 'FREE',
      availability: {
        desktop: true,
        mobile: true,
        casting: true,
      },
    },
    {
      title: 'World of Warcraft',
      favourite: false,
      price: 10.00,
      availability: {
        desktop: true,
        mobile: false,
        casting: false,
      },
    },
    {
      title: 'Awesomenauts',
      favourite: false,
      price: 15.99,
      availability: {
        desktop: true,
        mobile: true,
        casting: false,
      },
    },
    {
      title: 'Among Us',
      favourite: true,
      price: 41.25,
      availability: {
        desktop: false,
        mobile: true,
        casting: true,
      },
    },
  ];

  const mockLabels = [
    {
      title: 'Horror',
    },
    {
      title: 'MMORPG',
    },
  ];

  return (
    <div className={classnames(styles.root)}>
      <h1>Browse</h1>
      <div className={classnames(styles.filters)}></div>
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

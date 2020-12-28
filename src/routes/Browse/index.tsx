import { h } from 'preact';
import styles from './Browse.module.scss';
import classnames from 'classnames';

import Button from '../../components/elements/button/Button';
import Searchbar from '../../components/elements/searchbar/Searchbar';
import GameOverview from '../../components/collections/gameOverview/GameOverview';
import LabelOverview from '../../components/collections/labelOverview/LabelOverview';
import Hero from '../../components/views/hero/Hero';

import { useBrowse } from './browseState';
import mockData from './mockData.json';
import mockBanner from '@assets/banner.jpg';

const Browse = () => {
  const { activeLabels, setActiveLabel } = useBrowse();
  const mockGameBanner = [
    {
      bannerImage: mockBanner,
      title: 'Cyberpunk 2077',
      price: 59.99,
      availability: {
        desktop: true,
        mobile: true,
        casting: true,
      },
    },
    {
      bannerImage: mockBanner,
      title: 'Bloodborne',
      price: 59.99,
      availability: {
        desktop: true,
        mobile: false,
        casting: true,
      },
    },
    {
      bannerImage: mockBanner,
      title: 'Cyberpunk 2077',
      price: 59.99,
      availability: {
        desktop: true,
        mobile: true,
        casting: true,
      },
    },
    {
      bannerImage: mockBanner,
      title: 'Bloodborne',
      price: 59.99,
      availability: {
        desktop: true,
        mobile: false,
        casting: true,
      },
    },
  ];

  return (
    <div className={classnames(styles.root)}>
      <Hero
        typeOfContent={'new releases'}
        type={'carousel'}
        games={mockGameBanner}
      />
      <div className={classnames(styles.content)}>
        <div className={classnames(styles.actions)}>
          <div className={classnames(styles.search)}>
            <Button squared squaredIcon={'filter'} />
            <Searchbar
              onChange={(e) => console.log(e)}
              placeholder={'Search for a game'}
            />
          </div>
          <div className={classnames(styles.labelsContainer)}>
            <LabelOverview
              labels={mockData.mockLabels}
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
        <GameOverview games={mockData.mockGames} />
      </div>
    </div>
  );
};

export default Browse;

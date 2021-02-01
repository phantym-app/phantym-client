import { h } from 'preact';
import styles from './Browse.module.scss';

import Button from '@components/elements/button/Button';
import Searchbar from '@components/elements/searchbar/Searchbar';
import GameOverview from '@components/collections/gameOverview/GameOverview';
import LabelOverview from '@components/collections/labelOverview/LabelOverview';
import Hero from '@components/views/hero/Hero';

import { useState } from 'preact/hooks';
import mockData from './mockData.json';
import mockBanner from '@assets/banner.jpg';

const Browse = () => {
  const [activeLabels, setActiveLabel] = useState<string[]>([]);
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
    <div class={styles.root}>
      <div class={styles.actions}>
        <div class={styles.title}>
          <h1>Browse</h1>
          <div class={styles.search}>
            {/* TODO: Add Search function */}
            <Searchbar onChange={e => console.log(e.target.value)} placeholder={'Search for a game'} />
            {/* TODO: Add filter functions */}
            <Button squared squaredIcon={'filter'} colour={'secondary'} />
          </div>
        </div>
        <div class={styles.labelsContainer}>
          <LabelOverview
            labels={mockData.mockLabels}
            activeLabels={activeLabels}
            onLabelClick={(title: string) =>
              setActiveLabel(
                activeLabels.includes(title)
                  ? activeLabels.filter(_title => title !== _title)
                  : activeLabels.concat(title),
              )
            }
          />
        </div>
      </div>
      <Hero typeOfContent={'new releases'} type={'carousel'} games={mockGameBanner} />
      <div class={styles.content}>
        <GameOverview games={mockData.mockGames} />
      </div>
    </div>
  );
};

export default Browse;

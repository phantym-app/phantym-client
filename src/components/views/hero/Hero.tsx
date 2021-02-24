import { h } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';

import styles from './Hero.module.scss';
import { Link } from 'react-router-dom';
import Button from '@components/elements/button/Button';

import Icon from '@components/elements/icon';

type Game = {
  bannerImage: string;
  title: string;
  price: number;
  availability: {
    desktop: boolean;
    mobile: boolean;
    casting: boolean;
  };
};

type Props = {
  type: 'banner' | 'carousel';
  typeOfContent: 'new releases' | 'recommended';
  games: Game[];
};

const Hero = ({ type, typeOfContent, games }: Props) => {
  const [activeGame, setActiveGame] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { title, price, availability } = games[activeGame];
  const { desktop, mobile, casting } = availability;

  const setNewActiveGame = (direction: 'next' | 'previous') => {
    if (direction === 'next' && activeGame + 1 !== games.length) {
      setActiveGame(activeGame + 1);
    } else if (direction === 'previous' && activeGame !== 0) {
      setActiveGame(activeGame - 1);
    }
  };

  const animateBanner = (direction: 'next' | 'previous') => {
    const bannersContainer = bannerRef.current;
    const previousOptions = {
      top: 0,
      left: bannersContainer.scrollLeft - bannersContainer.clientWidth,
    };
    const nextOptions = {
      top: 0,
      left: bannersContainer.scrollLeft + bannersContainer.clientWidth,
    };
    let options = direction === 'next' ? nextOptions : previousOptions;
    bannersContainer.scroll(options);
  };

  const animateInfo = (direction: 'next' | 'previous') => {
    const infoContainer = infoRef.current;
    const leftSide = infoContainer.children[0];
    const rightSide = infoContainer.children[1];

    const fadeAnimationNext = (elements: any) => {
      if (activeGame + 1 !== games.length) {
        elements.map((element: any) => {
          // Animate to left
          element.style.cssText = 'transform: translateX(-15px); opacity: 0;';
          setTimeout(() => {
            // Push to right
            element.style.cssText = 'transition: unset; transform: translateX(15px); opacity: 0;';
            setTimeout(() => {
              // Animate to original place
              element.style.cssText = 'transition: 0.3s ease-out; opacity: 1; transform: translateX(0px)';
            }, 300);
          }, 300);
        });
      }
    };

    const fadeAnimationPrevious = (elements: any) => {
      if (activeGame !== 0) {
        elements.map((element: any) => {
          // Animate to left
          element.style.cssText = 'transform: translateX(15px); opacity: 0;';
          setTimeout(() => {
            // Push to right
            element.style.cssText = 'transition: unset; transform: translateX(-15px); opacity: 0;';
            setTimeout(() => {
              // Animate to original place
              element.style.cssText = 'transition: 0.3s ease-out; transform: translateX(0px);';
            }, 300);
          }, 300);
          element.style.transition = '0.3s ease-in';
        });
      }
    };
    const pageTitle = leftSide.children[1];
    const availability = rightSide.children[0];
    const price = rightSide.children[1];
    direction === 'next'
      ? fadeAnimationNext([pageTitle, availability, price])
      : fadeAnimationPrevious([pageTitle, availability, price]);
  };

  const switchBanner = useCallback(
    (direction: 'next' | 'previous') => {
      // Animate the info
      animateInfo(direction);
      // Animate the banner
      animateBanner(direction);
      // Get new data after animation
      setTimeout(() => {
        setNewActiveGame(direction);
      }, 500);
    },
    [activeGame],
  );

  return (
    <div class={styles.root}>
      <div ref={bannerRef} class={styles.banners}>
        {games.map((game, index) => {
          return (
            <div
              key={index}
              class={[styles.bannerContainer, { [styles.noImage]: game.bannerImage === undefined || null }]}>
              {game.bannerImage ? (
                <img class={styles.banner} src={game.bannerImage} alt={game.title} />
              ) : (
                <Icon class={styles.banner} variant={'picture'} alt={game.title} />
              )}
            </div>
          );
        })}
      </div>
      <div class={styles.shade} />
      <div class={styles.overlay}>
        {type === 'carousel' && (
          <div class={[styles.buttonContainer, { [styles.activeButton]: activeGame !== 0 }]}>
            <Button onClick={() => switchBanner('previous')} rounded colour={'secondary'}>
              <Icon variant={'chevron-left'} alt={'chevronLeft'} />
            </Button>
          </div>
        )}
        <Link to={`/browse/game?selected=${title}`}>
          <div ref={infoRef} class={styles.info}>
            <div class={styles.title}>
              <p>{typeOfContent}</p>
              <h1>{title}</h1>
            </div>
            <div class={styles.gameInfo}>
              <div class={styles.availability}>
                <Icon
                  class={{ [styles.isActive]: desktop }}
                  variant={'computer'}
                  alt={desktop ? 'available-desktop' : 'unavailable-desktop'}
                />
                <Icon
                  class={{ [styles.isActive]: mobile }}
                  variant={'phone'}
                  alt={mobile ? 'available-mobile' : 'unavailable-mobile'}
                />
                <Icon
                  class={{ [styles.isActive]: casting }}
                  variant={'cast'}
                  alt={casting ? 'castable' : 'not-castable'}
                />
              </div>
              <h4>£{price}</h4>
            </div>
          </div>
        </Link>
        {type === 'carousel' && (
          <div
            class={[
              styles.buttonContainer,
              styles.rightButton,
              { [styles.activeButton]: activeGame + 1 !== games.length },
            ]}>
            <Button onClick={() => switchBanner('next')} rounded colour={'secondary'}>
              <Icon variant={'chevron-right'} alt={'chevronRight'} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

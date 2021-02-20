import type { GameStub } from '@store/gameLibrary';

import { h } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';

import styles from './Hero.module.scss';
import { Link } from 'react-router-dom';

import Icon from '@components/elements/icon';

import calculatePrice from '@logic/calculatePrice';
import Loader from '@components/elements/loader/Loader';

const mockBanner = '/assets/banner.jpg';

type Props = {
  type: 'banner' | 'carousel';
  typeOfContent: 'new releases' | 'recommended';
  games: GameStub[];
};

const Hero = ({ type, typeOfContent, games }: Props) => {
  if (!games.length) return <Loader />;

  const [activeGame, setActiveGame] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { title, euroCents, compatibility } = games[activeGame];

  const desktop = compatibility.includes('desktop');
  const mobile = compatibility.includes('mobile');
  const cast = compatibility.includes('cast');

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
            <div key={index} class={[styles.bannerContainer, { [styles.noImage]: !mockBanner }]}>
              {mockBanner ? (
                <img class={styles.banner} src={mockBanner} alt={game.title} />
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
          <div onClick={() => switchBanner('previous')} class={styles.previousBanner}>
            {activeGame !== 0 && <Icon variant={'chevron-left'} alt={'chevronLeft'} />}
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
                <Icon class={{ [styles.isActive]: cast }} variant={'cast'} alt={cast ? 'castable' : 'not-castable'} />
              </div>
              <h4>{euroCents === 0 ? 'FREE' : calculatePrice(euroCents)}</h4>
            </div>
          </div>
        </Link>
        {type === 'carousel' && (
          <div onClick={() => switchBanner('next')} class={styles.nextBanner}>
            {activeGame + 1 !== games.length && <Icon variant={'chevron-right'} alt={'chevronRight'} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

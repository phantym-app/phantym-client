import { h } from 'preact';
import styles from './GameOverview.module.scss';
import Game from '@components/elements/game/Game';

type Props = {
  games: {
    picture: string;
    title: string;
    favourite: boolean;
    price: number | 'FREE';
    availability: {
      desktop: boolean;
      mobile: boolean;
      casting: boolean;
    };
  }[];
  favourites?: boolean;
  searchQuery?: string;
};

function GameOverview({ games, favourites, searchQuery }: Props) {
  const handleMap = (gameList: typeof games) => {
    return gameList.map((gameInfo, index) => {
      return <Game key={index} game={gameInfo} />;
    });
  };

  const search = (gamesList: typeof games) => {
    return gamesList.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleGames = () => {
    const favouriteGames = games.filter(game => game.favourite);
    // User searched for value
    if (searchQuery && searchQuery !== '') {
      if (favourites) {
        // Search favourites
        return handleMap(search(favouriteGames));
      } else {
        // Search all games
        return handleMap(search(games));
      }
      // User didn't search
    } else {
      if (favourites) {
        // Favourites filter is active
        return handleMap(favouriteGames);
      } else {
        // No filters
        return handleMap(games);
      }
    }
  };

  return <div class={styles.root}>{handleGames()}</div>;
}

export default GameOverview;

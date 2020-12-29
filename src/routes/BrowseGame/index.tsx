import { h } from 'preact';
import styles from './Game.module.scss';
import classnames from 'classnames';

const Game = () => {
  return (
    <div className={classnames(styles.root)}>Hi this is your game page</div>
  );
};

export default Game;

import { h } from 'preact';
import styles from './Room.module.scss';
import classnames from 'classnames';

const Room = () => {
  return <div className={classnames(styles.root)}>Hi this is your rooms</div>;
};

export default Room;

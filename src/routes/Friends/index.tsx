import { h } from 'preact';
import styles from './Friends.module.scss';
import classnames from 'classnames';

const Friends = () => {
  return <div className={classnames(styles.root)}>Hi this is friends</div>;
};

export default Friends;

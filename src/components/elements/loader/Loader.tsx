import { h } from 'preact';
import styles from './Loader.module.scss';
import classnames from 'classnames';

const Loader = () => {
  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.inner)} />
    </div>
  );
};

export default Loader;

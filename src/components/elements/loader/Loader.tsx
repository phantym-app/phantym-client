import { h } from 'preact';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div class={styles.root}>
      <div class={styles.inner} />
    </div>
  );
};

export default Loader;

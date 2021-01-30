import { h } from 'preact';
import styles from './Hamburger.module.scss';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

function Hamburger({ isActive, onClick }: Props) {
  return (
    <button
      data-testid='hamburger'
      onClick={onClick}
      class={[styles.hamburger, { [styles.isActive]: isActive }]}
      type={'button'}>
      <span class={styles.hamburgerBox}>
        <span class={styles.hamburgerInner}></span>
      </span>
    </button>
  );
}

export default Hamburger;

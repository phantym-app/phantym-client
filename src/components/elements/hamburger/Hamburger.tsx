import { h } from 'preact';
import styles from './Hamburger.module.scss';

type Props = {
  isActive: boolean;
  onClick: () => void;
  floating?: boolean;
};

function Hamburger({ isActive, onClick, floating }: Props) {
  return (
    <button
      data-testid='hamburger'
      onClick={onClick}
      class={[styles.hamburger, { [styles.isActive]: isActive, [styles.floating]: floating }]}
      type={'button'}>
      <span class={styles.hamburgerBox}>
        <span class={styles.hamburgerInner}></span>
        <span class={styles.hiddenLabel}>menu</span>
      </span>
    </button>
  );
}

export default Hamburger;

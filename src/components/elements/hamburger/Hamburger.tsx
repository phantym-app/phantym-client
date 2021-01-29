import { useHeader } from '@components/views/header/HeaderState';
import { h } from 'preact';
import styles from './Hamburger.module.scss';

import { useHamburger } from './HamburgerState';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

function Hamburger({ isActive, onClick }: Props) {
  return (
    <button onClick={onClick} class={[styles.hamburger, { [styles.isActive]: isActive }]} type={'button'}>
      <span class={styles.hamburgerBox}>
        <span class={styles.hamburgerInner}></span>
      </span>
    </button>
  );
}

export default Hamburger;

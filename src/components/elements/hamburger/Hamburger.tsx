import { useHeader } from '@components/views/header/HeaderState';
import { h } from 'preact';
import styles from './Hamburger.module.scss';

import { useHamburger } from './HamburgerState';

type Props = {};

function Hamburger({}: Props) {
  const { isActive, setActive } = useHamburger();
  return (
    <button
      onClick={() => setActive(!isActive)}
      class={[styles.hamburger, { [styles.isActive]: isActive }]}
      type={'button'}>
      <span class={styles.hamburgerBox}>
        <span class={styles.hamburgerInner}></span>
      </span>
    </button>
  );
}

export default Hamburger;

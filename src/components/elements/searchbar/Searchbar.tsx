import { h } from 'preact';
import styles from './Searchbar.module.scss';

import debounce from '@logic/debounce';
import Icon from '@components/elements/icon';

type Props = {
  placeholder: string;
  onInput: (e: any) => void;
};

const Searchbar = ({ placeholder, onInput }: Props) => (
  <div class={styles.root}>
    <Icon class={styles.icon} variant={'search'} alt={''} />
    <input onInput={debounce(onInput, 500)} class={styles.input} placeholder={placeholder} />
  </div>
);

export default Searchbar;

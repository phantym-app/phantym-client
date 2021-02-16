import { h } from 'preact';
import styles from './Searchbar.module.scss';
import debounce from '@logic/debounce';
import Icon from '@components/elements/icon';

type Props = {
  placeholder: string;
  onChange: (e: any) => void;
};

const Searchbar = ({ placeholder, onChange }: Props) => (
  <div class={styles.root}>
    <Icon class={styles.icon} variant={'search'} alt={''} />
    <input onChange={debounce(onChange, 1000)} class={styles.input} placeholder={placeholder} />
  </div>
);

export default Searchbar;

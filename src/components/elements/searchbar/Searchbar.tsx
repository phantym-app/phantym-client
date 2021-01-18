import { h } from 'preact';
import styles from './Searchbar.module.scss';
import search from '@assets/icons/search.svg';
import debounce from '@logic/debounce';

type Props = {
  placeholder: string;
  // Uses e to pass value of searchbar to parent
  onChange: (e: any) => void;
};

const Searchbar = ({ placeholder, onChange }: Props) => {
  return (
    <div class={styles.root}>
      <input onChange={debounce(onChange, 1000, false)} class={styles.input} placeholder={placeholder} />
      <button class={styles.imageContainer}>
        <img src={search} alt={'search'} />
      </button>
    </div>
  );
};

export default Searchbar;

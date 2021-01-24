import { h } from 'preact';
import styles from './Searchbar.module.scss';
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
    </div>
  );
};

export default Searchbar;

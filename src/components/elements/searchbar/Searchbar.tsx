import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Searchbar.module.scss';

import close from '@assets/icons/close.svg';
import debounce from '@logic/debounce';

type Props = {
  placeholder: string;
  // Uses e to pass value of searchbar to parent
  onChange: (e: any) => void;
};

const Searchbar = ({ placeholder, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div class={styles.root}>
      <input
        onChange={(e: any) => {
          debounce(onChange, 500, false)(e.target.value);
          setSearchValue(e.target.value);
        }}
        class={styles.input}
        placeholder={placeholder}
        value={searchValue}
      />
      <button
        onClick={() => {
          setSearchValue('');
          onChange('');
        }}
        class={[styles.iconContainer, { [styles.visible]: searchValue !== '' }]}>
        <img class={styles.icon} src={close} alt={'remove text'} />
      </button>
    </div>
  );
};

export default Searchbar;

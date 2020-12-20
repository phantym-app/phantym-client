import { h } from 'preact';
import styles from './Searchbar.module.scss';
import classnames from 'classnames';
import search from '@assets/icons/search.svg';
import debounce from '../../../logic/debounce';

type Props = {
  placeholder: string;
  // Uses e to pass value of searchbar to parent
  onChange: (e: any) => void;
};

const Searchbar = (props: Props) => {
  const { placeholder, onChange } = props;

  return (
    <div className={classnames(styles.root)}>
      <input
        onChange={debounce(onChange, 1000, false)}
        className={classnames(styles.input)}
        placeholder={placeholder}
      />
      <button className={classnames(styles.imageContainer)}>
        <img src={search} alt={'search'} />
      </button>
    </div>
  );
};

export default Searchbar;

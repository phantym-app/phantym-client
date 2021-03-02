import { h } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Dropdown.module.scss';

import chevronDown from '@assets/icons/chevron-down.svg';

interface Props {
  items: string[];
  coloured?: boolean;
  bigText?: boolean;
  alignLeft?: boolean;
  itemOnClick?: (e: string) => void;
}

function Dropdown(props: Props) {
  const { items, coloured, bigText, alignLeft, itemOnClick } = props;
  const [selectedItem, setSelectedItem] = useState<string>(items[0]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <div class={styles.root} onClick={() => setMenuIsOpen(!menuIsOpen)}>
      {bigText ? (
        <h6 class={{ [styles.coloured]: coloured }}>{selectedItem}</h6>
      ) : (
        <p class={{ [styles.coloured]: coloured }}>{selectedItem}</p>
      )}
      <img class={{ [styles.menuOpen]: menuIsOpen }} src={chevronDown} alt={'chevron-down'} />
      <div class={[styles.menu, { [styles.active]: menuIsOpen, [styles.alignLeft]: alignLeft }]}>
        {items.map((item: string) => {
          return (
            <div
              onClick={() => {
                setSelectedItem(item);
                itemOnClick && itemOnClick(item);
              }}
              class={[styles.menuItem, { [styles.selected]: item === selectedItem }]}>
              {<p>{item}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dropdown;

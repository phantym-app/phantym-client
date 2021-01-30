import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import styles from './Dropdown.module.scss';

import chevronDown from '@assets/icons/chevron-down.svg';

interface Props {
  items: string[];
  coloured?: boolean;
}

function Dropdown({ items, coloured }) {
  const [selectedItem, setSelectedItem] = useState<string>(items[0]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <>
      <div class={styles.root} onClick={() => setMenuIsOpen(!menuIsOpen)}>
        <p class={{ [styles.coloured]: coloured }}>{selectedItem}</p>
        <img class={{ [styles.menuOpen]: menuIsOpen }} src={chevronDown} alt={'chevron-down'} />
        <div class={[styles.menu, { [styles.active]: menuIsOpen }]}>
          {items.map((item: string) => {
            return (
              <div
                onClick={() => setSelectedItem(item)}
                class={[styles.menuItem, { [styles.selected]: item === selectedItem }]}>
                {<p>{item}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dropdown;

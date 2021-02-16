import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import Icon from '@components/elements/icon';

import styles from './Input.module.scss';

type Props = {
  placeholder: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  icon?: 'close' | 'eye';
  link?: {
    url: string;
    message: string;
  };
};

function Input({ label, placeholder, icon, type, link }: Props) {
  const [value, setValue] = useState('');
  const [isValueVisible, setValueVisible] = useState(icon === 'eye' ? false : true);

  function handleTyping(e: any) {
    setValue(e.currentTarget.value);
  }

  function handleButtonClick(e: any) {
    e.preventDefault();

    if (icon === 'eye') setValueVisible(!isValueVisible);
    else setValue('');
  }

  const iconInvisible = icon === 'close' && value === '';
  const iconBordered = value !== '';
  const inputType = type === 'password' && isValueVisible ? 'text' : type;

  return (
    <div class={styles.root}>
      {/* Labels for inputfield */}
      <div class={styles.labels}>
        <p>{label}</p>
        {link && (
          <Link to={link.url}>
            <p>{link.message}</p>
          </Link>
        )}
      </div>
      {/* Inputfield */}
      <input class={styles.input} placeholder={placeholder} value={value} onChange={handleTyping} type={inputType} />
      {/* Icon at end of inputfield */}
      {icon && (
        <button
          onClick={handleButtonClick}
          class={[
            styles.iconContainer,
            {
              [styles.invisible]: iconInvisible,
              [styles.bordered]: iconBordered,
              [styles.largerIcon]: icon === 'close',
            },
          ]}>
          <Icon variant={icon !== 'eye' ? 'close' : isValueVisible ? 'eye' : 'eye-close'} alt={icon} />
        </button>
      )}
    </div>
  );
}

export default Input;

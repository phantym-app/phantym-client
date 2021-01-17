import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Link } from 'react-router-dom';

import styles from './Input.module.scss';

import closedEye from '@assets/icons/eye-close.svg';
import eye from '@assets/icons/eye.svg';
import close from '@assets/icons/close.svg';

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

  const iconInvisible = useMemo(() => icon === 'close' && value === '', [value]);
  const iconBordered = useMemo(() => value !== '', [value]);
  const iconLarger = useMemo(() => icon === 'eye', []);
  const inputType = useMemo(() => (type === 'password' && isValueVisible ? 'text' : type), [isValueVisible]);
  const imageSrc = useMemo(() => (icon === 'eye' ? (isValueVisible ? eye : closedEye) : close), [isValueVisible]);

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
              [styles.largerIcon]: iconLarger,
            },
          ]}>
          <img class={styles.icon} src={imageSrc} alt={icon} />
        </button>
      )}
    </div>
  );
}

export default Input;

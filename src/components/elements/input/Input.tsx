import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Link } from 'react-router-dom';

import styles from './Input.module.scss';

import closedEye from '@assets/icons/eye-close.svg';
import eye from '@assets/icons/eye.svg';
import close from '@assets/icons/close.svg';
import success from '@assets/icons/check.svg';
import warning from '@assets/icons/triangle-danger.svg';
import error from '@assets/icons/alert.svg';

type Props = {
  placeholder: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  icon?: 'close' | 'eye';
  status?:
    | { type: 'success'; message: string }
    | { type: 'warning'; message: string }
    | { type: 'error'; message: string };
};

function Input({ label, placeholder, icon, type, status }: Props) {
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
      {/* Inputfield */}
      <div class={styles.inputContainer}>
        <div class={styles.labelContainer}>
          <p>{label}</p>
        </div>
        <input
          class={[
            styles.input,
            {
              [styles.success]: status?.type === 'success',
              [styles.warning]: status?.type === 'warning',
              [styles.error]: status?.type === 'error',
            },
          ]}
          placeholder={placeholder}
          value={value}
          onChange={handleTyping}
          type={inputType}
        />
        {status && (
          <div
            class={[
              styles.statusContainer,
              {
                [styles.success]: status.type === 'success',
                [styles.warning]: status.type === 'warning',
                [styles.error]: status.type === 'error',
              },
            ]}>
            <img
              src={
                status.type === 'success'
                  ? success
                  : status.type === 'warning'
                  ? warning
                  : status.type === 'error'
                  ? error
                  : ''
              }
              alt={status.type}
            />
            <p>{status.message}</p>
          </div>
        )}
      </div>
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
              [styles.success]: status?.type === 'success',
              [styles.warning]: status?.type === 'warning',
              [styles.error]: status?.type === 'error',
            },
          ]}>
          <img class={styles.icon} src={imageSrc} alt={icon} />
        </button>
      )}
    </div>
  );
}

export default Input;

import { h } from 'preact';
import { useEffect, useCallback } from "preact/hooks"
import styles from './Input.module.scss';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import closedEye from '@assets/icons/eye-close.svg';
import eye from '@assets/icons/eye.svg';
import close from '@assets/icons/close.svg';
import { useInput } from './InputState';

type Props = {
  placeholder: string;
  label: string;
  type?: string;
  icon?: 'close' | 'eye';
  link?: {
    url: string;
    message: string;
  };
};

function Input(props: Props) {
  const { placeholder, label, icon, link, type } = props;
  const {
    iconState,
    setIconState,
    value,
    setValue,
    valueVisibility,
    setValueVisibility,
  } = useInput();

  useEffect(() => {
    const { icon } = props;
    // Make icon invisible if it's a close icon and the value is empty
    if (icon !== undefined && icon === 'close' && value === '') {
      setIconState('invisible');
    } else {
      setIconState('');
    }
    // Set value visibility to false if the icon is eye
    if (icon && icon === 'eye') {
      setValueVisibility(false);
    }
  }, [value]);

  // Set value of input in state
  const handleChange = (event: any) => {
    const inputValue = event.currentTarget.value;
    setValue(inputValue);
  };

  const determineType = useCallback(() => {
    if (type === 'password') {
      if (valueVisibility === true) {
        return 'text';
      } else {
        return 'password';
      }
    } else {
      return type;
    }
  }, [valueVisibility]);

  return (
    <div className={classnames(styles.root)}>
      {/* Labels for inputfield */}
      <div className={classnames(styles.labels)}>
        <p>{label}</p>
        {link && (
          //@ts-ignore
          <Link to={link.url}>
            <p>{link.message}</p>
          </Link>
        )}
      </div>
      {/* Inputfield */}
      <input
        className={classnames(styles.input)}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={determineType()}
      />
      {/* Icon at end of inputfield */}
      {icon && (
        <button
          className={classnames(
            styles.iconContainer,
            { [styles.invisible]: iconState === 'invisible' },
            { [styles.bordered]: value !== '' },
            { [styles.largerIcon]: icon === 'eye' },
          )}
          onClick={
            icon === 'close'
              ? () => setValue('')
              : () => setValueVisibility(!valueVisibility)
          }
        >
          <img
            className={classnames(styles.icon)}
            src={
              icon === 'close'
                ? close
                : valueVisibility === false
                ? closedEye
                : eye
            }
            alt={icon}
          />
        </button>
      )}
    </div>
  );
}

export default Input;

import { h } from 'preact';
import styles from './Button.module.scss';
import filter from '@assets/icons/filter.svg';

type Props = {
  children?: any;
  squared?: boolean;
  squaredIcon?: string;
  style?: 'google' | 'facebook' | 'cast';
  onClick?: (...args: any) => void;
};

const Button = ({ children, squared, squaredIcon, style, onClick = () => {} }: Props) => (
  <button
    onClick={onClick}
    class={[
      styles.root,
      {
        [styles.squared]: squared,
        [styles.icon]: style,
        [styles.google]: style === 'google',
        [styles.facebook]: style === 'facebook',
        [styles.cast]: style === 'cast',
      },
    ]}>
    {children}
    {squaredIcon && <img src={squaredIcon === 'filter' ? filter : ''} alt={'buttonIcon'} />}
  </button>
);

export default Button;

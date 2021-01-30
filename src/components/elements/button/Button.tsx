import { h } from 'preact';
import styles from './Button.module.scss';

type Props = {
  children?: any;
  squared?: boolean;
  rounded?: boolean;
  style?: 'google' | 'facebook' | 'cast';
  onClick?: (...args: any) => void;
  colour?: 'secondary' | 'error' | 'warning' | 'success';
};

const Button = ({ children, squared, style, onClick = () => {}, colour, rounded }: Props) => (
  <button
    onClick={onClick}
    class={[
      styles.root,
      {
        [styles.squared]: squared,
        [styles.rounded]: rounded,
        [styles.icon]: style,
        [styles.google]: style === 'google',
        [styles.facebook]: style === 'facebook',
        [styles.cast]: style === 'cast',
        [styles.secondary]: colour === 'secondary',
        [styles.error]: colour === 'error',
        [styles.warning]: colour === 'warning',
        [styles.success]: colour === 'success',
      },
    ]}>
    {children}
  </button>
);

export default Button;

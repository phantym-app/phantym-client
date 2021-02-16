import { h } from 'preact';
import styles from './Button.module.scss';

type Props = {
  children?: any;
  squared?: boolean;
  onClick?: (...args: any) => any;
  colour?: 'secondary' | 'error' | 'warning' | 'google' | 'facebook';
};

const Button = ({ children, squared, onClick, colour }: Props) => (
  <button
    onClick={onClick ?? function () {}}
    class={[
      styles.root,
      {
        [styles.squared]: squared,
        [styles[colour]]: colour,
      },
    ]}>
    {children}
  </button>
);

export default Button;

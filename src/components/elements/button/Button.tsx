import { h } from 'preact';
import styles from './Button.module.scss';

type Props = {
  children?: any;
  lifted?: number;
  squared?: boolean;
  rounded?: boolean;
  onClick?: (...args: any) => any;
  colour?: 'secondary' | 'error' | 'warning' | 'google' | 'facebook' | 'success' | 'ghost';
};

const Button = ({ children, squared, onClick, colour, rounded, lifted }: Props) => (
  <button
    onClick={onClick ?? function () {}}
    class={[
      styles.root,
      {
        [styles.squared]: squared,
        [styles.rounded]: rounded,
        [styles[colour]]: colour,
        [styles.lifted]: lifted === 1,
        [styles.lifted2]: lifted === 2,
      },
    ]}>
    {children}
  </button>
);

export default Button;

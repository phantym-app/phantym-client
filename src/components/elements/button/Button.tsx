import { h } from 'preact';
import styles from './Button.module.scss';

type Props = {
  children?: any;
  lifted?: number;
  squared?: boolean;
  rounded?: boolean;
  onClick?: (...args: any) => any;
  colour?: 'secondary' | 'error' | 'warning' | 'google' | 'facebook' | 'success' | 'ghost';
  badge?: number;
};

const Button = ({ children, squared, onClick, colour, rounded, lifted, badge }: Props) => (
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
    {badge && <div class={styles.badge}>{badge}</div>}
  </button>
);

export default Button;

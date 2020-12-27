import { h } from 'preact';
import styles from './Button.module.scss';

type Props = {
  children: any;
  style?: 'google' | 'facebook';
  onClick?: () => void;
};

const Button = ({ children, style, onClick }: Props) => (
  <button
    onClick={onClick ? onClick : () => {}}
    class={[
      styles.root,
      {
        [styles.icon]: style !== undefined,
        [styles.google]: style === 'google',
        [styles.facebook]: style === 'facebook',
      },
    ]}>
    {children}
  </button>
);

export default Button;

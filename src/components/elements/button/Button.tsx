import { h } from 'preact';
import styles from './Button.module.scss';
import classnames from 'classnames';

type Props = {
  children: any;
  style?: 'google' | 'facebook';
  onClick?: () => void;
};

function Button(props: Props) {
  const { children, style, onClick = () => {} } = props;

  return (
    <button
      onClick={onClick}
      className={classnames(
        styles.root,
        { [styles.icon]: style },
        { [styles.google]: style === 'google' },
        { [styles.facebook]: style === 'facebook' },
      )}
    >
      {children}
    </button>
  );
}

export default Button;

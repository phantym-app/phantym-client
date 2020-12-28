import { h } from 'preact';
import styles from './Button.module.scss';
import classnames from 'classnames';
import filter from '@assets/icons/filter.svg';

type Props = {
  children?: any;
  squared?: boolean;
  squaredIcon?: string;
  style?: 'google' | 'facebook' | 'cast';
  onClick?: () => void;
};

function Button(props: Props) {
  const { children, squared, squaredIcon, style, onClick = () => {} } = props;

  return (
    <button
      onClick={onClick}
      className={classnames(
        styles.root,
        { [styles.squared]: squared },
        { [styles.icon]: style },
        { [styles.google]: style === 'google' },
        { [styles.facebook]: style === 'facebook' },
        { [styles.cast]: style === 'cast' },
      )}
    >
      {children && children}
      {squaredIcon && (
        <img src={squaredIcon === 'filter' ? filter : ''} alt={'buttonIcon'} />
      )}
    </button>
  );
}

export default Button;

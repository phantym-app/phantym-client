import { h } from 'preact';
import styles from './Label.module.scss';
import classnames from 'classnames';
import { useLabel } from './labelState';

type Props = {
  title: string;
  active?: (title: string) => boolean;
  onClick?: (title: string) => void;
};

const Label = (props: Props) => {
  const { title, active, onClick } = props;
  const { activeState, setActiveState } = useLabel();
  return (
    <button
      onClick={onClick ? () => onClick(title) : () => setActiveState(title)}
      className={classnames(styles.root, {
        [styles.active]: active ? active(title) : activeState,
      })}
    >
      <p>{title}</p>
    </button>
  );
};

export default Label;

import { h } from 'preact';
import styles from './Label.module.scss';
import { useLabel } from './labelState';

type Props = {
  title: string;
  active?: (title: string) => boolean;
  onClick?: (title: string) => void;
};

const Label = ({ title, active, onClick }: Props) => {
  const { activeState, setActiveState } = useLabel();
  return (
    <button
      onClick={onClick ? () => onClick(title) : () => setActiveState(title)}
      class={[styles.root, { [styles.active]: active ? active(title) : activeState }]}>
      <p>{title}</p>
    </button>
  );
};

export default Label;

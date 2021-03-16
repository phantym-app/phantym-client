import { h } from 'preact';
import styles from './Label.module.scss';

type Props = {
  title: string;
  active?: boolean;
  onClick?: (event: MouseEvent) => void;
};

const Label = ({ title, active, onClick }: Props) => (
  <button onClick={onClick ?? function () {}} class={[styles.root, { [styles.active]: active }]}>
    <p>{title}</p>
  </button>
);

export default Label;

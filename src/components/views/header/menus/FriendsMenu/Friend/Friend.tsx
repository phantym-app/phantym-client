import { h } from 'preact';
import styles from './Friend.module.scss';

type Props = {
  name: string;
  status: string;
};

const Friend = ({ name, status }: Props) => (
  <button class={styles.root}>
    <p>{name}</p>
    <div class={[styles.status, { [styles.online]: status === 'online' }]}>
      <div class={styles.light} />
      <p>{status}</p>
    </div>
  </button>
);

export default Friend;

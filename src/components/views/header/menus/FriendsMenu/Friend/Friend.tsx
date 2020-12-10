import { h } from 'preact';
import classnames from 'classnames';
import styles from './Friend.module.scss';

type Props = {
  name: string;
  status: string;
};

const Friend = (props: Props) => {
  const { name, status } = props;
  return (
    <button className={classnames(styles.root)}>
      <p>{name}</p>
      <div
        className={classnames(styles.status, {
          [styles.online]: status === 'online',
        })}
      >
        <div className={classnames(styles.light)} />
        <p>{status}</p>
      </div>
    </button>
  );
};

export default Friend;

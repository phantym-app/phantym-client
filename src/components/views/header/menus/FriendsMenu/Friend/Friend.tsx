import React from 'react';
import classnames from 'classnames';
import styles from './Friend.module.scss';

type Props = {
  name: string,
  status: string,
};

const Friend = (props: Props) => {
  const { name, status } = props;
  return (
    <div className={classnames(styles.root)}>
      <p>{name}</p>
      <div className={classnames(styles.status, {[styles.online] : status === 'online'})}>
        <div className={classnames(styles.light)} />
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Friend;
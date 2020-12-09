import React from 'react';
import styles from './Toggle.module.scss';
import classnames from 'classnames';

type Props = {
  checked?: boolean,
};

function Toggle(props: Props) {
  const { checked } = props;
  return (
    <div className={classnames(styles.root)}>
      <input
        className={classnames(styles.input)}
        id={`react-switch-new`}
        type="checkbox"
        checked={checked}
      />
      <label
        className={classnames(styles.label)}
      >
        <span className={classnames(styles.button)} />
      </label>
    </div>
  );
};

export default Toggle;
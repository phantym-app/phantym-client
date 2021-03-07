import { h } from 'preact';
import styles from './Toggle.module.scss';

type Props = {
  checked?: boolean;
  lifted?: number;
};

const Toggle = ({ checked, lifted }: Props) => (
  <div class={[styles.root, { [styles.lifted1]: lifted === 1 }]}>
    <input class={styles.input} id={`react-switch-new`} type='checkbox' checked={checked} />
    <label class={styles.label}>
      <span class={styles.button} />
    </label>
  </div>
);

export default Toggle;

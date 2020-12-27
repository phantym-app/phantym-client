import { h } from 'preact';
import styles from './Toggle.module.scss';

type Props = {
  checked?: boolean;
};

const Toggle = ({ checked }: Props) => (
  <div class={styles.root}>
    <input class={styles.input} id={`react-switch-new`} type='checkbox' checked={checked} />
    <label class={styles.label}>
      <span class={styles.button} />
    </label>
  </div>
);

export default Toggle;

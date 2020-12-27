import { h } from 'preact';

import LoginForm from '../../components/views/loginForm/LoginForm';

import styles from './Login.module.scss';

const Login = ({ signInWithGoogle }: any) => (
  <div class={styles.root}>
    <div class={styles.banner} />
    <div class={styles.content}>
      <LoginForm signInWithGoogle={signInWithGoogle} />
    </div>
  </div>
);

export default Login;

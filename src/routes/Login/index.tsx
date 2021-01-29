import { h, Fragment } from 'preact';

import LoginForm from '@components/views/loginForm/LoginForm';

import styles from './Login.module.scss';
import { useAuth } from '@store/auth';

function Login() {
  const { user, signInWithGoogle } = useAuth();

  if (user === undefined) return <></>;

  if (!user.isAnonymous) {
    window.location.replace('/');
    return <></>;
  }

  return (
    <div class={styles.root}>
      <div class={styles.banner} />
      <div class={styles.content}>
        <LoginForm signInWithGoogle={signInWithGoogle} />
      </div>
    </div>
  );
}
export default Login;

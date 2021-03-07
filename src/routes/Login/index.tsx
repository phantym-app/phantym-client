import { h, Fragment } from 'preact';

import LoginForm from '@components/views/loginForm/LoginForm';

import styles from './Login.module.scss';
import { useAuth } from '@store/auth';
import { Link } from 'preact-router/match';
import Scribbble from '@components/elements/scribbble';

import { useDeviceWidth } from '@store/deviceWidth';

function Login() {
  const { user, signInWithGoogle } = useAuth();
  const { minDesktop } = useDeviceWidth();

  if (user === undefined) return <></>;

  if (!user.isAnonymous) {
    window.location.replace('/');
    return <></>;
  }

  return (
    <>
      <div class={styles.topScribbbles}>
        {minDesktop ? (
          <>
            <Scribbble colour={'purple'} variant={'filled1'} />
            <Scribbble colour={'green'} variant={'4'} />
          </>
        ) : (
          <>
            <Scribbble colour={'purple'} variant={'outline1'} />
            <Scribbble colour={'green'} variant={'1'} />
          </>
        )}
      </div>
      <div class={styles.root}>
        <div class={styles.logo}>
          <h6>phantym</h6>
        </div>
        <div class={styles.signInCard}>
          <LoginForm lifted={1} signInWithGoogle={signInWithGoogle} />
        </div>
        <div class={styles.quote}>
          <Scribbble colour={'green'} variant={'2'} />
          <br />
          <span>
            Enjoy the essence of gaming, <br /> no strings attached! <br />
            …Literally
          </span>
          <br />
          <Scribbble colour={'green'} variant={'3'} />
        </div>
        <div class={styles.contact}>
          <h6>Need help?</h6>
          <Link href={'/contact'}>
            <p>Get in touch</p>
          </Link>
        </div>
      </div>
      <div class={styles.bottomScribbbles}>
        <Scribbble colour={'purple'} variant={'outline1'} />
        <Scribbble colour={'green'} variant={'1'} />
      </div>
    </>
  );
}
export default Login;

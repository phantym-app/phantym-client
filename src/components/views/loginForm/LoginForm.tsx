import { h } from 'preact';

import Button from '@components/elements/button/Button';
import Input from '@components/elements/input/Input';
import Icon from '@components/elements/icon';

import styles from './LoginForm.module.scss';

function LoginForm({ signInWithGoogle }: { signInWithGoogle: () => any }) {
  //TODO: make sure this isn't just a mouse event but also keyboard
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Send data');
  }

  return (
    <div class={styles.root}>
      <form onSubmit={handleSubmit} class={styles.form}>
        <h4>Sign in</h4>
        <Input icon={'close'} type={'email'} label={'Email address'} placeholder={'name@example.com'} />
        <Input
          icon={'eye'}
          type={'password'}
          link={{ url: '/forgotPassword', message: 'Forgot your password?' }}
          label={'Password'}
          placeholder={'Enter your password'}
        />
        <Button>Sign in</Button>
      </form>
      <p>
        Not a member? <a href={''}>Sign up here!</a>
      </p>
      <div class={styles.alternativeLogin}>
        <p>Or</p>
        <Button colour={'google'} onClick={signInWithGoogle}>
          <Icon variant={'google'} alt={''} />
          Sign in with Google
        </Button>
        <Button colour={'facebook'}>
          <Icon variant={'facebook'} alt={''} />
          Sign in with Facebook
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;

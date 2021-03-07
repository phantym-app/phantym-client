import { h } from 'preact';

import Button from '@components/elements/button/Button';
import Input from '@components/elements/input/Input';
import Icon from '@components/elements/icon';

import styles from './LoginForm.module.scss';

interface Props {
  lifted?: number;
  signInWithGoogle: () => any;
}

function LoginForm({ signInWithGoogle, lifted }: Props) {
  //TODO: make sure this isn't just a mouse event but also keyboard
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Send data');
  }

  return (
    <div class={styles.root}>
      <form onSubmit={handleSubmit} class={styles.form}>
        <span>Sign in to phantym</span>
        <Input
          lifted={lifted}
          icon={'close'}
          type={'email'}
          label={'Email address'}
          placeholder={'Example@example.com'}
        />
        <Input lifted={lifted} icon={'eye'} type={'password'} label={'Password'} placeholder={'Enter your password'} />
        <Button lifted={lifted}>
          <Icon variant={'log-in'} alt={'Log in'} />
          Sign in
        </Button>
      </form>
      <p>
        Not a member? <a href={''}>Sign up here!</a>
      </p>
      <div class={styles.alternativeLogin}>
        <p>or</p>
        <Button lifted={lifted} colour={'google'} onClick={signInWithGoogle}>
          <Icon variant={'google'} alt={'Google'} />
          Sign in with Google
        </Button>
        <Button lifted={lifted} colour={'facebook'}>
          <Icon variant={'facebook'} alt={'Facebook'} />
          Sign in with Facebook
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;

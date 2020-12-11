import { h } from 'preact';

import Button from '../../elements/button/Button';
import Input from '../../elements/input/Input';

import classnames from 'classnames';
import styles from './LoginForm.module.scss';

const LoginForm = ({ signInWithGoogle }: { signInWithGoogle: () => any }) => {
  //TODO: make sure this isn't just a mouse event but also keyboard
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Send data');
  };

  return (
    <div className={classnames(styles.root)}>
      <form onSubmit={handleSubmit} className={classnames(styles.form)}>
        <h4>Sign in</h4>
        <Input icon={'close'} type={'email'} label={'Email address'} placeholder={'Example@example.com'} />
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
      <div className={classnames(styles.alternativeLogin)}>
        <p>Or</p>
        <Button style={'google'} onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
        <Button style={'facebook'}>Sign in with Facebook</Button>
      </div>
    </div>
  );
};

export default LoginForm;

import React from 'react';
import Button from '../../components/elements/button/Button';
import Input from '../../components/elements/input/Input';
import classnames from 'classnames';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={classnames(styles.root)}>
      <h4>Sign in</h4>
      <Input
        icon={'close'}
        type={'email'}
        label={"Email address"}
        placeholder={"Example@example.com"} />
      <Input
        icon={'eye'}
        type={'password'}
        link={{ url: '/forgotPassword', message: 'Forgot your password?' }}
        label={"Password"}
        placeholder={"Enter your password"} />
      <Button>Sign in</Button>
    </div>
  );
};

export default Login;

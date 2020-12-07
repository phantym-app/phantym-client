import React from 'react';
import classnames from 'classnames';
import styles from './Login.module.scss';
import LoginForm from '../../components/views/loginForm/LoginForm';

const Login = () => {
  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.banner)} />
      <div className={classnames(styles.content)}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

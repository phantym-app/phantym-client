import React from 'react';

import LoginForm from '../../components/views/loginForm/LoginForm';

import classnames from 'classnames';
import styles from './Login.module.scss';

const Login = (props: { signInWithGoogle: any }) => {
  const { signInWithGoogle } = props;

  return (
    <div className={classnames(styles.root)}>
      <div className={classnames(styles.banner)} />
      <div className={classnames(styles.content)}>
        <LoginForm signInWithGoogle={signInWithGoogle} />
      </div>
    </div>
  );
};

export default Login;

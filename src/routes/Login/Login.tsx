import React from 'react';

import LoginForm from '../../components/views/loginForm/LoginForm';

import classnames from 'classnames';
import styles from './Login.module.scss';

import type firebase from 'firebase';

type Props = {
  user: firebase.User | undefined;
  signInWithGoogle: any;
};

const Login = ({ user, signInWithGoogle }: Props) => {
  // console.log('foo', user);
  if (user !== undefined && !user.isAnonymous) window.location.pathname = '/';

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

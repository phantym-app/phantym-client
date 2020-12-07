import React from 'react';
import { AuthContainer } from '../store/auth';

const Login = () => {
  const { user, signInWithGoogle, signOut } = AuthContainer.useContainer();

  if (user === undefined) return <p>loading...</p>;

  if (user.isAnonymous) {
    return (
      <div>
        <button onClick={signInWithGoogle}>sign in with google</button>
      </div>
    );
  }

  return (
    <div>
      <p>signed in as {user.displayName}</p>
      <br />
      <button onClick={signOut}>sign out</button>
    </div>
  );
};

export default Login;

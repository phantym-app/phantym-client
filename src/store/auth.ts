import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { app, firebase } from '../logic/firebase';
import 'firebase/auth';

import objectEquals from '../logic/objectEquals';

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.addScope('profile');
providerGoogle.addScope('email');

const auth = app.auth();
const signInAnonymously = () => auth.signInAnonymously();

function useFirebaseAuth() {
  const [user, setUser] = useState<firebase.User>();

  const handleAuthChange = useCallback(
    (u: firebase.User | null) => {
      u === null
        ? signInAnonymously()
        : !objectEquals(u, user)
        ? setUser(u)
        : null;
    },
    [user]
  );

  useEffect(() => auth.onAuthStateChanged(handleAuthChange), [auth]);

  // TODO all sign in methods must handle error "auth/account-exists-with-different-credential"
  async function signInWithGoogle() {
    if (user && user.isAnonymous)
      try {
        const userCred = await user.linkWithPopup(providerGoogle);

        // @ts-ignore
        const displayName = userCred.additionalUserInfo.profile.name;

        await user.updateProfile({ displayName });
        // @ts-ignore
        setUser({ ...userCred.user });
      } catch ({ code, credential }) {
        if (code === 'auth/credential-already-in-use') {
          await auth.signInWithCredential(credential);
        }
      } finally {
        window.location.pathname = '/';
      }
  }

  return {
    user,
    signInWithGoogle,
    signOut() {
      auth.signOut();
    },
  };
}

const AuthContainer = createContainer(useFirebaseAuth);

export { AuthContainer };

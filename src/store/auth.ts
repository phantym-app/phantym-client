import { useCallback, useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

import { providerGoogle, auth, fs } from '@logic/firebase/auth';
import usePromisedState from '@logic/usePromisedState';
import type firebase from 'firebase';

// the store's hook
function useAuth() {
  const [user, userPromise, setUser] = usePromisedState<firebase.User>(undefined);

  function handleAuthChange(u: firebase.User | null) {
    // signs in user as anonymous if signed out
    if (u === null) auth.signInAnonymously();
    else setUser(u);
  }

  useEffect(() => auth.onAuthStateChanged(handleAuthChange), []);

  // TODO all sign in methods must handle error "auth/account-exists-with-different-credential"
  async function signInWithGoogle() {
    const user = await userPromise;

    try {
      const userCred = await user.linkWithPopup(providerGoogle);

      // @ts-ignore
      const displayName = userCred.additionalUserInfo.profile.name;
      // @ts-ignore
      const photoURL = userCred.additionalUserInfo.profile.picture;

      await user.updateProfile({ displayName, photoURL });
      setUser({ ...userCred.user });
    } catch ({ code, credential }) {
      if (code === 'auth/credential-already-in-use') {
        await auth.signInWithCredential(credential);
      } else if (code === 'auth/account-exists-with-different-credential') {
      }
    } finally {
      fs.doc(`users/${user.uid}`).set({ joined: new Date() });
      window.location.pathname = '/';
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    const user = await userPromise;

    try {
      const userCred = await auth.signInWithEmailAndPassword(email, password);
      setUser({ ...userCred.user });
    } catch ({ code, credential }) {
      if (code === 'auth/account-exists-with-different-credential') {
      }
    } finally {
      fs.doc(`users/${user.uid}`).set({ joined: new Date() });
      window.location.pathname = '/';
    }
  }

  return {
    user,
    userPromise,

    signInWithGoogle,
    signInWithEmailAndPassword,
    signOut() {
      auth.signOut();
    },
  };
}

const { Provider, useContainer } = createContainer(useAuth);
export { Provider as AuthProvider, useContainer as useAuth };

import { useCallback, useEffect, useState } from 'preact/hooks';
import { createContainer } from 'unstated-next';

import { providerGoogle, auth, fs } from '../logic/firebase/auth';
import type firebase from 'firebase';

// the store's hook
function useFirebaseAuth() {
  // signs in user as anonymous if signed out
  const [user, setUser] = useState<firebase.User | undefined>(undefined);
  const handleAuthChange = useCallback((u: firebase.User | null) => {
    u === null ? auth.signInAnonymously() : setUser(u);
  }, []);
  useEffect(() => auth.onAuthStateChanged(handleAuthChange), []);

  // TODO all sign in methods must handle error "auth/account-exists-with-different-credential"
  const signInWithGoogle = useCallback(
    async function () {
      if (!user || !user.isAnonymous) return;

      try {
        const userCred = await user.linkWithPopup(providerGoogle);

        // @ts-ignore
        const displayName = userCred.additionalUserInfo.profile.name;
        // @ts-ignore
        const photoURL = userCred.additionalUserInfo.profile.picture;

        await user.updateProfile({ displayName, photoURL });
        // @ts-ignore
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
    },
    [user],
  );
  const signInWithEmailAndPassword = useCallback(
    async function (email: string, password: string) {
      if (!user || !user.isAnonymous) return;

      try {
        const userCred = await auth.signInWithEmailAndPassword(email, password);

        // @ts-ignore
        setUser({ ...userCred.user });
      } catch ({ code, credential }) {
        if (code === 'auth/account-exists-with-different-credential') {
        }
      } finally {
        fs.doc(`users/${user.uid}`).set({ joined: new Date() });
        window.location.pathname = '/';
      }
    },
    [user],
  );

  return {
    user,

    signInWithGoogle,
    signInWithEmailAndPassword,

    signOut() {
      auth.signOut();
    },
  };
}

const AuthContainer = createContainer(useFirebaseAuth);
export { AuthContainer };

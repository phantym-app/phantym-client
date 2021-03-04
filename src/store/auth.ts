import { useEffect } from 'preact/hooks';
import { createContainer } from 'unstated-next';

import useAsyncState from '@logic/hooks/useAsyncState';
import type firebase from 'firebase';
const firebase$auth = import('@logic/firebase/auth');
const firebase$firestore = import('@logic/firebase/firestore');

// the store's hook
function useAuth() {
  const [user, user$, setUser] = useAsyncState<firebase.User>(undefined);
  const [dataRef, dataRef$, setDataRef] = useAsyncState<firebase.firestore.DocumentReference>(undefined);
  const [userData, userData$, setUserData] = useAsyncState<firebase.firestore.DocumentData>(undefined);

  useEffect(async function authSubscribe() {
    const { auth } = await firebase$auth;

    function handleAuthChange(u: firebase.User | null) {
      // signs in user as anonymous if signed out
      if (u === null) auth.signInAnonymously();
      else setUser(u);
    }

    auth.onAuthStateChanged(handleAuthChange);
  }, []);

  useEffect(
    async function getDataRef() {
      if (user !== undefined && !user.isAnonymous) {
        const { fs } = await firebase$firestore;

        setDataRef(fs.doc(`users/${user.uid}`));
      }
    },
    [user],
  );

  useEffect(
    function dataSubscribe() {
      if (dataRef !== undefined)
        return dataRef.onSnapshot(function (snap) {
          if (snap.exists) setUserData(snap.data());
          else dataRef.set({ joined: new Date(), favoriteGames: [] });
        });
    },
    [dataRef],
  );

  // TODO all sign in methods must handle error "auth/account-exists-with-different-credential"
  // TODO account recovery
  async function signInWithGoogle() {
    const { providerGoogle, auth } = await firebase$auth;

    const user = await user$;

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
      window.location.pathname = '/';
    }
  }

  async function signInWithEmailAndPassword(email: string, password: string) {
    const { auth } = await firebase$auth;
    const user = await user$;

    try {
      const userCred = await auth.signInWithEmailAndPassword(email, password);
      setUser({ ...userCred.user });
    } catch ({ code, credential }) {
      if (code === 'auth/account-exists-with-different-credential') {
      }
    } finally {
      window.location.pathname = '/';
    }
  }

  async function signOut() {
    const { auth } = await firebase$auth;
    auth.signOut();
  }

  async function toggleFavoriteGame(gameId: string) {
    if ((await user$).isAnonymous) throw new Error('You must sign in to add a game to favourites');

    const dataRef = await dataRef$;
    const { favoriteGames } = userData;

    await dataRef.update({
      favoriteGames: favoriteGames.includes(gameId)
        ? favoriteGames.filter(id => id !== gameId)
        : [...favoriteGames, gameId],
    });
  }

  return {
    // auth
    user,
    user$,

    signInWithGoogle,
    signInWithEmailAndPassword,
    signOut,

    // userData
    userData,
    userData$,

    toggleFavoriteGame,
  };
}

const { Provider, useContainer } = createContainer(useAuth);
export { Provider as AuthProvider, useContainer as useAuth };

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCDw2A6KdKr9nqkfnLZSJxAlT1hYwuoZ7o',
  authDomain: 'un-sole.firebaseapp.com',
  databaseURL: 'https://un-sole.firebaseio.com',
  projectId: 'un-sole',
  storageBucket: 'un-sole.appspot.com',
  messagingSenderId: '167203965036',
  appId: '1:167203965036:web:97b9f0cf7acba7da88b049',
  measurementId: 'G-9ZZMY4DJ8R',
};

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const auth = app.auth();

//@ts-ignore
const userPromise: Promise<firebase.User> = auth.currentUser
  ? Promise.resolve(auth.currentUser)
  : auth.signInAnonymously().then(x => x.user);

const db = app.database();

export { userPromise, db };

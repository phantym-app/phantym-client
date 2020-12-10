import { app, firebase } from './';
import 'firebase/auth';
import 'firebase/firestore';

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.addScope('profile');
providerGoogle.addScope('email');

const auth = app.auth();
const fs = app.firestore();

export { providerGoogle, auth, fs };

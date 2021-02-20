import { app, firebase } from './';
import 'firebase/auth';

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.addScope('profile');
providerGoogle.addScope('email');

const auth = app.auth();

export { providerGoogle, auth };

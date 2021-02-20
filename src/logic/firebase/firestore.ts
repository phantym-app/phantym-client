import { firebase, app } from './';
import 'firebase/firestore';

const fs = app.firestore();
const { FieldValue } = firebase.firestore;

fs.enablePersistence().catch(err => {
  console.error('TODO FIX PLZ');

  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

export { fs, FieldValue };

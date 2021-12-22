// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAl9ci-LuYGpqArMnDXfTKG0NTEqLRYpxI',
  authDomain: 'cs443-project.firebaseapp.com',
  projectId: 'cs443-project',
  storageBucket: 'cs443-project.appspot.com',
  messagingSenderId: '256190477255',
  appId: '1:256190477255:web:961f32f224b271a5865fe2',
  measurementId: 'G-86NVR6C4CW',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

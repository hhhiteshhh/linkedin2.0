import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA7ageEZf2TOwj_UuNg2GVh2Sq_LnUqLog",
  authDomain: "linkedin-2-64ef4.firebaseapp.com",
  projectId: "linkedin-2-64ef4",
  storageBucket: "linkedin-2-64ef4.appspot.com",
  messagingSenderId: "98699862836",
  appId: "1:98699862836:web:edebc7d73623b9ebbcbb61",
  measurementId: "G-1DG7GL61T5",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = app.storage();

export { db, auth, provider, storage };

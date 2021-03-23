import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAQCFT-oH8FcqtfGx8E0jM7-b8hqNMzLus",
  authDomain: "todo-app-react-6dc20.firebaseapp.com",
  projectId: "todo-app-react-6dc20",
  storageBucket: "todo-app-react-6dc20.appspot.com",
  messagingSenderId: "615807074484",
  appId: "1:615807074484:web:977740060e409ff90197e1",
  measurementId: "G-FDTFK66GGF",
});

const db = firebaseApp.firestore();

export { db };

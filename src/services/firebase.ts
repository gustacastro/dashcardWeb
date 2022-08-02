import firebase from "firebase/compat/app";
import "firebase/compat/database";

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();

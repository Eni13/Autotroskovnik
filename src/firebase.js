import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDS0o4SmEUSvzoE9tdb1hR-XLmGclsef6I",
    authDomain: "recepti-914a4.firebaseapp.com",
    projectId: "recepti-914a4",
    storageBucket: "recepti-914a4.firebasestorage.app",
    messagingSenderId: "634444469273",
    appId: "1:634444469273:web:ef7850079bd6c014968688"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default {
    firebase,
  }
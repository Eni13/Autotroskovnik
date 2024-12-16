import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDS0o4SmEUSvzoE9tdb1hR-XLmGclsef6I",
    authDomain: "recepti-914a4.firebaseapp.com",
    projectId: "recepti-914a4",
    storageBucket: "recepti-914a4.firebasestorage.app",
    messagingSenderId: "634444469273",
    appId: "1:634444469273:web:ef7850079bd6c014968688"
  };
  
  //inicijalizacija firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth
};
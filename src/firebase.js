import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAm1ah1j1gcsqQnUxpMg3zRXrZBchM7RDg",
  authDomain: "autotroskovnik.firebaseapp.com",
  projectId: "autotroskovnik",
  storageBucket: "autotroskovnik.firebasestorage.app",
  messagingSenderId: "765965267096",
  appId: "1:765965267096:web:24d2cda1ad446c221460ed"
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
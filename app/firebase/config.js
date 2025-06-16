// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl20d9G8iXLG6s6yNea7xNmvH_KXOhKFo",
  authDomain: "healthcare-c4d22.firebaseapp.com",
  projectId: "healthcare-c4d22",
  storageBucket: "healthcare-c4d22.firebasestorage.app",
  messagingSenderId: "81776490295",
  appId: "1:81776490295:web:a21027e6f9f075d0680cb2",
  measurementId: "G-21PFFK2ZL5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

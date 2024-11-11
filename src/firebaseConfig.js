import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOe8Ky_KVzVaZcj1huYh8p22nQI15-aVg",
  authDomain: "info6132-lab3-659e0.firebaseapp.com",
  projectId: "info6132-lab3-659e0",
  storageBucket: "info6132-lab3-659e0.firebasestorage.app",
  messagingSenderId: "987396713967",
  appId: "1:987396713967:web:a4dd44f15fc89f011d1a1a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
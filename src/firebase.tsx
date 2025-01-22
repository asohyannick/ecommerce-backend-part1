// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "easyshopping-9373f.firebaseapp.com",
  projectId: "easyshopping-9373f",
  storageBucket: "easyshopping-9373f.firebasestorage.app",
  messagingSenderId: "216917805506",
  appId: "1:216917805506:web:d75173424d81b7660eee5b",
  measurementId: "G-R6SXN71HZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

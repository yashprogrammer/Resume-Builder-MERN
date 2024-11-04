// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "resume-builder-544dc.firebaseapp.com",
  projectId: "resume-builder-544dc",
  storageBucket: "resume-builder-544dc.firebasestorage.app",
  messagingSenderId: "1008359650392",
  appId: "1:1008359650392:web:64dc478f13ab2e0ab7462d",
};

// Initialize Firebase
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

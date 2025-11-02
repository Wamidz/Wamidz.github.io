// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi1Ha-QflMds8gCUr_l41ZS3gYSu-9A1A",
  authDomain: "tasklist-7d613.firebaseapp.com",
  projectId: "tasklist-7d613",
  storageBucket: "tasklist-7d613.firebasestorage.app",
  messagingSenderId: "908779859219",
  appId: "1:908779859219:web:4c2b8ae80be660cbe37ee6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtJ8yMj8NdJYp85HPmc1FDRG-_T-n4T74",
  authDomain: "language-learning-917eb.firebaseapp.com",
  projectId: "language-learning-917eb",
  storageBucket: "language-learning-917eb.firebasestorage.app",
  messagingSenderId: "123554534908",
  appId: "1:123554534908:web:b204c429b11fb1167e8e79",
  measurementId: "G-T2ZTTNWZQ3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
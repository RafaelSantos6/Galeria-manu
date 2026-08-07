// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaDadLxDpQR_CJccUaBVxlteN8Z2ngpMk",
  authDomain: "para-manu.firebaseapp.com",
  projectId: "para-manu",
  storageBucket: "para-manu.firebasestorage.app",
  messagingSenderId: "827545033820",
  appId: "1:827545033820:web:583feb2390fa4667f35a99",
  measurementId: "G-NYWLCVHFRP"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando os serviços
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
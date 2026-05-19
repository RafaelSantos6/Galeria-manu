// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Adicionado: Banco de texto
import { getStorage } from "firebase/storage";     // Adicionado: Banco de imagens

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
const analytics = getAnalytics(app);

// Exportando o Banco de Texto (db) e o Banco de Imagens (storage)
export const db = getFirestore(app);       // Faltava esta linha!
export const storage = getStorage(app);
// FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1G7-wlSFkKuVl3kz8_TJyweq6wMlUHHk",
    authDomain: "lifi-3cddb.firebaseapp.com",
    databaseURL: "https://lifi-3cddb-default-rtdb.firebaseio.com",
    projectId: "lifi-3cddb",
    storageBucket: "lifi-3cddb.firebasestorage.app",
    messagingSenderId: "178049979404",
    appId: "1:178049979404:web:48e3d41a7d3594d4e24a29",
    measurementId: "G-K0BS8K5SZ7"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };

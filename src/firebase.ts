import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADcFhTHvhAbskzKE3xsBilLKEdDkXqD3A",
  authDomain: "isaac-asimov-72089.firebaseapp.com",
  projectId: "isaac-asimov-72089",
  storageBucket: "isaac-asimov-72089.firebasestorage.app",
  messagingSenderId: "318663831275",
  appId: "1:318663831275:web:bfaf50b349429180ff98ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

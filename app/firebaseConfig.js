import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA6IGuVI1Ihsq1llrW-e5XVD7KmVRO8fc0",
  authDomain: "testing-8e5fc.firebaseapp.com",
  projectId: "testing-8e5fc",
  storageBucket: "testing-8e5fc.appspot.com",
  messagingSenderId: "971857762043",
  appId: "1:971857762043:web:6bf99fb4e5144b28b9025e",
  measurementId: "G-KJS1JVJGH7",
};

const app = initializeApp(firebaseConfig);
// export const AUTH = initializeAuth(app);
export const DB = getFirestore(app);
// export const STORAGE = getStorage(app);
// eslint-disable-next-line no-unused-vars
// export const ANALYTICS = getAnalytics(app);

export const userCollectionRef = collection(DB, "users");
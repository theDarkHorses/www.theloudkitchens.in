import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyD4BL5vJyNYo09mw_eWqMbDz5veMRJn3ww",
  authDomain: "theloudkitchen.firebaseapp.com",
  projectId: "theloudkitchen",
  storageBucket: "theloudkitchen.appspot.com",
  messagingSenderId: "799255415873",
  appId: "1:799255415873:web:4fc7fa03cb9604f44a4ac0",
  measurementId: "G-GX9X6QEWPC"
};


const app = initializeApp(firebaseConfig);
export const AUTH = initializeAuth(app)
export const DB = getFirestore(app)
export const STORAGE = getStorage(app)
// eslint-disable-next-line no-unused-vars
export const ANALYTICS = getAnalytics(app);
const DATABASE_URL = "https://theloudkitchen-default-rtdb.asia-southeast1.firebasedatabase.app/"
export const DATABASE = getDatabase(app, DATABASE_URL)
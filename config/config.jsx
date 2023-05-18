import { initializeApp } from "firebase/app";
import {getFirestore}from 'firebase/firestore';
import { getStorage, ref} from 'firebase/storage'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMVr_n-9hYQF3DTZhAYXumPGrOeeYZ3Sc",
  authDomain: "ride-booking-8d9af.firebaseapp.com",
  databaseURL: "https://ride-booking-8d9af-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ride-booking-8d9af",
  storageBucket: "ride-booking-8d9af.appspot.com",
  messagingSenderId: "641752013417",
  appId: "1:641752013417:web:d8d059cbd46ce0b5ec20f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);


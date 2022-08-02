import { getAuth } from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'
import { initializeApp } from "firebase/app";
// for image upload
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCfbjncPz3OJcuPdJ0vzrVEPCykEjiObUU",
  authDomain: "hotel-app-33a79.firebaseapp.com",
  projectId: "hotel-app-33a79",
  storageBucket: "hotel-app-33a79.appspot.com",
  messagingSenderId: "161632769935",
  appId: "1:161632769935:web:ea409b41c38d5e26deddfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
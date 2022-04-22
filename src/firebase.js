import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "blog-b03ff.firebaseapp.com",
  projectId: "blog-b03ff",
  storageBucket: "blog-b03ff.appspot.com",
  messagingSenderId: "296249843154",
  appId: "1:296249843154:web:5256097141e997a4b5bc0b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
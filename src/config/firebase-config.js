import { initializeApp } from "firebase/app"
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB4vay2s7JytJPfZEqZ8Gq-D3Jw8KPfDNg",
  authDomain: "workify-33e9b.firebaseapp.com",
  projectId: "workify-33e9b",
  storageBucket: "workify-33e9b.appspot.com",
  messagingSenderId: "249486230757",
  appId: "1:249486230757:web:41ca9a01b462094468800c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
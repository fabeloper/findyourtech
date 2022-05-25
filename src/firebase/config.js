import { initializeApp } from 'firebase/app';
import { getAuth }  from 'firebase/auth';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "findyourtech-2022.firebaseapp.com",
    projectId: "findyourtech-2022",
    storageBucket: "findyourtech-2022.appspot.com",
    messagingSenderId: "92638812893",
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
  };

export const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
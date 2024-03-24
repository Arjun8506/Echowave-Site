// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "echowave-chat-app.firebaseapp.com",
  projectId: "echowave-chat-app",
  storageBucket: "echowave-chat-app.appspot.com",
  messagingSenderId: "837697081148",
  appId: "1:837697081148:web:aaa928f199a1b591d61839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
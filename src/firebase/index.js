// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGXzwo5nkykAPeG_kzakDes0iLhUEhUQs",
  authDomain: "movieapp-152b6.firebaseapp.com",
  projectId: "movieapp-152b6",
  storageBucket: "movieapp-152b6.appspot.com",
  messagingSenderId: "582787694234",
  appId: "1:582787694234:web:3f236a4cf91f05a11d2923",
  measurementId: "G-B434E9CTMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth}
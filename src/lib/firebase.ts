// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8mu66ND-aiVqxj0OCjie9pj2FqEYAc28",
  authDomain: "shema-shop-2.firebaseapp.com",
  projectId: "shema-shop-2",
  storageBucket: "shema-shop-2.appspot.com",
  messagingSenderId: "502822848187",
  appId: "1:502822848187:web:c7a1b3bce441441e914b9e",
  measurementId: "G-YHX6YHGT3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// It's good practice to check if we are in a browser environment before using analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };

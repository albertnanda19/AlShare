// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCfsq1_QkzIiTsPumR5-alVys-et2wEfg",
    authDomain: "alshare-52da0.firebaseapp.com",
    projectId: "alshare-52da0",
    storageBucket: "alshare-52da0.appspot.com",
    messagingSenderId: "1058041825735",
    appId: "1:1058041825735:web:4e8234f629e5e51f2031e2",
    measurementId: "G-20W4C4H392"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
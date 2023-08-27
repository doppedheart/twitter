// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnJx-xePGhII60n3_bKjz-p80OnvkY1ZY",
  authDomain: "twitter-clone-changed.firebaseapp.com",
  projectId: "twitter-clone-changed",
  storageBucket: "twitter-clone-changed.appspot.com",
  messagingSenderId: "191802158534",
  appId: "1:191802158534:web:93167dff9faff9453dd6c7",
  measurementId: "G-CP8CW0RWDX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

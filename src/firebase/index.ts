// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKK0lRFoZkPhJ2EO11JZBc22lBV1I5OH8",
  authDomain: "svelte-chatting.firebaseapp.com",
  projectId: "svelte-chatting",
  storageBucket: "svelte-chatting.appspot.com",
  messagingSenderId: "716869573817",
  appId: "1:716869573817:web:df3927ef152df742478f68"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
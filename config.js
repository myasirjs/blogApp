import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyA-3g0hnMwJQ72b2xLNM7FbK_wj0ExRs5M",
  authDomain: "newprojectab.firebaseapp.com",
  projectId: "newprojectab",
  storageBucket: "newprojectab.firebasestorage.app",
  messagingSenderId: "387605766653",
  appId: "1:387605766653:web:f20954194ad60b2e0a7994",
  measurementId: "G-T1WWJWDW9M"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
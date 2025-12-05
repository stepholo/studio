// @ts-nocheck
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  "projectId": "studio-3719969311-6c819",
  "appId": "1:968724053624:web:30a2ee596d07a8c7ff778d",
  "apiKey": "AIzaSyCzLFZzzvHK9Vm3HN9f4aJnPRDrYlkfymo",
  "authDomain": "studio-3719969311-6c819.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "968724053624"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

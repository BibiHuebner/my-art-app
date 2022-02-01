import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "mnemosyne-cdfe7.firebaseapp.com",
  projectId: "mnemosyne-cdfe7",
  storageBucket: "mnemosyne-cdfe7.appspot.com",
  messagingSenderId: "61446083886",
  appId: "1:61446083886:web:4a349490f19320e7fad6bf",
  measurementId: "G-3SD1PX6WBX",
};
//only APIKEY in env-file yet
// when we make changes in environmental files or installed sth. in packagejson stop server, restart
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

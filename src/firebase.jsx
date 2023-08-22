import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMRmCRen4klGP2_o0dT9AasKN6VQ11Kkc",
  authDomain: "fir-login-d8bca.firebaseapp.com",
  projectId: "fir-login-d8bca",
  storageBucket: "fir-login-d8bca.appspot.com",
  messagingSenderId: "452485900189",
  appId: "1:452485900189:web:c6d66dd70402343c353174",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };

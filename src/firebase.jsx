import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5oFmEy4npQbv5WB2Mpm3ot9swZK4VIVg",
  authDomain: "storeim-78aa5.firebaseapp.com",
  projectId: "storeim-78aa5",
  storageBucket: "storeim-78aa5.appspot.com",
  messagingSenderId: "1029278138355",
  appId: "1:1029278138355:web:cdc2e7347236d341e4dc86",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

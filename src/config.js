

//------------------------------------------------------------------------------------//-------------------------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBkuV6ssqDeoNdqcB_N7J6pt6r-rTdsyyc",
  authDomain: "imageuploads-20c08.firebaseapp.com",
  projectId: "imageuploads-20c08",
  storageBucket: "imageuploads-20c08.appspot.com",
  messagingSenderId: "449820870868",
  appId: "1:449820870868:web:9588718b9572ffa1fdd341",
  measurementId: "G-ESMEWJW0RF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const ImageDb = getStorage(app)



export default {
    global_color:'#1976D2'
}

export const BASEURL= "http://localhost:5000" 
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DBURL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG,
    appId: process.env.REACT_APP_APPID
  };

  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();
  export const st = fb.storage();

// El proyecto está en desarrollo y aun no aplique las restricciones de autorización.
// A falta de pagar un servidor para alojar esta informacion sensible
// apelo a las buenas intenciones del que visite este archivo.
// Por favor no secuestre mi base de datos.
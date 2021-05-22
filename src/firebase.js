
var firebase = require('firebase');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: process.env.DB_AUTH_DOMAIN,
  projectId: process.env.DB_PROJECT_ID,
  storageBucket: process.env.DB_STORAGE_BUCKET,
  messagingSenderId: process.env.DB_MESSAGING_SENDER_ID ,
  appId: process.env.DB_APP_ID,
  measurementId: process.env.DB_MEASUREMENT_ID      
};

firebase.initializeApp(firebaseConfig);

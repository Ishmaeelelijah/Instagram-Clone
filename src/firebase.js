import firebase from 'firebase'

   const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBcxCRLg1mNvWfZWw4T04B9MasWxU8kqE4",
    authDomain: "instagram-clone-4244d.firebaseapp.com",
    databaseURL: "https://instagram-clone-4244d.firebaseio.com",
    projectId: "instagram-clone-4244d",
    storageBucket: "instagram-clone-4244d.appspot.com",
    messagingSenderId: "402675101223",
    appId: "1:402675101223:web:c48ffd882e60fbf8c86802",
    measurementId: "G-SWN41WEJY8"
   });

   const db = firebaseApp.firestore();
   const auth = firebase.auth();
   const storage = firebase.storage();

   export {db, auth, storage};

// export default db;
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA8QIOoce0HXYH1T_BjXCkJZnNdWurw8_c",
    authDomain: "thedojosite-abd40.firebaseapp.com",
    projectId: "thedojosite-abd40",
    storageBucket: "thedojosite-abd40.appspot.com",
    messagingSenderId: "802142657251",
    appId: "1:802142657251:web:0355db81ec16b5c6d0c3d6"
  };
  
  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init servieces
   const projectFirestore = firebase.firestore()
   const projectAuth = firebase.auth()
   const projectStorage = firebase.storage()
//timestamp
   const timestamp = firebase.firestore.Timestamp
   export {projectFirestore,projectAuth,projectStorage,timestamp}

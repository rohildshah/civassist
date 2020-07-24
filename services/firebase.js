/* eslint-disable */
import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyCKbckfbi7xKdG7Q368tdHflPYxpMiDcHM",
  authDomain: "hackathon-3cd54.firebaseapp.com",
  databaseURL: "https://hackathon-3cd54.firebaseio.com",
  projectId: "hackathon-3cd54",
  storageBucket: "hackathon-3cd54.appspot.com",
  messagingSenderId: "279651007594",
  appId: "1:279651007594:web:43590bce5c69595b1d5e13",
  measurementId: "G-KN56T860B9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()

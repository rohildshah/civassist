import { auth } from "@/services/firebase"
import { db } from "@/services/firebase"
import firebase from "@/services/firebase"

export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER: (state, account) => {
    console.log("set")
    state.user = account
    console.log(state.user)
  }
}

export const actions = {
  async login({ commit }, account) {
    console.log(account.password)
    console.log(account.email)
    await auth.signInWithEmailAndPassword(account.email, account.password).then(async function() {
      const { email, uid } = auth.currentUser
      await commit('SET_USER', { email, uid })
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage)
    })
  },
  async signup({ commit }, account) {
    await auth.createUserWithEmailAndPassword(account.email, account.password).then(async function() {
      const { email, uid } = auth.currentUser
      var userRef = db.collection("users").doc(uid)
      userRef.get().then(async function(doc) {
        if(!doc.exists) {
          await db.collection("users").doc(uid).set({
            email: email,
          })
        }
      })
      await commit('SET_USER', { email, uid })
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage)
    })
  },
  async google({ commit }) {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(async function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user
      var email = user.email
      var uid = user.uid
      var userRef = db.collection("users").doc(uid)
      userRef.get().then(async function(doc) {
        if(!doc.exists) {
          await db.collection("users").doc(uid).set({
            email: email,
          })
        }
      })
      console.log(email)
      console.log(uid)
      await commit('SET_USER', { email, uid })
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage)
      // ...
    });
  },
  async facebook({ commit }) {
    var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(async function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user
      var email = user.email
      var uid = user.uid
      var userRef = db.collection("users").doc(uid)
      userRef.get().then(async function(doc) {
        if(!doc.exists) {
          await db.collection("users").doc(uid).set({
            email: email,
          })
        }
      })
      await commit('SET_USER', { email, uid })
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage)
      // ...
    })
  },
  async setup({ commit }, setup) {
    console.log(setup.profile)
    const data = {
      name: setup.profile.name,
      username: setup.profile.username,
      zipcode: setup.profile.zipcode,
      state: setup.profile.state,
      settings: setup.settings
    }
    console.log(data)
    await db.collection("users").doc(setup.uid).update(data)
  }
}

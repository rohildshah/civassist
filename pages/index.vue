<!-- eslint-disable -->
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="primary" text @click="signOut()">Log Out</v-btn>

        <v-dialog v-model="isSignUpModalActive" width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">Sign Up</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2">Sign Up</v-card-title>

            <v-form class="px-6 py-6" ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="account.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

              <v-text-field v-model="account.email" :rules="emailRules" label="Email" required></v-text-field>

              <v-text-field v-model="account.password" :rules="passwordRules" label="Password" required></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="google(), isSignUpModalActive = false">Sign Up With Google</v-btn>
              <v-btn color="primary" text @click="facebook(), isSignUpModalActive = false">Sign Up With Facebook</v-btn>
              <v-btn color="primary" text @click="createAccount(), isSignUpModalActive = false">Sign Up With Email</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="isLoginModalActive" width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">Log In</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2">Log In</v-card-title>

            <v-form class="px-6 py-6" ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="account.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

              <v-text-field v-model="account.email" :rules="emailRules" label="Email" required></v-text-field>

              <v-text-field v-model="account.password" :rules="passwordRules" label="Password" required></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="google(), isLoginModalActive = false">Log in With Google</v-btn>
              <v-btn color="primary" text @click="facebook(), isLoginModalActive = false">Log in With Facebook</v-btn>
              <v-btn color="primary" text @click="login(), isLoginModalActive = false">Log in With Email</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row align="center" class="white--text mx-auto" justify="center">
                  <v-col class="white--text text-center" cols="12" tag="h1">
                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                      class="font-weight-light"
                    >WELCOME TO</span>

                    <br />

                    <span
                      :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                      class="font-weight-black"
                    >CIVASSIST</span>
                  </v-col>

                  <v-btn class="align-self-end" fab outlined @click="$vuetify.goTo('#about-me')">
                    <v-icon>mdi-chevron-double-down</v-icon>
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-me">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">ABOUT ME</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >Vuetify is the #1 component library for Vue.js and has been in active development since 2016. The goal of the project is to provide users with everything that is needed to build rich and engaging web applications using the Material Design specification. It accomplishes that with a consistent update cycle, Long-term Support (LTS) for previous versions, responsive community engagement, a vast ecosystem of resources and a dedication to quality components.</v-responsive>

          <v-avatar class="elevation-12 mb-12" size="128">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar>

          <div></div>

          <v-btn color="grey" href="https://vuetifyjs.com" outlined large>
            <span class="grey--text text--darken-1 font-weight-bold">Vuetify Documentation</span>
          </v-btn>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section>
        <v-parallax
          :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        >
        </v-parallax>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import * as firebase from "firebase/app"
import "firebase/auth"
import db from "../plugins/firebase"
export default {
  data () {
    return {
      isSignUpModalActive: false,
      isLoginModalActive: false,
      valid: true,
      account: {
        name: "",
        email: "",
        password: ""
      },
      nameRules: [
        v => !!v || "Name is required"
      ],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be at least 8 characters long"
      ]
    }
  },
  methods: {
    async createAccount () {
      var self = this
      this.$store.dispatch("users/signup", this.account).then(async function() {
        await db.collection("users").add({
          name: self.account.name,
          email: self.account.email,
        })
      })
    },
    login () {
      this.$store.dispatch("users/login", this.account)
      this.$router.push("/admin/Dashboard")
    },
    async facebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      })
    },
    async google() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    },
  }
}
</script>

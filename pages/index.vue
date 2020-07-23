<!-- eslint-disable -->
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-dialog v-model="isSignUpModalActive" width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">Sign Up</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2">Sign Up</v-card-title>

            <v-form class="px-6 py-6" ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

              <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>

              <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="createAccount(), isSignUpModalActive = false">Sign Up</v-btn>
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
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

// export default {
//   components: {
//     Logo,
//     VuetifyLogo
//   }
// }
export default {
  data () {
    return {
      isSignUpModalActive: false,
      isLoginModalActive: false,
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required"
      ],
      email: "",
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be at least 8 characters long"
      ]
    }
  },
  methods: {
    async createAccount () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      this.isSignUpModalActive = false
      await db.collection("users").add({
        name: this.name,
        email: this.email,
      })
    },
    login () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch(error => alert(error))
      this.isLoginModalActive = false
    }
  }
}
</script>

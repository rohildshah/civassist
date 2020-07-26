<!-- eslint-disable -->
<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-dialog v-model="isSetupActive" width="600">
        <div>
          <v-stepper
            v-model="setup"
          >
            <v-stepper-header>
              <template v-for="n in steps">
                <v-stepper-step
                  :key="`${n}-step`"
                  :complete="setup > n"
                  :step="n"
                  :editable="true"
                >
                  {{stepNames[n - 1]}}
                </v-stepper-step>

                <v-divider
                  v-if="n !== steps"
                  :key="n"
                ></v-divider>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content
                v-for="n in steps"
                :key="`${n}-content`"
                :step="n"
              >
                <v-card
                  class="mx-auto px-4 py-4"
                  outlined
                  v-if="n == 1"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">Step {{n}} of {{steps}}</div>
                      <v-list-item-title class="headline mb-1">Profile</v-list-item-title>
                      <v-list-item-subtitle>Setup your profile here. Your profile can always be changed later.</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-form class="px-6 py-6" ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="profile.name"
                      label="Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="profile.username"
                      label="Username"
                    ></v-text-field>
                    <v-text-field
                      v-model="profile.zipcode"
                      label="Zipcode"
                      required
                    ></v-text-field>
                    <v-select
                      v-model="profile.state"
                      :items="states"
                      menu-props="auto"
                      label="Select"
                      hide-details
                      single-line
                    ></v-select>
                  </v-form>

                  <v-card-actions>
                    <v-btn
                      v-if="n == steps && !submitted"
                      color="primary"
                      @click="finish()"
                      text
                    >
                      Finish
                    </v-btn>
                    <v-btn
                      v-if="n != steps && !submitted"
                      color="primary"
                      @click="nextStep(n)"
                      text
                    >
                      Continue
                    </v-btn>
                    <v-btn v-if="n < steps && !submitted" text>Cancel</v-btn>
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      v-if="n == steps && submitted"
                    ></v-progress-circular>
                  </v-card-actions>
                </v-card>
                <v-card
                  class="mx-auto px-4 py-4"
                  outlined
                  v-if="n == 2"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">Step {{n}} of {{steps}}</div>
                      <v-list-item-title class="headline mb-1">Settings</v-list-item-title>
                      <v-list-item-subtitle>Choose the information you want to see. You can always change this later in your settings.</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-container fluid>
                    <v-row>
                      <v-col cols="6">
                        <v-switch v-model="settings" label="State Officials" value="State Officials"></v-switch>
                        <v-switch v-model="settings" label="County Officials" value="County Officials"></v-switch>
                        <v-switch v-model="settings" label="City Officials" value="City Officials"></v-switch>
                      </v-col>
                      <v-col cols="6">
                        <v-switch v-model="settings" label="State Propositions" value="State Propositions"></v-switch>
                        <v-switch v-model="settings" label="County Measures" value="County Measures"></v-switch>
                        <v-switch v-model="settings" label="City Resolutions" value="City Resolutions"></v-switch>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-card-actions>
                    <v-btn
                      v-if="n == steps && !submitted"
                      color="primary"
                      @click="finish()"
                      text
                    >
                      Finish
                    </v-btn>
                    <v-btn
                      v-if="n != steps && !submitted"
                      color="primary"
                      @click="nextStep(n)"
                      text
                    >
                      Continue
                    </v-btn>
                    <v-btn v-if="n < steps && !submitted" text>Cancel</v-btn>
                    <v-progress-circular
                      indeterminate
                      color="primary"
                      v-if="n == steps && submitted"
                    ></v-progress-circular>
                  </v-card-actions>
                </v-card>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
      </v-dialog>
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
              <v-text-field v-model="account.email" :rules="emailRules" label="Email" required></v-text-field>

              <v-text-field
                v-model="account.password"
                :rules="passwordRules"
                label="Password"
                required
              ></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="google(), isSignUpModalActive = false"
              >Sign Up With Google</v-btn>
              <v-btn
                color="primary"
                text
                @click="facebook(), isSignUpModalActive = false"
              >Sign Up With Facebook</v-btn>
              <v-btn
                color="primary"
                text
                @click="createAccount(), isSignUpModalActive = false"
              >Sign Up With Email</v-btn>
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
              <v-text-field v-model="account.email" :rules="emailRules" label="Email" required></v-text-field>

              <v-text-field
                v-model="account.password"
                :rules="passwordRules"
                label="Password"
                required
              ></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="google(), isLoginModalActive = false"
              >Log in With Google</v-btn>
              <v-btn
                color="primary"
                text
                @click="facebook(), isLoginModalActive = false"
              >Log in With Facebook</v-btn>
              <v-btn
                color="primary"
                text
                @click="login(), isLoginModalActive = false"
              >Log in With Email</v-btn>
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
        ></v-parallax>
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  computed: {
    async user() {
      return await this.$store.state.users.user;
    },
  },
  data() {
    return {

      // Setup General
      isSetupActive: false,
      setup: 1,
      steps: 2,
      stepNames: ["Profile", "Settings"],

      // Profile Setup
      profile: {
        name: "",
        username: "",
        zipcode: "",
        state: "California",
      },
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],

      // Settings Setup
      settings: [],

      // Submit Setup
      submitted: false,

      // Authentication
      isSignUpModalActive: false,
      isLoginModalActive: false,
      valid: true,
      account: {
        email: "",
        password: "",
      },
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 8) || "Password must be at least 8 characters long",
      ],
    };
  },
  watch: {
    steps (val) {
      if (this.setup > val) {
        this.setup = val
      }
    },
  },
  methods: {
    async createAccount() {
      await this.$store.dispatch("users/signup", this.account);
      const user = await this.$store.state.users.user;
      if (await user.email != undefined && await user.uid != undefined) {
        this.isSetupActive = true
        // this.$router.push("admin/Dashboard");
      }
    },
    async login() {
      await this.$store.dispatch("users/login", this.account);
      const user = await this.$store.state.users.user;
      if (await user.email != undefined && await user.uid != undefined) {
        this.$router.push("admin/Dashboard");
      }
    },
    async facebook() {
      await this.$store.dispatch("users/facebook");
      const user = await this.$store.state.users.user;
      if (await user.email != undefined && await user.uid != undefined) {
        this.$router.push("admin/Dashboard");
      }
    },
    async google() {
      await this.$store.dispatch("users/google");
      const user = await this.$store.state.users.user;
      if (await user.email != undefined && await user.uid != undefined) {
        this.$router.push("admin/Dashboard");
      }
    },
    nextStep (n) {
      if (n === this.steps) {
        this.setup = 1
      } else {
        this.setup = n + 1
      }
    },
    async finish() {
      this.submitted = true
      const user = await this.$store.state.users.user
      console.log(user + "THIS IS THE USER")
      console.log(this.settings)
      const setup = {profile: this.profile, settings: this.settings, uid: user.uid}
      await this.$store.dispatch("users/setup", setup);
    }
  },
};
</script>

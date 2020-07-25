<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" md="12">
        <material-card color="warning" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Employees Stats</div>

            <div class="subtitle-1 font-weight-light">New employees on 15th September, 2016</div>
          </template>
        </material-card>
      </v-col>

      <v-col cols="12" md="12">
        <material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
              <span class="subheading font-weight-light mx-3" style="align-self: center">Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>State Props
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>Local Measures
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-cloud</v-icon>Server
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tabs" class="transparent">
            <v-tab-item>
              <v-card-text>
                <template v-for="(prop, i) in policies[0]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="overline mb-4">{{prop.number}}</div>
                            <v-list-item-title class="text-wrap headline mb-1">{{prop.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{prop.subject}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn :href="prop.url" text raised>View Proposition</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <template v-for="(measure, i) in policies[1]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="overline mb-4">{{measure.applies}}</div>
                            <v-list-item-title class="text-wrap headline mb-1">{{measure.subject}}</v-list-item-title>
                            <v-list-item-subtitle>{{measure.desc}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn text disabled>View Measure</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <template v-for="(resolution, i) in policies[2]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-list-item-title class="text-wrap headline mb-1">{{resolution.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{resolution.number}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn :href="resolution.url" text raised>View Resolution</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "@/services/firebase";
import { db } from "@/services/firebase";

export default {
  layout: "dashboard",
  mounted: async function () {
    const states = db.collection("states");
    var documents = await states.get();
    documents.forEach(async (doc) => {
      const state = states.doc(doc.id);
      const propositions = await db
        .collection("states")
        .doc(doc.id)
        .collection("propositions");
      const props = await propositions.get();
      const stateProps = [];
      await props.forEach((doc) => {
        stateProps.push({
          name: doc.data().name,
          number: doc.data().number,
          subject: doc.data().subject,
          url: doc.data().url,
          desc: doc.data().desc,
        });
      });
      this.policies[0] = stateProps;
    });

    const counties = db.collection("counties");
    documents = await counties.get();
    documents.forEach(async (doc) => {
      const county = counties.doc(doc.id);
      const measures = await db
        .collection("counties")
        .doc(doc.id)
        .collection("measures");
      const measure = await measures.get();
      const countyMeasures = [];
      await measure.forEach((doc) => {
        countyMeasures.push({
          applies: doc.data().applies,
          subject: doc.data().subject,
          desc: doc.data().desc,
        });
      });
      this.policies[1] = countyMeasures;
    });

    const cities = db.collection("cities");
    documents = await cities.get();
    documents.forEach(async (doc) => {
      const city = cities.doc(doc.id);
      const resolutions = await db
        .collection("cities")
        .doc(doc.id)
        .collection("resolutions");
      const resolution = await resolutions.get();
      const cityResolution = [];
      await resolution.forEach((doc) => {
        cityResolution.push({
          name: doc.data().name,
          number: doc.data().number,
          url: doc.data().url,
        });
      });
      this.policies[2] = cityResolution;
    });
  },
  computed: {
    users() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      tabs: 0,
      policies: {
        0: [],
        1: [],
        2: [],
      },
    };
  },

  methods: {
    async logout() {
      await auth.signOut();
      location.href = "/";
    },
    async getData() {
      const states = await db.collections("states").get();
      console.log("Hi");
    },
  },
};
</script>

  <!-- <div>
    <h1>Hi</h1>
    <a @click = "logout">Logout</a>
  </div> -->

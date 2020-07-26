<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" md="12">
        <material-card v-if="visible.includes('State Officials') || visible.includes('County Officials') || visible.includes('City Officials')" color="primary" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Government Officials</div>

            <div class="subtitle-1 font-weight-light">As of July 2020</div>
            <v-tabs v-model="officialsTab" background-color="transparent" slider-color="white" color="light">
              <!-- <span class="subheading font-weight-light mx-3" style="align-self: center">Tasks:</span> -->
              <v-tab v-if="visible.includes('State Officials')" class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>State Officials
              </v-tab>
              <v-tab v-if="visible.includes('County Officials')" class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>County Officials
              </v-tab>
              <v-tab v-if="visible.includes('City Officials')" class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>City Officials
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="officialsTab" class="transparent">
            <v-tab-item v-if="visible.includes('State Officials')">
              <v-card-text>
                <template v-for="(official, i) in officials[0][0]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-list-item-title class="text-wrap headline mb-1">{{official.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{official.party}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn :href="official.website" text raised>View Website</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
              <v-card-text>
                <template v-for="(official, i) in officials[0][1]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="overline mb-4">{{official.district}}</div>
                            <v-list-item-title class="text-wrap headline mb-1">{{official.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{official.party}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn :href="official.website" text raised>View Website</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
            <v-tab-item v-if="visible.includes('County Officials')">
              <v-card-text>
                <template v-for="(official, i) in officials[1]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-list-item-title class="text-wrap headline mb-1">{{official.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{official.position}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn :href="official.website" text raised>View Website</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>
            </v-tab-item>
            <v-tab-item v-if="visible.includes('City Officials')">
              <v-card-text>
                <template v-for="(official, i) in officials[2]">
                  <v-row :key="i" align="center">
                    <v-col cols="12">
                      <v-card class="mx-auto">
                        <v-list-item two-line>
                          <v-list-item-content>
                            <v-list-item-title class="text-wrap headline mb-1">{{official.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{official.position}}</v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                        </v-list-item>

                        <v-card-actions>
                          <v-btn :href="official.website" text raised>View Website</v-btn>
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

      <v-col cols="12" md="12">
        <material-card v-if="visible.includes('State Propositions') || visible.includes('County Measures') || visible.includes('City Resolutions')" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">Policies</div>

            <div class="subtitle-1 font-weight-light">As of July 2020</div>
            <v-tabs v-model="policiesTab" background-color="transparent" slider-color="white" color="light">
              <!-- <span class="subheading font-weight-light mx-3" style="align-self: center">Tasks:</span> -->
              <v-tab v-if="visible.includes('State Propositions')" class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>State Props
              </v-tab>
              <v-tab v-if="visible.includes('County Measures')" class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>County Measures
              </v-tab>
              <v-tab v-if="visible.includes('City Resolutions')" class="mr-3">
                <v-icon class="mr-2">mdi-cloud</v-icon>City Resolutions
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="policiesTab" class="transparent">
            <v-tab-item v-if="visible.includes('State Propositions')">
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
            <v-tab-item v-if="visible.includes('County Measures')">
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
            <v-tab-item v-if="visible.includes('City Resolutions')">
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

      const officials = await db
        .collection("states")
        .doc(doc.id)
        .collection("officials");
      const official = await officials.get();
      const stateReps = []
      const stateSens = []
      await official.forEach(async (doc) => {
        const representatives = await officials.doc(doc.id).collection("representatives")
        const reps = await representatives.get()
        await reps.forEach(async (doc) => {
          stateReps.push({
            name: doc.data().name,
            district: doc.data().district,
            party: doc.data().party,
            website: doc.data().website,
          });
        });

        const senators = await officials.doc(doc.id).collection("senators")
        const sens = await senators.get()
        await sens.forEach(async (doc) => {
          stateSens.push({
            name: doc.data().name,
            party: doc.data().party,
            website: doc.data().website,
          });
        });
      });
      this.officials[0][0] = stateSens
      this.officials[0][1] = stateReps
    });

    const counties = db.collection("counties");
    documents = await counties.get();
    documents.forEach(async (doc) => {
      const county = counties.doc(doc.id);
      // Retrieving Measures
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

      const officials = await db
        .collection("counties")
        .doc(doc.id)
        .collection("officials");
      const official = await officials.get();
      const countyOfficials = [];
      await official.forEach((doc) => {
        countyOfficials.push({
          name: doc.data().name,
          position: doc.data().position,
          website: doc.data().website,
        });
      });
      this.officials[1] = countyOfficials;
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

      const officials = await db
        .collection("cities")
        .doc(doc.id)
        .collection("officials");
      const official = await officials.get();
      const cityOfficials = [];
      await official.forEach((doc) => {
        cityOfficials.push({
          name: doc.data().name,
          position: doc.data().position,
          website: doc.data().website,
        });
      });
      this.officials[2] = cityOfficials;

    });

    var uid = this.$store.state.users.user.uid
    const users = db.collection("users").doc(uid)
    const user = await users.get()
    this.visible = user.data().settings
  },
  data() {
    return {
      officialsTab: 0,
      officials: {
        0: {
          0: [],
          1: []
        },
        1: [],
        2: []
      },
      policiesTab: 0,
      policies: {
        0: [],
        1: [],
        2: [],
      },
      visible: []
    };
  },

  methods: {
    async logout() {
      await auth.signOut();
      location.href = "/";
    },
  },
};
</script>

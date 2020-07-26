<template>
  <v-container
    id="panels"
    fluid
    tag="section"
  >
    <v-component
      heading="Tabs"
      link="components/tabs"
    />

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card class="my-0">
          <v-card-text>
            <base-subheading
              subheading="Navigation Pills"
              text="Horizontal Tabs"
            />

            <material-tabs color="warning">
              <v-tab
                v-for="(tab, i) in tabs"
                :key="i"
              >
                {{ tab }}
              </v-tab>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text>
                    <p>
                      Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <p>
                      Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <div>This is very nice.</div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text>
                    <p>
                      Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                    </p>

                    <div>
                      Dramatically maintain clicks-and-mortar solutions without functional solutions.
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text>
                    <p>
                      Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                    </p>

                    <div>
                      Dynamically innovate resource-leveling customer service for state of the art customer service.
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </material-tabs>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-card class="mt-0">
          <v-card-text>
            <subheading
              subheading="Navigation Pills"
              text="Vertical Tabs"
            />

            <material-tabs
              color="success"
              vertical
            >
              <v-tab
                v-for="(tab, i) in tabs"
                :key="i"
                class="mb-1"
              >
                {{ tab }}
              </v-tab>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text class="pt-0">
                    <p>
                      Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <p>
                      Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <div>This is very nice.</div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text class="pt-0">
                    <p>
                      Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                    </p>

                    <div>
                      Dramatically maintain clicks-and-mortar solutions without functional solutions.
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text class="pt-0">
                    <p>
                      Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                    </p>

                    <div>
                      Dynamically innovate resource-leveling customer service for state of the art customer service.
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </material-tabs>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        class="mb-12"
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-text>
            <subheading
              subheading="Navigation Pills"
              text="Vertical Tabs"
            />

            <material-tabs
              color="success"
              icons-and-text
              vertical
            >
              <v-tab
                v-for="(tab, i) in tabs2"
                :key="i"
                class="mb-5"
              >
                {{ tab.text }}
                <v-icon v-text="tab.icon" />
              </v-tab>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text class="pt-0">
                    <p>
                      Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <p>
                      Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </p>

                    <div>
                      Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card
                  flat
                  class="my-0"
                >
                  <v-card-text class="pt-0">
                    <p>
                      Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                    </p>

                    <div>
                      Dramatically maintain clicks-and-mortar solutions without functional solutions.
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </material-tabs>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        class="mx-auto"
        cols="12"
        md="8"
      >
        <div class="text-center headline font-weight-light mb-12 pl-0">
          Page Subcategories
        </div>

        <material-tabs
          v-model="tab"
          background-color="transparent"
          centered
          color="warning"
          icons-and-text
        >
          <v-tab
            v-for="(tab, i) in tabs3"
            :key="i"
          >
            {{ tab.text }}
            <v-icon v-text="tab.icon" />
          </v-tab>

          <v-tabs-items
            v-model="tab"
            class="pt-12 transparent"
          >
            <v-tab-item>
              <v-card class="mt-0 px-5">
                <v-card-text>
                  <subheading subheading="Description about product">
                    <p class="grey--text body-2 font-weight-light">
                      More Information here
                    </p>
                  </subheading>

                  <p>
                    Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                  </p>

                  <div>
                    Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="mt-0 px-5">
                <v-card-text>
                  <subheading subheading="Location of the product product">
                    <p class="grey--text body-2 font-weight-light">
                      More Information here
                    </p>
                  </subheading>

                  <p>
                    Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                  </p>

                  <div>
                    Dramatically maintain clicks-and-mortar solutions without functional solutions
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="mt-0 px-5">
                <v-card-text>
                  <subheading subheading="Legal info of the product product">
                    <p class="grey--text body-2 font-weight-light">
                      More Information here
                    </p>
                  </subheading>

                  <p>
                    Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                  </p>

                  <div>
                    Dynamically innovate resource-leveling customer service for state of the art customer service.
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card class="mt-0 px-5">
                <v-card-text>
                  <subheading heading="Help center">
                    <p class="grey--text body-2 font-weight-light">
                      More Information here
                    </p>
                  </subheading>

                  <p>
                    From the seamless transition of glass and metal to the streamlined profile, every detail was carefully considered to enhance your experience. So while its display is larger, the phone feels just right.
                  </p>

                  <div>
                    Another Text. The first thing you notice when you hold the phone is how great it feels in your hand. The cover glass curves down around the sides to meet the anodized aluminum enclosure in a remarkable, simplified design.
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </material-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardPanels',

    data: () => ({
      tab: 0,
      tabs: [
        'Profile',
        'Settings',
        'Options',
      ],
      tabs2: [
        {
          text: 'Home',
          icon: 'mdi-view-dashboard',
        },
        {
          text: 'Settings',
          icon: 'mdi-clock-outline',
        },
      ],
      tabs3: [
        {
          text: 'Description',
          icon: 'mdi-information',
        },
        {
          text: 'Location',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Legal Info',
          icon: 'mdi-gavel',
        },
        {
          text: 'Help Center',
          icon: 'mdi-help-circle-outline',
        },
      ],
    }),
  }
</script>

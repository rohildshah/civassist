<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="12"
      >
        <material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Profile
            </div>

            <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Email Address"
                    :value="email"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="First Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Last Name"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-container fluid>
                    <v-switch v-model="settings" label="State Propositions" value="State Propositions"></v-switch>
                    <v-switch v-model="settings" label="County Measures" value="County Measures"></v-switch>
                    <v-switch v-model="settings" label="City Resolutions" value="City Resolutions"></v-switch>
                  </v-container>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-container fluid>
                    <v-switch v-model="settings" label="State Officials" value="State Officials"></v-switch>
                    <v-switch v-model="settings" label="County Officials" value="County Officials"></v-switch>
                    <v-switch v-model="settings" label="City Officials" value="City Officials"></v-switch>
                  </v-container>
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted: function() {
    this.email = this.$store.state.users.user.email
  },
  data() {
    return {
      email: null,
      settings: []
    }
  }
}
</script>

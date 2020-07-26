<template>
  <v-container
    id="google-maps"
    fluid
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <material-card
          color="primary"
          title="California"
          text="State Election Voting Coming Soon..."
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509916.957423575!2d-123.79759793610344!3d37.18430344877116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia!5e0!3m2!1sen!2sus!4v1595739948869!5m2!1sen!2sus"
                width="100%"
                height="450"
                frameborder="0"
                style="border:0"
                allowfullscreen
              />
            </v-sheet>
          </v-card-text>
        </material-card>
      </v-col>

      <v-col
        cols="12"
        md="12"
      >
        <material-card
          color="primary"
          title="Cupertino"
          text="City Election Voting Coming Soon..."
          class="px-5 py-3"
        >
          <v-card-text class="px-0 pb-0">
            <v-sheet>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50774.42608332118!2d-122.07866393487043!3d37.30931305932501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb4571bd377ab%3A0x394d3fe1a3e178b4!2sCupertino%2C%20CA!5e0!3m2!1sen!2sus!4v1595740373704!5m2!1sen!2sus"
                width="100%"
                height="450"
                frameborder="0"
                style="border:0"
                allowfullscreen
              />
            </v-sheet>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>

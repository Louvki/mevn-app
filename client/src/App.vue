<template>
  <v-app>
    <NavBar />
    <v-content class="mx-4 mb-4">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

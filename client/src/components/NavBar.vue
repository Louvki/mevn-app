<template>
  <v-toolbar app flat>
    <v-spacer></v-spacer>
    <LoginPopup v-if="!loggedIn" />
    <RegisterPopup v-if="!loggedIn" />

    <v-btn flat color="grey" v-if="loggedIn" v-on:click="logout">
      <span>Sign Out</span>
      <v-icon right>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>


<script>
import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

export default {
  components: { LoginPopup, RegisterPopup },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>
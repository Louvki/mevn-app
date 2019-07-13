<template>
  <div class="nav">
    <nav v-if="!loggedIn">
      <router-link :to="{ name: 'login' }">Login</router-link>
      <span> | </span>
      <router-link :to="{ name: 'register' }">Register</router-link>
    </nav>

    <nav v-if="loggedIn">
      <p v-on:click="logout">Logout</p>
    </nav>

  </div>
</template>

<script>
export default {
    methods: {
    logout() {
          const { dispatch } = this.$store;
        dispatch("auth/logout");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>

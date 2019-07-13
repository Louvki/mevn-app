<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
        <div v-show="submitted && !email" class="invalid-feedback">
          Email is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loggingIn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    loggingIn() {
      return this.$store.state.auth.status.loggingIn;
    }
  },
  created() {
    this.$store.dispatch("auth/logout");
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      const { email, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
        dispatch("auth/login", { email, password });
        this.email = "";
        this.password = ""
        this.submitted = false;
      }
    }
  }
};
</script>
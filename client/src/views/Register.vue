<template>
  <form @submit.prevent="register">
    <div class="form-group">
      <label for="firstName">First name</label>
      <input type="text" v-model="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && !firstName }" />
      <div v-show="submitted && !firstName" class="invalid-feedback">
        First name is required
      </div>
    </div>

    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input type="text" v-model="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && !lastName }" />
      <div v-show="submitted && !lastName" class="invalid-feedback">
        Last name is required
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
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
      <button class="btn btn-primary" :disabled="loggingIn">Register</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      submitted: false
    };
  },
  methods: {
    register() {
      this.submitted = true;
      const { firstName, lastName, email, password } = this;
      const { dispatch } = this.$store;
      if (firstName && lastName && email && password) {
        dispatch("auth/register", { email, password });
      }
    }
  }
};
</script>

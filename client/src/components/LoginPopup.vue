<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Login</v-btn>
    <v-card>
      <v-card-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="email" label="E-mail" prepend-icon="email" :rules="emailRules"></v-text-field>
          <v-text-field :type="'password'" v-model="password" label="Password" prepend-icon="vpn_key" :rules="passwordRules"></v-text-field>
          <v-spacer></v-spacer>
          <span>{{errMessage}}</span>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      errMessage: "",
      loading: false,
      dialog: false
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$refs.form.reset();
        this.errMessage = "";
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { email, password } = this;
        this.$store
          .dispatch("auth/login", { email, password })
          .then(() => {
            this.dialog = false;
            this.loading = false;
          })
          .catch(err => {
            this.errMessage = err.message;
            this.loading = false;
          });
      }
    }
  }
};
</script>

<template>
    <v-form v-if="tab === ą" class="px-3" ref="inviteForm">
      <v-spacer></v-spacer>
      <span>{{errMessage}}</span>
      <v-spacer></v-spacer>
      <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Submit</v-btn>
    </v-form>
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
      errMessage: "",
      loading: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { firstName, lastName, email, password } = this.this.$store
          .dispatch("auth/register", { firstName, lastName, email, password })
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
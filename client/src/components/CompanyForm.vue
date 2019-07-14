<template>
  <v-form class="px-3" ref="form">
    <v-text-field v-model="company.name" label="Name" :rules="normalRules"></v-text-field>
    <v-text-field v-model="company.address" label="Address" :rules="normalRules"></v-text-field>
    <v-text-field v-model="company.city" label="City" :rules="normalRules"></v-text-field>
    <v-text-field v-model="company.country" label="Country" :rules="normalRules"></v-text-field>
    <v-text-field v-model="company.email" label="E-mail" :rules="emailRules"></v-text-field>
    <v-text-field v-model="company.phone" label="Phone"></v-text-field>
    <v-spacer></v-spacer>

    <div class="button-group">
      <p>{{errMessage}}</p>
      <p v-if="!loggedIn">You need to be logged in to edit the company</p>
      <v-btn flat @click="saveCompany" class="success mx-3 mt-3" :loading="loading" :disabled="!loggedIn">{{company._id === 'new' ? 'Add' : 'Update' }}</v-btn>
      <v-btn flat @click="deleteCompany" class="error mx-3 mt-3" :loading="loading" :disabled="deleteDisabled || !loggedIn">Delete</v-btn>
    </div>
  </v-form>
</template>

<script>
import router from "../router";

export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      normalRules: [v => !!v || "This field is required"],
      emailRules: [
        v => {
          v = !v ? "" : v;
          // eslint-disable-next-line
          return /[^@]+@[^\.]+\..+|(^$)/.test(v) || `E-mail must be valid`;
        }
      ],
      loggedIn: this.$store.state.auth.status.loggedIn,
      deleteDisabled: this.company._id === "new",
      loading: false,
      errMessage: ""
    };
  },
  methods: {
    saveCompany() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("company/saveCompany", this.company)
          .then(() => {
            this.loading = false;
            this.errMessage = "";
            router.push("/");
          })
          .catch(err => {
            this.errMessage = err.message;
            this.loading = false;
          });
      }
    },
    deleteCompany() {
      this.$store
        .dispatch("company/deleteCompany", this.company._id)
        .then(() => {
          this.loading = false;
          this.errMessage = "";
          router.push("/");
        })
        .catch(err => {
          this.errMessage = err.message;
          this.loading = false;
        });
    },
  }
};
</script>

<style scoped>
.button-group {
  text-align: center;
  margin-bottom: 5px;
}
</style>
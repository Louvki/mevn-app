<template>
    <v-form class="px-3" ref="form">
      <v-text-field v-model="company.name" label="Name" :rules="normalRules"></v-text-field>
      <v-text-field v-model="company.address" label="Address" :rules="normalRules"></v-text-field>
      <v-text-field v-model="company.city" label="City" :rules="normalRules"></v-text-field>
      <v-text-field v-model="company.country" label="Country" :rules="normalRules"></v-text-field>
      <v-text-field v-model="company.email" label="E-mail" :rules="emailRules"></v-text-field>
      <v-text-field v-model="company.phone" label="Phone"></v-text-field>
      <v-spacer></v-spacer>
      <span>{{errMessage}}</span>
      <v-spacer></v-spacer>
      <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Submit</v-btn>
    </v-form>
</template>

<script>
// import router from "../router";

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
      emailRules: [v => /[^@]+@[^\.]+\..+|(^$)/.test(v) || `E-mail must be valid`],
      errMessage: "",
      loading: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { name, address, city, country, email, phone } = this;
        const company = { name, address, city, country, email, phone };
        this.$store
          .dispatch("auth/company/saveCompany", company)
          .then(() => {
            this.loading = false;
            // this.router.push("/");
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
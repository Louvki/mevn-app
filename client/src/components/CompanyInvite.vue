<template>
  <div>
    <v-form class="px-3" ref="form">
      <v-text-field v-model="email" label="E-mail" :rules="emailRules"></v-text-field>

      <div class="button-group">
        <p>{{errMessage}}</p>
        <p v-if="!loggedIn">You need to be logged in to add beneficial owners</p>
        <p v-if="companyId === 'new'">You need create the company before you can add beneficial owners</p>
        <v-btn flat @click="addBeneficialOwner" class="success mx-3 mt-3" :loading="loading" :disabled="!loggedIn || companyId === 'new'">Invite</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        // eslint-disable-next-line
        v => /[^@]+@[^\.]+\..+/.test(v) || "E-mail must be valid"
      ],
      loggedIn: this.$store.state.auth.status.loggedIn,
      companyId: this.$store.state.company.company._id,
      errMessage: "",
      loading: false
    };
  },
  methods: {
    addBeneficialOwner() {
      if (this.companyId === "new") {
        return;
      }
      
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { email, companyId } = this;
        this.$store
          .dispatch("company/addBeneficialOwner", { email, id: companyId })
          .then(() => {
            this.$refs.form.reset();
            this.errMessage = "User invited!";
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

<style scoped>
.button-group {
  text-align: center;
  margin-bottom: 5px;
}
</style>
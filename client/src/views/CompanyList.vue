<template>
  <div>
    <h1>Companies</h1>
    <CompanyCard v-for="company in companies" :key="company.id" :company="company" />
    <router-link :to="{ name: 'company-details', params: {id: 'new'} }">
      <v-btn absolute dark fab bottom right color="pink">
        <v-icon>add</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import CompanyCard from "../components/CompanyCard.vue";

export default {
  components: {
    CompanyCard
  },
  created() {
    this.$store.dispatch("company/fetchCompanies");
  },
  computed: {
    companies() {
      return this.$store.state.company.companies;
    }
  }
};
</script>

<style scoped>
.v-btn {
  margin: 5vw;
}
</style>

<template>
  <div>
    <h1>Companies</h1>
    <CompanyCard v-for="company in companies" :key="company.id" :company="company" />
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
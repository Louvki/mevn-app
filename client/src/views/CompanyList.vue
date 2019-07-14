<template>
  <div>
    <!-- Title -->
    <h1>
      <router-link :to="{ name: 'company-details', params: {id: 'new'} }">
        <v-btn class="success">
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
      Company list
    </h1>
    <br>
    <!-- Company list -->
    <v-card flat v-for="company in companies" :key="company._id" :to="{ name: 'company-details', params: { id: company._id } }">
      <v-layout row wrap :class="'pa-3'">
        <v-flex xs12 md6>
          <div class="caption grey--text">Company name</div>
          <div>{{ company.name }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Address</div>
          <div>{{ company.country }} {{company.city}} {{company.address}}</div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("company/getCompanies");
  },
  data() {
    return {
      companies: this.$store.state.company.companies
    };
  }
};
</script>



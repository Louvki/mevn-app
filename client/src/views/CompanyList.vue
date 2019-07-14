<template>
  <div>
    <h1>Company list <router-link :to="{ name: 'company-details', params: {id: 'new'} }">
        <v-btn class="success">
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
    </h1>
    <br>
    <v-card flat v-for="company in companies" :key="company._id" :to="{ name: 'company-details', params: { id: company._id } }">
      <v-layout row wrap :class="'pa-3'">
        <v-flex xs12 md6>
          <div class="caption grey--text">Company name</div>
          <div>{{ company.name }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="caption grey--text">Address</div>
          <div>{{ company.country }} {{company.city}}</div>
        </v-flex>
        <v-flex xs2 sm4 md2>
          <div class="right">
          </div>
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
  computed: {
    companies() {
      return this.$store.state.company.companies;
    }
  }
};
</script>



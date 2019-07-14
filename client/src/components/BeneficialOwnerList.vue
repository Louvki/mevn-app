<template>
  <div>
    <h1 v-if="beneficialOwners.length">Beneficial Owner List</h1>
    <v-card flat v-for="owner in beneficialOwners" :key="owner.firstName + owner.lastName">
      <v-layout row wrap :class="'pa-3'">
        <v-flex xs12 md6>
          <div>{{ owner.firstName }} {{ owner.lastName }}</div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      beneficialOwners: this.$store.state.company.beneficialOwners
    };
  }
};
</script>
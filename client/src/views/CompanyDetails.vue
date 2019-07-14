<template>
  <div>
    <!-- Title -->
    <h1>
      <router-link :to="{ name: 'company-list' }">
        <v-btn class="info">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </router-link>
      {{company.name ? company.name : 'Add company'}}
    </h1>
    <br>
    <!-- Tabs -->
    <v-tabs v-model="tab" grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab>Details</v-tab>
      <v-tab>Beneficial owners</v-tab>
    </v-tabs>
    <!-- Form -->
    <v-card>
      <br>
      <CompanyForm v-if="tab === 0" v-bind:company="company" />
      <CompanyInvite v-if="tab === 1" v-bind:companyId="company._id" />
    </v-card>

    <BeneficialOwnerList v-if="tab === 1" />

  </div>
</template>

<script>
import CompanyForm from "../components/CompanyForm";
import CompanyInvite from "../components/CompanyInvite";
import BeneficialOwnerList from "../components/BeneficialOwnerList";

export default {
  created() {
    this.$store.dispatch("company/getBeneficialOwners", this.company._id);
  },
  components: {
    CompanyForm,
    CompanyInvite,
    BeneficialOwnerList
  },
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: null
    };
  }
};
</script>
<template>
  <div>
    <v-tabs v-model="tab" color="cyan" grow>
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>
        Details
      </v-tab>
      <v-tab>
        Beneficial owners
      </v-tab>
    </v-tabs>

    <CompanyForm v-if="tab === 0" v-bind:company="company" />
    <CompanyInvite v-if="tab === 1" />

  </div>
</template>

<script>
import CompanyForm from "../components/CompanyForm";
import CompanyInvite from "../components/CompanyInvite";

export default {
    components: {
    CompanyForm,
    CompanyInvite
  },
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>
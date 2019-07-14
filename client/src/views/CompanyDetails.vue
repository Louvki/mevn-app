<template>
  <div>
    <h1>{{company.name ? company.name : 'Add company'}}
      <router-link :to="{ name: 'company-list' }">
        <v-btn class="info">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </router-link>
    </h1>
    <br>
    <v-tabs v-model="tab" grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab>
        Details
      </v-tab>
      <v-tab>
        Beneficial owners
      </v-tab>
    </v-tabs>
    <v-card>
      <br>
      <CompanyForm v-if="tab === 0" v-bind:company="company" />
      <CompanyInvite v-if="tab === 1" />
    </v-card>
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
      direction: "top",
      fab: true,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition"
    };
  },

  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  },

  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    }
  }
};
</script>

<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
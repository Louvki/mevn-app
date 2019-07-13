<template>
  <router-link class="company-link" :to="{ name: 'company-details', params: { id: company.id } }">
    <div class="company-card -shadow">
      <h1 class="title">{{ company.name }}</h1>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    company: Object
  }
};
</script>

<style scoped>
.company-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.company-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.company-card > .title {
  margin: 0;
}

.company-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>

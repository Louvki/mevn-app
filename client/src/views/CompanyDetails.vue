<template>
  <form @submit.prevent="register">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" v-model="company.name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !company.name }" />
      <div v-show="submitted && !name" class="invalid-feedback">
        Name is required
      </div>
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input type="text" v-model="company.address" name="address" class="form-control" :class="{ 'is-invalid': submitted && !company.address }" />
      <div v-show="submitted && !address" class="invalid-feedback">
        Address is required
      </div>
    </div>

    <div class="form-group">
      <label for="city">City</label>
      <input type="text" v-model="company.city" name="city" class="form-control" :class="{ 'is-invalid': submitted && !company.city }" />
      <div v-show="submitted && !city" class="invalid-feedback">
        City is required
      </div>
    </div>

    <div class="form-group">
      <label for="country">Country</label>
      <input type="text" v-model="company.country" name="country" class="form-control" :class="{ 'is-invalid': submitted && !company.country }" />
      <div v-show="submitted && !country" class="invalid-feedback">
        Country is required
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" v-model="company.email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !company.email }" />
      <div v-show="submitted && !email" class="invalid-feedback">
        Email is required
      </div>
    </div>

    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="phone" v-model="company.phone" name="phone" class="form-control" :class="{ 'is-invalid': submitted && !company.phone }" />
      <div v-show="submitted && !phone" class="invalid-feedback">
        Phone is required
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      submitted: false
    };
  }
};
</script>
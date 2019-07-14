    <template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Register</v-btn>
    <v-card>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="firstName" label="First name" :rules="nameRules"></v-text-field>
          <v-text-field v-model="lastName" label="Last name" :rules="nameRules"></v-text-field>
          <v-text-field v-model="email" label="E-mail" :rules="emailRules"></v-text-field>
          <v-text-field :type="'password'" v-model="password" label="Password" :rules="passwordRules"></v-text-field>
          <v-spacer></v-spacer>
          <span>{{errMessage}}</span>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      nameRules: [v => !!v || "This field is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        // eslint-disable-next-line
        v => /[^@]+@[^\.]+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required.",
        v => (v && v.length >= 6) || "Min 6 characters"
      ],
      errMessage: "",
      loading: false,
      dialog: false
    };
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$refs.form.reset();
        this.loading = false;
        this.errMessage = "";
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const { firstName, lastName, email, password } = this;

        this.$store
          .dispatch("auth/register", { firstName, lastName, email, password })
          .then(() => {
            this.dialog = false;
            this.loading = false;
          })
          .catch(err => {
            this.errMessage = err.message;
            this.loading = false;
          });
      }
    }
  }
};
</script>

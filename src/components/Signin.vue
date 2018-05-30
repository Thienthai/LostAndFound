<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-card height="430px">
        <v-card-title>
          <span class="headline">Sign In</span>
        </v-card-title>
        <v-card-text>
        <form @submit.prevent="userSignIn">
          <v-layout wrap column>
            <v-flex>
              <v-alert type="error" dismissible v-model="alert">
                {{ error }}
              </v-alert>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                name="password"
                label="Passwords"
                id="password"
                type="password"
                v-model="password"
                required></v-text-field>
            </v-flex>
            <small style="color:Tomato;">*admin mode Username: admin@mail.com Pasword: 123456</small>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    userSignIn () {
      this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
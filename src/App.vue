<template>
  <v-app dark>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in sidebarItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="blue-grey darken-4" dark>
      <v-toolbar-side-icon v-if="this.isAuthenticated === true" @click="sidebar = !sidebar"></v-toolbar-side-icon>
      <v-toolbar-side-icon v-else v-bind:style="{ display: 'none' }"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sidebar: false
      }
    },
    computed: {
      appTitle () {
        return this.$store.state.appTitle
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      },
      menuItems () {
        if (this.isAuthenticated) {
          return [
            { title: 'Home', path: '/home', icon: 'home' }
          ]
        } else {
          return [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
        }
      },
      sidebarItems () {
        if (this.isAuthenticated) {
          if (this.$store.state.user.email === 'admin@mail.com') {
            return [
              {
                title: 'Home',
                path: '/home',
                icon: 'home'
              },
              {
                title: 'Post',
                path: '/post',
                icon: 'assignment'
              }
            ]
          } else {
            return [
              {
                title: 'Home',
                path: '/home',
                icon: 'home'
              },
              {
                title: 'Post',
                path: '/post',
                icon: 'assignment'
              },
              {
                title: 'My Post',
                path: '/mypost',
                icon: 'assignment_ind'
              }
            ]
          }
        }
      }
    },
    methods: {
      userSignOut () {
        this.$store.dispatch('userSignOut')
      }
    }
  }
</script>

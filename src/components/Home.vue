<template>
  <v-container fluid v-if="user === 'surkessone@gmail.com'">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a admin's home page.</p>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
      <v-card>
<!--         <v-card-media src="/static/material.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-flex>
    </v-layout>
  </v-container>
    <v-container fluid v-else>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page.</p>
      </v-flex>
      <v-flex xs12>
      <div v-for="item in forgot">
      <v-card>
        <v-flex xs4>
        </v-card-media>
        <img :src="item.pic" alt="Mountain View">
        </v-flex>
        <div>
        <h1 class="text-xs-center" >Name: {{ item.name }}</h1>
        <p>Brand: {{ item.brand }}</p>
        <p>Found at: {{ item.found }}</p>
        <p>Date: {{ item.date }}</p>
        </div>
        <v-btn color="info">Info</v-btn>
<!--         <v-card-media src="/static/material.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions> -->
      </v-card>
        <br />
      </div>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      user: this.$store.state.user.email,
      forgot: [
        {
          pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVn5eI--6z_C1Q64tLwSZ0rdGEyynUQMgWChFwOD8ADe1kW3K',
          name: 'Mobile',
          brand: 'Iphone',
          found: '1404',
          date: '04/04/2018'
        },
        {
          pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVn5eI--6z_C1Q64tLwSZ0rdGEyynUQMgWChFwOD8ADe1kW3K',
          name: 'Umbrellases',
          brand: 'Unknown',
          found: '1404',
          date: '04/04/2018'
        },
        {
          pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVn5eI--6z_C1Q64tLwSZ0rdGEyynUQMgWChFwOD8ADe1kW3K',
          name: 'Charger',
          brand: 'USBC',
          found: '1404',
          date: '04/04/2018'
        }
      ]
    }
  },
  computed: {
    test () {
      return this.$store.state.user.email
    }
  }
}
</script>

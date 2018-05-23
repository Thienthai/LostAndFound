<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-25>
        <h1>Post</h1>
        <br />
      </v-flex>
      <v-flex xs10 offset-xs1 mt-25>
        <div v-for="item in itemPost">
        <v-card>
            <v-container fluid>
                <v-layout row wrap v-bind="binding">
                  <v-flex xs8>
                    <div class="headline">
                      {{ item.name }}
                    </div>
                    <span style="font-size: 18px;">{{ item.brand }}</span>
                    <div>
                      <span style="font-weight:bold">Lost at:</span> {{ item.found }}  <span style="font-weight:bold">Date:</span>  {{ item.date }}  <span style="font-weight:bold">Status:</span> {{ item.status }}
                    </div>
                    <div>
                      <span style="font-weight:bold">Phone:</span> {{ item.phone }} 
                      <span style="font-weight:bold">Line:</span> {{ item.line}}
                    </div>
                  <v-card-actions>
                    <v-btn  @click.stop="item.dialog = true" flat color="blue">more info</v-btn>
                  </v-card-actions>
                  </v-flex>
                      <v-dialog v-model="item.dialog" max-width="500px">
                        <v-card>
                            <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
                            <v-carousel-item v-for="(items,i) in item.pic" :src="items.src" :key="i"></v-carousel-item>
                          </v-carousel>
                          <v-card-title>
          <div>
            <h3 class="headline mb-0">Description</h3>
            <div>{{ item.description }}</div>
          </div>
                            <v-spacer></v-spacer>
                          </v-card-title>
                          <v-card-actions>
                            <v-btn color="primary" flat @click.stop="item.dialog=false">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-container>
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
        db: this.$store.state.db,
        auth: this.$store.state.auth,
        dialog3: false,
        items: [
          {
            src: 'https://images4.alphacoders.com/876/thumb-1920-876898.jpg'
          },
          {
            src: 'http://hdwarena.com/wp-content/uploads/2017/04/Beautiful-Wallpaper.jpg'
          },
          {
            src: 'https://images7.alphacoders.com/411/thumb-1920-411820.jpg'
          }
        ],
        itemPost: []
      }
    },
    computed: {
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    },
    created () {
      var db = this.db
      var auth = this.auth
      db.ref('post').on('child_added', snapshot => {
        db.ref('post/' + snapshot.key).on('child_added', snapshot => {
             this.itemPost.push(snapshot.val())
        })
      })
    }
  }
</script>

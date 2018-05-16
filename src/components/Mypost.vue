<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-25>
        <h1>Mypost</h1>
        <br />
      </v-flex>
       <!-- mypost item list -->
      <v-flex xs10 offset-xs1 mt-25>
      <div v-for="item in itemPost" v-if="item.email === user">
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
                  </v-flex>
                <v-card-actions>
                  <v-btn  @click.stop="item.dialog = true" flat color="blue">more info</v-btn>
                  <v-btn  @click.stop="item.dialog = true" flat color="red">delete</v-btn>
                </v-card-actions>
                      <v-dialog v-model="item.dialog" max-width="500px">
                        <v-card>
                            <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
                            <v-carousel-item v-for="(items,i) in item.pic" :src="items.src" :key="i"></v-carousel-item>
                          </v-carousel>
                          <v-card-title>
                            <span class="headline">Description</span>
                            <span class="body-2">
                              {{ item.description }}
                            </span>
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
        <!-- mypost item list -->
        <v-container>
          <v-layout>
          <v-flex xs1 offset-xs5>
          <v-btn @click.stop="dialog=true" class="ml-7" fab dark color="pink">
            <v-icon dark>add</v-icon>
          </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-flex>
      <!-- the form to post -->
      <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Post Information</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Brand"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Found At"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Line"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Phone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm3>
                                  <v-text-field :mask="mask" label="Date" hint="example: 04/04/2018" persistent-hint></v-text-field
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
                  :counter="50"
                  v-model="description"
                  label="Description"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*provide information as much as possible</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- the form to post -->
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        itemPost: this.$store.state.post,
        user: this.$store.state.user.email,
        dialog: false,
        mask: '##/##/####'
      }
    }
  }
</script>
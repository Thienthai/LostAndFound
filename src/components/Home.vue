<template>
  <!--  admin content -->
  <v-container fluid v-if="user === 'admin@mail.com'">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a admin's home page.</p>
      </v-flex>
      <v-flex xs12>
      <v-container grid-list-xl fluid>
            <v-layout row wrap>
              <v-flex
                v-for="item in info"
                xs4
              >
              <v-card tile>
                <v-card-media :src="picTest(item)" height="150px">
                </v-card-media>
                  <v-card-title primary-title>
                    <div class="headline">
                      {{item.name}}
                    </div>
                  </v-card-title>
                  <v-divider></v-divider>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content>Brand:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ item.brand }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Found</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ item.found }}</v-list-tile-content>
                      </v-list-tile>
                       <v-list-tile>
                        <v-list-tile-content>Date</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ item.date }}</v-list-tile-content>
                      </v-list-tile>
                      </v-list>
                      <v-divider></v-divider>
                    <v-card-actions>
                  <v-btn @click="dialog2=true" dark color="blue">MORE PICTURE</v-btn>
                  <v-btn @click="remove(item.path)" dark color="red">DELETE</v-btn>
                </v-card-actions>

                             <!--  dialog moreinfo -->
                      <v-dialog v-model="dialog2" max-width="500px">
                                          <v-card>
                                              <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
                                              <v-carousel-item v-for="(items,i) in item.pic" :src="items.src" :key="i"></v-carousel-item>
                                            </v-carousel>
                                            <v-card-actions>
                                              <v-btn color="primary" flat @click="dialog2=false">Close</v-btn>
                                            </v-card-actions>
                                          </v-card>
                      </v-dialog>
                      <!--  dialog moreinfo -->

                    </v-card>
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
          <v-container>
            <v-layout wrap>
              <form v-model="valid" ref="form"lazy-validation>
              <v-flex xs12>
                  <v-text-field
                    v-model="name"
                    label="Name"
                    required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                   <v-text-field
                    v-model="brand"
                    label="Brand"
                    required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                   <v-text-field
                    v-model="found"
                    label="Found At"
                    required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                   <v-text-field
                    v-model="date"
                    label="Date"
                    required
                  ></v-text-field>
              </v-flex>
              <small>Upload pictures maximum 3</small>
              <v-spacer></v-spacer>
              <input type="file" @change="onFileChange" id="fileButton1" />
              <input type="file" @change="onFileChange" id="fileButton2" />
              <input type="file" @change="onFileChange" id="fileButton3" />
                <v-spacer></v-spacer>
                <br/>
              <div>
                <v-btn color="blue darken-1" flat @click="Submit">Submit</v-btn>
                <v-btn color="red darken-1" flat @click.native="dialog=false">Close</v-btn>
              </div>
              </form>
            </v-layout>
          </v-container>
          <small>*Please provide information as much as possible</small>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- the form to post -->

    </v-layout>
    <v-layout>
      <v-flex  row xs3 offset-xs5>
            <v-btn @click="dialog=true" dark color="pink">ADD POST</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <!--  admin content -->
  <v-container fluid v-else>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page.</p>
      </v-flex>
      <v-flex xs12>
      <v-container grid-list-xl fluid>
            <v-layout row wrap>
              <v-flex
                v-for="item in info"
                xs4
              >
              <v-card tile>
                <v-card-media :src="picTest(item)" height="150px">
                </v-card-media>
                  <v-card-title primary-title>
                    <div class="headline">
                      {{item.name}}
                    </div>
                  </v-card-title>
                  <v-divider></v-divider>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-content>Brand:</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ item.brand }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content>Found</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ item.found }}</v-list-tile-content>
                      </v-list-tile>
                       <v-list-tile>
                        <v-list-tile-content>Date</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ item.date }}</v-list-tile-content>
                      </v-list-tile>
                      </v-list>
                      <v-divider></v-divider>
                    <v-card-actions>
                  <v-btn @click="dialog2=true" dark color="blue">MORE PICTURE</v-btn>
                </v-card-actions>

                             <!--  dialog moreinfo -->
                      <v-dialog v-model="dialog2" max-width="500px">
                                          <v-card>
                                              <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
                                              <v-carousel-item v-for="(items,i) in item.pic" :src="items.src" :key="i"></v-carousel-item>
                                            </v-carousel>
                                            <v-card-actions>
                                              <v-btn color="primary" flat @click="dialog2=false">Close</v-btn>
                                            </v-card-actions>
                                          </v-card>
                      </v-dialog>
                      <!--  dialog moreinfo -->

                    </v-card>
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
          <v-container>
            <v-layout wrap>
              <form v-model="valid" ref="form"lazy-validation>
              <v-flex xs12>
                  <v-text-field
                    v-model="name"
                    label="Name"
                    required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                   <v-text-field
                    v-model="brand"
                    label="Brand"
                    required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                   <v-text-field
                    v-model="found"
                    label="Found At"
                    required
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                   <v-text-field
                    v-model="date"
                    label="Date"
                    required
                  ></v-text-field>
              </v-flex>
              <small>Upload pictures maximum 3</small>
              <v-spacer></v-spacer>
              <input type="file" @change="onFileChange" id="fileButton1" />
              <input type="file" @change="onFileChange" id="fileButton2" />
              <input type="file" @change="onFileChange" id="fileButton3" />
                <v-spacer></v-spacer>
                <br/>
              <div>
                <v-btn color="blue darken-1" flat @click="Submit">Submit</v-btn>
                <v-btn color="red darken-1" flat @click.native="dialog=false">Close</v-btn>
              </div>
              </form>
            </v-layout>
          </v-container>
          <small>*Please provide information as much as possible</small>
        </v-card-text>
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
      db: this.$store.state.db,
      auth: this.$store.state.auth,
      dialog: false,
      dialog2: false,
      pic: [],
      storeRef: this.$store.state.storeRef,
      user: this.$store.state.user.email,
      forgot: [],
      info: []
    }
  },
  methods: {
      removeElement : function(index){
          this.forgot.splice(index, 1);
      },
      onFileChange (e) {
        var files = e.target.files[0]
        //this.fileList.push(files)
        var fileList = []
        console.log(fileList.length)
        var storageRef = this.storeRef.ref('home/' + files.name)
          var task = storageRef.put(files)
          task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(percentage)

          }, function error(err) {
             console.log(err)
          }, () => {
             console.log("complete")
              this.storeRef.ref().child('home/' + files.name).getDownloadURL().then((url) => {
                    this.pic.push({src:url})
             })
        })
      },
      Submit () {
          this.dialog = false
          var db = this.db
          var auth = this.auth
          const uid = auth.currentUser.uid
      //   this.forgot.push({
      //     name: this.name,
      //     brand: this.brand,
      //     found: this.found,
      //     date: this.date,
      //     pic: this.pic
      //   })
      //   // var forgotPush = this.db.ref('home/all').push()
      //   // forgotPush.set({
      //   //   name: this.name,
      //   //   brand: this.brand,
      //   //   found: this.found,
      //   //   date: this.date,
      //   //   pic: this.pic
      //   // })
          var forgotRef = this.db.ref('add/' + uid).push()
          forgotRef.set({
            name: this.name,
            brand: this.brand,
            found: this.found,
            date: this.date,
            pic: this.pic,
            path: "add/" + uid + "/" + forgotRef.key  
          })
          location.reload()
      },
      picTest (item) {
        if(item.pic.length === null){
          return 0
        }else{
          return item.pic[0].src
        }
      },
      remove(path) {
        var db = this.db
        var auth = this.auth
        const uid = auth.currentUser.uid
        db.ref(path).remove()
        this.info = []
        db.ref('add').on('child_added', snapshot => {
          db.ref('add/' + snapshot.key).on('child_added', snapshot => {
            console.log("added")
            this.info.push(snapshot.val())
          })
        })
      }
  },
  created () {
      var db = this.db
      var auth = this.auth
      db.ref('add').on('child_added', snapshot => {
        db.ref('add/' + snapshot.key).on('child_added', snapshot => {
             this.info.push(snapshot.val())
        })
      })
  }
}
</script>

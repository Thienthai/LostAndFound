<template>
  <v-container fluid v-if="user === 'admin@mail.com'">
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a admin's home page.</p>
      </v-flex>
      <v-flex xs12>
      <div v-for="item in info">
      <v-card>
        <v-flex xs4>
        </v-card-media>
        <img :src="picTest(item)" alt="Mountain View">
        </v-flex>
        <div>
        <h1 class="text-xs-center" >Name: {{ item.name }}</h1>
        <p>Brand: {{ item.brand }}</p>
        <p>Found at: {{ item.found }}</p>
        <p>Date: {{ item.date }}</p>

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

        </div>
        <v-btn @click.stop="dialog2 = true" color="info">More Pictures</v-btn>
        <v-btn color="error" @click="remove(item.path)">Delete</v-btn>
      </v-card>
        <br />
      </div>
    </v-flex>
    <v-flex xs1 offset-xs5>
          <v-btn @click.stop="dialog=true" class="ml-7" fab dark color="pink">
            <v-icon dark>add</v-icon>
          </v-btn>
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
  <v-container fluid v-else>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page.</p>
      </v-flex>
      <v-flex xs12>
      <div v-for="item in info">
      <v-card>
        <v-flex xs4>
        <img :src="picTest(item)" alt="Mountain View">
        </v-flex>
        <div>
        <h1 class="text-xs-center" >Name: {{ item.name }}</h1>
        <p>Brand: {{ item.brand }}</p>
        <p>Found at: {{ item.found }}</p>
        <p>Date: {{ item.date }}</p>
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

        </div>
        <v-btn @click.stop="dialog2 = true"  color="info">More Pictures</v-btn>
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

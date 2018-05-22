<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-25>
        <h1>Mypost</h1>
        <h1>{{ result }}</h1>
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
                  <v-btn  @click.stop="removeElement(item.path)" flat color="red">delete</v-btn>
                </v-card-actions>
                      <v-dialog v-model="item.dialog" max-width="500px">
                        <v-card>
                            <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
                            <v-carousel-item v-for="(items,i) in item.pic" :src="items.src" :key="i"></v-carousel-item>
                          </v-carousel>
                          <v-card-title>
                            <span class="headline">Description</span>
                            <div>
                            <span class="body-2">
                              {{ item.description }}
                            </span>
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
              <form v-model="valid" ref="form"lazy-validation>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="name" label="Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="brand" label="Brand"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Found At"
                  v-model="found"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="line" label="Line"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="phone" label="Phone"></v-text-field>
              </v-flex>
              <v-flex xs12 sm4>
                                  <v-text-field v-model="date" :rules="dateRules" label="Date" hint="example: DD/MM/YYYY" persistent-hint></v-text-field
                >
              </v-flex>
              <v-flex xs12>
                <v-text-field :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
                  :counter="50"
                  v-model="description"
                  label="Description"
                ></v-text-field>
              </v-flex>
              <div>
              <small>*Pictures Maximum 3</small>
              </div>
              <v-spacer></v-spacer>
              <input type="file" @change="onFileChange" id="fileButton1" value="upload"/>
              <input type="file" @change="onFileChange" id="fileButton2" value="upload"/>
              <input type="file" @change="onFileChange" id="fileButton3" value="upload"/>
                <v-spacer></v-spacer>
              <br />
              <div>
                <v-btn :disabled="!valid" color="blue darken-1" flat @click="Submit">Submit</v-btn>
                <v-btn color="red darken-1" flat @click.native="dialog = false">Close</v-btn>
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
        result: null,
        pic: [],
        fileList: [],
        storeRef: this.$store.state.storeRef,
        valid: true,
        itemPost: [],
        user: this.$store.state.user.email,
        dialog: false,
        dateRules: [
          v => /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(v) || 'Date must be valid'
        ]
      }
    },
    methods: {
      onFileChange (e) {
        var files = e.target.files[0]
        //this.fileList.push(files)
        console.log(this.fileList.length)
        var storageRef = this.storeRef.ref('file/' + files.name)
          var task = storageRef.put(files)
          task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(percentage)

          }, function error(err) {
             console.log(err)
          }, () => {
            this.storeRef.ref().child('file/' + files.name).getDownloadURL().then((url) => {
                    this.pic.push(
                      { 
                        src:url 
                      }
                    )
            })
          })
      },
      Submit () {
        var db = this.db
        var auth = this.auth
        const uid = auth.currentUser.uid
        // for (var i = 0; i < this.fileList.length;i++){
        //   var storageRef = this.storeRef.ref('file/' + this.fileList[i].name)
        //   var task = storageRef.put(this.fileList[i])
        //   task.on('state_changed', function progress(snapshot) {
        //     var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        //     console.log(percentage)

        //   }, function error(err) {
        //      console.log(err)
        //   },function complete() {
        //      console.log("complete")
        //      this.storeRef.ref().child('file/asphalt-blue-sky-clouds-490411.jpg').getDownloadURL().then(function(url) {
        //             this.pic.push({src:url})
        //      })

        //   })
        // }
        // this.dialog = false
        // this.$store.dispatch('postInfo', {
        //   name: this.name,
        //   brand: this.brand,
        //   found: this.found,
        //   line: this.line,
        //   phone: this.phone,
        //   date: this.date,
        //   description: this.description,
        //   pic: this.pic,
        //   dialog: false,
        //   email: this.user,
        //   status: 'not found',
        //   id: this.itemPost.length
        // })

        var itemRef = this.db.ref('post/' + uid).push()
        itemRef.set({
          name: this.name,
          brand: this.brand,
          found: this.found,
          line: this.line,
          phone: this.phone,
          date: this.date,
          description: this.description,
          pic: this.pic,
          dialog: false,
          email: this.user,
          status: 'not found',
          id: this.itemPost.length,
          path: "post/" + uid + "/" + itemRef.key  
        })
        this.dialog = false
        location.reload()
      },
      removeElement (path) {
        var db = this.db
        var auth = this.auth
        const uid = auth.currentUser.uid
        db.ref(path).remove()
        this.itemPost = []
        db.ref('post').on('child_added', snapshot => {
          db.ref('post/' + snapshot.key).on('child_added', snapshot => {
            console.log("added")
            this.itemPost.push(snapshot.val())
          })
        })
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
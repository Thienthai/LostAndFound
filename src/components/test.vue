<template>
  <v-container fluid>
  	<v-layout>
  		<v-flex xs12>
  				<v-container grid-list-xl fluid>
  					<v-layout row wrap>
  						<v-flex
  							v-for="n in 9"
  							:key="n"
  							xs4
  						>
  						<v-card tile>
  							<v-card-media src="https://images.pexels.com/photos/1096891/pexels-photo-1096891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" height="150px">
  							</v-card-media>
				        	<v-card-title primary-title>
					          <div class="headline">
					            Mobile
					          </div>
        					</v-card-title>
        					<v-divider></v-divider>
					          <v-list>
					            <v-list-tile>
					              <v-list-tile-content>Brand:</v-list-tile-content>
					              <v-list-tile-content class="align-end">Iphone</v-list-tile-content>
					            </v-list-tile>
					            <v-list-tile>
					            	<v-list-tile-content>Found</v-list-tile-content>
					            	<v-list-tile-content class="align-end">1280</v-list-tile-content>
					            </v-list-tile>
					             <v-list-tile>
					            	<v-list-tile-content>Date</v-list-tile-content>
					            	<v-list-tile-content class="align-end">01/02/2018</v-list-tile-content>
					            </v-list-tile>
            				  </v-list>
            				  <v-divider></v-divider>
        		        <v-card-actions>
				          <v-btn dark color="blue">MORE INFO</v-btn>
				          <v-btn dark color="red">DELETE</v-btn>
        				</v-card-actions>
  						</v-card>
  						</v-flex>
  					</v-layout>
  				</v-container>
  	    </v-flex>
  	</v-layout>
  	<v-layout>
  		<v-flex row xs3 offset-xs5>
  	    		<v-btn dark color="pink">ADD POST</v-btn>
  	    </v-flex>
  	</v-layout>
  </v-container>
</template>

<script>
export default {
	data () {
		return {
			name: 'mama',
			db: this.$store.state.db,
			auth: this.$store.state.auth,
			input: "",
			info: [],
		}
	},
	computed: {
	    // a computed getter
	    reversedMessage: function () {
	      // `this` points to the vm instance
	      var db = this.db
	      console.log('moo')
	      return this.input.split('').reverse().join('')
	    },
	},
	methods: {
		run() {
			var db = this.db
			var auth = this.auth
			const uid = auth.currentUser.uid
			var myRef = db.ref('mee/' + uid).push()
			myRef.set({
				name: 'mini',
				age: 20,
				path: myRef.key,
			})
			// var lst = []
		    //db.ref('add').once('value').then(snapshot => {
				// lst.push(snapshot.val())
				//console.log(snapshot.key)
				//console.log(snapshot.val())
				// console.log(lst[0])
			 	// db.ref('add/' + snapshot.key).once('value').then(snapshot => {
			 	// 	console.log(snapshot.key)
			 	// 	console.log(snapshot.val())
			 	// })
			//})
			// console.log('test')
			// db.ref('add/11882').set({
			// 	name: 'ice',
			// 	age: 15
			// })
			//db.ref('add').on('child_added', snapshot => {
				//console.log(snapshot.val())
				//console.log(snapshot.key)
				// db.ref('add/' + snapshot.key).on('child_added', snapshot => {
				// 	console.log(snapshot.val())
				// 	console.log(snapshot.key)
    //     		})
    //     	})
		},
		remove() {
			var db = this.db
			var auth = this.auth
			const uid = auth.currentUser.uid
			db.ref('add/' + uid + "/-LD3NrGEpeKOCXzSKFEJ").remove()
		}
	},
	created () {

		var db = this.db
		var auth = this.auth
		db.ref('add').on('child_added', snapshot => {
			db.ref('add/' + snapshot.key).on('child_added', snapshot => {
				console.log("added")
				this.info.push(snapshot.val())
        	})
        })
		db.ref('add').on('child_removed', snapshot => {
			db.ref('add/' + snapshot.key).on('child_removed', snapshot => {
				console.log("removed")
        	})
        })
	}
}
</script>
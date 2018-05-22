<template>
	<v-container>
		<v-layout>
			<div>
			<h1>Mooo</h1>
			<p>{{ reversedMessage }}</p>
			<input v-model="input" ></input>
			<button @click='run()'>click</button>
			<button @click='remove()'>remove</button>
			<h1>{{ info }}</h1>
			</div>
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
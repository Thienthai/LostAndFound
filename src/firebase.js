import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBsPIoiIPBJEosXMhhu-Wt0EiO18VKBlfA",
    authDomain: "lostandfound-e813f.firebaseapp.com",
    databaseURL: "https://lostandfound-e813f.firebaseio.com",
    projectId: "lostandfound-e813f",
    storageBucket: "lostandfound-e813f.appspot.com",
    messagingSenderId: "922329102297"
}

firebase.initializeApp(config)

export default firebase
export const db = firebase.database()
export const auth = firebase.auth()

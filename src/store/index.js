import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    storeRef: firebase.storage(),
    auth: firebase.auth(),
    db: firebase.database(),
    appTitle: 'My Awesome App',
    user: null,
    error: null,
    loading: false,
    forgot: [],
    post: [
      {
        id: 0,
        email: 'gege@gmail.com',
        dialog: false,
        name: 'Mobile',
        brand: 'Iphone',
        found: '1404',
        date: '04/04/2018',
        phone: '0887777777',
        line: 'Vue007',
        status: 'not found',
        pic: [
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
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of'
      },
      {
        id: 1,
        email: 'bobo@gmail.com',
        dialog: false,
        name: 'Umbrellas',
        brand: 'Unknown',
        found: '1404',
        date: '04/04/2018',
        phone: '087777777',
        line: 'Vue007',
        status: 'not found',
        pic: [
          {
            src: 'https://vignette.wikia.nocookie.net/marvelvscapcom/images/e/eb/PeterParker.png/revision/latest/scale-to-width-down/230?cb=20170818120510'
          },
          {
            src: 'https://static.gamespot.com/uploads/scale_super/1578/15789737/3376298-001.jpg'
          },
          {
            src: 'https://cdn.mos.cms.futurecdn.net/2sodL2gJ4itZBYqRcE9jP8-1200-80.jpg'
          }
        ],
        description: 'literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This'
      }
    ]
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setPost (state, payload) {
      state.post.push(payload)
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(firebaseUser => {
        commit('setUser', {email: firebaseUser.email})
        commit('setLoading', false)
        commit('setError', null)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {email: payload.email})
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/signin')
    },
    postInfo ({commit}, payload) {
      console.log(payload)
      commit('setPost', payload)
      router.push('/mypost')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})

import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/Home'
import Landing from '@/components/Landing'
// import NotFound from '@/components/NotFound'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Post from '@/components/Post'
import Mypost from '@/components/Mypost'
import test from '@/components/test'

Vue.use(Router)

const AuthGuard = (to, from, next) => {
  if (firebase.auth().currentUser) {
    next()
  } else {
    next('/signin')
  }
}

// export default router
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/post',
      name: 'Post',
      component: Post,
      beforeEnter: AuthGuard
    },
    {
      path: '/mypost',
      name: 'Mypost',
      component: Mypost,
      beforeEnter: AuthGuard
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: NotFound
    // }
  ],
  mode: 'history'
})

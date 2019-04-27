import Vue from 'vue'
import Router from 'vue-router'
const HomePage = () => import('@/components/layout/Index')
const User = () => import(/* webpackChunkName: "group-user" */ '@/components/layout/User/User')
const UserAccount = () => import(/* webpackChunkName: "group-user" */ '@/components/layout/User/UserAccount')
const UserReviews = () => import(/* webpackChunkName: "group-user" */ '@/components/layout/User/UserReviews')
const UserPurchases = () => import(/* webpackChunkName: "group-user" */ '@/components/layout/User/UserPurchases')
const MovieList = () => import('@/components/layout/Movies/MovieList')
const MovieControl = () => import(/* webpackChunkName: "group-movie" */ '@/components/layout/Movies/MovieControl')
const MovieElements = () => import(/* webpackChunkName: "group-movie" */ '@/components/layout/Movies/MovieElements')
const BookTicket = () => import('@/components/layout/Ticket/BookTicket')
const Page404 = () => import('@/components/layout/Page404')
const Preloader = () => import('@/components/layout/public/Preloader')
//import firebase from 'firebase'
import { store } from '../store/index'


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component:  HomePage,
      meta: {
        requiresGuest: true
      }
    },
    { path: '/user',
      name: 'user',
      component: User,
      meta: {
      requiresAuth: true
      } 
      , children: [
      { path: 'account', name: 'UserAccount', component: UserAccount },
      { path: 'myreviews', name: 'UserReviews', component: UserReviews },
      { path: 'purchases', name: 'UserPurchases', component: UserPurchases }

  ] },
    {
      path: '/movies',
      name: 'MovieList',
      component: MovieList,
      meta: {
        requiresGuest: true
      }
    },
    { path: '/movie',
      meta: {
        requiresGuest: true
      },
      components: {
        default: MovieControl,    
      }
      ,children: [
      { path: '', name: 'MovieChange', component: MovieList },
      { path: ':id', name: 'MovieElements', component: MovieElements },
      ] 
    },
    { path: '/ticket',
      name: 'BookTicket',
      component: BookTicket,
      meta: {
      requiresAuth: true
      } 
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404,
      meta: {
        requiresGuest: true
      }
    }
  ],
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});


//nav guard
router.beforeEach((to, from, next ) => {

 
  if(to.matched.some(record => record.meta.requiresAuth)) {
        var tokenUser = localStorage.getItem("current-user");
        if(tokenUser) var user = JSON.parse(tokenUser);
        store.commit('setUser', JSON.parse(tokenUser));
      if(user) {
        next();
      } else {
        console.log('not log in')
        next({
          path:"/",
          query: {
            redirect: to.fullPath
          }
        })
      }

   
    }
    // cancel()
  else if(to.matched.some(record => record.meta.requiresGuest)) {
        next();
  } else {
    // Proceed to route
    next();
  }
})

export default router;
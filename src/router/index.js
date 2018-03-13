import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Home from '@/views/Home/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      redirect: '/home',
      children: [
        { path: 'home', component: Home }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

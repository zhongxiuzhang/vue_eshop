import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home, redirect:'/welcome', children: [
    { path: '/welcome', component: Welcome },
    { path: '/users', component: Users},
    { path: '/rights', component: Rights},
    { path: '/roles', component: Roles},
    { path: '/categories', component: Cate},
  ] }
]

const router = new VueRouter({
  routes
})

// mount navigation guard
router.beforeEach((to, from, next) => {
  // to: the path to visit
  // from: the path the request comes from
  // next: a function to let in
  //  next(): let in;  next('/login'): force navigation
  if(to.path === '/login') return next();
  // get token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})

export default router

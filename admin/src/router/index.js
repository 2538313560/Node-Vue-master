import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import itemEdit from '../views/itemEdit.vue'
import itemList from '../views/itemList.vue'

import heroEdit from '../views/heroEdit.vue'
import heroList from '../views/heroList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create',component: CategoryEdit },
      { path: '/categories/edit/:id',component: CategoryEdit, props: true },
      { path: '/categories/list',component: CategoryList },
      
      { path: '/items/create',component: itemEdit },
      { path: '/items/edit/:id',component: itemEdit, props: true },
      { path: '/items/list',component: itemList },
      
      { path: '/heroes/create',component: heroEdit },
      { path: '/heroes/edit/:id',component: heroEdit, props: true },
      { path: '/heroes/list',component: heroList },
    ]
  },
  // {
  //   path: '/categoryEdit',
  //   name: 'CategoryEdit',
  //   component: CategoryEdit
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

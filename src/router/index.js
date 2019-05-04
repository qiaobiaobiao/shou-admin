import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/Home'
import Users from '@/views/users'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      meta:{
        label:'首页'
      },
      children:[
        { path:'', name:'Home',component:Home},
        { path:'/users',       
          component:{
            render: c => c('router-view') // 过渡的效果
          },
          meta:{
            label:'用户管理'
          },
          children:[
            { path:'/users',
              component:Users,
              name:'Users',
              meta:{
                label:'用户列表'
              }}
          ]}
      ]
    }
  ]
})

//  路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  }
  const token = window.localStorage.getItem('token')
  if (!token) {
    return next('/')
    // return this.$router.replace('/')
  }
  next()
})

export default router

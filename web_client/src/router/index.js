import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

const Index = () => import('../views/Index')
const Login = () => import('../views/Login')
const Register = () => import('../views/Register')
const Home = () => import('../views/Home')
const infoShow = ()  => import ("../views/infoShow");
const NotFound = () => import('../views/404')
const FoundList = () => import('../views/FoundList')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },

  {
    path:'/index',
    name:'index',
    component: Index,
    children:[
      {
        path:'',component:Home
      },
      {
        path:'/home',name:'home',component: Home
      },
      {
        path:'/infoShow',name: 'infoShow',component:infoShow
      },
      {
        path:'/foundList',name: 'FoundList',component:FoundList
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path:'/register',
    name:'register',
    component: Register
  },
  {
    path:'*',
    name:'NotFound',
    component:NotFound
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 路由守卫：
 * 当跳转的路由是登录或者注册时，正常跳转，不拦截
 * 当跳转的是其他页面，则必须登录，此时需要检查是否登录状态（在登录状态时本地缓存有token,
 * 如果有，则正常跳转页面，否则跳转到登录页面
 */
router.beforeEach((to,from,next) =>{
  if(to.path === '/login' || to.path === '/register' ){
    next()
  }else{
    const isLogin = localStorage.eleToken ? true : false
    if(isLogin){
      next()
    }else{
      Message({
         message: '未登录,请先登录',
         type: 'error',
         center: true
       })
      next('/login')
    }

  }

})



export default router

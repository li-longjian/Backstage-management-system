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
const Borad = () => import('../views/Board/Borad')
const Trander = () => import('../views/tenderAndBids/Trander')
const Bids = () => import('../views/tenderAndBids/Bids')
const SetAdmin = () => import('../views/setting/SetAdmin')
const MyBids = () => import('../views/tenderAndBids/MyBids')
const News = () => import('../views/News')
const MyTender = ()=> import('../views/tenderAndBids/MyTander')
const MyMessage = () => import('../views/MyMessage')



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
      },
      {
        path:'/board',name: 'board',component:Borad
      },
      {
        path:'/tender',name: 'Trander',component:Trander
      },
      {
        path: '/bids',name:'Bids',component:Bids
      },
      {
        path:'/mybids',name: 'MyBids',component:MyBids
      },
      {
        path:'/setadmin',name: 'SetAdmin',component:SetAdmin
      },
      {
        path:'/news',name: 'News',component:News
      },
      {
        path: '/mytander',name: 'MyTender',component:MyTender
      },
      {
        path:'/mymessage',name: 'MyMessage',component:MyMessage
      },

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
 * ???????????????
 * ?????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????token,
 * ???????????????????????????????????????????????????????????????
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
         message: '?????????,????????????',
         type: 'error',
         center: true
       })
      next('/login')
    }

  }

})
/**
 *
 *
 */
/*router.beforeEach((to,from,next) =>{
  if(to.path === "/index"){

  }
})*/


export default router

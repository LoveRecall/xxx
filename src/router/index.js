import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'; //登录
import homeView from '@/components/homeView'; //主页路由视图
import index from '@/components/index/index'; //首页
import lobby from '@/components/lobby/lobby'; //彩票大厅
import bet from '@/components/bet/bet'; //投注大厅
import user_center from '@/components/user_center/user_center'; //用户中心
import recharge from '@/components/user_center/recharge/recharge'; //充值
import personage from '@/components/user_center/personageForm/personage'; //个人报表
import curtain from '@/components/user_center/curtainForm/curtain'; //帐变报表
import activity from '@/components/user_center/activity/activity'; //优惠活动详情

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      meta:{
        isLogin:true,
      },
      component: login
    },
    {
      path: '/homeView',
      component: homeView,
      children:[
        {path:'',name:'index',component:index},
        {path:'lobby', name:'lobby',component:lobby},
        {
          path:'user_center', 
          component:user_center,
          children:[
            {path:'',name:'recharge',meta:{fatherRouter:'user_center',name:'充值'},component:recharge},
            {path:'personage', name:'personage',meta:{fatherRouter:'user_center',name:'报表管理>个人报表'},component:personage},
            {path:'curtain', name:'curtain',meta:{fatherRouter:'user_center',name:'报表管理>帐变报表'},component:curtain},
            {path:'activity', name:'activity',meta:{fatherRouter:'user_center',name:'报表管理>优惠活动详情'},component:activity},
          ]
        },
      ]
    },
    {
      path: '/bet',
      name: '投注大厅',
      component: bet
    },
  ]
})
router.beforeEach((to, from, next) => { 
  if(to.meta.isLogin){
    next();
  }else{
    if(sessionStorage.getItem('custName')){
      next();
    }else{
      next({
        path:'/'
      });
    }
  }
})
export default router;
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'; //登录
import homeView from '@/components/homeView'; //主页路由视图
import index from '@/components/index/index'; //首页
import lobby from '@/components/lobby/lobby'; //彩票大厅
import bet from '@/components/bet/bet.vue'; //投注大厅
import user_center from '@/components/user_center/user_center'; //用户中心
import recharge from '@/components/user_center/recharge/recharge'; //充值
import personage from '@/components/user_center/personageForm/personage'; //个人报表
import curtain from '@/components/user_center/curtainForm/curtain'; //帐变报表
import activity from '@/components/user_center/activity/activity'; //优惠活动详情

import withdrawal from '@/components/user_center/withdrawal/withdrawal'; //提现
import buyQuery from '@/components/user_center/gameRecord/buyQuery'; //购彩查询
import trackQuery from '@/components/user_center/gameRecord/trackQuery'; //追号查询

import personalOverview from '@/components/user_center/accountManage/personalOverview/personalOverview'; //个人总览
import userInfo from '@/components/user_center/accountManage/userInfo/userInfo'; //用户资料
import changePassword from '@/components/user_center/accountManage/changePassword/changePassword'; //密码修改
import securitySettings from '@/components/user_center/accountManage/securitySettings/securitySettings'; //密保设定

import bankCardManage from '@/components/user_center/accountManage/bankCardManage/bankCardManage'; //银行卡管理
import addBank from '@/components/user_center/accountManage/bankCardManage/addBank'; //新增银行卡确认
import confirmBank from '@/components/user_center/accountManage/bankCardManage/confirmBank'; //新增银行卡确认
import lotteryTime from '@/components/user_center/ruleDescription/lotteryTime/lotteryTime'; //开奖时间
import XJSSC from '@/components/user_center/ruleDescription/XJSSC/XJSSC'; //时时彩

Vue.use(Router)

const router = new Router({
  // mode:'history',
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
            {path:'withdrawal', name:'withdrawal',meta:{fatherRouter:'user_center',name:'提现'},component:withdrawal},
            {path:'buyQuery', name:'buyQuery',meta:{fatherRouter:'user_center',name:'游戏记录>购彩查询'},component:buyQuery},
            {path:'trackQuery', name:'trackQuery',meta:{fatherRouter:'user_center',name:'游戏记录>追号查询'},component:trackQuery},
            {path:'personalOverview', name:'personalOverview',meta:{fatherRouter:'user_center',name:'账户管理>个人预览'},component:personalOverview},
            {path:'userInfo', name:'userInfo',meta:{fatherRouter:'user_center',name:'账户管理>用户资料'},component:userInfo},
            {path:'changePassword', name:'changePassword',meta:{fatherRouter:'user_center',name:'账户管理>密码修改'},component:changePassword},
            {path:'securitySettings', name:'securitySettings',meta:{fatherRouter:'user_center',name:'账户管理>密保设定'},component:securitySettings},
            {path:'bankCardManage',name:'bankCardManage',meta:{fatherRouter:'user_center',name:'账户管理>银行卡管理'},component:bankCardManage,},
            {path:'addBank',name:'addBank',meta:{fatherRouter:'user_center',name:'账户管理>银行卡管理>新增银行卡'},component:addBank},
            {path:'confirmBank',name:'confirmBank',meta:{fatherRouter:'user_center',name:'账户管理>银行卡管理>新增银行卡确认'},component:confirmBank},
            {path:'lotteryTime', name:'lotteryTime',meta:{fatherRouter:'user_center',name:'规则说明>开奖时间'},component:lotteryTime},
            {path:'XJSSC', name:'XJSSC',meta:{fatherRouter:'user_center',name:'规则说明>时时彩'},component:XJSSC},
          ]
        },
      ]
    },
    {
      path: '/bet/:gameNo',
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
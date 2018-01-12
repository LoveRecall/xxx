<template>
  <div class="user_center">
    <div class="user_center_box flex">
      <div class="left-menu">
        <div class="left-menu-line">
          <Menu width="auto" @on-select="GoRouter" accordion>
            <MenuItem name="recharge">充值</MenuItem>
            <MenuItem name="withdrawal">提现</MenuItem>
            <Submenu name="2">
              <template slot="title">
                报表管理
              </template>
              <MenuItem :class="[($route.name=='curtain' ? 'active' : '')]" name="curtain">帐变报表</MenuItem>
              <MenuItem :class="[($route.name=='personage' ? 'active' : '')]" name="personage">个人报表</MenuItem>
              <MenuItem :class="[($route.name=='activity' ? 'active' : '')]" name="activity">优惠活动详情</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                游戏记录
              </template>
              <MenuItem :class="[($route.name=='buyQuery' ? 'active' : '')]" name="buyQuery">购彩查询</MenuItem>
              <MenuItem :class="[($route.name=='trackQuery' ? 'active' : '')]" name="trackQuery">追号查询</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                账户管理
              </template>
              <MenuItem :class="[($route.name=='personalOverview' ? 'active' : '')]" name="personalOverview">个人总览</MenuItem>
              <MenuItem :class="[($route.name=='userInfo' ? 'active' : '')]" name="userInfo">用户资料</MenuItem>
              <MenuItem :class="[($route.name=='changePassword' ? 'active' : '')]" name="changePassword">密码修改</MenuItem>
              <MenuItem :class="[($route.name=='securitySettings' ? 'active' : '')]" name="securitySettings">密保设定</MenuItem>
              <MenuItem :class="[
              ($route.name=='bankCardManage'||
              $route.name=='addBank' ||
              $route.name=='confirmBank' 
              ? 'active' : '')]" name="bankCardManage">银行卡管理</MenuItem>
            </Submenu>
            <MenuItem name="5">联系客服</MenuItem>
            <MenuItem name="6">规则说明</MenuItem>
          </Menu>
        </div>
      </div>
      <div class="right_content">
        <div class="nav-title">
          <span>用户中心></span>
          <span>{{$route.meta.name}}</span>
        </div>
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      
      }
    },
    computed: {
      
    },
    mounted(){

    },
    methods: {
      GoRouter(name){
        this.$router.push({name:name})
      }
    }
  }
</script>
<style scoped>
  .user_center{
    margin: 0 0 50px 0;
  }
  .user_center_box{
    width: 1000px;
    margin: 0 auto;
    position: relative;
  }
  .user_center_box .left-menu{
    width: 145px;
    border: 2px solid #520100;
    background:#1e1e1e;
  }
  .left-menu .left-menu-line{
    border: 1px solid #c22629;
    height: 100%;;
  }
  .left-menu >>> .ivu-menu{
    background: none;
  }
  .left-menu >>> .ivu-menu-submenu-title{
    background: #bd0102;
    color: #fff;
    border: none;
    margin-bottom: 2px;
    line-height: 40px;
    padding: 0 24px;
  }
  .left-menu >>> .ivu-menu-vertical .ivu-menu-submenu-title-icon{
    top:14px;
  }
  .left-menu >>> .ivu-menu-submenu-title+.ivu-menu .ivu-menu-item{
    background:none;
  }
  .left-menu >>> .ivu-menu-submenu-title+.ivu-menu .ivu-menu-item:hover{
    background: #5e5959;
  }
  .left-menu >>> .ivu-menu-submenu-title+.ivu-menu .ivu-menu-item.active{
    background: #5e5959;
  }
  .left-menu >>> .ivu-menu-item{
    background: #bd0102;
    color: #fff;
    border: none;
    margin-bottom: 2px;
    height: 40px;
    line-height: 40px;
    padding: 0 24px;
  }
  .left-menu >>> .ivu-menu-vertical.ivu-menu-light:after{
    width:0;
  }
  .left-menu >>> .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    border: none;
    color: #fff;
  }
  .left-menu .menu-list .iconfont{
    font-size: 14px;
  }
  .user_center_box .right_content{
    width: 855px;
    height: auto;
  }
  .right_content .nav-title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid #c1c1c1;
    background: #fff;
  }
  .right_content .container{
    width: 100%;
    padding: 20px;
    background: #ededed;
  }
</style>

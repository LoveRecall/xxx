<template>
  <div class="index">
    <div class="head">
      <div class="service_msg">
        <div>
          <div class="left">
            <i style="color:#d00808;" class="iconfont icon-kefu vertical-m"></i>
            <span class="vertical-m" style="color:#050503">企业客服</span>    
            <span class="vertical-m" style="color:#d00808;">123456</span>    
          </div>
          <div class="right">
            <i style="color:#d00808;" class="iconfont icon-icon165 vertical-m"></i>
            <span class="vertical-m" style="color:#050503">下午</span>    
            <span class="vertical-m">02:30</span>    
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="logo">
        <div class="logo_img left">
          <img src="" alt="">
        </div>
        <div class="user_info left">
          <div class="flex">
            <div class="item">
              <i class="iconfont icon-yonghu"></i>
              <span v-text="userName"></span>
            </div>
            <div class="item">
              <i class="iconfont icon-qian"></i>
              <span v-text="acctAmt"></span>
            </div>
            <div class="item">充值</div>
            <div class="item">提款</div>
            <div class="item" v-if="userName" @click="Modal=true">退出</div>
          </div>
          <div class="marquee">
            <i class="iconfont icon-laba"></i>
            <span ref="marquee_span" @mouseenter="marquee_spanStop" @mouseleave="marquee_spanPlay">
              <span v-for="(item,index) in DatagetNotice" :key="index" v-text="(index+1)+'、'+item.noticeContent"></span>
            </span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="head_nav">
        <div class="head_nav_panel flex">
          <div @click="$router.push('/homeView')" :class="$route.name=='index' ? 'item active' : 'item'">首页</div>
          <div @click="$router.push('/homeView/lobby')" :class="$route.name=='lobby' ? 'item active' : 'item'">彩票大厅</div>
          <div @click="$router.push('/homeView/user_center')" :class="$route.meta.fatherRouter=='user_center' ? 'item active' : 'item'">用户中心</div>
          <div :class="$route.path=='/' ? 'item active' : 'item'">最新公告</div>
          <div :class="$route.path=='/' ? 'item active' : 'item'">玩法介绍</div>
        </div>
      </div>
    </div>

    <!-- 路由视图 -->
    <router-view></router-view>

    <Modal :transfer="false" class-name="vertical-center-modal" v-model="Modal" width="200">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>{{tipMessage}}</p>
      </div>
      <div slot="footer" class="flex">
        <Button type="error" long @click="loginOut">确定</Button>
        <Button type="error" long @click="Modal=false">取消</Button>
      </div>
    </Modal>
    
    <div class="content_line_1"></div>
    <div class="content_line_2"></div>
    <div class="footer">
      <span>xxx平台1.0,xxx版权所有</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        Modal:false,
        acctAmt:0,
        tipMessage:'是否要退出',
        DatagetNotice:[],
        marquee_spanScroll:'', //通知滚动
        userName: sessionStorage.getItem('custName'),
        avatorPath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg',
        logo: {
          background: 'url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg) no-repeat',
          'background-size': '100% 100%'
        }
      }
    },
    computed: {

    },
    mounted(){
      this.getNotice();
      this.getAcct();
    },
    methods: {
       //退出登录
      loginOut () {
        let _this = this;
        this.$http({
          method: 'get',
          url:'/loginOut',
        })
        .then(response => {
          let data = response.data;
          if(data.success){
            sessionStorage.clear();
            _this.$router.push('/');
          }else{

          }
        })
        .catch(error => {

        })
      },
      //获取公告
      getNotice(){
        let _this = this;
        this.$http({
          method: 'get',
          url:'/getNotice',
        })
        .then(response => {
          let data = response.data;
          if(data.success){
            _this.DatagetNotice = data.list
            _this.$nextTick(() => { 
              _this.marquee_span_setinterval();
            })
          }else{

          }
        })
        .catch(error => {

        })
      },
      //账户基本信息
      getAcct(){
        let _this = this;
        this.$http({
          method: 'get',
          url:'/getAcct',
        })
        .then(response => {
          let data = response.data;
          _this.acctAmt = data.t.acctAmt;
        })
        .catch(error => {

        })
      },
      marquee_span_setinterval(){ //通知滚动
        let _this= this;
        let scrollDistance = _this.$refs.marquee_span.scrollWidth-_this.$refs.marquee_span.offsetWidth; //滚跳条滚动距离 因为有两个
        this.marquee_spanScroll = setInterval(function(){
          if(_this.$refs.marquee_span.scrollLeft>=scrollDistance){
            _this.$refs.marquee_span.scrollLeft=0;
          }
          _this.$refs.marquee_span.scrollLeft+=1.5;
        },50)
      },
      marquee_spanStop(){ //通知暂停
        clearInterval(this.marquee_spanScroll);
      },
      marquee_spanPlay(){ //通知重新滚动
        this.marquee_span_setinterval();
      }
    },
    beforeRouteLeave(to, from, next){
      next();
      clearInterval(this.marquee_spanScroll);
    }
  }
</script>
<style scoped lang="less">
  @import '../assets/css/header_footer.less';
</style>

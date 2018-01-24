import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Group ,XNumber,ButtonTab, ButtonTabItem} from 'vux'
import ssc from '@/assets/data/data.ssc.js';
import fiveStarRepet from './module/fiveStarRepet/index.vue' //五星复式法模块
import before2single from './module/before-2-single/index.vue' //前二玩法
export default {
  data() {
    return {  
      DataNumChoiceCode:window.location.hash.substr(window.location.hash.indexOf('=')+1,window.location.hash.length),//获得保存的编码
      allChoiceYard:0,//共选多少注（选择号码时）
      totalChoiceYard:0,//共选多少注（投注列表 即为所有的选择注数）
      allPutMoney:0,//共投多少元（选择号码时）
      totalChoiceMoney:0,//共投多少元（投注列表 即为所有的选择注数的金额）
      allGetProfit:0, //共获得多少利润
      codeNumYardArr:null, //当前页面选择投注的号码 组合
      kindCheckedIndex:0, //彩种玩法下标
      playkindFunIndex:JSON.parse(sessionStorage.getItem('playkindFunIndex')), //彩种玩法下标(小玩法  用于刷新定位)
      DataNumChoice:[], //后台传入的 选择号码数据 
      allYardList:[], //投注列表
      btnConfirmChoice:true, //确认选号按钮
      btnImmediately:true, //立即下注按钮
      gameOpenNo:'',//最新一期开奖结果
      getGameNextOpenNodata:[],//查询游戏下一期情况(用于投注)
      getGameGroupByGameWithGroupdata:[

      ],//根据游戏查询所有有效游戏玩法(已分组)
      custName:sessionStorage.getItem('custName'),
      acctAmt:sessionStorage.getItem('acctAmt'),
      swiperOption:{  //滑动参数
        slidesPerView: 6, //可见个数
        slidesPerGroup: 3, //滑动个数
        loop:true,
        loopFillGroupWithBlank: true,
        spaceBetween: 30, //间隔距离
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      columns1: [
          {
            title: '注单编号',
            key: '注单编号'
          },
          {
            title: '玩法',
            key: '玩法'
          },
          {
            title: '期号',
            key: '期号'
          },
          {
            title: '投注时间',
            key: '投注时间'
          },
          {
            title: '投注内容',
            key: '投注内容'
          },
          {
            title: '倍模',
            key: '倍模'
          },
          {
            title: '总金额',
            key: '总金额'
          },
          {
            title: '奖金',
            key: '奖金'
          },
          {
            title: '状态',
            key: '状态'
          },
      ],
      data1: [
         
      ],
      chaseareatableTd:[ //追号表格td 数据
        {
          number: '20180118031',
          addTimes: 1,
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        },
        {
          number: '20180118032',
          addTimes: 1,
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        },
        {
          number: '20180118033',
          addTimes: 1,
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        },
        {
          number: '20180118034',
          addTimes: 1,
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        }],       
      chaseinitTimes:1, //追号起始倍数
      aliketimesChase:false,//控制同倍  翻倍 追号切换显示       
      intervalperiod:1, //翻倍间隔周期  
      intervaltimes:2, //翻倍追号 倍数
      chaseSelect:10,//追号期数值
      chaseSelectList:[//追号期数 下拉
        {
          value: 5,
        },
        {
          value: 10,
        },
        {
          value: 15,
        },
        {
          value: 20,
        },
      ],
      add_times:1, //倍数
      initCodeMoney:2,//每注价格
      autoplay:false,
      autoPause:true,
      playSwitch:false,
      chaseIsShow:false,//追号弹出框 控制参数
      audioSrc:'/static/audio/10.ogg',
      historyList:[],//开奖历史
      model1: 1, //模式 元 角 分 厘  
      modelList: [ // 模式 元 角 分 厘
        {
          value: 1,
          label: '元'
        },
        {
          value: 0.1,
          label: '角'
        },
        {
          value: 0.01,
          label: '分'
        },
        {
          value: 0.001,
          label: '厘'
        },
      ],
    }
  },
  components:{
    XNumber,Group,swiper,swiperSlide,ButtonTab, ButtonTabItem,
    before2single,fiveStarRepet
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    hourFun(){
      let date = new Date(),
      hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minute  = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let span='';
      if(hour < 6){span="凌晨"} 
      else if (hour < 9){span="早上"+hour+':'+minute } 
      else if (hour < 12){span="上午"+hour+':'+minute } 
      else if (hour < 14){span="中午"+hour+':'+minute } 
      else if (hour < 17){span="下午"+hour+':'+minute } 
      else if (hour < 19){span="傍晚"+hour+':'+minute } 
      else if (hour < 22){span="晚上"+hour+':'+minute } 
      return span;
    },
  },
  mounted(){ 
    this.getGameLatestOpenNo();
    this.getGameNextOpenNo();   
    this.getGameGroupByGameWithGroup();
    this.getGameLatestOpenNoList();
  },
  methods: { 
  //倍数加减
    stop(){},//空方法
    mul(){  //解决JS 精度问题
      let m=0,s2='',strArr = 1;
      for(let i =0;i<arguments.length;i++){
        if(arguments[i].toString().indexOf('.')>0){
          m+= arguments[i].toString().split(".")[1].length;
          arguments[i] = Number(arguments[i].toString().replace(".",""));
        }
        strArr*=Number(arguments[i]);  
      }
      return strArr/Math.pow(10,m);
    } ,
    newArry(){  //生成对应的 球号选项
      this.codeNumYardArr = new Array();  //先声明一维 用来存放注码
      let i=this.DataNumChoice.sub.length;
      for(let k=0;k<i;k++){    //一维长度为i,i为变量，可以根据实际情况改变     
        this.codeNumYardArr[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；     
      };
    },
    //退出登录
    loginOut () {
      let _this = this;
      _this.$Modal.confirm({
        content:'是否退出登录 ',
        onOk:function(){
          _this.$http({
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
        }
      })
    },
    // 查询游戏最新开奖结果列表(开奖历史)
    getGameLatestOpenNoList(){
      let _this = this;
      _this.$http({
        method: 'get',
        url:'/gameOpenNo/getGameLatestOpenNoList',
        params:{
          gameNo:_this.$route.params.gameNo,
          size:8
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          this.historyList = data.list;
          this.historyList.map(function(item){
            item.gameOpenNo = item.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",").join(',');
          })
        }else{

        }
      })
      .catch(error => {

      })
    },
    // 获取开奖结果
    getGameLatestOpenNo(){
      let _this = this;
      _this.$http({
        method: 'get',
        url:'/gameOpenNo/getGameLatestOpenNo',
        params:{
          gameNo:_this.$route.params.gameNo
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          this.gameOpenNo = data.t;
          this.gameOpenNo.gameOpenNo = this.gameOpenNo.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",");
        }else{

        }
      })
      .catch(error => {

      })
    },
    // 查询游戏下一期情况(用于投注)
    getGameNextOpenNo(){
      let _this = this;
      let audioArr=[
        '/static/audio/1.ogg',
        '/static/audio/2.ogg',
        '/static/audio/3.ogg',
        '/static/audio/4.ogg',
        '/static/audio/5.ogg',
        '/static/audio/6.ogg',
        '/static/audio/7.ogg',
        '/static/audio/8.ogg',
        '/static/audio/9.ogg',
        '/static/audio/10.ogg',
      ];
      _this.$http({
        method: 'get',
        url:'/gameOpenNo/getGameNextOpenNo',
        params:{
          gameNo:_this.$route.params.gameNo
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          this.getGameNextOpenNodata = data.t;
          let clock = $('.your-clock').FlipClock(parseInt(data.t.restTime),{
            clockFace: 'HourMinuteCounter',
            countdown: true,
            autoStart: false,
            callbacks: {
              start: function() {
              },
              interval:function(){
                if(_this.autoPause){
                  if(clock.getTime().time<10){ 
                    _this.audioSrc = audioArr[clock.getTime().time];          
                    _this.$refs.autoplay.load();
                    _this.$refs.autoplay.play();
                  }
                }else{
                  _this.$refs.autoplay.pause();
                }
              }
            }
          }); 
          clock.start(); 
        }else{

        }
      })
      .catch(error => {

      })
    },    
    //根据游戏查询所有有效游戏玩法(已分组)
    getGameGroupByGameWithGroup () {
      let _this = this;
      let hash = window.location.hash;
      this.$http({
        method:'get',
        url:'/getGameGroupByGameWithGroup',
        params:{
          gameNo:this.$route.params.gameNo
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          this.getGameGroupByGameWithGroupdata = data.list;
          let kind = ''; //默认选择第一条数据
          if(hash.indexOf('#code=')>0){ //刷新页面
            this.kindCheckedIndex = sessionStorage.getItem('kindCheckedIndex');
            kind = hash.substr(hash.indexOf('=')+1,hash.length);
          }else{ //路由进入页面           
            sessionStorage.setItem('kindCheckedIndex',0);
            let playkindFunIndex = {_index:0,index:0};
            sessionStorage.setItem('playkindFunIndex',JSON.stringify(playkindFunIndex));
            kind = data.list[0].groupClassCones[0].groupSettinges[0].groupNo;
            window.location.href = window.location.href+'#code='+kind;
          }
          this.DataNumChoice = ssc.data[kind];
          this.DataNumChoiceCode = kind; 
          this.newArry();
        }else{

        }
      })
      .catch(error => {

      })
    },
    //查询某个彩种下属玩法
    // get方式传参 是params 不是data
    getGameByType () {
      let _this = this;
      this.$http({
        method:'post',
        url:'/getGameByType',
        params:{
          gameType:this.$route.params.gameType
        }
      })
      .then(response => {
        let data = response.data;
        if(data.success){
          
        }else{

        }
      })
      .catch(error => {

      })
    },
    //玩法列表
    kindbarList(item,index){
      let href = window.location.href;
      this.kindCheckedIndex = index;
      sessionStorage.setItem('kindCheckedIndex',index);
      let playkindFunIndex = {_index:0,index:0};
      this.playkindFunIndex =playkindFunIndex;
      sessionStorage.setItem('playkindFunIndex',JSON.stringify(playkindFunIndex));
      $('.play-item-list-panel .play_kind_list').removeClass('active').eq(0).addClass('active');
      let kind = this.getGameGroupByGameWithGroupdata[index].groupClassCones[0].groupSettinges[0].groupNo //默认选择第一条数据
      this.DataNumChoice = ssc.data[kind]; 
      window.location.href = href.substr(0,href.indexOf('=')+1)+kind;
      this.DataNumChoiceCode = kind;
      this.newArry();
    },
    //单个玩法 投注（即大类下的小分类）
    playkindFun(e,groupNo,_index,index){
      let playkindFunIndex = {_index:_index,index:index};
      sessionStorage.setItem('playkindFunIndex',JSON.stringify(playkindFunIndex));
      let href = window.location.href;
      $('.play_kind_list').removeClass('active');
      $(e.target).addClass('active');
      this.DataNumChoice = ssc.data[groupNo]; 
      window.location.href = href.substr(0,href.indexOf('=')+1)+groupNo;
      this.DataNumChoiceCode = groupNo;
      this.newArry();
    },
    //删除 投注 某个对应列表
    allYardListFun(index){
      this.allYardList.splice(index,1)
    },
    //追号列表 item 选中
    checkboxedself(e){
      let my = $(e.target).parents('tr').find('.ivu-checkbox-input');
      my.get(0).checked = !my.get(0).checked;
      if(my.get(0).checked){
        my.parents('.ivu-checkbox').addClass('ivu-checkbox-checked')
      }else{
        my.parents('.ivu-checkbox').removeClass('ivu-checkbox-checked')
      }
    },
    chaseaItemFun(e){  //点击整个列表选中
      this.checkboxedself(e)
    },
  },
  watch:{
    add_times(value){
      this.allPutMoney = this.mul(this.allChoiceYard,value,this.initCodeMoney,this.model1);
    },
    model1(value){
      //后面 同乘以 同除 为了去除js 浮点数 不精确的问题
      this.allPutMoney = this.mul(this.allChoiceYard,value,this.initCodeMoney,this.add_times);
    },
    allYardList(value){
      let _this = this;
      _this.totalChoiceYard=0;
      _this.totalChoiceMoney=0;
      value.map(function(item){
        _this.totalChoiceYard+=item.YardCount;
        _this.totalChoiceMoney+=item.YardMoney;
      })  
    }
  },
  beforeRouteLeave(to, from, next){
    next();
    this.clock.stop(); 
  }
}
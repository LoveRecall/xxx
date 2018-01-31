import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Group ,XNumber,ButtonTab, ButtonTabItem} from 'vux'
import ssc from '@/assets/data/data.ssc.js';
import fiveStarRepet from './module/fiveStarRepet/index.vue' //五星复式法模块
import before2single from './module/before-2-single/index.vue' //前二玩法
export default {
  data() {
    const playkindFunIndex_ = function(){
      let playkindFunIndex = sessionStorage.getItem('playkindFunIndex');
      playkindFunIndex =  typeof playkindFunIndex == 'object' || playkindFunIndex =='null' || playkindFunIndex ==null ? '{ "_index": 0, "index": 0 }' : playkindFunIndex;
      return JSON.parse(playkindFunIndex);
    };
    return {  
      acctAmt:0,//账户余额
      DataNumChoiceCode:window.location.href.substr(window.location.href.indexOf('=')+1,window.location.href.length),//获得保存的编码
      allChoiceYard:0,//共选多少注（选择号码时）
      totalChoiceYard:0,//共选多少注（投注列表 即为所有的选择注数）
      allPutMoney:0,//共投多少元（选择号码时）
      totalChoiceMoney:0,//共投多少元（投注列表 即为所有的选择注数的金额）
      allGetProfit:0, //当前彩种奖金
      estimateProfit:0,//共获得多少利润
      codeNumYardArr:null, //当前页面选择投注的号码 组合
      kindCheckedIndex:0, //彩种玩法下标
      playkindFunIndex:playkindFunIndex_(), //彩种玩法下标(小玩法  用于刷新定位)
      DataNumChoice:[], //后台传入的 选择号码数据 
      allYardList:[], //投注列表
      btnConfirmChoice:true, //确认选号按钮
      btnImmediately:true, //立即下注按钮
      gameOpenNos:'',//最新一期开奖结果
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
      data1: [],
      superadditionBetList:[],//追号投入数据（用于数据传参）
      chaseareatableTd:[], //追号表格td 数据   
      officialjump:false, //官方跳开
      officialStop:false, //中奖停止追号
      chaseIsShow:false,//追号弹出框 控制参数
      chaseinitTimes:1, //追号起始倍数
      aliketimesChase:true,//控制同倍  翻倍 追号切换显示       
      intervalperiod:1, //翻倍间隔周期  
      intervaltimes:2, //翻倍追号 倍数
      superadditionBetMoney:0,//追号总金额
      chaseSelect:10,//追号期数值
      chaseSelectList:[//追号期数 下拉
        {
          label:'请选择',
          value: 0,
        },
        {
          label:'5期',
          value: 5,
        },
        {
          label:'10期',
          value: 10,
        },
        {
          label:'15期',
          value: 15,
        },
        {
          label:'20期',
          value: 20,
        },
      ],
      add_times:1, //倍数
      initCodeMoney:2,//每注价格
      autoplay:false,
      autoPause:true,
      playSwitch:false,
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
      ],
      clock:null, 
    }
  },
  components:{
    XNumber,Group,swiper,swiperSlide,ButtonTab, ButtonTabItem,
    before2single,fiveStarRepet
  },
  filters:{
    _Date(date,fmt) { //author: kangge
      date = new Date(date);
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
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
    this.getAcct();
    this.getGameLatestOpenNo();
    this.getGameNextOpenNo();   
    this.getGameGroupByGameWithGroup();
    this.getGameLatestOpenNoList();
  },
  methods: { 
    resetStatus(){ //状态重置函数
      this.allYardList=[];
      this.btnImmediately=true;
      this.btnConfirmChoice=true;
      this.allChoiceYard = 0;
      this.allPutMoney = 0;
      this.estimateProfit = 0;
      this.add_times = 1;
      this.model1 =1;
    },
    sortId(a,b){   //对象数组排序
      return a.number-b.number  
    },
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
    //查询账户消息
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
          if(data.list.length>0){
            this.historyList = data.list;
            this.historyList.map(function(item){
              item.gameOpenNo = item.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",").join(',');
            })
          }
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
          this.gameOpenNos = data.t;
          this.gameOpenNos.gameOpenNo = this.gameOpenNos.gameOpenNo.replace(/(.)(?=[^$])/g,"$1,").split(",");
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
          _this.clock = $('.your-clock').FlipClock(parseInt(data.t.restTime),{
            clockFace: 'HourMinuteCounter',
            countdown: true,
            autoStart: false,
            callbacks: {
              start: function() {
              },
              interval:function(){
                if(_this.autoPause){
                  if(_this.clock.getTime().time<10){ 
                    _this.audioSrc = audioArr[_this.clock.getTime().time];          
                    _this.$refs.autoplay.load();
                    _this.$refs.autoplay.play();
                  }
                }else{
                  _this.$refs.autoplay.pause();
                }
              }
            }
          }); 
          _this.clock.start(); 
          this.getGameNextOpenNodata = data.t;
        }else{

        }
      })
      .catch(error => {

      })
    },    
    //根据游戏查询所有有效游戏玩法(已分组)
    getGameGroupByGameWithGroup () {
      let _this = this;
      this.$http({
        method:'get',
        url:'/getGameGroupByGameWithGroup',
        params:{
          gameNo:this.$route.params.gameNo
        }
      })
      .then(response => {
        let data = response.data; 
        let href = window.location.href;
        if(data.success){
          _this.getGameGroupByGameWithGroupdata = data.list;
          let kind = ''; //默认选择第一条数据
          if(href.indexOf('#code=')>0){ //刷新页面
            this.kindCheckedIndex = sessionStorage.getItem('kindCheckedIndex');
            kind = href.substr(href.indexOf('=')+1,href.length);
            _this.allGetProfit = data.list[this.kindCheckedIndex].groupClassCones[this.playkindFunIndex._index].groupSettinges[this.playkindFunIndex.index].bonusAmt;
          }else{ //路由进入页面           
            sessionStorage.setItem('kindCheckedIndex',0);
            let playkindFunIndex = {_index:0,index:0};
            sessionStorage.setItem('playkindFunIndex',JSON.stringify(playkindFunIndex));
            kind = data.list[0].groupClassCones[0].groupSettinges[0].groupNo;
            _this.allGetProfit = data.list[0].groupClassCones[0].groupSettinges[0].bonusAmt;
            window.location.href = href+'#code='+kind;           
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
    //游戏投注
    gamebet(){
      if(Number(this.acctAmt)<=0){
        this.$Modal.error({
          content:'您的余额不足,暂无法下注，请及时充值！'
        })
        return
      }
      let _this = this;
      let objArr=[];
      let obj = null;
      let gamePattern = null;
      this.allYardList.map(function(item,index){
        obj = {};
        gamePattern = null;
        obj.gameNo =  _this.$route.params.gameNo;
        obj.groupNo =  _this.getGameGroupByGameWithGroupdata[_this.kindCheckedIndex].groupClassCones[_this.playkindFunIndex._index].groupSettinges[_this.playkindFunIndex.index].groupNo;
        obj.betContent = item.YardNum;
        obj.betMultiple = item.YardTimes;
        obj.betNumber = item.YardCount;
        obj.betAmt = item.YardMoney;
        obj.estimateProfit = _this.allGetProfit-item.YardMoney;
        if( _this.model1==1){
          gamePattern=0
        }else if( _this.model1==0.1){
          gamePattern=1
        }else if( _this.model1==0.01){
          gamePattern=2
        }
        obj.gamePattern = gamePattern;
        objArr.push(obj)
      });
      this.allYardList = [];
      this.$http({
        method:'post',
        url:'/game/bet',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data:objArr
      })
      .then(response => {
        let data = response.data;
        this.textAreaV='';
        let content = '';
        if(data.success){
          content='投注成功'
        }else{
          content =data.msg;
        }
        _this.$Modal.warning({
          content:content
        })
      })
      .catch(error => {

      })
    },
    //查询当前追投列表
    getGameNextOpenNoLists(){
      let _this =this;
      this.$Message.loading({content:'加载中...'})
      this.$http({
        method:'get',
        url:'/gameOpenNo/getGameNextOpenNoList',
        params:{
          gameNo:this.$route.params.gameNo,
          size:10,
        },
      })
      .then(response => {
        _this.$Message.destroy();
        let data = response.data;
        if(data.success){
          data.list.map(function(item,index){
            _this.chaseareatableTd[index] = item;
            _this.chaseareatableTd[index].addTimes =0;
            _this.chaseareatableTd[index].currCost =0;
          })
          this.chaseIsShow=true;
        }else{
          
        }
      })
      .catch(error => {

      })
    },
    //玩法列表
    kindbarList(item,index){
      this.resetStatus();
      let href = window.location.href;
      this.kindCheckedIndex = index;
      sessionStorage.setItem('kindCheckedIndex',index);
      let playkindFunIndex = {_index:0,index:0};
      this.playkindFunIndex =playkindFunIndex;
      this.allGetProfit = this.getGameGroupByGameWithGroupdata[this.kindCheckedIndex].groupClassCones[this.playkindFunIndex._index].groupSettinges[this.playkindFunIndex.index].bonusAmt;
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
      this.resetStatus();
      let playkindFunIndex = {_index:_index,index:index};
      this.allGetProfit = this.getGameGroupByGameWithGroupdata[this.kindCheckedIndex].groupClassCones[playkindFunIndex._index].groupSettinges[playkindFunIndex.index].bonusAmt;
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
    checkboxedself(e,index){
      this.changeCheckStatus(e,index,e.target.checked)
    },
    chaseaItemFun(e,index){  //点击整个列表选中
      let my = $(e.target).parents('.ivu-checkbox-tr').find('.ivu-checkbox-input');
      my.get(0).checked = !my.get(0).checked;
      this.changeCheckStatus(e,index,my.get(0).checked)
    },
    //改变复选框状态
    changeCheckStatus(e,index,checked,input){
      if(this.chaseinitTimes<=0){
        this.chaseinitTimes=1;
      }
      let _this = this;
      let my = $(e.target).parents('.ivu-checkbox-tr').find('.ivu-checkbox-input');
      if(checked){
        if(this.chaseareatableTd[index].addTimes<=0){
          this.chaseareatableTd[index].addTimes=parseInt(this.chaseinitTimes);
        }
        this.chaseareatableTd[index].currCost=this.mul(this.totalChoiceMoney,this.chaseareatableTd[index].addTimes);
        this.superadditionBetList.push(this.chaseareatableTd[index]);  
        this.superadditionBetList = Array.from(new Set(this.superadditionBetList)); //去重操作 
        this.superadditionBetList = this.superadditionBetList.sort(this.sortId); //数组排序
        this.doubleUpdate(input);
        my.parents('.ivu-checkbox').addClass('ivu-checkbox-checked');
      }else{
        this.chaseareatableTd[index].addTimes=0;
        this.chaseareatableTd[index].currCost=0;
        this.superadditionBetList.map(function(item,itemindex){
          if(item.number==_this.chaseareatableTd[index].number){
            _this.superadditionBetList.splice(itemindex,1);
            _this.doubleUpdate(input);
          }
        })   
        my.parents('.ivu-checkbox').removeClass('ivu-checkbox-checked')
      }
    },
    //翻倍追号 操作修改数据 
    doubleUpdate(input){
      let _this =this;
      if(input!='input'){ //判断在翻倍模式中 是否是用户 在自定义倍数
        if(!this.aliketimesChase){
          if(this.superadditionBetList.length>=1){
            //通过排序 循环匹配 匹配到了 _this.chaseareatableTd 值
            this.superadditionBetList.map(function(item,itemindex){
              _this.chaseareatableTd.map(function(_item,_itemindex){
                if(item==_item){
                  if(itemindex<_this.intervalperiod){
                    _item.addTimes = _this.chaseinitTimes;
                  }else{ 
                    _item.addTimes = _this.intervaltimes*_this.superadditionBetList[itemindex-_this.intervalperiod].addTimes;
                  }
                }
                _item.currCost=_this.mul(_this.totalChoiceMoney,_item.addTimes);
              })
            }) 
          }        
        }
      }
    },
    //不能使用v-model 手动修改
    changeChaseareaAddTimes(index,e){
      let _this =this;
      this.chaseareatableTd[index].addTimes = parseInt(e.target.value);
      let my = $(e.target).parents('.ivu-checkbox-tr').find('.ivu-checkbox-input');
      let checked =null;
      if(parseInt(e.target.value)<=0||e.target.value==''){
        checked = false;
      }else{
        checked = true;
      }
      my.get(0).checked = checked;
      _this.changeCheckStatus(e,index,checked,'input')
    },
    //生成追号计划
    generatePlan(){
      this.superadditionBetList=[];
      $('.ivu-checkbox-table .ivu-checkbox').removeClass('ivu-checkbox-checked');
      this.chaseareatableTd.map(function(item){item.addTimes=0;item.currCost=0});
      $('.ivu-checkbox-table .ivu-checkbox-input').each(function(){      
        $(this).get(0).checked = false;      
      });
      if(this.chaseinitTimes>0){
        this.chaseSelect = this.chaseSelect>this.chaseareatableTd.length ? this.chaseareatableTd.length :this.chaseSelect;
        for(let i =0;i<parseInt(this.chaseSelect);i++){ //生成期数
          if(!this.aliketimesChase){ //翻倍
            if(i<this.intervalperiod){
              this.chaseareatableTd[i].addTimes = this.chaseinitTimes;
            }else{
              this.chaseareatableTd[i].addTimes=this.intervaltimes*this.chaseareatableTd[i-this.intervalperiod].addTimes;
            }
          }else{
            this.chaseareatableTd[i].addTimes=this.chaseinitTimes;
          }
          this.chaseareatableTd[i].currCost=this.mul(this.totalChoiceMoney,this.chaseinitTimes);
          this.superadditionBetList.push(this.chaseareatableTd[i]);  
          $('.ivu-checkbox-table .ivu-checkbox-input').eq(i).get(0).checked = true;
          $('.ivu-checkbox-table .ivu-checkbox').eq(i).addClass('ivu-checkbox-checked');
        } 
      }
    },
    aliketimesChasefun(arg){
      if(arg == 'alike'){ //同倍追号
        this.aliketimesChase = true;
      }else{
        this.aliketimesChase = false;
      }
    }
  },
  watch:{
    add_times(value){
      this.allPutMoney = this.mul(this.allChoiceYard,value,this.initCodeMoney,this.model1);
      this.estimateProfit = this.allGetProfit - this.allPutMoney;
    },
    model1(value){
      //后面 同乘以 同除 为了去除js 浮点数 不精确的问题
      this.allPutMoney = this.mul(this.allChoiceYard,value,this.initCodeMoney,this.add_times);
      this.estimateProfit = this.allGetProfit - this.allPutMoney;
    },
    allYardList(value){
      let _this = this;
      _this.totalChoiceYard=0;
      _this.totalChoiceMoney=0;
      value.map(function(item){
        _this.totalChoiceYard+=item.YardCount;
        _this.totalChoiceMoney+=item.YardMoney;
      })  
    },
    // chaseareatableTd:{
    //   handler(newValue, oldValue) {
       
    //   },
    //   deep: true
    // },
    aliketimesChase(value){
      this.superadditionBetList=[];
      this.saveCountArr = [];
      $('.ivu-checkbox-table .ivu-checkbox').removeClass('ivu-checkbox-checked');
      this.chaseareatableTd.map(function(item){item.addTimes=0;item.currCost=0});
      $('.ivu-checkbox-table .ivu-checkbox-input').each(function(){      
        $(this).get(0).checked = false;
      });
    },
    superadditionBetList(value){
      this.superadditionBetMoney = 0;
      for(let i=0;i<value.length;i++){
        this.superadditionBetMoney += value[i].addTimes*this.totalChoiceMoney;
      }
    }
  },
  beforeRouteLeave(to, from, next){
    next();
    this.clock.stop(); 
  }
}
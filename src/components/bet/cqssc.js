import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Group ,XNumber,ButtonTab, ButtonTabItem} from 'vux'
export default {
  data() {
    return {  
      allChoiceYard:0,//共选多少注（选择号码时）
      totalChoiceYard:0,//共选多少注（投注列表 即为所有的选择注数）
      allPutMoney:0,//共投多少元（选择号码时）
      totalChoiceMoney:0,//共投多少元（投注列表 即为所有的选择注数的金额）
      allGetProfit:0, //共获得多少利润
      DataNumChoice:[[],[],[]], //后台传入的 选择号码数据
      codeNumYardArr:null, //当前页面选择投注的号码 组合
      kindCheckedIndex:0, //彩种玩法下标
      allYardList:[], //投注列表
      btnConfirmChoice:true, //确认选号按钮
      btnImmediately:true, //立即下注按钮
      randomCount:1, //随机注数
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
          addTimes: '',
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        },
        {
          number: '20180118032',
          addTimes: '',
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        },
        {
          number: '20180118033',
          addTimes: '',
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        },
        {
          number: '20180118034',
          addTimes: '',
          currCost: '3',
          stopTime: '2018-01-17 12:00:00',
        }],       
      chaseinitTimes:1, //追号起始倍数         
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
      silderVal:0,
      add_times:1, //加倍
      initCodeMoney:2,//每注价格
      hotChecked:false, //冷热
      LostChecked:false, //遗漏
      autoplay:false,
      autoPause:true,
      playSwitch:false,
      chaseIsShow:true,//追号弹出框 控制参数
      clock:'',
      audioSrc:'/static/audio/10.ogg',
      historyList:[
        {serial_number:'0125426',number:'1,2,3,4,5,6,7,8'},
        {serial_number:'0125425',number:'1,2,3,4,5,6,7,8'},
        {serial_number:'0125422',number:'1,2,3,4,5'},
        {serial_number:'0125446',number:'1,2,3,4,5,6,7,8'},
        {serial_number:'0125467',number:'1,2,3,4,5,6,7,8'},
        {serial_number:'0125472',number:'1,2,3,4,5'},
        {serial_number:'0125468',number:'1,2,3,4,5,6,7,8'},
      ],
      // 模式 元 角 分 厘
      modelList: [
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
      model1: 1
    }
  },
  components:{
    XNumber,Group,swiper,swiperSlide,ButtonTab, ButtonTabItem
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  filters:{
    filterFun(res){
      let _res = res;
      if(_res==1){
        _res='百位'
      }else if(_res==2){
        _res='十位'
      }else if(_res==3){
        _res='个位'
      }
      return _res
    }
  },
  mounted(){
    this.codeNumYardArr = new Array();  //先声明一维 用来存放注码
    let i=this.DataNumChoice.length;
    for(let k=0;k<i;k++){    //一维长度为i,i为变量，可以根据实际情况改变     
      this.codeNumYardArr[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；     
    }
    let _this = this;
    this.getGameByType();
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
    ]
    this.clock = $('.your-clock').FlipClock(15,{
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
    // this.clock.start();      
  },
  methods: {
    a(selection,row){

    },
    b(){},
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
      this.kindCheckedIndex = index;
    },
    //单个玩法 投注（即大类下的小分类）
    playkindFun(itemse,e){
      $('.play_kind_list').removeClass('active');
      $(e.target).addClass('active');
    },
    //选择 号码
    choiceNum(e,index){
      let _codeNumYardArr = this.codeNumYardArr;
      if($(e.target).hasClass('active')){
        $(e.target).removeClass('active');
        _codeNumYardArr[index].splice(_codeNumYardArr[index].indexOf(e.target.innerText),1)
      }else{
        $(e.target).addClass('active');
        _codeNumYardArr[index].push(e.target.innerText)
      }       
      this.validChioceNum();
    },
    //快速选择号码
    quickChoice(e,index){  //判断每个列表下的 号码选中  就知道 是否完成一注
      let _codeNumYardArr = this.codeNumYardArr;
      $(e.target).addClass('active').siblings().removeClass('active');
      //每次先清空 选中
      //获取父级 panelList 下的 p
      let panelList_p = $(e.target).parents('.play-content-list').find('.ball-panel P');
      panelList_p.removeClass('active')
      let text = e.target.innerText;
      _codeNumYardArr[index]=[]; //单行 选择投注号码 数组清空 否则重复添加
      if(e.target.innerText=='全'){
        panelList_p.addClass('active')
        panelList_p.each(function(){
          _codeNumYardArr[index].push($(this).text());
        })
      }else if(e.target.innerText=='大'){
        for(let i =5;i<10;i++){
          panelList_p.eq(i).addClass('active')
          _codeNumYardArr[index].push(panelList_p.eq(i).text());
        }
      }else if(e.target.innerText=='小'){
        for(let i =0;i<5;i++){
          panelList_p.eq(i).addClass('active')
          _codeNumYardArr[index].push(panelList_p.eq(i).text());
        }
      }else if(e.target.innerText=='单'){
        for(let i =0;i<panelList_p.length;i++){
          if(Number(panelList_p.eq(i).text())%2!=0){
            panelList_p.eq(i).addClass('active');
            _codeNumYardArr[index].push(panelList_p.eq(i).text());
          }
        }
      }else if(e.target.innerText=='双'){
        for(let i =0;i<panelList_p.length;i++){
          if(Number(panelList_p.eq(i).text())%2==0){
            panelList_p.eq(i).addClass('active');
            _codeNumYardArr[index].push(panelList_p.eq(i).text());
          }
        }
      }else if(e.target.innerText=='清'){

      }
      this.validChioceNum();
    },
    validChioceNum(){ //是否完成有效投注
      let _this = this;
      let valid = true; 
      for(let i=0 ;i<_this.DataNumChoice.length;i++){
        if(_this.codeNumYardArr[i].length<=0){
          valid = false;
        }
      }
      if(valid){
        let items=1; //总注码数
        _this.codeNumYardArr.map(function(item){
          items*=item.length
        })
        this.btnImmediately = false;
        this.btnConfirmChoice = false;
        this.allChoiceYard = items;
        this.allPutMoney = items*this.add_times*this.model1*this.initCodeMoney;
      }else{
        this.allChoiceYard = 0;
        this.allPutMoney= 0;
        this.btnImmediately = true;
        this.btnConfirmChoice = true;
      }
    },
    //随机生成 注码
    randomCodeNum(){
      this.randomCount=parseInt(this.randomCount);
      if(this.randomCount<1){
        this.$Modal.warning({
          title:'提示',
          content:'随机数不能小于1',
          width:'200px',
        })
      }else{
        for (let k = 0; k < this.randomCount; k++) {
          let splitArr=''; //转换数组 传入后台输出格式
          let allYardObj = {};
          for (let i = 0; i < this.DataNumChoice.length; i++) { 
            let a = '|';
            if(i==this.DataNumChoice.length-1){
              a='';
            } 
            splitArr+=Math.floor(Math.random()*10)+a; 
          }             
          allYardObj.YardName = $('#play_item_list p.play_kind_list.active').text(); 
          allYardObj.YardNum = splitArr; 
          allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
          allYardObj.YardCount = 1;
          allYardObj.YardTimes = this.add_times;
          allYardObj.YardMoney = this.initCodeMoney*this.add_times*this.model1;
          this.allYardList.push(allYardObj);
        }
      }
    },
    //删除 投注 某个对应列表
    allYardListFun(index){
      this.allYardList.splice(index,1)
    },
    //确认选号
    btnConfirmChoiceFun(){
      //全部清空
      let allYardObj = {};
      let splitArr=''; //转换数组 传入后台输出格式
      allYardObj.YardName = $('#play_item_list p.play_kind_list.active').text();
      for (let i = 0; i < this.codeNumYardArr.length; i++) { 
        let a = '|';
        if(i==this.codeNumYardArr.length-1){
          a='';
        } 
        splitArr+= this.codeNumYardArr[i].sort()+a;  
      }  
      allYardObj.YardNum = splitArr;
      allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
      allYardObj.YardCount = this.allChoiceYard;
      allYardObj.YardTimes = this.add_times;
      allYardObj.YardMoney = this.allPutMoney;
      this.allYardList.push(allYardObj);
      $('.play-content p.active').removeClass('active');
      this.btnImmediately = true;
      this.btnConfirmChoice = true;
      this.codeNumYardArr = new Array();  
      let i=this.DataNumChoice.length;
      for(let k=0;k<i;k++){       
        this.codeNumYardArr[k]=new Array(); 
      }
      this.validChioceNum(); 
    }
  },
  watch:{
    add_times(value){
      if(value<=1){
        this.add_times=1;
      }
      this.allPutMoney =  Number(this.allChoiceYard*value*this.initCodeMoney*this.model1)*1000000/1000000;
    },
    model1(value){
      //后面 同乘以 同除 为了去除js 浮点数 不精确的问题
      this.allPutMoney = Number(this.allChoiceYard*value*this.initCodeMoney*this.add_times)*1000000/1000000;
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
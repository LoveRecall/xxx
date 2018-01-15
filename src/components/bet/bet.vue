<template>
  <div class="bet">
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
      <div class="logo flex">
        <div class="logo_img">
          <img src="" alt="">
        </div>
        <div class="user_info">
          <div class="flex">
            <div class="item">
              <span>账号:</span><span v-text="custName"></span>
            </div>
            <div class="item">
              <span>余额:</span><span v-text="acctAmt"></span>
            </div>
            <div class="item" @click="$router.push('/homeView/lobby')">返回大厅</div>
            <div class="item">退出登录</div>
          </div>         
        </div>
        <div class="clear"></div>
      </div>     
    </div>

    <div class="content-warp flex">
      <div class="left-panel">
        <div class="nav-item-box flex">
          <div class="active">
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-chongzhi1 vertical-m"></i>
              <span class="vertical-m">充值</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-zhuzhuangtu vertical-m"></i>
              <span class="vertical-m">帐变记录</span>
            </router-link>
          </div>
          <div>
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-chongzhi vertical-m"></i>
              <span class="vertical-m">提现</span>
            </router-link>
          </div>
          <div>
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-youxipianhao vertical-m"></i>
              <span class="vertical-m">游戏记录</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-zhanghuguanli vertical-m"></i>
              <span class="vertical-m">账户管理</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-huiyuan vertical-m"></i>
              <span class="vertical-m">会员中心</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-iconfontdianhua vertical-m"></i>
              <span class="vertical-m">联系客服</span>
            </router-link>
          </div>
          <div>
            <router-link to="">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-jieshi vertical-m"></i>
              <span class="vertical-m">规则说明</span>
            </router-link>
          </div>
        </div>
        <!-- 开奖历史 -->
        <div class="history-box">
          <div class="history-tag">
            <router-link to="">
              <span class="vertical-m">开奖历史</span>
              <i class="iconfont icon-rili vertical-m"></i>
            </router-link>
          </div>
          <div class="history-list-box">
            <div class="history-list flex" :title="item.number" v-for="(item,index) in historyList">
              <div class="sort" v-text="index+1"></div>
              <div class="serial_number" v-text="item.serial_number"></div>
              <div class="number" v-text="item.number"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rigth-panel">
        <div class="award-result flex">
          <div class="flex">
            <div class="result flex">
              <div class="ball-panel flex">
                <p>3</p>
                <p>4</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>8</p>
                <p>8</p>
                <p>8</p>
                <p>8</p>
                <p>8</p>
              </div>
              <p>第2018010412期开奖结果</p>
            </div>
            <div class="result-countdown flex">
              <p class="result-countdown-tit">
                <span>第</span>
                <span style="color:#ffb508;"> 201801041 </span>
                <span>期</span>
                <button v-if="autoPause" @click="autoPause=false">关闭音效</button>
                <button v-else @click="autoPause=true">打开音效</button>
              </p>
              <div class="countdown align-items-c flex">
                <div style="white-space: nowrap;color:#fff;font-size:16px;">剩余投注时间 </div>
                <div class="your-clock"></div>
                <audio ref="autoplay">
                  <source :src="audioSrc" type="audio/ogg"/>
                </audio>
              </div>
            </div>
          </div>
        </div>
        <div class="play-box">
          <div class="play-bar flex">
            <div class="play-item flex">
              <p v-for="(item,index) in 10" :key="index" :class="[(kindCheckedIndex ==index?'active':'')]" @click="kindbarList(item,index)">五星</p>
            </div>
            <div class="switch">
              <i-switch v-model="playSwitch"></i-switch>
              <span v-if="playSwitch">信用玩法</span>
              <span v-else>官方玩法</span>
            </div>
          </div>
          <div class="play-item-list-panel">
            <div class="play-item-list flex" v-for="item in 2">
              <p class="item-label">后三直选：</p>
              <p class="item play_kind_list" @click="playkindFun(items,$event)" v-for="(items,index) in 19" :key="index">后三直</p>
            </div>
          </div>
          <div class="play-content">
            <div class="play-content-list flex" v-for="(itemWarp,DataNumIndex) in DataNumChoice" :key="DataNumIndex">
              <div class="label">
                <span>{{itemWarp | filterFun}}</span>
              </div>
              <div class="ball-panel flex">
                <div v-for="(item,index) in 10" :key="index">
                  <p @click="choiceNum($event,DataNumIndex)" v-text="item-1"></p>
                  <sup v-if="LostChecked" :style="{color:item%2==0?'red':''}" v-text="item-1"></sup>
                  <sup v-if="hotChecked" :style="{color:item%2==0?'red':''}" v-text="item+1"></sup>
                </div>
              </div>
              <div class="play-btn-box flex">
                <p @click="quickChoice($event,DataNumIndex)">全</p>
                <p @click="quickChoice($event,DataNumIndex)">大</p>
                <p @click="quickChoice($event,DataNumIndex)">小</p>
                <p @click="quickChoice($event,DataNumIndex)">单</p>
                <p @click="quickChoice($event,DataNumIndex)">双</p>
                <p @click="quickChoice($event,DataNumIndex)">清</p>
              </div>
            </div>
            <div style="align-items: center;" class="flex">
              <div>后三码:</div>
              <div>后三直选复式</div>
              <div style="margin-left:20px;">
                <Checkbox v-model="hotChecked" @click.native="LostChecked = false">
                  <span style="margin-left:2px;">冷热</span>
                </Checkbox>
                <Checkbox v-model="LostChecked" @click.native="hotChecked = false">
                  <span style="margin-left:2px;">遗漏</span>
                </Checkbox>
              </div>
              <br>
            </div>
          </div>
          <!-- 加倍区 -->
          <div class="add-area-box">
            <div class="add-area flex">
              <div class="flex align-items-c add-panel">
                <p @click="add_times-=1" class="add"><i class="iconfont icon-jianhao"></i></p>
                <input v-model="add_times" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" class="add_v" type="text">
                <p @click="add_times+=1" class="add"><i class="iconfont icon-iconjia"></i></p>
              </div>
              <p style="margin:0 2px;">倍</p>
              <p style="margin:0 2px;">模式</p>
              <div class="model">
                <Select v-model="model1" style="width:50px">
                    <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div class="silder">
                <div>
                  <Slider v-model="silderVal" :step="1"></Slider>
                </div>
              </div>
              <div class="flex showChip">
                <p>{{silderVal}}</p>
                <p>
                  共选<span style="color:#da4040;" v-text="allChoiceYard"></span>注；
                  共投<span style="color:#da4040;" v-text="allPutMoney"></span>元，
                  盈利<span style="color:#da4040;" v-text="allGetProfit"></span>元
                </p>
              </div>
              <div class="btn-group">
                <Button type="warning">
                  <Icon type="ios-compose"></Icon>
                  确认选号
                </Button>
                <Button type="warning" disabled>
                  <Icon type="android-checkbox-outline"></Icon>
                  立即下注
                </Button>
              </div>
            </div>
            <div class="add-area flex">
              <p>随机</p>
              <p><input type="text" style="outline:none;border:1px solid #ccc;width:30px;text-align:center;margin:0 5px;">注</p>
              <p style="margin:0 5px;">
                <Button type="default">
                  <Icon type="shuffle" color="#d32a3d"></Icon>
                  随机
                </Button>
              </p>
              <p style="width:155px;text-align:center;">投注列表</p>
              <p style="margin:0 5px;">
                <Button type="default">
                  <Icon type="ios-trash-outline" color="#d32a3d"></Icon>
                  清空
                </Button>
              </p>
              <p style="width:150px;text-align:center;">操作状态</p>
              <div class="add-area-switc">
                <i-switch v-model="playSwitch" class="vertical-m"></i-switch>
                <span class="vertical-m">是否锁定倍数</span>
              </div>
            </div>
          </div>
          <!-- 表格 -->
          <div class="table-box">
            <div class="table-item-1 flex">
              <div class="table-content">
                <div class="table-list" v-for="item in 4">
                  <p>后三直选复式</p>
                  <p>5|8</p>
                  <p>元</p>
                  <p>1注</p>
                  <p>1倍</p>
                  <p>2元</p>
                  <p>
                    <Button type="text">
                      <Icon type="ios-trash-outline" color="#d32a3d"></Icon>
                      删除
                    </Button>
                  </p>
                </div>
              </div>
              <div class="operation-box">
                <div class="operation-list">
                  <p>选择</p>
                  <p class="text-r"><span style="color:#ec282c;">0</span>注<span style="color:#ec282c;">0</span>单</p>
                </div>
                <div class="operation-list">
                  <p>投注</p>
                  <p class="text-r"><span>元</span></p>
                </div>
                <div class="operation-list">
                  <p>追号</p>
                  <p class="text-r"><span>无追号</span></p>
                </div>
              </div>
              <div class="operation-btn-box flex">
                <div class="flex align-items-c" style="justify-content: space-between;width:100%;">
                  <div>
                    <Button type="warning" disabled>
                        <Icon type="android-share-alt"></Icon>
                        我要追号
                    </Button>
                  </div>
                  <div>
                    <p>
                      <Checkbox>
                        <span style="margin-left:2px;">官方跳开即停</span>
                      </Checkbox>
                    </p>
                    <p>
                      <Checkbox>
                        <span style="margin-left:2px;">中奖后停止追号</span>
                      </Checkbox>
                    </p>
                  </div>
                </div>
                <div style="width:100%;margin-top:10px;">
                  <Button style="width:100%;" type="warning">
                    <Icon type="ios-checkmark-outline"></Icon>
                      确认下注
                  </Button>
                </div>
              </div>
            </div>
            <div class="play-record-box">
              <div class="play-record-title">
                <div>游戏记录</div>
                <div class="btn-panel">
                  <Button type="warning">                    
                      更多记录
                  </Button>
                </div>
              </div>
              <div class="play-record-table">
                <Table :columns="columns1" :data="data1"></Table>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </div>
    <div class="other-ball">
      <div class="other-ball-border">
        <div class="other-ball-title">
          <div class="tag">其他彩票</div>
        </div>
        <div class="swiper-ball">
          <div class="swiper-box">
            <div class="swiper-button-prev">
              <i class="iconfont icon-left"></i>
            </div>
            <swiper style="height:100%;" :options="swiperOption" ref="mySwiper">
              <!-- slides -->
              <swiper-slide class="flex" v-for="item in 9" :key="item">
                <div class="img-box">
                  <img src="" alt="">
                </div>
                <div style="color:#fff;">{{item}}</div>
              </swiper-slide>
              <!-- Optional controls -->         
            </swiper>
            <div class="swiper-button-next">
              <i class="iconfont icon-icon-up"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_line_1"></div>
    <div class="content_line_2"></div>
    <div class="footer">
      <span>xxx平台1.0,xxx版权所有</span>
    </div>
  </div>
</template>
<script>
  import '../../assets/js/flipclock/flipclock.min.js'
  import '../../assets/js/flipclock/flipclock.min.css'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Group ,XNumber } from 'vux'
  export default {
    data() {
      return {  
        allChoiceYard:0,//共选多少注
        allPutMoney:0,//共投多少元
        allGetProfit:0, //共获得多少利润
        DataNumChoice:[[],[],[]], //后台传入的 选择号码数据
        codeNumYardArr:null, //选择投注的号码 组合
        kindCheckedIndex:0, //彩种玩法下标
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
        silderVal:0,
        add_times:1, //加倍
        initCodeMoney:2,//每注价格
        hotChecked:false, //冷热
        LostChecked:false, //遗漏
        autoplay:false,
        autoPause:true,
        playSwitch:false,
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
      XNumber,Group,swiper,swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
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
          this.allChoiceYard = items;
          this.allPutMoney = items*this.add_times*this.model1*this.initCodeMoney;
        }else{
          this.allChoiceYard = 0;
          this.allPutMoney= 0;
        }
      },
    },
    watch:{
      add_times(value){
        if(value<=1){
          this.add_times=1;
        }
        this.allPutMoney = this.allChoiceYard*value*this.initCodeMoney*this.model1;
      },
      model1(value){
        //后面 同乘以 同除 为了去除js 浮点数 不精确的问题
        this.allPutMoney = Number(this.allChoiceYard*value*this.initCodeMoney*this.add_times)*1000000/1000000;
      }
    },
    beforeRouteLeave(to, from, next){
      next();
      this.clock.stop(); 
    }
  }
</script>
<style scoped lang="less">
  @import 'bet.less';
</style>

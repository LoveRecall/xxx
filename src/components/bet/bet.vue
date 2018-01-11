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
              <span>账号:</span><span>xxcsdda</span>
            </div>
            <div class="item">
              <span>余额:</span><span>sadas</span>
            </div>
            <div class="item">返回大厅</div>
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
              <p v-for="item in 10"><router-link class="active" to="/">五星</router-link></p>
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
              <p class="item" v-for="items in 19">后三直</p>
            </div>
          </div>
          <div class="play-content">
            <div class="play-content-list flex" v-for="itemWarp in 3">
              <div class="label">
                <span>{{itemWarp | filterFun}}</span>
              </div>
              <div class="ball-panel flex">
                <p v-for="item in 19">{{item}}</p>
              </div>
              <div class="play-btn-box flex">
                <p>全</p>
                <p>大</p>
                <p>小</p>
                <p>单</p>
                <p>双</p>
                <p>清</p>
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
                <p class="add"><i class="iconfont icon-jianhao"></i></p>
                <input  class="add_v" type="text" v-model="add_times">
                <p class="add"><i class="iconfont icon-iconjia"></i></p>
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
                  共选<span style="color:#da4040;"> 1000 </span>注；
                  共投<span style="color:#da4040;"> 2000 </span>元，
                  盈利<span style="color:#da4040;"> 600 </span>元
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
        add_times:999, //加倍
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
        modelList: [
            {
              value: '元',
              label: '元'
            },
            {
              value: '角',
              label: '角'
            },
            {
              value: '分',
              label: '分'
            },
            {
              value: '厘',
              label: '厘'
            },
        ],
        model1: '元'
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
      this.clock.start();      
    },
    methods: {

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

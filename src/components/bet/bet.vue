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
            <span class="vertical-m" style="color:#050503" v-text="hourFun">下午</span>      
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
            <div class="item" @click="loginOut">退出登录</div>
          </div>         
        </div>
        <div class="clear"></div>
      </div>     
    </div>

    <div class="content-warp flex">
      <div class="left-panel">
        <div class="nav-item-box flex">
          <div class="active">
            <router-link to="/homeView/user_center">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-chongzhi1 vertical-m"></i>
              <span class="vertical-m">充值</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="/homeView/user_center/curtain">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-zhuzhuangtu vertical-m"></i>
              <span class="vertical-m">帐变记录</span>
            </router-link>
          </div>
          <div>
            <router-link to="/homeView/user_center/withdrawal">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-chongzhi vertical-m"></i>
              <span class="vertical-m">提现</span>
            </router-link>
          </div>
          <div>
            <router-link to="/homeView/user_center/buyQuery">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-youxipianhao vertical-m"></i>
              <span class="vertical-m">游戏记录</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="/homeView/user_center/personalOverview">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-zhanghuguanli vertical-m"></i>
              <span class="vertical-m">账户管理</span>
            </router-link>
          </div>
          <div class="active">
            <router-link to="/homeView/user_center">
              <i class="iconfont icon-arrRight-fill vertical-m"></i>
              <i class="iconfont icon-huiyuan vertical-m"></i>
              <span class="vertical-m">用户中心</span>
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
            <div class="history-list flex" :title="'期数：'+item.gameNumber+'；开奖号码：'+item.gameOpenNo" v-for="(item,index) in historyList">
              <div class="sort" v-text="index+1"></div>
              <div class="serial_number" v-text="item.gameNumber"></div>
              <div class="number" v-text="item.gameOpenNo"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="rigth-panel">
        <div class="award-result flex">
          <div class="flex">
            <div class="result flex">
              <div class="ball-panel flex">
                <p v-for="(item,index) in gameOpenNo.gameOpenNo" :key="index" v-text="item"></p>
              </div>
              <p>第<span v-text="gameOpenNo.gameNumber"></span>期开奖结果</p>
            </div>
            <div v-if="!getGameNextOpenNodata.gameNumber" class="result-countdown flex" style="color:#fff;">
              未找到下一期开奖数据！
            </div>
            <div v-if="getGameNextOpenNodata.gameNumber" class="result-countdown flex">
              <p class="result-countdown-tit">
                <span>第</span>
                <span style="color:#ffb508;" v-text="getGameNextOpenNodata.gameNumber"></span>
                <span>期</span>
                <button v-if="autoPause" @click="autoPause=false">关闭音效</button>
                <button v-else @click="autoPause=true">打开音效</button>
              </p>
              <div class="countdown align-items-c flex">
                <div style="white-space: nowrap;color:#fff;font-size:14px;margin-right:10px;">剩余投注时间</div>
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
              <p v-for="(item,index) in getGameGroupByGameWithGroupdata" 
                 :key="index" 
                 v-text="item.groupClassName" 
                 :class="[(kindCheckedIndex ==index?'active':'')]" 
                 @click="kindbarList(item,index)"></p>
            </div>
            <div class="switch">
              <i-switch v-model="playSwitch"></i-switch>
              <span v-if="playSwitch">信用玩法</span>
              <span v-else>官方玩法</span>
            </div>
          </div>
          <div class="play-item-list-panel">
            <div v-if="getGameGroupByGameWithGroupdata.length>0">
              <div class="play-item-list flex" 
                v-for="(_item,_index) in getGameGroupByGameWithGroupdata[kindCheckedIndex].groupClassCones" :key="_index">
              <p class="item-label" v-text="_item.groupClassConName+'：'"></p>
              <p :class="[('item'),('play_kind_list'),(index==playkindFunIndex.index&&_index==playkindFunIndex._index?'active':'')]"  
                  @click="playkindFun($event,items.groupNo,_index,index)" 
                  v-for="(items,index) in _item.groupSettinges" :key="index" 
                  v-text="items.groupName"></p>
              </div>
            </div>
          </div>
          <!-- 不同玩法 加载不同模块   注：同一玩法可能有相同的模板 -->
          <!--五星复式-->     
          <fiveStarRepet v-if="this.DataNumChoiceCode == 111155001122" ref="fiveStarRepet"></fiveStarRepet> 
          <!-- 前二-->
          <before2single v-if="this.DataNumChoiceCode == 111122111111" ref="before2single"></before2single> 
          <!-- 不同玩法 加载不同模块 -->
          <!-- 表格 -->
          <div class="table-box">
            <div class="table-item-1 flex">
              <div class="table-content">
                <div style="display:table;width:100%;"> 
                  <div class="table-list" v-for="(item,index) in allYardList" :key="index">
                    <p v-text="item.YardName"></p>
                    <p style="width:120px;">
                      <span style="display:block;width:120px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-text="item.YardNum" :title="item.YardNum"></span>
                    </p>
                    <p v-text="item.YardMoneyKind"></p>
                    <p v-text="item.YardCount+'注'"></p>
                    <p v-text="item.YardTimes+'倍'"></p>
                    <p v-text="item.YardMoney+'元'"></p>
                    <p>
                      <Button @click="allYardListFun(index)" type="text">
                        <Icon type="ios-trash-outline" color="#d32a3d"></Icon>
                        删除
                      </Button>
                    </p>
                  </div>
                </div>
                
              </div>
              <div class="operation-box">
                <div class="operation-list">
                  <p>选择</p>
                  <p class="text-r">
                    <span style="color:#ec282c;" v-text="totalChoiceYard"></span>注
                    <span style="color:#ec282c;" v-text="allYardList.length>0?allYardList.length:0"></span>单
                  </p>
                </div>
                <div class="operation-list">
                  <p>投注</p>
                  <p class="text-r"><span style="color:#ec282c;" v-text="totalChoiceMoney+'元'"></span></p>
                </div>
                <div class="operation-list">
                  <p>追号</p>
                  <p class="text-r"><span>无追号</span></p>
                </div>
              </div>
              <div class="operation-btn-box flex">
                <div class="flex align-items-c" style="justify-content: space-between;width:100%;">
                  <div>
                    <Button type="warning" @click="chaseIsShow=true" :disabled="allYardList.length<=0">
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
                  <Button style="width:100%;" type="warning" :disabled="allYardList.length<=0">
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
    <!-- 追号弹出框 -->
    <Modal v-model="chaseIsShow" :mask-closable="false" class-name="vertical-center-modal" class="chaseIsShow" width="740">
      <p slot="header">
        <span>xxx追号</span>
      </p>
      <div class="chasearea">
        <div class="chasearea-tit">
          <button-tab>
            <button-tab-item @on-item-click="aliketimesChase=false" selected>同倍追号</button-tab-item>
            <button-tab-item @on-item-click="aliketimesChase=true">翻倍追号</button-tab-item>
          </button-tab>
        </div>
        <div class="item-1 flex align-items-c">
          <div style="width:500px;" class="flex align-items-c">
            <p>追号计划：</p>
            <p v-if="aliketimesChase">
              每隔：<input type="text" :value="intervalperiod"/>期
              x <input type="text" :value="intervaltimes"/> 倍
            </p>
            <p style="margin:0 10px;">
              起始倍数 <input type="text"  :value="chaseinitTimes"/>
              追号期数 <input type="text" v-model="chaseSelect"/>
            </p>
          </div>
          <p>
            <Checkbox>
              <span>官方跳开即停</span>
            </Checkbox>
          </p>
          <p>
            <Checkbox>
              <span>中奖后停止追号</span>
            </Checkbox>
          </p>
        </div>
        <div class="item-2 flex align-items-c">
          <div style="width:590px;" class="flex align-items-c">
            <p>追号期数：</p>
            <p style="margin:0 15px;">追号总期数：<span style="color:#ffe400;">0</span></p>
            <p>追号总金额：<span style="color:#ffe400;">0</span></p>
          </div>
          <p><Button type="warning">生成追号计划</Button></p>
        </div>
        <div class="item-form">
           <table cellspacing="0" cellpadding="0" border="0">
            <tr>
              <th>期号</th>
              <th>倍数</th>
              <th>当前投入</th>
              <th>截止时间</th>
            </tr>
          </table>
          <div style="max-height:210px;overflow:auto;">
            <table cellspacing="0" cellpadding="0" border="0">
              <tr @click="chaseaItemFun($event)" v-for="(item,index) in chaseareatableTd" :key="index">
                <td>
                  <span class="ivu-checkbox">   
                    <span class="ivu-checkbox-inner"></span>
                    <input type="checkbox" @click="checkboxedself($event)" class="ivu-checkbox-input">
                  </span>
                  <span v-text="item.number" class="vertical-m"></span>
                </td>
                <td>
                  <input @click.stop="stop" type="text" :value="item.addTimes"> 倍
                </td>
                <td v-text="'￥'+item.currCost"></td>
                <td v-text="item.stopTime"></td> 
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div slot="footer" class="flex">
        <Button type="error" size="large" long>清空追号</Button>
        <Button type="error" size="large" long>直接投注</Button>
        <Button type="error" size="large" @click="chaseIsShow=false" long>取消</Button>
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
  import '../../assets/js/flipclock/flipclock.min.js'
  import '../../assets/js/flipclock/flipclock.min.css'
  import 'swiper/dist/css/swiper.css'
  import bet from './bet.js'
  export default {
    ...bet
  }
</script>
<style scoped lang="less">
  @import 'bet.less';
</style>

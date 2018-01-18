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
            <div id="play_item_list" class="play-item-list flex" v-for="(item,_index) in 2">
              <p class="item-label">后三直选：</p>
              <p :class="[('item'),('play_kind_list'),(index==0&&_index==0?'active':'')]"  @click="playkindFun(items,$event)" v-for="(items,index) in 19" :key="index" v-text="'后三直'+index"></p>
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
                <Select ref="model1" v-model="model1" style="width:50px">
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
                <Button type="warning" @click="btnConfirmChoiceFun" :disabled="btnConfirmChoice">
                  <Icon type="ios-compose"></Icon>
                  确认选号
                </Button>
                <Button type="warning" :disabled="btnImmediately">
                  <Icon type="android-checkbox-outline"></Icon>
                  立即下注
                </Button>
              </div>
            </div>
            <div class="add-area flex">
              <p>随机</p>
              <p><input v-model="randomCount" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" type="text" style="outline:none;border:1px solid #ccc;width:30px;text-align:center;margin:0 5px;">注</p>
              <p style="margin:0 5px;">
                <Button type="default" @click="randomCodeNum">
                  <Icon type="shuffle" color="#d32a3d"></Icon>
                  随机
                </Button>
              </p>
              <p style="width:155px;text-align:center;">投注列表</p>
              <p style="margin:0 5px;">
                <Button type="default" @click="allYardList=[]">
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
            <button-tab-item selected>同倍追号</button-tab-item>
            <button-tab-item>翻倍追号</button-tab-item>
          </button-tab>
        </div>
        <div class="item-1 flex align-items-c">
          <div style="width:500px;" class="flex align-items-c">
            <p>追号计划：</p>
            <p>
              每隔：<input type="text"/>期
              x <input type="text"/> 倍
            </p>
            <p>
              起始倍数 <input type="text" :value="chaseinitTimes"/>
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
            <Select v-model="chaseSelect" style="width:100px">
                <Option v-for="item in chaseSelectList" placement="bottom" :value="item.value" :key="item.value">{{ item.value+'期'}}</Option>
            </Select>
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
          <table cellspacing="0" cellpadding="0" border="0">
            <tr v-for="(item,index) in chaseareatableTd" :key="index">
              <td>
                <Checkbox>
                  <span v-text="item.number" class="vertical-m"></span>
                </Checkbox>
              </td>
              <td>
                <input type="text" :value="item.addTimes"> 倍
              </td>
              <td v-text="'￥'+item.currCost"></td>
              <td v-text="item.stopTime"></td>
            </tr>
          </table>
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
  import cqssc from './cqssc.js'
  export default {
    ...cqssc
  }
</script>
<style scoped lang="less">
  @import 'bet.less';
</style>

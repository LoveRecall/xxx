<template>
  <div class="lobby">
    <div class="recommend flex">
      <div class="item-warp" v-for="item in recommend">
        <div class="item">
          <div class="item-img">
            <img src="http://good555.com/content/default/images/gameskin/game-bg3-h.jpg?691d88d3c9" alt="">
            <div class="item-img-title">
              <p style="font-size:20px;"><i v-text="item.name"></i></p>
              <p style="font-size:12px;">
                <span v-text="item.desc"></span>
              </p>
            </div>
          </div>
          <div class="item-tag">
            <i>立即采购</i>
          </div>
        </div>
      </div>
    </div>
    <!-- 种类 -->
    <div class="category-box">
      <div v-if="categoryOne.length>0" v-for="(item,index) in categoryOne" :key="index"  class="category-warp">
        <div class="category-item-title">
          <p v-text="item.gameTypeName"></p>
        </div>
        <div class="category-item">
          <div class="category-content one flex">
            <router-link :to="/bet/+_item.gameNo" v-for="(_item,_index) in item.gameTypeSetting" :key="_index">
              <div class="list" >
                <div class="list-img"></div>
                <div class="list-img-title">
                  <h3 v-text="_item.gameName"></h3>
                  <p v-text="item.desc"></p>
                </div>
              </div>           
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        recommend:[
          {name:'高频快三',desc:'十分钟一期 快乐猜大小'},
          {name:'高频11选5',desc:'返奖率59% 10钟一期'},
          {name:'高频五分彩',desc:'十分钟一期 快乐猜大小'},
          {name:'双快乐分分彩',desc:'猜对一个号就中奖 每天80期'},
        ],
        categoryOne:[ 

        ],
      }
    },
    computed: {
      
    },
    mounted(){
      this.getAllLottery();
    },
    methods: {
      //获取所有彩种
      getAllLottery(){
        let _this = this;
        this.$http({
          method: 'get',
          url:'/getGameTypeAll',
        })
        .then(response => {
          let data = response.data;
          if(data.success){
            _this.categoryOne = data.list;
          }else{

          }
        })
        .catch(error => {

        })
      }
    }
  }
</script>
<style scoped lang="less">
  @import 'lobby.less';
</style>

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
      <div class="category-warp">
        <div class="category-item-title">
          <p>福彩、体彩</p>
        </div>
        <div class="category-item">
          <div class="category-content one flex">
            <div class="list" v-for="(item,index) in categoryOne" :key="index">
              <div class="list-img"></div>
              <div class="list-img-title">
                <h3 v-text="item.name"></h3>
                <p v-text="item.desc"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-warp">
        <div class="category-item-title">
          <p>高频彩</p>
        </div>
        <div class="category-item">
          <div class="category-content two flex">
            <div class="list" v-for="(item,index) in categoryTwo" :key="index">
              <div class="list-img"></div>
              <div class="list-img-title">
                <h3 v-text="item.name"></h3>
                <p v-text="item.desc"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="category-warp">
        <div class="category-item-title">
          <p>体育竞技</p>
        </div>
        <div class="category-item">
          <div class="category-content three flex">
            <div class="list" v-for="(item,index) in categoryThree" :key="index">
              <div class="list-img"></div>
              <div class="list-img-title">
                <h3 v-text="item.name"></h3>
                <p v-text="item.desc"></p>
              </div>
            </div>
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
        categoryOne:[ //第一种 彩种文字描述 名称
          {name:'双色球',desc:'彩民最爱 2元赢取1000元'},
          {name:'3D',desc:'简单3位数 轻松赢千元'},
          {name:'七乐彩',desc:'大奖500万 周一、三、五开奖'},
          {name:'七星彩',desc:'大奖500万 周二、五、日开奖'},
          {name:'排列五',desc:'天天开奖 2元赢10万'},
          {name:'超级大乐透',desc:'奖励最丰厚 3元赢1600万'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
        ],
        categoryTwo:[ //第二种 彩种文字描述 名称
          {name:'双色球',desc:'彩民最爱 2元赢取1000元'},
          {name:'3D',desc:'简单3位数 轻松赢千元'},
          {name:'七乐彩',desc:'大奖500万 周一、三、五开奖'},
          {name:'七星彩',desc:'大奖500万 周二、五、日开奖'},
          {name:'排列五',desc:'天天开奖 2元赢10万'},
          {name:'超级大乐透',desc:'奖励最丰厚 3元赢1600万'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
        ],
        categoryThree:[
          {name:'双色球',desc:'彩民最爱 2元赢取1000元'},
          {name:'3D',desc:'简单3位数 轻松赢千元'},
          {name:'七乐彩',desc:'大奖500万 周一、三、五开奖'},
          {name:'七星彩',desc:'大奖500万 周二、五、日开奖'},
          {name:'排列五',desc:'天天开奖 2元赢10万'},
          {name:'超级大乐透',desc:'奖励最丰厚 3元赢1600万'},
          {name:'排列三',desc:'天天开奖 3位数字赢千元'},
        ]
      }
    },
    computed: {
      
    },
    mounted(){

    },
    methods: {

    }
  }
</script>
<style scoped lang="less">
  @import 'lobby.less';
</style>

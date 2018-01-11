<template>
  <div class="content">
    <div class="recommend flex">
    <div class="silder_left_box">
      <div class="recommend_tag">
        <span>热门推荐</span>
      </div>
      <div class="silder_left_warp">
        <div class="more_bar">
          <router-link to="/">
            <span>更多推荐</span>   
            <i style="font-size:12px;" class="iconfont icon-gengduo"></i>
          </router-link>
        </div>
        <div class="slider-panel">
          <el-carousel trigger="click" type="card" height="160px" arrow="always" indicator-position="none">
            <el-carousel-item v-for="item in 4" :key="item">
              <div style="width:160px;height:160px;">
                  {{item}}
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="silder_right_box">
      <div class="recommend_tag">
        <span>投注排行榜</span>
      </div>
      <div class="silder_right_warp">
        <div ref="dom_rank" class="slider-panel">
          <div>
            <div class="flex" v-for="item in 8">
              <p>{{item}}</p>
              <p>150********</p>
              <p>87640<span>元</span></p>
            </div>
            <div class="flex" v-for="item in 8">
              <p>{{item}}</p>
              <p>150********</p>
              <p>87640<span>元</span></p>
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
        marquee_rank:'', //排行榜
      }
    },
    computed: {
    },
    mounted(){
      // this.mmarquee_rank_setinterval();
    },
    methods: {
      mmarquee_rank_setinterval(){
        let _this= this;
        let scrollDistance = _this.$refs.dom_rank.scrollHeight/2; //滚跳条滚动距离 因为有两个
        this.marquee_rank = setInterval(function(){
          if(_this.$refs.dom_rank.scrollTop>=scrollDistance-10){
            _this.$refs.dom_rank.scrollTop=0;
          }
          _this.$refs.dom_rank.scrollTop+=1.5;
        },50)
      }
    },
    beforeRouteLeave(to, from, next){
      next();
      clearInterval(this.marquee_rank);
    }
  }
</script>
<style scoped lang="less">
  @import 'index.less';
</style>

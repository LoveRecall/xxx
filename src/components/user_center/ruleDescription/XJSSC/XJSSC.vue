<template>
  <div class="XJSSC">
    <div class="about red_text">关于时时彩：</div>
    <div>
      时时彩是一种在线即开型彩票玩法，本平台时时彩类别为重庆时时彩，江西时时彩，新疆时时彩，黑龙江时时彩，五分彩，玩法规则如下：
    </div>
    <div class="rules red_text">一、玩法规则：</div>
    <ul>
      <li v-for="(i,index) in list">
        <div class="title red_text">{{index+1+"."+i.title}}</div>
        <div class="content">{{i.content}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [
          {
            title: '后三直选：',
            content: '选出百、十、个位选分别出 3 个以上个号码，当开奖结果与所选的号码相同且顺序一至时，就算中奖 '
          },
          {
            title: '后三直选单式：',
            content: '手动输入 3 个号码组成一注，所输入的号码与当期顺序摇出的 5 个号码中的后三个号码相同，且顺序一至，就算中奖'
          },
          {
            title: '后三直选和值：',
            content: '从 0 - - 27 中个数任意选择一个或多个进行投注，当百、＋、个位开出的结果之和与会员下注的号码相同，就算中奖．不同就不算中奖  '
          },
          {
            title: '后三组选：',
            content: '会员从 O 刃个号码，任意选出 2 个或 2 个以上进行投注，当开奖结果（百位，十位．个位）中的有只有二个号码重复，则视为中奖，挑选不同的个数的号码有其相联系对应变的赔率，如果是选择（ 1 . 2 . 3 . 4 . 5 ) ．则只要开奖结果（百位，十位，个位）中有出现 1 . 2 . 3 . 4 . 5 中的任何二个号码，且其中有一个号码重复中奖例如： 1 12 344 如果是开出豹子则不算中奖。备注为三个数字一样，例如： 111 , 222  '
          },
          {
            title: '后三组六：',
            content: '会员从于夕个号码，任意选出 3 个或 3 个以上进行投注，当开奖结果（百位．十位，个位）中的有只有三个号码不重复，则视为中奖，挑选不同的个数的号码有其相联系对应变的赔率，如果是选择（ 1 一 2 一 3 4 5 ) ．则只要开奖结果（百位，十位，个位）中有出现 1 . 2 _ 3 _ 4 _ 5 中的任何三个号码，且其中有三个号码不重复中奖例如： 123 234 如果是开出豹子则不算中奖．备注为三个数字一样，例如： 111 , 222  '
          },
          {
            title:'混合组选',
            content:'手动输入 3 个号码组成一注，当开奖结果（百位，十位．个位）中的三个号码与所选号码相同，顺序不限，则视为中奖．如果是选择（ 012 ）则只要开奖结果（百位，。十位，个位）中同时出现引 2 中的数字而且不能重复开奖结果为： MB BSC 仪习视为不中奖开奖结果为：肠 CA 伪 CAB CSA ？队 C ？即八？视为中奖 '
          },
          {
            title:'后三组选和值',
            content:'会员从 1 一 26 个号码，任意选出 1 个或多个进行投注，当开奖结果（百位，十位个位）中的有只有二个号码重复之和与所选号码相同，则视为中奖，挑选不同的个数的号码有其相联系对应变的赔率，如果是选择（ 1 . 2 . 3 一 4 一 5 ) ．则只要开奖结果（百位，十位，个位）中有出现 1 . 2 . 3 . 45 中的任何二个号码，且其中有一个号码重复的之和才算中奖，不同就不算中奖 '
          },
          {
            title:'前三直选',
            content:'选出万位、千位、百位选分别出 5 一 10 个号码，当开奖结果与所选的（万位，千位，十位）与所选的号码相同且顺序一至时，就算中奖 '
          },
          {
            title:'前三直选单式',
            content:'手动输入 3 个号码组成一注，所输入的号码与当期顺序摇出的 5 个号码中的前三个号码相同，且顺序一至，就算中奖 '
          },
          {
            title:'前三直选和值',
            content:'手动输入 3 个号码组成一注，所输入的号码与当期顺序摇出的 5 个号码中的前三个号码相同，且顺序一至，就算中奖'
          },
          {
            title:'前三组选',
            content:'12．会员从于夕个号码，任意选出 2 个或 2 个以上进行投注，当开奖结果（万位，千位，百位）中的有只有二个号码重复，则视为中奖，挑选不同的个数的号码有其相联系对应变的赔率，如果是选择（ 1 . 2 . 3 . 4 . 5 ) ，则只要开奖结果（万位，千位，百位）中有出现 1 一 2 一 3 4 . 5 中的任何二个号码．且其中有一个号码重复中奖．例如： 1 12 344 如果是开出豹子则不算中奖。备注为三个数字一样，例如： 111 , 222 '
          },
          {
            title:'前三组六',
            content:'会员从于 9 个号码，任意选出 3 个或 3 个以上进行投注，当开奖结果（万位、千位、百位）中的有只有三个号码不重复，则视为中奖，挑选不同的个数的号码有其相联系对应变的赔率，如果是选择（ 1 . 2 . 3 . 4 . 5 ) ，则只要开奖结果（万位，千位，百位）中有出现， . 2 . 3 . 4 . 5 中的任何三个号码，且其中有三个号码不重复中奖例如： 123 234 如果是开出豹子则不算中奖．备注为三个数字一样，例如： 111 , 222 '
          },
          {
            title:'前三组选和值',
            content:'会员从 1 一 26 个号码，任意选出 1 个或多个进行投注，当开奖结果（万位、千位、百位）中的有只有二个号码重复，则视为中奖，挑选不同的个数的号码有其相联系对应变的赔率，如果是选择（ 1 一 2 . 3 一 4 一 5 ) ，则只要开奖结果（百位，十位，个位）中有出现 1 一 2 一 3 一 4 . 5 中的任何二个号码，且其中有一个号码重复的之和才算中奖，不同就不算中奖 '
          }

        ]
      }
    },
    computed: {},
    mounted() {

    },
    methods: {}
  }
</script>
<style lang="less">
  @import './XJSSC.less';
</style>

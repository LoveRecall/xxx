<template>
  <div class="lottery_time">
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        columns1: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '说明',
            key: 'instructions'
          }
        ],
        data1: [
          {
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },
          {
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
          },{
            title: '重庆时时彩',
            time: '10:00-01:55',
            instructions: '10分钟/期-22点后5分钟/期'
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
  @import './lotteryTime.less';
</style>

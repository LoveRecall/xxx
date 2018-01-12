<template>
  <div class="personal-overview">
    <Form  label-position="left" :label-width="1000">
        <span>时间：</span>
         <DatePicker type="datetime" value="2018-09-07 00:00:00" format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间" style="width: 160px"></DatePicker>
        <span>&nbsp;至&nbsp;</span>
        <DatePicker type="datetime"  value="2018-09-12 06:00:00" format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" style="width: 160px"></DatePicker>
        <div class="btn" type="primary">查询</div>
    </Form>
    <table class="table" cellpadding='0' cellspacing='0'>
      <tr>
        <td>金额：</td>
        <td>0元</td>
        <td>提额：</td>
        <td>0元</td>
      </tr>
      <tr>
        <td>充值：</td>
        <td>0元</td>
        <td>中奖金额：</td>
        <td>0元</td>
      </tr>
      <tr>
        <td>投注金额：</td>
        <td>0元</td>
        <td>打和返款：</td>
        <td>0元</td>
      </tr>
      <tr>
        <td>投注返点：</td>
        <td>0元</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td>净盈利：</td>
        <td>0元</td>
        <td colspan="2">净盈利=中奖金额+打和返款+投注返点-投注金额</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {

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
<style lang="less">
    @import './personalOverview.less';
</style>

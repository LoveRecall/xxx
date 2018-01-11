<template>
  <div class="curtain">
    <div class="filter-bar flex">
      <div>时间：</div>
      <DatePicker format="yyyy-MM-dd hh:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择时间段" style="width: 300px;margin-right:30px;"></DatePicker>
      <div>用户名：</div>
      <Input placeholder="请输入用户名" style="width: 150px;margin-right:20px;"></Input>
      <Button type="error">查询</Button>
    </div>
    <div class="filterchechbox">
      <div class="flex">
        <div class="label">类型：</div>
        <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">所有类型</Checkbox>
      </div>
      <div class="flex">
        <div class="label" style="color:#ea0407;">收入：</div>
        <CheckboxGroup v-model="incomeGroupcheck" @on-change="checkAllGroupChange">
          <Checkbox v-for="(item,index) in incomeGroup" :key="index" :label="item"></Checkbox>
        </CheckboxGroup>
      </div>
      <div class="flex">
        <div class="label" style="color:#ea0407;">支出：</div>
        <CheckboxGroup v-model="incomeGroupcheck" @on-change="checkAllGroupChange">
          <Checkbox v-for="(item,index) in expendGroup" :key="index" :label="item"></Checkbox>
        </CheckboxGroup>
      </div>
      <div>
      </div>
    </div>
    <div class="table-box">
      <table cellspacing="0" cellpadding="0" border="0">
        <tr>
          <th v-for="(item,index) in ThData" :key="index" v-text="item.title"></th>
        </tr>
        <tr v-if="TdData.length>0" v-for="(item,index) in TdData" :key="index">
          <td v-for="(_item,_index) in item" :key="_index" v-text="_item"></td>
        </tr>
      </table>
      <div style="height: 30px;line-height: 30px;text-align: center;border-bottom: 1px solid #b2b2b2;" v-if="TdData.length<=0">
        请先选条件后再查询
      </div>
      <table cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td>小计<span>0</span>笔</td>
          <td style="color:#ea0407;">总支出<span>0</span>（<span>0</span>）</td>
          <td>总收入<span>0</span>（<span>0</span>）</td>
        </tr>
        <tr>
          <td>总计<span>0</span>笔</td>
          <td style="color:#ea0407;">总支出<span>0</span>（<span>0</span>）</td>
          <td>总收入<span>0</span>（<span>0</span>）</td>
        </tr>
      </table>
    </div>
    <div style="height: 30px;line-height: 30px;color:#ea0407;">
      备注：本业资金变动为所有用户资金变动之和
    </div>
    <div class="page-box flex">
      <Page @on-change="pageEvents" :total="100"></Page>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        indeterminate: false,
        checkAll: false,
        incomeGroupcheck:[],
        incomeGroup: ['公司入款','线上支付','人工存款','给予返水','活动优惠','彩票派彩','追号返款','彩票返水','系统奖励'], //收入复选框
        expendGroup: ['出款扣除','用户提款','人工提出','冲销返水','彩票下注','转账充值','冲销派奖','追号扣款','优惠扣除','其他扣除'], //支出复选框
        ThData: [{
            title: '用户名',
          },
          {
            title: '时间',
          },
          {
            title: '帐变类型',
          },
          {
            title: '支出',
          },
          {
            title: '收入',
          },
          {
            title: '余额',
          },
          {
            title: '备注',
          },
        ],
        TdData: [
        ]
      }
    },
    created() {
  
    },
    methods: {
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;
        if (this.checkAll) {
          this.incomeGroupcheck = this.expendGroup.concat(this.incomeGroup);
        } else {
          this.incomeGroupcheck = [];
        }
      },
      checkAllGroupChange(data) {
        if (data.length === this.expendGroup.concat(this.incomeGroup).length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = false;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      pageEvents(){

      }
    },
  }
</script>
<style scoped lang="less">
  @import './curtain.less';
</style>

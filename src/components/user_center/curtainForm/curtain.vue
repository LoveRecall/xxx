<template>
  <div class="curtain">
    <div class="filter-bar flex">
      <div>时间：</div>
      <DatePicker format="yyyy/MM/dd hh:mm:ss" type="datetimerange" :value="datetimeranges" @on-change="datetimeranges=$event" placement="bottom-start" placeholder="请选择时间段" style="width: 300px;margin-right:30px;"></DatePicker>
      <Button type="error" @click="getAcctChangeRecord">查询</Button>
    </div>
    <div class="filterchechbox">
      <div class="flex">
        <div class="label">类型：</div>
        <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">所有类型</Checkbox>
      </div>
      <div class="flex">
        <div class="label" style="color:#ea0407;">收入：</div>
        <CheckboxGroup v-model="incomeGroupcheck" @on-change="checkAllGroupChange">
          <Checkbox v-for="(item,index) in incomeGroup" :key="index" :label="item.code">
            <span v-text="item.value"></span>
          </Checkbox>
        </CheckboxGroup>
      </div>
      <div class="flex">
        <div class="label" style="color:#ea0407;">支出：</div>
        <CheckboxGroup v-model="incomeGroupcheck" @on-change="checkAllGroupChange">
          <Checkbox v-for="(item,index) in expendGroup" :key="index" :label="item.code">
            <span v-text="item.value"></span>
          </Checkbox>
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
        datetimeranges:'',//时间
        incomeGroup: [
          {code:1,value:'公司入款'},
          {code:2,value:'线上支付'},
          {code:3,value:'人工存款'},
          {code:4,value:'给予返水'},
          {code:5,value:'活动优惠'},
          {code:6,value:'彩票派彩'},
          {code:7,value:'追号返款'},
          {code:8,value:'彩票返水'},
          {code:9,value:'系统奖励'}
        ], //收入复选框
        expendGroup: [
          {code:10,value:'出款扣除'},
          {code:11,value:'用户提款'},
          {code:12,value:'人工提出'},
          {code:13,value:'冲销返水'},
          {code:14,value:'彩票下注'},
          {code:15,value:'转账充值'},
          {code:16,value:'冲销派奖'},
          {code:17,value:'追号扣款'},
          {code:18,value:'优惠扣除'},
          {code:19,value:'其他扣除'}
        ], //支出复选框
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
    computed:{

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
          this.incomeGroupcheck = this.incomeGroup.concat(this.expendGroup);
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
      //查询帐变记录
      getAcctChangeRecord(){
        this.$http({
          method:'post',
          url:'/getAcctChangeRecord',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          data:{
            pageNo:1,
            pageSize:10,
            changeType:this.incomeGroupcheck.toString(),
            queryDate:this.datetimeranges.toString()
          }
        })
        .then(response => {
          let data = response.data;
          if(data.success){
            
          }else{

          }
        })
        .catch(error => {

        })
      },
      pageEvents(){

      }
    },
  }
</script>
<style scoped lang="less">
  @import './curtain.less';
</style>

<template>
  <div class="personage">
    <div class="filter-bar flex">
      <div>时间：</div>
      <DatePicker format="yyyy-MM-dd hh:mm:ss" type="datetimerange" placement="bottom-start" placeholder="请选择时间段" style="width: 300px;margin-right:30px;"></DatePicker>
      <Button type="error">查询</Button>
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
      <div style="height: 30px;line-height: 30px;text-align: center;" v-if="TdData.length<=0">
        请先选择筛选条件
      </div>
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
        ThData: [{
            title: '日期',
          },
          {
            title: '充值',
          },
          {
            title: '提款',
          },
          {
            title: '彩票投注',
          },
          {
            title: '有效投注',
          },
          {
            title: '彩票中奖',
          },
          {
            title: '投注返点',
          },
          {
            title: '活动奖金',
          },
          {
            title: '彩票盈亏',
          },
        ],
        TdData: [
          {'a':'2013-4-6 12:00:00','b':3,'c':4,'d':6,'e':9,'f':24,'g':12,'h':25,'i':15},
          {'a':'2013-4-6 12:00:00','b':5,'c':8,'d':0,'e':3,'f':24,'g':12,'h':25,'i':16},
        ]
      }
    },
    created(){
      this.total();
    },
    methods:{
      total(){  
        let obj ={'a':'本页合计','b':0,'c':0,'d':0,'e':0,'f':0,'g':0,'h':0,'i':0};  
        let _this = this;
        _this.TdData.map(item=>{
          for (const key in item) {
            if(key!='a'){
              obj[key] += item[key]
            }
          }
        })
        this.TdData.push(obj)
      },
      pageEvents(page){
        this.TdData=[];
        this.TdData.push(
          {'a':'2013-4-6 12:00:00','b':5,'c':8,'d':0,'e':3,'f':24,'g':12,'h':25,'i':16},
          {'a':'2013-4-6 12:00:00','b':5,'c':8,'d':0,'e':3,'f':24,'g':12,'h':25,'i':16},
          {'a':'2013-4-6 12:00:00','b':5,'c':8,'d':0,'e':3,'f':24,'g':12,'h':25,'i':16},
          {'a':'2013-4-6 12:00:00','b':5,'c':8,'d':0,'e':3,'f':24,'g':12,'h':25,'i':16},
        )
        this.total();
      }
    },
  }
</script>
<style scoped lang="less">
  @import './personage.less';
</style>

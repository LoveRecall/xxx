<template>
  <div class="activity">
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
      <div style="height: 30px;line-height: 30px;text-align: center;border-bottom: 1px solid #b2b2b2;" v-if="TdData.length<=0">
        请先选条件后再查询
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
            title: '活动名称',
          },
          {
            title: '有效投注流水',
          },
          {
            title: '所需流水',
          },
          {
            title: '活动状态',
          },
          {
            title: '备注',
          },
          {
            title: '创建时间',
          },
          {
            title: '操作',
          },
        ],
        TdData: [
          {'a':'2013-4-6 12:00:00','b':3,'c':4,'d':6,'e':9,'f':24,'g':12,},
          {'a':'2013-4-6 12:00:00','b':5,'c':8,'d':0,'e':3,'f':24,'g':12,},
        ]
      }
    },
    created() {
  
    },
    methods: {
     pageEvents(){
       
     }
    },
  }
</script>
<style scoped lang="less">
  .filter-bar{
    align-items: center;
  }
  .filterchechbox{
    width: 760px;
    height: 180px;
    margin: 30px 0 20px 0;
    border: 1px solid #b2b2b2;
    background: #fff;
    padding: 20px 10px 10px 10px;
  }
  .filterchechbox .label{
    min-width: 50px;
  }
  .filterchechbox>div{
    margin-bottom: 10px;
  }
  .table-box{
    margin-top: 20px;
    width: 760px;
    position: relative;
    border: 1px solid #b2b2b2;
    border-bottom: 0;
    background-color: #fff;
  }
  .page-box{
    margin-top: 20px;
    justify-content: center;
  }
  .table-box table{
    width: 100%;
  }
  .table-box th {
    height: 35px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
  }
  .table-box td, .table-box th {
    min-width: 0;
    height: 40px;
    box-sizing: border-box;
    text-align: center;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #b2b2b2;
  }
  .table-box tr:hover td{
    background-color: #ddddde;
  }
</style>

<template>
  <div class="bank-card-manage">
    <router-link to='/homeView/user_center/addBank' class='bg-left'>
     <div class="btn" type="ghost">新增+</div>
    </router-link>
    <Table class="table"  :row-class-name="rowClassName" :columns="columns" :data="data" :no-data-text="noDataText"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        noDataText:'暂无数据...',
        columns: [
          {
              title: '开户名',
              key: 'name',
          },
          {
              title: '开户行',
              key: 'bank'
          },
          {
              title: '卡号',
              key: 'num'
          },
          {
              title: '状态',
              key: 'status'
          },
          {
              title: '绑定时间',
              key: 'time'
          }
        ],
        data: [
          {
            name: '林晓梅',
            bank: '中国工商银行',
            num: '6212***********7891',
            status: '正常',
            time: '2018-01-02 18:00:00'
          }
        ]
      }
    },
    methods: {
      rowClassName (row, index) {
        if (index === 1) {
            return 'table_title';
        }
        return '';
      }
    }
  }
</script>
<style lang="less">
    @import './bankCardManage.less';
</style>

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
        columns: [],
        data: []
      }
    },
    methods: {
      init() {
        let _this = this;
        _this.columns = [
          {
              title: '开户名',
              key: 'bankAcctName',
          },
          {
              title: '开户行',
              key: 'bankName'
          },
          {
              title: '卡号',
              key: 'bankAcct'
          },
          {
              title: '状态',
              key: 'bankStatus',
              render: function(index, obj) {
                return obj.row.bankStatus == 1 ? "有效" : "无效";
              }
          },
          {
              title: '绑定时间',
              key: 'insertDate',
              render:function(index,obj) {
                return obj.row.insertDate;
              }
          }
        ];
      },
      rowClassName (row, index) {
        if (index === 1) {
            return 'table_title';
        }
        return '';
      },
      getBank() {
        let _this = this;
        this.$http({
          method:'get',
          url:'/getBank'
        }).then(response => {
          let data = response.data;
          if(data.success){
            _this.data = data.list;
          }else{

          }
        }).catch(error => {

        })

      }
    },
    mounted(){
      this.init();
      this.getBank();
    },
  }
</script>
<style lang="less">
    @import './bankCardManage.less';
</style>

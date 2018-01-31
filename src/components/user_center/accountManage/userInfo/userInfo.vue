<template>
  <div class="user-info">
    <div class="user-i-box">
      <div class="user-left">
        <Form label-position="right" :label-width="120" ref="formCust" :model="formCust">
          <FormItem label="用户名：">
            <Input  v-model="formCust.custName"></Input>
          </FormItem>
          <FormItem label="真实姓名：">
            <Input v-model="formCust.custRealName" ></Input>
          </FormItem>
          <FormItem label="联系QQ：">
            <Input v-model="formCust.contactQq"></Input>
          </FormItem>
          <!--
          <FormItem label="用户邮箱：">
            <Input v-model="formCust.custName"></Input>
          </FormItem>
          <FormItem label="用户微信：">
            <Input v-model="formCust.custName"></Input>
          </FormItem>
          -->
          <FormItem label="用户手机：">
            <Input v-model="formCust.contactPhone" ></Input>
          </FormItem>
          <FormItem>
            <div class="btn" type="ghost" @click="saveCust">修改</div>
            <div class="btn" type="ghost">取消</div>
          </FormItem>
        </Form>
      </div>
      <div class="user-right">
        <p>请留意您的账户动态，注意账户安全信息。</p>
        <p>如果发现您的账户有异常信息，请及时修改您的账户密码并反馈给我们的客服人员。</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formCust: {
          custNo: '',
          contactPhone: '',
          contactQq: '',
          custCertNo: '',
          custLevel: '',
          agentNo: '',
          custName: '',
          custNo: '',
          custRealName: '',
          custStatus: '',
          custType: '',
          insertDate: '',
          lastSignDate: '',
          rebateRate: '',
          regIp: '',
          signPasswd: '',
          updateDate: '',
          userPhone: '',
          withPasswd: ''
        }
      }
    },
    computed: {

    },
    mounted(){
      this.getCust();
    },
    methods: {
      getCust() {
        let _this = this;

        this.$http({
          method:'get',
          url:'/getCust'
        }).then(response => {
          let data = response.data;
          if(data.success){
            console.log(data);
            _this.formCust = data.map.cust;
          }else{

          }
        }).catch(error => {

        })
      },
      saveCust() {
        let _this = this;

        this.$http({
          method:'post',
          url:'/register',
          data: _this.formCust,
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded;'
          }
        })
        .then(response => {
          let data = response.data;
          if(data.success){
            _this.$Modal.success({
                title: "系统提示",
                content: data.msg
            });
          }else{
            _this.$Modal.error({
                title: "系统提示",
                content: data.msg
            });
          }
        })
        .catch(error => {
            _this.$Modal.error({
                title: "系统提示",
                content: '系统异常'
            });
        })
      }
    }
  }
</script>
<style lang="less">
    @import './userInfo.less';
</style>

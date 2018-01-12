<template>
  <div class="user-info">
    <div class="user-i-box">
      <div class="user-left">
        <Form label-position="right" :label-width="120" >
          <FormItem label="用户名：">
            <Input value="SSFC1"></Input>
          </FormItem>
          <FormItem label="真实姓名：">
            <Input value="*样" disabled></Input>
          </FormItem>
          <FormItem label="联系QQ：">
            <Input value="456502489"></Input>
          </FormItem>
          <FormItem label="用户邮箱：">
            <Input value="456502489@qq.com"></Input>
          </FormItem>
          <FormItem label="用户微信：">
            <Input value="456502489"></Input>
          </FormItem>
          <FormItem label="用户手机：">
            <Input value="13515267713" disabled></Input>
          </FormItem>
          <FormItem>
            <div class="btn" type="ghost">修改</div>
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
    @import './userInfo.less';
</style>

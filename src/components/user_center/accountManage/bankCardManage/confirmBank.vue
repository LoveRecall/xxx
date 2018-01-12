<template>
  <div class="confirm-bank">
     <Form label-position="right" :label-width="120" >
        <div class="old-box">
            <FormItem label="开户人姓名：">
                <span>林晓梅</span>
                <span class="old-b-red">（最近一次绑定的银行卡开户姓名）</span>
            </FormItem>
            <FormItem label="银行账户：">
                <span>6212233648756726170</span>
                <span class="old-b-red">（最近一次绑定的银行卡卡号）</span>
            </FormItem>
        </div>
        <p class="red old-b-text">备注：增加绑定银行卡需提供最近一次绑定的使用中的银行卡号信息！</p>
        <div class="new-box">
            <FormItem label="绑定银行：" class="new-bc-label new-bc-labels">
                <Input value="中国工商银行" disabled></Input>
            </FormItem>
            <FormItem label="开户人姓名：" class="new-bc-label">
                <Input value="林晓梅" disabled></Input>
            </FormItem>
            <FormItem label="银行账号：" class="new-bc-label">
                <Input value="6212233648756726170" disabled></Input>
            </FormItem>
        </div>

        <FormItem>
            <div class="btn" type="ghost">提交</div>
            <div class="btn" type="ghost" onclick="javascript:history.back();">返回</div>
        </FormItem>
      </Form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cityList: [
          {
            value: '中国工商银行',
            label: '中国工商银行'
          },
          {
            value: '中国交通银行',
            label: '中国交通银行'
          }
        ],
        model: '中国工商银行'
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
    @import './confirmBank.less';
</style>

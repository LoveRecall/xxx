<template>
    <div class="add-bank">
        <Form label-position="right" :label-width="120" ref="formBank" :model="formBank">
            <!-- <div class="old-box" >
                <FormItem label="开户人姓名：" prop="lastBankAcctName">
                    <Input placeholder="最近一次绑定的银行卡开户姓名" v-model="formBank.lastBankAcctName"></Input>
                </FormItem>
                <FormItem label="银行账户：" prop="lastBankAcct">
                    <Input placeholder="最近一次绑定的银行卡卡号" v-model="formBank.lastBankAcct"></Input>
                </FormItem>
            </div> -->
            <!-- <p class="red old-b-text">备注：增加绑定银行卡需提供最近一次绑定的使用中的银行卡号信息！</p> -->
            <div class="new-box">
                <p class="info">提示：<span class="red">*</span>为必填信息，如需要删除请联系客服提供银行卡照片和充值截图进行处理！</p>
                <div class="new-box-con">
                    <FormItem label="开户银行：" class="new-bc-label">
                        <Select v-model="formBank.bankName">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="开户人姓名：" class="new-bc-label new-bc-labels" prop="bankAcctName">
                        <Input placeholder="填写银行卡真实姓名" v-model="formBank.bankAcctName"></Input>
                    </FormItem>
                    <FormItem label="银行卡号：" class="new-bc-label" prop="bankAcct">
                        <Input placeholder="只能输入16-19个数字" v-model="formBank.bankAcct"></Input>
                    </FormItem>
                    <FormItem label="确认卡号：" class="new-bc-label">
                        <Input placeholder="再次输入银行卡卡号"></Input>
                    </FormItem>
                </div>
            </div>
            <FormItem>	
                <div class="btn" type="ghost" @click="next">下一步</div>
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
          value: "中国工商银行",
          label: "中国工商银行"
        },
        {
          value: "中国交通银行",
          label: "中国交通银行"
        }
      ],
      model: "中国工商银行",
      formBank: {
          custNo: '',
          custPhone: '',
          bankName: '',
          bankProvCity: '',
          bankBranch:'',
          bankAcctName: '',
          bankAcct: ''
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    next(){
        let _this = this;
        this.$router.push({
            name:'confirmBank',
            params:_this.formBank //传递路由参数
        })
	}
  }
};
</script>

<style lang="less">
@import "./addBank.less";
</style>

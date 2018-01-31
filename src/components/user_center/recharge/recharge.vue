<template>
  <div class="recharge">
    <div class="kind-panel">
      <div class="kind-panel-title">充值类型:</div>
      <div class="kind-list-box flex">
        <div @click="_kindChecked(item, index)" v-for="(item,index) in kindList" :key="index" :class="[('list-item'),(index==kindChecked ? 'active' : '')]">
          <i :class="['iconfont',item.icon]" :style="{color:item.color}"></i>
          <span v-text="item.name"></span>
        </div>     
      </div>
      <div style="padding-left:20px;color:#ee6e2d;letter-spacing: 1px;cursor: pointer;">
        其他充值方式 >>
      </div>
    </div>
    <div class="bank-box">
      <div class="panel-1">
        <h3>入款银行账号：</h3>
        <Form  label-position="right" :label-width="100">
          <FormItem label="开户银行：">
            <span>中国招商银行</span>
          </FormItem>
          <FormItem label="开户网点：">
            <span>中国招商银行</span>
          </FormItem>
          <FormItem label="收款账户：">
            <span>62141225487635</span>
          </FormItem>
          <FormItem label="收款人：">
            <span>魏涛</span>
          </FormItem>
        </Form>
      </div>
      <div class="panel-2 flex">
        <div style="width:350px;">
          
          <h3>入款银行账号：</h3>
         
          <Form label-position="right" :label-width="120" ref="formValidate" :model="formValidate" :rules="ruleValidate" >
    
            <FormItem label="账户类型：" prop="banktype">
              <Input v-model="formValidate.banktype" disabled></Input>
            </FormItem>
           
            <FormItem label="充值金额：" prop="paymoney">
              <Input v-model="formValidate.paymoney"></Input>
            </FormItem>
            
            <!-- <FormItem label="充值人姓名：" prop="userName">
              <Input v-model="formValidate.userName"></Input>
            </FormItem> -->
           
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
        <div class="form-tip">
          
          <!-- <p>*此处填写金额必须与您实际支付的金额一致，若不一致，将无法自动到账</p> -->
          <p>*此处填写金额必须与您实际支付的金额一致，若不一致，将无法自动到账</p>
         
        </div>
      </div>
      <div class="panel-3">
        <h2>温馨提示：</h2>
        <p>*单笔最低充值金额<span>100</span>元</p>
        <p>*单笔最高充值金额<span>50000</span>元</p>
        <p>*以上银行账号仅限本次使用，账号不定期更换！请您根据页面提供的账号进行转账，若充值到过期账号，本公司恕不负责！</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      const validateAmount = (rule, value, callback) => {
        if(!/^[1-9]\d*$/.test(value)) {
          callback(new Error('金额格式不正确，只能为正整数'));
        }else {   
          if(value<100){
            callback(new Error('充值金额小于最低金额100元'));
          }else{
            callback();
          }     
        }
      };
      // const validateUserName = (rule, value, callback) => {
      //   if(!/^[\u4e00-\u9fa5]{2,}$/.test(value)) {
      //     if(value.length>=2){
      //       callback(new Error('姓名格式不正确'));
      //     }else{
      //       callback(new Error('至少输入两个汉字'));
      //     }
      //   }else {         
      //     callback();
      //   }
      // };
      return {
        kindList:[
          // {name:'收银台',icon:'icon-yinhangqia', value: 'PAYMODE', color: '#388eff'},
          // {name:'微信',icon:'icon-weixin1',color: '#07ba06'},
          // {name:'支付宝',icon:'icon-zhifubao', value: 'MSAli',color: '#06a0f8'},
          {name:'京东APP',icon:'icon-jd', value: 'MSJD',color: '#df2725'},
          {name:'线下充值',icon:'icon-xianxiachongzhi', value: 'BANK',color: '#df2725'},
        ],
        kindChecked: 0, //充值类型下标
        formValidate: {
          banktype:'',
          paymoney: '',
          // userName:'',
        },
        ruleValidate: {
          banktype: [
            { required: true, message: '请输入账户类型', trigger: 'blur' },
          ],
          paymoney: [
            { validator: validateAmount,trigger: 'blur',},
          ],
          // userName: [
          //   { required: true, message: '请输入姓名', trigger: 'blur' },
          //   { validator: validateUserName,trigger: 'blur' },
          // ]
        },
      };
    },
    computed: {
      
    },
    mounted(){
      this.formValidate.banktype = this.kindList[0].value;
    },
    methods: {
      _kindChecked(item, index){
        this.kindChecked = index;
        this.formValidate.banktype = item.value;
      },
      jumpPage(url) {
        window.open(url);
      },
      handleSubmit(name) {
        let _this = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.loading({
              content:'加载中...',
              duration:0
            })
            this.$http({
              method:'get',
              url:'/pay/toPay',
              params: _this.formValidate
            }).then(response => {
              let data = response.data;
              this.$Message.destroy();
              if(data.success){
                //window.open(data.url);
                if(data.url!=null){
                  window.location.href = data.url;
                }else{
                  this.$Notice.success({
                    desc:data.msg
                  })
                }
              }else{
                this.$Notice.success({
                  desc:data.msg
                })
              }
            }).catch(error => {

            })

          } else {
          
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style scoped lang="less">
  @import './recharge.less';
</style>

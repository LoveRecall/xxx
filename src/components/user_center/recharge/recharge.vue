<template>
  <div class="recharge">
    <div class="kind-panel">
      <div class="kind-panel-title">充值类型:</div>
      <div class="kind-list-box flex">
        <div @click="_kindChecked(index)" v-for="(item,index) in kindList" :key="index" :class="[('list-item'),(index==kindChecked ? 'active' : '')]">
          <i :class="['iconfont',item.icon]"></i>
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
            <FormItem label="账户类型：" prop="accountKind">
              <Input v-model="formValidate.accountKind"></Input>
            </FormItem>
            <FormItem label="充值金额：" prop="amount">
              <Input v-model="formValidate.amount"></Input>
            </FormItem>
            <FormItem label="充值人姓名：" prop="userName">
              <Input v-model="formValidate.userName"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
        <div class="form-tip">
          <p>*此处填写金额必须与您实际支付的金额一致，若不一致，将无法自动到账</p>
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
        if(!/^[0-9]*$/.test(value)) {
          callback(new Error('金额格式不正确'));
        }else {         
          callback();
        }
      };
      const validateUserName = (rule, value, callback) => {
        if(!/^[\u4e00-\u9fa5]{2,}$/.test(value)) {
          if(value.length>=2){
            callback(new Error('姓名格式不正确'));
          }else{
            callback(new Error('至少输入两个汉字'));
          }
        }else {         
          callback();
        }
      };
      return {
        kindList:[
          {name:'银行卡转账',icon:'icon-yinhangqia'},
          {name:'微信',icon:'icon-weixin1'},
          {name:'支付宝',icon:'icon-zhifubao'},
          {name:'京东APP',icon:'icon-jd'},
        ],
        kindChecked:0, //充值类型下标
        formValidate: {
          accountKind: '',
          amount: '',
          userName:''
        },
        ruleValidate: {
          accountKind: [
            { required: true, message: '请输入所属银行', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '金额不能为空', trigger: 'blur' },
            { validator: validateAmount,trigger: 'blur' },
          ],
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { validator: validateUserName,trigger: 'blur' },
          ]
        },
      };
    },
    computed: {
      
    },
    mounted(){

    },
    methods: {
      _kindChecked(index){
        this.kindChecked = index;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            
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

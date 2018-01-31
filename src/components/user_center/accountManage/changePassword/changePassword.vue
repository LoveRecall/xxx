<template>
  <div class="changePassword">
     <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item}}</li>
    </ul>
    <div class="tab tab-left"  v-show="nowIndex===0">
      <Form label-position="right" :label-width="120" :model="formPwd" ref="formPwd" :rules="ruleValidate">
        <FormItem label="输入旧登录密码：" prop="oldPwd">
          <Input v-model="formPwd.oldPwd"></Input>
        </FormItem>
        <FormItem label="输入新登录密码：" prop="newPwd">
          <Input placeholder="6-13个字符（数字和字母）" v-model="formPwd.newPwd"></Input>
        </FormItem>
        <FormItem label="确认新登录密码：" prop="newPwdConfirm">
          <Input placeholder="6-13个字符（数字和字母）" v-model="formPwd.newPwdConfirm"></Input>
        </FormItem>
        <FormItem label="请输入验证码：" prop="code">
            <x-input class="weui-cell_vcode" v-model="formPwd.code" type="text" placeholder="请输入验证码">
              <img slot="right" @click="getVerCode" class="weui-vcode-img" :src="vcodeImg">
            </x-input>
        </FormItem>
        <FormItem>
          <div class="btn" type="ghost" @click="savePwd">修改</div>
          <div class="btn" type="ghost">重置</div>
        </FormItem>
      </Form>
    </div>
    <div class="tab tab-right" v-show="nowIndex===1">
      <p class="tab_text">
        <span class="red">提示：</span>
        <span class="tab_text">提款密码由4-6位数字或字母组成，在线取款时需要输入取款密码才能进行取款</span>
      </p>
      <Form label-position="right" :label-width="120" :model="formWithPwd" ref="formWithPwd" :rules="ruleWithValidate">
        <FormItem label="输入旧提现密码：" prop="oldPwd">
          <Input value="" v-model="formWithPwd.oldPwd"></Input>
        </FormItem>
        <FormItem label="输入新提现密码：" prop="newPwd">
          <Input placeholder="6位数字" v-model="formWithPwd.newPwd"></Input>
        </FormItem>
        <FormItem label="确认新提现密码：" prop="newPwdConfirm">
          <Input placeholder="6位数字" v-model="formWithPwd.newPwdConfirm"></Input>
        </FormItem>
        <FormItem label="请输入验证码：" prop="code">
            <x-input class="weui-cell_vcode" v-model="formWithPwd.code" type="text" placeholder="请输入验证码">
              <img slot="right" @click="getVerCode" class="weui-vcode-img" :src="vcodeImg">
            </x-input>
        </FormItem>
        <FormItem>
          <div class="btn" type="ghost" @click="saveWithPwd">修改</div>
          <div class="btn" type="ghost">重置</div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import {
    XInput,
    Group,
    XButton,
    Cell
  } from 'vux'
  export default {
    
    data() {
      const validateNumber = (rule, value, callback) => {
        if(!/^\d{6}$/.test(value)) {
          callback(new Error('只能输入6位数字'));
        }else {   
          callback();  
        }
      }
      return {
        ruleValidate: {
          oldPwd: [
            { required: true, message: '请输入旧登录密码', trigger: 'blur' },
          ],
          newPwd: [
            { required: true, message: '请输入新登录密码', trigger: 'blur' },
          ],
          newPwdConfirm: [
            { required: true, message: '请再次输入新登录密码', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        },
        ruleWithValidate: {
          oldPwd: [
            { validator: validateNumber,trigger: 'blur' },
          ],
          newPwd: [
            { validator: validateNumber,trigger: 'blur', },
          ],
          newPwdConfirm: [
            { validator: validateNumber,trigger: 'blur',},
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        },
        tabsParam:['修改登录密码','修改提款密码'],
        nowIndex:0,
        vcodeImg: '',
        formPwd: {
          oldPwd: '',
          newPwd: '',
          newPwdConfirm: '',
          code: '',
        },
        formWithPwd: {
          oldPwd: '',
          newPwd: '',
          newPwdConfirm: '',
          code: '',
        }
      }
    },
    components: {
      XInput,
      Group,
      XButton,
      Cell
    },
    computed: {

    },
    mounted(){
      this.getVerCode();
    },
    methods: {
      toggleTabs:function(index){
            this.nowIndex=index;
      },
      getVerCode() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/getVerCodeUrl',
        }).then(response => {
          let data = JSON.parse(response.data);
          if(data.isSuccess){
            _this.vcodeImg = _this.$baseURL+data.url+'?w=100&h=35&date='+new Date().getTime();
          }else{
            _this.Modal = true;
            _this.tipMessage = data.msg;
          }
        })
        .catch(error => {
          _this.loading = false;
        })
      },
      savePwd: function() {
        let _this = this;

        if (_this.formPwd.newPwd != _this.formPwd.newPwdConfirm) {
           _this.$Modal.error({
              title: "系统提示",
              content: '确认新密码与新密码不同'
          });
          return;
        }

        _this.$refs['formPwd'].validate((valid => {
          if (valid) {
            this.$Message.loading({
              content:'加载中...',
              duration:0
            });

            this.$http({
              method:'post',
              url:'/upPwd',
              params: _this.formPwd
            })
            .then(response => {
              let data = response.data;
              _this.$Message.destroy();
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
            }).catch(error => {
                _this.$Modal.error({
                    title: "系统提示",
                    content: '系统异常'
                });
            })
          } else {

          }
        }));

      },
      saveWithPwd: function() {
        let _this = this;

        if (_this.formWithPwd.newPwd != _this.formWithPwd.newPwdConfirm) {
           _this.$Modal.error({
              title: "系统提示",
              content: '确认新密码与新密码不同'
          });
          return;
        }

        _this.$refs['formWithPwd'].validate((valid => {
          if (valid) {
            this.$Message.loading({
              content:'加载中...',
              duration:0
            });

            _this.$http({
              method:'post',
              url:'/upWithPwd',
              data: _this.formWithPwd
            }).then(response => {
              let data = response.data;
              _this.$Message.destroy();
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
            }).catch(error => {
                _this.$Modal.error({
                    title: "系统提示",
                    content: '系统异常'
                });
            })
          } else {

          }
        }));

        
      }
    }
  }
</script>
<style lang="less">
    @import './changePassword.less';
</style>

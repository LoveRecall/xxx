<template>
  <div class="login" :style="bgLoginStyle">
    <div class="login-box">
      <div class="form-box">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem prop="name">
            <x-input title="用户名" v-model="formValidate.name" placeholder="请输入用户名">
              <i slot="label" style="font-size:20px;display:inline-block;margin-right:10px;" class="iconfont icon-yonghu"></i>
            </x-input>
          </FormItem>
          <FormItem prop="password">
            <x-input title="密码" v-model="formValidate.password" type="password" placeholder="请输入密码">
              <i slot="label" style="font-size:16px;display:inline-block;margin-right:10px;" class="iconfont icon-mima"></i>
            </x-input>
          </FormItem>
          <FormItem prop="vfycode">
            <x-input title="验证码" class="weui-cell_vcode" v-model="formValidate.vfycode" type="text" placeholder="请输入验证码">
              <i slot="label" style="font-size:16px;display:inline-block;margin-right:10px;" class="iconfont icon-yanzhengma"></i>
              <img slot="right" @click="getVerCode" class="weui-vcode-img" :src="vcodeImg">
            </x-input>
          </FormItem>
        </Form>
        <Button class="login_btn" :loading="loading" long type="primary" @click="handleSubmit('formValidate')">登 录</Button>
      </div>
    </div>
    <Modal v-model="Modal" width="200">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <p>{{tipMessage}}</p>
      </div>
      <div slot="footer">
        <Button type="error" long @click="Modal=false">确定asda</Button>
      </div>
    </Modal>
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
      return {
        loading:false,
        Modal:false,
        tipMessage:'', //提示
        vcodeImg: '',
        formValidate: {
          name: '',
          password: '',
          vfycode: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 6,
              message: '密码不能低于6位',
              trigger: 'blur'
            }
          ],
          vfycode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }]
        },
        bgLoginStyle: {
          'background': 'url(../static/img/login/bg.png) no-repeat',
          'background-size': 'cover',
          'background-position': 'center top'
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
    mounted() {
      this.getVerCode();
      document.onkeydown = function(e){
        if(e && e.keyCode==13){ // enter 键
           this.handleSubmit('formValidate');
        }
      }.bind(this)
    },
    watch:{
      Modal(){
        if(!this.Modal){
          this.loading=false;
        }
      }
    },
    methods: {
      handleSubmit(name) {
        let _this = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            _this.loading =true;
            _this.login()
          } else {
          }
        })
      },
      getVerCode() {
        let _this = this;
        this.$http({
          method: 'get',
          url: '/getVerCodeUrl',
        })
        .then(response => {
          let data = JSON.parse(response.data);
          if(data.isSuccess){
            this.vcodeImg = '/api'+data.url+'?w=100&h=35&date='+new Date().getTime();
          }
        })
        .catch(error => {
          _this.loading = false;
        })
      },
      login() {
        let _this = this;
        this.$http({
          method: 'post',
          url: '/login',
          data:this.$transformRequest({
            custNo: this.formValidate.name,
            pwd: this.formValidate.password,
            verCode: this.formValidate.vfycode
          })
        })
        .then(response => {
          let data = response.data;
          if(data.success){
            sessionStorage.setItem('custName',data.t.custName);
            _this.$router.push('/homeView');
          }else{
            _this.tipMessage = data.msg;
            if(data.code=='10002'){
              _this.vcodeImg = '/api/getVerCode?w=86&h=35&date='+ new Date().getTime();
            }
            _this.Modal=true;
          }
        })
        .catch(error => {
          _this.loading = false;
        })
      }
    }
  }
</script>
<style scoped>
   .login,
   .login-bg {
     width: 100%;
     height: 100%;
     position: relative;
     overflow: hidden;
   }
   .login-box {
     width: 420px;
     height: 430px;
     position: absolute;
     left: 50%;
     top: 50%;
     margin-left: -200px;
     margin-top: -215px;
     z-index: 2;
     background: url('../../static/img/login/form_bg.png') no-repeat;
     background-position: top center;
   }
   .login-box .form-box {
     width: 292px;
     height: 224px;
     padding: 16px 18px;
     position: absolute;
     top: 115px;
     left: 63px;
   }
   .form-box>>>.weui-cell {
     border: 1px solid #776d6e;
     padding: 0 15px;
   }
   .form-box>>>.ivu-form-item {
     margin-bottom: 20px;
     color: #fff;
   }
   .form-box>>>.vux-x-input.weui-cell_vcode {
     padding-top: 0;
     padding-right: 0;
     padding-bottom: 0;
   }
   .form-box>>>.ivu-form-item-content {
     line-height: 30px;
   }
   .form-box>>>.weui-vcode-img {
     height: 35px;
     cursor: pointer;
   }
   .form-box .login_btn {
     background: linear-gradient(to bottom, #ff0004, #9a0404, #8c0001);
     border: transparent;
   }
</style>

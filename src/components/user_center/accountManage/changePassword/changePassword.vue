<template>
  <div class="changePassword">
     <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam" @click="toggleTabs(index)"
        :class="{active:index==nowIndex}">{{item}}</li>
    </ul>
    <div class="tab tab-left"  v-show="nowIndex===0">
      <Form label-position="right" :label-width="120" >
        <FormItem label="输入旧登录密码：">
          <Input value=""></Input>
        </FormItem>
        <FormItem label="输入新登录密码：">
          <Input placeholder="6-13个字符（数字和字母）"></Input>
        </FormItem>
        <FormItem label="确认新登录密码：">
          <Input value=""></Input>
        </FormItem>
        <FormItem>
          <div class="btn" type="ghost">修改</div>
          <div class="btn" type="ghost">重置</div>
        </FormItem>
      </Form>
    </div>
    <div class="tab tab-right" v-show="nowIndex===1">
      <p class="tab_text">
        <span class="red">提示：</span>
        <span class="tab_text">提款密码由4-6位数字或字母组成，在线取款时需要输入取款密码才能进行取款</span>
      </p>
      <Form label-position="right" :label-width="120" >
        <FormItem label="输入旧登录密码：">
          <Input value=""></Input>
        </FormItem>
        <FormItem label="输入新登录密码：">
          <Input placeholder="6-13个字符（数字和字母）"></Input>
        </FormItem>
        <FormItem label="确认新登录密码：">
          <Input value=""></Input>
        </FormItem>
        <FormItem>
          <div class="btn" type="ghost">修改</div>
          <div class="btn" type="ghost">重置</div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabsParam:['修改登录密码','修改提款密码'],
        nowIndex:0,
      }
    },
    computed: {

    },
    mounted(){

    },
    methods: {
      toggleTabs:function(index){
            this.nowIndex=index;
        },
    }
  }
</script>
<style lang="less">
    @import './changePassword.less';
</style>

<template>
  <div class="security-settings">
     <ul class="tabs">
        <li class="li-tab" v-for="(item,index) in tabsParam"
        @click="toggleTabs(index)"
        :class="{active:index==nowIndex}">{{item}}</li>
    </ul>
    <div class="tab tab-left"  v-show="nowIndex===0">
      <Form label-position="right" :label-width="120" >
        <FormItem label="问题一：">
        <Select v-model="model">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>
        <FormItem label="答案：">
          <Input value=""></Input>
        </FormItem>
        <FormItem label="问题二：">
        <Select v-model="model">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>
        <FormItem label="答案：">
          <Input value=""></Input>
        </FormItem>
        <FormItem>
          <div class="btn" type="ghost">确定</div>
          <div class="btn" type="ghost">重置</div>
        </FormItem>
      </Form>
    </div>
    <div class="tab tab-right" v-show="nowIndex===1">
      <Form label-position="right" :label-width="120" >
        <span class="red">*</span>问题一：
        <FormItem label="答案：">
          <Input placeholder="请输入问题一的答案"></Input>
        </FormItem>
        <span class="red">*</span>问题二：
        <FormItem label="答案：">
          <Input placeholder="请输入问题二的答案"></Input>
        </FormItem>
        <FormItem>
          <div class="btn" type="ghost">确定</div>
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
        tabsParam:['密保设定','密码找回'],
        nowIndex:0,
        cityList: [
          {
            value: '您的母亲姓名是？',
            label: '您的母亲姓名是？'
          },
          {
            value: '您的小学老师叫什么？',
            label: '您的小学老师叫什么？'
          }
        ],
        model: '您的母亲姓名是？'
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
    @import './securitySettings.less';
</style>

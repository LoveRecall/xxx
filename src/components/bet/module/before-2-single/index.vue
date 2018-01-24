<style scoped lang="less">
  .flex{
    align-items: center;
    justify-content: space-between;
    .btn-group{
      button{
        margin: 10px 0; 
      }
    }
  }
  .textarea{
    width: 555px;
    height: 140px;
    textarea{
      outline: none;
      width: 100%;
      height: 100%;
      padding: 10px;
      resize: none;
    }
  }
</style>
<template>
  <div>
    <div class="play-content">
      <div class="flex">
        <div class="textarea">
          <textarea placeholder="程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化。."></textarea>
        </div>
        <div class="btn-group">
          <Button type="warning" long>删除重复号</Button>
          <Button type="warning" long>清空</Button>
        </div>
      </div>  
    </div>
    <!-- 加倍区 -->
    <div class="add-area-box">
      <!-- <div class="add-area flex">
        <div class="flex align-items-c add-panel">
          <p @click="updata_add_times('sub')" class="add"><i class="iconfont icon-jianhao"></i></p>
          <input v-model="this.$parent.add_times" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" class="add_v" type="text">
          <p @click="updata_add_times('add')" class="add"><i class="iconfont icon-iconjia"></i></p>
        </div>       
        <p style="margin:0 2px;">倍</p>
        <p style="margin:0 2px;">模式</p>
        <div class="model">
          <Select ref="model1" @on-change="updata_model1" :value="this.$parent.model1" style="width:50px">
              <Option v-for="item in this.$parent.modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="silder">
          <div>
            <Slider v-model="$store.state.silderVal" :step="1"></Slider>
          </div>
        </div>
        <div class="flex showChip">
          <p>{{$store.state.silderVal}}</p>
          <p>
            共选<span style="color:#da4040;" v-text="this.$parent.allChoiceYard"></span>注；
            共投<span style="color:#da4040;" v-text="this.$parent.allPutMoney"></span>元，
            盈利<span style="color:#da4040;" v-text="this.$parent.allGetProfit"></span>元
          </p>
        </div>
        <div class="btn-group">
          <Button type="warning" @click="btnConfirmChoiceFun" :disabled="this.$parent.btnConfirmChoice">
            <Icon type="ios-compose"></Icon>
            确认选号
          </Button>
          <Button type="warning" :disabled="this.$parent.btnImmediately">
            <Icon type="android-checkbox-outline"></Icon>
            立即下注
          </Button>
        </div>
      </div>              
      <div class="add-area flex">
        <p>随机</p>
        <p><input v-model="randomCount" 
        onkeyup="if(this.value.length>=0){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"    
        onafterpaste="if(this.value.length>=0){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" 
        type="text" style="outline:none;border:1px solid #ccc;width:30px;text-align:center;margin:0 5px;">注</p>
        <p style="margin:0 5px;">
          <Button type="default" @click="randomCodeNum">
            <Icon type="shuffle" color="#d32a3d"></Icon>
            随机
          </Button>
        </p>
        <p style="width:155px;text-align:center;">投注列表</p>
        <p style="margin:0 5px;">
          <Button type="default" @click="update_allYardList">
            <Icon type="ios-trash-outline" color="#d32a3d"></Icon>
            清空
          </Button>
        </p>
        <p style="width:150px;text-align:center;">操作状态</p> -->
        <!-- <div class="add-area-switc">
          <i-switch v-model="this.$parent.playSwitch" class="vertical-m"></i-switch>
          <span class="vertical-m">是否锁定倍数</span>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
  import index from './index';
  export default {
    ...index
  }
</script>

import qs from 'qs'
export default {
  data(){
    return{
      randomCount:1, //随机注数
      initCodeMoney:2, //每注 金额
      textAreaV:'', //文本域值
    }
  },
  mounted(){
    this.$parent.initCodeMoney = this.initCodeMoney;
  },
  methods:{
    updata_add_times(arg){
      if(arg =='add'){
        this.$parent.add_times++;
      }else if(arg =='sub'){
        if(this.$parent.add_times>1){
          this.$parent.add_times--;
        }
      }else{
        this.$parent.add_times = parseInt(arg.target.value).toString() == 'NaN' ? 0 : parseInt(arg.target.value);
      }
    },
    updata_model1(v){
      this.$parent.model1=v;
    },
    update_allYardList(){
      this.$parent.allYardList=[];
    },
    cleartextArea(){
      this.textAreaV='';
    },
    RemoveRet(){
      let _this = this;
      let fiflerRepetNum=0;  //重复值
      let fiflerErrorNum=0; //错误值
      let textAreaV = this.textAreaV.split('')
      if(textAreaV.length%2!=0){
        fiflerErrorNum = textAreaV[textAreaV.length-1];
        textAreaV.pop();       
      }
      textAreaV = textAreaV.toString().replace(/,/g,"").replace(/(.{2})(?=[^$])/g,"$1,").split(","); //重新转化为2位 数字在一起的一维数组
      textAreaV =  this.arrRemoveRet(textAreaV);
      fiflerRepetNum = textAreaV.arr.length;
      if(fiflerRepetNum>0||fiflerErrorNum>0){
        textAreaV.m = textAreaV.m.toString().replace(/,/g,"").split('');
        this.$Modal.warning({
          content:'过滤1个错误号码('+fiflerErrorNum+')，过滤'+fiflerRepetNum+'个重复号码('+textAreaV.arr+')',
        })
      }
      this.textAreaV = textAreaV.m.toString().replace(/,/g,"");
    },
    arrRemoveRet(arr){
      var m=[],f,obj={
        arr:[],//去掉重复的数组值 存放
        m:[] //去掉重复值后的数组 存放
      };
      for(var i=0;i<arr.length;i++){
          f=true;
          for(var j=0;j<m.length;j++)
              if(arr[i]===m[j]){f=false;obj.arr.push(arr[i]);break;};
          if(f)m.push(arr[i])}
          obj.m = m.sort(function(a,b){return a-b});
      return obj;
    },
    //随机生成 注码
    randomCodeNum(){
      this.randomCount=parseInt(this.randomCount);
      if(this.randomCount.toString()=='NaN'||this.randomCount<1){
        this.randomCount=1;
        this.$Modal.warning({
          title:'提示',
          content:'随机数不能小于1',
          width:'200px',
        })
      }else{
        for (let k = 0; k < this.randomCount; k++) {
          let splitArr=''; //转换数组 传入后台输出格式
          let allYardObj = {};
          for (let i = 0; i < 2; i++) { 
            let a = ',';
            if(i!=0&&parseInt(i+1)%2==0){
              a = '|'
            }  
            if(i==1){
              a='';
            } 
            splitArr+=Math.floor(Math.random()*10)+a; 
          }             
          allYardObj.YardName = $('.play-item-list p.play_kind_list.active').text(); 
          allYardObj.YardNum = splitArr; 
          allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
          allYardObj.YardCount = 1;
          allYardObj.YardTimes = this.$parent.add_times;
          allYardObj.YardMoney =  this.$parent.mul(this.$parent.initCodeMoney,this.$parent.add_times,this.$parent.model1);
          this.$parent.allYardList.push(allYardObj);
        }
      }
    },
    validChioceNum(v){ //是否完成有效投注
      v = v.replace(/[^0-9]/ig,"");
      if(v.toString().length>1){
        this.$parent.btnImmediately = false;
        this.$parent.btnConfirmChoice = false;
        this.$parent.allChoiceYard=Math.floor(v.length/2);
        this.$parent.allPutMoney=this.$parent.mul(this.initCodeMoney,Math.floor(v.length/2),this.$parent.add_times,this.$parent.model1);
        this.$parent.estimateProfit = this.$parent.allGetProfit -this.$parent.allPutMoney;
      }else{
        this.$parent.btnImmediately = true;
        this.$parent.btnConfirmChoice = true;
        this.$parent.allChoiceYard=0;
        this.$parent.allPutMoney=0;
        this.$parent.estimateProfit = 0;
      }
    },
    //确认选号
    btnConfirmChoiceFun(arg){
      let _this = this;
      let fiflerRepetNum=0;  //重复值
      let fiflerErrorNum=0; //错误值
      let textAreaV = this.textAreaV.split('')
      if(textAreaV.length%2!=0){
        fiflerErrorNum = textAreaV[textAreaV.length-1];
        textAreaV.pop();       
      }
      textAreaV = textAreaV.toString().replace(/,/g,"").replace(/(.{2})(?=[^$])/g,"$1,").split(","); //重新转化为2位 数字在一起的一维数组
      textAreaV =  this.arrRemoveRet(textAreaV);
      fiflerRepetNum = textAreaV.arr.length;
      textAreaV.m = textAreaV.m.toString().replace(/,/g,"").split('');
      if(fiflerRepetNum>0||fiflerErrorNum>0){
        this.$Modal.confirm({
          content:'过滤1个错误号码('+fiflerErrorNum+')，过滤'+fiflerRepetNum+'个重复号码('+textAreaV.arr+')',
          onOk:function(){
            _this.generatebetList(textAreaV.m,arg);
          },
          onCancel:function(){}
        })
      }else{
        _this.generatebetList(textAreaV.m,arg);
      }
    },
    //生成选注 列表
    generatebetList(textAreaV,arg){
      let splitArr=''; //转换 传入后台输出格式
      let allYardObj = {};
      for (let i = 0; i < textAreaV.length; i++) { 
        let a = ',';
        if(i!=0&&parseInt(i+1)%2==0){
          a = '|'
        }  
        if(i==textAreaV.length-1){
          a='';
        } 
        splitArr+= textAreaV[i]+a;
      }  
      allYardObj.YardNum = splitArr;
      allYardObj.YardName = $('.play-item-list p.play_kind_list.active').text();
      allYardObj.YardMoneyKind = this.$refs.model1.$refs.reference.innerText;
      allYardObj.YardCount = this.$parent.allChoiceYard;
      allYardObj.YardTimes = this.$parent.add_times;
      allYardObj.YardMoney = this.$parent.allPutMoney;
      if(arg=='atOnce'){
        let obj = {};
        obj.gameNo =  this.$route.params.gameNo;
        obj.groupNo =  this.$parent.getGameGroupByGameWithGroupdata[this.$parent.kindCheckedIndex].groupClassCones[this.$parent.playkindFunIndex._index].groupSettinges[this.$parent.playkindFunIndex.index].groupNo;
        obj.betContent = allYardObj.YardNum;
        obj.betMultiple = allYardObj.YardTimes;
        obj.betNumber = allYardObj.YardCount;
        obj.betAmt = allYardObj.YardMoney;
        obj.estimateProfit = this.$parent.estimateProfit;
        let gamePattern=1;
        if( this.$parent.model1==1){
          gamePattern=0
        }else if( this.$parent.model1==0.1){
          gamePattern=1
        }else if( this.$parent.model1==0.01){
          gamePattern=2
        }
        obj.gamePattern = gamePattern;
        this.gamebet([obj]);
      }else{
        this.$parent.allYardList.push(allYardObj);
        this.textAreaV = '';
      }
    },
    //游戏投注
    gamebet(data){
      if(Number(this.$parent.acctAmt)<=0){
        this.$Modal.error({
          content:'您的余额不足,暂无法下注，请及时充值！'
        })
        return
      }
      let _this = this;
      this.$http({
        method:'post',
        url:'/game/bet',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data:data
      })
      .then(response => {
        let data = response.data;
        this.textAreaV='';
        let content = '';
        if(data.success){
          content='投注成功';
        }else{
          if(data.code ==10003){
            content='暂未开盘';
          }
          else{
            content='投注失败';
          }
        }
        _this.$Modal.warning({
          content:content
        })
      })
      .catch(error => {

      })
    }
  },
  watch:{
    textAreaV(v){
      this.validChioceNum(v);
    },
  }
}
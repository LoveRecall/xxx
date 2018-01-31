export default {
  data(){
    return{
      hotChecked:false, //冷热
      LostChecked:false, //遗漏
      initCodeMoney:2, //每注 金额
      randomCount:1, //随机注数
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
    choiceNum(e,index){
      let _codeNumYardArr = this.$parent.codeNumYardArr;
      if($(e.target).hasClass('active')){
        $(e.target).removeClass('active');
        _codeNumYardArr[index].splice(_codeNumYardArr[index].indexOf(e.target.innerText),1)
      }else{
        $(e.target).addClass('active');
        _codeNumYardArr[index].push(e.target.innerText)
      }       
      this.validChioceNum();
    },
    //快速选择号码
    quickChoice(e,index){  //判断每个列表下的 号码选中  就知道 是否完成一注
      let _codeNumYardArr = this.$parent.codeNumYardArr;
      $(e.target).addClass('active').siblings().removeClass('active');
      //每次先清空 选中
      //获取父级 panelList 下的 p
      let panelList_p = $(e.target).parents('.play-content-list').find('.ball-panel P');
      panelList_p.removeClass('active')
      let text = e.target.innerText;
      _codeNumYardArr[index]=[]; //单行 选择投注号码 数组清空 否则重复添加
      if(e.target.innerText=='全'){
        panelList_p.addClass('active')
        panelList_p.each(function(){
          _codeNumYardArr[index].push($(this).text());
        })
      }else if(e.target.innerText=='大'){
        for(let i =5;i<10;i++){
          panelList_p.eq(i).addClass('active')
          _codeNumYardArr[index].push(panelList_p.eq(i).text());
        }
      }else if(e.target.innerText=='小'){
        for(let i =0;i<5;i++){
          panelList_p.eq(i).addClass('active')
          _codeNumYardArr[index].push(panelList_p.eq(i).text());
        }
      }else if(e.target.innerText=='单'){
        for(let i =0;i<panelList_p.length;i++){
          if(Number(panelList_p.eq(i).text())%2!=0){
            panelList_p.eq(i).addClass('active');
            _codeNumYardArr[index].push(panelList_p.eq(i).text());
          }
        }
      }else if(e.target.innerText=='双'){
        for(let i =0;i<panelList_p.length;i++){
          if(Number(panelList_p.eq(i).text())%2==0){
            panelList_p.eq(i).addClass('active');
            _codeNumYardArr[index].push(panelList_p.eq(i).text());
          }
        }
      }else if(e.target.innerText=='清'){

      }
      this.validChioceNum();
    },
    validChioceNum(){ //是否完成有效投注
      let _this = this;
      let valid = true; 
      for(let i=0 ;i<_this.$parent.DataNumChoice.sub.length;i++){
        if(_this.$parent.codeNumYardArr[i].length<=0){
          valid = false;
        }
      }
      if(valid){
        let items=1; //总注码数
        _this.$parent.codeNumYardArr.map(function(item){
          items*=item.length
        })
        this.$parent.btnImmediately = false;
        this.$parent.btnConfirmChoice = false;
        this.$parent.allChoiceYard = items;
        this.$parent.allPutMoney = items*this.$parent.add_times*this.$parent.model1*this.$parent.initCodeMoney;
        this.$parent.estimateProfit = this.$parent.allGetProfit - this.$parent.allPutMoney;
      }else{
        this.$parent.allChoiceYard = 0;
        this.$parent.allPutMoney= 0;
        this.$parent.estimateProfit = 0;
        this.$parent.btnImmediately = true;
        this.$parent.btnConfirmChoice = true;
      }
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
          for (let i = 0; i < this.$parent.DataNumChoice.sub.length; i++) { 
            let a = '|';
            if(i==this.$parent.DataNumChoice.sub.length-1){
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
    //确认选号
    btnConfirmChoiceFun(arg){
      //全部清空
      let allYardObj = {};
      let splitArr=''; //转换数组 传入后台输出格式
      allYardObj.YardName = $('.play-item-list p.play_kind_list.active').text();
      for (let i = 0; i < this.$parent.codeNumYardArr.length; i++) { 
        let a = '|';
        if(i==this.$parent.codeNumYardArr.length-1){
          a='';
        } 
        splitArr+= this.$parent.codeNumYardArr[i].sort()+a;  
      }  
      allYardObj.YardNum = splitArr;
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
      $('.play-content p.active').removeClass('active');
      this.$parent.codeNumYardArr = new Array();  
      let i=this.$parent.DataNumChoice.sub.length;
      for(let k=0;k<i;k++){       
        this.$parent.codeNumYardArr[k]=new Array(); 
      }
      this.validChioceNum();
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
  }
}
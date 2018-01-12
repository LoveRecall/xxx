<template>
  <div class="gameRecord">
    <Form label-position="right" :label-width="50" inline>
      <FormItem label="时间:">
        <Row>
          <Col span="11">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间" style="width: 162px"></DatePicker>
          </Col>
          <Col span="2" style="text-align: center;padding-left:10px;padding-right: 10px">
          至</Col>
          <Col span="11">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间" style="width: 162px"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="用户名:" :label-width="60">
        <Input placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem label="彩种:">
        <Select style="width:164px">
          <Option value="所有游戏">所有游戏</Option>
          <Option value="所有游戏">所有游戏</Option>
          <Option value="所有游戏">所有游戏</Option>
        </Select>
      </FormItem>
      <FormItem label="玩法:">
        <Select style="width:164px">
          <Option value="所有游戏">所有游戏</Option>
          <Option value="所有游戏">所有游戏</Option>
          <Option value="所有游戏">所有游戏</Option>
        </Select>
      </FormItem>
      <FormItem label="中奖状态:" :label-width="70">
        <Select style="width:164px">
          <Option value="全部">全部</Option>
          <Option value="全部">全部</Option>
          <Option value="全部">全部</Option>
        </Select>
      </FormItem>
      <FormItem>
        <div class="query_btn" style="margin-left: -50px">查询</div>
      </FormItem>
    </Form>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns1: [
          {
            title: '注单编号',
            key: 'number'
          },
          {
            title: '投注时间',
            key: 'time'
          },
          {
            title: '用户',
            key: 'user'
          },
          {
            title: '彩种',
            key: 'species'
          },
          {
            title: '玩法',
            key: 'play'
          },
          {
            title: '投注内容',
            key: 'content'
          },
          {
            title: '投注期号',
            key: 'issue'
          },
          {
            title: '投注金额',
            key: 'amount'
          },
          {
            title: '投注返点',
            key: 'rebates'
          },
          {
            title: '奖金',
            key: 'bonus'
          },
          {
            title: '开奖号码',
            key: 'awardNumber'
          },
          {
            title: '状态',
            key: 'state'
          }
        ],
        data1: [
          {
            number: '1',
            time: '2',
            user: '3',
            species: '4',
            play: '5',
            content: '6',
            issue: '7',
            amount: '8',
            rebates: '9',
            bonus: '10',
            awardNumber: '11',
            state: '12'
          }
        ]
      }
    },
    computed: {},
    mounted() {

    },
    methods: {}
  }
</script>
<style lang="less">
  @import './gameRecord.less';
</style>

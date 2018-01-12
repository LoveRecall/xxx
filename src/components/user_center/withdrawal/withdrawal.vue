<template>
  <div class="withdrawal_wrapper">
    <Tabs value="name1" :animated="false">
      <TabPane label="提现" name="name1">
        <div class="withdrawal">
          <div class="info_list">
            <div class="amount" style="margin-right: 70px">可提款金额（元）：<span class="red_text">0</span></div>
            <div class="amount">手续费（元）：<span class="red_text">0</span></div>
            <div><span class="info_lable">提款银行卡：</span></div>
            <div><span class="info_lable">提款人姓名：</span><span>林小妹</span></div>
            <div><span class="info_lable">银行卡账号：</span><span>6222********1234</span></div>
          </div>
          <Form label-position="right" :label-width="90">
            <FormItem label="提款金额：">
              <Input placeholder="请输入提款金额" style="width: 180px"></Input>
              <div class="amount_tip"><span class="red_text">*</span>单次提现金额<span
                class="red_text">100.0000-100000.0000</span>元
              </div>
            </FormItem>
            <FormItem label="资金密码：">
              <Input placeholder="请输入密码" style="width: 180px"></Input>
            </FormItem>
            <FormItem>
              <div class="submit_btn">提交</div>
            </FormItem>
          </Form>
          <div class="remind">提款需完成充值金额的50%基础流水，否则会收取您的手续费</div>
          <table class="withdrawal_content">
            <tr>
              <td>
                账户总余额
              </td>
              <td>
                0
              </td>
              <td>
                提现时间
              </td>
              <td>
                24小时
              </td>
            </tr>
            <tr>
              <td>
                每日免手续费次数
              </td>
              <td>
                3次
              </td>
              <td>
                每日限制次数
              </td>
              <td>
                5次
              </td>
            </tr>
            <tr>
              <td>
                当日最大出款金额
              </td>
              <td>
                500000.00元
              </td>
              <td>
                今日已提次数
              </td>
              <td>
                0次
              </td>
            </tr>
            <tr>
              <td>
                手续费说明
              </td>
              <td colspan="3">
                0.00元
              </td>
            </tr>
          </table>
        </div>
      </TabPane>
      <TabPane label="查看提款进度" name="name2">
        <div class="progress">
          <div class="progress_instructions">自出款后第一次存款开始之后</div>
          <div class="progress_instructions">总有效投注：8.00（即所有产品的有效投注额）</div>
          <div class="progress_instructions">
            <div class="hide_btn">隐藏您的有效流水</div>
            <div class="hide_btn">隐藏优惠流水审核</div>
          </div>

          <table>
            <tr style="background-color: #c5d9f1">
              <td colspan="2" rowspan="2">
                存款日期区间
              </td>
              <td rowspan="2">
                存款金额
              </td>
              <td rowspan="2">
                存款优惠
              </td>
              <td rowspan="2">
                活动
              </td>
              <td>
                您的有效流水
              </td>
            </tr>
            <tr style="background-color: #c5d9f1">
              <td>
                彩票
              </td>
            </tr>
            <tr>
              <td colspan="2">
                起始：2017-02-13 14：21：16
              </td>
              <td rowspan="2">
                0
              </td>
              <td rowspan="2">
                8
              </td>
              <td rowspan="2">
                豪彩娱乐奖 金池活动
              </td>
              <td rowspan="2">
                8
              </td>
            </tr>
            <tr>
              <td colspan="2">
                起始：2017-02-13 14：21：16
              </td>
            </tr>
          </table>
          <table>
            <tr style="background-color: #f2ddda">
              <td colspan="6">
                优惠流水审核
              </td>
            </tr>
            <tr style="background-color: #f2ddda">
              <td colspan="2">
                彩票需流水
              </td>
              <td colspan="2">
                通过
              </td>
              <td>
                综合需流水
              </td>
              <td>
                是否达到
              </td>
            </tr>
            <tr>
              <td colspan="2">
                8
              </td>
              <td colspan="2">
                -
              </td>
              <td>
                100
              </td>
              <td>
                否
              </td>
            </tr>
          </table>
          <table>
            <tr style="background-color: #d9e5bd">
              <td colspan="5">
                常态流水审核
              </td>
            </tr>
            <tr style="background-color: #d9e5bd">
              <td>
                彩票需流水
              </td>
              <td>
                放宽额度
              </td>

              <td>
                通过
              </td>
              <td>
                需扣除行政费
              </td>
              <td>
                需扣除金额
              </td>
            </tr>
            <tr>
              <td>
                0
              </td>
              <td>
                0
              </td>
              <td>
                通过
              </td>
              <td>
                否
              </td>
              <td>
                0
              </td>
            </tr>
          </table>
          <table>
            <tr style="background-color: #c5d9f1">
              <td colspan="2" style="height: 68px">
                共扣除金额
              </td>
              <td colspan="4" style="height: 68px">
                彩票需流水
              </td>
            </tr>
          </table>
          <div class="audit_wrapper">
            <div class="">
              优惠流水审核：<span>未通过优惠流水审核！需要扣除优惠：8</span>
            </div>
            <div class="">
              常态性流水审核：<span class="red_text">通过常态性流水审核！</span>
            </div>
            <div class="">
              优惠流水审核 + 常态性流水审核
            </div>
            <div class="">
              此次出款时间时间为：2018-01-04 17：06：09
            </div>
          </div>

        </div>
      </TabPane>
      <TabPane label="查看流水" name="name3">
        <div class="bills">
          <Form label-position="right" :label-width="50" inline>
            <FormItem label="时间:">
              <Row>
                <Col span="11">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间"
                            style="width: 162px"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center;padding-left:10px;padding-right: 10px">
                至</Col>
                <Col span="11">
                <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"
                            style="width: 162px"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <div class="query_btn" style="margin-left: -50px">查询</div>
            </FormItem>
          </Form>
          <Table :columns="columns1" :data="data1"></Table>
        </div>
      </TabPane>
    </Tabs>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        columns1: [
          {
            title: '序号',
            key: 'No'
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '时间',
            key: 'time'
          },
          {
            title: '银行',
            key: 'bank'
          },
          {
            title: '银行卡姓名',
            key: 'accountName'
          },
          {
            title: '银行卡号',
            key: 'bankCardNo'
          },
          {
            title: '金额',
            key: 'amount'
          },
          {
            title: '申请状态',
            key: 'applicationStatus'
          },
          {
            title: '进度',
            key: 'progress'
          },
          {
            title: '备注',
            key: 'note'
          }
        ],
        data1: [
          {
            No: '1',
            userName: '2',
            time: '3',
            bank: '4',
            accountName: '5',
            bankCardNo: '6',
            amount: '7',
            applicationStatus: '8',
            progress: '9',
            note: '10'
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
  @import './withdrawal.less';
</style>

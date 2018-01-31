<template>
	<div class="confirm-bank">
		<Form label-position="right" :label-width="120" ref="formBank" :model="formBank">
			<!-- <div class="old-box">
				<FormItem label="开户人姓名：">
					<span>{{formBank.lastBankAcctName}}</span>
					<span class="old-b-red">（最近一次绑定的银行卡开户姓名）</span>
				</FormItem>
				<FormItem label="银行账户：">
					<span>{{formBank.lastBankAcct}}</span>
					<span class="old-b-red">（最近一次绑定的银行卡卡号）</span>
				</FormItem>
			</div>
			<p class="red old-b-text">备注：增加绑定银行卡需提供最近一次绑定的使用中的银行卡号信息！</p> -->
			<div class="new-box">
				<FormItem label="绑定银行：" class="new-bc-label new-bc-labels">
					<Input v-model="formBank.bankName" disabled></Input>
				</FormItem>
				<FormItem label="开户人姓名：" class="new-bc-label">
					<Input v-model="formBank.bankAcctName" disabled></Input>
				</FormItem>
				<FormItem label="银行账号：" class="new-bc-label">
					<Input v-model="formBank.bankAcct" disabled></Input>
				</FormItem>
			</div>
			<FormItem>
				<div class="btn" type="ghost" @click="saveBank">提交</div>
				<div class="btn" type="ghost" onclick="javascript:history.back();">返回</div>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				cityList: [{
						value: '中国工商银行',
						label: '中国工商银行'
					},
					{
						value: '中国交通银行',
						label: '中国交通银行'
					}
				],
				model: '中国工商银行',
				formBank: {
					custNo: '',
					custPhone: '',
					bankName: '',
					bankProvCity: '',
					bankBranch:'',
					bankAcctName: '',
					bankAcct: ''
				}
			}
		},
		computed: {},
		mounted() {
			//获取路由参数this.$route.params
			// console.log(this.$route.params);
			// if(JSON.stringify(this.$route.params) == "{}"){
			// 	this.$router.go(-1);
			// }
			this.formBank = this.$route.params;
		},
		methods: {
			saveBank() {
				let _this = this;

				_this.$Message.loading({
					content:'加载中...',
					duration:0
				});
				this.$http({
					method:'post',
					url:'/saveBank',
					params: _this.formBank,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;'
					}
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
			}
		}
	}
</script>

<style lang="less">
	@import './confirmBank.less';
</style>

<template>
	<div class='HuoDongXinZeng'>
		<div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">Create / Alter Activity</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;">
			<el-form :label-position="labelPosition" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign">
				<el-form-item label="Item" class='mat20 table50'>
					<el-input v-model="formLabelAlign.campaign" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="handler" class='mat20 table50 m30'>
					<el-input v-model="formLabelAlign.person" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Activation Date" class='mat20 table50'>
					<el-date-picker v-model="formLabelAlign.startDay" type="date" placeholder="select" class='inputs' style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Term of validity" class='mat20 table50 m30'>
					<el-date-picker v-model="formLabelAlign.endingDay" type="date" placeholder="select" class='inputs' style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Remark" class='mat20'>
					<el-input type="textarea" :rows="2" placeholder="Input" class='inputs' v-model="formLabelAlign.remakr" :disabled="type=='detail'?true:false"
					 style="width: 550px;float: left;">
					</el-input>
				</el-form-item>
				<el-form-item class='mat20' style='white-space: nowrap;width: 100%;'>
					<el-button :loading="loading" class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;margin-left: 30%;' @click="submitForm('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
					<el-button class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;' @click="cancel()">Return</el-button>
				</el-form-item>

			</el-form>
		</div>

	</div>

</template>

<script>
	export default {
		name: "UserCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect/' + value, null, r => {
						// //console.log(r)
						if (r == false) {
							callback(new Error('用戶名已存在'));
						} else {
							callback();
						}
					});
				} else {
					callback(new Error('請輸入用戶名'));
				}



			};
			return {
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				loading:false,
				formLabelAlign: {
					campaign:'',
					endingDay:'',
					person:'',
					remakr:'',
					startDay:'',
					plvYMarketingCampaignEntity:[],
				},
				option_youhui: [{
					id: '1',
					label: '優惠券'
				}, {
					value: '2',
					label: '代金券'
				}, {
					value: '2',
					label: '積分券'
				}],
				option_kehu: [{
					id: '1',
					label: '一般客戶'
				}, {
					value: '2',
					label: 'Tier-2客戶'
				}, {
					value: '2',
					label: 'VIP客戶'
				}],
			}
		},

		created: function() {
			this.type = this.$route.query.type
			if (this.type == 'detail') {
				// this.$route.query.uuid
				//console.log('----------*******************---------------')
				this.$api.get('/PlvYMarketingCampaignEndpoint/seekReference/' + this.$route.query.uuid, null, r => {
					//console.log(r)
					this.formLabelAlign.campaign = r.plvYMarketingCampaignEntity.campaign
					this.formLabelAlign.person = r.plvYMarketingCampaignEntity.person
					this.formLabelAlign.startDay = r.plvYMarketingCampaignEntity.startDay
					this.formLabelAlign.endingDay = r.plvYMarketingCampaignEntity.endingDay
					this.formLabelAlign.remakr = r.plvYMarketingCampaignEntity.remakr
					// this.formLabelAlign = r
					
					// //console.log(r)
				});
			} else if (this.type == 'alert') {

				this.$api.get('/PlvYMarketingCampaignEndpoint/seekReference/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					//console.log(r)
					this.formLabelAlign.campaign = r.plvYMarketingCampaignEntity.campaign
					this.formLabelAlign.person = r.plvYMarketingCampaignEntity.person
					this.formLabelAlign.startDay = r.plvYMarketingCampaignEntity.startDay
					this.formLabelAlign.endingDay = r.plvYMarketingCampaignEntity.endingDay
					this.formLabelAlign.remakr = r.plvYMarketingCampaignEntity.remakr
					// this.formLabelAlign = r
				});
				this.uuid = this.$route.query.uuid
			}
		},

		methods: {
			submitForm(formLabelAlign) {
				
				if((this.formLabelAlign.endingDay != '' && this.formLabelAlign.endingDay != null) && (this.formLabelAlign.startDay != '' && this.formLabelAlign.startDay != null) ){
					
					this.loading=true
					
					if(this.type == 'alert'){
						this.$api.post('/PlvYMarketingCampaignEndpoint/update', {
							"campaign": this.formLabelAlign.campaign,
							"endingDay": new Date(this.formLabelAlign.endingDay).format("yyyy-MM-dd"),
							"onLock": 0,
							"person": this.formLabelAlign.person,
							"reference": this.uuid,
							"remakr": this.formLabelAlign.remakr,
							"startDay": new Date(this.formLabelAlign.startDay).format("yyyy-MM-dd"),
							"userName": "",
							"userReference": ""
						}, r => {
							//console.log(r)
							this.$router.push("/MarketingActivities")
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					}else{
						this.$api.post('/PlvYMarketingCampaignEndpoint/save', {
							"campaign": this.formLabelAlign.campaign,
							"endingDay": this.formLabelAlign.endingDay.format("yyyy-MM-dd"),
							"onLock": 0,
							"person": this.formLabelAlign.person,
							"reference": "",
							"remakr": this.formLabelAlign.remakr,
							"startDay": this.formLabelAlign.startDay.format("yyyy-MM-dd"),
							"userName": "",
							"userReference": ""
						}, r => {
							//console.log(r)
							this.$router.push("/MarketingActivities")
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					}
					
				}else{
					alert('Time cannot be empty!!!')
				}
				
				
				

			},

			search() {

				this.$api.get('/customers/seekPage' + (parseInt(this.page01) - 1) + '/' + '8' + '/' + (this.formInline.search == "" ?
					'""' :
					this.formInline.search), null, r => {
					//console.log(r)
					// this.search()
					this.tableData3 = r.content;
					this.totalElements = r.totalElements
				});
			},

			detail() {},
			cancel() {
				this.$router.push("/MarketingActivities")
			},
			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/Function/CustomentManagement")
				} else if (type == 'branch') {
					this.$router.push("/Function/branchManagement")
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';
	.HuoDongXinZeng{
		.el-form-item {
			float: left;
		}
		
		.table50{
			width: 45%;
			float: left
		}
		
		.m30{
			margin-left: 5%;
			float: left
		}
		
		.second_menu {
			width: 100px;
			line-height: 76px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			cursor: pointer
		}
		
		
		.el-textarea__inner {
			height: 140px;
		}
		
		.selector {
			color: $navHoverTextColor;
		}
		
		.inputs {
			width: 300px;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}
		
		.button {
			// width: 191px;
			padding: 0 10px;
			height: 48px;
			font-size: 21px;
			// line-height: 48px;
			background: $navHoverTextColor;
			border: 0
		}
		
		.button:nth-child(2) {
			margin-left: 50px;
		
		}
		
		.point {
			cursor: pointer;
		}
	}
	
</style>

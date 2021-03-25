<template>
	<div class='HuoDongXinZeng01'>
		<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">Activity</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>
				
				<el-col :span="8">
					<span class="fl">Item：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.campaign" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				
				<el-col :span="8">
					<span class="fl">handler：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.person" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				
				<el-col :span="8">
					<span class="fl">Activation Date：</span>
					<p style="overflow: hidden;">
						<el-date-picker v-model="formLabelAlign.startDay" type="date" placeholder="select" style='width: 100%;' 
						 :disabled="type=='detail'?true:false">
						</el-date-picker>
					</p>
				</el-col>
				
			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>
				
				<el-col :span="8">
					<span class="fl">Term of validity：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.endingDay" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				
				<el-col :span="8">
					<span class="fl">Remark：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.remakr" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				
			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div style="width:100%;text-align: center;margin-top: 45px;">
			
			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>
			
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
	.HuoDongXinZeng01{
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
		
		
		.ltb_border {
			border-left: 1px solid black;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
			padding: 0 5px;
			height: 35px
		}
		
		.all_border {
			border: 1px solid black;
			padding: 0 5px;
			height: 35px
		}
		
		.tem_input {
			border-width: 0;
			border-bottom: 1px solid black;
			display: inline-block;
			width: 100%;
			height: 25px;
			margin-top: 5px;
			border: 0 1px 0 0;
			background-color: transparent;
		}
		
		.el-input__inner {
			border-width: 0;
			border-bottom: 1px solid black;
			display: inline-block;
			float: left;
			width: 100%;
			height: 25px;
			margin-top: 5px;
			border: 0 1px 0 0;
			border-radius: 0;
			background-color: transparent;
		}
		
		.el-autocomplete {
			width: 100%
		}
		
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		
		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
			text-align: center
		}
		
		.button {
			width: 191px;
			height: 48px;
			font-size: 21px;
			background: $navHoverTextColor;
			border: 0
		}
			
		.button:nth-child(2) {
			margin-left: 50px;
		}
		
		.el-input.is-disabled .el-input__inner {
			background-color: transparent; 
			 border-color: black; 
			 color: black; 
			 cursor: default;
		}
		
		
		
	}
	
</style>

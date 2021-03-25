<template>
	<div class="KaQuanXinZeng">
		<div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">卡券信息創建/修改</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 350px;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign">
				<el-form-item label="Types of Coupons" class='mat20 table30'>
					<el-input v-model="formLabelAlign.preferentialType" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
					<!-- <el-select v-model="formLabelAlign.youhui" placeholder="请选择" style="float: left;width: 300px;" :disabled="type=='detail'?true:false">
						<el-option v-for="item in option_youhui" :label="item.label" :value="item.label">
						</el-option>
					</el-select> -->
				</el-form-item>
				<el-form-item label="Discount Amount" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.preferential" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Meeting Conditions" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.workingCondition" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Number" class='mat20 table30'>
					<el-input v-model="formLabelAlign.numbe" placeholder="Input" type='tel' class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Customer Level" class='mat20 table30 m15'>
					<el-select v-model="userLevel" placeholder="Input" style="float: left;width: 300px;" :disabled="type=='detail'?true:false">
						<el-option v-for="item in option_kehu" :label="item.typeName" :value="item.typeName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Activation Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.startDay" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Effective Date" class='mat20 table30' style="width: 100%;">
					<el-date-picker v-model="formLabelAlign.endingDay" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<!-- <el-form-item class='mat20' style='white-space: nowrap;width: 100%;margin-left: 30%;'>
					<el-button class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;' @click="submitForm('formLabelAlign')" v-if="type!='detail'">提&nbsp;&nbsp;交</el-button>
					<el-button class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;' @click="cancel()">返&nbsp;&nbsp;回</el-button>
				</el-form-item> -->

			</el-form>
		</div>

		<div style="width:100%;text-align: center;margin-top: 45px;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>
			<!-- </el-form-item> -->
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
				loading:false,
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				userLevel:'',
				formLabelAlign: {
					campaign:'',
					userName:'',
					preferentialType:'',
					preferential:'',
					workingCondition:'',
					numbe:'',
					userLevel:'',
					onLock:'',
					startDay:'',
					endingDay:'',
				},
				option: [{
					id: '1',
					label: '男'
				}, {
					value: '2',
					label: '女'
				}],
				options: [{
					id: '1',
					label: '已使用'
				}, {
					value: '2',
					label: '未使用'
				}],

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
			this.findAllEntrepot()
			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid
			this.name = this.$route.query.name
			if (this.type == 'detail') {
				// this.$route.query.uuid
				this.$api.get('/customers/seekReference/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// //console.log(r)
				});
			} else if (this.type == 'alert') {

				this.$api.get('/customers/seekReference/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// //console.log(r)
				});
				this.uuid = this.$route.query.uuid
			}
		},

		methods: {
			findAllEntrepot() {
				//console.log('3333333')
				this.$api.post('/PlvYMarketingCampaignEndpoint/seekCustomerType', null, r => {
					//console.log(r.typeName)
					this.option_kehu = r
						this.userLevel = r.typeName
					// this.branchId== r.content[0].reference
					this.search()
					//console.log(r.typeName)
					//console.log(r)
				})
			},
			
			submitForm(formLabelAlign) {
				
				if((this.formLabelAlign.endingDay != '' && this.formLabelAlign.endingDay != null) && (this.formLabelAlign.startDay != '' && this.formLabelAlign.startDay != null) && (this.userLevel != '' && this.userLevel != null) && (this.formLabelAlign.numbe != '' && this.formLabelAlign.numbe != this.formLabelAlign.numbe != null )){
					
					this.loading=true
					this.$api.post('/PlvYMarketingCampaignEndpoint/saveDiscountCoupon', {
						"campaign": this.name,
						"campaignReference": this.uuid,
						"endingDay": this.formLabelAlign.endingDay.format("yyyy-MM-dd"),
						"numbe": parseInt(this.formLabelAlign.numbe),
						"onLock": 0,
						"persom": '',
						"preferential": parseInt(this.formLabelAlign.preferential),
						"preferentialType": this.formLabelAlign.preferentialType,
						"reference": '',
						"remark": this.formLabelAlign.remark,
						"startDay": this.formLabelAlign.startDay.format("yyyy-MM-dd"),
						"userLevel": this.userLevel,
						"userName": this.formLabelAlign.userName,
						"userReference": "",
						"workingCondition": this.formLabelAlign.workingCondition,
					}, r => {
						//console.log(r)
						//console.log('000000000')
						//console.log(this.name)
						this.$router.push("/CardTicketInformation")
					},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					
				}else{
					alert("Number \n Customer Level \n Activation Date \n Effective Date \n Can not be empty!!!")
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
	.KaQuanXinZeng{
		
		.el-form-item {
			margin-bottom: 0;
			float: left;
		}
		
		.table30{
			width: 30%;
			float: left
		}
		
		.m15{
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
			float: left
		}
		
		.button {
			// width: 191px;
			padding: 0 10px;
			height: 48px;
			font-size: 21px;
			// line-height: 48px;
			background: $navHoverTextColor;
			border: 0;
			margin-top: 30px;
		}
		
		.button:nth-child(2) {
			margin-left: 50px;
		
		}
		
		.point {
			cursor: pointer;
		}
	}
	
</style>

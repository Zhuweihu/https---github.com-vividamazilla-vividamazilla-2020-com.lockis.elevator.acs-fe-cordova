<template>
	<div class="branchCreate">
		

		<div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">>>>收據</span>
		</div>

		<div style="padding: 20px 0;border-radius: 10px;padding: 20px;height: 340px;width: 100%;" class="form_bg">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" >
				
				<el-form-item label="Bank" class='fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.name" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Date" class='fl' style='width: 30%;'>
					<el-date-picker v-model="formLabelAlign.targetDate" type="date" style='width: 300px;' class='inputs' :disabled="type=='detail'?true:false"
					 placeholder="select date">
					</el-date-picker>
					<!-- <el-input v-model="formLabelAlign.address" class='inputs' :disabled="type=='detail'?true:false"></el-input> -->
				</el-form-item>
				<el-form-item label="祈付" class='mat20 fl ' style='width: 30%;'>
					<el-input v-model="formLabelAlign.address" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="HKD" class='mat20 fl' style='width: 30%;'>
					<el-input class='inputs' v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="USD" class='mat20 fl' style='width: 30%;'>
					<el-input class='inputs' v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Company" class='mat20 fl' style='width: 30%;'>
					<el-input class='inputs' v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="編碼" class='mat20 fl' style='width: 30%;'>
					<el-input class='inputs' v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

			</el-form>
		</div>
		
		
		<!-- <div style="height: 50px;" class="mat20">
			<div style="float: left;line-height: 40px;font-size: 18px;">
				<span style="margin-left: 10px;">>>>石資料</span>
			</div>
		
		</div> -->
		
		<!-- <div style="width: 95%;float: left;">
			<el-row>
				<el-col :span="3">
					<div class="grid-content ">Memo No</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Lot No</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content ">Description Of Cut & Polished Diamonds</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Carats</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Rate(US$/HK$)</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Amount(US$/HK$)</div>
				</el-col>
			</el-row>
		
			<el-row v-for='(item,index) in formLabelAlign.stoneDataDto'>
				<el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.MemoNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.LotNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
						
					</div>
				</el-col>
				<el-col :span="6">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.Cutanddiamonds" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col>
				
				<el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.carats" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.rate" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content ">
						<el-input class='grid-inputs' v-model="item.amount" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
						<div v-if="type!='detail'" style="cursor: pointer;margin-top:10px;text-align: center;border-radius:5px; pointer;height: 20px;width:35px;line-height:20px;background:rgb(5,120,209);color: white;font-size: 12px;"
						 class='grid-inputs' @click="del(index)">刪除</div>
					</div>
				</el-col>
			</el-row>
		
			<el-row v-if="type!='detail'">
				<el-col :span="18">
					<div class="input-content " style="text-align: center;">
						<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;" src="../../../image/add.png" />
					</div>
				</el-col>
			</el-row>
		
		</div> -->
		
		
		
		<div class="testC" style="width: 100%;margin-top: 60px;float: left;">
			
				<el-button style='background: rgb(253,99,99);' class='button' type="primary" @click="submitForm('formLabelAlign')" v-if="type!='detail'">提交</el-button>
				<el-button style='background: rgb(253,99,99);' class='button' type="primary" @click="cancel()">返回</el-button>
			
		</div>
		
	</div>

</template>

<script>
	export default {
		name: "branchCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect /' + value + '/', null, r => {
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
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				id:'',
				password: '',
				formLabelAlign: {
					name: '',
					address: '',
					telephone: '',
					principal: '',
					stoneDataDto:[]
				},
				options: [{
					id: '1',
					label: '權限1'
				}, {
					value: '2',
					label: '權限2'
				}],
				option: [{
					id: '1',
					label: '群組1'
				}, {
					id: '2',
					label: '群組2'
				}],
				rules: {
					userName: [{
						validator: validatorUser,
						trigger: 'blur'
					}]

				},
			}
		},

		created: function() {
			this.type = this.$route.query.type
			if (this.type == 'detail') {
				this.$api.post('/seeku/' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r
					this.formLabelAlign.employ = r.employ == 0 ? true : false
				});
			} else if (this.type == 'Alert') {
				//console.log('1111')
				this.$api.post('/Branch/findOne?reference=' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r
				});
				this.uuid = this.$route.query.uuid
				this.id = this.$route.query.id
			}
		},

		methods: {
			
			add(){
				this.formLabelAlign.stoneDataDto.push({
					MemoNo:'',
					LotNo:'',
					Cutanddiamonds:'',
					carats:'',
					rate:'',
					amount:'',
				})
			},
			
			del(index) {
				// //console.log('刪除')
				this.formLabelAlign.stoneDataDto.splice(index, 1)
			},
			
			submitForm(formLabelAlign) {
				if (this.uuid != '') {
					// //console.log('01')
					this.$api.put('/Branch/update', {
						"address": this.formLabelAlign.address,
						"id": this.id,
						"name": this.formLabelAlign.name,
						"pnum": 0,
						"principal": this.formLabelAlign.principal,
						"reference": this.uuid,
						"telephone": this.formLabelAlign.telephone,
					}, r => {
						this.$router.push("/branchManagement")
					});
				} else {
					
					// //console.log('02')
					this.$api.put('/Branch/insert', {
						"address": this.formLabelAlign.address,
						"id": 0,
						"name": this.formLabelAlign.name,
						"pnum": 0,
						"principal": this.formLabelAlign.principal,
						"reference": 0,
						"telephone": this.formLabelAlign.telephone,
					}, r => {
						this.$router.push("/ReceiptManagement")
					});
				}
			},

			detail() {},
			cancel() {
				this.$router.push("/ReceiptManagement")
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/UserManagement")
				} else if (type == 'grounp') {
					this.$router.push("/CustomentManagement")
				}
			},

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';
	
	.branchCreate{
		
		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
			text-align: center
		}
		
		.el-form-item {
			margin-bottom: 0
		}
		
		.el-form--label-top .el-form-item__label {
			padding: 0
		}
		
		.second_menu {
			width: 100px;
			line-height: 76px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			cursor: pointer
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

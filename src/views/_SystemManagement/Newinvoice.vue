<template>
	<div class="branchCreate" style="min-width: 1400px;">
		<!-- <el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="background:white;height: 60px;">

					<div class="second_menu">
						<span @click="topage('user')">用戶管理</span>
					</div>

					<div class="second_menu">
						<span @click="topage('grounp')">群組管理</span>
					</div>

					<div class="second_menu selector">
						<span>分行管理</span>
					</div>
				</div>
			</el-col>
		</el-row> -->

		<div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">>>>Invoice & Receipt</span>
		</div>

		<div style="padding: 20px 0;border-radius: 10px;padding: 20px;height: 300px;" class="form_bg">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">

				<el-form-item label="Invoice Company" class='fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceSeller" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Invoice No" class='fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceNo" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

				<el-form-item label="Rap Price(US)" class='fl ' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceRapPrice" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

				<el-form-item label="Discount(%)" class='fl ' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceDiscount" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

				<el-form-item label="Total Carats" class='fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceTotalCarats" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

				<el-form-item label="Total HKD" class='fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceHk" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

				<el-form-item label="Total USD" class='fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceUs" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>



			</el-form>
		</div>


		<div style="height: 50px;" class="mat20">
			<div style="float: left;line-height: 40px;font-size: 18px;">
				<span style="margin-left: 10px;">>>>Stone</span>
			</div>

		</div>

		<div style="width: 95%;float: left;">
			<el-row>
				<el-col :span="3">
					<div class="grid-content ">Memo No</div>
				</el-col>
				<!-- <el-col :span="3">
					<div class="grid-content ">Lot No</div>
				</el-col> -->
				<el-col :span="6">
					<div class="grid-content ">Description Of Cut & Polished Diamonds</div>
				</el-col>
				<!-- <el-col :span="3">
					<div class="grid-content ">Carats</div>
				</el-col> -->
				<!-- <el-col :span="3">
					<div class="grid-content ">Rate(US$/HK$)</div>
				</el-col> -->
				<!-- <el-col :span="3">
					<div class="grid-content ">Amount(US$/HK$)</div>
				</el-col> -->
			</el-row>

			<el-row v-for='(item,index) in formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList'>
				<el-col :span="3">
					<div class="input-content ">
						<el-input class='grid-inputs' v-model="item.invoiceMemoNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
						<!-- <el-input class='grid-inputs' v-model="item.stoneName" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
					</div>
				</el-col>
				<!-- <el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.LotNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
				<!-- <el-input style='width:50%' class='grid-inputs' v-model="item.stoneSize" :disabled="type=='detail'?true:false"
						 placeholder="请输入内容"></el-input>
						<el-input style='width:50%' class='grid-inputs' v-model="item.stoneSizeUnit" :disabled="type=='detail'?true:false"
						 placeholder="请输入内容"></el-input> -->
				<!-- 	</div>
				</el-col> -->
				<el-col :span="6">
					<div class="input-content ">
						<el-input class='grid-inputs' v-model="item.invoiceDescription" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col>
				<!-- 交廠石重 -->
				<!-- <el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.carats" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col> -->
				<!-- <el-col :span="3">
					<div class="input-content ">
						<el-input  class='grid-inputs' v-model="item.rate" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col> -->
				<!-- <el-col :span="3">
					<div class="input-content ">
						<el-input class='grid-inputs' v-model="item.amount" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
					</div>
				</el-col> -->
				<el-col :span="3">
					<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
						<div v-if="type!='detail'" style="cursor: pointer;margin-top:10px;text-align: center;border-radius:5px; pointer;height: 20px;width:35px;line-height:20px;background:rgb(5,120,209);color: white;font-size: 12px;"
						 class='grid-inputs' @click="del(index)">刪除</div>
						<!-- <span style="cursor: pointer;" class='grid-inputs' @click="del(index)">刪除</span> -->
						<!-- <span class='grid-inputs' v-model="item.allweight" :disabled="type=='detail'?true:false"
					 placeholder="请输入内容"></span> -->
					</div>
				</el-col>
			</el-row>

			<el-row v-if="type!='detail'">
				<el-col :span="9">
					<div class="input-content " style="text-align: center;">
						<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;" src="../../../image/add.png" />
					</div>
				</el-col>
			</el-row>

		</div>

		<div style="padding: 20px 0;border-radius: 10px;padding: 20px;height: 250px;float: left;margin-top: 50px;width: 100%;"
		 class="form_bg">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">

				<el-form-item label="Check Date" class=' fl' style='width: 30%;'>
					<el-date-picker v-model="formLabelAlign.receiptBillingDate" type="date" style='width: 300px;' class='inputs01'
					 :disabled="type=='detail'?true:false" placeholder="select date">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Check HKD" class=' fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.receiptBillingPrice" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-date-picker v-model="formLabelAlign.receiptBillingPrice" type="date" style='width: 300px;' class='inputs01'
					 :disabled="type=='detail'?true:false" placeholder="select date">
					</el-date-picker> -->
				</el-form-item>
				<el-form-item label="Bank" class=' fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.receiptBankName" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-date-picker v-model="formLabelAlign.receiptBankName" type="date" style='width: 300px;' class='inputs01'
					 :disabled="type=='detail'?true:false" placeholder="select date">
					</el-date-picker> -->
				</el-form-item>
				<el-form-item label="Check No" class='mat20 fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.receiptNo" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-date-picker v-model="formLabelAlign.receiptNo" type="date" style='width: 300px;' class='inputs01' :disabled="type=='detail'?true:false"
					 placeholder="select date">
					</el-date-picker> -->
				</el-form-item>
				<el-form-item label="Check Company" class='mat20 fl' style='width: 30%;'>
					<el-input v-model="formLabelAlign.receiptPayer" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-date-picker v-model="formLabelAlign.receiptNo" type="date" style='width: 300px;' class='inputs01' :disabled="type=='detail'?true:false"
					 placeholder="select date">
					</el-date-picker> -->
				</el-form-item>


			</el-form>
		</div>

		<div class="testC" style="width: 100%;margin: 60px 0;float: left;">

			<el-button :loading="loading" style='background: rgb(253,99,99);' class='button' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button style='background: rgb(253,99,99);' class='button' type="primary" @click="cancel()">Return</el-button>

		</div>

	</div>

</template>

<script>
	
	import {
		MessageBox,
		Message
	} from 'element-ui';
	
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
				id: '',
				password: '',
				loading:false,
				formLabelAlign: {
					invoiceSeller: "",
					invoiceNo: "",
					invoiceRapPrice: "",
					invoiceDiscount: "",
					invoiceTotalCarats: "",
					"invoiceTotalPrice": {
						"id": 0,
						"inventoryPriceHk": "",
						"inventoryPriceUs": "",
						"reference": ""
					},
					plvkInvoiceMemoNoAndDescriptionDtoList: [],
					receiptBillingDate: "",
					receiptBillingPrice: "",
					receiptBankName: "",
					receiptNo: ""
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
				this.$api.post('/inventory/findInvoiceDetail?reference=' + this.$route.query.uuid, null, r => {
					//console.log(r)
					// this.formLabelAlign = r
					this.formLabelAlign=r.plvkInventoryDto
					this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList=r.list
					
					
					
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

			add() {
				this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList.push({
					"id": 0,
					"invoiceMemoNo": "",
					"invoiceDescription": "",
					"reference": ""
				})
			},

			del(index) {
				// //console.log('刪除')
				this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList.splice(index, 1)
			},

			submitForm(formLabelAlign) {

				//console.log({
				// 	invoiceSeller: this.formLabelAlign.invoiceSeller,
				// 	invoiceNo: this.formLabelAlign.invoiceNo,
				// 	invoiceRapPrice: this.formLabelAlign.invoiceRapPrice,
				// 	invoiceDiscount: this.formLabelAlign.invoiceDiscount,
				// 	invoiceTotalCarats: this.formLabelAlign.invoiceTotalCarats,
				// 	"invoiceTotalPrice": this.formLabelAlign.invoiceTotalPrice,
				// 	plvkInvoiceMemoNoAndDescriptionDtoList: this.formLabelAlign.invoiceMemoNoAndDescription,
				// 	receiptBillingDate: this.formLabelAlign.receiptBillingDate,
				// 	receiptBillingPrice: this.formLabelAlign.receiptBillingPrice,
				// 	receiptBankName: this.formLabelAlign.receiptBankName,
				// 	receiptNo: this.formLabelAlign.receiptNo,
				// 	"receiptPayer": this.formLabelAlign.receiptPayer,
				// })
				
				
				
				if(this.formLabelAlign.invoiceSeller==''||this.formLabelAlign.invoiceNo==''
				||this.formLabelAlign.invoiceTotalCarats==''||this.formLabelAlign.invoiceTotalPrice.inventoryPriceHk==''
				||this.formLabelAlign.invoiceTotalPrice.inventoryPriceUs==''||this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList==''
				||this.formLabelAlign.receiptBillingDate==''||this.formLabelAlign.receiptBillingPrice==''
				||this.formLabelAlign.receiptBankName==''||this.formLabelAlign.receiptNo==''||this.formLabelAlign.receiptPayer==''){
					
					MessageBox('除了Rap Pric和Discount外，其他内容不能爲空', '提示', {
						confirmButtonText: '确定',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						
					}).catch(() => {
					
					});
					
				}else{
					
					this.loading=true
					
					this.$api.put('/inventory/saveInvoice', {
						"availableInventoryWeight": 0,
						"availableStock": 0,
						"certificateNo": "",
						"certificatedate": new Date().format("yyyy-MM-dd"),
						"color": "",
						"comments": "",
						"cost": 0,
						"cut": "",
						"dimension": "",
						"dimensionUnit": "",
						"endDate": new Date().format("yyyy-MM-dd"),
						"entrepot": {
							"entrepot": "",
							"id": 0,
							"reference": ""
						},
						"giaClarityCharacteristics": "",
						"giaClarity_Grade": "",
						"giaFluorescence": "",
						"giaInscription": "",
						"giaMeasurements": "",
						"giaPolish": "",
						"giaStyle": "",
						"giaSymmetry": "",
						"grsDimensions": "",
						"grsIdentification": "",
						"grsObject": "",
						"grsOrigin": "",
						"grsShape": "",
						"id": 0,
						"identifier": {
							"id": 0,
							"jewelryType": "",
							"reference": ""
						},
						"inventoryType": "NONE",
						"invoiceDate": new Date().format("yyyy-MM-dd"),
						"invoiceDiscount": this.formLabelAlign.invoiceDiscount,
						"invoiceNo": this.formLabelAlign.invoiceNo,
						"invoiceRapPrice":  this.formLabelAlign.invoiceRapPrice,
						invoiceSeller: this.formLabelAlign.invoiceSeller,
						invoiceTotalCarats: this.formLabelAlign.invoiceTotalCarats,
						"invoiceTotalPrice": this.formLabelAlign.invoiceTotalPrice,
						"plvkInvoiceMemoNoAndDescriptionDtoList": this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList,
						receiptBankName: this.formLabelAlign.receiptBankName,
						
						receiptBillingDate: this.formLabelAlign.receiptBillingDate.format("yyyy-MM-dd"),
						receiptBillingPrice: this.formLabelAlign.receiptBillingPrice,
						receiptNo: this.formLabelAlign.receiptNo,
						"receiptPayer": this.formLabelAlign.receiptPayer,
						"reference": "",
						"startDate": new Date().format("yyyy-MM-dd"),
						"storageQuqntity": 0,
						"storageWeight": 0,
						"supplier": {
							"id": 0,
							"reference": "",
							"supplier": ""
						},
						"totalNumbe": 0,
						"weight": 0,
						"weightUnit": ""
					}, r => {
						this.$router.push("/invoiceManagement")
					},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					
				}
				
			},

			detail() {},
			cancel() {
				this.$router.push("/invoiceManagement")
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

	.branchCreate {

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

<template>
	<div class="MoBangXinZengs" style="min-width: 1025px;">
		
		<div style="height: 60px;">
			<div style="width: 90%;float: left;">
				<!-- <div style="float: left;line-height: 80px;font-size: 18px;color: green;">>>>Order Information</div> -->
				<div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<span style="margin-right: 5px;">version:</span>
					<el-select v-model="versions" placeholder="selct" @change='getdetails(versions)'>
						<el-option v-for="(item,index) in version" :label="'Edition'+index" :value="item.plvKGuestBillcol">
						</el-option>
					</el-select>
				</div>
		
			</div>
		</div>
		
		<!-- 客單資料 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Base information</span>
		</div>
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 250px;">

			<el-form label-position="top" placeholder="请输入内容" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<!-- <div style="width: 50%; float: left;"> -->

				<el-form-item label="Customer1" class='mat20 table30'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.customer1" placeholder="" class='inputs' :disabled="type=='detail'?true:true"
					 style="width: 300px;"></el-input>
					<!-- <el-autocomplete class="inputs01" v-model="formLabelAlign.plvKAVIEceSaveDto.customer1" :fetch-suggestions="querySearch_origin"
					 placeholder="Input" @select="handleSelect_origin" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete> -->
				</el-form-item>

				<el-form-item label="Customer2" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.customer2" placeholder="" class='inputs' :disabled="type=='detail'?true:true"
					 style="width: 300px;"></el-input>
					<!-- <el-autocomplete class="inputs01" v-model="formLabelAlign.plvKAVIEceSaveDto.customer2" :fetch-suggestions="querySearch_guanlian"
					 placeholder="Input" @select="handleSelect_origin" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete> -->
				</el-form-item>

				<el-form-item label="Sales No" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.salesNo" placeholder="" class='inputs' :disabled="type=='detail'?true:true"
					 style="width: 300px;"></el-input>
					<!-- <el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.salesNo" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker> -->
				</el-form-item>

				<!-- <el-form-item label="產品" class='mat20 table30 m15'>
						<el-input v-model="formLabelAlign.product" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
					</el-form-item> -->

				<!-- <el-form-item label="種類" class='mat20 table30'>
						<el-input v-model="formLabelAlign.gold" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
					</el-form-item> -->

				<el-form-item label="Big Date" class='mat20 table30 '>
					<el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.bigDay" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:true">
					</el-date-picker>
				</el-form-item>


				<el-form-item label="Buying Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.buyingDate" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:true">
					</el-date-picker>
				</el-form-item>


				<el-form-item label="Collection Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.collectionDate" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:true">
					</el-date-picker>
				</el-form-item>

			</el-form>
		</div>

		<!-- 基本資料 -->
		<!-- <div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Item information</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 480px;">
			<el-form label-position="top" placeholder="请输入内容" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="Design Code" class='mat20 table30'>
					<el-input v-model="formLabelAlign.plvKGuestBillSaveDtoList[0].designCode" placeholder="请输入内容" class='inputs'
					 :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Gold type" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKProductSaveDtoList[0].gold" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Gold color" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKProductSaveDtoList[0].goldColour" placeholder="请输入内容" class='inputs'
					 :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>


				<el-form-item label="product name" class='mat20 table30 '>
					<el-input v-model="formLabelAlign.plvKProductSaveDtoList[0].product" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="Number" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.plvKProductSaveDtoList[0].numbe" placeholder="请输入數量" :disabled="type=='detail'?true:false"
					 style="width: 150px;"></el-input>
					<el-input class='inputs' v-model="formLabelAlign.plvKProductSaveDtoList[0].size" placeholder="请输入單位" :disabled="type=='detail'?true:false"
					 style="width: 150px;"></el-input>
				</el-form-item>
				
				<el-form-item label="Size" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.plvKProductSaveDtoList[0].size1" placeholder="请输入尺寸" :disabled="type=='detail'?true:false"
					 style="width: 150px;"></el-input>
					<el-input class='inputs' v-model="formLabelAlign.plvKProductSaveDtoList[0].sizeUnit" placeholder="號或寸" :disabled="type=='detail'?true:false"
					 style="width: 150px;"></el-input>
				</el-form-item>

				<el-form-item label="Stone" class='mat20 table30 '>
					<el-select v-model="formLabelAlign.plvKGuestBillType" placeholder="请选择" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
						<el-option label="No" value="No"></el-option>
						<el-option label="Diamonds" value="Diamonds"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Around" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.sales" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="Unit HKD" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKProductSaveDtoList[0].unitHkd" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="Total HKD" class='mat20 table30'>
					<el-input v-model="formLabelAlign.plvKProductSaveDtoList[0].totalHkd" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="Net Amount" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKProductSaveDtoList[0].netAmount" placeholder="请输入内容" class='inputs'
					 :disabled="type=='detail'?true:false" style="width: 300px;"></el-input>
				</el-form-item>

				
			</el-form>
		</div> -->


		<!-- 項目描述 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Item information</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 15px 20px;width: 100%;border-radius: 10px;float: left;white-space: nowrap">
			<el-row style='text-align: center;'>
				<el-col :span="3">
					<div class="grid-content">Item Description</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">Size</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">W</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">T</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">Stone</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">Around</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Certificate No</div>
				</el-col>
				<el-col :span="1">
					<div class="grid-content ">QTY</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">Unit HKD</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">Total HKD</div>
				</el-col>
				<el-col :span="2">
					<div class="grid-content ">Net Amount</div>
				</el-col>
			</el-row>

			<el-row v-for='(item,index) in formLabelAlign.plvKAVIEcesSaveDtoList'>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.itemDescription" :disabled="type=='detail'?true:true" placeholder=""></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.size" :disabled="type=='detail'?true:true" placeholder=""></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.w" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.t" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.stone" :disabled="type=='detail'?true:true" placeholder=""></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.around" :disabled="type=='detail'?true:true" placeholder=""></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.onNumber" :disabled="type=='detail'?true:true" placeholder=""></el-input>
					</div>
				</el-col>
				<el-col :span="1">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.qty" :disabled="type=='detail'?true:true" placeholder=""></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.unitHkd" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.totalHkd" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.netAmount" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<!-- <el-col :span="2">
					<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
						<span style="cursor: pointer;" class='grid-inputs' @click="del(index)" v-if="type!='detail'">刪除</span>
					</div>
				</el-col> -->

			</el-row>
			</el-row>


		</div>




		<!-- 代工資料 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Other information</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 570px;white-space: nowrap;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="Total Price(HKD)" class='mat20 table30'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.totalPrice" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Total Discount(HKD)" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.totalDiscount" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Total Net(HKD)" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.totalNet" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="1st Payment(HKD)" class='mat20 table30'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.a1StPayment" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="2nd Payment(HKD)" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.a2NdPayment" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="balance" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.balance" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="1st Payment Date" class='mat20 table30 '>
					<el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.payment" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="2nd Payment Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.finalPayment" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>

				<el-form-item label="Code remark" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.codeRemark" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="Staff" class='mat20 table30 '>
					<el-input v-model="formLabelAlign.plvKAVIEceSaveDto.staff" placeholder="Input" class='inputs' :disabled="type=='detail'?true:true"
					 style="width: 300px;"></el-input>
				</el-form-item>

				<el-form-item label="Ref Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.plvKAVIEceSaveDto.refDate" type="date" placeholder="select" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>



				<el-form-item label="Remark" class='mat20 m15'>
					<el-input type="textarea" :rows="2" placeholder="Input" v-model="formLabelAlign.plvKAVIEceSaveDto.remark"
					 :disabled="type=='detail'?true:false" style="width: 300px;float: left;height: 60px;">
					</el-input>
				</el-form-item>

				<!-- <el-form-item label="NOTES TO CUSTOMER" class='mat20 '>
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formLabelAlign.plvKAVIEceSaveDto.notesToCustomer" :disabled="type=='detail'?true:false"
					 style="width: 300px;float: left;">
					</el-input>
				</el-form-item> -->


			</el-form>
		</div>

		<div class='mat20' style="white-space: nowrap;float: left;margin: 30px auto;margin-left: 30%;">
			<el-button :loading="loading" class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;' @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;' @click="cancel()">Return</el-button>
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
				test: '',
				dialogVisible: false,
				loading:false,
				textarea: '',
				labelPosition: '',
				type: "detail",
				uuid: '',
				value1: '',
				password: '',
				plvKAviEceOemSaveDtoList: '',
				plvKGuestBillSaveDtoList: '',
				plvKProductSaveDtoList: '',
				plvKStoneTotalSaveDtoList: '',
				plvKStoneTotalEntityList: '',
				version:[],
				versions:'',

				formLabelAlign: {
					"plvKAVIEceSaveDto": {
						"a1StPayment": 0,
						"a2NdPayment": 0,
						"balance": 0,
						"bigDay": "",
						"buyingDate": "",
						"codeRemark": "",
						"collectionDate": "",
						"condition": "",
						"customer1": "",
						"customer2": "",
						"finalPayment": "",
						"notesToCustomer": "",
						"payment": "",
						"plvKAVIEceType": "",
						"plvKGuestBillcol": "",
						"refDate": "",
						"reference": "",
						"remark": "",
						"remarks": "",
						"salesNo": "",
						"staff": "",
						"totalDiscount": 0,
						"totalNet": 0,
						"totalPrice": 0,
						"userName": "",
						"userRefenece": "",

						email: '',
						f: '',
						httpUrl: '',
						t: '',
						pourLaVie: '',
						address: ''

					},
					"plvKAVIEcesSaveDtoList": [],
					"plvKAviEceOemSaveDtoList": [{
						"costLaborHk": 0,
						"costLaborRmb": 0,
						"factoryInvoice": "",
						"factoryPriceHk": 0,
						"factoryPriceRmb": 0,
						"factoryRecord": "",
						"landingDate": "",
						"oemName": "",
						"oemRefenece": "",
						"otherExpensesExplain": "",
						"otherExpensesHk": 0,
						"plvKAviEceRefenece": "",
						"refenece": ""
					}]
				},

				options: [{
					id: '1',
					label: '已起貨'
				}, {
					value: '2',
					label: '起交貨'
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

				this.$api.get('/PlvKClientCardEndpoint/seekPlvKGuestBillcol/' + this.$route.query.uuid, null, r => {


					// 					for (var i = 0; i < this.formLabelAlign.plvKAviEceOemEntityList.length; i++) {
					// 						 this.formLabelAlign.plvKAviEceOemEntityList[i].landingDate = new Date(this.formLabelAlign.plvKAviEceOemEntityList[i].landingDate).format("yyyy-MM-dd")
					// 						//console.log(this.formLabelAlign.plvKAviEceOemEntityList[i].landingDate)
					// 					}
					// this.formLabelAlign = r
					//console.log(r)

					this.formLabelAlign.gold = r.plvKProductEntityList[0].gold
					this.formLabelAlign.goldColour = r.plvKProductEntityList[0].goldColour
					this.formLabelAlign.guestDate = r.plvKProductEntityList[0].guestDate
					this.formLabelAlign.made = r.plvKProductEntityList[0].made
					this.formLabelAlign.plantDate = r.plvKProductEntityList[0].plantDate
					this.formLabelAlign.product = r.plvKProductEntityList[0].product
					this.formLabelAlign.numbe = r.plvKProductEntityList[0].numbe
					this.formLabelAlign.size = r.plvKProductEntityList[0].size
					this.formLabelAlign.size1 = r.plvKProductEntityList[0].size1
					this.formLabelAlign.sizeUnit = r.plvKProductEntityList[0].sizeUnit
					this.formLabelAlign.totalPrice = r.plvKProductEntityList[0].totalPrice
					this.formLabelAlign.plvKGuestBillType = r.plvKGuestBillEntityList[0].plvKGuestBillType
					
					console.log('------01')
					
					this.formLabelAlign.costLaborHk = r.plvKAviEceOemEntityList[0].costLaborHk
					this.formLabelAlign.costLaborRmb = r.plvKAviEceOemEntityList[0].costLaborRmb
					this.formLabelAlign.factoryInvoice = r.plvKAviEceOemEntityList[0].factoryInvoice
					this.formLabelAlign.factoryPriceHk = r.plvKAviEceOemEntityList[0].factoryPriceHk
					this.formLabelAlign.factoryPriceRmb = r.plvKAviEceOemEntityList[0].factoryPriceRmb
					this.formLabelAlign.factoryRecord = r.plvKAviEceOemEntityList[0].factoryRecord
					this.formLabelAlign.landingDate = r.plvKAviEceOemEntityList[0].landingDate
					this.formLabelAlign.otherExpensesExplain = r.plvKAviEceOemEntityList[0].otherExpensesExplain
					this.formLabelAlign.made = r.plvKAviEceOemEntityList[0].made
					this.formLabelAlign.otherExpensesHk = r.plvKAviEceOemEntityList[0].otherExpensesHk
					this.formLabelAlign.oemName = r.plvKAviEceOemEntityList[0].oemName ///
					console.log('------02')
					this.formLabelAlign.bigDay = r.plvKGuestBillEntityList[0].bigDay
					this.formLabelAlign.claimDay = r.plvKGuestBillEntityList[0].claimDay
					this.formLabelAlign.company = r.plvKGuestBillEntityList[0].company
					this.formLabelAlign.customer1 = r.plvKGuestBillEntityList[0].customer1
					this.formLabelAlign.customer2 = r.plvKGuestBillEntityList[0].customer2
					this.formLabelAlign.designCode = r.plvKGuestBillEntityList[0].designCode
					this.formLabelAlign.explain = r.plvKGuestBillEntityList[0].explain
					this.formLabelAlign.factory = r.plvKGuestBillEntityList[0].factory
					this.formLabelAlign.gpAmount = r.plvKGuestBillEntityList[0].gpAmount
					this.formLabelAlign.landingDay = r.plvKGuestBillEntityList[0].landingDay
					this.formLabelAlign.made = r.plvKGuestBillEntityList[0].made
					this.formLabelAlign.mintMark = r.plvKGuestBillEntityList[0].mintMark
					this.formLabelAlign.proCode = r.plvKGuestBillEntityList[0].proCode
					this.formLabelAlign.sales = r.plvKGuestBillEntityList[0].sales
					this.formLabelAlign.salesCode = r.plvKGuestBillEntityList[0].salesCode
					this.formLabelAlign.togoRem2 = r.plvKGuestBillEntityList[0].togoRem2
					this.formLabelAlign.togoRemak = r.plvKGuestBillEntityList[0].togoRemak
					this.formLabelAlign.netSales = r.plvKGuestBillEntityList[0].netSales
					this.formLabelAlign.sellingPrice = r.plvKGuestBillEntityList[0].sellingPrice
					
					console.log('------03')

					this.formLabelAlign.color = r.plvKStoneEntityList[0].color
					this.formLabelAlign.stone = r.plvKStoneEntityList[0].stone
					this.formLabelAlign.shape = r.plvKStoneEntityList[0].shape
					this.formLabelAlign.cts = r.plvKStoneEntityList[0].cts
					this.formLabelAlign.hk = r.plvKStoneEntityList[0].hk
					this.formLabelAlign.remark = r.plvKStoneEntityList[0].remark
console.log('------04')
					this.formLabelAlign.gold1 = r.plvKStoneTotalEntityList[0].gold
					this.formLabelAlign.goldHk = r.plvKStoneTotalEntityList[0].goldHk
					this.formLabelAlign.goldUnivalence = r.plvKStoneTotalEntityList[0].goldUnivalence
					this.formLabelAlign.goldWeight = r.plvKStoneTotalEntityList[0].goldWeight
					this.formLabelAlign.made = r.plvKStoneTotalEntityList[0].made
					this.formLabelAlign.totalCost = r.plvKStoneTotalEntityList[0].totalCost
					this.formLabelAlign.totalGold = r.plvKStoneTotalEntityList[0].totalGold
					this.formLabelAlign.totalStone = r.plvKStoneTotalEntityList[0].totalStone
					this.formLabelAlign.totalStoneCard = r.plvKStoneTotalEntityList[0].totalStoneCard
					this.formLabelAlign.totalStoneCost = r.plvKStoneTotalEntityList[0].totalStoneCost
					// this.formLabelAlign.design = r.plvKStoneTotalEntityList[0].design
					this.formLabelAlign.plvKAVIEcesEntityList = r.plvKStoneEntityList
					
					console.log('------05')
					
					
				});
			} else if (this.type == 'Alert') {


				this.$api.get('/PlvKClientCardEndpoint/seekPlvKGuestBillcol/' + this.$route.query.uuid, null, r => {
					
					console.log('li-------------zhi')
					console.log(r)

					this.formLabelAlign.plvKAVIEceSaveDto = {
						"a1StPayment": 0,
						"a2NdPayment": 0,
						"balance": 0,
						"bigDay": r.plvKGuestBillEntityList[0].bigDay,
						"buyingDate": r.plvKProductEntityList[0].guestDate,
						"codeRemark": "",
						"collectionDate": r.plvKGuestBillEntityList[0].landingDay,
						"condition": "",
						"customer1": r.plvKGuestBillEntityList[0].customer1,
						"customer1Reference":r.plvKGuestBillEntityList[0].customer1Reference,
						"customer2Reference":r.plvKGuestBillEntityList[0].customer2Reference,
						"customer2": r.plvKGuestBillEntityList[0].customer2,
						
						
						
						"finalPayment": "",
						"notesToCustomer": r.plvKGuestBillEntityList[0].explain,
						"payment": "",
						"plvKAVIEceType": "",
						"plvKGuestBillcol": this.$route.query.uuid,
						"refDate": "",
						"reference": "",
						"remark": "",
						"remarks": "",
						"salesNo": r.plvKGuestBillEntityList[0].salesCode,
						"staff": r.plvKGuestBillEntityList[0].sales,
						"totalDiscount": 0,
						"totalNet": 0,
						"totalPrice": 0,
						"userName": "",
						"userRefenece": "",
						
						email: r.plvkBranchEntity.email,
						f: r.plvkBranchEntity.fax,
						httpUrl: r.plvkBranchEntity.internetSite,
						t: r.plvkBranchEntity.telephone,
						pourLaVie: r.plvkBranchEntity.name,
						address: r.plvkBranchEntity.address,
						
						

					}

					var item = {
						"itemDescription": r.plvKGuestBillEntityList[0].customer1 + ' ' + r.plvKGuestBillEntityList[0].customer2 +
							' ' + r.plvKGuestBillEntityList[0].designCode + ' ' + r.plvKProductEntityList[0].gold + ' ' + r.plvKProductEntityList[
								0].goldColour + r.plvKProductEntityList[0].product,
						"netAmount": 0,
						"plvKAviEceRefenece": "",
						"qty": r.plvKProductEntityList[0].numbe,
						"refenece": "",
						"size": r.plvKProductEntityList[0].size1,
						"stone": r.plvKProductEntityList[0].stone,
						"t": "",
						"totalHkd": 0,
						"unitHkd": 0,
						"w": "",
						"around": r.plvKProductEntityList[0].around,
						"onNumber": ''
					}
					this.formLabelAlign.plvKAVIEcesSaveDtoList.push(item)

					for (var i = 0; i < r.plvKStoneEntityList.length; i++) {

						var temples = {
							"itemDescription": r.plvKStoneEntityList[i].stone,
							"netAmount": 0,
							"plvKAviEceRefenece": "",
							"qty": r.plvKStoneEntityList[i].cts,
							"refenece": "",
							"size": r.plvKStoneEntityList[i].size,
							"stone": r.plvKStoneEntityList[i].stone,
							"t": "",
							"totalHkd": 0,
							"unitHkd": 0,
							"w": "",
							"around": '',
							"onNumber": r.plvKStoneEntityList[i].noNumber
						}
						this.formLabelAlign.plvKAVIEcesSaveDtoList.push(temples)

					}






				})








				// });
				this.uuid = this.$route.query.uuid
				
				this.findAllEntrepot()




				// this.id = this.$route.query.id

			}
		},

		methods: {
			
			
			//狀態
			findAllEntrepot() {
				console.log('分行')
				
				this.$api.get('/PlvKClientCardEndpoint/seekPlvKClientWarranty/' + this.uuid, null , r => {
					console.log('-------------------------')
					console.log(r)
					this.version = r
					// this.search()
					// this.$router.push("/SystemManagement/CustomerOrderManagement")
				});
				
				
				
			},
			getdetails(id){
								this.$api.get('/PlvKClientCardEndpoint/seekPlvKGuestBillcol/' + id, null, r => {
					
					console.log('li-------------zhi')
					console.log(r)
				
					this.formLabelAlign.plvKAVIEceSaveDto = {
						"a1StPayment": 0,
						"a2NdPayment": 0,
						"balance": 0,
						"bigDay": r.plvKGuestBillEntityList[0].bigDay,
						"buyingDate": r.plvKProductEntityList[0].guestDate,
						"codeRemark": "",
						"collectionDate": r.plvKGuestBillEntityList[0].landingDay,
						"condition": "",
						"customer1": r.plvKGuestBillEntityList[0].customer1,
						"customer1Reference":r.plvKGuestBillEntityList[0].customer1Reference,
						"customer2Reference":r.plvKGuestBillEntityList[0].customer2Reference,
						"customer2": r.plvKGuestBillEntityList[0].customer2,
						
						
						
						"finalPayment": "",
						"notesToCustomer": r.plvKGuestBillEntityList[0].explain,
						"payment": "",
						"plvKAVIEceType": "",
						"plvKGuestBillcol": this.$route.query.uuid,
						"refDate": "",
						"reference": "",
						"remark": "",
						"remarks": "",
						"salesNo": r.plvKGuestBillEntityList[0].salesCode,
						"staff": r.plvKGuestBillEntityList[0].sales,
						"totalDiscount": 0,
						"totalNet": 0,
						"totalPrice": 0,
						"userName": "",
						"userRefenece": "",
						
						email: r.plvkBranchEntity.email,
						f: r.plvkBranchEntity.fax,
						httpUrl: r.plvkBranchEntity.internetSite,
						t: r.plvkBranchEntity.telephone,
						pourLaVie: r.plvkBranchEntity.name,
						address: r.plvkBranchEntity.address,
						
						
				
					}
				
					var item = {
						"itemDescription": r.plvKGuestBillEntityList[0].customer1 + ' ' + r.plvKGuestBillEntityList[0].customer2 +
							' ' + r.plvKGuestBillEntityList[0].designCode + ' ' + r.plvKProductEntityList[0].gold + ' ' + r.plvKProductEntityList[
								0].goldColour + r.plvKProductEntityList[0].product,
						"netAmount": 0,
						"plvKAviEceRefenece": "",
						"qty": r.plvKProductEntityList[0].numbe,
						"refenece": "",
						"size": r.plvKProductEntityList[0].size1,
						"stone": r.plvKProductEntityList[0].stone,
						"t": "",
						"totalHkd": 0,
						"unitHkd": 0,
						"w": "",
						"around": r.plvKProductEntityList[0].around,
						"onNumber": ''
					}
					this.formLabelAlign.plvKAVIEcesSaveDtoList.push(item)
				
					for (var i = 0; i < r.plvKStoneEntityList.length; i++) {
				
						var temples = {
							"itemDescription": r.plvKStoneEntityList[i].stone,
							"netAmount": 0,
							"plvKAviEceRefenece": "",
							"qty": r.plvKStoneEntityList[i].cts,
							"refenece": "",
							"size": r.plvKStoneEntityList[i].size,
							"stone": r.plvKStoneEntityList[i].stone,
							"t": "",
							"totalHkd": 0,
							"unitHkd": 0,
							"w": "",
							"around": '',
							"onNumber": r.plvKStoneEntityList[i].noNumber
						}
						this.formLabelAlign.plvKAVIEcesSaveDtoList.push(temples)
				
					}
				
				
				
				
				
				
				})
			},

			querySearch_origin(queryString, cb) {
				this.$api.get('/inventory/findAllSupplier?supplier=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].supplier,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			querySearch_guanlian(queryString, cb) {
				this.$api.get('/inventory/findAllSupplier?supplier=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].supplier,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			handleSelect_origin(item) {
				this.formLabelAlign.supplier = item
			},

			submitForm(formLabelAlign) {
				
				this.loading=true
				
				this.formLabelAlign.plvKAVIEceSaveDto.bigDay=new Date(this.formLabelAlign.plvKAVIEceSaveDto.bigDay).format("yyyy-MM-dd")
				this.formLabelAlign.plvKAVIEceSaveDto.buyingDate=new Date(this.formLabelAlign.plvKAVIEceSaveDto.buyingDate).format("yyyy-MM-dd")
				this.formLabelAlign.plvKAVIEceSaveDto.collectionDate=new Date(this.formLabelAlign.plvKAVIEceSaveDto.collectionDate).format("yyyy-MM-dd")
				this.formLabelAlign.plvKAVIEceSaveDto.finalPayment=new Date(this.formLabelAlign.plvKAVIEceSaveDto.finalPayment).format("yyyy-MM-dd")
				this.formLabelAlign.plvKAVIEceSaveDto.payment=new Date(this.formLabelAlign.plvKAVIEceSaveDto.payment).format("yyyy-MM-dd")
				this.formLabelAlign.plvKAVIEceSaveDto.refDate=new Date(this.formLabelAlign.plvKAVIEceSaveDto.refDate).format("yyyy-MM-dd")
				
				
				//console.log({
				// 	"plvKAVIEceSaveDto": this.formLabelAlign.plvKAVIEceSaveDto,
				// 	"plvKAVIEcesSaveDtoList": this.formLabelAlign.plvKAVIEcesSaveDtoList,
				// 	"plvKAviEceOemSaveDtoList": this.formLabelAlign.plvKAviEceOemSaveDtoList
				// })
				
				this.$api.post('/PlvKAviEce/save', {
					"plvKAVIEceSaveDto": this.formLabelAlign.plvKAVIEceSaveDto,
					"plvKAVIEcesSaveDtoList": this.formLabelAlign.plvKAVIEcesSaveDtoList,
					"plvKAviEceOemSaveDtoList": this.formLabelAlign.plvKAviEceOemSaveDtoList
				}, r => {
					
					this.loading=false
					this.$router.push("/orderManagement")
					//console.log(r)
				},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});




			},

			//增加石資料 plvKStoneSaveDtoList
			add() {
				this.formLabelAlign.plvKStoneSaveDtoList.push({
					"color": "string",
					"cts": 0,
					"elseRefenece": "string",
					"hk": 0,
					"hkC": 0,
					"netAmount": 0,
					"pcs": 0,
					"refenece": "string",
					"remark": "string",
					"shape": "string",
					"stone": "string",
					"us": 0,
					"usC": 0
				})
			},
			//代工列表
			// 			app() {
			// 				this.formLabelAlign.plvKAviEceOemEntityList.push({
			// 					costLaborRmb: '',
			// 					costLaborHk: '',
			// 					otherExpensesHk: '',
			// 					factoryInvoice: '',
			// 					factoryPriceRmb: '',
			// 					factoryPriceHk: '',
			// 					landingDate: '',
			// 					factoryRecord: '',
			// 					otherExpensesExplain: '',
			// 				})
			// 			},

			cancel() {
				this.$router.push("/orderManagement")
			},

			// 項目刪除
			del(index) {
				//console.log('0000')
				// 				//console.log(index)
				this.formLabelAlign.plvKStoneSaveDtoList.splice(index, 1)

				// this.$api.get('/PlvKClientCardEndpoint/deletePlvKStone/' + this.formLabelAlign.plvKAVIEcesEntityList[index].refenece,
				// 	null, r => {
				// 		//console.log('****************************')
				// 		this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
				// 		this.search();
				// 	});


			},


			// 代工刪除
			detele(indexs) {
				// //console.log('111111')
				this.formLabelAlign.plvKStoneSaveDtoList.splice(indexs, 1)
				// 				//console.log('111111')
				// 				//console.log(indexs)
				// 				this.$api.get('/PlvKAviEce/deletePlvKAVIEceOem/' + this.formLabelAlign.plvKAviEceOemEntityList[indexs].refenece, null, r => {
				// 					//console.log('****************************')
				// 					this.formLabelAlign.plvKAviEceOemEntityList.splice(indexs, 1)
				// 					this.search();
				// 				});
			},
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.MoBangXinZengs {
		.el-form-item {
			margin-bottom: 0;
			float: left;
		}

		.table30 {
			width: 30%;
			float: left
		}

		.m15 {
			margin-left: 5%;
			float: left
		}

		// 		.m30{
		// 			margin-left: 10%;
		// 			float: left
		// 		}

		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
		}

		.input-content {
			line-height: 36px;
			
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

		.el-col-3 {
			width: 14%
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

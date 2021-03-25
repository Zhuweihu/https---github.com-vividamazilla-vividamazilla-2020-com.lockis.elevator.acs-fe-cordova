<template>
	<div class="design">
		<el-form>

		<div>
			<el-row style='line-height: 35px;'>
				<el-col :span="8">
					<span class="fl">產品類別：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.name" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">尺寸要求（必須跟足尺寸要求，只能0.15mm内誤差）</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>
				<el-col :span="8">
					<span class="fl">手指圈口：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.fax" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">闊度：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">厚度：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.internetSite" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>

				<el-col :span="8">
					<span class="fl">長度：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.email" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">特別要求</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>
				<el-col :span="8">
					<span class="fl">戒指肶内：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.fax" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
		
				<el-col :span="8">
					<span class="fl">内鑲：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
		
				<el-col :span="8">
					<span class="fl">要求厰：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.internetSite" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>
				<el-col :span="8">
					<span class="fl">設計跟版：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.fax" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
		
				<el-col :span="8">
					<span class="fl">改款：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<el-form-item label="設計圖(最多可上傳四張):" class='mat20 table90' style='margin-bottom: 20px; width: 60%;margin-left: 0;'>
			<el-upload action="auto" :file-list="fileList" :http-request="uploadSectionFile" list-type="picture-card" :limit="4"
			 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" style="float: left;">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</el-form-item>
		<!-- ||||||||||||||||||||| -->
		<div style="width:100%;text-align: center;margin-top: 45px;width: 100%;white-space: nowrap">
			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Send</el-button>
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>

		</div>
		</el-form>

	</div>

</template>



<script>
	export default {
		name: "KaiZhiFapiao",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect/' + value, null, r => {
						// console.log(r)
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
				salesId: '',
				totalStoneCard: '',
				userReferenceId: '',
				salesStatus: '',
				billStatus: '',
				// 				querySearch_salesStatus:'',
				// 				querySearch_origin:'',
				// 				querySearch_guanlian:'',
				root: 'http://192.168.101.5:8080/RESTful/kernal/asset/',
				fileList_outerPosition: [],
				fileList_innerPosition: [],
				fileList: [],
				assetRef: [],
				branch: '',
				branch_list: [],
				ringFeel: 5,
				claimFactory: 3,
				dialogImageUrl_outerPosition: '',
				dialogImageUrl_innerPosition: '',
				dialogImageUrl: '',
				dialogVisible_outerPosition: false,
				dialogVisible_innerPosition: false,
				dialogVisible: false,
				loading: false,
				textarea: '',
				labelPosition: '',
				type: "detail",
				uuid: '',
				password: '',
				formLabelAlign: {
					assetRef: [{
						referenceId: '', //石質料
					}],
					productName: '',
					productCategory: '',
					quality: '',
					customerName: '',
					requiredDeliveryDate: '',
					bigDate: '',


					factoryName: '',
					productCategory: '',
					color: '',
					itemNumbe: '',
					itemCode: '',
					customerSalesNo: '',
					customerName: '',
					requiredDeliveryDate: '',
					dimension: '',
					dimensionUnit: '號',
					breadth: '',
					breadthUnit: 'mm',
					thickness: '',
					thicknessUnit: 'mm',
					length: '',
					lengthUnit: 'mm',
					itemCode1: '',
					itemReCode: '',
					ordinaryPrint: '',
					customerPrint: '',
					fontPrint: '',
					wordsPrint: '',
					sales: '',
					stoneRemarks: '',
					salesStatus: '',
					billStatus: '',
					ringFeel: '',
					claimFactory: '',
				},
				unit: [{
						id: '1',
						label: '人民幣'
					},
					{
						id: '2',
						label: '港幣'
					},
					{
						id: '3',
						label: '美元'
					},
				],
				options: [{
					id: '1',
					label: 'NONE'
				}, {
					id: '2',
					label: 'URGENT'
				}, {
					id: '3',
					label: 'GENERAL'
				}],
				rules: {
					userName: [{
						validator: validatorUser,
						trigger: 'blur'
					}]

				},
				entrepot: ''

			}
		},

		created: function() {
			this.findAllEntrepot()
			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid
			this.id = this.$route.query.id
			this.$api.get('/PlvKClientCardEndpoint/seekPlvKGuestBillcol/' + this.$route.query.uuid, null, r => {
				console.log('-------------------------')
				// console.log(this.userReferenceId)
				console.log(r)
				this.version = r

				this.billStatus = r.jewelryType

				this.formLabelAlign.customerName = r.plvKGuestBillEntityList[0].customer1 + '/' + r.plvKGuestBillEntityList[0].customer2
				this.formLabelAlign.productCategory = r.plvKProductEntityList[0].gold
				this.formLabelAlign.quality = r.plvKProductEntityList[0].goldColour
				this.formLabelAlign.productName = r.plvKProductEntityList[0].product
				this.formLabelAlign.bigDate = r.plvKGuestBillEntityList[0].bigDay
				this.formLabelAlign.billingDate = r.plvKGuestBillEntityList[0].claimDay
				this.formLabelAlign.salesCode = r.plvKGuestBillEntityList[0].salesCode //銷售代碼
				this.formLabelAlign.sales = r.plvKGuestBillEntityList[0].sales
				this.formLabelAlign.itemNumbe = r.plvKProductEntityList[0].numbe
				this.formLabelAlign.factoryNo = r.plvKAviEceOemEntityList[0].factoryInvoice
				this.formLabelAlign.color = r.plvKStoneEntityList[0].color
				this.formLabelAlign.requiredDeliveryDate = r.plvKAviEceOemEntityList[0].landingDate
				this.formLabelAlign.factoryName = r.plvKAviEceOemEntityList[0].oemName ///
				this.formLabelAlign.itemCode = r.plvKGuestBillEntityList[0].designCode


				this.formLabelAlign.company = r.plvKGuestBillEntityList[0].company
				this.formLabelAlign.goldColour = r.plvKProductEntityList[0].goldColour
				this.formLabelAlign.color = r.plvKStoneEntityList[0].color
				this.formLabelAlign.designCode = r.plvKGuestBillEntityList[0].designCode //設計單號
				this.formLabelAlign.totalStoneCard = r.plvKStoneTotalEntityList[0].totalStoneCard //石重

				this.formLabelAlign.sales = r.plvKGuestBillEntityList[0].sales //銷售員
				this.formLabelAlign.salesId = r.plvKGuestBillEntityList[0].userReference //銷售員Id

				this.entrepot = r.plvkBranchEntity.reference
				this.branch = r.plvkBranchEntity.name


				this.$api.post('/PlvKClientCardEndpoint/seekMember?name=' + '', null, r => {
					console.log(r)
					for (var i = 0; i < r.length; i++) {

						if (r[i].identifier == this.formLabelAlign.sales) {

							this.formLabelAlign.salesId = r[i].id

						}
					}

				});


				// this.formLabelAlign.salesId = r.plvKStoneTotalEntityList[0].userReference //銷售員Id
				// this.search()
				// this.$router.push("/SystemManagement/CustomerOrderManagement")
				// 				console.log('**************************************************')
				// 				console.log(this.formLabelAlign.salesId)
			});
		},

		methods: {

			findAllEntrepot() {
				this.$api.get('/inventory/findAllEntrepot', null, r => {
					this.branch_list = r.content,
						this.branch = r.content[0].name
					// this.branchId== r.content[0].reference
					this.search()
				});
			},

			// 			getdetails(){
			// 				this.$api.post('/BillStatus/findAll',{
			// 					"billStatus": this.formLabelAlign.billStatus,
			// 					"id": 0,
			// 					"reference": ""
			// 				}, r => {
			// 					console.log(r)
			// 				})
			// 			},
			//銷售情況
			querySearch_salesStatus(queryString, cb) {
				this.$api.post('/BillStatus/findAll', null, r => {
					console.log(r)
					console.log('/////////////////////')
					console.log(r.id)
					var results = []
					for (var i = 0; i < r.length; i++) {
						var temp = {
							"value": r[i].billStatus,
							"reference": r[i].reference,
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},



			// 設計跟板
			querySearch_origin(queryString, cb) {
				this.$api.post('/Design/seekPages', {
					"index": 0,
					"numbe": 30,
					"seek": queryString
				}, r => {

					console.log(r)
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].designName,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
							"numbe": r.content[i].numbe,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			handleSelect_origin(item) {
				// this.formLabelAlign.supplier = item
				this.formLabelAlign.itemCode1 = item.value
			},


			querySearch_reorigin(queryString, cb) {
				this.$api.post('/Design/seekPages', {
					"index": 0,
					"numbe": 30,
					"seek": queryString
				}, r => {

					console.log(r)
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].designName,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
							"numbe": r.content[i].numbe,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			handleSelect_reorigin(item) {
				// this.formLabelAlign.supplier = item
				this.formLabelAlign.itemReCode = item.value
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



			handleSelect_salesStatus(item) {
				this.formLabelAlign.billStatus = item

			},

			//外环位置
			handleRemove_outerPosition(file, fileList) {
				console.log(file, fileList);
			},

			//内环位置
			handleRemove_innerPosition(file, fileList) {
				console.log(file, fileList);
			},
			//石资料
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},

			handlePictureCardPreview_outerPosition(file) {
				this.dialogImageUrl_outerPosition = file.url;
				this.dialogVisible_outerPosition = true;
			},
			handlePictureCardPreview_innerPosition(file) {
				this.handleRemove_innerPosition = file.url;
				this.handleRemove_innerPosition = true;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},

			search() {


			},
			//外环位置
			uploadSectionFile_outerPosition(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');

				console.log('0.0.00.0.0.0.0.')
				// console.log(r.reference)
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.dialogImageUrl_outerPosition = this.root + '/kernal/asset/' + r.reference

					this.referenceId_outerPosition = r.reference
					console.log(r)
				});
			},
			//内环位置
			uploadSectionFile_innerPosition(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.dialogImageUrl_innerPosition = this.root + '/kernal/asset/' + r.reference

					this.referenceId_innerPosition = r.reference
					console.log(r)
				});
			},
			//石资料
			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.dialogImageUrl = this.root + '/kernal/asset/' + r.reference

					this.referenceId = r.reference
					console.log(r)

					this.assetRef.push({
						"reference": r.reference,
					})
				});
			},

			submitForm(formLabelAlign) {

				// 				if (this.formLabelAlign.reference == '') {
				// 					this.formLabelAlign.jewelryType = this.billStatus
				// }

				this.loading = true
				console.log('-----*******------')
				// console.log(this.salesId)
				console.log(this.referenceId_outerPosition)

				for (let i = 0; i < this.branch_list.length; i++) {
					if (this.branch == this.branch_list[i].name) {
						this.entrepot = this.branch_list[i]
					}
				}





				// billStatus

				var sss = {}
				if (this.formLabelAlign.billStatus) {
					sss = this.formLabelAlign.billStatus
				} else {
					sss = {
						"billStatus": this.formLabelAlign.salesStatus,
						"id": 0,
						"reference": '' //this.userReference
					}
				}

				this.$api.put('/sendInlay/SaveFactoryOrder', {
					"assetRef": this.assetRef,
					"billStatus": sss,


					// 					{
					// 						"billStatus": this.formLabelAlign.salesStatus,
					// 						"id": 0,
					// 						"reference":''    //this.userReference
					// 					 },
					// 					"assetRef": [
					// 						this.referenceId, //石質料
					// 					],
					"bigDate": new Date(this.formLabelAlign.bigDate).format("yyyy-MM-dd"),
					"billingDate": new Date(this.formLabelAlign.billingDate).format("yyyy-MM-dd"), //發單日期
					"color": this.formLabelAlign.color, /////
					"customerName": this.formLabelAlign.customerName,
					"customerPrint": this.formLabelAlign.customerPrint, ///字句
					"customerPrintPosition": this.formLabelAlign.customerPrintPosition,
					"customerSalesNo": this.formLabelAlign.salesCode, ///客銷售單號
					"eceReference": this.uuid,

					"entrepot": this.entrepot,


					"factoryName": this.formLabelAlign.factoryName, //////工廠名稱
					"factoryNo": this.formLabelAlign.factoryNo, //////工廠編號
					"fontPrint": this.formLabelAlign.fontPrint,
					"id": 0,
					innerPosition: this.referenceId_innerPosition, //内圖
					outerPosition: this.referenceId_outerPosition, //外圖
					"isLock": "",
					"isRevoke": "",
					"isSend": "",
					"itemCode": this.formLabelAlign.itemCode, //////設計
					"itemNumbe": this.formLabelAlign.itemNumbe, //////



					"ordinaryPrint": this.formLabelAlign.company + this.formLabelAlign.designCode +
						this.formLabelAlign.goldColour + this.formLabelAlign.color + this.formLabelAlign.totalStoneCard, //////公司字印要求

					"productCategory": this.formLabelAlign.productCategory,
					"productName": this.formLabelAlign.productName,
					"quality": this.formLabelAlign.quality,
					"reference": "",
					"remark": this.formLabelAlign.ordinaryPrint,
					"requiredDeliveryDate": new Date(this.formLabelAlign.requiredDeliveryDate).format("yyyy-MM-dd"), ///交貨日期
					"requirementSpecial": {
						"claimFactory": this.formLabelAlign.claimFactory, //要求
						"id": 0,
						"itemCode": this.formLabelAlign.itemCode1,
						"itemReCode": this.formLabelAlign.itemReCode,
						"reference": "",
						"ringFeel": this.formLabelAlign.ringFeel, //感覺
					},
					"requirementsSize": {
						"breadth": this.formLabelAlign.breadth, //寬breadth Unit
						"breadthUnit": this.formLabelAlign.breadthUnit,
						"dimension": this.formLabelAlign.dimension, //號
						"dimensionUnit": this.formLabelAlign.dimensionUnit,
						"id": 0,
						"length": this.formLabelAlign.length, //長
						"lengthUnit": this.formLabelAlign.lengthUnit,
						"reference": "",
						"thickness": this.formLabelAlign.thickness, //厚度
						"thicknessUnit": this.formLabelAlign.thicknessUnit,
					},
					"sales": this.formLabelAlign.sales,
					// "salesStatus": this.formLabelAlign.salesStatus,
					"stoneRemarks": "",
					"wordsPrint": this.formLabelAlign.wordsPrint, //字句
					"salesId": this.formLabelAlign.salesId, //id
				}, r => {
					console.log(r)
					this.loading = false
					this.$router.push("/CustomerOrderManagement")
				});
			},



			detail() {},
			cancel() {
				this.$router.push("/CustomerOrderManagement")
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

	.design {

		width: 100%;

		.el-form-item {
			margin-bottom: 0
		}

		.table30 {
			width: 30%
		}

		.table45 {
			width: 45%
		}

		.table70 {
			width: 70%
		}

		.table75 {
			width: 75%;
			margin-left: 5%
		}

		.table90 {
			width: 90%;
			margin-left: 5%
		}

		.ml5 {
			margin-left: 5%;
		}

		.inputs01 {
			width: 90%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
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
			width: 90%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.inputsA {
			width: 70%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.inputsUnit {
			width: 20%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.inpuzi {
			width: 45%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.inputs1 {
			width: 60%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.inputsUnit2 {
			width: 40%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.inputszi {
			width: 40%;
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

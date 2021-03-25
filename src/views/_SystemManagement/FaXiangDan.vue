<template>
	<div class="KaiZhiFapiao">

		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 22px;"><b>PLV</b>&nbsp;&nbsp;&nbsp;</span>
			<span style="float: left;font-size: 16px;"><b>Inlay Order</b>(附圖記錄)</span>
			<div style="float: left;font-size: 16px;width: 150px;margin-left: 20%;">
				<span>Factory:{{formLabelAlign.factoryName}}</span>
			</div>
			<div style="float: left;font-size: 16px;width: 150px;">
				<span>Sales:{{formLabelAlign.sales}}</span>
			</div>

			<div style="float: right;font-size: 16px;width: 200px">
				<el-select v-model="branch" placeholder="select" style="float: left;width: 100%;">
					<!-- <el-option v-for="(item,index) in billStatus" :value="item.billStatus"> -->
					<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
					</el-option>
				</el-select>

			</div>



		</div>



		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 480px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				<el-form-item label="Billing Date" class='mat20 fl table30'>
					<el-date-picker v-model="formLabelAlign.billingDate" type="date" placeholder="选择日期" class='inputs' style='width: 90%;'
					 :disabled="true">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Delivery Date" class='mat20 fl table30 ml5'>
					<el-date-picker v-model="formLabelAlign.requiredDeliveryDate" type="date" placeholder="选择日期" class='inputs' style='width: 90%;'
					 :disabled="true">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Big Date" class='mat20 fl table30 ml5'>
					<el-date-picker v-model="formLabelAlign.bigDate" type="date" placeholder="选择日期" class='inputs' style='width: 90%;'
					 :disabled="true">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Factory No" class='mat20 fl table30'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.factoryNo" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="Sales Code" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.salesCode" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="Customer" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.customerName" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="Category" class='mat20 fl table30'>
					<el-input v-model="formLabelAlign.productCategory" class='inputs' :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="design" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.itemCode" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="Quantity" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.itemNumbe" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="Quality" class='mat20 fl table30'>
					<el-input class='inputs' v-model="formLabelAlign.quality" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="Color" class='mat20 fl table30 ml5'>
					<el-input class='inputs' v-model="formLabelAlign.color" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
		</div>


		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Request</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 1550px;">
			<div class="mat20" style="border:1px solid #000000;height: 83px;width: 60%;float: left;">
				<div style="height: 40px;">
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;font-size: 16px;line-height: 40px;">Ring Size(港度)</div>
					<!-- <div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;font-size: 16px;line-height: 40px;">濶度</div> -->
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;font-size: 16px;line-height: 40px;">Degree of freedom</div>
				
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;font-size: 16px;line-height: 40px;">Thickness</div>
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;font-size: 16px;line-height: 40px;">Length</div>
				</div>
				<div style="height: 40px;">
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;">
						<el-input v-model="formLabelAlign.dimension" class='inputs1'></el-input>
						<el-input v-model="formLabelAlign.dimensionUnit" class='inputsUnit2' value="號"></el-input>
					</div>
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;">
						<el-input v-model="formLabelAlign.breadth" class='inputs1'></el-input>
						<el-input v-model="formLabelAlign.breadthUnit" class='inputsUnit2' value="mm"></el-input>
					</div>
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;">
						<el-input class='inputs1' v-model="formLabelAlign.thickness"></el-input>
						<el-input v-model="formLabelAlign.thicknessUnit" class='inputsUnit2' value="mm"></el-input>
					</div>
					<div style="text-align: center;width: 25%;height: 40px;border-right: 1px solid #000000;float: left;">
						<el-input class='inputs1' type="email" v-model="formLabelAlign.length"></el-input>
						<el-input v-model="formLabelAlign.lengthUnit" class='inputsUnit2' value="mm"></el-input>
					</div>
				</div>

			</div>

			<div class="mat20" style="width: 30%;float: right;height: 83px;">
				<!-- <el-form-item label="銷售情況"> -->
				<div>Sales situation</div>
				<!-- <el-select v-model="formLabelAlign.salesStatus" placeholder="请选择" class="mat20" style="float: left;width: 60%;"
				 :disabled="type=='detail'?true:false">
					<el-option v-for="item in options" :label="item.label" :value="item.label">
					</el-option>
				</el-select> -->

				<el-autocomplete class="mat20 inputs01" v-model="formLabelAlign.salesStatus" :fetch-suggestions="querySearch_salesStatus"
				 placeholder="Input" @select="handleSelect_salesStatus" style="width: 60%;float: left;"></el-autocomplete>
				<!-- </el-form-item> -->
			</div>


			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">

				<el-form-item label="Ring inside" class='mat20 fl table45'>
					<el-radio-group v-model="formLabelAlign.ringFeel">
						<el-radio label="WELL">WELL</el-radio>
						<el-radio label="SAME">SAME</el-radio>
						<el-radio label="THICK">THICK</el-radio>
						<el-radio label="MICROBU">MICROBU</el-radio>
						<el-radio label="INSERT">INSERT</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="Design template" class='mat20 fl table45 ml5'>
					<el-autocomplete class="inputs01" v-model="formLabelAlign.itemCode1" :fetch-suggestions="querySearch_origin"
					 placeholder="Input" @select="handleSelect_origin" :disabled="type=='detail'?true:false" style="width: 90%;float: left;"></el-autocomplete>
				</el-form-item>

				<el-form-item label="Factory Requirement" class='mat20 fl table45'>
					<el-radio-group v-model="formLabelAlign.claimFactory">
						<el-radio label="IMAGE">IMAGE</el-radio>
						<el-radio label="THREEIMAGE">THREEIMAGE</el-radio>
						<el-radio label="WAXBOARD">WAXBOARD</el-radio>
					</el-radio-group>
				</el-form-item>


				<el-form-item label="Alter template" class='mat20 fl table45 ml5'>
					<el-autocomplete class="inputs01" v-model="formLabelAlign.itemReCode" :fetch-suggestions="querySearch_reorigin"
					 placeholder="Input" @select="handleSelect_reorigin" :disabled="type=='detail'?true:false" style="width: 90%;float: left;"></el-autocomplete>
				</el-form-item>



				<el-form-item label="General Requirement:" class='mat20 fl table70 ml5'>

					<div>
						<span>Company:{{formLabelAlign.company}}&nbsp;&nbsp;Sales No:{{formLabelAlign.designCode}}&nbsp;&nbsp;Quantity:{{formLabelAlign.goldColour}}/{{formLabelAlign.color}}&nbsp;&nbsp;Stone Weight:{{formLabelAlign.totalStoneCard}}</span>
					</div>
					<div>Remark:</div>
					<!-- <el-input v-model="formLabelAlign.ordinaryPrint" class='inputs'></el-input> -->
					<el-input type="textarea" class='inputs01' v-model="formLabelAlign.ordinaryPrint" placeholder="Input"></el-input>
				</el-form-item>
				<el-form-item label="Customer words position:" class='mat20 fl table75 m15'>
					<el-input class='inpuzi' v-model="formLabelAlign.customerPrintPosition"></el-input>
				</el-form-item>
				<el-form-item label="Words:" class='mat20 fl table75 m15'>
					<el-input class='inpuzi' v-model="formLabelAlign.customerPrint"></el-input>
				</el-form-item>
				<el-form-item label="Font:" class='mat20 fl table75 m15'>
					<el-input class='inpuzi' v-model="formLabelAlign.fontPrint"></el-input>
				</el-form-item>


				<el-form-item label="External location:" class='mat20 fl table90 m15' style='margin-bottom: 20px; width: 60%;'>
					<el-upload action="auto" :file-list="fileList_outerPosition" :http-request="uploadSectionFile_outerPosition"
					 list-type="picture-card" :limit="1" :on-preview="handlePictureCardPreview_outerPosition" :on-remove="handleRemove_outerPosition"
					 style="float: left;">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl_outerPosition" alt="">
					</el-dialog>
				</el-form-item>

				<!-- <div class='GIA'>
					<el-form-item label="外位置表達" class='mat20 fl table90 m15' style='margin-bottom: 20px; width: 60%;'>
						<el-upload :disabled="type=='detail'?true:false" style='float: left;height: 100px;' class="avatar-uploader" :show-file-list="false" action="auto"  :http-request="handlePictureCardPreview_outerPosition">
							<img v-if="imageUrl02" :src="dialogImageUrl_outerPosition" class="avatar" style="width: 180px;height: 80px;">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span v-if="imageUrl02" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("gia")'>預覽</span>
						<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handleRemove("gia")'>刪除</span>
					</el-form-item>
				</div> -->

				<el-form-item label="Internal position:" class='mat20 fl table90 m15' style='margin-bottom: 20px; width: 60%;'>
					<el-upload action="auto" :file-list="fileList_innerPosition" :http-request="uploadSectionFile_innerPosition"
					 list-type="picture-card" :limit="1" :on-preview="handlePictureCardPreview_innerPosition" :on-remove="handleRemove_innerPosition"
					 style="float: left;">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl_innerPosition" alt="">
					</el-dialog>
				</el-form-item>


				<el-form-item label="Stone Information:" class='mat20 fl table90 m15' style='margin-bottom: 20px; width: 60%;'>
					<el-upload action="auto" :file-list="fileList" :http-request="uploadSectionFile" list-type="picture-card" :limit="4"
					 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" style="float: left;">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
			</el-form>
		</div>
		<!-- <input type="hidden" id='salesId' value="" /> -->
		<div style="width:100%;text-align: center;margin-top: 45px;width: 100%;white-space: nowrap">
			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Send</el-button>
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>

		</div>


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
				salesId:'',
				totalStoneCard:'',
				userReferenceId:'',
				salesStatus: '',
				billStatus:'',
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
				loading:false,
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
					billStatus:'',
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
				entrepot:''
				
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
				
				
				this.$api.post('/PlvKClientCardEndpoint/seekMember?name=' + '',  null, r => {		
					console.log(r)
					for (var i = 0; i < r.length; i++) {
						
						if(r[i].identifier==this.formLabelAlign.sales)
						{
						
								this.formLabelAlign.salesId=r[i].id
							
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
				
				this.loading=true
				console.log('-----*******------')
				// console.log(this.salesId)
				console.log(this.referenceId_outerPosition)
				
				for (let i = 0; i < this.branch_list.length; i++) {
					if(this.branch==this.branch_list[i].name){
						this.entrepot=this.branch_list[i]
					}
				}
				
				
				
				
				
				// billStatus
				
				var sss = {}
				if(this.formLabelAlign.billStatus){
					sss = this.formLabelAlign.billStatus
				}else{
					sss = {
						"billStatus": this.formLabelAlign.salesStatus,
						"id": 0,
						"reference":''    //this.userReference
					 }
				}
				
				this.$api.put('/sendInlay/SaveFactoryOrder', {
					"assetRef": this.assetRef,
					"billStatus":sss,
					
					
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
					
					"entrepot":this.entrepot,
					
					
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
					this.loading=false
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

	.KaiZhiFapiao {

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
			height: 48px;
			font-size: 21px;
			padding: 0 10px;
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

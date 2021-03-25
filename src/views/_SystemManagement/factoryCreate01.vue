<template>
	<div class="factoryCreate01">
		
				<!-- ||||||||||||||||||||| -->
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">基本資料</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">Sales no：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.salesNo" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">Big Day：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign.bigDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">工場：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.factoryName" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">設計編號：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.itemCode" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">金：</span>
							<p style="overflow: hidden;">
							
								<input v-model="formLabelAlign.quality" :disabled="type=='detail'?true:false" class="tem_input" style="width: 49%;">
								<input v-model="formLabelAlign.color" :disabled="type=='detail'?true:false" class="tem_input" style="width: 49%;margin-left: 2%;">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">產品：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.productName" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">數量：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.numbe" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">類別：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.productCategory" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">尺寸：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.dimension" :disabled="type=='detail'?true:false" class="tem_input" style="width: 49%;">
								<input v-model="formLabelAlign.dimensionUnit" :disabled="type=='detail'?true:false" class="tem_input" style="width: 49%;margin-left: 2%;">
								<!-- <input v-model="formLabelAlign.internetSite" :disabled="type=='detail'?true:false" class="tem_input"> -->
							</p>
						</el-col>
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">設計：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.itemCode" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">客：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.customerName" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">起貨日期：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign.requiredDeliveryDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col>
				
						
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						
						<el-col :span="8">
							<span class="fl">客落單日期：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign.orderDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col>
				
						
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				
				
				<div style="height: 50px;" class="mat20">
					<div style="float: left;line-height: 40px;font-size: 18px;">
						<span style="margin-left: 10px;">>>>石資料</span>
					</div>

					<!-- <div>
						<el-select style='height: 30px;width: 130px;margin-left: 10px;' v-model="branch" :disabled="type=='detail'?true:false">
							<el-option v-for='(item, index) in branch_list' :label="item.entrepot" :value="item.entrepot"></el-option>
						</el-select>
					</div> -->

				</div>

				<div style="width: 95%;min-width: 1200px;">
					<el-row>
						<el-col :span="2">
							<div class="grid-content ">Warehouse</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content ">Type</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content ">Certificate No</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content ">Name</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content ">Size</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content ">Send Num</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content ">Send Weight</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content ">Return Weight</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content ">Reality Num/Weight</div>
						</el-col>

					</el-row>

					<el-row v-for='(item,index) in formLabelAlign.stoneDataDto'>
						<el-col :span="2">
							<div class="input-content ">
								<el-select @change='pageupdate()' class='grid-inputs' v-model="item.entrepot" :disabled="type=='detail'?true:false">
									<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.reference"></el-option>
									<!-- <el-option @blur='setindex(index)' v-for='(items, indexs) in item.arrydimension' :label="items.value" :value="items.value"></el-option> -->
								</el-select>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="input-content ">
								<el-select @change='pageupdate()' class='grid-inputs' v-model="item.inventoryType" :disabled="type=='detail'?true:false">
									<el-option label="NONE" value="NONE"></el-option>
									<el-option label="GIA" value="GIA"></el-option>
									<el-option label="GRS" value="GRS"></el-option>
									<!-- <el-option @blur='setindex(index)' v-for='(items, indexs) in item.arrydimension' :label="items.value" :value="items.value"></el-option> -->
								</el-select>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="input-content ">
								<!-- <el-autocomplete class="inputs01" v-model="item.stoneName" :fetch-suggestions="querySearch_name" :disabled="type=='detail'?true:false"
								 placeholder="Input" @select="handleSelect_name" @blur="getindex(index)"></el-autocomplete> -->
								<el-input @blur='pageupdate()' @change='pageupdate()' class='grid-inputs' v-model="item.certificateNo"
								 :disabled="(type=='detail'?true:false)||(item.inventoryType=='NONE'?true:false)" placeholder="Input"></el-input>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="input-content ">
								<el-autocomplete v-show="item.inventoryType=='NONE'?true:false" class="inputs01" v-model="item.stoneName" :fetch-suggestions="querySearch_name" :disabled="type=='detail'?true:false"
								 placeholder="Input" @select="handleSelect_name" @blur="getindex(index)"></el-autocomplete>
								<el-input v-show="item.inventoryType!='NONE'?true:false" @change='pageupdate' class='grid-inputs' v-model="item.stoneName" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="input-content ">
								<el-select v-show="item.inventoryType=='NONE'?true:false" @focus='getindex(index)' class='grid-inputs' v-model="item.dimension_value" :disabled="type=='detail'?true:false">
									<el-option @blur='setindex(index)' v-for='(items, indexs) in item.arrydimension' :label="items.value" :value="items.value"></el-option>
								</el-select>
								<div v-show="item.inventoryType!='NONE'?true:false">
								<el-input  @change='pageupdate' style='width:50%' class='grid-inputs' v-model="item.stoneSize" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								<el-input @change='pageupdate' style='width:50%' class='grid-inputs' v-model="item.stoneSizeUnit" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								 </div>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="input-content ">
								<el-input @change='pageupdate' class='grid-inputs' v-model="item.deliveredNumbe" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								<!-- <el-input @blur='getdeliveredWeight(index)' class='grid-inputs' v-model="item.deliveredNumbe" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
							</div>
						</el-col>
						<!-- 交廠石重 -->
						<el-col :span="2">
							<div class="input-content ">
								<el-input @change='pageupdate' class='grid-inputs' v-model="item.deliveredWeight" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="input-content ">
								<el-input @change='pageupdate' class='grid-inputs' v-model="item.backStoneWeight" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								<!-- <el-input @blur='getRealityWeight(index)' class='grid-inputs' v-model="item.backStoneWeight" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
							</div>
						</el-col>
						<el-col :span="3">
							<div class="input-content ">
								<el-input @change='pageupdate' style='width:50%' class='grid-inputs' v-model="item.practicalNumbe" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								<el-input @change='pageupdate' style='width:50%' class='grid-inputs' v-model="item.practicalWeight" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								<!-- <el-input @change='pageupdate' class='grid-inputs' v-model="item.practicalNumbe" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
							</div>
						</el-col>

						<el-col :span="2">
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
						<el-col :span="24">
							<div class="input-content " style="text-align: center;">
								<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;" src="../../../image/add.png" />
							</div>
						</el-col>
					</el-row>

				</div>
				
				<!-- ||||||||||||||||||||| -->
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">金資料</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">金重：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.goldWeight" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">總金費：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.totalGoldPrice" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">人工RMB：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.artificialPriceRmb" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">人工HK：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.artificialPriceHk" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">足金價HK：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.puregoldPrice" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">18K金價（每錢）HK：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.macetroyPrice" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">18K金價（每克）HK：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.gramPrice" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">金價日期：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign.targetDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col>
				
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<!-- ||||||||||||||||||||| -->
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">發鑲要求</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">内容：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.content" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">字印（一般）：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.ordinaryPrint" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
						<el-col :span="8">
							<span class="fl">字印（客要求）：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.customerPrint" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">備注：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.remarks" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
				
					</el-row>
				</div>

				<!-- ||||||||||||||||||||| -->
				<div style="width:100%;text-align: center;margin-top: 45px;width: 100%;white-space: nowrap">
					<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
					 v-if="type!='detail'">Submit</el-button>
					<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>
				
				</div>
				
			</el-form>
		</div>
	</div>

</template>

<script>
	import {
		MessageBox,
		Message
	} from 'element-ui';
	export default {
		name: "specialCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect /' + value + '/', null, r => {
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
				entrepotId: "",
				entrepot: "",
				billStatus: "",
				stoneData_index: 0,
				dimension_index: "",
				arrydimension: [],
				branch: "",
				branch_list: "",
				htmlTitle: 'test',
				root: 'http://192.168.8.73:8080/RESTful',
				labelPosition: 'right',
				type: "detail",
				uuid: "",
				password: "",
				imageUrl: "",
				imageUrl02: "",
				thingType: '沒有',
				ifGRS: 0,
				dialogVisible: false,
				dialogImageUrl: [],
				Entrepot_input: "",
				Entrepot: [],
				AllType: [],
				AllType_input: "",
				origin_input: "",
				name_input: "",
				id: "",
				warehouse: [
					{
						id: 0,
						name: '沒有'
					},
					{
						id: 1,
						name: 'GIA'
					},
					{
						id: 2,
						name: 'GRS'
					},
				],
				formLabelAlign: {
					"artificialPriceHk": 0,
					"artificialPriceRmb": 0,
					"backStoneWeight": 0, //？？
					"bigDate": "",
					"billingDate": "",
					'targetDate': "",
					"productCategory": "",
					"color": "",
					"content": "",
					"customerName": "",
					"customerPrint": "",
					"dimension": "",
					"dimensionUnit": "",
					"factoryName": "",
					"factoryNo": "",
					"goldWeight": 0,
					"gramPrice": 0,
					"id": 0,
					"itemCode": "",
					"macetroyPrice": 0,
					"numbe": "",
					"numbeUnit": "",
					"orderDate": "",
					"ordinaryPrint": "",
					"productName": "",
					"puregoldPrice": 0,
					"quality": "",
					"reference": "",
					"remarks": "",
					"salesNo": "",
					"sales": "",
					"requiredDeliveryDate": "",
					"stoneData": 0,
					"stoneDataDto": [],
					"totalDeliveredNumbe": 0,
					"totalDeliveredWeight": 0,
					"totalGoldPrice": 0
				},

				rules: {
					userName: [{
						validator: validatorUser,
						trigger: 'blur'
					}]

				},
			}
		},

		created: function() {

			// //console.log(this.$refs.pdfDom)

			// 分行數據加載
			this.findAllEntrepot()

			// 分行數據加載
			// this.findAllType()

			this.type = this.$route.query.type

			if (this.type == 'Alter') {
				
				console.log('我進入了修改')
				
				// this.uuid = this.$route.query.id
				// this.$api.post('/sendInlay/findFactory?reference=' + this.uuid, null, r => {
				// 	
				// 	this.formLabelAlign = r.factoryDto
				// 	this.formLabelAlign.stoneDataDto = r.dataDtoList
				// 	for (var i = 0; i < r.dataDtoList.length; i++) {
				// 		this.formLabelAlign.stoneDataDto[i].dimension_value = this.formLabelAlign.stoneDataDto[i].stoneSize + this.formLabelAlign
				// 			.stoneDataDto[i].stoneSizeUnit
				// 	}
				// 
				// });
				
				this.uuid = this.$route.query.id
				this.$api.post('/sendInlay/findFactory?reference=' + this.uuid, null, r => {
					console.log(r)
					// this.formLabelAlign = r.factoryDto
						this.formLabelAlign.artificialPriceHk = r.factoryDto.artificialPriceHk,
						this.formLabelAlign.artificialPriceRmb = r.factoryDto.artificialPriceHk,
						this.formLabelAlign.backStoneWeight = r.factoryDto.artificialPriceHk,
						this.formLabelAlign.bigDate = new Date(r.factoryDto.bigDate).format("yyyy-MM-dd"),
						this.formLabelAlign.billingDate = new Date(r.factoryDto.billingDate).format("yyyy-MM-dd"),
						this.formLabelAlign.targetDate = new Date(r.factoryDto.targetDate).format("yyyy-MM-dd"),
						this.formLabelAlign.productCategory = r.factoryDto.productCategory,
						this.formLabelAlign.color = r.factoryDto.color,
						this.formLabelAlign.content = r.factoryDto.content,
						this.formLabelAlign.customerName = r.factoryDto.customerName,
						this.formLabelAlign.customerPrint = r.factoryDto.customerPrint,
						this.formLabelAlign.dimension = r.factoryDto.dimension,
						this.formLabelAlign.dimensionUnit = r.factoryDto.dimensionUnit,
						this.formLabelAlign.factoryName = r.factoryDto.factoryName,
						this.formLabelAlign.factoryNo = r.factoryDto.factoryNo,
						this.formLabelAlign.goldWeight = r.factoryDto.goldWeight,
						this.formLabelAlign.gramPrice = r.factoryDto.gramPrice,
						this.formLabelAlign.id = r.factoryDto.id,
						this.formLabelAlign.itemCode = r.factoryDto.itemCode, //??
						this.formLabelAlign.macetroyPrice = r.factoryDto.macetroyPrice,
						this.formLabelAlign.numbe = r.factoryDto.numbe,
						this.formLabelAlign.numbeUnit = r.factoryDto.numbeUnit,
						this.formLabelAlign.orderDate = new Date(r.factoryDto.orderDate).format("yyyy-MM-dd"),
						this.formLabelAlign.ordinaryPrint = r.factoryDto.ordinaryPrint,
						this.formLabelAlign.productName = r.factoryDto.productName,
						this.formLabelAlign.puregoldPrice = r.factoryDto.puregoldPrice,
						this.formLabelAlign.quality = r.factoryDto.quality,
						this.formLabelAlign.reference = r.factoryDto.reference,
						this.formLabelAlign.remarks = r.factoryDto.remarks,
						this.formLabelAlign.salesNo = r.factoryDto.salesNo
						this.formLabelAlign.sales = r.factoryDto.sales
						this.formLabelAlign.requiredDeliveryDate = new Date(r.factoryDto.requiredDeliveryDate).format("yyyy-MM-dd")
						this.formLabelAlign.totalDeliveredNumbe = r.factoryDto.totalDeliveredNumbe
						this.formLabelAlign.totalDeliveredWeight = r.factoryDto.totalDeliveredWeight
						this.formLabelAlign.totalGoldPrice = r.factoryDto.totalGoldPrice
						this.formLabelAlign.factoryOrderRef = r.factoryDto.factoryOrderRef
						
						
						this.entrepot=r.factoryDto.entrepot
						this.billStatus=r.factoryDto.billStatus
						
						
						
						this.formLabelAlign.sales=r.factoryDto.sales
						this.formLabelAlign.salesId=r.factoryDto.salesId
						
						

					// console.log(this.formLabelAlign.stoneDataDto)
					// console.log(r.dataDtoList[0].reference)
					// console.log(r.dataDtoList[0].remark)
					// console.log(r.dataDtoList[0].shape)
					// console.log(r.dataDtoList[0].stoneName)
					
					for (var i = 0; i < r.dataDtoList.length; i++) {
						this.formLabelAlign.stoneDataDto.push({
							"backStoneWeight": r.dataDtoList[i].backStoneWeight,
							"certificateNo": r.dataDtoList[i].certificateNo,
							"color": r.dataDtoList[i].color,
							"deliveredNumbe": r.dataDtoList[i].deliveredNumbe,
							"deliveredWeight": r.dataDtoList[i].deliveredWeight,
							"entrepot": r.dataDtoList[i].entrepot,
							"factory": {},
							"id": r.dataDtoList[i].id,
							"inventoryType": r.dataDtoList[i].inventoryType,
							"practicalNumbe": r.dataDtoList[i].practicalNumbe,
							"practicalWeight": r.dataDtoList[i].practicalWeight,
							"priceHk": r.dataDtoList[i].priceHk,
							"priceHkc": r.dataDtoList[i].priceHkc,
							"priceUs": r.dataDtoList[i].priceUs,
							"priceUsc": r.dataDtoList[i].priceUsc,
							"reference": r.dataDtoList[i].reference,
							"remark": r.dataDtoList[i].remark,
							"shape": r.dataDtoList[i].shape,
							"stoneName": r.dataDtoList[i].stoneName,
							// "factory": r.dataDtoList[i].factory,
							"stoneSize": r.dataDtoList[i].stoneSize,
							"stoneSizeUnit": r.dataDtoList[i].stoneSizeUnit,
							'arrydimension': [],
							'dimension_value': r.dataDtoList[i].stoneSize + r.dataDtoList[i].stoneSizeUnit,
							'selectIndex': 0
						})
						
						
						
						this.$api.post('/inventory/findAllNotPage?identifier=' + this.formLabelAlign.stoneDataDto[i].stoneName +
							'&entrepot=' + this.formLabelAlign.stoneDataDto[i].entrepot, null, r => {

								console.log(r)

								for (var i = 0; i < r.content.length; i++) {
									this.formLabelAlign.stoneDataDto[i].arrydimension.push({
										"availableStock": r.content[i].availableStock,
										"availableInventoryWeight": r.content[i].availableInventoryWeight,
										"dimension": r.content[i].dimension,
										"dimensionUnit": r.content[i].dimensionUnit,
										"value": r.content[i].dimension + r.content[i].dimensionUnit
									})
								}
								
								
								
							})
					}

				});
				
				
			} else if (this.type == 'detail') {


				this.uuid = this.$route.query.id
				this.$api.post('/sendInlay/findFactory?reference=' + this.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r.factoryDto
					this.formLabelAlign.stoneDataDto = r.dataDtoList
					for (var i = 0; i < r.dataDtoList.length; i++) {
						this.formLabelAlign.stoneDataDto[i].dimension_value = this.formLabelAlign.stoneDataDto[i].stoneSize + this.formLabelAlign
							.stoneDataDto[i].stoneSizeUnit
					}
					// this.formLabelAlign.employ = r.employ == 0 ? true : false
					//console.log(r)
				});

			} else if (this.type == 'new') {
				// this.formLabelAlign.saleNo = this.$route.query.saleNo
				this.uuid = this.$route.query.uuid
				//console.log('1')
				this.$api.post('/sendInlay/findFactoryOrder?reference=' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					// this.formLabelAlign = r
					//console.log(r)
					this.formLabelAlign.salesNo = r.factoryOrderDto.customerSalesNo,
					this.formLabelAlign.factoryName = r.factoryOrderDto.factoryName,
						// //console.log('4')
					this.formLabelAlign.factoryNo = r.factoryOrderDto.factoryNo,
						// //console.log('5')
					this.formLabelAlign.productName = r.factoryOrderDto.factoryName,
						// //console.log('6')
					this.formLabelAlign.productCategory = r.factoryOrderDto.productCategory,
						// //console.log('7')
					this.formLabelAlign.itemCode = r.factoryOrderDto.itemCode,
						// //console.log('8')
					this.formLabelAlign.customerName = r.factoryOrderDto.customerName,
						// //console.log('9')
					this.formLabelAlign.ordinaryPrint = r.factoryOrderDto.ordinaryPrint,
						// //console.log('10')
					this.formLabelAlign.bigDate = new Date(r.factoryOrderDto.bigDate).format("yyyy-MM-dd"),
						// //console.log('11')
					this.formLabelAlign.billingDate = new Date(r.factoryOrderDto.billingDate),
						// //console.log('12')
					this.formLabelAlign.quality = r.factoryOrderDto.quality,
						// //console.log('13')
					this.formLabelAlign.color = r.factoryOrderDto.color,
						// //console.log('14')
					this.formLabelAlign.numbe = r.factoryOrderDto.itemNumbe,
					this.formLabelAlign.numbeUnit = "",
					this.formLabelAlign.dimension = r.factoryOrderDto.requirementsSize.dimension,
					this.formLabelAlign.dimensionUnit = r.factoryOrderDto.requirementsSize.dimensionUnit,
					this.formLabelAlign.requiredDeliveryDate = new Date(r.factoryOrderDto.requiredDeliveryDate),
					this.formLabelAlign.customerPrint = r.factoryOrderDto.customerPrint,
					this.formLabelAlign.orderDate = new Date(r.factoryOrderDto.billingDate)
					this.entrepot=r.factoryOrderDto.entrepot
					this.billStatus=r.factoryOrderDto.billStatus
					this.formLabelAlign.sales=r.factoryOrderDto.sales
					this.formLabelAlign.salesId=r.factoryOrderDto.salesId
						// this.formLabelAlign.employ = r.employ == 0 ? true : false
				});
			}
		},

		methods: {

			// 分行數據初始化
			findAllEntrepot() {
				this.$api.get('/inventory/findAllEntrepot', null, r => {
					// //console.log(r)
					this.branch_list = r.content
					this.branch = r.content[0].name
					// this.search()
				});
			},

			// 頁面更新
			pageupdate() {
				this.$forceUpdate();
				//console.log('1231222')
			},

			//增加石資料
			add() {
				this.formLabelAlign.stoneDataDto.push({
					"backStoneWeight": 0,
					"certificateNo": "",
					"color": "",
					"deliveredNumbe": 0,
					"deliveredWeight": 0,
					"entrepot": "",
					"factory": {},
					"id": 0,
					"inventoryType": "",
					"practicalNumbe": 0,
					"practicalWeight": 0,
					"priceHk": "",
					"priceHkc": "",
					"priceUs": "",
					"priceUsc": "",
					"reference": "",
					"remark": "",
					"shape": "",
					"stoneName": "",
					"stoneSize": "",
					"stoneSizeUnit": "",
					'arrydimension': [],
					'dimension_value': "",
					'selectIndex': 0
				})

				this.pageupdate()


				// 
				// "backStoneWeight": 0,
				// "color": "",
				// "deliveredNumbe": 0,
				// "deliveredWeight": 0,
				// "id": 0,
				// "practicalNumbe": "",
				// "priceHK": "",
				// "priceHKC": "",
				// "priceUS": "",
				// "priceUSC": "",
				// "reference": "",
				// "shape": "",
				// "stoneName": "",
				// "stoneSize": "",
				// "stoneSizeUnit": "",

			},

			// 打印
			getPdf() {
				this.htmlTitle = 'test'
			},

			// 刪除
			del(index) {
				this.formLabelAlign.stoneDataDto.splice(index, 1)
				this.$forceUpdate();
			},


			uploadSectionFile(param) {

				let bodyFormData = new FormData();

				// 				var content = '<a id="a"><b id="b">hey!</b></a>'; 
				// 				var blob = new Blob([content], {
				// 					type: "text/xml"
				// 				});
				// 				bodyFormData.append("webmasterfile", blob);

				// //console.log(param)
				// this.$api.axios.defaults.headers.common['Content-Type'] ='multipart/form-data'
				// headers:{"Content-Type":"multipart/form-data"}

				bodyFormData.append("file", param.file);
				// bodyFormData.append("type", param.file.type);
				bodyFormData.append("type", 'BRAND');

				// //console.log(bodyFormData.get("file"));

				// //console.log(formData)
				// formData.append("type", param.file.type);

				// 				bodyFormData.set('file', param.file);
				// 				bodyFormData.set('type', param.file.type);
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					// this.Entrepot = r.content
					//console.log(r)
				});
			},


			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},

			handleRemove(file, fileList) {
				// //console.log(file, fileList);
			},

			handleAdd(response, file, fileList) {
				// //console.log(fileList);
			},

			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},

			handleAvatarSuccess02(res, file) {
				this.imageUrl02 = URL.createObjectURL(file.raw);
			},

			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				// const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
				}
				// 							if (!isLt2M) {
				// 								this.$message.error('上传头像图片大小不能超过 2MB!');
				// 							}
				// return isJPG && isLt2M;
				return isJPG;
			},



			querySearch_name(queryString, cb) {

				this.$api.get('/inventory/findAllIdentifier?identifier=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].jewelryType,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});



				//動態查詢名稱接口
				// 				var results = [{
				// 						"value": "磚石",
				// 						"id": "1"
				// 					},
				// 				]

				// 调用 callback 返回建议列表的数据

			},
			
			getindex(index) {
				this.stoneData_index = index
			},
			
			handleSelect_name(item) {
				//console.log(item);
				// //console.log(index)

				this.formLabelAlign.identification = item
				var entrepotId = ''
				for (var i = 0; i < this.branch_list.length; i++) {
					if (this.branch == this.branch_list[i].name) {
						entrepotId = this.branch_list[i].reference
					}
				}
				this.entrepotId = entrepotId
				this.formLabelAlign.stoneDataDto[this.stoneData_index].arrydimension = []
				this.$api.post('/inventory/findAllNotPage?identifier=' + item.value + '&entrepot=' + this.formLabelAlign.stoneDataDto[
					this.stoneData_index].entrepot, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					// availableStock    dimension    dimensionUnit

					//console.log('101010')
					if (r.msg == "success") {
						for (var i = 0; i < r.content.length; i++) {

							this.formLabelAlign.stoneDataDto[this.stoneData_index].arrydimension.push({
								"availableStock": r.content[i].availableStock,
								"availableInventoryWeight": r.content[i].availableInventoryWeight,
								"dimension": r.content[i].dimension,
								"dimensionUnit": r.content[i].dimensionUnit,
								"value": r.content[i].dimension + r.content[i].dimensionUnit
							})

						}

					} else {
						MessageBox('交厰數量超過了可用數量', '提示', {
							confirmButtonText: '确定',
							// cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
						}).catch(() => {

						});
						this.formLabelAlign.stoneDataDto[this.stoneData_index].stoneName = ""
					}


				});

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

			handleSelect_origin(item) {
				this.formLabelAlign.supplier = item
			},
			
			setindex(index) {
				for (var i = 0; i < this.formLabelAlign.stoneDataDto[index].arrydimension.length; i++) {
					if (this.formLabelAlign.stoneDataDto[index].dimension_value == this.formLabelAlign.stoneDataDto[index].arrydimension[
							i].value) {
						this.formLabelAlign.stoneDataDto[index].selectIndex = i
					}
				}
				//console.log(this.formLabelAlign.stoneDataDto[index].selectIndex)
			},
			
			getdeliveredWeight(index) {
				// //console.log('計算交厰石重')

				var Stockindex = this.formLabelAlign.stoneDataDto[this.stoneData_index].selectIndex

				if (this.formLabelAlign.stoneDataDto[index].deliveredNumbe > this.formLabelAlign.stoneDataDto[index].arrydimension[
						Stockindex].availableStock) {
					MessageBox('交厰數量超過了可用數量', '提示', {
						confirmButtonText: '确定',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {

					});
				} else {
					// var num=10.5
					// var weight=5
					var num = this.formLabelAlign.stoneDataDto[index].arrydimension[Stockindex].availableStock
					var weight = this.formLabelAlign.stoneDataDto[index].arrydimension[Stockindex].availableInventoryWeight
					var one = weight / num
					//console.log(one * this.formLabelAlign.stoneDataDto[index].deliveredNumbe)
					this.formLabelAlign.stoneDataDto[index].deliveredWeight = one * this.formLabelAlign.stoneDataDto[index].deliveredNumbe
				}

			},

			// 實際石重計算
			getRealityWeight(index) {
				//console.log('計算實際石重')

				var Stockindex = this.formLabelAlign.stoneDataDto[this.stoneData_index].selectIndex
				if (this.formLabelAlign.stoneDataDto[index].backStoneWeight > this.formLabelAlign.stoneDataDto[index].deliveredWeight) {
					MessageBox('回石重超過了交厰石重', '提示', {
						confirmButtonText: '确定',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.formLabelAlign.stoneDataDto[index].backStoneWeight = ''
					}).catch(() => {

					});
				} else {
					// var num=10.5
					// var weight=5
					var backStoneWeight = this.formLabelAlign.stoneDataDto[index].backStoneWeight
					var deliveredWeight = this.formLabelAlign.stoneDataDto[index].deliveredWeight

					// //console.log(one*this.formLabelAlign.stoneDataDto[index].deliveredNumbe)
					this.formLabelAlign.stoneDataDto[index].practicalNumbe = deliveredWeight - backStoneWeight
				}

			},


			submitForm(formLabelAlign) {

				// this.$router.push("/SystemManagement/special")

				// 				if (this.formLabelAlign.supplier.reference == '') {
				// 					this.formLabelAlign.supplier.supplier = this.origin_input
				// 				}
				// 
				// 				if (this.formLabelAlign.identification.reference == '') {
				// 					this.formLabelAlign.identification.jewelry_type = this.name_input
				// 				}

				



				var save_stoneDataDto = []

				for (var i = 0; i < this.formLabelAlign.stoneDataDto.length; i++) {
					
					if(this.formLabelAlign.stoneDataDto[i].inventoryType=='NONE'){
					var s = 0
					for (var j = 0; j < this.formLabelAlign.stoneDataDto[i].arrydimension.length; j++) {

						var Sdimension = this.formLabelAlign.stoneDataDto[i].arrydimension[j].dimension
						var SdimensionUnit = this.formLabelAlign.stoneDataDto[i].arrydimension[j].dimensionUnit
						
						if (this.formLabelAlign.stoneDataDto[i].dimension_value == Sdimension + SdimensionUnit) {
							s = j
						}

					}
					
						save_stoneDataDto.push({
							
							"backStoneWeight": this.formLabelAlign.stoneDataDto[i].backStoneWeight,
							"certificateNo": this.formLabelAlign.stoneDataDto[i].certificateNo,
							"color": this.formLabelAlign.stoneDataDto[i].color,
							"deliveredNumbe": this.formLabelAlign.stoneDataDto[i].deliveredNumbe,
							"deliveredWeight": this.formLabelAlign.stoneDataDto[i].deliveredWeight,
							"entrepot": this.formLabelAlign.stoneDataDto[i].entrepot,
							"factory": this.formLabelAlign.stoneDataDto[i].factory,
							"id": this.formLabelAlign.stoneDataDto[i].id,
							"inventoryType": this.formLabelAlign.stoneDataDto[i].inventoryType,
							"practicalNumbe": parseInt(this.formLabelAlign.stoneDataDto[i].practicalNumbe),
							"practicalWeight": parseFloat(this.formLabelAlign.stoneDataDto[i].practicalWeight),
							"priceHk": this.formLabelAlign.stoneDataDto[i].priceHk,
							"priceHkc": this.formLabelAlign.stoneDataDto[i].priceHkc,
							"priceUs": this.formLabelAlign.stoneDataDto[i].priceUs,
							"priceUsc": this.formLabelAlign.stoneDataDto[i].priceUsc,
							"reference": this.formLabelAlign.stoneDataDto[i].reference,
							"remark": this.formLabelAlign.stoneDataDto[i].remark,
							"shape": this.formLabelAlign.stoneDataDto[i].shape,
							"stoneName": this.formLabelAlign.stoneDataDto[i].stoneName,
							"stoneSize": this.formLabelAlign.stoneDataDto[i].arrydimension[s].dimension,
							"stoneSizeUnit": this.formLabelAlign.stoneDataDto[i].arrydimension[s].dimensionUnit,
							
							// 						// 'arrydimension': [],
							// 						// 'dimension_value': ''
							
						})
						
						
					}else{
						
						save_stoneDataDto.push({
							"backStoneWeight": this.formLabelAlign.stoneDataDto[i].backStoneWeight,
							"certificateNo": this.formLabelAlign.stoneDataDto[i].certificateNo,
							"color": this.formLabelAlign.stoneDataDto[i].color,
							"deliveredNumbe": this.formLabelAlign.stoneDataDto[i].deliveredNumbe,
							"deliveredWeight": this.formLabelAlign.stoneDataDto[i].deliveredWeight,
							"entrepot": this.formLabelAlign.stoneDataDto[i].entrepot,
							"factory": this.formLabelAlign.stoneDataDto[i].factory,
							"id": this.formLabelAlign.stoneDataDto[i].id,
							"inventoryType": this.formLabelAlign.stoneDataDto[i].inventoryType,
							"practicalNumbe": parseInt(this.formLabelAlign.stoneDataDto[i].practicalNumbe),
							"practicalWeight": parseFloat(this.formLabelAlign.stoneDataDto[i].practicalWeight),
							"priceHk": this.formLabelAlign.stoneDataDto[i].priceHk,
							"priceHkc": this.formLabelAlign.stoneDataDto[i].priceHkc,
							"priceUs": this.formLabelAlign.stoneDataDto[i].priceUs,
							"priceUsc": this.formLabelAlign.stoneDataDto[i].priceUsc,
							"reference": this.formLabelAlign.stoneDataDto[i].reference,
							"remark": this.formLabelAlign.stoneDataDto[i].remark,
							"shape": this.formLabelAlign.stoneDataDto[i].shape,
							"stoneName": this.formLabelAlign.stoneDataDto[i].stoneName,
							"stoneSize": this.formLabelAlign.stoneDataDto[i].stoneSize,
							"stoneSizeUnit": this.formLabelAlign.stoneDataDto[i].stoneSizeUnit
						})
						
					}
					
					
					

					// //console.log('------------2')

					// 
				}
				
				// //console.log(save_stoneDataDto)
				
				// 				//console.log({
				// 						"artificialPriceHk": this.formLabelAlign.artificialPriceHk,
				// 						"artificialPriceRmb": this.formLabelAlign.artificialPriceRmb,
				// 						"backStoneWeight": 0, //？？
				// 						"bigDate": this.formLabelAlign.bigDate.format("yyyy-MM-dd"),
				// 						"billingDate": this.formLabelAlign.billingDate.format("yyyy-MM-dd"),
				// 						'targetDate': this.formLabelAlign.targetDate.format("yyyy-MM-dd"),
				// 						"productCategory": this.formLabelAlign.productCategory,
				// 						"color": this.formLabelAlign.color,
				// 						"content": this.formLabelAlign.content,
				// 						"customerName": this.formLabelAlign.customerName,
				// 						"customerPrint": this.formLabelAlign.customerPrint,
				// 						"dimension": this.formLabelAlign.dimension,
				// 						"dimensionUnit": this.formLabelAlign.dimensionUnit,
				// 						"factoryName": this.formLabelAlign.factoryName,
				// 						"factoryNo": this.formLabelAlign.factoryNo,
				// 						"goldWeight": this.formLabelAlign.goldWeight, //？？
				// 						"gramPrice": this.formLabelAlign.gramPrice,
				// 						"id": 0,
				// 						"itemCode": this.formLabelAlign.itemCode,
				// 						"macetroyPrice": this.formLabelAlign.macetroyPrice,
				// 						"numbe": this.formLabelAlign.numbe,
				// 						"numbeUnit": this.formLabelAlign.numbeUnit,
				// 						"orderDate": this.formLabelAlign.orderDate.format("yyyy-MM-dd"),
				// 						"ordinary_print": this.formLabelAlign.ordinary_print,
				// 						"productName": this.formLabelAlign.productName,
				// 						"puregoldPrice": this.formLabelAlign.puregoldPrice,
				// 						"quality": this.formLabelAlign.quality,
				// 						"reference": this.formLabelAlign.reference,
				// 						"remarks": this.formLabelAlign.remarks,
				// 						"salesNo": this.formLabelAlign.salesNo,
				// 						"sales": this.formLabelAlign.sales,
				// 						// "stoneData":this.formLabelAlign.stoneData,
				// 						"requiredDeliveryDate": this.formLabelAlign.requiredDeliveryDate.format("yyyy-MM-dd"),
				// 						// "sales_status": this.formLabelAlign.sales_status,
				// 						"stoneData":  save_stoneDataDto,      //this.formLabelAlign.stoneDataDto,    //??
				// 						"totalDeliveredNumbe": 0,
				// 						"totalDeliveredWeight": 0,
				// 						"totalGoldPrice": this.formLabelAlign.totalGoldPrice,
				// 						// "target_date": "",
				// 
				// 						"factoryOrderRef": this.uuid,
				// 						// "isRevoke":'',
				// 
				// 
				// 					})

				if(this.formLabelAlign.targetDate==''){
					
					MessageBox('Please input Gold Price Date', '提示', {
						confirmButtonText: '确定',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
					
					});
					
				}else{
					
					//console.log('wo  dian le')
					
					//console.log({
					// 	"billStatus":this.billStatus,
					// 	"entrepot":this.entrepot
					// })
					
						this.loading=true
						this.$api.put('/sendInlay/SaveFactory',
					
						{
							"artificialPriceHk": this.formLabelAlign.artificialPriceHk,
							"artificialPriceRmb": this.formLabelAlign.artificialPriceRmb,
							"backStoneWeight": 0, //？？
							"bigDate": new Date(this.formLabelAlign.bigDate).format("yyyy-MM-dd"),
							"billingDate": new Date(this.formLabelAlign.billingDate).format("yyyy-MM-dd"),
							'targetDate': new Date(this.formLabelAlign.targetDate).format("yyyy-MM-dd"),
							"productCategory": this.formLabelAlign.productCategory,
							"color": this.formLabelAlign.color,
							"content": this.formLabelAlign.content,
							"customerName": this.formLabelAlign.customerName,
							"customerPrint": this.formLabelAlign.customerPrint,
							"dimension": this.formLabelAlign.dimension,
							"dimensionUnit": this.formLabelAlign.dimensionUnit,
							"factoryName": this.formLabelAlign.factoryName,
							"factoryNo": this.formLabelAlign.factoryNo,
							"goldWeight": this.formLabelAlign.goldWeight, //？？
							"gramPrice": this.formLabelAlign.gramPrice,
							"id": 0,
							"itemCode": this.formLabelAlign.itemCode,
							"macetroyPrice": this.formLabelAlign.macetroyPrice,
							"numbe": this.formLabelAlign.numbe,
							"numbeUnit": this.formLabelAlign.numbeUnit,
							"orderDate": new Date(this.formLabelAlign.orderDate).format("yyyy-MM-dd"),
							"ordinaryPrint": this.formLabelAlign.ordinaryPrint,
							"productName": this.formLabelAlign.productName,
							"puregoldPrice": this.formLabelAlign.puregoldPrice,
							"quality": this.formLabelAlign.quality,
							"reference": this.formLabelAlign.reference,
							"remarks": this.formLabelAlign.remarks,
							"salesNo": this.formLabelAlign.salesNo,
							"sales": this.formLabelAlign.sales,
							"salesId":this.formLabelAlign.salesId,
							// "stoneData":this.formLabelAlign.stoneData,
							"requiredDeliveryDate": new Date(this.formLabelAlign.requiredDeliveryDate).format("yyyy-MM-dd"),
							// "sales_status": this.formLabelAlign.sales_status,
							"stoneData": save_stoneDataDto, //??
							// "stoneData": this.formLabelAlign.stoneDataDto,
							"totalDeliveredNumbe": 0,
							"totalDeliveredWeight": 0,
							"totalGoldPrice": this.formLabelAlign.totalGoldPrice,
							// "target_date": "",
					
							"factoryOrderRef": this.uuid,
							"billStatus":this.billStatus,
							"entrepot":this.entrepot
							
							// "isRevoke":'',
					
					
						}, r => {
							
							if (r) {
								this.$router.push("/factoryManagement")
							}
							
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					
				}




			},

			detail() {},

			cancel() {
				this.$router.push("/factoryManagement")
			},

			type_change() {
				this.formLabelAlign.inventoryType = this.AllType[this.AllType_input]
				this.ifGRS = this.AllType[this.AllType_input].inventoryType == 'NONE' ? 0 : (this.AllType[this.AllType_input].inventoryType ==
					'GIA' ? 1 : 2)
			},

			branch_change() {
				this.formLabelAlign.entrepotDto = this.Entrepot[this.Entrepot_input]
			},

			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/SystemManagement/CustomentManagement")
				} else if (type == 'branch') {
					this.$router.push("/SystemManagement/branchManagement")
				}
			}
			
			

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.factoryCreate01 {

		.input-content {
			line-height: 36px
		}

		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
			text-align: center
		}

		.invoice_upload {
			width: 100%;

			.avatar-uploader-icon {
				// width:100%;
				// float: left
			}
		}

		.el-form--label-top .el-form-item__label {
			padding: 0
		}

		.el-form-item {
			margin-bottom: 0
		}


		.GIA {
			.avatar-uploader-icon {
				height: 80px;
				line-height: 80px
			}
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

		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}

		.second_menu {
			width: 100px;
			line-height: 40px;
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

		.inputs01 {
			width: 100%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		.button {
			// width: 150px;
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

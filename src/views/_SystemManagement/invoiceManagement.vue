<template>

	<div class="reservemanagement">
		
		<div style="padding: 0 0;min-width: 1400px;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">

						<!-- <div style="width: 300px;margin-left: 0;float: left;">
							
							<el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date"
							 placeholder="select date" style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
							
						</div> -->
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.search" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit01" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item>
								<el-form-item style='float:right;'>
									<el-button type="primary" @click="tocreate" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>New</el-button>
								</el-form-item>

								<!-- <el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="branch">
										<el-option v-for='(item, index) in branch_list' :label="item.entrepot" :value="item.entrepot"></el-option>
									</el-select>
								</el-form-item> -->

								<!-- <el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="formInline.num" @change='type_change' >
										<el-option v-for='(item, index) in warehouse' :label="item.name" :value="item.name" ></el-option>
									</el-select>
								</el-form-item> -->

							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>



		<!-- 庫存列表 -->
		<div style="border-radius: 10px;background: white;height: 385px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData1" height="700" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<el-table-column prop="invoiceSeller" label="Invoice Company" row-style='background:red' >
					</el-table-column>
					<el-table-column prop="invoiceNo" label="Invoice No" >
					</el-table-column>
					<el-table-column prop="invoiceTotalPrice.inventoryPriceHk" label="Total HKD" >
						<!-- 入庫 -->
					</el-table-column>
					<el-table-column prop="receiptPayer" label="Check Company" >
						<!-- 可用 -->
					</el-table-column>
					

					<div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;'>
							<template slot-scope="scope">
								<div style="white-space: nowrap;">
									
									<el-button  @click="handleClick(scope.row.reference)" type="danger" size="small">Detail</el-button>
									<!-- <el-button v-show='scope.row.isLock'  type="info" size="small">已鎖</el-button>
									<el-button v-show='!scope.row.isLock' @click="lock(scope.row.reference)" type="danger" size="small">鎖定</el-button>
									<el-button v-show='!scope.row.isLock' @click="del(scope.row.reference)" type="danger" size="small">刪除</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">刪除</el-button> -->
								</div>

								<!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
							</template>
						</el-table-column>

					</div>

				</el-table>
			</div>
			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='11' :total="totalElements" @current-change='pages01'
				 :current-page="page01">
				</el-pagination>
			</div>
		</div>




		<!-- 賬號密碼錯誤彈窗 -->
		<div class="dialog">
			<el-dialog title="提示" :visible.sync="dialogVisible02" width="30%" top='20%'>
				<span>時間不能爲空</span>
				<span slot="footer" class="dialog-footer">
					<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
					<el-button type="primary" @click="dialogVisible02 = false">確 定</el-button>
				</span>
			</el-dialog>
		</div>

	</div>

</template>

<script>
	import {
		MessageBox,
		Message
	} from 'element-ui';
	export default {
		name: "factory",
		data() {
			return {
				// fileList:[],
				titlebg: {
					'background': 'rgb(216,214,215)',
					'color': 'black'
				},
				labelPosition: 'right',
				branch: '分行一',
				branch_list: [],
				formInline_reserve: {
					search: '',
					num: '',
				},
				formInline: {
					search: '',
					num: '批量',
				},
				formInlinetwo: {
					seekTwo: ''
				},
				reserveList_search: {
					search: '',
				},
				batchDetail: {
					stone_name: '',
					stone_type: '',
					Storage: '',
					Warehouse: '',
					num: '',
					innum: '',
					size: '',
					size_type: '',
					weight: '',
					weight_type: '',
					price: '',
					sum: '',
					Check_num: '',
					Invoice_num: '',
					time: '',
					rests: ''
				},
				reserveDetail: {
					no_: '',
					date: '',
					object: '',
					identification: '',
					weight: '',
					weightTo: '',
					dimensions: '',
					dimensionsTo: '',
					cut: '',
					shape: '',
					color: '',
					colorTo: '',
					comment: '',
					origin: '',
					codeUseSeeHelp: '',
					rests: '',
					productionPlace: '',
					viewId: ''
				},

				reserveDetail_gia: {
					date: '',
					giaReportNumber: '',
					shapeAndCuttingStyle: '',
					measurements: '',
					caratWeight: '',
					colorGrade: '',
					clarityGrade: '',
					cutGrade: '',
					polish: '',
					symmetry: '',
					fluerescence: '',
					inscription: '',
					comments: '',
					codeUseSeeHelp: '',
					viewId: ''
				},
				currentRow: null,
				totalElements: 0,
				totalElements_list: 0,
				page01: 1,
				page02: 1,
				dateOne: '',
				dateTwo: [],
				dateOne_transfer: '',
				dateTwo_transfer: new Date().format("yyyy-MM-dd"),
				value1: '',
				imageUrl: '',
				dialogImageUrl: '',
				dialogVisible: false,
				dialogVisible02: false,
				ifimg: false,
				detail: false,
				batch: false,

				reserve_list: false,
				reserve_detail: false,
				ifGRS: 0,

				tableData1_gia: [],
				tableData2: [],
				fileList: [],
				transferid: 0,
				warehouse: [

					{
						id: 0,
						name: '批量'
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
				tableData3: [],
				tableData1: [{
					name: '碎石',
					weight: 15,
					num: 20,
					in_num: 20,
					storage: 20,
					cost: 100,
					time: '2019/04/13',
				}],




			}
		},
		created: function() {




			var today = new Date();
			var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
			today.setTime(targetday_milliseconds); //注意，这行是关键代码
			this.dateOne = today.format("yyyy-MM-dd")
			this.dateOne_transfer = today.format("yyyy-MM-dd")


			// this.transferSearch()
			this.dateTwo.push(today)
			this.dateTwo.push(new Date())
			
			this.search()
			
			// this.findAllEntrepot()
			// this.dateTwo=[dateOne,new Date()]			
			// //console.log('---root:'+this.root)

		},
		methods: {
			// 分行數據初始化
			findAllEntrepot() {
				this.$api.get('/inventory/findAllEntrepot', null, r => {
					this.branch_list = r.content
					this.branch = r.content[0].entrepot
					this.search()
				});
			},
			
			sublime_factory(saleNo,uuid){
				this.$router.push("/factoryCreate?type=new&saleNo="+saleNo+'&uuid='+uuid)
				//    a22cb582-d2e5-4e57-abb2-59cf663f95f0
			},
			
			del(id) {
				// 刪除
				MessageBox('此操作将永久删除该信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

// 					this.$api.delete('/sendInlay/deleteFactoryOrder?reference=' + id, null, r => {
// 						
// 						this.search()
// 						Message({
// 							type: 'success',
// 							message: '刪除成功!'
// 						});
// 
// 
// 					});


				}).catch(() => {
					Message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			submitForm(formLabelAlign) {
				// //console.log('0101')
				var that = this
				this.$refs[formLabelAlign].validate((valid) => {
					if (valid) {
						//console.log(that.formLabelAlign);
					} else {
						//console.log('error submit!!');
						return false;
					}
				});
			},
			check_img() {

			},

			tocreate() {
				// this.$router.push("/SystemManagement/specialCreate?type=new")
				this.$router.push("/Newinvoice?type=new")
			},

			handleClick(id) {

				this.$router.push("/Newinvoice?type=detail&uuid=" + id)
				
				
				

				// var that=this
				// 				this.reserve_detail = true
				// 				this.detail = true
				// 				if (this.ifGRS) {
				// 
				// 					this.$api.post('/Unique/seek/' + id, null, r => {
				// 						this.reserveDetail = r
				// 						this.imageUrl = this.root + r.viewId
				// 						// //console.log(this.root+'/'+r.viewId)
				// 					});
				// 				} else {
				// 					this.$api.post('/Unique/seek/' + id, null, r => {
				// 						this.reserveDetail_gia = r
				// 					});
				// 				}



			},
			clickItem(row, event, column) {
				var val = row;
				// //console.log('item')
				// //console.log(val)
				if (this.transferid == val.id) {
					this.currentRow = '';
					this.transferid = 0
					var row = ''
					this.$refs.singleTable01.setCurrentRow(row);
					this.$refs.singleTable02.setCurrentRow(row);
					// //console.log('0000000000000000000000000000000000000000000000')
					this.transferSearch()
				} else {
					this.currentRow = val;
					// //console.log(val);
					this.batchDetail.out1 = val.id;
					this.batchDetail.name = val.no_;
					this.batchDetail.outId = val.warehouseId;
					this.batchDetail.outName = val.warehouseName;
					this.batchDetail.rests = val.rests;
					this.transferid = val.id
					this.transferSearch()
				}
			},

			transferSearch() {

				if (new Date(this.dateOne_transfer).format("yyyy-MM-dd") > new Date(this.dateTwo_transfer).format("yyyy-MM-dd")) {
					this.dialogVisible02 = true
				} else {

					// 時間轉換
					var today = new Date(Date.parse(this.dateTwo_transfer));
					var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
					today.setTime(targetday_milliseconds); //注意，这行是关键代码
					var time = today.format("yyyy-MM-dd")


					this.$api.post('/transfer/seek?warehouseId=' + this.transferid, {
						"dateOne": new Date(this.dateOne_transfer).format("yyyy-MM-dd"),
						"dateTwo": time, //yyyy-MM-dd'T'HH:mm:ss.SSSZ
						"index": 0,
						"num": 5,
						"seek": this.ifGRS ? "GRS" : "GIA",
						"seekTwo": this.formInlinetwo.seekTwo
					}, r => {

						//console.log('轉移查詢')
						//console.log(r.content);
						this.tableData2 = r.content


					});
				}
			},

			transfer(id) {
				this.$router.push("/SystemManagement/transfer")
			},

			lock(id) {
				MessageBox('此操作将鎖定该信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {



// 					this.$api.post('/sendInlay/lockFactoryOrder?reference=' + id, null, r => {
// 						
// 						this.search()
// 						Message({
// 							type: 'success',
// 							message: '鎖定成功!'
// 						});
// 
// 
// 					});



				}).catch(() => {
					Message({
						type: 'info',
						message: '已取消鎖定 '
					});
				});
			},

			onSubmit01() {
				this.page01 = 1
				// this.currentRow = null
				// this.transferid = 0
				// this.page02 = 1
				this.search()
				// this.transferSearch()
			},
			// 模糊查询库存
			search() {



				// 時間轉換
				var today = new Date(Date.parse(this.dateTwo));
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码
				var time = today.format("yyyy-MM-dd")

				if (this.dateTwo) {

					var search = this.formInline.search
					var entrepotId = ''
					for (var i = 0; i < this.branch_list.length; i++) {
						if (this.branch == this.branch_list[i].entrepot) {
							entrepotId = this.branch_list[i].reference
						}
					}

					this.$api.post('/inventory/findAllInvoice?Page=' + this.page01 + '&Size=11'+ '&Invoice='+(search == '' ? "" : search),null, r => {
						// //console.log(r);
						
						//console.log(r)
						
						this.tableData1 = r.content;
						this.totalElements = r.totalPage

					});
				} else {
					this.dialogVisible02 = true
				}


				// 									var search = this.formInline.search
				// 				
				// 									this.$api.post('/sendInlay/findAll?Page=' + this.page01 + '&Size=11', {
				// 										"eDate": this.dateTwo[1].format("yyyy-MM-dd"),
				// 										"entrepot": entrepotId,
				// 										"item": search == '' ? "" : search,
				// 										"sDate": this.dateTwo[0].format("yyyy-MM-dd")
				// 										
				// 									}, r => {
				// 										//console.log(r.content);
				// 				
				// 										this.tableData1 = r.content;
				// 										this.totalElements = r.totalElements
				// 				
				// 									});







			},

			GRS() {
				this.ifGRS = !this.ifGRS
				this.onSubmit01()
				this.transferSearch()
			},
			// 提交批次創建
			uploadBatch() {



				this.batch = false
				this.$api.post('/transfer/save', {
					"id": 0,
					"name": this.batchDetail.name,
					"numbe": parseInt(this.batchDetail.numbe),
					"out1": parseInt(this.batchDetail.out1),
					"outId": parseInt(this.batchDetail.outId),
					"outName": this.batchDetail.outName,
					"rests": this.batchDetail.rests,
					"shiftTo": 0,
					"shiftToId": parseInt(this.batchDetail.shiftToId),
					"shiftToName": this.batchDetail.shiftToName,
					"time": "",
					"uniqueId": 0,
					"uniqueType": this.ifGRS ? "GRS" : "GIA",
					"weight": parseInt(this.batchDetail.weight),
					"weightUnit": this.batchDetail.weightUnit,

				}, r => {

					//console.log(r);
					// this.tableData2 = r.content

				});

			},
			upload() {

				if (this.ifGRS) {



					this.$api.post('/Unique/save', {
						"certificateToUploadId": "",
						"codeUseSeeHelp": this.reserveDetail.codeUseSeeHelp,
						"color": this.reserveDetail.color,
						"colorTo": this.reserveDetail.colorTo,
						"comment": this.reserveDetail.comment,
						"cut": this.reserveDetail.cut,
						"cutTo": this.reserveDetail.cutTo,
						"date": this.reserveDetail.date.format("yyyy-MM-dd"),
						"dimensions": this.reserveDetail.dimensions,
						"dimensionsTo": this.reserveDetail.dimensionsTo,
						"id": 0,
						"identification": this.reserveDetail.identification,
						"no_": this.reserveDetail.no_,
						"object": this.reserveDetail.object,
						"origin": this.reserveDetail.origin,
						"productionPlace": this.reserveDetail.productionPlace,
						"rests": this.reserveDetail.rests,
						"shape": this.reserveDetail.shape,
						"viewId": this.reserveDetail.viewId,
						"warehouseName": this.warehouse[parseInt(this.formInline.num)].name,
						"warehouseId": this.warehouse[parseInt(this.formInline.num)].id,
						"weight": parseInt(this.reserveDetail.weight),
						"weightTo": this.reserveDetail.weightTo,
						"list": this.fileList
					}, r => {

						//console.log(r.content);
						this.hidedetail()
						this.onSubmit01()
					});



				} else {


					this.$api.post('/giaUnique/save', {

						"caratWeight": this.reserveDetail_gia.caratWeight,
						"clarityGrade": this.reserveDetail_gia.clarityGrade,
						"codeUseSeeHelp": this.reserveDetail_gia.codeUseSeeHelp,
						"colorGrade": this.reserveDetail_gia.colorGrade,
						"comments": this.reserveDetail_gia.comments,
						"cutGrade": this.reserveDetail_gia.cutGrade,
						"date": this.reserveDetail_gia.date.format("yyyy-MM-dd"),
						"fluerescence": this.reserveDetail_gia.fluerescence,
						"giaReportNumber": this.reserveDetail_gia.giaReportNumber,
						"id": 0,
						"inscription": this.reserveDetail_gia.inscription,
						"measurements": this.reserveDetail_gia.measurements,
						"polish": this.reserveDetail_gia.polish,
						"shapeAndCuttingStyle": this.reserveDetail_gia.shapeAndCuttingStyle,
						"symmetry": this.reserveDetail_gia.symmetry,
						"uploadsAndDownloads": "",
						"viewId": this.reserveDetail_gia.viewId,
						"warehouseName": this.warehouse[parseInt(this.formInline.num)].name,
						"warehouseId": this.warehouse[parseInt(this.formInline.num)].id,

					}, r => {

						//console.log(r);
						this.hidedetail()
						this.onSubmit01()

					});


				}



			},

			type_change() {
				this.ifGRS = this.formInline.num == '批量' ? 0 : (this.formInline.num == 'GIA' ? 1 : 2)
			},
			onSubmit() {

			},
			// 庫存翻頁
			pages01(val) {
				//console.log(val)
				this.page01 = val
				this.search()
			},
			// 批次翻頁
			pages02(val) {
				this.page02 = val
				this.search()
			},
			search_list() {
				this.page02 = 1
				this.transferSearch();
			},
			reserveList() {
				this.reserve_list = true
			},
			return_reserveList() {
				this.reserve_list = false
			},

			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				if (this.ifGRS) {

					this.reserveDetail.viewId = file.response.url
					// //console.log('----'+file.response.url)
				} else {
					this.reserveDetail_gia.viewId = file.response.url
					// //console.log('----'+file.response.url)
				}
				// //console.log(file)
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},

			hidedetail() {
				this.reserve_detail = false
				this.detail = false
			},
			reserveAdd() {
				this.detail = false,
					this.reserve_detail = true
			},

			showBatch() {
				this.batch = true
			},
			cancel() {
				this.batch = false
			},

			hideimg() {
				this.ifimg = false
			},

			handleRemove(file, fileList) {
				this.fileList = [];
				for (var i = 0; i < fileList.length; i++) {
					this.fileList.push(fileList[i].response.url);

				}
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			// 			handleAvatarSuccess(file, fileList){
			// 				//console.log(file, fileList);
			// 				//console.log('010101')
			// 			},
			handleAdd(response, file, fileList) {
				// //console.log(response)
				this.fileList = [];
				for (var i = 0; i < fileList.length; i++) {
					this.fileList.push(fileList[i].response.url);

				}
				//console.log(fileList);

			},
			topage(type) {
				if (type == 'special') {
					this.$router.push("/SystemManagement/special")
				} else if (type == 'batch') {
					this.$router.push("/SystemManagement/batch")
				} else if (type == 'recycling') {
					this.$router.push("/SystemManagement/Recycling")
				} else if (type == 'all') {
					this.$router.push("/SystemManagement/ReserveManagement")
				}
			}


		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	// 	.reservemanagement{
	// 		
	// 	}




	// 	.has-gutter {
	// 		line-height: 30px
	// 	}

	.imgList {
		margin: 15px 20px;
		float: left;
	}

	.imgs {
		width: 300px;
		height: 170px;

		img {
			width: 100%;
			height: 100%
		}
	}

	.second_menu {
		width: 115px;
		line-height: 42px;
		float: left;
		margin-left: 12px;
		font-size: 18px;
		background: rgb(238, 237, 235);
		margin-top: 8px;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
	}

	.selector {
		// color: $navHoverTextColor;
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
		// background: $navHoverTextColor;
		border: 0
	}

	.button:nth-child(2) {
		margin-left: 50px;

	}

	.point {
		cursor: pointer;
	}

	.search {
		.el-input__inner {
			height: 40px
		}

		.el-input__inner {
			height: 40px
		}

	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}



	.el-row,
	.el-col,
	// 	.el-col-24 {
	// 
	// 		height: 40px
	// 	}

	.el-table {
		margin: 0;
		padding: 0;

	}

	// 	.el-table td,
	// 	.el-table th {
	// 		padding: 8px 0
	// 	}

	.list {
		// 		.el-table_2_column_14 {
		// 			color: #409EFF;
		// 			cursor: pointer
		// 		}
	}

	.list {
		border-top: 2px solid rgb(224, 224, 224);
		background: white;
		height: 385px;
		width: 100%;
		margin-top: 20px;
	}

	.reserve_list {
		height: 720px;
		width: 70%;
		background: white;
		margin-left: 5%;
		position: fixed;
		top: 200px;
		border: 2px solid rgb(224, 224, 224);
		z-index: 1000;
		overflow: auto
	}

	.el-form--inline .el-form-item {
		display: block;

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

	.el-form-item {
		margin-bottom: 0
	}

	.textInput {
		width: 400px;
		height: 80px;
	}

	.batch_left {
		float: left;
		margin-left: 20px;
		width: 30%;
		margin-top: 30px
	}

	.el-main {
		line-height: 30px;
	}

	.reserve_list {
		.el-upload--picture-card {
			float: left;
			margin: 15px 20px
		}

		.el-upload-list__item {
			margin: 15px 20px;
			float: left
		}

	}
</style>

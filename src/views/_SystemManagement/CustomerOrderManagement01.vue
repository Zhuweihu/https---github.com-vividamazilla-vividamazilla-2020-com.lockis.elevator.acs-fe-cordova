


<template>

	<div class="reservemanagement">
		
		<div style="padding: 0 0;min-width: 1400px;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">

						<div style="width: 300px;margin-left: 0;float: left;">
							<el-date-picker v-model="value6" type="daterange" start-placeholder="start date" end-placeholder="end date"
							 placeholder="select date" style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
						</div>
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item>
								<!-- <el-form-item style='float:right;'>
									<el-button type="primary" @click="usercreate" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>New</el-button> -->
									<!-- <el-button type="primary" @click="Faxiangdan" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>發鑲單</el-button> -->
								<!-- </el-form-item> -->
							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>



		<!-- 庫存列表 -->
		<div style="border-radius: 10px;background: white;height: 680px;width: 100%;" >
			<div>
				<el-table el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;margin-bottom: 20px;height: 620px;border-radius: 10px;" row-key="id">
					<el-table-column prop="customer1" label="Customer name">
					</el-table-column>
					<el-table-column prop="plvKProductEntityList[0].product" label="Product">
					</el-table-column>
					<el-table-column prop="plvKProductEntityList[0].numbe" label="Amount">
					</el-table-column>
					<el-table-column prop="plvKProductEntityList[0].gold" label="Category">
					</el-table-column>
					<el-table-column prop="plvKProductEntityList[0].goldColour" label="quality">
					</el-table-column>
					<el-table-column prop="plvKProductEntityList[0].guestDate" label="Purchase Date" width="150">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.plvKProductEntityList[0].guestDate).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="plvKProductEntityList[0].size1" label="尺寸">
					</el-table-column> -->
					<el-table-column prop="plvKProductEntityList[0].totalPrice" label="Total price">
					</el-table-column>
					<!-- <el-table-column prop="plvKGuestBillType" label="處理狀態">
						<template slot-scope="scope">
							<el-button v-if='scope.row.onLock==0' @click="Processing(scope.row.reference)" type="text" size="small" data-id='0101'>{{scope.row.plvKGuestBillType}}</el-button>
							<span v-if='scope.row.onLock==1' type="text" size="small">{{scope.row.plvKGuestBillType}}</span>
						</template>
					</el-table-column> -->
					
					<el-table-column fixed="right" label="Action" width="250" >
						<template slot-scope="scope">
							<div style="white-space: nowrap;">
							<el-button  @click="modify(scope.row.plvKGuestBillcol)" type="danger" size="small">Create Invoice</el-button>
							<el-button  @click="details(scope.row.plvKGuestBillcol)" type="danger" size="small">Detail</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			
			<div class="block" style="float: right;">
				<el-pagination :page-size='sum' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
				 :current-page="page01">
				</el-pagination>
			</div>
			
		</div>
		
		<div class="tishi">
			<el-dialog title="提示" :visible.sync="dialogVisible_state" width="30%" :before-close="handleClose_state" top='20%'>
				<span>處理狀態更改爲:&nbsp;</span>
				
				<el-select v-model="options" placeholder="请选择" style="border-radius: 8px;height: 20px;width: 150px;text-align: center;">
					<el-option label="已起貨" value="已起貨"></el-option>
					<el-option label="起貨期" value="起貨期"></el-option>
				</el-select>
				
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_state()">取 消</el-button>
					<el-button type="primary" @click="confirm_state()">确 定</el-button>
				</span>
			</el-dialog>
		</div>

		<!-- 賬號密碼錯誤彈窗 -->
		<div class="tishi">
			<el-dialog title="提示" :visible.sync="dialogVisible_detele" width="30%" :before-close="handleClose_detele" top='20%'>
				<span>確認刪除嗎？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">取 消</el-button>
					<el-button type="primary" @click="confirm_detele()">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		
		<div class="tishi">
			<el-dialog title="提示" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
				<span>確認鎖定嗎？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="suoding_quxiao()">取 消</el-button>
					<el-button type="primary" @click="suoding_queren()">确 定</el-button>
				</span>
			</el-dialog>
		</div>

	</div>

</template>
<script>
	export default {
		name: "UserManagement",
		data() {
			return {
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				options: [{
						id: 1,
						label: '已起貨'
					},
					{
						id: 2,
						label: '已取貨'
					}],
				value: '',
				dialogVisible_state: false,
				dialogVisible_detele: false,
				dialogVisibles: false,
				// reserve_Processing: false,
				reserve_lock: false,
				value1: '',
				value2: '',
				value6: [],
				test: '010101',
				formInline: {
					search: '',
					num: '2',
					seek: ''
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: [{
					id: 1,
					customer1:'11',
					customer2:'11',
					numbe:'11',
					gold:'11',
					goldColour:'11',
					guestDate:'11',
					plantDate:'11',
					size1:'11',
					totalPrice:'11',
					plvKGuestBillType:'11',
					plvKProductEntityList:[{guestDate:''}],
					// plvKProductEntityList[0].guestDate:'
// 					children: [{
// 						id: 11,
// 						customer1:'11',
// 						customer2:'11',
// 						numbe:'11',
// 						gold:'11',
// 						goldColour:'11',
// 						guestDate:'11',
// 						plantDate:'11',
// 						size1:'11',
// 						totalPrice:'11',
// 						plvKGuestBillType:'11',
// 						plvKProductEntityList:[],
// 					}]
				},],
				
			}


		},

		created: function() {
			
			var today = new Date();
			var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
			today.setTime(targetday_milliseconds); //注意，这行是关键代码
			this.dateOne = today.format("yyyy-MM-dd")
			this.dateOne_transfer = today.format("yyyy-MM-dd")
			
			
			// this.transferSearch()
			this.value6.push(today)
			this.value6.push(new Date())
			
			
			// this.value6.push(new Date(2019, 1, 1))
			// this.value6.push(new Date(2020, 11, 1))
			this.search()


		},

		methods: {
			// 			onSubmit() {
			// 				this.search()
			// 			},
			handleClose_state(done) {
				this.dialogVisible_state = false
			},
			handleClose_detele(done) {
				this.dialogVisible_detele = false
			},
			handleClose(done) {
				this.dialogVisibles = false
			},
			search() {
				this.$api.post('/PlvKClientCardEndpoint/seekPageGuestBill', {
					dateEnd: this.value6[1].format("yyyy-MM-dd"),
					dateStart: this.value6[0].format("yyyy-MM-dd"),
					index: parseInt(this.page01) - 1,
					numbe: 10,
					seek: this.formInline.seek,
				}, r => {
					
					this.totalElements = r.totalElements
					this.tableData = r.content
					this.sum = r.size
					// this.formLabelAlign.guestDate=r.plvKProductEntityList[0].guestDate
					
				});
				
				
				// 修訂查詢
				// //console.log(this.scope.row.reference)
// 				this.$api.get('/PlvKClientCardEndpoint/seekPlvKClientCard/' + this.tableData.reference, null , r => {
// 					//console.log('-------------------------')
// 					//console.log(r)
// 				});
			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},

			// 刪除
			detele(uuid) {
				this.dialogVisible_detele = true
				this.statusid = uuid
			},
			cancel_detele() {
				this.dialogVisible_detele = false
			},

			confirm_detele() {
				this.dialogVisible_detele = false

				this.$api.get('/PlvKClientCardEndpoint/delete/' + this.statusid, null, r => {
					//console.log('****************************')
					this.search();
				});
			},

			// 狀態
			Processing(id) {
				this.dialogVisible_state = true
				this.stateid = id
				// //console.log('----'+id)
			},

			confirm_state(id) {
				this.dialogVisible_state = false


				//console.log({
					// id: this.stateid,
					// name: this.options
				// })

			this.$api.get('/PlvKClientCardEndpoint/updatePlvKAVIEceType/' + this.stateid + '/' + this.options, {
				// 					id: this.itemId,
				// 					TreatmentState: parseInt(this.options),
			}, r => {
				//console.log(r)
				this.search()
			});
			},
			cancel_state() {
				this.dialogVisible_state = false
			},


			// 鎖定
			lock(id) {
				this.dialogVisibles = true
				this.statusid = id
			},
			suoding_queren() {
				this.dialogVisibles = false
				this.$api.get('/PlvKClientCardEndpoint/onLock/' + this.statusid, null, r => {
					//console.log(r);
					this.search()
				});
			},
			suoding_quxiao() {
				this.dialogVisibles = false
			},


			// 批次翻頁
			pages02(val) {
				// //console.log(val)
				this.page01 = val
				this.search()
			},
			usercreate() {
				this.$router.push("/Neworder")
			},
			//發鑲單
			send(uuid){
				this.$router.push("/FaXiangDan?uuid=" + uuid)
			},
			// 修訂
			revision(uuid) {
				this.$router.push("/revision?uuid=" + uuid)
			},
			// 保修
			warranty(uuid) {
				this.$router.push("/Warranty?uuid=" + uuid)
			},
			// 首飾設計
// 			topage() {
// 				this.$router.push("/SystemManagement/JewelryDesign")
// 			},
			// 項目資料
			xiangmu() {
				this.$router.push("/SystemManagement/ProjectInformation")
			},
			

			details(uuid) {
				
				this.$router.push("/orderDetail?uuid=" + uuid)
				
				// this.$router.push("/MoBangXinZeng?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/Neworderpdf?type=Alert&uuid=" + uuid)
			},
			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/SystemManagement/JewelryDesign")
				} else if (type == 'branch') {
					this.$router.push("/SystemManagement/CustomerList")
				}
			}
			
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {

		.tishi {
			line-height: 0;
		}

		.reserve_lists {
			height: 135px;
			width: 20%;
			background: white;
			position: fixed;
			top: 30%;
			left: 40%;
			border: 2px solid rgb(224, 224, 224);
			z-index: 1000;
			overflow: auto; //益出滾動
			padding: 10px;
			box-shadow: 3px 3px 3px 3px lightgrey; //邊框陰影
		}

		.reserve_listb {
			height: 100px;
			width: 15%;
			background: white;
			position: fixed;
			top: 35%;
			left: 45%;
			border: 2px solid rgb(224, 224, 224);
			z-index: 1001;
			overflow: auto;
			padding: 10px;
			box-shadow: 3px 3px 3px 3px lightgrey; //邊框陰影

		}

		.block {
			line-height: 0;

			.el-main {
				line-height: 0
			}
		}

		.el-table--enable-row-transition {
			// height: 500px;
			overflow: auto;
			border-bottom: 0px solid white
		}

		.el-table_1_column_9,
		.is-leaf {
			line-height: 50px;
			padding: 0
		}

		.second_menu {
			width: 100px;
			line-height: 60px;
			float: left;
			margin-left: 20px;
			font-size: 18px;

			span {
				cursor: pointer
			}
		}

		.el-table__header-wrapper {
			line-height: 50px;
		}


		.selector {
			color: $navHoverTextColor;

		}

		.titles {
			height: 50px;
			background: rgb(224, 224, 224);
			margin-top: 20px;
			line-height: 50px;

			.img {
				width: 30px;
				height: 30px;
				float: right;
				margin-top: 10px;
				margin-right: 50px
			}

			.second_title {
				float: left;
				font-size: 18px;
				margin-left: 20px;
				display: block
			}

		}

		.search {
			height: 90px;
			background: white;
			line-height: 110px;
			overflow: hidden;
			font-size: 18px;
			width: 100%
		}

		.el-form--inline .el-form-item__label {
			float: left
		}

		.titles_td {
			height: 50px;
			background: rgb(224, 224, 224);
			margin-top: 20px;
			line-height: 50px;

			.but {
				// background: $navHoverTextColor;
				background: rgb(245, 93, 84);
				color: white;
				float: right;
				margin-top: 6.5px;
				margin-right: 40px;
			}

			.second_title {
				float: left;
				font-size: 18px;
				margin-left: 20px;
				display: block
			}

		}
	}
</style>

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
								<el-form-item style='float:right;'>
									<el-button type="primary" @click="usercreate" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>New</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>



		<!-- 庫存列表 -->
		<div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 10px;">
					<el-table-column prop="campaign" label="Item">
					</el-table-column>
					<el-table-column prop="person" label="handler">
					</el-table-column>
					<!-- <el-table-column prop="customer1" label="優惠">
					</el-table-column>
					<el-table-column prop="customer1" label="客戶層級">
					</el-table-column> -->
					<el-table-column prop="startDay" label="Activation Date">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.startDay).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="endingDay" label="Term of validity">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.endingDay).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="remakr" label="Introduction">
					</el-table-column>

					<div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;' width="450">
							<template slot-scope="scope">
								<div style="white-space: nowrap;">
									<!-- <el-button  @click="details(scope.row.reference)" type="danger" size="small">詳情</el-button>
									<el-button v-show='!scope.row.isLock' @click="voucher(scope.row.reference)" type="danger" size="small">生成卡券</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">生成卡券</el-button>
									<el-button v-show='!scope.row.isLock' @click="modify(scope.row.reference)" type="danger" size="small">修改</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">修改</el-button>
									<el-button v-show='!scope.row.isLock' @click="lock(scope.row.reference)" type="danger" size="small">鎖定</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">已鎖</el-button>
									<el-button v-show='!scope.row.isLock' @click="detele(scope.row.reference)" type="danger" size="small">刪除</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">刪除</el-button> -->
									
									<el-button  @click="details(scope.row.reference)" type="danger" size="small">Detail</el-button>
									<el-button v-if='scope.row.onLock==0' @click="voucher(scope.row.reference,scope.row.campaign)" type="danger" size="small">Create Coupon</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Create Coupon</el-button>
									<el-button v-if='scope.row.onLock==0' @click="modify(scope.row.reference)" type="danger" size="small">Modify</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Modify</el-button>
									<el-button v-if='scope.row.onLock==0' @click="lock(scope.row.reference)" type="danger" size="small">Lock</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Lock</el-button>
									<el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Detele</el-button>
								</div>
							</template>
						</el-table-column>
					</div>

				</el-table>
			</div>
			
			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination :page-size='10' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
				 :current-page="page01">
				</el-pagination>
			</div>
			
		</div>




		<!-- 賬號密碼錯誤彈窗 -->
		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to delete this item?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>
		
		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to lock this item?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="suoding_quxiao()">Cancel</el-button>
					<el-button type="primary" @click="suoding_queren()">OK</el-button>
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
						label: '鎖定'
					},
					{
						id: 2,
						label: '未鎖定'
					}
				],
				value: '',
				dialogVisible: false,
				dialogVisibles: false,
				reserve_Processing: false,
				reserve_lock: false,
				value1: '',
				value2: '',
				value6: [],
				test: '010101',
				formInline: {
					search: '',
					num: '5',
					seek: ''
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: [{
					campaign:'',
					person:'',
					startDay:'',
					endingDay:'',
					remakr:'',
				}, ]
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
			this.search()


		},

		methods: {
			// 			onSubmit() {
			// 				this.search()
			// 			},
			handleClose(done) {
				this.dialogVisible = false
			},
			handleClose(done) {
				this.dialogVisibles = false
			},
			search() {
				this.$api.post('/PlvYMarketingCampaignEndpoint/seekPage', {
					dateEnd: this.value6[1].format("yyyy-MM-dd"),
					dateStart: this.value6[0].format("yyyy-MM-dd"),
					index: parseInt(this.page01) - 1,
					numbe: 10,
					seek: this.formInline.seek,
				}, r => {
					//console.log(r);
					this.totalElements = r.totalElements
					this.tableData = r.content
					this.sum = r.size
				});
			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},

			// 刪除
			detele(uuid) {
				this.dialogVisible = true
				this.statusid = uuid
			},
			cancel_detele() {
				this.dialogVisible = false
			},

			confirm_detele() {
				this.dialogVisible = false

				this.$api.get('/PlvYMarketingCampaignEndpoint/delete/' + this.statusid, null, r => {
					//console.log('****************************')
					this.search();
				});
			},

			// 鎖定
			lock(id) {
				this.dialogVisibles = true
				this.statusid = id
			},
			suoding_queren() {
				this.dialogVisibles = false
				this.$api.get('/PlvYMarketingCampaignEndpoint/onLock/' + this.statusid, null, r => {
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
				this.$router.push("/HuoDongXinZeng")
			},
			// 修訂
// 			revision(uuid, id) {
// 				this.$router.push("/Function/revision?uuid=" + uuid + "&id=" + id)
// 			},
			// 活動信息
// 			topage() {
// 				this.$router.push("/Function/CardTicketInformation")
// 			},
			// 項目資料
// 			xiangmu() {
// 				this.$router.push("/Function/ProjectInformation")
// 			},
			// 生成卡券
			voucher(uuid,name) {
				this.$router.push("/KaQuanXinZeng?uuid=" + uuid + '&name=' + name)
			},
			
			details(uuid) {
				this.$router.push("/HuoDongXinZeng?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/HuoDongXinZeng?type=alert&uuid=" + uuid)
			},
			topage(type) {
				if (type == 'shnegcheng') {
					this.$router.push("/SystemManagement/CardTicketInformation")
				} else if (type == 'kaquan') {
					this.$router.push("/SystemManagement/CardVoucherinformation")
				}
			}

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {
		
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
	}
</style>

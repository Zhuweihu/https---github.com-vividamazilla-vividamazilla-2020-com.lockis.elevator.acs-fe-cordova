<template>

	<div class="reservemanagement">

		<div style="padding: 0 0;min-width: 1400px;">
			<el-row>

				<el-col :span="24" style='line-height: 40px;'>
					<div style="color: green;width: 300px;font-size: 18px;float: left;"><span style="color: rgb(127,139,132);">statistic&nbsp;&nbsp;&nbsp;&nbsp;USA
							Dollar:</span><span style="margin-left: 5px;color: rgb(245,108,108);font-weight: bold;">{{meiyuan.dollars}}</span>
					</div>
					<div style="color: green;width: 200px;font-size: 18px;float: left;"><span style="color: rgb(127,139,132);">HK
							dollar:</span> <span style="margin-left: 5px;color: rgb(245,108,108);font-weight: bold;">{{gangbi.hk}}</span></div>
					<div style="color: green;width: 200px;font-size: 18px;float: left;"><span style="color: rgb(127,139,132);">RMB:</span>
						<span style="margin-left: 5px;color: rgb(245,108,108);font-weight: bold;">{{renmingbi.rmb}}</span></div>
				</el-col>

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
		<div style="border-radius: 10px;background: white;height: 676px;width: 100%;">
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData.page.content" height="620px" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<el-table-column prop="name" label="Item" row-style='background:red'>
					</el-table-column>
					<el-table-column prop="money" label="Amount">
					</el-table-column>
					<el-table-column prop="unit" label="Unit">
						<!-- 入庫 -->
					</el-table-column>
					<el-table-column prop="startDate" label="Invoice Date">
						<!-- 可用 -->
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{new Date(scope.row.startDate).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="totalNumbe" label="Total">
					</el-table-column> -->

					<!-- <el-table-column prop="in_num" label="入貨量">
					</el-table-column>
					<el-table-column prop="storage" label="儲存量">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.weight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightTo}}</span>
						</template>
					</el-table-column> -->



					<div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;' width="200px">
							<template slot-scope="scope">
								<!-- <div style="white-space: nowrap;">
									<el-button type="danger" size="small" @click='details(scope.row.reference)'>Detail</el-button>
									<el-button v-if='scope.row.onLock==0' @click="lock(scope.row.reference)" type="danger" size="small">Lock</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Lock</el-button>
									<el-button v-if='scope.row.onLock==0' @click="modify(scope.row.reference)" type="danger" size="small">Alter</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Alter</el-button>
									<el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
									<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Detele</el-button>
								</div> -->
								
								<div style="white-space: nowrap;" class="selector_form">
									<el-button style='float: left;' type="danger" size="small" @click='details(scope.row.reference)'>Detail</el-button>
									<!-- <el-button v-if='scope.row.onLock==0' @click="lock(scope.row.reference)" type="danger" size="small">Lock</el-button> -->
									<!-- <el-button v-if='scope.row.onLock==1' type="info" size="small" style='background-color: gray;'>Lock</el-button> -->
									<!-- <el-button v-if='scope.row.onLock==0' @click="modify(scope.row.reference)" type="danger" size="small">Alter</el-button> -->
									<!-- <el-button v-if='scope.row.onLock==1' type="info" size="small" style='background-color: gray;'>Alter</el-button> -->
									<!-- <el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
									<el-button v-if='scope.row.onLock==1' type="info" size="small" style='background-color: gray;'>Detele</el-button> -->
								
								
								
								<el-menu style='background:rgb(245,108,108);margin-left: 10px;float: left;width: 80px;padding: 0;height: 32px;border-radius: 3px;'
								 class="el-menu-demo" mode="horizontal" background-color="rgb(245,108,108)" text-color="#fff"
								 active-text-color="#fff">
								
									<el-submenu index="1">
										<template slot="title" style="line-height: 32px;height: 32px;line-height: 32px;border-bottom: 2px solid transparent;color: #909399;border-radius: 3px;">功能</template>
										<el-menu-item v-if='scope.row.onLock==0'  index="2-1" @click="lock(scope.row.reference)">Lock</el-menu-item>
										<el-menu-item v-if='scope.row.onLock==1'  index="2-1" style='color: #8C939D;'>Lock</el-menu-item>
										<el-menu-item v-if='scope.row.onLock==0'  index="2-1" @click="modify(scope.row.reference)" type="danger">Alter</el-menu-item>
										<el-menu-item v-if='scope.row.onLock==1'  index="2-1" style='color: #8C939D;'>Alter</el-menu-item>
										<el-menu-item v-if='scope.row.onLock==0'  index="2-1" @click="detele(scope.row.reference)">Detele</el-menu-item>
										<el-menu-item v-if='scope.row.onLock==1'  index="2-1" style='color: #8C939D;'>Detele</el-menu-item>
									
								
										<!-- <el-menu-item index="2-2">选项2</el-menu-item>
										<el-menu-item index="2-3">选项3</el-menu-item> -->
									</el-submenu>
								
								</el-menu>
								
								</div>
								
								
								<!-- <el-button @click="handleClick(scope.row.id)" type="danger" size="small">Detail</el-button> -->
								<!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
							</template>
						</el-table-column>

					</div>

				</el-table>
			</div>
			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages02'
				 :current-page="page01">
				</el-pagination>
			</div>
		</div>



		<!-- 賬號密碼錯誤彈窗 -->
		<div class="tishi">
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to delete it?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>
		
		
		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to lock it?</span>
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
				titlebg: {
					'background': 'rgb(216,214,215)',
					'color': 'black'
				},
				dialogVisible: false,
				dialogVisibles: false,
				value1: "",
				test: '010101',
				value6: [],
				formInline: {
					search: '',
					seek: '',
					num: ''
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: {
					page: {
						content: [{
							name: '',
							money: '',
							unit: '',
							startDate: '',
						}]
					}
				},
				gangbi: {
					hk: '0'
				},
				renmingbi: {
					rmb: '0'
				},
				meiyuan: {
					dollars: '0'
				},

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

			// 					this.value6.push(new Date(2019, 1, 1))
			// 					this.value6.push(new Date(2020, 11, 1))
			this.search()
		},

		methods: {
			handleClose(done) {
				this.dialogVisible = false
			},

			handleClose(done) {
				this.dialogVisibles = false
			},

			// 			onSubmit() {
			// 				this.search()
			// 			},
			search() {



				this.$api.post('/PlvRQuittanceEndpoint/seekPage', {
					dateEnd: this.value6[1].format("yyyy-MM-dd"),
					dateStart: this.value6[0].format("yyyy-MM-dd"),
					index: parseInt(this.page01) - 1,
					numbe: 10,
					seek: this.formInline.seek,
				}, r => {
					//console.log('***********************')
					//console.log(r);
					this.totalElements = r.page.totalElements
					this.tableData = r
					this.sum = r.size
					
					this.gangbi.hk = 0
					this.renmingbi.rmb = 0
					this.meiyuan.dollars =0

					for (var i = 0; i < this.tableData.list.length; i++) {
						if (this.tableData.list[i].unit == "港幣") {

							this.gangbi.hk = this.tableData.list[i].money
						} else if (this.tableData.list[i].unit == "人民幣") {

							this.renmingbi.rmb = this.tableData.list[i].money
						} else if (this.tableData.list[i].unit == "美元") {

							this.meiyuan.dollars = this.tableData.list[i].money
						}
					}
				});

				// 						

				////console.log(this.tableData.list.size);
			},
			// 批次翻頁
			pages02(val) {
				// //console.log(val)
				this.page01 = val
				this.search()
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

				this.$api.get('/PlvRQuittanceEndpoint/delete/' + this.statusid, null, r => {
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
				this.$api.get('/PlvRQuittanceEndpoint/onLock/' + this.statusid, null, r => {
					console.log(r);
					this.search()
				});
			},
			suoding_quxiao() {
				this.dialogVisibles = false
			},

			usercreate() {
				this.$router.push("/NewDailyExpenditurereceiptManagement_shouju?type=new")
			},

			details(uuid) {
				this.$router.push("/NewDailyExpenditurereceiptManagement_shouju?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/NewDailyExpenditurereceiptManagement_shouju?type=alert&uuid=" + uuid)
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/Function/RecordOnSpending")
				} else if (type == 'grounp') {
					this.$router.push("/Function/PayCostManagement")
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

<template>

	<div class="reservemanagement">

		<div style="padding: 0 0;min-width: 1400px;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">

						<!-- <div style="width: 300px;margin-left: 0;float: left;">
							<el-date-picker v-model="value6" type="daterange" start-placeholder="start date" end-placeholder="end date"
							 placeholder="select date" style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
						</div> -->
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
									<template slot-scope="scope">
										<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
									</template>
								</el-form-item>
								<el-form-item style='float:right;'>
									<!-- <el-button type="primary" @click="usercreate" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>New</el-button> -->
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>



		<!-- 庫存列表 -->
		<div style="border-radius: 10px;background: white;height: 670px;width: 100%;">
			<div>
				<el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 10px;">
					<el-table-column prop="voucherId" label="Card number" width="330">
					</el-table-column>
					<el-table-column prop="campaign" label="Item" width="100">
					</el-table-column>
					<el-table-column prop="preferentialType" label="Coupon category">
					</el-table-column>
					<!-- <el-table-column prop="preferential" label="Coupon Amount">
					</el-table-column>
					<el-table-column prop="workingCondition" label="Conditions"  width="100">
					</el-table-column> -->
					<el-table-column prop="marketingCampaignPeople" label="Name">
					</el-table-column>
					<el-table-column prop="customerForm" label="Object">
					</el-table-column>
					<el-table-column prop="client" label="Customer List">
					</el-table-column>
					<el-table-column prop="userLevel" label="Customer level" width="130">
					</el-table-column>
					<!-- <el-table-column prop="startDate" label="Activation Date">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.startDay).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="stopDate" label="Term of validity">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.endingDay).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column> -->

					<el-table-column fixed="right" label="Action" width="160">
						<template slot-scope="scope">
							<!-- v-if="client =='未被使用' || customerForm == '未被使用' " -->
							<!-- <el-button  @click="Use(scope.row.reference,scope.row.plvYDiscountCouponReference)" type="danger" size="small">Use</el-button> -->
							<!-- <el-button  @click="Use(scope.row.reference,scope.row.plvYDiscountCouponReference)" type="danger" size="small">Use</el-button>
							<el-button v-if='client!="未被使用" || customerForm!="未被使用"' type="info" size="small" style='background-color: gray;'>Use</el-button> -->
							<el-button v-if="scope.row.client =='未被使用' || scope.row.customerForm == '未被使用' " @click="Use(scope.row.reference,scope.row.plvYDiscountCouponReference)" type="danger" size="small">Use</el-button>
							<el-button v-if="scope.row.client !='未被使用' || scope.row.customerForm != '未被使用' " type="info" size="small" style='background-color: gray;'>Use</el-button>
						</template>
					</el-table-column>

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
			<el-dialog title="Tips" :visible.sync="dialogVisibles_suoding" width="30%" :before-close="handleClose_suoding" top='20%'>
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
				client:'',
				customerForm:'',
				reference: '',
				voucherId: '',
				statusid: '',
				titlebg: {
					'background': 'rgb(216,214,215)',
					'color': 'black'
				},
				options: [{
						id: 1,
						label: '鎖定'
					},
					{
						id: 2,
						label: '為鎖定'
					}
				],
				value: '',
				dialogVisible: false,
				dialogVisibles_suoding: false,
				reserve_Processing: false,
				reserve_lock: false,
				value1: '',
				value2: '',
				value6: [],
				test: '010101',
				formInline: {
					search: '',
					num: '',
					seek: ''
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: [{
					plvYDiscountCouponReference:'',
					reference: '',
					voucherId: '',
					campaign: '',
					preferentialType: '',
					preferential: '',
					workingCondition: '',
					marketingCampaignPeople: '',
					userLevel: '',
					startDate: '',
					stopDate: '',
					cardOn: '',
					onLock: '',
					client:'',
					customerForm:'',
				}, ]
			}


		},

		created: function() {

			// 			this.value6.push(new Date(2019, 1, 1))
			// 			this.value6.push(new Date(2020, 11, 1))
			// this.search()


		},

		methods: {
			// 			onSubmit() {
			// 				this.search()
			// 			},
			handleClose(done) {
				this.dialogVisible = false
			},
			handleClose_suoding(done) {
				this.dialogVisibles_suoding = false
			},
			// 			search() {
			// 				// this.tableData=[]
			// 				this.$api.get('/PlvYMarketingCampaignEndpoint/seekDiscountCardReference/', + this.reference , null , r => {
			// 					console.log(r)
			// 				});
			// 			},

			onSubmit() {
				// 				console.log('55555555555555')
				// 				console.log(this.formInline.seek)
				if (this.formInline.seek != '') {
					this.tableData = []
					this.$api.get('/PlvYMarketingCampaignEndpoint/seekDiscountCardReference/' + this.formInline.seek, null, r => {
						console.log(r)
						for (var i = 0; i < r.length; i++) {
							this.tableData.push({
								'marketingCampaignPeople': r[i].marketingCampaignPeople,
								'campaign': r[i].marketingCampaignName, //活動名稱
								'preferentialType': r[i].discountsType, //優惠券類型
								'preferential': r[i].discounts, //優惠金額
								'workingCondition': r[i].serviceonditions, //使用條件
								'customerForm': r[i].customerForm, //使用人
								'userLevel': r[i].userLevel, //客戶級別
								'client': r[i].client, //客單名
								// 							'startDate':r[i].startDate.format("yyyy-MM-dd"),			 //激活時間
								// 							'stopDate':r[i].stopDate.format("yyyy-MM-dd"),			 //有效時間
								'reference': r[i].reference, //uuid
								'plvYDiscountCouponReference':r[i].plvYDiscountCouponReference,
								'cardOn': r[i].cardOn, //鎖定 
								// 'campaignReference':r.list[i].campaignReference,			 //id
								'voucherId': r[i].reference, //卡捲號
								// 'workingCondition':r.list[i][13]  //使用條件
							})
						}
					});
					this.page01 = 1
				}else{
					alert('Please enter the card ticket number.')
				}


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

				this.$api.get('/PlvYMarketingCampaignEndpoint/deleteDiscountCard/' + this.statusid, null, r => {
					//console.log('****************************')
					//console.log(r)
					this.search();
				});
			},



			// 鎖定
			lock(uuid) {
				this.dialogVisibles_suoding = true
				this.statusid = uuid
			},
			suoding_queren() {
				this.dialogVisibles_suoding = false
				this.$api.get('/PlvYMarketingCampaignEndpoint/onLockDiscountCard/' + this.statusid, null, r => {
					//console.log(r);
					this.search()
				});
			},
			suoding_quxiao() {
				this.dialogVisibles_suoding = false
			},


			// 批次翻頁
			pages02(val) {
				// //console.log(val)
				this.page01 = val
				this.search()
			},
			usercreate() {
				this.$router.push("/Function/KaQuanXinZeng")
			},
			Use(uuid,id) {
				this.$router.push("/CardTicket?uuid=" + uuid + '&id=' + id)
			},
			
			


		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {

		.el-form--inline {
			line-height: 0;
		}

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

<template>

	<div class="reservemanagement">

		<div style="padding: 0 0;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">

						<div style="width: 300px;margin-left: 0;float: left;">
							<!-- <el-date-picker v-model="value6" type="daterange" start-placeholder="start date" end-placeholder="end date"
							 placeholder="select date" style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker> -->
						</div>
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<!-- <el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item> -->
								<!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;line-height: 40px;float: left;">Coupon</div> -->
								<el-form-item style='float:right;'>
									<el-button type="primary" @click="usercreate" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
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
				<el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 10px;">

					<template slot="empty" v-if="loaing_table">
						<span>Opps! No records yet</span>
					</template>

					<template slot="empty" v-if="!loaing_table">
						<i class="el-icon-loading"></i>
						<span>Loading...</span>
					</template>

          <el-table-column prop="id" label="Id" width="80px" >
          </el-table-column>

<!-- 					<el-table-column
            type="index"
            width="80px"
            :index="indexMethod"
            >
          </el-table-column> -->


					<el-table-column prop="name" label="Name">
					</el-table-column>
					<el-table-column prop="value" label="Value">
					</el-table-column>
					<el-table-column prop="discount" label="Discount" >
					</el-table-column>
					<!-- <el-table-column prop="dateStart" label="Start Date" >
					</el-table-column> -->
					<!-- <el-table-column prop="dateEnd" label="End Date" >
					</el-table-column> -->
					<!-- <el-table-column prop="userLevel" label="Level">
					</el-table-column> -->
					<el-table-column prop="dateStart" label="Start Date">
						<template slot-scope="scope" format="yyyy-MMM-dd" >
							<span>{{new Date(scope.row.dateStart).format("yyyy-MMM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="dateEnd" label="End Date">
						<template slot-scope="scope"  >
							<span format="yyyy-MMM-dd" >{{new Date(scope.row.dateEnd).format("yyyy-MMM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="Action"  align='center' width="100px">
						<template slot-scope="scope">
							<!-- <el-button v-show='!scope.row.isLock' @click="lock(scope.row.reference)" type="danger" size="small">鎖定</el-button>
							<el-button v-show='scope.row.isLock'  type="info" size="small">已鎖</el-button>
							<el-button v-show='!scope.row.isLock' @click="detele(scope.row.reference)" type="danger" size="small">刪除</el-button>
							<el-button v-show='scope.row.isLock'  type="info" size="small">刪除</el-button> -->

							<!-- <el-button  @click="details(scope.row.reference)" type="danger" size="small">詳情</el-button> -->
							<!-- <el-button  @click="detail(scope.row.reference)" type="danger" size="small">Detail</el-button> -->
							<el-button  @click="modify(scope.row.reference)" type="danger" size="small">Modify</el-button>
							<!-- <el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Detele</el-button> -->
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
			<el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to lock this item?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="suoding_quxiao()">Cancel</el-button>
					<el-button type="primary" @click="suoding_queren()">OK</el-button>
				</span>
			</el-dialog>
		</div>


		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisibles_jie" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to lock this item?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="jie_quxiao()">Cancel</el-button>
					<el-button type="primary" @click="jie_queren()">OK</el-button>
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
						label: '為鎖定'
					}
				],
				value: '',
				dialogVisible: false,
				dialogVisibles: false,
				dialogVisibles_jie:false,
				reserve_Processing: false,
				reserve_lock: false,
				loaing_table:false,
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
				tableData: []
			}


		},

		created: function() {

// 			var today = new Date();
// 			var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
// 			today.setTime(targetday_milliseconds); //注意，这行是关键代码
// 			this.dateOne = today.format("yyyy-MM-dd")
// 			this.dateOne_transfer = today.format("yyyy-MM-dd")
//
// 			this.value6.push(today)
// 			this.value6.push(new Date())


			this.search()



			this.$api.get('/sales/coupon/count', null, r => {

				this.totalElements = r

			});



		},

		methods: {
			// 			onSubmit() {
			// 				this.search()
			// 			},

      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1);
      },

			detail(uuid){
				this.$router.push("/CardTicket?type=detail&uuid="+uuid)
			},


			modify(uuid){
				this.$router.push("/CardTicket?type=alter&uuid="+uuid)
			},


			handleClose(done) {
				this.dialogVisible = false
			},
			handleClose(done) {
				this.dialogVisibles = false
			},

			handleClose(done) {
				this.dialogVisibles_jie = false
			},

			search() {

				this.loaing_table=false
				this.tableData=[]

				this.$api.get('/sales/coupon/'+(parseInt(this.page01) - 1)+'/10', null, r => {
					//console.log(r);
					// this.campaign = r.content[0].campaign
					// this.totalElements = r.totalElements
					this.tableData = r
					this.loaing_table=true
					// this.sum = r.size
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

				this.$api.get('/PlvYMarketingCampaignEndpoint/deleteDiscountCouponReference/' + this.statusid, null, r => {
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
				this.$api.get('/PlvYMarketingCampaignEndpoint/onLockDiscountCouponReference/' + this.statusid, null, r => {
					//console.log(r);
					this.search()
				});
			},

// 			if(onLock==1){
// 				this.dialogVisibles_jie = false
// 				this.$api.get('/PlvYMarketingCampaignEndpoint/onLockDiscountCouponReference/' + this.statusid, null, r => {
// 					//console.log(r);
// 					this.search()
// 				});
// 			}

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
				this.$router.push("/CardTicket")
			},

			details(uuid) {
				this.$router.push("/CardVoucherinformation")
			},
// 			modify(uuid) {
// 				this.$router.push("/Function/KedanXinzeng?type=alert&uuid=" + uuid)
// 			},
// 			topage(type) {
// 				if (type == 'user') {
// 					this.$router.push("/Function/MarketingActivities")
// 				} else if (type == 'kaquan') {
// 					this.$router.push("/Function/CardVoucherinformation")
// 				}
// 			}

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {

		.el-form--inline{
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

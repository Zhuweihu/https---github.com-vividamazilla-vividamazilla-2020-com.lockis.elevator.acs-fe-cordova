<template>

	<div class="reservemanagement">

		<div style="padding: 0 0;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">


						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">

								<!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;float: left;">Group</div> -->
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
		<div style="border-radius: 10px;background: white;height: 700px;width: 100%;">
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 650px;border-radius: 10px;">

					<template slot="empty" v-if="loaing_table">
						<span>Opps! No records yet</span>
					</template>

					<template slot="empty" v-if="!loaing_table">
						<i class="el-icon-loading"></i>
						<span>Loading...</span>
					</template>


          <el-table-column prop="id" label="Id" width="80px" >
          </el-table-column>


					<!-- <el-table-column
            type="index"
            width="80px"
            :index="indexMethod"
            >
          </el-table-column> -->

					<el-table-column prop="name" label="Name">
					</el-table-column>


					<!-- <el-table-column prop="jianjie" label="性別">
					</el-table-column> -->
					<!-- <el-table-column prop="name" label="級別">
					</el-table-column> -->
					<!-- <el-table-column prop="finishDate" label="設計日期">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.finishDate).format("yyyy-MM-dd hh:mm")}}</span>
						</template>
					</el-table-column> -->
					<!-- <el-table-column prop="intro" label="簡介">
					</el-table-column> -->
					<el-table-column fixed="right" label="Action"  align='center' width="300px">
						<template slot-scope="scope">
							<!-- <el-button @click="details(scope.row.plvKGuestBillcol)" type="danger" size="small">Detail</el-button> -->
							<el-button @click="permission(scope.row.reference)" type="danger" size="small">Permission</el-button>
							<el-button @click="modify(scope.row.reference)" type="danger" size="small">Modify</el-button>
							<el-button @click="detele(scope.row.reference)" type="danger" size="small">Delete</el-button>


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
			<el-dialog title="" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
				<span>Delete it？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>

		<!-- <div class="tishi">
			<el-dialog title="提示" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
				<span>確認鎖定嗎？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="suoding_quxiao()">取 消</el-button>
					<el-button type="primary" @click="suoding_queren()">确 定</el-button>
				</span>
			</el-dialog>
		</div> -->

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
				loaing_table:false,
				value1: "",
				test: '010101',
				formInline: {
					search: '',
					num: '6',
					seek: '',
				},
				value6: [],
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: []
			}
		},

		created: function() {

			// 			this.value6.push(new Date(2019, 1, 1))
			// 			this.value6.push(new Date(2020, 11, 1))
			this.search()

			this.$api.get('/member/group/count', null, r => {

				this.totalElements = r

			});

		},

		methods: {

      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1) ;
      },

			permission(uuid){
				this.$router.push("/Add_Permission?type=new&uuid="+uuid)
			},

			handleClose(done) {
				this.dialogVisible = false
			},
			handleClose(done) {
				this.dialogVisibles = false
			},

			search() {

				this.loaing_table=false
				this.tableData=[]

				this.$api.get('/member/group/' + (parseInt(this.page01) - 1) + '/10', null, r => {

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

				this.$api.delete('/member/group/' + this.statusid + '/purge', null, r => {
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
				this.$api.get('/Design/onLock/' + this.statusid, null, r => {
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
				this.$router.push("/GroundCreate?type=new")
			},
			// 上載
			// 			shangzai(){
			// 				this.$router.push("/shnagzaitupian")
			// 			},
			// 返回客單
			return_guest() {
				this.$router.push("/CustomerOrderManagement")
			},

			// 詳情
			details(uuid) {
				this.$router.push("/ShouShixingZeng")
			},


			// 			kedan() {
			// 				this.$router.push("/SystemManagement/CustomerOrderManagement")
			// 			},
			chengping() {
				this.$router.push("/SystemManagement/CustomerList")
			},


			details(uuid) {
				this.$router.push("/ShouShixingZeng?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/GroundCreate?type=alert&uuid=" + uuid)
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/SystemManagement/CustomerOrderManagement")
				} else if (type == 'branch') {
					this.$router.push("/SystemManagement/CustomerList")
				}
			},

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {

		.block {
			line-height: 0;

			.el-main {
				line-height: 0
			}
		}

		.tishi {
			line-height: 0;
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

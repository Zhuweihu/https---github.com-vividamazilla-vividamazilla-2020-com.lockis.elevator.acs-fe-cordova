<template>

	<div class="reservemanagement">

		<div style="padding: 0 0;min-width: 1000px;">
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
								<!-- <el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item> -->
								<!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;float: left;line-height: 40px;">Customer Tier</div> -->
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
		<!-- <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Customer level</div> -->
		<div style="border-radius: 10px;background: white;height: 675px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<!-- 超出可滾動 -->
				<!-- overflow:scroll; -->
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

					<!-- <el-table-column
            type="index"
            width="80px"
            :index="indexMethod"
            >
          </el-table-column> -->

					<el-table-column prop="typeName" label="Level" width="200px">
            <template slot-scope="scope">
              <span style="text-decoration: underline;cursor: pointer;" @click="to_sales_order(scope.row.typeName)">{{scope.row.typeName}}</span>
            </template>
					</el-table-column>

					<el-table-column prop="explain" label="Introduction">
					</el-table-column>

					<div class="action">
						<el-table-column fixed="right" label="Action"  align='center' style='background: red;' width="200">
							<template slot-scope="scope">
								<div style="white-space: nowrap;">
									<!-- <el-button  @click="details(scope.row.reference)" type="danger" size="small">Detail</el-button> -->
									<el-button v-show='!scope.row.isLock' @click="modify(scope.row.reference,scope.row.id)" type="danger" size="small">Modify</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">Modify</el-button>
									<el-button v-show='!scope.row.isLock' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
									<el-button v-show='scope.row.isLock'  type="info" size="small">Detele</el-button>
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
				<span>Do you really want to delete it?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
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
				reserve_Processing: false,
				reserve_lock: false,
				loaing_table:false,
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
				tableData: []
			}


		},

		created: function() {

			this.search()


		},

		methods: {
			// 			onSubmit() {
			// 				this.search()
			// 			},

      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1) ;
      },

      to_sales_order(uuid){

        this.$router.push("/CustomersManagement?type=level&type_uuid="+uuid)

      },

			handleClose(done) {
				this.dialogVisible = false
			},
			search() {
				this.loaing_table=false
				this.tableData=[]
				this.$api.get('/customer/type', null, r => {
					console.log(r);
					this.tableData = r
					this.loaing_table=true
// 					this.totalElements = r.totalElements
// 					this.sum = r.size
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

				this.$api.delete('/customer/type/' + this.statusid, null, r => {
					console.log('****************************')
					this.search();
				});
			},




			// 批次翻頁
			pages02(val) {
				// console.log(val)
				this.page01 = val
				this.search()
			},
			usercreate() {
				this.$router.push("/CustomerLevel_kehu")
			},

			details(uuid) {
				this.$router.push("/CustomerLevel_kehu?type=detail&uuid=" + uuid)
			},
			modify(uuid,id) {
				this.$router.push("/CustomerLevel_kehu?type=alert&uuid=" + uuid + "&id" + id)
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

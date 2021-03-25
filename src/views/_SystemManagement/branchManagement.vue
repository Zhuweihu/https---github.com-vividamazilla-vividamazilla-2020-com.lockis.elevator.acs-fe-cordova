<template>
	<div class="errormanagement">

		<div>
			<div style="padding: 0 0;">
				<el-row>
					<el-col :span="24">
						<div class="grid-content bg-purple-dark" style="height: 40px;">

							<!-- <div  style="width: 300px;margin-left: 0;float: left;">
								<el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date" placeholder="select date"
								 style='width: 300px;float: right;border-radius: 10px;'>
								</el-date-picker>
							</div> -->
							<div>
								<el-form :inline="true" :model="formInline" class="demo-form-inline">

									<!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;float: left;line-height: 40px;">Branch Management</div> -->

									<el-form-item style='float:right;margin-right: 40px;'>
										<el-button type="primary" @click="usercreate" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
									</el-form-item>


								</el-form>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>

			<!-- <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Branch Management</div> -->
			<div style="padding-bottom: 40px;background: white;height: 675px;border-radius: 10px;">
				<el-table :data="tableData" style="width: 100%;text-align: center;padding: 0;border-radius: 10px;" height='620px' :header-cell-style="titlebg" >

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


					<el-table-column prop="name" label="Branch" >
					</el-table-column>
					<!-- <el-table-column prop="pnum" label="Number" >
					</el-table-column> -->
					<el-table-column prop="address" label="Address" >
					</el-table-column>
					<!-- <el-table-column prop="principal" label="Responsible" >
					</el-table-column> -->
					<el-table-column prop="telephone" label="Telphone" >
					</el-table-column>

					<el-table-column fixed="right" label="Action"  width="150">
						<template slot-scope="scope">
							<div style="white-space: nowrap;">
								<el-button type="danger" size="small" @click='Alter(scope.row.reference,scope.row.id)'>Modify</el-button>
								<!-- <el-button type="danger" size="small" @click='del(scope.row.reference)'>Detele</el-button> -->
							</div>

						</template>
					</el-table-column>

				</el-table>

				<div class="block" style="float: right;margin-top: 10px;">
					<el-pagination :page-size='10' layout="prev, pager, next" :total="totalElements" @current-change='pages02' :current-page="page01">
					</el-pagination>
				</div>

				<!-- <div class="block" style="float: right;margin-top: 10px;">
					<el-pagination layout="prev, pager, next" :total="50" @current-change='pages02'>
					</el-pagination>
				</div> -->

			</div>



		</div>

		<!-- 賬號密碼錯誤彈窗 -->
		<div class="dialog">
			<el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%' height='100'>
				<span>Do you really want to delete this item?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_dialog()">Cancel</el-button>
					<el-button type="primary" @click="detele_dialog()">OK</el-button>
				</span>
			</el-dialog>
		</div>

	</div>

</template>

<script>
	export default {
		name: "errormanagement",
		data() {
			return {
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				value1: "",
				test: '010101',
				page01: 1,
				uuid:'',
				totalElements:0,
				dialogVisible: false,
				loaing_table:false,
				formInline: {
					search: '',
					num: ''
				},
				tableData: []
			}
		},

		// /Branch/findAll
		created: function() {
			this.search()
		},

		methods: {

      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1) ;
      },

			onSubmit() {
				this.search()
			},
			search() {
				this.loaing_table=false
				this.tableData=[]
				this.$api.post('/Branch/findAll?Page='+this.page01+'&Size=10',
					null, r => {
						// 							//console.log('0101');
						// //console.log(r);
						this.totalElements = r.totalPage
						this.tableData = r.content
						this.loaing_table=true
						// this.sum = r.size
					});
			},
			// 批次翻頁
			pages02(val) {
				// //console.log(val)
				//console.log('000000')
				this.page01 = val
				this.search()
			},
			cancel_dialog() {
				this.dialogVisible = false
				this.uuid=''
			},
			detele_dialog() {

				this.$api.delete('/Branch/delete?reference='+this.uuid,
					null, r => {
						// //console.log(r);
						this.dialogVisible = false
						this.search()
					});

			},



			usercreate() {
				this.$router.push("/branchCreate?type=new")
			},

			Alter(uuid,id) {
				this.$router.push("/branchCreate?type=Alter&uuid="+uuid+'&id='+id)
			},

			topage(type) {
				if (type == 'user') {
					this.$router.push("/UserManagement")
				} else if (type == 'grounp') {
					this.$router.push("/CustomentManagement")
				}
			},

			// 刪除確認框
			del(uuid) {
				this.uuid=uuid
				this.dialogVisible = true
			},

			handleClose(done) {
				this.dialogVisible = false
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/styles/variable';



	.errormanagement {
		line-height: 0;

		.dialog {
			line-height: 0;

			.el-main {
				line-height: 0px
			}
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
			height: 60px;
			// background: rgb(224, 224, 224);
			margin-top: 20px;
			line-height: 50px;

			.but {
				// background: $navHoverTextColor;
				background: rgb(5, 120, 209);
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

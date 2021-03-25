
<template>
	
	<div class="reservemanagement">
		



		<div style="padding: 0 0;min-width: 1400px;">
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
								<!-- <el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.search" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item> -->
								<!-- <el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
								</el-form-item> -->
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
		<div style="border-radius: 10px;background: white;height: 385px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData" height="700" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<!-- <el-table-column prop="assetRef" label="Communicate" row-style='background:red'> 
					</el-table-column> -->
					<!-- <el-table-column prop="customerRef" label="Content"> 
					</el-table-column> -->
					<el-table-column prop="proCode" label="Achievement">  
					</el-table-column>
					<el-table-column prop="purchaseTime" label="Date"> 
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{new Date(scope.row.purchaseTime).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					
					<!-- <el-table-column prop="explain" label="Remark">  
					</el-table-column> -->
					<div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;' width="240">
							<template slot-scope="scope" >
								<div style="white-space: nowrap;">
									<el-button type="danger" size="small" @click='detail(scope.row.reference)'>Detail</el-button>
								</div>
							</template>
						</el-table-column>
					</div>
					
					
					
					
					
				</el-table>
			</div>
			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='11' :total="totalElements" @current-change='pages02'
				 :current-page="page01">
				</el-pagination>
			</div>
		</div>

		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to delete this item?？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>


		<!-- 賬號密碼錯誤彈窗 -->
		<!-- <div class="dialog">
			<el-dialog title="提示" :visible.sync="dialogVisible02" width="30%" top='20%'>
				<span>時間不能爲空</span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogVisible02 = false">確 定</el-button>
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
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				id:'',
				dialogVisible:false,
				test: '010101',
				uuid:'',
				formInline: {
					search: '',
					num: '',
					seek:'',
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: [{
					assetRef:'',
					customerRef:'',
					purchaseTime:'',
					proCode:'',
				}, ]
			}


		},

		created: function() {
		
			this.uuid = this.$route.query.uuid
			this.name = this.$route.query.name
			// //console.log(this.uuid)
			this.search()

		},

		methods: {
			handleClose(done) {
				this.dialogVisible = false
			},
// 			handleClose(done) {
// 				this.dialogVisible=false
// 			},
			search() {
				
				this.$api.get('/customer/log/' + this.uuid+ '/'+parseInt(this.page01) + '/' + 10 ,null, r => {
					//console.log(r)
					this.tableData = r.content
					this.totalElements = r.totalPage
					this.sum = r.size
					// this.uuid = this.$route.query.uuid
				});
			},
			
			onSubmit() {
				this.page01 = 1
				this.search()
			},
			// 查看
// 			check(uuid){
// 				this.$router.push("/SystemManagement/KedanXinzeng?type=Alert&uuid=" + uuid)
// 			},
			
			check() {
				this.$router.push("/SystemManagement/Yonghuchakan")
			},
			
			// 刪除
			detele(uuid){
				this.dialogVisible = true
				this.statusid = uuid
			},
			cancel_detele(){
				this.dialogVisible = false
			},
			
			confirm_detele(){
				this.dialogVisible = false
				
				this.$api.get('/CommunicationLogs/delete/' + this.statusid, null, r => {
					//console.log(r)
					this.search()
// 					this.tableData3 = r.content;
// 					this.totalElements = r.totalElements
				});
			},
			// 批次翻頁
			pages02(val) {
				// //console.log(val)
				this.page01 = val
				this.search()
			},
			usercreate() {
				this.$router.push("/NewLog?uuid=" + this.uuid)
			},

			detail(uuid) {
				this.$router.push("/NewLog?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/NewLog?type=Alert&uuid=" + this.uuid+'&id='+uuid)
			},
			thelog(uuid) {
				this.$router.push("/Log?&uuid=" + uuid)
				window.history.back();
			},
			cancel() {
				this.$router.push("/CustomersManagement")
			},
// 			topage(type) {
// 				if (type == 'grounp') {
// 					this.$router.push("/SystemManagement/CustomentManagement")
// 				} else if (type == 'branch') {
// 					this.$router.push("/SystemManagement/branchManagement")
// 				}
// 			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {

		.tishi{
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

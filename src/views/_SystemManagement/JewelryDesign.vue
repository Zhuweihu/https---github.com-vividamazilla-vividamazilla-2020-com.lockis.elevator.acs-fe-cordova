

<template>

	<div class="reservemanagement">
		
		<div style="padding: 0 0;min-width: 1000px;">
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
									<el-button type="primary" @click="shangzai" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Upload</el-button>
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
					<el-table-column prop="designName" label="Design code">
					</el-table-column>
					<el-table-column prop="designer" label="Designer">
					</el-table-column>
					<el-table-column prop="numbe" label="Total Price">
					</el-table-column>
					<el-table-column prop="finishDate" label="Design Date">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.finishDate).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="intro" label="Introduction">
					</el-table-column>
					<el-table-column fixed="right" label="Action" width="200">
						<template slot-scope="scope">
							<div class="selector_form">
								
								
								
								
								
							<!-- <el-button  @click="copy(scope.row.reference)" type="danger" size="small">copy</el-button> -->
							<el-button style='float: left;'  @click="details(scope.row.reference)" type="danger" size="small">Detail</el-button>
							<!-- <el-button v-if='scope.row.onLock==0' @click="modify(scope.row.reference)" type="danger" size="small">Alter</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Alter</el-button> -->
							<!-- <el-button v-if='scope.row.onLock==0' @click="lock(scope.row.reference)" type="danger" size="small">Lock</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Lock</el-button> -->
							<!-- <el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Detele</el-button> -->
							
							<el-menu style='background:rgb(245,108,108);margin-left: 10px;float: left;width: 80px;padding: 0;height: 32px;border-radius: 3px;'
							 class="el-menu-demo" mode="horizontal" background-color="rgb(245,108,108)" text-color="#fff"
							 active-text-color="#fff">
							
								<el-submenu index="1">
									<template slot="title" style="line-height: 32px;height: 32px;line-height: 32px;border-bottom: 2px solid transparent;color: #909399;border-radius: 3px;">功能</template>
									<!-- <el-menu-item  index="2-1"  @click="details(scope.row.plvKGuestBillcol)">Detail</el-menu-item> -->
									<el-menu-item  index="2-1" @click="copy(scope.row.reference)">copy</el-menu-item>
		
									<el-menu-item v-if='scope.row.onLock==0' index="2-2" @click="modify(scope.row.reference)">Modify</el-menu-item>
									<el-menu-item v-if='scope.row.onLock==1' index="2-2" style='color: #8C939D;'>Modify</el-menu-item>
									<el-menu-item v-if='scope.row.onLock==0' index="2-3" @click="lock(scope.row.reference)">Lock</el-menu-item>
									<el-menu-item v-if='scope.row.onLock==1' index="2-3" style='color: #8C939D;'>Lock</el-menu-item>
									<el-menu-item v-if='scope.row.onLock==0' index="2-4" @click="detele(scope.row.reference)">Delete</el-menu-item>
									<el-menu-item v-if='scope.row.onLock==1' index="2-4" style='color: #8C939D;'>Delete</el-menu-item>

									<!-- <el-menu-item index="2-2">选项2</el-menu-item>
									<el-menu-item index="2-3">选项3</el-menu-item> -->
								</el-submenu>
							
							</el-menu>
							
							
							</div>
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
				<span>Do you really want to delete it?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>
		
		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleCloses" top='20%'>
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
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				dialogVisible: false,
				dialogVisibles: false,
				value1: "",
				test: '010101',
				formInline: {
					search: '',
					num: '',
					seek: '',
				},
				value6: [],
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: [{
					name: 11,
					userName: 22,
					chengben: 33,
					dete: '2019-02-03',
					jianjie: '哈哈哈',
					numbe:'',
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

			// this.value6.push(new Date(2019, 1, 1))
			// this.value6.push(new Date(2020, 11, 1))
			this.search()

		},

		methods: {
			
			handleClose(done) {
				this.dialogVisible = false
			},
			handleCloses(done) {
				this.dialogVisibles = false
			},
			
			search() {
				
				this.$api.post('/Design/seekPage', {
					dateEnd: this.value6[1].format("yyyy-MM-dd"),
					dateStart: this.value6[0].format("yyyy-MM-dd"),
					index: parseInt(this.page01) - 1,
					numbe: 10,
					seek: this.formInline.seek,
				}, r => {
					// console.log('0101');
					console.log(r);
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
			
				this.$api.get('/Design/delete/' + this.statusid, null, r => {
					console.log('****************************')
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
					console.log(r);
					this.search()
				});
			},
			suoding_quxiao() {
				this.dialogVisibles = false
			},
			
			// 批次翻頁
			pages02(val) {
				// console.log(val)
				this.page01 = val
				this.search()
			},
			usercreate() {
				this.$router.push("/ShouShixingZeng?type=new")
			},
			// 上載
			shangzai(){
				this.$router.push("/shnagzaitupian")
			},
			// 返回客單
			return_guest() {
				this.$router.push("/CustomerOrderManagement")
			},

			// 詳情
			details(uuid) {
				this.$router.push("/ShouShixingZeng")
			},
			// 复制新客单
			copy(uuid) {
				this.$router.push("/CopyJewelry?uuid=" + uuid)
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
				this.$router.push("/ShouShixingZeng?type=alert&uuid=" + uuid)
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
	
	.selector_form {
		.el-menu--horizontal>.el-submenu .el-submenu__title {
			height: 32px;
			line-height: 32px;
			border-bottom: 2px solid transparent;
			color: #909399;
			border-radius: 3px;
		}
	}
	
</style>

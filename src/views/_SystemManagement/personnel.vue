<template>
	<div class="usermanagement">

		<el-row>
			<!-- <el-col :span="24">
				<div class="grid-content bg-purple-dark" style="background:white;height: 60px;">

					<div class="second_menu">
						<span @click="topage('user')">用戶管理</span>
					</div>

					<div class="second_menu selector">
						<span @click="topage('grounp')">群組管理</span>
					</div>

					<div class="second_menu">
						<span>分行管理</span>
					</div>

				</div>
			</el-col> -->

			<!-- <div style="width: 100%;height: 50px;background-color:  #e9eef3;float: left;"></div> -->


			<template v-if='!hidden'>

				<el-table :data="tableData" style="width: 100%;text-align: center;border-radius: 10px;" :header-cell-style="titlebg">
					<el-table-column prop="nickname" label="Name" >
					</el-table-column>
					<el-table-column prop="identifier" label="User name" >
					</el-table-column>
					<el-table-column prop="mobile" label="Telphone" >
					</el-table-column>
					<div v-if="isshow_add">
							<el-table-column fixed="right" label="Action" width="250">
								<template slot-scope="scope">
									<el-button type="text" size="small" @click='shanchu(scope.row.reference)'>Detele</el-button>
								</template>
							</el-table-column>
					</div>
					
				</el-table>

				<!-- 頁數 -->

				<div style="text-align: center;line-height: 35px;">{{tableData.length}} people</div>

				<!-- <div class="block" style="float: right;margin-top: 30px;">
				  <span class="demonstration"></span>
				  <el-pagination :page-size='8' layout="prev, pager, next" :total="total01" @current-change='pages001' :current-page="page01">
				  </el-pagination>
				</div> -->

			</template>


		</el-row>

		<div>

		</div>

		<div style="width: 100%;text-align: center;">
			<button v-show="isshow_add" class="increase" @click="increases">Add</button>
			<button v-if="isshow_add" class="increase" @click="returns">Return</button>
			<button v-if="!isshow_add" class="increase" @click="returns01">Return</button>
		</div>

		<!-- 刪除提示 -->
		<div class="dialog">
			<el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
				<span>Do you really want to delete this item?？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>


		<!-- 增加成員 -->
		<div v-if='hidden' class="hover" style="background: white;">
			<div class="hover-1">
				Add
			</div>
			<div class="hover-1-1">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item style='float: left;height: 30px;'>
						<el-input v-model="formInline.search" placeholder="Keyword" style='margin-top: 5px;width: 150px;height: 35px;'></el-input>
					</el-form-item>

					<el-form-item @click="query()" style='float:left;margin-right: 0px;width: 100px;'>
						<el-button type="primary" @click="onSubmit()" style='height:42px;width: 130px;border:0;background: rgb(245,93,84);margin-top: 2.5px;'>Search</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="hover-2">
				<div class="hover-2-1">
					<el-table ref="table" height="450" :data="tableData3" tooltip-effect="dark" style="width: 100%;line-height: 0;"
					 @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<!-- <el-table-column v-model="zengjia.riqi" label="日期" width="120">
							<template slot-scope="scope">{{ scope.row.date }}</template>
						</el-table-column> -->

						<el-table-column prop="nickname" label="Name" width="120">
						</el-table-column>
						<el-table-column prop="mobile" label="Telphone" width="120">
						</el-table-column>
						<el-table-column prop="identifier" label="User Name" show-overflow-tooltip>
						</el-table-column>
					</el-table>

					<!-- 增加成員頁數 -->
					<div class="block" style="float: right;margin-top: 10px;">
						<span class="demonstration"></span>
						<el-pagination :page-size='8' layout="prev, pager, next" :total="totalElements" @current-change='pages002'
						 :current-page="page02">
						</el-pagination>
					</div>
					<div class="rong3"></div>
				</div>
			</div>
			<div class="hover-3">
				<a href="#" class="zt" v-on:click="queding()">OK</a>
				<a href="#" class="zt" v-on:click="hover()">Cancel</a>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "CustomentManagement",
		data() {
			return {
				titlebg: {
					'background': 'rgb(216,214,215)',
					'color': 'black'
				},
				uuid: '',
				value1: "",
				test: '010101',
				dialogVisible: false,
				hidden: '',
				sum: 10,
				total01: 1,
				page01: 1,
				page02: 1,
				totalElements: 1,
				stateid: '',
				formInline: {
					search: '',
					num: ''
				},
				isshow_add:true,
				tableData: [],
				tableData3: [],
				multipleSelection:[],
				
				
				
			}
		},
		created: function() {

			this.uuid = this.$route.query.uuid
			
			if(this.$route.query.type=='detail'){
				this.isshow_add=false
			}
			
			//console.log('--------+++' + this.uuid)
			this.search();

			// this.get_select()

		},
		methods: {
			handleClose(done) {
				this.dialogVisible = false
			},

			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.table.toggleRowSelection(row);
					});
				} else {
					this.$refs.table.clearSelection();
				}
			},


			onSubmit() {

			},

			search(uuid) {
				//console.log("---------------")
				

				this.$api.get('/PlvKGroupEndpoint/seekReference/' + this.uuid, null, r => {
					// console.log(r)
					this.tableData = r.plvkMemberEntitList
					this.total01 = r.totalElements
					
					
					
					
					this.$api.post('/PlvKRoleEndpoint/seekPageMember/'+this.uuid, {
						"index": parseInt(this.page02) - 1,
						"numbe": 8,
						"seek": this.formInline.search,
					}, r => {
						
						// console.log('----群成員添加')
						// console.log(r)
						this.tableData3 = r.content;
						this.totalElements = r.totalElements
						// this.select_update()
					});
					
					
				});
				
				
			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},

			pages01(val) {
				// //console.log(val)
				this.page01 = val
				this.search()
			},

			pages001(val) {
				// //console.log(val)
				this.page01 = val
				this.search()
			},

			pages002(val) {
				// //console.log(val)
				this.page02 = val
				this.search()
				
			},


			// 刪除
			shanchu(id) {
				this.dialogVisible = true
				this.stateid = id
				// //console.log(this.stateid)
				// this.search(this.uuid)
			},

			// 增加成員
			increases() {
				this.hidden = true
				// this.select_update()
			},
			
			// select_update(){
			// 	var that=this
			// 	this.$nextTick(function(){
			// 		for (let i = 0; i < that.tableData.length; i++) {
			// 			
			// 			for (let j = 0; j < that.tableData3.length; j++) {
			// 				if(that.tableData[i].reference==that.tableData3[j].reference){
			// 					that.$refs.table.toggleRowSelection(that.tableData3[j]);
			// 				}
			// 			}
			// 			
			// 			
			// 		}
			// 		
			// 	})
			// },

			hover() {
				this.hidden = false
			},
			queding() {
				
				this.hidden = false
				// this.uuid = uuid
				this.$api.post('/PlvKGroupEndpoint/saveGroupMember', this.userIdLists , r => {
					// //console.log(r)
					// this.search();
					//console.log('------------------------------：：：：' + this.uuid)
					this.search(this.uuid)
					
				});


				// this.search()
			},

			cancel_detele() {
				this.dialogVisible = false
			},

			// 刪除確定
			confirm_detele() {
				
				//console.log('0.0.0.0.')
				
				this.dialogVisible = false

				this.$api.get('/PlvKGroupEndpoint/updateGroupMember/'+this.stateid +'/'+this.uuid, null ,r => {
					// //console.log(r)
					// this.search();
					//console.log('------------------------------：：：：' + this.uuid)
					this.search(this.uuid)
				});
				
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(val)
				this.userIdLists = []
				for (var i = 0; i < val.length; i++) {
					var temp = {
						"groupReference": this.uuid,
						"id": 0,
						"memberReference": val[i].reference,
						"reference": ""
					}
					
					this.userIdLists.push(temp)
					
				}

				// //console.log(this.userIdLists)
			},

			// 批次翻頁
			pages02(val) {
				//console.log(val)
			},
			grounpcreate() {
				this.$router.push("/GroundCreate")
			},
			detail() {
				this.$router.push("/UserCreate?type=detail")
			},
			alert() {
				this.$router.push("/UserCreate?type=alert")
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/UserManagement")
				} else if (type == 'grounp') {
					this.$router.push("/CustomentManagement")
				}
			},
			returns() {
				this.$router.push("/CustomentManagement")
			},
			returns01() {
				this.$router.push("/Tips")
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {
		.dialog {
			line-height: 0
		}

		.return,
		.increase {
			background: rgb(245, 93, 84);
			width: 150px;
			height: 50px;
			border: 0;
			color: white;
			cursor: pointer;
			border-radius: 5px;
			font-size: 16px;
			margin-left: 50px;
			margin-top: 50px
		}


		.act_block {
			width: 95%;
			margin-left: 2.5%;
			line-height: 20px;
			text-align: left;
			background: white;
			padding-bottom: 10px;
			border-bottom: 1px solid #BBBBBB;

			.title {
				line-height: 40px
			}
		}

		.block {
			line-height: 0;

			.el-main {
				line-height: 0
			}
		}

		.el-table--enable-row-transition {
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

		.el-table--enable-row-transition {
			// height: 525px;
		}


		.hover {
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			width: 1000px;
			position: absolute;
			top: 150px;
			left: 25%;
			display: block;
			// background-color: lightgray;
			z-index: 1000;
		}

		.hover-1 {
			height: 50px;
			width: 500px;
			float: left;
			text-align: left;
			line-height: 50px;
			font-size: 20px;
			// color: white;
			margin-left: 80px;
		}

		.hover-1-1 {
			height: 50px;
			width: 420px;
			float: right;
			text-align: left;
			line-height: -20px;
			font-size: 20px;
			// color: white;
			// margin-left: 80px;
			// background-color: burlywood;
		}

		.hover-2 {
			height: 450px;
			width: 1000px;
			float: left;
			// background-color: lightgrey;
			border-top: 2px solid lightgrey;
			border-bottom: 2px solid lightgrey;
		}

		.hover-2-1 {
			height: 50px;
			width: 900px;
			margin: 0 auto;
			background-color: white;

			.el-main {
				line-height: 0
			}

		}

		.hover-3 {
			// height: 115px;
			margin: 100px 0 20px 0;
			width: 500px;
			float: right;
			text-align: left;
		}

		.zt {
			margin-left: 150px;
			font-size: 16px;
			color: darkcyan;
			text-decoration: none;
			text-align: left;
		}

	}
</style>

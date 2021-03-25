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
								<el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<!-- <el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.search" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
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
		<div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData" height="620" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<el-table-column prop="groupName" label="Group" row-style='background:red'>
					</el-table-column>
					<el-table-column prop="personInCharge" label="handler">
					</el-table-column>
					<el-table-column prop="phone" label="handler Tel">
					</el-table-column>

					<div class="action">
						<el-table-column fixed="right" label="Action" style='background:. red;'>
							<template slot-scope="scope">
								<div style="white-space: nowrap;">
									<!-- <el-button @click="activity()" type="danger" size="small">Activity</el-button> -->
									<el-button @click="parsonnel(scope.row.reference)" type="danger" size="small">Management</el-button>
									<el-button @click="grounpcreate(scope.row.reference)" type="danger" size="small">Modify</el-button>
									<el-button @click="shanchu_detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
								</div>
									<!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
							</template>
						</el-table-column>
					</div>

				</el-table>
			</div>

			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages01'
				 :current-page="page01">
				</el-pagination>
			</div>

		</div>

		<!-- 賬號密碼錯誤彈窗 -->
		<div class="dialog">
			<el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" top='20%'>
				<span>Do you really want to delete this item?</span>
				<span slot="footer" class="dialog-footer">
					<!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>


	</div>

</template>

<script>
	export default {
		name: "CustomentManagement",
		data() {
			return {
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				page01:1,
				totalElements: 0,
				value1: "",
				test: '010101',
				group_dalete:false,
				dialogVisible: false,
				statusid:'',
				uuid:'',
				formInline: {
					search: '',
					num: '',
					seek:'',
				},
				tableData: []
			}
		},

	created: function() {
		this.search();
		// this.get_select()
		// this.$api.get('recycle/getRecycleAll?Page=1&&Size=5&&name=Ska',
		// 			null, r => {
		// 				//console.log('0101');
		// 				//console.log(r);
		//
		// 			});
	},

	methods: {

    indexMethod(index) {
      return ((parseInt(this.page01) - 1) * (parseInt(this.sum)) + index + 1);
    },


		handleClose(done) {
			this.dialogVisible=false
		},

		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},

		onSubmit() {

		},

		search(){
			this.$api.post('/PlvKGroupEndpoint/seekPage',{
				"index": parseInt(this.page01) - 1,
				"numbe": 10,
				"seek": this.formInline.seek,
			}, r => {
				//console.log(r)
				// this.search()
				this.tableData = r.content
				this.totalElements = r.totalElements
				this.sum = r.size
			});
		},

		// 批次翻頁
		pages02(val) {
			//console.log(val)
		},

		pages01(val) {
			// //console.log(val)
			this.page01 = val
			this.search()
		},

		// 人員管理翻頁
		pages001(val) {
			//console.log(val)
			this.page01 = val
			this.search()
		},

		grounpcreate(uuid){
			// //console.log('---'+type);
			this.$router.push("/GroundCreate?type=alert&uuid="+uuid)
			// this.$router.push("/SystemManagement/parsonnel")
		},

		usercreate(){
			this.$router.push("/GroundCreate?type=new")
		},

		detail(){
			this.$router.push("/UserCreate?type=detail")
		},

		parsonnel(uuid){
			// //console.log('-----------'+'hahhahahh')
			this.$router.push("/personnel?uuid="+uuid)
		},

		alert(){
				this.$router.push("/UserCreate?type=alert")
		},

// 		create(uuid){
// 			this.$router.push("/SystemManagement/GroundCreate?type=create&uuid="+uuid)
// 		},
// 		alert(uuid){
// 			this.$router.push("/SystemManagement/GroundCreate?type=alert&uuid="+uuid)
// 		},

		topage(type){
			if(type=='user'){
				this.$router.push("/SystemManagement/UserManagement")
			}else if(type=='branch'){
				this.$router.push("/SystemManagement/branchManagement")
			}
		},

		activity(){
			this.$router.push("/activity")
		},

		// 刪除
		shanchu_detele(uuid){
			this.dialogVisible = true
			this.statusid = uuid
		},

		cancel_detele(){
			this.dialogVisible = false
		},

		// 確定刪除
		confirm_detele(){
			this.dialogVisible = false
			this.$api.get('/PlvKGroupEndpoint/delete/'+ this.statusid , null , r => {
					//console.log('****************************')
					this.search();
			});
		},


	},

	}
</script>

<style lang="scss">

	@import '../../assets/styles/variable';

	// 	.reservemanagement{
	//
	// 	}




// 	.has-gutter {
// 		line-height: 30px
// 	}


	.CustomentManagement{

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
			height: 48px;
			font-size: 21px;
			padding: 0 10px;
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

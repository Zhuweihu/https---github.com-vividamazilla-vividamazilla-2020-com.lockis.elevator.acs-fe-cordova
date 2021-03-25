
<template>

	<div class="reservemanagement">




		<div style="padding: 0 0;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">

						<div  style="width: 300px;margin-left: 0;float: left;">
							<el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date" placeholder="select date"
							 style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
						</div>
						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<!-- <el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item> -->
								<el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit" style='margin-left: 15px;height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Search</el-button>
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
		<div style="border-radius: 10px;background: white;height: 725px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
				<el-table :data="tableData" height="676px" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>

          <el-table-column prop="id" label="Id" width="80px" >
          </el-table-column>


          <el-table-column prop="customer.customeName" label="Customer" row-style='background:red' width="150px" >
          </el-table-column>
					<el-table-column prop="channel" label="Channel" row-style='background:red' width="150px" >
					</el-table-column>
					<el-table-column prop="context" label="Content">
					</el-table-column>
					<!-- <el-table-column prop="communicationDate" label="Date">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{new Date(scope.row.communicationDate).format("yyyy-MM-dd")}}</span>
						</template>
					</el-table-column> -->
					<!-- <el-table-column prop="achievement" label="Achievement">
					</el-table-column> -->
					<!-- <el-table-column prop="explain" label="Remark">
					</el-table-column> -->
					<div class="action">
						<el-table-column fixed="right" label="Action" style='background: red;' width="150" align='center' :cell-style='"text-align:center"' >
							<template slot-scope="scope" >
								<div style="white-space: nowrap;">
									<!-- <el-button type="danger" size="small" @click='detail(scope.row.reference)'>Detail</el-button> -->
									<el-button type="danger" size="small" @click='modify(scope.row.customer.customeName,scope.row.customer.reference,scope.row.reference)'>Modify</el-button>
									<!-- <el-button type="danger" size="small" @click='detele(scope.row.reference)'>Detele</el-button> -->
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


<!-- <template>
	<div class="usermanagement">

		<div class="titles">
			<div class="second_title" v-model="thelog">
				<span style="margin-left: 50px; color: green;">搜索條件:xxx</span>
				<span style="margin-left: 200px; color: green;">手機:xxx</span>
			</div>
			<el-button class='but' type="primary" @click="usercreate()" style='width: 112px;border:0;background-color: rgb(245, 93, 84);float: right;margin-top: 6.5px;margin-right: 40px;'>新增日志</el-button>
		</div>

		<div class="search">
			<div style="margin-top:25px;">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item style='float: left;'>
						<el-input v-model="formInline.seek" placeholder="輸入關鍵字" style='margin-left: 20px;width: 256px;'></el-input>
					</el-form-item>
					<el-form-item style='float:right;margin-right: 40px;'>
						<el-button type="primary" @click="onSubmit()" style='height:40px;width: 112px;border:0;background: rgb(245,93,84);'>搜索</el-button>
					</el-form-item>

					<el-form-item label='每頁顯示' style='float:right;'>
						<el-select style='height: 48px;width: 102px;' v-model="formInline.num" placeholder="數字">
							<el-option label="5" value="5"></el-option>
							<el-option label="6" value="6"></el-option>
							<el-option label="7" value="7"></el-option>
							<el-option label="8" value="8"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
		</div>

		<div>

			<div style="padding-bottom: 40px;background: white;border-top: 5px solid #e0e0e0;margin-top: 20px;height: 560px;">
				<el-table :data="tableData" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 520px;">
					<el-table-column prop="communicationType" label="通訊方式">
					</el-table-column>
					<el-table-column prop="communication" label="通訊内容">
					</el-table-column>
					<el-table-column prop="communicationDate" label="通訊日期">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.communicationDate).format("yyyy-MM-dd hh:mm")}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="achievement" label="效果">
					</el-table-column>
					<el-table-column prop="explain" label="備注">
					</el-table-column>
					<el-table-column fixed="right" label="" width="240">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click='detail(scope.row.reference)'>詳情</el-button>
							<el-button type="text" size="small" @click='modify(scope.row.reference)'>修改</el-button>
							<el-button type="text" size="small" @click='detele(scope.row.reference)'>刪除</el-button>
						</template>
					</el-table-column>

				</el-table>

				<div class="block" style="float: right;margin-top: 10px;">
					<el-pagination :page-size='sum' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
					 :current-page="page01">
					</el-pagination>
				</div>

			</div>

		</div>

		<div class="tishi">
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
				<span>確認刪除嗎？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">取 消</el-button>
					<el-button type="primary" @click="confirm_detele()">确 定</el-button>
				</span>
			</el-dialog>
		</div>

		<div style="margin: 0 auto;">
			<el-button class='but' type="primary" @click="cancel()" style='width: 200px;border:0;background-color: rgb(245, 93, 84);float: right;margin-right: 50%;height: 50px;margin-top:30px;'>返回</el-button>
		</div>
	</div>

</template> -->

<script>
	export default {
		name: "UserManagement",
		data() {
			return {
        customer_name:"",
        type:false,
				titlebg:{
					'background':'rgb(216,214,215)',
					'color':'black'
				},
				id:'',
        dateTwo:[],
				dialogVisible:false,
				test: '010101',
				uuid:'',
				formInline: {
					search: '',
					num: '5',
					seek:'',
				},
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: []
			}


		},

		created: function() {

      var today = new Date();
      var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 365;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码


      this.dateTwo.push(today)
      this.dateTwo.push(new Date())

			this.uuid = this.$route.query.uuid
      this.customer_name = this.$route.query.customer_name

      // if(this.$route.query.type=="isMenu"){
      //   this.type=true
      // }

      if(this.uuid==""||this.uuid==undefined){
        this.type=true
      }

			console.log('---')
			console.log(this.uuid)
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

        if(this.type){

          // POST /customer/conversation/{from}/{to}/{page}/{size}

          this.$api.get('/customer/conversation/count',{}, r => {
          	console.log('++++++++++++')
          	console.log(r)
          	// this.tableData = r
          	this.totalElements = r
          	// this.sum = r.size
          });

          this.$api.post('/customer/conversation/' +this.dateTwo[0].format("yyyy-MM-dd")+'/'+this.dateTwo[1].format("yyyy-MM-dd")+'/'+(parseInt(this.page01) - 1)+'/11',{}, r => {
          	console.log('++++++++++++')
          	console.log(r)
          	this.tableData = r
          	// this.totalElements = r.totalElements
          	// this.sum = r.size
          });

        }else{

          this.$api.get('/customer/conversation/'+this.uuid+'/count',null, r => {
          	console.log('++++++++++++')
          	console.log(r)
          	// this.tableData = r
          	this.totalElements = r
          	// this.sum = r.size
          });

          this.$api.get('/customer/conversation/' + this.uuid+'/'+this.dateTwo[0].format("yyyy-MM-dd")+'/'+this.dateTwo[1].format("yyyy-MM-dd")+'/'+(parseInt(this.page01) - 1)+'/11',null, r => {
          	console.log('++++++++++++')
          	console.log(r)
          	this.tableData = r
          	// this.totalElements = r.totalElements
          	// this.sum = r.size
          });

        }





				// this.$api.get('/customer/log/' + this.uuid+'/'+(parseInt(this.page01) - 1)+'/11',null, r => {
				// 	console.log('++++++++++++')
				// 	console.log(r)
				// 	this.tableData = r
				// 	this.totalElements = r.totalElements
				// 	this.sum = r.size
				// });
			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},
			// 查看
// 			check(uuid){
// 				this.$router.push("/SystemManagement/KedanXinzeng?type=alert&uuid=" + uuid)
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
					console.log(r)
					this.search()
// 					this.tableData3 = r.content;
// 					this.totalElements = r.totalElements
				});
			},
			// 批次翻頁
			pages02(val) {
				// console.log(val)
				this.page01 = val
				this.search()
			},
			usercreate() {


        if(this.type){
          this.$router.push("/NewLogs?type=isMenu")
        }else{
          this.$router.push("/NewLogs?uuid=" + this.uuid+'&customer_name='+this.customer_name)
        }

			},

			detail(uuid) {
				this.$router.push("/NewLogs?type=detail&uuid=" + uuid)
			},
			modify(customer_name,customer_reference,uuid) {

        // if(this.type){
        //   this.$router.push("/NewLogs?type=isMenu")
        //   this.$router.push("/NewLogs?type=alert&uuid=" + this.uuid+'&id='+uuid)
        // }else{
        //   this.$router.push("/NewLogs?type=alert&uuid=" + this.uuid+'&id='+uuid)
        // }
        this.$router.push("/NewLogs?type=alert&uuid=" + customer_reference+'&id='+uuid+'&customer_name='+customer_name)

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



<template>

	<div class="reservemanagement">

		<div style="padding: 0 0;">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark" style="height: 40px;">


						<div>
							<el-form :inline="true" :model="formInline" class="demo-form-inline">
								<el-form-item style='float: left;height: 40px;' class='search'>
									<el-input v-model="formInline.seek" placeholder="Name" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
								</el-form-item>
								<el-form-item style='float:left;height: 35px;'>
									<el-button type="primary" @click="onSubmit" style='height:40px;border:0;background: rgb(5,120,209);padding: 0 10px;'>Search</el-button>
								</el-form-item>
								<!-- <el-form-item style='float:right;'>
									<el-button type="primary" @click="shangzai" style='height:35px;width: 112px;border:0;background: rgb(5,120,209);margin-top: 2.5px;'>Upload</el-button>
								</el-form-item> -->
                <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;line-height: 40px;float: left;">Supplier</div> -->
								<el-form-item style='float:right;'>
									<el-button type="primary" @click="usercreate" style='height:40px;padding:  0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>



		<!-- 庫存列表 -->
  <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;line-height: 40px;">Supplier</div> -->
  <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;line-height: 40px;height: 40px;"></div> -->
		<div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
			<div>
				<!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
				<!-- highlight-current-row -->
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

					<el-table-column prop="name" label="Name">
            <template slot-scope="scope">
            	<span style="text-decoration: underline;cursor: pointer;" @click="to_invoice(scope.row.reference)" >{{scope.row.name}}</span>
            </template>
					</el-table-column>
					<!-- <el-table-column prop="identityCard" label="身份証">
					</el-table-column> -->
					<!-- <el-table-column prop="name" label="密碼">
					</el-table-column> -->
					<!-- <el-table-column prop="name" label="Email">
					</el-table-column> -->
					<!-- <el-table-column prop="address" label="地址">
					</el-table-column> -->
					<el-table-column prop="contact" label="Contact">
					</el-table-column>
					<el-table-column prop="addr" label="Addr">
					</el-table-column>



					<el-table-column prop="activated" label="Jurisdiction">
						<template slot-scope="scope">
							<span>{{scope.row.enable == 1 ? "Yes" : "No"}}</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right"  align='center' label="Action" width="300">
						<template slot-scope="scope" >
							<!-- <el-button  @click="details(scope.row.reference)" type="danger" size="small">Authority</el-button> -->

							<!-- <el-button @click="assign(scope.row.reference)" type="danger" size="small">Assign</el-button> -->


              <!-- <el-button  type="danger" size="small">products</el-button> -->
              <el-button @click="alert(scope.row.reference,scope.row.name,scope.row.contact,scope.row.addr,scope.row.enable)" type="danger" size="small">Modify</el-button>
							<el-button @click="Delete(scope.row.reference)" type="danger" size="small">Delete</el-button>


						</template>
					</el-table-column>
				</el-table>
			</div>

			<div class="block" style="float: right;margin-top: 10px;">
				<el-pagination :page-size='sum' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
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
			<el-dialog title="" :visible.sync="dialogVisible_group" width="30%" :before-close="handleClose_group" top='20%'>
				<span>Group change:&nbsp;</span>

				<el-select v-model="options" filterable placeholder="Select">
					<el-option
					  v-for="item in options_list"
					  :key="item.name"
					  :label="item.name"
					  :value="item.reference">
					</el-option>
				 </el-select>


				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_state()">NO</el-button>
					<el-button type="primary" @click="confirm_state()">YES</el-button>
				</span>
			</el-dialog>
		</div>



		<div class="tishi">
			<el-dialog title="" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
				<span>Delete it？</span>
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
				delete_id:'',
				dialogVisible: false,
				dialogVisibles: false,
				dialogVisible_group:false,
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
				tableData: [],
				options:'',
				options_list:[],
				member_reference:''

			}


		},

		created: function() {



			// this.$api.get('/invoice/suppliers/count',null, r => {
			//
			// 	this.totalElements = r
			//
			// });








// 			this.value6.push(new Date(2019, 1, 1))
// 			this.value6.push(new Date(2020, 11, 1))
			this.search()

		},

		methods: {


      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1) ;
      },

      to_invoice(search_supplier){

        this.$router.push("/DailyExpenditureinvoiceManagement?search_supplier="+search_supplier)

      },

			Delete(uuid){

				this.delete_id=uuid
				this.dialogVisibles=true

			},

			confirm_state(){

				this.$api.put('/member/'+this.member_reference+'/group/'+this.options+'/assign',null, r => {

					this.search()
					this.dialogVisible_group=false

				});

				// /member/{reference}/group/{group}/assign

			},

			cancel_state(){
				this.dialogVisible_group=false
			},

			assign(uuid){
				this.dialogVisible_group=true
				this.member_reference=uuid
			},

			handleClose(done) {
				this.dialogVisible = false
			},
			handleClose(done) {
				this.dialogVisibles = false
			},

			handleClose_group(){

				this.dialogVisible_group = false

			},

			search() {

				this.loaing_table=false
				this.tableData=[]



// 				this.$api.get('/invoice/suppliers',null, r => {
//
// 					console.log('----------------');
// 					console.log(r);
// 					this.tableData = r;
// 					this.loaing_table=true
//
// 				});

        this.$api.get('/factory/count',
        {
          "name": this.formInline.seek==""?null:this.formInline.seek,
        }
        , r => {

          console.log('/*-')
          console.log(r)
					this.totalElements = r

				});

         this.$api.post('/invoice/suppliers/'+'1970-01-01'+'/'+new Date().format("yyyy-MM-dd")+'/'+(this.page01-1)+'/10',
        {
          "name": this.formInline.seek==""?null:this.formInline.seek,
        }
        , r => {

          console.log('*-----*')
          console.log(r)
          this.tableData = r;
          this.loaing_table=true
        	// this.totalElements = r

        });

				// this.$api.get('/member/'+(this.page01-1)+'/10',null, r => {
				//
				// 	console.log('----------------');
				// 	console.log(r);
				// 	this.tableData = r;
				// 	this.loaing_table=true
				//
				// });
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
				this.$api.delete('/invoice/supplier/'+this.delete_id+'/purge', null, r => {
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
				this.$router.push("/SupplierCreate?type=new")
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
				this.$router.push("/Add_Permission?uuid="+uuid)
			},


// 			kedan() {
// 				this.$router.push("/SystemManagement/CustomerOrderManagement")
// 			},
			chengping() {
				this.$router.push("/SystemManagement/CustomerList")
			},


// 			details(uuid) {
// 				this.$router.push("/ShouShixingZeng?type=detail&uuid=" + uuid)
// 			},
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

			detail(uuid) {
				this.$router.push("/UserCreate?type=detail&uuid=" + uuid)
			},
			alert(uuid,name,contact,addr,enable) {


				this.$router.push("/SupplierCreate?type=alert&uuid=" + uuid+'&name='+name+'&contact='+contact+'&addr='+addr+'&enable='+enable)
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

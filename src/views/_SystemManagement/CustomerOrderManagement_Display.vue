
<template>

	<div class="reservemanagement" style="white-space: nowrap;height: 800px;"  >
		
		<div style="padding: 0 0;">
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
								<!-- <el-form-item style='float:left;height: 35px;'>
									<el-select v-model="status_list" placeholder="select" style="float: left;width: 100%;" @change="change_list()" >
										
										<el-option label="Order" value="order"></el-option>
										<el-option label="Display" value="display"></el-option>
										<el-option label="Maintenance" value="maintenance"></el-option>
									</el-select>
								</el-form-item> -->
								<div style="font-size: 18px;font-weight: bold;padding-left: 20px;height: 40px;line-height: 40px;float: left;">Display Item</div>
								<el-form-item style='float:right;'>
									<el-button type="primary" @click="usercreate" style='height:40px;width: 112px;border:0;background: rgb(5,120,209);'>New</el-button>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		
		
		<!-- 庫存列表 -->
		<!-- <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Sales Order</div> -->
		<div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
			<div>
				<el-table el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;margin-bottom: 10px;height: 619px;border-radius: 10px;" row-key="id">
					
					<template slot="empty" v-if="loaing_table">
						<span>Opps! No records yet</span>
					</template>
					
					<template slot="empty" v-if="!loaing_table">
						<i class="el-icon-loading"></i>
						<span>Loading...</span>
					</template>
					
					<!-- <el-table-column type="index" >
					</el-table-column> -->
					
					<el-table-column prop="id" label="Id" >
					</el-table-column>
					
					<el-table-column prop="salesNo" label="Sales No" >
					</el-table-column>
					
					<el-table-column label="Customer" >
						<template slot-scope="scope">
							<span>{{scope.row.customer1==null?'':scope.row.customer1.customeName}}{{scope.row.customer2==null?'':'/'+scope.row.customer2.customeName}}</span>
						</template>
					</el-table-column>
					
					<el-table-column prop="totalNet" label="Total Net" >
					</el-table-column>
					
					<el-table-column prop="dateDeliveried" label="Deliveried Date" >
						
						
					</el-table-column>
					<el-table-column prop="dateCollection" label="Collection Date" >
					</el-table-column>
					
					<!-- <el-table-column prop="plvKProductEntityList[0].size1" label="尺寸">
					</el-table-column> -->
					<!-- <el-table-column prop="plvKProductEntityList[0].totalPrice" label="Total price" >
					</el-table-column> -->
					<el-table-column prop="status" label="Status" >
						<template slot-scope="scope">
							<el-button @click="Processing(scope.row.reference,scope.row.name)" type="text" size="small" data-id='0101'>{{scope.row.status==null?'Click to Change':scope.row.status.text}}</el-button>
							<!-- <span v-if='scope.row.onLock==1' type="text" size="small">{{scope.row.status}}</span> -->
						</template>
					</el-table-column>
					
					<el-table-column fixed="right" label="Action" width="300px" align='center' :cell-style='"text-align:center"' >
						<template slot-scope="scope">
							<div class="selector_form" style="width: 200px;margin: 0 auto;">
							
							<!-- <el-button  @click="revision(scope.row.plvKGuestBillcol)" type="danger" size="small">Revision</el-button> -->
							<!-- <el-button  @click="warranty(scope.row.plvKGuestBillcol)" type="danger" size="small">Guarantee</el-button> -->
							<el-button style='float: left;'  @click="details(scope.row.reference)" type="danger" size="small">Detail</el-button>
							<!-- <el-button  @click="copy(scope.row.plvKGuestBillcol)" type="danger" size="small">copy</el-button> -->
							<!-- <el-button v-if='scope.row.onLock==0' @click="modify(scope.row.plvKGuestBillcol)" type="danger" size="small">Alter</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Alter</el-button> -->
							<!-- <el-button v-if='scope.row.onLock==0' @click="lock(scope.row.reference)" type="danger" size="small">Lock</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Lock</el-button> -->
							<!-- <el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Delete</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Delete</el-button> -->
							<!-- <el-button v-if='scope.row.onLock==0' @click="send(scope.row.plvKGuestBillcol)" type="danger" size="small">Inlay Order</el-button>
							<el-button v-if='scope.row.onLock==1'  type="info" size="small" style='background-color: gray;'>Inlay Order</el-button> -->
						
							<el-menu style='margin-left: 10px;float: left;padding: 0;height: 32px;border-radius: 3px;'
							 class="el-menu-demo" mode="horizontal" background-color="rgb(245,108,108)" text-color="#fff"
							 active-text-color="#fff">
							
								<el-submenu index="1">
									<template slot="title" style="line-height: 32px;height: 32px;line-height: 32px;border-bottom: 2px solid transparent;color: #909399;border-radius: 3px;padding: 0 5px;">Functions</template>
									
									<!-- <el-menu-item  index="2-1" @click="revision(scope.row.plvKGuestBillcol)">Revision</el-menu-item> -->
									<!-- <el-menu-item  index="2-2" @click="warranty(scope.row.plvKGuestBillcol)" >Guarantee</el-menu-item> -->
									<!-- <el-menu-item  index="2-3" @click="copy(scope.row.plvKGuestBillcol)" >Copy</el-menu-item> -->
									
									<!-- <el-menu-item v-if='scope.row.onLock==1' index="2-4" style='color: #8C939D;'>Alter</el-menu-item> -->
									<!-- <el-menu-item v-if='scope.row.onLock==0' index="2-5" @click="lock(scope.row.reference)">Lock</el-menu-item> -->
									<!-- <el-menu-item v-if='scope.row.onLock==1' index="2-5" style='color: #8C939D;'>Lock</el-menu-item> -->
									<!-- <el-menu-item v-if='scope.row.onLock==0' index="2-6" @click="detele(scope.row.reference)">Delete</el-menu-item> -->
									<!-- <el-menu-item v-if='scope.row.onLock==1' index="2-6" style='color: #8C939D;'>Delete</el-menu-item> -->
									
									<!-- <el-menu-item  index="2-1" @click="modify(scope.row.reference)">Alter</el-menu-item> -->
									<el-menu-item  index="2-2" @click="invoice(scope.row.reference)">Invoice</el-menu-item>
									 <el-menu-item  index="2-2" @click="send(scope.row.reference)">Create Factory Order</el-menu-item>
									 <el-menu-item  index="2-2" @click="maintenance(scope.row)">Maintenance</el-menu-item>
									 <!-- <el-menu-item  index="2-2" @click="maintenance(scope.row.reference)">Maintenance</el-menu-item> -->
									<!-- <el-menu-item v-if='scope.row.onLock==1' index="2-7" style='color: #8C939D;'>Inlay Order</el-menu-item> -->
									<!-- <el-menu-item index="2-2">选项2</el-menu-item>
									<el-menu-item index="2-3">选项3</el-menu-item> -->
								</el-submenu>
							
							</el-menu>
						
						</div>
						</template>
					</el-table-column>
					
				</el-table>
			</div>
			
			<div class="block" style="float: right;">
				<el-pagination :page-size='sum' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
				 :current-page="page01">
				</el-pagination>
			</div>
			
		</div>
		
		<div class="tishi">
			<el-dialog title="" :visible.sync="dialogVisible_state" width="30%" :before-close="handleClose_state" top='20%'>
				<span>Status change:&nbsp;</span>
				
				<!-- <el-select v-model="options" placeholder="Select" style="border-radius: 8px;height: 20px;width: 150px;text-align: center;">
					<el-option label="已起貨" value="已起貨"></el-option>
					<el-option label="起貨期" value="起貨期"></el-option>
				</el-select> -->
				
				<el-select v-model="options" filterable placeholder="Select">
					<el-option
					  v-for="item in options_list"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				
				<!-- <el-autocomplete class="mat20 inputs01" v-model="options" :fetch-suggestions="querySearch_options"
				 placeholder="Input" @select="handleSelect_options" style="border-radius: 8px;height: 20px;width: 200px;text-align: center;"></el-autocomplete> -->
				
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_state()">NO</el-button>
					<el-button type="primary" @click="confirm_state()">YES</el-button>
				</span>
			</el-dialog>
		</div>
		
		<!-- 選擇保修item -->
		<el-dialog
		  title="Select Product"
		  :visible.sync="select_item"
		  width="70%"
		  :before-close="handleClose_select">
		  <div >
		  	<el-table :data="tableData02" height="650" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
				
				<template slot="empty">
					<span>Opps! No records yet</span>
				</template>
		  		<el-table-column  type="index"  row-style='background:red'  >
		  		</el-table-column>
		  		
				<el-table-column prop="sales" label="Sales" >  
				</el-table-column>
				
				<el-table-column prop="product.name" label="Product" >  
				</el-table-column>
				
				<el-table-column prop="description" label="Item" >  
				</el-table-column>
				
				<el-table-column prop="priceTotal" label="Discount" >  
				</el-table-column>
				
				<el-table-column prop="priceNet" label="Net Amount" >  
				</el-table-column>
				
				
		  		<!-- <el-table-column prop="weight" label="pictury" >
		  			<template slot-scope="scope">
		  				<img style="height: 50px;" :src="root+'/kernal/asset/'+scope.row.photo.reference" />
		  			</template>
		  		</el-table-column> -->
		  		
		  		<!-- <el-table-column prop="codeDesign" label="Design code" >  
		  		</el-table-column> -->
		  		<!-- <el-table-column prop="codePro" label="Product code" >  
		  		</el-table-column> -->
		  		
		  		<div class="action">
		  			<el-table-column fixed="right" label="Action" style='background: red;' width="100px" >
		  				<template slot-scope="scope">
		  					<div style="white-space: nowrap;">
		  						
		  						<el-button @click="Select(scope.row.reference)" type="danger" size="small" >Select</el-button>
		  					</div>
		  				</template>
		  			</el-table-column>
		  			
		  		</div>
		  		
		  	</el-table>
		  </div>  
		</el-dialog>
		
		
		<!-- 賬號密碼錯誤彈窗 -->
		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisible_detele" width="30%" :before-close="handleClose_detele" top='20%'>
				<span>Do you really want to delete it?</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">Cancel</el-button>
					<el-button type="primary" @click="confirm_detele()">OK</el-button>
				</span>
			</el-dialog>
		</div>
		
		<div class="tishi">
			<el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
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
				options:'',
				status_list:'display',
				options_list:[],
				value: '',
				dialogVisible_state: false,
				dialogVisible_detele: false,
				dialogVisibles: false,
				all_loading:false,
				select_item:false,
				loaing_table:false,
				// reserve_Processing: false,
				reserve_lock: false,
				value1: '',
				value2: '',
				value6: [],
				test: '010101',
				formInline: {
					search: '',
					num: '2',
					seek: ''
				},
				formLabelAlign:[],
				sum: 10,
				totalElements: 0,
				page01: 1,
				tableData: [],
				tableData02:[],
				maintenance_formInline:''
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
			
			
			
			this.$api.get('/miscellaneous/orderstatus', null, r => {
				
				for (let i = 0; i < r.length; i++) {
					this.options_list.push({value:r[i].reference,label:r[i].text})
				}
				
				
				console.log(r)

			});
			
			// this.value6.push(new Date(2019, 1, 1))
			// this.value6.push(new Date(2020, 11, 1))
			this.search()


		},

		methods: {
			
			change_list(){
				this.search()
			},
			
			handleClose_select(done) {
				
				this.$confirm('Close？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			 },
			 
			 Select(Reference){
			 	
				console.log('789789--')
				this.maintenance_formInline.maintenance=1
				this.maintenance_formInline.maintain={reference:Reference}
				
				// console.log(this.maintenance_formInline)
				this.select_item=false
				this.$router.push("/MoBangXinZeng?type=maintenance&uuid=" + Reference)
				
				// this.$api.put('/sales/save', this.maintenance_formInline, r => {
				// 	alert('Successful maintaince!')
				// 	this.search()
				// });
			 	
			 },
			 
			//状态情況
			querySearch_options(queryString, cb) {
				this.$api.post('/BillStatus/findAll', null, r => {
					console.log(r)
					var results = []
					for (var i = 0; i < r.length; i++) {
						var temp = {
							"value": r[i].billStatus,
							"reference": r[i].reference,
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},
			
			handleSelect_options(item) {
				this.formLabelAlign.billStatus = item
				
			},
			// 			onSubmit() {
			// 				this.search()
			// 			},
			handleClose_state(done) {
				this.dialogVisible_state = false
			},
			handleClose_detele(done) {
				this.dialogVisible_detele = false
			},
			handleClose(done) {
				this.dialogVisibles = false
			},
			search() {
				this.all_loading=true
				this.page01=1
				
				this.loaing_table=false
				this.tableData=[]
				if(this.status_list=='order'){
					
					
					
					this.$api.get('/sales/count', null, r => {
						
						this.totalElements = r
	
						
					});
					
					this.$api.get('/sales/'+(parseInt(this.page01)-1)+'/10', null, r => {
						console.log('***********************')
						console.log(r);
						// this.totalElements = r.totalElements
						
						
						
						
						this.tableData = r
						
						for (let i = 0; i < this.tableData.length; i++) {
						
							this.tableData[i].dateDeliveried=this.tableData[i].dateDeliveried==null?'': (new Date(this.tableData[i].dateDeliveried).format('yyyy-MMM-dd'))
							this.tableData[i].dateCollection= this.tableData[i].dateCollection==null?'':(new Date(this.tableData[i].dateCollection).format('yyyy-MMM-dd'))
							this.tableData[i].dateBig= this.tableData[i].dateBig==null?'':(new Date(this.tableData[i].dateBig).format('yyyy-MMM-dd'))
							this.tableData[i].dateBuying= this.tableData[i].dateBuying==null?'':(new Date(this.tableData[i].dateBuying).format('yyyy-MMM-dd'))
							this.tableData[i].payment1Date= this.tableData[i].payment1Date==null?'':(new Date(this.tableData[i].payment1Date).format('yyyy-MMM-dd'))
							
							this.tableData[i].payment2Date= this.tableData[i].payment2Date==null?'':(new Date(this.tableData[i].payment2Date).format('yyyy-MMM-dd'))
							
							
						}
						
						
						this.all_loading=false
						this.loaing_table=true
						// this.sum = r.size
						
						// {
						// 	dateEnd: this.value6[1].format("yyyy-MM-dd"),
						// 	dateStart: this.value6[0].format("yyyy-MM-dd"),
						// 	index: parseInt(this.page01) - 1,
						// 	numbe: 10,
						// 	seek: this.formInline.seek,
						// }
						
					});
				}else if(this.status_list=='display'){
					
					this.$api.get('/sales/display/count', null, r => {
						
						this.totalElements = r
						
						
					});
					
					
					this.$api.get('/sales/display/'+(parseInt(this.page01) - 1)+'/10', null, r => {
						console.log('***********************')
						console.log(r);
						// this.totalElements = r.totalElements
						this.tableData = r
						this.all_loading=false
						this.loaing_table=true
						// this.sum = r.size
						
						for (let i = 0; i < this.tableData.length; i++) {
						
							this.tableData[i].dateDeliveried=this.tableData[i].dateDeliveried==null?'': (new Date(this.tableData[i].dateDeliveried).format('yyyy-MMM-dd'))
							this.tableData[i].dateCollection= this.tableData[i].dateCollection==null?'':(new Date(this.tableData[i].dateCollection).format('yyyy-MMM-dd'))
							this.tableData[i].dateBig= this.tableData[i].dateBig==null?'':(new Date(this.tableData[i].dateBig).format('yyyy-MMM-dd'))
							this.tableData[i].dateBuying= this.tableData[i].dateBuying==null?'':(new Date(this.tableData[i].dateBuying).format('yyyy-MMM-dd'))
							this.tableData[i].payment1Date= this.tableData[i].payment1Date==null?'':(new Date(this.tableData[i].payment1Date).format('yyyy-MMM-dd'))
							
							this.tableData[i].payment2Date= this.tableData[i].payment2Date==null?'':(new Date(this.tableData[i].payment2Date).format('yyyy-MMM-dd'))
							
							
						}
						
						// {
						// 	dateEnd: this.value6[1].format("yyyy-MM-dd"),
						// 	dateStart: this.value6[0].format("yyyy-MM-dd"),
						// 	index: parseInt(this.page01) - 1,
						// 	numbe: 10,
						// 	seek: this.formInline.seek,
						// }
						
					});
				}else if(this.status_list=='maintenance'){
					
					this.$api.get('/sales/maintenance/count', null, r => {
						
						this.totalElements = r
						
						
					});
					
					this.$api.get('/sales/maintenance/'+(parseInt(this.page01) - 1)+'/10', null, r => {
						console.log('***********************')
						console.log(r);
						// this.totalElements = r.totalElements
						this.tableData = r
						this.all_loading=false
						this.loaing_table=true
						// this.sum = r.size
						
						for (let i = 0; i < this.tableData.length; i++) {
						
							this.tableData[i].dateDeliveried=this.tableData[i].dateDeliveried==null?'': (new Date(this.tableData[i].dateDeliveried).format('yyyy-MMM-dd'))
							this.tableData[i].dateCollection= this.tableData[i].dateCollection==null?'':(new Date(this.tableData[i].dateCollection).format('yyyy-MMM-dd'))
							this.tableData[i].dateBig= this.tableData[i].dateBig==null?'':(new Date(this.tableData[i].dateBig).format('yyyy-MMM-dd'))
							this.tableData[i].dateBuying= this.tableData[i].dateBuying==null?'':(new Date(this.tableData[i].dateBuying).format('yyyy-MMM-dd'))
							this.tableData[i].payment1Date= this.tableData[i].payment1Date==null?'':(new Date(this.tableData[i].payment1Date).format('yyyy-MMM-dd'))
							
							this.tableData[i].payment2Date= this.tableData[i].payment2Date==null?'':(new Date(this.tableData[i].payment2Date).format('yyyy-MMM-dd'))
							
							
						}
						
						// {
						// 	dateEnd: this.value6[1].format("yyyy-MM-dd"),
						// 	dateStart: this.value6[0].format("yyyy-MM-dd"),
						// 	index: parseInt(this.page01) - 1,
						// 	numbe: 10,
						// 	seek: this.formInline.seek,
						// }
						
					});
				}
				
				
				
				
				// 修訂查詢
				// console.log(this.scope.row.reference)
// 				this.$api.get('/PlvKClientCardEndpoint/seekPlvKClientCard/' + this.tableData.reference, null , r => {
// 					console.log('-------------------------')
// 					console.log(r)
// 				});
			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},

			// 刪除
			detele(uuid) {
				this.dialogVisible_detele = true
				this.statusid = uuid
			},
			cancel_detele() {
				this.dialogVisible_detele = false
			},

			confirm_detele() {
				this.dialogVisible_detele = false

				this.$api.get('/PlvKClientCardEndpoint/delete/' + this.statusid, null, r => {
					console.log('****************************')
					this.search();
				});
			},

			// 狀態
			Processing(id,name) {
				this.dialogVisible_state = true
				this.stateid = id
				this.options = name
				// console.log('----'+id)
			},

			confirm_state(id) {
				this.dialogVisible_state = false
				var format={}
				
				
				
				this.$api.get('/sales/'+this.stateid, format, r => {
					// console.log(r)
					// this.search()
					format=r
					if(format.customer1!=null){
						console.log('01')
						format.customer1.reference=format.customer1.reference
					}else{
						format.customer1=null
					}
					
					if(format.customer2!=null){
						console.log('02')
						format.customer2.reference=format.customer2.reference
					}else{
						format.customer2=null
					}
					
					format.status={reference:this.options}
					
					console.log('+++++++')
					console.log(format)
					
					if(format.dateBig==''||format.dateBig==null){
						
					}else{
						format.dateBig=new Date(format.dateBig).format('yyyy-MM-dd')
					}
					
					if(format.dateBuying==''||format.dateBuying==null){
						
					}else{
						format.dateBuying=new Date(format.dateBuying).format('yyyy-MM-dd')
					}
					
					if(format.dateCollection==''||format.dateCollection==null){
						
					}else{
						format.dateCollection=new Date(format.dateCollection).format('yyyy-MM-dd')
					}
					
					if(format.dateDeliveried==''||format.dateDeliveried==null){
						
					}else{
						format.dateDeliveried=new Date(format.dateDeliveried).format('yyyy-MM-dd')
					}
					
					if(format.payment1Date==''||format.payment1Date==null){
						
					}else{
						format.payment1Date=new Date(format.payment1Date).format('yyyy-MM-dd')
					}
					
					if(format.payment2Date==''||format.payment2Date==null){
						
					}else{
						format.payment2Date=new Date(format.payment2Date).format('yyyy-MM-dd')
					}
					
					this.$api.post('/sales/save', format, r => {
						console.log(r)
						this.search()
					})
					
				})
				
				// for (let i = 0; i < this.tableData.length; i++) {
				// 	if(this.stateid==this.tableData[i].reference){
				// 		
				// 		console.log('--------')
				// 		console.log(this.tableData[i])
				// 		
				// 		format=this.tableData[i]
				// 		
				// 		if(format.customer1!=null){
				// 			console.log('01')
				// 			format.customer1.reference=format.customer1.reference
				// 		}else{
				// 			format.customer1=null
				// 		}
				// 		
				// 		if(format.customer2!=null){
				// 			console.log('02')
				// 			format.customer2.reference=format.customer2.reference
				// 		}else{
				// 			format.customer2=null
				// 		}
				// 		
				// 	}
				// }
				
				
				
			},
			
			
			
			cancel_state() {
				this.dialogVisible_state = false
			},


			// 鎖定
			lock(id) {
				this.dialogVisibles = true
				this.statusid = id
			},
			suoding_queren() {
				this.dialogVisibles = false
				this.$api.get('/PlvKClientCardEndpoint/onLock/' + this.statusid, null, r => {
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
				this.$router.push("/MoBangXinZeng")
			},
			//發鑲單
			send(uuid){
				this.$router.push("/FaXiangDan?uuid=" + uuid)
			},
			// 修訂
			revision(uuid) {
				this.$router.push("/revision?uuid=" + uuid)
			},
			// 保修
			warranty(uuid) {
				this.$router.push("/Warranty?uuid=" + uuid)
			},
			// 复制新客单
			copy(uuid) {
				this.$router.push("/CopyGuestList?uuid=" + uuid)
			},
			// 首飾設計
// 			topage() {
// 				this.$router.push("/SystemManagement/JewelryDesign")
// 			},
			// 項目資料
			xiangmu() {
				this.$router.push("/SystemManagement/ProjectInformation")
			},
			

			details(uuid) {
				this.$router.push("/MoBangXinZeng?type=detail&uuid=" + uuid)
			},
			invoice(uuid){
				this.$router.push("/orderDetail?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/MoBangXinZeng?type=alert&uuid=" + uuid)
			},
			
			maintenance(forms) {
				
				
				// this.$router.push("/MoBangXinZeng?type=maintenance&uuid=" + forms)
				
				
				console.log(forms)
				this.maintenance_formInline=forms
				this.tableData02=forms.items
				this.select_item=true
				
			},
			
			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/SystemManagement/JewelryDesign")
				} else if (type == 'branch') {
					this.$router.push("/SystemManagement/CustomerList")
				}
			}
			
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.usermanagement {

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
	
	.selector_form .el-menu--horizontal > .el-submenu .el-submenu__title{
		padding: 0 10px
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

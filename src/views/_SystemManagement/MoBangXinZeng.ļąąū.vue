<template>
	<div id="MoBangXinZengAll" class="MoBangXinZengAll" v-loading='all_loading'>
		
		<el-dialog
		  title="添加顧客"
		  :visible.sync="dialogVisible"
		  width="70%"
		  :before-close="handleClose">
		  <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 380px;">
		  	<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign_customer" :rules="rules">
		  		<el-form-item label="Customer Name" class='fl table30'>
		  			<el-input v-model="formLabelAlign_customer.customeName" class='inputs' :disabled="type=='detail'?true:false"></el-input>
		  		</el-form-item>
		  		<el-form-item label="Area" class='fl table30 ml5'>
		  			<el-input v-model="formLabelAlign_customer.site" class='inputs' :disabled="type=='detail'?true:false"></el-input>
		  		</el-form-item>
		  		<el-form-item label="Job" class='fl table30 ml5'>
		  			<el-input v-model="formLabelAlign_customer.profession" class='inputs' :disabled="type=='detail'?true:false"></el-input>
		  		</el-form-item>
		  		<el-form-item label="Telphone" class='mat20 fl table30 '>
		  			<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign_customer.mobilePhone"
		  			 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
		  		</el-form-item>
		  		<el-form-item label="satisfaction Rate" class='mat20 fl table30 ml5'>
		  			<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign_customer.satisfaction"
		  			onkeyup="(this.v=function(){
		  			this.value=this.value.replace(/^\.$/,'');
		  			this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
		  			this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)"
		  			 onblur="this.v();"></el-input>
		  		</el-form-item>
		  		
		  		<el-form-item label="Winning Rate" class='mat20 fl table30 ml5' prop="userName">
		  			
		  			<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign_customer.win" 
		  			onkeyup="(this.v=function(){
		  			this.value=this.value.replace(/^\.$/,'');
		  			this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
		  			this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this);"
		  			 onblur="this.v();"></el-input>
		  		</el-form-item>
		  
		  		<el-form-item label="Customer Type" class='mat20 fl table30 '>
		  			<el-select v-model="formLabelAlign_customer.customerGrade" placeholder="select" class='inputs' :disabled="type=='detail'?true:false">
		  				<el-option v-for='(item, index) in type_list' :label="item.typeName" :value="item.typeName"></el-option>
		  				</el-option>
		  			</el-select>
		  		</el-form-item>
		  		<el-form-item label="Sex" class='mat20 fl table30 ml5'>
		  			<el-select v-model="formLabelAlign_customer.gender" placeholder="Select" class='inputs' :disabled="type=='detail'?true:false">
		  				<el-option v-for="item in sex" :label="item.label" :value="item.label">
		  				</el-option>
		  			</el-select>
		  		</el-form-item>
		  		<el-form-item label="Remark" class='mat20 fl table30 ml5'>
		  			<el-input class='inputs' type="textarea" v-model="formLabelAlign_customer.explain" :disabled="type=='detail'?true:false">
		  			</el-input>
		  		</el-form-item>
		  	</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="upload_customer" :loading="customer_loading">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<div style="height: 60px;">
			<div style="width: 90%;">
				<div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<el-select v-model="branch" placeholder="select" style="float: left;width: 100%;" :disabled="type=='detail'">
						<!-- <el-option v-for="(item,index) in billStatus" :value="item.billStatus"> -->
						<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
						</el-option>
					</el-select>
				</div>

			</div>
		</div>

		<div style="width: 96%;margin-left: 2%;border: 2px solid black;padding: 5px;">
			<!-- ||||||||||||||||||||| -->
			<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;" class="MoBangXinZeng">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Order Information</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>
					
					<el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">salesNo：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.salesNo" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">Customer1：</span>
						<p style="overflow: hidden;white-space: nowrap;">
							
							<el-select v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="formLabelAlign.customer1.reference" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
								<el-option
								  v-for="item in options_customer"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
							
							<span v-if="type=='detail'?true:false">{{formLabelAlign.customer1.reference}}</span>
							
							
							
							<!-- <input placeholder="input" v-model="formLabelAlign.customer1" :disabled="type=='detail'?true:false" class="tem_input" style="width: 90%;"> -->
							<span v-show="formLabelAlign.customer1.reference==null&&type!='detail'" @click="dialogVisible = true" style="color: #409EFF;cursor: pointer;font-size: 12px;">添加</span>
							<span v-show="formLabelAlign.customer1.reference!=null&&type!='detail'" @click="clear('1')" style="color: #409EFF;cursor: pointer;font-size: 12px;">清空</span>
						</p>
					</el-col>

					<el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">Customer2：</span>
						<p style="overflow: hidden;white-space: nowrap;">
							<el-select v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="formLabelAlign.customer2.reference" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
								<el-option
								  v-for="item in options_customer"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
							<span v-if="type=='detail'?true:false">{{formLabelAlign.customer2.reference}}</span>
							<!-- <input placeholder="input" v-model="formLabelAlign.customer2" :disabled="type=='detail'?true:false" class="tem_input" style="width: 90%;"> -->
							<!-- <span @click="dialogVisible = true" style="color: #409EFF;cursor: pointer;font-size: 20px;">+</span> -->
							<span v-show="formLabelAlign.customer2.reference==null&&type!='detail'" @click="dialogVisible = true" style="color: #409EFF;cursor: pointer;font-size: 12px;">添加</span>
							<span v-show="formLabelAlign.customer2.reference!=null&&type!='detail'" @click="clear('2')" style="color: #409EFF;cursor: pointer;font-size: 12px;">清空</span>
						</p>
					</el-col>

					

					<!-- <el-col :span="8">
					<span class="fl">Product：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.product" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>

					<!-- <el-col :span="8">
					<span class="fl">Category：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.gold" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->
					
					<el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">Buying Date：</span>
						<p v-if="type!='detail'?true:false" style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.dateBuying" type="date" placeholder="select" style='width: 100%;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
						<span v-if="type=='detail'?true:false">{{formLabelAlign.dateBuying}}</span>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">Big Date：</span>
						<p v-if="type!='detail'?true:false" style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.dateBig" type="date" placeholder="select" style='width: 100%;border-bottom: 0;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
						<span v-if="type=='detail'?true:false">{{formLabelAlign.dateBig}}</span>
					</el-col>

					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">Collection Date：</span>
						<p v-if="type!='detail'?true:false" style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.dateCollection" type="date" placeholder="select" style='width: 100%;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
						<span v-if="type=='detail'?true:false">{{formLabelAlign.dateCollection}}</span>
					</el-col>
					
					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">金：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.gold" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>
					
					<el-col :span="8" class='table_border table_t  table_r table_b table_l'>
						<span class="fl">Deliveried Date：</span>
						<p v-if="type!='detail'?true:false" style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.dateDeliveried" type="date" placeholder="select" style='width: 100%;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
						<span v-if="type=='detail'?true:false">{{formLabelAlign.dateDeliveried}}</span>
					</el-col>
					
					<!-- <el-col :span="8" class='table_border   table_r table_b' v-if="formLabelAlign.maintenance==1">
						<span class="fl">maintain：</span>
						<p style="overflow: hidden;">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 70%;" @change="items" :disabled="type=='detail'?true:false">
								<el-option v-for='(item, index) in Items_list' :label="item.name" :value="index"></el-option>
								</el-option>
							</el-select>
						</p>
					</el-col> -->
					
					<el-col :span="8" class='table_border   table_r table_b'>
						<span class="fl">display：</span>
						<p style="overflow: hidden;">
							<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border   table_r table_b'>
						<span class="fl">証書貨：</span>
						<p style="overflow: hidden;">
							<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
						</p>
					</el-col>

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">數量：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.amount" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">類別：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.type" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>

					<!-- <el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">Unit HKD：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.product" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">Total HKD：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.amount" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">Net Amount：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.type" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>
					<!-- <el-col :span="8">
					<span class="fl">尺寸(港號)：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.hksize" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">設計：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.designCode" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">手指圈口(港度)：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.hksize" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">闊度：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.w" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8">
					<span class="fl">around：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.around" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Design Information</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div> -->
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>


					<!-- <el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">厚度：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.t" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">長度：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.l" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">設計跟版：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.version01" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->


				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>
					<!-- <el-col :span="8">
					<span class="fl">Pickup Date：</span>
					<p style="overflow: hidden;">
						<el-date-picker v-model="formLabelAlign.landingDay" type="date" placeholder="select" style='width: 100%;' 
						 :disabled="type=='detail'?true:false">
						</el-date-picker>
					</p>
				</el-col> -->



					<!-- <el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">設計改款：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.version02" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->


					<!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">客人字印位置：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.location" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->


					<!-- <el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">字體：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.remarkType" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->




				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>


					<!-- <el-col :span="8" class='table_border table_t table_l table_r table_b'>
						<span class="fl">字句：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.mark" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">内鑲：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.around" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->



				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>


				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->

			<div>

				<div style='padding: 5px;width: 96%;margin-left: 2%;margin-top: 10px;'>

					<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
						<!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
						<span class="fl" style="padding: 0 5px;">Product information：</span>
						<!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
					</div>



					<div style="background: rgb(233,238,244);padding: 15px 20px;width: 100%;border-radius: 10px;white-space: nowrap">
						<el-row style='text-align: center;'>
							<el-col :span="4">
								<div class="grid-content">Description</div>
							</el-col>
							<el-col :span="4">
								<div class="grid-content ">name</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">stone</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">sort</div>
							</el-col>
							<!-- <el-col :span="2">
								<div class="grid-content ">Stone</div>
							</el-col> -->
							<!-- <el-col :span="2">
								<div class="grid-content ">Around</div>
							</el-col> -->
							<!-- <el-col :span="3">
								<div class="grid-content ">Certificate No</div>
							</el-col> -->
							<el-col :span="2">
								<div class="grid-content ">quantity</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">Unit HKD</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">Total HKD</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">Net Amount</div>
							</el-col>
						</el-row>

						<el-row v-for='(item,index) in formLabelAlign.items'>
							
							<el-col :span="4">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.description" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="4">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.name" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.stone" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.sort" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.quantity" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.priceUnit" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.priceTotal" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<!-- <el-col :span="1">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.qty" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col> -->
							<!-- <el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.unitHkd" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col> -->
							<!-- <el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.totalHkd" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col> -->
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.priceNet" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="1">
								<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
									<span style="cursor: pointer;" class='grid-inputs' @click="del(index)" v-if="type!='detail'">刪除</span>
								</div>
							</el-col>

						</el-row>
						</el-row>

						<el-row>
							<el-col :span="20">
								<div class="input-content ">
									<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;margin-left: 50%;" src="../../../image/add.png"
									 v-if="type!='detail'" />
								</div>
							</el-col>
						</el-row>


					</div>

				</div>
			</div>




			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>

					<!-- <el-col :span="8">
						<span class="fl">Tatal price：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.total" :disabled="type=='detail'?true:true" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8">
						<span class="fl">Total discount：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.amount01" :disabled="type=='detail'?true:true" class="tem_input">
						</p>
					</el-col> -->

					<!-- <el-col :span="8">
						<span class="fl">Total Net：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.totalNet" :disabled="type=='detail'?true:true" class="tem_input">
						</p>
					</el-col> -->







				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->

			<!-- ||||||||||||||||||||| -->
			<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Pay Information</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>
					
					
					<el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">Total price：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.total" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
								
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Total Net：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.totalNet" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
								
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">discount：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.discount" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
								
					</el-col>
					
					
					<el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">1st payment：</span>
						<p v-if="type!='detail'?true:false" style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.payment1Date" type="date" placeholder="select" style='width: 100%;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
						<span v-if="type=='detail'?true:false">{{formLabelAlign.payment1Date}}</span>
					</el-col>

					<el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">1st 金額：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.payment1" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">final payment：</span>
						<p v-if="type!='detail'?true:false" style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.payment2Date" type="date" placeholder="select" style='width: 100%;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
						<span v-if="type=='detail'?true:false">{{formLabelAlign.payment2Date}}</span>
					</el-col>



				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>


					<el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">final 金額：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.payment2" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">balance：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.balance" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>
					
					<!-- <el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">staff：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.staff" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					
					</el-col> -->
					
					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">notes：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.notes" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
								
					</el-col>



				</el-row>
			</div>
			
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>
			
					<el-col :span="8" class='table_border table_t table_l table_r table_b'>
						<span class="fl">remarks：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.remarks" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
								
					</el-col>
					
				</el-row>
			</div>

			<!-- ||||||||||||||||||||| -->
			<!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">Stone Information</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div> -->
			<!-- ||||||||||||||||||||| -->
			<!-- <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;">
			<el-row>
				<el-col :span="3">
					<div class="grid-content">Stone</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Shape</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Color</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Quantity</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">Cost</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content ">No</div>
				</el-col>
				
				<el-col :span="3">
					<div class="grid-content ">Remark</div>
				</el-col>
			</el-row>

			<el-row v-for='(item,index) in formLabelAlign.plvKAVIEcesEntityList'>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.stone" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.shape" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.color" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.cts" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.hk" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.noNumber" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.remark" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
						<span style="cursor: pointer;" class='grid-inputs' @click="del(index)" v-if="type!='detail'">detele</span>
					</div>
				</el-col>
			</el-row>
			</el-row>

			<el-row>
				<el-col :span="18">
					<div class="input-content ">
						<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;margin-left: 50%;" src="../../../image/add.png"
						 v-if="type!='detail'" />
					</div>
				</el-col>
			</el-row>
		</div> -->
			<!-- ||||||||||||||||||||| -->
		</div>




		<div style="width:100%;text-align: center;margin-top: 45px;" class="printhide">

			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm01('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<!-- <el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="print()"
			  v-if="type=='detail'">打印</el-button> -->
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>

		</div>


	</div>

</template>

<script>
	import {
		MessageBox,
		Message
	} from 'element-ui';
	export default {
		name: "UserCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				// if (value != '') {
				// 	this.$api.post('/userNameInspect/' + value, null, r => {
				// 		// console.log(r)
				// 		if (r == false) {
				// 			callback(new Error('用戶名已存在'));
				// 		} else {
				// 			callback();
				// 		}
				// 	});
				// } else {
				// 	callback(new Error('請輸入用戶名'));
				// }



			};
			return {
				plvKGuestBillType: [],
				type_list:[],
				nameId: '',
				nameId1: '',
				userReferenceId: '',
				branch: '',
				branchId: '',
				branch_list: [],
				Items_list:[],
				test: '',
				dialogVisible: false,
				all_loading:false,
				loading: false,
				dialogVisible: false,
				customer_loading:false,
				activateds: false,
				Items:'',
				textarea: '',
				labelPosition: '',
				type: "detail",
				uuid: '',
				value1: '',
				password: '',
				plvKAviEceOemSaveDtoList: '',
				plvKGuestBillSaveDtoList: '',
				plvKProductSaveDtoList: '',
				plvKStoneTotalSaveDtoList: '',
				plvKStoneTotalEntityList: '',
				sex: [{
					id: '1',
					label: 'Boy'
				}, {
					value: '2',
					label: 'Girl'
				}],
				formLabelAlign_customer: {
					
					customeName: '',
					site: '',
					profession: '',
					mobilePhone: '',
					satisfaction: '',
					win: '',
					customerGrade: '',
					gender: '',
					explain: '',
				},
				

				formLabelAlign: {
					"balance": 0,
					"customer1": {reference:null},
					"customer2": {reference:null},
					// "dateBig": "",
					// "dateBuying": "",
					"dateBig": new Date().format("yyyy-MM-dd"),
					"dateBuying": new Date().format("yyyy-MM-dd"),
					"dateCollection": "",
					"dateDeliveried": "",
					"discount": 0,
					"maintenance": 0,
					"display": 0,
					"items": [{
							"description": "",
							"name": "",
							"priceNet": 0,
							"priceTotal": 0,
							"priceUnit": 0,
							"purged": null,
							"quantity": 0,
							"reference": null,
							"salesOrder": null,
							"sort": 0,
							"stone": 0
						}	
					],
					"maintain":{reference:null},
					"notes": "",
					"payment1": 0,
					"payment1Date": null,
					"payment1Method": "CASH",
					"payment1Settled": 1,
					"payment2": 0,
					"payment2Date": null,
					"payment2Method": "CASH",
					"payment2Settled": 0,
					"reference": null,
					"remarks": "",
					"salesNo": '',
					"total": 0,
					"totalNet": 0,
					"urgent": 1
				},
				
				
				options_customer: [],
				
				
				options: [{
					id: '1',
					label: '已起貨'
				}, {
					value: '2',
					label: '起交貨'
				}],
				option: [{
					id: '1',
					label: '群組1'
				}, {
					id: '2',
					label: '群組2'
				}],
				option_stone: [{
					id: '1',
					label: '鑲嵌'
				}, {
					value: '2',
					label: '未鑲嵌'
				}],
				rules: {
					userName: [{
						validator: validatorUser,
						trigger: 'blur'
					}]

				},
			}
		},

		created: function() {
			
			var today = new Date();
			var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 60;
			today.setTime(targetday_milliseconds); //注意，这行是关键代码
			this.formLabelAlign.dateDeliveried = today.format("yyyy-MM-dd")
			
			
			this.get_customer()
			
			this.findAllEntrepot()
			this.type = this.$route.query.type

			this.uuid = this.$route.query.uuid
			this.id = this.$route.query.id
			
			
			// /customers/seekAll
			
			
		},

		methods: {
			
			
			items(){
				
				// this.formLabelAlign.maintain={reference:this.Items_list[this.Items].reference}
				
				this.formLabelAlign.maintain=this.Items_list[this.Items].reference
			},
			
			
			print(){
				
				let dom = document.getElementById('MoBangXinZengAll')
				console.log(dom)
				this.$print(dom) 
				
			},
			
			
			// 清空顧客
			clear(type){
				
				if(type=='1'){
					this.formLabelAlign.customer1.reference=null
				}else if(type=='2'){
					this.formLabelAlign.customer2.reference=null
				}
				
			},
			
			// 獲取顧客
			get_customer(){
				
				this.options_customer=[]
				this.$api.post('/customer', 
				{
				  "customerGrade": "",
				  "index": 0,
				  "numbe": 100000000,
				  "retain": 0,
				  "satisfaction": 0,
				  "seek": "",
				  "win": 0
				}
				, r => {
					console.log('*---------*')
					console.log(r)
					for (let i = 0; i < r.content.length; i++) {
						this.options_customer.push({
							value: r.content[i].reference,
							label: r.content[i].customeName
						})
					}
					this.customer_loading=false
					this.dialogVisible = false
				});
			},
			
			// 新增顧客
			upload_customer(){
				
				this.customer_loading=true
				this.$api.put('/customer/save', {
					"customeName": this.formLabelAlign_customer.customeName,
					// "customerGradeId": this.options[parseInt(this.formLabelAlign.customerGradeName)].customerGradeId,
					"customerGrade": this.formLabelAlign_customer.customerGrade,
					"explain": this.formLabelAlign_customer.explain,
					"gender": this.formLabelAlign_customer.gender,
					"mobilePhone": this.formLabelAlign_customer.mobilePhone,
					"profession": this.formLabelAlign_customer.profession,
					"reference": "",
					"satisfaction": parseInt(this.formLabelAlign_customer.satisfaction),
					"site": this.formLabelAlign_customer.site,
					"userName": "",
					"userReference": "",
					"win": parseInt(this.formLabelAlign_customer.win)
				}, r => {
					this.formLabelAlign_customer.customeName='',
					this.formLabelAlign_customer.site='',
					this.formLabelAlign_customer.profession='',
					this.formLabelAlign_customer.mobilePhone='',
					this.formLabelAlign_customer.satisfaction='',
					this.formLabelAlign_customer.win='',
					this.formLabelAlign_customer.customerGrade='',
					this.formLabelAlign_customer.gender='',
					this.formLabelAlign_customer.explain='',
					this.get_customer()
					// this.$router.push("CustomersManagement")
				});
				
			},

			//状态情況
			querySearch_State(queryString, cb) {
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

			handleSelect_State(item) {
				this.formLabelAlign.billStatus = item
			},

			//分行
			findAllEntrepot() {
				console.log('分行')
				this.all_loading=true
				this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
					console.log('-----------')
					console.log(r)
					this.branch_list = r.content,
						this.branch = r.content[0].name
					this.branchId = r.content[0].reference
					
					console.log(this.branchId)
					this.$api.get('/customer/type',{
							// "branch_list" : this.name,
							// "typeName" : this.formLabelAlign.customerGrade
						}, r => {
							console.log('*/*/*/*//')
							this.type_list = r
							console.log(r)
					});
					this.all_loading=false
					// this.branchId== r.content[0].reference
					this.search()
				});
			},

			search() {
				if (this.type == 'detail') {
					this.all_loading=true
					this.$api.get('/sales/' + this.$route.query.uuid, null, r => {
						this.all_loading=false
						console.log('details----')
						console.log(r)
						this.formLabelAlign=r
						this.activateds=this.formLabelAlign.display==0?false:true
						if(this.formLabelAlign.customer1!=null){
							console.log('01')
							this.formLabelAlign.customer1.reference=this.formLabelAlign.customer1.customeName
						}else{
							this.formLabelAlign.customer1={reference:''}
						}
						
						if(this.formLabelAlign.customer2!=null){
							console.log('02')
							this.formLabelAlign.customer2.reference=this.formLabelAlign.customer2.customeName
						}else{
							this.formLabelAlign.customer2={reference:''}
						}
						
						if(this.formLabelAlign.maintenance==1){
							this.Items=this.formLabelAlign.maintain.name
						}
						
						if(this.formLabelAlign.display==1){
							this.activateds=true
						}
						
						
					})
				} else if (this.type == 'alert') {
					this.all_loading=true
					console.log(this.$route.query.uuid)
					this.$api.get('/sales/' + this.$route.query.uuid, null, r => {
						this.all_loading=false
						console.log('details----')
						console.log(r)
						this.formLabelAlign=r
						this.activateds=this.formLabelAlign.display==0?false:true
						if(this.formLabelAlign.customer1!=null){
							console.log('01')
							this.formLabelAlign.customer1.reference=this.formLabelAlign.customer1.customeName
						}else{
							this.formLabelAlign.customer1={reference:null}
						}
						
						if(this.formLabelAlign.customer2!=null){
							console.log('02')
							this.formLabelAlign.customer2.reference=this.formLabelAlign.customer2.customeName
						}else{
							this.formLabelAlign.customer2={reference:null}
						}
						
						if(this.formLabelAlign.maintenance==1){
							this.Items=this.formLabelAlign.maintain.name
							// this.formLabelAlign.maintenance.reference=this.formLabelAlign.maintain.reference
							this.formLabelAlign.maintenance=this.formLabelAlign.maintain.reference
						}
						
						if(this.formLabelAlign.display==1){
							this.activateds=true
						}
						
						// this.formLabelAlign.items=[]
					})
				}else if(this.type=='maintenance'){
					this.all_loading=true
					console.log(this.$route.query.uuid)
					this.$api.get('/sales/' + this.$route.query.uuid, null, r => {
						this.all_loading=false
						console.log('details----')
						console.log(r)
						this.formLabelAlign=r
						this.activateds=this.formLabelAlign.display==0?false:true
						if(this.formLabelAlign.customer1!=null){
							console.log('01')
							this.formLabelAlign.customer1.reference=this.formLabelAlign.customer1.customeName
						}else{
							this.formLabelAlign.customer1={reference:null}
						}
						
						if(this.formLabelAlign.customer2!=null){
							console.log('02')
							this.formLabelAlign.customer2.reference=this.formLabelAlign.customer2.customeName
						}else{
							this.formLabelAlign.customer2={reference:null}
						}
						
						this.formLabelAlign.reference=null
						this.formLabelAlign.maintenance=1
						this.formLabelAlign.id=0
						
						
						
						
						this.Items_list=r.items
						
						
						
						// this.formLabelAlign.maintain=r.items
						this.formLabelAlign.status=null
						// for (let i = 0; i < this.formLabelAlign.items.length; i++) {
						// 	this.formLabelAlign.items[i].reference=null
						// }
						
						if(this.formLabelAlign.display==1){
							this.activateds=true
						}
						
					})
				}
			},
			// 			querySearch_origin_customer01(queryString, cb) {
			// 				this.$api.get('/PlvKClientCardEndpoint/seekCustomerName/' + queryString, null, r => {
			// 					// this.$router.push("/SystemManagement/UserManagement")
			// 					console.log(r)
			// 					
			// 					var results = []
			// 					for (var i = 0; i < r.content.length; i++) {
			// 						var temp = {
			// 							"value": r.content[i].customeName,
			// 							"reference": r.content[i].reference,
			// 							"id": r.content[i].id,
			// 						}
			// 						results.push(temp)
			// 					}
			// 					cb(results);
			// 				});
			// 			},
			querySearch_origin_customer01(queryString, cb) {
				this.$api.post('/PlvKClientCardEndpoint/seekCustomerName?name=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					console.log(r)
					var results = []
					for (var i = 0; i < r.length; i++) {
						var temp = {
							// "value": r[i].revised + " " + r[i].customeName,
							"value": r[i].customeName,
							"reference": r[i].reference,
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},


			querySearch_origin_customer02(queryString, cb) {
				this.$api.post('/PlvKClientCardEndpoint/seekCustomerName?name=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")

					console.log(r)

					var results = []
					for (var i = 0; i < r.length; i++) {
						var temp = {
							// "value": r[i].revised + " " + r[i].customeName,
							"value": r[i].customeName,
							"reference": r[i].reference,
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			//銷售員
			querySearch_origin_customer03(queryString, cb) {
				this.$api.post('/PlvKClientCardEndpoint/seekMember?name=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")

					console.log(r)
					var results = []
					for (var i = 0; i < r.length; i++) {
						var temp = {
							"value": r[i].identifier,
							"reference": r[i].reference,
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});

			},


			handleSelect_origin_customer01(item) {
				
				this.formLabelAlign.supplier = item
				this.formLabelAlign.customer1 = item.value
				this.nameId = item.reference
				
			},

			handleSelect_origin_customer02(item) {
				this.formLabelAlign.supplier = item
				this.formLabelAlign.customer2 = item.value
				this.nameId1 = item.reference
				// this.customer2Reference = item.reference

			},

			handleSelect_origin_customer03(item) {

				console.log('=====+++=====')
				console.log(item.value)
				this.formLabelAlign.sales = item.value
				this.userReferenceId = item.id
				this.formLabelAlign.supplier = item
				this.formLabelAlign.sales = item.value
				this.formLabelAlign.customer3Reference = item.reference

			},

			cheak_userId() {

				if ((this.formLabelAlign.guestDate != '' && this.formLabelAlign.guestDate != null) && (this.formLabelAlign.salesCode !=
						'' && this.formLabelAlign.salesCode != null)) {
				} else {
					alert('Purchase Date, Sales No \n  Can not be empty!!!')
					return
				}
				this.loading = true
				// var salesperson = false
				this.$api.post('/PlvKClientCardEndpoint/seekMember?name=' + this.formLabelAlign.sales, null, r => {
					console.log(r)
					if (r.length > 0) {
						this.userReferenceId = r[0].id
						// salesperson = true
						this.submitForm()
					} else {
						this.loading = false
						alert('There is no such salesman.')
					}
				})
			},
			
			submitForm01(){
				
				this.loading=true
				this.formLabelAlign.dateBig=this.formLabelAlign.dateBig==''?"":new Date(this.formLabelAlign.dateBig).format("yyyy-MM-dd")
				this.formLabelAlign.dateBuying=this.formLabelAlign.dateBuying==''?"":new Date(this.formLabelAlign.dateBuying).format("yyyy-MM-dd")
				this.formLabelAlign.dateCollection=this.formLabelAlign.dateCollection==''?"":new Date(this.formLabelAlign.dateCollection).format("yyyy-MM-dd")
				this.formLabelAlign.payment1Date=this.formLabelAlign.payment1Date==null?"":new Date(this.formLabelAlign.payment1Date).format("yyyy-MM-dd")
				this.formLabelAlign.payment2Date=this.formLabelAlign.payment2Date==null?"":new Date(this.formLabelAlign.payment2Date).format("yyyy-MM-dd")
				this.formLabelAlign.dateDeliveried=this.formLabelAlign.dateDeliveried==''?"":new Date(this.formLabelAlign.dateDeliveried).format("yyyy-MM-dd")
				this.formLabelAlign.salesNo=parseInt(this.formLabelAlign.salesNo)
				this.formLabelAlign.discount=parseInt(this.formLabelAlign.discount)
				this.formLabelAlign.payment1=parseInt(this.formLabelAlign.payment1)
				this.formLabelAlign.payment2=parseInt(this.formLabelAlign.payment2)
				this.formLabelAlign.total=parseInt(this.formLabelAlign.total)
				this.formLabelAlign.totalNet=parseInt(this.formLabelAlign.totalNet)
				
				if(this.formLabelAlign.customer1.reference==null){
					this.formLabelAlign.customer1=null
				}
				
				if(this.formLabelAlign.customer2.reference==null){
					this.formLabelAlign.customer2=null
				}
				
				console.log('*++++++++')
				console.log(this.formLabelAlign)
				// this.formLabelAlign.customer1=null;
				// this.formLabelAlign.customer2=null;
				// this.formLabelAlign.dateDeliveried=null
				
				for (let i = 0; i < this.options_customer.length; i++) {
					
					if(this.formLabelAlign.customer1.reference==this.options_customer[i].label){
						this.formLabelAlign.customer1.reference=this.options_customer[i].value
					}
					
					if(this.formLabelAlign.customer2.reference==this.options_customer[i].label){
						this.formLabelAlign.customer2.reference=this.options_customer[i].value
					}
					
				}
				
				this.formLabelAlign.display=this.activateds==true?1:0
				
				if(this.type=='alert'){
					this.$api.post('/sales/save', this.formLabelAlign, r => {
						console.log(r)
						this.loading = false
						this.$router.push("/CustomerOrderManagement")
					})
				}else if(this.type=='maintenance'){
					this.formLabelAlign.maintain=null
					
					if(this.Items===''){
						
						MessageBox('Select maintain', 'Tips', {
							confirmButtonText: 'OK',
							type: 'warning'
						}).then(() => {
							this.loading=false
						}).catch(() => {
						
						});
						
					}else{
						
						for (let i = 0; i < this.formLabelAlign.items.length; i++) {
							this.formLabelAlign.items[i].reference=null
						}
						
						// console.log(this.formLabelAlign)
						
						this.$api.put('/sales/save', this.formLabelAlign, r => {
							console.log(r)
							this.loading = false
							this.$router.push("/CustomerOrderManagement")
						})
					}
					
					
				}else{
					this.$api.put('/sales/save', this.formLabelAlign, r => {
						console.log(r)
						this.loading = false
						this.$router.push("/CustomerOrderManagement")
					})
				}
				
			},

			submitForm(formLabelAlign) {

				for (var i = 0; i < this.branch_list.length; i++) {
					if (this.branch == this.branch_list[i].name) {
						this.branchId = this.branch_list[i].reference
					}
				}

				if (this.type == 'alert') {
					console.log(this.plvKStoneTotalSaveDtoList[0].elseReference)

					this.formLabelAlign.totalPrice = 0
					for (var i = 0; i < this.formLabelAlign.plvKAVIEcesEntityList.length; i++) {
						this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.plvKAVIEcesEntityList[i].hk) + parseFloat(this.formLabelAlign
							.totalPrice)
					}
					this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.totalCost) + parseFloat(this.formLabelAlign.totalPrice)

					console.log(this.formLabelAlign.totalPrice)
					this.$api.post('/PlvKClientCardEndpoint/update', {
						plvKProductSaveDtoList: [{
							"elseReference": this.plvKProductSaveDtoList[0].elseReference,
							"gold": this.formLabelAlign.gold,
							"goldColour": this.formLabelAlign.goldColour,
							"guestDate": new Date(this.formLabelAlign.guestDate).format("yyyy-MM-dd"),
							// "guestDate": this.formLabelAlign.guestDate == null || this.formLabelAlign.guestDate == ''? null:new Date(this.formLabelAlign.guestDate).format("yyyy-MM-dd"),
							"netAmount": 0, //？？？？？？？？？？
							"numbe": parseFloat(this.formLabelAlign.numbe),
							"plantDate": this.formLabelAlign.plantDate == null || this.formLabelAlign.plantDate == '' ? null : new Date(
								this.formLabelAlign.plantDate).format("yyyy-MM-dd"),
							"plvKProductcol": this.plvKProductSaveDtoList[0].plvKProductcol,
							"product": this.formLabelAlign.product,
							"reference": this.plvKProductSaveDtoList[0].reference,
							"size": this.formLabelAlign.size,
							"size1": this.formLabelAlign.size1,
							"sizeUnit": this.formLabelAlign.sizeUnit,
							"userName": this.plvKProductSaveDtoList[0].userName,
							"userReference": this.plvKProductSaveDtoList[0].userReference,
							"totalPrice": parseFloat(this.formLabelAlign.totalPrice),
							"stone": this.formLabelAlign.stone1, ///石頭類型
							"around": this.formLabelAlign.around, ///？???
						}],
						plvKAviEceOemSaveDtoList: [{
							"costLaborHk": parseFloat(this.formLabelAlign.costLaborHk),
							"costLaborRmb": parseFloat(this.formLabelAlign.costLaborRmb),
							"factoryInvoice": this.formLabelAlign.factoryInvoice,
							"factoryPriceHk": parseFloat(this.formLabelAlign.factoryPriceHk),
							"factoryPriceRmb": parseFloat(this.formLabelAlign.factoryPriceRmb),
							"factoryRecord": this.formLabelAlign.factoryRecord,
							"landingDate": this.formLabelAlign.landingDate == null || this.formLabelAlign.landingDate == '' ? null : new Date(
								this.formLabelAlign.landingDate).format("yyyy-MM-dd"),
							"oemName": this.formLabelAlign.oemName,
							"oemRefenece": this.plvKAviEceOemSaveDtoList[0].oemRefenece,
							"otherExpensesExplain": this.formLabelAlign.otherExpensesExplain,
							"otherExpensesHk": parseFloat(this.formLabelAlign.otherExpensesHk),
							"plvKAviEceRefenece": this.plvKAviEceOemSaveDtoList[0].plvKAviEceRefenece,
							"refenece": this.plvKAviEceOemSaveDtoList[0].refenece,
						}],
						plvKGuestBillSaveDtoList: [{
							"bigDay": this.formLabelAlign.bigDay == null || this.formLabelAlign.bigDay == '' ? null : new Date(this.formLabelAlign
								.bigDay).format("yyyy-MM-dd"),
							"claimDay": this.formLabelAlign.claimDay == null || this.formLabelAlign.claimDay == '' ? null : new Date(
								this.formLabelAlign.claimDay).format("yyyy-MM-dd"),
							"company": this.formLabelAlign.company,
							"designCode": this.formLabelAlign.designCode,
							"elseReference": this.plvKGuestBillSaveDtoList[0].elseReference,
							"explain": this.formLabelAlign.explain,
							"factory": this.formLabelAlign.factory,
							"landingDay": this.formLabelAlign.landingDay == null || this.formLabelAlign.landingDay == '' ? null : new Date(
								this.formLabelAlign.landingDay).format("yyyy-MM-dd"),
							"mintMark": this.formLabelAlign.mintMark,
							"onLock": this.plvKGuestBillSaveDtoList[0].onLock,
							"plvKGuestBillType": this.formLabelAlign.plvKGuestBillType,
							"proChecking": this.plvKGuestBillSaveDtoList[0].proChecking,
							"proCode": this.plvKGuestBillSaveDtoList[0].proCode,
							"reference": this.plvKGuestBillSaveDtoList[0].reference,
							"sales": this.formLabelAlign.sales,
							"customer3Reference": this.plvKGuestBillSaveDtoList[0].customer3Reference,
							"salesCode": this.formLabelAlign.salesCode,
							"userName": this.plvKGuestBillSaveDtoList[0].userName,
							"userReference": this.plvKGuestBillSaveDtoList[0].userReference,

							"billDate": new Date(this.formLabelAlign.guestDate).format("yyyy-MM-dd"),

							"customer1": this.formLabelAlign.customer1,
							"customer1Reference": this.nameId,
							"customer2": this.formLabelAlign.customer2,
							"customer2Reference": this.nameId1,
							"gp": this.plvKGuestBillSaveDtoList[0].gp,
							"gpAmount": parseFloat(this.formLabelAlign.gpAmount),
							"netSales": parseFloat(this.formLabelAlign.netSales),
							"plvKGuestBillReference": this.plvKGuestBillSaveDtoList[0].plvKGuestBillReference,
							"sellingPrice": parseFloat(this.formLabelAlign.sellingPrice),
							"togoRem2": this.plvKGuestBillSaveDtoList[0].togoRem2,
							"togoRemak": this.plvKGuestBillSaveDtoList[0].togoRemak,
							"userName": this.plvKGuestBillSaveDtoList[0].userName,
							"totalDiscount": 0, //??????????
							"companyReference": this.branchId, //分行id
							"userReference": this.userReferenceId, //銷售員ID
						}],
						plvKStoneTotalSaveDtoList: [{
							// 							"design": this.formLabelAlign.design,
							// 							"designName": this.plvKStoneTotalSaveDtoList[0].designName,
							"elseReference": this.plvKStoneTotalSaveDtoList[0].elseReference,
							"gold": this.formLabelAlign.gold1,
							"goldHk": this.plvKStoneTotalSaveDtoList[0].goldHk,
							"goldUnivalence": parseFloat(this.formLabelAlign.goldUnivalence),
							"goldWeight": parseFloat(this.formLabelAlign.goldWeight),
							"reference": this.plvKStoneTotalSaveDtoList[0].reference,
							"totalCost": parseFloat(this.formLabelAlign.totalCost),
							"totalGold": this.plvKStoneTotalSaveDtoList[0].totalGold,
							"totalStone": parseInt(this.formLabelAlign.totalStone),
							"totalStoneCard": parseInt(this.formLabelAlign.totalStoneCard),
							"totalStoneCost": parseFloat(this.formLabelAlign.totalStoneCost),
							"netAmount": 0, //?????
						}],

						plvKStoneSaveDtoList: this.formLabelAlign.plvKAVIEcesEntityList,

						// plvKAviEceOemSaveDtoList: this.formLabelAlign.plvKAviEceOemEntityList,


					}, r => {

						console.log('-------------------------')
						console.log(this.formLabelAlign.guestDate)
						// console.log(this.plvKGuestBillSaveDtoList[0].customer1Reference)
						console.log(r)
						this.loading = false
						this.$router.push("/CustomerOrderManagement")
					});



				} else {
					// plvKStoneSaveDtoList
					this.formLabelAlign.totalPrice = 0
					for (var i = 0; i < this.formLabelAlign.plvKAVIEcesEntityList.length; i++) {
						this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.plvKAVIEcesEntityList[i].hk) + parseFloat(this.formLabelAlign
							.totalPrice)
					}
					this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.totalCost) + parseFloat(this.formLabelAlign.totalPrice)




					this.$api.post('/PlvKClientCardEndpoint/save', {
						plvKProductSaveDtoList: [{
							"elseReference": "",
							"gold": this.formLabelAlign.gold,
							"goldColour": this.formLabelAlign.goldColour,
							"guestDate": this.formLabelAlign.guestDate.format("yyyy-MM-dd"),
							"numbe": parseFloat(this.formLabelAlign.numbe),
							"plantDate": this.formLabelAlign.plantDate == null || this.formLabelAlign.plantDate == '' ? null : this.formLabelAlign
								.plantDate.format("yyyy-MM-dd"),
							"plvKProductcol": "",
							"product": this.formLabelAlign.product,
							"reference": "",
							"size": this.formLabelAlign.size,
							"size1": this.formLabelAlign.size1,
							"sizeUnit": this.formLabelAlign.sizeUnit,
							"userName": "",
							"userReference": "",
							"totalPrice": parseFloat(this.formLabelAlign.totalPrice),
							"stone": this.formLabelAlign.stone1, ///石頭類型
							"around": this.formLabelAlign.around, ///？???
						}],
						plvKAviEceOemSaveDtoList: [{
							"costLaborHk": parseFloat(this.formLabelAlign.costLaborHk),
							"costLaborRmb": parseFloat(this.formLabelAlign.costLaborRmb),
							"factoryInvoice": this.formLabelAlign.factoryInvoice,
							"factoryPriceHk": parseFloat(this.formLabelAlign.factoryPriceHk),
							"factoryPriceRmb": parseFloat(this.formLabelAlign.factoryPriceRmb),
							"factoryRecord": this.formLabelAlign.factoryRecord,
							"landingDate": this.formLabelAlign.landingDate == null || this.formLabelAlign.landingDate == '' ? null : this
								.formLabelAlign.landingDate.format("yyyy-MM-dd"),
							"oemName": this.formLabelAlign.oemName,
							"oemRefenece": "",
							"otherExpensesExplain": this.formLabelAlign.otherExpensesExplain,
							"otherExpensesHk": parseFloat(this.formLabelAlign.otherExpensesHk),
							"plvKAviEceRefenece": "",
							"refenece": "",
						}],
						plvKGuestBillSaveDtoList: [{
							"bigDay": this.formLabelAlign.bigDay == null || this.formLabelAlign.bigDay == '' ? null : this.formLabelAlign
								.bigDay.format("yyyy-MM-dd"),
							// "bigDay":null,
							"claimDay": this.formLabelAlign.claimDay == null || this.formLabelAlign.claimDay == '' ? null : this.formLabelAlign
								.claimDay.format("yyyy-MM-dd"),
							"company": this.formLabelAlign.company,
							"designCode": this.formLabelAlign.designCode,
							"elseReference": '',
							"explain": this.formLabelAlign.explain,
							"factory": this.formLabelAlign.factory,
							"landingDay": this.formLabelAlign.landingDay == null || this.formLabelAlign.landingDay == '' ? null : this.formLabelAlign
								.landingDay.format("yyyy-MM-dd"),
							"mintMark": this.formLabelAlign.mintMark,
							"onLock": 0,
							"plvKGuestBillType": this.formLabelAlign.plvKGuestBillType,
							"proChecking": '',
							"proCode": '',
							"reference": '',
							"sales": this.formLabelAlign.sales,
							"salesCode": this.formLabelAlign.salesCode,
							"userName": '',
							"userReference": '',
							"billDate": this.formLabelAlign.guestDate.format("yyyy-MM-dd"),

							"customer1": this.formLabelAlign.customer1,
							"customer1Reference": this.nameId,
							"customer2": this.formLabelAlign.customer2,
							"customer2Reference": this.nameId1,
							"gp": 0,
							"gpAmount": parseFloat(this.formLabelAlign.gpAmount),
							"netSales": parseFloat(this.formLabelAlign.netSales),
							"plvKGuestBillReference": 0,
							"sellingPrice": parseFloat(this.formLabelAlign.sellingPrice),
							"togoRem2": '1',
							"togoRemak": '',
							"userName": '',
							"totalDiscount": 0, //??????????
							"companyReference": this.branchId, //分行id
							"userReference": this.userReferenceId, //銷售員ID
						}],
						plvKStoneTotalSaveDtoList: [{
							// 							"design": this.formLabelAlign.design,
							// 							"designName": "",
							"elseReference": "",
							"gold": this.formLabelAlign.gold1,
							"goldHk": 0,
							"goldUnivalence": parseFloat(this.formLabelAlign.goldUnivalence),
							"goldWeight": parseFloat(this.formLabelAlign.goldWeight),
							"reference": "",
							"totalCost": parseFloat(this.formLabelAlign.totalCost),
							"totalGold": 0,
							"totalStone": parseInt(this.formLabelAlign.totalStone),
							"totalStoneCard": parseInt(this.formLabelAlign.totalStoneCard),
							"totalStoneCost": parseFloat(this.formLabelAlign.totalStoneCost),
						}],
						plvKStoneSaveDtoList: this.formLabelAlign.plvKAVIEcesEntityList,
						// plvKAviEceOemSaveDtoList: this.formLabelAlign.plvKAviEceOemEntityList,

					}, r => {
						console.log('-------------------------')

						console.log(r)
						this.$router.push("/CustomerOrderManagement")
					});
				}

			},
			
			handleClose(done) {
				this.$confirm('确认关闭？')
				  .then(_ => {
					done();
				  })
				  .catch(_ => {});
			  },
	
			//增加石資料
			add() {

				console.log('1')
				this.formLabelAlign.items.push({
				  "description": "",
				  "name": "",
				  "priceNet": 0,
				  "priceTotal": 0,
				  "priceUnit": 0,
				  "purged": null,
				  "quantity": 0,
				  "reference": null,
				  "salesOrder": null,
				  "sort": 0,
				  "stone": 0
				})
			},
			//代工列表
			// 			app() {
			// 				this.formLabelAlign.plvKAviEceOemEntityList.push({
			// 					costLaborRmb: '',
			// 					costLaborHk: '',
			// 					otherExpensesHk: '',
			// 					factoryInvoice: '',
			// 					factoryPriceRmb: '',
			// 					factoryPriceHk: '',
			// 					landingDate: '',
			// 					factoryRecord: '',
			// 					otherExpensesExplain: '',
			// 				})
			// 			},

			cancel() {
				this.$router.push("/CustomerOrderManagement")
			},

			// 項目刪除
			del(index) {

				this.formLabelAlign.items.splice(index, 1)

				// console.log('0000')
				// 				console.log(index)
				// this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
				// if (this.formLabelAlign.plvKAVIEcesEntityList[index].refenece == '') {
				// 	this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
				// } else {
				// 	this.$api.get('/PlvKClientCardEndpoint/deletePlvKStone/' + this.formLabelAlign.plvKAVIEcesEntityList[index].refenece,
				// 		null, r => {
				// 			console.log('****************************')
				// 			this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
				// 			this.search();
				// 		});
				// }

			},


			// 代工刪除
			// 			detele(indexs) {
			// 				// console.log('111111')
			// 				this.formLabelAlign.plvKAviEceOemEntityList.splice(indexs, 1)
			// 				// 				console.log('111111')
			// 				// 				console.log(indexs)
			// 				// 				this.$api.get('/PlvKAviEce/deletePlvKAVIEceOem/' + this.formLabelAlign.plvKAviEceOemEntityList[indexs].refenece, null, r => {
			// 				// 					console.log('****************************')
			// 				// 					this.formLabelAlign.plvKAviEceOemEntityList.splice(indexs, 1)
			// 				// 					this.search();
			// 				// 				});
			// 			},
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.MoBangXinZengAll {

		.el-form-item {
			margin-bottom: 0;
			float: left;
		}

		.table30 {
			width: 30%;
			float: left
		}

		.m15 {
			margin-left: 5%;
			float: left
		}

		// 		.m30{
		// 			margin-left: 10%;
		// 			float: left
		// 		}

		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			border: 1px solid black // background: rgb(224, 224, 224);
		}

		.input-content {
			line-height: 36px
		}

		.second_menu {
			width: 100px;
			line-height: 76px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			cursor: pointer
		}

		.el-textarea__inner {
			height: 100px;
		}

		.el-col-3 {
			width: 12.5%
		}

		.selector {
			color: $navHoverTextColor;
		}

		.inputs {
			width: 90%;
			float: left
		}

		.button {
			// width: 191px;
			padding: 0 10px;
			height: 48px;
			font-size: 21px;
			// line-height: 48px;
			background: $navHoverTextColor;
			border: 0
		}

		.button:nth-child(2) {
			margin-left: 50px;

		}

		.point {
			cursor: pointer;
		}

	}


	.MoBangXinZeng {


		.ltb_border {
			border-left: 1px solid black;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
			padding: 0 5px;
			height: 35px
		}

		.all_border {
			border: 1px solid black;
			padding: 0 5px;
			height: 35px
		}

		.tem_input {
			border-width: 0;
			// border-bottom: 1px solid black;
			display: inline-block;
			width: 100%;
			height: 25px;
			margin-top: 5px;
			border: 0 1px 0 0;
			background-color: transparent;
		}

		.table_border {
			height: 45px;
			padding: 5px;
		}

		.table_l {
			border-left: 1px solid black
		}

		.table_t {
			border-top: 1px solid black
		}

		.table_b {
			border-bottom: 1px solid black
		}

		.table_r {
			border-right: 1px solid black
		}

		.el-input__inner {
			border-width: 0;
			// border-bottom: 1px solid black;
			display: inline-block;
			float: left;
			width: 100%;
			height: 25px;
			margin-top: 5px;
			border: 0 1px 0 0;
			border-radius: 0;
			background-color: transparent;
		}

		.el-autocomplete {
			width: 100%
		}

		.el-input.is-disabled .el-input__inner {
			background-color: transparent;
			border-color: black;
			color: black;
			cursor: default;
		}

	}
	
	
	
	
	
</style>

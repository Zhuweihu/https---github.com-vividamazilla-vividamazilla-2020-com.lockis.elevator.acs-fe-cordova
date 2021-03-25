<template>
  <div id="MoBangXinZengAll" class="MoBangXinZengAll" v-loading='all_loading'>

    <el-dialog title="Add Customer" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
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
          <el-form-item label="Satisfaction Rate" class='mat20 fl table30 ml5'>
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
            <el-select clearable v-model="formLabelAlign_customer.customerGrade" placeholder="select" class='inputs' :disabled="type=='detail'?true:false">
              <el-option v-for='(item, index) in type_list' :label="item.typeName" :value="item.typeName"></el-option>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Gender" class='mat20 fl table30 ml5'>
            <el-select clearable v-model="formLabelAlign_customer.gender" placeholder="Select" class='inputs' :disabled="type=='detail'?true:false">
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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="upload_customer" :loading="customer_loading">OK</el-button>
      </span>
    </el-dialog>

    <el-form :model="formLabelAlign" :rules="rules" ref="formLabelAlign" label-width="120px" class="demo-ruleForm">
      <!-- 分行選擇 -->
      <!-- <div style="height: 60px;">
			<div style="width: 90%;">
				<div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<el-select v-model="branch" placeholder="select" style="float: left;width: 100%;" :disabled="type=='detail'">
						<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
						</el-option>
					</el-select>
				</div>

			</div>
		</div> -->

      <!-- 		<div style="height: 60px;width: 100%;">



			<div style="width: 90%;">
				<div style="line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<span>maintenance Items:</span>
					<el-select v-model="formLabelAlign.maintain.reference" placeholder="select" style="width: 200px;" @change="items" :disabled="type=='Alter'">
						<el-option v-for='(item, index) in formLabelAlign.items' :label="item.description" :value="item.reference"></el-option>
						</el-option>
					</el-select>
				</div>
			</div>

		</div> -->

      <div style="width: 96%;margin-left: 2%;border: 10px solid rgb(227,227,227);padding: 5px;">
        <!-- ||||||||||||||||||||| -->
        <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 30px;background: rgb(0,191,255);color: white;margin-bottom: 5px;"
          class="MoBangXinZeng">
          <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
          <span class="fl" style="padding: 0 5px;">Order Information</span>
          <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
        </div>
        <!-- ||||||||||||||||||||| -->
        <div class="MoBangXinZeng">
          <el-row style='line-height: 35px;'>


            <el-col :span="8" class='table_border table_t table_l table_r'>
              <span class="fl">Sales No:</span>
              <p style="overflow: hidden;">
                <input placeholder="input" v-model="formLabelAlign.salesNo" :disabled="type=='detail'?true:false" class="tem_input">
              </p>
            </el-col>

            <el-col :span="8" class='table_border table_t  table_r'>
              <span class="fl">Customer 1:</span>
              <p style="overflow: hidden;white-space: nowrap;">

              <!-- v-model="formLabelAlign.customer1.reference" -->

                <el-autocomplete
                  class="inline-input"

                  v-model="customer1.reference"
                  :fetch-suggestions="querySearch"
                  placeholder="Input Customer"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                  @change='change_customer01'
                ></el-autocomplete>



<!--                <el-select filterable @change="replace_cutomer1s()" v-if="(type!='detail'?true:false)&&(replace_cutomer1!='')"
                  :disabled="type=='detail'?true:false" v-model="replace_cutomer1" filterable placeholder="select"
                  class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_customer" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->

<!--                <el-select filterable @change="replace_cutomer1s()" v-if="(type!='detail'?true:false)&&(replace_cutomer1=='')"
                  :disabled="type=='detail'?true:false" v-model="formLabelAlign.customer1.reference" filterable
                  placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_customer" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->

                <span v-if="type=='detail'?true:false">{{replace_cutomer1}}</span>



                <!-- <input placeholder="input" v-model="formLabelAlign.customer1" :disabled="type=='detail'?true:false" class="tem_input" style="width: 90%;"> -->

<!--                <span v-show="formLabelAlign.customer1.reference==''&&type!='detail'" @click="dialogVisible = true"
                  style="color: #409EFF;cursor: pointer;font-size: 12px;">Add</span>
                <span v-show="formLabelAlign.customer1.reference!=''&&type!='detail'" @click="clear('1')" style="color: #409EFF;cursor: pointer;font-size: 12px;">Clear</span> -->

                <span v-show="customer1.reference==''&&type!='detail'" @click="dialogVisible = true"
                  style="color: #409EFF;cursor: pointer;font-size: 12px;">Add</span>
                <span v-show="customer1.reference!=''&&type!='detail'" @click="clear('1')" style="color: #409EFF;cursor: pointer;font-size: 12px;">Clear</span>

              </p>
            </el-col>

            <el-col :span="8" class='table_border table_t  table_r'>
              <span class="fl">Customer 2:</span>
              <p style="overflow: hidden;white-space: nowrap;">
                <!-- v-model="formLabelAlign.customer2.reference" -->
                <el-autocomplete
                  class="inline-input"
                  v-model="customer2.reference"
                  :fetch-suggestions="querySearch"
                  placeholder="Input Customer"
                  :trigger-on-focus="false"
                  @select="handleSelect02"
                  @change='change_customer02'
                ></el-autocomplete>

                <!-- <el-select filterable @change="replace_cutomer2s()" v-if="(type!='detail'?true:false)&&(replace_cutomer2!='')"
                  :disabled="type=='detail'?true:false" v-model="replace_cutomer2" filterable placeholder="select"
                  class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_customer" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->

                <!-- <el-select filterable @change="replace_cutomer2s()" v-if="(type!='detail'?true:false)&&(replace_cutomer2=='')"
                  :disabled="type=='detail'?true:false" v-model="formLabelAlign.customer2.reference" filterable
                  placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_customer" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->

                <span v-if="type=='detail'?true:false">{{replace_cutomer1}}</span>
                <!-- <input placeholder="input" v-model="formLabelAlign.customer2" :disabled="type=='detail'?true:false" class="tem_input" style="width: 90%;"> -->
                <!-- <span @click="dialogVisible = true" style="color: #409EFF;cursor: pointer;font-size: 20px;">+</span> -->

                <span v-show="customer2.reference==''&&type!='detail'" @click="dialogVisible = true"
                  style="color: #409EFF;cursor: pointer;font-size: 12px;">Add</span>
                <span v-show="customer2.reference!=''&&type!='detail'" @click="clear('2')" style="color: #409EFF;cursor: pointer;font-size: 12px;">Clear</span>

<!--                <span v-show="formLabelAlign.customer2.reference==''&&type!='detail'" @click="dialogVisible = true"
                  style="color: #409EFF;cursor: pointer;font-size: 12px;">Add</span>
                <span v-show="formLabelAlign.customer2.reference!=''&&type!='detail'" @click="clear('2')" style="color: #409EFF;cursor: pointer;font-size: 12px;">Clear</span> -->
              </p>
            </el-col>



            <!-- <el-col :span="8">
					<span class="fl">Product:</span>
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
					<span class="fl">Category:</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.gold" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

            <el-col :span="8" class='table_border table_t table_l table_r '>
              <span class="fl">Buying Date:</span>
              <p v-if="type!='detail'?true:false" style="overflow: hidden;">
                <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.dateBuying" type="date" placeholder="select"
                  style='width: 100%;' :disabled="type=='detail'?true:false">
                </el-date-picker>
              </p>
              <span v-if="type=='detail'?true:false">{{formLabelAlign.dateBuying}}</span>
            </el-col>

            <el-col :span="8" class='table_border table_t  table_r table_b'>
              <span class="fl">Big Date:</span>
              <p v-if="type!='detail'?true:false" style="overflow: hidden;">
                <el-date-picker @change="ChangeCollection()" format="yyyy-MMM-dd" v-model="formLabelAlign.dateBig" type="date"
                  placeholder="select" style='width: 100%;border-bottom: 0;' :disabled="type=='detail'?true:false">
                </el-date-picker>
              </p>
              <span v-if="type=='detail'?true:false">{{formLabelAlign.dateBig}}</span>
            </el-col>

            <el-col :span="8" class='table_border table_t  table_r table_b'>
              <span class="fl">Collection Date:</span>
              <p v-if="type!='detail'?true:false" style="overflow: hidden;">
                <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.dateCollection" type="date" placeholder="select"
                  style='width: 100%;' :disabled="type=='detail'?true:false">
                </el-date-picker>
              </p>
              <span v-if="type=='detail'?true:false">{{formLabelAlign.dateCollection}}</span>
            </el-col>

            <!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">金:</span>
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
              <span class="fl">Deliveried Date:</span>
              <p v-if="type!='detail'?true:false" style="overflow: hidden;">
                <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.dateDeliveried" type="date" placeholder="select"
                  style='width: 100%;' :disabled="type=='detail'?true:false">
                </el-date-picker>
              </p>
              <span v-if="type=='detail'?true:false">{{formLabelAlign.dateDeliveried}}</span>
            </el-col>

            <!-- <el-col :span="8" class='table_border   table_r table_b' v-if="formLabelAlign.maintenance==1">
						<span class="fl">maintain:</span>
						<p style="overflow: hidden;">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 70%;" @change="items" :disabled="type=='detail'?true:false">
								<el-option v-for='(item, index) in Items_list' :label="item.name" :value="index"></el-option>
								</el-option>
							</el-select>
						</p>
					</el-col> -->

            <!-- <el-col :span="8" class='table_border table_t table_b table_r '>
						<span class="fl">oder type:</span>
						<p style="overflow: hidden;">

							<el-select @change="oderType()" v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="oderType" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
								<el-option
								  v-for="item in oderType_list"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>

						</p>

					</el-col> -->

            <!-- <el-col :span="8" class='table_border  table_t table_r table_b'>
						<span class="fl">Order Display:</span>
						<p style="overflow: hidden;">
							<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
						</p>
					</el-col> -->

            <el-col :span="8" class='table_border table_b  table_r'>
              <span class="fl">Status:</span>
              <p style="overflow: hidden;white-space: nowrap;">


                <el-select clearable @change="replace_statuss()"
                  :disabled="type=='detail'?true:false" v-model="replace_status" filterable placeholder="select" class="tem_input"
                  style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>



                <!-- <el-select clearable @change="replace_statuss()" v-if="(type!='detail'?true:false)&&(replace_status!='')"
                  :disabled="type=='detail'?true:false" v-model="replace_status" filterable placeholder="select" class="tem_input"
                  style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <el-select clearable @change="replace_statuss()" v-if="(type!='detail'?true:false)&&(replace_status=='')"
                  :disabled="type=='detail'?true:false" v-model="formLabelAlign.status.reference" filterable
                  placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in options_status" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->

                <span v-if="type=='detail'?true:false">{{formLabelAlign.status.text}}</span>




              </p>
            </el-col>

            <!-- <el-col :span="8" class='table_border   table_r table_b'>
						<span class="fl">保修:</span>
						<p style="overflow: hidden;">
							<el-switch v-model="maintain_activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
						</p>
					</el-col> -->



            <!-- 					<el-col :span="8" class='table_border   table_b table_r' v-if="oderType=='CONSIGN'">
						<span class="fl">CONSIGN:</span>
						<p style="overflow: hidden;white-space: nowrap;">

							<el-select filterable v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="select_item" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
								<el-option
								  v-for="item in CONSIGN_list"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>



							<span v-if="type=='detail'?true:false">{{select_item}}</span>

						</p>
					</el-col> -->

            <!-- 					<el-col :span="8" class='table_border   table_b table_r' v-if="oderType=='PRODUCT'">
						<span class="fl">PRODUCT:</span>
						<p style="overflow: hidden;white-space: nowrap;">

							<el-select filterable v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="select_item" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
								<el-option
								  v-for="item in PRODUCT_list"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>

							<span v-if="type=='detail'?true:false">{{select_item}}</span>

						</p>
					</el-col> -->

            <!-- <el-col :span="8" class='table_border   table_b table_r' v-if="oderType=='MAINTENANCE'">
						<span class="fl">MAINTENANCE:</span>
						<p style="overflow: hidden;white-space: nowrap;">

							<el-select filterable v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="select_item" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
								<el-option
								  v-for="item in MAINTENANCE_list"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>

							<span v-if="type=='detail'?true:false">{{select_item}}</span>

						</p>
					</el-col> -->

            <!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">數量:</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.amount" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col> -->

            <!-- <el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">類別:</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.type" :disabled="type=='detail'?true:false" class="tem_input">
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

          <!-- margin-left: 1%; -->
          <div style='padding: 5px;width: 100%;margin-top: 10px;'>

            <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
              <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
              <span class="fl" style="padding: 0 5px;">Product information:</span>
              <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
            </div>



            <div style="background: rgb(233,238,244);padding: 15px 20px;width: 100%;border-radius: 10px;white-space: nowrap">
              <el-row style='text-align: center;'>

                <el-col :span="2">
                  <div class="grid-content">Sales</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content">Product</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content">Material</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content">Item</div>
                </el-col>

                 <el-col :span="1">
                  <div class="grid-content">Size</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content">UNIT HKD</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content">Quantity</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content ">Total HKD</div>
                </el-col>

                <el-col :span="2">
                  <div class="grid-content ">Net Amount</div>
                </el-col>

                <el-col :span="3">
                  <div class="grid-content ">Collection</div>
                </el-col>

                <el-col :span="3">
                  <div class="grid-content ">Deliveried</div>
                </el-col>

              </el-row>

              <el-row v-for='(item,index) in formLabelAlign.items' >


                <el-col :span="2">
                  <div class="input-content">
                    <el-select clearable :disabled="type=='detail'?true:false" v-model="item.sales" filterable placeholder="select"
                      class="tem_input" style="width: 100%;margin: 0;height: 25px;">
                      <el-option v-for="item in oderType_list" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content">

                    <!-- <div @click='select_indexs(index)' style="width: 100%;height: 100%;background: white;padding: 0 5px;">{{item.product.name==''?'select':item.product.name}}</div> -->
                    <!-- <span style="width: 100%;height: 25px;" @click='select_indexs(index)'>{{item.name}}</span> -->
                    <el-input @focus='select_indexs(index)' placeholder="input" class='grid-inputs' v-model="item.product.name"
                      :disabled="(type=='detail'?true:false)||(item.sales=='CUSTOMIZE'?true:false)"></el-input>

                    <!-- <el-select @focus='select_indexs(index)' v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false" v-model="item.name" filterable placeholder="select" class="tem_input" style="width: 100%;margin: 0;height: 25px;"> -->
                    <!-- <el-option
										  v-for="item in oderType_list"
										  :key="item.value"
										  :label="item.label"
										  :value="item.value">
										</el-option> -->
                    <!-- </el-select> -->
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content"  >
                    <el-select clearable @change="change_price(index)"
                      :disabled="type=='detail'?true:false" v-model="item.search_material"  placeholder="select"
                      class="tem_input" style="width: 100%;margin: 0;height: 25px;">
                      <el-option v-for="items in item.search_material_list" :key="items.reference" :label="items.material.name+','+items.material.color.name" :value="items.price">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content">

                    <el-input placeholder="input" class='grid-inputs' v-model="item.description" :disabled="type=='detail'?true:false"></el-input>
                  </div>
                </el-col>

                <el-col :span="1">
                  <div class="input-content">
                    <el-input @change="surcharge(item.select_reference,item.size,index)" placeholder="input" class='grid-inputs' v-model="item.size"
                      :disabled="(type=='detail'?true:false)||(item.sales=='GEM'?true:false)"></el-input>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content">
                    <el-input @change="unitPrice(index)" placeholder="input" class='grid-inputs' v-model="item.priceUnit"
                      :disabled="type=='detail'?true:false"></el-input>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content">
                    <el-input @change="unitPrice(index)" type="number" placeholder="input" class='grid-inputs' v-model="item.quantity"
                      :disabled="type=='detail'?true:false"></el-input>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content">
                    <el-input placeholder="input" class='grid-inputs' v-model="item.priceTotal" :disabled="type=='detail'?true:true"></el-input>
                  </div>
                </el-col>

                <el-col :span="2">
                  <div class="input-content">
                    <el-input @change="total()" placeholder="input" class='grid-inputs' v-model="item.priceNet"
                      :disabled="type=='detail'?true:false"></el-input>
                  </div>
                </el-col>

                <el-col :span="3">
                  <div class="input-content">
                    <el-date-picker format="yyyy-MMM-dd" v-model="item.dateCollection" type="date" placeholder="select"
                      style='width: 100%;font-size: 12px;' :disabled="type=='detail'?true:false">
                    </el-date-picker>
                    <!-- <el-input @change="total()" placeholder="input" class='grid-inputs' v-model="item.priceNet" :disabled="type=='detail'?true:false"></el-input> -->
                  </div>
                </el-col>

                <el-col :span="3">
                  <div class="input-content">
                    <el-date-picker format="yyyy-MMM-dd" v-model="item.dateDeliveried" type="date" placeholder="select"
                      style='width: 100%;font-size: 12px;' :disabled="type=='detail'?true:false">
                    </el-date-picker>
                    <!-- <el-input @change="total()" placeholder="input" class='grid-inputs' v-model="item.priceNet" :disabled="type=='detail'?true:false"></el-input> -->
                  </div>
                </el-col>

                <!-- <el-col :span="5"> -->
                  <!-- <div class="input-content"> -->
                    <!-- <span>Material:{{item.material==null?"":item.material.name}}</span> -->

                    <!-- <el-input style='width: 70%;'  placeholder="input" class='grid-inputs' v-model="item.material.name" :disabled="type=='detail'?true:false"></el-input> -->
                  <!-- </div> -->
                <!-- </el-col> -->

                <!-- <el-col :span="5">
                  <div class="input-content">
                    <span>Size:</span>
                    <el-input style='width: 70%;' placeholder="input" class='grid-inputs' v-model="item.size" :disabled="type=='detail'?true:false"></el-input>
                  </div>
                </el-col> -->






                <el-col :span="1">
                  <div class="input-content " style="text-align: left;color: red;margin-left: 20px;line-height: 40px;">
                    <span style="cursor: pointer;" class='grid-inputs' @click="del(index)" v-if="type!='detail'">Delete</span>
                  </div>
                </el-col>

              </el-row>
              </el-row>

              <el-row>
                <el-col :span="22">
                  <div class="input-content ">
                    <img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;margin-left: 50%;"
                      src="../../../image/add.png" v-if="type!='detail'" />
                  </div>
                </el-col>
              </el-row>


            </div>

          </div>
        </div>




        <!-- ||||||||||||||||||||| -->

        <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 30px;background: rgb(0,191,255);color: white;margin-bottom: 5px;"
          class="MoBangXinZeng">
          <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
          <span class="fl" style="padding: 0 5px;">Payment Details</span>
          <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
        </div>

        <!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Pay Information</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div> -->
        <!-- ||||||||||||||||||||| -->
        <div class="MoBangXinZeng">
          <el-row style='line-height: 35px;'>


            <!-- <el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">Total price:</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.total" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col> -->

            <el-col :span="8" class='table_border table_t table_l table_r '>
              <span class="fl">Total Discount:</span>
              <p style="overflow: hidden;">
                <input @change='total()' v-model="formLabelAlign.discount" disabled class="tem_input">
              </p>
            </el-col>

            <el-col :span="8" class='table_border table_t  table_r '>
              <span class="fl">Coupon:</span>
              <p style="overflow: hidden;">
                <input @change="check_Coupon()" v-model="coupon" :disabled="type=='detail'?true:false" class="tem_input">
              </p>
            </el-col>




            <el-col :span="8" class='table_border table_t  table_r  '>
              <span class="fl">Total Net:</span>
              <p style="overflow: hidden;">
                <input v-model="formLabelAlign.totalNet" :disabled="type=='detail'?true:false" class="tem_input">
              </p>

            </el-col>

            <!-- <el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">discount:</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.discount" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col> -->

            <el-col :span="8" class='table_border table_t  table_r table_l'>
              <span class="fl">1st Payment:</span>
              <p style="overflow: hidden;">
                <input @change="balance()" v-model="formLabelAlign.payment1" :disabled="type=='detail'?true:false"
                  class="tem_input">
              </p>
            </el-col>


            <el-col :span="8" class='table_border table_t  table_r '>
              <span class="fl">1st Payment Method:</span>
              <p style="overflow: hidden;">

                <!-- <input  v-model="formLabelAlign.payment1Method" :disabled="type=='detail'?true:false" class="tem_input"> -->

                <el-select clearable @change="pay_change(1)" v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false"
                  v-model="payment1Method" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <input v-if="type=='detail'?true:false" v-model="formLabelAlign.payment1Method" :disabled="type=='detail'?true:false"
                  class="tem_input">
              </p>

            </el-col>

            <el-col :span="8" class='table_border table_t  table_r'>
              <span class="fl">1st Payment Date:</span>
              <p v-if="type!='detail'?true:false" style="overflow: hidden;">
                <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.payment1Date" type="date" placeholder="select"
                  style='width: 100%;' :disabled="type=='detail'?true:false">
                </el-date-picker>
              </p>
              <span v-if="type=='detail'?true:false">{{formLabelAlign.payment1Date}}</span>
            </el-col>







          </el-row>
        </div>
        <!-- ||||||||||||||||||||| -->
        <div class="MoBangXinZeng">
          <el-row style='line-height: 35px;'>


            <!-- <el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">final 金額:</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.payment2" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col> -->

            <el-col :span="8" class='table_border table_t  table_r table_l'>
              <span class="fl">2nd Payment:</span>
              <p style="overflow: hidden;">
                <input @change="balance()" v-model="formLabelAlign.payment2" :disabled="type=='detail'?true:false"
                  class="tem_input">
              </p>
            </el-col>

            <el-col :span="8" class='table_border table_t  table_r table_b'>
              <span class="fl">2nd Payment Method:</span>
              <p style="overflow: hidden;">

                <!-- <input  v-model="formLabelAlign.payment2Method" :disabled="type=='detail'?true:false" class="tem_input"> -->

                <el-select clearable @change="pay_change(2)" v-if="type!='detail'?true:false" :disabled="type=='detail'?true:false"
                  v-model="payment2Method" filterable placeholder="select" class="tem_input" style="width: 90%;margin: 0;height: 25px;">
                  <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>

                <input v-if="type=='detail'?true:false" v-model="formLabelAlign.payment2Method" :disabled="type=='detail'?true:false"
                  class="tem_input">
              </p>

            </el-col>

            <el-col :span="8" class='table_border table_t table_b table_r '>
              <span class="fl">2nd Payment Date:</span>
              <p v-if="type!='detail'?true:false" style="overflow: hidden;">
                <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.payment2Date" type="date" placeholder="select"
                  style='width: 100%;' :disabled="type=='detail'?true:false">
                </el-date-picker>
              </p>
              <span v-if="type=='detail'?true:false">{{formLabelAlign.payment2Date}}</span>
            </el-col>




            <el-col :span="8" class='table_border table_t table_l table_b  table_r '>
              <span class="fl">Balance:</span>
              <p style="overflow: hidden;">
                <input v-model="formLabelAlign.balance" :disabled="type=='detail'?true:true" class="tem_input">
              </p>

            </el-col>

            <!-- <el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">staff:</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.staff" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col> -->





          </el-row>
        </div>

        <!-- ||||||||||||||||||||| -->

        <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 30px;background: rgb(0,191,255);color: white;margin-bottom: 5px;margin-top: 10px;"
          class="MoBangXinZeng">
          <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
          <span class="fl" style="padding: 0 5px;">Remarks</span>
          <!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
        </div>

        <div>
          <el-row>
            <el-col :span="24">
              <textarea placeholder="input" v-model="formLabelAlign.remarks" :disabled="type=='detail'?true:false"
                style="width: 100%;" rows="5"></textarea>
              <!-- <span class="fl">Remarks:</span> -->
              <!-- <p style="overflow: hidden;"> -->
              <!-- <input type="textarea"  :rows="10" v-model="formLabelAlign.remarks" :disabled="type=='detail'?true:false" > -->
              <!-- </p> -->
            </el-col>
          </el-row>
        </div>

      <!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 30px;background: rgb(0,191,255);color: white;margin-bottom: 5px;margin-top: 10px;" class="MoBangXinZeng">
      	<span class="fl" style="padding: 0 5px;">Sales info</span>
      </div> -->

     <!-- <div>

      	<div style='padding: 5px;width: 96%;margin-left: 2%;margin-top: 10px;'>

      		<div style="background: rgb(233,238,244);padding: 15px 20px;width: 100%;border-radius: 10px;white-space: nowrap">
      			<el-row style='text-align: center;'>

      				<el-col :span="3">
      					<div class="grid-content">Sales</div>
      				</el-col>

      			</el-row>

      			<el-row v-for='(item,index) in Sales_list_num'>

      				<el-col :span="3">
      					<div class="input-content">
      						<el-select   :disabled="type=='detail'?true:false" v-model="item.reference" filterable placeholder="select" class="tem_input" style="width: 100%;margin: 0;height: 25px;">
      							<el-option
      							  v-for="item in Sales_list"
      							  :key="item.value"
      							  :label="item.label"
      							  :value="item.value">
      							</el-option>
      						</el-select>
      					</div>
      				</el-col>

      				<el-col :span="1">
      					<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
      						<span style="cursor: pointer;" class='grid-inputs' @click="del_sales(index)" v-if="type!='detail'">Delete</span>
      					</div>
      				</el-col>

      			</el-row>
      			</el-row>

      			<el-row>
      				<el-col :span="3">
      					<div class="input-content ">
      						<img @click="add_sales" style="width: 30px;height: 30px;cursor: pointer;margin: 10px auto;display: block;" src="../../../image/add.png"
      						 v-if="type!='detail'" />
      					</div>
      				</el-col>
      			</el-row>


      		</div>

      	</div>
      </div> -->


      </div>




      <div style="width:100%;text-align: center;margin-top: 45px;" class="printhide">

        <el-button :loading="loading" type="primary" @click="submitForm01('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
        <!-- <el-button :loading="loading" type="primary" @click="print()" v-if="type=='alert'">Submit</el-button> -->
        <el-button :loading="print_loading" type="primary" @click="print()" v-if="type=='alert'">Print</el-button>
        <el-button type="primary" @click="cancel()">Back</el-button>

      </div>

    </el-form>


    <el-dialog title="Select Product" :visible.sync="select_item" width="70%" :before-close="handleClose">
      <div>

        <div style="margin: 0px auto;width: 300px;height: 50px;">
          <el-input v-model="seek" placeholder="Name" style='font-size: 14px;float: left;margin-left: 10px;width: 200px;height: 40px;line-height: 40px;'></el-input>
          <el-button type="primary" @click="search_product" style='margin-left: 10px;float: left;font-size: 14px;padding: 0 10px;height:40px;border:0;background: rgb(5,120,209);'>Search</el-button>
        </div>

        <el-table :data="tableData02" height="650" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
          <el-table-column type="index" row-style='background:red'>
          </el-table-column>
          <!-- <el-table-column prop="jewelryType.type" label="pictury" row-style='background:red'>
		  		</el-table-column> -->
          <el-table-column prop="weight" label="Pictury">
            <template slot-scope="scope">
              <!-- <span type="text" size="small" style="">{{scope.row.totalWeight}}</span>
		  				<span type="text" size="small" style="">{{scope.row.weightUnit}}</span> -->
              <img style="height: 50px;" :src="root+'/kernal/asset/'+scope.row.photo.reference" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name">
          </el-table-column>
          <el-table-column prop="category.name" label="Category">
          </el-table-column>
          <el-table-column prop="codeDesign" label="Design code">
          </el-table-column>
          <el-table-column prop="codePro" label="Product code">
          </el-table-column>

          <div class="Action">
            <el-table-column fixed="right" label="Action" style='background: red;' width="100px">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">

                  <el-button v-if="scope.row.surcharge_ring!=null" @click="Select(scope.row.reference,scope.row.name,scope.row.unit_price,scope.row.unit_cost,scope.row.material,scope.row.size,scope.row.surcharge_ring.reference)"
                    type="danger" size="small">Select</el-button>
                  <el-button v-if="scope.row.surcharge_ring==null" @click="Select(scope.row.reference,scope.row.name,scope.row.unit_price,scope.row.unit_cost,scope.row.material,scope.row.size,null)"
                    type="danger" size="small">Select</el-button>
                </div>
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
    </el-dialog>

    <el-dialog title="Select Gem" :visible.sync="select_item_ring" width="70%" :before-close="handleClose">
      <div>

        <!-- <el-select style='height: 48px;width: 130px;float: right;' v-model="branch" @change="search_ring()">
          <el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
        </el-select> -->

        <div style="margin: 0px auto;width: 300px;height: 50px;">
          <el-input v-model="seek_ring" placeholder="Sales No" style='font-size: 14px;float: left;margin-left: 10px;width: 200px;height: 40px;line-height: 40px;'></el-input>
          <el-button type="primary" @click="search_ring" style='margin-left: 10px;float: left;font-size: 14px;padding: 0 10px;height:40px;border:0;background: rgb(5,120,209);'>Search</el-button>
        </div>

        <el-table :data="tableData02_ring" height="650" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>

          <el-table-column type="index" row-style='background:red'>
          </el-table-column>

          <el-table-column prop="gem.type" label="Name" width='200'>
          </el-table-column>

         <!-- <el-table-column prop="material.name" label="Material">
          </el-table-column> -->

          <el-table-column prop="storageQuantity" label="Stock">
          </el-table-column>

          <el-table-column prop="dimension" label="Dimension">
            <template slot-scope="scope">

                <span >{{scope.row.dimension}}{{scope.row.dimensionUnit}}</span>

            </template>
          </el-table-column>

          <el-table-column prop="Cost" label="Cost">
            <template slot-scope="scope">


                <span >{{(scope.row.cost)/(scope.row.totalQuantity)}}</span>

            </template>
          </el-table-column>

          <div class="Action">
            <el-table-column fixed="right" label="Action" style='background: red;' width="100px">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">

                  <el-button @click="Select_ring(scope.row.reference,scope.row.gem.type,(scope.row.cost)/(scope.row.totalQuantity))"
                    type="danger" size="small">Select</el-button>
                </div>
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
    </el-dialog>

    <div class="dialog">
      <el-dialog title="" :visible.sync="select_show" width="300px" top='20%'>
        <span>Please select sales！</span>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="select_show = false">OK</el-button>
        </span>
      </el-dialog>
    </div>


    <div style="margin: 0 auto;	" v-show="false" >

    <!-- 	transform: scale(2,4);
    	-ms-transform: scale(0.5,0.5);
    	-webkit-transform: scale(0.5,0.5);
    	-o-transform: scale(0.5,0.5);
    	-moz-transform: scale(0.5,0.5); -->

    	<div style="width: 1100px;">
    	<div class="CustomerOrderDetail" v-loading='all_loading' id='Allprint' >

    		<div id="details" >

    			<div id="app" class="invoice_test" style="margin: auto;">
    				<div id="pdfDom" class="bgw " style="padding: 0px 50px;">
    					<div class="lh75  bold " style="text-align: center;font-size: 30px;margin-bottom: 20px;" >
    						<img src="../../../public/resources/images/font_logo.png" style="width: 30%;" />
    					</div>
    					<div style="text-align: center;font-size: 40px;">
    						<b>INVOICE</b>
    					</div>
    					<div class="lh25 h25 bgw">
    						<div class="fl ft10">
    							<div class="fl w75 textr">Customer1:</div>
    							<div class="fl">{{formLabelAlign_print.customer1!=null?formLabelAlign_print.customer1.customeName:''}}</div>
    						</div>
    						<div class="fr w260 ft10">
    							<div class="fl w185 textr">Sales No:</div>
    							<div class="fl">{{formLabelAlign_print.salesNo}}</div>
    						</div>
    					</div>
    					<div class="lh25 h25 bgw">
    						<div class="fl ft10">
    							<div class="fl w75 textr">Customer2:</div>
    							<div class="fl">{{formLabelAlign_print.customer2!=null?formLabelAlign_print.customer2.customeName:''}}</div>
    						</div>
    						<div class="fr w260 ft10">
    							<div class="fl w185 textr">Buying Date:</div>
    							<div class="fl">{{formLabelAlign_print.dateBuying}}</div>
    						</div>
    					</div>
    					<div class="lh25 h25 bgw ft10">
    						<div class="fl ">
    							<div class="fl w75 textr ft10">Big day:</div>
    							<div class="fl">{{formLabelAlign_print.dateBig}}</div>
    						</div>
    						<div class="fr w260 ft10">
    							<div class="fl w185 textr ">Collection Date:</div>
    							<div class="fl">{{formLabelAlign_print.dateCollection}}</div>
    						</div>
    					</div>
    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-12">
    								<div class="title-content no_borderr">ITEM DESCRIPTION</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="title-content no_borderr">UNIT HKD</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="title-content no_borderr">QTY</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="title-content no_borderr">Total HKD</div>
    							</div>
    							<div class="el-col el-col-3">
    								<!-- <div class="title-content ">Net Amount</div> -->
    								<div class="title-content ">Amount</div>
    							</div>
    						</div>
    					</div>
    					<!-- <div>
    						<div class="el-row">
    							<div class="el-col el-col-12">
    								<div class="item-content textl padl5 padr5 no_borderr">
    									<div>{{formLabelAlign.customer1}} {{formLabelAlign.customer2}} {{formLabelAlign.designCode}} {{formLabelAlign.gold}} {{formLabelAlign.goldColour}} {{formLabelAlign.product}}</div>
    									<div>Size:{{formLabelAlign.size1}}(HK Size) w:As sample T:As sample</div>
    									<div>Stone:Diamonds around:20/0.11ct</div>
    								</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content textl padl5 padr5 h60 no_borderr">$7,780</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content textl padl5 padr5 h60 no_borderr">1</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content textl padl5 padr5 h60 no_borderr">$7,780</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content textl padl5 padr5 h60 ">$7,500</div>
    							</div>
    						</div>
    					</div> -->
    					<div v-for="item in formLabelAlign_print.items">
    						<div class="el-row">
    							<div class="el-col el-col-12">
    								<div class="item-content textl padl5 padr5 padt30 no_borderr">
    									<div>{{item.description}}</div>
    									<div>Size: w: T:{{t}} around:</div>
    									<div>Stone:{{item.stone}} NO:</div>
    								</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content  padl5 padr5  padt30 no_borderr" >${{item.priceUnit}}</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content  padl5 padr5  padt30 no_borderr" >{{item.quantity}}</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content  padl5 padr5  padt30 no_borderr" >${{item.priceTotal}}</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content  padl5 padr5  padt30" >${{item.priceNet}}</div>
    							</div>
    						</div>
    					</div>

    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="item-content textl padl5 padr5  bordert borderb no_borderr" style="height: 40px;line-height: 40px;">
    									<div class="textr ">Total Price:</div>
    								</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content textl padl5 padr5 h20  bordert borderb no_borderr" style="height: 40px;line-height: 40px;" >${{formLabelAlign_print.total}}</div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="item-content textl padl5 padr5 h20  bordert borderb" style="height: 40px;line-height: 40px;" ></div>
    							</div>
    						</div>
    					</div>

    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fl">Remark:</span> <span class="fr">Total
    										Discount:</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 borderb  borderl borderr ">${{formLabelAlign_print.discount}}</div>
    							</div>
    						</div>
    					</div>

    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fl">Code remark:</span> <span class="fr">Total
    										Net:</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 borderb  borderl borderr ">${{formLabelAlign_print.totalNet}}</div>
    							</div>
    						</div>
    					</div>

    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fl">Ref Date:</span> <span class="fr">1st
    										Payment:</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 borderb  borderl borderr ">${{formLabelAlign_print.payment1}}</div>
    							</div>
    						</div>
    					</div>
    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fr">2nd Payment:</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 borderb  borderl borderr ">${{formLabelAlign_print.payment2}}</div>
    							</div>
    						</div>
    					</div>
    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fr">Balance:</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 borderb  borderl borderr ">${{formLabelAlign_print.balance}}</div>
    							</div>
    						</div>
    					</div>
    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fl">1st Payment:{{formLabelAlign_print.payment1Method===null?"":formLabelAlign_print.payment1Method.method}} {{formLabelAlign_print.payment1Date}}</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 "></div>
    							</div>
    						</div>
    					</div>
    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fl">Final Payment:{{formLabelAlign_print.payment2Method===null?"":formLabelAlign_print.payment2Method.method}} {{formLabelAlign_print.payment2Date}}</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 "></div>
    							</div>
    						</div>
    					</div>
    					<div>
    						<div class="el-row">
    							<div class="el-col el-col-18">
    								<div class="remark-content textl padl5 padr5   "><span class="fl">REMARKS:{{formLabelAlign_print.remarks}}，</span> <span class="fl">STAFF:{{formLabelAlign_print.member.nickname}}</span></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20  "></div>
    							</div>
    							<div class="el-col el-col-3">
    								<div class="remark-content textl padl5 padr5 h20 "></div>
    							</div>
    						</div>
    					</div>
    					<div class="padb30 " >
    						<div class="el-row">
    							<div class="el-col el-col-17">
    								<div class="remark-content textl padl5 padr5 " >
    									<div class="mat20 underline">NOTES TO CUSTOMER</div>
    									<div style="font-size: 18px;line-height: 30px;">PLEASE ACKNOWLEDGE THAT THE PRODUCTS ARE RECEIVED IN GOOD CONDITION. </div>
    									<div style="font-size: 18px;line-height: 30px;">KINDLY NOTE THAT GOODS SOLD ON THIS INVOICE ARE NON-REFUNDABLE.</div>
    									<div style="font-size: 18px;line-height: 30px;">Update V2 Sept 2018,owned By Pour La Vie International Limited</div>
    								</div>
    							</div>

    							<div class="el-col el-col-5" style="float: right;">
    								<div class="remark-content textl padl5 padr5   " style="font-size: 25px;line-height: 35px;">POUR LA VIE</div>
    								<div class="remark-content textl padl5 padr5   " style="font-size: 25px;line-height: 35px;">Room1401B,14/F Lee Garden Five,18 Hysan Avenue,Causeway Bay,Hong Kong.</div>
    								<div class="remark-content textl padl5 padr5   " style="font-size: 25px;line-height: 35px;">T:+852 2776 3300</div>
    								<div class="remark-content textl padl5 padr5   " style="font-size: 25px;line-height: 35px;">F:+852 2776 3633</div>
    								<div class="remark-content textl padl5 padr5   " style="font-size: 25px;line-height: 35px;">www.pourlavie.com</div>
    								<div class="remark-content textl padl5 padr5   " style="font-size: 25px;line-height: 35px;">info@pourlavie.com</div>
    							</div>
    							<!-- <div class="new-page" style="text-align: center">1</div> -->
    						</div>

    					</div>



    				</div>




    				<!-- <div id="footer" style="break-after: page; position: fixed; bottom: 0px; line-height: 50px; font-size: 8px; width: 100%; text-align: center;">
    					page <span id="pagenumber"></span> of <span id="pagecount"></span>
    				</div> -->

    				<!-- <div style="break-after: page; position: fixed; bottom: 0px; line-height: 50px; font-size: 8px; width: 100%; text-align: center;">1</div> -->
    			</div>







    	</div>


    	</div>
    	</div>
    	<div style="text-align: center;" >
    		<div style='margin: 30px auto;' class="printhide">
    			<!-- <el-button  :loading="loading" @click='getPdflog()'>打印</el-button> -->
    			<el-button  :loading="loading" @click='print()'>打印</el-button>
    			<el-button @click='cancel()'>返回</el-button>
    		</div>
    	</div>
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


        	formLabelAlign_print: {
        	a1StPayment: "",
        	a2NdPayment: "",
        	address: "",
        	balance: "",
        	bigDay: "",
        	buyingDate: "",
        	codeRemark: "",
        	collectionDate: "",
        	condition: "",
        	customer1: "",
        	customer1Reference: "",
        	customer2: "",
        	customer2Reference: "",
        	email: "",
        	f: "",
        	finalPayment: "",
        	httpUrl: "",
        	id: "",
        	made: "",
        	notesToCustomer: "",
        	onLock: "",
        	payment: "",
        	plvKAVIEceType: "",
        	plvKAVIEcesEntityList: "",
        	plvKAviEceOemEntityList: "",
        	plvKGuestBillcol: "",
        	pourLaVie: "",
        	purged: "",
        	refDate: "",
        	reference: "",
        	remark: "",
        	remarks: "",
        	revised: "",
        	salesNo: "",
        	staff: "",
        	t: "",
        	totalDiscount: "",
        	totalNet: "",
        	totalPrice: "",
        	userName: "",
        	userRefenece: "",
        	member:{
        		nickname:''
        	},
          payment1Method:null,
          payment2Method:null
        },


        copy_customer01:'',
        copy_customer02:'',
        select_customer01:{
          value: "",
          label: "",
          reference:""
        },
        select_customer02:{
          value: "",
          label: "",
          reference:""
        },
        tableData02_ring: [],
        seek_ring: '',
        seek: '',
        tableData03: [],
        Sales_list_num: [{
          reference: ''
        }],
        Sales_list: [],
        coupon: '',
        replace_cutomer1: '',
        replace_cutomer2: '',
        replace_status: '',
        plvKGuestBillType: [],
        type_list: [],
        nameId: '',
        nameId1: '',
        userReferenceId: '',
        branch: '',
        branchId: '',
        branch_list: [],
        maintain_list: [],
        Items_list: [],
        CONSIGN_list: [],
        PRODUCT_list: [],
        MAINTENANCE_list: [],
        tableData02: [],
        options_status: [],
        options_material:[],
        test: '',
        root: '',
        select_index: '',
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        select_item_ring: false,
        select_item: false,
        select_show: false,
        oderType: 'CUSTOMIZE',
        oderType_list: [

          // {
          // 	value:'CONSIGN',
          // 	lebel:'CONSIGN'
          // },
          {
            value: 'PRODUCT',
            lebel: 'PRODUCT'
          },
          {
            value: 'GEM',
            lebel: 'GEM'
          },
          {
            value: 'CUSTOMIZE',
            lebel: 'CUSTOMIZE'
          }
        ],

        dialogVisible: false,
        all_loading: false,
        loading: false,
        print_loading:false,
        dialogVisible: false,
        customer_loading: false,
        activateds: false,
        maintain_activateds: false,
        Items: '',
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
          label: 'Male'
        }, {
          value: '2',
          label: 'Female'
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
        payment1Method: '',
        payment2Method: '',

        "customer1": {
          reference: ''
        },
        "customer2": {
          reference: ''
        },

        formLabelAlign: {
          "balance": 0,
          "coupon": null,
          "customer1": {
            reference: ''
          },
          "customer2": {
            reference: ''
          },
          "dateBig": "",
          // "dateBuying": "",
          // "dateBig": new Date().format("yyyy-MM-dd"),
          "dateBuying": new Date().format("yyyy-MM-dd"),
          "dateCollection": "",
          "dateDeliveried": null,
          "status": {

            "text":"",
            "reference": "",

          },
          "discount": 0,
          "maintenance": 0,
          "display": 0,



          "items": [{
            sales: "",
            product: {
              name: '',
              reference: '',
              unit_price: 0
            },
            gem: {

              reference: '',

            },
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
            "stone": 0,
            "size": "",
            "select_reference":"",
            "select_price":'',
            "search_material":'',
            "search_material_list":[]
          }],
          "maintain": {
            reference: null
          },
          "notes": "",
          "payment1": 0,
          "payment1Date": null,
          "payment1Method": {
            reference: ""
          },
          "payment1Settled": 1,
          "payment2": 0,
          "payment2Date": null,
          "payment2Method": {
            reference: ""
          },
          "payment2Settled": 0,
          "reference": null,
          "remarks": "",
          "salesNo": '',
          "total": 0,
          "totalNet": 0,
          "urgent": 1
        },

        payment: [],


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

      if(this.$route.query.uuid!=undefined){

        this.$api.get('/sales/' + this.$route.query.uuid, null, r => {

        	console.log('details----')
        	console.log(r)
        	this.formLabelAlign_print=r
        	this.formLabelAlign_print.dateBig=new Date(this.formLabelAlign_print.dateBig).format('yyyy-MMM-dd')
        	this.formLabelAlign_print.dateBuying=new Date(this.formLabelAlign_print.dateBuying).format('yyyy-MMM-dd')
        	this.formLabelAlign_print.dateCollection=new Date(this.formLabelAlign_print.dateCollection).format('yyyy-MMM-dd')
        	this.formLabelAlign_print.dateDeliveried=new Date(this.formLabelAlign_print.dateDeliveried).format('yyyy-MMM-dd')
        	this.formLabelAlign_print.payment1Date=new Date(this.formLabelAlign_print.payment1Date).format('yyyy-MMM-dd')
        	this.formLabelAlign_print.payment2Date=new Date(this.formLabelAlign_print.payment2Date).format('yyyy-MMM-dd')
        	this.all_loading=false
        	// this.formLabelAlign.customer1=this.formLabelAlign.customer1!=null?this.formLabelAlign.customer1.customeName:''
        	// this.formLabelAlign.customer2=this.formLabelAlign.customer2!=null?this.formLabelAlign.customer2.customeName:''
        })

      }




      this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {

        console.log('-------------')
        console.log(r)
        this.branch_list = r.content
        this.branch = r.content[0].name
        this.search()

      });

      this.$api.get('/miscellaneous/paymentmethod', null, r => {
        console.log('*---------*')
        console.log(r)

        for (let i = 0; i < r.length; i++) {
          this.payment.push({
            value: r[i].reference,
            label: r[i].method
          }, )
        }
        // this.formLabelAlign.salesNo=r

      });


      this.$api.get('/sales/next', null, r => {
        console.log('*---------*')
        console.log(r)

        this.formLabelAlign.salesNo = r

      });


      this.$api.get('/miscellaneous/orderstatus/sales', null, r => {
        for (let i = 0; i < r.length; i++) {
          this.options_status.push({
            value: r[i].reference,
            label: r[i].text
          })
        }
      });

      this.$api.get('/member/0/100000', null, r => {

        console.log('member')
        console.log(r)

        for (let i = 0; i < r.length; i++) {
          this.Sales_list.push({
            value: r[i].reference,
            label: r[i].identifier
          })
        }
      });


      // var today = new Date();
      // var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 60;
      // today.setTime(targetday_milliseconds);
      // this.formLabelAlign.dateDeliveried = today.format("yyyy-MM-dd")


      this.get_customer()

      this.findAllEntrepot()
      this.type = this.$route.query.type
      this.root = this.$api.root
      this.uuid = this.$route.query.uuid
      this.id = this.$route.query.id

      // /inventory/gem/certified
      // maintain_list



      this.$api.get('/product/consign/0/10000', null, r => {
        console.log('*---------*')
        console.log(r)

        this.CONSIGN_list = r

        this.search_ring()

      });


      this.search_product()

      this.$api.post('/product/1970-01-01/'+new Date().format("yyyy-MM-dd")+'/0/100000', {}, r => {
        console.log('*---------*')
        console.log(r)
        this.PRODUCT_list = r
      });

      // this.$api.get('/sales', null, r => {
      // 	console.log('*---------*')
      // 	console.log(r)
      //
      // 	for (let i = 0; i < r.length; i++) {
      // 		this.MAINTENANCE_list.push({
      // 			value:r[i].reference,
      // 			label:r[i].name
      // 		})
      // 	}
      //
      // });

      // CONSIGN_list:[],
      // PRODUCT_list:[],
      // MAINTENANCE_list:[],


      // /customers/seekAll


    },

    methods: {

      print(){

        this.print_loading=true

      	let dom = document.getElementById('Allprint')
      	console.log(dom)
      	this.$print(dom)



      },

      change_customer02(){
        this.copy_customer02=""
      },

      change_customer01(){
        this.copy_customer01=""
      },

      handleSelect(item) {
        console.log(item);
        this.select_customer01=item
      },

      handleSelect02(item) {
        console.log(item);
        this.select_customer02=item
      },

      querySearch(queryString, cb) {

        console.log('-1-')

        var restaurants = this.options_customer;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      search_material(index,reference){

        // this.options_material=

        //

        this.$api.get('/product/price/product/' + reference, null, r => {



          console.log('*---------*')
          console.log(r)
          this.formLabelAlign.items[index].search_material_list = r

        })


      },


      onSubmit() {

      },

      onSubmit_ring() {
        this.search_ring()
      },

      pay_change(index) {
        if (index == 1) {
          this.formLabelAlign.payment1Method.reference = ""
        } else if (index == 2) {
          this.formLabelAlign.payment2Method.reference = ""
        }
      },

      change_Discount() {

        var discount = 0
        var total_discount = 0
        for (let i = 0; i < this.formLabelAlign.items.length; i++) {
          discount = parseInt(this.formLabelAlign.items[i].priceTotal) - parseInt(this.formLabelAlign.items[i].priceNet)
          total_discount = total_discount + discount
        }

        if (total_discount < 0) {
          this.formLabelAlign.discount = 0
        } else {
          this.formLabelAlign.discount = total_discount
        }

      },

      check_Coupon() {

        this.$api.get('/sales/coupon/code/' + this.coupon, null, r => {

          // this.formLabelAlign.coupon.reference=r.reference

          console.log('*---------*')
          console.log(r)
          this.coupon = r
          // for (let i = 0; i < r.content.length; i++) {
          // 	this.options_customer.push({
          // 		value: r.content[i].reference,
          // 		label: r.content[i].customeName
          // 	})
          // }
          // this.customer_loading=false
          // this.dialogVisible = false
        }, f => {

          // this.coupon=''

        });

      },

      ChangeCollection() {

        if (this.formLabelAlign.dateBig == '' || this.formLabelAlign.dateBig == null) {
          this.formLabelAlign.dateCollection = ''
        } else {
          var today = new Date(this.formLabelAlign.dateBig);
          var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 14;
          today.setTime(targetday_milliseconds);
          this.formLabelAlign.dateCollection = today.format("yyyy-MM-dd")


        }


        // this.formLabelAlign.dateCollection=

      },

      replace_statuss() {
        // this.formLabelAlign.status.reference=this.replace_status
        // this.replace_status = ''

        if(this.replace_status!=this.formLabelAlign.status.text) {
          this.formLabelAlign.status.reference=this.replace_status
        }

      },

      replace_cutomer1s() {
        this.replace_cutomer1 = ''
      },

      replace_cutomer2s() {
        this.replace_cutomer2 = ''
      },


      unitPrice(index) {
        // this.formLabelAlign.items[index].priceNet=this.formLabelAlign.items[index].quantity*this.formLabelAlign.items[index].priceUnit
        this.formLabelAlign.items[index].priceTotal = this.formLabelAlign.items[index].quantity * this.formLabelAlign.items[
          index].priceUnit



        if (this.formLabelAlign.items[index].priceTotal == NaN) {
          console.log('00123456')
          this.formLabelAlign.items[index].priceTotal = 0
        }
      },

      surcharge(uuid,size,index){

        console.log('---uuid='+uuid)
        this.$api.get('/product/surcharge/ring/group/'+uuid, null, r => {

          console.log("/product/surcharge/ring/group/")
          console.log(r)

          for (let i = 0; i < r.length; i++) {
            if(size==r[i].size){

              console.log('/*-/*-/*-')
              console.log(r[i])



              this.formLabelAlign.items[this.select_index].priceUnit = parseInt(this.formLabelAlign.items[this.select_index].select_price)+ r[i].charges
              // this.formLabelAlign.items[this.select_index].quantity = 1
              this.formLabelAlign.items[this.select_index].priceNet = this.formLabelAlign.items[this.select_index].quantity *
              parseInt(this.formLabelAlign.items[this.select_index].priceUnit)

              this.formLabelAlign.items[this.select_index].priceTotal = parseInt(this.formLabelAlign.items[this.select_index].priceUnit) * this.formLabelAlign.items[this.select_index].quantity
            }
          }

          this.unitPrice(index)
          this.total()
          // var results = []
          // for (var i = 0; i < r.length; i++) {
          //   var temp = {
          //     "value": r[i].billStatus,
          //     "reference": r[i].reference,
          //     "id": r[i].id,
          //   }
          //   results.push(temp)
          // }
          // cb(results);
        });

      },

      Select_ring(reference, name,priceUnit) {

        // console.log(reference)
        // console.log(this.formLabelAlign.items)
        // console.log(this.formLabelAlign.items[this.select_index])
        // console.log(this.formLabelAlign.items[this.select_index])

        console.log('reference-----')
        console.log(reference)

        this.formLabelAlign.items[this.select_index].gem.reference = reference
        this.formLabelAlign.items[this.select_index].product.name = name

        this.formLabelAlign.items[this.select_index].description = name

        this.formLabelAlign.items[this.select_index].priceUnit = priceUnit

//         this.formLabelAlign.items[this.select_index].product.unit_price = charges
//         this.formLabelAlign.items[this.select_index].product.unit_cost = charges
//         this.formLabelAlign.items[this.select_index].quantity = 1
//         this.formLabelAlign.items[this.select_index].priceNet = this.formLabelAlign.items[this.select_index].quantity *
//           this.formLabelAlign.items[this.select_index].product.unit_price
//
//         this.formLabelAlign.items[this.select_index].priceUnit = charges
//
//         this.formLabelAlign.items[this.select_index].priceTotal = parseInt(charges) * 1
//         this.formLabelAlign.items[this.select_index].description = name
//         this.formLabelAlign.items[this.select_index].material = material
//         this.formLabelAlign.items[this.select_index].size = size

        this.total()

        console.log(this.formLabelAlign.items[this.select_index])
        this.select_item_ring = false


      },

      Select(reference, name, price, cost, material, size,group_reference) {


        // console.log(reference)
        // console.log(this.formLabelAlign.items)
        console.log("*-*-*-")
        console.log(this.formLabelAlign.items[this.select_index].size)
        // console.log(this.formLabelAlign.items[this.select_index])

         if(group_reference!=null){
           this.formLabelAlign.items[this.select_index].select_reference=group_reference
         }


        this.formLabelAlign.items[this.select_index].product.reference = reference
        this.formLabelAlign.items[this.select_index].product.name = name
        this.formLabelAlign.items[this.select_index].product.unit_price = price


        this.formLabelAlign.items[this.select_index].select_price=price
        this.formLabelAlign.items[this.select_index].search_material=material.name+','+material.color.name

        this.formLabelAlign.items[this.select_index].product.unit_cost = cost
        this.formLabelAlign.items[this.select_index].quantity = 1
        this.formLabelAlign.items[this.select_index].priceNet = this.formLabelAlign.items[this.select_index].quantity *
          this.formLabelAlign.items[this.select_index].product.unit_price

        this.formLabelAlign.items[this.select_index].priceUnit = price

        this.formLabelAlign.items[this.select_index].priceTotal = parseInt(price) * 1
        this.formLabelAlign.items[this.select_index].description = name

        this.formLabelAlign.items[this.select_index].material = material
        this.formLabelAlign.items[this.select_index].size = size

        this.total()

        console.log(this.formLabelAlign.items[this.select_index])
        this.select_item = false

         this.search_material(this.select_index,reference)

      },

      select_indexs(index) {

        this.select_index = index


        console.log(index + '*****' + this.formLabelAlign.items[this.select_index].sales)

        if (this.formLabelAlign.items[this.select_index].sales == null) {

          this.select_show = true

        } else {

          if (this.formLabelAlign.items[this.select_index].sales == 'CONSIGN') {
            this.tableData02 = this.CONSIGN_list
            this.select_item = true
          } else if (this.formLabelAlign.items[this.select_index].sales == 'PRODUCT') {
            this.tableData02 = this.PRODUCT_list
            this.select_item = true
          } else if (this.formLabelAlign.items[this.select_index].sales == 'GEM') {
            this.tableData03 = this.RING_list
            this.select_item_ring = true
          } else {
            this.tableData02 = []
            this.formLabelAlign.items[this.select_index].product.name = 'disable'
          }


        }




      },

      items() {

        // this.formLabelAlign.maintain={reference:this.Items_list[this.Items].reference}

        this.formLabelAlign.maintain = this.Items_list[this.Items].reference
      },

      balance() {

        this.formLabelAlign.balance = parseInt(this.formLabelAlign.totalNet) - parseInt(this.formLabelAlign.payment1)

      },


//       print() {
//
//         let dom = document.getElementById('MoBangXinZengAll')
//         console.log(dom)
//         this.$print(dom)
//
//       },


      // 清空顧客
      clear(type) {

        if (type == '1') {
          this.formLabelAlign.customer1.reference = ''
          this.replace_cutomer1 = ''
        } else if (type == '2') {
          this.formLabelAlign.customer2.reference = ''
          this.replace_cutomer2 = ''
        }

      },

      // 獲取顧客
      get_customer() {

        this.options_customer = []
        this.$api.post('/customer', {
          "customerGrade": "",
          "index": 0,
          "numbe": 100000000,
          "retain": 0,
          "satisfaction": 0,
          "seek": "",
          "win": 0
        }, r => {
          console.log('*---------*')
          console.log(r)
          for (let i = 0; i < r.content.length; i++) {
            this.options_customer.push({
              value: r.content[i].customeName,
              label: r.content[i].customeName,
              reference:r.content[i].reference
            })
          }
          this.customer_loading = false
          this.dialogVisible = false
        });
      },

      // 新增顧客
      upload_customer() {

        this.customer_loading = true
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
          this.formLabelAlign_customer.customeName = '',
            this.formLabelAlign_customer.site = '',
            this.formLabelAlign_customer.profession = '',
            this.formLabelAlign_customer.mobilePhone = '',
            this.formLabelAlign_customer.satisfaction = '',
            this.formLabelAlign_customer.win = '',
            this.formLabelAlign_customer.customerGrade = '',
            this.formLabelAlign_customer.gender = '',
            this.formLabelAlign_customer.explain = '',
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
        this.all_loading = true
        this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
          console.log('-----------')
          console.log(r)
          this.branch_list = r.content,
            this.branch = r.content[0].name
          this.branchId = r.content[0].reference

          console.log(this.branchId)
          this.$api.get('/customer/type', {
            // "branch_list" : this.name,
            // "typeName" : this.formLabelAlign.customerGrade
          }, r => {
            console.log('*/*/*/*//')
            this.type_list = r
            console.log(r)
          });
          this.all_loading = false
          // this.branchId== r.content[0].reference
          this.search()
        });
      },

      search_product() {

        this.$api.post('/product/1970-01-01/'+new Date().format('yyyy-MM-dd')+'/0/100000', {
          "name": this.seek==""?null:this.seek
        }, r => {

          this.tableData02 = r

        })


      },

      search_ring() {

        var entrepotId = ''

        for (var i = 0; i < this.branch_list.length; i++) {
          if (this.branch == this.branch_list[i].name) {
            entrepotId = this.branch_list[i].reference
          }
        }

        this.$api.post('/inventory/0/100000', {

          "gem":this.seek_ring==""?null: {

            "type":this.seek_ring
          },


        }, r => {

          console.log('GEM')
          console.log(r)

          this.tableData02_ring = r
        })



      },

      search() {
        if (this.type == 'detail') {
          this.all_loading = true
          this.$api.get('/sales/' + this.$route.query.uuid, null, r => {
            this.all_loading = false
            console.log('details----')
            console.log(r)
            this.formLabelAlign = r

            this.formLabelAlign.dateBig = new Date(this.formLabelAlign.dateBig).format('yyyy-MMM-dd')
            this.formLabelAlign.dateBuying = new Date(this.formLabelAlign.dateBuying).format('yyyy-MMM-dd')
            this.formLabelAlign.dateCollection = new Date(this.formLabelAlign.dateCollection).format('yyyy-MMM-dd')
            this.formLabelAlign.dateDeliveried =this.formLabelAlign.dateDeliveried===null?null: new Date(this.formLabelAlign.dateDeliveried).format('yyyy-MMM-dd')

            this.formLabelAlign.payment1Date =this.formLabelAlign.payment1Date===null?null: new Date(this.formLabelAlign.payment1Date).format('yyyy-MMM-dd')

            this.formLabelAlign.payment2Date =this.formLabelAlign.payment2Date===null?null: new Date(this.formLabelAlign.payment2Date).format('yyyy-MMM-dd')

            this.activateds = this.formLabelAlign.display == 0 ? false : true
            this.maintain_activateds = this.formLabelAlign.maintenance == 0 ? false : true



            for (let i = 0; i < this.formLabelAlign.items.length; i++) {
              if (this.formLabelAlign.items[i].product == null) {
                this.formLabelAlign.items[i].product = {
                  name: '',
                  reference: ''
                }
              }
            }


            if (this.formLabelAlign.customer1 != null) {
              console.log('01--')
              this.formLabelAlign.customer1.reference = this.formLabelAlign.customer1.reference
              this.replace_cutomer1 = this.formLabelAlign.customer1.customeName
            } else {
              this.formLabelAlign.customer1 = {
                reference: ''
              }
            }

            if (this.formLabelAlign.status != null) {
              console.log('01--')
              this.formLabelAlign.status.reference = this.formLabelAlign.status.text
              this.replace_status = this.formLabelAlign.status.text
            } else {
              this.formLabelAlign.status = {
                reference: ''
              }
            }



            if (this.formLabelAlign.customer2 != null) {
              console.log('02')
              if (this.formLabelAlign.customer2.reference != '') {
                this.formLabelAlign.customer2.reference = this.formLabelAlign.customer2.reference
                this.replace_cutomer2 = this.formLabelAlign.customer2.customeName
              }

            } else {
              this.formLabelAlign.customer2 = {
                reference: ''
              }
            }

            if (this.formLabelAlign.maintenance == 1) {
              console.log('03')
              this.Items = this.formLabelAlign.maintain.name
            }

            if (this.formLabelAlign.display == 1) {
              this.activateds = true
            }

            if (this.formLabelAlign.maintenance == 1) {
              this.maintain_activateds = true
            }


            if (this.formLabelAlign.coupon == null) {

            } else {
              this.coupon = this.formLabelAlign.coupon.code
            }

            this.coupon = this.formLabelAlign.coupon.code
          })
        } else if (this.type == 'alert') {

          this.all_loading = true
          this.$api.get('/sales/' + this.$route.query.uuid, null, r => {
            this.all_loading = false
            console.log('details----')
            console.log(r)
            this.formLabelAlign = r

            // this.formLabelAlign.payment1Method = {
            //   reference: ""
            // }

              this.formLabelAlign.payment1Method = this.formLabelAlign.payment1Method!=null?this.formLabelAlign.payment1Method:{
                reference: ""
              }

              this.formLabelAlign.payment2Method = this.formLabelAlign.payment2Method!=null?this.formLabelAlign.payment2Method:{
                reference: ""
              }





            this.formLabelAlign.dateBig = new Date(this.formLabelAlign.dateBig).format('yyyy-MMM-dd')
            this.formLabelAlign.dateBuying = new Date(this.formLabelAlign.dateBuying).format('yyyy-MMM-dd')
            this.formLabelAlign.dateCollection = new Date(this.formLabelAlign.dateCollection).format('yyyy-MMM-dd')
            this.formLabelAlign.dateDeliveried =this.formLabelAlign.dateDeliveried===null?null: new Date(this.formLabelAlign.dateDeliveried).format('yyyy-MMM-dd')

            this.formLabelAlign.payment1Date = this.formLabelAlign.payment1Date===null?null:new Date(this.formLabelAlign.payment1Date).format('yyyy-MMM-dd')

            this.formLabelAlign.payment2Date =this.formLabelAlign.payment2Date===null?null: new Date(this.formLabelAlign.payment2Date).format('yyyy-MMM-dd')

            this.activateds = this.formLabelAlign.display == 0 ? false : true
            this.maintain_activateds = this.formLabelAlign.maintenance == 0 ? false : true



            this.payment1Method = r.payment1Method === null ? null : r.payment1Method.method
            this.formLabelAlign.payment1Method.reference = r.payment1Method == null ? null : r.payment1Method.reference

            this.payment2Method = r.payment2Method === null ? null : r.payment2Method.method
            this.formLabelAlign.payment2Method.reference = r.payment2Method === null ? null : r.payment2Method.reference
            console.log('-------到！')
            console.log('到！')
            console.log(r.payment1Method)
            console.log(r.payment2Method)


            for (let i = 0; i < this.formLabelAlign.items.length; i++) {
              if (this.formLabelAlign.items[i].product == null) {
                this.formLabelAlign.items[i].product = {
                  name: '',
                  reference: ''
                }
              }
            }


            // if (this.formLabelAlign.customer1 != null) {
            //   console.log('01--')
            //   this.formLabelAlign.customer1.reference = this.formLabelAlign.customer1.reference
            //   this.replace_cutomer1 = this.formLabelAlign.customer1.customeName
            // } else {
            //   this.formLabelAlign.customer1 = {
            //     reference: ''
            //   }
            // }

            if (this.formLabelAlign.status != null) {
              console.log('01--')
              // this.formLabelAlign.status.reference = this.formLabelAlign.status.text
              this.replace_status = this.formLabelAlign.status.text
            } else {
              this.formLabelAlign.status = {
                reference: ''
              }
            }



            if (this.formLabelAlign.customer2 != null) {
              console.log('02')
              if (this.formLabelAlign.customer2.reference != '') {
                // this.formLabelAlign.customer2.reference = this.formLabelAlign.customer2.reference
                this.copy_customer02=r.customer2.reference
                this.formLabelAlign.customer2.reference = this.formLabelAlign.customer2.customeName
                this.customer2.reference = this.formLabelAlign.customer2.customeName
                this.replace_cutomer2 = this.formLabelAlign.customer2.customeName
              }

            } else {
              this.formLabelAlign.customer2 = {
                reference: ''
              }

              this.customer2 = {
                reference: ''
              }

              this.customer2 = {
                reference: ''
              }

            }

            if (this.formLabelAlign.customer1 != null) {
              console.log('0-+')
              if (this.formLabelAlign.customer1.reference != '') {
                // this.formLabelAlign.customer2.reference = this.formLabelAlign.customer2.reference
                this.copy_customer01=r.customer1.reference
                this.formLabelAlign.customer1.reference = this.formLabelAlign.customer1.customeName
                this.customer1.reference = this.formLabelAlign.customer1.customeName
                this.replace_cutomer1 = this.formLabelAlign.customer1.customeName
              }

            } else {
              this.formLabelAlign.customer1 = {
                reference: ''
              }

               this.customer1 = {
                reference: ''
              }

              this.customer1 = {
                reference: ''
              }

            }

            if (this.formLabelAlign.maintenance == 1) {
              console.log('03')
              this.Items = this.formLabelAlign.maintain.name
            }

            if (this.formLabelAlign.display == 1) {
              this.activateds = true
            }

            if (this.formLabelAlign.maintenance == 1) {
              this.maintain_activateds = true
            }


            if (this.formLabelAlign.coupon == null) {

            } else {
              this.coupon = this.formLabelAlign.coupon.code
            }

            this.coupon = this.formLabelAlign.coupon.code
          })



        } else if (this.type == 'maintenance') {
          this.all_loading = false

          this.formLabelAlign.maintenance = 1
          this.formLabelAlign.maintain = {
              reference: this.$route.query.uuid
            },

            this.$api.get('sales/next', null, r => {
              console.log('*---------*')
              console.log(r)

              this.formLabelAlign.salesNo = r

            });
        }
      },
      change_price(index){
        this.formLabelAlign.items[index].select_price=this.formLabelAlign.items[index].search_material
        this.formLabelAlign.items[index].priceUnit=this.formLabelAlign.items[index].search_material
        this.unitPrice(index)
      },
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
            '' && this.formLabelAlign.salesCode != null)) {} else {
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

      submitForm01() {



        // this.loading=true
        this.formLabelAlign.dateBig = this.formLabelAlign.dateBig == '' ? "" : new Date(this.formLabelAlign.dateBig).format(
          "yyyy-MM-dd")
        this.formLabelAlign.dateBuying = this.formLabelAlign.dateBuying == '' ? "" : new Date(this.formLabelAlign.dateBuying)
          .format("yyyy-MM-dd")
        this.formLabelAlign.dateCollection = this.formLabelAlign.dateCollection == '' ? "" : new Date(this.formLabelAlign
          .dateCollection).format("yyyy-MM-dd")
        this.formLabelAlign.payment1Date = this.formLabelAlign.payment1Date === null? null : new Date(this.formLabelAlign
          .payment1Date).format("yyyy-MM-dd")
        this.formLabelAlign.payment2Date = this.formLabelAlign.payment2Date === null? null : new Date(this.formLabelAlign
            .payment2Date).format("yyyy-MM-dd")
        // this.formLabelAlign.payment2Date=this.formLabelAlign.payment2Date==null?"":new Date(this.formLabelAlign.payment2Date).format("yyyy-MM-dd")
        this.formLabelAlign.dateDeliveried = this.formLabelAlign.dateDeliveried === null ? null : new Date(this.formLabelAlign
          .dateDeliveried).format("yyyy-MM-dd")
        // this.formLabelAlign.salesNo=parseInt(this.formLabelAlign.salesNo)
        this.formLabelAlign.discount = parseInt(this.formLabelAlign.discount)
        this.formLabelAlign.payment1 = parseInt(this.formLabelAlign.payment1)
        this.formLabelAlign.payment2 = parseInt(this.formLabelAlign.payment2)
        this.formLabelAlign.total = parseInt(this.formLabelAlign.total)
        this.formLabelAlign.totalNet = parseInt(this.formLabelAlign.totalNet)




        for (let i = 0; i < this.formLabelAlign.items.length; i++) {
          if (this.formLabelAlign.items[i].sales == null) {
            this.select_show = true
          }
        }

        for (let i = 0; i < this.formLabelAlign.items.length; i++) {
          if (this.formLabelAlign.items[i].sales == "CONSIGN" || this.formLabelAlign.items[i].sales == "PRODUCT") {
            if (this.formLabelAlign.items[i].product.reference == '') {
              alert('Please select Product')
            }
            // else{
            // 	this.formLabelAlign.items[i].product={reference:this.formLabelAlign.items[i].product.reference}
            // }

          }
          // else if(this.formLabelAlign.items[i].sales=="CUSTOMIZE"){
          //
          // 	this.formLabelAlign.items[i].product=null
          //
          // }
        }








        this.formLabelAlign.display = this.activateds == true ? 1 : 0

        console.log('*++++++++')
        console.log(this.formLabelAlign.customer1)

        if (this.formLabelAlign.salesNo == '') {

          alert('please input salesNo')

        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.salesNo))) {

          alert('salesNo must be a number')

        } else if (this.customer1.reference == '') {

          alert('please select Customer1')

        }

         // else if (this.formLabelAlign.customer1.reference == '') {
         //
         //   alert('please select Customer1')
         //
         // }

         else if (this.formLabelAlign.dateBuying == null || this.formLabelAlign.dateBuying == '') {

          alert('please select Buying Date')

        } else if (this.formLabelAlign.dateCollection == null || this.formLabelAlign.dateCollection == '') {

          alert('please select Collection Date')

        } else if (this.formLabelAlign.items.length == 0) {

          alert('please input Product information')

        } else if (this.formLabelAlign.totalNet === '') {

          alert('please input totalNet')

        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.totalNet))) {

          alert('Total Net must be a number')

        } else if (this.formLabelAlign.payment1Date == '' || this.formLabelAlign.payment1Date == null) {

          alert('please input 1st payment date')

        } else if (this.formLabelAlign.payment1 === '' || this.formLabelAlign.payment1 == null) {

          alert('please input  1st Payment ')

        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.payment1))) {

          alert('1st Payment  must be a number')

        } else if (this.formLabelAlign.payment2 === '' || this.formLabelAlign.payment2 == null) {

          alert('please input  2nd Payment ')

        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.payment2))) {

          alert('2nd Payment  must be a number')

        } else if (this.formLabelAlign.discount === '' || this.formLabelAlign.discount == null) {

          alert('please input  Total discount')

        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.discount))) {

          alert('Total discount must be a number')

        } else if (this.formLabelAlign.balance === '' || this.formLabelAlign.balance == null) {

          alert('please input  balance')

        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.balance))) {

          alert('balance Net must be a number')

        } else if (this.payment1Method == '' || this.payment1Method == null) {

          alert('please input 1st Payment Method')

        }

        else if (this.replace_status == '' || this.replace_status == null) {

          alert('please select  status')


        }

//         else if (this.formLabelAlign.status.reference == '' || this.formLabelAlign.status.reference == null) {
//
//           alert('please select  status')
//
//
//         }
         else {

          if (this.formLabelAlign.payment1Method.reference == "") {
            this.formLabelAlign.payment1Method.reference = this.payment1Method
          }

          if (this.formLabelAlign.payment2Method.reference == "") {
            this.formLabelAlign.payment2Method.reference = this.payment2Method
          }

          for (let i = 0; i < this.formLabelAlign.items.length; i++) {
            if (this.formLabelAlign.items[i].sales == "CUSTOMIZE") {
              this.formLabelAlign.items[i].product = null
              this.formLabelAlign.items[i].gem = null
            }

            else if (this.formLabelAlign.items[i].sales == "PRODUCT") {
              // this.formLabelAlign.items[i].product = null
              this.formLabelAlign.items[i].gem = null
            }

            else if (this.formLabelAlign.items[i].sales == "GEM") {
              this.formLabelAlign.items[i].product = null
              // this.formLabelAlign.items[i].gem = null
            }

          }

          console.log('0123')

          this.loading = true
          console.log('successful')

          if (this.customer2.reference == '') {

            this.formLabelAlign.customer2 = null

          }else{

            if(this.customer2.reference==this.select_customer02.value){
              this.formLabelAlign.customer2.reference=this.select_customer02.reference
            }else{
              this.formLabelAlign.customer2={
                reference:null,
                customeName:this.customer2.reference
              }
            }

          }

          if(this.customer1.reference==this.select_customer01.value){
            this.formLabelAlign.customer1.reference=this.select_customer01.reference
          }else{
            this.formLabelAlign.customer1={
              reference:null,
              customeName:this.customer1.reference
            }
          }

          this.formLabelAlign.display = this.activateds == true ? 1 : 0
          // this.formLabelAlign.maintenance=this.maintain_activateds==true?1:0

          // console.log(this.formLabelAlign)

          var price = 0
          for (let i = 0; i < this.formLabelAlign.items.length; i++) {
            console.log('*-*')

            this.formLabelAlign.items[i].reference=null
            this.formLabelAlign.items[i].id=null

            price = price + parseInt(this.formLabelAlign.items[i].priceTotal)
          }

          this.formLabelAlign.total = price

          if(this.formLabelAlign.maintain==null){
            this.formLabelAlign.maintain=null
          }

          console.log(this.formLabelAlign)

          if (this.type == 'alert') {

            if(this.copy_customer01!=""){
              this.formLabelAlign.customer1.reference=this.copy_customer01
            }

            if(this.copy_customer02!=""){
              this.formLabelAlign.customer2.reference=this.copy_customer02
            }

            this.$api.post('/sales/save', this.formLabelAlign, r => {
              console.log(r)
              this.loading = false
              this.$router.push("/CustomerOrderManagement")
            })
          } else if (this.type == 'maintenance') {


            this.$api.put('/sales/save', this.formLabelAlign, r => {
              console.log(r)
              this.loading = false
              this.$router.push("/CustomerOrderManagement")
            })

          } else {
            this.$api.put('/sales/save', this.formLabelAlign, r => {
              console.log(r)
              this.loading = false
              this.$router.push("/CustomerOrderManagement")
            })
          }



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
            this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.plvKAVIEcesEntityList[i].hk) + parseFloat(
              this.formLabelAlign
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
              "plantDate": this.formLabelAlign.plantDate == null || this.formLabelAlign.plantDate == '' ? null :
                new Date(
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
              "landingDate": this.formLabelAlign.landingDate == null || this.formLabelAlign.landingDate == '' ?
                null : new Date(
                  this.formLabelAlign.landingDate).format("yyyy-MM-dd"),
              "oemName": this.formLabelAlign.oemName,
              "oemRefenece": this.plvKAviEceOemSaveDtoList[0].oemRefenece,
              "otherExpensesExplain": this.formLabelAlign.otherExpensesExplain,
              "otherExpensesHk": parseFloat(this.formLabelAlign.otherExpensesHk),
              "plvKAviEceRefenece": this.plvKAviEceOemSaveDtoList[0].plvKAviEceRefenece,
              "refenece": this.plvKAviEceOemSaveDtoList[0].refenece,
            }],
            plvKGuestBillSaveDtoList: [{
              "bigDay": this.formLabelAlign.bigDay == null || this.formLabelAlign.bigDay == '' ? null : new Date(
                this.formLabelAlign
                .bigDay).format("yyyy-MM-dd"),
              "claimDay": this.formLabelAlign.claimDay == null || this.formLabelAlign.claimDay == '' ? null : new Date(
                this.formLabelAlign.claimDay).format("yyyy-MM-dd"),
              "company": this.formLabelAlign.company,
              "designCode": this.formLabelAlign.designCode,
              "elseReference": this.plvKGuestBillSaveDtoList[0].elseReference,
              "explain": this.formLabelAlign.explain,
              "factory": this.formLabelAlign.factory,
              "landingDay": this.formLabelAlign.landingDay == null || this.formLabelAlign.landingDay == '' ?
                null : new Date(
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
            this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.plvKAVIEcesEntityList[i].hk) + parseFloat(
              this.formLabelAlign
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
              "plantDate": this.formLabelAlign.plantDate == null || this.formLabelAlign.plantDate == '' ? null :
                this.formLabelAlign
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
              "landingDate": this.formLabelAlign.landingDate == null || this.formLabelAlign.landingDate == '' ?
                null : this
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
              "claimDay": this.formLabelAlign.claimDay == null || this.formLabelAlign.claimDay == '' ? null : this
                .formLabelAlign
                .claimDay.format("yyyy-MM-dd"),
              "company": this.formLabelAlign.company,
              "designCode": this.formLabelAlign.designCode,
              "elseReference": '',
              "explain": this.formLabelAlign.explain,
              "factory": this.formLabelAlign.factory,
              "landingDay": this.formLabelAlign.landingDay == null || this.formLabelAlign.landingDay == '' ?
                null : this.formLabelAlign
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

        this.dialogVisible = false
        this.select_item = false
        this.select_item_ring = false

        // this.$confirm('确认关闭？')
        //   .then(_ => {
        // 	done();
        //   })
        //   .catch(_ => {});
      },

      add_sales() {
        this.Sales_list_num.push({
          'reference': ''
        })
      },

      //增加石資料
      add() {

        console.log('1')
        this.formLabelAlign.items.push({

          "sales": null,
          "product": {
            name: '',
            reference: '',
            unit_price: 0
          },

          "gem": {

            reference: '',

          },
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
          "stone": 0,
          size: "",
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

      del_sales(index) {

        this.Sales_list_num.splice(index, 1)

      },

      // 項目刪除
      del(index) {

        this.formLabelAlign.items.splice(index, 1)



      },

      total() {

        this.formLabelAlign.totalNet = 0
        for (let i = 0; i < this.formLabelAlign.items.length; i++) {
          this.formLabelAlign.totalNet = parseInt(this.formLabelAlign.items[i].priceNet) + this.formLabelAlign.totalNet
        }
        this.formLabelAlign.totalNet = this.formLabelAlign.totalNet - parseInt(this.formLabelAlign.discount)
        this.balance()
        this.change_Discount()
      },

      totaldiscount() {
        this.formLabelAlign.discount = 0
        for (let i = 0; i < this.formLabelAlign.items.length; i++) {
          this.formLabelAlign.discount = parseInt(this.formLabelAlign.items[i].priceTotal) + this.formLabelAlign.discount
        }

        // this.balance()
      }


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
      // border-width: 0;
      // display: inline-block;
      // float: left;
      // width: 100%;
      // height: 25px;
      // margin-top: 5px;
      // border: 0 1px 0 0;
      // border-radius: 0;
      border: 0;
      background-color: transparent;
    }

    .el-autocomplete {
      width: 100%
    }

    // .el-input.is-disabled .el-input__inner {
    //   background-color: transparent;
    //   border-color: black;
    //   color: black;
    //   cursor: default;
    // }

  }


  .CustomerOrderDetail{


  	// @media print{.new-page{page-break-before:always;content:  counter(page) " / " counter(pages);vertical-align: top;margin: 10pt 0 30pt 0;color: #333;font-size: 9pt;}}

  	// margin: 0;
  	// padding: 0;

  	// #footer {
  	//     position: running(footer);
  	//     text-align: right;
  	// }

  	// @page {
  	//     @bottom-right {
  	//         content: element(footer);
  	//     }
  	// }
  	//
  	// #pagenumber:before {
  	//     content: counter(page);
  	// }
  	//
  	// #pagecount:before {
  	//     content: counter(pages);
  	// }

  	    .red{
  	        color: red;
  	    }



  		.item-content {
  			border-left: 1px solid black;
  			border-right: 1px solid black;
  			line-height: 40px;
  			font-size: 20px;
  			text-align: center;
  			height: 150px
  		}



  			.second_menu_item {
  				width: 100px;
  				line-height: 40px;
  				float: left;
  				margin-left: 20px;
  				font-size: 18px;
  			}

  			span {
  				cursor: pointer
  			}



  			.el-row {
  				/* margin-bottom: 20px; */


  			}

  			.el-col {
  				border-radius: 4px;
  			}



  			.title-content {
  				border: 1px solid black;
  				height: 60px;
  				line-height: 60px;
  				font-size: 20px;
  				font-weight: bold;
  				text-align: center;
  				-webkit-text-size-adjust:none;
  			}

  			// .item-content {
  			// 	border-left: 1px solid black;
  			// 	border-right: 1px solid black;
  			// 	line-height: 20px;
  			// 	font-size: 10px;
  			// }

  			.remark-content {
  				line-height: 40px;
  				font-size: 20px
  			}

  			.row-bg {
  				padding: 10px 0;
  				background-color: #f9fafc;
  			}







  			.mat20{
  				margin-top: 20px
  			}

  			.underline{
  				text-decoration: underline
  			}

  			.bgw{
  				background: white
  			}

  			.fl{
  				float: left
  			}

  			.fr{
  				float: right
  			}

  			.ft10{
  				font-size: 20px
  			}

  			.ft20{
  				font-size: 20px
  			}

  			.ft30{
  				font-size: 30px
  			}

  			.bold{
  				font-weight: bold
  			}

  			.lh75{
  				line-height: 75px;
  			}

  			.lh25{
  				line-height: 40px
  				// line-height: 10%
  			}

  			.h25{
  				height: 40px
  				// height: 10%
  			}

  			.h20{
  				height: 40px
  			}

  			.h60{
  				height: 60px
  			}

  			.h90{
  				height: 90px
  			}

  			.w75{
  				width: 150px
  			}

  			.w95{
  				width: 95px
  			}

  			.w190{
  				width: 190px
  			}

  			.w150{
  				width: 150px;
  			}

  			.w185{
  				width: 165px;
  			}

  			.w260{
  				width: 320px;
  			}

  			.textr{
  				text-align: right
  			}

  			.textl{
  				text-align: left
  			}

  			.padl5{
  				padding-left: 5px
  			}

  			.padt30{
  				padding: 15px 5px;
  			}

  			.padt20{
  				padding-top: 20px
  			}

  			.padb30{
  				padding-bottom: 30px
  			}

  			.padr5{
  				padding-right: 5px
  			}

  			.noborder_r{
  				border-radius: 0
  			}

  			.bordert{
  				border-top: 1px solid black
  			}

  			.borderb{
  				border-bottom: 1px solid black
  			}

  			.borderl{
  				border-left: 1px solid black;
  			}

  			.borderr{
  				border-right: 1px solid black;
  			}

  			.btu_bg{
  				background: rgb(253,99,99)
  			}

  			.form_bg{
  				background: rgb(233,238,244)
  			}

  			.testC{
  				text-align: center
  			}

  			.no_borderr{
  				border-right: 0px;
  			}

  			.w650{
  				width: 700px;
  			}




  }


</style>

<template>
	<div class="revision">

		<!-- 客單資料 -->
		<div style="height: 60px;">
			<div style="width: 90%;float: left;">
				<div style="float: left;line-height: 80px;font-size: 18px;color: green;margin-left: 100px;">Order information</div>
				<div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<template>
						<span style="color: #000000;">Edition&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<el-select v-model="versions" placeholder="select" @change='getdetails(versions)'>
							<el-option v-for="(item,index) in version" :label="'Edition'+index" :value="item.plvKGuestBillcol">
							</el-option>
						</el-select>
					</template>
				</div>

			</div>
		</div>
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 570px;min-width:1100px;">
		
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<!-- <div style="width: 50%; float: left;"> -->
		
				<el-form-item label="Customer1" class='mat20 table30'>
					<!-- <el-autocomplete class="inputs01" v-model="formLabelAlign.customer1" :fetch-suggestions="querySearch_origin"
						 placeholder="Input" @select="handleSelect_origin" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete> -->
					<el-autocomplete class="inputs01" v-model="formLabelAlign.customer1" :fetch-suggestions="querySearch_origin_customer01"
					 placeholder="Input" @select="handleSelect_origin_customer01" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete>
				</el-form-item>
				<el-form-item label="Customer2" class='mat20 table30 m15'>
					<!-- <el-autocomplete class="inputs01" v-model="formLabelAlign.customer2" :fetch-suggestions="querySearch_origin"
						 placeholder="Input" @select="handleSelect_origin" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete> -->
					<el-autocomplete class="inputs01" v-model="formLabelAlign.customer2" :fetch-suggestions="querySearch_origin_customer02"
					 placeholder="Input" @select="handleSelect_origin_customer02" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete>
				</el-form-item>
				<el-form-item label="Product" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.product" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
		
				<el-form-item label="Category" class='mat20 table30'>
					<el-input v-model="formLabelAlign.gold" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
		
		
				<el-form-item label="Purchase Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.guestDate" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Factory Date" class='mat20 tanle30 m15'>
					<el-date-picker v-model="formLabelAlign.plantDate" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
		
				<el-form-item label="Quality" class='mat20 table30'>
					<el-input v-model="formLabelAlign.goldColour" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Amount" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.numbe" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Size(單雙)" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.size" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Size" class='mat20 table30'>
					<el-input class='inputs' v-model="formLabelAlign.size1" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Size(單位)" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.sizeUnit" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="State" class='mat20 table30 m15'>
					<el-autocomplete class='inputs' v-model="formLabelAlign.plvKGuestBillType" :fetch-suggestions="querySearch_State"
					 placeholder="Input" @select="handleSelect_State" style="width: 300px;"></el-autocomplete>
				</el-form-item>
				<el-form-item label="Inlay Stone" class='mat20 table30'>
					<el-select v-model="formLabelAlign.stone1" placeholder="Select" style="float: left;width: 300px;" :disabled="type=='detail'?true:false">
						<el-option v-for="item in option_stone" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="around" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.around" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<!-- <el-form-item label="總價格" class='mat20'>
						<el-input class='inputs' type="email" v-model="formLabelAlign.totalPrice" placeholder="请输入内容" :disabled="type=='detail'?true:false"></el-input>
					</el-form-item> -->
				<!-- </div> -->
			</el-form>
		</div>
		
		<!-- 基本資料 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Base Information</span>
		</div>
		
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 560px;min-width:1100px;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="Company" class='mat20 table30'>
					<el-input v-model="formLabelAlign.company" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Salesman" class='mat20 table30 m15'>
					<!-- <el-input v-model="formLabelAlign.sales" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"></el-input> -->
					<el-autocomplete class="inputs01" v-model="formLabelAlign.sales" :fetch-suggestions="querySearch_origin_customer03"
					 placeholder="Input" @select="handleSelect_origin_customer03" :disabled="type=='detail'?true:false" style="width: 300px;float: left;"></el-autocomplete>
				</el-form-item>
				<el-form-item label="Delivery Date" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.claimDay" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Pickup Date" class='mat20 table30'>
					<el-date-picker v-model="formLabelAlign.landingDay" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Big Day" class='mat20 table30 m15'>
					<el-date-picker v-model="formLabelAlign.bigDay" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Factory" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.factory" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
		
				<el-form-item label="Design Code" class='mat20 table30'>
					<el-input class='inputs' v-model="formLabelAlign.designCode" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Sales No" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.salesCode" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Print" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.mintMark" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Remark" class='mat20 table30'>
					<el-input type="textarea" :rows="2" placeholder="Input" v-model="formLabelAlign.explain" :disabled="type=='detail'?true:false"
					 style="width: 550px;float: left;">
					</el-input>
				</el-form-item>
			</el-form>
		</div>
		
		
		<!-- 代工資料 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Production requirement</span>
		</div>
		
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 560px;min-width:1100px;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="Production cost $RMB" class='mat20 table30'>
					<el-input v-model="formLabelAlign.costLaborRmb" type='tel' placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Production cost $RMB" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.costLaborHk" type='tel' placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Other cost $RMB" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.otherExpensesHk" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
		
				<el-form-item label="Factory Invoice NO" class='mat20 table30'>
					<el-input class='inputs' v-model="formLabelAlign.factoryInvoice" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Factory Price $RMB" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.factoryPriceRmb" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Factory Price $HK" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.factoryPriceHk" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Arrival Date" class='mat20 table30'>
					<el-date-picker v-model="formLabelAlign.landingDate" type="date" placeholder="Date" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Payment record" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.factoryRecord" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Factory Name" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.oemName" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Notes on Other Expenditures" class='mat20'>
					<el-input type="textarea" :rows="2" placeholder="Input" v-model="formLabelAlign.otherExpensesExplain" :disabled="type=='detail'?true:false"
					 style="width: 550px;float: left;">
					</el-input>
				</el-form-item>
			</el-form>
		</div>
		
		<!-- 成本資料 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Base Information</span>
		</div>
		
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 350px;min-width:1100px;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="Total number of stones" class='mat20 table30'>
					<el-input v-model="formLabelAlign.totalStone" type='tel' placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Total card of stones" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.totalStoneCard" type='tel' placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Total price of stones" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.totalStoneCost" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Gold content" class='mat20 table30'>
					<el-input class='inputs' v-model="formLabelAlign.gold1" placeholder="Input" :disabled="type=='detail'?true:false"
					 style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="Total weight of gold" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.goldWeight" type='tel' placeholder="Input" class='inputs' :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Amount" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.goldUnivalence" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Total price" class='mat20 table30'>
					<el-input class='inputs' v-model="formLabelAlign.totalCost" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
		
			</el-form>
		</div>
		
		<!-- 記錄資料 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Record Information</span>
		</div>
		
		
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 130px;min-width:1100px;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="GP total" class='mat20 table30'>
					<el-input class='inputs' v-model="formLabelAlign.gpAmount" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Net sales" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.netSales" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					 onkeyup="(this.v=function(){
					 this.value=this.value.replace(/^\.$/,'');
					 this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					 this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Price" class='mat20 table30 m15'>
					<el-input class='inputs' v-model="formLabelAlign.sellingPrice" type='tel' placeholder="Input" :disabled="type=='detail'?true:false" style="width: 300px;"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
			</el-form>
		</div>



		<!-- 		<div style="background: white;padding: 20px 0;border-top: 5px solid rgb(224,224,224);"> -->
		<!-- 項目描述 -->
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 18px;color: green;">>>>Item</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;min-width:1100px;">
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
						<el-input class='grid-inputs' v-model="item.stone" :disabled="type=='detail'?true:false" placeholder="input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.shape" :disabled="type=='detail'?true:false" placeholder="input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.color" :disabled="type=='detail'?true:false" placeholder="input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.cts" type='tel' :disabled="type=='detail'?true:false" placeholder="Input"
						onkeyup="(this.v=function(){
						this.value=this.value.replace(/^\.$/,'');
						this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
						this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.hk" type='tel' :disabled="type=='detail'?true:false" placeholder="Input"
						onkeyup="(this.v=function(){
						this.value=this.value.replace(/^\.$/,'');
						this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
						this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.noNumber" :disabled="type=='detail'?true:false" placeholder="input"></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="input-content">
						<el-input class='grid-inputs' v-model="item.remark" :disabled="type=='detail'?true:false" placeholder="input"></el-input>
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
		</div>



		<div class='mat20' style="white-space: nowrap;float: left;margin: 30px 0;margin-left: 30%;">
			<el-button :loading="loading" class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;'
			 @click="submitForm('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
			<el-button class='button' type="primary" style='background: rgb(253,99,99);border:none;font-size: 18px;' @click="cancel()">Return</el-button>
		</div>


	</div>

</template>

<script>
	export default {
		name: "UserCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect/' + value, null, r => {
						// console.log(r)
						if (r == false) {
							callback(new Error('用戶名已存在'));
						} else {
							callback();
						}
					});
				} else {
					callback(new Error('請輸入用戶名'));
				}



			};
			return {
				test: '',
				versions: '',
				dialogVisible: false,
				loading: false,
				textarea: '',
				labelPosition: '',
				type: "detail",
				uuid: '',
				value1: '',
				password: '',
				elseReference: '',
				plvKAviEceOemSaveDtoList: '',
				plvKGuestBillSaveDtoList: '',
				plvKProductSaveDtoList: '',
				plvKStoneTotalSaveDtoList: '',
				plvKStoneTotalEntityList: '',
				plvKStoneTotalEntityList_Id: '',
				plvKGuestBillEntityList_Id: '',

				formLabelAlign: {
					nameId: '',
					around: '',
					stone1: "",
					gold: "",
					goldColour: "",
					guestDate: "",
					made: "",
					plantDate: "",
					product: "",
					numbe: "",
					size: "",
					size1: "",
					sizeUnit: "",
					totalPrice: 0,
					plvKGuestBillType: '',
					costLaborHk: "",
					costLaborRmb: "",
					factoryInvoice: "",
					factoryPriceHk: "",
					factoryPriceRmb: "",
					factoryRecord: "",
					oemName: "",
					landingDate: "",
					otherExpensesExplain: "",
					made: "",
					otherExpensesHk: "",
					bigDay: "",
					claimDay: "",
					company: "",
					customer1: "",
					customer1Reference: "",
					customer2: "",
					customer2Reference: "",
					design: '',
					designCode: "",
					explain: "",
					factory: "",
					gpAmount: "",
					made: "",
					landingDay: "",
					mintMark: "",
					proCode: "",
					sales: "",
					salesCode: "",
					togoRem2: "",
					togoRemak: "",
					netSales: "",
					sellingPrice: "",
					color: "",
					stone: "",
					shape: "",
					cts: "",
					hk: "",
					noNumber:"",
					remark: "",
					gold1: "",
					goldHk: "",
					goldUnivalence: "",
					goldWeight: "",
					made: "",
					totalCost: "",
					totalGold: "",
					totalStone: "",
					totalStoneCard: "",
					totalStoneCost: "",
					plvKAVIEcesEntityList: [],
				},

				options: [{
					id: '1',
					label: '已起貨'
				}, {
					id: '2',
					label: '起交貨'
				}],
				version: [{
					id: '1',
					label: '1.0'
				}, {
					id: '2',
					label: '1.1'
				}, {
					id: '3',
					label: '1.2'
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

			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid

			this.getdetails(this.$route.query.uuid)
			this.search()
			// if (this.type == 'detail') {



		},

		methods: {

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


			querySearch_origin_customer01(queryString, cb) {


				console.log('---------0101')
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
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			// 			querySearch_guanlian(queryString, cb) {
			// 				this.$api.get('/inventory/findAllSupplier?supplier=' + queryString, null, r => {
			// 					// this.$router.push("/SystemManagement/UserManagement")
			// 					var results = []
			// 					for (var i = 0; i < r.content.length; i++) {
			// 						var temp = {
			// 							"value": r.content[i].supplier,
			// 							"reference": r.content[i].reference,
			// 							"id": r.content[i].id,
			// 						}
			// 						results.push(temp)
			// 					}
			// 					cb(results);
			// 				});
			// 			},

			handleSelect_origin_customer01(item) {
				this.formLabelAlign.supplier = item
				this.formLabelAlign.customer1 = item.value
				this.formLabelAlign.customer1Reference = item.reference

			},

			handleSelect_origin_customer02(item) {
				this.formLabelAlign.supplier = item
				this.formLabelAlign.customer2 = item.value
				this.formLabelAlign.customer2Reference = item.reference

			},

			handleSelect_origin_customer03(item) {
				console.log('=====+++=====')
				console.log(item)

				this.formLabelAlign.sales = item.value,
					this.userReferenceId = item.id,


					this.formLabelAlign.supplier = item
				this.formLabelAlign.sales = item.value
				this.formLabelAlign.customer3Reference = item.reference

			},

			search() {
				this.$api.get('/PlvKClientCardEndpoint/seekPlvKClientCard/' + this.uuid, null, r => {
					console.log('-------------------------')
					console.log(r)
					this.version = r
					// this.search()
					// this.$router.push("/SystemManagement/CustomerOrderManagement")
				});

			},


			// 版本詳情獲取
			getdetails(id) {
				console.log('/////////////////////////////////////////////+')
				this.$api.get('/PlvKClientCardEndpoint/seekPlvKGuestBillcol/' + id, null, r => {


					// 					for (var i = 0; i < this.formLabelAlign.plvKAviEceOemEntityList.length; i++) {
					// 						 this.formLabelAlign.plvKAviEceOemEntityList[i].landingDate = new Date(this.formLabelAlign.plvKAviEceOemEntityList[i].landingDate).format("yyyy-MM-dd")
					// 						console.log(this.formLabelAlign.plvKAviEceOemEntityList[i].landingDate)
					// 					}
					// this.formLabelAlign = r
					console.log(r)

					// 					this.formLabelAlign.gold = r.plvKProductEntityList[0].gold
					// 					this.formLabelAlign.goldColour = r.plvKProductEntityList[0].goldColour
					// 					this.formLabelAlign.guestDate = r.plvKProductEntityList[0].guestDate
					// 					this.formLabelAlign.made = r.plvKProductEntityList[0].made
					// 					this.formLabelAlign.plantDate = r.plvKProductEntityList[0].plantDate
					// 					this.formLabelAlign.product = r.plvKProductEntityList[0].product
					// 					this.formLabelAlign.numbe = r.plvKProductEntityList[0].numbe
					// 					this.formLabelAlign.size = r.plvKProductEntityList[0].size
					// 					this.formLabelAlign.size1 = r.plvKProductEntityList[0].size1
					// 					this.formLabelAlign.sizeUnit = r.plvKProductEntityList[0].sizeUnit
					// 					this.formLabelAlign.totalPrice = r.plvKProductEntityList[0].totalPrice
					// 					this.formLabelAlign.plvKGuestBillType = r.plvKGuestBillEntityList[0].plvKGuestBillType
					// 				
					// 					this.formLabelAlign.costLaborHk = r.plvKAviEceOemEntityList[0].costLaborHk
					// 					this.formLabelAlign.costLaborRmb = r.plvKAviEceOemEntityList[0].costLaborRmb
					// 					this.formLabelAlign.factoryInvoice = r.plvKAviEceOemEntityList[0].factoryInvoice
					// 					this.formLabelAlign.factoryPriceHk = r.plvKAviEceOemEntityList[0].factoryPriceHk
					// 					this.formLabelAlign.factoryPriceRmb = r.plvKAviEceOemEntityList[0].factoryPriceRmb
					// 					this.formLabelAlign.factoryRecord = r.plvKAviEceOemEntityList[0].factoryRecord
					// 					this.formLabelAlign.landingDate = r.plvKAviEceOemEntityList[0].landingDate
					// 					this.formLabelAlign.otherExpensesExplain = r.plvKAviEceOemEntityList[0].otherExpensesExplain
					// 					this.formLabelAlign.made = r.plvKAviEceOemEntityList[0].made
					// 					this.formLabelAlign.otherExpensesHk = r.plvKAviEceOemEntityList[0].otherExpensesHk
					// 				
					// 					this.formLabelAlign.bigDay = r.plvKGuestBillEntityList[0].bigDay
					// 					this.formLabelAlign.claimDay = r.plvKGuestBillEntityList[0].claimDay
					// 					this.formLabelAlign.company = r.plvKGuestBillEntityList[0].company
					// 					this.formLabelAlign.customer1 = r.plvKGuestBillEntityList[0].customer1
					// 					this.formLabelAlign.customer2 = r.plvKGuestBillEntityList[0].customer2
					// 					this.formLabelAlign.designCode = r.plvKGuestBillEntityList[0].designCode
					// 					this.formLabelAlign.explain = r.plvKGuestBillEntityList[0].explain
					// 					this.formLabelAlign.factory = r.plvKGuestBillEntityList[0].factory
					// 					this.formLabelAlign.gpAmount = r.plvKGuestBillEntityList[0].gpAmount
					// 					this.formLabelAlign.landingDay = r.plvKGuestBillEntityList[0].landingDay
					// 					this.formLabelAlign.made = r.plvKGuestBillEntityList[0].made
					// 					this.formLabelAlign.mintMark = r.plvKGuestBillEntityList[0].mintMark
					// 					this.formLabelAlign.proCode = r.plvKGuestBillEntityList[0].proCode
					// 					this.formLabelAlign.sales = r.plvKGuestBillEntityList[0].sales
					// 					this.formLabelAlign.salesCode = r.plvKGuestBillEntityList[0].salesCode
					// 					this.formLabelAlign.togoRem2 = r.plvKGuestBillEntityList[0].togoRem2
					// 					this.formLabelAlign.togoRemak = r.plvKGuestBillEntityList[0].togoRemak
					// 					this.formLabelAlign.netSales = r.plvKGuestBillEntityList[0].netSales
					// 					this.formLabelAlign.sellingPrice = r.plvKGuestBillEntityList[0].sellingPrice
					// 				
					// 				
					// 					this.formLabelAlign.color = r.plvKStoneEntityList[0].color
					// 					this.formLabelAlign.stone = r.plvKStoneEntityList[0].stone
					// 					this.formLabelAlign.shape = r.plvKStoneEntityList[0].shape
					// 					this.formLabelAlign.cts = r.plvKStoneEntityList[0].cts
					// 					this.formLabelAlign.hk = r.plvKStoneEntityList[0].hk
					// 					this.formLabelAlign.remark = r.plvKStoneEntityList[0].remark
					// 				
					// 					this.formLabelAlign.gold1 = r.plvKStoneTotalEntityList[0].gold
					// 					this.formLabelAlign.goldHk = r.plvKStoneTotalEntityList[0].goldHk
					// 					this.formLabelAlign.goldUnivalence = r.plvKStoneTotalEntityList[0].goldUnivalence
					// 					this.formLabelAlign.goldWeight = r.plvKStoneTotalEntityList[0].goldWeight
					// 					this.formLabelAlign.made = r.plvKStoneTotalEntityList[0].made
					// 					this.formLabelAlign.totalCost = r.plvKStoneTotalEntityList[0].totalCost
					// 					this.formLabelAlign.totalGold = r.plvKStoneTotalEntityList[0].totalGold
					// 					this.formLabelAlign.totalStone = r.plvKStoneTotalEntityList[0].totalStone
					// 					this.formLabelAlign.totalStoneCard = r.plvKStoneTotalEntityList[0].totalStoneCard
					// 					this.formLabelAlign.totalStoneCost = r.plvKStoneTotalEntityList[0].totalStoneCost
					// 					this.formLabelAlign.plvKAVIEcesEntityList = r.plvKStoneEntityList
					// 					this.plvKProductSaveDtoList = r.plvKProductEntityList
					// 					this.plvKGuestBillSaveDtoList = r.plvKGuestBillEntityList
					// 					this.plvKAviEceOemSaveDtoList = r.plvKAviEceOemEntityList
					// 					this.plvKStoneTotalSaveDtoList = r.plvKStoneTotalEntityList

					this.formLabelAlign.gold = r.plvKProductEntityList[0].gold
					this.formLabelAlign.goldColour = r.plvKProductEntityList[0].goldColour
					this.formLabelAlign.guestDate = r.plvKProductEntityList[0].guestDate
					this.formLabelAlign.made = r.plvKProductEntityList[0].made
					this.formLabelAlign.plantDate = r.plvKProductEntityList[0].plantDate
					this.formLabelAlign.product = r.plvKProductEntityList[0].product
					this.formLabelAlign.numbe = r.plvKProductEntityList[0].numbe
					this.formLabelAlign.size = r.plvKProductEntityList[0].size
					this.formLabelAlign.size1 = r.plvKProductEntityList[0].size1
					this.formLabelAlign.sizeUnit = r.plvKProductEntityList[0].sizeUnit
					this.formLabelAlign.totalPrice = r.plvKProductEntityList[0].totalPrice
					this.formLabelAlign.plvKGuestBillType = r.plvKGuestBillEntityList[0].plvKGuestBillType

					this.formLabelAlign.costLaborHk = r.plvKAviEceOemEntityList[0].costLaborHk
					this.formLabelAlign.costLaborRmb = r.plvKAviEceOemEntityList[0].costLaborRmb
					this.formLabelAlign.factoryInvoice = r.plvKAviEceOemEntityList[0].factoryInvoice
					this.formLabelAlign.factoryPriceHk = r.plvKAviEceOemEntityList[0].factoryPriceHk
					this.formLabelAlign.factoryPriceRmb = r.plvKAviEceOemEntityList[0].factoryPriceRmb
					this.formLabelAlign.factoryRecord = r.plvKAviEceOemEntityList[0].factoryRecord
					this.formLabelAlign.landingDate = r.plvKAviEceOemEntityList[0].landingDate
					this.formLabelAlign.otherExpensesExplain = r.plvKAviEceOemEntityList[0].otherExpensesExplain
					this.formLabelAlign.made = r.plvKAviEceOemEntityList[0].made
					this.formLabelAlign.otherExpensesHk = r.plvKAviEceOemEntityList[0].otherExpensesHk
					this.formLabelAlign.oemName = r.plvKAviEceOemEntityList[0].oemName ///
					this.formLabelAlign.bigDay = r.plvKGuestBillEntityList[0].bigDay
					this.formLabelAlign.claimDay = r.plvKGuestBillEntityList[0].claimDay
					this.formLabelAlign.company = r.plvKGuestBillEntityList[0].company
					this.formLabelAlign.customer1 = r.plvKGuestBillEntityList[0].customer1
					this.formLabelAlign.customer2 = r.plvKGuestBillEntityList[0].customer2
					this.formLabelAlign.designCode = r.plvKGuestBillEntityList[0].designCode
					this.formLabelAlign.explain = r.plvKGuestBillEntityList[0].explain
					this.formLabelAlign.factory = r.plvKGuestBillEntityList[0].factory
					this.formLabelAlign.gpAmount = r.plvKGuestBillEntityList[0].gpAmount
					this.formLabelAlign.landingDay = r.plvKGuestBillEntityList[0].landingDay
					this.formLabelAlign.made = r.plvKGuestBillEntityList[0].made
					this.formLabelAlign.mintMark = r.plvKGuestBillEntityList[0].mintMark
					this.formLabelAlign.proCode = r.plvKGuestBillEntityList[0].proCode
					this.formLabelAlign.sales = r.plvKGuestBillEntityList[0].sales
					this.formLabelAlign.salesCode = r.plvKGuestBillEntityList[0].salesCode
					this.formLabelAlign.togoRem2 = r.plvKGuestBillEntityList[0].togoRem2
					this.formLabelAlign.togoRemak = r.plvKGuestBillEntityList[0].togoRemak
					this.formLabelAlign.netSales = r.plvKGuestBillEntityList[0].netSales
					this.formLabelAlign.sellingPrice = r.plvKGuestBillEntityList[0].sellingPrice

					if (r.plvKStoneEntityList != null && r.plvKStoneEntityList != "") {

						this.formLabelAlign.plvKAVIEcesEntityList = r.plvKStoneEntityList

						this.formLabelAlign.color = r.plvKStoneEntityList[0].color
						this.formLabelAlign.stone = r.plvKStoneEntityList[0].stone
						this.formLabelAlign.shape = r.plvKStoneEntityList[0].shape
						this.formLabelAlign.cts = r.plvKStoneEntityList[0].cts
						this.formLabelAlign.hk = r.plvKStoneEntityList[0].hk
						this.formLabelAlign.noNumber = r.plvKStoneEntityList[0].noNumber
						this.formLabelAlign.remark = r.plvKStoneEntityList[0].remark
					}

					// 					this.formLabelAlign.color = r.plvKStoneEntityList[0].color
					// 					this.formLabelAlign.stone = r.plvKStoneEntityList[0].stone
					// 					this.formLabelAlign.shape = r.plvKStoneEntityList[0].shape
					// 					this.formLabelAlign.cts = r.plvKStoneEntityList[0].cts
					// 					this.formLabelAlign.hk = r.plvKStoneEntityList[0].hk
					// 					this.formLabelAlign.remark = r.plvKStoneEntityList[0].remark

					this.formLabelAlign.gold1 = r.plvKStoneTotalEntityList[0].gold
					this.formLabelAlign.goldHk = r.plvKStoneTotalEntityList[0].goldHk
					this.formLabelAlign.goldUnivalence = r.plvKStoneTotalEntityList[0].goldUnivalence
					this.formLabelAlign.goldWeight = r.plvKStoneTotalEntityList[0].goldWeight
					this.formLabelAlign.made = r.plvKStoneTotalEntityList[0].made
					this.formLabelAlign.totalCost = r.plvKStoneTotalEntityList[0].totalCost
					this.formLabelAlign.totalGold = r.plvKStoneTotalEntityList[0].totalGold
					this.formLabelAlign.totalStone = r.plvKStoneTotalEntityList[0].totalStone
					this.formLabelAlign.totalStoneCard = r.plvKStoneTotalEntityList[0].totalStoneCard
					this.formLabelAlign.totalStoneCost = r.plvKStoneTotalEntityList[0].totalStoneCost
					// this.formLabelAlign.design = r.plvKStoneTotalEntityList[0].design
					this.formLabelAlign.plvKAVIEcesEntityList = r.plvKStoneEntityList

					// 					this.formLabelAlign.stone1 = r.plvKProductEntityList[0].stone
					// 					this.formLabelAlign.around = r.plvKProductEntityList[0].around

					// this.branchId = r.plvKGuestBillSaveDtoList[0].companyReference

					this.plvKStoneTotalEntityList_Id = r.plvKStoneTotalEntityList[0].elseReference
					this.plvKGuestBillEntityList_Id = this.$route.query.uuid //r.plvKGuestBillEntityList[0].elseReference

					// this.plvKProductSaveDtoList = r.plvKProductEntityList

					// 					plvKAviEceOemSaveDtoList: r.plvKAviEceOemEntityList,
					// 					plvKGuestBillSaveDtoList: r.plvKGuestBillEntityList,
					// 					
					// 					plvKStoneTotalSaveDtoList: r.plvKProductEntityList,
					// 					plvKStoneTotalEntityList: r.plvKStoneTotalEntityList,

					this.plvKAviEceOemSaveDtoList = r.plvKAviEceOemEntityList
					this.plvKGuestBillSaveDtoList = r.plvKGuestBillEntityList
					this.plvKProductSaveDtoList = r.plvKProductEntityList
					this.plvKStoneEntityList = r.plvKStoneEntityList
					this.plvKStoneTotalSaveDtoList = r.plvKStoneTotalEntityList

					this.formLabelAlign.stone1 = r.plvKProductEntityList[0].stone
					this.formLabelAlign.around = r.plvKProductEntityList[0].around


				});
			},

			querySearch_origin(queryString, cb) {
				this.$api.get('/inventory/findAllSupplier?supplier=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].supplier,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			querySearch_guanlian(queryString, cb) {
				this.$api.get('/inventory/findAllSupplier?supplier=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].supplier,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			handleSelect_origin(item) {
				this.formLabelAlign.supplier = item
			},

			submitForm(formLabelAlign) {

				if ((this.formLabelAlign.guestDate != '' && this.formLabelAlign.guestDate != null) && (this.formLabelAlign.salesCode != '' && this.formLabelAlign.salesCode != null)) {
					this.loading = true

					this.formLabelAlign.totalPrice=0
					for (var i = 0; i < this.formLabelAlign.plvKAVIEcesEntityList.length; i++) {
						this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.plvKAVIEcesEntityList[i].hk) + parseFloat(this.formLabelAlign.totalPrice)
					}
					this.formLabelAlign.totalPrice = parseFloat(this.formLabelAlign.totalCost) + parseFloat(this.formLabelAlign.totalPrice)
					
					this.$api.post('/PlvKClientCardEndpoint/save', {
						plvKProductSaveDtoList: [{
							// "elseReference": this.plvKProductSaveDtoList[0].elseReference,
							"gold": this.formLabelAlign.gold,
							"goldColour": this.formLabelAlign.goldColour,
							"guestDate": new Date(this.formLabelAlign.guestDate).format("yyyy-MM-dd"),
							"numbe": parseFloat(this.formLabelAlign.numbe),
							"plantDate": this.formLabelAlign.plantDate == null || this.formLabelAlign.plantDate == '' ? null :new Date(this.formLabelAlign.plantDate).format("yyyy-MM-dd"),
							"plvKProductcol": this.plvKProductSaveDtoList[0].plvKProductcol,
							"product": this.formLabelAlign.product,
							"reference": this.plvKProductSaveDtoList[0].reference,
							"size": this.formLabelAlign.size,
							"size1": this.formLabelAlign.size1,
							"sizeUnit": this.formLabelAlign.sizeUnit,
							"userName": this.plvKProductSaveDtoList[0].userName,
							"userReference": this.plvKProductSaveDtoList[0].userReference,
							"totalPrice": parseInt(this.formLabelAlign.totalPrice),
							"stone": this.formLabelAlign.stone1, ///石頭類型
							"around": this.formLabelAlign.around, ///？???
						}],
						plvKAviEceOemSaveDtoList: [{
							"costLaborHk": parseInt(this.formLabelAlign.costLaborHk),
							"costLaborRmb": parseInt(this.formLabelAlign.costLaborRmb),
							"factoryInvoice": this.formLabelAlign.factoryInvoice,
							"factoryPriceHk": parseInt(this.formLabelAlign.factoryPriceHk),
							"factoryPriceRmb": parseInt(this.formLabelAlign.factoryPriceRmb),
							"factoryRecord": this.formLabelAlign.factoryRecord,
							"landingDate": this.formLabelAlign.landingDate == null || this.formLabelAlign.landingDate == '' ? null :new Date(this.formLabelAlign.landingDate).format("yyyy-MM-dd"),
							"oemName": this.plvKAviEceOemSaveDtoList[0].oemName,
							"oemRefenece": this.plvKAviEceOemSaveDtoList[0].oemRefenece,
							"otherExpensesExplain": this.formLabelAlign.otherExpensesExplain,
							"otherExpensesHk": parseInt(this.formLabelAlign.otherExpensesHk),
							"plvKAviEceRefenece": this.plvKAviEceOemSaveDtoList[0].plvKAviEceRefenece,
							"refenece": this.plvKAviEceOemSaveDtoList[0].refenece,
						}],
						plvKGuestBillSaveDtoList: [{
							"bigDay": this.formLabelAlign.bigDay == null || this.formLabelAlign.bigDay == '' ? null :new Date(this.formLabelAlign.bigDay).format("yyyy-MM-dd"),
							"claimDay": this.formLabelAlign.claimDay == null || this.formLabelAlign.claimDay == '' ? null :new Date(this.formLabelAlign.claimDay).format("yyyy-MM-dd"),
							"company": this.formLabelAlign.company,
							"designCode": this.formLabelAlign.designCode,
							"elseReference": this.plvKGuestBillEntityList_Id,
							"explain": this.formLabelAlign.explain,
							"factory": this.formLabelAlign.factory,
							"landingDay": this.formLabelAlign.landingDay == null || this.formLabelAlign.landingDay == '' ? null :new Date(this.formLabelAlign.landingDay).format("yyyy-MM-dd"),
							"mintMark": this.formLabelAlign.mintMark,
							"onLock": this.plvKGuestBillSaveDtoList[0].onLock,
							"plvKGuestBillType": this.formLabelAlign.plvKGuestBillType,
							"proChecking": this.plvKGuestBillSaveDtoList[0].proChecking,
							"proCode": this.plvKGuestBillSaveDtoList[0].proCode,
							"reference": this.plvKGuestBillSaveDtoList[0].reference,
							"sales": this.formLabelAlign.sales,
							"salesCode": this.formLabelAlign.salesCode,
							"userName": this.plvKGuestBillSaveDtoList[0].userName,
							"userReference": this.plvKGuestBillSaveDtoList[0].userReference,
							
							"billDate":new Date(this.formLabelAlign.guestDate).format("yyyy-MM-dd"),

							"customer1": this.formLabelAlign.customer1,
							"customer1Reference": this.plvKGuestBillSaveDtoList[0].customer1Reference,
							"customer2": this.formLabelAlign.customer2,
							"customer2Reference": this.plvKGuestBillSaveDtoList[0].customer2Reference,
							"gp": this.plvKGuestBillSaveDtoList[0].gp,
							"gpAmount": parseInt(this.formLabelAlign.gpAmount),
							"netSales": parseInt(this.formLabelAlign.netSales),
							"plvKGuestBillReference": this.plvKGuestBillSaveDtoList[0].plvKGuestBillReference,
							"sellingPrice": parseInt(this.formLabelAlign.sellingPrice),
							"togoRem2": '2',
							"togoRemak": this.plvKGuestBillSaveDtoList[0].togoRemak,
							"userName": this.plvKGuestBillSaveDtoList[0].userName,
						}],
						plvKStoneTotalSaveDtoList: [{
							"elseReference": this.plvKStoneTotalEntityList_Id,
							"gold": this.formLabelAlign.gold1,
							"goldHk": this.plvKStoneTotalSaveDtoList[0].goldHk,
							"goldUnivalence": parseInt(this.formLabelAlign.goldUnivalence),
							"goldWeight": parseInt(this.formLabelAlign.goldWeight),
							"reference": this.plvKStoneTotalSaveDtoList[0].reference,
							"totalCost": parseInt(this.formLabelAlign.totalCost),
							"totalGold": this.plvKStoneTotalSaveDtoList[0].totalGold,
							"totalStone": parseInt(this.formLabelAlign.totalStone),
							"totalStoneCard": parseInt(this.formLabelAlign.totalStoneCard),
							"totalStoneCost": parseInt(this.formLabelAlign.totalStoneCost),
						}],

						plvKStoneSaveDtoList: this.formLabelAlign.plvKAVIEcesEntityList,




					}, r => {
						console.log('-------------------------')
						console.log(r)
						this.loading = false
						this.$router.push("/CustomerOrderManagement")
					});
				} else {
					alert('Purchase Date, Sales No \n  Can not be empty!!!')
				}
			},

			//增加石資料
			add() {
				this.formLabelAlign.plvKAVIEcesEntityList.push({
					stone: '',
					shape: '',
					color: '',
					cts: '',
					hk: '',
					noNumber:'',
					remark: '',
					plvKAVIEcesEntityList: '',
					"hkC": 0,
					"pcs": 0,
					"us": 0,
					"usC": 0,
					"refenece": "",
				})
			},
			cancel() {
				this.$router.push("/CustomerOrderManagement")
			},

			// 項目刪除
			del(index) {
				console.log('0000')
				// 				console.log(index)
				// this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
				if (this.formLabelAlign.plvKAVIEcesEntityList[index].refenece == '') {
					this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
				} else {
					this.$api.get('/PlvKClientCardEndpoint/deletePlvKStone/' + this.formLabelAlign.plvKAVIEcesEntityList[index].refenece,
						null, r => {
							console.log('****************************')
							this.formLabelAlign.plvKAVIEcesEntityList.splice(index, 1)
							this.search();
						});
				}

			},
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.revision {
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

		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
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
			height: 140px;
		}

		.el-col-3 {
			width: 12.5%
		}

		.selector {
			color: $navHoverTextColor;
		}

		.inputs {
			width: 300px;
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
</style>

<template>
	<div class="MoBangXinZengAll">

		<div style="height: 60px;">
			
			<div style="width: 90%;">
				<div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<span style="float: left;">Branch：</span>
					<el-select v-model="branch" placeholder="select" style="float: left;width: 70%;">
						<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
						</el-option>
					</el-select>
				</div>
			</div>
			
			<div style="width: 90%;">
				<div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<span style="float: left;">Items：</span>
					<el-select v-model="Items" placeholder="select" style="float: left;width: 70%;" @change="items" :disabled="type=='Alter'">
						<el-option v-for='(item, index) in Items_list' :label="item.name" :value="index"></el-option>
						</el-option>
					</el-select>
				</div>	
			</div>
			
		</div>
		
		

		<!-- <div style="width: 96%;margin-left: 2%;padding: 0 5px;">

			<div class="MoBangXinZeng">
				<el-row style='line-height: 25px;'>

					<el-col :span="8">
						<div class="fl" style="margin-top: 10px;">數量：{{product_quantity}}</div>
					</el-col>

					<el-col :span="8">
						<div class="fl">產品：{{product_name}}</div>
					</el-col>

					<el-col :span="8">
						<div class="fl">類別：{{product_sort}}</div>
					</el-col>




				</el-row>
			</div>

		</div> -->

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
					
					<el-col :span="8" class='table_border table_l table_t  table_r'>
						<span class="fl">客取貨日：</span>
						<p style="overflow: hidden;">
							<el-date-picker v-model="formLabelAlign.dateSend" type="date" placeholder="select" style='width: 100%;border-bottom: 0;'
							 :disabled="type=='detail'?true:false">
							</el-date-picker>
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Pro Code：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Pro Checking：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">Sales no：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Sales：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Company：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">廠：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">客：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Design Code：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t table_l  table_r '>
						<span class="fl">產品：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">金：</span>
						<p style="overflow: hidden;">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 70%;" @change="items" :disabled="type=='Alter'">
								<el-option label="18K" value="18K"></el-option></el-option>
								<el-option label="925" value="925"></el-option></el-option>
								<el-option label="PT950" value="PT950"></el-option></el-option>
								<el-option label="14K" value="14K"></el-option></el-option>
								<el-option label="9K" value="9K"></el-option></el-option>
								
							</el-select>
							<!-- <input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input"> -->
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">金色：</span>
						<p style="overflow: hidden;">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 70%;" @change="items" :disabled="type=='Alter'">
								<el-option label="白" value="白"></el-option></el-option>
								<el-option label="紅" value="紅"></el-option></el-option>
								<el-option label="黑" value="黑"></el-option></el-option>
								<el-option label="老黑" value="老黑"></el-option></el-option>
								
								
							</el-select>
							<!-- <input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input"> -->
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">客單日：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">廠日期：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">數量：</span>
						<p style="overflow: hidden;">
							<input style="width: 30%;float: left;" placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 48%;border-left: 1px solid black;" @change="items" :disabled="type=='Alter'">
								<el-option label="隻" value="隻"></el-option></el-option>
								<el-option label="件" value="件"></el-option></el-option>
								<el-option label="對" value="對"></el-option></el-option>
								<el-option label="條" value="條"></el-option></el-option>
								
								
							</el-select>
							<!-- <input style="width: 48%;border-left: 1px solid black;padding-left: 1%;" placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input"> -->
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">尺寸：</span>
						<p style="overflow: hidden;">
							<input style="width: 30%;float: left;" placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 48%;border-left: 1px solid black;" @change="items" :disabled="type=='Alter'">
								<el-option label="號" value="號"></el-option></el-option>
								<el-option label="寸" value="寸"></el-option></el-option>
								<el-option label="mm" value="mm"></el-option></el-option>
								
							</el-select>
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">內容：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">石資料：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">字印：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">字印(客要求）：</span>
						<p style="overflow: hidden;">
							<el-select v-model="Items" placeholder="select" style="float: left;width: 70%;" @change="items" :disabled="type=='Alter'">
								<el-option label="Y" value="Y"></el-option></el-option>
								<el-option label="N" value="N"></el-option></el-option>
								
							</el-select>
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">起貨日期：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">BIG DAY：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">備註：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">GP Amount：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">GP %：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Net Sales $：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Selling Price：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">PLV Cost：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">GC Cost：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">Add Cost：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">總石數：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">總石卡數：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">總石成本：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">金重：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">金價每克：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">總金價：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">對金HKD：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">人工＄RMB：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">人工＄HK：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">其他支出 $HK：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">其他支出備註：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">廠發票：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_l'>
						<span class="fl">廠價＄RMB：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">廠價 ＄HK：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">到貨日期：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_b table_l'>
						<span class="fl">廠付款紀錄：</span>
						<p style="overflow: hidden;">
							<input placeholder="input" v-model="formLabelAlign.fineness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>
					
					
				</el-row>
			</div>
			
			<!-- ||||||||||||||||||||| -->
			<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Design Information</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>


					<el-col :span="8" class='table_border table_t table_l table_r '>
						<span class="fl">手指圈口：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.dimensionFinger" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>

					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">闊度(mm)：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.dimensionWidth" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">厚度(mm)：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.dimensionThickness" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>


					<el-col :span="8" class='table_border table_t table_l table_r'>
						<span class="fl">長度(mm)：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.dimensionLength" :disabled="type=='detail'?true:false" class="tem_input">

						</p>
					</el-col>

					<el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">特別要求：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.specialRequests[0].request" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">字印位置：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.textLocation" :disabled="type=='detail'?true:false" class="tem_input">

						</p>
					</el-col>

					<el-col :span="8" class='table_border table_t table_l  table_r table_b'>
						<span class="fl">字印字體：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.textFont" :disabled="type=='detail'?true:false" class="tem_input">

						</p>
					</el-col>

					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">字印字句：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.textContext" :disabled="type=='detail'?true:false" class="tem_input">

						</p>
					</el-col>



				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->

			<div>

				<div style='padding: 5px;width: 96%;margin-left: 2%;margin-top: 10px;'>

					<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
						<!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
						<span class="fl" style="padding: 0 5px;">Stone information：</span>
						<!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
					</div>



					<div style="background: rgb(233,238,244);padding: 15px 20px;width: 100%;border-radius: 10px;white-space: nowrap">
						<el-row style='text-align: center;'>
							<el-col :span="2">
								<div class="grid-content">Stone</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">shape</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">color</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">Size</div>
							</el-col>

							<el-col :span="2">
								<div class="grid-content ">Remark</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">pcs</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">cts</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">USD</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">HKD</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">USD C</div>
							</el-col>
							<el-col :span="2">
								<div class="grid-content ">HKD C</div>
							</el-col>

						</el-row>

						<el-row v-for='(item,index) in formLabelAlign.materials'>

							<el-col :span="2">
								<div class="input-content">
									<el-select v-model="Items" placeholder="select" style="float: left;width: 100%;" @change="items" :disabled="type=='Alter'">
										<el-option label="gia" value="gia"></el-option></el-option>
										<el-option label="dia" value="dia"></el-option></el-option>
										<el-option label="sapphire" value="sapphire"></el-option></el-option>
										<el-option label="emearld" value="emearld"></el-option></el-option>
										<el-option label="ruby" value="ruby"></el-option></el-option>
										<el-option label="yellow sapphire" value="yellow sapphire"></el-option></el-option>
										<el-option label="orange sapphire" value="orange sapphire"></el-option></el-option>
										<el-option label="pearl" value="pearl"></el-option></el-option>
										<el-option label="mother pearl" value="mother pearl"></el-option></el-option>
										<el-option label="morganite" value="morganite"></el-option></el-option>
										<el-option label="amethyst" value="amethyst"></el-option></el-option>
										<el-option label="tourmaline" value="tourmaline"></el-option></el-option>
									</el-select>
									<!-- <el-input placeholder="input" class='grid-inputs' v-model="item.stone" :disabled="type=='detail'?true:false"></el-input> -->
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-select v-model="Items" placeholder="select" style="float: left;width: 100%;" @change="items" :disabled="type=='Alter'">
										<el-option label="round" value="round"></el-option></el-option>
										<el-option label="princess" value="princess"></el-option></el-option>
										<el-option label="cushion" value="cushion"></el-option></el-option>
										<el-option label="emearld" value="emearld"></el-option></el-option>
										<el-option label="combination" value="combination"></el-option></el-option>
										<el-option label="drop" value="drop"></el-option></el-option>
										<el-option label="star" value="star"></el-option></el-option>
										<el-option label="oval" value="oval"></el-option></el-option>
										<el-option label="trapezoid" value="trapezoid"></el-option></el-option>
										<el-option label="heart" value="heart"></el-option></el-option>
										<el-option label="baguette" value="baguette"></el-option></el-option>
										<el-option label="triangle" value="triangle"></el-option></el-option>
										<el-option label="hexagon" value="hexagon"></el-option></el-option>
										<el-option label="square" value="square"></el-option></el-option>
										<el-option label="marquise" value="marquise"></el-option></el-option>
									</el-select>
									<!-- <el-input placeholder="input" style='width: 49%;' v-model="item.dimensionWidth" :disabled="type=='detail'?true:false"></el-input>
									<span>*</span>
									<el-input placeholder="input" style='width: 49%;' v-model="item.dimensionLength" :disabled="type=='detail'?true:false"></el-input> -->
								</div>
							</el-col>

							<el-col :span="2">
								<div class="input-content">
									<el-select v-model="Items" placeholder="select" style="float: left;width: 100%;" @change="items" :disabled="type=='Alter'">
										<el-option label="red" value="red"></el-option></el-option>
										<el-option label="green" value="green"></el-option></el-option>
										<el-option label="pink" value="pink"></el-option></el-option>
										<el-option label="blue" value="blue"></el-option></el-option>
										<el-option label="yellow" value="yellow"></el-option></el-option>
										<el-option label="orange" value="orange"></el-option></el-option>
										<el-option label="brown" value="brown"></el-option></el-option>
										<el-option label="black" value="black"></el-option></el-option>
										<el-option label="E color" value="E color"></el-option></el-option>
										<el-option label="F color" value="F color"></el-option></el-option>
										<el-option label="G color" value="G color"></el-option></el-option>
										<el-option label="H color" value="H color"></el-option></el-option>
										<el-option label="I color" value="I color"></el-option></el-option>
										<el-option label="J color" value="J color"></el-option></el-option>
										<el-option label="K color" value="K color"></el-option></el-option>
										<el-option label="L color" value="L color"></el-option></el-option>
										<el-option label="M color" value="M color"></el-option></el-option>
										<el-option label="N color" value="N color"></el-option></el-option>
										<el-option label="O color" value="O color"></el-option></el-option>
										<el-option label="P color" value="P color"></el-option></el-option>
										<el-option label="Q color" value="Q color"></el-option></el-option>
										<el-option label="R color" value="R color"></el-option></el-option>
										
										<el-option label="S color" value="S color"></el-option></el-option>
										<el-option label="T color" value="T color"></el-option></el-option>
										<el-option label="U color" value="U color"></el-option></el-option>
										<el-option label="V color" value="V color"></el-option></el-option>
										<el-option label="W color" value="W color"></el-option></el-option>
										<el-option label="X color" value="X color"></el-option></el-option>
										<el-option label="Y color" value="Y color"></el-option></el-option>
										<el-option label="Z color" value="Z color"></el-option></el-option>
										
									</el-select>
									<!-- <el-input placeholder="input" class='grid-inputs' v-model="item.sendQuantity" :disabled="type=='detail'?true:false"></el-input> -->
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.sendWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.backWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.factQuantity" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.factWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.factWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.factWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.factWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>
							<el-col :span="2">
								<div class="input-content">
									<el-input placeholder="input" class='grid-inputs' v-model="item.factWeight" :disabled="type=='detail'?true:false"></el-input>
								</div>
							</el-col>

							<el-col :span="1">
								<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
									<span style="cursor: pointer;" v-show="item.reserved==0" class='grid-inputs' @click="reserved(index)">選扣</span>
									<span style="cursor: pointer;color: #409EFF;" v-show="item.reserved==1" class='grid-inputs' @click="reserved(index)">已選</span>
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
							<el-col :span="22">
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
			<!-- ||||||||||||||||||||| -->
			<div class="MoBangXinZeng" >
				<el-form>
					<el-row style='line-height: 35px;'>
						<el-col :span="24" >
							
							<el-form-item label="設計圖(最多可上傳四張):" class='mat20 table90' style='margin-bottom: 20px; width: 100%;margin-left: 0;'>
								<el-upload action="auto" :file-list="fileList" :http-request="uploadSectionFile" list-type="picture-card" :limit="4"
								 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" >
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</el-form-item>
						
						</el-col>
						
					</el-row>
				</el-form>
			</div>
			<!-- ||||||||||||||||||||| -->

			<!-- ||||||||||||||||||||| -->
			<!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Pay Information</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div> -->
			<!-- ||||||||||||||||||||| -->
	<!-- 		<div class="MoBangXinZeng">
				<el-row style='line-height: 35px;'>

					<el-col :span="8" class='table_border table_t  table_l table_r '>
						<span class="fl">金類別：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.metal" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r '>
						<span class="fl">金重(g)：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.metalWeight" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r'>
						<span class="fl">總金費：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.metalCost" :disabled="type=='detail'?true:false" class="tem_input">

						</p>
					</el-col>

					<el-col :span="8" class='table_border table_t table_l table_r table_b'>
						<span class="fl">人工RMB：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.labourFeeRmb" :disabled="type=='detail'?true:false" class="tem_input">
						</p>

					</el-col>

					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">人工HK$：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.labourFeeHkd" :disabled="type=='detail'?true:false" class="tem_input">

						</p>
					</el-col>
					
					<el-col :span="8" class='table_border table_t  table_r table_b'>
						<span class="fl">備注：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign.remark" :disabled="type=='detail'?true:false" class="tem_input">
						</p>
					</el-col>

				</el-row>
			</div> -->
			
			
			
			
		</div>




		<div style="width:100%;text-align: center;margin-top: 45px;">

			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm01('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
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
				assetRef:[],
				plvKGuestBillType: [],
				nameId: '',
				nameId1: '',
				product_quantity:'',
				product_name:'',
				product_sort:'',
				userReferenceId: '',
				branch: '',
				Items:'',
				branchId: '',
				branch_list: [],
				Items_list:[],
				factory: '',
				factory_list: [],
				fileList: [],
				test: '',
				dialogVisible: false,
				dialogImageUrl: '',
				loading: false,
				textarea: '',
				labelPosition: '',
				type: "new",
				uuid: '',
				value1: '',
				password: '',
				plvKAviEceOemSaveDtoList: '',
				plvKGuestBillSaveDtoList: '',
				plvKProductSaveDtoList: '',
				plvKStoneTotalSaveDtoList: '',
				plvKStoneTotalEntityList: '',

				formLabelAlign_salesOrder: {
					items:[{
						quantity:'',
						name:'',
						sort:'',
						reference:''
					}]
				},

				formLabelAlign: {
					"branch": {
						"reference": ""
					},
					"specialRequests": [{
							"request": ""
						}
					],
					"dateDelivery": "",
					"dateSend": "",
					"design": 0,
					"dimensionFinger": "",
					"dimensionLength": 0,
					"dimensionThickness": 0,
					"dimensionWidth": 0,
					"factory": {
						"reference": ""
					},
					"fineness": "",
					"images": [],
					"labourFeeHkd": 0,
					"labourFeeRmb": 0,
					"materials": [{
						"backQuantity": null,
						"backUnit": null,
						"backWeight": null,
						"dimensionLength": 0,
						"dimensionWidth": 0,
						"factQuantity": null,
						"factUnit": "CT",
						"factWeight": null,
						"purged": null,
						"reserved": 0,
						"sendUnit": "CT",
						"sendQuantity": 1,
						"sendWeight": 0,
						"stone": ""
					}],
					"metal": "",
					"metalCost": 0,
					"metalWeight": 0,
					"productType": "",
					"quantity": 0,
					"remark": "",
					"salesOrderItem": {
						"reference": ""
					},
					"member":{
						"reference": ""
					},
					"reference":null,
					"textContext": "",
					"textFont": "",
					"textLocation": ""
				},

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
			this.findAllEntrepot()
			this.type = this.$route.query.type
			this.root = this.$api.root
			this.uuid = this.$route.query.uuid
			this.id = this.$route.query.id
			
			
			if(this.type=='Alter')
			{
			
				this.$api.get('/factory/order/' + this.$route.query.id, null, r => {
					
					console.log(r)
					
					// this.formLabelAlign= r
					this.branch=r.branch.name
					this.product_quantity=r.salesOrderItem.quantity
					this.product_name=r.salesOrderItem.name
					this.product_sort=r.salesOrderItem.sort
					
					this.formLabelAlign.specialRequests=r.specialRequests.length==0?[{"request":""}]:[{"request":r.specialRequests[0].request}],
					this.formLabelAlign.dateDelivery=r.dateDelivery
					this.formLabelAlign.dateSend=r.dateSend
					this.formLabelAlign.design=r.design
					this.formLabelAlign.dimensionFinger=r.dimensionFinger
					this.formLabelAlign.dimensionLength=r.dimensionLength
					this.formLabelAlign.dimensionThickness=r.dimensionThickness
					this.formLabelAlign.dimensionWidth=r.dimensionWidth
					this.factory=r.factory.name
					this.formLabelAlign.fineness=r.fineness
					this.formLabelAlign.images=r.images
					this.formLabelAlign.labourFeeHkd=r.labourFeeHkd
					this.formLabelAlign.labourFeeRmb=r.labourFeeRmb
					this.formLabelAlign.materials=r.materials
					
					this.formLabelAlign.metal=r.metal
					this.formLabelAlign.metalCost=r.metalCost
					this.formLabelAlign.metalWeight=r.metalWeight
					this.formLabelAlign.productType=r.productType
					this.formLabelAlign.quantity=r.quantity
					this.formLabelAlign.remark=r.remark
					this.formLabelAlign.salesOrderItem.reference=r.salesOrderItem.reference
					this.formLabelAlign.textContext=r.textContext
					this.formLabelAlign.textFont=r.textFont
					this.formLabelAlign.textLocation=r.textLocation
					this.formLabelAlign.reference=r.reference
					this.formLabelAlign.member.reference=r.member.reference
					
					this.formLabelAlign_salesOrder.items[0].quantity=r.salesOrderItem.quantity
					this.formLabelAlign_salesOrder.items[0].name=r.salesOrderItem.name
					this.formLabelAlign_salesOrder.items[0].sort=r.salesOrderItem.sort
					this.formLabelAlign_salesOrder.items[0].reference=r.salesOrderItem.reference
					
					for (let i = 0; i < r.images.length; i++) {
						this.fileList.push({"uid":i,"url":this.root + '/kernal/asset/'+r.images[i].reference})
					}
					
					for (let i = 0; i < this.fileList.length; i++) {
						this.assetRef.push({"uid":this.fileList[i].uid,"reference":r.images[i].reference})
					}
					
					
					this.Items=r.salesOrderItem.name
					
					
					
					
					this.search()
					
					
				})
				
			}else{
				
				// 
				
				
				// this.search()
			}
			
			
		},

		methods: {
			
			items(){
				// console.log(this.Items)
				this.product_quantity=this.Items_list[this.Items].name
				this.product_name=this.Items_list[this.Items].name
				this.product_sort=this.Items_list[this.Items].sort
				this.formLabelAlign.salesOrderItem.reference=this.Items_list[this.Items].reference
				
				
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
				// console.log('分行')
				this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
					this.branch_list = r.content,
					this.branch = r.content[0].name
					this.branchId = r.content[0].reference
					// console.log('-----------')
					// console.log(r)
					// console.log(this.branchId)
					// this.branchId== r.content[0].reference
					// this.search()
				});
				
				
				this.$api.get('/factory', null, r => {
					this.factory_list = r
					// console.log('-----------')
					// console.log(r)
				});
				
				
			},
			
			uploadSectionFile(param) {
				
				// console.log(param)
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
			
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.dialogImageUrl = this.root + '/kernal/asset/' + r.reference
			
					this.referenceId = r.reference
					// console.log(r)
			
					this.assetRef.push({
						"uid":param.file.uid,
						"reference": r.reference
					})
				});
			},
			
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			
			handleRemove(file, fileList) {
				// console.log(file, fileList);
				
				for (let i = 0; i < this.assetRef.length; i++) {
					if(file.uid==this.assetRef[i].uid){
						this.assetRef.splice(i,1)
					}
				}
				
			},

			search() {
				
				// console.log("Alter---")
				// console.log(this.type)
				
				 if(this.type=='Alter'){
					
				}else{
					
					this.$api.get('/sales/' + this.$route.query.uuid, null, r => {
					
						// console.log('details----01')
						// console.log(r)
						this.formLabelAlign_salesOrder = r
						this.Items_list=r.items
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

					// console.log(r)

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

					// console.log(r)

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

					// console.log(r)
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
				// console.log('000000000000000000000000')

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

			submitForm01() {
				
				this.loading = true
				for (var i = 0; i < this.branch_list.length; i++) {
					if (this.branch == this.branch_list[i].name) {
						this.formLabelAlign.branch.reference = this.branch_list[i].reference
					}
				}
				
				for (var i = 0; i < this.factory_list.length; i++) {
					if (this.factory == this.factory_list[i].name) {
						this.formLabelAlign.factory.reference = this.factory_list[i].reference
					}
				}
				
				for (var i = 0; i < this.assetRef.length; i++) {
					this.formLabelAlign.images.push({"reference":this.assetRef[i].reference})
				}
				
				// productType

				this.formLabelAlign.dateDelivery = this.formLabelAlign.dateDelivery == '' ? "" : new Date(this.formLabelAlign.dateDelivery).format(
					"yyyy-MM-dd")
				this.formLabelAlign.dateSend = this.formLabelAlign.dateSend == '' ? "" : new Date(this.formLabelAlign.dateSend)
					.format("yyyy-MM-dd")
				
				this.formLabelAlign.design = parseInt(this.formLabelAlign.design)
				this.formLabelAlign.dimensionLength = parseFloat(this.formLabelAlign.dimensionLength)
				this.formLabelAlign.dimensionThickness = parseFloat(this.formLabelAlign.dimensionThickness)
				this.formLabelAlign.dimensionWidth = parseFloat(this.formLabelAlign.dimensionWidth)
				this.formLabelAlign.labourFeeHkd = parseInt(this.formLabelAlign.labourFeeHkd)
				this.formLabelAlign.labourFeeRmb = parseInt(this.formLabelAlign.labourFeeRmb)
				this.formLabelAlign.metalCost = parseInt(this.formLabelAlign.metalCost)
				this.formLabelAlign.metalWeight = parseInt(this.formLabelAlign.metalWeight)
				this.formLabelAlign.quantity = parseInt(this.formLabelAlign.quantity)
				
				// this.formLabelAlign.salesOrderItem.reference=this.formLabelAlign_salesOrder.items[0].reference
				
				console.log(this.formLabelAlign)
				
				if(this.branch==''){
					
					MessageBox('Select branch', 'Tips', {
						confirmButtonText: 'OK',
						type: 'warning'
					}).then(() => {
						this.loading=false
					}).catch(() => {
					
					});
					
				}else if(this.Items===''){
					
					MessageBox('Select item', 'Tips', {
						confirmButtonText: 'OK',
						type: 'warning'
					}).then(() => {
						this.loading=false
					}).catch(() => {
					
					});
					
				}else{
					
					if (this.type == 'Alter') {
						this.$api.post('/factory/order/save', this.formLabelAlign, r => {
					
							console.log(r)
							this.loading = false
							var that=this
							for (let i = 0; i < r.materials.length; i++) {
								
								if(r.materials[i].reserved==1){
									// console.log('------'+i+'-------')
									setTimeout(function(){
										that.$api.post('/factory/order/material/'+r.materials[i].reference+'/reserve', null, r => {
										},100)
									})
								}else{
									setTimeout(function(){
										that.$api.post('/factory/order/material/'+r.materials[i].reference+'/unreserve', null, r => {
										},100)
									})
								}
								
							}
							this.$router.push("/factoryManagement")
							
						})
					} else {
						this.$api.put('/factory/order/save', this.formLabelAlign, r => {
					
							console.log(r)
							this.loading = false
							this.$router.push("/factoryManagement")
							var that=this
							for (let i = 0; i < r.materials.length; i++) {
								
								if(r.materials[i].reserved==1){
									// console.log('------'+i+'-------')
									setTimeout(function(){
										that.$api.post('/factory/order/material/'+r.materials[i].reference+'/reserve', null, r => {
										},100)
										
									})
								}else{
									setTimeout(function(){
										that.$api.post('/factory/order/material/'+r.materials[i].reference+'/unreserve', null, r => {
										},100)
										
									})
								}
								
							}
					
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
			reserved(index) {
				console.log('index----------' + index)
				console.log(this.formLabelAlign.materials)
				this.formLabelAlign.materials[index].reserved = this.formLabelAlign.materials[index].reserved == 0 ? 1 : 0
			},
			//增加石資料
			add() {

				console.log('1')
				this.formLabelAlign.materials.push({
					"backQuantity": 0,
					"backUnit": "CT",
					"backWeight": 0,
					"dimensionLength": 0,
					"dimensionWidth": 0,
					"factQuantity": 0,
					"factUnit": "CT",
					"factWeight": 0,
					"id": 0,
					"purged": {
						"date": 0,
						"day": 0,
						"hours": 0,
						"minutes": 0,
						"month": 0,
						"nanos": 0,
						"seconds": 0,
						"time": 0,
						"timezoneOffset": 0,
						"year": 0
					},
					"reference": "string",
					"reserved": 0,
					"sendInit": "CT",
					"sendQuantity": 0,
					"sendWeight": 0,
					"stone": "string"
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
				
				if(this.type=='Alter'){
					this.$router.push("/factoryManagement")
				}else{
					this.$router.push("/CustomerOrderManagement")
				}
				
				
			},

			// 項目刪除
			del(index) {

				this.formLabelAlign.materials.splice(index, 1)

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
		
		
		.table90 {
			width: 90%;
			margin-left: 5%
		}

	}
</style>

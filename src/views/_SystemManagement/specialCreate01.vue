<template>
	<div class="specialCreate" style="min-width: 1130px;">

		<div style="height: 700px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="100px" :model="formLabelAlign">
				
				<div style="height: 50px;width: 1000px;" class="mat20">
					<div style="float: left;line-height: 40px;font-size: 18px;">
						<span style="margin-left: 10px;">>>>Diamond</span>
					</div>
				</div>
				<div style="height: 700px;width: 100%;">
					<div class="fl" style="width: 30%;height: 630px;background: rgb(220,229,238);border-radius: 10px;">

						<div style="width: 96%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">

							<!-- <el-form-item label="Invoice Date" style='padding: 0;'>
								<el-date-picker v-model="formLabelAlign.invoiceDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item> -->

							<!-- <div class="invoice_upload" > -->
								<!-- <el-form-item label="Invoice Upload" > -->
									<!-- <el-upload style='float: left;' class="avatar-uploader" :before-upload="beforeAvatarUpload" -->
									 <!-- action="auto" :http-request="uploadSectionFile" :show-file-list="false"  :disabled="type=='detail'?true:false" > -->
										<!-- :on-success="handleAvatarSuccess" -->
										<!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" style="backgroundSize:contain,height: 95%,width:95%,backgroundRepeat: no-repeat"> -->
										<!-- <i class="el-icon-plus"></i> -->
										<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
										
									<!-- </el-upload> -->
									
									<!-- <div style="width: 80px;white-space: nowrap;float: left;"> -->
									<!-- <span v-if="imageUrl" style="float: left;padding-top: 150px;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("invoice")'>預覽</span> -->
									<!-- <span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-top: 150px; padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handleRemove("invoice")'>刪除</span> -->
									<!-- </div> -->
									<!-- <span>預覽</span>	 -->

									<!-- <el-dialog :visible.sync="dialogVisible"> -->
										<!-- <img width="100%" :src="dialogImageUrl" alt=""> -->
									<!-- </el-dialog> -->

								<!-- </el-form-item> -->
							<!-- </div> -->
							
							<el-form-item label="Commodity">
								<el-autocomplete class="inputs01" v-model="name_input" :fetch-suggestions="querySearch_name" :disabled="type=='detail'?true:false"
								 placeholder="Input" @select="handleSelect_name"></el-autocomplete>
								<!-- <el-input v-model="formLabelAlign.name" class='inputs' :disabled="type=='detail'?true:false"></el-input> -->
							</el-form-item>
							
							<el-form-item label="Dimension">
								<el-input class='inputs01' v-model="formLabelAlign.dimension" style='width: 48%;float: left;' :disabled="type=='detail'?true:false"
								 placeholder="number"></el-input>
								<el-input class='inputs01' v-model="formLabelAlign.dimensionUnit" style='width: 48%;float: left;margin-left: 4%;'
								 :disabled="type=='detail'?true:false" placeholder="Unit"></el-input>
							</el-form-item>
							
							<el-form-item label="Purchase">
								<el-input class='inputs01' v-model="formLabelAlign.storageQuqntity" :disabled="type=='detail'?true:false"
								 placeholder="Number"></el-input>
							</el-form-item>
							
							<el-form-item label="Weight">
								<el-input class='inputs01' v-model="formLabelAlign.availableInventoryWeight" style='width: 48%;float: left;'
								 :disabled="type=='detail'?true:false" placeholder="number"></el-input>
								<el-input class='inputs01' v-model="formLabelAlign.weightUnit" style='width: 48%;float: left;margin-left: 4%;'
								 :disabled="type=='detail'?true:false" placeholder="Unit"></el-input>
							</el-form-item>
							
							<el-form-item label="Cost" prop="Cost">
								<el-input class='inputs01' v-model="formLabelAlign.cost" :disabled="type=='detail'?true:false" placeholder="Number"></el-input>
							</el-form-item>
							
							<el-form-item label="Branch">
								<el-select style='height: 48px;width: 100%;float: left;' v-model="Entrepot_input" @change='branch_change'
								 :disabled="type=='detail'?true:false">
									<el-option v-for='(item, index) in Entrepot' :label="item.name" :value="index"></el-option>
								</el-select>
								<!-- <el-input class='inputs' v-model="formLabelAlign.password" :disabled="type=='detail'?true:false"></el-input> -->
								<!-- <el-autocomplete class="inputs01" v-model="formLabelAlign.branch" :fetch-suggestions="querySearch_branch"
								 placeholder="请输入内容" @select="handleSelect_branch" :disabled="type=='detail'?true:false"></el-autocomplete> -->
							</el-form-item>
							
							
							

							<!-- <el-form-item label="Source">
								<el-autocomplete class="inputs01" v-model="origin_input" :fetch-suggestions="querySearch_origin" placeholder="Input"
								 @select="handleSelect_origin" @change='changeSource()' :disabled="type=='detail'?true:false"></el-autocomplete>
							</el-form-item> -->


							<el-form-item label="Certificate">
								<el-select style='height: 48px;width: 100%;float: left;' v-model="AllType_input" @change='type_change'
								 :disabled="type=='detail'?true:false">
									<el-option v-for='(item, index) in AllType' :label="item.inventoryType" :value="index"></el-option>
								</el-select>
							</el-form-item>


						</div>
						<!-- <div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">

							<el-form-item label="Invoice No" style='padding: 0;'>
								<el-input v-model="formLabelAlign.invoiceNo" class='inputs01' :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>

							<el-form-item label="Commodity">
								<el-autocomplete class="inputs01" v-model="name_input" :fetch-suggestions="querySearch_name" :disabled="type=='detail'?true:false"
								 placeholder="Input" @select="handleSelect_name"></el-autocomplete>
							</el-form-item>

							<el-form-item label="Dimension">
								<el-input class='inputs01' v-model="formLabelAlign.dimension" style='width: 48%;float: left;' :disabled="type=='detail'?true:false"
								 placeholder="number"></el-input>
								<el-input class='inputs01' v-model="formLabelAlign.dimensionUnit" style='width: 48%;float: left;margin-left: 4%;'
								 :disabled="type=='detail'?true:false" placeholder="Unit"></el-input>
							</el-form-item>

							<el-form-item label="Weight">
								<el-input class='inputs01' v-model="formLabelAlign.availableInventoryWeight" style='width: 48%;float: left;'
								 :disabled="type=='detail'?true:false" placeholder="number"></el-input>
								<el-input class='inputs01' v-model="formLabelAlign.weightUnit" style='width: 48%;float: left;margin-left: 4%;'
								 :disabled="type=='detail'?true:false" placeholder="Unit"></el-input>
							</el-form-item>

							<el-form-item label="Cost" prop="Cost">
								<el-input class='inputs01' v-model="formLabelAlign.cost" :disabled="type=='detail'?true:false" placeholder="Number"></el-input>
							</el-form-item>

							<el-form-item label="Branch">
								<el-select style='height: 48px;width: 100%;float: left;' v-model="Entrepot_input" @change='branch_change'
								 :disabled="type=='detail'?true:false">
									<el-option v-for='(item, index) in Entrepot' :label="item.name" :value="index"></el-option>
								</el-select>
								
							</el-form-item>

						</div> -->





					</div>



					<div v-show='ifGRS==1' class="fl" style="width: 49%;height: 630px;background: rgb(227,230,235);margin-left: 2%;border-radius: 10px;">

						<div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">

							<el-form-item label="No" label-width="100px" size='medium'>
								<el-input v-model="formLabelAlign.certificateNo" class='inputs01' :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Date" label-width="100px" size='medium'>
								<el-date-picker v-model="formLabelAlign.certificatedate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
								<!-- <el-input v-model="formLabelAlign.certificatedate" class='inputs' :disabled="type=='detail'?true:false"
								 placeholder="请输入内容"></el-input> -->
							</el-form-item>
							<el-form-item label="Style" label-width="100px" size='medium'>
								<el-input v-model="formLabelAlign.giaStyle" class='inputs01' :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Measurements" label-width="100px" size='medium'>
								<el-input v-model="formLabelAlign.giaMeasurements" class='inputs01' :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
								<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
								 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
							</el-form-item>
							<el-form-item label="Color" prop="userName" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.color" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Clarity" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.giaClarity_Grade" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Characteristics" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.giaClarityCharacteristics" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>


						</div>


						<div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">

							<el-form-item label="Cut" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.cut" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Polish" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.giaPolish" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Symmetry" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.giaSymmetry" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Fluorescence" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.giaFluorescence" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Inscription" label-width="100px" size='medium'>
								<el-input class='inputs01' v-model="formLabelAlign.giaInscription" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>

							<el-form-item label="Comment" label-width="100px" size='medium'>
								<el-input type="textarea" class='inputs01' v-model="formLabelAlign.comments" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>

							<div class='GIA'>
								<el-form-item label="Certificate Upload" style='margin-left: 10px;'>
									<el-upload :disabled="type=='detail'?true:false" style='float: left;height: 100px;' class="avatar-uploader" :show-file-list="false" action="auto"  :http-request="uploadSectionFile02">
										<img v-if="imageUrl02" :src="imageUrl02" class="avatar" style="width: 180px;height: 80px;">
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
									<span v-if="imageUrl02" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("gia")'>預覽</span>
									<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handleRemove("gia")'>刪除</span>
								</el-form-item>
							</div>
						</div>
					</div>





					<div v-show='ifGRS==2' class="fl" style="width: 49%;height: 630px;background: rgb(227,230,235);margin-left: 2%;border-radius: 10px;">

						<div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">

							<el-form-item label="No" label-width="100px">
								<el-input v-model="formLabelAlign.certificateNo" class='inputs01' :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>

							<el-form-item label="Date" label-width="100px">
								<el-date-picker v-model="formLabelAlign.certificatedate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item>

							<el-form-item label="Object" label-width="100px">
								<el-input v-model="formLabelAlign.grsObject" class='inputs01' :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>

							<el-form-item label="Identification" label-width="100px">
								<el-input class='inputs01' v-model="formLabelAlign.grsIdentification" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>

							<el-form-item label="Comment" label-width="100px">
								<el-input type="textarea" class='inputs01' v-model="formLabelAlign.comments" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>

							<el-form-item label="Origin" label-width="100px">
								<el-input type="textarea" class='inputs01' v-model="formLabelAlign.grsOrigin" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item>


						</div>


						<div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">

							<el-form-item label="Cut" label-width="100px">
								<el-input class='inputs01' v-model="formLabelAlign.cut" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Shape" label-width="100px">
								<el-input class='inputs01' v-model="formLabelAlign.grsShape" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>
							<el-form-item label="Color" label-width="100px">
								<el-input class='inputs01' v-model="formLabelAlign.color" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item>

							<!-- <el-form-item label="Origin" label-width="100px">
								<el-input type="textarea" class='inputs01' v-model="formLabelAlign.grsOrigin" :disabled="type=='detail'?true:false"
								 placeholder="Input"></el-input>
							</el-form-item> -->

							<el-form-item label="Certificate Upload" style='margin-left: 10px;white-space: nowrap;'>
								<el-upload :disabled="type=='detail'?true:false" style='float: left;' class="avatar-uploader" action="auto" :http-request="uploadSectionFile03" :show-file-list="false" >
									<img v-if="imageUrl03" :src="imageUrl03" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
								<span v-if="imageUrl03" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;padding-top: 150px;" @click='handlePictureCardPreview("grs")'>預覽</span>
								<span v-if="imageUrl03&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;padding-top: 150px;" @click='handleRemove("grs")'>刪除</span>
							</el-form-item>
						</div>


					</div>
					
					
					
					
					
				</div>
				
				
				<div class="branchCreate" >
					<!-- <el-row>
						<el-col :span="24">
							<div class="grid-content bg-purple-dark" style="background:white;height: 60px;">
				
								<div class="second_menu">
									<span @click="topage('user')">用戶管理</span>
								</div>
				
								<div class="second_menu">
									<span @click="topage('grounp')">群組管理</span>
								</div>
				
								<div class="second_menu selector">
									<span>分行管理</span>
								</div>
							</div>
						</el-col>
					</el-row> -->
					
					<div style="height: 50px;width: 51%;float: left;" class="mat20">
						<div style="float: left;line-height: 40px;font-size: 18px;">
							<span style="margin-left: 10px;">>>>Invoice</span>
						</div>
					</div>
					
					<div style="height: 50px;width: 30%;float: left;" class="mat20">
						<div style="float: left;line-height: 40px;font-size: 18px;">
							<span style="margin-left: 10px;">>>>Check</span>
						</div>
					</div>
					
					<div class="fl" style="width: 49%;height: 630px;background: rgb(220,229,238);border-radius: 10px;">
						<div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">
					
							<!-- <el-form-item label="Invoice Date" style='padding: 0;'>
								<el-date-picker v-model="formLabelAlign.invoiceDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item> -->
					
							<div class="invoice_upload" >
								<el-form-item label="Invoice Upload" >
									<el-upload style='float: left;' class="avatar-uploader" :before-upload="beforeAvatarUpload"
									 action="auto" :http-request="uploadSectionFile" :show-file-list="false"  :disabled="type=='detail'?true:false" >
										<!-- :on-success="handleAvatarSuccess" -->
										<img v-if="imageUrl" :src="imageUrl" class="avatar" style="backgroundSize:contain,height: 95%,width:95%,backgroundRepeat: no-repeat">
										<!-- <i class="el-icon-plus"></i> -->
										<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										
									</el-upload>
									
									<div style="width: 80px;white-space: nowrap;float: left;">
									<span v-if="imageUrl" style="float: left;padding-top: 150px;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("invoice")'>預覽</span>
									<span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-top: 150px; padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handleRemove("invoice")'>刪除</span>
									</div>
									<!-- <span>預覽</span>	 -->
					
									<el-dialog :visible.sync="dialogVisible">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
					
								</el-form-item>
							</div>
							
							
							
							<el-form-item label="Invoice Date">
								<el-date-picker v-model="formLabelAlign.invoiceDate" type="date" style='width: 100%;' class='inputs'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
								<!-- <el-input class='inputs01' v-model="formLabelAlign.invoiceDate" :disabled="type=='detail'?true:false"
								 placeholder="Number"></el-input> -->
							</el-form-item>
							
							<el-form-item label="Invoice Company">
								<el-autocomplete class="inputs01" v-model="origin_input" :fetch-suggestions="querySearch_origin" placeholder="Input"
								 @select="handleSelect_origin" @blur='changeSource' :disabled="type=='detail'?true:false"></el-autocomplete>
								<!-- <el-input class='inputs01' v-model="formLabelAlign.invoiceSeller" :disabled="type=='detail'?true:false"></el-input> -->
							</el-form-item>
							
							
					
							<el-form-item label="Invoice No">
								<el-input class='inputs01' v-model="formLabelAlign.invoiceNo" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Rap Price(US)">
								<el-input class='inputs01' v-model="formLabelAlign.invoiceRapPrice" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							
							
							
					
					
						</div>
						<div style="width: 47%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">
					
							<!-- <el-form-item label="Invoice No" style='padding: 0;'>
								<el-input v-model="formLabelAlign.invoiceNo" class='inputs01' :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</el-form-item> -->
							
							<el-form-item label="Discount(%)">
								<el-input class='inputs01' v-model="formLabelAlign.invoiceDiscount" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Total Carats">
								<el-input class='inputs01' v-model="formLabelAlign.invoiceTotalCarats" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Total HKD">
								<el-input class='inputs01' v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceHk" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Total USD">
								<el-input class='inputs01' v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceUs" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
					
						</div>
					
					
					
					
					
					</div>
					
					
					<div class="fl" style="width: 30%;height: 630px;background: rgb(220,229,238);margin-left: 2%;border-radius: 10px;">
						
						<div style="width: 96%;float: left;margin-top: 2%;height: 96%;margin-left: 2%;">
					
							<!-- <el-form-item label="Invoice Date" style='padding: 0;'>
								<el-date-picker v-model="formLabelAlign.invoiceDate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item> -->
					
							<!-- <div class="invoice_upload" > -->
								<!-- <el-form-item label="Invoice Upload" > -->
									<!-- <el-upload style='float: left;' class="avatar-uploader" :before-upload="beforeAvatarUpload" -->
									 <!-- action="auto" :http-request="uploadSectionFile" :show-file-list="false"  :disabled="type=='detail'?true:false" > -->
										<!-- :on-success="handleAvatarSuccess" -->
										<!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" style="backgroundSize:contain,height: 95%,width:95%,backgroundRepeat: no-repeat"> -->
										<!-- <i class="el-icon-plus"></i> -->
										<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
										
									<!-- </el-upload> -->
									
									<!-- <div style="width: 80px;white-space: nowrap;float: left;"> -->
									<!-- <span v-if="imageUrl" style="float: left;padding-top: 150px;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("invoice")'>預覽</span> -->
									<!-- <span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-top: 150px; padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handleRemove("invoice")'>刪除</span> -->
									<!-- </div> -->
									<!-- <span>預覽</span>	 -->
					
									<!-- <el-dialog :visible.sync="dialogVisible"> -->
										<!-- <img width="100%" :src="dialogImageUrl" alt=""> -->
									<!-- </el-dialog> -->
					
								<!-- </el-form-item> -->
							<!-- </div> -->
							
							
							
							
							<el-form-item label="Check Date">
								<el-date-picker v-model="formLabelAlign.receiptBillingDate" type="date" style='width: 100%;' class='inputs'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item>
							
							<el-form-item label="Check HKD">
								<el-input class='inputs01' v-model="formLabelAlign.receiptBillingPrice" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Bank">
								<el-input class='inputs01' v-model="formLabelAlign.receiptBankName" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Check No">
								<el-input class='inputs01' v-model="formLabelAlign.receiptNo" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
							<el-form-item label="Check Company">
								<el-input class='inputs01' v-model="formLabelAlign.receiptPayer" :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							
					
						</div>
						
					
					
					</div>
					
				
					<!-- <div style="height: 50px;line-height: 50px;margin-top: 20px;">
						<span style="float: left;font-size: 16px;">>>>Invoice & Receipt</span>
					</div>
				
					<div style="padding: 20px 0;border-radius: 10px;padding: 20px;height: 300px;" class="form_bg">
						<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">
							
							<el-form-item label="Invoice Date" class='fl' style='width: 30%;'>
								<el-date-picker v-model="formLabelAlign.invoiceDate" type="date" style='width: 300px;' class='inputs'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item>
							
							<el-form-item label="Invoice Company" class='fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceSeller" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="Invoice No" class='fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceNo" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
				
							<el-form-item label="Rap Price(US)" class='fl ' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceRapPrice" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
				
							<el-form-item label="Discount(%)" class='fl ' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceDiscount" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
				
							<el-form-item label="Total Carats" class='fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceTotalCarats" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
				
							<el-form-item label="Total HK$" class='fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceHk" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
				
							<el-form-item label="Total US$" class='fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceUs" class='inputs' :disabled="type=='detail'?true:false"></el-input>
							</el-form-item>
				
				
				
						</el-form>
					</div> -->
				
				
					<!-- <div style="height: 50px;width: 1000px;" class="mat20">
						<div style="float: left;line-height: 40px;font-size: 18px;">
							<span style="margin-left: 10px;">>>>Stone</span>
						</div>
					</div> -->
				
					<div style="width: 95%;float: left;" class="mat20">
						<el-row>
							<el-col :span="3">
								<div class="grid-content ">Memo No</div>
							</el-col>
							<!-- <el-col :span="3">
								<div class="grid-content ">Lot No</div>
							</el-col> -->
							<el-col :span="6">
								<div class="grid-content ">Description Of Cut & Polished Diamonds</div>
							</el-col>
							<!-- <el-col :span="3">
								<div class="grid-content ">Carats</div>
							</el-col> -->
							<!-- <el-col :span="3">
								<div class="grid-content ">Rate(US$/HK$)</div>
							</el-col> -->
							<!-- <el-col :span="3">
								<div class="grid-content ">Amount(US$/HK$)</div>
							</el-col> -->
						</el-row>
				
						<el-row v-for='(item,index) in formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList'>
							<el-col :span="3">
								<div class="input-content ">
									<el-input class='grid-inputs' v-model="item.invoiceMemoNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
									<!-- <el-input class='grid-inputs' v-model="item.stoneName" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
								</div>
							</el-col>
							<!-- <el-col :span="3">
								<div class="input-content ">
									<el-input  class='grid-inputs' v-model="item.LotNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input> -->
							<!-- <el-input style='width:50%' class='grid-inputs' v-model="item.stoneSize" :disabled="type=='detail'?true:false"
									 placeholder="请输入内容"></el-input>
									<el-input style='width:50%' class='grid-inputs' v-model="item.stoneSizeUnit" :disabled="type=='detail'?true:false"
									 placeholder="请输入内容"></el-input> -->
							<!-- 	</div>
							</el-col> -->
							<el-col :span="6">
								<div class="input-content ">
									<el-input class='grid-inputs' v-model="item.invoiceDescription" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
								</div>
							</el-col>
							<!-- 交廠石重 -->
							<!-- <el-col :span="3">
								<div class="input-content ">
									<el-input  class='grid-inputs' v-model="item.carats" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
								</div>
							</el-col> -->
							<!-- <el-col :span="3">
								<div class="input-content ">
									<el-input  class='grid-inputs' v-model="item.rate" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
								</div>
							</el-col> -->
							<!-- <el-col :span="3">
								<div class="input-content ">
									<el-input class='grid-inputs' v-model="item.amount" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
								</div>
							</el-col> -->
							<el-col :span="3">
								<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
									<div v-if="type!='detail'" style="cursor: pointer;margin-top:10px;text-align: center;border-radius:5px; pointer;height: 20px;width:35px;line-height:20px;background:rgb(5,120,209);color: white;font-size: 12px;"
									 class='grid-inputs' @click="del(index)">刪除</div>
									<!-- <span style="cursor: pointer;" class='grid-inputs' @click="del(index)">刪除</span> -->
									<!-- <span class='grid-inputs' v-model="item.allweight" :disabled="type=='detail'?true:false"
								 placeholder="请输入内容"></span> -->
								</div>
							</el-col>
						</el-row>
				
						<el-row v-if="type!='detail'">
							<el-col :span="9">
								<div class="input-content " style="text-align: center;">
									<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;" src="../../../image/add.png" />
								</div>
							</el-col>
						</el-row>
				
					</div>
				
<!-- 					<div style="padding: 20px 0;border-radius: 10px;padding: 20px;height: 250px;float: left;margin-top: 50px;width: 100%;"
					 class="form_bg">
						<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">
				
							<el-form-item label="Check Date" class=' fl' style='width: 30%;'>
								<el-date-picker v-model="formLabelAlign.receiptBillingDate" type="date" style='width: 300px;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="Check HK$" class=' fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.receiptBillingPrice" class='inputs' :disabled="type=='detail'?true:false"></el-input>
								
							</el-form-item>
							<el-form-item label="Bank" class=' fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.receiptBankName" class='inputs' :disabled="type=='detail'?true:false"></el-input>
								
							</el-form-item>
							<el-form-item label="Check No" class='mat20 fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.receiptNo" class='inputs' :disabled="type=='detail'?true:false"></el-input>
								
							</el-form-item>
							<el-form-item label="Check Company" class='mat20 fl' style='width: 30%;'>
								<el-input v-model="formLabelAlign.receiptPayer" class='inputs' :disabled="type=='detail'?true:false"></el-input>
								
							</el-form-item>
				
						</el-form>
					</div> -->
				
					<!-- <div class="testC" style="width: 100%;margin: 60px 0;float: left;">
				
						<el-button :loading="loading" style='background: rgb(253,99,99);' class='button' type="primary" @click="submitForm('formLabelAlign')"
						 v-if="type!='detail'">Submit</el-button>
						<el-button style='background: rgb(253,99,99);' class='button' type="primary" @click="cancel()">Return</el-button>
				
					</div> -->
				
				</div>


				<div style="width: 78%;float: left;margin: 30px;">
					<el-form-item class='mat20' style='text-align: right;'>
						<el-button :loading="loading" class='button' style='background: rgb(253,99,99);' type="primary" @click="submitForm('formLabelAlign')"
						 v-if="type!='detail'">Submit</el-button>
						<el-button class='button' style='background: rgb(253,99,99);' type="primary" @click="cancel()">Return</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>

</template>

<script>
	
	import {
			MessageBox,
			Message
		} from 'element-ui';
	
	export default {
		name: "specialCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect /' + value + '/', null, r => {
						// //console.log(r)
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
				root: 'http://192.168.101.5:8080/RESTful/kernal/asset/',
				loading:false,
				"grsImage":'',
				"giaImage":'',
				"invoiceImage":'',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				giaClarity_Grade: '',
				imageUrl: '',
				imageUrl02: '',
				imageUrl03:'',
				thingType: '沒有',
				ifGRS: 0,
				dialogVisible: false,
				dialogImageUrl: '',
				Entrepot_input: '',
				Entrepot: [],
				AllType: [],
				AllType_input: '',
				origin_input: '',
				name_input: '',
				id: '',
				warehouse: [

					{
						id: 0,
						name: '沒有'
					},
					{
						id: 1,
						name: 'GIA'
					},
					{
						id: 2,
						name: 'GRS'
					},
					
				],
				
				
				
				formLabelAlign: {
					storageQuqntity: 0,
					availableStock: 0,
					totalNumbe: 0,
					cost: 0,
					"certificateNo": "",
					"certificatedate": "",
					"color": "",
					"comments": "",
					"cut": "",
					"endDate": "",
					// numbe: '',
					"entrepotDto": {
						"entrepot": "",
						"id": 0,
						"reference": ""
					},
					"giaClarityCharacteristics": "",
					"giaClarity": "",
					"giaFluorescence": "",
					"giaInscription": "",
					"giaMeasurements": "",
					// "giaNo": "",
					"giaPolish": "",
					"giaStyle": "",
					"giaSymmetry": "",
					"grsDimensions": "",
					"grsIdentification": "",
					// "grsNo": "",
					"grsObject": "",
					"grsOrigin": "",
					"grsShape": "",
					"id": 0,
					"identification": {
						"id": 0,
						"jewelryType": "",
						"reference": ""
					},
					"inventoryType": {
						"id": 0,
						"inventoryType": "",
						"reference": ""
					},
					"invoiceDate": "",
					"invoiceNo": "",
					"reference": "",
					"startDate": "",
					"supplier": {
						"id": 0,
						"reference": "",
						"supplier": ""
					},
					"weight": 0,
					"weightUnit": "",
					"availableInventoryWeight": '',
					"dimension": '',
					"dimensionUnit": '',
					
					invoiceSeller: "",
					invoiceRapPrice: "",
					invoiceDiscount: "",
					invoiceTotalCarats: "",
					"invoiceTotalPrice": {
						"id": 0,
						"inventoryPriceHk": "",
						"inventoryPriceUs": "",
						"reference": ""
					},
					plvkInvoiceMemoNoAndDescriptionDtoList: [],
					receiptBillingDate: "",
					receiptBillingPrice: "",
					receiptBankName: "",
					receiptNo: ""
					
					
				},

				rules: {
					userName: [{
						validator: validatorUser,
						trigger: 'blur'
					}]

				},
			}
		},

		created: function() {
			
			// //console.log('-------------'+this.$api.root)
			this.root=this.$api.root
			
			// 分行數據加載
			this.findAllEntrepot()
			// 分行數據加載
			this.findAllType()

			this.type = this.$route.query.type
			this.id = this.$route.query.id
			if (this.type == 'detail') {
				this.$api.get('/inventory/findOneInventory?id=' + this.id, null, r => {
					
					
					// this.$router.push("/SystemManagement/UserManagement")
					
					// console.log(r)
					
					this.formLabelAlign = r.plvkInventoryDto
					this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList=r.list
					// this.formLabelAlign.employ = r.employ == 0 ? true : false
					this.formLabelAlign.employ = r.employ 
					
					
					if(!r.plvkInventoryDto.supplier){
						this.origin_input = ''
					}else{
						this.origin_input = r.plvkInventoryDto.supplier.supplier
					}
					
					this.AllType_input = r.plvkInventoryDto.inventoryType
					this.name_input = r.plvkInventoryDto.identifier.jewelryType
					this.ifGRS = r.plvkInventoryDto.inventoryType == 'NONE' ? 0 : (r.plvkInventoryDto.inventoryType == 'GIA' ? 1 : 2)
					this.Entrepot_input = r.plvkInventoryDto.entrepot.name
					
					if(r.plvkInventoryDto.invoiceImage){
						this.imageUrl= this.root+'/kernal/asset/' +r.plvkInventoryDto.invoiceImage
					}
					
					if(r.plvkInventoryDto.giaImage){
						this.imageUrl02= this.root+'/kernal/asset/' +r.plvkInventoryDto.giaImage
					}
					
					if(r.plvkInventoryDto.grsImage){
						this.imageUrl03= this.root+'/kernal/asset/' +r.plvkInventoryDto.grsImage
					}
					
					
					
					// //console.log(this.imageUrl02)
					// //console.log(this.imageUrl03)
					
					// //console.log(r)
				});
			}

			// 			else if (this.type == 'Alert') {
			// 				this.$api.get('/seeku/' + this.$route.query.uuid, null, r => {
			// 					this.formLabelAlign = r
			// 					this.password = r.password
			// 					for (var i = 0; i < this.options.length; i++) {
			// 						if (r.jurisdiction == this.options[i].label) {
			// 							this.formLabelAlign.jurisdiction = i
			// 						}
			// 					}
			// 					for (var i = 0; i < this.option.length; i++) {
			// 						if (r.group_ == this.option[i].label) {
			// 							this.formLabelAlign.group_ = i
			// 						}
			// 					}
			// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
			// 				});
			// 				this.uuid = this.$route.query.uuid
			// 			}


		},

		methods: {

			// 分行數據初始化
			findAllEntrepot() {
				this.$api.get('/inventory/findAllEntrepot', null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.Entrepot = r.content
				});
			},

			//證書類型初始化
			findAllType() {
				this.$api.get('/inventory/findAllType', null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.AllType = r.content
				});
			},
			
			changeSource(){
				
				var that=this
				setTimeout(function(){
					
					that.$api.get('/inventory/findAllSupplier?supplier=' + that.origin_input, null, r => {
						// this.$router.push("/SystemManagement/UserManagement")
						console.log('執行----'+r.content.length)
						if(r.content.length==1&&r.content[0].supplier==that.origin_input){
							
								that.formLabelAlign.supplier={
									"id": r.content[0].id,
									"supplier": r.content[0].supplier,
									"reference": r.content[0].reference
								}
							
							
						}else{
							that.formLabelAlign.supplier={
								"id": 0,
								"supplier": that.origin_input,
								"reference": 0
							}
						}
					});
					
				},500)
				
				
				
			},


			handleRemove(type) {
				// //console.log(file, fileList);
				
				
				if(type=='invoice'){
					this.imageUrl=''
				}else if(type=="gia"){
					this.imageUrl02=''
				}else if(type=="grs"){
					this.imageUrl03=''
				}
				
				
			},
			handlePictureCardPreview(type) {
				// this.dialogImageUrl = file.url;
				
				if(type=='invoice'){
					
					this.dialogImageUrl = this.imageUrl;
					
				}else if(type=="gia"){
					
					this.dialogImageUrl = this.imageUrl02;
				}else if(type=="grs"){
					
					this.dialogImageUrl = this.imageUrl03;
				}
				this.dialogVisible = true;
			},


			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl = this.root+'/kernal/asset/' + r.reference
					this.invoiceImage=r.reference
					
					//console.log(r)
				});
			},
			
			uploadSectionFile02(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
			
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl02 = this.root+'/kernal/asset/' + r.reference
					
					this.giaImage=r.reference
					
					//console.log(r)
				});
			},
			
			uploadSectionFile03(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
			
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl03 = this.root+'/kernal/asset/' + r.reference
					
					this.grsImage=r.reference
					//console.log(r)
				});
			},


			arrayBufferToBase64(buffer) {
				var binary = '';
				var bytes = new Uint8Array(buffer);
				var len = bytes.byteLength;
				for (var i = 0; i < len; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				return window.btoa(binary);
			},


			add() {
				this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList.push({
					"id": 0,
					"invoiceMemoNo": "",
					"invoiceDescription": "",
					"reference": ""
				})
			},
			
			del(index) {
				// //console.log('刪除')
				this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList.splice(index, 1)
			},

			

			handleAdd(response, file, fileList) {
				// //console.log(fileList);
			},

			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},

			handleAvatarSuccess02(res, file) {
				this.imageUrl02 = URL.createObjectURL(file.raw);
			},

			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
				// const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('JPG or PNG !');
				}
				// 							if (!isLt2M) {
				// 								this.$message.error('上传头像图片大小不能超过 2MB!');
				// 							}
				// return isJPG && isLt2M;
				return isJPG;
			},



			querySearch_name(queryString, cb) {

				this.$api.get('/inventory/findAllIdentifier?identifier=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].jewelryType,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});

				//動態查詢名稱接口
				// 				var results = [{
				// 						"value": "磚石",
				// 						"id": "1"
				// 					},
				// 				]

				// 调用 callback 返回建议列表的数据

			},

			handleSelect_name(item) {
				// //console.log(item);
				this.formLabelAlign.identification = item
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

			handleSelect_origin(item) {
				this.formLabelAlign.supplier = item
			},
			
			up(){
				
				
				// console.log(this.formLabelAlign.identification)
				// console.log(this.formLabelAlign.supplier)
				

						
						
				if(this.formLabelAlign.inventoryType.inventoryType==''){
					
					MessageBox('Enter Certificate', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading=false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading=false
					});
					
				}else if(this.name_input==''){
					
					MessageBox('Enter Commodity', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading=false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading=false
					});
					
				}else if(this.formLabelAlign.storageQuqntity==''){
					
					MessageBox('Enter Purchase', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading=false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading=false
					});
					
				}else if(this.origin_input==''){
					
					MessageBox('Enter Source', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading=false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading=false
					});
					
				}else if(this.formLabelAlign.invoiceNo==''){
					
					MessageBox('Enter invoice No', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading=false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading=false
					});
					
				}else if(this.formLabelAlign.cost==0){
					
					MessageBox('Enter Cost', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading=false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading=false
					});
					
				}
				
				else{
					
					this.$api.put('/inventory/save', {
						storageQuqntity: parseInt(this.formLabelAlign.storageQuqntity),
						availableStock: 0,
						totalNumbe: 0,
						"certificateNo": this.formLabelAlign.certificateNo,
						"certificatedate": this.formLabelAlign.certificatedate,
						"color": this.formLabelAlign.color,
						"comments": this.formLabelAlign.comments,
						"cut": this.formLabelAlign.cut,
						"endDate": "",
						// "numbe": parseInt(this.formLabelAlign.numbe),
						"entrepot": this.formLabelAlign.entrepotDto,
						"giaFluorescence": this.formLabelAlign.giaFluorescence,
						"giaInscription": this.formLabelAlign.giaInscription,
						"giaMeasurements": this.formLabelAlign.giaMeasurements,
						// "giaNo": this.formLabelAlign.giaNo,
						"giaPolish": this.formLabelAlign.giaPolish,
						"giaStyle": this.formLabelAlign.giaStyle,
						"giaSymmetry": this.formLabelAlign.giaSymmetry,
						"grsDimensions": this.formLabelAlign.grsDimensions,
						"grsIdentification": this.formLabelAlign.grsIdentification,
						// "grsNo": this.formLabelAlign.grsNo,
						"grsObject": this.formLabelAlign.grsObject,
						"grsOrigin": this.formLabelAlign.grsOrigin,
						"grsShape": this.formLabelAlign.grsShape,
						"giaClarityCharacteristics": this.formLabelAlign.giaClarityCharacteristics,
						"giaClarity_Grade": this.formLabelAlign.giaClarity_Grade,
						"id": 0,
						"cost": this.formLabelAlign.cost,
						"inventoryType": this.formLabelAlign.inventoryType.inventoryType,
						"identifier": this.formLabelAlign.identification,
						"invoiceDate":   this.formLabelAlign.invoiceDate!=''?this.formLabelAlign.invoiceDate.format("yyyy-MM-dd"):'',
						"invoiceNo": this.formLabelAlign.invoiceNo,
						"reference": '',
						"startDate": new Date().format("yyyy-MM-dd"),
						"supplier": this.formLabelAlign.supplier,
						// var t=parsefloat()
						"weight": parseFloat(this.formLabelAlign.availableInventoryWeight),
						"availableInventoryWeight": parseFloat(this.formLabelAlign.availableInventoryWeight),
						"storageWeight": parseFloat(this.formLabelAlign.availableInventoryWeight),
						"weightUnit": this.formLabelAlign.weightUnit,
						"dimension": this.formLabelAlign.dimension,
						"dimensionUnit": this.formLabelAlign.dimensionUnit,
						// "invoiceDate": "",
						"invoiceDiscount": this.formLabelAlign.invoiceDiscount,
						// "invoiceNo": "",
						"invoiceRapPrice": this.formLabelAlign.invoiceRapPrice,
						// "invoiceSeller": this.formLabelAlign.invoiceSeller,
						"invoiceSeller": this.formLabelAlign.supplier.supplier,
						
						"invoiceTotalCarats": this.formLabelAlign.invoiceTotalCarats,
						"invoiceTotalPrice":this.formLabelAlign.invoiceTotalPrice,
						// "invoiceTotalPrice": {
						// 	"id": 0,
						// 	"inventoryPriceHk": "",
						// 	"inventoryPriceUs": "",
						// 	"reference": ""
						// },
						"plvkInvoiceMemoNoAndDescriptionDtoList": this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList,
						"receiptBankName": this.formLabelAlign.receiptBankName,
						"receiptBillingDate": this.formLabelAlign.receiptBillingDate.format("yyyy-MM-dd"),
						"receiptBillingPrice": this.formLabelAlign.receiptBillingPrice,
						"receiptNo": this.formLabelAlign.receiptNo,
						"receiptPayer": this.formLabelAlign.receiptPayer,
						"reference": "",
						"grsImage":this.grsImage,
						"giaImage":this.giaImage,
						"invoiceImage":this.invoiceImage
					
					}, r => {
						console.log('----------')
						console.log(r)
						if (r) {
							this.$router.push("/purchase")
						}
						// this.$router.push("/SystemManagement/UserManagement")
					},e=>{
						// console.log('我報了錯')
						this.loading=false
						
					});
					
				}
				
			},


			submitForm(formLabelAlign) {

				// this.$router.push("/SystemManagement/special")
				
				this.loading=true	
					
				if (this.formLabelAlign.supplier.reference == '') {
					this.formLabelAlign.supplier.supplier = this.origin_input
				}

				// if (this.formLabelAlign.identification.reference == '') {
				// 	this.formLabelAlign.identification.jewelryType = this.name_input
				// }
				
				
				this.$api.get('/inventory/findAllIdentifier?identifier=' + this.name_input, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					console.log(r)
					
					if(r.content.length==1){
						
						if(r.content[0].jewelryType==this.name_input){
							this.formLabelAlign.identification={
								"id": r.content[0].id,
								"jewelryType": r.content[0].jewelryType,
								"reference": r.content[0].reference
							}
						}else{
								this.formLabelAlign.identification={
									"id": 0,
									"jewelryType": this.name_input,
									"reference": ""
								}
							}
						this.up()
					}else{
						this.formLabelAlign.identification={
							"id": 0,
							"jewelryType": this.name_input,
							"reference": ""
						}
						this.up()
						
					}
					
				});

			},

			detail() {},

			cancel() {
				this.$router.push("/purchase")
			},

			type_change() {

				this.formLabelAlign.inventoryType = this.AllType[this.AllType_input]
				this.ifGRS = this.AllType[this.AllType_input].inventoryType == 'NONE' ? 0 : (this.AllType[this.AllType_input].inventoryType ==
					'GIA' ? 1 : 2)

			},

			branch_change() {
				this.formLabelAlign.entrepotDto = this.Entrepot[this.Entrepot_input]
			},

			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/SystemManagement/CustomentManagement")
				} else if (type == 'branch') {
					this.$router.push("/SystemManagement/branchManagement")
				}
			}

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';
	
	.branchCreate {
	
		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
			text-align: center
		}
	
		.el-form-item {
			margin-bottom: 0
		}
	
		.el-form--label-top .el-form-item__label {
			padding: 0
		}
	
		.second_menu {
			width: 100px;
			line-height: 76px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			cursor: pointer
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
	
	
	.specialCreate {

		.invoice_upload {
			width: 100%;

			.avatar-uploader-icon {
				// width:100%;
				// float: left
			}
		}

		.el-form--label-top .el-form-item__label {
			padding: 0
		}

		.el-form-item {
			margin-bottom: 0
		}


		.GIA {
			.avatar-uploader-icon {
				height: 80px;
				line-height: 80px
			}
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

		.second_menu {
			width: 100px;
			line-height: 40px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			cursor: pointer
		}

		.selector {
			color: $navHoverTextColor;
		}

		.inputs {
			width: 300px;
			float: left
		}

		.inputs01 {
			width: 100%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
		}

		

		.point {
			cursor: pointer;
		}
	}
</style>

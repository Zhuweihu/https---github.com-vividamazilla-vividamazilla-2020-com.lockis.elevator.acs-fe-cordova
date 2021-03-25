<template>
	<div class="specialCreate" v-loading='all_loading'>
		<el-form label-position="top" ref='formLabelAlign' label-width="100px" :model="formLabelAlign">

			<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				<span class="fl" style="padding: 0 5px;">Diamond</span>
				<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div>
				<el-row style='line-height: 35px;'>

					<el-col :span="8">
						<span class="fl">Commodity：</span>
						<p style="overflow: hidden;">
							<el-autocomplete style='100%' v-model="name_input" :fetch-suggestions="querySearch_name" :disabled="type=='detail'?true:false"
							 placeholder="Input" @select="handleSelect_name"></el-autocomplete>
						</p>
					</el-col>


					<el-col :span="8">
						<span class="fl">Dimension：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign01.dimension" :disabled="type=='detail'?true:false" class="tem_input" style="width: 50%;"
							 placeholder="number"></input>
							<input v-model="formLabelAlign01.dimensionUnit" :disabled="type=='detail'?true:false" class="tem_input" style="width: 48%;margin-left: 2%;"
							 placeholder="Unit"></input>
						</p>
					</el-col>

					<el-col :span="8">
						<span class="fl">Quantity：</span>
						<p style="overflow: hidden;">        
							<input v-model="formLabelAlign01.storageQuantity" :disabled="type=='detail'?true:false" class="tem_input"></input>
						</p>
					</el-col>

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div>
				<el-row style='line-height: 35px;'>

					<el-col :span="8">
						<span class="fl">Weight：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign01.totalWeight" :disabled="type=='detail'?true:false" class="tem_input"
							 style="width: 50%;" placeholder="number"></input>
							<input v-model="formLabelAlign01.weightUnit" :disabled="type=='detail'?true:false" class="tem_input" style="width: 48%;margin-left: 2%;"
							 placeholder="Unit"></input>
						</p>
					</el-col>

					<el-col :span="8">
						<span class="fl">Cost：</span>
						<p style="overflow: hidden;">
							<input v-model="formLabelAlign01.cost" :disabled="type=='detail'?true:false" class="tem_input"></input>
						</p>
					</el-col>

					<el-col :span="8">
						<span class="fl">Branch：</span>
						<p style="overflow: hidden;">
							<el-select style='height: 48px;width: 100%;float: left;' v-model="formLabelAlign01.branch.reference" 
							 :disabled="type=='detail'?true:false">
								<el-option v-for='(item, index) in Entrepot' :label="item.name" :value="item.reference"></el-option>
							</el-select>
						</p>
					</el-col>

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div>
				<el-row style='line-height: 35px;'>

					<el-col :span="8">
						<span class="fl">Certificate：</span>
						<p style="overflow: hidden;">
							<el-select style='height: 48px;width: 100%;float: left;' v-model="formLabelAlign01.certificateType" @change='type_change' :disabled="type=='detail'?true:false">
								<el-option v-for='(item, index) in warehouse' :label="item.name" :value="item.name"></el-option>
							</el-select>
						</p>
					</el-col>

				</el-row>
			</div>
			<!-- ||||||||||||||||||||| -->
			<!-- GIA -->
			<div v-show='ifGRS!=2'>
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">GIA</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>

						<el-col :span="8">
							<span class="fl">No：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.certificateNo" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<!-- <el-col :span="8">
							<span class="fl">Date：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign01.certificatedate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col> -->

						<el-col :span="8">
							<span class="fl">Style：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaStyle" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Measurements：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaMeasurements" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						

						<el-col :span="8">
							<span class="fl">Color：</span>

							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.color" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Clarity：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaClarity" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Characteristics：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaCharacteristics" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						
						<el-col :span="8">
							<span class="fl">ClarityCharacteristics：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaClarityCharacteristics" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">ClarityGrade：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaClarityGrade" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Cut：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.cut" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						
						
						
						<el-col :span="8">
							<span class="fl">Polish：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaPolish" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Symmetry：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaSymmetry" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Fluorescence：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaFluorescence" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						
						
						
						<el-col :span="8">
							<span class="fl">Inscription：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.giaInscription" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Comment：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.comments" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>

					<el-form-item>
						<div class="fl">Certificate Upload：</div>
						<el-upload :disabled="type=='detail'?true:false" style='float: left;height: 100px;' class="avatar-uploader"
						 :show-file-list="false" action="auto" :http-request="uploadSectionFile02">
							<!-- <img v-if="imageUrl02" :src="imageUrl02" class="avatar" style="width: 180px;height: 80px;"> -->
							<img v-if="imageUrl02" :src="imageUrl02" class="avatar" style="background-size:contain;height:180px;background-repeat: no-repeat">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span v-if="imageUrl02" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("gia")'>預覽</span>
						<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
						 @click='handleRemove("gia")'>刪除</span>
					</el-form-item>

				</div>
				<!-- ||||||||||||||||||||| -->
			</div>

			<div v-show='ifGRS==2'>
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 20px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">GRS</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>
						<el-col :span="8">
							<span class="fl">No：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.certificateNo" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<!-- <el-col :span="8">
							<span class="fl">Date：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign.certificatedate" type="date" style='width: 100%;' class='inputs01'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col> -->

						<el-col :span="8">
							<span class="fl">Object：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.grsObject" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Identification：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.grsIdentification" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>

						

						<el-col :span="8">
							<span class="fl">Comment：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.comments" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Origin：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.grsOrigin" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Cut：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.cut" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>

						

						<el-col :span="8">
							<span class="fl">Shape：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.grsShape" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Color：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.color" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>

					<el-form-item>
						<div class="fl">Certificate Upload：</div>
						<el-upload :disabled="type=='detail'?true:false" style='float: left;height: 100px;' class="avatar-uploader"
						 :show-file-list="false" action="auto" :http-request="uploadSectionFile02">
							<!-- <img v-if="imageUrl02" :src="imageUrl02" class="avatar" style="width: 180px;height: 80px;"> -->
							<img v-if="imageUrl02" :src="imageUrl02" class="avatar" style="background-size:contain;height:180px;background-repeat: no-repeat">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<span v-if="imageUrl02" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("gia")'>預覽</span>
						<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
						 @click='handleRemove("gia")'>刪除</span>
					</el-form-item>

				</div>
				<!-- ||||||||||||||||||||| -->
			</div>


			<!-- ||||||||||||||||||||| -->
			<div>
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;margin-top: 110px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">Invoice</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<div>
					<el-row style='line-height: 35px;'>

						<el-col :span="8">
							<span class="fl">Item：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.invoice.item" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Amount：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.invoice.amount" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Currency：</span>
							<p style="overflow: hidden;">
								<el-select v-model="formLabelAlign01.invoice.currency" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
									<el-option v-for="item in unit" :label="item.label" :value="item.label">
									</el-option>
								</el-select>
							</p>
						</el-col>
						
					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->

				<div>
					<el-row style='line-height: 35px;'>
						
						<el-col :span="8">
							<span class="fl">Invoice Date：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign01.invoice.invoiceDate" type="date" placeholder="select" style='width: 100%;' 
								 :disabled="type=='detail'?true:false">
								</el-date-picker>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">invoice No：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.invoice.invoiceNo" :disabled="type=='detail'?true:false" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Rap Price(US)：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.invoiceRapPrice" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						</el-row>
				</div>		
				<div>
					<el-row>
						<el-col :span="8">
							<span class="fl">Discount(%)：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.invoiceDiscount" :disabled="type=='detail'?true:false" class="tem_input"></input>
								
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Total Carats：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.invoiceTotalCarats" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Supplier：</span>
							<p style="overflow: hidden;">
								
								<el-autocomplete style='width: 100%;' v-model="origin_input" :fetch-suggestions="querySearch_origin" placeholder="Input"
								 @select="handleSelect_origin" @blur='changeSource' :disabled="type=='detail'?true:false"></el-autocomplete>
								 
							</p>
						</el-col>
						</el-row>
				</div>
				<div>		
				<el-row>
						<el-col :span="8">
							<span class="fl">Address：</span>
							<p style="overflow: hidden;">
								<input v-model="supplier.addr" :disabled="type=='detail'?true:false||origin_input==''?false:true" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Contact：</span>
							<p style="overflow: hidden;">
								<input v-model="supplier.contact" :disabled="type=='detail'?true:false||origin_input==''?false:true" class="tem_input">
							</p>
						</el-col>
						
						<el-col :span="8">
							<span class="fl">Name：</span>
							<p style="overflow: hidden;">
								<input v-model="supplier.name" :disabled="type=='detail'?true:false||origin_input==''?false:true" class="tem_input">
							</p>
						</el-col>
						
						

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<!-- <div>
					<el-row style='line-height: 35px;'>

						<el-col :span="8">
							<span class="fl">Total HK$：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceHk" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Total US$：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign.invoiceTotalPrice.inventoryPriceUs" :disabled="type=='detail'?true:false" class="tem_input"></input>
								
							</p>
						</el-col>

					</el-row>
				</div> -->
				<!-- ||||||||||||||||||||| -->
				<div class="mat20">
					<!-- <el-row>
						<el-col :span="3">
							<div class="grid-content ">Memo No</div>
						</el-col>

						<el-col :span="8" style='min-width: 236px;'>
							<div class="grid-content">Description Of Cut & Polished Diamonds</div>
						</el-col>
					</el-row> -->

					<!-- <el-row v-for='(item,index) in formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList'>
						<el-col :span="3">
							<div class="input-content ">
								<el-input class='grid-inputs' v-model="item.invoiceMemoNo" :disabled="type=='detail'?true:false" placeholder="请输入内容"></el-input>
							</div>
						</el-col>

						<el-col :span="8" style='min-width: 236px;'>
							<div class="input-content ">
								<el-input class='grid-inputs' v-model="item.invoiceDescription" :disabled="type=='detail'?true:false"
								 placeholder="请输入内容"></el-input>
							</div>
						</el-col>

						<el-col :span="3">
							<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
								<div v-if="type!='detail'" style="cursor: pointer;margin-top:10px;text-align: center;border-radius:5px; pointer;height: 20px;width:35px;line-height:20px;background:rgb(5,120,209);color: white;font-size: 12px;"
								 class='grid-inputs' @click="del(index)">刪除</div>
							</div>
						</el-col>
					</el-row> -->
					<!-- <el-row v-if="type!='detail'">
						<el-col :span="9">
							<div class="input-content " style="text-align: center;">
								<img @click="add" style="width: 30px;height: 30px;margin-top: 10px;cursor: pointer;" src="../../../image/add.png" />
							</div>
						</el-col>
					</el-row> -->
				</div>
			</div>

			<!-- ||||||||||||||||||||| -->
			<div class="invoice_upload" style="margin-top: 20px;">

				<el-form-item>
					<div style="float: left;">Invoice upload：</div>
					<el-upload style='float: left;' class="avatar-uploader" :before-upload="beforeAvatarUpload" action="auto"
					 :http-request="uploadSectionFile" :show-file-list="false" :disabled="type=='detail'?true:false">
						<!-- :on-success="handleAvatarSuccess" -->
						<img v-if="imageUrl" :src="imageUrl" class="avatar" style="background-size:contain;height:180px;background-repeat: no-repeat">
						<!-- <i class="el-icon-plus"></i> -->
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div style="width: 80px;white-space: nowrap;float: left;">
						<span v-if="imageUrl" style="float: left;padding-top: 150px;padding-left: 10px;color: #409EFF;cursor: pointer;"
						 @click='handlePictureCardPreview("invoice")'>預覽</span>
						<span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-top: 150px; padding-left: 10px;color: #409EFF;cursor: pointer;"
						 @click='handleRemove("invoice")'>刪除</span>
					</div>
					<!-- <span>預覽</span>	 -->
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
			</div>
			<!-- ||||||||||||||||||||| -->
			<div>
				<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
					<span class="fl" style="padding: 0 5px;">Cheque</span>
					<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>

						<el-col :span="8">
							<span class="fl">Cheque Date：</span>
							<p style="overflow: hidden;">
								<el-date-picker v-model="formLabelAlign01.chequeDate" type="date" style='width: 100%;' class='inputs'
								 :disabled="type=='detail'?true:false" placeholder="select date">
								</el-date-picker>
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Cheque HKD：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.chequeAmount" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Cheque Bank Name：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.chequeBankName" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->
				<div>
					<el-row style='line-height: 35px;'>

						<el-col :span="8">
							<span class="fl">Cheque No：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.chequeNo" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

						<el-col :span="8">
							<span class="fl">Cheque Payer：</span>
							<p style="overflow: hidden;">
								<input v-model="formLabelAlign01.chequePayer" :disabled="type=='detail'?true:false" class="tem_input"></input>
							</p>
						</el-col>

					</el-row>
				</div>
				<!-- ||||||||||||||||||||| -->

			</div>
			<!-- -->

			<div style="width: 100%;float: left;margin: 30px;">
				<el-form-item class='mat20' style='text-align: center;'>
					<el-button :loading="loading" class='button' style='background: rgb(253,99,99);' type="primary" @click="submitForm('formLabelAlign')"
					 v-if="type!='detail'">Submit</el-button>
					<el-button class='button' style='background: rgb(253,99,99);' type="primary" @click="cancel()">Return</el-button>
				</el-form-item>
			</div>


		</el-form>
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
				loading: false,
				all_loading:false,
				origin_input:'',
				"grsImage": '',
				"giaImage": '',
				"invoiceImage": '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				"supplier": {
					"addr": "",
					"contact": "",
					"enable": 1,
					"name": ""
				  },
				giaClarity_Grade: '',
				imageUrl: '',
				imageUrl02: '',
				imageUrl03: '',
				thingType: '沒有',
				ifGRS: 0,
				dialogVisible: false,
				dialogImageUrl: '',
				Entrepot_input: '',
				Entrepot: [],
				AllType: [],
				unit: [{
						id: '1',
						label: 'CNY'
					},
					{
						id: '2',
						label: 'HKD'
					},
					{
						id: '3',
						label: 'USD'
					},
				],
				AllType_input: '',
				origin_input: '',
				name_input: '',
				id: '',
				warehouse: [

					{
						id: 0,
						name: 'NONE'
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

				formLabelAlign01: {
					"jewelryType": {
						"type": "",//
						"reference": ""//
					},
					"availableInventoryWeight": 0,//
					"availableStock": 0,//
					"branch": {
						"reference": "" //
					},
					"certificateNo": "",//
					"certificateType": "",
					"chequeAmount": 0,
					"chequeBankName": "",
					"chequeDate": "",
					"chequeNo": "",
					"chequePayer": "",
					"color": "",
					"comments": "",
					"cost": 0,
					"cut": "",
					"dimension": "",
					"dimensionUnit": "",
					"giaCharacteristics": "",
					"giaClarity": "",
					"giaClarityCharacteristics": "",
					"giaClarityGrade": "",
					"giaFluorescence": "",
					"giaImage": {
					  "reference": ""
					 },
					"giaInscription": "",
					"giaMeasurements": "",
					"giaPolish": "",
					"giaStyle": "",
					"giaSymmetry": "",
					"grsDimensions": "",
					"grsIdentification": "",
					"grsImage": {
						  "reference": ""
						 },
					"grsObject": "",
					"grsOrigin": "",
					"grsShape": "",
					"id": 0,
					"invoice": {
						"invoiceDate": "",
						"invoiceNo": "",
						"invoiceType": "INVENTORY",
						"item": "",
						"amount": 0,
						"currency": "HKD",
						"image": {
						   "reference": ""
						  },
						"locked": 0,
						"supplier": {
							"addr": "",
							"contact": "",
							"enable": 1,
							"name": ""
						}
					},
					"invoiceDiscount": 0,
					"invoiceRapPrice": 0,
					"invoiceTotalCarats": 0,
					"storageQuantity": 10,
					"storageWeight": 0,
					"totalDeliveredQuantity": 0,
					"totalDeliveredWeight": 0,
					"totalQuantity": 0,
					"totalWeight": 0,
					"weightUnit": "Ct"//
				},


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
			this.root = this.$api.root

			// 分行數據加載  
			this.findAllEntrepot()
			// 分行數據加載  
			this.findAllType()

			this.type = this.$route.query.type
			this.id = this.$route.query.id
// 			if (this.type == 'detail') {
// 				this.$api.get('/inventory/findOneInventory?id=' + this.id, null, r => {
// 
// 					this.formLabelAlign = r.plvkInventoryDto
// 					this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList = r.list
// 
// 					this.formLabelAlign.employ = r.employ
// 
// 					if (!r.plvkInventoryDto.supplier) {
// 						this.origin_input = ''
// 					} else {
// 						this.origin_input = r.plvkInventoryDto.supplier.supplier
// 					}
// 
// 					this.AllType_input = r.plvkInventoryDto.inventoryType
// 					this.name_input = r.plvkInventoryDto.identifier.jewelryType
// 					this.ifGRS = r.plvkInventoryDto.inventoryType == 'NONE' ? 0 : (r.plvkInventoryDto.inventoryType == 'GIA' ? 1 :
// 						2)
// 					this.Entrepot_input = r.plvkInventoryDto.entrepot.name
// 
// 					if (r.plvkInventoryDto.invoiceImage) {
// 						this.imageUrl = this.root + '/kernal/asset/' + r.plvkInventoryDto.invoiceImage
// 					}
// 
// 					if (r.plvkInventoryDto.giaImage) {
// 						this.imageUrl02 = this.root + '/kernal/asset/' + r.plvkInventoryDto.giaImage
// 					}
// 
// 					if (r.plvkInventoryDto.grsImage) {
// 						this.imageUrl03 = this.root + '/kernal/asset/' + r.plvkInventoryDto.grsImage
// 					}
// 
// 				});
// 			}
			
			if (this.type == 'detail') {
				
				this.all_loading=true
				
				this.$api.get('/inventory/' + this.id, null, r => {
					
					// console.log('*------------*')
					// console.log(r)
					this.all_loading=false
					this.formLabelAlign01 = r
					
					this.name_input=r.jewelryType.type
					
					this.origin_input=r.invoice.supplier.name
					
					this.supplier=r.invoice.supplier
					
					this.ifGRS = this.formLabelAlign01.certificateType == 'NONE' ? 1 : (this.formLabelAlign01.certificateType =='GIA' ? 1 : 2)
					
							if (r.invoice.image.reference) {
								this.imageUrl = this.root + '/kernal/asset/' + r.invoice.image.reference
							}
					
							if (r.giaImage.reference) {
								this.imageUrl02 = this.root + '/kernal/asset/' + r.giaImage.reference
							}
					
							if (r.grsImage.reference) {
								this.imageUrl03 = this.root + '/kernal/asset/' + r.grsImage.reference
							}
					
					
			// 		this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList = r.list
			// 
			// 		this.formLabelAlign.employ = r.employ
			// 
			// 		if (!r.plvkInventoryDto.supplier) {
			// 			this.origin_input = ''
			// 		} else {
			// 			this.origin_input = r.plvkInventoryDto.supplier.supplier
			// 		}
			// 
			// 		this.AllType_input = r.plvkInventoryDto.inventoryType
			// 		this.name_input = r.plvkInventoryDto.identifier.jewelryType
			// 		this.ifGRS = r.plvkInventoryDto.inventoryType == 'NONE' ? 0 : (r.plvkInventoryDto.inventoryType == 'GIA' ? 1 :
			// 			2)
			// 		this.Entrepot_input = r.plvkInventoryDto.entrepot.name
			// 
			// 		if (r.plvkInventoryDto.invoiceImage) {
			// 			this.imageUrl = this.root + '/kernal/asset/' + r.plvkInventoryDto.invoiceImage
			// 		}
			// 
			// 		if (r.plvkInventoryDto.giaImage) {
			// 			this.imageUrl02 = this.root + '/kernal/asset/' + r.plvkInventoryDto.giaImage
			// 		}
			// 
			// 		if (r.plvkInventoryDto.grsImage) {
			// 			this.imageUrl03 = this.root + '/kernal/asset/' + r.plvkInventoryDto.grsImage
			// 		}
			
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
			// findAllEntrepot() {
			// 	this.$api.get('/inventory/findAllEntrepot', null, r => {
			// 		// this.$router.push("/SystemManagement/UserManagement")
			// 		console.log('-------------')
			// 		console.log(r)
			// 		this.Entrepot = r.content
			// 	});
			// },
			
			findAllEntrepot() {
				this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					// console.log('-------------')
					// console.log(r)
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
			
						
			
			handleSelect_origin(item) {
				
				// console.log(item)
				this.supplier = item
			},
			
				querySearch_origin(queryString, cb) {
				
				if(queryString==''){
					
					this.$api.get('/invoice/suppliers', null, r => {
						// this.$router.push("/SystemManagement/UserManagement")
						var results = []
						for (var i = 0; i < r.length; i++) {
							var temp = {
								"value": r[i].name,
								"reference": r[i].reference,
								"id": r[i].id,
								"addr": r[i].addr,
								"contact": r[i].contact,
								"enable": r[i].enable,
								"name": r[i].name,
							}
							results.push(temp)
						}
						cb(results);
					});
					
				}else{
					
					this.$api.get('/invoice/suppliers/name/' + queryString, null, r => {
						// this.$router.push("/SystemManagement/UserManagement")
						var results = []
						for (var i = 0; i < r.length; i++) {
							var temp = {
								"value": r[i].name,
								"reference": r[i].reference,
								"id": r[i].id,
								"addr": r[i].addr,
								"contact": r[i].contact,
								"enable": r[i].enable,
								"name": r[i].name,
							}
							results.push(temp)
						}
						cb(results);
					});
					
				}
				
				
			},

				changeSource() {
			
				var that = this
				setTimeout(function() {
					
					if(that.origin_input!=''){
						
						that.$api.get('/invoice/suppliers/name/' + that.origin_input, null, r => {
							// this.$router.push("/SystemManagement/UserManagement")
							// console.log('執行----' + r.length)
							if (r.length == 1 && r[0].name == that.origin_input) {
										
								that.formLabelAlign.supplier = r[0]
									
							} else {
								
								that.origin_input=''
								
								// that.formLabelAlign.supplier = {
								// 	"id": 0,
								// 	"supplier": that.origin_input,
								// 	"reference": 0
								// }
							}
						});
						
					}
					
					
				
				}, 100)
				
			},


			handleRemove(type) {
				// //console.log(file, fileList);
				
				
				
				
				 
				
				if (type == 'invoice') {
					this.imageUrl = ''
					this.invoiceImage=''
				} else if (type == "gia") {
					this.imageUrl02 = ''
					this.giaImage=''
				} else if (type == "grs") {
					this.imageUrl03 = ''
					this.grsImage=''
				}

			},


			handlePictureCardPreview(type) {
				// this.dialogImageUrl = file.url;

				if (type == 'invoice') {

					this.dialogImageUrl = this.imageUrl;

				} else if (type == "gia") {
					this.dialogImageUrl = this.imageUrl02;
				} else if (type == "grs") {

					this.dialogImageUrl = this.imageUrl03;
				}
				this.dialogVisible = true;
			},


			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl = this.root + '/kernal/asset/' + r.reference
					this.invoiceImage = r.reference
					//console.log(r)
				});
			},

			uploadSectionFile02(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl02 = this.root + '/kernal/asset/' + r.reference
					this.giaImage = r.reference
					//console.log(r)
				});
			},

			uploadSectionFile03(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl03 = this.root + '/kernal/asset/' + r.reference
					this.grsImage = r.reference
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
				
				
				this.$api.get('/inventory/types?type=' + queryString, null, r => {
					
					// console.log('---------name')
					// console.log(r)
					var results = []
					for (var i = 0; i < r.content.length; i++) {
						var temp = {
							"value": r.content[i].type,
							"reference": r.content[i].reference,
							"id": r.content[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
				
				
				// this.$api.get('/inventory/findAllIdentifier?identifier=' + queryString, null, r => {
				// 	// this.$router.push("/SystemManagement/UserManagement")
				// 	var results = []
				// 	for (var i = 0; i < r.content.length; i++) {
				// 		var temp = {
				// 			"value": r.content[i].jewelryType,
				// 			"reference": r.content[i].reference,
				// 			"id": r.content[i].id,
				// 		}
				// 		results.push(temp)
				// 	}
				// 	cb(results);
				// });

				

			},

			handleSelect_name(item) {
				
				
				
				this.formLabelAlign01.jewelryType = {
					"type": item.value,
					"reference": item.reference
				},
				
				// console.log('-*-*-*-*-*')
				// console.log(this.formLabelAlign01.jewelryType)
				
				
				
				this.formLabelAlign.identification = item
			},

			

			up() {
				
				// console.log('01')
				
				// console.log(this.formLabelAlign.identification)
				// console.log(this.formLabelAlign.supplier)
				
				// console.log(this.formLabelAlign01)
				
				if (this.formLabelAlign01.certificateType == '') {
					
					// console.log('02')
					MessageBox('Enter Certificate', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading = false
					});

				} else if (this.name_input == '') {
					
					// console.log('03')
					MessageBox('Enter Commodity', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading = false
					});

				} else if (this.formLabelAlign01.storageQuantity == '') {
					
					// console.log('04')
					MessageBox('Enter Purchase', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading = false
					});

				} else if (this.supplier.name == '') {
					
					// console.log('05')
					MessageBox('Enter Invoice information', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading = false
					});

				} else if (this.formLabelAlign01.invoice.invoiceNo == '') {
					
					// console.log('06')
					MessageBox('Enter invoice No', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading = false
					});

				} else if (this.formLabelAlign01.cost == 0) {
					
					// console.log('07')
					MessageBox('Enter Cost', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {
						this.loading = false
					});

				} else {
					
					
					// console.log('last')
					
					this.formLabelAlign01.grsImage.reference=this.grsImage,
					this.formLabelAlign01.giaImage.reference=this.giaImage,
					this.formLabelAlign01.invoice.image.reference=this.invoiceImage
					// console.log('01')
					this.formLabelAlign01.invoice.supplier={
						addr: this.supplier.addr,
						contact: this.supplier.contact,
						enable: 1,
						name: this.supplier.name
					}
					// console.log('02')
			
							// this.$router.push("/SystemManagement/UserManagement")
							
							if(this.formLabelAlign01.chequeDate!=''){
								this.formLabelAlign01.chequeDate=this.formLabelAlign01.chequeDate.format("yyyy-MM-dd")
							}
							if(this.formLabelAlign01.invoice.invoiceDate!=''){
								this.formLabelAlign01.invoice.invoiceDate=this.formLabelAlign01.invoice.invoiceDate.format("yyyy-MM-dd")
							}
							
							if(this.origin_input==''){
								
								this.formLabelAlign01.invoice.supplier={
								"addr": this.supplier.addr,
								"contact": this.supplier.contact,
								"enable": 1,
								"name": this.supplier.name,
							  }
							  
							}else{
								
								this.formLabelAlign01.invoice.supplier={
									"reference":this.supplier.reference
								}
								
							}
							
							if(this.origin_input==''){
								
								console.log('/*/')
								this.$api.get('/invoice/suppliers/name/' + this.supplier.name, null, r => {
										// this.$router.push("/SystemManagement/UserManagement")
											if (r.length > 0 ) {
													
											MessageBox('此Supplier已存在', 'Tips', {
												confirmButtonText: 'OK',
												// cancelButtonText: '取消',
												type: 'warning'
											}).then(() => {
												this.loading = false
												// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
											}).catch(() => {
												
											});	
												
										} else{
											
											console.log('89898')
											this.$api.post('/inventory/save', this.formLabelAlign01, r => {
												console.log('----------')
												console.log(r)
												if (r) {
													this.$router.push("/purchase")
												}
												
											}, e => {
														
												this.loading = false
											
											});
											
										}
										
									});
								
							}else{
								
								this.$api.post('/inventory/save', this.formLabelAlign01, r => {
									console.log('----------')
									console.log(r)
									if (r) {
										this.$router.push("/purchase")
									}
									
								}, e => {
											
									this.loading = false
								
								});
								
							}
							
							
							
								

								
								
							
						
					
					
					

// 					this.$api.put('/inventory/save', {
// 						storageQuqntity: parseInt(this.formLabelAlign.storageQuqntity),
// 						availableStock: 0,
// 						totalNumbe: 0,
// 						"certificateNo": this.formLabelAlign.certificateNo,
// 						"certificatedate": this.formLabelAlign.certificatedate,
// 						"color": this.formLabelAlign.color,
// 						"comments": this.formLabelAlign.comments,
// 						"cut": this.formLabelAlign.cut,
// 						"endDate": "",
// 						// "numbe": parseInt(this.formLabelAlign.numbe),
// 						"entrepot": this.formLabelAlign.entrepotDto,
// 						"giaFluorescence": this.formLabelAlign.giaFluorescence,
// 						"giaInscription": this.formLabelAlign.giaInscription,
// 						"giaMeasurements": this.formLabelAlign.giaMeasurements,
// 						// "giaNo": this.formLabelAlign.giaNo,
// 						"giaPolish": this.formLabelAlign.giaPolish,
// 						"giaStyle": this.formLabelAlign.giaStyle,
// 						"giaSymmetry": this.formLabelAlign.giaSymmetry,
// 						"grsDimensions": this.formLabelAlign.grsDimensions,
// 						"grsIdentification": this.formLabelAlign.grsIdentification,
// 						// "grsNo": this.formLabelAlign.grsNo,
// 						
// 						"grsObject": this.formLabelAlign.grsObject,
// 						"grsOrigin": this.formLabelAlign.grsOrigin,
// 						"grsShape": this.formLabelAlign.grsShape,
// 						"giaClarityCharacteristics": this.formLabelAlign.giaClarityCharacteristics,
// 						"giaClarity_Grade": this.formLabelAlign.giaClarity_Grade,
// 						"id": 0,
// 						"cost": this.formLabelAlign.cost,
// 						"inventoryType": this.formLabelAlign.inventoryType.inventoryType,
// 						"identifier": this.formLabelAlign.identification,
// 						"invoiceDate": this.formLabelAlign.invoiceDate != '' ? this.formLabelAlign.invoiceDate.format("yyyy-MM-dd") : '',
// 						"invoiceNo": this.formLabelAlign.invoiceNo,
// 						"reference": '',
// 						"startDate": new Date().format("yyyy-MM-dd"),
// 						"supplier": this.formLabelAlign.supplier,
// 						// var t=parsefloat()
// 						"weight": parseFloat(this.formLabelAlign.availableInventoryWeight),
// 						"availableInventoryWeight": parseFloat(this.formLabelAlign.availableInventoryWeight),
// 						"storageWeight": parseFloat(this.formLabelAlign.availableInventoryWeight),
// 						"weightUnit": this.formLabelAlign.weightUnit,
// 						// "dimension": this.formLabelAlign.dimension,
// 						"dimensionUnit": this.formLabelAlign.dimensionUnit,
// 						// "invoiceDate": "",
// 						"invoiceDiscount": this.formLabelAlign.invoiceDiscount,
// 						// "invoiceNo": "",
// 						"invoiceRapPrice": this.formLabelAlign.invoiceRapPrice,
// 						// "invoiceSeller": this.formLabelAlign.invoiceSeller,
// 						"invoiceSeller": this.formLabelAlign.supplier.supplier,
// 
// 						"invoiceTotalCarats": this.formLabelAlign.invoiceTotalCarats,
// 						"invoiceTotalPrice": this.formLabelAlign.invoiceTotalPrice,
// 						// "invoiceTotalPrice": {
// 						// 	"id": 0,
// 						// 	"inventoryPriceHk": "",
// 						// 	"inventoryPriceUs": "",
// 						// 	"reference": ""
// 						// },
// 						"plvkInvoiceMemoNoAndDescriptionDtoList": this.formLabelAlign.plvkInvoiceMemoNoAndDescriptionDtoList,
// 						"receiptBankName": this.formLabelAlign.receiptBankName,
// 						"receiptBillingDate": this.formLabelAlign.receiptBillingDate.format("yyyy-MM-dd"),
// 						"receiptBillingPrice": this.formLabelAlign.receiptBillingPrice,
// 						"receiptNo": this.formLabelAlign.receiptNo,
// 						"receiptPayer": this.formLabelAlign.receiptPayer,
// 						"reference": "",
// 						"grsImage": this.grsImage,
// 						"giaImage": this.giaImage,
// 						"invoiceImage": this.invoiceImage

// 					}, r => {
// 						console.log('----------')
// 						console.log(r)
// 						if (r) {
// 							this.$router.push("/purchase")
// 						}
// 						
// 					}, e => {
// 			
// 						this.loading = false
// 
// 					});

				}

			},
			
			submitForm01(formLabelAlign){
				
				// console.log(this.formLabelAlign01)
				
				this.$api.post('/inventory/save', this.formLabelAlign01, r => {
					
					// console.log('---------successful')
					
				});
				
			},

			submitForm(formLabelAlign) {

				// this.$router.push("/SystemManagement/special")

				this.loading = true

				if (this.formLabelAlign.supplier.reference == '') {
					this.formLabelAlign.supplier.supplier = this.origin_input
				}

				// if (this.formLabelAlign.identification.reference == '') {
				// 	this.formLabelAlign.identification.jewelryType = this.name_input
				// }


				this.$api.get('/inventory/types?type=' + this.name_input, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					// console.log(r)
					// console.log('------123')
					// console.log(r.content.length)

					if (r.content.length == 1) {

						if (r.content[0].type == this.name_input) {
							// this.formLabelAlign.identification = {
							// 	"id": r.content[0].id,
							// 	"jewelryType": r.content[0].jewelryType,
							// 	"reference": r.content[0].reference
							// }
							
							this.formLabelAlign01.jewelryType = {
								"type": r.content[0].type,
								"reference": r.content[0].reference
							}
							
						} else {
							
							this.formLabelAlign01.jewelryType = {
								"type": this.name_input,
								"reference": ""
							}
							
							// this.formLabelAlign.identification = {
							// 	"id": 0,
							// 	"jewelryType": this.name_input,
							// 	"reference": ""
							// }
						}
						this.up()

					} else {
						// this.formLabelAlign.identification = {
						// 	"id": 0,
						// 	"jewelryType": this.name_input,
						// 	"reference": ""
						// }
						
						
						
						this.formLabelAlign01.jewelryType = {
							"type": this.name_input,
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
				// this.formLabelAlign.inventoryType = this.AllType[this.AllType_input]
				
				// this.formLabelAlign01.certificateType = this.AllType[this.AllType_input]
				// this.ifGRS = this.AllType[this.AllType_input].inventoryType == 'NONE' ? 0 : (this.AllType[this.AllType_input].inventoryType ==
				// 	'GIA' ? 1 : 2)
				
				this.ifGRS = this.formLabelAlign01.certificateType == 'NONE' ? 0 : (this.formLabelAlign01.certificateType ==
					'GIA' ? 1 : 2)
				
			},

				
			branch_change() {
				// console.log('-------++++++')
				// console.log(Entrepot_input)
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

	.specialCreate {
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
			// border-width: 0;
			// border-bottom: 1px solid black;
			// display: inline-block;
			width: 100%;
			// height: 25px;
			// margin-top: 5px;
			// border: 0 1px 0 0;
			// background-color: transparent;
		}

		// .el-input__inner {
		// 	border-width: 0;
		// 	border-bottom: 1px solid black;
		// 	display: inline-block;
		// 	float: left;
		// 	width: 100%;
		// 	height: 25px;
		// 	margin-top: 5px;
		// 	border: 0 1px 0 0;
		// 	border-radius: 0;
		// 	background-color: transparent;
		// }

		.el-autocomplete {
			width: 100%
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

		.grid-content {
			// border-radius: 4px;
			line-height: 36px;
			background: rgb(224, 224, 224);
			text-align: center
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

		// .el-input.is-disabled .el-input__inner {
		// 	background-color: transparent;
		// 	border-color: black;
		// 	color: black;
		// 	cursor: default;
		// }

	}
</style>

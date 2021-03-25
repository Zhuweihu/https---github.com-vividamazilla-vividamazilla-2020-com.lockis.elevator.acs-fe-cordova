<template>
	<div class="specialCreate" v-loading='all_loading' style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">

		<div style="margin-bottom: 40px;width: 100%;">
			<el-select clearable v-model="ifGRS" placeholder="Select" style='float: right;' :disabled="type=='detail'">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</div>

		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">


			<div style='border: 1px solid black;' v-if="ifGRS!='GRS'">

				<div style="margin-bottom: 20px;" v-if="ifGRS=='GIA'">
					<img src="../../../image/gia-logo.svg" />
				</div>

				<div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;" v-if="ifGRS=='GIA'">
					<strong style="margin-left: 10px;">GIA NATURAL DIAMOND Dossier</strong>
				</div>

				<div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;" v-if="ifGRS!='GIA'">
					<strong style="margin-left: 10px;">NATURAL DIAMOND Dossier</strong>
				</div>



				<el-form-item prop="giaDate" style='height: 30px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Date</strong>
					<el-date-picker format="yyyy-MMM-dd" :disabled="type=='detail'" v-model="ruleForm.giaDate" type="date" placeholder="Pick a day" style='float: right;width: 160px;margin-right: 20px;'>
					</el-date-picker>
				</el-form-item>

				<el-form-item prop="certificateNo" style='height: 30px;margin-top: -10px;' class='errors' v-if="ifGRS=='GIA'">
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">GIA Report Number</strong>
					<el-input v-model="ruleForm.certificateNo" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaStyle" style='height: 30px;' class='errors' v-if="ifGRS!='GIA'">
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Shape and Cutting Style</strong>
					<el-input v-model="ruleForm.giaStyle" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaStyle" style='height: 30px;margin-top: -10px;' class='errors' v-if="ifGRS=='GIA'">
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Shape and Cutting Style</strong>
					<el-input v-model="ruleForm.giaStyle" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaMeasurements" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Measurements(mm)</strong>
					<el-input v-model="ruleForm.giaMeasurements" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<!-- <el-form-item prop="no" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Shape and Cutting Style</strong>
					<el-input v-model="ruleForm.no" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item> -->

				<div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;">
					<strong style="margin-left: 10px;">GRADING RESULTS</strong>
				</div>


				<el-form-item prop="giaWeight" style='height: 30px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Carat Weight(Carat)</strong>
					<el-input v-model="ruleForm.giaWeight" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaColorGrade" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Color Grade</strong>
					<el-input v-model="ruleForm.giaColorGrade" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaClarity" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Clarity Grade</strong>
					<el-input v-model="ruleForm.giaClarity" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaCutGrade" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Cut Grade</strong>
					<el-input v-model="ruleForm.giaCutGrade" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;">
					<strong style="margin-left: 10px;">ADDITIONAL GRADING INFORMATION</strong>
				</div>


				<el-form-item prop="giaPolish" style='height: 30px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Polish</strong>
					<el-input v-model="ruleForm.giaPolish" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaSymmetry" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Symmetry</strong>
					<el-input v-model="ruleForm.giaSymmetry" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaFluorescence" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Fluorescence</strong>
					<el-input v-model="ruleForm.giaFluorescence" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaClarityCharacteristics" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Clarity Characteristics</strong>
					<el-input v-model="ruleForm.giaClarityCharacteristics" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="giaInscription" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Inscription(s)</strong>
					<el-input v-model="ruleForm.giaInscription" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>


				<el-form-item>
					<el-upload class="avatar-uploader" action="auto" :show-file-list="false"
					 :http-request="uploadSectionFile" :disabled="type=='detail'" >
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<span v-if="imageUrl" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("gia")'>預覽</span>
					<span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-left: 180px;color: #409EFF;cursor: pointer;margin-left: 20px;" @click='handleRemove("gia")'>刪除</span>
				</el-form-item>




			</div>

			<div style='border: 1px solid black;' v-if="ifGRS=='GRS'">

				<div style="margin-bottom: 20px;background: rgb(234,41,64);width: 250px;margin: 5px auto">
					<img style="width: 100%;" src="../../../image/GRS_Logo1.png" />
				</div>

				<!-- <div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;">
					<strong style="margin-left: 10px;">GIA NATURAL DIAMOND Dossier</strong>
				</div> -->

				<el-form-item prop="certificateNo" style='height: 30px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">No.</strong>
					<el-input v-model="ruleForm.certificateNo" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsDate" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Date</strong>
					<el-date-picker format="yyyy-MMM-dd" v-model="ruleForm.grsDate" :disabled="type=='detail'" type="date" placeholder="Pick a day" style='float: right;width: 160px;margin-right: 20px;'>
					</el-date-picker>
				</el-form-item>



				<el-form-item prop="no" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Object</strong>
					<el-input v-model="ruleForm.grsObject" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsIdentification" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Identification</strong>
					<el-input v-model="ruleForm.grsIdentification" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<!-- <el-form-item prop="no" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Shape and Cutting Style</strong>
					<el-input v-model="ruleForm.no" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item> -->



				<el-form-item>
					<el-upload class="avatar-uploader" action="auto" :show-file-list="false"
					 :http-request="uploadSectionFile02" :disabled="type=='detail'" >
						<img v-if="imageUrl02" :src="imageUrl02" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<span v-if="imageUrl02" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("grs")'>預覽</span>
					<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 180px;color: #409EFF;cursor: pointer;margin-left: 20px;" @click='handleRemove("grs")'>刪除</span>
				</el-form-item>


				<!-- <div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;">
					<strong style="margin-left: 10px;">GRADING RESULTS</strong>
				</div> -->


				<el-form-item prop="grsWeight" style='height: 30px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Weight(CT)</strong>
					<el-input v-model="ruleForm.grsWeight" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsDimensions" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Dimensions</strong>
					<el-input v-model="ruleForm.grsDimensions" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsCut" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Cut</strong>
					<el-input v-model="ruleForm.grsCut" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsShape" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Shape</strong>
					<el-input v-model="ruleForm.grsShape" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<!-- <div style="width: 100%;color: white;background: rgb(120,114,82);line-height: 30px;margin-bottom: 5px;">
					<strong style="margin-left: 10px;">ADDITIONAL GRADING INFORMATION</strong>
				</div> -->


				<el-form-item prop="grsColor" style='height: 30px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Color</strong>
					<el-input v-model="ruleForm.grsColor" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsComment" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Comment</strong>
					<el-input v-model="ruleForm.grsComment" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<el-form-item prop="grsOrigin" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Origin</strong>
					<el-input v-model="ruleForm.grsOrigin" :disabled="type=='detail'" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item>

				<!-- <el-form-item prop="no" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Clarity Characteristics</strong>
					<el-input v-model="ruleForm.no" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item> -->

				<!-- <el-form-item prop="no" style='height: 30px;margin-top: -10px;' class='errors'>
					<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Inscription(s)</strong>
					<el-input v-model="ruleForm.no" style='width: 160px;float: right;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
				</el-form-item> -->



			</div>

			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>




			<el-form-item style='text-align: center;margin-top: 20px;' >
				<el-button type="primary" @click="submitForm('ruleForm')" v-show='type!="detail"' >Create</el-button >
				<!-- <el-button type="primary" @click="resetForm('ruleForm')" v-show='type!="detail"'>Reset</el-button> -->

				<el-button type="primary" @click="Return('ruleForm')" >Back</el-button>

			</el-form-item>
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
			return {
				options: [{
					value: 'NONE',
					label: 'NONE'
				}, {
					value: 'GIA',
					label: 'GIA'
				}, {
					value: 'GRS',
					label: 'GRS'
				}],
				value: '',
				imageUrl:'',
				dialogVisible:false,
				dialogImageUrl:'',
				imageUrl02:'',
				root:'',
				type:'',
				ruleForm: {
					"grsColor": "",
					"grsComment": "",
					"grsCut": "",
					"grsWeight":0,
					"grsDate": "",
					"giaCutGrade": "",
					"giaDate": "",
					"giaColorGrade": "",
					"giaWeight":0,
					"certificateNo": "",   //
					"certificateType": "NONE",
					"giaCharacteristics": "",
					"giaClarity": "",  //
					"giaClarityCharacteristics": "",
					"giaClarityGrade": "",  //
					"giaFluorescence": "",   //
					"giaImage": {
						"reference": null,
					},
					"giaInscription": "",
					"giaMeasurements": "",  //
					"giaPolish": "",   //
					"giaStyle": "",    //
					"giaSymmetry": "", //
					"grsDimensions": "",
					"grsIdentification": "",
					"grsImage": {
						"reference": null,
					},
					"grsObject": "",
					"grsOrigin": "",
					"grsShape": "",
					// "id": 0,
					"reference": ""
				},
				all_loading: false,
				ifGRS: 'GIA',
				rules: {
					certificateNo: [{
							required: true,
							message: 'Please input Certificate No',
							trigger: 'blur'
						},
						// { pattern:/^[1-9]\d*$/, message: 'this must be a number'},
						// {
						// 	min: 10,
						// 	max: 10,
						// 	message: 'Length should be 10',
						// 	trigger: 'blur'
						// }
					],
					giaDate:[{
							required: true,
							message: 'Please pick a date',
							trigger: 'blur'
						},

					],

					grsDate:[{
							required: true,
							message: 'Please pick a date',
							trigger: 'blur'
						},

					],

					giaColorGrade: [{
							required: true,
							message: 'Please input Color Grade',
							trigger: 'blur'
						},

					],

					grsColor: [{
							required: true,
							message: 'Please input Color ',
							trigger: 'blur'
						},

					],
					grsComment: [{
							required: true,
							message: 'Please input Comment ',
							trigger: 'blur'
						},

					],

					grsCut: [{
							required: true,
							message: 'Please input Cut',
							trigger: 'blur'
						},

					],

					giaCutGrade: [{
							required: true,
							message: 'Please input Cut Grade',
							trigger: 'blur'
						},

					],

					giaWeight:[{
							required: true,
							message: 'Please input Weight',
							trigger: 'blur'
						},
						{
							pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
							message: 'this must be a number'
						}
					],

					grsWeight:[{
							required: true,
							message: 'Please input Weight',
							trigger: 'blur'
						},
						{
							pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,
							message: 'this must be a number'
						}
					],

					giaStyle:[
						{
							required: true,
							message: 'Please input Shape and Cutting Style',
							trigger: 'blur'
						}
					],

					giaMeasurements:[
						{
							required: true,
							message: 'Please input Measurements',
							trigger: 'blur'
						}
					],

					giaClarity:[
						{
							required: true,
							message: 'Please input Clarity Grade',
							trigger: 'blur'
						}
					],

					giaPolish:[
						{
							required: true,
							message: 'Please input Polish',
							trigger: 'blur'
						}
					],

					giaSymmetry:[
						{
							required: true,
							message: 'Please input Symmetry',
							trigger: 'blur'
						}
					],

					giaFluorescence:[
						{
							required: true,
							message: 'Please input Fluorescence',
							trigger: 'blur'
						}
					],

					giaClarityCharacteristics:[
						{
							required: true,
							message: 'Please input Clarity Characteristics',
							trigger: 'blur'
						}
					],

					giaInscription:[
						{
							required: true,
							message: 'Please input Clarity Characteristics',
							trigger: 'blur'
						}
					],

					grsObject:[
						{
							required: true,
							message: 'Please input Object',
							trigger: 'blur'
						}
					],

					grsIdentification:[
						{
							required: true,
							message: 'Please input Identification',
							trigger: 'blur'
						}
					],

					grsDimensions:[
						{
							required: true,
							message: 'Please input Dimensions',
							trigger: 'blur'
						}
					],

					grsShape:[
						{
							required: true,
							message: 'Please input Shape',
							trigger: 'blur'
						}
					],

					grsOrigin:[
						{
							required: true,
							message: 'Please input Origin',
							trigger: 'blur'
						}
					],





					region: [{
						required: true,
						message: 'Please select Activity zone',
						trigger: 'change'
					}],
					date1: [{
						type: 'date',
						required: true,
						message: 'Please pick a date',
						trigger: 'change'
					}],
					date2: [{
						type: 'date',
						required: true,
						message: 'Please pick a time',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: 'Please select at least one activity type',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: 'Please select activity resource',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: 'Please input activity form',
						trigger: 'blur'
					}]
				}
			};
		},

		created: function() {

			this.root = this.$api.root

			this.type=this.$route.query.type

			if(this.type=='detail'){

								console.log('進來了')
								this.$api.get('/inventory/gem/certified/' + this.$route.query.id, null, r => {

									console.log(r)


									this.ruleForm=r
									this.ifGRS=r.certificateType

									if(r.giaImage!=null){
										this.imageUrl= this.root+'/kernal/asset/' +r.giaImage.reference
									}

									if(r.grsImage!=null){
										console.log('8989')
										this.imageUrl02= this.root+'/kernal/asset/' +r.grsImage.reference
									}




								});

			}

			// /inventory/gem/certified/{certificate}


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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// alert('submit!');

						this.ruleForm.certificateType=this.ifGRS

						this.$api.put('/inventory/gem/certified', this.ruleForm, r => {

							console.log(r)
							history.back(-1)
						});

					} else {
						// alert('submit!');
						// console.log('error submit!!');
						return false;
					}
				});
			},
			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl = this.root + '/kernal/asset/' + r.reference
					this.ruleForm.giaImage.reference = r.reference
					//console.log(r)
				});
			},
			uploadSectionFile02(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl02 = this.root + '/kernal/asset/' + r.reference
					this.ruleForm.grsImage.reference = r.reference
					//console.log(r)
				});
			},

			beforeAvatarUpload(){},
			handleAvatarSuccess(){},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handlePictureCardPreview(type) {
				// this.dialogImageUrl = file.url;

				if(type=="gia"){

					this.dialogImageUrl = this.imageUrl;
				}else if(type=="grs"){

					this.dialogImageUrl = this.imageUrl02;
				}
				this.dialogVisible = true;
			},

			handleRemove(type) {
				// //console.log(file, fileList);


				if(type=="gia"){
					this.imageUrl=''
					this.ruleForm.giaImage.reference = null

				}else if(type=="grs"){
					this.imageUrl02=''
					this.ruleForm.grsImage.reference =null
				}


			},

			Return(){

				history.back(-1)

			}


		},


	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.errors {

		.el-form-item__error {
			right: 20px;
			left: auto;
			line-height: 0;
			padding-top: 4px;

		}

	}


	.specialCreate {

		.el-input__inner {
			line-height: 25px;
			height: 25px;
		}

		.el-form-item__content {
			line-height: 0
		}

		// .el-form-item__error{
		// 	right: 5px;
		// 	left: none;
		// }

		.avatar-uploader .el-upload {
			// border: 1px dashed #d9d9d9;
			border: 1px solid #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			margin-left: 20px // margin: 0 auto
		}

		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}

		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 100px;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}

		.avatar {
			width: 100px;
			height: 100px;
			display: block;
		}

		.el-input__icon {
			line-height: 0
		}


	}
</style>

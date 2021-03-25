<template>
	<div class="xinzeng">
		<!--  v-for='item in zhengge' -->
		<div style="height: 60px;">
			<div style="width: 90%;float: left;">
				<div style="float: left;line-height: 80px;font-size: 18px;color: green;">>>>Jewelry Design</div>
				<!-- <div style="float: right;line-height: 70px;font-size: 18px;color: green;margin-left: 100px;">
					<template>
						<span style="color: #000000;">保修單&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<el-select v-model="versions" placeholder="请选择" @change='getdetails(versions)'>
							<el-option :disabled="type=='detail'?true:false" v-if="type!=='new'" v-for="(item,index) in version" :label="'版本'+index" :value="item.plvKGuestBillcol">
							</el-option>
						</el-select>
					</template>
				</div> -->

			</div>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;min-width: 1100px;">

			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' label-width="130px" :model="formLabelAlign"
			 :rules="rules">
				<div style="width: 100%; float: left;">
					<el-form-item label="designer" class='mat20 table30'>
						<el-input v-model="formLabelAlign.designer" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="Design code" class='mat20 table30 m15'>
						<el-input v-model="formLabelAlign.designName" placeholder="Input" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="Design Date" class='mat20 table30 m15'>
						<el-date-picker v-model="formLabelAlign.finishDate" type="date" placeholder="选择日期" style="float: left;width: 300px;"
						 :disabled="type=='detail'?true:false">
						</el-date-picker>
					</el-form-item>

					<!-- <el-form-item label="總成本">
						<el-input v-model="formLabelAlign.numbe" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					</el-form-item> -->

					<el-form-item label="Introduction" class='mat20 table30' style='width: 50%;'>
						<el-input type="textarea" :rows="2" placeholder="Input" v-model="formLabelAlign.intro" :disabled="type=='detail'?true:false"
						 style="width: 400px;float: left;">
						</el-input>
					</el-form-item>
					<el-form-item label="Customer Intro" class='mat20' style='width: 50%;'>
						<el-input type="textarea" :rows="2" placeholder="Input" v-model="formLabelAlign.clientIntro" :disabled="type=='detail'?true:false"
						 style="width: 400px;float: left;">
						</el-input>
					</el-form-item>

					<el-form-item label="Upload" class='mat20' style='width: 100%;'>
						<el-upload :disabled="type=='detail'?true:false" action="auto" :file-list="fileList" :http-request="uploadSectionFile"
						 list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" style="float: left;">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
				</div>


				<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;margin-top: 30px;">
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
							<div class="grid-content ">Amount</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content ">Cost</div>
						</el-col>
						<el-col :span="3">
							<div class="grid-content ">Remark</div>
						</el-col>
					</el-row>

					<el-row v-for='(item,index) in formLabelAlign.plvKStoneEntityList'>
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
								<el-input class='grid-inputs' v-model="item.pcs" :disabled="type=='detail'?true:false" placeholder="Input"
								onkeyup="(this.v=function(){
								this.value=this.value.replace(/^\.$/,'');
								this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
								this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="input-content">
								<el-input class='grid-inputs' v-model="item.us" :disabled="type=='detail'?true:false" placeholder="Input"
								onkeyup="(this.v=function(){
								this.value=this.value.replace(/^\.$/,'');
								this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
								this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)" onblur="this.v();"></el-input>
							</div>
						</el-col>
						<el-col :span="3">
							<div class="input-content">
								<el-input class='grid-inputs' v-model="item.remark" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
							</div>
						</el-col>

						<el-col :span="3">
							<div class="input-content " style="text-align: left;color: red;margin-left: 20px;">
								<span style="cursor: pointer;" class='grid-inputs' @click="del(index)" v-if="type!='detail'">Delete</span>
								<!-- <span class='grid-inputs' v-model="item.allweight" :disabled="type=='detail'?true:false"
									 placeholder="请输入内容"></span> -->
							</div>
						</el-col>
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
			</el-form>
		</div>



		<div class='mat20' style="margin-left: 30%;">
			<el-button :loading="loading" class='button' type="primary" style="background: rgb(253,99,99);border:none;font-size: 18px;"
			 @click="submitForm('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
			<el-button class='button' type="primary" style="background: rgb(253,99,99);border:none;font-size: 18px;" @click="cancel()">Return</el-button>
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
				root: 'http://192.168.101.5:8080/RESTful/kernal/asset/',
				plvKAssetDictionariesDtoList: [],
				fileList: [],
				imageUrl: '',
				version: '',
				dialogImageUrl: '',
				dialogVisible: false,
				loading: false,
				textarea: '',
				labelPosition: '',
				type: "detail",
				uuid: '',
				referenceId: '',
				value1: '',
				password: '',
				onLock: '',
				formLabelAlign: {
					formLabelAlign: '',
					designer: '',
					designName: '',
					finishDate: '',
					intro: '',

					numbe: 0,
					clientIntro: '',
					plvKStoneEntityList: [{
						stone: '',
						shape: '',
						color: '',
						pcs: '',
						us: '',
						remark: '',
						plvKAssetDictionariesDtoList: [{
							elseReference: '',
							id: '',
							plvKAssetReference: '',
							type: '',
						}]
					}],
				},
				plvKStoneEntityList: [],

				options: [{
					id: '1',
					label: '已起貨'
				}, {
					value: '2',
					label: '起交貨'
				}],
				// 				sex: [{
				// 					id: '1',
				// 					label: '男'
				// 				}, {
				// 					value: '2',
				// 					label: '女'
				// 				}],
				option: [{
					id: '1',
					label: '群組1'
				}, {
					id: '2',
					label: '群組2'
				}],
				rules: {
					userName: [{
						validator: validatorUser,
						trigger: 'blur'
					}]

				},

				versions: [{
					id: '1',
					label: '1.0'
				}, {
					id: '2',
					label: '1.1'
				}, {
					id: '3',
					label: '1.2'
				}],
			}
		},

		created: function() {
			// this.findAllEntrepot()
			this.root = this.$api.root

			this.type = this.$route.query.type
			this.$route.query.uuid
			if (this.type == 'detail') {
				this.$api.get('/Design/seekReference/' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r[0]
					console.log(r)

					// console.log(this.root + 'kernal/asset/' + r[0].plvKAssetDictionariesEntities[0].plvKAssetReference)
					for (var i = 0; i < r[0].plvKAssetDictionariesEntities.length; i++) {
						this.fileList.push({
							name: r[0].plvKAssetDictionariesEntities[i].plvKAssetReference,
							url: this.root + '/kernal/asset/' + r[0].plvKAssetDictionariesEntities[i].plvKAssetReference
						});
					}
					// 					console.log(this.fileList)
				});
			} else if (this.type == 'alert') {
				// console.log(this.$route.query.uuid)
				this.$api.get('/Design/seekReference/' + this.$route.query.uuid, null, r => {
					console.log(r)

					this.plvKAssetDictionariesDtoList = r[0].plvKAssetDictionariesEntities

					this.formLabelAlign = r[0]

					for (var i = 0; i < r[0].plvKAssetDictionariesEntities.length; i++) {
						this.fileList.push({
							name: r[0].plvKAssetDictionariesEntities[i].plvKAssetReference,
							url: this.root + '/kernal/asset/' + r[0].plvKAssetDictionariesEntities[i].plvKAssetReference
						});
					}

					// this.formLabelAlign.finishDate = new Date(r.finishDate)
					// console.log(new Date(r.communicationDate))
				});
				this.uuid = this.$route.query.uuid
				// this.id = this.$route.query.id
			}
		},

		methods: {

			handleRemove(file, fileList) {

				console.log(fileList);
				console.log(file);

				//點擊刪除
				console.log('0000000')
				console.log(file.name)
				console.log(this.uuid)
				this.$api.get('/Design/deleteAssetDictionariesDesign/' + file.name + '/' + this.uuid, null, r => {
					console.log(r)
				})

				//提交刪除
				// console.log(this.formLabelAlign.plvKAssetDictionariesEntities[0].plvKAssetReference)
				// 				console.log(file.name)
				// 				this.$api.get('/Design/deleteAssetDictionaries/'+file.name,null, r => {
				// 					console.log(r)
				// 					
				// // 					for(var i = 0;i <this.plvKAssetDictionariesDtoList.length ; i++){
				// // 						if(file.name == this.plvKAssetDictionariesDtoList[i].plvKAssetReference){
				// // 							this.plvKAssetDictionariesDtoList.splice(index, 1)
				// // 						}
				// // 					}
				// 					
				// 				})

			},


			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;


			},


			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.dialogImageUrl = this.root + '/kernal/asset/' + r.reference

					this.referenceId = r.reference
					console.log(r)
					console.log('?????????????')
					console.log(this.uuid)
					this.plvKAssetDictionariesDtoList.push({
						"elseReference": this.uuid,
						"id": '',
						"plvKAssetReference": r.reference,
						"type": "收據文件"
					})

				});
			},

			submitForm(formLabelAlign) {

				if (this.formLabelAlign.finishDate != '' && this.formLabelAlign.finishDate != null) {

					this.loading = true

					if (this.type == 'alert') {
						this.$api.post('/Design/update', {
							"clientIntro": this.formLabelAlign.clientIntro,
							"designName": this.formLabelAlign.designName,
							"designer": this.formLabelAlign.designer,
							"finishDate": new Date(this.formLabelAlign.finishDate).format("yyyy-MM-dd"),
							"intro": this.formLabelAlign.intro,
							"onLock": 0,
							"plvKAssetDictionariesDtoList": this.plvKAssetDictionariesDtoList,
							// 						"plvKAssetDictionariesDtoList": [{
							// 							"elseReference": this.uuid,
							// 							"id": this.formLabelAlign.plvKAssetDictionariesEntities[0].id,
							// 							"plvKAssetReference": this.referenceId,
							// 							"type": "設計圖"
							// 						}],
							"numbe": parseInt(this.formLabelAlign.numbe),
							"plvKAviEceName": "",
							"plvKAviEceReference": "",
							"plvKAviEceSalesNo": "",
							"plvKDesign": "",
							"plvKDesignKype": '',
							"plvKDesignType": "0",
							// "us": this.formLabelAlign.us,

							plvKStoneSaveDtoList: this.formLabelAlign.plvKStoneEntityList,

							"reference": this.uuid,
						}, r => {
							//console.log('0101');
							// console.log(r);
							console.log(r)
							this.$router.push("/JewelryDesign")

							// window.history.back();
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});


					} else {

						for (var i = 0; i < this.formLabelAlign.plvKStoneEntityList.length; i++) {
							this.formLabelAlign.numbe = parseFloat(this.formLabelAlign.plvKStoneEntityList[i].us) + this.formLabelAlign.numbe
						}

						// console.log(this.formLabelAlign.numbe)


						this.$api.post('/Design/save', {
							"clientIntro": this.formLabelAlign.clientIntro,
							"designName": this.formLabelAlign.designName,
							"designer": this.formLabelAlign.designer,
							"finishDate": this.formLabelAlign.finishDate.format("yyyy-MM-dd"),
							"intro": this.formLabelAlign.intro,
							"onLock": '',
							"plvKAssetDictionariesDtoList": this.plvKAssetDictionariesDtoList,
							// 						"plvKAssetDictionariesDtoList": [{
							// 							"elseReference": this.uuid,
							// 							"id": 0,
							// 							"plvKAssetReference": this.referenceId,
							// 							"type": "設計圖"
							// 						}],
							"numbe": parseFloat(this.formLabelAlign.numbe),
							"plvKAviEceName": "",
							"plvKAviEceReference": "",
							"plvKAviEceSalesNo": "",
							"plvKDesign": "",
							"plvKDesignKype": '',
							"plvKDesignType": "0",
							// "us": this.formLabelAlign.us,

							plvKStoneSaveDtoList: this.formLabelAlign.plvKStoneEntityList,

							"reference": "",
						}, r => {
							//console.log('0101');
							// console.log(r);
							console.log(r)
							this.loading = false
							this.$router.push("/JewelryDesign")

							// window.history.back();
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});

					}

				} else {
					alert('Time cannot be empty')
				}


			},


			//增加石資料
			add() {
				this.formLabelAlign.plvKStoneEntityList.push({
					stone: '',
					shape: '',
					color: '',
					pcs: '',
					us: '',
					remark: '',
					
					
				    cts: 0,
				    elseRefenece: '',
				    hk: 0,
				    hkC: 0,
				    netAmount: 0,
				    noNumber: '',
				    numbe: 0,
				    refenece: '',
				    usC: 0
				})
			},
			// 			jieduan(){
			// 				this.zhengge.push({
			// 					formLabelAlign:'',
			// 				})
			// 			},

			// 項目刪除
			del(index) {
				console.log('刪除')
				this.$api.get('/Design/deletePlvKDesignList/' + this.formLabelAlign.plvKStoneEntityList[index].refenece, null, r => {
					console.log('****************************')
					this.formLabelAlign.plvKStoneEntityList.splice(index, 1)
					this.search();
				});
			},

			cancel() {
				this.$router.push("/JewelryDesign")
			},

			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/SystemManagement/JewelryDesign")
				} else if (type == 'branch') {
					this.$router.push("/SystemManagement/shnagzaitupian")
				}
			}

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.xinzeng {

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
			height: 100px;
		}

		.el-col-3 {
			width: 14%
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
			border: 0;
			margin-top: 30px
		}

		.button_aa {
			width: 150px;
			height: 40px;
			font-size: 21px;
			// line-height: 48px;
			background: $navHoverTextColor;
			border: 0;
		}

		.button:nth-child(2) {
			margin-left: 50px;

		}

		.point {
			cursor: pointer;
		}

	}
</style>

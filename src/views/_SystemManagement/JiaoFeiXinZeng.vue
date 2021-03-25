<template>
	<div class="KaiZhiFapiao">
		<!-- <el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="background:white;height: 60px;">

					<div class="second_menu selector">
						<span @click="topage('user')">用戶管理</span>
					</div>

					<div class="second_menu">
						<span>群組管理</span>
					</div>

					<div class="second_menu">
						<span @click="topage('branch')">分行管理</span>
					</div>
				</div>
			</el-col>
		</el-row> -->

		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Payment</span>
		</div>








		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				<el-form-item label="Item" class='fl table30'>
					<el-input v-model="formLabelAlign.name" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Amount" class='fl table30 ml5'>
					<el-input v-model="formLabelAlign.money" class='inputs' type='tel' :disabled="type=='detail'?true:false"
					onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Unit" class='fl table30 ml5'>
					<el-select v-model="formLabelAlign.unit" placeholder="select" class='inputs' :disabled="type=='detail'?true:false">
						<el-option v-for="item in unit" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
					<!-- <el-input v-model="formLabelAlign.unit" class='inputs' :disabled="type=='detail'?true:false"></el-input> -->
					<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
				</el-form-item>
				<el-form-item label="Tel" class='mat20 fl table30 '>
					<el-input class='inputs' v-model="formLabelAlign.phoneCall" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Adress" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.location" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Invoice Date" class='mat20 fl table30 ml5'>
					<el-date-picker v-model="formLabelAlign.startDate" type="date" placeholder="select" class='inputs' style='width: 90%;'
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>



				<el-form-item label="Information" class='mat20' style='margin-bottom: 20px;'>
					<!-- <el-switch v-model="formLabelAlign.employ" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch> 
					* -->

					<!-- <el-upload class="upload-demo" ref="upload" :on-preview="handlePreview" action="auto" :on-remove="handleRemove"
					 :http-request="uploadSectionFile" :file-list="fileList" :auto-upload="true" style="line-height: 0;width: 240px;"
					 :disabled="type=='detail'?true:false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					</el-upload> -->

					<el-upload class="upload-demo" ref="upload" :on-preview="handlePreview" action="auto" :on-remove="handleRemove"
					 :http-request="uploadSectionFile" :file-list="fileList" :auto-upload="true" :show-file-list='true' style="line-height: 0;width: 240px;"
					 :disabled="type=='detail'?true:false">
						<el-button slot="trigger" size="small" type="primary">select</el-button>

						<!-- 瀏覽圖片 -->
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-upload>

					<div>
						<span>{{formLabelAlign.type}}</span>
					</div>

				</el-form-item>


			</el-form>



		</div>

		<div style="width:100%;text-align: center;margin-top: 45px;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>
			<!-- </el-form-item> -->
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
				root: 'http://192.168.101.2:8080/RESTful/kernal/asset/',
				dialogImageUrl: '',
				dialogVisible: false,
				loading: false,
				plvKAssetDictionariesDtoList: [],
				fileList: [],
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				referenceId: '',
				password: '',
				formLabelAlign: {
					name: '',
					money: '',
					unit: '',
					phoneCall: '',
					location: '',
					startDate: '',
					plvKAssetDictionariesDtoList: [{
						elseReference: this.uuid,
						id: '',
						plvKAssetReference: this.referenceId,
						type: 'asdad',
					}]

				},
				unit: [{
						id: '1',
						label: '人民幣'
					},
					{
						id: '2',
						label: '港幣'
					},
					{
						id: '3',
						label: '美元'
					},
				],
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
			}
		},

		created: function() {
			
			this.root=this.$api.root+'/kernal/asset/'
			this.type = this.$route.query.type
			if (this.type == 'detail') {
				// this.$route.query.uuid
				this.$api.get('/PlvRPaymentEndpoint/seekReference/' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r
					for (var i = 0; i < r.plvKAssetDictionariesEntityList.length; i++) {
						this.fileList.push({
							name: r.plvKAssetDictionariesEntityList[i].plvKAssetReference,
							url: this.root + r.plvKAssetDictionariesEntityList[i].plvKAssetReference
						});
					}
				});
			} else if (this.type == 'alert') {

				this.$api.get('/PlvRPaymentEndpoint/seekReference/' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r
					for (var i = 0; i < r.plvKAssetDictionariesEntityList.length; i++) {
						this.fileList.push({
							name: r.plvKAssetDictionariesEntityList[i].plvKAssetReference,
							url: this.root + r.plvKAssetDictionariesEntityList[i].plvKAssetReference
						});
					}
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// //console.log(r)
				});
				this.uuid = this.$route.query.uuid
			}
		},

		methods: {
			submitUpload() {
				this.$refs.upload.submit();
			},
			handleRemove(file, fileList) {
				//console.log(file, fileList);
				//console.log('刪除上傳圖')
				//console.log(file.name)
				this.$api.get('/PlvRPaymentEndpoint/deleteAssetDictionaries/' + file.name, r => {
					//console.log(r)
				})
			},
			handlePreview(file) {
				console.log(file);
				//console.log(file.url)
				// console.log( window.URL.createObjectURL(file.raw))
				
				if(file.status=="ready"){
					this.dialogImageUrl = window.URL.createObjectURL(file.raw);
				}else{
					this.dialogImageUrl = file.url;
				}
				this.dialogVisible = true;
				
				
			},

			uploadSectionFile(files) {
				//console.log('XXXXXXX****************')


				let bodyFormData = new FormData();
				bodyFormData.append("file", files.file);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					//console.log(r)
					this.plvKAssetDictionariesDtoList.push({
						"elseReference": this.uuid,
						"id": 0,
						"plvKAssetReference": r.reference,
						"type": "繳費文件"
					})
					//console.log('========================')
					//console.log(this.plvKAssetDictionariesDtoList)
					//this.referenceId = r.reference
					// plvKAssetDictionariesDtoList:this.plvKAssetDictionariesEntityList
					// this.$router.push("/DailyExpenditureinvoiceManagement")

				});
			},

			submitForm(formLabelAlign) {

				if (this.formLabelAlign.startDate != '' && this.formLabelAlign.startDate != null) {

					this.loading = true

					if (this.type == 'alert') {
						this.$api.post('/PlvRPaymentEndpoint/update', {

							"location": this.formLabelAlign.location,
							"money": parseFloat(this.formLabelAlign.money),
							"name": this.formLabelAlign.name,
							"onLock": 0,
							"phoneCall": this.formLabelAlign.phoneCall,
							"plvKAssetDictionariesDtoList": this.plvKAssetDictionariesDtoList,
							// 						"plvKAssetDictionariesDtoList": [{
							// 						  "elseReference": this.uuid,
							// 						  "id": 0,
							// 						  "plvKAssetReference": this.referenceId,
							// 						  "type": "繳費文件"
							// 						}],
							"reference": this.uuid,
							"startDate": new Date(this.formLabelAlign.startDate).format("yyyy-MM-dd"),
							"unit": this.formLabelAlign.unit,
							"userName": "",
							"userReference": "",
						}, r => {
							//console.log('******************')
							//console.log(r)
							this.$router.push("/DailyExpenditurepaymentManagement")
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					} else {
						this.$api.post('/PlvRPaymentEndpoint/save', {

							"location": this.formLabelAlign.location,
							"money": parseFloat(this.formLabelAlign.money),
							"name": this.formLabelAlign.name,
							"onLock": 0,
							"phoneCall": this.formLabelAlign.phoneCall,
							"plvKAssetDictionariesDtoList": this.plvKAssetDictionariesDtoList,
							// 						"plvKAssetDictionariesDtoList": [{
							// 						  "elseReference": "",
							// 						  "id": 0,
							// 						  "plvKAssetReference": this.referenceId,
							// 						  "type": "繳費文件"
							// 						}],
							"reference": '',
							"startDate": this.formLabelAlign.startDate.format("yyyy-MM-dd"),
							"unit": this.formLabelAlign.unit,
							"userName": "",
							"userReference": "",
						}, r => {
							//console.log('******************')
							//console.log(r)
							this.$router.push("/DailyExpenditurepaymentManagement")
						},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
					}

				} else {
					alert('Time cannot be empty!!!')
				}




			},

			detail() {},
			cancel() {
				this.$router.push("/DailyExpenditurepaymentManagement")
			},
			// 			topage(type) {
			// 				if (type == 'grounp') {
			// 					this.$router.push("/Function/CustomentManagement")
			// 				} else if (type == 'branch') {
			// 					this.$router.push("/Function/branchManagement")
			// 				}
			// 			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.KaiZhiFapiao {

		width: 100%;

		.el-form-item {
			margin-bottom: 0
		}

		.table30 {
			width: 30%
		}

		.ml5 {
			margin-left: 5%;
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
			width: 90%;
			float: left;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
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

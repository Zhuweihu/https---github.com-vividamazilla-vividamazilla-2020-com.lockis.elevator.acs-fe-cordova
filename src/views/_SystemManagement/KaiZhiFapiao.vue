<template>
	<div class="KaiZhiFapiao">
		<!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">Invoice</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div> -->
		<!-- ||||||||||||||||||||| -->
		<div>

      <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
        <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">
          <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
            <strong style="margin-left: 10px;">Invoice</strong>
          </div>

          <el-form-item label="Item">
            <el-input placeholder="input" type="text" v-model="formLabelAlign.item" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Amount">
            <el-input placeholder="input" type="text" v-model="formLabelAlign.amount" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Currency">
            <el-select clearable v-model="formLabelAlign.currency" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
            	<el-option v-for="item in unit" :label="item.label" :value="item.label">
            	</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Invoice Date">
            <el-date-picker v-model="formLabelAlign.invoiceDate" type="date" placeholder="select" style='width: 100%;'
             :disabled="type=='detail'?true:false">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="Invoice No">
            <el-input placeholder="input" type="text" v-model="formLabelAlign.invoiceNo" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Supplier">
              <el-autocomplete style='width: 100%;' v-model="origin_input" :fetch-suggestions="querySearch_origin" placeholder="Input"
						 @select="handleSelect_origin" @blur='changeSource' :disabled="type=='detail'?true:false"></el-autocomplete>
          </el-form-item>

          <el-form-item label="Remark">
            <el-input placeholder="input" type="textarea" v-model="formLabelAlign.remark" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Photo">
            <div>
              <el-upload class="avatar-uploader" action="auto" :show-file-list="false" :http-request="uploadSectionFile02"
               :disabled="type=='detail'">
                <img v-if="imageUrl02" :src="imageUrl02" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span v-if="imageUrl02" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("grs")'>預覽</span>
              <span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
               @click='handleRemove("grs")'>刪除</span>
            </div>
          </el-form-item>



        </el-form>
      </div>

			<!-- <el-row style='line-height: 35px;'>

				<el-col :span="8">
					<span class="fl">Item：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.item" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Amount：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.amount" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Currency：</span>
					<p style="overflow: hidden;">
						<el-select clearable v-model="formLabelAlign.currency" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
							<el-option v-for="item in unit" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
					</p>
				</el-col>

			</el-row> -->
		</div>
		<!-- ||||||||||||||||||||| -->
		<!-- <div>
			<el-row style='line-height: 35px;'>


				<el-col :span="8">
					<span class="fl">Invoice Date：</span>
					<p style="overflow: hidden;">
						<el-date-picker v-model="formLabelAlign.invoiceDate" type="date" placeholder="select" style='width: 100%;'
						 :disabled="type=='detail'?true:false">
						</el-date-picker>
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Invoice No：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.invoiceNo" :disabled="type=='detail'?true:false" class="tem_input">
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
		</div> -->
		<!-- ||||||||||||||||||||| -->
		<!-- <div>
			<el-row style='line-height: 35px;'>

        <el-col :span="8">
        	<span class="fl">Remark：</span>
        	<p style="overflow: hidden;">
        		<textarea rows="3" style="width: 100%;" ></textarea>
        	</p>
        </el-col>

			</el-row>
		</div> -->

		<!-- <div>
			<el-upload class="avatar-uploader" action="auto" :show-file-list="false" :http-request="uploadSectionFile02"
			 :disabled="type=='detail'">
				<img v-if="imageUrl02" :src="imageUrl02" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<span v-if="imageUrl02" style="float: left;padding-left: 160px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("grs")'>預覽</span>
			<span v-if="imageUrl02&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
			 @click='handleRemove("grs")'>刪除</span>
		</div> -->
		<!-- ||||||||||||||||||||| -->
		<!-- <div>
			<el-form-item label="Information" class='mat20 table30' style='margin-bottom: 20px;'>

				<el-upload class="upload-demo" ref="upload" :on-preview="handlePreview" action="auto" :on-remove="handleRemove"
				 :http-request="uploadSectionFile" :file-list="fileList" :auto-upload="true" :show-file-list='true' style="line-height: 0;width: 240px;"
				 :disabled="type=='detail'?true:false">
					<el-button slot="trigger" size="small" type="primary">select</el-button>

					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-upload>

				<div>
					<span>{{formLabelAlign.type}}</span>
				</div>

			</el-form-item>
		</div> -->
		<!-- ||||||||||||||||||||| -->



		<!-- <div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Invoice</span>
		</div> -->

		<!-- <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;">
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


				<el-form-item label="invoice No" class='mat20 fl table30'>
					<el-input v-model="formLabelAlign.invoiceOn" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>



				<el-form-item label="Information" class='mat20 table30' style='margin-bottom: 20px;'>

					<el-upload class="upload-demo" ref="upload" :on-preview="handlePreview" action="auto" :on-remove="handleRemove"
					 :http-request="uploadSectionFile" :file-list="fileList" :auto-upload="true" :show-file-list='true' style="line-height: 0;width: 240px;"
					 :disabled="type=='detail'?true:false">
						<el-button slot="trigger" size="small" type="primary">select</el-button>

						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-upload>

					<div>
						<span>{{formLabelAlign.type}}</span>
					</div>

				</el-form-item>


			</el-form>



		</div> -->

		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>

		<div style="width:100%;text-align: center;margin-top: 45px;">

			<el-button :loading="loading" type="primary" @click="submitForm01('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
			<el-button type="primary" @click="cancel()">Back</el-button>

		</div>

	</div>

</template>

<script>
	import {
		MessageBox,
		Message
	} from 'element-ui';
	export default {
		name: "KaiZhiFapiao",
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

				dialogImageUrl: '',
				dialogVisible: false,
				loading: false,
				imageUrl02: '',
				plvKAssetDictionariesDtoList: [],
				fileList: [
					// 					{
					// 						name: this.referenceId,
					// 						url: 'http://192.168.101.5:8080/RESTful/kernal/asset/retain/'
					// 					},
					// 					{
					// 						name: 'food2.jpeg',
					// 						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					// 					},
				],
				root: 'http://192.168.101.5:8080/RESTful/kernal/asset/',
				textarea: '',
				labelPosition: '',
				type: "detail",
				uuid: '',
				password: '',
				referenceId: '',
				origin_input: '',
				options: [],
				"supplier": {
					"addr": "",
					"contact": "",
					"enable": 1,
					"name": ""
				},
				formLabelAlign: {
          remark:"",
					"amount": 0,
					image: {
						reference: null
					},
					"currency": "",
					"invoiceNo": "",
					"invoiceDate": "",
					"invoiceType": "BILL",
					"item": "",
					"locked": 0,
					"member": null,
					"reference": "",
					"supplier": {
						"reference": ""
					}
				},
				// plvKAssetDictionariesDtoList: [],InvoiceCurrency HKD, CNY, USD
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

			this.root = this.$api.root
			// this.root=this.$api.root+'/kernal/asset/'
			this.type = this.$route.query.type
			this.$route.query.uuid
			if (this.type == 'detail') {
				// this.$route.query.uuid
				this.$api.get('/invoice/reference/' + this.$route.query.uuid, null, r => {

					console.log('------------------')
					console.log(r)
					this.formLabelAlign = r

					this.origin_input = r.supplier.name
					this.supplier = r.supplier

					this.imageUrl02=this.imageUrl02 = this.root + '/kernal/asset/' + r.image.reference

					// for(var i=0;i<r.plvKAssetDictionariesEntityList.length;i++){
					// 	this.fileList.push({name:r.plvKAssetDictionariesEntityList[i].plvKAssetReference,
					// 	url:this.root+ r.plvKAssetDictionariesEntityList[i].plvKAssetReference});
					// }
				});
			} else if (this.type == 'alert') {

				this.$api.get('/invoice/reference/' + this.$route.query.uuid, null, r => {
					//console.log(r)
					this.formLabelAlign = r
					this.origin_input = r.supplier.name
					this.supplier = r.supplier

					this.imageUrl02=this.imageUrl02 = this.root + '/kernal/asset/' + r.image.reference
					// this.referenceId = r.plvKAssetDictionariesEntityList[0].plvKAssetReference
					//this.formLabelAlign.employ = r.employ == 0 ? true : false
					// //console.log(r)
					//console.log(this)
				});
				this.uuid = this.$route.query.uuid

			}
		},

		methods: {

			uploadSectionFile02(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl02 = this.root + '/kernal/asset/' + r.reference
					this.formLabelAlign.image.reference = r.reference

					//console.log(r)
				});
			},

			handlePictureCardPreview(type) {
				// this.dialogImageUrl = file.url;

				if (type == "gia") {

					this.dialogImageUrl = this.imageUrl;
				} else if (type == "grs") {

					this.dialogImageUrl = this.imageUrl02;
				}
				this.dialogVisible = true;
			},

			handleRemove(type) {
				// //console.log(file, fileList);


				if (type == "gia") {
					this.imageUrl = ''
					this.ruleForm.giaImage.reference = null

				} else if (type == "grs") {
					this.imageUrl02 = ''
					this.formLabelAlign.image.reference = null
				}


			},

			submitUpload() {
				this.$refs.upload.submit();
			},

			// handleRemove(file, fileList) {
			//
			// 	this.$api.get('/PlvRInvoiceEndpoint/deleteAssetDictionaries/' + file.name, r => {
			//
			// 	})
			// },

			handlePreview(file) {
				//console.log('++++++++++')
				// 				//console.log(file);
				// 				this.root=this.$api.root
				// 				this.$api.get('/kernal/asset/', this.uuid , r => {
				// 					this.fileList.url='http://192.168.101.5:8080/RESTful/kernal/asset/' + this.uuid
				// 					//console.log('////******')
				// 					//console.log(r)
				// 				})
				//console.log(file.url)
				if (file.status == "ready") {
					this.dialogImageUrl = window.URL.createObjectURL(file.raw);
				} else {
					this.dialogImageUrl = file.url;
				}
				this.dialogVisible = true;
			},

			querySearch_origin(queryString, cb) {

				if (queryString == '') {

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

				} else {

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

			handleSelect_origin(item) {

				console.log(item)
				this.supplier = item
			},

			changeSource() {

				var that = this
				setTimeout(function() {

					if (that.origin_input != '') {

						that.$api.get('/invoice/suppliers/name/' + that.origin_input, null, r => {
							// this.$router.push("/SystemManagement/UserManagement")
							console.log('執行----' + r.length)
							if (r.length == 1 && r[0].name == that.origin_input) {

								that.formLabelAlign.supplier = r[0]


							} else {

								that.origin_input = ''

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

			uploadSectionFile(files) {
				//console.log('XXXXXXX****************')

				let bodyFormData = new FormData();
				bodyFormData.append("file", files.file);
				// bodyFormData.append("type", param.file.type);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					//console.log('XXXXXXXXXXXX')
					//console.log(r)
					this.plvKAssetDictionariesDtoList.push({
						"elseReference": this.uuid,
						"id": 0,
						"plvKAssetReference": r.reference,
						"type": "收據文件"
					})
					//console.log('========================')
					//console.log(this.plvKAssetDictionariesDtoList)
					//this.referenceId = r.reference
					// plvKAssetDictionariesDtoList:this.plvKAssetDictionariesEntityList
					// this.$router.push("/DailyExpenditureinvoiceManagement")

				});

				// 				this.$api.get('/kernal/asset/', this,uuid , r => {
				// 					//console.log('++++++++++')
				// 					//console.log(r)
				// 				})
			},


			submitForm01(formLabelAlign) {

				if (this.formLabelAlign.amount == '' || this.formLabelAlign.currency == '' ||
					this.formLabelAlign.invoiceNo == '' || this.formLabelAlign.invoiceDate == '' || this.formLabelAlign.item == '' ||
					this.supplier.addr == '' || this.supplier.contact == '' || this.supplier.name == '') {
					MessageBox('Information cannot be empty!', 'Tips', {
						confirmButtonText: 'OK',
						// cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = false
						// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
					}).catch(() => {

					});

				} else {
					var that = this
					this.formLabelAlign.invoiceDate = new Date(this.formLabelAlign.invoiceDate).format("yyyy-MM-dd")
					this.formLabelAlign.amount=parseInt(this.formLabelAlign.amount)
					if (this.origin_input == '') {

						this.formLabelAlign.supplier = {
							"addr": this.supplier.addr,
							"contact": this.supplier.contact,
							"enable": 1,
							"name": this.supplier.name,
						}

					} else {

						this.formLabelAlign.supplier = {
							"reference": this.supplier.reference
						}

					}



					if (this.type == "alert") {

						this.$api.post('/invoice/save', this.formLabelAlign, r => {
							//console.log('******************')
							// console.log(r)
							this.$router.push("/DailyExpenditureinvoiceManagement")
						}, e => {

							// console.log('我報了錯')
							this.loading = false
						})

					} else {

						if (this.origin_input == '') {
							that.$api.get('/invoice/suppliers/name/' + this.supplier.name, null, r => {
								// this.$router.push("/SystemManagement/UserManagement")
								console.log('執行----' + r.length)
								if (r.length > 0) {

									MessageBox('此name已存在', 'Tips', {
										confirmButtonText: 'OK',
										// cancelButtonText: '取消',
										type: 'warning'
									}).then(() => {
										this.loading = false
										// this.formLabelAlign.stoneDataDto[index].deliveredNumbe = ''
									}).catch(() => {

									});

								} else {

									this.$api.post('/invoice/save', this.formLabelAlign, r => {
										//console.log('******************')
										// console.log(r)
										this.$router.push("/DailyExpenditureinvoiceManagement")
									}, e => {

										// console.log('我報了錯')
										this.loading = false
									})

								}
							});
						} else {

							this.$api.put('/invoice/save', this.formLabelAlign, r => {
								//console.log('******************')
								// console.log(r)
								this.$router.push("/DailyExpenditureinvoiceManagement")
							}, e => {

								// console.log('我報了錯')
								this.loading = false
							})

						}

					}

				}

			},


			submitForm(formLabelAlign) {

				if (this.formLabelAlign.startDate != '' && this.formLabelAlign.startDate != null) {

					this.loading = true

					if (this.type == 'alert') {
						this.$api.post('/PlvRInvoiceEndpoint/update', {

							"location": this.formLabelAlign.location,
							"money": parseFloat(this.formLabelAlign.money),
							"name": this.formLabelAlign.name,
							"onLock": 0,
							"phoneCall": this.formLabelAlign.phoneCall,
							"plvKAssetDictionariesDtoList": this.plvKAssetDictionariesDtoList,
							/* "plvKAssetDictionariesDtoList": [{
								"elseReference": this.uuid,
								"id": 0,
								"plvKAssetReference": this.referenceId,
								"type": '發票文件'
							}] */
							"rapPrice": parseFloat(this.formLabelAlign.rapPrice),
							"invoiceOn": this.formLabelAlign.invoiceOn,
							"reference": this.uuid,
							"startDate": new Date(this.formLabelAlign.startDate).format("yyyy-MM-dd"),
							"unit": this.formLabelAlign.unit,
							"userName": "",
							"userReference": "",
						}, r => {
							//console.log('******************')
							//console.log(r)
							this.$router.push("/DailyExpenditureinvoiceManagement")
						}, e => {

							// console.log('我報了錯')
							this.loading = false

						});
					} else {
						this.$api.post('/PlvRInvoiceEndpoint/save', {

							"location": this.formLabelAlign.location,
							"money": parseFloat(this.formLabelAlign.money),
							"name": this.formLabelAlign.name,
							"onLock": 0,
							"phoneCall": this.formLabelAlign.phoneCall,
							"plvKAssetDictionariesDtoList": this.plvKAssetDictionariesDtoList,
							//plvKAssetDictionariesDtoList:this.plvKAssetDictionariesEntityList,
							/* "plvKAssetDictionariesDtoList": [{
								"elseReference": "",
								"id": 0,
								"plvKAssetReference": this.referenceId,
								"type": "發票文件"
							}] */
							"rapPrice": parseFloat(this.formLabelAlign.rapPrice),
							"invoiceOn": this.formLabelAlign.invoiceOn,
							"reference": '',
							"startDate": this.formLabelAlign.startDate.format("yyyy-MM-dd"),
							"unit": this.formLabelAlign.unit,
							"userName": "",
							"userReference": "",
						}, r => {
							//console.log('******************')
							//console.log(r)
							this.$router.push("/DailyExpenditureinvoiceManagement")
						}, e => {

							// console.log('我報了錯')
							this.loading = false

						});
					}

				} else {
					alert('Time cannot be empty!!!')
				}






			},




			detail() {},
			cancel() {
				this.$router.push("/DailyExpenditureinvoiceManagement")
			},
			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/Function/CustomentManagement")
				} else if (type == 'branch') {
					this.$router.push("/Function/branchManagement")
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.KaiZhiFapiao {

		width: 100%;

		// .el-form-item {
		// 	margin-bottom: 0
		// }

		.table30 {
			width: 30%
		}

		.ml5 {
			margin-left: 5%;
		}

// 		.el-form--label-top .el-form-item__label {
// 			padding: 0
// 		}
//
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
			// box-shadow: 0 2px 4px rgba(0, 0, 0, .06), 0 0 6px rgba(0, 0, 0, .02)
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
			border-bottom: 1px solid black;
			display: inline-block;
			width: 100%;
			height: 25px;
			margin-top: 5px;
			border: 0 1px 0 0;
			background-color: transparent;
		}

		// .el-input__inner {
		// 	// border-width: 0;
		// 	// border-bottom: 1px solid black;
		// 	// display: inline-block;
		// 	// float: left;
		// 	// width: 100%;
		// 	height: 25px;
		// 	// margin-top: 5px;
		// 	// border: 0 1px 0 0;
		// 	border-radius: 0;
  //     border: 0;
  //     border-bottom: 1px solid black;
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



		.el-input.is-disabled .el-input__inner {
			background-color: transparent;
			border-color: black;
			color: black;
			cursor: default;
		}

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

	}
</style>

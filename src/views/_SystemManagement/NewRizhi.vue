<template>
	<div class="NewRizhi">

		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Create / Alert Log</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 450px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">
				<div style="width: 100%; float: left;margin-left: 40%;">
				<!-- <el-form-item label="產品名稱" class=' table30'>
					<el-input class='inputs01' v-model="formLabelAlign.assetRef" :disabled="type=='detail'?true:false"
					 placeholder="Input"></el-input>
				</el-form-item> -->
				<!-- <el-form-item label="客戶名稱" class=' table30'>
					<el-input class='inputs01' v-model="formLabelAlign.customerRef" :disabled="type=='detail'?true:false"
					 placeholder="Input"></el-input>
				</el-form-item> -->
					<el-form-item label="設計代碼" class=' table30'>
						<el-input class='inputs01' v-model="formLabelAlign.proCode" :disabled="type=='detail'?true:false"
						 placeholder="Input" style="width: 300px;float: left;"></el-input>
					</el-form-item>

					<el-form-item label="實物圖" class=' table30 '>

						<el-upload class="avatar-uploader" action="auto" :http-request="uploadSectionFile" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :disabled="type=='detail'?true:false">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>

						<div style="width: 80px;white-space: nowrap;float: left;">
							<span v-if="imageUrl" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;" @click='handlePictureCardPreview("invoice")'>預覽</span>
							<span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
							 @click='handleRemove("invoice")'>刪除</span>
						</div>
						<!-- <span>預覽</span>	 -->

						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>

					</el-form-item>

					<el-form-item label="時間" class='table30'>
						<el-date-picker v-model="formLabelAlign.purchaseTime" type="date" placeholder="Select Date" class='inputs'
						 :disabled="type=='detail'?true:false"  style="width: 300px;float: left;">
						</el-date-picker>
					</el-form-item>
				</div>
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
		name: "NewRizhi",
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
				imageUrl: '',
				dialogImageUrl: '',
				dialogVisible: false,
				loading:false,
				referenceId:'',
				// handlePictureCardPreview:false,
				id: '',
				value1: '',
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				assetRefId:'',
				password: '',
				formLabelAlign: {
					assetRef: '',
					customerRef: '',
					id: '',
					made: '',
					proCode: '',
					purchaseTime: '',
					reference: '',
				},
				options: [{
					id: '1',
					label: 'Telphone'
				}, {
					id: '2',
					label: 'Wechat'
				}, {
					id: '3',
					label: 'QQ'
				}, {
					id: '4',
					label: 'orther'
				}],
			}
		},

		created: function() {
			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid
			this.root=this.$api.root
			// this.name = this.$route.query.name
			if (this.type == 'detail') {
				//console.log('*******')
				//console.log(this.uuid)
				this.$api.post('/RealThing/findByReference?reference=' + this.uuid, null, r => {
					//console.log(r)
					this.formLabelAlign = r
					this.imageUrl = this.root  + r.assetRef
				});
			}
		},

		methods: {

			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
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
			
			//預覽圖片
			handlePictureCardPreview(type) {
				this.dialogImageUrl = this.imageUrl;
				this.dialogVisible = true;
			},
			
			//刪除圖片
			handleRemove(type) {
				// //console.log(file, fileList);
				this.dialogImageUrl = type.imageUrl;
				this.imageUrl=''
				
			},

			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');
				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl = this.root + r.reference
					this.assetRefId = r.reference
					//console.log(r)
				});
			},

			submitForm(formLabelAlign) {
				
				this.loading=true
				this.$api.put('/RealThing/save', {
					"assetRef": this.assetRefId,
					"customerRef": this.uuid,
					"id": 0,
					"made": 0,
					"proCode": this.formLabelAlign.proCode,
					"purchaseTime": this.formLabelAlign.purchaseTime.format("yyyy-MM-dd") ,
					"reference": ""
				}, r => {
					//console.log(r)
					this.$router.push("/Thlog")
					window.history.back(-1)
				},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});

				// 						//console.log({
				// 							"achievement": this.formLabelAlign.achievement,
				// 							"communication": this.formLabelAlign.communication,
				// 							"communicationDate": this.formLabelAlign.communicationDate.format("yyyy-MM-dd"),
				// 							"communicationType": this.formLabelAlign.communicationType,
				// 							"explain": this.formLabelAlign.explain,
				// 							"plvCCustomerReference": this.uuid,
				// 							"reference": '',
				// 							"userName": '',
				// 							"userReference": ''
				// 						})
				// 						
				// 						this.$api.post('/customer/save', {
				// 							"achievement": this.formLabelAlign.achievement,
				// 							"communication": this.formLabelAlign.communication,
				// 							"communicationDate": this.formLabelAlign.communicationDate.format("yyyy-MM-dd"),
				// 							"communicationType": this.formLabelAlign.communicationType,
				// 							"explain": this.formLabelAlign.explain,
				// 							"plvCCustomerReference": this.uuid,
				// 							"reference": '',
				// 							"userName": '',
				// 							"userReference": ''
				// 						}, r => {
				// 							this.$router.push("/SystemManagement/Thlog")
				// 						});
				// 
			},

			detail() {},
			
			cancel() {
				// this.$router.push("/SystemManagement/Thlog")
				window.history.back(-1)
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


	.NewRizhi {

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

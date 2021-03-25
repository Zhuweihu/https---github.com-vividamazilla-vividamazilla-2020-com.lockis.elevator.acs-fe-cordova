<template>
	<div class="shnagzaitupian">
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 380px;">

			<el-form :label-position="labelPosition" placeholder="请输入内容" ref='formLabelAlign' label-width="130px" :model="formLabelAlign">
				<div style="width: 100%; float: left;margin-left: 33%;">

					<el-form-item label="Design code:" class='mat20'>
						<el-input v-model="formLabelAlign.recordOne" placeholder="请输入内容" class='inputs' style="width: 300px;float: left;"></el-input>
					</el-form-item>
					<el-form-item label="Product:" class='mat20'>
						<el-input v-model="formLabelAlign.recordTwo" placeholder="请输入内容" class='inputs' style="width: 300px;float: left;"></el-input>
					</el-form-item>
					<!-- <el-form-item label="設計日期" class='mat20'>
						<el-date-picker v-model="formLabelAlign.bigDay" type="date" placeholder="选择日期" style="float: left;width: 300px;">
						</el-date-picker>
					</el-form-item> -->

					<el-form-item label="Upload" class='mat20'>
						<!-- <el-upload action="auto" :http-request="uploadSectionFile" list-type="picture-card" :on-preview="handlePictureCardPreview"
						 :on-remove="handleRemove" style="float: left;">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog> -->

						<!-- <el-upload class="avatar-uploader" action="auto" :http-request="uploadSectionFile" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload> -->

						<el-upload class="avatar-uploader" action="auto" :http-request="uploadSectionFile" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>

						<div style="width: 80px;white-space: nowrap;float: left;">
							<span v-if="imageUrl" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
							 @click='handlePictureCardPreview("invoice")'>Preview</span>
							<span v-if="imageUrl&&(type!='detail'?true:false)" style="float: left;padding-left: 10px;color: #409EFF;cursor: pointer;"
							 @click='handleRemove("invoice")'>delete</span>
						</div>
						<!-- <span>預覽</span>	 -->
						
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
				</div>
			</el-form>
		</div>

		<div class='mat20' style="margin-left: 35%;">
			<el-button :loading="loading" class='button' type="primary" style="background: rgb(253,99,99);border:none;font-size: 18px;" @click="submitForm('formLabelAlign')">Submit</el-button>
			<el-button class='button' type="primary" style="background: rgb(253,99,99);border:none;font-size: 18px;" @click="cancel()">Return</el-button>
		</div>


	</div>

</template>

<script>
	export default {
		name: "UserManagement",
		data() {
			return {
				root: 'http://192.168.101.5:8080/RESTful/kernal/asset/',
				imageUrl: '',
				labelPosition: '',
				referenceId:'',
				dialogImageUrl: '',
				type: "",
				dialogVisible: false,
				loading:false,
				formLabelAlign: {
					"elseReference": '',
					"id": '',
					"plvKAssetReference": '',
					"recordOne": '',
					"recordTwo": '',
					"type": ''
				},
			}


		},

		created: function() {
			this.type = this.$route.query.type
			this.root=this.$api.root
			this.search()


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
				// console.log(file, fileList);
				
				this.dialogImageUrl = type.imageUrl;
				this.imageUrl=''
				
			},

			// 						handleRemove(file, fileList) {
			// 							console.log(file, fileList);
			// 						},
			// 						handlePictureCardPreview(file) {
			// 							this.dialogImageUrl = file.url;
			// 							this.dialogVisible = true;
			// 						},

			uploadSectionFile(param) {
				let bodyFormData = new FormData();
				bodyFormData.append("file", param.file);
				bodyFormData.append("type", 'BRAND');

				this.$api.post('/kernal/asset/retain', bodyFormData, r => {
					this.imageUrl = this.root + '/kernal/asset/' + r.reference
					this.referenceId = r.reference

					console.log(r)
				});
			},

			
			submitForm(formLabelAlign) {
				this.loading=true
				this.$api.post('/Design/saveAssetDictionaries/',{
					"elseReference": "",
					"id": 0,
					"plvKAssetReference": this.referenceId,
					"recordOne": this.formLabelAlign.recordOne,
					"recordTwo": this.formLabelAlign.recordTwo,
					"type": "成品"
				}, r => {
					console.log(r)
					this.loading=false
					this.$router.push("/CustomerList")
				},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
				
			},

			search() {

			},

			onSubmit() {
				this.page01 = 1
				this.search()
			},


			return_cancelCancel() {
				this.reserve_Processing = false
			},



			// 批次翻頁
			pages02(val) {
				// console.log(val)
				this.page01 = val
				this.search()
			},
			// 返回
			cancel() {
				this.$router.push("/JewelryDesign")
			},

			usercreate() {
				this.$router.push("/shnagzaitupian")
			},
			details(uuid) {
				this.$router.push("/KedanXinzeng?type=detail&uuid=" + uuid)
			},
			modify(uuid) {
				this.$router.push("/KedanXinzeng?type=alert&uuid=" + uuid)
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/SystemManagement/CustomerOrderManagement")
				} else if (type == 'grounp') {
					console.log('00000000')
					this.$router.push("/SystemManagement/JewelryDesign")
				}
			}

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.shnagzaitupian {



		// 		.el-form-item {
		// 			margin-bottom: 0;
		// 			float: left;
		// 		}
		// 		
		// 		.table50{
		// 			width: 30%;
		// 			float: left
		// 		}
		// 		
		// 		.m30{
		// 			margin-left: 5%;
		// 			float: left
		// 		}

		.avatar-uploader .mat20 {
			margin-top: 100px;
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
			width: 300px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}

		.avatar {
			width: 300px;
			height: 178px;
			display: block;
		}

		.button {
			// width: 191px;
			padding: 0 10px;
			height: 48px;
			font-size: 21px;
			// line-height: 48px;
			background: $navHoverTextColor;
			border: 0;
			margin-top: 30px;
		}

	}
</style>

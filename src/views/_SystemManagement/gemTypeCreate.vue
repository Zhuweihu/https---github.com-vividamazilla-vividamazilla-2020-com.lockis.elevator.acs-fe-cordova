<template>
	<div class="specialCreate" v-loading='all_loading' style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">



		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

			<div style="width: 100%;color: white;background: rgb(0,191,255);line-height: 30px;margin-bottom: 15px;" v-show="ifGRS=='GIA'">
				<strong style="margin-left: 10px;">Gem Type</strong>
			</div>

			<!-- <el-upload class="avatar-uploader" style='margin-left: 20px;' action="auto" :show-file-list="false" :http-request="uploadSectionFile">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload> -->

      <el-form-item label="Image Url">
        <el-input type="text" v-model="ruleForm.image" :disabled="type=='detail'"></el-input>
      </el-form-item>

      <el-form-item label="Name" prop="name">
        <el-input type="text" v-model="ruleForm.name" :disabled="type=='detail'"></el-input>
      </el-form-item>

      <!-- <el-form-item prop="name" style='height: 30px;margin-top: 10px;' class='errors'>
      	<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Image Url：</strong>
      	<el-input v-model="ruleForm.image" style='width: 300px;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
      </el-form-item> -->

			<!-- <el-form-item prop="name" style='height: 30px;margin-top: 10px;' class='errors'>
				<strong style="float: left;line-height: 30px;margin-left: 20px;font-size: 16px;">Name：</strong>
				<el-input v-model="ruleForm.name" style='width: 300px;margin: 2.5px;margin-right: 20px;' placeholder="Input"></el-input>
			</el-form-item> -->



			<el-form-item style='text-align: center;margin-top: 40px;'>
				<el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
				<el-button type="primary" @click="cancel('ruleForm')">Back</el-button>
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
				type: '',
				value: '',
				imageUrl: '',
				root: '',
				ruleForm: {
					"enable": 1,
					"image": "",
					"name": "",
					reference:null,
					id:null
				},
				all_loading: false,
				ifGRS: 'GIA',
				rules: {

					name: [{
						required: true,
						message: 'Please input name',
						trigger: 'blur'
					}],

				}
			};
		},

		created: function() {

			this.root = this.$api.root
			this.type = this.$route.query.type

			if (this.type == 'alter') {

				this.imageUrl=this.$route.query.img
				this.ruleForm.image=this.$route.query.img
				this.ruleForm.reference=this.$route.query.id
				this.ruleForm.name=this.$route.query.name
			}

		},

		methods: {
			cancel(){
				history.back(-1)
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {

						// alert('submit!');

						if (this.type == 'new') {

							this.$api.put('/inventory/gem/type', this.ruleForm, r => {
								console.log(r)
								history.back(-1)
							});

						}else if (this.type == 'alter') {

							console.log(this.ruleForm)
							this.$api.post('/inventory/gem/type', this.ruleForm, r => {
								console.log(r)
								history.back(-1)
							});
						}

						// console.log(this.ruleForm)



					} else {
						console.log('error submit!!');
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
					this.ruleForm.image = 'http://dev-Plv.vividamazilla.com/daf8ae263442d9015b0d09691d87478b/kernal/asset/'+r.reference
					//console.log(r)
				});
			},
			beforeAvatarUpload() {},
			handleAvatarSuccess() {},
			resetForm(formName) {
				this.$refs[formName].resetFields();
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

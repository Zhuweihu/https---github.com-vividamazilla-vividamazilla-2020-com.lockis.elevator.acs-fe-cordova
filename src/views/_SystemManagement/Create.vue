<template>
	<div class="UserCreates">

		<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">User</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>

				<el-col :span="8">
					<span class="fl">Nickname：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.nickname" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Mobile：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.mobile" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Family：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.family" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>
				
				<el-col :span="8">
					<span class="fl">Given：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.given" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				
				<el-col :span="8">
					<span class="fl">Email：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.email" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Identifier：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.identifier" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				
				
				
				<el-col :span="8">
					<span class="fl">Middle：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.middle" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>
				

				<el-col :span="8" v-show="type=='new'">
					<span class="fl">Password：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.password" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Birth：</span>
					<p style="overflow: hidden;">
						<el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.birth" type="date" style='width: 100%;' class='inputs01' :disabled="type=='detail'?true:false"
						 placeholder="select date">
						</el-date-picker>
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">State：</span>
					<p style="overflow: hidden;">
						<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
					</p>
				</el-col>



			</el-row>
		</div>

		<!-- ||||||||||||||||||||| -->

		<div style="width:100%;text-align: center;margin-top: 45px;float: left;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading"  type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button  type="primary" @click="cancel()">Back</el-button>
			<!-- </el-form-item> -->
		</div>


	</div>

</template>

<script>
	export default {
		name: "UserCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				console.log(value)

				if (value != '') {
					this.$api.get('/member/seekIdentifier/' + value, null, r => {
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
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				activateds: false,
				loading: false,
				formLabelAlign: {
					"activated": 0,
					"birth": "",
					"email": "",
					"family": "",
					"given": "",
					"id": 0,
					"identifier": "",
					"identity": "EMAIL",
					"locale": "",
					"middle": "",
					"mobile": "",
					"nickname": "",
					"password": "",
					"reference": "",
					"validated": 0,
				},

				options: [{
					id: '1',
					label: '權限1'
				}, {
					value: '2',
					label: '權限2'
				}],
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
			this.type = this.$route.query.type
			if (this.type == 'detail') {
				this.$api.get('/member/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					this.activateds = r.activated == 0 ? true : false
					console.log(r)
				});
			} else if (this.type == 'alert') {
				this.$api.get('/member/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// this.password = r.password

					this.activateds = r.activated == 0 ? true : false
				});
				this.uuid = this.$route.query.uuid
			}
		},

		methods: {


			submitForm(formLabelAlign) {
				
				
				// if (this.formLabelAlign.nickname == '' || this.formLabelAlign.mobile == '' || this.formLabelAlign.family == '' ||
				// 	this.formLabelAlign.email == '' || this.formLabelAlign.identifier == '' || this.formLabelAlign.password == '' ||
				// 	this.formLabelAlign.birth == '') {
				// 	alert('内容不能填空');
				// }
				
				
				if (this.formLabelAlign.nickname == ''||this.formLabelAlign.nickname == null) {
					console.log('01')
					this.formLabelAlign.nickname = ''
					alert('Please input nickname');
				}else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.mobile))) {
					this.formLabelAlign.mobile=''
					alert('Please input mobile');
				}else if (this.formLabelAlign.family == ''||this.formLabelAlign.family == null) {
					this.formLabelAlign.family = ''
					alert('Please input family');
				}else if (this.formLabelAlign.email == ''||this.formLabelAlign.email == null) {
					this.formLabelAlign.email = ''
					alert('Please input email');
				}else if (this.formLabelAlign.identifier == ''||this.formLabelAlign.identifier == null) {
					this.formLabelAlign.identifier = ''
					alert('Please input identifier');
				}else if (this.formLabelAlign.password == ''||this.formLabelAlign.password == null) {
					this.formLabelAlign.password = ''
					alert('Please input password');
				}else if (this.formLabelAlign.birth == ''||this.formLabelAlign.birth == null) {
					this.formLabelAlign.birth=''
					alert('Please input birth');
				} else {
					
					this.formLabelAlign.mobile = parseInt(this.formLabelAlign.mobile)
					this.formLabelAlign.birth = new Date(this.formLabelAlign.birth).format("yyyy-MM-dd")

					if (this.uuid != '') {

						if (this.activateds == true) {
							this.formLabelAlign.activated = 0
						} else {
							this.formLabelAlign.activated = 1
						}

						this.loading = true
						console.log(this.formLabelAlign)
						this.$api.post('/member/save', this.formLabelAlign, r => {
							history.back(-1)
						});

					} else {

						if (this.activateds == true) {
							this.formLabelAlign.activated = 0
						} else {
							this.formLabelAlign.activated = 1
						}
						
						if(this.type=='new'){
							console.log(this.formLabelAlign)
							this.$api.put('/member/save', this.formLabelAlign, r => {
								history.back(-1)
							});
						}else{
							console.log(this.formLabelAlign)
							this.$api.post('/member/save', this.formLabelAlign, r => {
								history.back(-1)
							});
						}
						
						
						// this.$api.get('/member/seekIdentifier/' + this.formLabelAlign.identifier, null, r => {
						// 	if (r == false) {
						// 		alert('用戶名已存在');
						// 	} else {
						// 		this.loading = true
						// 		this.$api.post('/member/save', this.formLabelAlign, r => {
						// 			this.$router.push("/UserManagement")
						// 		});
						// 	}
						// });

					}

				}

			},

			detail() {},
			cancel() {
				history.back(-1)
				// this.$router.push("/UserManagement")
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

	.UserCreates {

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

		.el-input__inner {
			border-width: 0;
			border-bottom: 1px solid black;
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

	}
</style>

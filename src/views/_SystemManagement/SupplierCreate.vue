<template>
	<div class="UserCreates">

		<!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">Supplier</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div> -->
		<!-- ||||||||||||||||||||| -->
		<div>

        <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">

              <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">

              <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
                <strong style="margin-left: 10px;">Supplier</strong>
              </div>

              <el-form-item label="Name">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.name" :disabled="type=='detail'"></el-input>
              </el-form-item>

              <el-form-item label="Tel">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.contact" :disabled="type=='detail'"></el-input>
              </el-form-item>

              <!-- <el-form-item label="Email">
                <el-input type="text" v-model="formLabelAlign.contact" :disabled="type=='detail'"></el-input>
              </el-form-item> -->

              <el-form-item label="Address">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item>

             <!-- <el-form-item label="Bank">
                <el-input type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="Contact 1">
                <el-input type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="Tel 1">
                <el-input type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item>
 -->
              <!-- <el-form-item label="Bank Name">
                <el-input type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="Contact 2">
                <el-input type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="Tel 2">
                <el-input type="text" v-model="formLabelAlign.addr" :disabled="type=='detail'"></el-input>
              </el-form-item> -->

              <!-- <el-form-item label="Day of payment">
                <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.birth" type="date" style='width: 100%;' class='inputs01' :disabled="type=='detail'?true:false"
                 placeholder="select date">
                </el-date-picker>
              </el-form-item> -->

              <el-form-item label="Enable">
                <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
              </el-form-item>

              </el-form>

        </div>


			<!-- <el-row style='line-height: 35px;'>

				<el-col :span="8">
					<span class="fl">Name：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.name" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Tel：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.contact" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

        <el-col :span="8">
        	<span class="fl">Email：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.contact" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

				<el-col :span="8">
					<span class="fl">Address：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

        <el-col :span="8">
        	<span class="fl">Bank：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">No：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">Contact 1：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">Tel：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">Bank Name：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">Contact 2：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">Tel：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.addr" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col>

        <el-col :span="8">
        	<span class="fl">Day of payment：</span>
        	<p style="overflow: hidden;">
        		<el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.birth" type="date" style='width: 100%;' class='inputs01' :disabled="type=='detail'?true:false"
        		 placeholder="select date">
        		</el-date-picker>
        	</p>
        </el-col>

			</el-row> -->
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<!-- <el-row style='line-height: 35px;'>



				<el-col :span="8">
					<span class="fl">Enable：</span>
					<p style="overflow: hidden;">
						<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
					</p>
				</el-col>



			</el-row> -->
		</div>

		<!-- ||||||||||||||||||||| -->

		<div style="width:100%;text-align: center;margin-top: 45px;float: left;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading" type="primary" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
			<el-button type="primary" @click="cancel()">Back</el-button>
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
				type: "",
				uuid: '',
				password: '',
				activateds: true,
				loading: false,
				formLabelAlign: {
					"addr": "",
					"contact": "",
					"enable": 1,
					"id": 0,
					"name": "",
					"reference": null
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

			if(this.type == 'alert'){
				this.uuid = this.$route.query.uuid
				this.formLabelAlign.addr=this.$route.query.addr,
				this.formLabelAlign.contact= this.$route.query.contact,
				this.formLabelAlign.enable= parseInt(this.$route.query.enable),
				this.formLabelAlign.id= 0,
				this.formLabelAlign.name= this.$route.query.name,
				this.formLabelAlign.reference= this.$route.query.uuid

				if(this.formLabelAlign.enable==1){
					this.activateds=true
				}

			}

			// 			if (this.type == 'detail') {
			// 				this.$api.get('/member/' + this.$route.query.uuid, null, r => {
			//
			// 					this.formLabelAlign = r
			// 					this.activateds = r.activated == 0 ? true : false
			// 					console.log(r)
			// 				});
			// 			} else if (this.type == 'alert') {
			// 				this.$api.get('/member/' + this.$route.query.uuid, null, r => {
			//
			// 					this.formLabelAlign = r
			//
			//
			// 					this.activateds = r.activated == 0 ? true : false
			// 				});
			// 				this.uuid = this.$route.query.uuid
			// 			}
		},

		methods: {


			submitForm(formLabelAlign) {


				// if (this.formLabelAlign.nickname == '' || this.formLabelAlign.mobile == '' || this.formLabelAlign.family == '' ||
				// 	this.formLabelAlign.email == '' || this.formLabelAlign.identifier == '' || this.formLabelAlign.password == '' ||
				// 	this.formLabelAlign.birth == '') {
				// 	alert('内容不能填空');
				// }


				if (this.formLabelAlign.name == '' || this.formLabelAlign.name == null) {
					console.log('01')
					this.formLabelAlign.name = ''
					alert('Please input name');
				} else if (this.formLabelAlign.contact == '' || this.formLabelAlign.contact == null) {
					this.formLabelAlign.contact = ''
					alert('Please input contact');
				} else if (this.formLabelAlign.addr == '' || this.formLabelAlign.addr == null) {
					this.formLabelAlign.addr = ''
					alert('Please input addr');
				} else {



					if (this.uuid != '') {

						if (this.activateds == true) {
							this.formLabelAlign.enable = 1
						} else {
							this.formLabelAlign.enable = 0
						}

						this.loading = true
						console.log(this.formLabelAlign)
						this.$api.post('/invoice/supplier/save', this.formLabelAlign, r => {
							history.back(-1)
						});

					} else {

						if (this.activateds == true) {
							this.formLabelAlign.enable = 1
						} else {
							this.formLabelAlign.enable = 0
						}

						if (this.type == 'new') {
							console.log('new')
							console.log(this.formLabelAlign)
							this.$api.put('/invoice/supplier/save', this.formLabelAlign, r => {
								history.back(-1)
							});
						} else {
							console.log('lese')
							console.log(this.formLabelAlign)
							this.$api.post('/invoice/supplier/save', this.formLabelAlign, r => {
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

		// .el-form-item {
		// 	margin-bottom: 0
		// }

		.table30 {
			width: 30%
		}

		.ml5 {
			margin-left: 5%;
		}

		// .el-form--label-top .el-form-item__label {
		// 	padding: 0
		// }

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



		// .el-input.is-disabled .el-input__inner {
		// 	background-color: transparent;
		// 	border-color: black;
		// 	color: black;
		// 	cursor: default;
		// }

	}
</style>

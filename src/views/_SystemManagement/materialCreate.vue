<template>
	<div class="UserCreates">

    <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
      <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">
        <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
          <strong style="margin-left: 10px;">Material</strong>
        </div>

        <el-form-item label="Name">
          <el-input placeholder="input" type="text" v-model="formLabelAlign.name" :disabled="type=='detail'"></el-input>
        </el-form-item>

        <el-form-item label="Color">
          <el-select clearable @change="clear_referce()" v-model="currency" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
          	<el-option v-for="item in unit" :label="item.name" :value="item.reference">
          	</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Activate">
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </el-form-item>

      </el-form>
    </div>


		<!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
			<span class="fl" style="padding: 0 5px;">Material</span>
			<div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
		</div> -->

		<!-- ||||||||||||||||||||| -->
		<!-- <div>
			<el-row style='line-height: 35px;'>



				<el-col :span="8" >
					<span class="fl">Name：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.name" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

        <el-col :span="8">
        	<span class="fl">Color：</span>
        	<p style="overflow: hidden;">
        		<el-select clearable @change="clear_referce()" v-model="currency" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
        			<el-option v-for="item in unit" :label="item.name" :value="item.reference">
        			</el-option>
        		</el-select>
        	</p>
        </el-col>

				<el-col :span="8">
					<span class="fl">Activate：</span>
					<p style="overflow: hidden;">
						<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
					</p>
				</el-col>



			</el-row>
		</div> -->

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
				activateds: true,
				loading: false,

        currency:"",
        unit:[],
				formLabelAlign: {
          "color": {
            "reference": ""
          },
				  "enable": 1,
				  "id": 0,
				  "reference": null,
				  "name": ""
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

      this.$api.get('/miscellaneous/material/color', null, r => {

        this.unit=r

      });

			this.type = this.$route.query.type
			if (this.type == 'detail') {
				this.$api.get('/miscellaneous/orderstatus/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					this.activateds = r.enable == 1 ? true : false
					// //console.log(r)
				});
			} else if (this.type == 'alert') {

				this.$api.get('/miscellaneous/material/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// this.password = r.password
          this.currency=r.color.name
					this.activateds = r.enable == 1 ? true : false
				});
				this.uuid = this.$route.query.uuid
			}


		},

		methods: {

       clear_referce(){

         this.formLabelAlign.color.reference=""

       },

			submitForm(formLabelAlign) {

          if(this.formLabelAlign.color.reference==""){
            this.formLabelAlign.color.reference=this.currency
          }

					if (this.uuid != '') {

						if (this.activateds == true) {
							this.formLabelAlign.enable = 1
						} else {
							this.formLabelAlign.enable = 0
						}

						this.loading = true
						this.$api.post('/miscellaneous/material', this.formLabelAlign, r => {
							// this.$router.push("/orderstatusManagement")
              history.back(-1)
						});

					} else {

						if (this.activateds == true) {
							this.formLabelAlign.enable = 1
						} else {
							this.formLabelAlign.enable = 0
						}

						this.$api.put('/miscellaneous/material', this.formLabelAlign, r => {
							// this.$router.push("/orderstatusManagement")
              history.back(-1)
						});

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



			},

			detail() {},
			cancel() {
				// this.$router.push("/orderstatusManagement")
        history.back(-1)
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

// 		.el-input__inner {
// 			// border-width: 0;
// 			// border-bottom: 1px solid black;
// 			// display: inline-block;
// 			// float: left;
// 			// width: 100%;
// 			height: 25px;
// 			// margin-top: 5px;
// 			// border: 0 1px 0 0;
// 			border-radius: 0;
//       border: 0;
//       border-bottom: 1px solid black;
// 			background-color: transparent;
// 		}
//
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

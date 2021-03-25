<template>
	<div class="ResetPass">

		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Reset</span>
		</div>
		
		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 220px;">		
			<div style="width: 100%; float: left;">
				<el-form label-position="top" ref='formLabelAlign'  :model="formLabelAlign" :rules="rules" >
					<!-- <el-form-item label="Name" class='mat20'>
						<el-input v-model="formLabelAlign.nickname" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					</el-form-item> -->
					<!-- <el-form-item label="User" class='mat20'>
						<el-input class='inputs' v-model="formLabelAlign.identifier" :disabled='true'></el-input>
					</el-form-item> -->
					
					<el-form-item label="Current Password" class='mat20 fl table30'  >
						<el-input type="password" class='inputs' v-model="formLabelAlign.password"></el-input>
					</el-form-item>
					<el-form-item label="New Password" class='mat20 fl table30' >
						<el-input type="password" class='inputs' v-model="formLabelAlign.password01"></el-input>
					</el-form-item>
					<el-form-item label="Re-enter Password" class='mat20 fl table30' >
						<el-input type="password" class='inputs' v-model="formLabelAlign.password02"></el-input>
					</el-form-item>
					

				</el-form>



			</div>

			<div style="width:88%;text-align: center;margin-top: 45px;float: left;">
				<!-- <el-form-item class='mat20' > -->
				<el-button :loading="loading"  type="primary" @click="submitForm('formLabelAlign')">Submit</el-button>
				<el-button  type="primary" @click="cancel()">Back</el-button>
				<!-- </el-form-item> -->
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		name: "ResetPass",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.get('/userNameInspect /' + value + '/', null, r => {
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
				activateds:false,
				loading:false,
				formLabelAlign: {
					// identifier: 0,
					password:'',
					password01: '',
					password02: '',
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
			this.formLabelAlign.identifier = this.$route.query.name
			
			

// 			if (this.type == 'detail') {
// 				this.$api.get('/member/seekReference/' + this.$route.query.uuid, null, r => {
// 					// this.$router.push("/SystemManagement/UserManagement")
// 					this.formLabelAlign = r
// 					this.activateds = r.activated == 0 ? true : false
// 					// //console.log(r)
// 				});
// 			} else if (this.type == 'alert') {
// 				this.$api.get('/member/seekReference/' + this.$route.query.uuid, null, r => {
// 					// this.$router.push("/SystemManagement/UserManagement")
// 					this.formLabelAlign = r
// 					// this.password = r.password
// 					
// 					this.activateds = r.activated == 0 ? true : false
// 				});
// 				this.uuid = this.$route.query.uuid
// 			}
		},

		methods: {
			submitForm(formLabelAlign) {
				
				this.loading=true
				
				
				if(this.formLabelAlign.password01!=''&&this.formLabelAlign.password02!=''&&this.formLabelAlign.password!=''){
					
									if(this.formLabelAlign.password01 == this.formLabelAlign.password02){
										console.log('00000')
										
										this.$api.post('/member/password/'+this.formLabelAlign.password+'/alter/'+this.formLabelAlign.password01, {
					// 						'identifier' : this.formLabelAlign.identifier,
					// 						'password' : this.formLabelAlign.password01,
											
										} , r => {
											
											var today = new Date();
											var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24*0.1;
											today.setTime(targetday_milliseconds);
											document.cookie="accessToken=v;expires="+today.toUTCString();
											
											this.$auth.logout()
											
											console.log(r)
											// this.$router.push("/UserManagement")
										},e=>{
										
										// console.log('我報了錯')
										this.loading=false
										
									})
										
									}else{
										alert('Inconsistent password！')
									}
					
				}else{
					alert('Can not be empty！')
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

	.ResetPass {

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

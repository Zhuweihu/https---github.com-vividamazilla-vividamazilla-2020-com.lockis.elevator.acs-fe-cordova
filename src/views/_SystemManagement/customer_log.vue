<template>
	<div class="UserCreate">
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
			<span style="float: left;font-size: 16px;">>>>Create / Alert User</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				<el-form-item label="Name" class='mat20 fl table30'>
					<el-input v-model="formLabelAlign.nickname" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<!-- <el-form-item label="ID card" class='fl table30 ml5'>
					<el-input v-model="formLabelAlign.identity" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item> -->
				<el-form-item label="Telphone" class='mat20 fl table30 ml5'>
					<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobile" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)"
					 onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Address" class='mat20 fl table30 ml5'>
					<el-input class='inputs' v-model="formLabelAlign.locale" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Email" class='mat20 fl table30'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.email" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="User Name" class='mat20 fl table30 ml5' prop="userName">
					<el-input class='inputs' v-model="formLabelAlign.identifier" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Password" class='mat20 fl table30 ml5'>
					<el-input class='inputs' v-model="formLabelAlign.password" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="生日" class='mat20 fl table30'>
					<!-- <el-input class='inputs' v-model="formLabelAlign.birth" :disabled="type=='detail'?true:false"></el-input> -->
					<el-date-picker v-model="formLabelAlign.birth" type="date" placeholder="重要日期" style="float: left;width: 300px;"
					 :disabled="type=='detail'?true:false">
					</el-date-picker>
				</el-form-item>
				<!-- <el-form-item label="Jurisdiction" class='mat20 fl table30 ml5'>
					<el-select class='inputs' v-model="formLabelAlign.jurisdiction" placeholder="Select" style='float: left;' :disabled="type=='detail'?true:false">
						<el-option v-for="(item,index) in options" :label="item.label" :value="label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="Group" class='mat20 fl table30 ml5'>
					<el-select class='inputs' v-model="formLabelAlign.group_" placeholder="Select" style='float: left;' :disabled="type=='detail'?true:false">
						<el-option  v-for="(item,index) in option" :label="item.label" :value="label">
						</el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="State" class='mat20 fl table30 ml5' style='margin-bottom: 20px;'>
					<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
				</el-form-item>


			</el-form>



		</div>

		<div style="width:100%;text-align: center;margin-top: 45px;float: left;">
			<!-- <el-form-item class='mat20' > -->
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
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
				this.$api.get('/member/seekReference/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					this.activateds = r.activated == 0 ? true : false
					// //console.log(r)
				});
			} else if (this.type == 'alert') {
				this.$api.get('/member/seekReference/' + this.$route.query.uuid, null, r => {
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
				
				this.formLabelAlign.mobile = parseInt(this.formLabelAlign.mobile)
				this.formLabelAlign.birth = new Date(this.formLabelAlign.birth).format("yyyy-MM-dd")
				
				if (this.uuid != '') {

					if(this.activateds == true ){
						this.formLabelAlign.activated = 0
					}else {
						this.formLabelAlign.activated = 1
					}
					
					this.$api.post('/member/update', this.formLabelAlign, r => {
						this.$router.push("/UserManagement")
					});


				} else {
					
					if(this.activateds == true ){
						this.formLabelAlign.activated = 0
					}else {
						this.formLabelAlign.activated = 1
					}
					
					this.$api.post('/member/save', this.formLabelAlign, r => {
						this.$router.push("/UserManagement")
					});
				}
			},



			detail() {},
			cancel() {
				this.$router.push("/UserManagement")
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

	.UserCreate {

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
			height: 48px;
			font-size: 21px;
			padding: 0 10px;
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

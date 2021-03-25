<template>
	<div class="branchCreate">
		<!-- <el-row>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="background:white;height: 60px;">

					<div class="second_menu">
						<span @click="topage('user')">用戶管理</span>
					</div>

					<div class="second_menu">
						<span @click="topage('grounp')">群組管理</span>
					</div>

					<div class="second_menu selector">
						<span>分行管理</span>
					</div>
				</div>
			</el-col>
		</el-row> -->

		<div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">>>>Create / Alert Branch</span>
		</div>

		<div style="padding: 20px 0;border-radius: 10px;padding: 20px;height: 440px;" class="form_bg">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">

				<el-form-item label="Branch" class='fl' style='width: 50%;'>
					<el-input v-model="formLabelAlign.name" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Address" class='fl' style='width: 50%;'>
					<el-input v-model="formLabelAlign.address" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Telphone" class='mat20 fl ' style='width: 50%;'>
					<el-input class='inputs' v-model="formLabelAlign.telephone" :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.telephone"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
				</el-form-item>
				<el-form-item label="Fax" class='mat20 fl ' style='width: 50%;'>
					<el-input class='inputs' v-model="formLabelAlign.fax" :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.fax"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
				</el-form-item>
				<el-form-item label="Responsible" class='mat20 fl' style='width: 50%;'>
					<el-input class='inputs' v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Website" class='mat20 fl ' style='width: 50%;'>
					<el-input class='inputs' v-model="formLabelAlign.internetSite" :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.internetSite"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
				</el-form-item>
				<el-form-item label="Email" class='mat20 fl ' style='width: 50%;'>
					<el-input class='inputs' v-model="formLabelAlign.email" :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.email"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
				</el-form-item>



			</el-form>
		</div>

		<div class="testC" style="width: 100%;margin-top: 55px;">

			<el-button style='background: rgb(253,99,99);' class='button' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button style='background: rgb(253,99,99);' class='button' type="primary" @click="cancel()">Return</el-button>

		</div>

	</div>

</template>

<script>
	export default {
		name: "branchCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect /' + value + '/', null, r => {
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
				id: '',
				password: '',
				formLabelAlign: {
					"address": "",
					"email": "",
					"fax": "",
					"id": 0,
					"internetSite": "",
					"name": "",
					"pNum": 0,
					"principal": "",
					"reference": "",
					"telephone": ""
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
				this.$api.post('/seeku/' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r
					this.formLabelAlign.employ = r.employ == 0 ? true : false
				});
			} else if (this.type == 'Alter') {
				//console.log('1111')
				this.$api.post('/Branch/findOne?reference=' + this.$route.query.uuid, null, r => {
					this.formLabelAlign = r
				});
				this.uuid = this.$route.query.uuid
				this.id = this.$route.query.id
			}
		},

		methods: {
			submitForm(formLabelAlign) {
				if (this.uuid != '') {
					// //console.log('01')
					this.$api.put('/Branch/update', {
					"address": this.formLabelAlign.address,
					"email": this.formLabelAlign.email,
					"fax": this.formLabelAlign.fax,
					"id": this.formLabelAlign.id,
					"internetSite": this.formLabelAlign.internetSite,
					"name": this.formLabelAlign.name,
					"pNum": this.formLabelAlign.pNum,
					"principal": this.formLabelAlign.principal,
					"reference": this.formLabelAlign.reference,
					"telephone": this.formLabelAlign.telephone
				}, r => {
						this.$router.push("/branchManagement")
					});
				} else {

					// //console.log('02')
					this.$api.put('/Branch/insert', {
					"address": this.formLabelAlign.address,
					"email": this.formLabelAlign.email,
					"fax": this.formLabelAlign.fax,
					"id": 0,
					"internetSite": this.formLabelAlign.internetSite,
					"name": this.formLabelAlign.name,
					"pNum": 0,
					"principal": this.formLabelAlign.principal,
					"reference": "",
					"telephone": this.formLabelAlign.telephone
				}, r => {
						this.$router.push("/branchManagement")
					});
				}
			},

			detail() {},
			cancel() {
				this.$router.push("/branchManagement")
			},
			topage(type) {
				if (type == 'user') {
					this.$router.push("/UserManagement")
				} else if (type == 'grounp') {
					this.$router.push("/CustomentManagement")
				}
			},

		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.branchCreate {

		.el-form-item {
			margin-bottom: 0
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
			width: 300px;
			float: left;
			// margin: 0 auto
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

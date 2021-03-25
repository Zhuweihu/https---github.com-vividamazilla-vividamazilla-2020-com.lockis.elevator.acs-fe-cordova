<template>
	<div class="transfer">
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
			<span style="float: left;font-size: 16px;">>>>Transfer</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				
				
				<el-form-item label="Name" class='mat20 fl table30'>
					<el-select style='height: 48px;width: 130px;' v-model="branch">
						<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
					</el-select>
				</el-form-item>


			</el-form>



		</div>

		<div style="width:100%;text-align: center;margin-top: 45px;float: left;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading"  type="primary" @click="submitForm('formLabelAlign')">Submit</el-button>
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
				branch:'',
				branch_list: [],
				proid:'',
				type: "detail",
				uuid: '',
				password: '',
				activateds:false,
				loading:false,
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
			this.findAllEntrepot()
			this.proid=this.$route.query.reference
		},

		methods: {
			
			findAllEntrepot() {
				this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
					this.branch_list = r.content,
						this.branch = r.content[0].name
						// this.branchId== r.content[0].reference
					// this.search()
				});
			},
			
			// findAllEntrepot() {
			// 	
			// 	this.$api.get('/inventory/findAllEntrepot', null, r => {
			// 		
			// 		
			// 		
			// 		
			// 		this.branch_list = r.content,
			// 			this.branch = r.content[0].name
			// 		
			// 	});
			// },
			
			
			
			submitForm(formLabelAlign) {
				// 
				// this.loading=true
				// 
				// 
				// 		
				// 		this.formLabelAlign.mobile = parseInt(this.formLabelAlign.mobile)
				// 		this.formLabelAlign.birth = new Date(this.formLabelAlign.birth).format("yyyy-MM-dd")
						
						var entrepot=''
						for (let i = 0; i < this.branch_list.length; i++) {
							
							if(this.branch==this.branch_list[i].name){
								entrepot=this.branch_list[i].reference
							}
							
						}
						
							
							this.$api.put('/inventory/transfer?branch=' + entrepot, 
							
								{
								  "referenceDtoList": [
									{
									  "reference":  this.proid
										// "reference":  entrepot
									}
								  ]
								}
							
							, r => {
								
								console.log(r)
								
								if(r){
									window.history.back(-1)
								}else{
									alert('轉移失敗')
								}
								
								// window.history.back(-1)
								
								
								
								
								// //console.log(r)
								// if (r == false) {
								// 	alert('用戶名已存在');
								// } else {
								// 	this.$api.post('/member/save', this.formLabelAlign, r => {
								// 		this.$router.push("/UserManagement")
								// 	});
								// 	}
							});
							
							
						
						
						
				
				
				
				
				



			},

			detail() {},
			cancel() {
				this.$router.push("/purchase")
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

	.transfer {

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

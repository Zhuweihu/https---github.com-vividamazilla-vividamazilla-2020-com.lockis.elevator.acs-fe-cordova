<template>
	<div class="UserCreate">
		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Authority</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">

				<el-form-item label="" class='mat20 fl table45'>
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Authority:</el-checkbox>
					<div style="margin: 15px 0;"></div>
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="city in cities" :checked='city.active==1?true:false' :label="city.name" :key="city.name">{{city.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>

				<!-- :checked='city.active==1?true:false' -->

			</el-form>



		</div>

		<div style="width:100%;text-align: center;margin-top: 45px;float: left;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading"  type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button  type="primary" @click="cancel()"  >Back</el-button>
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
				checkAll: false,
				checkedCities: [],
				cities: [],
				isIndeterminate: false,
				loading: false,
				ringFeel: 12,
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				formLabelAlign: {

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
			
			var all=[]
			this.$api.get('/member/group/role', null, r => {

				console.log('------------')
				console.log(r)
				// this.cities=r
				
				for (let i = 0; i < r.length; i++) {
					
					all.push({name:r[i],active:0})
				}
				
				this.$api.get('/member/group/'+this.$route.query.uuid, null, r => {
				
					console.log('0------------0')
					console.log(r.role)
					
					for (let i = 0; i < r.role.length; i++) {
						
						for (let j = 0; j < all.length; j++) {
							
							if(r.role[i]==all[j].name){
								all[j].active=1
							}
							
						}
						
					}
					
					this.cities=all
				
				})
				

			})
			
			
			
			
			


			// this.$api.get('/member', null, r => {
			// 	
			// 	console.log('------------')
			// 	console.log(r)
			// 	
			// 	var all=[{identity:'ADMIN',active:0},{identity:'SALES',active:0},{identity:'ACCOUNTING',active:0},{identity:'PURCHASING',active:0}]
			// 	for (let i = 0; i < r.plvKMemberRoleDtoList.length; i++) {
			// 				
			// 				for (let j = 0; j < all.length; j++) {
			// 					console.log(r.plvKMemberRoleDtoList[i].identity+'--------'+all[j].identity)
			// 					if(r.plvKMemberRoleDtoList[i].identity==all[j].identity){
			// 						all[j]={identity:r.plvKMemberRoleDtoList[i].identity,active:r.plvKMemberRoleDtoList[i].active}
			// 					}
			// 				}
			// 				
			// 			}
			// 			
			// 	this.cities=all
			// 	
			// 	
			// })






		},

		methods: {

			handleCheckAllChange(val) {
				this.checkedCities = val ? this.cities : [];

				// if(this.checkedCities){
				// 	for (let i = 0; i < this.checkedCities.length; i++) {
				// 		this.checkedCities[i].active=1
				// 	}
				// }else{
				// 	for (let i = 0; i < this.checkedCities.length; i++) {
				// 		this.checkedCities[i].active=0
				// 	}
				// }

				//console.log(this.checkedCities)
				// this.isIndeterminate = false;
			},


			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;



				//console.log(value)
				this.checkedCities = value
			},


			submitForm(formLabelAlign) {


// 				var temple = []
// 				this.loading = true
// 				for (let i = 0; i < this.cities.length; i++) {
// 					this.cities[i].active = 1
// 					for (let j = 0; j < this.checkedCities.length; j++) {
// 
// 						if (this.cities[i].role == this.checkedCities[j].role) {
// 							this.cities[i].active = 0
// 						}
// 
// 					}
// 
// 				}

				console.log(this.checkedCities)


				this.$api.post('/member/group/role/group/'+this.$route.query.uuid, this.checkedCities, r => {
					history.back(-1)
				}, e => {
					this.loading = false

				});

			},

			detail() {},
			cancel() {
				// this.$router.push("/Permissions")
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

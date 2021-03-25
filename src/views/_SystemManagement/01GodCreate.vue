<template>
	<div class="GodCreate">

		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Create / Alert User</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 350px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				<el-form-item label="Customer Name" class='fl table30'>
					<el-input v-model="formLabelAlign.customeName" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Area" class='fl table30 ml5'>

					<el-input v-model="formLabelAlign.site" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Job" class='fl table30 ml5'>
					<el-input v-model="formLabelAlign.profession" class='inputs' :disabled="type=='detail'?true:false"></el-input>
					<!-- <el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input> -->
				</el-form-item>
				<el-form-item label="Telphone" class='mat20 fl table30 '>
					<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
					<!-- <el-input class='inputs' v-model="formLabelAlign.address" :disabled="type=='detail'?true:false"></el-input> -->
				</el-form-item>
				<el-form-item label="satisfaction Rate" class='mat20 fl table30 ml5'>

					<el-input class='inputs' type="email" v-model="formLabelAlign.satisfaction" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Winning Rate" class='mat20 fl table30 ml5' prop="userName">

					<el-input class='inputs' v-model="formLabelAlign.win" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Customer Type" class='mat20 fl table30 '>
					<el-select v-model="formLabelAlign.customerGrade" placeholder="VIP" class='inputs' :disabled="type=='detail'?true:false">
						<el-option v-for="item in options" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="Sex" class='mat20 fl table30 ml5'>
					<el-select v-model="formLabelAlign.gender" placeholder="Select" class='inputs' :disabled="type=='detail'?true:false">
						<el-option v-for="item in sex" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>



				<el-form-item label="Remark" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="textarea" v-model="formLabelAlign.explain" :disabled="type=='detail'?true:false">
					</el-input>
				</el-form-item>




			</el-form>



		</div>

		<div style="width:100%;text-align: center;margin-top: 45px;">
			<!-- <el-form-item class='mat20' > -->
			<el-button :loading="loading" class='button ' style='background: rgb(253,99,99)' type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button class='button ' style='background: rgb(253,99,99)' type="primary" @click="cancel()">Return</el-button>
			<!-- </el-form-item> -->
		</div>


	</div>

</template>

<!-- <template>
	<div>
		

		<div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">用戶創建/修改</span>
		</div>

		<div style="background: white;padding: 20px 0;border-top: 5px solid rgb(224,224,224);height: 760px;">
			<el-form :label-position="labelPosition" placeholder="请输入内容" ref='formLabelAlign' label-width="80px" :model="formLabelAlign"
			 :rules="rules">
				<el-form-item label="客戶姓名">
					<el-input v-model="formLabelAlign.customeName" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="所在地區" class='mat20'>
					<el-input v-model="formLabelAlign.site" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="職業" class='mat20'>
					<el-input v-model="formLabelAlign.profession" placeholder="请输入内容" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="手機" class='mat20'>
					<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
					 placeholder="请输入内容" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				
				<el-form-item label="滿意度" class='mat20'>
					<el-input class='inputs' v-model="formLabelAlign.satisfaction" placeholder="请输入内容" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="贏取率" class='mat20'>
					<el-input class='inputs' type="email" v-model="formLabelAlign.win" placeholder="请输入内容" :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="客戶級別" class='mat20'>
					<el-select v-model="formLabelAlign.customerGrade" placeholder="VIP" style='float: left;' :disabled="type=='detail'?true:false">
						<el-option v-for="item in options"  :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性別" class='mat20'>
					<el-select v-model="formLabelAlign.gender" placeholder="請選擇" style='float: left;' :disabled="type=='detail'?true:false">
						<el-option v-for="item in sex" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
					
				</el-form-item>
				<el-form-item label="備注" class='mat20'>
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formLabelAlign.explain" :disabled="type=='detail'?true:false"
					 style="width: 550px;float: left;">
					</el-input>
				</el-form-item>
				<el-form-item class='mat20' style='width: 100%;text-align: center;margin: 50px 0;'>
					<el-button class='button' type="primary" @click="submitForm('formLabelAlign')" v-if="type!='detail'">提交</el-button>
					<el-button class='button' type="primary" @click="cancel()">返回</el-button>
				</el-form-item>

			</el-form>
		</div>

	</div>

</template> -->

<script>
	export default {
		name: "UserCreate",
		data() {
			var validatorUser = (rule, value, callback) => {

				if (value != '') {
					this.$api.post('/userNameInspect/' + value, null, r => {
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
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				loading:false,
				uuid: '',
				password: '',
				formLabelAlign: {
					name: '',
					region: '',
					profession: '',
					mobilePhone: '',
					satisfaction: '',
					win: '',
					customerGradeId: '',
					customerGradeName: '',
					sex: '',
					textarea: '',
				},
				options: [{
						id: '1',
						label: '黃金'
					},
					{
						id: '2',
						label: '白金'
					},
					{
						id: '3',
						label: 'VIP'
					},
				],
				sex: [{
					id: '1',
					label: 'Boy'
				}, {
					value: '2',
					label: 'Girl'
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
				// this.$route.query.uuid
				this.$api.get('/customers/seekReference/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// //console.log(r)
				});
			} else if (this.type == 'Alert') {

				this.$api.get('/customers/seekReference/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// //console.log(r)
				});
				this.uuid = this.$route.query.uuid
			}
		},

		methods: {
			submitForm(formLabelAlign) {
				
				this.loading=true
				
				if (this.type == 'Alert') {
					this.$api.post('/customers/update', {
						"customeName": this.formLabelAlign.customeName,
						// "customerGradeId": this.options[parseInt(this.formLabelAlign.customerGradeName)].customerGradeId,
						"customerGrade": this.formLabelAlign.customerGrade,
						"explain": this.formLabelAlign.explain,
						"gender": this.formLabelAlign.gender,
						"mobilePhone": this.formLabelAlign.mobilePhone,
						"profession": this.formLabelAlign.profession,
						"reference": this.uuid,
						"satisfaction": parseInt(this.formLabelAlign.satisfaction),
						"site": this.formLabelAlign.site,
						"userName": "",
						"userReference": "",
						"win": parseInt(this.formLabelAlign.win)
					}, r => {
						
						this.$router.push("/CustomersManagement")
					});
				} else {
					this.$api.post('/customers/save', {
						"customeName": this.formLabelAlign.customeName,
						// "customerGradeId": this.options[parseInt(this.formLabelAlign.customerGradeName)].customerGradeId,
						"customerGrade": this.formLabelAlign.customerGrade,
						"explain": this.formLabelAlign.explain,
						"gender": this.formLabelAlign.gender,
						"mobilePhone": this.formLabelAlign.mobilePhone,
						"profession": this.formLabelAlign.profession,
						"reference": "",
						"satisfaction": parseInt(this.formLabelAlign.satisfaction),
						"site": this.formLabelAlign.site,
						"userName": "",
						"userReference": "",
						"win": parseInt(this.formLabelAlign.win)
					}, r => {
						
						this.$router.push("CustomersManagement")
					},e=>{
					
					// console.log('我報了錯')
					this.loading=false
					
				});
				}


			},

			search() {

				this.$api.get('/customers/seekPage' + (parseInt(this.page01) - 1) + '/' + '8' + '/' + (this.formInline.search == "" ?
					'""' :
					this.formInline.search), null, r => {
					//console.log(r)
					// this.search()
					this.tableData3 = r.content;
					this.totalElements = r.totalElements
				});
			},

			detail() {},
			cancel() {
				this.$router.push("CustomersManagement")
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
	
	.GodCreate{
		width: 100%;
		.el-form-item {
			margin-bottom: 0
		}
		
		.table30{
			width: 30%
		}
		
		.ml5{
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

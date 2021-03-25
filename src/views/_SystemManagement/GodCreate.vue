<template>
	<div class="GodCreate">

    <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
        <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">
          <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
            <strong style="margin-left: 10px;">User</strong>
          </div>

          <el-form-item label="Customer Name" prop="name">
            <el-input placeholder="input" :disabled="type=='detail'" v-model="formLabelAlign.customeName"></el-input>
          </el-form-item>

          <el-form-item label="Address" prop="name">
            <el-input placeholder="input" :disabled="type=='detail'" v-model="formLabelAlign.site"></el-input>
          </el-form-item>

          <el-form-item label="Job" prop="name">
            <el-input placeholder="input" :disabled="type=='detail'" v-model="formLabelAlign.profession"></el-input>
          </el-form-item>

          <el-form-item label="Telphone" prop="name">
            <el-input placeholder="input"  :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
             onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
          </el-form-item>

          <el-form-item label="Satisfaction Rate" prop="name">
            <el-input placeholder="input"  :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.satisfaction"
            onkeyup="(this.v=function(){
            this.value=this.value.replace(/^\.$/,'');
            this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
            this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this);"
             onblur="this.v();"></el-input>
          </el-form-item>

          <el-form-item label="Winning Rate" prop="name">
            <el-input placeholder="input"  :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.win"
            onkeyup="(this.v=function(){
            this.value=this.value.replace(/^\.$/,'');
            this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
            this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this);"
             onblur="this.v();"></el-input>
          </el-form-item>

          <el-form-item label="Customer Level" prop="name">
            <el-select style="width: 100%;" clearable v-model="formLabelAlign.customerGrade" placeholder="select"  :disabled="type=='detail'?true:false">
            	<el-option v-for='(item, index) in branch_list' :label="item.typeName" :value="item.typeName"></el-option>
            	</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Gender" prop="name">
            <el-select style="width: 100%;" clearable v-model="formLabelAlign.gender" placeholder="Select" :disabled="type=='detail'?true:false">
            	<el-option v-for="item in sex" :label="item.label" :value="item.label">
            	</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Remark" prop="name">
            <el-input type="textarea" placeholder="input" :disabled="type=='detail'" v-model="formLabelAlign.explain"></el-input>
          </el-form-item>




        </el-form>
    </div>

		<!-- <div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Create / Alert User</span>
		</div> -->

		<!-- <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 350px;min-width: 1100px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				<el-form-item label="Customer Name" class='fl table30'>
					<el-input v-model="formLabelAlign.customeName" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Address" class='fl table30 ml5'>

					<el-input v-model="formLabelAlign.site" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>
				<el-form-item label="Job" class='fl table30 ml5'>
					<el-input v-model="formLabelAlign.profession" class='inputs' :disabled="type=='detail'?true:false"></el-input>

				</el-form-item>
				<el-form-item label="Telphone" class='mat20 fl table30 '>
					<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.mobilePhone"
					 onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9]+/,'');}).call(this)" onblur="this.v();"></el-input>
				</el-form-item>
				<el-form-item label="Satisfaction Rate" class='mat20 fl table30 ml5'>
					<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.satisfaction"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this)"
					 onblur="this.v();"></el-input>
				</el-form-item>


				<el-form-item label="Winning Rate" class='mat20 fl table30 ml5' prop="userName">
					<el-input class='inputs' :disabled="type=='detail'?true:false" type='tel' v-model="formLabelAlign.win"
					onkeyup="(this.v=function(){
					this.value=this.value.replace(/^\.$/,'');
					this.value=this.value.replace(/(.*[^\d\.]+.*)/,'');
					this.value=this.value.replace(/.*(\.).*\1/,'');}).call(this);"
					 onblur="this.v();"></el-input>
				</el-form-item>


				<el-form-item label="Customer Level" class='mat20 fl table30 '>

					<el-select clearable v-model="formLabelAlign.customerGrade" placeholder="select" class='inputs' :disabled="type=='detail'?true:false">
						<el-option v-for='(item, index) in branch_list' :label="item.typeName" :value="item.typeName"></el-option>
						</el-option>
					</el-select>


				</el-form-item>



				<el-form-item label="Gender" class='mat20 fl table30 ml5'>
					<el-select clearable v-model="formLabelAlign.gender" placeholder="Select" class='inputs' :disabled="type=='detail'?true:false">
						<el-option v-for="item in sex" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>



				<el-form-item label="Remark" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="textarea" v-model="formLabelAlign.explain" :disabled="type=='detail'?true:false">
					</el-input>
				</el-form-item>




			</el-form>



		</div> -->

		<div style="width:100%;text-align: center;margin-top: 45px;">
			<!-- <el-form-item class='mat20' > -->
			<el-button  type="primary" @click="submitForm('formLabelAlign')"
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

				// 				if (value != '') {
				// 					this.$api.post('/userNameInspect/' + value, null, r => {
				// 						// console.log(r)
				// 						if (r == false) {
				// 							callback(new Error('用戶名已存在'));
				// 						} else {
				// 							callback();
				// 						}
				// 					});
				// 				} else {
				// 					callback(new Error('請輸入用戶名'));
				// 				}



			};
			return {
				typeName:'',
				branch_list: [],
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				formLabelAlign: {

					customeName: '',
					site: '',
					profession: '',
					mobilePhone: '',
					satisfaction: '',
					win: '',
					customerGrade: '',
					gender: '',
					explain: '',
				},
				options: [
					// 					{
					// 						id: '1',
					// 						label: '黃金'
					// 					},
					// 					{
					// 						id: '2',
					// 						label: '白金'
					// 					},
					// 					{
					// 						id: '3',
					// 						label: 'VIP'
					// 					},
				],
				sex: [{
					id: '1',
					label: 'Male'
				}, {
					value: '2',
					label: 'Female'
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
			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid
			if (this.type == 'detail') {
				// this.$route.query.uuid
				this.$api.get('/customer/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// console.log(r)
				});
			} else if (this.type == 'alert') {

				this.$api.get('/customer/' + this.$route.query.uuid, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					this.formLabelAlign = r
					// 					this.formLabelAlign.employ = r.employ == 0 ? true : false
					// console.log(r)
				});
				this.uuid = this.$route.query.uuid
			}


		},


		methods: {
			//
			findAllEntrepot() {
				// 				this.$api.get('/inventory/findAllEntrepot', null, r => {
				// 					this.branch_list = r.content,
				// 						this.branch = r.content[0].name
				// 					// this.branchId== r.content[0].reference
				// 					this.search()
				// 				});

				console.log('*/*/*/*//')

				this.$api.get('/customer/type',{
					// "branch_list" : this.name,
					// "typeName" : this.formLabelAlign.customerGrade
				}, r => {
					// console.log('*/*/*/*//')
					this.branch_list = r
					console.log(r)
			});
	},

	// 			querySearch_customerGrade(queryString, cb) {
	// 				this.$api.post('/customers/seekAll',null, r => {
	// 					// this.$router.push("/SystemManagement/UserManagement")
	//
	// 					console.log(r)
	//
	// 					var results = []
	// 					for (var i = 0; i < r.length; i++) {
	// 						var temp = {
	// 							// "value": r[i].revised + " " + r[i].customeName,
	// 							"value": r[i].typeName,
	// 							"reference": r[i].reference,
	// 							"id": r[i].id,
	// 						}
	// 						results.push(temp)
	// 					}
	// 					cb(results);
	// 				});
	// 			},

	handleSelect_customerGrade(item) {
			this.formLabelAlign.customerGrade = item.value

		},

		submitForm(formLabelAlign) {
			for (let i = 0; i < this.branch_list.length; i++) {
				if (this.branch == this.branch_list[i].name) {
					this.entrepot = this.branch_list[i]
				}
			}

			if (this.type == 'alert') {
				this.$api.post('/customer/update', {
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
					history.back(-1)
					// this.$router.push("/CustomersManagement")
				});
			} else {
				this.$api.put('/customer/save', {
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
					history.back(-1)
					// this.$router.push("CustomersManagement")
				});
			}


		},

		search() {

			this.$api.get('/customers/seekPage' + (parseInt(this.page01) - 1) + '/' + '8' + '/' + (this.formInline.search == "" ?
				'""' :
				this.formInline.search), null, r => {
				console.log(r)
				// this.search()
				this.tableData3 = r.content;
				this.totalElements = r.totalElements
			});
		},

		detail() {},
		cancel() {
			history.back(-1)
			// this.$router.push("CustomersManagement")
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

	.GodCreate {
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

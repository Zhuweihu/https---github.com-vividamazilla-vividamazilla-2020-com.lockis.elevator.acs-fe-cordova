<template>
	<div class="CustomerLevel_kehu">

		<!-- <div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Customer Level</span>
		</div>

		<div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 180px;">
			<el-form :label-position="labelPosition" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules"
			 style='margin-left: 35%;'>
				<el-form-item label="Level" class='mat20'>
					<el-input v-model="formLabelAlign.typeName" class='inputs' :disabled="type=='detail'?true:false"></el-input>
				</el-form-item>

				<el-form-item label="Introduction" class='mat20'>
					<el-input class='inputs' type="textarea" v-model="formLabelAlign.explain" :disabled="type=='detail'?true:false">
					</el-input>
				</el-form-item>
			</el-form>
		</div> -->


      <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
          <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">
            <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
              <strong style="margin-left: 10px;">Customer Tier</strong>
            </div>

            <el-form-item label="Level">
              <el-input type="text" v-model="formLabelAlign.typeName" :disabled="type=='detail'"></el-input>
            </el-form-item>

            <el-form-item label="Introduction">
              <el-input type="textarea" v-model="formLabelAlign.explain" :disabled="type=='detail'"></el-input>
            </el-form-item>

          </el-form>
      </div>



		<div style="width:100%;text-align: center;margin-top: 45px;">
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

				if (value != '') {
					this.$api.post('/userNameInspect/' + value, null, r => {
						// console.log(r)
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
				loading:false,
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				formLabelAlign: {
					typeName: '',
					explain: '',
					id: 0,
					made: "",
					purged: "",
					reference: "",
					revised: "",
					userName: "",
					userReference: ""

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
			this.$route.query.id
			if (this.type == 'detail') {
				// this.$route.query.uuid
				this.$api.get('/customer/type/' + this.$route.query.uuid, null, r => {
					console.log(r)
					this.formLabelAlign = r
				});
			} else if (this.type == 'alert') {

				this.$api.get('/customer/type/' + this.$route.query.uuid, null, r => {
					console.log(r)
					this.formLabelAlign = r
				});
				this.uuid = this.$route.query.uuid
			}
		},

		methods: {
			submitForm(formLabelAlign) {

				this.loading=true

				if (this.type == 'alert') {
					console.log('修改')
					this.$api.post('/customer/type/save',this.formLabelAlign, r => {
						this.$router.push("/Kehu_Customer")
					});
				} else {
					console.log('添加')
					this.$api.put('/customer/type/save', {
						"explain": this.formLabelAlign.explain,
						"id": 0,
						"reference": "",
						"typeName": this.formLabelAlign.typeName,
						"userName": "",
						"userReference": ""
					}, r => {
						this.$router.push("/Kehu_Customer")
					});
// 					this.$api.post('/CustomerType/save',this.formLabelAlign, r => {
// 						this.$router.push("/Kehu_Customer")
// 					});
				}

			},

			// 			search() {
			//
			// 				this.$api.get('/customers/seekPage' + (parseInt(this.page01) - 1) + '/' + '8' + '/' + (this.formInline.search == "" ?
			// 					'""' :
			// 					this.formInline.search), null, r => {
			// 					console.log(r)
			// 					// this.search()
			// 					this.tableData3 = r.content;
			// 					this.totalElements = r.totalElements
			// 				});
			// 			},

			detail() {},
			cancel() {
				this.$router.push("Kehu_Customer")
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

	.CustomerLevel_kehu {
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
			width: 300px;
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

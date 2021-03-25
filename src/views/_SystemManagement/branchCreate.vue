<template>
	<div class="branchCreate">
		<div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
			<!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
			<!-- <span class="fl" style="padding: 0 5px;">Branch</span> -->
			<!-- <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div> -->
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
n
        <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
          <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
            <strong style="margin-left: 10px;">Branch</strong>
          </div>
          <el-form :model="formLabelAlign"   label-width="120px" class="demo-ruleForm">
              <el-form-item label="Branch">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.name" :disabled="type=='detail'"></el-input>
              </el-form-item>

              <el-form-item label="Address">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.address" :disabled="type=='detail'"></el-input>
              </el-form-item>

              <el-form-item label="Telphone">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.telephone" :disabled="type=='detail'"></el-input>
              </el-form-item>

              <el-form-item label="Fax">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.fax" :disabled="type=='detail'"></el-input>
              </el-form-item>

              <el-form-item label="Email">
                <el-input placeholder="input" type="text" v-model="formLabelAlign.email" :disabled="type=='detail'"></el-input>
              </el-form-item>

          </el-form>

        </div>


			<el-row style='line-height: 35px;'>
				<!-- <el-col :span="8">
					<span class="fl">Branch：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.name" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Address：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.address" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col>

				<el-col :span="8">
					<span class="fl">Telphone：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.telephone" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->
			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<!-- <el-row style='line-height: 35px;'>
				<el-col :span="8">
					<span class="fl">Fax：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.fax" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

				<!-- <el-col :span="8">
					<span class="fl">Responsible：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.principal" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

				<!-- <el-col :span="8">
					<span class="fl">Website：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.internetSite" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

        <!-- <el-col :span="8">
        	<span class="fl">Email：</span>
        	<p style="overflow: hidden;">
        		<input v-model="formLabelAlign.email" :disabled="type=='detail'?true:false" class="tem_input">
        	</p>
        </el-col> -->


			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->
		<div>
			<el-row style='line-height: 35px;'>

				<!-- <el-col :span="8">
					<span class="fl">Email：</span>
					<p style="overflow: hidden;">
						<input v-model="formLabelAlign.email" :disabled="type=='detail'?true:false" class="tem_input">
					</p>
				</el-col> -->

			</el-row>
		</div>
		<!-- ||||||||||||||||||||| -->

		<div class="testC" style="width: 100%;margin-top: 55px;">

			<el-button  type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>

      <el-button  type="primary" @click="deletes()"
       v-if="type=='Alter'">Delete</el-button>

			<el-button  type="primary" @click="cancel()">Back</el-button>

		</div>

    <!-- 賬號密碼錯誤彈窗 -->
    <div class="dialog">
      <el-dialog title="" :visible.sync="dialogVisible02" width="30%" top='20%'>
        <span>Really delete it?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="comfir()">Yes</el-button>
          <el-button type="primary" @click="dialogVisible02 = false">Cancel</el-button>
        </span>
      </el-dialog>
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

        dialogVisible02:false,
        dialogVisible02_reference:"",

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


      comfir() {
        this.$api.delete('/Branch/delete?reference='+this.dialogVisible02_reference, null, r => {
          // this.branch_list = r.content,
          // 	this.branch = r.content[0].name
          console.log('123--')
          this.dialogVisible02=false

          history.back(-1)

          // this.page01 = 1
          // console.log('--123')
          // this.search_type()

        });

        // this.$api.delete('/inventory/gem/type/' + this.dialogVisible02_reference + '/purge', null, r => {
        //   console.log('123--')
        //   this.dialogVisible02=false
        //   this.page01 = 1
        //   console.log('--123')
        //   this.search_type()
        // });


      },

      deletes() {
        this.dialogVisible02 = true
        this.dialogVisible02_reference = this.formLabelAlign.reference
        // console.log('點擊了')
      },


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

// 		.el-form-item {
// 			margin-bottom: 0
// 		}
//
// 		.el-form--label-top .el-form-item__label {
// 			padding: 0
// 		}

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
// 			border-width: 0;
// 			border-bottom: 1px solid black;
// 			display: inline-block;
// 			float: left;
// 			width: 100%;
// 			height: 25px;
// 			margin-top: 5px;
// 			border: 0 1px 0 0;
// 			border-radius: 0;
// 			background-color: transparent;
// 		}
//
// 		.el-autocomplete {
// 			width: 100%
// 		}
//
// 		.avatar-uploader .el-upload {
// 			border: 1px dashed #d9d9d9;
// 			border-radius: 6px;
// 			cursor: pointer;
// 			position: relative;
// 			overflow: hidden;
// 		}
//
// 		.avatar-uploader .el-upload:hover {
// 			border-color: #409EFF;
// 		}
//
// 		.avatar-uploader-icon {
// 			font-size: 28px;
// 			color: #8c939d;
// 			width: 178px;
// 			height: 178px;
// 			line-height: 178px;
// 			text-align: center;
// 		}
//
// 		.grid-content {
// 			// border-radius: 4px;
// 			line-height: 36px;
// 			background: rgb(224, 224, 224);
// 			text-align: center
// 		}
//
//
//
// 		.el-input.is-disabled .el-input__inner {
// 			background-color: transparent;
// 			 border-color: black;
// 			 color: black;
// 			 cursor: default;
// 		}

	}
</style>

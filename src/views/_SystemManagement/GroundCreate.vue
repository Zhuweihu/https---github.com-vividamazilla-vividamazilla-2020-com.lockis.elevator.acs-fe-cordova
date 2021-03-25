<template>
	<div class="UserCreate">

    <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
      <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">
        <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
          <strong style="margin-left: 10px;">Group</strong>
        </div>

        <el-form-item label="Group Name">
          <el-input placeholder="input" type="text" v-model="formLabelAlign.name" :disabled="type=='detail'"></el-input>
        </el-form-item>

      </el-form>
    </div>

<!-- 		<div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Group</span>
		</div> -->

		<!-- <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 150px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign" :rules="rules">
				<el-form-item label="Group Name" class='mat20 fl table30'>
					<el-input v-model="formLabelAlign.name" class='inputs' :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
				</el-form-item>
			</el-form>
		</div> -->

    <!-- <el-form-item label="handler" class='mat20 fl table30 ml5'>
    	<el-autocomplete class="inputs" v-model="formLabelAlign.personInCharge" :fetch-suggestions="querySearch_origin" placeholder="Input"
    	 @select="handleSelect_origin" :disabled="type=='detail'?true:false"></el-autocomplete>
    </el-form-item> -->


    <!-- <el-form-item label="Tel" class='mat20 fl table30 ml5'>
    	<el-input class='inputs' v-model="formLabelAlign.phone" :disabled="type=='detail'?true:false" placeholder="Input"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="Introduction" class='mat20 table30  m15'>
    	<el-input type="textarea" :rows="2" placeholder="Input" v-model="formLabelAlign.explain" :disabled="type=='detail'?true:false"
    	 style="width: 90%;float: left;">
    	</el-input>
    </el-form-item> -->

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

	import {
		MessageBox,
		Message
	} from 'element-ui';

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
				activateds: false,
				loading:false,
				get_name:[],
				formLabelAlign: {
				  "id": 0,
				  "name": "",
				  "reference": ""
				},

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

			}else if (this.type == 'alert') {
				this.$api.get('/member/group/' + this.$route.query.uuid, null, r => {


				this.formLabelAlign = r

				});
				this.uuid = this.$route.query.uuid
			}







		},

		methods: {
			submitForm(formLabelAlign) {

				if(this.formLabelAlign.name!=''){

					this.loading=true
					if(this.type=='new'){
						this.$api.put('/member/group/save',
						{
						  "name": this.formLabelAlign.name
						}, r => {
							history.back(-1)
						})
					}else{

						this.$api.post('/member/group/save', this.formLabelAlign, r => {
							history.back(-1)
						})

					}


				}else {

					alert('Please input Group Name')

				}






			},

			querySearch_origin(queryString, cb) {
				this.$api.get('/member/findNickName?nickName=' + queryString, null, r => {
					// this.$router.push("/SystemManagement/UserManagement")
					console.log(r)
					var results = []
					for (var i = 0; i < r.length; i++) {
						var temp = {
							"value": r[i].nickname,
							"reference": r[i].reference,
							"id": r[i].id,
						}
						results.push(temp)
					}
					cb(results);
				});
			},

			handleSelect_origin(item) {
				// this.formLabelAlign.supplier = item
			},


			detail() {},
			cancel() {
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

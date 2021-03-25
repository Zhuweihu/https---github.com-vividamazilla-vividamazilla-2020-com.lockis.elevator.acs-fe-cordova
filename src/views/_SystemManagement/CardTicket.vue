<template>
	<div class="KaQuanXinZeng">

    <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
      <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">
        <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
          <strong style="margin-left: 10px;">Coupon</strong>
        </div>

        <el-form-item label="Name">
          <el-input type="text" v-model="formLabelAlign.name" :disabled="type=='detail'"></el-input>
        </el-form-item>

        <el-form-item label="Discount">
          <el-input type="text" v-model="formLabelAlign.discount" :disabled="type=='detail'"></el-input>
        </el-form-item>

        <el-form-item label="Code">
          <el-input type="text" v-model="formLabelAlign.code" :disabled="type=='detail'"></el-input>
        </el-form-item>

        <el-form-item label="Value">
          <el-input type="text" v-model="formLabelAlign.value" :disabled="type=='detail'"></el-input>
        </el-form-item>

        <el-form-item label="Effective Date">
          <el-date-picker format="yyyy-MMM-dd"
          :disabled="type=='detail'" class='inputs'  style="width: 100%;" v-model="value1" type="daterange" range-separator="To" start-placeholder="Start" end-placeholder="End">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Enable">
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'" ></el-switch>
        </el-form-item>

      </el-form>
    </div>


		<!-- <div style="height: 50px;line-height: 50px;margin-top: 20px;">
			<span style="float: left;font-size: 16px;">Coupon</span>
		</div> -->

		<!-- <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;float: left;height: 270px;min-width: 1100px;">
			<el-form label-position="top" placeholder="Input" ref='formLabelAlign' :rules="rules"  label-width="130px" :model="formLabelAlign">

				<el-form-item label="Name" class='mat20 table30'>
					<el-input v-model="formLabelAlign.name" placeholder="Input" class='inputs'  style="width: 80%;" :disabled="type=='detail'"></el-input>
				</el-form-item>

				<el-form-item label="Discount" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.discount" placeholder="Input" class='inputs'  style="width: 80%;" :disabled="type=='detail'" ></el-input>
				</el-form-item>

				<el-form-item label="Code" class='mat20 table30 m15'>
					<el-input v-model="formLabelAlign.code" placeholder="Input" class='inputs'  style="width: 80%;" :disabled="type=='detail'" ></el-input>
				</el-form-item>

				<el-form-item label="Value" class=' table30 mat20' >
					<el-input v-model="formLabelAlign.value" placeholder="Input" class='inputs'  style="width: 80%;" :disabled="type=='detail'" ></el-input>
				</el-form-item>

				<el-form-item label="Effective Date" class='mat20 table30 m15'>

					<el-date-picker format="yyyy-MMM-dd"
					:disabled="type=='detail'" class='inputs'  style="width: 80%;" v-model="value1" type="daterange" range-separator="To" start-placeholder="Start" end-placeholder="End">
					</el-date-picker>

				</el-form-item>

				<el-form-item label="Enable" class=' table30 mat20 m15' >
					<el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'" ></el-switch>
				</el-form-item>

			</el-form>
		</div> -->

		<div style="width:100%;text-align: center;margin-top: 45px;">
			<!-- <el-form-item class='mat20' > -->
			<el-button style='margin-top: 40px;' :loading="loading"  type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button style='margin-top: 40px;'  type="primary" @click="cancel()">Back</el-button>
			<!-- </el-form-item> -->
		</div>

	</div>

</template>

<script>
	export default {
		name: "UserCreate",
		data() {

			return {
				loading: false,
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',
				userLevel: '',
				value1:'',
				activateds:true,
				formLabelAlign: {
					"code": "",
					"dateEnd": "",
					"dateStart": "",
					"discount": 0,
					"enable": 1,
					"id": null,
					"name": "",
					"reference": null,
					"type": "COUPON",
					"value": 0
				},
				rules: {


						code: [{
							required: true,
							message: 'Please input Code',
							trigger: 'blur'
							}

						],

						discount: [{
							required: true,
							message: 'Please input Discount',
							trigger: 'blur'
							}

						],

						name: [{
							required: true,
							message: 'Please input Name',
							trigger: 'blur'
							}

						],

						value: [{
							required: true,
							message: 'Please input Value',
							trigger: 'blur'
							}

						],



					}
			}
		},

		created: function() {
			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid
			this.id = this.$route.query.id

			if(this.type=='alter'){
				this.$api.get('/sales/coupon/'+this.uuid, null, r => {
						// this.$router.push("/branchManagement")
						// history.back(-1)
						this.formLabelAlign=r
						this.value1=[
							new Date(this.formLabelAlign.dateStart),
							new Date(this.formLabelAlign.dateEnd),
						]
						this.activateds=this.formLabelAlign.enable==1?true:false
					});
			}


		},

		methods: {
			submitForm(formLabelAlign) {




				if(this.value1==''){
					alert('Please select Effective Date!')
				}else if(this.code==''){
					alert('Please select code!')
				}else if(this.discount==''){
					alert('Please select discount!')
				}else if(this.name==''){
					alert('Please select name!')
				}else if(this.value==''){
					alert('Please select value!')
				}else if(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(this.formLabelAlign.discount))){

						alert('Discount must be a number')

				}else if(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(this.formLabelAlign.value))){

						alert('Value must be a number')

				}

				else{

					this.formLabelAlign.dateStart=this.value1[0].format("yyyy-MM-dd")
					this.formLabelAlign.dateEnd=this.value1[1].format("yyyy-MM-dd")
					this.formLabelAlign.discount=parseFloat(this.formLabelAlign.discount)
					this.formLabelAlign.value=parseFloat(this.formLabelAlign.value)
					this.formLabelAlign.enable=this.activateds==true?1:0

					console.log(this.formLabelAlign)

					if(this.type=='alter'){
						this.$api.post('/sales/coupon/save', this.formLabelAlign, r => {
								history.back(-1)
							});
					}else{
						this.$api.put('/sales/coupon/save', this.formLabelAlign, r => {
								history.back(-1)
							});
					}

				}




			},

			detail() {},
			cancel() {
				// this.$router.push("/UseofcardCoupons")
				history.back(-1)
			},
			topage(type) {
				if (type == 'grounp') {
					this.$router.push("/Function/CustomentManagement")
				} else if (type == 'branch') {
					this.$router.push("/Function/branchManagement")
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variable';

	.KaQuanXinZeng {

		.el-date-editor .el-range-separator{
			width: 8%
		}

		// .el-form-item {
		// 	margin-bottom: 0;
		// 	float: left;
		// }

		.table30 {
			width: 30%;
			float: left
		}

		.table50 {
			width: 50%;
			float: left
		}

		.m15 {
			margin-left: 5%;
			float: left
		}

		.second_menu {
			width: 100px;
			line-height: 76px;
			float: left;
			margin-left: 20px;
			font-size: 18px;
			cursor: pointer
		}

		.el-textarea__inner {
			height: 140px;
		}

		.selector {
			color: $navHoverTextColor;
		}

		.inputs {
			width: 300px;
			float: left
		}

		.button {
			// width: 191px;
			height: 48px;
			font-size: 21px;
			padding: 0 10px;
			// line-height: 48px;
			background: $navHoverTextColor;
			border: 0;
			margin-top: 30px;
		}

		.button:nth-child(2) {
			margin-left: 50px;

		}

		.point {
			cursor: pointer;
		}
	}
</style>

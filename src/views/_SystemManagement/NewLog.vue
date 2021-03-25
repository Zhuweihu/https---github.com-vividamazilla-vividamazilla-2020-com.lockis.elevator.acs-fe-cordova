<template>
	<div class="NewRizhi">

    <div class="productSave"  style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">

      <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">

        <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
          <strong style="margin-left: 10px;">Conversation</strong>
        </div>

        <el-form-item label="Customer" prop="codePro">
          <el-autocomplete
            style="width: 100%;"
            v-model="customer"
            :fetch-suggestions="querySearch"
            placeholder="Input Customer"
            @select="handleSelect"
            :trigger-on-focus="false"
            :disabled="isMenu"
          ></el-autocomplete>
        </el-form-item>

        <el-form-item label="Communication" prop="codePro">
          <el-select style="width: 100%;" v-model="formLabelAlign.channel" placeholder="Select"  :disabled="type=='detail'?true:false">
          	<el-option v-for="item in options" :label="item.label" :value="item.label">
          	</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Remark" prop="codePro">
          <el-input :disabled="type=='detail'" type="textarea" v-model="formLabelAlign.context"></el-input>
        </el-form-item>

      </el-form>

    </div>


		<!-- <div style="height: 50px;line-height: 50px;">
			<span style="float: left;font-size: 16px;">>>>Create / Alert Log</span>
		</div> -->

		<!-- <div style="background: rgb(233,238,244);padding: 1px 20px;width: 100%;border-radius: 10px;height: 250px;">
			<el-form label-position="top" ref='formLabelAlign' label-width="80px" :model="formLabelAlign">


        <el-form-item label="Customer" class='mat20 fl table30'>

        <el-autocomplete
          class='inputs'
          v-model="customer"
          :fetch-suggestions="querySearch"
          placeholder="Input Customer"
          @select="handleSelect"
          :trigger-on-focus="false"
          :disabled="isMenu"
        ></el-autocomplete>
        </el-form-item>


				<el-form-item label="Communication Type" class='mat20 fl table30'>
					<el-select v-model="formLabelAlign.channel" placeholder="Select" class='inputs' :disabled="type=='detail'?true:false">
						<el-option v-for="item in options" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</el-form-item>



				<el-form-item label="Remark" class='mat20 fl table30 ml5'>
					<el-input class='inputs' type="textarea" v-model="formLabelAlign.context" :disabled="type=='detail'?true:false">
					</el-input>
				</el-form-item>

			</el-form>

		</div> -->

		<div style="width:100%;text-align: center;margin-top: 45px;">
			<el-button  type="primary" @click="submitForm('formLabelAlign')"
			 v-if="type!='detail'">Submit</el-button>
			<el-button  type="primary" @click="cancel()">Back</el-button>
		</div>

	</div>

</template>

<script>
	export default {
		name: "NewRizhi",
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
				// communicationDate:new Date().format("yyyy-MM-dd"),
        customer_reference:"",
        options_customer:[],
        customer:'',
				id: '',
				value1: '',
				textarea: '',
				labelPosition: 'right',
				type: "detail",
				uuid: '',
				password: '',

        isMenu:true,

				formLabelAlign: {
					channel:'',
					context:'',
					customer:{reference:''},
					reference:'',
					done:0
				},

				options: [{
					id: '1',
					label: 'WHATSAPP'
				}, {
					id: '2',
					label: 'WX'
				}, {
					id: '3',
					label: 'EMAIL'
				}, {
					id: '4',
					label: 'PHONE'
				}
				],
			}
		},

		created: function() {
			this.type = this.$route.query.type
			this.uuid = this.$route.query.uuid
			this.formLabelAlign.customer.reference=this.$route.query.uuid

      this.customer=this.$route.query.customer_name==undefined?"":this.$route.query.customer_name

      this.get_customer()

			if (this.type == 'detail') {
				// this.$route.query.uuid
				this.$api.get('/customer/conversation/' + this.$route.query.uuid, null, r => {

					this.formLabelAlign.channel = r.channel
					this.formLabelAlign.context = r.context
					this.formLabelAlign.customer.reference = r.customer.reference
					this.formLabelAlign.done = r.done
					this.formLabelAlign.reference = r.reference

				});
			} else if (this.type == 'alert') {
				console.log(this.$route.query.uuid)
				this.$api.get('/customer/conversation/' + this.$route.query.id, null, r => {
					this.formLabelAlign = r

					// this.formLabelAlign.channel = r.channel
					// this.formLabelAlign.context = r.context
					// this.formLabelAlign.customer.reference = r.customer.reference
					// this.formLabelAlign.done = r.done
					// this.formLabelAlign.reference = r.reference

				});
				this.uuid = this.$route.query.uuid
				this.id = this.$route.query.id
			}else if (this.type == 'isMenu') {

        this.isMenu=false

      }
		},

		methods: {

      handleSelect(item) {
        console.log(item);
        this.customer_reference=item.reference
      },
			submitForm(formLabelAlign) {

        if(!this.isMenu){
          this.formLabelAlign.customer.reference=this.customer_reference
        }


				if (this.type == 'alert') {
					this.$api.post('/customer/conversation/save', this.formLabelAlign, r => {
						// this.$router.push("/SystemManagement/Thlog")
						window.history.back(-1)
					});

				} else {


					// {
					// 	"achievement": this.formLabelAlign.achievement,
					// 	"communication": this.formLabelAlign.communication,
					// 	"communicationDate": this.formLabelAlign.communicationDate.format("yyyy-MM-dd"),
					// 	"communicationType": this.formLabelAlign.communicationType,
					// 	"explain": this.formLabelAlign.explain,
					// 	"plvCCustomerReference": this.uuid,
					// 	"reference": '',
					// 	"userName": '',
					// 	"userReference": ''
					// }



					this.$api.put('/customer/conversation/save',this.formLabelAlign, r => {
						// this.$router.push("/Communicationlogs")
						window.history.back(-1)
					});
				}

				// 						console.log({
				// 							"achievement": this.formLabelAlign.achievement,
				// 							"communication": this.formLabelAlign.communication,
				// 							"communicationDate": this.formLabelAlign.communicationDate.format("yyyy-MM-dd"),
				// 							"communicationType": this.formLabelAlign.communicationType,
				// 							"explain": this.formLabelAlign.explain,
				// 							"plvCCustomerReference": this.uuid,
				// 							"reference": '',
				// 							"userName": '',
				// 							"userReference": ''
				// 						})
				//
				// 						this.$api.post('/customer/save', {
				// 							"achievement": this.formLabelAlign.achievement,
				// 							"communication": this.formLabelAlign.communication,
				// 							"communicationDate": this.formLabelAlign.communicationDate.format("yyyy-MM-dd"),
				// 							"communicationType": this.formLabelAlign.communicationType,
				// 							"explain": this.formLabelAlign.explain,
				// 							"plvCCustomerReference": this.uuid,
				// 							"reference": '',
				// 							"userName": '',
				// 							"userReference": ''
				// 						}, r => {
				// 							this.$router.push("/SystemManagement/Thlog")
				// 						});
				//



			},

      querySearch(queryString, cb) {

        console.log('-1-')

        var restaurants = this.options_customer;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      // 獲取顧客
      get_customer() {

        this.options_customer = []
        this.$api.post('/customer', {
          "customerGrade": "",
          "index": 0,
          "numbe": 100000000,
          "retain": 0,
          "satisfaction": 0,
          "seek": "",
          "win": 0
        }, r => {
          console.log('*---------*')
          console.log(r)
          for (let i = 0; i < r.content.length; i++) {
            this.options_customer.push({
              value: r.content[i].customeName,
              label: r.content[i].customeName,
              reference:r.content[i].reference
            })
          }
          this.customer_loading = false
          this.dialogVisible = false
        });
      },

			detail() {},
			cancel() {
				// this.$router.push("/SystemManagement/Thlog")
				window.history.back(-1)
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


	.NewRizhi {

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

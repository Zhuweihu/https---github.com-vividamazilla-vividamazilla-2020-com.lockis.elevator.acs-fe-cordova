<template>
  <div class="UserCreates" v-loading='all_loading'>

    <!-- <div style="font-size: 14px;font-weight: bold;line-height: 30px;height: 40px;">
      <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
      <span class="fl" style="padding: 0 5px;">Factory Setting</span>
      <div style="width: 100px;border-bottom: 1px solid black;height: 14px;float: left;"></div>
    </div> -->
    <!-- ||||||||||||||||||||| -->
    <div>

        <div class="productSave" v-loading='all_loading' style="max-width: 700px;margin: 0 auto;background: white;padding: 30px;border-radius: 10px;">
          <el-form :model="formLabelAlign"  label-width="120px" class="demo-ruleForm">

          <div style="width: 100%;color: white;background: deepskyblue;line-height: 30px;margin-bottom: 10px;">
            <strong style="margin-left: 10px;">Factory Setting</strong>
          </div>

          <el-form-item label="Name">
            <el-input type="text" v-model="formLabelAlign.name" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Email">
            <el-input type="text" v-model="formLabelAlign.email" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Address">
            <el-input type="text" v-model="formLabelAlign.address" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Bank">
            <el-input type="text" v-model="formLabelAlign.bank" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Bank No">
            <el-input type="text" v-model="formLabelAlign.bankNo" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Contact 1">
            <el-input type="text" v-model="formLabelAlign.contact1" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Contact 1 Tel">
            <el-input type="text" v-model="formLabelAlign.contact1Tel" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Contact 2">
            <el-input type="text" v-model="formLabelAlign.contact2" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Contact 2 Tel">
            <el-input type="text" v-model="formLabelAlign.contact2Tel" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Bank Holder">
            <el-input type="text" v-model="formLabelAlign.bankHolder" :disabled="type=='detail'"></el-input>
          </el-form-item>

          <el-form-item label="Day of payment">
            <el-select clearable  v-model="formLabelAlign.bankPaymentDay" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
            	<el-option v-for="item in unit" :label="item.name" :value="item.name">
            	</el-option>
            </el-select>
            <!-- <el-input type="text" v-model="formLabelAlign.Contact2" :disabled="type=='detail'"></el-input> -->
          </el-form-item>

           <el-form-item label="Enable">
              <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
           </el-form-item>

          </el-form>



        </div>


      <!-- <el-row style='line-height: 35px;'>

        <el-col :span="8">
          <span class="fl">Name：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.name" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Email：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.email" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Address：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.address" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Bank：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.bank" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Bank No：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.bankNo" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Contact 1：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.contact1" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Contact 1 Tel：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.contact1Tel" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Contact 2：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.contact2" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Contact 2 Tel：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.contact2Tel" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Bank Holder：</span>
          <p style="overflow: hidden;">
            <input v-model="formLabelAlign.bankHolder" :disabled="type=='detail'?true:false" class="tem_input">
          </p>
        </el-col>

        <el-col :span="8">
          <span class="fl">Day of payment：</span>
          <p style="overflow: hidden;">

            <el-select clearable  v-model="formLabelAlign.bankPaymentDay" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
            	<el-option v-for="item in unit" :label="item.name" :value="item.name">
            	</el-option>
            </el-select>


          </p>
        </el-col>



        <el-col :span="8">
          <span class="fl">Enable：</span>
          <p style="overflow: hidden;">
            <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
          </p>
        </el-col>



      </el-row> -->
    </div>

    <!--            <el-select clearable @change="clear_referce()" v-model="formLabelAlign.bankPaymentDay" placeholder="select" style='width: 100%;' :disabled="type=='detail'?true:false">
                	<el-option v-for="item in unit" :label="item.name" :value="item.name">
                	</el-option>
                </el-select> -->
               <!-- <el-date-picker format="yyyy-MMM-dd" v-model="formLabelAlign.bankPaymentDay" type="date" style='width: 100%;' class='inputs01' :disabled="type=='detail'?true:false"
                 placeholder="select date">
                </el-date-picker> -->
                <!-- <input v-model="formLabelAlign.bankPaymentDay" :disabled="type=='detail'?true:false" class="tem_input"> -->

    <!-- ||||||||||||||||||||| -->

    <div style="width:100%;text-align: center;margin: 45px 0;float: left;">
      <!-- <el-form-item class='mat20' > -->
      <el-button :loading="loading" type="primary" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Submit</el-button>
      <el-button type="primary" @click="cancel()">Back</el-button>
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
        type: "detail",
        uuid: '',
        password: '',
        all_loading: false,
        activateds: true,
        loading: false,
        formLabelAlign: {

            "address": "",
            "bank": "",
            "bankHolder": "",
            "bankNo": "",
            "bankPaymentDay": '',
            "contact1": "",
            "contact1Tel": "",
            "contact2": "",
            "contact2Tel": "",
            "email": "",
            "enable": 1,
            "id": 0,
            "name": "",
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

        unit:[
          {name:1},
          {name:2},
          {name:3},
          {name:4},
          {name:5},
          {name:6},
          {name:7},
          {name:8},
          {name:9},
          {name:10},
          {name:11},
          {name:12},
          {name:13},
          {name:14},
          {name:15},
          {name:16},
          {name:17},
          {name:18},
          {name:19},
          {name:20},
          {name:21},
          {name:22},
          {name:23},
          {name:24},
          {name:25},
          {name:26},
          {name:27},
          {name:28},
          {name:29},
          {name:30},
          {name:31},

        ]

      }
    },

    created: function() {
      this.type = this.$route.query.type
      if (this.type == 'detail') {
        this.all_loading = true
        this.$api.get('/factory/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          this.activateds = r.enable == 1 ? true : false
          console.log(r)
          this.all_loading = false
        });
      } else if (this.type == 'alert') {
        this.all_loading = true
        this.$api.get('/factory/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          // this.password = r.password

          this.activateds = r.enable == 1 ? true : false
          this.all_loading = false
        });
        this.uuid = this.$route.query.uuid
      }
    },

    methods: {


      submitForm(formLabelAlign) {

        // this.formLabelAlign.bankPaymentDay=this.formLabelAlign.bankPaymentDay.format("yyyy-MM-dd")
        this.formLabelAlign.enable = this.activateds == true ? 1 : 0
        if (this.type == 'alert') {
          this.$api.post('/factory/save', this.formLabelAlign, r => {

            console.log('----*****')
            this.$router.push("/factoryList")

          });
        } else {
          this.$api.put('/factory/save', this.formLabelAlign, r => {

            console.log('----*****')
            this.$router.push("/factoryList")

          });
        }





      },

      detail() {},
      cancel() {
        this.$router.push("/factoryList")
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

  .UserCreates {

    width: 100%;

    // .el-form-item {
    //   margin-bottom: 0
    // }

    .table30 {
      width: 30%
    }

    .ml5 {
      margin-left: 5%;
    }

    // .el-form--label-top .el-form-item__label {
    //   padding: 0
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

    // .el-input__inner {
    //   // border-width: 0;
    //   // border-bottom: 1px solid black;
    //   // display: inline-block;
    //   // float: left;
    //   // width: 100%;
    //   height: 25px;
    //   // margin-top: 5px;
    //   // border: 0 1px 0 0;
    //   border-radius: 0;
    //   border: 0;
    //   border-bottom: 1px solid black;
    //   background-color: transparent;
    // }

    .el-autocomplete {
      width: 100%
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .grid-content {
      // border-radius: 4px;
      line-height: 36px;
      background: rgb(224, 224, 224);
      text-align: center
    }



    // .el-input.is-disabled .el-input__inner {
    //   background-color: transparent;
    //   border-color: black;
    //   color: black;
    //   cursor: default;
    // }

  }
</style>

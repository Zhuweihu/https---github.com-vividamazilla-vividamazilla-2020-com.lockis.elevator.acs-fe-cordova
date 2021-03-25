<template>
  <div class="elysUserCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Username: </span><br>
          <el-input class="input1" v-model="formLabelAlign.elysKUserDto.identifier" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
            <span>Group:</span><br>
          <el-select class="input1" v-model="group">
              <el-option v-for="item in group_data" :key="item.reference" :label="item.name" :value="item.reference">
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Given:</span><br>
          <el-input class="input1" v-model="formLabelAlign.elysKUserDto.given" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Family:</span><br>
          <el-input class="input1" v-model="formLabelAlign.elysKUserDto.family" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Email:</span><br>
          <el-input class="input1" v-model="formLabelAlign.elysKUserDto.email" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Mobile:</span><br>
          <el-input class="input1" v-model="formLabelAlign.elysKUserDto.mobile" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Password:</span><br>
          <el-input class="input1" v-model="formLabelAlign.elysKUserDto.password" placeholder="input to update" show-password :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Activated:</span><br>
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="active" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
    </el-row>
    <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Role Permission:</span><br>
        </div>
    </el-row>
    <el-row>
        <div class="m25 fl" prop="codePro">
          <span>CRM Module:</span><br>
          <el-switch v-model="permission_customer" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Expenses Module:</span><br>
          <el-switch v-model="permission_expense" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Procurment Module:</span><br>
          <el-switch v-model="permission_order" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Purchasing Module:</span><br>
          <el-switch v-model="permission_purchase" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>System Settings:</span><br>
          <el-switch v-model="permission_settings" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
        <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
          <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Sumbit</el-button>
          <el-button type="primary" @click="cancel()">Back</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: "elysUserCreate",
    data() {
      var validatorUser = (rule, value, callback) => {
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
        type: "",
        uuid: '',
        password: '',
        org_password: '',
        activateds: true,
        active: true,
        loading: false,
        group: null,
        group_data: [],
        permission_customer: false,
        permission_expense: false,
        permission_order: false,
        permission_purchase: false,
        permission_settings: false,
        formLabelAlign: {
            elysKUserDto: {
              "activated": 1,
              "active": 0,
              "email": "",
              "family": "",
              "given": "",
              "group": 0,
              "id": 0,
              "identifier": "",
              "identity": "USERNAME",
              "locale": "",
              "mobile": "",
              "password": "",
              "reference": null
            },
            elysKUserRoleDtoList: []
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
      this.uuid = this.$route.query.uuid
      this.$api.get('/member/group/active', null, r => {
          this.group_data.push({reference:"", name:""})
          for (let i = 0; i < r.length; i++) {
              this.group_data.push({reference:r[i].reference, name:r[i].name})
          }
          if (this.type == 'alert') {

          this.$api.get('/member/' + this.$route.query.uuid, null, r => {
              this.org_password = r.elysKUserDto.password
              this.active = r.elysKUserDto.active == 1 ? true : false
              this.activateds = r.elysKUserDto.activated == 1 ? true : false
              this.formLabelAlign = r
              this.group = r.elysKUserDto.group.reference

              this.permission_customer = r.elysKUserRoleDtoList[0].customer == 1 ? true : false
              this.permission_expense = r.elysKUserRoleDtoList[0].expense == 1 ? true : false
              this.permission_order = r.elysKUserRoleDtoList[0].order == 1 ? true : false
              this.permission_purchase = r.elysKUserRoleDtoList[0].purchase == 1 ? true : false
              this.permission_settings = r.elysKUserRoleDtoList[0].miscellaneous == 1 ? true : false
          });
      }
      });
    },
    methods: {
      submitForm(formLabelAlign) {
        if (this.formLabelAlign.elysKUserDto.identifier == ''||this.formLabelAlign.elysKUserDto.identifier == null) {
            alert('Please input username');
        } else if (this.formLabelAlign.elysKUserDto.given == ''||this.formLabelAlign.elysKUserDto.given == null) {
            alert('Please input first name');
        } else if (this.formLabelAlign.elysKUserDto.given == ''||this.formLabelAlign.elysKUserDto.given == null) {
            alert('Please input last name');
        } else if (this.formLabelAlign.elysKUserDto.email == ''||this.formLabelAlign.elysKUserDto.email == null) {
            alert('Please input email');
        } else if (!(/^[0-9]\d*$/.test(this.formLabelAlign.elysKUserDto.mobile))) {
            alert('Please input mobile');
        } else {
            if (this.formLabelAlign.elysKUserDto.password == this.org_password) {
                this.formLabelAlign.elysKUserDto.password = null
            }
            this.formLabelAlign.elysKUserDto.activated = this.activateds ? 1 : 0
            this.formLabelAlign.elysKUserDto.active = this.active ? 1 : 0
            this.formLabelAlign.elysKUserDto.group = {reference: this.group}
            this.loading = true
            if(this.type=='alert'){
              this.$api.put('/member/save', this.formLabelAlign.elysKUserDto, r => {
                this.formLabelAlign.elysKUserRoleDtoList[0].customer = this.permission_customer ? 1 : 0
                this.formLabelAlign.elysKUserRoleDtoList[0].expense = this.permission_expense ? 1 : 0
                this.formLabelAlign.elysKUserRoleDtoList[0].order = this.permission_order ? 1 : 0
                this.formLabelAlign.elysKUserRoleDtoList[0].purchase = this.permission_purchase ? 1 : 0
                this.formLabelAlign.elysKUserRoleDtoList[0].miscellaneous = this.permission_settings ? 1 : 0
                this.$api.post('/member/role/save', this.formLabelAlign, r => {
                    history.back(-1)
                });
              });
            }else{
              this.$api.post('/member/save', this.formLabelAlign.elysKUserDto, r => {
                  var payload = {
                      elysKUserDto : r,
                      elysKUserRoleDtoList : []
                  }
                  var role = {
                      identity: 'STAFF',
                      active: 1,
                      customer: this.permission_customer ? 1 : 0,
                      expense: this.permission_expense ? 1 : 0,
                      order: this.permission_order ? 1 : 0,
                      purchase: this.permission_purchase ? 1 : 0,
                      miscellaneous: this.permission_settings ? 1 : 0
                  }
                  payload.elysKUserRoleDtoList[0] = role
                  console.log(payload)
                  this.$api.post('/member/role/save', payload, r => {
                      history.back(-1)
                  });
              });
            }
          }
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
  .elysUserCreate{
    width: 100%;
    .input1{
      width: 350px;
    }
    .m25{
      margin: 20px 50px auto auto;
    }
    .fl{
      float: left;
    }
  }
</style>

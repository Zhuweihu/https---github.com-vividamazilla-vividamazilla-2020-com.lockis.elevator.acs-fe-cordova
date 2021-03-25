<template>
  <div class="elysCustomerAddressCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
          <div class="m25 fl" prop="codePro">
            <span>Address Line 1:</span><br>
            <el-input class="input1" v-model="formLabelAlign.addrline1" placeholder="input"></el-input>
          </div>
          <div class="m25 fl" prop="codePro">
            <span>Line 2:</span><br>
            <el-input class="input1" v-model="formLabelAlign.addrline2" placeholder="input"></el-input>
          </div>
        <div class="m25 fl" prop="codePro">
          <span>Tel# :</span><br>
          <el-input class="input1" v-model="formLabelAlign.tel" placeholder="input"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="active" style='float: left;margin-top: 10px;margin-left: 20px;'></el-switch>
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
    name: "elysCustomerAddressCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            if (r == false) {
              callback(new Error('customer已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入customer'));
        }
      };
      return{
        labelPosition: 'right',
        type: "new",
        uuid: '',
        loading: false,
        activateds: true,
        active: true,
        value:'',
        password:'',
        address:'',
        formLabelAlign: {
            "id": null,
            "reference": null,
            "addrline1": null,
            "addrline2": null,
            "customer": {
                "reference" : null
            },
          "tel": "",
          "active": 1
        },
        rules: {
          name: [{
            validate: validateUser,
            trigger: 'blur'
          }]
        },
        tableData: [],
      }
    },
    created: function() {
      this.type = this.$route.query.type
      this.uuid = this.$route.query.uuid
      if (this.type == 'alert') {
        this.$api.get('/customer/address/' + this.$route.query.uuid, null, r => {
          this.formLabelAlign = r
          this.active = r.active == 1 ? true : false
        });
      }
    },
    methods: {
      submitForm(formLabelAlign) {
          this.formLabelAlign.active = this.active ? 1 : 0
          if(this.formLabelAlign.addrline1 ==''||this.formLabelAlign.addrline1 ==null) {
            alert('Please input address line 1');
        } else if(this.formLabelAlign.tel == ''||this.formLabelAlign.tel ==null) {
              alert('Please input phone number');
            } else {
          if (this.type == 'alert') {
            this.loading = true
            this.$api.put('/customer/address/save', this.formLabelAlign, r => {
              history.back(-1)
            });
          } else {
            this.formLabelAlign.customer = {
                "reference": this.uuid
            }
            this.$api.post('/customer/address/save', this.formLabelAlign, r => {
              history.back(-1)
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
    },
    alert(uuid) {
      this.$router.push("/elysCustomerAddressCreate?type=alert&uuid=" + uuid)
    },
    cancel_detele() {
      this.dialogVisible = false
    },
    confirm_detele() {
      this.dialogVisible = false
      this.$api.delete('/customer/address/' + this.dialogVisible_reference + '/purge', null, r => {
        this.search();
      });
    },
    detele(reference){
      this.dialogVisible=true
      this.dialogVisible_reference=reference
    }
    }
  }
</script>

<style lang="scss">
  .elysCustomerAddressCreate{
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

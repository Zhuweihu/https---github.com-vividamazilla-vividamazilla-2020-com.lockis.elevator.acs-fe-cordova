<template>
  <div class="elysCustomerCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
          <div class="m25 fl" prop="codePro">
            <span>Full Name:</span><br>
            <el-input class="input1" v-model="formLabelAlign.name" placeholder="input"></el-input>
          </div>
        <div class="m25 fl" prop="codePro">
          <span>Tel# :</span><br>
          <el-input class="input1" v-model="formLabelAlign.tel" placeholder="input"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Email:</span><br>
          <el-input class="input1" v-model="formLabelAlign.email" placeholder="input"></el-input>
        </div>
    </el-row>
    <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="active" style='float: left;margin-top: 10px;margin-left: 20px;'></el-switch>
        </div>
        <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
          <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Sumbit</el-button>
          <el-button type="primary" @click="cancel()">Back</el-button>
        </div>
      </el-row>

      <el-row>
    <div style="margin-top: 60px;" v-bind:style="{ display: is_paddresses_visible }">
      <div style="padding: 0 0;">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="height: 40px;">
              <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style='float: left;height: 40px;' class='search'>
                    <h3>Address Book</h3>
                  </el-form-item>
                  <el-form-item style='float:right;'>
                    <el-button type="primary" @click="customerAddresscreate" style='height:40px;padding: 0 10px;border:0;'>New</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
        <div>
          <el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 10px;">
            <template slot="empty" v-if="loaing_table">
              <span>Opps! No records yet</span>
            </template>
            <template slot="empty" v-if="!loaing_table">
              <i class="el-icon-loading"></i>
              <span>Loading...</span>
            </template>
            <el-table-column prop="addrline1" label="Address Line 1" align='center'>
            </el-table-column>
            <el-table-column prop="addrline2" label="Line 2" align='center'>
            </el-table-column>
            <el-table-column prop="tel" label="Tel" align='center'>
            </el-table-column>
            <el-table-column prop="active" label="Status" align='center'>
              <template slot-scope="scope">
                <span>{{scope.row.active == 1 ? "Enable" : "Disable"}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right"  align='center' label="Action">
              <template slot-scope="scope" >
                <el-button @click="alert(scope.row.reference)" type="danger" size="small" style="margin-right: 20px;" plain>Modify</el-button>
                <el-button @click="detele(scope.row.reference)" type="danger" size="small">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="tishi">
        <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
          <span>Do you really want to delete this Address?</span>
          <span slot="footer" class="dialog-footer">
			<el-button @click="cancel_detele()">No</el-button>
			<el-button type="primary" @click="confirm_detele()">Yes</el-button>
  		  </span>
        </el-dialog>
      </div>
      </div>
        </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "elysCustomerCreate",
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
          titlebg:{
            'background':'rgb(232,236,245)',
            'color':'black'
          },
          dialogVisible: false,
          dialogVisibles: false,
          dialogVisible_group:false,
          dialogVisible_reference:"",
          loaing_table:false,
          formInline: {
            search: '',
            num: '6',
            seek: '',
          },
        labelPosition: 'right',
        is_paddresses_visible: 'block',
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
            "given": "",
            "family": "",
          "email": "",
          "mobile": "",
          "activated": 1,
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
      if (this.type == 'new') this.is_paddresses_visible = 'none'
      if (this.type == 'alert') {
        this.$api.get('/customer/' + this.$route.query.uuid, null, r => {
          this.formLabelAlign = r
          // this.activateds = r.user.activated == 1 ? true : false
          this.active = r.active == 1 ? true : false
          this.$api.get('/customer/' + this.$route.query.uuid +'/address', null, r => {
            this.loaing_table= true
            this.tableData = r
          });

        });
      }
    },
    methods: {
      submitForm(formLabelAlign) {
          this.formLabelAlign.activated = this.activateds ? 1 : 0
          this.formLabelAlign.active = this.active ? 1 : 0
          if(this.formLabelAlign.name ==''||this.formLabelAlign.name ==null) {
            alert('Please input name');
        } else if(this.formLabelAlign.tel == ''||this.formLabelAlign.tel ==null) {
              alert('Please input tel number');
            } else {
          if (this.type != 'new') {
            this.loading = true
            this.$api.put('/customer/save', this.formLabelAlign, r => {
              history.back(-1)
            });
          } else {
            this.$api.post('/customer/save', this.formLabelAlign, r => {
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
  },
  handleClose(done) {
    this.dialogVisible = false
  },
  handleClose(done) {
    this.dialogVisibles = false
  },
  customerAddresscreate() {
    this.$router.push("/elysCustomerAddressCreate?type=new&uuid="+this.uuid)
  },
  search() {
      this.loaing_table=false
      this.tableData=[]
      this.$api.get('/customer/'+ this.uuid + '/address',null, r => {
        this.tableData = r;
      });
  }
    }
  }
</script>

<style lang="scss">
@import '../assets/styles/variable';
.elysCustomerCreate{
    width: 100%;
    .m25{
      margin: 20px 50px auto auto;
    }
    .fl{
      float: left;
    }
    .input1{
      width: 350px;
    }
  .block {
    line-height: 0;
    .el-main {
      line-height: 0
    }
  }
  .tishi {
    line-height: 0;
  }
  .el-table--enable-row-transition {
    overflow: auto;
    border-bottom: 0px solid white
  }
  .el-table_1_column_9,
  .is-leaf {
    line-height: 50px;
    padding: 0
  }
  .second_menu {
    width: 100px;
    line-height: 60px;
    float: left;
    margin-left: 20px;
    font-size: 18px;
    span {
      cursor: pointer
    }
  }
  .el-table__header-wrapper {
    line-height: 50px;
  }
  .selector {
    color: $navHoverTextColor;
  }
  .titles {
    height: 50px;
    background: rgb(224, 224, 224);
    margin-top: 20px;
    line-height: 50px;
    .img {
      width: 30px;
      height: 30px;
      float: right;
      margin-top: 10px;
      margin-right: 50px
    }
    .second_title {
      float: left;
      font-size: 18px;
      margin-left: 20px;
      display: block
    }
  }
  .el-form--inline .el-form-item__label {
    float: left
  }
  .titles_td {
    height: 50px;
    background: rgb(224, 224, 224);
    margin-top: 20px;
    line-height: 50px;
    .but {
      background: rgb(245, 93, 84);
      color: white;
      float: right;
      margin-top: 6.5px;
      margin-right: 40px;
    }
    .second_title {
      float: left;
      font-size: 18px;
      margin-left: 20px;
      display: block
    }
  }
}
</style>

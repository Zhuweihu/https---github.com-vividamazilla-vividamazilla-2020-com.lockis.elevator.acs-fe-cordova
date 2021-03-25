<template>
  <div class="elysWarehouseCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Name:</span><br>
          <el-input class="input1" v-model="formLabelAlign.name" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Type:</span><br>
          <el-select class="input1" v-model="formLabelAlign.type">
              <el-option v-for="item in type_data" :key="item.value" :label="item.name" :value="item.value">
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Address:</span><br>
          <el-input style="width:750px;" type="textarea" autosize placeholder="input" v-model="formLabelAlign.addr">
          </el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
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
    name: "elysWarehouseCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            if (r == false) {
              callback(new Error('倉庫已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入倉庫名'));
        }
      };
      return{
        labelPosition: 'right',
        type: "new",
        uuid: '',
        loading: false,
        activateds: true,
        value:'',
        type_data: [
            {value: "LOCAL", name: "Local"},
            {value: "OVERSEA", name: "Oversea"}
        ],
        formLabelAlign: {
          "active": 0,
          "addr": "",
          "id": "",
          "name": "",
          "reference": null,
          "type": "",
          "validated": 0 //重要
        },
        rules: {
          name: [{
            validate: validateUser,
            trigger: 'blur'
          }]
        },
      }
    },
    created: function() {
      this.type = this.$route.query.type
      if (this.type == 'detail') {
        this.$api.get('/miscellaneous/warehouse/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          this.activateds = r.active == 1 ? true : false
          console.log(r)
        });
      } else if (this.type == 'alert') {
        this.$api.get('/miscellaneous/warehouse/' + this.$route.query.uuid, null, r => {
          console.log("0.12")
          this.formLabelAlign = r
          this.activateds = r.active== 1 ? true : false
        });
        this.uuid = this.$route.query.uuid
      }
    },
    methods: {
      submitForm(formLabelAlign) {
        if(this.formLabelAlign.name==''||this.formLabelAlign.name==null) {
          alert('Please input Name');
      } if(this.formLabelAlign.type == '' ||this.formLabelAlign.type == null) {
          alert('Please input type');
        }else if(this.formLabelAlign.addr==''||this.formLabelAlign.addr==null){
          alert('Please input Address');
        }else {
          if (this.uuid != '') {
              this.formLabelAlign.active = this.activateds ? 1 : 0
            this.loading = true
            this.$api.put('/miscellaneous/warehouse/save', this.formLabelAlign, r => {
              history.back(-1)
            });
          } else {
              this.formLabelAlign.active = this.activateds ? 1 : 0
              this.$api.post('/miscellaneous/warehouse/save', this.formLabelAlign , r => {
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
      }
    }
  }
</script>

<style lang="scss">
  .elysWarehouseCreate{
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

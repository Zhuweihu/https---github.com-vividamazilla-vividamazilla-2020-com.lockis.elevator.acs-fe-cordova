<template>
  <div class="elysBrandCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Brand:</span><br>
          <el-input class="input1" v-model="formLabelAlign.name" placeholder="input" :disabled="type=='detail'"></el-input>
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
    name: "elysBrandCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            if (r == false) {
              callback(new Error('brand已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入brand'));
        }
      };
      return{
        labelPosition: 'right',
        type: "new",
        uuid: '',
        loading: false,
        activateds: true,
        value:'',
        email:'',
        mobile:'',
        formLabelAlign: {
          "activated":1,
          "active": 1,
          "id": null,
          "name": "",
          "reference": null
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
      if (this.type == 'alert') {
        this.$api.get('/miscellaneous/brand/' + this.$route.query.uuid, null, r => {
          this.formLabelAlign = r
          this.activateds = r.active == 1 ? true : false
        });
        this.uuid = this.$route.query.uuid
      }
    },

    methods: {
      submitForm(formLabelAlign) {
          this.formLabelAlign.active = this.activateds ? 1 : 0
        if(this.formLabelAlign.name==''||this.formLabelAlign.name==null) {
          alert('Please input Brand');
        }else {
          if (this.uuid != '') {
            this.loading = true
            this.$api.put('/miscellaneous/brand/save', this.formLabelAlign, r => {
              history.back(-1)
            });
          } else {
              this.$api.post('/miscellaneous/brand/save', this.formLabelAlign, r => {
                history.back(-1)
              });
          }
        }
      },
      detail() {},
      cancel() {
        history.back(-1)
      },
      topage(type) {}
    }
  }
</script>

<style lang="scss">
  .elysBrandCreate{
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

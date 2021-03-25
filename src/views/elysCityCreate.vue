<template>
  <div class="elysCityCreate">
    <div style=" background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>City:</span><br>
          <el-input class="input1" v-model="form.name" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' value="true"></el-switch>
        </div>
        <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
          <el-button type="primary" :loading="loading" @click="submitForm('form')" v-if="type!='detail'">Sumbit</el-button>
          <el-button type="primary" @click="cancel()">Back</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "elysCityCreate",
    data(){
      var validateUser = (rule, value, callback) => {

        console.log(value)

        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            // //console.log(r)
            if (r == false) {
              callback(new Error('city已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入city'));
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
        form: {
          "activated": 1,
          "active": 0,
          "id": 0,
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
        this.$api.get('/miscellaneous/city/' + this.$route.query.uuid, null, r => {
          this.form = r
          this.activateds = r.active == 1 ? true : false
        });
        this.uuid = this.$route.query.uuid
      }
    },
    methods: {
      submitForm(form) {
        if(this.form.name==''||this.form.name==null) {
          alert('Please input City');
        }else {
          if (this.uuid != '') {
            this.form.active = this.activateds ? 1 : 0
            this.loading = true
            console.log(this.form)
            this.$api.put('/miscellaneous/city/save', this.form, r => {
              history.back(-1)
            });
          } else {
            this.form.active = this.activateds ? 1 : 0
            if(this.type=='new'){
              this.$api.post('/miscellaneous/city/save', this.form, r => {
                  history.back(-1)
                });
            }
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
.elysCityCreate{
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

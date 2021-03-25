<template>
  <div class="elysBrandCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <!--        <div class="m25 fl" prop="codePro">-->
        <!--          <span>Name:</span><br>-->
        <!--          <el-input class="input1" v-model="formLabelAlign.avatar.name" placeholder="input" :disabled="type=='detail'"></el-input>-->
        <!--        </div>-->

        <div class="m25 fl" prop="codePro">
          <span>ID:</span><br>
          <el-input class="input1" v-model="formLabelAlign.id" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Brand:</span><br>
          <el-input class="input1" v-model="formLabelAlign.name" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>


        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="active" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
        </div>
      </el-row>


      <el-row>
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
          "active": 1,
          "id": "",
          "name": "",
          "reference": ""
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
        this.$api.get('/miscellaneous/brand/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          this.activateds = r.active == 1 ? true : false
        });
      } else if (this.type == 'alert') {
        this.$api.get('/miscellaneous/brand/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          // this.password = r.password

          this.activateds = r.active== 1 ? true : false
        });
        this.uuid = this.$route.query.uuid
      }
    },
    methods: {


      submitForm(formLabelAlign) {


        // if (this.formLabelAlign.nickname == '' || this.formLabelAlign.mobile == '' || this.formLabelAlign.family == '' ||
        // 	this.formLabelAlign.email == '' || this.formLabelAlign.identifier == '' || this.formLabelAlign.password == '' ||
        // 	this.formLabelAlign.birth == '') {
        // 	alert('内容不能填空');
        // }


        // if(this.formLabelAlign.avatar.name == ''||this.formLabelAlign.avatar.name == null) {
        //   this.formLabelAlign.avatar.name = ''
        //   alert('Please input name');
        // }else
        if(this.formLabelAlign.id==''||this.formLabelAlign.id==null){
          this.formLabelAlign.id=''
          alert('Please input ID');
        }else if(this.formLabelAlign.name==''||this.formLabelAlign.name==null) {
          this.formLabelAlign.name=''
          alert('Please input Brand');
        }else {

          this.formLabelAlign.name = parseInt(this.formLabelAlign.name)

          if (this.uuid != '') {

            if (this.activateds == true) {
              this.formLabelAlign.activated = 1
            } else {
              this.formLabelAlign.activated = 0
            }

            this.loading = true
            this.$api.post('/miscellaneous/brand/save', this.formLabelAlign, r => {
              history.back(-1)
            });

          } else {

            if (this.activateds == true) {
              this.formLabelAlign.activated = 1
            } else {
              this.formLabelAlign.activated = 0
            }

            if(this.type=='new'){
              this.$api.put('/miscellaneous/brand/save', this.formLabelAlign, r => {
                history.back(-1)
              });
            }else{
              this.$api.post('/miscellaneous/brand/save', this.formLabelAlign, r => {
                history.back(-1)
              });

            }


            // this.$api.get('/member/seekIdentifier/' + this.formLabelAlign.identifier, null, r => {
            // 	if (r == false) {
            // 		alert('用戶名已存在');
            // 	} else {
            // 		this.loading = true
            // 		this.$api.post('/member/save', this.formLabelAlign, r => {
            // 			this.$router.push("/UserManagement")
            // 		});
            // 	}
            // });

          }

        }

      },

      detail() {},
      cancel() {
        history.back(-1)
        // this.$router.push("/UserManagement")
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

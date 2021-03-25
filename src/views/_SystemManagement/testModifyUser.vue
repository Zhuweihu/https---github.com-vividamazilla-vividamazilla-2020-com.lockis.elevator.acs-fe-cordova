<template>
  <div class="testNewUser">
    <div style="float:left; background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Name:</span><br>
          <el-input class="input1" v-model="formLabelAlign.avatar.name" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Moblie:</span><br>
          <el-input class="input1" v-model="formLabelAlign.mobile" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Family:</span><br>
          <el-input class="input1" v-model="formLabelAlign.family" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
      </el-row>

      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Given:</span><br>
          <el-input class="input1" v-model="formLabelAlign.given" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Email:</span><br>
          <el-input class="input1" v-model="formLabelAlign.email" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Identifier:</span><br>
          <el-input class="input1" v-model="formLabelAlign.identifier" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
      </el-row>

      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Middle:</span><br>
          <el-input class="input1" v-model="middle" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Password:</span><br>
          <el-input class="input1" v-model="formLabelAlign.password" placeholder="input" show-password :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Birth:</span><br>
          <el-date-picker format="yyyy-MMM-dd" style="width:350px;" v-model="birth" type="date" placeholder="select date" :disabled="type=='detail'?true:false"></el-date-picker>
        </div>
      </el-row>

      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
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
    name: "testNewUser",
    data(){
      var validateUser = (rule, value, callback) => {

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
      return{
        labelPosition: 'right',
        type: "new",
        uuid: '',
        password: '',
        loading: false,
        activateds: true,
        value:'',
        middle:'',
        birth:'',
        formLabelAlign: {
          "activated": 0,
          "active": 0,
          "avatar": {
            "extern": "",
            "id": 0,
            "link": 0,
            "made": 0,
            "md5": "",
            "mime": "",
            "name": "",
            "note": "",
            "purgable": 0,
            "reference": null,
            "type": "AVATAR"
          },
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
          "reference": null,
          "birth": "",
          "validated": 0
        },
        rules: {
          userName: [{
            validate: validateUser,
            trigger: 'blur'
          }]

        },
      }
    },
    created: function() {
      this.type = this.$route.query.type
      if (this.type == 'detail') {
        this.$api.get('/member/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r.elysKUserDto
          this.activateds = r.elysKUserDto.activated == 1 ? true : false
          console.log(r)
        });
      } else if (this.type == 'alert') {
        this.$api.get('/member/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r.elysKUserDto
          // this.password = r.password

          this.activateds = r.elysKUserDto.activated == 1 ? true : false
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
        //   console.log('01')
        //   this.formLabelAlign.avatar.name = ''
        //   alert('Please input name');
        // }else
        if(this.formLabelAlign.mobile==''||this.formLabelAlign.mobile==null){
          this.formLabelAlign.mobile=''
          alert('Please input mobile');
        }else if(this.formLabelAlign.family==''||this.formLabelAlign.family==null) {
          this.formLabelAlign.family=''
          alert('Please input family');
        }else if(this.formLabelAlign.given == ''||this.formLabelAlign.given == null) {
          this.formLabelAlign.given = ''
          alert('Please input given');
        } else if (this.formLabelAlign.email == ''||this.formLabelAlign.email == null) {
          this.formLabelAlign.email = ''
          alert('Please input email');
        }else if(this.formLabelAlign.identifier == ''||this.formLabelAlign.identifier == null) {
          this.formLabelAlign.identifier = ''
          alert('Please input identifier');
        }else if(this.middle==''||this.middle==null){
          this.middle=''
          alert('Please input middle');
        }else if(this.formLabelAlign.password == ''||this.formLabelAlign.password == null) {
          this.formLabelAlign.password = ''
          alert('Please input password');
        }else if(this.birth == ''||this.birth == null) {
          this.birth=''
          alert('Please input birth');
        } else {

          this.formLabelAlign.mobile = parseInt(this.formLabelAlign.mobile)
          this.birth = new Date(this.birth).format("yyyy-MM-dd")

          if (this.uuid != '') {

            if (this.activateds == true) {
              this.formLabelAlign.activated = 1
            } else {
              this.formLabelAlign.activated = 0
            }

            this.loading = true
            console.log(this.formLabelAlign)
            this.$api.post('/member/save', this.formLabelAlign, r => {
              history.back(-1)
            });

          } else {

            if (this.activateds == true) {
              this.formLabelAlign.activated = 1
            } else {
              this.formLabelAlign.activated = 0
            }

            if(this.type=='new'){
              console.log(this.formLabelAlign)
              this.$api.put('/member/save',

                this.formLabelAlign

                , r => {
                  history.back(-1)
                });
            }else{
              console.log(this.formLabelAlign)
              this.$api.post('/member/save', this.formLabelAlign, r => {
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
  .testNewUser{
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

<template>
  <div class="elysWarePurchaseCreate">
    <div style=" background: white;padding: 50px; border-radius: 10px;">
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
          <span>Purchase ID:</span><br>
          <el-input class="input1" v-model="formLabelAlign.product" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div class="m25 fl" prop="codePro">
          <span>Product:</span><br>
          <el-input class="input1" v-model="formLabelAlign.product" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>


        <div class="m25 fl" prop="codePro">
          <span>Quantity:</span><br>
          <el-input class="input1" v-model="formLabelAlign.product" placeholder="input" :disabled="type=='detail'"></el-input>
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
    name: "elysProductCreate",
    data(){
      var validateUser = (rule, value, callback) => {

        console.log(value)

        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            // //console.log(r)
            if (r == false) {
              callback(new Error('purchase已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入purchase'));
        }



      };
      return{
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,

        supplier:'',
        operator:'',

        labelPosition: 'right',
        type: "new",
        uuid: '',
        loading: false,
        activateds: true,
        value:'',
        email:'',
        mobile:'',
        formLabelAlign: {
          "active": 0,
          "allocated": 0,
          "amount": "",
          "available": 0,
          "city": {
            "active": 0,
            "id": 0,
            "name": "",
            "purged": {
              "date": 0,
              "day": 0,
              "hours": 0,
              "minutes": 0,
              "month": 0,
              "nanos": 0,
              "seconds": 0,
              "time": 0,
              "timezoneOffset": 0,
              "year": 0
            },
            "reference": null
          },
          "id": "",
          "made": {
            "date": 0,
            "day": 0,
            "hours": 0,
            "minutes": 0,
            "month": 0,
            "nanos": 0,
            "seconds": 0,
            "time": 0,
            "timezoneOffset": 0,
            "year": 0
          },
          "photos": [
            {
              "active": 0,
              "id": 0,
              "image": {
                "extern": "string",
                "id": 0,
                "link": 0,
                "made": 0,
                "md5": "string",
                "member": {
                  "activated": 0,
                  "active": 0,
                  "avatar": {},
                  "email": "string",
                  "family": "string",
                  "given": "string",
                  "group": 0,
                  "id": 0,
                  "identifier": "string",
                  "identity": "USERNAME",
                  "locale": "string",
                  "mobile": 0,
                  "password": "string",
                  "reference": null
                },
                "mime": "string",
                "name": "string",
                "note": "string",
                "purgable": 0,
                "reference": null,
                "type": "EXPENSEINV"
              },
              "purged": {
                "date": 0,
                "day": 0,
                "hours": 0,
                "minutes": 0,
                "month": 0,
                "nanos": 0,
                "seconds": 0,
                "time": 0,
                "timezoneOffset": 0,
                "year": 0
              },
              "reference": null
            }
          ],
          "product": "",
          "purged": {
            "date": 0,
            "day": 0,
            "hours": 0,
            "minutes": 0,
            "month": 0,
            "nanos": 0,
            "seconds": 0,
            "time": 0,
            "timezoneOffset": 0,
            "year": 0
          },
          "quantity": "",
          "receipts": [
            {
              "active": 0,
              "id": 0,
              "image": {
                "extern": "string",
                "id": 0,
                "link": 0,
                "made": 0,
                "md5": "string",
                "member": {
                  "activated": 0,
                  "active": 0,
                  "avatar": {},
                  "email": "string",
                  "family": "string",
                  "given": "string",
                  "group": 0,
                  "id": 0,
                  "identifier": "string",
                  "identity": "USERNAME",
                  "locale": "string",
                  "mobile": 0,
                  "password": "string",
                  "reference": null
                },
                "mime": "string",
                "name": "string",
                "note": "string",
                "purgable": 0,
                "reference": null,
                "type": "EXPENSEINV"
              },
              "purged": {
                "date": 0,
                "day": 0,
                "hours": 0,
                "minutes": 0,
                "month": 0,
                "nanos": 0,
                "seconds": 0,
                "time": 0,
                "timezoneOffset": 0,
                "year": 0
              },
              "reference": null
            }
          ],
          "reference": null,
          "user": {
            "activated": 0,
            "active": 0,
            "avatar": {
              "extern": "string",
              "id": 0,
              "link": 0,
              "made": 0,
              "md5": "string",
              "member": {},
              "mime": "string",
              "name": "string",
              "note": "string",
              "purgable": 0,
              "reference": null,
              "type": "EXPENSEINV"
            },
            "email": "string",
            "family": "string",
            "given": "string",
            "group": 0,
            "id": 0,
            "identifier": "",
            "identity": "USERNAME",
            "locale": "string",
            "mobile": 0,
            "password": "string",
            "reference": null
          }
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
        this.$api.get('/purchase/' + this.$route.query.uuid, null, r => {
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          this.activateds = r.active == 1 ? true : false
          console.log(r)
        });
      } else if (this.type == 'alert') {
        this.$api.get('/purchase/' + this.$route.query.uuid, null, r => {
          console.log("0.12")
          // this.$router.push("/SystemManagement/UserManagement")
          this.formLabelAlign = r
          // this.password = r.password

          this.activateds = r.active== 1 ? true : false
        });
        this.uuid = this.$route.query.uuid
      }
    },
    methods: {

      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },

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
        if(this.formLabelAlign.id==''||this.formLabelAlign.id==null){
          this.formLabelAlign.id=''
          alert('Please input ID');
        }else if(this.formLabelAlign.product==''||this.formLabelAlign.product==null) {
          this.formLabelAlign.product=''
          alert('Please input purchaseID');
        }else if (this.formLabelAlign.quantity==''||this.formLabelAlign.quantity==null){
          this.formLabelAlign.quantity=''
          alert('Please input total product');
        }else if(this.formLabelAlign.amount==''||this.formLabelAlign.amount==null){
          this.formLabelAlign.amount=''
          alert('Please input cost');
        }else if (this.formLabelAlign.user.identifier==''||this.formLabelAlign.user.identifier==null){
          this.formLabelAlign.user.identifier=''
          alert('Please input quantity');
        }else {

          this.formLabelAlign.name = parseInt(this.formLabelAlign.name)

          if (this.uuid != '') {

            if (this.activateds == true) {
              this.formLabelAlign.active = 1
            } else {
              this.formLabelAlign.active = 0
            }

            this.loading = true
            console.log(this.formLabelAlign)
            this.$api.post('/purchase/save', this.formLabelAlign, r => {
              history.back(-1)
            });

          } else {

            if (this.activateds == true) {
              this.formLabelAlign.active = 1
            } else {
              this.formLabelAlign.active = 0
            }

            if(this.type=='new'){
              console.log(this.formLabelAlign)
              this.$api.put('/purchase/save',

                this.formLabelAlign

                , r => {
                  history.back(-1)
                });
            }else{

              console.log(this.formLabelAlign)
              this.$api.post('/purchase/save', this.formLabelAlign, r => {
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
  .elysWarePurchaseCreate{
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

<template>
  <div class="elysOrderStatusCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Order Status:</span><br>
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
    name: "elysOrderStatusCreate",
    data(){
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
          "active": 0,
          "id": "",
          "name": "",
          "reference": null
        },
      }
    },
    created: function() {
      this.type = this.$route.query.type
      if (this.type == 'alert') {
        this.$api.get('/miscellaneous/orderstatus/' + this.$route.query.uuid, null, r => {
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
          alert('Please input OrderStatus');
        }
        else {
          if (this.uuid != '') {
            this.loading = true
            this.$api.put('/miscellaneous/orderstatus/save', this.formLabelAlign, r => {
              history.back(-1)
            });
          } else {
              this.$api.post('/miscellaneous/orderstatus/save', this.formLabelAlign, r => {
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
  .elysOrderStatusCreate{
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

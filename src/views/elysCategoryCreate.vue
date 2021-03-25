<template>
  <div class="elysCategoryCreate">
    <div style="background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Category:</span><br>
          <el-input class="input1" v-model="formLabelAlign.name" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Parent Category:</span><br>
          <el-select class="input1" v-model="formLabelAlign.parent">
              <el-option v-for="item in category_data" :key="item.reference" :label="item.name" :value="item.reference">
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Status:</span><br>
          <el-switch v-model="activateds" style='float: left;margin-top: 10px;margin-left: 20px;'></el-switch>
        </div>
        <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
          <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Sumbit</el-button>
          <el-button type="primary" @click="cancel()">Back</el-button>
        </div>
      </el-row>

      <el-row v-bind:style="{ display: is_subcategories_visible }">
    <div style="margin-top: 60px;">
      <h3>Subcategories</h3>
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
            <el-table-column prop="id" label="Id" width="100px"  align='center'>
            </el-table-column>
            <el-table-column prop="name" label="Category" width="300px" align='center'>
            </el-table-column>
            <el-table-column prop="active" label="Status" width="250px" align='center'>
              <template slot-scope="scope">
                <span>{{scope.row.active == 1 ? "Enable" : "Disable"}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right"  align='center' label="Action" :min-width="190">
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
          <span>Do you really want to delete this Category?</span>
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
    name: "elysCategoryCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            // //console.log(r)
            if (r == false) {
              callback(new Error('category已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入category'));
        }
      };
      return{
          titlebg:{
            'background':'rgb(232,236,245)',
            'color':'black'
          },
          is_subcategories_visible: 'block',
          loaing_table:false,
          dialogVisible: false,

        labelPosition: 'right',
        type: "new",
        uuid: '',
        newuuid: '',
        loading: false,
        activateds: true,
        value:'',
        email:'',
        mobile:'',
        category_data: [],
        formLabelAlign: {
          "active": 0,
          "id": null,
          "name": "",
          "reference": null,
          "parent": null
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
    beforeRouteUpdate: function(to, from, next) {
        this.type = this.$route.query.type
        this.uuid = this.newuuid
        this.category_data = []
        this.tableData = []
        this.$api.get('/miscellaneous/category/active', null, r => {
            this.category_data.push({reference:"", name:""})
            for (let i = 0; i < r.length; i++) {
                if (r[i].reference == this.uuid) continue;
                this.category_data.push({reference:r[i].reference, name:r[i].name})
            }
            if (this.type == 'alert') {
                this.$api.get('/miscellaneous/category/' + this.$route.query.uuid, null, r => {
                    this.formLabelAlign = r
                    if (r.parent != null) {
                    this.formLabelAlign.parent = r.parent.reference
                    }
                  this.activateds = r.active == 1 ? true : false
                  this.loaing_table = true
                  if (r.child != null) {
                      this.tableData = r.child
                  }
                });
            }
        });
        next()
    },
    created: function() {
      this.type = this.$route.query.type
      this.uuid = this.$route.query.uuid
      if (this.type == 'new') {
          this.is_subcategories_visible = 'none';
      }
      this.$api.get('/miscellaneous/category/active', null, r => {
          this.category_data.push({reference:"", name:""})
          for (let i = 0; i < r.length; i++) {
              if (r[i].reference == this.uuid) continue;
              this.category_data.push({reference:r[i].reference, name:r[i].name})
          }
          if (this.type == 'alert') {
              this.$api.get('/miscellaneous/category/' + this.$route.query.uuid, null, r => {
                  this.formLabelAlign = r
                  if (r.parent != null) {
                  this.formLabelAlign.parent = r.parent.reference
                  }
                this.activateds = r.active == 1 ? true : false
                this.loaing_table = true
                if (r.child != null) {
                    this.tableData = r.child
                }
              });
          }
      });
    },
    methods: {
      submitForm(formLabelAlign) {
          if(this.formLabelAlign.parent!=''&&this.formLabelAlign.parent!=null) {
              this.formLabelAlign.parent = {reference: this.formLabelAlign.parent}
          }
          this.formLabelAlign.active = this.activateds ? 1 : 0
          if(this.formLabelAlign.name==''||this.formLabelAlign.name==null) {
              alert('Please input Category');
          } else {
              if (this.uuid != '') {
                this.loading = true
                this.$api.post('/miscellaneous/category/save', this.formLabelAlign, r => {
                    this.loading = false
                  history.back(-1)
                });
              } else {
                  this.loading = true
                  this.$api.put('/miscellaneous/category/save', this.formLabelAlign, r => {
                      this.loading = false
                    history.back(-1)
                  });
            }
         }
      },
      handleClose(done) {
        this.dialogVisible = false
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
    cancel_detele() {
      this.dialogVisible = false
    },
    confirm_detele() {
      this.dialogVisible = false
      this.$api.delete('/miscellaneous/category/' + this.dialogVisible_reference + '/purge', null, r => {
        this.search();
      });
    },
    detele(reference){
      this.dialogVisible=true
      this.dialogVisible_reference=reference
    },
    alert(uuid) {
        this.newuuid = uuid
      this.$router.push("/elysCategoryCreate?type=alert&uuid=" + uuid)
    },
    }
  }
</script>

<style lang="scss">
  .elysCategoryCreate{
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

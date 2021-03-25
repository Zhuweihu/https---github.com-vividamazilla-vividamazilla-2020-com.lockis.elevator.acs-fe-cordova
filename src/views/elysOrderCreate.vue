<template>
  <div class="elysOrderCreate">
    <div style=" background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
            <span>Customer:</span><br>
          <el-select class="input1" v-model="formLabelAlign.customer.reference">
              <el-option v-for="item in customer_data" :key="item.reference" :label="item.name" :value="item.reference">
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
            <span>Order Status:</span><br>
          <el-select class="input1" v-model="formLabelAlign.status.reference">
              <el-option v-for="item in status_data" :key="item.reference" :label="item.name" :value="item.reference">
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Tracking:</span><br>
          <el-input class="input2" v-model="formLabelAlign.tracking" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
    </el-row>
    <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Remark</span><br>
          <el-input type="textarea" class="input2" v-model="formLabelAlign.remark" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>

        <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
          <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Sumbit</el-button>
          <el-button type="primary" @click="cancel()">Back</el-button>
        </div>
      </el-row>

      <el-row v-bind:style="{ display: is_products_visible }">
      <div style="margin-top: 60px;">
      <div style="padding: 0 0;">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="height: 40px;">
              <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style='float: left;height: 40px;' class='search'>
                      <h3>Procurement List</h3>
                  </el-form-item>
                  <el-form-item style='float:right;'>
                    <el-button type="primary" @click="orderProductcreate" style='height:40px;padding: 0 10px;border:0;'>New</el-button>
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
            <el-table-column prop="brand.name" label="Brand" align='center'>
            </el-table-column>
            <el-table-column prop="quantity" label="Quantity" align='center'>
            </el-table-column>
            <el-table-column prop="category.name" label="Category" align='center'>
            </el-table-column>
            <el-table-column prop="product" label="Product" align='center'>
            </el-table-column>
            <el-table-column prop="color" label="Color" align='center'>
            </el-table-column>
            <el-table-column prop="budget" label="Budget" align='center'>
            </el-table-column>
            <el-table-column prop="cost" label="Cost" align='center'>
            </el-table-column>
            <el-table-column prop="allocated" label="Allocated" align='center'>
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
          <span>Do you really want to delete this product in Procurement?</span>
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
    name: "elysOrderCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
            // //console.log(r)
            if (r == false) {
              callback(new Error('Order已存在'));
            } else {
              callback();
            }
          });
        } else {
          callback(new Error('請輸入Order'));
        }
      };
      return{
          titlebg:{
            'background':'rgb(232,236,245)',
            'color':'black'
          },
        dialogImageUrl: '',
        dialogVisible: false,
        is_products_visible: 'block',
        formInline: {
          search: '',
          num: '6',
          seek: '',
        },
        tableData: [],
        loaing_table:false,
        disabled: false,
        supplier:'',
        operator:'',
        labelPosition: 'right',
        type: "new",
        uuid: '',
        loading: false,
        activateds: true,
        value:'',
        total:'',
        customer_data: [],
        status_data: [],
        shippingrate:'',
        customsrate:'',
        orderstatus:'',
        shippingmethod:'',
        address:'',
        formLabelAlign: {
          "active": 0,
          "customer": {
            "active": 0,
            "email": "string",
            "id": 0,
            "name": "",
            "reference": null,
            "tel": "string"
          },
          "id": "",
          "invoice": null,
          "made": null,
          "products": [],
          "reference": null,
          "remark": null,
          "status": {
            "active": 0,
            "id": 0,
            "name": "",
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
      this.uuid = this.$route.query.uuid
      if (this.type == 'new') {
          this.is_products_visible = 'none';
      }
          this.$api.get('/customer', null, r => {
              this.customer_data.push({reference:"", name:""})
              for (let i = 0; i < r.length; i++) {
                  this.customer_data.push({reference:r[i].reference, name:r[i].name})
              }
              this.$api.get('/miscellaneous/orderstatus/active', null, r => {
                  this.status_data.push({reference:"", name:""})
                  for (let i = 0; i < r.length; i++) {
                      this.status_data.push({reference:r[i].reference, name:r[i].name})
                  }
                  if (this.type == 'alert') {
                      this.$api.get('/order/' + this.$route.query.uuid, null, r => {
                          this.loaing_table = true
                        this.formLabelAlign = r
                        if (r.products != null) {
                            this.tableData = r.products
                        }
                      });
                  }
              });
          });

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
        if(this.formLabelAlign.customer.reference==''||this.formLabelAlign.customer.reference==null) {
          alert('Please select customer');
      }else if (this.formLabelAlign.status.reference==''||this.formLabelAlign.status.reference==null){
          alert('Please select status');
        } else {
            if (this.formLabelAlign.Tracking == '') {
                this.formLabelAlign.Tracking = null
            }
            this.formLabelAlign.active = 1
          if (this.type == 'new') {
            this.loading = false
            this.$api.post('/order/save', this.formLabelAlign, r => {
                this.loading = true
                history.back(-1)
            });
          } else {
              this.loading = false
              this.$api.put('/order/save', this.formLabelAlign, r => {
                  this.loading = true
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
    cancel_detele() {
      this.dialogVisible = false
    },
    confirm_detele() {
      this.dialogVisible = false
      this.loading = true
      for (let i = 0; i < this.formLabelAlign.products.length; i++) {
          if (this.formLabelAlign.products[i].reference == this.dialogVisible_reference) {
              this.formLabelAlign.products.splice(i, 1);
              break
          }
      }
      this.$api.put('/order/save', this.formLabelAlign, r => {
          this.loading = false
          this.formLabelAlign = r
          this.tableData = r.products
      });
    },
    detele(reference){
      this.dialogVisible=true
      this.dialogVisible_reference=reference
    },
    alert(uuid) {
      this.$router.push("/elysOrderProductCreate?type=alert&uuid=" + this.uuid + "&product=" + uuid)
    },
    orderProductcreate() {
        this.$router.push("/elysOrderProductCreate?type=new&uuid=" + this.uuid)
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    handleClose(done) {
      this.dialogVisibles = false
    },
    handleClose_group(){
      this.dialogVisible_group = false
    },
    }
  }
</script>

<style lang="scss">
  .elysOrderCreate{
    width: 100%;

    .input1{
      width: 300px;
    }
    .input2{
      width: 650px;
    }
    .m25{
      margin: 20px 50px auto auto;
    }
    .fl{
      float: left;
    }
  }
</style>

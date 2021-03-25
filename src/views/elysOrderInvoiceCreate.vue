<template>
  <div class="elysOrderInvoiceCreate">
    <div style=" background: white;padding: 50px; border-radius: 10px;">
        <el-row>
            <h3>Invoice Information</h3>
        </el-row>
        <el-row>
            <div class="m25 fl" prop="codePro">
              <span>Invoice To:</span><br>
              <el-input class="input1" v-model="formLabelAlign.name" placeholder="input" :disabled="locked"></el-input>
            </div>
            <div class="m25 fl" prop="codePro">
              <span>Tel:</span><br>
              <el-input class="input1" v-model="formLabelAlign.tel" placeholder="input" :disabled="locked"></el-input>
            </div>
          <div class="m25 fl" prop="codePro">
              <span>Address:</span><br>
            <el-select class="input1" v-model="formLabelAlign.address" :disabled="locked">
                <el-option v-for="item in address_data" :key="item.reference" :label="item.name" :value="item.reference">
                </el-option>
            </el-select>
          </div>
          <div class="m25 fl" prop="codePro">
            <span>Email:</span><br>
            <el-input class="input1" v-model="formLabelAlign.email" placeholder="input" :disabled="locked"></el-input>
          </div>
          <div class="m25 fl" prop="codePro">
            <span>Amount:</span><br>
            <el-input class="input1" v-model="formLabelAlign.amount" placeholder="input" :disabled="locked" type="number"></el-input>
          </div>
          <div class="m25 fl" prop="codePro">
              <span>Payment:</span><br>
            <el-select class="input1" v-model="formLabelAlign.payment" :disabled="locked">
                <el-option v-for="item in payment_data" :key="item.reference" :label="item.name" :value="item.reference">
                </el-option>
            </el-select>
          </div>
          <div class="m25 fl" prop="codePro">
              <span>Deliver Method:</span><br>
            <el-select class="input1" v-model="formLabelAlign.shipping" :disabled="locked">
                <el-option v-for="item in shipping_data" :key="item.reference" :label="item.name" :value="item.reference">
                </el-option>
            </el-select>
          </div>
          <div class="m25 fl" prop="codePro">
            <span>Lock:</span><br>
            <el-switch v-model="locked" style='float: left;margin-top: 10px;margin-left: 20px;' :disabled="type=='detail'?true:false"></el-switch>
          </div>

          <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
              <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Sumbit</el-button>
              <el-button type="primary" @click="print()" v-bind:style="{ display: is_print_visible }">Print</el-button>
              <el-button type="primary" @click="download()" v-bind:style="{ display: is_print_visible }">Download</el-button>
              <el-button type="primary" @click="email()" v-bind:style="{ display: is_print_visible }">E-mail</el-button>
            <el-button type="primary" @click="cancel()">Back</el-button>
          </div>
        </el-row>

        <el-row>
            <h3>Order Information</h3>
        </el-row>
      <el-row>
        <div class="m25 fl" prop="codePro">
            <span>Customer:</span><br>
          <el-select class="input1" v-model="formOrderAlign.customer.reference">
              <el-option v-for="item in customer_data" :key="item.reference" :label="item.name" :value="item.reference" disabled>
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
            <span>Order Status:</span><br>
          <el-select class="input1" v-model="formOrderAlign.status.reference">
              <el-option v-for="item in status_data" :key="item.reference" :label="item.name" :value="item.reference" disabled>
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Tracking:</span><br>
          <el-input class="input2" v-model="formOrderAlign.tracking" placeholder="input" :disabled="type=='detail'" readonly></el-input>
        </div>
    </el-row>
    <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Remark</span><br>
          <el-input type="textarea" class="input2" v-model="formOrderAlign.products[0].product" placeholder="input" :disabled="type=='detail'" readonly></el-input>
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
                      <h3>Item List</h3>
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
        locked: false,
        supplier:'',
        operator:'',
        labelPosition: 'right',
        type: "new",
        uuid: '',
        loading: false,
        activateds: true,
        value:'',
        total:'',
        is_print_visible: 'inline-block',
        customer_data: [],
        status_data: [],
        address_data: [],
        payment_data: [
            {reference: null, name: ''},
            {reference: 'COD', name: 'COD'},
            {reference: 'FPS', name: 'FPS'},
            {reference: 'CHEQUE', name: 'Cheque'},
            {reference: 'BANKTRAN', name: 'Bank Transfer'}
        ],
        shipping_data: [
            {reference: null, name: ''},
            {reference: 'F2F', name: 'Face to face'},
            {reference: 'COURIER', name: 'Courier'}
        ],
        shippingrate:'',
        customsrate:'',
        orderstatus:'',
        shippingmethod:'',
        address:'',
        formLabelAlign: {
        	active: 1,
        	address: null,
        	amount: 0,
        	customer: null,
        	email: null,
        	id: 0,
        	name: null,
        	order: null,
        	payment: null,
        	reference: null,
        	shipping: null,
        	tel: null
        },
        formOrderAlign: {
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
          "invoice": {
            "active": 0,
            "address": 0,
            "amount": 0,
            "customer": {
              "active": 0,
              "email": "string",
              "id": 0,
              "name": "string",
              "reference": null,
              "tel": "string"
            },
            "email": "string",
            "id": 0,
            "name": "string",
            "payment": "COD",
            "reference": null,
            "shipping": "",
            "tel": "string"
          },
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
          "products": [
            {
              "active": 0,
              "allocated": 0,
              "brand": {
                "active": 0,
                "id": 0,
                "name": "string",
                "reference": null
              },
              "budget": "",
              "category": {
                "active": 0,
                "child": [
                  {}
                ],
                "id": 0,
                "name": "",
                "parent": {},
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
              "color": "",
              "cost": 0,
              "id": 0,
              "images": [
                {
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
                }
              ],
              "product": "",
              "quantity": 0,
              "reference": null
            }
          ],
          "reference": null,
          "remark": "string",
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
      if (this.type == 'new') this.is_print_visible = 'none'
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
          });
          this.$api.get('/order/' + this.$route.query.uuid, null, r => {
              this.loaing_table = true
            this.formOrderAlign = r
            if (this.type == 'alert') {
                if (r.invoice != null) {
                    this.formLabelAlign = r.invoice
                } else {
                    this.$api.get('/order/invoice/' + this.$route.query.invoice, null, r => {
                        this.formLabelAlign = r
                    });
                }
                this.locked = r.invoice.lock == 1 ? true : false
            }
            if (r.products != null) {
                this.tableData = r.products
            }
            if (this.type == 'new') {
                this.formLabelAlign.name = r.customer.name
                this.formLabelAlign.tel = r.customer.tel
                var amount = 0
                for (let i = 0; i < r.products.length; i++) {
                    amount += r.products[i].budget
                }
                this.formLabelAlign.amount = amount
                this.formLabelAlign.email = r.customer.email
                this.formLabelAlign.order = r
                this.formLabelAlign.customer = r.customer
            }
            var customerRef = r.customer.reference
            this.$api.get('/customer/'+customerRef+'/address', null, r => {
                this.address_data.push({reference:"", name:""})
                for (let i = 0; i < r.length; i++) {
                    this.address_data.push({reference:r[i].reference, name:r[i].addrline1 + ', '+ r[i].addrline2})
                }
            });

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
        if (this.formLabelAlign.name==''||this.formLabelAlign.name==null) {
            alert('Please input invoice to');
        } else if(this.formLabelAlign.tel==''||this.formLabelAlign.tel==null) {
            alert('Please input tel');
        } else if (this.formLabelAlign.email==''||this.formLabelAlign.email==null){
            alert('Please input email');
        } else if (this.formLabelAlign.amount==''||this.formLabelAlign.amount==null || this.formLabelAlign.amount < 1){
            alert('Please input amount');
        } else if (this.formLabelAlign.payment==''||this.formLabelAlign.payment==null){
            alert('Please select payment');
        } else if (this.formLabelAlign.shipping==''||this.formLabelAlign.shipping==null){
            alert('Please input deliver method');
        } else {
            this.formLabelAlign.lock = this.locked ? 1 : 0
            var addRef = this.formLabelAlign.address
            this.formLabelAlign.address = {
                reference: addRef
            }
            if (this.type == 'alert') {
                this.loading = true
                this.$api.put('/order/invoice/save', this.formLabelAlign, r => {
                    history.back(-1)
                });
            } else {
                this.loading = true
                this.$api.post('/order/invoice/save', this.formLabelAlign, r => {
                    history.back(-1)
                    // this.$router.push("/elysOrderInvoiceCreate?type=alert&uuid=" + this.uuid)
                });
            }
        }
      },
      print() {
          var a = window.open(this.$api.root+'/order/invoice/'+this.formLabelAlign.reference+'/html', '', 'height=384, width=384');
          a.addEventListener('load', function(){
              a.print();
          }, false);
      },
      download() {
          this.$api.axios({
              url: this.$api.root+'/order/invoice/'+this.formLabelAlign.reference+'/pdf',
              method: 'GET',
              responseType: 'blob',
          }).then((response) => {
              var fileURL = window.URL.createObjectURL(new Blob([response.data]));
              var fileLink = document.createElement('a');
              fileLink.href = fileURL;
              fileLink.setAttribute('download', 'file.pdf');
              document.body.appendChild(fileLink);
              fileLink.click();
          });
          // this.$api.get('/order/invoice/'+this.formLabelAlign.reference+'/pdf', null, r => {
          // });
      },
      email() {
          alert('Invoice sent to ' + this.formLabelAlign.email)
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
      for (let i = 0; i < this.formOrderAlign.products.length; i++) {
          if (this.formOrderAlign.products[i].reference == this.dialogVisible_reference) {
              this.formOrderAlign.products.splice(i, 1);
              break
          }
      }
      this.$api.put('/order/save', this.formOrderAlign, r => {
          this.loading = false
          this.formOrderAlign = r
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
  .elysOrderInvoiceCreate{
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

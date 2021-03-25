<template>
  <div class="elysOrderProductCreate">
    <div style=" background: white;padding: 50px; border-radius: 10px;">
      <el-row>
        <div class="m25 fl" prop="codePro">
            <span>Brand:</span><br>
          <el-select class="input1" v-model="formLabelAlign.brand.reference">
              <el-option v-for="item in brand_data" :key="item.reference" :label="item.name" :value="item.reference">
              </el-option>
          </el-select>
        </div>
        <div class="m25 fl" prop="codePro">
            <span>Category:</span><br>
          <el-select class="input1" v-model="formLabelAlign.category.reference">
              <el-option v-for="item in category_data" :key="item.reference" :label="item.name" :value="item.reference">
              </el-option>
          </el-select>
        </div>
    </el-row>
    <el-row>
        <div class="m25 fl" prop="codePro">
          <span>Product Name:</span><br>
          <el-input class="input1" v-model="formLabelAlign.product" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Color:</span><br>
          <el-input class="input1" v-model="formLabelAlign.color" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Quantity:</span><br>
          <el-input class="input1" v-model="formLabelAlign.quantity" placeholder="input" :disabled="type=='detail'" type="number"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Allocated:</span><br>
          <el-input class="input1" v-model="formLabelAlign.allocated" placeholder="input" :disabled="type=='detail'" type="number" readonly></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Budget:</span><br>
          <el-input class="input1" v-model="formLabelAlign.budget" placeholder="input" :disabled="type=='detail'" type="number"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Cost:</span><br>
          <el-input class="input1" v-model="formLabelAlign.cost" placeholder="input" :disabled="type=='detail'" type="number"></el-input>
        </div>
        </el-row>
        <el-row>
          <div class="m25 fl" prop="codePro">
            <span>Photos:</span><br>
            <el-upload action="#" list-type="picture-card" :auto-upload="false" v-model="formLabelAlign.photos"
            :on-change="handlePhotoListChange" :file-list="photoList">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handlePhotoRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-row>
        <el-row>
        <div style="width:100%;text-align: center;margin-top: 45px;float: left;" prop="codePro">
          <el-button type="primary" :loading="loading" @click="submitForm('formLabelAlign')" v-if="type!='detail'">Sumbit</el-button>
          <el-button type="primary" @click="cancel()">Back</el-button>
        </div>
      </el-row>
      <el-row>
      <div style="margin-top: 60px;">
      <div style="padding: 0 0;">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="height: 40px;">
              <div>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item style='float: left;height: 40px;' class='search'>
                      <h3>Automatic Search</h3>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
        <div>
            <iframe :src="searchFrame" height="700" width="100%" frameborder="0"></iframe>
        </div>
      </div>
      </div>
        </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "elysOrderProductCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
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
        searchFrame: '',
        dialogImageUrl: '',
        dialogVisible: false,
        is_subcategories_visible: 'block',
        disabled: false,
        supplier:'',
        operator:'',
        labelPosition: 'right',
        type: "new",
        uuid: '',
        product: '',
        loading: false,
        activateds: true,
        value:'',
        total:'',
        brand_data: [],
        category_data: [],
        photoList: [],
        shippingrate:'',
        customsrate:'',
        orderstatus:'',
        shippingmethod:'',
        address:'',
        formInline: {
          search: '',
          num: '6',
          seek: '',
        },
        orderInfo: {
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
        formLabelAlign: {
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
            "reference": null
          },
          "color": "",
          "cost": 0,
          "id": 0,
          "images": null,
          "product": "",
          "quantity": 0,
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
      this.uuid = this.$route.query.uuid
      this.product = this.$route.query.product
      this.$api.get('/miscellaneous/brand/active', null, r => {
          this.brand_data.push({reference:"", name:""})
          for (let i = 0; i < r.length; i++) {
              this.brand_data.push({reference:r[i].reference, name:r[i].name})
          }
          this.$api.get('/miscellaneous/category/active', null, r => {
              this.category_data.push({reference:"", name:""})
              for (let i = 0; i < r.length; i++) {
                  if (r[i].parent != null)
                  {
                      r[i].name = this.getFullCategoryname(r[i]);
                  }
                  this.category_data.push({reference:r[i].reference, name:r[i].name})
              }
              this.$api.get('/order/' + this.$route.query.uuid, null, r => {
                  this.loaing_table = true
                this.orderInfo = r
                if (this.type == 'alert') {
                    for (let i = 0; i < r.products.length; i++) {
                        if (r.products[i].reference == this.product) {
                            this.formLabelAlign = r.products[i]
                            for (let j = 0; j < r.products[i].images.length; j++) {
                                this.photoList.push({name:r.products[i].images[j].reference, url: this.$api.root+'/kernal/asset/'+r.products[i].images[j].reference})
                            }
                            this.searchFrame = 'https://www.bing.com/images/search?q=' + r.products[i].brand.name + ' ' + r.products[i].category.name + ' ' + r.products[i].product
                            break
                        }
                    }
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
        if(this.formLabelAlign.brand.reference==''||this.formLabelAlign.brand.reference==null) {
          alert('Please select brand');
        } else if (this.formLabelAlign.category.reference==''||this.formLabelAlign.category.reference==null){
          alert('Please select category');
      } else if (this.formLabelAlign.product==''||this.formLabelAlign.product==null){
          alert('Please input product name');
      } else if (this.formLabelAlign.color==''||this.formLabelAlign.color==null){
          alert('Please input color');
      } else if (this.formLabelAlign.quantity==''||this.formLabelAlign.quantity==null){
          alert('Please input quantity');
      } else if (this.formLabelAlign.budget==''||this.formLabelAlign.budget==null){
          alert('Please input budget');
        } else if (this.formLabelAlign.cost==''||this.formLabelAlign.cost==null){
          alert('Please input cost');
        } else {
            this.formLabelAlign.active = 1
          if (this.product != '' && this.product != undefined) {
            this.loading = true
            this.formLabelAlign.images = []
            for (let i = 0; i < this.photoList.length; i++) {
                this.formLabelAlign.images.push({
                    reference: this.photoList[i].name
                })
            }
            for (let i = 0; i < this.orderInfo.products.length; i++) {
                if (this.orderInfo.products[i].reference == this.product) {
                    this.orderInfo.products[i] = this.formLabelAlign
                    break
                }
            }
            this.$api.put('/order/save', this.orderInfo, r => {
                this.loading = false
                history.back(-1)
            });
          } else {
              this.loading = true
              this.formLabelAlign.images = []
              for (let i = 0; i < this.photoList.length; i++) {
                  this.formLabelAlign.images.push({
                      reference: this.photoList[i].name
                  })
              }
              this.orderInfo.products[this.orderInfo.products.length] = this.formLabelAlign
              this.$api.put('/order/save', this.orderInfo, r => {
                  this.loading = false
                  history.back(-1)
              });
          }
        }
      },
      getFullCategoryname(d) {
          var name = d.name;
          if (d.parent != null) {
              name = this.getFullCategoryname(d.parent) + '・' + name;
          }
          return name;
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
    handlePhotoRemove(file) {
        var newList = []
        for (let i = 0; i < this.photoList.length; i++) {
            if (this.photoList[i].name != file.name) {
                newList[newList.length] = {
                    reference: this.photoList[i].name,
                    url: this.$api.root+'/kernal/asset/'+ this.photoList[i].reference
                }
            }
            this.photoList = newList
        }
    },
    handlePhotoListChange(file, fileList) {
        if (file.status == 'ready') {
            let bodyFormData = new FormData();
            bodyFormData.append("file", file.raw);
            bodyFormData.append("type", 'PRODUCT');
            this.$api.post('/kernal/asset/retain', bodyFormData, r => {
                this.photoList.push({name:r.reference, url: this.$api.root+'/kernal/asset/'+r.reference})
            });
        }
    }
    }
  }
</script>

<style lang="scss">
  .elysOrderProductCreate{
    width: 100%;
    .input1{
      width: 300px;
    }
    .m25{
      margin: 20px 50px auto auto;
    }
    .fl{
      float: left;
    }
  }
</style>

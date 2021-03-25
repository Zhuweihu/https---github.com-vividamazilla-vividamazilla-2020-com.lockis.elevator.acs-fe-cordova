<template>
  <div class="elysPurchaseCreate">
    <div style=" background: white;padding: 50px; border-radius: 10px;">
      <el-row>
          <div class="m25 fl" prop="codePro">
              <span>Purchase Location:</span><br>
            <el-select class="input1" v-model="formLabelAlign.city.reference">
                <el-option v-for="item in city_data" :key="item.reference" :label="item.name" :value="item.reference">
                </el-option>
            </el-select>
          </div>
        <div class="m25 fl" prop="codePro">
          <span>Product:</span><br>
          <el-input class="input1" v-model="formLabelAlign.product" placeholder="input" :disabled="type=='detail'"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Total Quantity:</span><br>
          <el-input class="input1" v-model="formLabelAlign.quantity" placeholder="input" :disabled="type=='detail'" type="number"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Amount Spent:</span><br>
          <el-input class="input1" v-model="formLabelAlign.amount" placeholder="input" :disabled="type=='detail'" type="number"></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Allocated:</span><br>
          <el-input class="input1" v-model="formLabelAlign.allocated" placeholder="input" :disabled="type=='detail'" readonly></el-input>
        </div>
        <div class="m25 fl" prop="codePro">
          <span>Available:</span><br>
          <el-input class="input1" v-model="formLabelAlign.available" placeholder="input" :disabled="type=='detail'" readonly></el-input>
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
        <div class="m25 fl" prop="codePro">
          <span>Receipts:</span><br>
          <el-upload action="#" list-type="picture-card" :auto-upload="false" v-model="formLabelAlign.receipts"
          :on-change="handleReceiptListChange" :file-list="receiptList">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleReceiptRemove(file)">
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "elysPurchaseCreate",
    data(){
      var validateUser = (rule, value, callback) => {
        if (value != '') {
          this.$api.get('/member/seekIdentifier/' + value, null, r => {
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
        city_data: [],
        photoList: [],
        receiptList: [],
        formLabelAlign: {
          "active": 1,
          "allocated": 0,
          "amount": "",
          "available": 0,
          "city": {
            "active": 1,
            "id": 0,
            "name": "",
            "reference": null
          },
          "id": null,
          "photos": null,
          "product": "",
          "quantity": "",
          "receipts": null,
          "reference": null,
          "user": null},
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
      this.$api.get('/miscellaneous/city/active', null, r => {
          this.city_data.push({reference:"", name:""})
          for (let i = 0; i < r.length; i++) {
              this.city_data.push({reference:r[i].reference, name:r[i].name})
          }
          if (this.type == 'alert') {
              this.$api.get('/purchase/' + this.$route.query.uuid, null, r => {
                this.formLabelAlign = r
                this.activateds = r.active== 1 ? true : false
                for (let i = 0; i < r.photos.length; i++) {
                    this.photoList.push({name:r.photos[i].image.reference, url: this.$api.root+'/kernal/asset/'+r.photos[i].image.reference})
                }
                for (let i = 0; i < r.receipts.length; i++) {
                    this.receiptList.push({name:r.receipts[i].image.reference, url: this.$api.root+'/kernal/asset/'+r.receipts[i].image.reference})
                }
              });
          }
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
        if(this.formLabelAlign.city.reference==''||this.formLabelAlign.city.reference==null){
          alert('Please select purchase location');
        }else if(this.formLabelAlign.product==''||this.formLabelAlign.product==null) {
          this.formLabelAlign.product=''
          alert('Please input product');
        }else if (this.formLabelAlign.quantity==''||this.formLabelAlign.quantity==null){
          alert('Please input total quantity');
        }else if(this.formLabelAlign.amount==''||this.formLabelAlign.amount==null){
          this.formLabelAlign.amount=''
          alert('Please input cost');
        }else {
          if (this.uuid != '' && this.uuid != undefined) {
            this.formLabelAlign.active
            this.loading = true
            this.formLabelAlign.photos = []
            this.formLabelAlign.receipts = []
            for (let i = 0; i < this.photoList.length; i++) {
                this.formLabelAlign.photos.push({
                    image: {
                        reference: this.photoList[i].name
                    }
                })
            }
            for (let i = 0; i < this.receiptList.length; i++) {
                this.formLabelAlign.receipts.push({
                    image: {
                        reference: this.receiptList[i].name
                    }
                })
            }
            this.$api.put('/purchase/save', this.formLabelAlign, r => {
              history.back(-1)
            });
          } else {
              this.formLabelAlign.active = 1
              this.loading = true
              this.formLabelAlign.available = this.formLabelAlign.quantity
              this.formLabelAlign.photos = []
              this.formLabelAlign.receipts = []
              for (let i = 0; i < this.photoList.length; i++) {
                  this.formLabelAlign.photos.push({
                      image: {
                          reference: this.photoList[i].name
                      }
                  })
              }
              for (let i = 0; i < this.receiptList.length; i++) {
                  this.formLabelAlign.receipts.push({
                      image: {
                          reference: this.receiptList[i].name
                      }
                  })
              }
              console.log(this.formLabelAlign)
              this.$api.post('/purchase/save', this.formLabelAlign, r => {
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
				bodyFormData.append("type", 'PURCHASE');
                this.$api.post('/kernal/asset/retain', bodyFormData, r => {
                    this.photoList.push({name:r.reference, url: this.$api.root+'/kernal/asset/'+r.reference})
                });
            }
        },
        handleReceiptRemove(file) {
            var newList = []
            for (let i = 0; i < this.receiptList.length; i++) {
                if (this.receiptList[i].name != file.name) {
                    newList[newList.length] = {
                        reference: this.receiptList[i].name,
                        url: this.$api.root+'/kernal/asset/'+ this.receiptList[i].reference
                    }
                }
                this.receiptList = newList
            }
        },
        handleReceiptListChange(file, fileList) {
            if (file.status == 'ready') {
                let bodyFormData = new FormData();
                bodyFormData.append("file", file.raw);
                bodyFormData.append("type", 'PURCHASEREC');
                this.$api.post('/kernal/asset/retain', bodyFormData, r => {
                    this.receiptList.push({name:r.reference, url: this.$api.root+'/kernal/asset/'+r.reference})
                });
            }        }
    }
  }
</script>

<style lang="scss">
  .elysPurchaseCreate{
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

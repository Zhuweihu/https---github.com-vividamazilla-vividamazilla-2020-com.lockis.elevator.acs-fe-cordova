<template>
  <div>
    <div class="buttonsetting">
      <div
        style=" background: white;padding: 50px 50px 20px 50px; border-radius: 0px;"
      >
        <div class="head">
          <el-steps
            :active="active"
            finish-status="success"
            space="300px"
            align-center="true"
          >
            <el-step title="Choose floor"></el-step>
            <el-step title="Confirm floor"></el-step>
            <el-step title="complete"></el-step>
          </el-steps>
        </div>
        <div class="result">
          <div>
            <span class="text">Number of negative floors:</span>
            <span>{{ list.min }}</span>
          </div>
          <div>
            <span class="text">The highest floor:</span>
            <span>{{ list.max }}</span>
          </div>
          <div>
            <span class="text">SN:</span>
            <span>{{ list.sn }}</span>
          </div>
          <div>
            <span class="text">Mac Address:</span>
            <span>{{ list.macAddress }}</span>
          </div>
          <div>
            <span class="text">Key:</span>
            <span>{{ list.key }}</span>
          </div>
          <div>
            <span class="text">Validity period(from):</span>
            <span>{{ list.dateStart }}</span>
          </div>
          <div>
            <span class="text">Validity period(to):</span>
            <span>{{ list.dateEnd }}</span>
          </div>
          <div>
            <span class="text">Password:</span>
            <span>{{ list.password }}</span>
          </div>
          <div>
            <span class="text">Whether open the whole floor:</span>
            <span>{{ list.isAll == 1 ? "Yes" : "No" }}</span>
          </div>
          <div>
            <span class="text">Single layer/Double layer:</span>
            <span>{{
              list.isSingle == 1 ? "Single layer" : "Double layer"
            }}</span>
          </div>
          <div>
            <span class="text">Choose floor:</span>
            <span v-for="(item, index) in list.buttonList" :key="index"
              >{{ item }}/F,</span
            >
          </div>
        </div>
      </div>
      <div
        style=" background: white;padding: 10px 50px; border-radius: 0px;"
        class="bottom"
      >
        <button style="background-color:#f46c6c" @click="back">Back</button>
        <button style="background-color:#0977ce" @click="confirm">Confirm</button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'elysExpenseCreate',
  data() {
    var validateUser = (rule, value, callback) => {
      if (value != '') {
        this.$api.get('/member/seekIdentifier/' + value, null, r => {
          if (r == false) {
            callback(new Error('expense已存在'))
          } else {
            callback()
          }
        })
      } else {
        callback(new Error('請輸入expense'))
      }
    }
    return {
      list: [],
      QRCodeList:[],
      active: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      supplier: '',
      operator: '',
      labelPosition: 'right',
      type: 'new',
      uuid: '',
      loading: false,
      locked: false, // 1为true,0为false,默认false（0）
      activateds: true,
      value: '',
      email: '',
      mobile: '',
      invoiceList: [],
      receiptList: [],
      formLabelAlign: {
        active: 0,
        amount: '',
        date: '',
        id: '',
        invoices: [],
        item: '',
        made: null,
        merchant: null,
        purged: null,
        receipts: [],
        reference: null,
        remark: '',
        user: null,
        lock: 0,
      },
      rules: {
        name: [
          {
            validate: validateUser,
            trigger: 'blur', // 失去焦点时触发
          },
        ],
      },
    }
  },
  created: function() {
    // this.list = JSON.parse(this.$route.query.list)
    // console.log(this.$route.query.list)
    // this.QRCodeList = JSON.parse(this.$router.query.QRCodeList)
    console.log(this.$route.params.list)
    this.list = JSON.parse(this.$route.params.list)
    
    this.QRCodeList = JSON.parse(this.$route.params.QRCodeList)
    // console.log("this.$route.query.list", this.$route.query.list)
    this.type = this.$route.query.type
    this.uuid = this.$route.query.uuid
    if (this.type == 'alert') {
      this.$api.get('/expense/' + this.$route.query.uuid, null, r => {
        this.formLabelAlign = r
        this.locked = r.lock == 1
        this.activateds = r.active == 1
        for (let i = 0; i < r.invoices.length; i++) {
          // 循环遍历获取到invoices中的图片对象放入到invoiceList
          this.invoiceList.push({
            name: r.invoices[i].image.reference,
            url:
              this.$api.root + '/kernal/asset/' + r.invoices[i].image.reference,
          })
        }
        for (let i = 0; i < r.receipts.length; i++) {
          // 循环遍历获取到receipts中的图片对象放入到receiptList
          this.receiptList.push({
            name: r.receipts[i].image.reference,
            url:
              this.$api.root + '/kernal/asset/' + r.receipts[i].image.reference,
          })
        }
      })
    }
  },
  methods: {
    back() {
      // this.$router.back()
      history.back(-1)
    },
    confirm(){

        this.$router.push({
        name:'buttonsettingStep3',
        params:{
          list:JSON.stringify(this.List),
          QRCodeList:JSON.stringify(this.QRCodeList)
        }
      });
      console.log("this.list+++++++++++++++++++++++++++",this.QRCodeList)
      this.$api.post("/buttonsettings/save", {
        id: '1',
        reference: 'test',
        button_scheme : 'test',
        name: 'test',
        english_name: 'test'
      }, r => {
          //history.back(-1)
          // this.search();
          console.log("成功了+++++++++++++++++++++++++++++++++")
        });
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      window.open(this.$api.root + '/kernal/asset/' + file.name)
    },
    handlePrint(file) {
      var a = window.open('', '', 'height=384, width=384')
      a.document.write('<html>')
      a.document.write(
        '<img src="' + this.$api.root + '/kernal/asset/' + file.name + '" />',
      )
      a.document.write('</body></html>')
      a.document.close()
      a.addEventListener(
        'load',
        function() {
          a.print()
        },
        false,
      )
    },
    submitForm(formLabelAlign) {
      if (
        this.formLabelAlign.merchant == '' ||
        this.formLabelAlign.merchant == null
      ) {
        alert('Please input merchant name')
      } else if (
        this.formLabelAlign.item == '' ||
        this.formLabelAlign.item == null
      ) {
        alert('Please input Item')
      } else if (
        this.formLabelAlign.amount == '' ||
        this.formLabelAlign.amount == null
      ) {
        alert('Please input amount spent')
      } else if (
        this.formLabelAlign.date == '' ||
        this.formLabelAlign.date == null
      ) {
        alert('Please input date of expenditure')
      } else {
        this.formLabelAlign.active = this.activateds ? 1 : 0
        this.formLabelAlign.lock = this.locked ? 1 : 0
        this.formLabelAlign.invoices = []
        for (let i = 0; i < this.invoiceList.length; i++) {
          this.formLabelAlign.invoices.push({
            image: {
              reference: this.invoiceList[i].name,
            },
          })
        }
        this.formLabelAlign.receipts = []
        for (let i = 0; i < this.receiptList.length; i++) {
          this.formLabelAlign.receipts.push({
            image: {
              reference: this.receiptList[i].name,
            },
          })
        }
        if (this.uuid != '' && this.uuid != undefined) {
          this.loading = true
          this.$api.put('/expense/save', this.formLabelAlign, r => {
            history.back(-1)
          })
        } else {
          this.loading = true
          this.$api.post('/expense/save', this.formLabelAlign, r => {
            history.back(-1)
          })
        }
      }
    },
    detail() {},
    cancel() {
      history.back(-1)
    },
    topage(type) {
      if (type == 'grounp') {
        this.$router.push('/SystemManagement/CustomentManagement')
      } else if (type == 'branch') {
        this.$router.push('/SystemManagement/branchManagement')
      }
    },
    handleInvoiceRemove(file) {
      if (this.locked) return
      var newList = []
      for (let i = 0; i < this.invoiceList.length; i++) {
        if (this.invoiceList[i].name != file.name) {
          newList[newList.length] = {
            reference: this.invoiceList[i].name,
            url:
              this.$api.root + '/kernal/asset/' + this.invoiceList[i].reference,
          }
        }
        this.invoiceList = newList
      }
    },
    handleInvoiceListChange(file, fileList) {
      if (file.status == 'ready') {
        const bodyFormData = new FormData()
        bodyFormData.append('file', file.raw)
        bodyFormData.append('type', 'EXPENSEINV')
        this.$api.post('/kernal/asset/retain', bodyFormData, r => {
          this.invoiceList.push({
            name: r.reference,
            url: this.$api.root + '/kernal/asset/' + r.reference,
          })
        })
      }
    },
    handleReceiptRemove(file) {
      if (this.locked) return
      var newList = []
      for (let i = 0; i < this.receiptList.length; i++) {
        if (this.receiptList[i].name != file.name) {
          newList[newList.length] = {
            reference: this.receiptList[i].name,
            url:
              this.$api.root + '/kernal/asset/' + this.receiptList[i].reference,
          }
        }
        this.receiptList = newList
      }
    },
    handleReceiptListChange(file, fileList) {
      if (file.status == 'ready') {
        const bodyFormData = new FormData()
        bodyFormData.append('file', file.raw)
        bodyFormData.append('type', 'EXPENSEREC')
        this.$api.post('/kernal/asset/retain', bodyFormData, r => {
          this.receiptList.push({
            name: r.reference,
            url: this.$api.root + '/kernal/asset/' + r.reference,
          })
        })
      }
    },
  },
}
</script>

<style lang="scss">
//   .elysExpenseCreate{
//     width: 100%;
//     .input1{
//       width: 300px;
//     }
//     .m25{
//       margin: 20px 50px auto auto;
//     }
//     .fl{
//       float: left;
//     }
//   }
.buttonsetting {
  width: 100%;
  .head {
    margin-left: -100px;
  }
  .result {
    margin-top: 30px;
    .text {
      display: inline-block;
      margin-right: 10px;
      width: 180px;
      color: gray;
      text-align: right;
    }
  }
}
.bottom {
  margin-top: 10px;
  button {
    margin-right: 10px;
    width: 80px;
    height: 3 0px;
    color: #ffffff;
    font-weight: bold;
    border: none;
    border-radius: 3px;
  }
  button:focus {
    outline: none;
  }
}
</style>

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
            <el-step title="Choose realextate"></el-step>
            <el-step title="Choose floor"></el-step>
            <el-step title="Confirm floor"></el-step>
            <el-step title="complete"></el-step>
          </el-steps>
        </div>
        <div class="choose">
          <el-row>
            <el-col :span="6" :offset="4">
              <div >City</div>
              <el-select filterable v-model="form.city" placeholder="请选择">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
            </el-col>
          </el-row>
          <el-row  type="flex">
            <el-col :span="6" :offset="4">
              <div>real extate name</div>
              <input type="text">
            </el-col>
            <el-col :span="6">
              <div>real extate english name</div>
              <input type="text">
            </el-col>
          </el-row>
          <el-row  type="flex">
            <el-col :span="6" :offset="4">
              <div>building name</div>
              <input type="text">
            </el-col>
            <el-col :span="6">
              <div>building english name</div>
              <input type="text">
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div
      style=" background: white;padding: 10px 50px; border-radius: 0px;"
      class="bottom"
    >
      <button style="background-color:#0977ce" @click="next">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "elysExpenseCreate",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value != "") {
        this.$api.get("/member/seekIdentifier/" + value, null, r => {
          if (r == false) {
            callback(new Error("expense已存在"));
          } else {
            callback();
          }
        });
      } else {
        callback(new Error("請輸入expense"));
      }
    };
    return {
      min: 1,
      max: 1,
      // 是否全口
      isAll: "1",
      // 是否单双
      isSingle: "1",
      buttonList: [],
      buttonList_: [],
      List: {},
      QRCodeList: {},
      active: 0,
      name: "",
      sn: "0538998836",
      macAddress: "e0:12:20:20:78:34",
      key: "4167947bd2fc693aa7bf68f317a9eb4c",
      dateStart: "",
      dateEnd: "",
      realextateoptions:[
          {
          value: '沙田第一城',
          label: '沙田第一城'
        },
        {
          value: '新屯门中心',
          label: '新屯门中心'
        }
      ],
         buildingoptions:[
          {
          value: '第一座',
          label: '第一座'
        },
        {
          value: '第二座',
          label: '第二座'
        }
      ],
      realextatevalue: '',
      buildingvalue: '',

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      supplier: "",
      operator: "",
      labelPosition: "right",
      type: "new",
      uuid: "",
      loading: false,
      locked: false, // 1为true,0为false,默认false（0）
      activateds: true,
      value: "",
      email: "",
      mobile: "",
      invoiceList: [],
      receiptList: [],
      formLabelAlign: {
        active: 0,
        amount: "",
        date: "",
        id: "",
        invoices: [],
        item: "",
        made: null,
        merchant: null,
        purged: null,
        receipts: [],
        reference: null,
        remark: "",
        user: null,
        lock: 0
      },
      rules: {
        name: [
          {
            validate: validateUser,
            trigger: "blur" // 失去焦点时触发
          }
        ]
      }
    };
  },
  created: function() {
    this.change();
    this.change_();
    this.type = this.$route.query.type;
    this.uuid = this.$route.query.uuid;
    this.name = this.$route.query.name;
    if (this.type == "alert") {
      this.$api.get("/expense/" + this.$route.query.uuid, null, r => {
        this.formLabelAlign = r;
        this.locked = r.lock == 1;
        this.activateds = r.active == 1;
        for (let i = 0; i < r.invoices.length; i++) {
          // 循环遍历获取到invoices中的图片对象放入到invoiceList
          this.invoiceList.push({
            name: r.invoices[i].image.reference,
            url:
              this.$api.root + "/kernal/asset/" + r.invoices[i].image.reference
          });
        }
        for (let i = 0; i < r.receipts.length; i++) {
          // 循环遍历获取到receipts中的图片对象放入到receiptList
          this.receiptList.push({
            name: r.receipts[i].image.reference,
            url:
              this.$api.root + "/kernal/asset/" + r.receipts[i].image.reference
          });
        }
      });
    }
  },
  methods: {
    //TODO 楼层数据
    change() {
      this.buttonList = [];
      for (var i = 0; i <= this.max; i++) {
        if (this.isAll == 1) {
          this.buttonList.push({
            index: i,
            isSelect: true
          });
        } else {
          if (this.isSingle == 1) {
            if (i % 2 == 1) {
              this.buttonList.push({
                index: i,
                isSelect: true
              });
            } else {
              this.buttonList.push({
                index: i,
                isSelect: false
              });
            }
          } else {
            if (i % 2 == 1) {
              this.buttonList.push({
                index: i,
                isSelect: false
              });
            } else {
              this.buttonList.push({
                index: i,
                isSelect: true
              });
            }
          }
        }
      }
    },
    change_() {
      this.buttonList_ = [];
      for (let i = this.min; i > 0; i--) {
        this.buttonList_.push({
          index: -i,
          isSelect: false
        });
      }
    },
    click(index) {
      this.buttonList[index].isSelect = !this.buttonList[index].isSelect;
    },
    click1(index) {
      this.buttonList_[index + this.buttonList_.length].isSelect = !this
        .buttonList_[index + this.buttonList_.length].isSelect;
    },
    next() {
      this.List = {
        buttonList: [],
        min: this.min,
        max: this.max,
        isAll: this.isAll,
        isSingle: this.isSingle,
        sn: this.sn,
        macAddress: this.macAddress,
        key: this.key,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        password: this.password
      };
      for (let i = 0; i < this.buttonList_.length; i++) {
        if (this.buttonList_[i].isSelect) {
          this.List.buttonList.push(this.buttonList_[i].index);
        }
      }
      for (let i = 0; i < this.buttonList.length; i++) {
        if (this.buttonList[i].isSelect) {
          this.List.buttonList.push(this.buttonList[i].index);
        }
      }

      var max = parseInt(Math.random() * 99);
      var max2 = parseInt(Math.random() * 999);
      var randomnumber = max + ":" + max2;
      var real_extate = "沙田第一城:City One Shatin";
      var building_setting = "第1座:Block 1";
      var elevator = this.name + ":" + "Lift 1";
      var dateStart = new Date(this.dateStart).getTime() / 1000;
      var dateEnd = new Date(this.dateEnd).getTime() / 1000;
      console.log("--------------------------------------");
      console.log(JSON.stringify(this.List.buttonList));
      var buttonList = JSON.stringify(this.List.buttonList)
        .replace("[", "")
        .replace("]", "");
      console.log("next -> new Date(this.dateStart).getTime()", dateStart);
      this.QRCodeList = {
        [randomnumber]: {
          [real_extate]: {
            [building_setting]: {
              [elevator]: [
                buttonList,
                this.sn,
                this.macAddress,
                this.key,
                dateStart,
                dateEnd
              ]
            }
          }
        }
      };
      // alert(JSON.stringify(this.List))
      // this.$router.push(
      //   "/buttonsettingStep2?list=" + JSON.stringify(this.List)
      // );
      this.$router.push({
        name: "buttonsettingStep2",
        params: {
          list: JSON.stringify(this.List),
          QRCodeList: JSON.stringify(this.QRCodeList)
        }
      });
    },
    back() {
      history.back(-1);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      window.open(this.$api.root + "/kernal/asset/" + file.name);
    },
    handlePrint(file) {
      var a = window.open("", "", "height=384, width=384");
      a.document.write("<html>");
      a.document.write(
        '<img src="' + this.$api.root + "/kernal/asset/" + file.name + '" />'
      );
      a.document.write("</body></html>");
      a.document.close();
      a.addEventListener(
        "load",
        function() {
          a.print();
        },
        false
      );
    },
    submitForm(formLabelAlign) {
      if (
        this.formLabelAlign.merchant == "" ||
        this.formLabelAlign.merchant == null
      ) {
        alert("Please input merchant name");
      } else if (
        this.formLabelAlign.item == "" ||
        this.formLabelAlign.item == null
      ) {
        alert("Please input Item");
      } else if (
        this.formLabelAlign.amount == "" ||
        this.formLabelAlign.amount == null
      ) {
        alert("Please input amount spent");
      } else if (
        this.formLabelAlign.date == "" ||
        this.formLabelAlign.date == null
      ) {
        alert("Please input date of expenditure");
      } else {
        this.formLabelAlign.active = this.activateds ? 1 : 0;
        this.formLabelAlign.lock = this.locked ? 1 : 0;
        this.formLabelAlign.invoices = [];
        for (let i = 0; i < this.invoiceList.length; i++) {
          this.formLabelAlign.invoices.push({
            image: {
              reference: this.invoiceList[i].name
            }
          });
        }
        this.formLabelAlign.receipts = [];
        for (let i = 0; i < this.receiptList.length; i++) {
          this.formLabelAlign.receipts.push({
            image: {
              reference: this.receiptList[i].name
            }
          });
        }
        if (this.uuid != "" && this.uuid != undefined) {
          this.loading = true;
          this.$api.put("/expense/save", this.formLabelAlign, r => {
            history.back(-1);
          });
        } else {
          this.loading = true;
          this.$api.post("/expense/save", this.formLabelAlign, r => {
            history.back(-1);
          });
        }
      }
    },
    detail() {},
    cancel() {
      history.back(-1);
    },
    topage(type) {
      if (type == "grounp") {
        this.$router.push("/SystemManagement/CustomentManagement");
      } else if (type == "branch") {
        this.$router.push("/SystemManagement/branchManagement");
      }
    },
    handleInvoiceRemove(file) {
      if (this.locked) return;
      var newList = [];
      for (let i = 0; i < this.invoiceList.length; i++) {
        if (this.invoiceList[i].name != file.name) {
          newList[newList.length] = {
            reference: this.invoiceList[i].name,
            url:
              this.$api.root + "/kernal/asset/" + this.invoiceList[i].reference
          };
        }
        this.invoiceList = newList;
      }
    },
    handleInvoiceListChange(file, fileList) {
      if (file.status == "ready") {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file.raw);
        bodyFormData.append("type", "EXPENSEINV");
        this.$api.post("/kernal/asset/retain", bodyFormData, r => {
          this.invoiceList.push({
            name: r.reference,
            url: this.$api.root + "/kernal/asset/" + r.reference
          });
        });
      }
    },
    handleReceiptRemove(file) {
      if (this.locked) return;
      var newList = [];
      for (let i = 0; i < this.receiptList.length; i++) {
        if (this.receiptList[i].name != file.name) {
          newList[newList.length] = {
            reference: this.receiptList[i].name,
            url:
              this.$api.root + "/kernal/asset/" + this.receiptList[i].reference
          };
        }
        this.receiptList = newList;
      }
    },
    handleReceiptListChange(file, fileList) {
      if (file.status == "ready") {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file.raw);
        bodyFormData.append("type", "EXPENSEREC");
        this.$api.post("/kernal/asset/retain", bodyFormData, r => {
          this.receiptList.push({
            name: r.reference,
            url: this.$api.root + "/kernal/asset/" + r.reference
          });
        });
      }
    }
  }
};
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
  .choose {
    margin-top: 20px;
    width: 80%;
    // margin-left: 100px;
    // height: 80px;
      input {
        border: 1px solid #dddddd;
        width: 200px;
        height: 24px;
        margin-bottom: 40px;
      }
      .picker {
        width: 200px;
        height: 24px;
      }
    
  }
  .choose:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .negativefloor,
  .mainfloor {
    margin-bottom: 10px;
    .button {
      padding-left: 20px;
      padding-bottom: 10px;
      width: 90%;
      background-color: #f0f3f8;
      border: 2px solid #dddddd;
      button {
        float: left;
        margin: 10px 10px 0 0;
        width: 40px;
        height: 40px;
        font-weight: bold;
        background-color: #fff;
        border: none;
        border-radius: 100%;
      }
      button:focus {
        outline: none;
      }
      .select {
        background-color: #f56c6c;
        color: #fff;
      }
    }
    .button:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
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

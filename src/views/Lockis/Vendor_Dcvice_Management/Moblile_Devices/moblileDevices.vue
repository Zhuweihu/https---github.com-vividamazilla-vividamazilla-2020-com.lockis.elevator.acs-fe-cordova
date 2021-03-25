<template>
  <div class="elysExpense">
    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">
            <div>
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-form-item style="float:left;">
                  <h3>Moblile Devices</h3>
                </el-form-item>
                <el-form-item style="float: left;height: 40px;" class="search">
                  <el-input
                    v-model="formInline.seek"
                    placeholder="Name"
                    style="margin-left: 15px;width: 256px;height: 40px;line-height: 40px;"
                  ></el-input>
                </el-form-item>
                <el-form-item style="float:left;height: 35px;">
                  <el-button
                    type="primary"
                    @click="onSubmit"
                    style="height:40px;border:0;padding: 0 10px;"
                    >Search</el-button
                  >
                </el-form-item>
                <el-form-item style="float:right;">
                  <el-button
                    type="primary"
                    @click="expensecreate"
                    style="height:40px;padding: 0 10px;border:0;"
                    >New</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="border-radius: 0px;background: white;height: 676px;width: 100%;"
    >
      <div>
        <!-- <el-table
          :data="tableData"
          :header-cell-style="titlebg"
          style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 0px;"
        >
          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>
          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <el-table-colum type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
          </el-form>
            </template>
          </el-table-colum>
          <el-table-column prop="id" label="ID" align="center" v-if="show">
          </el-table-column>
          <el-table-column  label="No." align="center" type="index">
          </el-table-column>
          <el-table-column prop="name" label="Name" align="center">
          </el-table-column>
          <el-table-column prop="english_name" label="English Name" align="center">
          </el-table-column>
          <el-table-column prop="elysNrealExtate" label="Real Extate" align="center">
          </el-table-column>
          <el-table-column prop="elysNbuilding" label="Building" align="center">
          </el-table-column>
          <el-table-column prop="elysNelevator" label="Elevator" align="center">
          </el-table-column>
          <el-table-column prop="deviceCode" label="Device Code" align="center">
          </el-table-column>
          <el-table-column prop="model" label="Model" align="center">
          </el-table-column>
          <el-table-column prop="qrCode" label="QR Code" align="center">
          </el-table-column>
          <el-table-column prop="useTheSystem" label="Use The Ststem" align="center">
          </el-table-column>
          <el-table-column prop="user" label="User" align="center">
          </el-table-column>
          <el-table-column prop="remarks" label="Remark" align="center">
          </el-table-column>
          <el-table-column
            prop="revised"
            label="Update time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="made"
            label="Create time"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="Action"
            :min-width="190"
          >
            <template slot-scope="scope">
              <el-button
                @click="modify(scope.row)"
                type="danger"
                size="small"
                style="margin-right: 20px;"
                plain
                >Modify</el-button
              >

              <el-button
                @click="detele(scope.row.reference)"
                type="danger"
                size="small"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table> -->
        <el-table :data="tableData"  :header-cell-style="titlebg"
          style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 0px;">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="Name">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="English Name">
                  <span>{{ props.row.english_name }}</span>
                </el-form-item>
                <el-form-item label="Reax Extate">
                  <span>{{ props.row.elysNrealExtate }}</span>
                </el-form-item>
                <el-form-item label="Building">
                  <span>{{ props.row.elysNbuilding }}</span>
                </el-form-item>
                <el-form-item label="Elevator">
                  <span>{{ props.row.elysNelevator }}</span>
                </el-form-item>
                <el-form-item label="Device Code">
                  <span>{{ props.row.deviceCode }}</span>
                </el-form-item>
                <el-form-item label="Model">
                  <span>{{ props.row.model }}</span>
                </el-form-item>
                <el-form-item label="QR Code">
                  <span>{{ props.row.qrCode }}</span>
                </el-form-item>
                <el-form-item label="Use The System">
                  <span>{{ props.row.useTheSystem }}</span>
                </el-form-item>
                <el-form-item label="User">
                  <span>{{ props.row.user }}</span>
                </el-form-item>
                <el-form-item label="Remark">
                  <span>{{ props.row.remarks }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="ID" prop="id" v-if="false"> </el-table-column>
          <el-table-column label="Reference" prop="reference"> </el-table-column>
          <el-table-column label="No." type="index"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column label="English Name" prop="english_name"> </el-table-column>
          <el-table-column label="Update time" prop="revised"> </el-table-column>
          <el-table-column label="Create time" prop="made"> </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="Action"
            :min-width="190"
          >
            <template slot-scope="scope">
              <el-button
                @click="modify(scope.row)"
                type="danger"
                size="small"
                style="margin-right: 20px;"
                plain
                >Modify</el-button
              >

              <el-button
                @click="detele(scope.row.reference)"
                type="danger"
                size="small"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog
            :title="isNew ? 'Create real extate' : 'Change real extate'"
            :visible.sync="dialogFormVisible"
          >
            <el-form :model="form">
              <el-form-item
                label="ID"
                :label-width="formLabelWidth"
                v-if="false"
              >
                <el-input
                  v-model="form.id"
                  autocomplete="off"
                  :placeholder="res.id"
                ></el-input>
              </el-form-item>
              <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="English Name" :label-width="formLabelWidth">
                <el-input
                  v-model="form.english_name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Real Extate" :label-width="formLabelWidth">
                <el-input
                  v-model="form.elysNrealExtate"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Building" :label-width="formLabelWidth">
                <el-input
                  v-model="form.elysNbuilding"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Elevator" :label-width="formLabelWidth">
                <el-input
                  v-model="form.elysNelevator"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Device Code" :label-width="formLabelWidth">
                <el-input
                  v-model="form.deviceCode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Model" :label-width="formLabelWidth">
                <el-input v-model="form.model" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="QR Code" :label-width="formLabelWidth">
                <el-input v-model="form.qrCode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="Use The System"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.useTheSystem"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="User" :label-width="formLabelWidth">
                <el-input v-model="form.user" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input v-model="form.remarks" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">cancel</el-button>
              <el-button type="primary" @click="confirm()">confirm</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination
          :page-size="sum"
          layout="total,prev, pager, next"
          :total="totalElements"
          @current-change="pages02"
          :current-page="page01"
        >
        </el-pagination>
      </div>
    </div>
    <div class="tishi">
      <el-dialog
        title="Tips"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        top="20%"
      >
        <span>Do you really want to delete this Real extate?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_detele()">No</el-button>
          <el-button type="primary" @click="confirm_detele()">Yes</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="tishi">
      <el-dialog
        title=""
        :visible.sync="dialogVisible_group"
        width="30%"
        :before-close="handleClose_group"
        top="20%"
      >
        <span>Group change:&nbsp;</span>
        <el-select v-model="options" filterable placeholder="Select">
          <el-option
            v-for="item in options_list"
            :key="item.name"
            :label="item.name"
            :value="item.reference"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_state()">NO</el-button>
          <el-button type="primary" @click="confirm_state()">YES</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "moblileDevices",
  data() {
    return {
      show: false,
      titlebg: {
        background: "rgb(232,236,245)",
        color: "black"
      },
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisible_group: false,

      dialogVisible_reference: "",

      loaing_table: false,
      value1: "",
      test: "010101",
      formInline: {
        search: "",
        num: "6",
        seek: ""
      },
      value6: [],
      sum: 10,
      totalElements: 50,
      page01: 1,
      tableData: [],
      options: "",
      options_list: [],
      member_reference: "",

      //dialog
      res: {},
      dialogFormVisible: false,
      isNew: false,
      form: {
        id: "",
        deviceCode: "",
        elysNbuilding: "",
        elysNelevator: "",
        elysNrealExtate: "",
        english_name: "",
        model: "",
        name: "",
        qrCode: "",
        reference: "",
        remarks: "",
        useTheSystem: "",
        user: ""
      },
      formLabelWidth: "130px"
    };
  },
  created: function() {
    //总数
    this.$api.get("/expense/count", null, r => {
      this.totalElements = r;
    });
    //获取数据
    this.search();
  },
  methods: {
    //test
    confirm() {
      //信息修改/新增后，提交this._data.form完成修改/新增
      console.log(this._data.form);
      this._data.dialogFormVisible = false;
      var uuid = this._data.form.reference;
      console.log("UUID:" + this._data.form.uuid);
      if (uuid != "" && uuid != undefined) {
        console.log("我是小婷");
        this.loading = true;
        this.$api.put("/mobiledevices/update", this._data.form, r => {
          // history.back(-1)
          //this.$router.back()
          this.search();
        });
      } else {
        this.alert("aaa");
        this.$api.post("/mobiledevices/save", this._data.form, r => {
          //history.back(-1)
          this.search();
        });
      }
    },
    modify(res) {
      //修改按钮触发函数
      this._data.isNew = false;
      this._data.dialogFormVisible = true;
      this._data.res = res;
      this.form.id = res.id;
      this.form.deviceCode = res.deviceCode;
      this.form.elysNbuilding = res.elysNbuilding;
      this.form.elysNelevator = res.elysNelevator;
      this.form.elysNrealExtate = res.elysNrealExtate;
      this.form.english_name = res.english_name;
      this.form.model = res.model;
      this.form.name = res.name;
      this.form.qrCode = res.qrCode;
      this.form.reference = res.reference;
      this.form.remarks = res.remarks;
      this.form.useTheSystem = res.useTheSystem;
      this.form.user = res.user;
      // console.log(this._data.res);
      // console.log("2",this.res)
    },
    detele(reference) {
      //删除按钮触发函数
      this.dialogVisible = true;
      this.dialogVisible_reference = reference;
    },
    expensecreate() {
      //新增按钮触发函数
      this._data.isNew = true;
      this._data.res = {};
      this.form = {};
      this._data.dialogFormVisible = true;
    },
    cancel_detele() {
      //删除弹出框取消函数
      this.dialogVisible = false;
    },
    confirm_detele() {
      //删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false;
      this.$api.delete(
        "/mobiledevices/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.search();
        }
      );
      // console.log(this.dialogVisible_reference)
    },
    search() {
      //请求数据方法
      this.loaing_table = false;
      this.tableData = [];
      this.$api.get(
        "/mobiledevices/" + (this.page01 - 1) + "/" + this.sum,
        null,
        r => {
          // this.$api.get("moblileDevices.json", null, r => {
          for (let i = 0; i < r.length; i++) {
            r[i].made = new Date(r[i].made)
              .toLocaleDateString()
              .split("/")
              .join("-");
            if (r[i].revised != null) {
              r[i].revised = new Date(r[i].revised)
                .toLocaleDateString()
                .split("/")
                .join("-");
            }
          }
          this.tableData = r;
          console.log(this.tableData);
        }
      );
      // this.tableData = [
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   },
      //   {
      //     id: "1",
      //     deviceCode: "1sbhjkabck",
      //     elysNbuilding: "第一座",
      //     elysNelevator: "一号梯",
      //     elysNrealExtate: "沙田第一城",
      //     english_name: "iPhone",
      //     model: "sxsdacacc",
      //     name: "苹果",
      //     qrCode: "这是一个二维码",
      //     reference: "1dsascsacdscsca",
      //     remarks: "这是一个备注",
      //     useTheSystem: "Mac",
      //     user: "admin",
      //     made: "2020-2-3",
      //     revised: "2020-2-4"
      //   }
      // ];
    },
    //test
    indexMethod(index) {
      return (parseInt(this.page01) - 1) * 10 + index + 1;
    },
    confirm_state() {
      this.$api.put(
        "/expense" +
          this.member_reference +
          "/group/" +
          this.options +
          "/assign",
        null,
        r => {
          this.search();
          this.dialogVisible_group = false;
        }
      );
    },
    cancel_state() {
      this.dialogVisible_group = false;
    },

    assign(uuid) {
      this.dialogVisible_group = true;
      this.member_reference = uuid;
    },

    handleClose(done) {
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.dialogVisibles = false;
    },

    handleClose_group() {
      this.dialogVisible_group = false;
    },
    onSubmit() {
      this.page01 = 1;
      this.search();
    },
    lock(id) {
      this.dialogVisibles = true;
      this.statusid = id;
    },
    suoding_queren() {
      this.dialogVisibles = false;
      this.$api.get("/Design/onLock/" + this.statusid, null, r => {
        this.search();
      });
    },
    suoding_quxiao() {
      this.dialogVisibles = false;
    },
    pages02(val) {
      this.page01 = val;
      this.search();
    },
    return_guest() {
      this.$router.push("/CustomerOrderManagement");
    },
    details(uuid) {
      this.$router.push("/Add_Permission?uuid=" + uuid);
    },
    chengping() {
      this.$router.push("/SystemManagement/CustomerList");
    },
    topage(type) {
      if (type == "user") {
        this.$router.push("/SystemManagement/CustomerOrderManagement");
      } else if (type == "branch") {
        this.$router.push("/SystemManagement/CustomerList");
      }
    },
    detail(uuid) {
      this.$router.push("/elysExpenseCreate?type=detail&uuid=" + uuid);
    },
    alert(res) {
      // alert(JSON.stringify(res))
    }
  }
};
</script>

<style lang="scss">
@import "../../../../assets/styles/variable";

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 180px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }

.elysExpense {
  .block {
    line-height: 0;

    .el-main {
      line-height: 0;
    }
  }

  .tishi {
    line-height: 0;
  }

  .el-table--enable-row-transition {
    // height: 500px;
    overflow: auto;
    border-bottom: 0px solid white;
  }

  .el-table_1_column_9,
  .is-leaf {
    line-height: 50px;
    padding: 0;
  }

  .second_menu {
    width: 100px;
    line-height: 60px;
    float: left;
    margin-left: 20px;
    font-size: 18px;

    span {
      cursor: pointer;
    }
  }

  .el-table__header-wrapper {
    line-height: 50px;
  }

  .selector {
    color: $navHoverTextColor;
  }

  .titles {
    height: 50px;
    background: rgb(224, 224, 224);
    margin-top: 20px;
    line-height: 50px;

    .img {
      width: 30px;
      height: 30px;
      float: right;
      margin-top: 10px;
      margin-right: 50px;
    }

    .second_title {
      float: left;
      font-size: 18px;
      margin-left: 20px;
      display: block;
    }
  }

  .el-form--inline .el-form-item__label {
    float: left;
  }

  .titles_td {
    height: 50px;
    background: rgb(224, 224, 224);
    margin-top: 20px;
    line-height: 50px;

    .but {
      // background: $navHoverTextColor;
      background: rgb(245, 93, 84);
      color: white;
      float: right;
      margin-top: 6.5px;
      margin-right: 40px;
    }

    .second_title {
      float: left;
      font-size: 18px;
      margin-left: 20px;
      display: block;
    }
  }
}
</style>

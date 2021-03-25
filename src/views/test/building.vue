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
                  <h3>Building</h3>
                </el-form-item>
                <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="formInline.seek" placeholder="Name" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>
                <el-form-item style='float:left;height: 35px;'>
                  <el-button type="primary" @click="onSubmit" style='height:40px;border:0;padding: 0 10px;'>Search</el-button>
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
      style="border-radius: 10px;background: white;height: 676px;width: 100%;"
    >
      <div>
        <el-table
          :data="tableData"
          :header-cell-style="titlebg"
          style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 10px;"
        >
          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>
          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <el-table-column prop="id" label="ID" align="center" v-if= false>
          </el-table-column>
          <el-table-column prop="reference" label="Reference" align="center" v-if= false>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Building Name"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="remarks" label="Remark" align="center">
          </el-table-column>
          <el-table-column prop="elys_nreal_extate" label="Real Extate ID" align="center" v-if= false>
          </el-table-column>
          <el-table-column prop="floor_number" label="Floor" align="center">
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
                @click="detele(scope.row.id)"
                type="danger"
                size="small"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog
            :title="isNew ? 'Create building' : 'Change building'"
            :visible.sync="dialogFormVisible"
          >
            <el-form :model="form" status-icon ref="form">
              <el-form-item
                label="ID"
                :label-width="formLabelWidth"
                v-if= false
              >
                <el-input
                  v-model="form.id"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Reference"
                :label-width="formLabelWidth"
                v-if= false
              >
                <el-input
                  v-model="form.reference"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Building Name"
                :label-width="formLabelWidth"
              >
                <el-input
                  size="mini"
                  v-model="form.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input
                  v-model="form.remarks"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item 
                label="Floor" 
                :label-width="formLabelWidth" 
                >
                <el-input
                  v-model="form.floor_number"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Real Extate ID" :label-width="formLabelWidth"  v-if= false>
                <el-input
                  v-model="form.elys_nreal_extate"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible=false">cancel</el-button>
              <el-button type="primary" @click="confirm()"
                >confirm</el-button
              >
            </div>
          </el-dialog>
        </div>
      </div>
      <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination
          :page-size="sum"
          layout="prev, pager, next"
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
  name: "building",
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
      totalElements: 0,
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
        reference: "",
        name: "",
        remarks: "",
        elys_nreal_extate: "",
        floor_number: []
      },
      rules:{
        floor:[
          { required: true, message: 'floor is not null', trigger: 'blur'},
          { type: 'number', message: 'floor is a number', trigger: 'blur'}
        ]
      },
      formLabelWidth: "130px"
    };
  },
  created: function() {
    //总数
    // this.$api.get("/expense/count", null, r => {
    //   this.totalElements = r;
    // });
    this.totalElements = 500;
    //获取数据
    this.search();
  },
  methods: {
    //test
    confirm(){
      //信息修改/新增后，提交this._data.form完成修改/新增
      // console.log(this._data.form)
      alert(JSON.stringify(this._data.form))
      this._data.dialogFormVisible = false;
    },
    modify(res) {
      //修改按钮触发函数
      this._data.isNew = false
      this._data.dialogFormVisible = true;
      this._data.res = res;
      this.form.id = res.id;
      this.form.reference = res.reference
      this.form.name = res.name;
      this.form.remarks = res.remarks;
      this.form.elys_nreal_extate = res.elys_nreal_extate
      this.form.floor_number = res.floor_number
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
      this._data.isNew = true
      this._data.res ={}
      this.form ={}
      this._data.dialogFormVisible =true
    },
    cancel_detele() {
      //删除弹出框取消函数
      this.dialogVisible = false;
    },
    confirm_detele() {
      //删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false;
      // this.$api.delete(
      //   "/expense/" + this.dialogVisible_reference + "/purge",
      //   null,
      //   r => {
      //     this.search();
      //   }
      // );
      // console.log(this.dialogVisible_reference)
    },
    search() {
      //请求数据方法
      this.loaing_table = false;
      this.tableData = [];
      // this.$api.get('/building/'+(this.page01-1)+'/'+this.sum,null,r=> {
      this.$api.get("building.json", null, r => {
        for (let i = 0; i < r.length; i++) {
          r[i].formatted_date = new Date(r[i].date)
            .toLocaleDateString()
            .split("/")
            .join("-");
        }
        this.tableData = r;
        console.log(this.tableData);
      });
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
@import "../../assets/styles/variable";

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

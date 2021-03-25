<template>
  <div class="elysExpense">
    <el-card>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="ID" :label-width="formLabelWidth" v-if="false">
          <el-input v-model="form.id" autocomplete="off" :placeholder="res.id"></el-input>
        </el-form-item>
        <el-form-item label="reference" :label-width="formLabelWidth" v-if="false">
          <el-input v-model="form.reference" autocomplete="off" :placeholder="res.reference"></el-input>
        </el-form-item>
        <el-form-item label="Real estate Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="English Name" :label-width="formLabelWidth" prop="name_en">
          <el-input v-model="form.name_en" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Address" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Category" :label-width="formLabelWidth" prop="categoryValue">
          <el-cascader :show-all-levels="false" v-model="categoryValue" :options="categoryOptions" :props="{ expandTrigger: 'hover' }" @change="changecategory"></el-cascader>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:10px;">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" style="float:right;margin-right:10px;" @click="confirm">Confirm</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="danger" style="float:left;margin-left:10px;" @click="back">Return</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
function processTreeData(id, datas) {
  if (Array.isArray(datas)) {
    var childNodes = [];
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].parent != null && datas[i].parent.id == id) {
        var temp = datas[i];
        var temp_ = {};
        temp_.id = temp.id;
        temp_.label = temp.name;
        temp_.value = temp.reference;
        childNodes.push(temp_);
      }
    }
    return childNodes;
  }
}
import axios from "axios";
export default {
  name: "CreateRealestate",
  data() {
    var validatecategory = (rule, value, callback) => {
      if (this.categoryValue === "") {
        callback(new Error("please select category"));
      } else {
        callback();
      }
    };
    return {
      res: {},
      categoryOptions: [],
      categoryValue: [],
      parentNode: [],
      form: {
        id: "",
        reference: "",
        name: "",
        name_en: "",
        address: "",
        remark: "",
        category: {},
      },
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" },
        ],
        name_en: [
          {
            required: true,
            message: "please input englishname",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "please input address", trigger: "blur" },
        ],
        categoryValue: [{ validator: validatecategory, trigger: "change" }],
      },
      formLabelWidth: "140px",
    };
  },
  created() {
    this.res = this.$route.params.res;
    this.$api.get("/miscellaneous/category", null, (r) => {
      var parentNodes = [];
      for (let i = 0; i < r.length; i++) {
        if (r[i].parent == null) {
          var temp = r[i];
          var temp_ = {};
          temp_.id = temp.id;
          temp_.label = temp.name; //label
          temp_.value = temp.reference;
          parentNodes.push(temp_);
        }
      }
      for (let i = 0; i < parentNodes.length; i++) {
        if (parentNodes[i].id != null) {
          var temp = parentNodes[i];
          temp["children"] = processTreeData(parentNodes[i].id, r);
          parentNodes[i] = temp;
        }
      }
      this.categoryOptions = parentNodes;
      if (this.res) {
        var res = this.res
        this.form.id = res.id;
        this.form.reference = res.reference;
        this.form.address = res.address;
        this.form.name = res.name;
        this.form.name_en = res.name_en;
        this.form.remark = res.remark;
        // this.form.category = res.category;
        for (let i = 0; i < this.categoryOptions.length; i++) {
          if (this.categoryOptions[i].children) {
            for (let j = 0; j < this.categoryOptions[i].children.length; j++) {
              if (
                this.categoryOptions[i].children[j].label == res.category.name
              ) {
                this.categoryValue = [];
                this.categoryValue.push(this.categoryOptions[i].value);
                this.categoryValue.push(
                  this.categoryOptions[i].children[j].value
                );
              }
            }
          }
        }
        this.form.category = {
          reference: res.category.reference,
        };
      }
    });
  },
  methods: {
    changecategory() {
      if (this.form.category) {
        this.form.category = {};
      }
      this.form.category = {
        reference: this.categoryValue[this.categoryValue.length - 1],
      };
    },
    confirm() {
      // 信息修改/新增后，提交this._data.form完成修改/新增
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this._data.dialogFormVisible = false;
          var uuid = this.form.reference;
          // console.log("UUID:"+this._data.form.uuid)
          if (uuid != "" && uuid != undefined) {
            // console.log("我是小婷")
            this.loading = true;
            this.$api.put("/lksKRealestate/update", this._data.form, (r) => {
              history.back(-1)
            });
          } else {
            this.$api.post("/lksKRealestate/save", this._data.form, (r) => {
              history.back(-1);
            });
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      history.back(-1);
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/styles/variable";

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

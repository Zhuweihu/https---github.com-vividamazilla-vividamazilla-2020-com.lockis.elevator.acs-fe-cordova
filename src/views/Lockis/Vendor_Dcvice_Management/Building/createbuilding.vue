<template>
  <div class="elysExpense">
    <el-card>
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="ID" :label-width="formLabelWidth" v-if=false>
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Reference" :label-width="formLabelWidth" v-if=false>
          <el-input v-model="form.reference" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Realestate" :label-width="formLabelWidth" prop="realestateValue">
          <el-select filterable v-model="realestateValue" placeholder="请选择" @change="changeRealestate">
            <el-option v-for="item in realestateOptions" :key="item.reference" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Building Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="English Name" :label-width="formLabelWidth" prop="name_en">
          <el-input v-model="form.name_en" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Remark" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
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
export default {
  name: "CreateBuilding",
  created() {
    this.res = this.$route.params.res;
    this.$api.get("/lksKRealestate", null, (r) => {
      this.realestateOptions = r;
      if (this.res) {
        var res = this.res;
        this.form.id = res.id;
        this.form.name = res.name;
        this.form.name_en = res.name_en;
        this.form.remark = res.remark;
        this.form.reference = res.reference;
        this.realestateValue = res.realestate.id;
        for (let i = 0; i < this.realestateOptions.length; i++) {
          if (this.realestateOptions[i].id === this.realestateValue) {
            this.form.realestate = this.realestateOptions[i];
          }
        }
      }
    });
  },
  data() {
    var validaterealestate = (rule, value, callback) => {
      if (this.realestateValue === "") {
        callback(new Error("please select realestate"));
      } else {
        callback();
      }
    };
    return {
      realestateOptions: [],
      realestateValue: "",
      res: {},
      form: {
        id: "",
        name: "",
        reference: "",
        name_en: "",
        remark: "",
        realestate: {},
      },
      rules: {
        realestateValue: [{ validator: validaterealestate, trigger: "change" }],
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
      },
      formLabelWidth: "130px",
    };
  },
  methods: {
    changeRealestate() {
      if (this.form.realestate) {
        this.form.realestate = {};
      }
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id === this.realestateValue) {
          this.form.realestate = this.realestateOptions[i];
        }
      }
    },
    confirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var uuid = this.form.reference;
          if (uuid != "" && uuid != undefined) {
            this.loading = true;
            this.$api.put("/lksKBuilding/update", this._data.form, (r) => {
              history.back(-1);
            });
          } else {
            this.$api.post("/lksKBuilding/save", this._data.form, (r) => {
              history.back(-1);
            });
          }
        } else {
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

<template>
  <div class="elysExpense">
    <el-card>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="ID" :label-width="formLabelWidth" v-if="false">
          <el-input v-model="form.id" autocomplete="off" :placeholder="res.id"></el-input>
        </el-form-item>
        <el-form-item label="reference" :label-width="formLabelWidth" v-if="false">
          <el-input v-model="form.reference" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Real estate" :label-width="formLabelWidth" prop="realestateValue">
          <el-select filterable v-model="realestateValue" placeholder="请选择" @change="changerealestate" :disabled="isdisabled">
            <el-option v-for="item in realestateOptions" :key="item.reference" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Building" :label-width="formLabelWidth" prop="buildingValue">
          <el-select filterable v-model="buildingValue" placeholder="请选择" @change="changebuilding" :disabled="isdisabled">
            <el-option v-for="item in buildingOptions" :key="item.reference" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Machine" :label-width="formLabelWidth" prop="machineValue">
          <el-select filterable v-model="machineValue" placeholder="请选择" @change="changemachine" :disabled="isdisabled">
            <el-option v-for="item in machineOptions" :key="item.reference" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="English Name" :label-width="formLabelWidth" prop="name_en">
          <el-input v-model="form.name_en" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Designation" :label-width="formLabelWidth" prop="designation">
          <el-input v-model="form.designation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Output" :label-width="formLabelWidth" prop="output">
          <el-input type="number" min="1" v-model="form.output" autocomplete="off"></el-input>
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
  name: "CreateButton",
  data() {
    var validaterealestate = (rule, value, callback) => {
      if (this.realestateValue === "") {
        callback(new Error("please select realestate"));
      } else {
        callback();
      }
    };
    var validatebuilding = (rule, value, callback) => {
      if (this.buildingValue === "") {
        callback(new Error("please select building"));
      } else {
        callback();
      }
    };
    var validatemachine = (rule, value, callback) => {
      if (this.machineValue === "") {
        callback(new Error("please select machine"));
      } else {
        callback();
      }
    };
    return {
      res: {},
      realestateOptions: [],
      realestateValue: "",
      buildingOptions: [],
      buildingValue: "",
      machineOptions: [],
      machineValue: "",
      isdisabled: false,
      form: {
        id: "",
        reference: "",
        name: "",
        name_en: "",
        designation: "",
        output: 1,
        remark: "",
        machine: {},
      },
      rules: {
        realestateValue: [{ validator: validaterealestate, trigger: "change" }],
        buildingValue: [{ validator: validatebuilding, trigger: "change" }],
        machineValue: [{ validator: validatemachine, trigger: "change" }],
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
        designation: [
          {
            required: true,
            message: "please input designation",
            trigger: "blur",
          },
        ],
        output: [
          { required: true, message: "please input output", trigger: "blur" },
        ],
      },
      formLabelWidth: "130px",
    };
  },
  created() {
    this.res = this.$route.params.res;
    this.$api.get("/lksKRealestate", null, (r) => {
      this.realestateOptions = r;
      if (this.res) {
        var res = this.res
        this.form.id = res.id;
        this.form.reference = res.reference;
        this.form.name = res.name;
        this.form.name_en = res.name_en;
        this.form.designation = res.designation;
        this.form.output = res.output;
        this.form.remark = res.remark;
        this.form.machine = res.machine;
        this.realestateValue = res.machine.building.realestate.id;
        // console.log("res.machine.building.realestate.id",res.machine.building.realestate.id)
        this.buildingValue = res.machine.building.id;
        // console.log("res.machine.building.id",res.machine.building.id)
        this.machineValue = res.machine.id;
        // console.log("res.machine.id",res.machine.id)

        // this.form.category = res.category;
        for (let i = 0; i < this.realestateOptions.length; i++) {
          if (this.realestateOptions[i].id == this.realestateValue) {
            this.form.realextate = this.realestateOptions[i].reference;
          }
        }
        this.$api.get(
          "/lksKBuilding/byRealestate/" +
            res.machine.building.realestate.reference,
          null,
          (r) => {
            this.buildingOptions = r;
            this.isdisabled = false;
          }
        );

        for (let i = 0; i < this.buildingOptions.length; i++) {
          if (this.buildingOptions[i].id == this.buildingValue) {
            this.form.building = this.buildingOptions[i].reference;
          }
        }
        this.$api.get(
          "/lksKMachine/byBuilding/" + res.machine.building.reference,
          null,
          (r) => {
            this.machineOptions = r;
          }
        );
      }
    });
  },
  methods: {
    changerealestate() {
      // this.buildingValue = "";
      // this.machineValue = [];
      // this.form.machine = [];
      // this.form.building = '';
      // this.machineOptions = [];
      this.buildingValue = "";
      this.machineValue = "";
      this.machineOptions = [];
      this.form.machine = {};
      this.isdisabled = true;
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id == this.realestateValue) {
          this.form.realextate = this.realestateOptions[i].reference;
        } else if (this.realestateOptions[i].id == this.realestateSearchValue) {
          this.form.realextate = this.realestateOptions[i].reference;
        }
      }
      this.$api.get(
        "/lksKBuilding/byRealestate/" + this.form.realextate,
        null,
        (r) => {
          this.buildingOptions = r;
          this.isdisabled = false;
        }
      );
    },
    changebuilding() {
      // this.machineValue = [];
      // this.form.machine = [];
      this.machineValue = "";
      this.form.machine = {};
      for (let i = 0; i < this.buildingOptions.length; i++) {
        if (this.buildingOptions[i].id == this.buildingValue) {
          this.form.building = this.buildingOptions[i].reference;
        } else if (this.buildingOptions[i].id == this.buildingSearchValue) {
          this.form.building = this.buildingOptions[i].reference;
        }
      }
      this.$api.get(
        "/lksKMachine/byBuilding/" + this.form.building,
        null,
        (r) => {
          this.machineOptions = r;
        }
      );
    },
    changemachine() {
      this.form.machine = {};
      for (let i = 0; i < this.machineOptions.length; i++) {
        if (this.machineValue == this.machineOptions[i].id) {
          this.form.machine = this.machineOptions[i];
        } else if (this.machineSearchValue == this.machineOptions[i].id) {
          this.form.machine = this.machineOptions[i];
        }
      }
    },
    confirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.reference) {
            this.$api.put("/lksKButton/update", this.form, (r) => {
              history.back(-1);
            });
          } else {
            this.$api.post("/lksKButton/save", this.form, (r) => {
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

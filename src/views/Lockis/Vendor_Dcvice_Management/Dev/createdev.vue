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
        <el-form-item label="Dev model" :label-width="formLabelWidth" prop="modelValue">
          <el-select filterable v-model="modelValue" placeholder="请选择" @change="changemodel">
            <el-option v-for="item in modelOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Key" :label-width="formLabelWidth" prop="ekey">
          <el-input v-model="form.ekey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Mac" :label-width="formLabelWidth" prop="mac">
          <el-input v-model="form.mac" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="SN" :label-width="formLabelWidth" prop="sn">
          <el-input v-model="form.sn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type" :label-width="formLabelWidth" prop="type">
          <el-select filterable v-model="form.type" placeholder="请选择">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Active" :label-width="formLabelWidth">
          <el-input v-model="form.active" autocomplete="off"></el-input>
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
  name: "CreateDev",
  data() {
    var validatemodel = (rule, value, callback) => {
      if (this.modelValue === "") {
        callback(new Error("please select model"));
      } else {
        callback();
      }
    };
    return {
      modelOptions: [],
      typeOptions: [],
      modelValue: "",
      res: {},
      form: {
        id: "",
        reference: "",
        ekey: "",
        mac: "",
        sn: "",
        type: 1,
        model: {},
        active: "",
      },
      rules: {
        modelValue: [{ validator: validatemodel, trigger: "change" }],
        ekey: [
          { required: true, message: "please input key", trigger: "blur" },
        ],
        mac: [{ required: true, message: "please input mac", trigger: "blur" }],
        sn: [{ required: true, message: "please input sn", trigger: "blur" }],
        type: [
          { required: true, message: "please input type", trigger: "change" },
        ],
      },
      formLabelWidth: "130px",
    };
  },
  created() {
    this.res = this.$route.params.res;
    this.$api.get("/miscellaneous/LksLDevmodel", null, (r) => {
      this.modelOptions = r;
      for(let i=0;i<r.length;i++){
        var obj = {
          "value": r[i].id
        }
        this.typeOptions.push(obj)
      }
      if (this.res) {
        var res = this.res;
        this.form.id = res.id;
        this.form.reference = res.reference;
        this.form.name = res.model.name;
        this.form.ekey = res.ekey;
        this.form.mac = res.mac;
        this.form.sn = res.sn;
        this.form.type = res.type;
        this.modelValue = res.model.id;
        for (let i = 0; i < this.modelOptions.length; i++) {
          if (this.modelOptions[i].id === this.modelValue) {
            this.form.model = this.modelOptions[i];
          }
        }
      }
    });
  },
  methods: {
    changemodel() {
      for (let i = 0; i < this.modelOptions.length; i++) {
        if (this.modelOptions[i].id == this.modelValue) {
          this.form.model = this.modelOptions[i];
        } else {
        }
      }
    },
    confirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          var uuid = this.form.reference;
          if (uuid != "" && uuid != undefined) {
            this.loading = true;
            this.$api.put("/lksKDdev/update", this.form, (r) => {
              history.back(-1);
            });
          } else {
            this.$api.post("/lksKDdev/save", this.form, (r) => {
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

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
        <el-form-item label="Devmodel Name" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Enable" :label-width="formLabelWidth" prop="enable">
          <el-input type="number" min="1" v-model="form.enable" autocomplete="off"></el-input>
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
  name: "CreateDevmodel",
  data() {
     var checkenable = (rule, value, callback) => {
       console.log(typeof(value))
        if(typeof(value)=='number'&&value>0){
          callback()
        }else{
          callback(new Error('please input a number'))
        }
      };
    return {
      res: {},
      form: {
        id: "",
        name: "",
        reference: "",
        enable: 1,
      },
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" },
        ],
        enable: [
          {required: true, message: "please input enable with a number", trigger: "blur" },
          {validator: checkenable, trigger: 'blur'}
        ],
      },
      formLabelWidth: "130px",
    };
  },
  created(){
    this.res = this.$route.params.res
    if(this.res){
      var res = this.res
      this.form.id = res.id
      this.form.name = res.name
      this.form.enable = res.enable
      this.form.reference = res.reference
    }
  },
  methods: {
    confirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          var uuid = this.form.reference;
          if (uuid != "" && uuid != undefined) {
            this.loading = true;
            this.$api.put(
              "/miscellaneous/LksLDevmodel/update",
              this._data.form,
              (r) => {
                history.back(-1)
              }
            );
          } else {
            this.$api.post(
              "/miscellaneous/LksLDevmodel/save",
              this._data.form,
              (r) => {
                history.back(-1)
              }
            );
          }
        } else {
          return false;
        }
      });
    },
    back() {
      history.back(-1)
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

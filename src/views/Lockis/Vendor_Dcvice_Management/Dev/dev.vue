<template>
  <div class="elysExpense">
    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 120px;">
            <div>
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <!-- <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="likeSearch" placeholder="Name" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>
                <el-form-item style='float:left;height: 35px;'>
                  <el-button type="primary" @click="like" style='height:40px;border:0;padding: 0 10px;'>Search</el-button>
                </el-form-item> -->
                <el-card>
                  <el-form-item style="float:right;">
                  <el-button
                    type="primary"
                    @click="expensecreate"
                    style="height:40px;padding: 0 10px;border:0;"
                    >New</el-button
                  >
                </el-form-item>
                </el-card>
              </el-form>
              <div>
                <h3>Dev</h3>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="background: white;height: 676px;width: 100%;"
    >
      <div>
        <el-table
          :data="tableData"
          :header-cell-style="titlebg"
          style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;"
        >
          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>
          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <el-table-column  label="No." align="center" type="index">
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center" v-if= false>
          </el-table-column>
          <el-table-column prop="reference" label="Reference" align="center" v-if= false>
          </el-table-column>
          <el-table-column
            prop="model.name"
            label="Name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="ekey"
            label="Key"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="mac" label="Mac" align="center">
          </el-table-column>
          <el-table-column prop="sn" label="SN" align="center">
          </el-table-column>
          <el-table-column prop="type" label="Type" align="center">
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
        </el-table>
        <div>
          <el-dialog
            :title="isNew ? 'Create Dev' : 'Change Dev'"
            :visible.sync="dialogFormVisible"
          >
            <el-form :model="form" status-icon :rules="rules" ref="ruleForm">
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
                label="Dev model"
                :label-width="formLabelWidth"
                prop="modelValue"
              >
                <el-select filterable v-model="modelValue" placeholder="请选择" @change="changemodel">
                  <el-option
                    v-for="item in modelOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Key" :label-width="formLabelWidth" prop="ekey">
                <el-input
                  v-model="form.ekey"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Mac" :label-width="formLabelWidth" prop="mac">
                <el-input
                  v-model="form.mac"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="SN" :label-width="formLabelWidth" prop="sn">
                <el-input
                  v-model="form.sn"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Type" :label-width="formLabelWidth" prop="type">
                <el-input
                  type="number"
                  placeholder="number"
                  v-model="form.type"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Active" :label-width="formLabelWidth">
                <el-input
                  v-model="form.active"
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
        <span>Do you really want to delete this dev?</span>
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
  name: 'Dev',
  data() {
    var validatemodel = (rule, value, callback) => {
        if (this.modelValue === '') {
          callback(new Error('please select model'));
        } else {
          callback();
        }
      }
    return {
      show: false,
      likeSearch: '',
      titlebg: {
        background: 'rgb(232,236,245)',
        color: 'black',
      },
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisible_group: false,

      dialogVisible_reference: '',

      loaing_table: false,
      value1: '',
      test: '010101',
      formInline: {
        search: '',
        num: '6',
        seek: '',
      },
      value6: [],
      sum: 8,
      totalElements: 0,
      page01: 1,
      tableData: [],
      options: '',
      options_list: [],
      member_reference: '',

      // dialog
      res: {},
      dialogFormVisible: false,
      isNew: false,
      realestateOptions:[],
      realestateValue: '',
      modelOptions: [],
      modelValue: '',
      form: {
        id: '',
        reference: '',
        ekey: '',
        mac: '',
        sn: '',
        type: '',
        model: {},
        active: ''
      },
      rules: {
        modelValue:[{validator:validatemodel, trigger: 'change'}],
        ekey:[{required: true, message: 'please input key', trigger: 'blur'}],
        mac:[{required: true, message: 'please input mac', trigger: 'blur'}],
        sn:[{required: true, message: 'please input sn', trigger: 'blur'}],
        type:[{required: true, message: 'please input type', trigger: 'blur'}]
      },
      formLabelWidth: '130px',
    }
  },
  created: function() {
    // 总数
    this.$api.get("/lksKDdev/count", null, r => {
      this.totalElements = r;
    });
    // 获取数据
    this.search()
    this.loaing_table = true
    this.$api.get("/miscellaneous/LksLDevmodel", null , r => {
      this.modelOptions = r
    })
  },
  methods: {
    // test
    changemodel(){
      for(let i = 0;i<this.modelOptions.length;i++){
        // console.log(i,this.modelOptions[i].reference)
        // console.log(this.modelOptions[i].reference == this.modelValue)
        if(this.modelOptions[i].id == this.modelValue){
          // console.log(i,this.modelOptions[i].reference)
          this.form.model = this.modelOptions[i]
          
        }else{
          // console.log(i,this.modelOptions[i].reference)
        }
      }
    },
    like(){
      this.$api.get("/building/category/"+this.likeSearch, null, r => {
        this.tableData = r
      })
    },
    changeRealestate(){
      if(this.form.realestate){
        this.form.realestate = {}
      }
      for(let i = 0;i<=this.realestateOptions.length;i++){
        if(this.realestateOptions[i].name === this.realestateValue){
          this.form.realestate = this.realestateOptions[i]
          // console.log(this.form)
        }
      }
    },
    confirm() {
      // 信息修改/新增后，提交this._data.form完成修改/新增
      // console.log(this._data.form)
      // alert(JSON.stringify(this._data.form))
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
        this._data.dialogFormVisible = false
       var uuid = this._data.form.reference
          // console.log("UUID:"+this._data.form.uuid)
        if (uuid != ''&& uuid!=undefined ) {
          this.loading = true
          this.$api.put('/lksKDdev/update', this._data.form, r => {
            // history.back(-1)
            //this.$router.back()
            this.search()
            this.realestateValue = ''
          });
        } else {
          this.alert('aaa')
          this.$api.post('/lksKDdev/save', this._data.form, r => {
            //history.back(-1)
            this.search()
            this.realestateValue = ''
          });
        }    
          } else {
            return false;
          }
        })
    },
    modify(res) {
      // 修改按钮触发函数
      this.$router.push({
        name: 'createdev',
        params:{
          res: res
        }
      })
      this._data.isNew = false
      // this._data.dialogFormVisible = true
      this._data.res = res
    //   this.form.id = res.id
    //   this.form.name = res.name
      // console.log("res",res)
      this.form.id = res.id
      this.form.reference = res.reference
      this.form.name = res.model.name
      this.form.ekey = res.ekey
      this.form.mac = res.mac
      this.form.sn = res.sn
      this.form.type = res.type
      this.modelValue = res.model.id
      for(let i = 0;i<this.modelOptions.length;i++){
        if(this.modelOptions[i].id === this.modelValue){
          this.form.model = this.modelOptions[i]
          // console.log(this.form)
        }
      }
      // console.log("2",this.res)
    },
    detele(reference) {
      // 删除按钮触发函数
      // console.log(res)
      this.dialogVisible = true
      this.dialogVisible_reference = reference
    },
    expensecreate() {
      // 新增按钮触发函数
      this._data.isNew = true
      this._data.res = {}
      this.form = {
        id: '',
        reference: '',
        ekey: '',
        mac: '',
        sn: '',
        type: '',
        model: {}
      }
      this.modelValue = ''
      // this._data.dialogFormVisible = true
      this.$router.push('createdev')
    },
    cancel_detele() {
      // 删除弹出框取消函数
      this.dialogVisible = false
    },
    confirm_detele() {
      // 删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false
      this.$api.delete(
        "/lksKDdev/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.$api.get("/lksKDdev/count", null, r => {
          this.totalElements = r;
          if(this.page01-1>=this.totalElements/this.sum){
            this.page01 = this.page01-1
            }
           this.search();
          })
        }
      );
      // this.$api.delete(
      //   "/lksKDdev/" + this.dialogVisible_reference + "/purge",
      //   null,
      //   r => {
      //     this.search();
      //   }
      // );
      // console.log(this.dialogVisible_reference)
    },
    search() {
      // 请求数据方法
      this.loaing_table = false
      this.tableData = []
      // TODO building 请求数据
      this.$api.get('/lksKDdev/'+(this.page01-1)+'/'+this.sum,null,r=> {
      // this.$api.get('building.json', null, r => {
        for (let i = 0; i < r.length; i++) {
          r[i].made = new Date(r[i].made).toLocaleDateString().split('/').join('-')
            if(r[i].revised!=null){
                r[i].revised = new Date(r[i].revised).toLocaleDateString().split('/').join('-')
            }
        }
        this.tableData = r
        // console.log("aaaaaaaaaaaaaaaaaa",this.tableData)
      })
    },
    // test
    indexMethod(index) {
      return (parseInt(this.page01) - 1) * 8 + index + 1
    },
    confirm_state() {
      this.dialogVisible_group = false
      // console.log(this.dialogVisible_reference)
        this.$api.delete('/lksKDdev/' + res + '/purge', null, r => {
          this.search();
        });
    },
    cancel_state() {
      this.dialogVisible_group = false
    },

    assign(uuid) {
      this.dialogVisible_group = true
      this.member_reference = uuid
    },

    handleClose(done) {
      this.dialogVisible = false
    },

    handleClose_group() {
      this.dialogVisible_group = false
    },
    onSubmit() {
      this.page01 = 1
      this.search()
    },
    lock(id) {
      this.dialogVisibles = true
      this.statusid = id
    },
    suoding_queren() {
      this.dialogVisibles = false
      this.$api.get('/Design/onLock/' + this.statusid, null, r => {
        this.search()
      })
    },
    suoding_quxiao() {
      this.dialogVisibles = false
    },
    pages02(val) {
      this.page01 = val
      this.search()
    },
    return_guest() {
      this.$router.push('/CustomerOrderManagement')
    },
    details(uuid) {
      this.$router.push('/Add_Permission?uuid=' + uuid)
    },
    chengping() {
      this.$router.push('/SystemManagement/CustomerList')
    },
    topage(type) {
      if (type == 'user') {
        this.$router.push('/SystemManagement/CustomerOrderManagement')
      } else if (type == 'branch') {
        this.$router.push('/SystemManagement/CustomerList')
      }
    },
    detail(uuid) {
      this.$router.push('/elysExpenseCreate?type=detail&uuid=' + uuid)
    },
    alert(res) {
      // alert(JSON.stringify(res))
    },
  },
}
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

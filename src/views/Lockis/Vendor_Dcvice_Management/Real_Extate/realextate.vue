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
                <el-card>
                  <el-form-item style="float: left;height: 40px;" class="search">
                  <el-input
                    v-model="likeSearch"
                    placeholder="Name"
                    style="margin-left: 15px;width: 256px;height: 40px;line-height: 40px;"
                  ></el-input>
                </el-form-item>
                <el-form-item style="float:left;height: 35px;">
                  <el-button
                    type="primary"
                    @click="like"
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
                </el-card>
              </el-form>
              <div>
                <h3>Real Estate</h3>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div
      style="border-radius: 0px;background: white;height: 676px;width: 100%;"
    >
      <div>
        <el-table
          :data="tableData"
          :header-cell-style="titlebg"
          
          style="width: 100%;text-align: center;margin: 0;padding: 0;border-radius: 0px;height: 620px;"
        >
          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>
          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="No."
            align="center"
          >
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center" v-if="show">
          </el-table-column>
          <el-table-column
            prop="reference"
            label="Reference"
            align="center"
            v-if="false"
          >
          </el-table-column>
          <el-table-column prop="name" label="Real estate Name" align="center">
          </el-table-column>
          <el-table-column prop="name_en" label="English Name" align="center">
          </el-table-column>
          <el-table-column prop="address" label="Address" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="Remark" align="center">
          </el-table-column>
          <el-table-column prop="category.name" label="Category" align="center">
          </el-table-column>
          <!-- <el-table-column prop="made" label="Create time" align="center">
          </el-table-column>
          <el-table-column prop="revised" label="Update time" align="center">
          </el-table-column> -->

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
            :title="isNew ? 'Create real estate' : 'Change real estate'"
            :visible.sync="dialogFormVisible"
          >
            <el-form :model="form" :rules="rules" ref="ruleForm">
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
              <el-form-item
                label="reference"
                :label-width="formLabelWidth"
                v-if="false"
              >
                <el-input
                  v-model="form.reference"
                  autocomplete="off"
                  :placeholder="res.reference"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Real estate Name"
                :label-width="formLabelWidth"
                prop="name"
              >
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
              <el-form-item label="Category" :label-width="formLabelWidth" prop="categoryValue"
              >
                <!-- <el-select filterable v-model="categoryValue" placeholder="请选择" @change="changecategory">
                  <el-option
                    v-for="item in categoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id"
                  >
                  </el-option>
                </el-select> -->
                 <el-cascader
                  :show-all-levels="false"
                  v-model="categoryValue"
                  :options="categoryOptions"
                  :props="{ expandTrigger: 'hover' }"
                  @change="changecategory"></el-cascader>
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
        <span>Do you really want to delete this Real estate?</span>
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

function processTreeData(id,datas){
  if (Array.isArray(datas)){
    var childNodes=[]
    for(let i=0;i<datas.length;i++){
      if (datas[i].parent!=null&&datas[i].parent.id==id){
          var temp=datas[i];
          var temp_={}
          temp_.id=temp.id
          temp_.label=temp.name
          temp_.value=temp.reference
          childNodes.push(temp_)
      } 
    }
    return childNodes
  }
}
import axios from 'axios'
export default {
  name: "realextate",
  data() {
    var validatecategory = (rule, value, callback) => {
        if (this.categoryValue === '') {
          callback(new Error('please select category'));
        } else {
          callback();
        }
      }
    return {
      show: false,
      likeSearch: '',
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
      sum: 8,
      totalElements: 0,
      totalElements1:0,
      page01: 1,
      tableData: [],
      options: "",
      options_list: [],
      member_reference: "",

      // dialog
      res: {},
      dialogFormVisible: false,
      isNew: false,
      categoryOptions:[],
      categoryValue: [],
      parentNode : [],
      form: {
        id: "",
        reference: "",
        name: "",
        name_en: "",
        address: "",
        remark: "",
        category: {}
      },
      rules:{
        name:[{required: true, message: 'please input name', trigger: 'blur'}],
        name_en:[{required: true, message: 'please input englishname', trigger: 'blur'}],
        address:[{required: true, message: 'please input address', trigger: 'blur'}],
        categoryValue:[{validator:validatecategory, trigger: 'change'}]
      },
      formLabelWidth: "140px"
    };
  },
  created: function() {
    // 总数
    this.$api.get("/lksKRealestate/count", null, r => {
      this.totalElements = r;
      this.totalElements1 = r
    });
    // 获取数据
    let LksLCategoryDto ={
      parent:24
    }
    this.search();
    this.loaing_table = true;
    //获取category
    this.$api.get("/miscellaneous/category", null, r => {
      // this.categoryOptions = r
      //   var parentId=null;
      //   var arr=[];
      //   for (let i = 0; i < r.length; i++) {
      //     const element = r[i];
      //     if(element.parent==null&&element.name=='物业栋'){
      //       parentId=element.id;
      //     }
      //   }
      //    var arr2=[];
      //   for (let i = 0; i < r.length; i++) {
      //     const element2 = r[i];
      //     if(element2.parent==parentId){
      //       arr2=element2
      //     }
      //   }
      // console.log("================")
      //   console.log(arr2)
      // this.categoryOptions = this.arr2
      var parentNodes=[]
      for(let i=0;i<r.length;i++){
        if(r[i].parent ==null){
          var temp=r[i];
          var temp_={}
          temp_.id=temp.id
          temp_.label=temp.name//label
          temp_.value=temp.reference
          parentNodes.push(temp_)
        }
      }
      for(let i=0;i<parentNodes.length;i++){
        if(parentNodes[i].id !=null){
          var temp=parentNodes[i]
          temp["children"]=processTreeData(parentNodes[i].id,r)
          parentNodes[i]=temp
          
        }
      }
      // console.log(parentNodes)
      this.categoryOptions=parentNodes
    })
    
    // axios.get('/miscellaneous/categor').then(res =>{
    //   this.categoryOptions = res.data
    // }).catch(err =>{

    // })
    // axios.get('/user/userinfo').then(res =>{
    // console.log("axios",res)
    // }).catch(err =>{

    // })
    // axios.get('/user/user').then(res =>{
    // console.log("axiosuser",res)
    // }).catch(err =>{

    // })
    // this.$api.get("/user/user",null,r=>{
    // console.log("$api",r)
    // })
  },
  methods: {





    // test
  
  processTreeData(parentNode,id,root){
  if (Array.isArray(root)){
    var childNodes=[]
    $.each(root,function(v,i){
      if (v.parent!=null&&v.id==id){
          childNodes.push(v)
      }
    })
    this.parentNode["child"]=childNodes
  }
},
    like(){
      this.page01 = 1
      if(this.likeSearch!=''&&this.likeSearch!=undefined){
        if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
          alert("搜索时首尾不要加空格")
        }else{
          this.$api.get("/lksKRealestate/many/"+this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null , r => {
            this.tableData = r
          })
          this.$api.get("/lksKRealestate/count/"+this.likeSearch,null, r=>{
            this.totalElements = r
          })
        }
      }else{
        this.totalElements = this.totalElements1
        this.search()
      }

    },
    changecategory(){
      if(this.form.category){
        this.form.category = {}
      }
      this.form.category = {
        reference: this.categoryValue[this.categoryValue.length-1]
      }
    },
    confirm() {
      // 信息修改/新增后，提交this._data.form完成修改/新增
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this._data.dialogFormVisible = false;
      var uuid = this._data.form.reference;
      // console.log("UUID:"+this._data.form.uuid)
      if (uuid != "" && uuid != undefined) {
        // console.log("我是小婷")
        this.loading = true;
        this.$api.put("/lksKRealestate/update", this._data.form, r => {
          // history.back(-1)
          //this.$router.back()
          this.search();
        });
      } else {
        this.$api.post("/lksKRealestate/save", this._data.form, r => {
          //history.back(-1)
          this.search();
        });
      }
          } else {
            // console.log('error submit!!');
            return false;
          }
        })
    },
    modify(res) {
      // 修改按钮触发函数
      // console.log("1111111111",res)
      this.$router.push({
        name: 'createrealestate',
        params:{
          res: res
        }
      })
      this._data.isNew = false;
      // this._data.dialogFormVisible = true;
      this._data.res = res;
      this.form.id = res.id;
      this.form.reference = res.reference;
      this.form.address = res.address;
      this.form.name = res.name;
      this.form.name_en = res.name_en;
      this.form.remark = res.remark;
      // this.form.category = res.category;
      for(let i =0;i<this.categoryOptions.length;i++){
        if(this.categoryOptions[i].children){
          for(let j=0;j<this.categoryOptions[i].children.length;j++){
            if(this.categoryOptions[i].children[j].label ==res.category.name){
              this.categoryValue=[]
              this.categoryValue.push(this.categoryOptions[i].value)
              this.categoryValue.push(this.categoryOptions[i].children[j].value)
              // this.categoryValue = this.categoryOptions[i].children[j].reference
              // this.form.category = {
              //   reference: this.categoryOptions[i].children[j].reference
              // }
            }
          }
        }
      }
      this.form.category = {
        reference: res.category.reference
      }
      // this.categoryValue = [res.category.reference]

      // console.log(this._data.res);
      // console.log("2",this.res)
    },
    detele(reference) {
      // 删除按钮触发函数
      this.dialogVisible = true;
      this.dialogVisible_reference = reference;
    },
    expensecreate() {
      // 新增按钮触发函数
      this._data.isNew = true;
      this._data.res = {};
      this.form = {};
      this.categoryValue = ''
      // this._data.dialogFormVisible = true;
      this.$router.push('./createrealestate')
    },
    cancel_detele() {
      // 删除弹出框取消函数
      this.dialogVisible = false;
      
    },
    confirm_detele() {
      // 删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false;
      this.$api.delete(
        "/lksKRealestate/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.$api.get("/lksKRealestate/count", null, r => {
          this.totalElements = r;
          this.totalElements1 = r
          if(this.page01-1>=this.totalElements/this.sum){
            this.page01 = this.page01-1
            }
           this.search();
          });
        }
      );
      // console.log(this.dialogVisible_reference)
    },
    search() {
      // 请求数据方法
      this.loaing_table = false;
      this.tableData = [];
      // TODO realextate 请求数据
      this.$api.get(
        "/lksKRealestate/" + (this.page01 - 1) + "/" + this.sum,
        null,
        r => {
          // this.$api.get('realextate.json', null, r => {
          //alert(JSON.stringify(r))
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

            /* r[i].formatted_date = new Date(r[i].date)
              .toLocaleDateString()
              .split('/')
              .join('-') */
          }
          this.tableData = r;
          // console.log(this.tableData)
        }
      );
    },
    // test
    indexMethod(index) {
      return (parseInt(this.page01) - 1) * 8 + index + 1;
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
    // handleClose(done) {
    //   this.dialogVisibles = false;
    // },

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
      // this.search();
      if(this.likeSearch!=''&&this.likeSearch!=undefined){
        if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
          alert("搜索时首尾不要加空格")
        }else{
          this.$api.get("/lksKRealestate/many/"+this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null , r => {
          this.tableData = r
      })
          this.$api.get("/lksKRealestate/count/"+this.likeSearch,null, r=>{
            this.totalElements = r
          })
        }
      }else{
        this.search()
      }
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

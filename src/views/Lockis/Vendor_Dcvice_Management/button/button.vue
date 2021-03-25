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
                <!-- <el-form-item style="float: left;height: 40px;" class="search">
                  <el-input
                    v-model="likeSearch"
                    placeholder="Name"
                    style="margin-left: 15px;width: 256px;height: 40px;line-height: 40px;"
                  ></el-input>
                </el-form-item> -->
                <el-card>
                  <el-form-item style="float:left;">
                  <el-select v-model="realestateSearchValue" clearable filterable placeholder="please choose a realestate" @change="changerealestate">
                    <el-option
                      v-for="item in realestateOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="float:left;">
                  <el-select v-model="buildingSearchValue" clearable filterable placeholder="please choose a building" @change="changebuilding">
                    <el-option
                      v-for="item in buildingOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="float:left;">
                  <el-select v-model="machineSearchValue" clearable filterable placeholder="please choose a machine" @change="changemachine">
                    <el-option
                      v-for="item in machineOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
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
                <h3>Button</h3>
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
          style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 0px;"
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
          <el-table-column
            prop="name"
            label="Button Name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name_en"
            label="English Name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="designation"
            label="Designation"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="output"
            label="Output"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="machine.name"
            label="Machine Name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="Remark"
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
                :disabled="scope.row.purged!=null ? true : false"
                >Modify</el-button
              >

              <el-button
                @click="detele(scope.row.reference)"
                type="danger"
                size="small"
                :disabled="scope.row.purged!=null ? true : false"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog
            :title="isNew ? 'Create button' : 'Change button'"
            :visible.sync="dialogFormVisible"
            v-loading = "isdisabled"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
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
                ></el-input>
              </el-form-item>
              <el-form-item label="Real estate" :label-width="formLabelWidth" prop="realestateValue">
                <el-select
                  filterable
                  v-model="realestateValue"
                  placeholder="请选择"
                  @change="changerealestate"
                  :disabled="isdisabled"
                >
                  <el-option
                    v-for="item in realestateOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Building" :label-width="formLabelWidth" prop="buildingValue">
                <el-select
                  filterable
                  v-model="buildingValue"
                  placeholder="请选择"
                  @change="changebuilding"
                  :disabled="isdisabled"
                >
                  <el-option
                    v-for="item in buildingOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Machine" :label-width="formLabelWidth" prop="machineValue">
                <el-select
                  filterable
                  v-model="machineValue"
                  placeholder="请选择"
                  @change="changemachine"
                  :disabled="isdisabled"
                >
                  <el-option
                    v-for="item in machineOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.id"
                  >
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
                <el-input v-model="form.output" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input v-model="form.remark" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">cancel</el-button>
              <!-- <el-button @click="dialogFormVisible = false">continue choose</el-button> -->
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
  name: "Button",
  data() {
    var validaterealestate = (rule, value, callback) => {
        if (this.realestateValue === '') {
          callback(new Error('please select realestate'));
        } else {
          callback();
        }
      }
      var validatebuilding = (rule, value, callback) => {
        if (this.buildingValue === '') {
          callback(new Error('please select building'));
        } else {
          callback();
        }
      }
      var validatemachine = (rule, value, callback) => {
        if (this.machineValue === '') {
          callback(new Error('please select machine'));
        } else {
          callback();
        }
      }
    return {
      show: false,
      likeSearch: "",
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
      totalElements1: 0,
      page01: 1,
      tableData: [],
      options: "",
      options_list: [],
      member_reference: "",

      // dialog
      res: {},
      dialogFormVisible: false,
      isNew: false,
      realestateOptions: [],
      realestateValue: "",
      realestateSearchValue: '',
      buildingOptions: [],
      buildingValue: "",
      buildingSearchValue: '',
      machineOptions: [],
      machineValue: '',
      machineSearchValue: '',
      machinecatch: [],
      isdisabled: false,
      QRCodeList: [],
      QRListResult: [],
      form: {
        id:'',
        reference:'',
        name: '',
        name_en: '',
        designation: '',
        output: '',
        remark: '',
        machine:{}
      },
      rules:{
        realestateValue:[{validator:validaterealestate, trigger: 'change'}],
        buildingValue:[{validator:validatebuilding, trigger: 'change'}],
        machineValue:[{validator:validatemachine, trigger: 'change'}],
        name:[{required: true, message: 'please input name', trigger: 'blur'}],
        name_en:[{required: true, message: 'please input englishname', trigger: 'blur'}],
        designation:[{required: true, message: 'please input designation', trigger: 'blur'}],
        output:[{required: true, message: 'please input output', trigger: 'blur'}]
      },
      formLabelWidth: "130px"
    };
  },
  created: function() {
    this.$api.get("/lksKRealestate", null, r => {
      // console.log("+++++++++++", r);
      this.realestateOptions = r;
    });
    this.$api.get("/lksKButton/count", null, r => {
      this.totalElements = r;
      this.totalElements1 = r
    });
    this.search()
    
  },
  methods: {
    // removetag(){
    //   console.log("111111111111")
    // },
    filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
    like(){
      //  if(this.likeSearch!=''&&this.likeSearch!=undefined){
      //   if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
      //     alert("搜索时首尾不要加空格")
      //   }else{
      //   this.$api.get("/lksKButton/many/" + this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null, r => {
      //   this.tableData = r;
      // })
      //   }
      // }else{
      //   this.search()
      // }
      this.loaing_table = true;
      this.page01 = 1
      if(this.realestateSearchValue=='' | this.buildingSearchValue == '' | this.machineSearchValue == ''){
        this.totalElements = this.totalElements1
        this.search()
        // alert("aaa")
      }else{
        var obj = {
          "machine": this.form.machine
        }
        this.$api.post('/lksKButton/fetchAllButtonListByCondition/'+ (this.page01 - 1) + "/" + this.sum,obj,r=>{
          this.tableData = r.content
          this.totalElements = r.totalElements

        })
      }
      // axios.post("http://localhost:3004/test1",this.form).then(r=>{

      // }).catch(err=>{

      // })
    },
    changerealestate() {
      // this.buildingValue = "";
      // this.machineValue = [];
      // this.form.machine = [];
      // this.form.building = '';
      // this.machineOptions = [];
      this.buildingValue = ''
      this.machineValue = ''
      this.machineOptions = []
      this.form.machine = {}
      this.isdisabled = true
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id == this.realestateValue) {
          this.form.realextate = this.realestateOptions[i].reference
        }else if(this.realestateOptions[i].id == this.realestateSearchValue){
          this.form.realextate = this.realestateOptions[i].reference
        }
      }
      this.$api.get(
        "/lksKBuilding/byRealestate/" + this.form.realextate,
        null,
        r => {
          this.buildingOptions = r;
          this.isdisabled = false
        }
      );
    },
    changebuilding() {
      // this.machineValue = [];
      // this.form.machine = [];
      this.machineValue = ''
      this.form.machine = {}
      this.isdisabled = true
      for (let i = 0; i < this.buildingOptions.length; i++) {
        if (this.buildingOptions[i].id == this.buildingValue) {
          this.form.building = this.buildingOptions[i].reference
        }else if(this.buildingOptions[i].id == this.buildingSearchValue){
          this.form.building = this.buildingOptions[i].reference
        }
      }
      this.$api.get(
        "/lksKMachine/byBuilding/" + this.form.building,
        null,
        r => {
          this.machineOptions = r;
          // console.log("++++++++++++++",r)
          for(let i = 0;i<r.length;i++){
            if(this.machinecatch.length==0){
              this.machinecatch.push(r[i])
            }else{
              if(!this.hasvalue(this.machinecatch,r[i])){
                this.machinecatch.push(r[i])
              }
            
            }
            
          }
          this.isdisabled = false
        }
      );
    },
    hasvalue(arr,value){
      var flag = false ;
			for (let x = 0 ; x < arr.length ; x++) {
				if (arr[x].id == value.id) {
					//表示元素ele在数组arr中存在
					flag = true ;
					break ;
				}
			}
			return flag ;
    },
    changemachine() {
      this.form.machine = {};
      for(let i=0;i<this.machineOptions.length;i++){
          if(this.machineValue ==this.machineOptions[i].id){
              this.form.machine = this.machineOptions[i]
          }else if(this.machineSearchValue ==this.machineOptions[i].id){
            this.form.machine = this.machineOptions[i]
          }
      }
    },

    // test
    hasReference(arr,value){
      var flag = false ;
			for (let x = 0 ; x < arr.length ; x++) {
				if (arr[x][0] == value) {
					//表示元素ele在数组arr中存在
					flag = true ;
					break ;
				}
			}
			return flag ;
    },
    hasbuildingReference(arr,value){
      var flag = false ;
			for (let x = 1 ; x < arr.length ; x++) {
				if (arr[x][0] == value) {
					//表示元素ele在数组arr中存在
					flag = true ;
					break ;
				}
			}
			return flag ;
    },
    confirm() {

       this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if(this.form.reference){
              this.$api.put("/lksKButton/update",this.form,r=>{
                this.dialogFormVisible = false
                this.search()
              })
            }else{
              this.$api.post("/lksKButton/save",this.form,r=>{
                this.dialogFormVisible = false
                this.search()
              })
            }
          } else {
            return false;
          }
        })
      
    },
    modify(res) {
      this.$router.push({
        name: 'createbutton',
        params:{
          res: res
        }
      })
      // 修改按钮触发函数
      this.realestateValue = ''
      this.buildingValue = ''
      this.machineValue = ''
      this.form = {
        id:'',
        reference:'',
        name: '',
        name_en: '',
        designation: '',
        output: '',
        remark: '',
        machine:{},
        realextate: '',
        building: ''
      }
      // console.log("1111111111", res);
      this._data.isNew = false;
      this._data.dialogFormVisible = true;
      this._data.res = res;
      this.form.id = res.id;
      this.form.reference = res.reference;
      this.form.name = res.name
      this.form.name_en = res.name_en
      this.form.designation = res.designation
      this.form.output = res.output
      this.form.remark = res.remark
      this.form.machine = res.machine
      this.realestateValue = res.machine.building.realestate.id
      // console.log("res.machine.building.realestate.id",res.machine.building.realestate.id)
      this.buildingValue = res.machine.building.id
      // console.log("res.machine.building.id",res.machine.building.id)
      this.machineValue = res.machine.id
      // console.log("res.machine.id",res.machine.id)
      
      // this.form.category = res.category;
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id == this.realestateValue) {
          this.form.realextate = this.realestateOptions[i].reference;
        }
      }
      this.$api.get(
        "/lksKBuilding/byRealestate/" + res.machine.building.realestate.reference,
        null,
        r => {
          this.buildingOptions = r;
          this.isdisabled = false
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
        r => {
          this.machineOptions = r;
          // console.log("++++++++++++++",r)
          // for(let i = 0;i<r.length;i++){
          //   if(this.machinecatch.length==0){
          //     this.machinecatch.push(r[i])
          //   }else{
          //     if(!this.hasvalue(this.machinecatch,r[i])){
          //       this.machinecatch.push(r[i])
          //     }
            
          //   }
            
          // }
          this.isdisabled = false
        }
      );
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
      this.form = {
        reference:'',
        realextate: '',
        building: '',
        machine: []
      };
      this.realestateValue = ""
      this.buildingValue = ""
      this.machineValue = ''
      this.categoryValue = ""
      // this.realestateOptions = [],
      this.buildingOptions = []
      this.machineOptions = []
      this.machinecatch = []
      this.QRCodeList = []
      this.QRListResult = []
      // this._data.dialogFormVisible = true
      this.$router.push('createbutton')
    },
    cancel_detele() {
      // 删除弹出框取消函数
      this.dialogVisible = false;
    },
    confirm_detele() {
      // 删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false;
      this.$api.delete(
        "/lksKButton/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.$api.get("/lksKButton/count", null, r => {
      this.totalElements = r;
      this.totalElements1 = r
      if(this.page01-1>=this.totalElements/this.sum){
            this.page01 = this.page01-1
            }
           this.search();
    })
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
        "/lksKButton/" + (this.page01 - 1) + "/" + this.sum,
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
      if(this.machineSearchValue == ''){
        this.search()
      }else{
        var obj = {
          "machine": this.form.machine
        }
        this.$api.post('/lksKButton/fetchAllButtonListByCondition/'+ (this.page01 - 1) + "/" + this.sum,obj,r=>{
          this.tableData = r.content
          this.totalElements = r.totalElements

        })
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

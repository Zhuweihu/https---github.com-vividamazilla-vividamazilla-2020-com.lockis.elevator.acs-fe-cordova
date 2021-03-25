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
                  <h3>QR Code</h3>
                </el-form-item>
                <!-- <el-form-item style="float: left;height: 40px;" class="search">
                  <el-input
                    v-model="likeSearch"
                    placeholder="Name"
                    style="margin-left: 15px;width: 256px;height: 40px;line-height: 40px;"
                  ></el-input>
                </el-form-item> -->
                <el-form-item style="float:left;">
                  <el-select v-model="realestateSrarchValue" clearable filterable placeholder="please choose a realestate" @change="changerealestate">
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
                <!-- <el-form-item style="float:left;">
                  <el-select v-model="machineValue1" filterable placeholder="please choose a machine" @change="changeuser">
                    <el-option
                      v-for="item in userOptions"
                      :key="item.user.id"
                      :label="item.user.id"
                      :value="item.user.id">
                    </el-option>
                  </el-select>
                </el-form-item> -->
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
            prop="realestate.name"
            label="Real estate"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="building.name"
            label="Building"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="user.identity"
            label="User"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="enable"
            label="Enable"
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
                @click="showtoken(scope.row.token)"
                
                type="danger"
                size="small"
                >show token</el-button
              >
              <!-- <el-button
                 @click="modify(scope.row)"
                type="danger"
                size="small"
                style="margin-right: 20px;"
                plain
                >Modify</el-button
              > -->

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
          <el-dialog :visible.sync="tokenisshow" @opened = "innertoken">
            <p ref="token"></p>
          </el-dialog>
          <el-dialog
            :title="isNew ? 'Create QRcode' : 'Change QRcode'"
            :visible.sync="dialogFormVisible"
            v-loading="isdisabled"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            width="80%"
            style="margin-left:10%;margin-top:5%"
          >
            <el-dialog
              width="30%"
              title="this machine has no button"
              :visible.sync="innerVisible"
              append-to-body
            >
            </el-dialog>

            <el-form :model="form" :inline="true">
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
              <el-form-item label="Real estate" :label-width="formLabelWidth">
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
              <el-form-item label="Building" :label-width="formLabelWidth">
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
              <el-form-item label="Machine" :label-width="formLabelWidth">
                <el-select
                  filterable
                  v-model="machineValue"
                  multiple
                  :multiple-limit="1"
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
              <el-form-item label="Type" :label-width="formLabelWidth">
                <el-select
                  filterable
                  v-model="typeValue"
                  placeholder="请选择"
                  @change="changeType"
                  :disabled="isdisabled"
                >
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="width:80%;background-color:#f0f3f8;">
              <button
                :class="item.isselect ? 'select ebut' : 'ebut'"
                @click="click1(index)"
                v-for="(item, index) in buttonlist"
                :key="item.reference"
              >
                {{ item.name }}{{ item.name_en }}
              </button>
            </div>
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
  name: "QRcode",
  data() {
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
      tokenisshow: false,
      res: {},
      dialogFormVisible: false,
      isNew: false,
      innerVisible: false,
      realestateOptions: [],
      realestateValue: "",
      realestateSrarchValue: '',
      buildingOptions: [],
      buildingValue: "",
      buildingSearchValue: '',
      machineOptions: [],
      machineValue: [],
      machineValue1: '',
      machinecatch: [],
      isdisabled: false,
      QRCodeList: [],
      QRListResult: [],
      buttonlist: [],
      token: '',
      typeValue: '',
      typeOptions:[
        {
          value: "R1"
        },
        {
          value: "R2"
        },
        {
          value: "M"
        }
      ],
      likeobj: {
        realestate: {},
        building : {}
      },
      form: {
        reference: "",
        realextate: "",
        building: "",
        machine: []
      },
      formLabelWidth: "130px"
    };
  },
  created: function() {
    this.$api.get("/lksKRealestate", null, r => {
      // console.log("+++++++++++", r);
      this.realestateOptions = r;
    });
    this.search()
    // this.$refs.token.innerHTML = ''
    this.$api.get('/lksKToken/count',null,r=>{
      this.totalElements = r
      this.totalElements1 = r
    })
  },
  methods: {
    // removetag(){
    //   console.log("111111111111")
    // },
    innertoken(){
      console.log("sss")
      this.$refs.token.innerHTML = this.token
    },
    showtoken(res){
      this.tokenisshow = true
      this.token = res
    },
    like() {
      //  if(this.likeSearch!=''&&this.likeSearch!=undefined){
      //   this.$api.get("" + this.likeSearch, null, r => {
      //   this.tableData = r;
      // })
      // }else{
      //   this.search()
      // }
      // if(this.realestateValue ==""){
      //   this.search()
      // }else{
      //   var buttonList = [];
      // // for (let i = 0; i < this.buttonlist.length; i++) {
      // //   if (this.buttonlist[i].isselect) {
      // //     buttonList.push({
      // //       ButtonReferId: this.buttonlist[i].reference
      // //     });
      // //   }
      // // }
      // this.QRListResult = [{
      //   BuildingReferIds: [
      //     {
      //       BuildingReferId: this.form.machine[0].building.reference,
      //       MachineReferIds: [
      //         {
      //           MachineReferId: this.form.machine[0].reference,
      //           ButtonRefIds: buttonList
      //         }
      //       ]
      //     }
      //   ],
      //   UserReferId: "f9fe1dd6-7259-11ea-ad58-000d3aa2d63e",
      //   EstateReferId: this.form.machine[0].building.realestate.reference
      // }];
      // this.QRListResult = {
      //   pramStr: this.QRListResult
      // };
      //   this.$api.post("/lksKToken/fetchAllTokenListByCondition/0/8",this.QRListResult,r=>{
      //     this.tableData = r
      //   })
      // }
      this.loaing_table = true
      if(this.realestateSrarchValue == ''|this.buildingSearchValue == ''){
        // alert('aaaa')
      // if(false){
        this.totalElements = this.totalElements1
        this.page01 = 1
        this.search()
      }else{
        // this.likeobj = {
        //   "building": this.like.building,
        //   "realestate": this.like.realestate,
        //   "user": {"id": 1}
        // }
        // this.likeobj["user"] = {"id":1}
        this.$api.post('/lksKToken/fetchAllTokenListByCondition/'+(this.page01-1)+'/'+this.sum,this.likeobj,r=>{
          this.tableData = r.content
          this.page01 = 1
          this.totalElements = r.totalElements
        })
      }
    },
    click1(index) {
      this.buttonlist[index].isselect = !this.buttonlist[index].isselect;
    },
    changerealestate() {
      // this.buildingValue = "";
      // this.machineValue = [];
      // this.form.machine = [];
      // this.form.building = '';
      // this.machineOptions = [];
      this.buildingValue = ''
      // this.isdisabled = true;
      this.machineValue1 = ''
      this.form.machine = []
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id == this.realestateValue) {
          this.form.realextate = this.realestateOptions[i].reference;
          this.searchBuilding(this.form.realextate)
        }else if(this.realestateOptions[i].id == this.realestateSrarchValue){
          this.likeobj.realestate = this.realestateOptions[i]
          this.searchBuilding(this.likeobj.realestate.reference)
        }
      }
      // this.$api.get(
      //   "/lksKBuilding/byRealestate/" + this.likeobj.realestate.reference,
      //   null,
      //   r => {
      //     this.buildingOptions = r;
      //     this.isdisabled = false;
      //   }
      // )
    },
    searchBuilding(res){
      this.$api.get(
        "/lksKBuilding/byRealestate/" + res,
        null,
        r => {
          this.buildingOptions = r;
          this.isdisabled = false;
        }
      )
    },
    changebuilding() {
      // this.machineValue = [];
      // this.form.machine = [];
      this.machineValue1 = ''
      this.form.machine = []
      // this.isdisabled = true;
      for (let i = 0; i < this.buildingOptions.length; i++) {
        if (this.buildingOptions[i].id == this.buildingValue) {
          this.form.building = this.buildingOptions[i].reference;
          this.searchMachine(this.form.building)
        }else if(this.buildingOptions[i].id == this.buildingSearchValue){
          this.likeobj.building = this.buildingOptions[i]
          this.isdisabled = false
        }
      }
      // this.$api.get(
      //   "/lksKMachine/byBuilding/" + this.form.building,
      //   null,
      //   r => {
      //     this.machineOptions = r;
      //     // console.log("++++++++++++++",r)
      //     for (let i = 0; i < r.length; i++) {
      //       if (this.machinecatch.length == 0) {
      //         this.machinecatch.push(r[i]);
      //       } else {
      //         if (!this.hasvalue(this.machinecatch, r[i])) {
      //           this.machinecatch.push(r[i]);
      //         }
      //       }
      //     }
      //     this.isdisabled = false;
      //   }
      // );
    },
    searchMachine(res){
      this.$api.get(
        "/lksKMachine/byBuilding/" + res,
        null,
        r => {
          this.machineOptions = r;
          // console.log("++++++++++++++",r)
          for (let i = 0; i < r.length; i++) {
            if (this.machinecatch.length == 0) {
              this.machinecatch.push(r[i]);
            } else {
              if (!this.hasvalue(this.machinecatch, r[i])) {
                this.machinecatch.push(r[i]);
              }
            }
          }
          this.isdisabled = false;
        }
      );
    },
    hasvalue(arr, value) {
      var flag = false;
      for (let x = 0; x < arr.length; x++) {
        if (arr[x].id == value.id) {
          //表示元素ele在数组arr中存在
          flag = true;
          break;
        }
      }
      return flag;
    },
    changemachine() {
      this.form.machine = [];
      for (let i = 0; i < this.machineValue.length; i++) {
        for (let j = 0; j < this.machinecatch.length; j++) {
          if (this.machinecatch[j].id == this.machineValue[i]) {
            //向后台传输的machine字段中加入machine
            this.form.machine.push(this.machinecatch[j]);
          }
        }
      }
      for (let j = 0; j < this.machinecatch.length; j++) {
          if (this.machinecatch[j].id == this.machineValue1) {
            //向后台传输的machine字段中加入machine
            this.form.machine.push(this.machinecatch[j]);
          }
        }
      this.buttonlist = [];
      if(this.form.machine[0].reference){
        this.isdisabled = true;
      }
      this.$api.get(
        "/lksKButton/byMachine_List/" + this.form.machine[0].reference,
        null,
        r => {
          var res = JSON.parse(r);
          if (res.length == 0) {
            this.innerVisible = true
          }
          for (let i = 0; i < res.length; i++) {
            res[i]["isselect"] = false;
          }
          this.buttonlist = res;
          this.isdisabled = false;
        }
      );
      this.isdisabled = false
    },

    // test
    hasReference(arr, value) {
      var flag = false;
      for (let x = 0; x < arr.length; x++) {
        if (arr[x][0] == value) {
          //表示元素ele在数组arr中存在
          flag = true;
          break;
        }
      }
      return flag;
    },
    hasbuildingReference(arr, value) {
      var flag = false;
      for (let x = 1; x < arr.length; x++) {
        if (arr[x][0] == value) {
          //表示元素ele在数组arr中存在
          flag = true;
          break;
        }
      }
      return flag;
    },
    confirm() {
      // 信息修改/新增后，提交this._data.form完成修改/新增
      //数据处理
      //real estate数据处理
      //test
      // for(let i = 0;i<this.form.machine.length;i++){
      //   if(this.QRCodeList.length==0){
      //     var realestate = []
      //     realestate.push(this.form.machine[i].building.realestate.reference)
      //     this.QRCodeList.push(realestate)
      //   }else{
      //     if(!this.hasReference(this.QRCodeList,this.form.machine[i].building.realestate.reference)){
      //     var realestate = []
      //     realestate.push(this.form.machine[i].building.realestate.reference)
      //     this.QRCodeList.push(realestate)
      //     }
      //   }
      // }
      // //building数据处理
      // for(let i =0;i<this.form.machine.length;i++){
      //   for(let j =0;j<this.QRCodeList.length;j++){
      //     if(this.QRCodeList[j][0]==this.form.machine[i].building.realestate.reference){
      //       if(this.QRCodeList[j].length==1){
      //         var building = []
      //         building.push(this.form.machine[i].building.reference)
      //         this.QRCodeList[j].push(building)
      //       }else{
      //         if(!this.hasReference(this.QRCodeList[j],this.form.machine[i].building.reference)){
      //           var building = []
      //           building.push(this.form.machine[i].building.reference)
      //           this.QRCodeList[j].push(building)
      //         }
      //       }
      //     }
      //   }
      // }
      // //machine数据处理
      // for(let i= 0;i<this.form.machine.length;i++){
      //   for(let j=0;j<this.QRCodeList.length;j++){
      //     for(let x=1;x<this.QRCodeList[j].length;x++){
      //       if(this.QRCodeList[j][x][0]==this.form.machine[i].building.reference){
      //         var machine = []
      //         machine.push(this.form.machine[i].reference)
      //         this.QRCodeList[j][x].push(machine)
      //       }
      //     }
      //   }
      // }

      // //QRListresult 最后数据处理
      // for(let i=0;i<this.QRCodeList.length;i++){
      //   var obj = {
      //     "BuildingReferIds":[],
      //     "UserReferId":"9d24d2a9-839c-11ea-ad58-000d3aa2d63e",
      //     "EstateReferId": this.QRCodeList[i][0]
      //   }
      //   this.QRListResult.push(obj)
      // }
      // for(let i = 0;i<this.QRCodeList.length;i++){
      //   for(let j = 1;j<this.QRCodeList[i].length;j++){
      //     console.log("+++++++++++++__________==+===",this.QRCodeList[i])
      //     var obj = {
      //       "BuildingReferId": this.QRCodeList[i][j][0],
      //       "MachineReferIds":[]
      //     }
      //     this.QRListResult[i].BuildingReferIds.push(obj)
      //     // console.log("+++++++++++++__________==+===",obj)
      //   }
      // }
      // for(let i = 0;i<this.QRCodeList.length;i++){
      //   for(let j =1;j<this.QRCodeList[i].length;j++){
      //     for(let x = 1;x<this.QRCodeList[i][j].length;x++){
      //       var obj = {
      //         "MachineReferId": this.QRCodeList[i][j][x][0]
      //       }
      //       this.QRListResult[i].BuildingReferIds[j-1].MachineReferIds.push(obj)
      //     }
      //   }
      // }
      //test
      var buttonList = [];
      for (let i = 0; i < this.buttonlist.length; i++) {
        if (this.buttonlist[i].isselect) {
          buttonList.push({
            ButtonReferId: this.buttonlist[i].reference
          });
        }
      }
      this.QRListResult = [{
        BuildingReferIds: [
          {
            BuildingReferId: this.form.machine[0].building.reference,
            MachineReferIds: [
              {
                MachineReferId: this.form.machine[0].reference,
                ButtonRefIds: buttonList
              }
            ]
          }
        ],
        UserReferId: "f9fe1dd6-7259-11ea-ad58-000d3aa2d63e",
        EstateReferId: this.form.machine[0].building.realestate.reference
      }];
      this.QRListResult = {
        pramStr: this.QRListResult,
        type: this.typeValue
      };
      // axios
      //   .post("http://localhost:3004/QRCode", this.QRListResult)
      //   .then(r => {})
      //   .catch(err => {});
      this._data.dialogFormVisible = false;
      var uuid = this._data.form.reference;
      // console.log("UUID:"+this._data.form.uuid)
      if (uuid != "" && uuid != undefined) {
        this.loading = true;
        // this.$api.put("/lksKRealestate/update", this.form, r => {
        //   // history.back(-1)
        //   //this.$router.back()
        //   this.search();
        // });
      } else {
        //生成二维码调用接口
        this.$api.post("/LkSQRCode/getQRcoedbyMap", this.QRListResult, r => {
          //history.back(-1)
          if (r.state) {
            if (r.state == 1) {
              this.$notify.error({
                title: "错误",
                message: r.message
              });
            } else if (r.state == 0) {
              this.$notify({
                title: "成功",
                message: "success",
                type: "success"
              });
            }
          }
          this.search();
        });
      }

      // this.$api.post("/realextate"+uuid,this.form)
    },
    modify(res) {
      // 修改按钮触发函数
      // console.log("1111111111", res);
      this._data.isNew = false;
      this._data.dialogFormVisible = true;
      this._data.res = res;
      this.form.id = res.id;
      this.form.reference = res.reference;
      this.form.address = res.address;
      this.form.name = res.name;
      this.form.name_en = res.name_en;
      this.form.remark = res.remark;
      // this.form.category = res.category;
    },
    detele(reference) {
      // 删除按钮触发函数
      this.dialogVisible = true;
      this.dialogVisible_reference = reference;
    },
    expensecreate() {
      // 新增按钮触发函数
      this.buttonlist = [];
      this._data.isNew = true;
      this._data.res = {};
      this.form = {
        reference: "",
        realextate: "",
        building: "",
        machine: []
      };
      this.realestateValue = "";
      this.buildingValue = "";
      this.machineValue = [];
      this.categoryValue = "";
      // this.realestateOptions = [],
      this.buildingOptions = [];
      this.machineOptions = [];
      this.machinecatch = [];
      this.QRCodeList = [];
      this.QRListResult = [];
      this._data.dialogFormVisible = true;
      this.typeValue = ''
    },
    cancel_detele() {
      // 删除弹出框取消函数
      this.dialogVisible = false;
      // this.$router.push("./qrcodecreate")
    },
    confirm_detele() {
      // 删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false;
      this.$api.delete(
        "/lksKToken/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.search();
        }
      );
      // console.log(this.dialogVisible_reference)
    },
    search() {
      // 请求数据方法
      this.loaing_table = false;
      this.tableData = [];
      // TODO realextate 请求数据
      this.$api.get('/lksKToken/'+(this.page01-1)+'/'+this.sum,null,r=> {
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
      console.log(this.realestateValue =="")
      console.log(this.buildingValue =="")
      if(this.realestateValue ==""|this.buildingValue ==""){
        this.search();
      }else{
        this.$api.post('/lksKToken/fetchAllTokenListByCondition/'+(this.page01-1)+'/'+this.sum,this.likeobj,r=>{
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
  .ebut {
    width: 80px;
    height: 40px;
    margin: 10px 20px;
    border: none;
    background-color: #fff;
  }
  .select {
    background-color: #f46c6c;
  }
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

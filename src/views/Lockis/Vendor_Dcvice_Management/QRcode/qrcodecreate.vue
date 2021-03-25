<template>
  <div class="elysExpense">
    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div
      style="border-radius: 0px;background: white;height: 676px;width: 100%;padding-left:20px; padding-top:20px;"
    >
          <el-form :model="form">
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
                  multiple-limit = 1
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
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">cancel</el-button>
              <!-- <el-button @click="dialogFormVisible = false">continue choose</el-button> -->
              <el-button type="primary" @click="confirm()">confirm</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
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
      buildingOptions: [],
      buildingValue: "",
      machineOptions: [],
      machineValue: [],
      machinecatch: [],
      isdisabled: false,
      QRCodeList: [],
      QRListResult: [],
      form: {
        reference:'',
        realextate: '',
        building: '',
        machine: []
      },
      formLabelWidth: "130px"
    };
  },
  created: function() {
    this.$api.get("/lksKRealestate", null, r => {
      console.log("+++++++++++", r);
      this.realestateOptions = r;
    });
    // this.search()
    
  },
  methods: {
    // removetag(){
    //   console.log("111111111111")
    // },
    changerealestate() {
      // this.buildingValue = "";
      // this.machineValue = [];
      // this.form.machine = [];
      // this.form.building = '';
      // this.machineOptions = [];
      this.isdisabled = true
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id == this.realestateValue) {
          this.form.realextate = this.realestateOptions[i].reference;
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
      this.isdisabled = true
      for (let i = 0; i < this.buildingOptions.length; i++) {
        if (this.buildingOptions[i].id == this.buildingValue) {
          this.form.building = this.buildingOptions[i].reference;
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
      this.form.machine = [];
      for (let i = 0; i < this.machineValue.length; i++) {
        for (let j = 0; j < this.machinecatch.length; j++) {
          if (this.machinecatch[j].id == this.machineValue[i]) {
            //向后台传输的machine字段中加入machine
            this.form.machine.push(this.machinecatch[j]);
          }
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
      // 信息修改/新增后，提交this._data.form完成修改/新增
      //数据处理
      //real estate数据处理
      for(let i = 0;i<this.form.machine.length;i++){
        if(this.QRCodeList.length==0){
          var realestate = []
          realestate.push(this.form.machine[i].building.realestate.reference)
          this.QRCodeList.push(realestate)
        }else{
          if(!this.hasReference(this.QRCodeList,this.form.machine[i].building.realestate.reference)){
          var realestate = []
          realestate.push(this.form.machine[i].building.realestate.reference)
          this.QRCodeList.push(realestate)
          }
        }
      }
      //building数据处理
      for(let i =0;i<this.form.machine.length;i++){
        for(let j =0;j<this.QRCodeList.length;j++){
          if(this.QRCodeList[j][0]==this.form.machine[i].building.realestate.reference){
            if(this.QRCodeList[j].length==1){
              var building = []
              building.push(this.form.machine[i].building.reference)
              this.QRCodeList[j].push(building)
            }else{
              if(!this.hasReference(this.QRCodeList[j],this.form.machine[i].building.reference)){
                var building = []
                building.push(this.form.machine[i].building.reference)
                this.QRCodeList[j].push(building)
              }
            }
          }
        }
      }
      //machine数据处理
      for(let i= 0;i<this.form.machine.length;i++){
        for(let j=0;j<this.QRCodeList.length;j++){
          for(let x=1;x<this.QRCodeList[j].length;x++){
            if(this.QRCodeList[j][x][0]==this.form.machine[i].building.reference){
              var machine = []
              machine.push(this.form.machine[i].reference)
              this.QRCodeList[j][x].push(machine)
            }
          }
        }
      }
      
      //QRListresult 最后数据处理
      for(let i=0;i<this.QRCodeList.length;i++){
        var obj = {
          "BuildingReferIds":[],
          "UserReferId":"9d24d2a9-839c-11ea-ad58-000d3aa2d63e",
          "EstateReferId": this.QRCodeList[i][0]
        }
        this.QRListResult.push(obj)
      }
      for(let i = 0;i<this.QRCodeList.length;i++){
        for(let j = 1;j<this.QRCodeList[i].length;j++){
          console.log("+++++++++++++__________==+===",this.QRCodeList[i])
          var obj = {
            "BuildingReferId": this.QRCodeList[i][j][0],
            "MachineReferIds":[]
          }
          this.QRListResult[i].BuildingReferIds.push(obj)
          // console.log("+++++++++++++__________==+===",obj)
        }
      }
      for(let i = 0;i<this.QRCodeList.length;i++){
        for(let j =1;j<this.QRCodeList[i].length;j++){
          for(let x = 1;x<this.QRCodeList[i][j].length;x++){
            var obj = {
              "MachineReferId": this.QRCodeList[i][j][x][0]
            }
            this.QRListResult[i].BuildingReferIds[j-1].MachineReferIds.push(obj)
          }
        }
      }
      this.QRListResult= {
        "pramStr":this.QRListResult
      }
      axios.post("http://localhost:3004/QRCode",this.QRListResult).then(r=>{

      }).catch(err=>{
        
      })
      this._data.dialogFormVisible = false;
      var uuid = this._data.form.reference;
      // console.log("UUID:"+this._data.form.uuid)
      if (uuid != "" && uuid != undefined) {
        this.loading = true;
        this.$api.put("/lksKRealestate/update", this.form, r => {
          // history.back(-1)
          //this.$router.back()
          this.search();
        });
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
              title: '成功',
              message: 'success',
              type: 'success'
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
      console.log("1111111111", res);
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
      this.machineValue = []
      this.categoryValue = ""
      // this.realestateOptions = [],
      this.buildingOptions = []
      this.machineOptions = []
      this.machinecatch = []
      this.QRCodeList = []
      this.QRListResult = []
      this._data.dialogFormVisible = true
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
      this.$api.get(
        "/lksKToken/" + (this.page01 - 1) + "/" + this.sum,
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

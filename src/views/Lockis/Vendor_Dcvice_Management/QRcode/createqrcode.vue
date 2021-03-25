<template>
  <div class="elysExpense">
    <el-card>
      <el-dialog width="30%" title="this machine has no button" :visible.sync="innerVisible">
      </el-dialog>

      <el-form :model="form" :inline="true">
        <el-form-item label="ID" :label-width="formLabelWidth" v-if="false">
          <el-input v-model="form.id" autocomplete="off" :placeholder="res.id"></el-input>
        </el-form-item>
        <el-form-item label="reference" :label-width="formLabelWidth" v-if="false">
          <el-input v-model="form.reference" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Real estate" :label-width="formLabelWidth">
          <el-select filterable v-model="realestateValue" placeholder="请选择" @change="changerealestate" :disabled="realestateDisabled">
            <el-option v-for="item in realestateOptions" :key="item.reference" :label="item.name" :value="item.reference">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Building" :label-width="formLabelWidth">
          <el-select filterable v-model="buildingValue" placeholder="请选择" @change="changebuilding" :disabled="buildingDisabled">
            <el-option v-for="item in buildingOptions" :key="item.reference" :label="item.name" :value="item.reference">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-select filterable v-model="typeValue" placeholder="请选择" :disabled="typeDisabled" @change="changetype">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="have call" :label-width="formLabelWidth" v-if="callisShow">
          <el-switch v-model="callValue" :disabled="callDisabled" @change="changecall"></el-switch>
        </el-form-item>
        <el-form-item label="callbutton" :label-width="formLabelWidth" v-if="callButtonisShow">
          <el-select filterable multiple :multiple-limit="2" v-model="callButtonValue" placeholder="请选择" :disabled="callButtonDisabled" @change="changecallbutton">
            <el-option v-for="(item,index) in callButtonOptions" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Machine" :label-width="formLabelWidth">
          <el-select filterable v-model="machineValue" placeholder="请选择" @change="changemachine" :disabled="machineDisabled">
            <el-option v-for="item in machineOptions" :key="item.reference" :label="item.name" :value="item.reference">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="width:80%;background-color:#f0f3f8;">
        <button :class="item.isselect ? 'select ebut' : 'ebut'" @click="click1(index)" v-for="(item, index) in buttonlist" :key="item.reference">
          {{ item.name }}{{ item.name_en }}
        </button>
      </div>
    </el-card>
    <el-card style="margin-top:10px;">
      <el-row>
        <el-col :span="12">
          <el-button type="danger" style="float:right;margin-right:10px;" @click="next">next</el-button>
          <el-button type="primary" style="float:right;margin-right:10px;" @click="reset">reset</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" style="float:left;margin-left:10px;" @click="confirm">Confirm</el-button>
          <el-button type="danger" style="float:left;margin-left:10px;" @click="back">Return</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CreateQRcode",
  data() {
    return {
      res: {},
      innerVisible: false,
      //物业群选择列表
      realestateOptions: [],
      //物业群选中值
      realestateValue: "",
      //物业群模糊查询选中值
      realestateSrarchValue: "",
      //物业群是否可选
      realestateDisabled: false,
      //物业栋选择列表
      buildingOptions: [],
      //物业栋选中值
      buildingValue: "",
      //物业栋模糊查询值
      buildingSearchValue: "",
      //物业栋是否可选
      buildingDisabled: false,
      //电梯选择列表
      machineOptions: [],
      //电梯选中值
      machineValue: "",
      //电梯是否可选
      machineDisabled: false,
      machineValue1: "",
      machinecatch: [],
      isdisabled: false,
      //二维码传参数据缓存
      QRCodeList: [],
      //二维码传参单项
      QRCodeListItem: {},
      //二维码最终传参
      QRListResult: {},
      //电梯按钮选中列表
      buttonlist: [],
      //二维码JSON数据
      token: "",
      //选中type值
      typeValue: "",
      //typr是否可选
      typeDisabled: false,
      //type选择列表
      typeOptions: [
        {
          value: "R1",
        },
        {
          value: "R2",
        },
        {
          value: "M",
        },
      ],
      //call checkbox 值
      callValue: false,
      //call checkbox 是否显示
      callisShow: false,
      //call checkbox 是否禁用
      callDisabled: false,
      //callbutton 值
      callButtonValue: [],
      //callbutton 是否显示
      callButtonisShow: false,
      //callbutton 是否禁用
      callButtonDisabled: false,
      //callbutton 选择列表
      callButtonOptions:[],
      form: {
        reference: "",
        realextate: "",
        building: "",
        machine: [],
      },
      formLabelWidth: "130px",
    };
  },
  created() {
    this.$api.get("/lksKRealestate", null, (r) => {
      // console.log("+++++++++++", r);
      this.realestateOptions = r;
    });
  },
  methods: {
    changerealestate() {
      this.QRCodeListItem["UserReferId"] =
        "f9fe1dd6-7259-11ea-ad58-000d3aa2d63e";
      this.QRCodeListItem["EstateReferId"] = this.realestateValue;
      this.QRCodeListItem["BuildingReferIds"] = [];
      this.realestateDisabled = true; //禁用物业群选择下拉框
      this.$api.get(
        "/lksKBuilding/byRealestate/" + this.realestateValue,
        null,
        (r) => {
          this.buildingOptions = r; //请求该物业群下的所有物业栋
        }
      );
    },
    changebuilding() {
      var obj = {};
      obj["BuildingReferId"] = this.buildingValue;
      obj["MachineReferIds"] = [];
      this.QRCodeListItem["BuildingReferIds"].push(obj);
      this.buildingDisabled = true; //禁用物业栋下拉框
      this.$api.get(
        "/lksKMachine/byBuilding/" + this.buildingValue,
        null,
        (r) => {
          this.machineOptions = r; //请求该物业栋下的所有电梯
        }
      );
      var sobj = {
        "machine":{
          "building":{
            "reference": this.buildingValue
          }
        },
        "output":0
      }
      this.$api.post("/lksKButton/fetchAllButtonListByCondition/0/100",sobj, r=>{
        this.callButtonOptions = []
        for(let i=0;i<r.content.length;i++){
          var obj = {
            "name": r.content[i].name+r.content[i].name_en,
            "value": r.content[i].reference
          }
          this.callButtonOptions.push(obj)
        }
      })
    },
    changemachine() {
      var obj = {};
      obj["MachineReferId"] = this.machineValue;
      obj["ButtonRefIds"] = [];
      this.QRCodeListItem["BuildingReferIds"][0]["MachineReferIds"].push(obj);
      this.machineDisabled = true;
      this.$api.get(
        "/lksKButton/byMachine_List/" + this.machineValue,
        null,
        (r) => {
          var res = JSON.parse(r);
          // console.log(res)
          if (res.length == 0) {
            this.innerVisible = true;
          }
          for (let i = 0; i < res.length; i++) {
            res[i]["isselect"] = false;
          }
          var temp = []
          for(let i =0;i<res.length;i++){
            if(res[i].output!=0){
              temp.push(res[i])
            }
          }
          this.buttonlist = temp
        }
      );
    },
    changetype(){
      if(this.typeValue=='R2'|this.typeValue=='M'){
        this.callisShow = true
        this.callValue = false
      }else{
        this.callisShow = false
        this.callValue = false
        this.callButtonisShow = false
      }
    },
    changecall(){
      if(this.callValue){
        this.callButtonisShow = true
        this.callButtonValue =[]
      }else{
        this.callButtonisShow = false
        this.callButtonValue = []
      }
    },
    changecallbutton(){

    },
    click1(index) {
      //点击选中电梯按钮
      this.buttonlist[index].isselect = !this.buttonlist[index].isselect;
    },
    reset() {
      //清除此次选择
      this.initChoose(); //初始化数据
      if (this.typeValue) {
        //如果已经选择了type，禁选type
        this.typeDisabled = true;
      } else {
        this.typeDisabled = false;
      }
      if(this.callButtonValue.length!=0){
        this.callDisabled = true
        this.callButtonDisabled = true
      }
    },
    next() {
      //下一步
      var arr = [];
        for (let i = 0; i < this.buttonlist.length; i++) {
          if (this.buttonlist[i].isselect) {
            arr.push({ ButtonReferId: this.buttonlist[i].reference }); //把选择的按钮添加到arr
          }
        }
      if (arr.length == 0) {
        this.$message.warning("please select button")
      } else {
        this.QRCodeListItem["BuildingReferIds"][0]["MachineReferIds"][0][
          "ButtonRefIds"
        ] = arr; //把arr赋值到QRCodeListItem
        this.QRCodeList.push(this.QRCodeListItem); //把QRCodeListItem放进QRCodeList缓存
        this.reset(); //清空此次选择
      }
    },
    confirm() {
      this.next(); //把此次选择数据放进放进QRCodeList缓存
      //处理QRCodeList
      //第一遍合并相同物业群数据
      for (let i = 0; i < this.QRCodeList.length - 1; i++) {
        //外层循环第一个到倒数第二个数据
        if (!this.QRCodeList[i]["rdel"]) {
          //判断外层循环的数据是否准备删除
          for (let j = i + 1; j < this.QRCodeList.length; j++) {
            //内层循环外层循环之后的所有数据
            if (!this.QRCodeList[i]["rdel"]) {
              //判断内层循环的数据是否准备删除
              //当外层循环的数据和内层循环的数据都不是准备删除的数据时
              if (
                this.QRCodeList[i]["EstateReferId"] ==
                this.QRCodeList[j]["EstateReferId"]
              ) {
                //判断外层循环的"EstateReferId"是否等于内层循环的"EstateReferId"
                //当外层循环的"EstateReferId"等于内层循环的"EstateReferId"
                this.QRCodeList[i]["BuildingReferIds"].push(
                  this.QRCodeList[j]["BuildingReferIds"][0]
                ); //把内层循环的BuildingReferIds的第0项放进外层循环的BuildingReferIds中
                this.QRCodeList[j]["rdel"] = true; //给内层循环数据打上待删标签
              }
            }
          }
        }
      }
      var temp = [];
      //删除准备删除的数据
      for (let i = 0; i < this.QRCodeList.length; i++) {
        //循环所有物业群数据
        if (!this.QRCodeList[i]["rdel"]) {
          //判断物业群数据是否待删
          //如果不是待删数据
          temp.push(this.QRCodeList[i]); //把此项数据放入到temp中
        }
      }
      this.QRCodeList = temp; //把temp赋值到QRCodeList
      //完成第一次数据处理
      //开始第二次数据处理，合并相同物业栋
      for (let i = 0; i < this.QRCodeList.length; i++) {
        //循环处理物业群数据
        if (this.QRCodeList[i]["BuildingReferIds"].length > 1) {
          //判断该物业群下是否有多个物业栋
          //如果该物业群下有多个物业栋
          for (
            let j = 0;
            j < this.QRCodeList[i]["BuildingReferIds"].length - 1;
            j++
          ) {
            //外层循环第一个到倒数第二个物业栋数据
            if (!this.QRCodeList[i]["BuildingReferIds"][j]["rdel"]) {
              //判断外层循环的数据是否准备删除
              for (
                let k = j + 1;
                k < this.QRCodeList[i]["BuildingReferIds"].length;
                k++
              ) {
                //内层循环外层循环之后的所有数据
                if (!this.QRCodeList[i]["BuildingReferIds"][k]["rdel"]) {
                  //当外层循环的数据和内层循环的数据都不是准备删除的数据时
                  if (
                    this.QRCodeList[i]["BuildingReferIds"][j][
                      "BuildingReferId"
                    ] ==
                    this.QRCodeList[i]["BuildingReferIds"][k]["BuildingReferId"]
                  ) {
                    //判断外层循环的BuildingReferId是否等于内层循环的BuildingReferId
                    //当外层循环的BuildingReferId等于内层循环的BuildingReferId
                    this.QRCodeList[i]["BuildingReferIds"][j][
                      "MachineReferIds"
                    ].push(
                      this.QRCodeList[i]["BuildingReferIds"][k][
                        "MachineReferIds"
                      ][0]
                    ); //把内层循环的MachineReferIds的第0项放进外层循环的MachineReferIds中
                    this.QRCodeList[i]["BuildingReferIds"][k]["rdel"] = true; //给内层循环数据打上待删标签
                  }
                }
              }
            }
          }
        }
      }
      //删除准备删除的数据
      for (let i = 0; i < this.QRCodeList.length; i++) {
        //外层循环所有物业群
        var temp = [];
        for (
          let j = 0;
          j < this.QRCodeList[i]["BuildingReferIds"].length;
          j++
        ) {
          //内层循环该物业群下所有物业栋
          if (!this.QRCodeList[i]["BuildingReferIds"][j]["rdel"]) {
            //判断该物业栋是否准备删除
            //如果不是待删数据
            temp.push(this.QRCodeList[i]["BuildingReferIds"][j]);
          }
        }
        this.QRCodeList[i]["BuildingReferIds"] = temp;
      }
      //添加callbutton
      var callbuttonList = []
      for(let i=0;i<this.callButtonValue.length;i++){
        var callbuttonObj = {
          "ButtonReferId": this.callButtonValue[i]
        }
        callbuttonList.push(callbuttonObj)
      }
      this.QRCodeList[0]["BuildingReferIds"][0]["CallButtonRefIds"]=callbuttonList
      //完成二次数据处理
      this.QRListResult = {
        pramStr: this.QRCodeList,
        type: this.typeValue,
      };
      //提交数据生成二维码
      this.$api.post("/LkSQRCode/getQRcoedbyMap", this.QRListResult, (r) => {
        //history.back(-1)
        if (r.state) {
          if (r.state == 1) {
            this.$notify.error({
              title: "错误",
              message: r.message,
            });
          } else if (r.state == 0) {
            this.$notify({
              title: "成功",
              message: "success",
              type: "success",
            });
          }
        }
        history.back(-1);
      });
    },
    // initChoose(){
    //     //初始化选择数据
    //     this.realestateValue = ''
    //     this.buildingOptions = []
    //     this.buildingValue = ''
    //     this.machineOptions = []
    //     this.machineValue = ''
    //     this.buttonlist = []
    //     this.QRCodeListItem = {}
    //     this.realestateDisabled = false
    //     this.buildingDisabled = false
    //     this.machineDisabled = false
    // },
    initChoose() {
      //初始化选择数据
      // this.realestateValue = ''
      // this.buildingOptions = []
      // this.buildingValue = ''
      // this.machineOptions = []
      this.machineValue = "";
      this.buttonlist = [];
      this.QRCodeListItem = {};
      this.realestateDisabled = false;
      this.buildingDisabled = false;
      this.machineDisabled = false;
      if (this.realestateValue != "" && this.buildingValue != "") {
        this.changerealestate();
        this.changebuilding();
      }
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

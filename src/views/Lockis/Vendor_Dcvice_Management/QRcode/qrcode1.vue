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
                  <el-select v-model="realestateSrarchValue" clearable filterable placeholder="please choose a realestate" @change="changerealestate">
                    <el-option
                      v-for="item in realestateOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.reference">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="float:left;">
                  <el-select v-model="buildingSearchValue" clearable filterable placeholder="please choose a building" @change="changebuilding">
                    <el-option
                      v-for="item in buildingOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.reference">
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
                </el-card>
              </el-form>
              <div>
                <h3>QR Code</h3>
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
          <el-dialog :visible.sync="tokenisshow">
            <p>{{token}}</p>
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
                  :disabled="realestateDisabled"
                >
                  <el-option
                    v-for="item in realestateOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.reference"
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
                  :disabled="buildingDisabled"
                >
                  <el-option
                    v-for="item in buildingOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.reference"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Machine" :label-width="formLabelWidth">
                <el-select
                  filterable
                  v-model="machineValue"
                  placeholder="请选择"
                  @change="changemachine"
                  :disabled="machineDisabled"
                >
                  <el-option
                    v-for="item in machineOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.reference"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Type" :label-width="formLabelWidth">
                <el-select
                  filterable
                  v-model="typeValue"
                  placeholder="请选择"
                  :disabled="typeDisabled"
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
              <!-- TODO 新增两个按钮 -->
              <el-button @click="reset">reset</el-button>
              <el-button @click="next">next</el-button>
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
      //新增token

      //物业群选择列表
      realestateOptions: [],
      //物业群选中值
      realestateValue: '',
      //物业群模糊查询选中值
      realestateSrarchValue: '',
      //物业群是否可选
      realestateDisabled: false,
      //物业栋选择列表
      buildingOptions: [],
      //物业栋选中值
      buildingValue: "",
      //物业栋模糊查询值
      buildingSearchValue: '',
      //物业栋是否可选
      buildingDisabled: false,
      //电梯选择列表
      machineOptions: [],
      //电梯选中值
      machineValue: '',
      //电梯是否可选
      machineDisabled: false,
      machineValue1: '',
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
      token: '',
      //选中type值
      typeValue: '',
      //typr是否可选
      typeDisabled: false,
      //type选择列表
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
      like(){
        this.page01 = 1
        if(this.realestateSrarchValue!=''&&this.buildingSearchValue!=''){
          this.$api.post('/lksKToken/fetchAllTokenListByCondition/'+(this.page01-1)+'/'+this.sum,this.likeobj,r=>{
          this.tableData = r.content
          
          this.totalElements = r.totalElements
        })
        }else{
          this.totalElements = this.totalElements1
          this.search()
        }
      },
      indexMethod(index) {
        return (parseInt(this.page01) - 1) * 8 + index + 1;
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
    showtoken(res){
      //打开显示二维码JSON数据弹窗
      this.tokenisshow = true
      this.token = res
    },
    innertoken(){
      //在弹窗内显示二维码JSON数据
      // console.log("sss")
      // this.$refs.token.innerHTML = this.token
    },
    expensecreate(){
      this.isNew = true;
      // this.dialogFormVisible = true;
      this.initChoose()
      this.QRCodeList = []
      this.QRListResult = {}
      this.typeValue = ''
      this.typeDisabled = false
      this.$router.push('createqrcode')
    },
    // TODO 生成二维码方法
    changerealestate(){
        this.QRCodeListItem["UserReferId"] = "f9fe1dd6-7259-11ea-ad58-000d3aa2d63e"
        this.QRCodeListItem["EstateReferId"] = this.realestateValue
        this.QRCodeListItem["BuildingReferIds"] = []
        this.realestateDisabled = true  //禁用物业群选择下拉框
        this.$api.get(
        "/lksKBuilding/byRealestate/" + this.realestateValue,
        null,
        r => {
          this.buildingOptions = r;     //请求该物业群下的所有物业栋
        }
      )
    },
    changebuilding(){
        var obj = {}
        obj["BuildingReferId"] = this.buildingValue
        obj["MachineReferIds"] = []
        this.QRCodeListItem["BuildingReferIds"].push(obj)
        this.buildingDisabled = true    //禁用物业栋下拉框
        this.$api.get(
        "/lksKMachine/byBuilding/" + this.buildingValue,
        null,
        r => {
          this.machineOptions = r;      //请求该物业栋下的所有电梯
        }
      );
    },
    changemachine(){

        var obj = {}
        obj["MachineReferId"] = this.machineValue
        obj["ButtonRefIds"] = []
        this.QRCodeListItem["BuildingReferIds"][0]["MachineReferIds"].push(obj)
        this.machineDisabled = true
        this.$api.get(
        "/lksKButton/byMachine_List/" + this.machineValue,
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
        }
      );
    },
    click1(index) {
      //点击选中电梯按钮
      this.buttonlist[index].isselect = !this.buttonlist[index].isselect;
    },
    reset(){
      //清除此次选择
      this.initChoose()   //初始化数据
      if(this.typeValue){   //如果已经选择了type，禁选type
        this.typeDisabled = true
      }else{
        this.typeDisabled = false
      }
    },
    next(){
      //下一步
      var arr = []
      for(let i = 0;i<this.buttonlist.length;i++){
        if(this.buttonlist[i].isselect){
          arr.push({"ButtonReferId": this.buttonlist[i].reference})   //把选择的按钮添加到arr
        }
      }
      this.QRCodeListItem["BuildingReferIds"][0]["MachineReferIds"][0]["ButtonRefIds"] = arr  //把arr赋值到QRCodeListItem
      this.QRCodeList.push(this.QRCodeListItem)   //把QRCodeListItem放进QRCodeList缓存
      this.reset()  //清空此次选择
    },
    confirm(){
      this.next()   //把此次选择数据放进放进QRCodeList缓存
      //处理QRCodeList
      //第一遍合并相同物业群数据
      for(let i =0;i<this.QRCodeList.length-1;i++){ //外层循环第一个到倒数第二个数据
        if(!this.QRCodeList[i]["rdel"]){  //判断外层循环的数据是否准备删除
          for(let j = i+1;j<this.QRCodeList.length;j++){  //内层循环外层循环之后的所有数据
            if(!this.QRCodeList[i]["rdel"]){    //判断内层循环的数据是否准备删除
              //当外层循环的数据和内层循环的数据都不是准备删除的数据时
              if(this.QRCodeList[i]["EstateReferId"] ==this.QRCodeList[j]["EstateReferId"]){  //判断外层循环的"EstateReferId"是否等于内层循环的"EstateReferId"
                //当外层循环的"EstateReferId"等于内层循环的"EstateReferId"
                this.QRCodeList[i]["BuildingReferIds"].push(this.QRCodeList[j]["BuildingReferIds"][0]) //把内层循环的BuildingReferIds的第0项放进外层循环的BuildingReferIds中
                this.QRCodeList[j]["rdel"] = true   //给内层循环数据打上待删标签
              }
            }
          }
        }
      }
      var temp = []
      //删除准备删除的数据
      for(let i=0;i<this.QRCodeList.length;i++){  //循环所有物业群数据
        if(!this.QRCodeList[i]["rdel"]){  //判断物业群数据是否待删
          //如果不是待删数据
          temp.push(this.QRCodeList[i])   //把此项数据放入到temp中
        }
      }
      this.QRCodeList = temp  //把temp赋值到QRCodeList
      //完成第一次数据处理
      //开始第二次数据处理，合并相同物业栋
      for(let i =0;i<this.QRCodeList.length;i++){ //循环处理物业群数据
        if(this.QRCodeList[i]["BuildingReferIds"].length>1){  //判断该物业群下是否有多个物业栋
          //如果该物业群下有多个物业栋
          for(let j=0;j<this.QRCodeList[i]["BuildingReferIds"].length-1;j++){  //外层循环第一个到倒数第二个物业栋数据
            if(!this.QRCodeList[i]["BuildingReferIds"][j]["rdel"]){    //判断外层循环的数据是否准备删除
              for(let k=j+1;k<this.QRCodeList[i]["BuildingReferIds"].length;k++){ //内层循环外层循环之后的所有数据
                if(!this.QRCodeList[i]["BuildingReferIds"][k]["rdel"]){
                  //当外层循环的数据和内层循环的数据都不是准备删除的数据时
                  if(this.QRCodeList[i]["BuildingReferIds"][j]["BuildingReferId"] == this.QRCodeList[i]["BuildingReferIds"][k]["BuildingReferId"]){   //判断外层循环的BuildingReferId是否等于内层循环的BuildingReferId
                    //当外层循环的BuildingReferId等于内层循环的BuildingReferId
                    this.QRCodeList[i]["BuildingReferIds"][j]["MachineReferIds"].push(this.QRCodeList[i]["BuildingReferIds"][k]["MachineReferIds"][0])  //把内层循环的MachineReferIds的第0项放进外层循环的MachineReferIds中
                    this.QRCodeList[i]["BuildingReferIds"][k]["rdel"] = true  //给内层循环数据打上待删标签
                  }
                }
              }
            }
          }
        }
      }
      //删除准备删除的数据
      for(let i =0;i<this.QRCodeList.length;i++){ //外层循环所有物业群
        var temp = []
        for(let j =0;j<this.QRCodeList[i]["BuildingReferIds"].length;j++){  //内层循环该物业群下所有物业栋
          if(!this.QRCodeList[i]["BuildingReferIds"][j]["rdel"]){   //判断该物业栋是否准备删除
            //如果不是待删数据
            temp.push(this.QRCodeList[i]["BuildingReferIds"][j])
          }
        }
        this.QRCodeList[i]["BuildingReferIds"] = temp
      }
      //完成二次数据处理
      this.QRListResult = {
        pramStr: this.QRCodeList,
        type: this.typeValue
      }
      //提交数据生成二维码
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
          this.dialogFormVisible = false
          this.search();
        });
    },
    initChoose(){
        //初始化选择数据
        this.realestateValue = ''
        this.buildingOptions = []
        this.buildingValue = ''
        this.machineOptions = []
        this.machineValue = ''
        this.buttonlist = []
        this.QRCodeListItem = {}
        this.realestateDisabled = false
        this.buildingDisabled = false
        this.machineDisabled = false
    },
    detele(reference) {
      // 删除按钮触发函数
      this.dialogVisible = true;
      this.dialogVisible_reference = reference;
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
          this.$api.get('/lksKToken/count',null,r=>{
            this.totalElements = r
            this.totalElements1 = r
            console.log(this.page01,this.totalElements/this.sum)
            if(this.page01-1>=this.totalElements/this.sum){
            this.page01 = this.page01-1
            }
           this.search();
          })
        }
      );
      // console.log(this.dialogVisible_reference)
    },
    //分页查询
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
    handleClose(done) {
      this.dialogVisible = false;
    },
    // handleClose(done) {
    //   this.dialogVisibles = false;
    // },

    handleClose_group() {
      this.dialogVisible_group = false;
    },
    //模糊查询
    changerealestate() {
      this.buildingValue = ''
      this.$api.get("/lksKBuilding/byRealestate/"+this.realestateSrarchValue,null,r=>{
        this.buildingOptions = r
      })
      for(let i=0;i<this.realestateOptions.length;i++){
        if(this.realestateOptions[i].reference==this.realestateSrarchValue){
          this.likeobj.realestate = this.realestateOptions[i]
        }
      }
       
    },
    changebuilding(){
      for(let i=0;i<this.buildingOptions.length;i++){
        if(this.buildingOptions[i].reference==this.buildingSearchValue){
          this.likeobj.building = this.buildingOptions[i]
        }
      }
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

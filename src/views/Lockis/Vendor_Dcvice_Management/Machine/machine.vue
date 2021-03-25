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
                <h3>Machine</h3>
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
          <el-table-column label="No." align="center" type="index">
          </el-table-column>
          <el-table-column prop="id" label="ID" align="center" v-if="false">
          </el-table-column>
          <el-table-column
            prop="reference"
            label="ID"
            align="center"
            v-if="false"
          >
          </el-table-column>
          <el-table-column prop="name" label="Name" align="center">
          </el-table-column>
          <el-table-column prop="name_en" label="English Name" align="center">
          </el-table-column>
          <el-table-column prop="building.name" label="Building" align="center">
          </el-table-column>
          <el-table-column prop="dev.ekey" label="Dev" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="Remark" align="center">
          </el-table-column>

          <!-- <el-table-column prop="revised" label="Update time" align="center">
          </el-table-column>
          <el-table-column prop="made" label="Create time" align="center">
          </el-table-column> -->
          <el-table-column
            fixed="right"
            align="center"
            label="Action"
            :min-width="190"
          >
            <template slot-scope="scope">
              <!-- <el-button-group> -->
              <!-- <el-button
                @click="butSetting(scope.row.reference,false)"
                type="success"
                size="mini"
                ><div>create button</div></el-button
              >
              <el-button
                @click="butSetting(scope.row.reference,true)"
                type="success"
                size="mini"
                ><div>change button</div></el-button
              > -->
              <!-- style="margin-right: 10px;height:36px;width:84px;font-size:12px;background-color:#67C23A;color:#fff" -->
              <!-- <el-button
                @click="showQRCode(scope.row)"
                type="primary"
                size="mini"
                >QR Code</el-button
              > -->
              <!-- style="margin-right: 10px;height:36px;width:84px;font-size:14px;background-color:#4383E5;color:#fff" -->
              <el-button @click="modify(scope.row)" type="danger" size="mini"
                >Modify</el-button
              >
              <!-- style="margin-right: 10px;height:36px;width:84px;font-size:14px;background-color:#F46C6C;color:#fff" -->
              <el-button
                size="mini"
                @click="detele(scope.row.reference)"
                type="warning"
                style="color:#fff;background-color:#f69419"
                >Delete</el-button
              >
              <!-- style="height:36px;width:84px;font-size:14px;background-color:#F69419;color:#fff" -->
              <!-- </el-button-group> -->
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-dialog
            :title="isNew ? 'Create machine' : 'Change machine'"
            :visible.sync="dialogFormVisible"
          >
            <el-form :model="form" :rules="rules" ref="ruleForm">
              <el-form-item
                label="ID"
                :label-width="formLabelWidth"
                v-if="false"
              >
                <el-input v-model="form.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="Reference"
                :label-width="formLabelWidth"
                v-if="false"
              >
                <el-input
                  v-model="form.reference"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Realestate" :label-width="formLabelWidth" prop="realestateValue">
                <el-select
                  filterable
                  v-model="realestateValue"
                  placeholder="请选择"
                  @change="changeRealestate"
                >
                  <el-option
                    v-for="item in realestateOptions"
                    :key="item.id"
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
                >
                  <el-option
                    v-for="item in buildingOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Dev" :label-width="formLabelWidth" prop="devValue">
                <el-select
                  filterable
                  v-model="devValue"
                  placeholder="请选择"
                  @change="changedev"
                >
                  <el-option
                    v-for="item in devOptions"
                    :key="item.id"
                    :label="item.ekey"
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
              
              <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input v-model="form.remark" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">cancel</el-button>
              <el-button type="primary" @click="confirm()">confirm</el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-dialog
            :title="isNew ? 'Create buttonsetting' : 'Change buttonsetting'"
            :visible.sync="buttonSettingDialog"
          >
            <el-form :model="formbut">
              <el-form-item
                label="ID"
                :label-width="formLabelWidth"
                v-if="false"
              >
                <el-input v-model="formbut.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="Reference"
                :label-width="formLabelWidth"
                v-if="false"
              >
                <el-input
                  v-model="formbut.reference"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="formbut.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="English Name" :label-width="formLabelWidth">
                <el-input v-model="formbut.name_en" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Designation" :label-width="formLabelWidth">
                <el-input v-model="formbut.designation" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Output" :label-width="formLabelWidth">
                <el-input v-model="formbut.output" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input v-model="formbut.remark" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="buttonSettingDialog = false">cancel</el-button>
              <el-button type="primary" @click="butconfirm()">confirm</el-button>
            </div>
          </el-dialog>
        </div>
        <div>
          <el-dialog title="QR Code" :visible.sync="dialogQRCodeVisible">
            <section ref="print">
              <div>
                <img
                  id="imageWrapper"
                  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2394677427,1111378321&fm=26&gp=0.jpg"
                  alt=""
                />
              </div>
            </section>
            <div slot="footer" class="dialog-footer">
              <el-button @click="print">Printing</el-button>
              <el-button @click="toSave">Download</el-button>
              <el-button @click="dialogQRCodeVisible = false"
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
        <span>Do you really want to delete this machine?</span>
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
import html2canvas from "html2canvas";
export default {
  name: "machine",

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
      var validatedev = (rule, value, callback) => {
        if (this.devValue === '') {
          callback(new Error('please select dev'));
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
      buttonSettingDialog: false,
      res: {},
      dialogFormVisible: false,
      dialogQRCodeVisible: false,
      isNew: false,
      realestateOptions: [],
      buildingOptions: [],
      realestateValue: "",
      buildingValue: "",
      devOptions: [],
      devValue: '',
      form: {
        id: "",
        reference: "",
        name: "",
        name_en: "",
        remark: "",
        building:{},
        dev: {}
      },
      formbut: {
        id: '',
        reference: '',
        name: '',
        name_en: '',
        designation: '',
        output: '',
        remark: '',
        machine: {}
      },
      rules: {
        realestateValue:[{validator:validaterealestate, trigger: 'change'}],
        buildingValue:[{validator:validatebuilding, trigger: 'change'}],
        devValue:[{validator:validatedev, trigger: 'change'}],
        name:[{required: true, message: 'please input name', trigger: 'blur'}],
        name_en:[{required: true, message: 'please input englishname', trigger: 'blur'}]
      },
      formLabelWidth: "170px",
      buttonData: {}
    };
  },
  created: function() {
    // 总数
    this.$api.get("/lksKMachine/count", null, r => {
      this.totalElements = r;
      this.totalElements1 = r
    });
    // 获取数据
    this.search();
    this.loaing_table = true;
    this.$api.get("/lksKRealestate", null, r => {
      this.realestateOptions = r;
    });
    this.$api.get("/lksKDdev", null, r => {
      this.devOptions = r;
    });
  },
  methods: {
    // test
    like() {
      this.page01 = 1
      if(this.likeSearch!=''&&this.likeSearch!=undefined){
        if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
          alert("搜索时首尾不要加空格")
        }else{
        this.$api.get("/lksKMachine/count/"+this.likeSearch,null,r=>{
          this.totalElements = r
        })
        this.$api.get("/lksKMachine/many/" + this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null, r => {
        this.tableData = r;
      })
        }
      }else{
        this.totalElements = this.totalElements1
        this.search()
      }
      
    },
    changeRealestate() {
      this.buildingValue =''
      this.form.building = {}
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id === this.realestateValue) {
          this.$api.get("/lksKBuilding/byRealestate/"+this.realestateOptions[i].reference, null, r => {
            this.buildingOptions = r;
          });
        }
      }
    },
    changebuilding(){
      if(this.form.building){
        this.form.building = {}
      }
      for(let i = 0;i<this.buildingOptions.length;i++){
        if(this.buildingOptions[i].id === this.buildingValue){
          this.form.building = this.buildingOptions[i]
        }
      }
    },
    changedev(){
      if(this.form.dev){
        this.form.dev = {}
      }
      for(let i = 0;i<this.devOptions.length;i++){
        if(this.devOptions[i].id === this.devValue){
          this.form.dev = this.devOptions[i]
        }
      }
    },
    butconfirm(){
      if(this.formbut.reference){
        this.$api.put("/lksKButton/update",this.formbut,r=>{
          this.buttonSettingDialog = false
           this.$notify({
          title: 'success',
          message: 'save success',
          type: 'success'
        });
        })
      }else{
        this.$api.post("/lksKButton/save",this.formbut,r=>{
          this.buttonSettingDialog = false
          this.$notify({
          title: 'success',
          message: 'change success',
          type: 'success'
        });
        })
      }
    },
    confirm() {
      // 信息修改/新增后，提交this._data.form完成修改/新增
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var uuid = this.form.reference;
            if (uuid != "" && uuid != undefined) {
              this.loading = true;
              this.$api.put("/lksKMachine/update", this.form, r => {
                // history.back(-1)
                //this.$router.back()
                this.search();
              });
            } else {
              this.alert("aaa");
              this.$api.post("/lksKMachine/save", this.form, r => {
                //history.back(-1)
                this.search();
              });
            }
            this._data.dialogFormVisible = false;
          } else {
            return false;
          }
        })
    },
    modify(res) {
      // 修改按钮触发函数
      this.$router.push(
        {
          name: 'createmachine',
          params: {
            res: res
          }
        }
      )
      console.log("res",res)
      this._data.isNew = false;
      this._data.dialogFormVisible = true;
      this._data.res = res;
      this.form.id = res.id;
      this.form.reference = res.reference;
      this.form.name = res.name;
      this.form.name_en = res.name_en;
      // this.realestateValue = res.
      this.realestateValue = res.building.realestate.id
      this.buildingValue = res.building.id;
      this.devValue = res.dev.id;
      this.form.remark = res.remark;
      // this.changeRealestate()
      for (let i = 0; i < this.realestateOptions.length; i++) {
        if (this.realestateOptions[i].id === this.realestateValue) {
          this.$api.get("/lksKBuilding/byRealestate/"+this.realestateOptions[i].reference, null, r => {
            this.buildingOptions = r;
          });
        }
      }
      this.changebuilding()
      this.changedev()
      var devreference = res.dev.reference
      var buildingreference = res.building.reference
      this.$api.get('/lksKBuilding/byReference/'+buildingreference,null,r=>{
        this.form.building = r
      })
      this.$api.get('/lksKDdev/byReference/'+devreference,null,r=>{
        this.form.dev = r
      })
      // for(let i = 0;i<this.buildingOptions.length;i++){
      //   if(this.buildingOptions[i].id === this.buildingValue){
      //     this.form.building = this.buildingOptions[i]
      //     // console.log("111")
      //   }
      // }
      // for(let i = 0;i<this.devOptions.length;i++){
      //   if(this.devOptions[i].id === this.devValue){
      //     this.form.dev = this.devOptions[i]
          
      //   }
      // }
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
      this.form = {
        id: "",
        reference: "",
        name: "",
        name_en: "",
        remark: "",
        building:{},
        dev: {}
      };
      this.realestateValue = ''
      this.buildingValue = ''
      this.devValue = ''
      // this._data.dialogFormVisible = true;
      this.$router.push('createmachine')
    },
    butSetting(res,flag) {
      this.formbut = {
        id: '',
        reference: '',
        name: '',
        name_en: '',
        designation: '',
        output: '',
        remark: '',
        machine: {
          reference: ''
        }
      }
      console.log("================",res)
      this.buttonData = {}
      // this.$api.get("/lksKMachine/ByReference/"+res, null, r =>{
      //   this.formbut.machine.id = r.id
      //   if(r.id){
        this.formbut.machine.reference = res
        if(flag){
          this.isNew = !flag
          this.$api.get("/lksKButton/byMachine/"+res,null,r=>{
        this.buttonData = r
        // if(r){
        //   this.isNew = false
        // }else{
        //   this.isNew = true
        // }
        // console.log("+++++++++++++++++++++++",r)
        // console.log("----------------------",r[0])
        this.formbut.id = this.buttonData.id
        this.formbut.reference = this.buttonData.reference
        this.formbut.name = this.buttonData.name
        this.formbut.name_en = this.buttonData.name_en
        this.formbut.designation = this.buttonData.designation
        this.formbut.remark = this.buttonData.remark
        this.formbut.output = this.buttonData.output
        this.buttonSettingDialog = true
      })
        }else{
          this.isNew = !flag
          this.buttonSettingDialog = true
        }
      // }
      // })
      
        // console.log("butSetting -> this.formbut", this.formbut)
        
        
      // this.formbut.machine = 
    },
    cancel_detele() {
      // 删除弹出框取消函数
      this.dialogVisible = false;
    },
    confirm_detele() {
      // 删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false;
      // alert(this.dialogVisible_reference);
      this.$api.delete(
        "/lksKMachine/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.$api.get("/lksKMachine/count", null, r => {
      this.totalElements = r;
      this.totalElements1 = r
      if(this.page01-1>=this.totalElements/this.sum){
            this.page01 = this.page01-1
            }
           this.search();
    })
        }
      );
      console.log(this.dialogVisible_reference);
    },
    showQRCode() {
      this.dialogQRCodeVisible = true;
    },
    //打印
    print() {
      this.$print(this.$refs.print);
    },
    //保存
    toSave() {
      html2canvas(document.getElementById("imageWrapper"), {
        useCORS: true,
        backgroundColor: null
      }).then(canvas => {
        let saveUrl = canvas.toDataURL("image/png");
        let aLink = document.createElement("a");
        let blob = this.base64ToBlob(saveUrl);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);
        aLink.download = "二维码.jpg";
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        console.log(aLink.href);
        if (aLink.href) {
          Toast.success("保存成功");
        }
      });
    },
    // 这里把图片转base64
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    search() {
      // 请求数据方法
      this.loaing_table = false;
      this.tableData = [];
      // TODO elevator 请求数据
      this.$api.get(
        "/lksKMachine/" + (this.page01 - 1) + "/" + this.sum,
        null,
        r => {
          // this.$api.get('elevator.json', null, r => {
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
      // this.search();
      if(this.likeSearch!=''&&this.likeSearch!=undefined){
        if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
          alert("搜索时首尾不要加空格")
        }else{
        this.$api.get("/lksKMachine/count/"+this.likeSearch,null,r=>{
          this.totalElements = r
        })
        this.$api.get("/lksKMachine/many/" + this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null, r => {
        this.tableData = r;
      })
        }
      }else{
        this.totalElements = this.totalElements1
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
@import "src/assets/styles/variable";

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

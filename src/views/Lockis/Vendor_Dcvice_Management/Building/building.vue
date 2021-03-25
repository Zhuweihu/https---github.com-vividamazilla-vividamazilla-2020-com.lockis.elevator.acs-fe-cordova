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
                  <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="likeSearch" placeholder="Name" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>
                <el-form-item style='float:left;height: 35px;'>
                  <el-button type="primary" @click="like" style='height:40px;border:0;padding: 0 10px;'>Search</el-button>
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
                <h3>Building</h3>
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
            prop="name"
            label="Building Name"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name_en"
            label="English Name"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="realestate.name" label="Realestate" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="Remark" align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="Action"
            :min-width="190"
          >
            <template slot-scope="scope">
              <!-- <el-button
                @click="createQRCode(scope.row)"
                type="primary"
                size="small"
                >Create QRCode</el-button
              > -->
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
            :title="isNew ? 'Create building' : 'Change building'"
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
                label="Realestate"
                :label-width="formLabelWidth"
                prop="realestateValue"
                >
                <el-select filterable v-model="realestateValue" placeholder="请选择" @change="changeRealestate">
                  <el-option
                    v-for="item in realestateOptions"
                    :key="item.reference"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="Building Name"
                :label-width="formLabelWidth"
                prop="name"
              >
                <el-input
                  v-model="form.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="English Name"
                :label-width="formLabelWidth"
                prop="name_en"
              >
                <el-input
                  v-model="form.name_en"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              
              <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input
                  v-model="form.remark"
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
        <div>
          <el-dialog
            :title="isNew ? 'Create QRcode' : 'Change QRcode'"
            :visible.sync="QRcodedialog"
          >
            <el-form :model="codeform" status-icon ref="form">
              <el-form-item
                label="Building Name"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="codeform.name"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item
                label="Machine"
                :label-width="formLabelWidth"
                >
                <el-select filterable v-model="codeform.machine" multiple placeholder="请选择" @change="changemachine">
                  <el-option
                    v-for="item in machineOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="Remark" :label-width="formLabelWidth">
                <el-input
                  v-model="form.remark"
                  autocomplete="off"
                ></el-input>
              </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="QRcodedialog=false">cancel</el-button>
              <el-button type="primary" @click="confirmqrcode()"
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
        <span>Do you really want to delete this building?</span>
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
  name: 'building',
  data() {
    var validaterealestate = (rule, value, callback) => {
        if (this.realestateValue === '') {
          callback(new Error('please select realestate'));
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
      totalElements1: 0,
      page01: 1,
      tableData: [],
      options: '',
      options_list: [],
      member_reference: '',

      // dialog
      QRcodedialog: false,
      res: {},
      dialogFormVisible: false,
      isNew: false,
      realestateOptions:[],
      realestateValue: '',
      machineOptions: [],
      QRCodeList:{},
      designation: [],
      index: '',
      form: {
        id: '',
        name: '',
        reference: '',
        name_en: '',
        remark: '',
        realestate: {}
      },
      codeform: {
        name: '',
        building: '',
        machine: []
      },
      rules: {
        realestateValue:[{validator:validaterealestate, trigger: 'change'}],
        name:[{required: true, message: 'please input name', trigger: 'blur'}],
        name_en:[{required: true, message: 'please input englishname', trigger: 'blur'}]
      },
      formLabelWidth: '130px',
    }
  },
  created: function() {
    // 总数
    this.$api.get("/lksKBuilding/count", null, r => {
      this.totalElements = r;
      this.totalElements1 = r
    });
    // 获取数据
    this.search()
    this.loaing_table = true
    this.$api.get("/lksKRealestate", null , r => {
      this.realestateOptions = r
    })
  },
  methods: {
    // test
    like(){
      this.page01 = 1
      if(this.likeSearch!=''&&this.likeSearch!=undefined){
        if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
          alert("搜索时首尾不要加空格")
        }else{
          this.$api.get("/lksKBuilding/count/"+this.likeSearch,null,r=>{
            this.totalElements = r
          })
          this.$api.get("/lksKBuilding/many/"+this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null, r => {
          this.tableData = r
        })
        }
      }else{
        this.totalElements = this.totalElements1
        this.search()
      }
    },
    // getdesignation(index){
    //   if(index>=this.machineOptions.length){
    //     return
    //   }
    //   this.$api.get("/button/many/"+this.machineOptions[index].id,null,res=>{
    //     console.log(index)
    //     this.index = this.index+1  
    //     this.getdesignation(this.index)
    //   })
    // },
    createQRCode(res){
      // console.log("Creatqrcode",res)
      this.codeform ={
        name: '',
        building: '',
        machine: []
      }
      this.codeform.building = res
      this.codeform.name = res.name
      this.QRcodedialog = true
      //通过building的id获取所有相关machine
      this.machineOptions = []
      this.designation = []
      var that =this
      this.$api.get("/lksKMachine/byBuilding/"+res.id, null, r =>{
        this.machineOptions = r
        this.index = 0
        // this.getdesignation(this.index)
      }) 
    },
    changeRealestate(){
      if(this.form.realestate){
        this.form.realestate = {}
      }
      for(let i = 0;i<=this.realestateOptions.length;i++){
        if(this.realestateOptions[i].id === this.realestateValue){
          this.form.realestate = this.realestateOptions[i]
          // console.log(this.form)
        }
      }
    },
    changemachine(){
          if(this.designation==''){
            for(let i = 0;i<this.machineOptions.length;i++){
          this.$api.get("/lksKMachine/byBuilding/"+this.machineOptions[i].id,null,res=>{
            if(res[0].designation){
              this.designation.push({
                "id": res[i].id,
                "value": res[0].designation
              })
            }
              // buildingObj[machine] = [r[0].designation,this.machineOptions[j].dev.sn,this.machineOptions[j].dev.mac,this.machineOptions[j].dev.ekey,'1577808000','1609430399']
              
            })    
        }
          }
          
    },
    //TODO 生成二维码
    confirmqrcode(){
      // for(let x=0;x<this.designation;i++){
      //         // if(this.machineOptions[j].id==this.designation[x].id){
      //         //   this.designation[x].designation
      //           console.log("confirmqrcode -> this.designation[x].designation", this.designation[x].value)
      //         // }
      //       }
      this.QRCodeList = {}
      var randem = Math.floor(Math.random() * 99)+":"+Math.floor(Math.random() * 999);
      var realestate = this.codeform.building.realestate.name+":"+this.codeform.building.realestate.name_en
      var building = this.codeform.building.name+":"+this.codeform.building.name_en
      var buildingObj ={}
      for(let i=0;i<this.codeform.machine.length;i++){
        for(let j=0;j<this.machineOptions.length;j++){
          if(this.codeform.machine[i]===this.machineOptions[j].id){
            var machine = this.machineOptions[j].name+":"+this.machineOptions[j].name_en
            var designation = ''
            // this.$api.get("/button/many/"+this.machineOptions[j].id, null, r =>{
            //   console.log("++++++++++designation",r)
            //   designation = r[0].designation
            // })
            buildingObj[machine] = [designation,this.machineOptions[j].dev.sn,this.machineOptions[j].dev.mac,this.machineOptions[j].dev.ekey,'1577808000','1609430399']
          }
        }
      }
      this.QRCodeList = {[randem]:{
        [realestate]:{
          [building]: buildingObj
        }
      }}
      // this.$api.get("/getQRCode",this.codeform , r =>{
        
      // })

      // this.$message({
      //     message: '二维码生成成功',
      //     type: 'success'
      //   });
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
          this.$api.put('/lksKBuilding/update', this._data.form, r => {
            // history.back(-1)
            //this.$router.back()
            this.search()
            this.realestateValue = ''
          });
        } else {
          this.alert('aaa')
          this.$api.post('/lksKBuilding/save', this._data.form, r => {
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
        name: 'createbuilding',
        params:{
          res:res
        }
      })
      this._data.isNew = false
      // this._data.dialogFormVisible = true
      this._data.res = res
      this.form.id = res.id
      this.form.name = res.name
      this.form.name_en = res.name_en
      this.form.remark = res.remark
      this.form.reference = res.reference
      this.realestateValue = res.realestate.id
      for(let i = 0;i<this.realestateOptions.length;i++){
        if(this.realestateOptions[i].id === this.realestateValue){
          this.form.realestate = this.realestateOptions[i]
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
        name: '',
        reference: '',
        name_en: '',
        remark: '',
        realestate: {}
      }
      // this._data.dialogFormVisible = true
      this.$router.push('createbuilding')
    },
    cancel_detele() {
      // 删除弹出框取消函数
      this.dialogVisible = false
    },
    confirm_detele() {
      // 删除弹出框确认函数，向后端传递id（this.dialogVisible_reference）
      this.dialogVisible = false
      this.$api.delete(
        "/lksKBuilding/" + this.dialogVisible_reference + "/purge",
        null,
        r => {
          this.$api.get("/lksKBuilding/count", null, r => {
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
      this.loaing_table = false
      this.tableData = []
      // TODO building 请求数据
      this.$api.get('/lksKBuilding/'+(this.page01-1)+'/'+this.sum,null,r=> {
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
        this.$api.delete('/lksKBuilding/' + res + '/purge', null, r => {
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
    // handleClose(done) {
    //   this.dialogVisibles = false
    // },

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
      // this.search()
      if(this.likeSearch!=''&&this.likeSearch!=undefined){
        if(this.likeSearch.substr(0, 1)==' '|this.likeSearch.substr(-1)==' '){
          alert("搜索时首尾不要加空格")
        }else{
          this.$api.get("/lksKBuilding/count/"+this.likeSearch,null,r=>{
            this.totalElements = r
          })
          this.$api.get("/lksKBuilding/many/"+this.likeSearch+"/"+ (this.page01 - 1) + "/" + this.sum, null, r => {
          this.tableData = r
        })
        }
      }else{
        this.totalElements = this.totalElements1
        this.search()
      }
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

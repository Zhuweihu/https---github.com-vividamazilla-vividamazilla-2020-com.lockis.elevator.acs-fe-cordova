<template>

  <div class="reservemanagement">

    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">

            <div style="width: 300px;margin-left: 0;float: left;">
              <el-date-picker v-model="value6" type="daterange" start-placeholder="start date" end-placeholder="end date"
                placeholder="select date" style='width: 100%;float: right;border-radius: 10px;'>
              </el-date-picker>
            </div>
            <div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-input v-model="formInline.seek" placeholder="Sale No" style='font-size: 14px;float: left;margin-left: 10px;width: 200px;height: 40px;line-height: 40px;'></el-input>
                <el-button type="primary" @click="onSubmit01" style='margin-left: 10px;float: left;font-size: 14px;padding: 0 10px;height:40px;border:0;background: rgb(5,120,209);'>Search</el-button>
                <!-- <el-button type="primary" @click="yesterday" style='font-size: 14px;padding: 0 10px;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Yesterday</el-button>
                <el-button type="primary" @click="three" style='padding: 0 10px;font-size: 14px;text-align: center;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Last
                  three days</el-button>
                <el-button type="primary" @click="seven" style='padding: 0 10px;font-size: 14px;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Last
                  seven days</el-button> -->

                  <el-button type="primary" @click="usercreate" style='float: right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>Report</el-button>

                  <el-button type="primary" @click="usercreate" style='float:right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);margin-right: 10px;'>New</el-button>

                  <el-select v-model="slelct_type" placeholder="select" style="margin-left: 10px;width: 200px;height: 40px;float: right;margin-right: 10px;"
                    @change="search()">
                    <el-option v-for="items in type_list" :label="items.label" :value="items.value"></el-option>
                  </el-select>


              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>



    <!-- 庫存列表 -->
    <div style="font-size: 18px;font-weight: bold;padding-left: 20px;line-height: 40px;height: 40px;"></div>
    <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;line-height: 40px;height: 40px;">Factory Order</div> -->
    <div style="border-radius: 10px;background: white;width: 100%;" v-show="ifGRS==0">
      <div>
        <!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
        <!-- highlight-current-row -->
        <el-table :data="tableData1"  ref="singleTable01" :header-cell-style="titlebg" style='min-width: 1050px;border-radius: 10px;'>

          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>

          <!-- <el-table-column type="index" row-style='background:red' >
					</el-table-column> -->

          <el-table-column prop="id" label="Id" width="80px" >
          </el-table-column>

          <!-- <el-table-column
            type="index"
            width="80px"
            :index="indexMethod"
            >
          </el-table-column> -->

          <el-table-column prop="salesOrderItem" label="Sale No" row-style='background:red'>





             <template slot-scope="scope" >

               <span v-if="scope.row.salesOrderItem==null" >##</span>

               <span v-if="scope.row.salesOrderItem!=null" style="text-decoration: underline;cursor: pointer;" @click="to_sales_order(scope.row.salesOrderItem.salesOrder.salesNo)" >
               {{scope.row.salesOrderItem.salesOrder.salesNo}}</span>
             </template>

          </el-table-column>

          <el-table-column prop="salesOrderItem.description" label="Item" row-style='background:red'>

            <template slot-scope="scope" >

              <span v-if="scope.row.name==null" >##</span>

              <span v-if="scope.row.name!=null" style="cursor: pointer;" >
              {{scope.row.name}}</span>
            </template>

          </el-table-column>

          <el-table-column prop="quantity" label="Quantity">
          </el-table-column>



          <el-table-column prop="factory.name" label="Factory">
            <template slot-scope="scope" >

              <span v-if="scope.row.factory.name==null" >##</span>

              <span @click="to_factory(scope.row.factory.name)" v-if="scope.row.factory.name!=null" style="cursor: pointer;text-decoration: underline;" >
              {{scope.row.factory.name}}</span>
            </template>
          </el-table-column>



          <el-table-column prop="dateSend" label="Send Date">
            <template slot-scope="scope" format="yyyy-MMM-dd">
              <span>{{new Date(scope.row.dateSend).format("yyyy-MMM-dd")}}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="dateSend" label="Send Date" >

						<span>{{new Date(scope.row.dateStart).format("yyyy-MMM-dd")}}</span>


					</el-table-column> -->




          <el-table-column prop="dateDelivery" label="Delivery Date">
            <template slot-scope="scope" format="yyyy-MMM-dd">
              <span>{{new Date(scope.row.dateDelivery).format("yyyy-MMM-dd")}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="Status" sortable>
            <template slot-scope="scope">
              <el-button style='color: #606266;font-size: 14px;text-decoration: underline;' @click="Processing(scope.row.reference,scope.row.status.text)"
                type="text" size="small" data-id='0101'>{{scope.row.status==null?'Click to Change':('('+scope.row.status.text+')->('+scope.row.member.identifier+')')}}</el-button>
            </template>
          </el-table-column>


          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' style='background: red;' width="200px">
              <template slot-scope="scope">
                <div style="white-space: nowrap;" class="selector_form">


                  <el-button style='float: left;' @click="handleClick(scope.row.reference)" type="danger" size="small">Detail</el-button>
                  <el-button style='float: left;' @click="Alter(scope.row.reference)" type="danger" size="small">Modify</el-button>
                  <!-- 									<el-button v-if='!scope.row.isSend'   @click="sublime_factory(scope.row.eceReference,scope.row.reference)" type="danger" size="small">New Factory</el-button>
									<el-button v-if='scope.row.isSend&&((new Date().getTime() - 1000 * 60 * 60 * 24 * 1)-scope.row.factoryMade)<0' type="danger" size="small"  @click="Alter(scope.row.reference)">Alter Factory</el-button> -->
                  <!-- <el-button v-if='scope.row.isSend&&((new Date().getTime() - 1000 * 60 * 60 * 24 * 1)-scope.row.factoryMade)>=0' type="info" size="small" >Lock Factory</el-button> -->
                  <!-- <el-button v-if='!scope.row.isSend||((new Date().getTime() - 1000 * 60 * 60 * 24 * 1)-scope.row.factoryMade)<0' @click="del(scope.row.reference)" type="danger" size="small">Delete</el-button> -->
                  <!-- <el-button v-else  type="info" size="small">Delete</el-button> -->


                  <!-- <el-menu style='background:rgb(245,108,108);margin-left: 10px;float: left;width: 80px;padding: 0;height: 32px;border-radius: 3px;'
									 class="el-menu-demo" mode="horizontal" background-color="rgb(245,108,108)" text-color="#fff"
									 active-text-color="#fff">
										<el-submenu index="1">
											<template slot="title" style="line-height: 32px;height: 32px;line-height: 32px;border-bottom: 2px solid transparent;color: #909399;border-radius: 3px;">Edit</template>
											<el-menu-item  index="2-1"  @click="Alter(scope.row.reference)">Alter</el-menu-item>
										</el-submenu>
									</el-menu> -->

                </div>

                <!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
      <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages01'
          :current-page="page01">
        </el-pagination>
      </div>
      <div style="float: right;margin-right: 20px;margin-top: 10px;" class="paginations">
        <el-select v-model="select_date" placeholder="select" style="float: left;width: 100px;font-size: 12px;height: 30px;"
          @change="change_date()">
          <el-option label="Today" value="Today"></el-option>
          <el-option label="3 Days" value="3 Days"></el-option>
          <el-option label="7 Days" value="7 Days"></el-option>
          <!-- <el-option label="All" value="all"></el-option> -->
        </el-select>
      </div>

    </div>



    <div class="tishi">
      <el-dialog title="" :visible.sync="dialogVisible_state" width="30%" :before-close="handleClose_state" top='20%'>
        <span>Status change:&nbsp;</span>

        <el-select v-model="options" filterable placeholder="Select">
          <el-option v-for="item in options_list" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_state()">NO</el-button>
          <el-button type="primary" @click="confirm_state()">YES</el-button>
        </span>
      </el-dialog>
    </div>





    <!-- 賬號密碼錯誤彈窗 -->
    <div class="dialog">
      <el-dialog title="提示" :visible.sync="dialogVisible02" width="30%" top='20%'>
        <span>時間不能爲空</span>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="dialogVisible02 = false">確 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import {
    MessageBox,
    Message
  } from 'element-ui';
  export default {
    name: "factory",
    data() {
      return {

        select_date:'Today',
        slelct_type:'ALL',
        type_list: [{
          value: 'ALL',
          label: 'ALL'
        }],
        type:"",
        // fileList:[],
        value6: [],
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        labelPosition: 'right',
        branch: '分行一',
        branch_list: [],
        formInline_reserve: {
          search: '',
          num: '',
        },
        formInline: {
          search: '',
          num: '批量',
        },
        formInlinetwo: {
          seekTwo: ''
        },
        reserveList_search: {
          search: '',
        },
        batchDetail: {
          stone_name: '',
          stone_type: '',
          Storage: '',
          Warehouse: '',
          num: '',
          innum: '',
          size: '',
          size_type: '',
          weight: '',
          weight_type: '',
          price: '',
          sum: '',
          Check_num: '',
          Invoice_num: '',
          time: '',
          rests: ''
        },
        reserveDetail: {
          no_: '',
          date: '',
          object: '',
          identification: '',
          weight: '',
          weightTo: '',
          dimensions: '',
          dimensionsTo: '',
          cut: '',
          shape: '',
          color: '',
          colorTo: '',
          comment: '',
          origin: '',
          codeUseSeeHelp: '',
          rests: '',
          productionPlace: '',
          viewId: ''
        },

        reserveDetail_gia: {
          date: '',
          giaReportNumber: '',
          shapeAndCuttingStyle: '',
          measurements: '',
          caratWeight: '',
          colorGrade: '',
          clarityGrade: '',
          cutGrade: '',
          polish: '',
          symmetry: '',
          fluerescence: '',
          inscription: '',
          comments: '',
          codeUseSeeHelp: '',
          viewId: ''
        },
        currentRow: null,
        totalElements: 0,
        totalElements_list: 0,
        page01: 1,
        page02: 1,
        dateOne: '',
        dateTwo: [],
        dateOne_transfer: '',
        dateTwo_transfer: new Date().format("yyyy-MM-dd"),
        value1: '',
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        dialogVisible02: false,
        ifimg: false,
        detail: false,
        batch: false,
        all_loading: false,
        reserve_list: false,
        reserve_detail: false,
        ifGRS: 0,
        loaing_table: false,
        tableData1_gia: [],
        tableData2: [],
        fileList: [],
        transferid: 0,
        warehouse: [

          {
            id: 0,
            name: '批量'
          },
          {
            id: 1,
            name: 'GIA'
          },
          {
            id: 2,
            name: 'GRS'
          },
        ],
        tableData3: [],
        tableData1: [],
        options_list: [],
        dialogVisible_state:false,
        stateid:"",
        options:"",


      }
    },
    created: function() {

      console.log(this.$route.query)
      this.type=this.$route.query.type
      console.log('01')
      console.log(this.type)
      console.log('02')
      // this.$api.get('/factory/order/count', null, r => {
      //   console.log('sum---' + r)
      //   this.totalElements = r
      // });
      var today = new Date();
      var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      this.dateOne = today.format("yyyy-MM-dd")
      this.dateOne_transfer = today.format("yyyy-MM-dd")
      this.value6.push(today)
      // this.value6.push(new Date())
      this.value6.push(new Date())
      if(this.type=="salesOrder"){
        this.value6=[]
         var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 365;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(new Date())
         this.formInline.seek=this.$route.query.salesNo
      }
      // this.findAllEntrepot()
      this.$api.get('/miscellaneous/orderstatus/factoryorder', null, r => {
        for (let i = 0; i < r.length; i++) {
          this.options_list.push({
            value: r[i].reference,
            label: r[i].text
          })
        }
        for (let i = 0; i < r.length; i++) {
          this.type_list.push({
            value: r[i].reference,
            label: r[i].text
          })
        }
        console.log(r)
      });

      this.search()


    },
    methods: {

      to_factory(search_name){
        this.$router.push("/factoryList?search_name="+search_name)
      },

      change_date(){

        if(this.select_date=='Today'){
          this.yesterday()
        }else if(this.select_date=='3 Days'){
          this.three()
        }else if(this.select_date=='7 Days'){
          this.seven()
        }

      },

      yesterday(){
        this.value6=[]
        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 0;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(today)
        // this.value6.push(new Date())
        this.onSubmit01()
      },
      three(){
        this.value6=[]
         var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 2;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码

         var today01 = new Date();
        var targetday_milliseconds01 = today01.getTime() - 1000 * 60 * 60 * 24 * 0;
        today01.setTime(targetday_milliseconds01); //注意，这行是关键代码

        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(today01)
        // this.value6.push(new Date())
        this.onSubmit01()
      },

      seven(){
        this.value6=[]
         var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 6;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var today01 = new Date();
        var targetday_milliseconds01 = today01.getTime() - 1000 * 60 * 60 * 24 * 0;
        today01.setTime(targetday_milliseconds01); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(today01)
        // this.value6.push(new Date())
        this.onSubmit01()
      },

      Processing(id, name) {
        this.dialogVisible_state = true
        this.stateid = id
        // this.options = name
        // console.log('----'+id)
      },

      handleClose_state(done) {
        this.dialogVisible_state = false
      },

      cancel_state(){
        this.dialogVisible_state = false
      },

     confirm_state(id) {
        this.dialogVisible_state = false
        var format = {}

        this.tableData1 = []
        this.loaing_table=false

        this.$api.get('/factory/order/' + this.stateid, null, r => {
          // console.log(r)
          // this.search()
          format = r
          format.status = {
            reference: this.options
          }
          format.dateDelivery=new Date(format.dateDelivery).format('yyyy-MM-dd')
          format.dateSend=new Date(format.dateSend).format('yyyy-MM-dd')
          for (let i = 0; i < format.materials.length; i++) {
            format.materials[i].factoryOrder=null
            format.materials[i].id=null
            format.materials[i].reference=null
          }
          this.$api.post('/factory/order/save', format, r => {
            console.log(r)
            this.search()
          })
        })
      },

      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1);
      },

      to_sales_order(uuid){
        this.$router.push("/CustomerOrderManagement?type=factory&uuid="+uuid)
      },

      // 分行數據初始化
      findAllEntrepot() {
        this.$api.get('/inventory/findAllEntrepot', null, r => {
          this.branch_list = r.content
          this.branch = r.content[0].name
        });
      },

      usercreate() {
        this.$router.push("/FaXiangDan?type=new")
      },

      sublime_factory(saleNo, uuid) {
        this.$router.push("/factoryCreate?type=new&saleNo=" + saleNo + '&uuid=' + uuid)
        //    a22cb582-d2e5-4e57-abb2-59cf663f95f0
      },

      del(id) {
        // 刪除
        MessageBox('Do you really want to delete this item?', 'Tips', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/sendInlay/deleteFactoryOrder?reference=' + id, null, r => {
            this.search()
            Message({
              type: 'success',
              message: 'success!'
            });
          });
        }).catch(() => {
          Message({
            type: 'info',
            message: 'Cancel'
          });
        });
      },

      submitForm(formLabelAlign) {
        // //console.log('0101')
        var that = this
        this.$refs[formLabelAlign].validate((valid) => {
          if (valid) {
            //console.log(that.formLabelAlign);
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },

      check_img() {

      },

      tocreate() {
        // this.$router.push("/SystemManagement/specialCreate?type=new")
        this.$router.push("/factoryCreate?type=new")
      },

      Alter(id) {
        this.$router.push("/FaXiangDan?type=Alter&id=" + id)
      },

      handleClick(id) {

        // this.$router.push("/factoryCreate?type=detail&id=" + id)
        this.$router.push("/factoryDetail?type=detail&id=" + id)

        // var that=this
        // 				this.reserve_detail = true
        // 				this.detail = true
        // 				if (this.ifGRS) {
        //
        // 					this.$api.post('/Unique/seek/' + id, null, r => {
        // 						this.reserveDetail = r
        // 						this.imageUrl = this.root + r.viewId
        // 						// //console.log(this.root+'/'+r.viewId)
        // 					});
        // 				} else {
        // 					this.$api.post('/Unique/seek/' + id, null, r => {
        // 						this.reserveDetail_gia = r
        // 					});
        // 				}

      },
      clickItem(row, event, column) {
        var val = row;

        if (this.transferid == val.id) {
          this.currentRow = '';
          this.transferid = 0
          var row = ''
          this.$refs.singleTable01.setCurrentRow(row);
          this.$refs.singleTable02.setCurrentRow(row);
          this.transferSearch()
        } else {
          this.currentRow = val;

          this.batchDetail.out1 = val.id;
          this.batchDetail.name = val.no_;
          this.batchDetail.outId = val.warehouseId;
          this.batchDetail.outName = val.warehouseName;
          this.batchDetail.rests = val.rests;
          this.transferid = val.id
          this.transferSearch()
        }
      },

      transferSearch() {

        if (new Date(this.dateOne_transfer).format("yyyy-MM-dd") > new Date(this.dateTwo_transfer).format("yyyy-MM-dd")) {
          this.dialogVisible02 = true
        } else {

          // 時間轉換
          var today = new Date(Date.parse(this.dateTwo_transfer));
          var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
          today.setTime(targetday_milliseconds); //注意，这行是关键代码
          var time = today.format("yyyy-MM-dd")


          this.$api.post('/transfer/seek?warehouseId=' + this.transferid, {
            "dateOne": new Date(this.dateOne_transfer).format("yyyy-MM-dd"),
            "dateTwo": time, //yyyy-MM-dd'T'HH:mm:ss.SSSZ
            "index": 0,
            "num": 10,
            "seek": this.ifGRS ? "GRS" : "GIA",
            "seekTwo": this.formInlinetwo.seekTwo
          }, r => {

            //console.log('轉移查詢')
            //console.log(r.content);
            this.tableData2 = r.content


          });
        }
      },

      transfer(id) {
        this.$router.push("/SystemManagement/transfer")
      },

      lock(id) {
        MessageBox('此操作将鎖定该信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {



          this.$api.post('/sendInlay/lockFactoryOrder?reference=' + id, null, r => {
            // //console.log(r);

            // 						this.tableData1 = r.content;
            // 						this.totalElements = r.totalPage
            this.search()
            Message({
              type: 'success',
              message: '鎖定成功!'
            });


          });



        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消鎖定 '
          });
        });
      },

      onSubmit01() {
        this.page01 = 1
        // this.currentRow = null
        // this.transferid = 0
        // this.page02 = 1
        this.search()
        // this.transferSearch()
      },
      // 模糊查询库存
      search() {

        this.loaing_table = false
        this.tableData1 = []

        if(this.type=="search"){

          this.$api.post('/factory/order/count', {
             "salesOrderItem": {
                // "salesNo":this.formInline.seek==""?null:this.formInline.seek
                "salesOrder":{
                  "salesNo": this.formInline.seek==""?null:this.formInline.seek
                }
            },
            "status": this.slelct_type == "ALL" ? null : {
              "reference": this.slelct_type,
            },
            "factory": {
              "reference":this.$route.query.uuid,
            }

          }, r => {
            console.log('-------*****')
            console.log(r);
            this.totalElements=r

          });

          this.$api.post('/factory/order/' +this.value6[0].format("yyyy-MM-dd")+'/'+this.value6[1].format("yyyy-MM-dd")+'/'+ (parseInt(this.page01) - 1) + '/10', {

            "salesOrderItem": {

                "salesOrder":{
                  "salesNo": this.formInline.seek==""?null:this.formInline.seek
                }

            },
            "status": this.slelct_type == "ALL" ? null : {
              "reference": this.slelct_type,
            },
            "factory": {
              "reference": this.$route.query.uuid,
            }

          }, r => {
            console.log('-------*****')
            console.log(r);
            this.tableData1 = r;
            this.all_loading = false
            this.loaing_table = true
          });

        }
//         else if(this.type=="salesOrder"){
//
//            this.$api.post('/factory/order/count', {
//                "salesOrderItem": {
//                   "salesNo":this.$route.query.salesNo
//               },
//
//
//             }, r => {
//               console.log('-------*****')
//               console.log(r);
//               this.totalElements=r
//
//             });
//
//             this.$api.post('/factory/order/' +this.value6[0].format("yyyy-MM-dd")+'/'+this.value6[1].format("yyyy-MM-dd")+'/'+ (parseInt(this.page01) - 1) + '/10', {
//
//               "salesOrderItem": {
//                   "salesNo":this.$route.query.salesNo
//               },
//
//
//             }, r => {
//               console.log('-------*****')
//               console.log(r);
//               this.tableData1 = r;
//               this.all_loading = false
//               this.loaing_table = true
//             });
//
//         }
        else{

           this.$api.post('/factory/order/count', {
               "salesOrderItem": {
                  "salesOrder":{
                    "salesNo": this.formInline.seek==""?null:this.formInline.seek
                  }
              },
              "status": this.slelct_type == "ALL" ? null : {
                "reference": this.slelct_type,
              },
            }, r => {
              // console.log('-------*****')
              console.log(r);
              this.totalElements=r

            });

            this.$api.post('/factory/order/' +this.value6[0].format("yyyy-MM-dd")+'/'+this.value6[1].format("yyyy-MM-dd")+'/'+ (parseInt(this.page01) - 1) + '/10', {

              "salesOrderItem": {
                  "salesOrder":{
                    "salesNo": this.formInline.seek==""?null:this.formInline.seek
                  }
              },
              "status": this.slelct_type == "ALL" ? null : {
                "reference": this.slelct_type,
              },

            }, r => {
              // console.log('-------*****')
              console.log(r);
              this.tableData1 = r;
              this.all_loading = false
              this.loaing_table = true
            });

        }

//         this.$api.get('/factory/order/' + (parseInt(this.page01) - 1) + '/10', null, r => {
//           console.log('-------*****')
//           console.log(r);
//           this.tableData1 = r;
//           this.all_loading = false
//           this.loaing_table = true
//         });
//
//         this.$api.get('/factory/order/' + (parseInt(this.page01) - 1) + '/10', null, r => {
//           console.log('-------*****')
//           console.log(r);
//           this.tableData1 = r;
//           this.all_loading = false
//           this.loaing_table = true
//         });

        // 時間轉換
        // 				var today = new Date(Date.parse(this.dateTwo));
        // 				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
        // 				today.setTime(targetday_milliseconds); //注意，这行是关键代码
        // 				var time = today.format("yyyy-MM-dd")
        //
        // 				if (this.dateTwo) {
        //
        // 					var search = this.formInline.search
        // 					var entrepotId = ''
        // 					for (var i = 0; i < this.branch_list.length; i++) {
        // 						if (this.branch == this.branch_list[i].name) {
        // 							entrepotId = this.branch_list[i].reference
        // 						}
        // 					}
        //
        //
        //
        // 					this.$api.post('/sendInlay/findAll?Page=' + this.page01 + '&Size=11', {
        // 						"eDate": this.dateTwo[1].format("yyyy-MM-dd"),
        // 						"entrepot": entrepotId,
        // 						"item": search == '' ? "" : search,
        // 						"sDate": this.dateTwo[0].format("yyyy-MM-dd")
        // 					}, r => {
        //
        // 						this.tableData1 = r.content;
        // 						this.totalElements = r.totalPage
        //
        // 					});
        // 				} else {
        // 					this.dialogVisible02 = true
        // 				}



      },

      GRS() {
        this.ifGRS = !this.ifGRS
        this.onSubmit01()
        this.transferSearch()
      },
      // 提交批次創建
      uploadBatch() {



        this.batch = false
        this.$api.post('/transfer/save', {
          "id": 0,
          "name": this.batchDetail.name,
          "numbe": parseInt(this.batchDetail.numbe),
          "out1": parseInt(this.batchDetail.out1),
          "outId": parseInt(this.batchDetail.outId),
          "outName": this.batchDetail.outName,
          "rests": this.batchDetail.rests,
          "shiftTo": 0,
          "shiftToId": parseInt(this.batchDetail.shiftToId),
          "shiftToName": this.batchDetail.shiftToName,
          "time": "",
          "uniqueId": 0,
          "uniqueType": this.ifGRS ? "GRS" : "GIA",
          "weight": parseInt(this.batchDetail.weight),
          "weightUnit": this.batchDetail.weightUnit,

        }, r => {

          //console.log(r);
          // this.tableData2 = r.content

        });

      },
      upload() {

        if (this.ifGRS) {



          this.$api.post('/Unique/save', {
            "certificateToUploadId": "",
            "codeUseSeeHelp": this.reserveDetail.codeUseSeeHelp,
            "color": this.reserveDetail.color,
            "colorTo": this.reserveDetail.colorTo,
            "comment": this.reserveDetail.comment,
            "cut": this.reserveDetail.cut,
            "cutTo": this.reserveDetail.cutTo,
            "date": this.reserveDetail.date.format("yyyy-MM-dd"),
            "dimensions": this.reserveDetail.dimensions,
            "dimensionsTo": this.reserveDetail.dimensionsTo,
            "id": 0,
            "identification": this.reserveDetail.identification,
            "no_": this.reserveDetail.no_,
            "object": this.reserveDetail.object,
            "origin": this.reserveDetail.origin,
            "productionPlace": this.reserveDetail.productionPlace,
            "rests": this.reserveDetail.rests,
            "shape": this.reserveDetail.shape,
            "viewId": this.reserveDetail.viewId,
            "warehouseName": this.warehouse[parseInt(this.formInline.num)].name,
            "warehouseId": this.warehouse[parseInt(this.formInline.num)].id,
            "weight": parseInt(this.reserveDetail.weight),
            "weightTo": this.reserveDetail.weightTo,
            "list": this.fileList
          }, r => {

            //console.log(r.content);
            this.hidedetail()
            this.onSubmit01()
          });



        } else {


          this.$api.post('/giaUnique/save', {

            "caratWeight": this.reserveDetail_gia.caratWeight,
            "clarityGrade": this.reserveDetail_gia.clarityGrade,
            "codeUseSeeHelp": this.reserveDetail_gia.codeUseSeeHelp,
            "colorGrade": this.reserveDetail_gia.colorGrade,
            "comments": this.reserveDetail_gia.comments,
            "cutGrade": this.reserveDetail_gia.cutGrade,
            "date": this.reserveDetail_gia.date.format("yyyy-MM-dd"),
            "fluerescence": this.reserveDetail_gia.fluerescence,
            "giaReportNumber": this.reserveDetail_gia.giaReportNumber,
            "id": 0,
            "inscription": this.reserveDetail_gia.inscription,
            "measurements": this.reserveDetail_gia.measurements,
            "polish": this.reserveDetail_gia.polish,
            "shapeAndCuttingStyle": this.reserveDetail_gia.shapeAndCuttingStyle,
            "symmetry": this.reserveDetail_gia.symmetry,
            "uploadsAndDownloads": "",
            "viewId": this.reserveDetail_gia.viewId,
            "warehouseName": this.warehouse[parseInt(this.formInline.num)].name,
            "warehouseId": this.warehouse[parseInt(this.formInline.num)].id,

          }, r => {

            //console.log(r);
            this.hidedetail()
            this.onSubmit01()

          });


        }



      },

      type_change() {
        this.ifGRS = this.formInline.num == '批量' ? 0 : (this.formInline.num == 'GIA' ? 1 : 2)
      },
      onSubmit() {

      },
      // 庫存翻頁
      pages01(val) {
        //console.log(val)
        this.page01 = val
        this.search()
      },
      // 批次翻頁
      pages02(val) {
        this.page02 = val
        this.search()
      },
      search_list() {
        this.page02 = 1
        this.transferSearch();
      },
      reserveList() {
        this.reserve_list = true
      },
      return_reserveList() {
        this.reserve_list = false
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        if (this.ifGRS) {

          this.reserveDetail.viewId = file.response.url
          // //console.log('----'+file.response.url)
        } else {
          this.reserveDetail_gia.viewId = file.response.url
          // //console.log('----'+file.response.url)
        }
        // //console.log(file)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      hidedetail() {
        this.reserve_detail = false
        this.detail = false
      },
      reserveAdd() {
        this.detail = false,
          this.reserve_detail = true
      },

      showBatch() {
        this.batch = true
      },
      cancel() {
        this.batch = false
      },

      hideimg() {
        this.ifimg = false
      },

      handleRemove(file, fileList) {
        this.fileList = [];
        for (var i = 0; i < fileList.length; i++) {
          this.fileList.push(fileList[i].response.url);

        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 			handleAvatarSuccess(file, fileList){
      // 				//console.log(file, fileList);
      // 				//console.log('010101')
      // 			},
      handleAdd(response, file, fileList) {
        // //console.log(response)
        this.fileList = [];
        for (var i = 0; i < fileList.length; i++) {
          this.fileList.push(fileList[i].response.url);

        }
        //console.log(fileList);

      },
      topage(type) {
        if (type == 'special') {
          this.$router.push("/SystemManagement/special")
        } else if (type == 'batch') {
          this.$router.push("/SystemManagement/batch")
        } else if (type == 'recycling') {
          this.$router.push("/SystemManagement/Recycling")
        } else if (type == 'all') {
          this.$router.push("/SystemManagement/ReserveManagement")
        }
      }


    }
  }
</script>

<style lang="scss">
  @import '../../assets/styles/variable';

  // 	.reservemanagement{
  //
  // 	}




  // 	.has-gutter {
  // 		line-height: 30px
  // 	}

  .imgList {
    margin: 15px 20px;
    float: left;
  }

  .imgs {
    width: 300px;
    height: 170px;

    img {
      width: 100%;
      height: 100%
    }
  }

  .second_menu {
    width: 115px;
    line-height: 42px;
    float: left;
    margin-left: 12px;
    font-size: 18px;
    background: rgb(238, 237, 235);
    margin-top: 8px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .selector {
    // color: $navHoverTextColor;
  }

  .inputs {
    width: 300px;
    float: left
  }

  .button {
    // width: 191px;
    height: 48px;
    font-size: 21px;
    padding: 0 10px;
    // line-height: 48px;
    // background: $navHoverTextColor;
    border: 0
  }

  .button:nth-child(2) {
    margin-left: 50px;

  }

  .point {
    cursor: pointer;
  }

  .search {
    .el-input__inner {
      height: 40px
    }

    .el-input__inner {
      height: 40px
    }

  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }



  .el-row,
  .el-col,
  // 	.el-col-24 {
  //
  // 		height: 40px
  // 	}

  .el-table {
    margin: 0;
    padding: 0;

  }

  // 	.el-table td,
  // 	.el-table th {
  // 		padding: 8px 0
  // 	}

  .list {
    // 		.el-table_2_column_14 {
    // 			color: #409EFF;
    // 			cursor: pointer
    // 		}
  }

  .list {
    border-top: 2px solid rgb(224, 224, 224);
    background: white;
    height: 385px;
    width: 100%;
    margin-top: 20px;
  }

  .reserve_list {
    height: 720px;
    width: 70%;
    background: white;
    margin-left: 5%;
    position: fixed;
    top: 200px;
    border: 2px solid rgb(224, 224, 224);
    z-index: 1000;
    overflow: auto
  }

  .el-form--inline .el-form-item {
    display: block;

  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-form-item {
    margin-bottom: 0
  }

  .textInput {
    width: 400px;
    height: 80px;
  }

  .batch_left {
    float: left;
    margin-left: 20px;
    width: 30%;
    margin-top: 30px
  }

  .el-main {
    line-height: 30px;
  }

  .reserve_list {
    .el-upload--picture-card {
      float: left;
      margin: 15px 20px
    }

    .el-upload-list__item {
      margin: 15px 20px;
      float: left
    }

  }

  .selector_form {
    .el-menu--horizontal>.el-submenu .el-submenu__title {
      height: 32px;
      line-height: 32px;
      border-bottom: 2px solid transparent;
      color: #909399;
      border-radius: 3px;
    }
  }

 .paginations {

   .el-input__inner {

     height: 30px;
     line-height: 30px
   }

 }

</style>

<template>

  <div class="reservemanagement" style="height: 800px;" v-loading='all_loading'>

    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">

            <div style="width: 300px;margin-left: 0;float: left;">

              <el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date"
                placeholder="select date" style='width: 300px;float: right;border-radius: 10px;height: 40px;line-height: 40px;'>
              </el-date-picker>

            </div>
            <div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-input v-model="formInline.search" placeholder="Item" style='float: left;margin-left: 10px;width: 200px;height: 40px;line-height: 40px;'></el-input>

                <el-button type="primary" @click="onSubmit01" style='float: left;margin-left: 10px;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>Search</el-button>
               <!-- <el-button type="primary" @click="yesterday" style='float: left;font-size: 14px;padding: 0 10px;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Yesterday</el-button>
                <el-button type="primary" @click="three" style='padding: 0 10px;font-size: 14px;text-align: center;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Last
                  three days</el-button>
                <el-button type="primary" @click="seven" style='padding: 0 10px;font-size: 14px;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Last
                  seven days</el-button> -->


                <el-button type="primary" @click="tocreate" style='float: right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>Report</el-button>



                <el-button type="primary" @click="tocreate" style='float: right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>



                <el-select style='height: 48px;width: 130px;float: right;' v-model="branch" @change="search()">
                  <el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
                </el-select>


                <!-- <el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="formInline.num" @change='type_change' >
										<el-option v-for='(item, index) in warehouse' :label="item.name" :value="item.name" ></el-option>
									</el-select>
								</el-form-item> -->

              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 庫存列表 -->
    <div style="font-size: 18px;font-weight: bold;padding-left: 20px;">Stock</div>
    <div style="border-radius: 10px;background: white;width: 100%;padding: 5px;" v-show="showType==0">
      <div>
        <div v-for="item in tableData1" style="padding: 0 5px;margin-top: 5px;display: inline-block;height: 60px;text-align: center;border: 1px solid black;margin-left: 20px;line-height: 30px;">
          <div>{{item.gem.type}}</div>
          <div>{{item.storageQuantity}}</div>
        </div>

        <!-- <el-table :data="tableData1" height="350" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>
					<el-table-column prop="identifier" label="Commodity" row-style='background:red' width="200px">
					</el-table-column>

					<el-table-column prop="availableNum" label="Available" width="200px">
					</el-table-column>

					<el-table-column >
					</el-table-column>

				</el-table> -->
      </div>

    </div>



    <!-- 批次 -->
    <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Purchase</div>
    <div style="border-radius: 10px;background: white;height: 385px;width: 100%;" v-show="showType==0">
      <div>

        <el-table :data="tableData02" height="520"  ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;min-width: 900px;'
          :default-sort="{prop: 'cost', order: 'descending'}">

          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>

          <!-- <el-table-column type="index" row-style='background:red'>
					</el-table-column> -->

          <el-table-column prop="id" label="Id" width="80px" style="color: red;" >
          </el-table-column>

          <!-- <el-table-column type="index" width="80px" :index="indexMethod">
          </el-table-column> -->

          <el-table-column prop="gem.type" label="Item" row-style='background:red'>
          </el-table-column>
          <el-table-column prop="weight" label="Weight">
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{scope.row.totalWeight}}</span>
              <span type="text" size="small" style="">{{scope.row.weightUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalQuantity" label="Purchase">
            <!-- 入庫 -->
          </el-table-column>
          <el-table-column prop="cost" label="Cost" sortable>
          </el-table-column>

          <!-- <el-table-column prop="cost" label="Category">
          </el-table-column> -->

          <el-table-column prop="invoice.invoiceNo" label="Invoice No">
            <template slot-scope="scope">
              <span @click="to_invoice(scope.row.invoice.invoiceNo)" type="text" size="small" style="text-decoration: underline;cursor: pointer;">{{scope.row.invoice.invoiceNo}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="certificateNo" label="certificateNo">
					</el-table-column> -->

          <el-table-column prop="member.identifier" label="Principal">
          </el-table-column>

          <el-table-column prop="invoiceNo" label="Invoice Date">
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{new Date(scope.row.invoice.invoiceDate).format("yyyy-MMM-dd")}}</span>
            </template>
          </el-table-column>

          <div class="action">
            <el-table-column fixed="right" label="Action" style='background: red;' align='center' width="100px">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">
                  <!-- <el-button @click="handleClick(scope.row.reference)" type="danger" size="small">Detail</el-button> -->
                  <el-button @click="Modify(scope.row.reference)" type="danger" size="small">Modify</el-button>
                  <!-- <el-button @click="transfer(scope.row.reference)" type="danger" size="small">Transfer</el-button> -->
                </div>
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
      <div class="block" style="float: right;margin-top: 5px;">
        <el-pagination layout="prev, pager, next" :page-size='8' :total="totalElements" @current-change='pages01'
          :current-page="page01">
        </el-pagination>
      </div>

      <div style="float: right;margin-right: 20px;" class="paginations">
        <el-select v-model="select_date" placeholder="select" style="float: left;width: 100px;font-size: 12px;height: 30px;margin-top: 5px;"
          @change="change_date()">
          <el-option label="Today" value="Today"></el-option>
          <el-option label="3 Days" value="3 Days"></el-option>
          <el-option label="7 Days" value="7 Days"></el-option>
          <!-- <el-option label="All" value="all"></el-option> -->
        </el-select>
      </div>

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
  export default {
    name: "ReserveManagement",
    data() {
      return {

        select_date:'Today',
        all_loading: false,
        showType: 0,
        // fileList:[],
        // root: 'http://192.168.2.176:8080/RESTful/',
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        labelPosition: 'right',
        branch: '分行一',
        branch_list: [],
        // branchId:'',
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
        loaing_table: false,
        reserve_list: false,
        reserve_detail: false,
        ifGRS: 0,

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
        tableData02: []

      }
    },
    created: function() {

      var today = new Date();
      var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      this.dateOne = today.format("yyyy-MM-dd")
      this.dateOne_transfer = today.format("yyyy-MM-dd")


      // this.transferSearch()
      this.dateTwo.push(today)
      // this.dateTwo.push(new Date())
      this.dateTwo.push(new Date())
      this.findAllEntrepot()

      // this.search()

      // this.dateTwo=[dateOne,new Date()]
      // //console.log('---root:'+this.root)



//       this.$api.post('/inventory/gem/certified/0/10', {
//         "certificateNo": null,
//
//       }, r => {
//         console.log(r)
//       });

    },
    methods: {
      // 分行數據初始化
      // findAllEntrepot() {
      // 	this.$api.get('/inventory/findAllEntrepot', null, r => {
      // 		this.branch_list = r.content,
      // 			this.branch = r.content[0].name
      // 		this.search()
      // 	});
      // },

      to_invoice(search_invoice){

        this.$router.push("/DailyExpenditureinvoiceManagement?search_invoice=" + search_invoice)

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
        this.dateTwo=[]
        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 0;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")

        this.dateTwo.push(today)
        this.dateTwo.push(today)

        // this.dateTwo.push(new Date())
        this.onSubmit01()
      },
      three(){
        this.dateTwo=[]

        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 2;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var today01 = new Date();
        var targetday_milliseconds01 = today01.getTime() - 1000 * 60 * 60 * 24 * 0;
        today01.setTime(targetday_milliseconds01); //注意，这行是关键代码



        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.dateTwo.push(today)
        this.dateTwo.push(today01)

        console.log(this.dateTwo)
        // this.dateTwo.push(new Date())
        this.onSubmit01()
      },
      seven(){
        this.dateTwo=[]
         var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 6;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码

        var todays = new Date();
        var targetday_millisecondsa = todays.getTime() - 1000 * 60 * 60 * 24 * 0;
        todays.setTime(targetday_millisecondsa);

        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.dateTwo.push(today)
        this.dateTwo.push(todays)

        // this.dateTwo.push(new Date())
        this.onSubmit01()
      },


      indexMethod(index) {
        return ((parseInt(this.page01) - 1) * 10 + index + 1);
      },

      findAllEntrepot() {

        this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {

          console.log('-------------')
          console.log(r)
          this.branch_list = r.content
          this.branch = r.content[0].name
          this.search()

        });



        // this.$api.get('/factory', null, r => {
        //
        // 	console.log(r)
        //
        // 	this.branch_list = r,
        // 	this.branch = r[0].name
        // 	this.search()
        // });

        // this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
        //
        // 	console.log(r)
        //
        // 	this.branch_list = r.content,
        // 		this.branch = r.content[0].name
        // 		// this.branchId== r.content[0].reference
        // 	this.search()
        // });
      },

      changeType(val) {
        this.showType = val
        this.search()
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
        this.$router.push("/newpurchase?type=new")
      },

      handleClick(id) {

        this.$router.push("/newpurchase?type=detail&id=" + id)

      },

      Modify(id) {

        this.$router.push("/newpurchase?type=alter&id=" + id)

      },

      clickItem(row, event, column) {
        var val = row;
        // //console.log('item')
        // //console.log(val)
        if (this.transferid == val.id) {
          this.currentRow = '';
          this.transferid = 0
          var row = ''
          this.$refs.singleTable01.setCurrentRow(row);
          this.$refs.singleTable02.setCurrentRow(row);
          // //console.log('0000000000000000000000000000000000000000000000')
          this.transferSearch()
        } else {
          this.currentRow = val;
          // //console.log(val);
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
            // //console.log('轉移查詢')
            //console.log(r.content);
            this.tableData2 = r.content
          });
        }
      },

      transfer(id) {
        this.$router.push("/transfer?reference=" + id)
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

        this.tableData1 = [];
        this.loaing_table = false
        var entrepotId = ''

        for (var i = 0; i < this.branch_list.length; i++) {
          if (this.branch == this.branch_list[i].name) {
            entrepotId = this.branch_list[i].reference
          }
        }






        this.$api.get('/inventory/summary/' + entrepotId, null, r => {

          console.log('/***********/')
          console.log(r)

          this.tableData1 = r;
          this.loaing_table = true

        });

        // if(this.showType==0){
        // this.$api.post('/inventory/findTotalNum?branchRef='+entrepotId, null, r => {
        // this.tableData1 = r;
        // });
        // }else{

        // 日期搜索版
        // var today = new Date(Date.parse(this.dateTwo));
        // var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
        // today.setTime(targetday_milliseconds);
        // var time = today.format("yyyy-MM-dd")
        //
        // if (this.dateTwo) {
        // 	var search = this.formInline.search
        // 	var entrepotId = ''
        // 	for (var i = 0; i < this.branch_list.length; i++) {
        // 		if (this.branch == this.branch_list[i].name) {
        // 			entrepotId = this.branch_list[i].reference
        // 		}
        // 	}
        // 	this.$api.post('/inventory/findAll?Page=' + this.page01 + '&Size=5', {
        // 		"eDate": this.dateTwo[1].format("yyyy-MM-dd"),
        // 		"entrepot": entrepotId,
        // 		"item": search == '' ? "" : search,
        // 		"sDate": this.dateTwo[0].format("yyyy-MM-dd")
        // 	}, r => {
        //
        // 		this.tableData02 = r.content;
        // 		this.totalElements = r.totalPage
        //
        // 	});
        // } else {
        // 	this.dialogVisible02 = true
        // }

        var today = new Date(Date.parse(this.dateTwo));
        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * 1;
        today.setTime(targetday_milliseconds);
        var time = today.format("yyyy-MM-dd")

        if (this.dateTwo) {
          var search = this.formInline.search
          var entrepotId = ''
          for (var i = 0; i < this.branch_list.length; i++) {
            if (this.branch == this.branch_list[i].name) {
              entrepotId = this.branch_list[i].reference
            }
          }

          this.$api.post('/inventory/count',
          {
            "branch": this.branch,
            "eDate": this.dateTwo[1].format("yyyy-MM-dd"),
            "item": "",
            "sDate": this.dateTwo[0].format("yyyy-MM-dd")
          }
          , r => {


            console.log('*----*')
            console.log(r)
            this.totalElements = r


          });



          this.$api.post('/inventory/'+this.dateTwo[0].format("yyyy-MM-dd")+'/'+this.dateTwo[1].format("yyyy-MM-dd")+'/' + (this.page01-1) + '/8', {
            // "eDate": this.dateTwo[1].format("yyyy-MM-dd"),
            // "branch": entrepotId,
            // "item": search == '' ? "" : search,
            // "sDate": this.dateTwo[0].format("yyyy-MM-dd")

            gem:this.formInline.search==""?null:{
              type:this.formInline.search
            },

            // "item":this.formInline.search==""?null:this.formInline.search,
            "branch": {
              "reference": entrepotId
            }

          }, r => {

            console.log('-+-+-+')
            console.log(r)

            this.tableData02 = r;
            // this.totalElements = r.totalItem

            this.all_loading = false

          });

        } else {
          this.dialogVisible02 = true
        }

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
        this.all_loading = true
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
      // 			showimg() {
      //
      // 				this.ifimg = true
      // 				if (this.detail) {
      // 					// /Uploads/SeekUploadFile/{uuid}
      //
      // 					this.$api.get('/Uploads/SeekUploadFile/' + this.reserveDetail.certificateToUploadId, null, r => {
      //
      // 						//console.log('-------' + r.length)
      // 						//console.log(r);
      // 						this.fileList = r
      // 						for (var i = 0; i < r.length; i++) {
      // 							this.fileList[i].url = this.root + this.fileList[i].url
      // 						}
      //
      // 						// this.tableData2 = r.content
      //
      // 					});
      //
      // 				} else {
      //
      // 				}
      //
      // 			},
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
    text-align: center
  }

  .selector {
    color: rgb(5, 120, 209);
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

  .paginations {

    .el-input__inner {

      height: 30px;
      line-height: 30px
    }

  }
</style>

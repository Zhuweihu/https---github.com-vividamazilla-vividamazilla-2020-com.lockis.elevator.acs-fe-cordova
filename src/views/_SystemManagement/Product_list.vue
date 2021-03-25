<template>

  <div class="Product_list" style="height: 800px;" v-loading='all_loading'>

    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">

            <!-- <div  style="width: 300px;margin-left: 0;float: left;" >

							<el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date" placeholder="select date"
							 style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>

						</div> -->
            <div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="formInline.search" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>
                <el-form-item style='float:left;height: 40px;'>
                  <el-button type="primary" @click="onSubmit01" style='height:40px;border:0;background: rgb(5,120,209);padding: 0 10px;'>Search</el-button>
                </el-form-item>
                <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;float: left;line-height: 40px;">Product
                  Type</div> -->
                <el-form-item style='float:right;'>
                  <el-button type="primary" @click="tocreate" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
                </el-form-item>

                <el-form-item style='float: right;'>
                  <el-select @change="search()" v-model="category" placeholder="Select Category">
                    <el-option v-for="item in category_list" :label="item.name" :value="item.reference"></el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="branch" @change="search()">
										<el-option v-for='(item, index) in branch_list' :label="item.name" :value="item.name"></el-option>
									</el-select>
								</el-form-item> -->

                <!-- <el-form-item style='float:right;' class='search'>
									<el-select style='height: 48px;width: 130px;' v-model="types_name" @change='type_change' >
										<el-option v-for='(item, index) in types' :label="item.name" :value="item.name" ></el-option>
									</el-select>
								</el-form-item> -->

              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>



    <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;">Stock</div>
    <div style="border-radius: 10px;background: white;width: 100%;padding: 5px;">
      <div>
        <div v-for="item in tableData1" style="padding: 0 5px;margin-top: 5px;display: inline-block;height: 60px;text-align: center;border: 1px solid black;margin-left: 20px;line-height: 30px;">
          <div>{{item.gem.type}}</div>
          <div>{{item.storageQuantity}}</div>
        </div>

      </div>

    </div> -->



    <!-- 批次 -->
    <!-- <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Product Type</div> -->
    <div style="border-radius: 10px;background: white;width: 100%;">
      <div>

        <el-table :data="tableData02"  ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;min-width: 1148px;'
          :default-sort="{prop: 'unit_price', order: 'descending'}">

          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>


          <el-table-column prop="id" label="Id" width="80px" >
          </el-table-column>


          <!-- <el-table-column type="index" width="80px" :index="indexMethod">
          </el-table-column> -->


          <!-- <el-table-column  type="index"  row-style='background:red'  >
					</el-table-column> -->
          <!-- <el-table-column prop="jewelryType.type" label="pictury" row-style='background:red'>
					</el-table-column> -->
          <el-table-column prop="weight" label="Picture">
            <template slot-scope="scope">
              <!-- <span type="text" size="small" style="">{{scope.row.totalWeight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightUnit}}</span> -->
              <img style="max-height:80px; max-width:200px" :src="root+'/kernal/asset/'+scope.row.photo.reference" />
            </template>
          </el-table-column>


          <el-table-column prop="name" label="Name">
          </el-table-column>

          <el-table-column prop="quantity" label="Quantity">
          </el-table-column>

          <el-table-column prop="unit_price" label="Unit Price" sortable>
          </el-table-column>

          <el-table-column prop="category.name" label="Category">
            <template slot-scope="scope">

              <span  type="text" size="small" >{{scope.row.category.name}}</span>
            	<!-- <span @click="to_category()" type="text" size="small" style="text-decoration: underline;">{{scope.row.category.name}}</span> -->
            </template>
          </el-table-column>

          <el-table-column prop="codeDesign" label="Design Code">
          </el-table-column>
          <el-table-column prop="codePro" label="Product Code">
          </el-table-column>

          <!-- <el-table-column prop="status" label="Status" sortable>
            <template slot-scope="scope">
              <el-button style='color: #606266;font-size: 14px;text-decoration: underline;' @click="Processing(scope.row.reference)"
                type="text" size="small" data-id='0101'>{{scope.row.status==null?'Click to Change':('('+scope.row.status.text+')->('+'sales'+')')}}</el-button>
            </template>
          </el-table-column> -->

          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' style='background: red;' width="300px">
              <template slot-scope="scope">
                <div style="white-space: nowrap;">

                  <!-- <input id="btnSample1" type="button" value="Label Print(Single)" onclick='sampleSinglePrint()' /> -->
                  <el-button @click='sampleSinglePrint(scope.row.codePro)' type="danger" size="small">Bar Code</el-button>
                  <!-- <el-button @click='invoice_list(scope.row.reference)'  type="danger" size="small" >Invoice</el-button> -->
                  <el-button @click="handleClick(scope.row.reference,scope.row.image,scope.row.name)" type="danger"
                    size="small">Modify</el-button>
                  <el-button @click="deletes(scope.row.reference)" type="danger" size="small">Delete</el-button>

                </div>
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
      <div class="block" style="float: right;margin-top: 5px;">
        <el-pagination layout="prev, pager, next" :page-size='6' :total="totalElements" @current-change='pages01'
          :current-page="page01">
        </el-pagination>
      </div>
    </div>


    <!-- 賬號密碼錯誤彈窗 -->
    <div class="dialog">
      <el-dialog title="Tips" :visible.sync="dialogVisible02" width="30%" top='20%'>
        <span>Really delete it?</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="comfir()">Yes</el-button>
          <el-button type="primary" @click="dialogVisible02 = false">Cancel</el-button>
        </span>
      </el-dialog>
    </div>


    <div class="tishi">
      <el-dialog title="" :visible.sync="dialogVisible_state" width="30%" :before-close="handleClose_state" top='20%'>
        <span>Status change:&nbsp;</span>

        <!-- <el-select v-model="options" placeholder="Select" style="border-radius: 8px;height: 20px;width: 150px;text-align: center;">
    			<el-option label="已起貨" value="已起貨"></el-option>
    			<el-option label="起貨期" value="起貨期"></el-option>
    		</el-select> -->

        <el-select v-model="options" filterable placeholder="Select">
          <el-option v-for="item in options_list" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <!-- <el-autocomplete class="mat20 inputs01" v-model="options" :fetch-suggestions="querySearch_options"
    		 placeholder="Input" @select="handleSelect_options" style="border-radius: 8px;height: 20px;width: 200px;text-align: center;"></el-autocomplete> -->

        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_state()">NO</el-button>
          <el-button type="primary" @click="confirm_state()">YES</el-button>
        </span>
      </el-dialog>
    </div>


  </div>

</template>

<!-- <script type="text/javascript" src="../../../assets/plugins/cxmlp-label-api.js"></script> -->

<script>
  // import "./././assets/plugins/cxmlp-label-api.js"





  export default {
    name: "ReserveManagement",
    data() {
      return {
        tableData1: [],
        options_list: [],
        category: 'All',
        category_list: [{
          name: 'All',
          reference: 'All'
        }],
        all_loading: false,
        dialogVisible02: false,
        dialogVisible02_reference: '',
        loaing_table: false,
        tableData1_gia: [],
        tableData02: [],
        types: [{
            name: 'ALL'
          },
          {
            name: 'Non-Consign'
          },
          {
            name: 'Consign'
          }
        ],
        types_name: 'ALL',

        root: '',
        formInline: {
          "search": ''
        },
        page01: 1,
        totalElements: 0,
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },

        dialogVisible_state: false,
        stateid: '',
        options: ''


      }
    },
    created: function() {
      this.root = this.$api.root
      this.$api.get('/product/category', null, r => {
        console.log('/product/category')
        console.log(r)
        for (let i = 0; i < r.length; i++) {
          this.category_list.push(r[i])
        }
        // this.category_list = r
      });
      // BarCode.test
      this.search()
      this.$api.get('/miscellaneous/orderstatus/sales', null, r => {
        for (let i = 0; i < r.length; i++) {
          this.options_list.push({
            value: r[i].reference,
            label: r[i].text
          })
        }
        // for (let i = 0; i < r.length; i++) {
        //   this.type_list.push({
        //     value: r[i].reference,
        //     label: r[i].text
        //   })
        // }
        console.log(r)
      });
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


      invoice_list(uuid) {
        this.$router.push("/product_invoice_list?invoice_list=" + uuid)
      },

      sampleSinglePrint(codePro) {
        var design = new citizen.LabelDesign();
        design.drawCircle(50, 50, 15);
        design.drawRect(20, 30, 180, 280, 10);
        var print = new citizen.LabelPrint();
        print.OnReceive = function(res, xml) {
          alert(res.ResponseCode);
          // console.log('true')
        };
        print.OnError = function(res) {
          alert(res.status);
          // console.log('error')
        };
        // print.messageID('12345678');
        print.messageID(codePro);
        console.log(design)
        console.log(print)
        print.print('http://192.168.129.178:8080', design, 1);
        // console.log('789')
      },

      indexMethod(index) {
        return ((parseInt(this.page01) - 1) * 10 + index + 1);
      },

      confirm_state(id) {
        this.dialogVisible_state = false
        var format = {}
        // 	this.$api.get('/sales/'+this.stateid, format, r => {
        // 		format=r
        // 		if(format.customer1!=null){
        // 			console.log('01')
        // 			format.customer1.reference=format.customer1.reference
        // 		}else{
        // 			format.customer1=null
        // 		}
        //
        // 		if(format.customer2!=null){
        // 			console.log('02')
        // 			format.customer2.reference=format.customer2.reference
        // 		}else{
        // 			format.customer2=null
        // 		}
        //
        // 		format.status={reference:this.options}
        //
        // 		console.log('+++++++')
        // 		console.log(format)
        //
        // 		if(format.dateBig==''||format.dateBig==null){
        //
        // 		}else{
        // 			format.dateBig=new Date(format.dateBig).format('yyyy-MM-dd')
        // 		}
        //
        // 		if(format.dateBuying==''||format.dateBuying==null){
        //
        // 		}else{
        // 			format.dateBuying=new Date(format.dateBuying).format('yyyy-MM-dd')
        // 		}
        //
        // 		if(format.dateCollection==''||format.dateCollection==null){
        //
        // 		}else{
        // 			format.dateCollection=new Date(format.dateCollection).format('yyyy-MM-dd')
        // 		}
        //
        // 		if(format.dateDeliveried==''||format.dateDeliveried==null){
        //
        // 		}else{
        // 			format.dateDeliveried=new Date(format.dateDeliveried).format('yyyy-MM-dd')
        // 		}
        //
        // 		if(format.payment1Date==''||format.payment1Date==null){
        //
        // 		}else{
        // 			format.payment1Date=new Date(format.payment1Date).format('yyyy-MM-dd')
        // 		}
        //
        // 		if(format.payment2Date==''||format.payment2Date==null){
        //
        // 		}else{
        // 			format.payment2Date=new Date(format.payment2Date).format('yyyy-MM-dd')
        // 		}
        //
        // 		this.$api.post('/sales/save', format, r => {
        // 			console.log(r)
        // 			this.search()
        // 		})
        //
        // 	})

      },



      cancel_state() {
        this.dialogVisible_state = false
      },

      handleClose_state(done) {
        this.dialogVisible_state = false
      },

      Processing(id) {
        this.dialogVisible_state = true
        this.stateid = id
        // this.options = name
        // console.log('----'+id)
      },

      deletes(reference) {
        this.dialogVisible02 = true
        this.dialogVisible02_reference = reference
        // console.log('點擊了')
      },

      comfir() {
        this.$api.delete('/product/' + this.dialogVisible02_reference + '/purge', null, r => {
          // this.branch_list = r.content,
          // 	this.branch = r.content[0].name
          this.page01 = 1
          this.search()
          this.$api.get('/product/count', null, r => {
            this.totalElements = r
            this.dialogVisible02 = false
          });
        });
      },

      findAllEntrepot() {
        this.$api.post('/Branch/findAll?Page=1&Size=999', null, r => {
          console.log(r)
          this.branch_list = r.content,
            this.branch = r.content[0].name
          // this.branchId== r.content[0].reference
          // this.search()
        });
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
        this.$router.push("/productSave?type=new")
      },

      handleClick(id, img, name) {
        // //console.log('-----' + id)
        this.$router.push("/productSave?type=alter&id=" + id)
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
        // var entrepotId = ''
        // for (var i = 0; i < this.branch_list.length; i++) {
        // 	if (this.branch == this.branch_list[i].name) {
        // 		entrepotId = this.branch_list[i].reference
        // 	}
        // }
        this.loaing_table = false
        this.tableData02 = []
        if (this.types_name == 'ALL') {

          this.$api.post('/product/count', {
            "name": this.formInline.search == "" ? null : this.formInline.search,
            "category": this.category == "All" ? null : {
              "reference": this.category
            },
          }, r => {
            this.totalElements = r
          });

          this.$api.post('/product/' + '1970-01-01' + '/' + new Date().format("yyyy-MM-dd") + '/' + (this.page01 - 1) +
            '/6', {
              "name": this.formInline.search == "" ? null : this.formInline.search,
              "category": this.category == "All" ? null : {
                "reference": this.category
              },
            }, r => {
              console.log(r)
              this.tableData02 = r
              this.loaing_table = true
            });

        }
        //          else if (this.types_name == 'non-consign') {
        //
        //           this.$api.get('/product/non-consign/count', null, r => {
        //
        //             this.totalElements = r
        //
        //
        //           });
        //           this.$api.get('/product/non-consign/' + (this.page01 - 1) + '/6', null, r => {
        //             console.log(r)
        //             this.tableData02 = r
        //             this.loaing_table = true
        //           });
        //
        //         } else if (this.types_name == 'consign') {
        //
        //           this.$api.get('/product/consign/count', null, r => {
        //
        //             this.totalElements = r
        //
        //           });
        //           this.$api.get('/product/consign/' + (this.page01 - 1) + '/6', null, r => {
        //             console.log(r)
        //             this.tableData02 = r
        //             this.loaing_table = true
        //           });
        //
        //         }
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

        this.search()

      },
      onSubmit() {

      },
      // 庫存翻頁
      pages01(val) {
        this.all_loading = false
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
    padding: 0 10px;
    height: 48px;
    font-size: 21px;
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
</style>

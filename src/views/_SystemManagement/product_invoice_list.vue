<template>

  <div class="reservemanagement">




    <div style="padding: 0 0;min-width: 900px;">
      <el-row>

        <!-- <el-col :span="24" style='line-height: 40px;'>
					<div style="color: green;width: 300px;font-size: 18px;float: left;"><span style="color: rgb(127,139,132);">statistic&nbsp;&nbsp;&nbsp;&nbsp;USA
							Dollar:</span><span style="margin-left: 5px;color: rgb(245,108,108);font-weight: bold;">{{meiyuan.dollars}}</span>
					</div>
					<div style="color: green;width: 200px;font-size: 18px;float: left;"><span style="color: rgb(127,139,132);">HK
							dollar:</span> <span style="margin-left: 5px;color: rgb(245,108,108);font-weight: bold;">{{gangbi.hk}}</span></div>
					<div style="color: green;width: 200px;font-size: 18px;float: left;"><span style="color: rgb(127,139,132);">RMB:</span>
						<span style="margin-left: 5px;color: rgb(245,108,108);font-weight: bold;">{{renmingbi.rmb}}</span></div>
				</el-col> -->

        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">

            <!-- <div style="width: 300px;margin-left: 0;float: left;">
							<el-date-picker v-model="value6" type="daterange" start-placeholder="start date" end-placeholder="end date"
							 placeholder="select date" style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
						</div> -->
            <div>
              <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
							 <el-input v-model="formInline.seek" placeholder="Invoice No" style='font-size: 14px;float: left;margin-left: 10px;width: 200px;height: 40px;line-height: 40px;'></el-input>
							<el-button type="primary" @click="onSubmit" style='margin-left: 10px;float: left;font-size: 14px;padding: 0 10px;height:40px;border:0;background: rgb(5,120,209);'>Search</el-button>
							<el-button type="primary" @click="yesterday" style='font-size: 14px;padding: 0 10px;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Yesterday</el-button>
							<el-button type="primary" @click="three" style='padding: 0 10px;font-size: 14px;text-align: center;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Last
							  three days</el-button>
							<el-button type="primary" @click="seven" style='padding: 0 10px;font-size: 14px;float: left;margin-left: 10px;height:40px;border:0;background: rgb(5,120,209);'>Last
							  seven days</el-button> -->


              <!-- <el-button type="primary" @click="usercreate" style='float: right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>Report</el-button> -->



              <el-button type="primary" @click="usercreate" style='float:right;height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>


              </el-form>
            </div>
          </div>
        </el-col>



      </el-row>
    </div>


    <!-- 庫存列表 -->
    <div style="font-size: 18px;font-weight: bold;padding-left: 20px;">Product Invoice</div>
    <div style="border-radius: 10px;background: white;height: 675px;width: 100%;">
      <div>
        <!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
        <!-- highlight-current-row -->
        <el-table :data="tableData" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>


          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>

          <el-table-column type="index" width="80px" :index="indexMethod">
          </el-table-column>

          <el-table-column prop="invoiceNo" label="Invoice No" row-style='background:red'>
          </el-table-column>

          <el-table-column prop="invoiceDate" label="Invoice Date">
            <!-- 可用 -->
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{new Date(scope.row.invoiceDate).format("yyyy-MMM-dd")}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="item" label="Item" row-style='background:red'>
          </el-table-column>


          <!-- <el-table-column prop="rapPrice" label="实收金额" row-style='background:red'>
					</el-table-column> -->

          <el-table-column prop="amount" label="Amount">
            <template slot-scope="scope">
              <span type="text" size="small" style="">{{scope.row.amount}}{{scope.row.currency}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="currency" label="Currency">
					</el-table-column> -->

          <!-- <el-table-column prop="totalNumbe" label="Total">
					</el-table-column> -->

          <!-- <el-table-column prop="in_num" label="入貨量">
					</el-table-column>
					<el-table-column prop="storage" label="儲存量">
						<template slot-scope="scope">
							<span type="text" size="small" style="">{{scope.row.weight}}</span>
							<span type="text" size="small" style="">{{scope.row.weightTo}}</span>
						</template>
					</el-table-column> -->



          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' style='background: red;' width='200px'>
              <template slot-scope="scope">
                <div style="white-space: nowrap;" class="selector_form">
                  <!-- <el-button style='float: left;' type="danger" size="small" @click='details(scope.row.reference)'>Detail</el-button> -->
                  <el-button style='float: left;margin-left: 10px;' type="danger" size="small" @click='modify(scope.row.reference)'>Modify</el-button>
                  <el-button style='float: left;margin-left: 10px;' type="danger" size="small" @click='detele(scope.row.reference)'>Detele</el-button>
                  <!-- <el-menu-item v-if='scope.row.onLock==0' index="2-3" @click="detele(scope.row.reference)">Detele</el-menu-item> -->
                  <!-- <el-menu-item v-if='scope.row.onLock==0' index="2-2" @click="modify(scope.row.reference)">Alter</el-menu-item> -->


                  <!-- <el-menu style='background:rgb(245,108,108);margin-left: 10px;float: left;width: 80px;padding: 0;height: 32px;border-radius: 3px;'
									 class="el-menu-demo" mode="horizontal" background-color="rgb(245,108,108)" text-color="#fff"
									 active-text-color="#fff">

										<el-submenu index="1">
											<template slot="title" style="line-height: 32px;height: 32px;line-height: 32px;border-bottom: 2px solid transparent;color: #909399;border-radius: 3px;">功能</template>
											<el-menu-item v-if='scope.row.onLock==0' index="2-1" @click="lock(scope.row.reference)">Lock</el-menu-item>
											<el-menu-item v-if='scope.row.onLock==1' index="2-1" style='color: #8C939D;'>Lock</el-menu-item>
											<el-menu-item v-if='scope.row.onLock==0' index="2-2" @click="modify(scope.row.reference)">Alter</el-menu-item>
											<el-menu-item v-if='scope.row.onLock==1' index="2-2" style='color: #8C939D;'>Alter</el-menu-item>
											<el-menu-item v-if='scope.row.onLock==0' index="2-3" @click="detele(scope.row.reference)">Detele</el-menu-item>
											<el-menu-item v-if='scope.row.onLock==1' index="2-3" style='color: #8C939D;'>Detele</el-menu-item>

										</el-submenu>

									</el-menu> -->

                  <!-- <el-button v-if='scope.row.onLock==0' @click="lock(scope.row.reference)" type="danger" size="small">Lock</el-button>
									<el-button v-if='scope.row.onLock==1' type="info" size="small" style='background-color: gray;'>Lock</el-button>
									<el-button v-if='scope.row.onLock==0' @click="modify(scope.row.reference)" type="danger" size="small">Alter</el-button>
									<el-button v-if='scope.row.onLock==1' type="info" size="small" style='background-color: gray;'>Alter</el-button>
									<el-button v-if='scope.row.onLock==0' @click="detele(scope.row.reference)" type="danger" size="small">Detele</el-button>
									<el-button v-if='scope.row.onLock==1' type="info" size="small" style='background-color: gray;'>Detele</el-button> -->




                  <!-- <el-button type="danger" size="small" @click='modify(scope.row.reference)'>Alter</el-button>
								<el-button type="danger" size="small" @click='detele(scope.row.reference)'>Detele</el-button> -->
                </div>
                <!-- <el-button @click="handleClick(scope.row.id)" type="danger" size="small">Detail</el-button> -->
                <!-- <el-button @click="transfer(scope.row.id)" type="text" size="small">轉移</el-button> -->
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>
     <!-- <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages02'
          :current-page="page01">
        </el-pagination>
      </div> -->
    </div>



    <!-- 賬號密碼錯誤彈窗 -->
    <div class="tishi">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to delete it?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_detele()">Cancel</el-button>
          <el-button type="primary" @click="confirm_detele()">OK</el-button>
        </span>
      </el-dialog>
    </div>


    <div class="tishi">
      <el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to lock it?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="suoding_quxiao()">Cancel</el-button>
          <el-button type="primary" @click="suoding_queren()">OK</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  export default {
    name: "UserManagement",
    data() {
      return {

        invoice_list: '',
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        dialogVisible: false,
        dialogVisibles: false,
        loaing_table: false,
        value1: "",
        test: '010101',
        value6: [],
        formInline: {
          search: '',
          seek: '',
          num: '6'
        },
        sum: 10,
        totalElements: 0,
        page01: 1,
        tableData: [],
        gangbi: {
          hk: '0'
        },
        renmingbi: {
          rmb: '0'
        },
        meiyuan: {
          dollars: '0'
        },

      }

    },

    created: function() {

      this.invoice_list = this.$route.query.invoice_list
      var today = new Date();
      var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 30;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      this.dateOne = today.format("yyyy-MM-dd")
      this.dateOne_transfer = today.format("yyyy-MM-dd")


      // this.transferSearch()
      // this.value6.push(today)
      this.value6.push(new Date())
      this.value6.push(new Date())

      // 			this.value6.push(new Date(2019, 1, 1))
      // 			this.value6.push(new Date(2020, 11, 1))
      this.search()

    },

    methods: {

      yesterday() {
        this.value6 = []
        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 1;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(new Date())
        this.onSubmit()
      },
      three() {
        this.value6 = []
        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 3;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(new Date())
        this.onSubmit()
      },
      seven() {
        this.value6 = []
        var today = new Date();
        var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * 7;
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        this.dateOne = today.format("yyyy-MM-dd")
        this.dateOne_transfer = today.format("yyyy-MM-dd")
        this.value6.push(today)
        this.value6.push(new Date())
        this.onSubmit()
      },

      indexMethod(index) {
        return ((parseInt(this.page01) - 1) * 10 + index + 1);
      },

      handleClose(done) {
        this.dialogVisible = false
      },

      handleClose(done) {
        this.dialogVisibles = false
      },

      // 			onSubmit() {
      // 				this.search()
      // 			},
      search() {

        this.loaing_table = false
        this.tableData = []

        this.$api.get('/product/'+this.invoice_list+'/invoice/0/100000', null, r => {
            this.tableData = r
            this.loaing_table = true
          });

      },


      // 批次翻頁
      pages02(val) {
        // //console.log(val)
        this.page01 = val
        this.search()
      },

      onSubmit() {
        this.page01 = 1
        this.search()
      },

      // 刪除
      detele(uuid) {
        this.dialogVisible = true
        this.statusid = uuid
      },
      cancel_detele() {
        this.dialogVisible = false
      },

      confirm_detele() {
        this.dialogVisible = false

        this.$api.delete('/product/' + this.invoice_list + '/invoice/purge/', {
          "invoice": {
            "reference": this.statusid
          },
          "reference": this.invoice_list
        }, r => {
          //console.log('****************************')
          this.search();
        });



      },

      // 鎖定
      lock(id) {
        this.dialogVisibles = true
        this.statusid = id
      },
      suoding_queren() {
        this.dialogVisibles = false
        this.$api.get('/PlvRInvoiceEndpoint/onLock/' + this.statusid, null, r => {
          // console.log(r);
          this.search()
        });
      },
      suoding_quxiao() {
        this.dialogVisibles = false
      },


      usercreate() {
        this.$router.push("/product_invoice?type=new&invoice_list=" + this.invoice_list)
      },

      details(uuid) {
        this.$router.push("/product_invoice?type=detail&uuid=" + uuid + "&invoice_list=" + this.invoice_list)
      },

      modify(uuid) {
        this.$router.push("/product_invoice?type=alert&uuid=" + uuid + "&invoice_list=" + this.invoice_list)
      },

      topage(type) {
        if (type == 'grounp') {
          this.$router.push("/Function/PayCostManagement")
        } else if (type == 'branch') {
          this.$router.push("/Function/Quittance")
        }
      }


    }
  }
</script>

<style lang="scss">
  @import '../../assets/styles/variable';

  .usermanagement {

    .tishi {
      line-height: 0;
    }

    .block {
      line-height: 0;

      .el-main {
        line-height: 0
      }
    }

    .el-table--enable-row-transition {
      // height: 500px;
      overflow: auto;
      border-bottom: 0px solid white
    }

    .el-table_1_column_9,
    .is-leaf {
      line-height: 50px;
      padding: 0
    }

    .second_menu {
      width: 100px;
      line-height: 60px;
      float: left;
      margin-left: 20px;
      font-size: 18px;

      span {
        cursor: pointer
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
        margin-right: 50px
      }

      .second_title {
        float: left;
        font-size: 18px;
        margin-left: 20px;
        display: block
      }

    }

    .search {
      height: 90px;
      background: white;
      line-height: 110px;
      overflow: hidden;
      font-size: 18px;
      width: 100%
    }

    .el-form--inline .el-form-item__label {
      float: left
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
        display: block
      }

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
</style>

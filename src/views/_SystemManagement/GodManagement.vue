<template>

  <div class="GodManagement">




    <div style="padding: 0 0;white-space: nowrap;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">
            <div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="formInline.search" placeholder="Name" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>


                <!-- 等級查詢 -->
                <!-- <el-form-item style='float: left;height: 40px;margin-left: 15px;' class='search'>
                  <span>Level:</span>
                  <el-select @change="search()" v-model="formInline.customerGrade" placeholder="Type" style='margin-left: 15px;width: 100px;height: 40px;line-height: 40px;'>
                    <el-option v-for="item in optionsc" :label="item.typeName" :value="item.typeName">
                    </el-option>
                  </el-select>
                </el-form-item> -->

                <el-form-item style='float:left;height: 35px;'>
                  <el-button type="primary" @click="onSubmit" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>Search</el-button>
                </el-form-item>
                <el-form-item style='float:right;'>
                  <el-button type="primary" @click="usercreate" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
                </el-form-item>


              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>


    <!-- <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Customer</div> -->
    <div style="border-radius: 10px;background: white;height: 675px;width: 100%;">
      <div>
        <el-table :data="tableData" height="620" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;'>


          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <!-- <el-table-column type="index">
					</el-table-column> -->

           <el-table-column prop="id" label="Id" width="80px" >
          </el-table-column>

          <!-- <el-table-column type="index" width="80px" :index="indexMethod">
          </el-table-column> -->

          <el-table-column prop="customeName" label="Name">
            <template slot-scope="scope">
              <!-- <span style="cursor: pointer;text-decoration: underline;" @click='record(scope.row.reference)' >{{scope.row.customeName}}</span> -->
              <span style="cursor: pointer;text-decoration: underline;" @click='record(scope.row.id)' >{{scope.row.customeName}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="mobilePhone" label="Tel">
          </el-table-column>

<!--          <el-table-column prop="site" label="Area">
          </el-table-column> -->


          <!-- <el-table-column prop="mobilePhone" label="Telphone">
					</el-table-column> -->
          <!-- <el-table-column prop="gender" label="Sex">
					</el-table-column> -->
          <el-table-column prop="customerGrade" label="Level">
          </el-table-column>
          <!-- <el-table-column prop="retention" label="Retention">
					</el-table-column> -->
          <el-table-column prop="satisfaction" label="Satisfaction">
          </el-table-column>
          <el-table-column prop="win" label="Winning Rate">
          </el-table-column>
          <!-- <el-table-column prop="profitability" label="Acquisition">
					</el-table-column> -->
          <el-table-column prop="made" label="Creation Time">
            <template slot-scope="scope">
              <span>{{new Date(scope.row.made).format("yyyy-MMM-dd")}}</span>
            </template>
          </el-table-column>



          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' width="160px">
              <template slot-scope="scope">
                <div style="white-space: nowrap;" class="selector_form">

                 <!-- <el-button style='float: left;' type="danger" size="small" @click='record(scope.row.id)'>Consumption
                    record</el-button> -->

                 <!-- <el-button style='float: left;' type="danger" size="small" @click='record(scope.row.reference)'>Consumption
                    record</el-button>  -->

                  <!-- <el-button style='float: left;' type="danger" size="small" @click='details(scope.row.reference)'>Detail</el-button> -->
                  <!-- <el-button type="danger" size="small" @click='modify(scope.row.reference)'>Alert</el-button> -->
                  <!-- <el-button type="danger" size="small" @click='detele(scope.row.reference)'>Delete</el-button> -->
                  <!-- <el-button type="danger" size="small" @click='thelog(scope.row.reference,scope.row.customeName)'>Log</el-button> -->
                  <!-- <el-button type="danger" size="small" @click='Journal(scope.row.reference)'>Journal</el-button> -->

                  <el-menu style='background:rgb(245,108,108);margin-left: 10px;float: left;width: 80px;padding: 0;height: 32px;border-radius: 3px;'
                    class="el-menu-demo" mode="horizontal" background-color="rgb(245,108,108)" text-color="#fff"
                    active-text-color="#fff">

                    <el-submenu index="1">
                      <template slot="title" style="line-height: 32px;height: 32px;line-height: 32px;border-bottom: 2px solid transparent;color: #909399;border-radius: 3px;">Functions</template>
                      <el-menu-item index="2-1" @click='modify(scope.row.reference)'>Modify</el-menu-item>
                      <el-menu-item index="2-1" @click='detele(scope.row.reference)'>Delete</el-menu-item>
                      <!-- <el-menu-item  index="2-2" @click='thelog(scope.row.reference,scope.row.customeName)'>Log</el-menu-item> -->
                      <el-menu-item index="2-2" @click='Journal(scope.row.customeName,scope.row.reference)'>Conversations</el-menu-item>

                      <!-- <el-menu-item index="2-2">选项2</el-menu-item>
											<el-menu-item index="2-3">选项3</el-menu-item> -->
                    </el-submenu>

                  </el-menu>

                </div>
              </template>
            </el-table-column>

          </div>

        </el-table>
      </div>

      <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination layout="prev, pager, next" :page-size='10' :total="totalElements" @current-change='pages02'
          :current-page="page01">
        </el-pagination>
      </div>

      <div style="float: right;margin-top: 10px;" class="paginations">
        <el-select v-model="select_num" placeholder="select" style="float: left;width: 100px;font-size: 12px;height: 35px;"
          @change="change_list()">

          <el-option label="20/page" value="20/page"></el-option>
          <el-option label="40/page" value="40/page"></el-option>
          <el-option label="60/page" value="60/page"></el-option>
          <el-option label="100/page" value="100/page"></el-option>
          <el-option label="All" value="all"></el-option>

        </el-select>
      </div>

    </div>

    <div class="tishi">
      <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to delete this item?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_detele()">Cancel</el-button>
          <el-button type="primary" @click="confirm_detele()">OK</el-button>
        </span>
      </el-dialog>
    </div>



    <!-- <div class="dialog">
			<el-dialog title="提示" :visible.sync="dialogVisible02" width="30%" top='20%'>
				<span>時間不能爲空</span>
				<span slot="footer" class="dialog-footer">

					<el-button type="primary" @click="dialogVisible02 = false">確 定</el-button>
				</span>
			</el-dialog>
		</div> -->

  </div>

</template>

<script>
  export default {
    name: "GodManagement",
    data() {
      return {
        select_num: '20/page',
        sum: 0,
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        dialogVisible: false,
        all_loading: false,
        loaing_table: false,
        usercreate_shuchu: '',
        usercreate_dayin: '',
        test: '010101',
        win: '',
        satisfaction: '',
        customerGrade: '',
        profitability: '',
        retention: '',
        formInline: {
          search: '',
          num: '10',
          id: this.value,
          win: 0,
          satisfaction: 0,
          customerGrade: 'ALL',
          profitability: 0,
          retention: 0,
        },
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, ],
        optionsa: [{
            id: '1',
            label: '0'
          },
          {
            id: '2',
            label: '10'
          },
          {
            id: '3',
            label: '20'
          },
          {
            id: '4',
            label: '30'
          },
          {
            id: '5',
            label: '40'
          },
          {
            id: '6',
            label: '50'
          }, {
            id: '7',
            label: '60'
          },
          {
            id: '8',
            label: '70'
          },
          {
            id: '9',
            label: '80'
          },
          {
            id: '10',
            label: '90'
          },
          {
            id: '11',
            label: '100'
          },
        ],

        optionsb: [{
            id: '1',
            label: '0'
          },
          {
            id: '2',
            label: '5'
          },
          {
            id: '3',
            label: '6'
          },
          {
            id: '4',
            label: '7'
          },
          {
            id: '5',
            label: '8'
          },
          {
            id: '6',
            label: '9'
          }, {
            id: '7',
            label: '10'
          },
        ],

        optionsc: [{
          typeName: 'ALL'
        }],

        optionsd: [{
            id: '1',
            label: '0'
          },
          {
            id: '2',
            label: '10'
          },
          {
            id: '3',
            label: '20'
          },
          {
            id: '4',
            label: '30'
          },
          {
            id: '5',
            label: '40'
          },
          {
            id: '6',
            label: '50'
          }, {
            id: '7',
            label: '60'
          },
          {
            id: '8',
            label: '70'
          },
          {
            id: '9',
            label: '80'
          },
          {
            id: '10',
            label: '90'
          },
          {
            id: '11',
            label: '100'
          },
        ],
        optionse: [{
            id: '1',
            label: '0'
          },
          {
            id: '2',
            label: '10'
          },
          {
            id: '3',
            label: '20'
          },
          {
            id: '4',
            label: '30'
          },
          {
            id: '5',
            label: '40'
          },
          {
            id: '6',
            label: '50'
          }, {
            id: '7',
            label: '60'
          },
          {
            id: '8',
            label: '70'
          },
          {
            id: '9',
            label: '80'
          },
          {
            id: '10',
            label: '90'
          },
          {
            id: '11',
            label: '100'
          },
        ],
        sum: 10,
        totalElements: 0,
        page01: 1,
        type: "",
        uuid: "",
        type_uuid: "",
        tableData: []

      }
    },

    created: function() {
      this.findAllEntrepot()
      this.uuid = this.$route.query.uuid == undefined ? "" : this.$route.query.uuid
      this.type_uuid = this.$route.query.type_uuid == undefined ? "" : this.$route.query.type_uuid
      console.log(this.uuid)
      this.type = this.$route.query.level
      // 			console.log('--------+++'+this.uuid)
      this.search();





      // this.get_select()

    },
    methods: {

      change_list() {
        this.search()
      },

      indexMethod(index) {
        return ((parseInt(this.page01) - 1) * 10 + index + 1);
      },

      record(uuid) {

        this.$router.push("/CustomerOrderManagement?type=customer&uuid=" + uuid)

      },

      findAllEntrepot() {
        this.$api.get('/customer/type', {}, r => {

          for (let i = 0; i < r.length; i++) {
            this.optionsc.push(r[i])
          }

          // this.optionsc = r


          console.log(r)
        });
      },

      handleClose(done) {
        this.dialogVisible = false
      },

      search() {

        this.all_loading = true
        this.loaing_table = false
        this.tableData = []

        if (this.select_num == "20/page") {
          this.sum = 20
        } else if (this.select_num == "40/page") {
          this.sum = 40
        } else if (this.select_num == "60/page") {
          this.sum = 60
        } else if (this.select_num == "100/page") {
          this.sum = 100
        } else {
          this.sum = 1000000
        }

        // this.$api.post('/customer', {
        //   "customerGrade": this.formInline.customerGrade == 'ALL' ? '' : this.formInline.customerGrade,
        //   "index": parseInt(this.page01) - 1,
        //   "numbe": 10,
        //   "retain": parseInt(this.formInline.retention),
        //   "satisfaction": parseInt(this.formInline.satisfaction),
        //   "seek": this.formInline.search,
        //   "win": parseInt(this.formInline.win),
        // }, r => {
        //   console.log(r)
        //   this.all_loading = false
        //   this.loaing_table = true
        //   this.tableData = r.content
        //   this.totalElements = r.totalElements
        //   this.sum = r.size
        // });

        if(this.uuid!=''){

            this.$api.post('/customer/count',

            {
              "reference": this.uuid
              // "customerGrade": this.type_uuid==""?null:this.type_uuid
            }

            , r => {

              console.log('*----*')
              console.log(r)
              this.totalElements = r

            });


          this.$api.post('/customer/' + '1970-01-01' + '/' + new Date().format("yyyy-MM-dd") + '/' + (parseInt(this.page01) -
              1) + '/' + this.sum,

            {
              "reference": this.uuid
              // "customeName": this.formInline.search == "" ? null : this.formInline.search,
              // "customerGrade": this.type_uuid==""?null:this.type_uuid
            }

            , r => {

              console.log('*----*')
              console.log(r)
              this.tableData = r
              this.all_loading = false
              this.loaing_table = true
              // this.totalElements = r

            });

        }else{

          if (!(/^[0-9]\d*$/.test(this.formInline.search))) {

            // alert('salesNo must be a number')
            this.$api.post('/customer/count',

              {
                "customeName": this.formInline.search == "" ? null : this.formInline.search,
                "customerGrade": this.type_uuid==""?null:this.type_uuid
              }

              , r => {

                console.log('*----*')
                console.log(r)
                this.totalElements = r

              });


            this.$api.post('/customer/' + '1970-01-01' + '/' + new Date().format("yyyy-MM-dd") + '/' + (parseInt(this.page01) -
                1) + '/' + this.sum,

              {
                "customeName": this.formInline.search == "" ? null : this.formInline.search,
                "customerGrade": this.type_uuid==""?null:this.type_uuid
              }

              , r => {

                console.log('*----*')
                console.log(r)
                this.tableData = r
                this.all_loading = false
                this.loaing_table = true
                // this.totalElements = r

              });


          } else {

            this.$api.post('/customer/count',

              {
                "mobilePhone": this.formInline.search == "" ? null : this.formInline.search,
                "customerGrade": this.type_uuid==""?null:this.type_uuid
              }

              , r => {

                console.log('*----*')
                console.log(r)
                this.totalElements = r

              });


            this.$api.post('/customer/' + '1970-01-01' + '/' + new Date().format("yyyy-MM-dd") + '/' + (parseInt(this.page01) -
                1) + '/' + this.sum,

              {
                "mobilePhone": this.formInline.search == "" ? null : this.formInline.search,
                "customerGrade": this.type_uuid==""?null:this.type_uuid
              }

              , r => {

                console.log('*----*')
                console.log(r)
                this.tableData = r
                this.all_loading = false
                this.loaing_table = true
                // this.totalElements = r

              });

          }

        }












      },

      onSubmit() {
        this.page01 = 1
        this.search()
      },

      formatDate(row, column) {
        var date = new Date(row.time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() + ' '
        // 				var h = date.getHours() + ':'
        // 				var m = date.getMinutes() + ':'
        // 				var s = date.getSeconds()
        return Y + M + D
      },


      // 關聯
      associated() {

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

        this.$api.delete('/customer/' + this.statusid, null, r => {
          console.log(r)
          this.search()
          // 					this.tableData3 = r.content;
          // 					this.totalElements = r.totalElements
        });
      },
      // 批次翻頁
      pages02(val) {
        // console.log(val)
        this.page01 = val
        this.search()
      },
      usercreate() {
        this.$router.push("/CustomersCreate?type=new")
      },

      details(uuid) {
        this.$router.push("/CustomersCreate?type=detail&uuid=" + uuid)
      },
      modify(uuid) {
        this.$router.push("/CustomersCreate?type=alert&uuid=" + uuid)
      },
      thelog(uuid, name) {
        this.$router.push("/Log?uuid=" + uuid + "&name=" + name)
      },
      Journal(customeName,uuid) {
        this.$router.push("/Communicationlogs?uuid=" + uuid+'&customer_name='+customeName)
      },

      // 			topage(type) {
      // 				if (type == 'grounp') {
      // 					this.$router.push("/SystemManagement/CustomentManagement")
      // 				} else if (type == 'branch') {
      // 					this.$router.push("/SystemManagement/branchManagement")
      // 				}
      // 			}
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

  .usermanagement {

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

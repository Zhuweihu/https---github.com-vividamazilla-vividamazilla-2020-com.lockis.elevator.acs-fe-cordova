<template>

  <div class="UserManagement">




    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">

            <!-- <div  style="width: 300px;margin-left: 0;float: left;">
							<el-date-picker v-model="dateTwo" type="daterange" start-placeholder="start date" end-placeholder="end date" placeholder="select date"
							 style='width: 300px;float: right;border-radius: 10px;'>
							</el-date-picker>
						</div> -->
            <div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="formInline.seek" placeholder="Keyword" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>
                <el-form-item style='float:left;height: 35px;'>
                  <el-button type="primary" @click="onSubmit" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>Search</el-button>
                </el-form-item>
                <!-- <div style="font-size: 18px;font-weight: bold;padding-left: 20px;float: left;line-height: 40px;">Production Vendor</div> -->
                <el-form-item style='float:right;'>
                  <el-button type="primary" @click="usercreate" style='height:40px;padding: 0 10px;border:0;background: rgb(5,120,209);'>New</el-button>
                </el-form-item>


              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>





    <!-- 庫存列表 -->
    <!-- <div style="margin-top: 20px;font-size: 18px;font-weight: bold;padding-left: 20px;">Factory Setting</div> -->
    <div style="border-radius: 10px;background: white;width: 100%;margin-top: 20px;">
      <div>
        <!-- <div @click="reserveAdd()" style="cursor: pointer;position: relative;top: 0px;z-index: 1000;height: 0px;line-height: 20px;top: 15px;float: right;margin-right: 65px;color: #409EFF;">添加</div> -->
        <!-- highlight-current-row -->
        <el-table :data="tableData" height="620" ref="singleTable01" :header-cell-style="titlebg" style='border-radius: 10px;min-width: 931px;'>

          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>

          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>

          <el-table-column prop="id" width="80px" label="Id">
          </el-table-column>

          <!-- <el-table-column type="index" width="80px" :index="indexMethod">
          </el-table-column> -->

          <el-table-column prop="name" label="Name" row-style='background:red'>
            <template slot-scope="scope">
              <span style="text-decoration: underline;cursor: pointer;" @click="to_factory_order(scope.row.reference)">{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="contact1"  label="Contact 1">
          </el-table-column>

          <el-table-column prop="contact1Tel"  label="Contact 1 Tel">
          </el-table-column>

          <el-table-column prop="bank"  label="Bank">
          </el-table-column>

          <el-table-column prop="bankNo"  label="Bank No">
          </el-table-column>

          <div class="action">
            <el-table-column fixed="right" label="Action" align='center' style='background: red;white-space: nowrap;'
              width='100'>
              <template slot-scope="scope">


                <!-- <el-button @click="detail(scope.row.reference)" type="danger" size="small">Detail</el-button> -->
                <el-button @click="alert(scope.row.reference)" type="danger" size="small">Modify</el-button>

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

    <div class="tishi">
      <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to delete this item?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel_detele()">Cancel</el-button>
          <el-button type="primary" @click="confirm_detele()">OK</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="tishi">
      <el-dialog title="Tips" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to suspend it?</span>
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
        type: "",
        uuid: "",
        dialogVisible: false,
        dialogVisibles: false,
        dialogVisible02: false,
        loaing_table: false,
        titlebg: {
          'background': 'rgb(216,214,215)',
          'color': 'black'
        },
        value1: "",
        test: '010101',
        formInline: {
          search: '',
          num: '',
          seek: '',
        },
        sum: 11,
        totalElements: 0,
        page01: 1,
        tableData: []
      }


    },

    created: function() {

      this.type = this.$route.query.type
      // this.uuid=this.$route.query.uuid

      // window.localStorage.setItem('test')

      // this.$api.get('/factory/count', null, r => {
      //   this.totalElements = r
      // });

      this.formInline.seek=this.$route.query.search_name==undefined?'':this.$route.query.search_name

      this.search()

    },

    methods: {

      indexMethod(index) {
        return ((parseInt(this.page01) - 1) * 10 + index + 1);
      },

      handleClose(done) {
        this.dialogVisible = false
      },

      handleClose(done) {
        this.dialogVisibles = false
      },

      to_factory_order(uuid) {
        this.$router.push("/factoryManagement?type=search&uuid=" + uuid)
      },

      search() {
        this.all_loading = true
        this.loaing_table = false
        this.tableData = []

        ///factory/{page}/{size}
        // this.$api.get('/factory/'+(this.page01-1)+'/10',null, r => {
        // 	console.log(r);
        // 	this.tableData = r;
        // 	this.all_loading=false
        // 	this.loaing_table=true
        // });



          this.$api.post('/factory/count', {
            "name": this.formInline.seek == "" ? null : this.formInline.seek,
          }, r => {
            console.log('000000000')
            console.log(r);
            this.all_loading = false
            this.loaing_table = true
          });


          this.$api.post('/factory/1970-01-01/' +new Date().format("yyyy-MM-dd")+'/'+ (this.page01 - 1) + '/10', {
            "name": this.formInline.seek == "" ? null : this.formInline.seek,
          }, r => {
            console.log('/*-')
            console.log(r);
            this.tableData = r;
          });






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

        this.$api.get('/member/delete/' + this.statusid, null, r => {
          console.log('****************************')
          this.search();
        });
      },

      // 鎖定
      suspend(id) {
        this.dialogVisibles = true
        this.statusid = id
      },
      suoding_queren() {
        this.dialogVisibles = false
        this.$api.get('/member/updateActivated/' + this.statusid, null, r => {
          console.log(r);
          this.search()
        });
      },
      suoding_quxiao() {
        this.dialogVisibles = false
      },


      // 批次翻頁
      pages02(val) {
        // //console.log(val)
        this.page01 = val
        this.search()
      },
      usercreate() {
        this.$router.push("/factoryManagements?type=new")
      },

      detail(uuid) {
        this.$router.push("/factoryManagements?type=detail&uuid=" + uuid)
      },
      alert(uuid) {
        this.$router.push("/factoryManagements?type=alert&uuid=" + uuid)
      },
      //重置密码
      reset(name) {
        this.$router.push("/ResetPass?name=" + name)
      },
      topage(type) {
        if (type == 'grounp') {
          this.$router.push("/CustomentManagement")
        } else if (type == 'branch') {
          this.$router.push("/branchManagement")
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
  .UserManagement {
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
  }
</style>

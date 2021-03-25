<template>
  <div class="elysCity">
    <div style="padding: 0 0;">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 40px;">
            <div>
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item style='float:left;'>
                  <h3>System Settings - City</h3>
              </el-form-item>
                <!-- <el-form-item style='float: left;height: 40px;' class='search'>
                  <el-input v-model="formInline.seek" placeholder="Name" style='margin-left: 15px;width: 256px;height: 40px;line-height: 40px;'></el-input>
                </el-form-item>
                <el-form-item style='float:left;height: 35px;'>
                  <el-button type="primary" @click="onSubmit" style='height:40px;border:0;padding: 0 10px;'>Search</el-button>
                </el-form-item> -->
                <el-form-item style='float:right;'>
                  <el-button type="primary" @click="citycreate" style='height:40px;padding: 0 10px;border:0;'>New</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="border-radius: 10px;background: white;height: 676px;width: 100%;" >
      <div>
        <el-table :data="tableData" :header-cell-style="titlebg" style="width: 100%;text-align: center;margin: 0;padding: 0;height: 620px;border-radius: 10px;">
          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>
          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <el-table-column prop="id" label="Id" width="100px"  align='center'>
          </el-table-column>
          <el-table-column prop="name" label="City" width="300px" align='center'>
          </el-table-column>
          <el-table-column prop="activated" label="Status" width="250px" align='center'>
            <template slot-scope="scope">
              <span>{{scope.row.active == 1 ? "Enable" : "Disable"}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right"  align='center' label="Action">
            <template slot-scope="scope" >
              <el-button @click="alert(scope.row.reference)" type="danger" size="small" style="margin-right: 20px;" plain>Modify</el-button>
              <el-button @click="detele(scope.row.reference)" type="danger" size="small">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" style="float: right;margin-top: 10px;">
        <el-pagination :page-size='sum' layout="prev, pager, next" :total="totalElements" @current-change='pages02'
                       :current-page="page01">
        </el-pagination>
      </div>
    </div>
    <div class="tishi">
      <el-dialog title="Tips" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" top='20%'>
        <span>Do you really want to delete this City?</span>
        <span slot="footer" class="dialog-footer">
					<el-button @click="cancel_detele()">No</el-button>
					<el-button type="primary" @click="confirm_detele()">Yes</el-button>
				</span>
      </el-dialog>
    </div>
    <div class="tishi">
      <el-dialog title="" :visible.sync="dialogVisible_group" width="30%" :before-close="handleClose_group" top='20%'>
        <span>Group change:&nbsp;</span>
        <el-select v-model="options" filterable placeholder="Select">
          <el-option
            v-for="item in options_list"
            :key="item.name"
            :label="item.name"
            :value="item.reference">
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
    name: "elysCity",
    data() {
      return {
        titlebg:{
          'background':'rgb(232,236,245)',
          'color':'black'
        },
        dialogVisible: false,
        dialogVisibles: false,
        dialogVisible_group:false,
        dialogVisible_reference:"",
        loaing_table:false,
        value1: "",
        test: '010101',
        formInline: {
          search: '',
          num: '6',
          seek: '',
        },
        value6: [],
        sum: 10,
        totalElements: 0,
        page01: 1,
        tableData: [],
        options:'',
        options_list:[],
        member_reference:''
      }
    },
    created: function() {
      this.$api.get('/miscellaneous/city/count',null, r => {
        this.totalElements = r
      });
      this.search()
    },

    methods: {
      indexMethod(index) {
        return ((parseInt(this.page01)-1)*10+index+1) ;
      },
      confirm_state(){
        this.$api.put('/miscellaneous/city/'+this.member_reference+'/group/'+this.options+'/assign',null, r => {
          this.search()
          this.dialogVisible_group=false
        });
      },
      cancel_state(){
        this.dialogVisible_group=false
      },
      assign(uuid){
        this.dialogVisible_group=true
        this.member_reference=uuid
      },
      handleClose(done) {
        this.dialogVisible = false
      },
      handleClose(done) {
        this.dialogVisibles = false
      },
      handleClose_group(){
        this.dialogVisible_group = false
      },
      search() {
        this.loaing_table=false
        this.tableData=[]
        this.$api.get('/miscellaneous/city/'+(this.page01-1)+'/'+this.sum,null, r => {
          this.tableData = r;
        });
      },
      onSubmit() {
        this.page01 = 1
        this.search()
      },
      cancel_detele() {
        this.dialogVisible = false
      },
      confirm_detele() {
        this.dialogVisible = false
        this.$api.delete('/miscellaneous/city/' + this.dialogVisible_reference + '/purge', null, r => {
          this.search();
        });
      },
      detele(reference){
        this.dialogVisible = true
        this.dialogVisible_reference = reference
      },
      lock(id) {
        this.dialogVisibles = true
        this.statusid = id
      },
      suoding_queren() {
        this.dialogVisibles = false
        this.$api.get('/Design/onLock/' + this.statusid, null, r => {
          this.search()
        });
      },
      suoding_quxiao() {
        this.dialogVisibles = false
      },
      pages02(val) {
        this.page01 = val
        this.search()
      },
      citycreate() {
        this.$router.push("/elysCityCreate?type=new")
      },
      return_guest() {
        this.$router.push("/CustomerOrderManagement")
      },
      details(uuid) {
        this.$router.push("/Add_Permission?uuid="+uuid)
      },
      chengping() {
        this.$router.push("/SystemManagement/CustomerList")
      },
      modify(uuid) {
        this.$router.push("/ShouShixingZeng?type=alert&uuid=" + uuid)
      },
      topage(type) {
        if (type == 'user') {
          this.$router.push("/SystemManagement/CustomerOrderManagement")
        } else if (type == 'branch') {
          this.$router.push("/SystemManagement/CustomerList")
        }
      },
      detail(uuid) {
        this.$router.push("/elysCityCreate?type=detail&uuid=" + uuid)
      },
      alert(uuid) {
        this.$router.push("/elysCityCreate?type=alert&uuid=" + uuid)
      },
    }
  }
</script>

<style lang="scss">
  @import '../assets/styles/variable';

  .elysCity {

    .block {
      line-height: 0;

      .el-main {
        line-height: 0
      }
    }

    .tishi {
      line-height: 0;
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
</style>

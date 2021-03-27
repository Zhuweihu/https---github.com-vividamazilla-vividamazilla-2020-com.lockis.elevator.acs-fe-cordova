<template>
  <div class="elysExpense">
    <div style="padding: 0 0">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="height: 120px">
            <div>
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                <el-card>
                  <el-form-item
                    style="float: left; height: 40px"
                    class="search"
                  >
                    <el-input
                      v-model="likeSearch"
                      placeholder="Name"
                      style="
                        margin-left: 15px;
                        width: 256px;
                        height: 40px;
                        line-height: 40px;
                      "
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="float: left; height: 35px">
                    <el-button
                      type="primary"
                      @click="like"
                      style="height: 40px; border: 0; padding: 0 10px"
                      >Search</el-button
                    >
                  </el-form-item>
                  <el-form-item style="float: right">
                    <el-button
                      type="primary"
                      @click="expensecreate"
                      style="height: 40px; padding: 0 10px; border: 0"
                      >New</el-button
                    >
                  </el-form-item>
                </el-card>
              </el-form>
              <div>
                <h3>Elevator Information</h3>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="background: white; height: 676px; width: 100%">
      <div>
        <el-table
          :data="tableData"
          :header-cell-style="titlebg"
          style="
            width: 100%;
            text-align: center;
            margin: 0;
            padding: 0;
            height: 620px;
          "
        >
          <template slot="empty" v-if="loaing_table">
            <span>Opps! No records yet</span>
          </template>
          <template slot="empty" v-if="!loaing_table">
            <i class="el-icon-loading"></i>
            <span>Loading...</span>
          </template>
          <el-table-column prop="number" label="Serial Number" align="left">
          </el-table-column>
          <el-table-column prop="token" label="Device_token" align="left">
          </el-table-column>
          <el-table-column prop="code" label="Device_activation_code" align="left">
          </el-table-column>
          <el-table-column prop="name" label="Building Name" align="left">
          </el-table-column>
          <el-table-column prop="remark" label="Remark" align="left">
          </el-table-column>
          <el-table-column prop="cteatetime" label="Create time" align="left">
          </el-table-column>
          <el-table-column prop="updatetime" label="update time" align="left">
          </el-table-column>
          <el-table-column prop="action" label="Action" align="left">
            <template>
              <!-- <el-button               
                type="primary"
                size="mini"
                >
                Button
                Setting
                </el-button
              >
              <el-button            
                type="primary"
                size="mini"
                >QR code</el-button
              > -->
              <el-button                
                type="danger"
                size="mini"  
                >Modify</el-button
              >
              <el-button            
                type="danger"
                size="mini"
                >Delete</el-button
              >
            </template>
           
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "elevator",
  data() {
    return {
        ele:'',
      titlebg: {
        background: "rgb(232,236,245)",
        color: "black"
      },
      tableData: [
        {
          number:1,
          token: "2016-05-02",
          code: "12wqdwfd2f3few",
          name:'王小虎',
          remark: "i am remark",
          address: "王小虎",
          cteatetime:"2016/05/02 23:52",
          updatetime:"2017/05/02 23:52",
        },
         {
          number:1,
          token: "2016-05-02",
          code: "12wqdwfd2f3few",
          name:'王小虎',
          remark: "i am remark",
          address: "王小虎",
          cteatetime:"2016/05/02 23:52",
          updatetime:"2017/05/02 23:52",
        },
         {
          number:1,
          token: "2016-05-02",
          code: "12wqdwfd2f3few",
          name:'王小虎',
          remark: "i am remark",
          address: "王小虎",
          cteatetime:"2016/05/02 23:52",
          updatetime:"2017/05/02 23:52",
        },
      ],
    };
  },

  created(){
       
  },

  methods:{
    
  }
};
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

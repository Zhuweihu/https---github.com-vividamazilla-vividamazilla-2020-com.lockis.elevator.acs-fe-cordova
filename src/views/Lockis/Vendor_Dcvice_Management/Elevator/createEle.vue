<template>
  <div class="createEle">
    <!-- 进度步骤条 -->
    <div class="createStep">
      <el-steps :active="active" finish-status="success">
        <el-step title="Choose floor"></el-step>
        <el-step title="Confirm floor"></el-step>
        <el-step title="Complete"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px" @click="next">下一步</el-button> -->
    </div>
    <!-- 显示选择的电梯信息 -->
    <div class="eleInformation">
      <div class="floorinformation fl">
        <div>Number of negative floors</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Set the highest floor</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>生效时间</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>N秒后终止使用（永久请留空）</div>
        <el-input v-model="input" placeholder=""></el-input>
      </div>
    </div>

    <!-- 选择negative floor -->
    <div class="negativeFloor">
      <div class="negativeTitle">Negative floor</div>
      <div class="choseNegative">
        <div
          class="choseNegativeFloor fl"
          v-for="(item, index) in negativeData"
          :key="index"
          @click="clickNegativeFloor(index)"
          :class="item.istrue ? 'choseColor' : ''"
        >
          {{ item.floor }}
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <!-- 选择Main floor -->
    <div class="mainFloor">
      <div class="mainTitle">Main floor</div>
      <div class="choseMain">
        <div
          class="choseMainFloor fl"
          v-for="(item, index) in mainData"
          :key="index"
          @click="clickMainFloor(index)"
          :class="item.istrue ? 'choseColor' : ''"
        >
          {{ item.floor }}
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <!-- 按钮button -->
    <div class="chosebutton">
      <el-button type="primary">Complete</el-button>
      <el-button type="danger">Output Auto Generate</el-button>
    </div>
  </div>
</template>
<script>
export default {
  namae: "createEle",
  data() {
    return {
      // 步骤条
      active: 0,
      //   输入框
      input: "",

      //negativeFloor数据
      negativeData: [
        {
          floor: "-3/F",
          istrue: false,
        },
        {
          floor: "-3/F",
          istrue: false,
        },
        {
          floor: "-3/F",
          istrue: false,
        },
        {
          floor: "-3/F",
          istrue: false,
        },
      ],

      //mainFloor数据
      mainData: [
        {
          floor: "-1/F",
          istrue: false,
        },
        {
          floor: "2/F",
          istrue: false,
        },
        {
          floor: "3/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
          {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
          {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
          {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
          {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
          {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
          {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
        {
          floor: "4/F",
          istrue: false,
        },
      ],
    };
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    //点击事件negativeFloor
    clickNegativeFloor(index) {
      // 判断istrue的值，来改变颜色类名的获取，并且只保证显示一个按钮
      for (let i = 0; i < this.negativeData.length; i++) {
        if (i == index) {
          if (this.negativeData[i].istrue) {
            this.negativeData[i].istrue = false;
          } else {
            this.negativeData[i].istrue = true;
          }
        } else {
          this.negativeData[i].istrue = false;
        }
      }
    },

    //点击事件MainFloor
    clickMainFloor(index) {
      // 判断istrue的值，来改变颜色类名的获取
      if (this.mainData[index].istrue) {
        this.mainData[index].istrue = false;
      } else {
        this.mainData[index].istrue = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../../../../assets/styles/variable";
.createStep {
  margin-bottom: 20px;
}
.eleInformation {
  width: 100%;
  height: 80px;
}
.floorinformation {
  width: 300px;
  margin-left: 40px;
}
.floorinformation:nth-child(1) {
  margin-left: 0px;
}

// <!-- 选择negative floor 开始-->
.negativeFloor {
  margin-bottom: 40px;
}
.negativeFloor .negativeTitle {
}

.negativeFloor .choseNegative {
  width: 100%;
  // height: 80px;
  background-color: #f0f3f8;
  border: 1px solid #e1e2e6;
  padding: 10px;
}
// 清除浮动
.negativeFloor .choseNegative .clear {
  clear: both;
}
.negativeFloor .choseNegative .choseNegativeFloor {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  // 阴影
  box-shadow: 0px 0px 1px gray;
}
// <!-- 选择negative floor 结束-->
// <!-- 选择Main floor -->
.mainFloor {
  margin-bottom: 40px;
}
.mainFloor .mainTitle {
}
.mainFloor .choseMain {
  width: 100%;
  // height: 80px;
  background-color: #f0f3f8;
  border: 1px solid #e1e2e6;
  padding: 10px;
}
.mainFloor .choseMain .clear {
  clear: both;
}
.mainFloor .choseMain .choseMainFloor {
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  // 阴影
  box-shadow: 0px 0px 1px gray;
}
// <!-- 选择Main floor 结束-->

// .negativeFloor选中颜色
.choseColor {
  background-color: #f46c6c !important;
  color: white;
}
</style>
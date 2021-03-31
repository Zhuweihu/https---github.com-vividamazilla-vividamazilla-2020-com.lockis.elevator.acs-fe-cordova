<template>
  <div class="createEle">
    <div id="dialog"></div>
    <!-- 进度步骤条 -->
    <div class="createStep">
      <el-steps :active="active" finish-status="success">
        <el-step title="Choose floor"></el-step>
        <el-step title="Confirm floor"></el-step>
        <el-step title="Complete"></el-step>
      </el-steps>
      <!-- <el-button style="margin-top: 12px" @click="next">下一步</el-button> -->
    </div><hr style="clear: both;" />
    <div class="eleInformation">
      <div class="floorinformation fl">
        <div>Estate</div>
        <el-input v-model="estate.name_en" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Building</div>
        <el-input v-model="building.name_en" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Machine</div>
        <el-input v-model="machine_name_en" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Machine (Chinese)</div>
        <el-input v-model="machine_name" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Device</div>
        <el-input v-model="dev_sn" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Rssi</div>
        <el-input v-model="rssi" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Call Panel - Up Button Device</div>
        <el-input v-model="call_button_dev_up" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Call Panel - Down Button Device</div>
        <el-input v-model="call_button_dev_down" placeholder=""></el-input>
      </div>
      <div class="floorinformation fl">
        <div>Allow Search Mode</div>
        <el-select v-model="allow_search" placeholder="Please Select" style="width: 300px">
        </el-select>
      </div>
      <div class="floorinformation fl">
        <div>Type of Usage</div>
        <el-select v-model="type" placeholder="Please Select" style="width: 300px">
        </el-select>
      </div>
    </div>
    <hr style="clear: both;" />
    <!-- 显示选择的电梯信息 -->
    <div class="eleInformation">
      <div class="floorinformation fl">
        <div>Passcode Active From</div>
        <el-date-picker style="width: 300px"
          v-model="allow_from"
          type="datetime"
          placeholder="Pick Date and Time"
          default-time="00:00:00">
        </el-date-picker>
      </div>
      <div class="floorinformation fl">
        <div>Passcode Expiry</div>
        <el-date-picker style="width: 300px"
          v-model="allow_to"
          type="datetime"
          placeholder="Pick Date and Time"
          default-time="00:00:00">
        </el-date-picker>
      </div>
      <div class="floorinformation fl">
        <div>Passcode</div>
        <el-input v-model="passcode" placeholder=""></el-input>
      </div>
    </div>
    <hr style="clear: both;" />
    <div class="eleInformation">
      <div class="floorinformation fl">
        <div>Lowest Basement Floor Number</div>
        <input class="el-input el-input__inner" :value="negative_floor" placeholder="" @change="event => makeFloorPlan(event, '-')"
        @keypress="event => isNumber(event)"></input>
      </div>
      <div class="floorinformation fl">
        <div>Highest Floor Number</div>
        <input class="el-input el-input__inner" :value="highest_floor" placeholder="" @change="event => makeFloorPlan(event, '+')"
        @keypress="event => isNumber(event)"></input>
      </div>
      <div class="floorinformation fl">
        <div>Buttons</div>
        <input class="el-input el-input__inner" :value="buttons" placeholder="" disabled></input>
      </div>
      <div class="floorinformation fl">
        <div>Outputs</div>
        <input class="el-input el-input__inner" :value="outputs" placeholder="" disabled></input>
      </div>
    </div>
    <hr style="clear: both;" />
    <!-- 选择negative floor -->
    <div class="negativeFloor">
      <div class="negativeTitle">Negative floor</div>
      <div class="choseNegative">
        <div class="choseNegativeFloor1 fl" v-for="(item, index) in negativeData">
          <div
            class="choseNegativeFloor fl"
            :key="index"
            @click="clickNegativeFloor(item)"
            :class="item.istrue ? 'choseColor' : ''">
            {{ item.floor }}
          </div>
          <div style="" style="margin-left: 10px; width: 40px;">
            <input type="text"
            :key="index"
            @change="event => changeFloorOutput(item, event)"
            @keypress="event => isNumber(event)"
            :value="item.output"
            :disabled="!item.istrue"
            data-title="Output Setting"
            data-desc="The output channel number of lift control panel." />
          </div>
          <div style="" style="margin-left: 10px; width: 40px; margin-top: -10px;">
            <input type="text"
            :key="index"
            @change="event => changeFloorDescription(item, event)"
            :value="item.description"
            :disabled="!item.istrue"
            data-title="Button Name"
            data-desc="The text on the botton." />
          </div>
        </div>

        <div class="clear"></div>
      </div>
    </div>

    <!-- 选择Main floor -->
    <div class="mainFloor">
      <div class="mainTitle">Main floor</div>
          <div class="choseMain">
            <div class="choseNegativeFloor1 fl" v-for="(item, index) in mainData">
              <div
                class="choseMainFloor fl"
                :key="index"
                @click="clickMainFloor(item)"
                :class="item.istrue ? 'choseColor' : ''">
                {{ item.floor }}
              </div>
              <div style="" style="margin-left: 10px; width: 40px;">
                <input type="text"
                :key="index"
                @change="event => changeFloorOutput(item, event)"
                @keypress="event => isNumber(event)"
                :value="item.output"
                :disabled="!item.istrue"
                data-title="Output Setting"
                data-desc="The output channel number of lift control panel." />
              </div>
              <div style="" style="margin-left: 10px; width: 40px; margin-top: -10px;">
                <input type="text"
                :key="index"
                @change="event => changeFloorDescription(item, event)"
                :value="item.description"
                :disabled="!item.istrue"
                data-title="Button Name"
                data-desc="The text on the botton." />
              </div>
            </div>
            <div class="clear"></div>
          </div>
    </div>

    <!-- 按钮button -->
    <div class="floorinformation fl">
      <div>Remark</div>
      <el-input type="textarea" v-model="remark" placeholder="" :rows="4"></el-input>
    </div>
    <hr style="clear: both;" />

    <div class="chosebutton">
      <el-button type="danger" @click="outputAuto()">Generate Output</el-button>
      <el-button type="primary" @click="qrcodeAuto()">Generate QR Code</el-button>
    </div>
  </div>
</template>
<script>

</script>
<script>
export default {
  namae: "createEle",
  mounted: function () {
    this.estate = {
      name: "Estate Name (Chinese)",
      name_en: "Estate Name"
    };
    this.building = {
      name: "Building Name (Chinese)",
      name_en: "Building Name"
    };
    this.machine_name = "Test Machine (Chinese)";
    this.machine_name_en = "Test Machine";
    this.dev_id = 101;
    this.dev_sn = "0246810A";
    this.rssi = -90;
    this.passcode = "0000",
    this.allow_from = Date.now(), // Math.floor(Date.now() / 1000),
    this.allow_to = Date.now() + 7776000 * 1000, // 7776000 = 90 days
    this.call_button_dev_up = 102;
    this.call_button_dev_down = 103;
    this.call_button_dev = [this.call_button_dev_up, this.call_button_dev_down].join(',');
    this.negative_floor = 6;
    this.highest_floor = 12;
    this.buttons = "0:P:停車場,17:11/F:11樓,18:12/F:12樓";
    this.outputs = "1,2,3";
    var buttons_arr = this.buttons.split(',');
    var outputs_arr = this.outputs.split(',');
    for (let i = 0; i < buttons_arr.length; i++) {
        var data = buttons_arr[i].split(':');
        this.dataExtra[data[0]] = [data[1],data[2]];
        this.outputExtra[data[0]] = outputs_arr[i];
    }
    this.makeFloorPlan(1, '');
    this.type = "M";
    this.remark = "";
  },
  data() {
    return {
      // 步骤条
      makeFloorPlan(event, direction) {
        if (direction == '-') this.negative_floor = event.target.value;
        if (direction == '+') this.highest_floor = event.target.value;
        this.negativeData = [];
        this.mainData = [];
        this.negative_floor = parseInt(this.negative_floor);
        var index = this.negative_floor;
        for (var i = 0; i < this.negative_floor; i++) {
            index--;
            this.negativeData.push({
                index: i,
                floor: "B" + Math.abs(i-this.negative_floor),
                istrue: this.dataExtra[i] != null ? true : false,
                output: this.dataExtra[i] != null ? this.outputExtra[i] : "",
                description: this.dataExtra[i] != null ? (this.dataExtra[i][0] + ':' + this.dataExtra[i][1]) : ""
            })
        };
        for (var i = 0; i <= this.highest_floor; i++) {
            index++;
            var temp = {
              index: i+parseInt(this.negative_floor),
                floor: i == 0 ? "G" : (i + "/F"),
                istrue: this.dataExtra[i+this.negative_floor] != null ? true : false,
                output: this.dataExtra[i+this.negative_floor] != null ? this.outputExtra[i+this.negative_floor] : "",
                description: this.dataExtra[i+this.negative_floor] != null ? (this.dataExtra[i+this.negative_floor][0] + ':' + this.dataExtra[i+this.negative_floor][1]) : ""
            };
            this.mainData.push({
                index: i+parseInt(this.negative_floor),
                floor: i == 0 ? "G" : (i + "/F"),
                istrue: this.dataExtra[i+this.negative_floor] != null ? true : false,
                output: this.dataExtra[i+this.negative_floor] != null ? this.outputExtra[i+this.negative_floor] : "",
                description: this.dataExtra[i+this.negative_floor] != null ? (this.dataExtra[i+this.negative_floor][0] + ':' + this.dataExtra[i+this.negative_floor][1]) : ""
            })
        };
        $(document).tooltip({
            items: "[data-title], [data-desc]",
            content: function () {
                if ($(this).attr('disabled')) return;
                return $(this).val().split(':').length == 1 ?
                ('<b>' + $(this).data("title") + '</b><br/>Description: ' + $(this).data('desc') + '<br/>Current Setting: ' + $(this).val()) :
                ('<b>' + $(this).data("title") + '</b><br/>Description: ' + $(this).data('desc') + '<br/>English: ' + $(this).val().split(':')[0] + '<br/>Chinese: ' + $(this).val().split(':')[1]);
            }
        });
      },
      active: 0,
      estate: {},
      building: {},
      machine_name: "", machine_name_en: "",
      dev_sn: "", dev_id: "",
      rssi: 0,
      passcode: "",
      negative_floor: 0, highest_floor: 0,
      buttons: "",
      allow_from: 0, allow_to: 0, allow_search: 0,
      outputs: "",
      type: "",
      call_button_dev: "", // call_button_dev = "call_button_dev_up,call_button_dev_down"  Example: "101,102"
      call_button_dev_up: 0,
      call_button_dev_down: 0,
      negativeData: [],
      mainData: [],
      outputExtra: [],
      dataExtra: [],
      buttons: "", // "1:P:停車場,17:11/F:11樓,18:12/F:12樓",
      outputs: "", // "1,2,3"
      remark: "",
    };
  },
  created(){
    this.$api.get("/lksKMachine", null, (r) => {
      
      console.log(r)
    });
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
   
    //点击事件negativeFloor
    clickNegativeFloor(item) {
      // 判断istrue的值，来改变颜色类名的获取，并且只保证显示一个按钮
      this.negativeData[item.index].istrue = this.negativeData[item.index].istrue ? false : true;
      if (!this.negativeData[item.index].istrue) {
        this.negativeData[item.index].output = "";
        this.negativeData[item.index].description = "";
        this.outputExtra.splice(item.index);
        this.dataExtra.splice(item.index);
        this.changeFloorOutput(item, {target: {value: null}});
        this.changeFloorDescription(item, {target: {value: null}});
      }
    },
    //点击事件MainFloor
    clickMainFloor(item) {
      // 判断istrue的值，来改变颜色类名的获取
      this.mainData[item.index-this.negativeData.length].istrue = this.mainData[item.index-this.negativeData.length].istrue ? false : true;
      if (!this.mainData[item.index-this.negativeData.length].istrue) {
        this.mainData[item.index-this.negativeData.length].output = "";
        this.mainData[item.index-this.negativeData.length].description = "";
        this.outputExtra.splice(item.index);
        this.dataExtra.splice(item.index);
        this.changeFloorOutput(item, {target: {value: null}});
        this.changeFloorDescription(item, {target: {value: null}});
      }
    },
    changeFloorOutput(item, event) {
      item.output = event.target.value;
      var _outputExtra = [];
      this.negativeData.forEach((data) => {
        if (data.istrue) {
          _outputExtra.push(data.output);
        }
      });
      this.mainData.forEach((data) => {
        if (data.istrue) {
          _outputExtra.push(data.output);
        }
      });
      this.outputs = _outputExtra.join(',');
    },
    changeFloorDescription(item, event) {
      item.description = event.target.value;
      var _dataExtra = [];
      this.negativeData.forEach((data) => {
        if (data.istrue) {
          _dataExtra.push(data.index + ":" + data.description);
        }
      });
      this.mainData.forEach((data) => {
        if (data.istrue) {
          _dataExtra.push(data.index + ":" + data.description);
        }
      });
      this.buttons = _dataExtra.join(',');
    },
    outputAuto() {
      var output = 0;
      this.negativeData.forEach((item, i) => {
        if (item.istrue) {
          output++;
          item.output = output;
        }
      });
      this.mainData.forEach((item, i) => {
        if (item.istrue) {
          output++;
          item.output = output;
        }
      });
    },
    qrcodeAuto() {

      var _buttons = this.buttons.split(',');
      _buttons.forEach((item, i) => {
        var _parts = item.split(':');
        _parts.slice(1, 2);
        _buttons[i] = [_parts[1],_parts[2]].join(':');
      });
      var qr = [
        this.type,
        [
          [
            [this.estate.name, this.estate.name_en].join(':'),
            [
              [this.building.name, this.building.name_en].join(':'),
              [
                [this.machine_name, this.machine_name_en].join(':'),
                _buttons.join(','),
                this.outputs,
                ""+this.dev_id,
                ""+this.rssi,
                ""+Math.floor(this.allow_from / 1000),
                ""+(Math.floor(this.allow_from / 1000) - Math.floor(this.allow_to / 1000)),
                this.passcode
              ]
            ]
          ]
        ],
        [this.call_button_dev_up, this.call_button_dev_down]
      ];
      var qr_str = JSON.stringify(qr);
      var path = "https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=" + qr_str;
      $("#dialog").empty();
      $("#dialog").append($('<img width="400" />').attr("src", path)).dialog({width: "auto",
        height: "auto",});
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
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
  margin-right: 40px;
  margin-bottom: 20px;
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
.choseNegativeFloor1 {
  width: 50px;
  height: 100px;
  text-align: center;
  line-height: 40px;
}
.choseNegativeFloor1 div input {
  width: 100%; height: 24px; border: 0; text-align: center;
}
.negativeFloor .choseNegative .choseNegativeFloor {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: 10px;
  font-size: 16px;
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
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-left: 10px;
  font-size: 16px;
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

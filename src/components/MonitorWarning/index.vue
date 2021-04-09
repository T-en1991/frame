<template>
  <data-wrapper label="告警统计" more="更多" @emitMore="emitMore">
    <!-- <p>noclearWarn:"10", // 未消除告警</p>
    <p>totalWarning:"10", // 累计告警</p>
    <p>noclearTip:"10", // 未消除提示</p>
    <p>noclearRecord:"10", // 未消除日志</p>
    <p>noclearWarning:"10", // 未消除警告</p>
    <p>noclearFault:"10", // 未消除故障</p> -->
    <div class="top-wrapper">
      <div class="new-defect">
        <div class="left">
          <img :src="imgs.unclearwarn" />
          <div class="val-wrapper">
            <span>未消除告警</span>
            <cell-limit
              :el="this.$attrs.data.noclearWarn"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </div>
      </div>

      <div class="new-defect">
        <div class="left">
          <img :src="imgs.totalwarn" />
          <div class="val-wrapper">
            <span>累计告警</span>
            <cell-limit
              :el="this.$attrs.data.totalWarn"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </div>
      </div>
    </div>

    <div class="defect-data-wrapper">
      <ul class="left">
        <li class="line-data bc0">
          <div class="val-wrapper">
            <span class="label">未消除提示</span>
            <cell-limit
              :el="this.$attrs.data.noclearTip"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </li>
        <li class="line-data bc1">
          <div class="val-wrapper">
            <span class="label">未消除日志</span>
            <cell-limit
              :el="this.$attrs.data.noclearRecord"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </li>
        <li class="line-data bc2">
          <div class="val-wrapper">
            <span class="label">未消除警告</span>
            <cell-limit
              :el="this.$attrs.data.noclearWarning"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </li>
        <li class="line-data bc3">
          <div class="val-wrapper">
            <span class="label">未消除故障</span>
            <cell-limit
              :el="this.$attrs.data.noclearFault"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </li>
      </ul>
      <div class="right">
        <render-echart
          ref="warning"
          v-if="hasData"
          style="width: 100%; height: 100%"
          :option="option"
          @overEvent="overEvent"
          @outEvent="outEvent"
        ></render-echart>
        <no-data v-else size="small"></no-data>
      </div>
    </div>
  </data-wrapper>
</template>

<script>
import DataWrapper from "../DataWrapper";
import * as DefectImg from "./img/index.js";
import RenderEchart from "@/components/RenderEchart";
import NoData from "@/components/NoData";
export default {
  name: "MonitorDefect",
  components: {
    DataWrapper,
    RenderEchart,
    NoData,
  },
  data() {
    return {
      imgs: DefectImg,
      option: {
        title: {
          show: true,
          text: 40,
          textStyle: {
            color: "#29e6ae",
            fontSize: 38,
            fontWeight: 700,
          },
          subtext: "警告",
          subtextStyle: {
            color: "#777",
            fontSize: 16,
          },
          itemGap: 5,
          left: "center",
          top: "55%",
        },
        legend: {
          top: 10,
          left: 20,
          icon: "circle",
          itemGap: 15,
          data: ["提示", "日志", "警告", "故障"],
          width: 200,
        },
        angleAxis: {
          max: 100,
          startAngle: 135, //开始角度
          clockwise: false, // 顺时针
          show: false, // 隐藏刻度线
        },
        radiusAxis: {
          type: "category",
          show: false,
        },
        polar: [
          {
            center: ["50%", "67%"], //中心点位置
            radius: "110%", //图形大小
          },
        ],
        series: [
          {
            type: "bar",
            z: 10,
            name: "提示",
            stack: "总数",
            data: [50],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 20,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#29E6AE",
              },
            },
            // hover高亮效果
            emphasis: {
              itemStyle: {
                borderWidth: 10,
                borderColor: "#2dfdbf",
                borderType: "solid",
              },
            },
          },
          {
            type: "bar",
            z: 10,
            name: "日志",
            stack: "总数",
            data: [25],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 30,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#47A2FF",
              },
            },
            // hover高亮效果
            emphasis: {
              itemStyle: {
                borderWidth: 10,
                borderColor: "#4eb2ff",
                borderType: "solid",
              },
            },
          },
          {
            type: "bar",
            z: 10,
            name: "警告",
            stack: "总数",
            data: [25],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 30,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#FFC21C",
              },
            },
            // hover高亮效果
            emphasis: {
              itemStyle: {
                borderWidth: 10,
                borderColor: "#ffd51e",
                borderType: "solid",
              },
            },
          },
          {
            type: "bar",
            z: 10,
            name: "故障",
            stack: "总数",
            data: [25],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 30,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#FF7575",
              },
            },
            // hover高亮效果
            emphasis: {
              itemStyle: {
                borderWidth: 10,
                borderColor: "#ff8080",
                borderType: "solid",
              },
            },
          },
        ],
      },
    };
  },
  // created(){
  //   this.initCharts()
  // },
  computed: {
    addVal() {
      return Math.abs(this.$attrs.data.monthNewPoint);
    },
    hasData() {
      return (
        this.$attrs.data.pieTip ||
        this.$attrs.data.pieRecord ||
        this.$attrs.data.pieWarning ||
        this.$attrs.data.pieFault
      );
    },
  },
  methods: {
    emitMore() {
      this.$emit("emitMore");
    },
    initCharts(v) {
      // <p>pieTip: '10', // 饼图提示</p>
      //   <p>pieRecord: '10', // 饼图日志</p>
      //   <p>pieWarning: '10', // 饼图告警</p>
      //   <p>pieFault: '10' // 饼图故障</p>

      const { pieTip, pieRecord, pieWarning, pieFault } = v;
      const _max = pieTip * 1 + pieRecord * 1 + pieWarning * 1 + pieFault * 1;
      this.option.angleAxis.max = _max;
      this.option.series[0].data[0] = pieTip;
      this.option.series[1].data[0] = pieRecord;
      this.option.series[2].data[0] = pieWarning;
      this.option.series[3].data[0] = pieFault;

      this.option.title.text = _max;
      this.option.title.subtext = "总数";

      const dataList = {
        提示: pieTip,
        日志: pieRecord,
        警告: pieWarning,
        故障: pieFault,
      };
      // lender fmtt
      this.option.legend.formatter = (name) => {
        // name 就是data中的枚举
        let value;
        for (let key in dataList) {
          if (key == name) {
            value = dataList[key];
          }
        }
        return name + " " + value;
      };
    },

    overEvent(p) {
      const { value, seriesName } = p;
      this.option.title.text = value;
      this.option.title.subtext = seriesName;
    },
    outEvent(p) {
      const { pieTip, pieRecord, pieWarning, pieFault } = this.$attrs.data;
      const _max = pieTip * 1 + pieRecord * 1 + pieWarning * 1 + pieFault * 1;
      this.option.title.text = _max;
      this.option.title.subtext = "总数";
    },
  },
  watch: {
    "$attrs.data": {
      handler(n) {
        this.initCharts(n);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin defect-block {
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 14px;
  }
  .val-wrapper {
    display: flex;
    align-items: baseline;
    font-size: 14px;
    color: #333;
    .label {
      width: 104px;
    }
    .val {
      font-size: 24px;
      font-weight: 700;
      color: #00b9cf;
      max-width: 40px;
      margin: 0 10px;
    }
  }
}
.top-wrapper {
  display: flex;
  justify-content: space-between;
}
.new-defect {
  width: 48%;
  display: flex;
  justify-content: space-between;
  background: #fff;
  box-sizing: border-box;
  padding: 10px 15px;
  .left {
    @include defect-block;
  }
  .right {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    font-weight: 700;
    &.up {
      color: #ff7462;
    }
    &.down {
      color: #00b9cf;
    }
    .val {
      max-width: 80px;
    }
    img {
      width: 10px;
      height: 20px;
      margin-left: 10px;
    }
  }
}

.defect-data-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: calc(100% - 80px);
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    li {
      width: 215px;
      height: 25%;
      background: #fff;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 0px 15px;
      &:last-child {
        margin-bottom: 0;
      }
      &.img-data {
        @include defect-block;
      }
      &.line-data {
        padding-left: 20px;
        @include defect-block;
        &.bc0 {
          border-left: solid 5px #29e6ae;
          .val {
            color: #29e6ae;
          }
        }
        &.bc1 {
          border-left: solid 5px #47a2ff;
          .val {
            color: #47a2ff;
          }
        }
        &.bc2 {
          border-left: solid 5px #ffc21c;
          .val {
            color: #ffc21c;
          }
        }
        &.bc3 {
          border-left: solid 5px #ff7575;
          .val {
            color: #ff7575;
          }
        }
      }
    }
  }
  .right {
    width: 100%;
  }
}
</style>

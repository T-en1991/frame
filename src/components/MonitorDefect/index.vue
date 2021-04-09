<template>
  <data-wrapper label="缺陷统计" more="更多" @emitMore="emitMore">
    <div class="new-defect">
      <div class="left">
        <img :src="imgs.newly" />
        <div class="val-wrapper">
          <span>当月新增缺陷</span>
          <cell-limit :el="this.$attrs.data.monthNew" class="val"></cell-limit>
          <span>条</span>
        </div>
      </div>
      <div v-if="hasPoint" class="right" :class="isAdd ? 'up' : 'down'">
        <span v-if="isAdd">+</span>
        <span v-else>-</span>
        <cell-limit class="val" :el="addVal"></cell-limit>
        <span>%</span>
        <img :src="isAdd ? imgs.up : imgs.down" />
      </div>
    </div>
    <div class="defect-data-wrapper">
      <ul class="left">
        <li class="img-data">
          <img :src="imgs.unfinish" alt="" />
          <div class="val-wrapper">
            <span style="width: 72px">未完成缺陷</span>
            <cell-limit :el="this.$attrs.data.ufTotal" class="val"></cell-limit>
            <span>条</span>
          </div>
        </li>
        <li class="line-data bc1">
          <div class="val-wrapper">
            <span class="label">未完成设备缺陷</span>
            <cell-limit
              :el="this.$attrs.data.ufDevice"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </li>
        <li class="line-data bc2">
          <div class="val-wrapper">
            <span class="label">未完成安全隐患</span>
            <cell-limit
              :el="this.$attrs.data.ufDanger"
              class="val"
            ></cell-limit>
            <span>条</span>
          </div>
        </li>
        <li class="line-data bc3">
          <div class="val-wrapper">
            <span class="label">未完成其他</span>
            <cell-limit :el="this.$attrs.data.ufOther" class="val"></cell-limit>
            <span>条</span>
          </div>
        </li>
      </ul>
      <div class="right">
        <render-echart
          ref="defect"
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
          subtext: "告警",
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
          data: ["设备缺陷", "安全隐患", "其它"],
          width: 200,
          // formatter: (name) => {
          //   let value;
          //   for (key in dataList) {
          //     if (key == name) {
          //       value = dataList[key];
          //     }
          //   }
          //   return name + ' ' + value;
          // }
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
            name: "设备缺陷",
            stack: "总数",
            data: [50],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 20,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#29E4E6",
              },
            },
            // hover高亮效果
            emphasis: {
              itemStyle: {
                borderWidth: 10,
                borderColor: "#2dfafd",
                borderType: "solid",
              },
            },
          },
          {
            type: "bar",
            z: 10,
            name: "安全隐患",
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
            name: "其它",
            stack: "总数",
            data: [25],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 30,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#8A85EE",
              },
            },
            // hover高亮效果
            emphasis: {
              itemStyle: {
                borderWidth: 10,
                borderColor: "#9792ff",
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
    hasPoint() {
      if (
        this.$attrs.data.monthNewPoint === "" ||
        this.$attrs.data.monthNewPoint === "null" ||
        this.$attrs.data.monthNewPoint === "NaN"
      ) {
        return false;
      } else {
        return true;
      }
    },
    isAdd() {
      return this.$attrs.data.monthNewPoint >= 0;
    },
    addVal() {
      return String(Math.abs(this.$attrs.data.monthNewPoint || ""));
    },
    hasData() {
      return (
        this.$attrs.data.pieDevice ||
        this.$attrs.data.pieDanger ||
        this.$attrs.data.pieOther
      );
    },
  },
  methods: {
    emitMore() {
      this.$emit("emitMore");
    },
    initCharts(v) {
      const _v = v || this.$attrs.data;
      const { pieDevice, pieDanger, pieOther } = _v;
      const _max = pieDevice * 1 + pieDanger * 1 + pieOther * 1;
      this.option.angleAxis.max = _max;
      this.option.series[0].data[0] = pieDevice;
      this.option.series[1].data[0] = pieDanger;
      this.option.series[2].data[0] = pieOther;
      this.option.title.text = _max;
      this.option.title.subtext = "总数";

      const dataList = {
        设备缺陷: pieDevice,
        安全隐患: pieDanger,
        其它: pieOther,
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
      const { pieDevice, pieDanger, pieOther } = this.$attrs.data;
      const _max = pieDevice * 1 + pieDanger * 1 + pieOther * 1;
      this.option.angleAxis.max = _max;
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
.new-defect {
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
        &.bc1 {
          border-left: solid 5px #29e4e6;
          .val {
            color: #29e4e6;
          }
        }
        &.bc2 {
          border-left: solid 5px #47a2ff;
          .val {
            color: #47a2ff;
          }
        }
        &.bc3 {
          border-left: solid 5px #8a85ee;
          .val {
            color: #8a85ee;
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

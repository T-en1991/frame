<template>
  <div class="d-static">
    <div class="label">{{ label }}</div>
    <div class="content">
      <div class="left">
        <ul class="total">
          <li>设备总数</li>
          <li>
            <cell-limit
              class="val"
              :style="{ color: theme }"
              :el="nodata ? 0 : total"
            ></cell-limit>
          </li>
          <li>个</li>
        </ul>
        <div class="online">
          <li class="circle">
            <span :style="{ background: theme }"></span>在线设备数
          </li>
          <li>
            <cell-limit
              class="val"
              :style="{ color: theme }"
              :el="nodata ? 0 : online"
            ></cell-limit>
          </li>
          <li>个</li>
        </div>
        <div class="outline">
          <li class="circle"><span></span>离线设备数</li>
          <li>
            <cell-limit class="val" :el="nodata ? 0 : outline"></cell-limit>
          </li>
          <li>个</li>
        </div>
      </div>
      <div class="right" style="margin: 0 10px 15px 0">
        <no-data v-if="nodata" size="mid" style="margin-right: 60px"></no-data>
        <render-echart
          v-else
          :width="160"
          :height="160"
          :option="option"
        ></render-echart>
      </div>
    </div>
  </div>
</template>

<script>
var data = {
  value: [30],
  nAmount: 1566557.14,
};

var color = "#29e6ae";
import NoData from "@/components/NoData";
import RenderEchart from "@/components/RenderEchart";
export default {
  name: "DStatic",
  components: {
    NoData,
    RenderEchart,
  },
  props: {
    theme: {
      default: "#29E6AE",
      type: String,
    },
    point: {
      defult: "10",
      type: String,
    },
    label: {
      default: "设备名称",
      type: String,
    },
    total: {
      type: String,
    },
    online: {
      type: String,
    },
    outline: {
      type: String,
    },
    nodata: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      option: {
        title: {
          text: 0 + "%",
          textStyle: {
            color: "#333",
            fontSize: 22,
          },
          subtext: "在线率",
          subtextStyle: {
            color: "#848484",
            fontSize: 12,
          },
          itemGap: 5,
          left: "center",
          top: "40%",
        },
        tooltip: {
          formatter: function (params) {
            return (
              '<span style="color: #fff;">在线率：' + params.value + "%</span>"
            );
          },
        },
        angleAxis: {
          max: 100,
          startAngle: 270, //开始角度
          clockwise: true, // 顺时针
          show: false, // 隐藏刻度线
        },
        radiusAxis: {
          type: "category",
          show: false,
        },
        polar: [
          {
            center: ["50%", "50%"], //中心点位置
            radius: "160%", //图形大小
          },
        ],
        series: [
          {
            type: "bar",
            z: 10,
            data: [],
            showBackground: false,
            coordinateSystem: "polar",
            roundCap: true, //圆头
            barWidth: 26,
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#ff0000",
              },
            },
          },
          {
            type: "pie",
            name: "细圆环",
            center: ["50%", "50%"], //位置
            radius: ["90%", "72%"], //利用半径控制细圆环的粗细
            silent: true, //无交互，即鼠标触摸无效果
            itemStyle: {
              normal: {
                color: "#bfbfbf",
              },
            },
            tooltip: {
              show: false,
            },
            label: {
              show: false,
            },
            data: [100],
          },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const _p = this.point;
      const _c = this.theme;
      this.option.title.text = _p + "%";
      this.option.title.textStyle.color = _c;
      this.option.series[0].data[0] = _p;
      this.option.series[0].itemStyle.normal.color = _c;
    },
  },
  watch: {
    theme(n) {
      this.option.title.textStyle.color = n;
      this.option.series[0].itemStyle.normal.color = n;
    },
    point(n) {
      this.option.title.text = n + "%";
      this.option.series[0].data[0] = n;
    },
  },
};
</script>

<style lang="scss" scoped>
.d-static {
  .val {
    font-size: 24px;
    font-weight: 700;
  }

  .label {
    font-size: 16px;
    color: #333;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 182px;
      .total,
      .online,
      .outline {
        display: flex;
        align-items: baseline;
        li {
          list-style: none;
          .val {
            margin-left: 12px;
            margin-right: 8px;
            max-width: 60px;
          }
        }
      }

      .total {
        font-size: 16px;
        color: #333;
        margin-bottom: 30px;
      }

      .online,
      .outline {
        font-size: 14px;
        .circle {
          span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #bfbfbf;
            margin-right: 6px;
            vertical-align: -1px;
          }
        }
      }

      .online {
        margin-top: 10px;
      }

      .outline {
        .val {
          color: #a0a0a0;
        }
      }
    }
  }
}
</style>

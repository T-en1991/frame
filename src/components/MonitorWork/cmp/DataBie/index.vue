<template>
  <div class="data-bie">
    <!-- {{max}}
    {{val}}
    {{theme}}
    {{label}} -->
    <render-echart
      style="width: 100%; height: 100%"
      :option="option"
    ></render-echart>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script>
import RenderEchart from "@/components/RenderEchart";
export default {
  name: "DataBie",
  components: {
    RenderEchart,
  },
  props: {
    label: {
      default: "缺陷工单 (条)",
      type: String,
    },
    max: {
      default: "100",
      type: String,
    },
    val: {
      default: "50",
      type: String,
    },
    theme: {
      default: "#00BBA3",
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      option: {
        title: {
          show: true,
          text: 50,
          textStyle: {
            color: "#ff0000",
            fontSize: 22,
            fontWight: 700,
          },
          left: "center",
          top: "36%",
        },
        angleAxis: {
          max: 100,
          startAngle: 225, //开始角度
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
            radius: "170%", //图形大小
          },
        ],
        series: [
          {
            type: "bar",
            z: 10,
            stack: "总数",
            data: [37.5],
            showBackground: false,
            coordinateSystem: "polar", //极坐标
            roundCap: true, //圆头
            barWidth: 10,
            itemStyle: {
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00BBA355", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#00BBA3", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 5,
            },
          },
          {
            type: "bar",
            z: 8,
            stack: "总数",
            data: [37.5],
            showBackground: false,
            coordinateSystem: "polar", //极坐标
            roundCap: true, //圆头
            barWidth: 30,
            itemStyle: {
              opacity: 1,
              color: "#ddd",
            },
            // hover效果
            emphasis: {
              itemStyle: {
                opacity: 1,
                color: "#ddd",
              },
            },
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
      const _max = this.max === "0" || this.max === "" ? 100 : this.max;
      const _val = this.val || 0;
      const _c = this.theme;
      const _co = `${_c}99`;
      // 实际展示得圆环数值
      const _rvp = (_max - _max / 4) * (_val / _max);
      // 未展示得圆环数值
      const _unRvp = (_max - _max / 4) * (1 - _val / _max);

      // 数据赋值
      this.option.angleAxis.max = _max;
      this.option.title.text = _val || "--";
      this.option.series[0].data = [_rvp];
      this.option.series[1].data = [_unRvp];

      // UI赋值
      this.option.title.textStyle.color = _c;
      this.option.series[0].itemStyle.color.colorStops[0].color = _c;
      this.option.series[0].itemStyle.color.colorStops[1].color = _co;
      this.option.series[0].itemStyle.shadowColor = `${_c}55`;
    },
  },
  watch: {
    max(n) {
      console.log(n);
      this.init();
    },
    val(n) {
      console.log(n);
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.data-bie {
  width: 100%;
  height: 100%;
  .label {
    text-align: center;
    font-size: 14px;
    color: #333;
    margin-top: -6px;
  }
}
</style>

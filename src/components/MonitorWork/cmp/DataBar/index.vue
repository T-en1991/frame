<template>
  <div style="width: 100%; height: 100%">
    <render-echart
      v-if="hasBar"
      style="width: 100%; height: 100%"
      :option="option"
    ></render-echart>
    <no-data size="mid" v-else></no-data>
  </div>
</template>

<script>
import RenderEchart from "@/components/RenderEchart";
import NoData from "@/components/NoData";
export default {
  name: "DataLine",
  components: {
    RenderEchart,
    NoData,
  },
  data() {
    return {
      option: {
        title: {
          subtext: `{a|--➤}平均值`,
          subtextStyle: {
            color: "#333",
            rich: {
              a: {
                color: "#a1a1a1",
              },
            },
          },
          left: 60,
          top: -10,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          top: 0,
          left: 126,
          data: ["平均值", "缺陷工单", "维护工单", "巡检工单", "维修工单"],
          itemWidth: 10,
          itemHeight: 10,
        },
        grid: {
          top: 40,
          left: 10,
          right: "11%",
          bottom: "20",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位/条",
            nameGap: 22,
          },
        ],
        dataZoom: [
          {
            type: "slider", //滑动条型数据区域缩放组件
            height: 8, //组件高度-即粗细
            backgroundColor: "#d7d7d7",
            dataBackground: {
              lineStyle: {
                color: "#d7d7d7",
              },
              areaStyle: {
                color: "#d7d7d7",
                opacity: 1,
              },
            },
            fillerColor: "#009db0",
            handleIcon: "M40,20  A30,30 0 1,0 70,70 M40,20  A30,30 0 0,1 70,70",
            handleSize: "120%",
            handleStyle: {
              color: "#fff",
              borderColor: "#1dabae",
              borderWidth: 2,
            },
            bottom: "10",
          },
        ],
        series: [
          {
            name: "缺陷工单",
            type: "bar",
            barWidth: 5,
            itemStyle: {
              color: "#00baa3",
              barBorderRadius: [10, 10, 0, 0], //（顺时针左上，右上，右下，左下）
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                },
              ],
            },
            data: [
              2031,
              1793,
              3640,
              2593,
              4377,
              3201,
              2275,
              3289,
              3356,
              2859,
              4244,
              3945,
            ],
          },
          {
            name: "维护工单",
            type: "bar",
            barWidth: 5,
            itemStyle: {
              color: "#00c6db",
              barBorderRadius: [10, 10, 0, 0], //（顺时针左上，右上，右下，左下）
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                },
              ],
            },
            data: [
              1043,
              1456,
              1900,
              1200,
              2100,
              1870,
              980,
              1569,
              1130,
              1490,
              2300,
              2210,
            ],
          },
          {
            name: "巡检工单",
            type: "bar",
            barWidth: 5,
            itemStyle: {
              color: "#019bff",
              barBorderRadius: [10, 10, 0, 0], //（顺时针左上，右上，右下，左下）
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                },
              ],
            },
            data: [787, 571, 999, 341, 231, 812, 735, 231, 322, 712, 1230, 870],
          },
          {
            name: "维修工单",
            type: "bar",
            barWidth: 5,
            itemStyle: {
              color: "#476cfc",
              barBorderRadius: [10, 10, 0, 0], //（顺时针左上，右上，右下，左下）
            },
            markLine: {
              data: [
                {
                  type: "average",
                  name: "平均值",
                },
              ],
            },
            data: [
              707,
              571,
              1659,
              1341,
              1231,
              812,
              935,
              1231,
              122,
              912,
              930,
              1070,
            ],
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
      const { defect, uphold, inspect, repair } = this.$attrs.data;
      this.option.series[0].data = defect;
      this.option.series[1].data = uphold;
      this.option.series[2].data = inspect;
      this.option.series[3].data = repair;
    },
  },
  computed: {
    hasBar() {
      const { defect, uphold, inspect, repair } = this.$attrs.data;
      const _b =
        defect.length || uphold.length || inspect.length || repair.length;
      return Boolean(_b);
    },
  },
  watch: {
    "$attrs.data": {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
};
</script>

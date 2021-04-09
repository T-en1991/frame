<template>
  <div class="site-charts">
    <render-echart
      v-if="$attrs.data.length"
      style="width: 100%; height: calc(100% - 190px)"
      :option="option"
    ></render-echart>
    <div v-else style="width: 100%; height: calc(100% - 190px)">
      <no-data size="mini"></no-data>
    </div>
  </div>
</template>
<script>
import RenderEchart from "@/components/RenderEchart";
import NoData from "@/components/NoData";
export default {
  name: "SiteCharts",
  components: {
    RenderEchart,
    NoData,
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            rotate: 30,
            interval: 1,
            align: "center",
            margin: "18",
          },
          data: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00",
          ],
        },
        yAxis: {
          name: "功率(kW)",
          type: "value",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          // position: function (point, params, dom, rect, size) {
          //     // 固定在顶部
          //     return [point[0], '10%'];
          // },
          backgroundColor: "#fff",
          textStyle: {
            color: "#333",
          },
          formatter: "{b} {c}kW",
        },
        grid: {
          right: "3%",
          left: "7%",
          bottom: 30,
        },
        legend: {
          data: ["功率趋势"],
          top: "8%",
          right: "3%",
          itemHeight: 8,
          itemWidth: 12,
        },
        series: [
          {
            name: "功率趋势",
            data: [
              820,
              932,
              901,
              934,
              222,
              901,
              934,
              222,
              901,
              934,
              222,
              123,
              1320,
              820,
              932,
              901,
              934,
              222,
              123,
              932,
              901,
              934,
              222,
              123,
              1320,
            ],
            type: "line",
            symbol: "circle",
            lineStyle: {
              color: "#00B9CF",
            },
            itemStyle: {
              color: "#00B9CF",
              borderColor: "#00B9CF",
              borderWidth: 2.5,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00B9CF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      },
    };
  },
  created() {
    this.option.series[0].data = this.$attrs.data;
  },
  watch: {
    "$attrs.data": {
      handler(n) {
        this.option.series[0].data = n;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.site-charts {
  height: 100%;
}
</style>

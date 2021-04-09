<template>
  <div
    class="eacharts-wrapper"
    :ref="'chart' + this.cKey"
    :style="chartsWrapperStyle"
  ></div>
</template>

<script>
import eacharts from "echarts";
import _ from "lodash";
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          title: { text: "option默认柱状图" },
          tooltip: {},
          xAxis: {
            data: ["java", "node", "js", "py", "vue", "rn"],
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        };
      },
    },
    cKey: {
      type: String,
      default: () => {
        return new Date().getTime() + "";
      },
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      echartsCtx: null,
      chartsWrapperStyle: {},
    };
  },
  created() {
    this.chartsWrapperStyle = {
      width: this.width + "px",
      height: this.height + "px",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      if (this.loading) {
        this.showLoading();
      }
      this.render();
      this.eConsole();
      this.resize();
    });
  },
  methods: {
    init() {
      this.echartsCtx = eacharts.init(this.$refs[`chart${this.cKey}`]);
    },
    render(n) {
      this.echartsCtx.setOption(n || this.option);
    },
    resize() {
      const _this = this;
      window.addEventListener(
        "resize",
        _.debounce(function () {
          _this.echartsCtx.resize();
        }, 200)
      );
    },
    // 给echarts绑定事件
    eConsole() {
      this.echartsCtx.on("mouseover", this.overFunc);
      this.echartsCtx.on("mouseout", this.outFunc);
    },

    // 事件处理函数
    overFunc(param) {
      // param: 点击对象的所有相关参数
      this.$emit("overEvent", param);
    },
    outFunc(param) {
      // param: 点击对象的所有相关参数
      this.$emit("outEvent", param);
    },

    showLoading() {
      this.echartsCtx.showLoading({
        text: "数据正在努力加载...",
        textStyle: { fontSize: 30, color: "#444" },
        effectOption: { backgroundColor: "rgba(0, 0, 0, .3)" },
      });
    },
    hideLoading() {
      this.echartsCtx.hideLoading();
    },
  },
  watch: {
    loading(n) {
      if (!n) {
        this.render();
        this.hideLoading();
      } else {
        this.showLoading();
      }
    },
    option: {
      handler(n) {
        this.render(n);
      },
      deep: true,
    },
  },
};
</script>

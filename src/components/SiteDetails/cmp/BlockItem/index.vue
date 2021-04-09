<template>
  <div class="item-wrapper">
    <div class="header" :style="styles.bgh">
      <img :src="imgs[type]" alt="" />
      <span>{{ lables[type] }}</span>
    </div>
    <div class="content" :style="styles.bgc">
      <ul class="content-item" v-for="(item, index) in option" :key="index">
        <li class="label" :style="styles.valLable">{{ item.label }}</li>
        <li class="val-wrapper" :style="styles.color">
          <cell-limit class="val" :el="item.val"></cell-limit>
          <span class="unit">{{ item.unit }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import * as Img from "./img/index.js";
export default {
  name: "BlockItem",
  props: {
    type: {
      default: "dl",
      type: String,
    },
    label: {
      default: "电量总览",
      type: String,
    },
  },
  data() {
    return {
      imgs: Img,
      styles: {
        color: null,
        bgh: null,
        bgc: null,
        valLable: null,
      },
      themes: {
        dl: "#37d3a5",
        df: "#0BC8DE",
        fh: "#47A2FF",
        gj: "#EEB61E",
        qx: "#F36C6C",
        gd: "#A19DF1",
      },
      lables: {
        dl: "电量总览",
        df: "电费总览",
        fh: "负荷情况",
        gj: "告警总览",
        qx: "缺陷总览",
        gd: "工单总览",
      },
      valLableWidth: {
        dl: "28",
        df: "28",
        fh: "56",
        gj: "56",
        qx: "56",
        gd: "56",
      },
      options: {
        dl: [
          {
            label: "本月",
            val: "123321321",
            unit: "kWh",
          },
          {
            label: "上月",
            val: "123",
            unit: "kWh",
          },
          {
            label: "今年",
            val: "123",
            unit: "kWh",
          },
          {
            label: "去年",
            val: "123",
            unit: "kWh",
          },
        ],
        df: [
          {
            label: "本月",
            val: "123321321",
            unit: "元",
          },
          {
            label: "上月",
            val: "123",
            unit: "元",
          },
          {
            label: "今年",
            val: "123",
            unit: "元",
          },
          {
            label: "去年",
            val: "123",
            unit: "元",
          },
        ],
        fh: [
          {
            label: "本月最大",
            val: "123321321",
            unit: "kW",
          },
          {
            label: "上月最大",
            val: "123",
            unit: "kW",
          },
          {
            label: "今年最大",
            val: "123",
            unit: "kW",
          },
          {
            label: "去年最大",
            val: "123",
            unit: "kW",
          },
        ],
        gj: [
          {
            label: "未完成",
            val: "123321321",
            unit: "条",
          },
          {
            label: "本月新增",
            val: "123",
            unit: "条",
          },
          {
            label: "今年新增",
            val: "123",
            unit: "条",
          },
          {
            label: "累计新增",
            val: "123",
            unit: "条",
          },
        ],
        qx: [
          {
            label: "未完成",
            val: "123321321",
            unit: "条",
          },
          {
            label: "本月新增",
            val: "123",
            unit: "条",
          },
          {
            label: "今年新增",
            val: "123",
            unit: "条",
          },
          {
            label: "累计新增",
            val: "123",
            unit: "条",
          },
        ],
        gd: [
          {
            label: "缺陷工单",
            val: "123321321",
            unit: "条",
          },
          {
            label: "维护工单",
            val: "123",
            unit: "条",
          },
          {
            label: "巡检工单",
            val: "123",
            unit: "条",
          },
          {
            label: "维修工单",
            val: "123",
            unit: "条",
          },
        ],
      },
      option: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //   初始化样式
      const _c = this.themes[this.type];
      this.styles.color = { color: _c };
      this.styles.bgh = { backgroundColor: `${_c}` };
      this.styles.bgc = { backgroundColor: `${_c}11` };
      this.styles.valLable = { width: this.valLableWidth[this.type] + "px" };
      // 初始化数据
      const _op = this.options[this.type];
      const [d1, d2, d3, d4] = this.$attrs.data;
      _op[0].val = d1;
      _op[1].val = d2;
      _op[2].val = d3;
      _op[3].val = d4;
      this.option = _op;
    },
  },
  watch: {
    "$attrs.data": {
      handler(v) {
        this.init();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  border-radius: 4px;
  overflow: hidden;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    color: #ffffff;
    box-sizing: border-box;
    padding: 0 20px;
    height: 42px;
    img {
      width: 23px;
      height: 23px;
    }
    span {
      margin-left: 8px;
    }
  }
  .content {
    padding-left: 50px;
    padding-top: 5px;
    padding-bottom: 10px;
    .content-item {
      display: flex;
      align-items: baseline;
      height: 30px;
      margin-bottom: 10px;
      .label {
        font-size: 14px;
        color: #666;
        text-align: justify;
        margin-right: 10px;
        &:after {
          display: inline-block;
          width: 100%;
          content: "";
        }
      }
      .val-wrapper {
        display: flex;
        align-items: baseline;
        .val {
          font-size: 24px;
          font-weight: 700;
          max-width: 100px;
          margin-right: 6px;
        }
        .unit {
          font-size: 18px;
        }
      }
    }
  }
}
</style>

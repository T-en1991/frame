<template>
  <div class="site-block" :style="style">
    <div class="header">
      <img :src="img" />
      <span :style="{ color: this.color[this.type] }">{{ label }}</span>
    </div>
    <div class="val-wrapper" :style="{ color: this.color[this.type] }">
      <cell-limit :el="value" class="val">1000</cell-limit>
      <span class="unit">个</span>
    </div>
  </div>
</template>

<script>
import * as SiteImg from "./img/index.js";
export default {
  name: "SiteBlock",
  props: {
    type: {
      default: "total",
      type: String,
    },
    value: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      color: {
        total: "#00B9CF",
        warning: "#FF2B2C",
        outline: "#666666",
      },
      text: {
        total: "站点总数",
        warning: "告警站点数",
        outline: "离线站点数",
      },
      img: null,
      style: {},
      label: "",
    };
  },
  created() {
    const _c = this.color[this.type];
    this.img = SiteImg[this.type];
    this.label = this.text[this.type];
    this.style = {
      border: `solid 2px ${_c}`,
      background: `${_c}15`,
    };
  },
};
</script>
<style lang="scss" scoped>
.site-block {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    span {
      font-size: 14px;
    }
  }
  .val-wrapper {
    display: flex;
    align-items: baseline;
    font-weight: 700;
    .val {
      font-size: 20px;
      max-width: 120px;
    }
    .unit {
      font-size: 14px;
    }
  }
}
</style>

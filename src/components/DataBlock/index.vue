<template>
  <div class="data-block" :style="{ ...border }">
    <div class="header" :style="{ ...header }">{{ title }}</div>
    <div class="content" :style="{ ...bg, ...color }">
      <cell-limit class="val" :el="val"></cell-limit>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataBlock",
  props: {
    theme: {
      default: "#EEB61E",
      type: String,
    },
    title: {
      default: "日新增缺陷 (条)",
      type: String,
    },
    val: {
      default: "0",
      type: String,
    },
  },
  data() {
    return {
      border: null,
      header: null,
      bg: null,
      color: null,
    };
  },
  created() {
    const _t = this.theme;
    this.border = {
      borderColor: _t,
    };
    this.header = {
      background: `linear-gradient(180deg, ${_t}8c 0%,${_t} 100%)`,
    };
    this.bg = {
      background: `${_t}21`,
    };
    this.color = {
      color: _t,
    };
  },
};
</script>

<style lang="scss" scoped>
.data-block {
  width: 100%;
  height: 100%;
  // background: #000;
  border: 2px solid #eeb61e;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  .header {
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    // background: linear-gradient(180deg, #eeb61e8c 0%, #eeb61e 100%);
  }
  .content {
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 30px;
    // color: #eeb61e;
    font-weight: 700;
    // background: #eeb61e21;
    align-items: center;
    .val {
      max-width: 200px;
    }
  }
}
</style>

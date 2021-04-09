<!--

该公共组件用于文本显示的溢出处理；

api如下：
  1，el: 组件所需要显示的元素。默认为空
  2，emptyText: 空文本。 默认: --
用法如下：
  1，<cell-limit el="example" emptyText="--"></cell-limit>
注意：
  1，该组件可支持文本变化，自动触发tooltip
  2，该组件不支持标签宽度变化。

-->

<template>
  <div>
    <el-tooltip
      effect="dark"
      :placement="tooltipProps.placement"
      :popper-class="tooltipProps.popperClass"
      :content="showText"
      :disabled="!showTooltip"
    >
      <div ref="cell-limit-ref" class="ellipse">
        <pre style="display: inline" ref="text-ref">{{ showText }}</pre>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "cellLimit",
  props: {
    el: {
      default: "",
    },
    tooltipProps: {
      type: Object,
      default: function () {
        return {
          placement: "top-start",
          popperClass: "",
        };
      },
    },
    emptyText: {
      type: String,
      default: "--",
    },
  },
  data() {
    return {
      showTooltip: false,
      showText: "",
    };
  },
  mounted() {
    this.showText = this.getShowText(this.el);
    setTimeout(() => {
      this.showTooltip = this.isShowTooltip(this.el);
    });
  },
  methods: {
    // 溢出则显示tooltip
    isShowTooltip() {
      let wrap = this.$refs["cell-limit-ref"];
      let text = this.$refs["text-ref"];
      if (wrap && text) {
        return wrap.offsetWidth < text.offsetWidth;
      } else {
        return false;
      }
    },
    // 显示文本
    getShowText(val) {
      if (!val) {
        return this.emptyText;
      } else if (typeof val !== "string") {
        return val + "";
      } else {
        return val;
      }
    },
  },
  watch: {
    // 监听传入元素
    el(value) {
      // 计算显示文本
      this.showText = this.getShowText(value);
      // 计算是否显示tooltip
      setTimeout(() => {
        this.showTooltip = this.isShowTooltip(value);
      });
    },
  },
};
</script>

<style scoped>
.ellipse {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

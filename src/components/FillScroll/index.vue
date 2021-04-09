<template>
  <el-scrollbar :style="'height:' + containerHeight + 'px;'">
    <div :style="'min-width:' + (minWidth ? minWidth + 'px' : '100%')">
      <slot></slot>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    // 其它元素已经占用的高度
    usedHeight: {
      type: Number,
      default: 0,
    },
    // 容器内容的最小width
    minWidth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      containerHeight: "",
      contentMinWidth: "",
    };
  },
  mounted() {
    this.caclHeight();
    this.windowResize();
  },
  methods: {
    caclHeight() {
      const bodyHeight = document.body.clientHeight;
      const usedHeight = this.usedHeight;
      this.containerHeight = bodyHeight - usedHeight;
    },
    windowResize() {
      window.onresize = () => {
        this.caclHeight();
      };
    },
  },
};
</script>

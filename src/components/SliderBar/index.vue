<template>
  <div class="slider-bar">
    <ul class="bar-item">
      <li class="index" :class="normal ? 'bg' : ''" :style="styles.bg">
        {{ $attrs.data.index }}
      </li>
      <li class="label">
        <cell-limit :el="$attrs.data.siteName"></cell-limit>
      </li>
      <li class="slider-bg">
        <div
          class="slider"
          :style="{
            width: ($attrs.data.val * 100) / $attrs.data.max + '%',
            ...styles.bg,
          }"
          :class="normal ? 'bg' : ''"
        ></div>
      </li>
      <li class="val-wrapper">
        <cell-limit class="val" :el="$attrs.data.val"></cell-limit>
        <span class="unit">{{ $attrs.data.unit }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SliderBar",
  props: {
    normal: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "#ff7575",
    },
  },
  data() {
    return {
      styles: {
        bg: null,
        color: null,
      },
    };
  },
  created() {
    const _c = this.theme;
    this.styles.bg = {
      backgroundColor: `${_c}`,
    };

    this.styles.color = {
      color: `${_c}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider-bar {
  width: 100%;
  .bar-item {
    display: flex;
    align-items: center;
    .index {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 12px;
      text-align: center;
      margin-right: 8px;
      color: #fff;
      &.bg {
        color: #333;
        background-color: transparent !important;
      }
    }
    .label {
      width: 80px;
      margin-right: 0px;
    }
    .slider-bg {
      width: calc(100% - 170px);
      background: #eeeeee;
      height: 6px;
      border-radius: 3px;
      .slider {
        height: 100%;
        border-radius: 3px;
        transition: all 0.3s;
        &.bg {
          background-color: #6fd4e0 !important;
        }
      }
    }
    .val-wrapper {
      display: flex;
      width: 46px;
      margin-left: 10px;
      font-size: 12px;
      color: #333;
      .val {
        max-width: 24px;
      }
    }
  }
}
</style>

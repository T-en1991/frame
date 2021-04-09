<template>
  <div
    class="html-input__wrapper"
    :style="width ? { width: width + 'px' } : { width: 'inherit' }"
    :class="check ? 'type-check' : ''"
  >
    <div class="html-input" :style="style" @click="selectTags">
      <el-scrollbar :style="scrollStyle" v-if="value.length">
        <el-tag
          v-for="(item, index) in value"
          :key="index"
          :closable="!check"
          @close="delTag(index)"
          >{{ item[prop.lable] }}</el-tag
        >
      </el-scrollbar>
      <div class="placeholder" v-else>{{ placeholder }}</div>
    </div>
    <div class="choose-length">共{{ value.length }}{{ unit }}</div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    prop: {
      type: Object,
      default: () => {
        return {
          lable: "lable",
          value: "value",
        };
      },
    },
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "80",
    },
    unit: {
      type: String,
      default: "条",
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      style: {},

      scrollStyle: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.width) {
        this.style.width = `${this.width}px`;
      } else {
        this.style.width = "inherit";
      }
      this.style.height = `${this.height}px`;
      this.scrollStyle.height = this.height - 12 + "px";
    },
    delTag(index) {
      const data = [].concat(this.value);
      data.splice(index, 1);
      this.$emit("delTagEvent");
      this.emitInput(data);
    },
    selectTags() {
      if (this.check) {
        return false;
      }
      this.$emit("emitClick");
    },
    emitInput(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.html-input__wrapper {
  border: solid 1px #dedede;
  border-radius: 5px;
  &:hover {
    border-color: #3492fc;
  }
  &.type-check {
    border: solid 1px #dedede;
  }
  overflow: hidden;
  .choose-length {
    font-size: 12px;
    color: #343434;
    background: #f7f9fa;
    box-sizing: border-box;
    padding-right: 14px;
    text-align: right;
  }
}
.html-input {
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 0;
  background: #fff;
  cursor: pointer;
  .el-tag {
    margin: 0 2px;
  }
  .placeholder {
    color: #999;
    font-size: 14px;
    line-height: 14px;
  }
}
</style>

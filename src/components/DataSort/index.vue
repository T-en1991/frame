<template>
  <el-popover
    style="padding: 0"
    placement="right-end"
    :disabled="this.value.length <= 1"
    width="300"
    trigger="click"
    v-model="visible"
    @show="show"
    @hide="
      renderData = false;
      option = value;
    "
  >
    <vuedraggable
      v-model="option"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group
        tag="ul"
        type="transition"
        :name="!drag ? 'flip-list' : null"
        class="data__wrapper tpl-scrollbar__wrapper"
      >
        <li v-for="(item, index) in option" :key="index + '_bindindex'">
          <div><slot name="data-item" :row="item"></slot></div>
        </li>
      </transition-group>
    </vuedraggable>

    <div class="drap-btns__wrapper">
      <el-button @click="handleCancle">取消</el-button>
      <el-button @click="handleConfim" type="primary">确定</el-button>
    </div>

    <el-button
      type="text"
      slot="reference"
      :class="this.value.length <= 1 ? 'popver-btn-disable' : ''"
    >
      <slot name="data-button"></slot>
    </el-button>
  </el-popover>
</template>

<script>
import vuedraggable from "vuedraggable";
export default {
  components: {
    vuedraggable,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drag: false,
      visible: false,
      renderData: false,
      option: this.value,
    };
  },
  methods: {
    show() {
      this.renderData = false;
      this.option = this.value;
    },
    // 确定操作后
    handleConfim() {
      // console.log(this.value)
      // console.log(this.option)
      this.$emit("input", this.option);
      this.$emit("confirm", this.option);
      this.visible = false;
    },
    handleCancle() {
      this.option = this.value;
      this.$emit("cancle", this.option);
      this.visible = false;
    },
    close() {
      this.option = this.value;
      this.visible = false;
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.popver-btn-disable {
  cursor: not-allowed;
  opacity: 0.6;
}
.data__wrapper {
  height: 300px;
  margin-right: -12px;
  margin-left: -12px;
  & > li {
    line-height: 32px;
    padding-left: 14px;
    padding-right: 14px;
    cursor: pointer;
    &:hover {
      background: #f5faff;
    }
  }
}

.drap-btns__wrapper {
  display: flex;
  justify-content: center;
  padding-top: 12px;
  border-top: solid 1px #d9d9d9;
}
// 过度动画
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #409eff;
}
</style>

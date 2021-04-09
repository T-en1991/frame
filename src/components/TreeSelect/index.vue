<template>
  <el-select
    :placeholder="selectPlaceholder"
    :value="valueTitle"
    :clearable="clearable"
    @clear="reset"
    :disabled="disabled"
  >
    <el-input
      v-if="filter"
      class="selectInput"
      :placeholder="placeholder"
      v-model="filterText"
    ></el-input>

    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        id="tree-option"
        ref="selectTree"
        :accordion="accordion"
        check-strictly
        show-checkbox
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :filter-node-method="filterNode"
        @check-change="handleChange"
      ></el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "el-tree-select",
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "value", // ID字段名
          label: "label", // 显示名称
          children: "children", // 子级字段名
        };
      },
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 初始值 */
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "检索关键字";
      },
    },
    selectPlaceholder: {
      type: String,
      default: () => {
        return "检索关键字";
      },
    },
    filter: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      filterText: "",
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
    };
  },
  mounted() {
    // this.initHandle();
  },
  methods: {
    // 初始化值
    initHandle() {
      if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
          this.props.label
        ]; // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
      }
      this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },
    // 清除选中
    reset() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultExpandedKey = [];
      // this.clearSelected();
      this.$refs.selectTree.setCheckedKeys([]);
      this.$emit("input", []);
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
    filterNode(value, data) {
      const _k = this.props.label;
      if (!value) return true;
      return data[_k].indexOf(value) !== -1;
    },

    // 树形节点选中回调函数
    handleChange() {
      console.log(this.$refs.selectTree.getCheckedNodes());
      const selectData = this.$refs.selectTree.getCheckedNodes();
      this.valueTitle = selectData
        .map((item) => item[this.props.label])
        .join(",");
      this.$emit(
        "input",
        selectData.map((item) => item[this.props.value])
      );
    },
  },
  watch: {
    // value() {
    //   this.valueId = this.value;
    //   this.initHandle();
    // },
    filterText(val) {
      this.$refs.selectTree.filter(val);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  // max-height: 274px;
  padding: 0;
  overflow: hidden;
  // overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li /deep/ .el-tree .el-tree-node__content {
  // height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree /deep/ .is-checked + .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
// .el-tree /deep/ .is-current .el-tree-node__children .el-tree-node__label {
//   color: #606266;
//   font-weight: normal;
// }
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>

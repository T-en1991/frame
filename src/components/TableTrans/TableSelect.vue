<template>
  <div class="table-select">
    <slot name="seach"></slot>
    <el-table
      style="height: 407px"
      shadow="never"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <i class="el-icon-warning"></i>
        <span>{{ emptyText }}</span>
      </template>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="text-overflow" v-if="!item.fmtt">
            {{ scope.row[item.prop] || "--" }}
          </div>
          <div class="text-overflow" v-else>
            <span v-if="item.fmtt.hasOwnProperty(scope.row[item.prop])">{{
              item.fmtt[scope.row[item.prop]]
            }}</span>
            <span v-else>暂无配置</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <slot name="pagination"></slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    column: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      emptyText: "当前无数据",
    };
  },
  methods: {
    handleSelectionChange(v) {
      // this.splitData(v)
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>

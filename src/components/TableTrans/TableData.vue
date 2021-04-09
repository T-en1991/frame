<template>
  <div class="table-data">
    <slot name="seach"></slot>
    <el-table
      style="width: 100%; height: 407px"
      v-loading="loadding"
      ref="table"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <i class="el-icon-warning"></i>
        <span>{{ $attrs.emptyText }}</span>
      </template>
      <el-table-column
        type="selection"
        width="55"
        :selectable="isSelect"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        show-overflow-tooltip
        :align="item.align || 'left'"
      >
        <!-- <template slot-scope="scope">
            <span v-if="!item.fmtt">
              {{scope.row[item.prop]}}
            </span>
            <span v-else>
              {{item.fmtt}}
            </span>
          </template>-->

        <template slot-scope="scope">
          <div class="text-overflow" v-if="!item.fmtt">
            {{ scope.row[item.prop] || "--" }}
          </div>
          <div class="text-overflow" v-else>
            <span v-if="item.fmtt.hasOwnProperty(scope.row[item.prop])">
              {{ item.fmtt[scope.row[item.prop]] }}
            </span>
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
    prop: {
      type: Object,
      default: () => {
        return {
          id: "id",
        };
      },
    },

    loadding: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.checkData();
  },
  methods: {
    // 初始化值
    handleSelectionChange(v) {
      this.$emit("input", v);
    },
    isSelect(r) {
      return !r.disable;
    },
    checkData(v) {
      const _data = [].concat(v || this.data);
      const ids = _data
        .filter((item) => item.disable)
        .map((item) => item[this.prop.id]);
      this.$nextTick(() => {
        _data.forEach((row) => {
          if (ids.indexOf(row[this.prop.id]) >= 0) {
            this.$refs.table.toggleRowSelection(row, true);
          }
        });
      });
    },
  },
  watch: {
    data(nv) {
      this.checkData(nv);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-data {
  .text-overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    // text-align: left;
  }
}
</style>

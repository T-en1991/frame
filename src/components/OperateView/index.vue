<template>
  <div>
    <el-table :data="data" v-loading="loading" style="width: 100%">
      <template slot="empty">
        <i class="el-icon-warning"></i>
        <span>当前无数据</span>
      </template>

      <el-table-column label="参数名称" min-width="40%">
        <template slot-scope="scope">
          <cell-limit :el="scope.row.name"></cell-limit>
        </template>
      </el-table-column>

      <el-table-column label="参数说明" min-width="60%">
        <template slot-scope="scope">
          <cell-limit :el="scope.row.desc"></cell-limit>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

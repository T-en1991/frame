<template>
  <div>
    <el-table :data="data" v-loading="loading" style="width: 100%">
      <template slot="empty">
        <i class="el-icon-warning"></i>
        <span>当前无数据</span>
      </template>

      <el-table-column label="参数名称" min-width="25%">
        <template slot-scope="scope">
          <cell-limit :el="scope.row.name"></cell-limit>
        </template>
      </el-table-column>

      <el-table-column label="参数类型" min-width="20%">
        <template slot-scope="scope">
          <cell-limit
            :el="paraFormat.paraTypeFormat(scope.row.type)"
          ></cell-limit>
        </template>
      </el-table-column>

      <el-table-column label="参数说明" min-width="44%">
        <template slot-scope="scope">
          <cell-limit :el="paraFormat.paraDescFormat(scope.row)"></cell-limit>
        </template>
      </el-table-column>

      <el-table-column label="是否必填" min-width="11%">
        <template slot-scope="scope">
          <cell-limit :el="scope.row.isRequired ? '是' : '否'"></cell-limit>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import paraFormat from "@/utils/paraFormat.js";
import { workUnitTrigger } from "@/utils/workUnit.js";
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
  created() {
    workUnitTrigger();
  },
  data() {
    return {
      paraFormat,
    };
  },
};
</script>

<style lang="scss" scoped></style>

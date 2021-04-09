<template>
  <div>
    <!-- seach -->
    <div class="seach-wrapper">
      <slot name="seach"></slot>
    </div>
    <!-- table -->
    <el-card>
      <el-table :data="option" style="width: 100%" v-loading="loadding">
        <template slot="empty">
          <i class="el-icon-warning"></i>
          <span>{{ emptyText }}</span>
        </template>
        <el-table-column label="选择" width="55">
          <template slot-scope="scope">
            <el-radio
              v-model="tableRadio"
              :label="scope.row[bindKey]"
              @change="handleRadio(scope.row)"
            >
              <i></i>
            </el-radio>
          </template>
        </el-table-column>

        <el-table-column
          v-for="(item, index) in tColumn"
          :key="index"
          :label="item.label"
          :align="item.align || 'center'"
        >
          <template slot-scope="scope">
            <div class="text-overflow" v-if="!item.fmtt">
              <template v-if="!!item.split">
                <cell-popover
                  :popData="scope.row[item.prop]"
                  :division="item.split"
                  :width="350"
                ></cell-popover>
              </template>
              <template v-else>
                <cell-limit :el="scope.row[item.prop]"></cell-limit>
              </template>
            </div>
            <div class="text-overflow" v-else>
              <span v-if="item.fmtt.hasOwnProperty(scope.row[item.prop])">
                <template v-if="!!item.split">
                  <cell-popover
                    :popData="item.fmtt[scope.row[item.prop]]"
                    :division="item.split"
                    :popWidth="350"
                  ></cell-popover>
                </template>
                <template v-else>
                  <cell-limit
                    :el="item.fmtt[scope.row[item.prop]]"
                  ></cell-limit>
                </template>
              </span>
              <span v-else>暂无配置</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- pagination -->
    <div class="pagination-wrapper">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script>
import CellPopover from "@/components/CellPopover";
export default {
  components: { CellPopover },
  props: {
    bindKey: {
      type: String,
      default: "id",
    },
    loadding: {
      type: Boolean,
      default: false,
    },
    tColumn: {
      type: Array,
      default: () => {
        return [];
      },
    },
    option: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
    emptyText: {
      type: String,
      default: "当前无数据",
    },
  },
  data() {
    return {
      tableRadio: this.value[this.bindKey],
    };
  },
  methods: {
    handleRadio(v) {
      this.emitInput(v);
    },
    emitInput(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<template>
  <div class="trans-table">
    <!-- 渲染得表格 -->
    <el-card shadow="never">
      <div slot="header" class="clearfix card-header">
        <span>待选</span>
      </div>
      <table-data
        ref="tableData"
        :data="rendenData"
        :column="$attrs.column"
        :loadding="$attrs.loadding"
        v-model="SLData"
        :prop="prop"
        :emptyText="emptyText"
      >
        <div slot="seach">
          <slot name="leftSeach"></slot>
        </div>
        <div class="page-wrapper" slot="pagination">
          <slot name="leftPagination"></slot>
        </div>
      </table-data>
    </el-card>
    <!-- 左右操作按钮 -->
    <div class="btns">
      <el-button
        :disabled="disableRightBtn"
        type="primary"
        icon="el-icon-arrow-right"
        circle
        @click="handleRight"
      ></el-button>
      <el-button
        :disabled="disableLeftBtn"
        type="primary"
        icon="el-icon-arrow-left"
        circle
        @click="handleLeft"
      ></el-button>
    </div>
    <!-- 已经选择得数据 -->
    <el-card shadow="never">
      <div slot="header" class="clearfix card-header">
        <span>已选</span>
      </div>
      <table-select
        ref="tableSelect"
        :data="bindRenderData"
        :column="$attrs.column"
        v-model="SRData"
      >
        <div slot="seach">
          <slot name="rightSeach"></slot>
        </div>

        <div slot="pagination" class="page-wrapper">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="RPage.current"
            :page-size="RPage.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="RPage.total"
            :pager-count="RPage.pagerCount"
            small
          ></el-pagination>
        </div>
      </table-select>
    </el-card>
    <!-- {{$attrs}} -->
    <!-- {{rendenData}} -->
    <!-- {{ SRData }} -->
  </div>
</template>
<script>
import TableData from "./TableData";
import TableSelect from "./TableSelect";
export default {
  components: {
    TableData,
    TableSelect,
  },
  props: {
    option: {
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
    maxSize: {
      type: Number,
      default: 20,
    },

    emptyText: {
      type: String,
      default: "当前无数据",
    },

    // 精确查询字段
    exactQueryField: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // tColumn: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // },
    // tSeach: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // },
    // value: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // }
  },
  data() {
    return {
      // 选择数量是否已经超过最大值
      isSlelectMax: false,
      // 接口渲染数据
      rendenData: [],
      // 已经选择（前端分页数据）
      bindData: [],
      // 前端渲染分页render数据
      bindRenderData: [],

      // 左边已经选中数据
      SLData: [],
      SRData: [],

      // 右侧分页
      RPage: {
        current: 1,
        pageSize: 10,
        total: 0,
        pagerCount: 5,
      },
      // 右边seach
      RSeach: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.bindData = [].concat(this.$attrs.value);
      const rPage = Object.assign({}, this.$attrs.cPage);
      const { pageSize, pagerCount } = rPage;
      this.RPage.pageSize = pageSize || 10;
      this.RPage.pagerCount = pagerCount || 5;
      this.disableColum();
      this.seach();
    },
    // 前端分页数据截取
    // splitData() {
    //   this.RPage.total = this.bindData.length;
    //   const { current, pageSize, total } = this.RPage;
    //   this.bindRenderData = this.bindData.slice(
    //     (current - 1) * pageSize,
    //     current * pageSize
    //   );
    // },
    // 搜索参数,前端做分页
    seach(v) {
      console.log(v);
      if (v) {
        this.RSeach = Object.assign({}, v);
        this.RPage.current = 1;
        // this.$refs.tableData.emptyText = '未找到满足筛选条件数据';
        this.$refs.tableSelect.emptyText = "未找到满足筛选条件数据";
      }
      const arr = this.filterDataInBindData(v);
      this.RPage.total = arr.length;
      const { current, pageSize } = this.RPage;
      this.bindRenderData = arr.slice(
        (current - 1) * pageSize,
        current * pageSize
      );
    },

    // filterDataInBindData() {
    //   const v = this.RSeach;
    //   return this.bindData.filter(item => {
    //     let evalStr = '';
    //     for (let k in v) {
    //       const _v = v[k];
    //       evalStr += `item['${k}'].indexOf('${_v}')>-1&&`;
    //     }
    //     return !evalStr ? true : eval(evalStr.substring(0, evalStr.length - 2));
    //   });
    // },
    // 从bindData中过滤满足搜索条件得数据
    filterDataInBindData() {
      // 对para进行trim
      const para = {};
      for (let key in this.RSeach) {
        para[key] = this.RSeach[key].replace(/(^\s*)|(\s*$)/g, "");
      }
      return this.bindData.filter((item) => {
        for (let key in para) {
          // 精确查询字段判断
          if (
            this.exactQueryField.includes(key) &&
            para[key] &&
            para[key] !== item[key]
          ) {
            return false;
          }

          if (typeof item[key] === "string" || typeof item[key] === "number") {
            // 字符串和数字，模糊匹配
            if (("" + item[key]).indexOf(para[key]) === -1) {
              return false;
            }
          } else if (typeof item[key] === "boolean") {
            // boolean类型，精准匹配
            if (item[key] !== para[key]) {
              return false;
            }
          } else if (item[key] === null || item[key] === undefined) {
            // 空类型，根据查询参数匹配
            if (para[key] !== "") {
              return false;
            }
          } else {
            //其他类型直接过滤掉
            return false;
          }
        }
        return true;
      });
    },

    disableColum(arr) {
      const _data = arr || this.option;
      const bIds = this.bindData.map((item) => item[this.prop.id]);
      this.rendenData = _data.map((item) => {
        item.disable = bIds.includes(item[this.prop.id]);
        return item;
      });
    },
    // 向右（添加一天永远回到第一页）
    handleRight() {
      this.bindData = this.unique(this.bindData.concat(this.SLData));
      // this.bindData = this.SLData;
      this.RPage.current = 1;
      this.RSeach = {};
      this.disableColum();
      this.$emit("ltrChange", this.bindData);
    },
    // 向左
    handleLeft() {
      // this.SRData.forEach((item,SRIdx)=>{

      // })
      // this.$refs.tableData.emptyText = '暂无数据';
      this.$refs.tableSelect.emptyText = "当前无数据";
      const SRIDs = this.SRData.map((item) => item[this.prop.id]);
      const arrs = [].concat(this.bindData);
      this.bindData = this.bindData.filter((item) => {
        return !SRIDs.includes(item[this.prop.id]);
      });
      // if(this.bindData.length%this.RPage.pageSize==0) {

      // }
      this.isToPrev(arrs);
      this.$emit("rtlChange", this.bindData);
      // this.disableColum();
    },
    // 是不是跳转到上一页
    isToPrev(arrs) {
      if (this.RPage.current == 1) {
        return false;
      }
      const { current, pageSize } = this.RPage;
      const nums = (arrs || []).length;
      // 最后一页条数
      const lastNums = nums % pageSize;
      // 总页数
      const pages =
        lastNums == 0
          ? Math.floor(nums / pageSize)
          : Math.floor(nums / pageSize) + 1;
      if (current == pages && this.SRData.length >= lastNums) {
        this.RPage.current -= 1;
      }
    },
    emitInput(v) {
      this.$emit("input", v);
    },
    // 前端分页
    handleSizeChange(val) {
      this.RPage.pageSize = val;
      this.$emit("pageChange", this.RSeach);
      this.seach();
    },
    handleCurrentChange(val) {
      this.RPage.current = val;
      this.$emit("pageChange", this.RSeach);
      this.seach();
    },
    // 数据去重处理
    unique(arr) {
      let _map = new Map();
      arr.forEach((item) => {
        _map.set(item[this.prop.id], item);
      });
      return [..._map.values()];
    },
  },
  computed: {
    disableRightBtn() {
      const isAllDisable = this.SLData.every((item) => item.disable);
      console.log(isAllDisable);
      return isAllDisable || this.isSlelectMax;
    },
    disableLeftBtn() {
      return !this.SRData.length;
    },
  },
  watch: {
    option(nv) {
      this.disableColum(nv);
    },
    bindData(nv) {
      this.emitInput(nv);
      this.seach();
    },

    SLData() {
      const selectData = this.unique(this.bindData.concat(this.SLData));
      this.isSlelectMax = selectData.length > this.maxSize;
      if (this.isSlelectMax) {
        this.$message({
          type: "warning",
          // duration:0,
          // showClose:true,
          message: `最多可以选择【${this.maxSize}】条数据，请更改！`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.trans-table {
  // element-ui 样式覆盖
  /deep/ {
    .el-card__header {
      padding: 0;
    }
    .el-card__body {
      padding: 18px;
    }
  }
  // 组件框架样式
  display: flex;
  justify-content: center;
  .table-data,
  .table-select {
    /deep/ {
      .el-table {
        border: solid 1px #ecf2f9;
        // border-top: none;
        // border-bottom: none;
        th {
          background: #ecf2f9;
          color: #343434;
          font-size: 12px;
          font-weight: 700;
        }
        .el-table__row:nth-child(even) td {
          background: #f7f8fc;
        }
      }
    }
  }
  .btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
    /deep/ {
      .el-button {
        margin-left: 0;
      }
      .el-button + .el-button {
        margin-top: 8px;
      }
    }
  }
  .card-header {
    background: #ebf2fa;
    line-height: 40px;
    color: #343434;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 18px;
  }
}

.page-wrapper {
  text-align: center;
  margin-top: 8px;
  /deep/ {
    .el-pagination {
      display: inline-block;
    }
  }
}
</style>

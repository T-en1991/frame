<!--
1.popData：传值数组或可按规定分割的string
2.division：分割符号
3.popWidth：popover的长度
-->
<template>
  <div class="pop_textover" ref="cell-popover-ref">
    <el-popover
      v-if="dataArr && dataArr.length >= 1"
      placement="bottom-start"
      :width="popWidth"
      trigger="hover"
    >
      <div class="popover-title">
        共<span>{{ dataArr.length }}</span
        >条
      </div>
      <el-tag
        style="margin-right: 6px; margin-bottom: 6px"
        v-for="(item, index) in dataArr"
        :key="index"
        >{{ item }}
      </el-tag>
      <div ref="text-ref" class="text-overflow" slot="reference">
        {{ dataArr | viewItems }}
      </div>
    </el-popover>
    <span
      v-else-if="dataArr && dataArr.length == 1"
      class="text-overflow"
      slot="reference"
      >{{ dataArr | viewItems }}</span
    >
    <span v-else>--</span>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    popData: {
      required: true,
    },
    division: {
      type: String,
      default() {
        return ";";
      },
    },
    popWidth: {
      type: Number,
      default: 350,
    },
  },
  data() {
    return {
      dataArr: [],
    };
  },
  mounted() {
    let _this = this;
    if (_this.popData) {
      if (Array.isArray) {
        if (Array.isArray(this.popData)) {
          let [...arr] = this.popData;
          this.dataArr = arr;
        } else {
          this.dataArr = this.popData.split(this.division);
        }
      }
    } else {
      this.dataArr = [];
    }
  },
  watch: {
    popData() {
      setTimeout(() => {
        if (Array.isArray(this.popData)) {
          let [...arr] = this.popData;
          this.dataArr = arr;
        } else {
          this.dataArr = this.popData ? this.popData.split(this.division) : [];
        }
      });
    },
  },
  filters: {
    viewItems(val) {
      return val.length ? val.map((item) => item).join(";") : "--";
    },
  },
};
</script>

<style lang="scss" scoped>
.pop_textover {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}

.popover-title {
  font-size: 12px;
  margin-bottom: 10px;
  span {
    background: #409eff;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    padding: 4px;
    margin: 0 4px;
    border-radius: 2px;
  }
}
</style>

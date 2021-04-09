<template>
  <data-wrapper label="工单统计" more="更多" @emitMore="emitMore">
    <h1 class="bie-title">
      <label>当月新增工单</label>
      <cell-limit class="val" :el="$attrs.data.total"></cell-limit>
      <span class="unit">条</span>
      <!-- 当月新增工单 <span>{{ $attrs.data.total }}</span> 条 -->
    </h1>
    <div v-if="true" class="bie-item-wrapper">
      <div class="item">
        <data-bie
          :max="$attrs.data.total"
          :val="$attrs.data.defect"
          label="缺陷工单 (条)"
          theme="#00BBA3"
        ></data-bie>
      </div>
      <div class="item">
        <data-bie
          :max="$attrs.data.total"
          :val="$attrs.data.uphold"
          label="维护工单 (条)"
          theme="#00C6DD"
        ></data-bie>
      </div>
      <div class="item">
        <data-bie
          :max="$attrs.data.total"
          :val="$attrs.data.inspect"
          label="巡检工单 (条)"
          theme="#009CFF"
        ></data-bie>
      </div>
      <div class="item">
        <data-bie
          :max="$attrs.data.total"
          :val="$attrs.data.repair"
          label="维修工单 (条)"
          theme="#456CFF"
        ></data-bie>
      </div>
    </div>

    <div class="no-data-wrapper" style="height: 100px" v-else>
      <no-data size="mini"></no-data>
    </div>
    <h1 class="bar-title">当年新增工单分布</h1>
    <div class="data-line-wrapper">
      <data-bar :data="$attrs.data.echartsData"></data-bar>
    </div>
  </data-wrapper>
</template>
<script>
import DataWrapper from "../DataWrapper";
import DataBie from "./cmp/DataBie";
import DataBar from "./cmp/DataBar";
import NoData from "@/components/NoData";
export default {
  name: "MonitorWork",
  components: {
    DataWrapper,
    DataBie,
    DataBar,
    NoData,
  },
  methods: {
    emitMore() {
      this.$emit("emitMore");
    },
  },
  computed: {
    hasData() {
      if (this.$attrs.total === "0") {
        return false;
      }

      if (this.$attrs.total === "") {
        return false;
      }

      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.bie-title,
.bar-title {
  font-size: 16px;
  color: #333;
  position: relative;
  padding-left: 6px;
  &::before {
    content: "1";
    display: block;
    width: 3px;
    height: 14px;
    background: #00b9cf;
    position: absolute;
    top: 50%;
    left: 0;
    color: transparent;
  }
}
.bie-title {
  margin-bottom: 10px;
  display: flex;
  align-items: baseline;
  .val {
    font-size: 24px;
    color: #00b9cf;
    font-weight: 700;
    margin: 0 4px;
  }
  &::before {
    margin-top: -3px;
  }
}
.bar-title {
  margin-top: 30px;
  margin-bottom: 20px;
  &::before {
    margin-top: -6px;
  }
}
.bie-item-wrapper {
  display: flex;
  justify-content: space-between;
  .item {
    width: 100px;
    height: 100px;
  }
}
.data-line-wrapper {
  height: calc(100% - 220px);
}
</style>

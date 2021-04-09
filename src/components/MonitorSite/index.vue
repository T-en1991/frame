<template>
  <data-wrapper label="站点概况">
    <ul class="site-block-wrapper">
      <li class="item">
        <site-block type="total" :value="this.$attrs.data.total"></site-block>
      </li>
      <li class="item">
        <site-block
          type="warning"
          :value="this.$attrs.data.warning"
        ></site-block>
      </li>
      <li class="item">
        <site-block
          type="outline"
          :value="this.$attrs.data.outline"
        ></site-block>
      </li>
    </ul>

    <site-price
      :data1="this.$attrs.data.currentLoad"
      :data2="this.$attrs.data.maxLoad"
      :data3="this.$attrs.data.monthElec"
      :data4="this.$attrs.data.monthPrice"
    ></site-price>

    <site-charts :data="this.$attrs.data.power"></site-charts>
  </data-wrapper>
</template>

<script>
import DataWrapper from "../DataWrapper";
import SiteBlock from "./cmp/SiteBlock";
import SitePrice from "./cmp/SitePrice";
import SiteCharts from "./cmp/SiteCharts";
export default {
  name: "MonitorSite",
  components: {
    DataWrapper,
    SiteBlock,
    SitePrice,
    SiteCharts,
  },
};
</script>

<style lang="scss" scoped>
.site-block-wrapper {
  display: flex;
  justify-content: space-between;
  .item {
    width: 30%;
    height: 70px;
  }
}
</style>

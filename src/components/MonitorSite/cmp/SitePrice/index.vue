<template>
  <ul class="site-price">
    <li class="item">
      <div class="label">当前负荷</div>
      <div class="val-wrapper" style="color: #00a0e9">
        <cell-limit :el="this.$attrs.data1" class="val"></cell-limit>
        <span class="unit">kW</span>
      </div>
    </li>

    <li class="item">
      <div class="label">月最大负荷</div>
      <div class="val-wrapper" style="color: #f89e00">
        <cell-limit :el="this.$attrs.data2" class="val"></cell-limit>
        <span class="unit">kW</span>
      </div>
    </li>

    <li class="item">
      <div class="label">月用电量</div>
      <div class="val-wrapper" style="color: #1eb883">
        <cell-limit :el="this.$attrs.data3" class="val"></cell-limit>
        <span class="unit">kWh</span>
      </div>
    </li>

    <li class="item">
      <div class="label">月电费</div>
      <div class="val-wrapper" style="color: #9965f0">
        <cell-limit :el="this.$attrs.data4" class="val"></cell-limit>
        <span class="unit">元</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SitePrice",
};
</script>

<style lang="scss" scoped>
.site-price {
  display: flex;
  background: #fff;
  padding: 6px 0;
  margin-top: 30px;
  .item {
    width: 25%;
    border-left: solid 1px #dedede;
    padding: 10px 0 10px 20px;
    &:first-child {
      border-left: none;
    }
    .label {
      font-size: 14px;
      color: #666;
    }
    .val-wrapper {
      display: flex;
      align-items: baseline;
      margin-top: 8px;
      .val {
        font-size: 18px;
        max-width: 120px;
        font-weight: 700;
      }
      .unit {
        font-size: 12px;
      }
    }
  }
}
</style>

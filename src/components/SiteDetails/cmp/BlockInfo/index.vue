<template>
  <div class="block-info-wrapper">
    <div class="item-info-wrapper">
      <block-item type="dl" :data="$attrs.data.dl"></block-item>
    </div>

    <div class="item-info-wrapper">
      <block-item type="df" :data="$attrs.data.df"></block-item>
    </div>

    <div class="item-info-wrapper">
      <block-item type="fh" :data="$attrs.data.fh"></block-item>
    </div>

    <div class="item-info-wrapper">
      <block-item type="gj" :data="$attrs.data.gj"></block-item>
    </div>

    <div class="item-info-wrapper">
      <block-item type="qx" :data="$attrs.data.qx"></block-item>
    </div>

    <div class="item-info-wrapper">
      <block-item type="gd" :data="$attrs.data.gd"></block-item>
    </div>
  </div>
</template>
<script>
import BlockItem from "../BlockItem";
export default {
  components: {
    BlockItem,
  },
  name: "BlockInfo",
};
</script>

<style lang="scss" scoped>
.block-info-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item-info-wrapper {
    width: 32%;
    margin-bottom: 20px;
  }
}
</style>

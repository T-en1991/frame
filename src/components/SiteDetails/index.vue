<template>
  <div class="site-details">
    <base-info :data="option.baseInfo"></base-info>
    <block-info :data="option.blockInfo"></block-info>
  </div>
</template>
<script>
import BaseInfo from "./cmp/BaseInfo";
import BlockInfo from "./cmp/BlockInfo";
export default {
  components: { BaseInfo, BlockInfo },
  name: "SiteDetails",
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

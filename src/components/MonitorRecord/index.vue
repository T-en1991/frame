<template>
  <data-wrapper label="告警记录">
    <div class="record" v-if="$attrs.data.length">
      <ul class="record-wrapper">
        <li
          class="record-item"
          v-for="(item, index) in $attrs.data"
          :key="index"
        >
          <cell-limit class="value" :el="item"></cell-limit>
        </li>
      </ul>
    </div>
    <no-data v-else size="mini"></no-data>
  </data-wrapper>
</template>

<script>
import DataWrapper from "../DataWrapper";
import NoData from "@/components/NoData";
export default {
  components: {
    DataWrapper,
    NoData,
  },
};
</script>
<style lang="scss" scoped>
.record {
  height: 110%;
  margin-top: -10px;
  position: relative;
  &::before {
    content: "123";
    color: transparent;
    position: absolute;
    display: block;
    width: 100%;
    height: 30px;
    background-image: linear-gradient(#ffffff00, #f4feff);
    left: 0;
    bottom: 0;
  }
}
.record-wrapper {
  overflow-y: scroll;
  height: 100%;
  padding-right: 20px;
  margin-right: -5px;

  // 滚动条的宽度
  &::-webkit-scrollbar {
    width: 6px; // 横向滚动条
    height: 6px; // 纵向滚动条 必写
    background-color: #eeeeee;
  }

  // 滚动条的滑块
  &::-webkit-scrollbar-thumb {
    background-color: #009db0;
    border-radius: 3px;
  }

  // ie下的兼容问题
  & {
    overflow-y: auto;
    scrollbar-face-color: #999999;
    scrollbar-highlight-color: #eeeeee;
    scrollbar-track-color: #eeeeee;
    scrollbar-arrow-color: #000;
  }

  .record-item {
    display: flex;
    border-bottom: solid 1px #ddd;
    align-items: center;
    color: #333;
    font-size: 14px;
    .label {
      width: 60px;
    }
    .value {
      width: calc(100% - 60px);
      line-height: 40px;
    }
  }
}
</style>

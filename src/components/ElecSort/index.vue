<template>
  <div class="elec-sort">
    <ul class="elec-items" v-if="option.length">
      <li v-for="(item, index) in option" :key="index">
        <slider-bar
          :data="item"
          :theme="colors[item.index]"
          :normal="item.index > 3"
        ></slider-bar>
      </li>
    </ul>
    <no-data v-else size="small"></no-data>
  </div>
</template>
<script>
import SliderBar from "@/components/SliderBar";
import NoData from "@/components/NoData";
export default {
  name: "ElecSort",
  components: {
    SliderBar,
    NoData,
  },
  data() {
    return {
      option: [],
      colors: {
        1: "#ff7575",
        2: "#ff921c",
        3: "#ffc21c",
      },
    };
  },
  methods: {
    initData() {
      const _arr = [].concat(this.$attrs.data);
      if (_arr.length) {
        const _v = _arr.map((item) => item.val);
        const _max = Math.max.call(null, ..._v);
        const _sv = _arr.sort((a, b) => {
          return b.val - a.val;
        });

        this.option = _sv.map((item, index) => {
          item.index = index + 1;
          item.max = _max + "";
          return item;
        });
        // console.log(this.option);
      } else {
        this.option = [];
      }
    },
  },
  watch: {
    "$attrs.data": {
      handler() {
        this.initData();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.elec-sort {
  width: 100%;
  height: 100%;
  .elec-items {
    height: 100%;
    li {
      padding: 3px 0;
    }
  }
}
</style>

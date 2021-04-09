//自定义大小，默认width: 60px; height: 60px //可传入图片名,匹配图片
<template>
  <div style="display: inline-block">
    <img :src="url" :style="imgStyle" />
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    urlName: {
      type: String,
      require: true,
    },
    imgStyle: {
      type: String,
      default() {
        return "width:60px;height:60px";
      },
    },
  },
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    switch (this.urlName) {
      case "name1":
        this.url = require("./imagesIcon/1.1.png");
        break;
      case "name2":
        this.url = require("./imagesIcon/2.1.png");
        break;
      case "name3":
        this.url = require("./imagesIcon/3.1.png");
        break;
      case "name4":
        this.url = require("./imagesIcon/4.1.png");
        break;
    }
  },
};
</script>

<style scoped></style>

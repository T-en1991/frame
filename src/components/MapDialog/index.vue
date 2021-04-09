<template>
  <div id="container" style="height: 220px"></div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      map: {},
      site: {
        address: "",
        longitude: "",
        latitude: "",
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    /**
     * 加载地图
     */
    initMap() {
      this.map = new AMap.Map("container", {
        center: [116.397428, 39.90923], // [纬度，经度]

        resizeEnable: true,

        zoom: 13,

        keyboardEnable: false,
      });
      this.loadMapPlugs();
    },

    /**
     * 加载插件
     */
    loadMapPlugs() {
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], () => {
        this.map.addControl(new AMap.ToolBar());

        this.map.addControl(new AMap.Scale());
      });
      this.handleJs();
    },

    /**
     * 搜索
     */
    handleJs() {
      const _this = this;
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        var autoOptions = {
          city: "全国", //城市，默认全国
          input: "keyword", //使用联想输入的input的id
        };
        var autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
          city: "",
          map: this.map,
        });
        AMap.event.addListener(autocomplete, "select", (e) => {
          //TODO 针对选中的poi实现自己的功能
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name);
        });

        //地图回显
        AMap.event.addListener(placeSearch, "markerClick", (e) => {
          const { lng, lat } = e.data.location;
          const { cityname, adname, address } = e.data;
          _this.site.address = cityname + adname + address;
          _this.site.longitude = lng + "";
          _this.site.latitude = lat + "";
          this.$emit("mapInfo", _this.site);
        });
      });
    },
  },
};
</script>

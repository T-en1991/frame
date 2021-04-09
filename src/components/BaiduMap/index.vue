<template>
  <map-loader>
    <div id="allmap"></div>
  </map-loader>
</template>

<script>
import * as img from "./img/index";
import _ from "lodash";
import MapLoader from "@/components/MapLoader";
/* eslint-disable */
export default {
  components: { MapLoader },
  props: {
    pt: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      point: [],
      BMap: null,
      map: null,
    };
  },
  mounted() {
    this.$loadMap().then(({ BMap }) => {
      this.BMap = BMap;
      this.initBMap(BMap);
    });
  },
  watch: {
    pt: {
      handler(n) {
        this.point = n;
        if (this.map) {
          this.createStation(this.BMap);
        }
      },
    },
  },
  methods: {
    //初始化地图
    initBMap(BMap) {
      //创建地图及相关控件
      this.createMap(BMap);
      //加载站点
      this.createStation(BMap);
    },

    createMap(BMap) {
      let _this = this;
      //创建地图设置中心点
      this.map = new BMap.Map("allmap", {
        enableMapClick: false,
      });
      this.map.enableAutoResize();
      this.map.centerAndZoom(new BMap.Point(105.806276, 32.147223), 5); //设置中心点
      this.map.enableScrollWheelZoom(); //设置滚轮滚动

      if (this.type == "homePage") {
        this.map.addControl(
          new BMap.NavigationControl({
            type: BMAP_NAVIGATION_CONTROL_ZOOM, //缩放控件类型 仅包含缩放按钮
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //右下角
          })
        );
      } else {
        this.map.addControl(
          new BMap.NavigationControl({
            type: BMAP_NAVIGATION_CONTROL_ZOOM, //缩放控件类型 仅包含缩放按钮
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //右下角
            offset: new BMap.Size(500, 280), //type为screen时
          })
        );
      }

      //创建控制地图放大缩小控件
      //this.createZoomControl(BMap,map);
    },

    createStation(BMap) {
      let _this = this;
      console.log(_this.map);
      _this.map.clearOverlays();

      //创建站点数，还未做海量点
      if (
        document.createElement("canvas").getContext &&
        _this.point.length > 10000000
      ) {
        //0.模拟点
        let data = [
          new BMap.Point(116.297047, 39.979542),
          new BMap.Point(116.321768, 39.88748),
          new BMap.Point(116.494243, 39.956539),
          new BMap.Point(116.317047, 38.979542),
          new BMap.Point(116.322768, 38.88748),
          new BMap.Point(116.495243, 38.956539),
        ];

        //1.创建canvas画布
        let myCanvas = document.createElement("canvas");
        myCanvas.width = myCanvas.height = "100%";
        let ctx = myCanvas.getContext("2d");

        //2.渲染所有点入canvas
        for (let i = 0; i < data.length; i++) {
          let pixel = _this.map.pointToPixel(data[i]);
          let img = new Image();
          img.src = "./src/assets/hover0.png";
          img.onload = function () {
            ctx.drawImage(this, pixel.x, pixel.y);
          };
        }

        document.getElementById("allmap").appendChild("myCanvas");

        //1.创建canvas画布
        //2.渲染所有点入canvas
        //3.记录站点区域的坐标点【考虑偏移量及图标大小计算坐标点的实际拥有范围】【两层for循环，横向和纵向】
        //4.canvas事件监听，事件发生的点是在哪个站点区域【监听到canvas上的坐标，遍历所有站点，确定是哪个站点】
      } else {
        //渲染站点
        let markers = [];
        _this.point.forEach((cv) => {
          let icon = _this.chooseIcon("normal", cv.siteState);
          let myIcon = new BMap.Icon(icon, new BMap.Size(14, 18));
          let marker = new BMap.Marker(new BMap.Point(cv.lng, cv.lat), {
            icon: myIcon,
          });
          marker.customData = {
            siteName: cv.siteName,
            siteId: cv.siteId,
            siteState: cv.siteState,
          };
          markers.push(marker);
          _this.map.addOverlay(marker);
        });

        //mouseover
        markers.forEach((cv) => {
          cv.addEventListener("mouseover", function () {
            let icon = _this.chooseIcon("hover", cv.customData.siteState);
            this.setIcon(new BMap.Icon(icon, new BMap.Size(14, 18)));
            let label = new BMap.Label(cv.customData.siteName, {
              offset: new BMap.Size(0, -30),
            });
            let bgColor = "";
            console.log(cv.customData.siteState);
            switch (cv.customData.siteState) {
              case "0":
                bgColor = "#08A1A4";
                break;
              case "1":
                bgColor = "#C5C5C5";
                break;
              case "2":
                bgColor = "#FE7071";
                break;
              default:
                bgColor = "#08A1A4";
                break;
            }
            label.setStyle({
              display: "block",
              height: "24px",
              lineHeight: "24px",
              borderRadius: "4px",
              border: "1px solid transparent",
              backgroundColor: bgColor,
              fontSize: "14px",
              color: "white",
              textAlign: "center",
            });
            cv.setLabel(label);
          });
        });

        //mouseout
        markers.forEach((cv) => {
          cv.addEventListener("mouseout", function () {
            let icon = _this.chooseIcon("normal", cv.customData.siteState);
            let label = this.getLabel();
            //label.setContent(''); //设置标签内容为空
            label.setStyle({ display: "none" });
            this.setIcon(new BMap.Icon(icon, new BMap.Size(14, 18)));
          });
        });

        //click
        markers.forEach((cv) => {
          let _this = this;
          cv.addEventListener("click", function (e) {
            _this.$emit("getSite", e.target.customData.siteId);
          });
        });
      }
    },

    //站点的icon
    chooseIcon(type, state) {
      state = state == 0 || state == 1 || state == 2 ? state : 0;
      return img[type + state];
    },
    //创建地图级别控件
    createZoomControl(BMap, map) {
      // 定义一个控件类，即function
      function ZoomControl() {
        // 设置默认停靠位置和偏移量
        this.defaultOffset = new BMap.Size(10, 10);
      }
      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control();

      // 自定义控件必须实现initialize方法，并且将控件的DOM元素返回
      // 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
      ZoomControl.prototype.initialize = function (map) {
        //创建一个DIV
        var mydiv = document.createElement("div");
        mydiv.style.padding = "10px";
        mydiv.style.left = "100px";
        mydiv.style.top = "100px";
        mydiv.style.backgroundColor = "#fff"; //创建一个放大用的div

        var mydivadd = document.createElement("div");
        mydivadd.innerText = "+";
        mydivadd.style.width = "24px";
        mydivadd.style.height = "24px";
        mydivadd.style.lineHeight = "24px";
        mydivadd.style.textAlign = "center";
        mydivadd.style.backgroundColor = "#fff";
        mydivadd.style.fontSize = "24px";
        mydivadd.style.borderBottom = "1px solid ";
        mydivadd.onclick = function () {
          map.zoomTo(map.getZoom() + 1);
        };
        //创建一个缩小用的div
        var mydivmin = document.createElement("div");
        mydivmin.innerText = "-";
        mydivmin.style.width = "24px";
        mydivmin.style.height = "24px";
        mydivmin.style.lineHeight = "24px";
        mydivmin.style.textAlign = "center";
        mydivmin.style.backgroundColor = "#fff";
        mydivmin.style.fontSize = "24px";

        mydivmin.onclick = function () {
          map.zoomTo(map.getZoom() - 1);
        };

        //添加放大的img图标到div中
        mydiv.appendChild(mydivadd);

        //添加缩小的img图标到div中
        mydiv.appendChild(mydivmin);
        //添加DOM元素到地图中
        map.getContainer().appendChild(mydiv);
        //将DOM元素返回；
        return mydiv;
      };

      // 创建控件实例
      var myZoomCtrl = new ZoomControl();
      // 添加到地图当中
      map.addControl(myZoomCtrl);
    },
    /* openWin(BMap, BMapLib) {
       let map = new BMap.Map('allmap');
       let _this = this;
       map.centerAndZoom(new BMap.Point(116.404, 39.915), 5); //设置中心点
       map.enableScrollWheelZoom(); //设置滚轮滚动
       let markers = [];
       let point = null;
       this.point.forEach(cv => {
         point = new BMap.Point(cv.lng, cv.lat);
         let myIcon = new BMap.Icon(zd1, new BMap.Size(30, 30));
         let marker = new BMap.Marker(point, { icon: myIcon });
         marker.customData = { siteName: cv.siteName, siteId: cv.siteId };
         markers.push(marker);
       });
       //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
       let MarkerClusterer = new BMapLib.MarkerClusterer(map, {
         markers: markers
       });

       let myStyles = [
         {
           url: test,
           size: new BMap.Size(80, 30),
           opt_anchor: [16, 0],
           textColor: '#fff',
           opt_textSize: 10
         }
       ];

       MarkerClusterer.setStyles(myStyles);

       //mouseover
       markers.forEach((cv, index) => {
         cv.addEventListener('mouseover', function() {
           this.setIcon(new BMap.Icon(zd2, new BMap.Size(30, 30)));
           let label = new BMap.Label(cv.customData.siteName, {
             offset: new BMap.Size(-40, -30)
           });
           label.setStyle({
             display: 'block',
             width: '100px',
             height: '24px',
             lineHeight: '24px',
             borderRadius: '4px',
             border: '1px solid transparent',
             backgroundColor: '#00B9CF',
             fontSize: '14px',
             color: 'white',
             textAlign: 'center'
           });
           label.setZIndex(99999);
           cv.setLabel(label);
         });
       });

       //mouseout
       markers.forEach(cv => {
         cv.addEventListener('mouseout', function() {
           let label = this.getLabel();
           //label.setContent(''); //设置标签内容为空
           label.setStyle({ display: 'none' });
           //this.setIcon(new BMap.Icon(zd1, new BMap.Size(30, 30)));
         });
       });

       //click
       markers.forEach(cv => {
         let _this = this;
         cv.addEventListener('click', function(e) {
           _this.$emit('getSite', e.target.customData.siteId);
           /!*new BMap.Geocoder().getLocation(cv.point, res => {
             console.log(res);
             //_this.$emit('getPoint',res.point)
           });*!/
         });
       });
     }*/
  },
};
</script>

<style></style>

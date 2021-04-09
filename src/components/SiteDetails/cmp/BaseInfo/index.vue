<template>
  <div style="margin-bottom: 20px">
    <el-row :gutter="20" style="height: 260px">
      <el-col :span="12" style="height: 100%">
        <div
          class="center"
          style="width: 100%; height: 100%; background-color: #eee"
        >
          <el-image
            v-if="$attrs.data.imgUrl"
            style="width: 100%; height: 100%"
            :src="$attrs.data.imgUrl"
            fit="contain"
          ></el-image>
          <el-image
            v-else
            style="width: 100%; height: 100%"
            :src="stationImg.stationBg"
            fit="none"
          ></el-image>
        </div>
      </el-col>
      <el-col :span="12" style="height: 100%">
        <el-row
          style="
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <el-col>
            <el-row class="center">
              <el-col class="center" :span="2">
                <el-image :src="stationImg.station"></el-image>
              </el-col>
              <el-col :span="22">
                <cell-limit
                  class="station_wrapper"
                  :el="$attrs.data.address"
                ></cell-limit>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
            <el-row class="center">
              <el-col class="center" :span="2">
                <el-image :src="stationImg.stationCapacity"></el-image>
              </el-col>
              <el-col :span="5">
                <span class="item_label">站点容量</span>
              </el-col>
              <div style="max-width: 45%">
                <cell-limit
                  class="infoCss"
                  :el="$attrs.data.stationCapacity"
                ></cell-limit>
              </div>
              <el-col class="infoCss site-unit" :span="2">
                <span>kw</span>
              </el-col>
              <el-col class="center" :span="4">
                <el-image
                  :src="$attrs.data.stationStatus | stationStatusFilter"
                ></el-image>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
            <el-row class="center">
              <el-col class="center" :span="2">
                <el-image :src="stationImg.transformer"></el-image>
              </el-col>
              <el-col :span="5">
                <span class="item_label">变压器</span>
              </el-col>
              <div style="max-width: 62.5%">
                <cell-limit
                  class="infoCss"
                  :el="$attrs.data.transformer"
                ></cell-limit>
              </div>
              <el-col class="infoCss site-unit" :span="2">
                <span>台</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
            <el-row class="center">
              <el-col class="center" :span="2">
                <el-image :src="stationImg.wattHour"></el-image>
              </el-col>
              <el-col :span="5">
                <span class="item_label">电表</span>
              </el-col>
              <div style="max-width: 62.5%">
                <cell-limit
                  class="infoCss"
                  :el="$attrs.data.wattHour"
                ></cell-limit>
              </div>
              <el-col class="infoCss site-unit" :span="2">
                <span>台</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
            <el-row class="center">
              <el-col class="center" :span="2">
                <el-image :src="stationImg.screen"></el-image>
              </el-col>
              <el-col :span="5">
                <span class="item_label">屏柜</span>
              </el-col>
              <div style="max-width: 62.5%">
                <cell-limit
                  class="infoCss"
                  :el="$attrs.data.screen"
                ></cell-limit>
              </div>
              <el-col class="infoCss site-unit" :span="2">
                <span>台</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col>
            <el-row class="center">
              <el-col class="center" :span="2">
                <el-image :src="stationImg.environmental"></el-image>
              </el-col>
              <el-col :span="5">
                <span class="item_label">环境传感器</span>
              </el-col>
              <div style="max-width: 62.5%">
                <cell-limit
                  class="infoCss"
                  :el="$attrs.data.environmental"
                ></cell-limit>
              </div>
              <el-col class="infoCss site-unit" :span="2">
                <span>台</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as stationImg from "./img/index.js";
import CellLimit from "../../../cellLimit/index";

export default {
  components: { CellLimit },
  data() {
    return {
      stationImg: stationImg,
    };
  },
  filters: {
    stationStatusFilter(v) {
      switch (v) {
        case "0":
          return stationImg.stationNormal;
        case "1":
          return stationImg.stationOffline;
        case "2":
          return stationImg.stationAlarm;
        default:
          return stationImg.stationNormal;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.station_wrapper {
  color: #333;
  font-size: 18px;
}

.item_label {
  font-size: 16px;
  color: #666;
}

.baseline {
  display: flex;
  align-items: baseline;
}

.center {
  display: flex;
  align-items: center;
}

.infoCss {
  color: #00b9cf;
  font-size: 22px;
}

.site-unit {
  padding-left: 5px;
  font-size: 16px;
}
</style>

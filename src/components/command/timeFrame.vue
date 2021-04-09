//这是一个针对泛能云项目的时间选择组件
//1.通过属性days，可配置从今起向前或向后的默认时间
//2.父组件可通过this.refs.组件名.startDate/endDate拿到开始时间，格式为传参格式yyyy-MM-dd
//3.父组件重置时调用，this.$refs.组件名.showDate() //4.用法，ex：
<!--
<time-frame ref="timeFrame" :days="2"></time-frame>
-->
<template>
  <el-date-picker
    v-model="timeFrame"
    type="daterange"
    :editable="false"
    range-separator="~"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  ></el-date-picker>
</template>

<script>
export default {
  name: "timeFrame",
  props: {
    days: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      timeFrame: [],
      startDate: "",
      endDate: "",
    };
  },
  mounted() {
    this.showDate();
  },
  watch: {
    timeFrame(n) {
      if (n && n.length > 0) {
        this.startDate = this.dateFormat(n[0], "yyyy-MM-dd");
        this.endDate = this.dateFormat(n[1], "yyyy-MM-dd");
      } else {
        this.startDate = "";
        this.endDate = "";
      }
    },
  },
  methods: {
    showDate() {
      if (this.days > 0) {
        this.timeFrame = [
          new Date(),
          new Date().getTime() + this.days * 24 * 60 * 60 * 1000,
        ];
      } else if (this.days < 0) {
        this.timeFrame = [
          new Date().getTime() + this.days * 24 * 60 * 60 * 1000,
          new Date(),
        ];
      } else {
        this.timeFrame = [];
      }
    },
    //时间转化规则
    dateFormat(date, format) {
      date = new Date(date);
      var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "H+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        S: date.getMilliseconds(), //millisecond
      };
      if (/(y+)/.test(format))
        format = format.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return format;
    },
  },
};
</script>

<style scoped></style>

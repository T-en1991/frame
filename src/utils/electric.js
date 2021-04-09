/* eslint-disable */
import Vue from "vue";
// 定义常量：尖峰平谷
const jian = "t";
const feng = "p";
const ping = "f";
const gu = "v";

// 生成数字数组，
// start 开始值 | 含
// end   结束值 | 含
function getTimeArr(start, end) {
  let arr = [];
  for (let i = start; i < end; i++) {
    arr.push(i);
  }
  return arr;
}

// 格式化文本显示
function formatStepText(step) {
  switch (step) {
    case jian:
      return "尖";
    case feng:
      return "峰";
    case ping:
      return "平";
    case gu:
      return "谷";
    default:
      return "";
  }
}

// 构造方法
function electric(originData) {
  // 原始数据
  try {
    if (!originData) {
      this.originData = {};
    } else {
      this.originData = JSON.parse(originData);
    }
  } catch (err) {
    console.log("原始数据格式错误，请检查：utils/electric.js/electric");
    this.originData = {};
  }
  // 初始化数据
  this.formatData = new Array(12)
    .fill("")
    .map((item) => new Array(24).fill(""));
  // 格式化原始数据
  this.formatOriginData();
}

// 格式化原始数据
electric.prototype.formatOriginData = function () {
  // 初始化数据
  this.formatData = new Array(12).fill("").map(() => new Array(24).fill(""));
  // 分别格式化
  this.originData[jian] && this.addStep(jian, this.originData[jian]);
  this.originData[feng] && this.addStep(feng, this.originData[feng]);
  this.originData[ping] && this.addStep(ping, this.originData[ping]);
  this.originData[gu] && this.addStep(gu, this.originData[gu]);
};

// 格式化电阶数据
electric.prototype.formatStepArr = function (step = "", arr = []) {
  let formatData = new Array(12).fill("").map((item) => new Array(24).fill(""));
  arr.map((item) => {
    let data = this.formatStepItem(step, item);
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 24; j++) {
        data[i][j] && (formatData[i][j] = data[i][j]);
      }
    }
  });
  return formatData;
};

electric.prototype.formatStepItem = function (step, item) {
  const { start, end, allDay, month = [] } = item;
  let formatData = new Array(12).fill("").map(() => new Array(24).fill(""));
  // 生成取时间数组time
  let time = [];
  if (allDay) {
    time = getTimeArr(0, 24);
  } else {
    if (start < end) {
      time = getTimeArr(start, end);
    } else if (start > end) {
      time = [...getTimeArr(start, 24), ...getTimeArr(0, end)];
    } else {
      console.log("注意：起始时间不能相同：utils/electric.js/formatStepItem");
    }
  }
  // 时间数组和月份数组交叉，得到二维数组
  month.map((item1) => {
    time.map((item2) => {
      formatData[item1 - 1][item2] = step;
    });
  });
  return formatData;
};

// 校验电阶
electric.prototype.validateStep = function (step, arr = [], callback) {
  // 同阶层电价校验
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let d1 = this.formatStepItem(step, arr[i]);
      let d2 = this.formatStepItem(step, arr[j]);
      for (let m = 0; m < 12; m++) {
        for (let n = 0; n < 24; n++) {
          // 重复提示
          if (d1[m][n] && d2[m][n] && d1[m][n] === d2[m][n]) {
            Vue.prototype.$message.error(
              `电阶${formatStepText(d1[m][n])}重复：${m + 1}月 ${n}:00~${
                (n + 1) % 24
              }:00`
            );
            return false;
          }
        }
      }
    }
  }
  // 异阶层电价校验
  let d = this.formatStepArr(step, arr);
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 24; j++) {
      // 重复提示
      let a = this.formatData[i][j];
      if (a !== step && a && d[i][j]) {
        Vue.prototype.$message.error(
          `电阶${formatStepText(d[i][j])}和${formatStepText(a)}重复：${
            i + 1
          }月 ${j}:00~${(j + 1) % 24}:00`
        );
        return false;
      }
    }
  }
  callback && callback();
};

// 校验电阶是否铺满
electric.prototype.validateFullStep = function () {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 24; j++) {
      // 判断是否存在
      if (!this.formatData[i][j]) {
        return false;
      }
    }
  }
  return true;
};

// 设置电阶
electric.prototype.setStep = function (step, arr = []) {
  this.originData[step] = arr;
  this.formatOriginData();
};

// 增加电阶
electric.prototype.addStep = function (step, arr = []) {
  let _formatStepArr = this.formatStepArr(step, arr);
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 24; j++) {
      // 赋值
      if (_formatStepArr[i][j]) {
        this.formatData[i][j] = step;
      }
    }
  }
};

// 获取可用的电阶类型
electric.prototype.getStepArr = function () {
  let ret = [];
  Array.isArray(this.originData[jian]) && ret.push(jian);
  Array.isArray(this.originData[feng]) && ret.push(feng);
  Array.isArray(this.originData[ping]) && ret.push(ping);
  Array.isArray(this.originData[gu]) && ret.push(gu);
  return ret;
};

// 将电阶格式化成文本数组
electric.prototype.getStepTextArr = function (step) {
  return (this.originData[step] || [])
    .map((item) => {
      let ret = "";
      // 时间
      if (item.allDay) {
        ret += "全天 (";
      } else {
        ret += item.start + ":00~" + item.end + ":00(含) (";
      }
      // 月份
      if (item.month.length <= 0) {
        return null;
      } else if (item.month.length >= 12) {
        ret += "全年";
      } else {
        ret += item.month.map((im) => im + "月").join(";");
      }
      ret += ")";
      return ret;
    })
    .filter((item) => item);
};

// 返回电价分布二维数组
electric.prototype.getFormatData = function () {
  return this.formatData;
};

// 返回电价分布原始数据
electric.prototype.getOriginData = function () {
  return this.originData;
};

export { jian, feng, ping, gu, formatStepText, electric };

const nameValueValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  if (row) {
    if (!row.name) {
      callback("不能为空");
    }
    if (row.name.length > 20) {
      callback("不能超过20个字符");
    }
  }
  callback();
};
const typeValueValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  if (row) {
    if (!row.type) {
      callback("请选择类型");
    }
  }
  callback();
};
const descTextValueValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  if (row) {
    let value = row.desc.text.value;
    if (!value || value === "0") {
      callback("请输入1-2048之间的整数");
    }
    if (value[0] === "0" && value.length > 1) {
      callback("数字不合法");
    }
    if (!/^\d+$/g.test(value)) {
      callback("数字不合法");
    }
    if (!/^\d{1,4}$/g.test(value)) {
      callback("请输入1-2048之间的整数");
    }
    if (Number(value) > 2048) {
      callback("请输入1-2048之间的整数");
    }
  }
  callback();
};
const descMultipleTextValueValidation = (
  key,
  rows,
  fields,
  _value,
  callback
) => {
  let row = rows.find((item) => key === item.key);
  if (row) {
    let value = row.desc.multipleText.value;
    if (!value || value === "0") {
      callback("请输入1-2048之间的整数");
    }
    if (value[0] === "0" && value.length > 1) {
      callback("数字不合法");
    }
    if (!/^\d+$/g.test(value)) {
      callback("数字不合法");
    }
    if (!/^\d{1,4}$/g.test(value)) {
      callback("请输入1-2048之间的整数");
    }
    if (Number(value) > 2048) {
      callback("请输入1-2048之间的整数");
    }
  }
  callback();
};
const getErrorForMinOrMax = (_value = "") => {
  let value = _value;
  // 为空，直接返回
  if (!value) {
    return "";
  }
  // 去除第一个负号
  if (value[0] === "-") {
    value = value.slice(1);
    if (!value) {
      return "数字不合法";
    }
  }
  // 判断全数字
  if (!/^\d+$/.test(value)) {
    return "数字不合法";
  }
  // 判断0的位置
  if (value[0] === "0" && value.length > 1) {
    return "数字不合法";
  }
  // 默认
  return "";
};
const descNumberMinValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  let min = row.desc.number.min || "";
  let minInclude = row.desc.number.minInclude;
  let max = row.desc.number.max || "";
  // 判空
  if (min === "" && minInclude) {
    callback("请输入最小值");
  }
  let minErrorMsg = getErrorForMinOrMax(min);
  let maxErrorMsg = getErrorForMinOrMax(max);
  minErrorMsg && callback(minErrorMsg);
  // max存在，且数字合法，则开始数值比对
  if (min && max && !maxErrorMsg) {
    if (Number(min) > Number(max)) {
      callback("不能大于最大值");
    }
  }
  callback();
};
const descNumberMaxValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  let min = row.desc.number.min || "";
  let max = row.desc.number.max || "";
  let maxInclude = row.desc.number.maxInclude;
  // 判空
  if (max === "" && maxInclude) {
    callback("请输入最大值");
  }
  let minErrorMsg = getErrorForMinOrMax(min);
  let maxErrorMsg = getErrorForMinOrMax(max);
  maxErrorMsg && callback(maxErrorMsg);
  // min存在，且数字合法，则开始数值比对
  if (min && max && !minErrorMsg) {
    if (Number(min) > Number(max)) {
      callback("不能小于最小值");
    }
  }
  callback();
};
const descNumberUnitValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  callback();
};
const descNumberDecimalValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  let decimal = row.desc.number.decimal;
  if (
    decimal !== "0" &&
    decimal !== "1" &&
    decimal !== "2" &&
    decimal !== "3" &&
    decimal !== "4" &&
    decimal !== "5"
  ) {
    callback("请输入0-5之间的整数");
  }
  callback();
};
const descSelectValueValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  let value = row.desc.select.value;
  if (!value) {
    callback("不能为空");
  }
  if (value.length > 100) {
    callback("不能超过100个字符");
  }
  callback();
};
const descImageValueValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  let value = row.desc.image.value;
  if (
    value !== "1" &&
    value !== "2" &&
    value !== "3" &&
    value !== "4" &&
    value !== "5"
  ) {
    callback("请输入1-5之间的整数");
  }
  callback();
};
const descFileValueValidation = (key, rows, fields, _value, callback) => {
  let row = rows.find((item) => key === item.key);
  // 异常情况
  if (!row) {
    callback();
  }
  let value = row.desc.file.value;
  if (
    value !== "1" &&
    value !== "2" &&
    value !== "3" &&
    value !== "4" &&
    value !== "5"
  ) {
    callback("请输入1-5之间的整数");
  }
  callback();
};

export default {
  nameValueValidation,
  typeValueValidation,
  descTextValueValidation,
  descMultipleTextValueValidation,
  descNumberMinValidation,
  descNumberMaxValidation,
  descNumberUnitValidation,
  descNumberDecimalValidation,
  descSelectValueValidation,
  descImageValueValidation,
  descFileValueValidation,
};

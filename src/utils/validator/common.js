// 通用正则element校验规则
export const allSpace = (rule, value, callback) => {
  if (!/^(?!(\s+$))/g.test(value)) {
    return callback(new Error("不能输入空格"));
  }
  return callback();
};

// 不能输入空格
export const noSpace = (rule, value, callback) => {
  if (/\s/g.test(value)) {
    return callback(new Error("不能输入空格"));
  }
  return callback();
};

// 非中文字符
export const noCH = (rule, value, callback) => {
  if (/[\u4E00-\u9FA5]/g.test(value)) {
    return callback(new Error("不能输入中文字符"));
  }
  return callback();
};

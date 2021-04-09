// 后端到前端
const type2Value = {
  1: "text",
  2: "multipleText",
  3: "number",
  4: "select",
  5: "time",
  6: "timeRange",
  7: "date",
  8: "dateRange",
  9: "image",
  10: "file",
};

const value2Type = {
  text: 1,
  multipleText: 2,
  number: 3,
  select: 4,
  time: 5,
  timeRange: 6,
  date: 7,
  dateRange: 8,
  image: 9,
  file: 10,
};

//obj可为数组或对象；[{name1:'111',type1:'type1'},{name1:'2',type1:'type2'}]或{name1:'111',type1:'type1'}
//typeArr为转换方式，如[{key:'name1',value:'name'},{key:'type1',value:'type'}]，即将obj中的name1属性改为name，将type1属性改为type

function transformProperties(obj, typeArr) {
  let result;
  let toString = Object.prototype.toString;
  if (toString.call(obj) === "[object Array]") {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = this.transformProperties(obj[i], arguments[1]);
    }
  } else if (toString.call(obj) === "[object Object]") {
    result = {};
    for (let _key in obj) {
      if (obj.hasOwnProperty(_key)) {
        let flag = 0,
          _value = null;
        for (let j = 0; j < arguments[1].length; j++) {
          if (arguments[1][j].key === _key) {
            flag = 1;
            _value = arguments[1][j].value;
          }
        }
        if (flag)
          result[_value] = this.transformProperties(obj[_key], arguments[1]);
        else result[_key] = this.transformProperties(obj[_key], arguments[1]);
      }
    }
  } else {
    return obj;
  }
  return result;
}

// 前后端互换
function typeValMap(arr) {
  return arr.map((items) => {
    return {
      ...items,
      type:
        typeof items.type === "number"
          ? type2Value[items.type]
          : value2Type[items.type],
    };
  });
}
// // 后端到前端的api映射
// function endToFront(arr) {
//   return (arr || []).map(item => {
//       name: item.name || '',
//       type: item.param_type,
//       desc: ({
//         switch (item.param_type) {
//
//         }
//       })()
//   });
// }

// 前端到后端的api映射
function frontToEnd(arr) {}

export default {
  transformProperties,
  typeValMap,
};

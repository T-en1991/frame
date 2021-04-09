import { workUnitMap } from "@/utils/workUnit.js";

// 后端到前端
const paraType__EndToFront = {
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

// 前端到后端
export const paraType__FrontToEnd = {
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

// 格式化参数类型
const paraTypeFormat = (type) => {
  switch (type) {
    case "text":
      return "文本";
    case "multipleText":
      return "多行文本";
    case "number":
      return "数字";
    case "select":
      return "下拉框";
    case "time":
      return "时间";
    case "timeRange":
      return "时间范围";
    case "date":
      return "日期";
    case "dateRange":
      return "日期范围";
    case "image":
      return "图片";
    case "file":
      return "文件";
    default:
      return "未知";
  }
};

// 格式化参数说明
const paraDescFormat = (row) => {
  // return JSON.stringify(row.desc);
  const { text, multipleText, number, select, image, file } = row.desc;
  let _num = "";
  switch (row.type) {
    case "text":
      return `最多可输入${text.value}个字符`;
    case "multipleText":
      return `最多可输入${multipleText.value}个字符`;
    case "number":
      // 上线限
      if (number.min && number.max) {
        _num +=
          `${number.min} ` +
          `${number.minInclude ? "含" : "不含"}` +
          `  ~  ` +
          `${number.max} ` +
          `${number.maxInclude ? "含" : "不含"}  `;
      } else if (!number.min && !number.max) {
        _num += "不限  ";
      } else if (number.min && !number.max) {
        _num +=
          `${number.min} ` +
          `${number.minInclude ? "含" : "不含"}` +
          `  ~  ` +
          `不限  `;
      } else if (!number.min && number.max) {
        _num +=
          `不限` +
          `  ~  ` +
          `${number.max} ` +
          `${number.maxInclude ? "含" : "不含"}  `;
      }
      // 小数点位数
      _num += `小数点位数${number.decimal}  `;
      // 单位
      _num += `单位${
        number.unit && workUnitMap[number.unit]
          ? workUnitMap[number.unit]
          : "无"
      }`;
      return _num;
    case "select":
      return `${select.value}  ${select.multiple ? "多选" : "单选"}`;
    case "time":
      return "yyyy-mm-dd hh:mm:ss";
    case "timeRange":
      return "yyyy-mm-dd hh:mm:ss ~ yyyy-mm-dd hh:mm:ss";
    case "date":
      return "yyyy-mm-dd";
    case "dateRange":
      return "yyyy-mm-dd ~ yyyy-mm-dd";
    case "image":
      return `最多上传${image.value}张图片，只能上传jpg、png文件，每张图片最大1M`;
    case "file":
      return `最多上传${file.value}个文件，只能上传pdf、doc、docx、xls、xlsx、ppt、pptx，每个文件最大5M`;
    default:
      return "未知";
  }
};

// 后端到前端的api映射
function endToFront(arr) {
  return (arr || []).map((item) => {
    let value1 = {};
    let value2 = {};
    return {
      name: item.name || "",
      type: paraType__EndToFront[item.paramType] || "",
      desc: (function () {
        switch (item.paramType) {
          case 1:
            return { text: { value: item.paramExplain || "" } };
          case 2:
            return { multipleText: { value: item.paramExplain || "" } };
          case 3:
            try {
              value1 = JSON.parse(item.paramExplain);
            } catch (e) {
              console.log(
                "后端返回字段param_explaiin异常，请后端同事检查(文件路径：utils/transformProperties.js)" +
                  e
              );
            }
            return {
              number: {
                min: value1.min || "",
                minInclude: value1.include || false,
                max: value1.max || "",
                maxInclude: value1.include1 || false,
                decimal: value1.decimal || "",
                unit: value1.unit || "",
              },
            };
          case 4:
            try {
              value2 = JSON.parse(item.paramExplain);
            } catch (e) {
              console.log(
                "后端返回字段param_explaiin异常，请后端同事检查(文件路径：utils/transformProperties.js)" +
                  e
              );
            }
            return {
              select: {
                value: value2.dropDown || "",
                multiple: value2.multiple || false,
              },
            };
          case 5:
          case 6:
          case 7:
          case 8:
            return {};
          case 9:
            return { image: { value: item.paramExplain } };
          case 10:
            return { file: { value: item.paramExplain } };
          default:
            console.log(
              "后端返回param_type字段错误，请后端同事检查(utils/transformProperties.js)"
            );
            return {};
        }
      })(),
      isRequired: item.must + "" === "1",
    };
  });
}

// 前端到后端的api映射
function frontToEnd(arr) {
  return (arr || []).map((item) => {
    let _explain = (function () {
      switch (item.type) {
        case "text":
          return item.desc.text.value;
        case "multipleText":
          return item.desc.multipleText.value;
        case "number":
          return {
            min: item.desc.number.min,
            include: item.desc.number.minInclude,
            max: item.desc.number.max,
            include1: item.desc.number.maxInclude,
            decimal: item.desc.number.decimal,
            unit: item.desc.number.unit,
          };
        case "select":
          return {
            dropDown: item.desc.select.value,
            multiple: item.desc.select.multiple,
          };
        case "time":
          return "yyyy-mm-dd hh:mm:ss";
        case "timeRange":
          return "yyyy-mm-dd hh:mm:ss~yyyy-mm-dd hh:mm:ss";
        case "date":
          return "yyyy-mm-dd";
        case "dateRange":
          return "yyyy-mm-dd~yyyy-mm-dd";
        case "image":
          return item.desc.image.value || "";
        case "file":
          return item.desc.file.value || "";
      }
    })();
    return {
      name: item.name,
      paramType: paraType__FrontToEnd[item.type] || 0,
      paramExplain:
        typeof _explain === "object" ? JSON.stringify(_explain) : _explain,
      must: item.isRequired ? 1 : 0,
    };
  });
}

export default {
  paraTypeFormat,
  paraDescFormat,
  endToFront,
  frontToEnd,
};

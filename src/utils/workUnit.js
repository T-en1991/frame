import dictService from "@/prototype/service/dict.js";
import Cookies from "js-cookie";

// 工单单位映射
const workUnitMap = {};
const workUnitList = [];

// 触发工单单位查询
function workUnitTrigger() {
  const token = Cookies.get("token");
  if (!token) return false;
  dictService.getTenantDict(11888).then((res) => {
    // 清除对象属性
    for (var key in workUnitMap) {
      delete workUnitMap[key];
    }
    // 清除数组属性
    workUnitList.length = 0;
    // 添加对象属性
    (res || []).forEach((item) => {
      workUnitMap[item.dataId] = item.dataName;
      workUnitList.push({ label: item.dataName, value: item.dataId });
    });
  });
}

export { workUnitMap, workUnitList, workUnitTrigger };

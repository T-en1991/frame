// 参数类型 - 初始值描述
const getInitDesc = () => {
  return {
    text: {
      value: "2048",
    },
    multipleText: {
      value: "2048",
    },
    number: {
      min: "",
      minInclude: false,
      max: "",
      maxInclude: false,
      decimal: "",
      unit: "",
    },
    select: {
      value: "",
      multiple: false,
    },
    image: {
      value: "",
    },
    file: {
      value: "",
    },
  };
};

export default {
  getInitDesc,
};

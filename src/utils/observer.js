import _ from "lodash";
// 数据观察者
// Todo: 考虑用defineProperty替代现在的定时器方案
export default function observer(data, _options) {
  // 参数配置
  this.options = {
    immediate: true, // 是否立即执行，默认否
    cycle: 100, // 定时器执行周期，默认100ms
    ..._options,
  };
  // 观察数据
  this.data = data || {};
  // 对比数据
  this.relativeData = JSON.parse(JSON.stringify(this.data));
  // 绑定属性
  this.bindKeys = {};
  // 定时器
  this.interval = null;
  // 是否立即执行
  if (this.options.immediate) {
    this.start();
  }
}

// 绑定数据观察
observer.prototype.attach = function (key, callback) {
  // 已存在，则不允许继续添加
  if (!key) {
    return false;
  }
  if (!this.bindKeys[key]) {
    this.bindKeys[key] = callback;
  }
};

// 解除数据观察
observer.prototype.detach = function (key) {
  // 删除属性
  delete this.bindKeys[key];
};

// 开始观察
observer.prototype.start = function () {
  // 定时器开始
  this.interval = setInterval(() => {
    // 遍历观察对象
    // 注：这里只遍历简单类型
    for (let key in this.bindKeys) {
      // 发现数据不一致
      if (_.get(this.data, key) !== _.get(this.relativeData, key)) {
        // 重新赋值
        _.set(this.relativeData, key, _.get(this.data, key));
        // 触发事件
        this.bindKeys[key] && this.bindKeys[key]();
      }
    }
  }, this.options.cycle);
};

// 停止观察
observer.prototype.stop = function () {
  clearInterval(this.interval);
};

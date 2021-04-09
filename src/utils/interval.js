/**
 * 一个周期为：wait + 一次异步函数执行的时间
 * 参数： func：function 表示一个异步函数
 *        wait: number 表示执行的间隔毫秒数
 *        immediate: boolean 表示是否立即执行
 */
const interval = function (func, wait = 3000, immediate = true) {
  this.func = () => {
    return func();
  };
  this.wait = wait;
  this.immediate = immediate;
  this.timer = null;
};

interval.prototype.start = async function () {
  if (this.immediate) {
    await this.func();
  }
  const timeout = () => {
    this.timer = setTimeout(async () => {
      await this.func();
      if (this.timer) {
        timeout();
      }
    }, this.wait);
  };
  timeout();
};

interval.prototype.stop = function () {
  clearTimeout(this.timer);
  this.timer = null;
};

export default interval;

/*

  构造方法参数：url: ws地址
  构造方法参数：receive: 接收方法
  构造方法参数：options: 配置项
  实例方法：send: 发送消息

  示例：
  let ws = new websocket('ws://123.207.136.134:9010/ajaxchattest', data => {
    // 接收消息
    console.log(data);
  });
  // 发送消息
  ws.send('abc');
  // 关闭连接
  ws.close();

*/

const websocket = function (url, receive, options) {
  this.WS = null;
  this.url = url;
  this._setUrl();
  this.receive = receive;
  this.closed = false;
  this.options = {
    cycle: 5000,
    ...options,
  };
  // 初始化
  this._init();
  // 开启定时器
  this.heartInterval = setInterval(() => {
    if (this.WS && !this.closed) {
      this.WS.send("heartCheck");
    }
  }, 30000);
};

websocket.prototype._init = function () {
  this.WS = new WebSocket(this.url);
  this.WS.onopen = () => {
    console.log("连接成功：" + this.url);
  };
  this.WS.onclose = () => {
    console.log("连接关闭：" + this.url);
    console.log("开始重连：" + this.url);
    setTimeout(() => {
      this._reConnect();
    }, this.options.cycle);
  };
  this.WS.onerror = () => {
    console.log("连接异常：" + this.url);
  };
  this.WS.onmessage = (e) => {
    if (e.data !== "heartCheck") {
      this.receive(JSON.parse(e.data));
    }
  };
};

// 修正url
websocket.prototype._setUrl = function () {
  let protocol = window.location.protocol
    .replace("https:", "wss:")
    .replace("http:", "ws:");
  let gateway = window.constant.VUE_APP_GATEWAY_DOMAIN.replace(
    "https:",
    ""
  ).replace("http:", "");
  this.url = `${protocol}${gateway}${window.constant.VUE_APP_API_URL}${this.url}`;
};

// 断开重连
websocket.prototype._reConnect = function () {
  if (!this.closed) {
    this._init();
  }
};

// 发送消息
websocket.prototype.send = function (data) {
  this.WS.send(data);
};

// 关闭连接
websocket.prototype.close = function () {
  this.WS.send("close");
  this.WS.close();
  this.closed = true;
  clearInterval(this.heartInterval);
};

export default websocket;

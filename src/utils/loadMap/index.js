/* <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.4&key=你申请的key"></script>  */
const mapConfig = require("./config.js");

function pingUrl() {
  const { version, key } = mapConfig;
  return `https://webapi.amap.com/maps?v=${version}&key=${key}`;
}

function createScript() {
  const script = document.createElement("script");
  const src = pingUrl();
  script.src = src;
  script.type = "text/javascript";
  script.setAttribute("defer", true);
  return script;
}

function load() {
  return new Promise((s) => {
    const head = document.head;
    const script = createScript();
    head.appendChild(script);
    script.onload = () => {
      s();
    };
  });
}

module.exports = {
  load,
};

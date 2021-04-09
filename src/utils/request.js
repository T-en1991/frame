import Vue from "vue";

export default function request() {
  return Vue.prototype.$requestService.get("gec");
}

import Vue from "vue";

/**权限指令**/

const has = Vue.directive("has", {
  inserted: function (el, binding, vnode) {
    let btnPermissions = "";
    let characteristic = binding.value;
    if (characteristic) btnPermissions = characteristic;
    console.log(vnode.context.$route.meta);
    btnPermissions = vnode.context.$route.meta.btnPermissions.split(",");
    if (!Vue.prototype.$_has(btnPermissions)) {
      el.parentNode.removeChild(el);
    }
  },
});

// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false;
  let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
  if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
    return false;
  }
  let res = value.filter((x) => {
    return btnPermissionsStr.include(x);
  });
  if (res.length > 0) isExist = true;
  return isExist;
};
export { has };

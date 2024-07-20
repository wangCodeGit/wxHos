"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_js_utils = require("./common/js/utils.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/order/index.js";
  "./pages/user/index.js";
  "./pages/search/index.js";
  "./pages/hospital/index.js";
  "./pages/service/index.js";
  "./pages/clients/index.js";
  "./pages/order/orderDetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_js_utils.utils.request({
      url: "/app/init",
      sucess: (res) => {
        common_vendor.index.setStorageSync("cfg", res.data.cfg);
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    utils: common_js_utils.utils,
    orders_filt: ""
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp-prj/yitong/App.vue"]]);
Date.prototype.VP_FORMAT = function(format) {
  console.log("==========>this.getDate() " + this.getTime() / (24 * 60 * 60 * 1e3));
  console.log("==========>new Date().getDate() " + (/* @__PURE__ */ new Date()).getTime() / (24 * 60 * 60 * 1e3));
  var ds = parseInt(this.getTime() / (24 * 60 * 60 * 1e3)) - parseInt((/* @__PURE__ */ new Date()).getTime() / (24 * 60 * 60 * 1e3));
  var n = "";
  if (ds == 0) {
    n = "(今天)";
  }
  if (ds == 1) {
    n = "(明天)";
  }
  if (ds == 2) {
    n = "(后天)";
  }
  if (ds == -1) {
    n = "(昨天)";
  }
  if (ds == -2) {
    n = "(前天)";
  }
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds(),
    "n+": n
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

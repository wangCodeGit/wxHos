"use strict";
const common_vendor = require("../../../common/vendor.js");
function setNavSize() {
  const navHeight = common_vendor.ref(0);
  const { system, statusBarHeight } = common_vendor.index.getSystemInfoSync();
  const isIos = system.indexOf("ios") > -1;
  if (!isIos) {
    navHeight.value = 96;
  } else {
    navHeight.value = 88;
  }
  return { navHeight };
}
exports.setNavSize = setNavSize;

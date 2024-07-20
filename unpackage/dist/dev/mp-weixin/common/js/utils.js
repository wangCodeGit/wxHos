"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "http://159.75.169.224:7300/pz";
  }
  //获取用户信息
  getUserInfo() {
    common_vendor.index.login({
      success: (res) => {
        console.log(res);
        this.request({
          url: "/auth/wxLogin",
          data: {
            code: res.code
          },
          sucess: (res2) => {
            console.log(res2, "hhhh");
          }
        });
      }
    });
  }
  //封装发送请求req
  request(option = { showLoading: false }) {
    if (!option.url) {
      return false;
    }
    if (option.showLoading) {
      this.showLoading();
    }
    common_vendor.index.request({
      url: this.baseUrl + option.url,
      data: option.data ? option.data : {},
      header: option.header ? option.header : {},
      method: option.method ? option.method : "GET",
      success: (response2) => {
        common_vendor.index.hideLoading();
        if (response2.data.code != 1e4) {
          if (option.fail && typeof option.fail == "function") {
            option.fail(response2);
          }
        } else {
          if (option.sucess && typeof option.sucess == "function") {
            option.sucess(response2.data);
          }
        }
      },
      fail: () => {
        common_vendor.index.hideLoading();
        console.log(response);
      }
    });
  }
  //创建加载的loading效果
  showLoading() {
    const isShowLoading = common_vendor.index.getStorageSync("isShowLoading");
    if (isShowLoading) {
      common_vendor.index.hideLoading();
      common_vendor.index.setStorageSync("isShowLoading", false);
    }
    common_vendor.index.showLoading({
      title: "加载中...",
      success() {
        common_vendor.index.setStorageSync("isShowLoading", true);
      },
      fail() {
        common_vendor.index.setStorageSync("isShowLoading", false);
      }
    });
  }
}
const utils = new Utils();
exports.utils = utils;

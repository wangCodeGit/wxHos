"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    const act = common_vendor.ref("");
    const clients = common_vendor.ref([]);
    common_vendor.onLoad((option) => {
      act.value = option.act;
      if (option.act == "select") {
        common_vendor.index.setNavigationBarTitle({
          title: "请选择服务对象"
        });
      } else {
        common_vendor.index.setNavigationBarTitle({
          title: "服务对象管理"
        });
      }
      app.globalData.utils.request({
        url: "/User/clients",
        sucess: (res) => {
          console.log(res);
          clients.value = res.data.clients;
        }
      });
    });
    const onClientSelected = (item) => {
      if (act.value == "") {
        return;
      }
      const client = common_vendor.toRaw(item);
      common_vendor.index.$emit("clientChange", client);
      common_vendor.index.navigateBack();
    };
    const removeClient = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(clients.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.sex == 1 ? "男" : "女"),
            c: common_vendor.n("sext" + item.sex),
            d: common_vendor.t(item.age),
            e: common_vendor.t(item.mobile)
          }, act.value == "select" ? {} : {
            f: common_vendor.o(removeClient, index),
            g: item.id
          }, {
            h: common_vendor.o(($event) => onClientSelected(item), index),
            i: index,
            j: index
          });
        }),
        b: act.value == "select"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp-prj/yitong/pages/clients/index.vue"]]);
wx.createPage(MiniProgramPage);

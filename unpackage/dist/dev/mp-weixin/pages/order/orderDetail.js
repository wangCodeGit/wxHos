"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_counter2 = common_vendor.resolveComponent("counter");
  const _easycom_formater2 = common_vendor.resolveComponent("formater");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_counter2 + _easycom_formater2 + _easycom_uni_popup2)();
}
const _easycom_counter = () => "../../components/counter/counter.js";
const _easycom_formater = () => "../../components/formater/formater.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_counter + _easycom_formater + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "orderDetail",
  setup(__props) {
    const app = getApp();
    let oid = "";
    common_vendor.onLoad((options) => {
      oid = options.oid;
      getOrderDetail(oid);
    });
    const order = common_vendor.ref({});
    const getOrderDetail = (oid2) => {
      app.globalData.utils.request({
        url: "/order/detail",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: {
          oid: oid2
        },
        sucess(res) {
          console.log(res);
          order.value = res.data;
        }
      });
    };
    const orderStatus = common_vendor.computed(() => {
      const map = {
        "待支付": "10",
        "待服务": "20",
        "已完成": "30",
        "已取消": "40"
      };
      return map[order.value.trade_state];
    });
    const onCounterOver = () => {
      getOrderDetail(oid);
    };
    const qrcodePopup = common_vendor.ref();
    const dopay = () => {
      qrcodePopup.value.open("center");
      const qr = new common_vendor.UQRCode();
      qr.data = order.value.code_url;
      qr.size = 150;
      qr.make();
      var canvasContext = common_vendor.index.createCanvasContext("qrcode");
      qr.canvasContext = canvasContext;
      qr.drawCanvas();
    };
    const payment = () => {
      common_vendor.index.switchTab({
        //跳转到tabBar标签  要用switchTab
        url: "/pages/order/index"
      });
    };
    const makePhoneCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: order._staff.mobile
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n("od-jd od-jd-" + orderStatus.value),
        b: orderStatus.value == 10
      }, orderStatus.value == 10 ? {
        c: common_vendor.o(onCounterOver),
        d: common_vendor.p({
          second: order.value._exp_time
        }),
        e: common_vendor.t(order.value.price),
        f: common_vendor.o(dopay)
      } : {}, {
        g: orderStatus.value == 20
      }, orderStatus.value == 20 ? common_vendor.e({
        h: order.value.service_state == 0
      }, order.value.service_state == 0 ? {} : {}, {
        i: order.value.service_state == 1
      }, order.value.service_state == 1 ? {} : {}) : {}, {
        j: orderStatus.value == 30
      }, orderStatus.value == 30 ? {} : {}, {
        k: orderStatus.value == 40
      }, orderStatus.value == 40 ? {} : {}, {
        l: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        m: order.value._staff.avatar_url,
        n: common_vendor.t(order.value._staff.nickname),
        o: common_vendor.o(makePhoneCall),
        p: order.value._staff.mobile
      } : {}, {
        q: common_vendor.t(order.value.service_name),
        r: order.value.service_stype <= 20
      }, order.value.service_stype <= 20 ? common_vendor.e({
        s: common_vendor.t(order.value.hospital_name),
        t: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        v: common_vendor.t(order.value.client_name),
        w: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        x: common_vendor.t(order.value.client_age),
        y: common_vendor.t(order.value.tel),
        z: order.value.service_stype == 15
      }, order.value.service_stype == 15 ? {
        A: common_vendor.t(order.value.receiveAddress)
      } : {}) : {}, {
        B: order.value.service_stype > 20 && order.value.service_stype < 100
      }, order.value.service_stype > 20 && order.value.service_stype < 100 ? {
        C: common_vendor.t(order.value.hospital_name),
        D: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        E: common_vendor.t(order.value.address.userName),
        F: common_vendor.t(order.value.address.telNumber),
        G: common_vendor.t(order.value.address.cityName),
        H: common_vendor.t(order.value.address.countyName),
        I: common_vendor.t(order.value.address.detailInfo)
      } : {}, {
        J: order.value.service_stype > 100
      }, order.value.service_stype > 100 ? {
        K: common_vendor.p({
          timestamp: order.value.starttime,
          format: "YYYY-MM-dd hh:mm"
        }),
        L: common_vendor.t(order.value.client_name),
        M: common_vendor.t(order.value.client_sex == 1 ? "男" : "女"),
        N: common_vendor.t(order.value.client_age),
        O: common_vendor.t(order.value.client_mobile),
        P: common_vendor.t(order.value.address.address)
      } : {}, {
        Q: common_vendor.t(order.value.demand),
        R: common_vendor.t(order.value.tel),
        S: common_vendor.p({
          timestamp: order.value.order_start_time,
          format: "YYYY-MM-dd hh:mm"
        }),
        T: common_vendor.t(order.value.price),
        U: orderStatus.value == 20
      }, orderStatus.value == 20 ? {
        V: common_vendor.t(order.value.price),
        W: common_vendor.p({
          timestamp: order.value.pay_time,
          format: "YYYY-MM-dd hh:mm"
        })
      } : {}, {
        X: common_vendor.t(order.value.out_trade_no),
        Y: common_vendor.o(payment),
        Z: common_vendor.sr(qrcodePopup, "61fff580-6", {
          "k": "qrcodePopup"
        }),
        aa: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp-prj/yitong/pages/order/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);

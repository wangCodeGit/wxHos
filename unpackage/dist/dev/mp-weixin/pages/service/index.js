"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_dtPicker2 = common_vendor.resolveComponent("dtPicker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_dtPicker2 + _easycom_uni_popup2)();
}
const _easycom_dtPicker = () => "../../components/dtPicker/dtPicker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_dtPicker + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const app = getApp();
    common_vendor.onLoad((option) => {
      main_load(option);
    });
    const popup = common_vendor.ref();
    const qrcodePopup = common_vendor.ref();
    const service = common_vendor.ref({});
    const hospitals = common_vendor.ref([]);
    let hospitalsData = [];
    const hospital_index = common_vendor.ref(0);
    const order = common_vendor.reactive({
      price: "",
      starttime: "",
      receiveAddress: "",
      tel: "",
      demand: "",
      address: {
        userName: "",
        cityName: "",
        countyName: "",
        detailInfo: ""
      }
    });
    const client = common_vendor.reactive({
      name: ""
    });
    const is_xieyi = common_vendor.ref(false);
    const cfg = common_vendor.reactive({
      page_xy: "",
      page_fw: ""
    });
    const validMobile = common_vendor.reactive({
      phone: "",
      validCode: ""
    });
    const countdown = common_vendor.reactive({
      validText: "获取验证码",
      time: 60
    });
    const main_load = (option) => {
      app.globalData.utils.request({
        url: "/Service/order",
        data: {
          svid: option.svid
        },
        sucess: (res) => {
          service.value = res.data.service;
          hospitals.value = res.data.hospitals;
          hospitalsData = common_vendor.toRaw(hospitals.value);
          if (option.hid > 0) {
            for (let i = 0; i < hospitalsData.length; i++) {
              if (hospitalsData[i].id == option.hid) {
                hospital_index.value = i;
                order.price = hospitalsData[i].service_price;
                break;
              }
            }
          }
        }
      });
    };
    const handleTap = () => {
    };
    const onHospitalChange = (e) => {
      const value = parseInt(e.detail.value);
      hospital_index.value = value;
      order.price = hospitalsData[value].service_price;
    };
    const onStartTimeChanged = (e) => {
      order.starttime = e.detail.value;
    };
    const onClientChange = (e) => {
      common_vendor.index.navigateTo({
        url: "/pages/clients/index?act=select"
      });
    };
    common_vendor.index.$on("clientChange", (data) => {
      client.name = data.name;
      client.id = data.user_id;
      client.sex = data.sex;
      client.age = data.age;
      client.mobile = data.mobile;
    });
    const onAddressChange = () => {
      common_vendor.index.chooseAddress({
        success: (res) => {
          order.address.userName = res.userName;
          order.address.cityName = res.cityName;
          order.address.countyName = res.countyName;
          order.address.detailInfo = res.detailInfo;
        },
        fail: (res) => {
          console.log(res);
        }
      });
    };
    const onXieyiChange = () => {
      is_xieyi.value = !is_xieyi.value;
    };
    let orderData = {};
    const submit = () => {
      if (!is_xieyi.value) {
        return common_vendor.index.showToast({
          title: "请先阅读并同意用户协议和服务协议",
          icon: "none",
          duration: 1e3
        });
      }
      orderData = common_vendor.toRaw(order);
      const serviceData = common_vendor.toRaw(service.value);
      const hospitalData = common_vendor.toRaw(hospitals.value);
      const clientData = common_vendor.toRaw(client);
      orderData.service_code = serviceData.code;
      orderData.service_id = serviceData.id;
      orderData.service_name = serviceData.name;
      orderData.service_stype = serviceData.stype;
      if (serviceData.stype < 100) {
        if (hospital_index.value == 0) {
          return common_vendor.index.showToast({
            title: "请选择医院",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.hospital_id = hospitalData[hospital_index.value].id;
        orderData.hospital_name = hospitalData[hospital_index.value].name;
      }
      if (!orderData.starttime) {
        return common_vendor.index.showToast({
          title: "请选择服务时间",
          icon: "none",
          duration: 1e3
        });
      }
      if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
        console.log(clientData);
        if (!clientData.id) {
          return common_vendor.index.showToast({
            title: "请选择就诊人",
            icon: "none",
            duration: 1e3
          });
        }
        orderData.client = {};
        orderData.client.age = clientData.age;
        orderData.client.mobile = clientData.mobile;
        orderData.client.name = clientData.name;
        orderData.client.sex = clientData.sex;
        if (serviceData.stype == 15) {
          if (!orderData.receiveAddress) {
            return common_vendor.index.showToast({
              title: "请选择就诊人接送地址",
              icon: "none",
              duration: 1e3
            });
          }
        }
      }
      if (serviceData.stype == 30 || serviceData.stype == 40) {
        if (!orderData.address.userName) {
          return common_vendor.index.showToast({
            title: "请选择收件信息",
            icon: "none",
            duration: 1e3
          });
        }
      }
      if (!orderData.tel) {
        return common_vendor.index.showToast({
          title: "请填写联系电话",
          icon: "none",
          duration: 1e3
        });
      }
      console.log(orderData, "88888888888888888888888888888");
      if (!common_vendor.index.getStorageSync("token")) {
        popup.value.open("center");
      } else {
        createOrder();
      }
    };
    const ok = () => {
      if (!validMobile.phone || !validMobile.validCode) {
        return common_vendor.index.showToast({
          title: "请检查填写数据",
          icon: "none",
          duration: 1e3
        });
      }
      app.globalData.utils.request({
        url: "/user/authentication",
        method: "POST",
        data: {
          tel: validMobile.phone,
          code: validMobile.validCode
        },
        sucess: (res) => {
          common_vendor.index.setStorageSync("token", res.data.token);
          createOrder();
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const cancal = () => {
      popup.value.close();
    };
    let flag = false;
    const countdownChange = () => {
      if (!validMobile.phone) {
        return common_vendor.index.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 1e3
        });
      }
      console.log(flag);
      if (flag)
        return;
      const time = setInterval(() => {
        if (countdown.time <= 0) {
          countdown.validText = "获取验证码";
          countdown.time = 60;
          flag = false;
          clearInterval(time);
        } else {
          countdown.time--;
          countdown.validText = `剩余${countdown.time}s`;
        }
      }, 1e3);
      flag = true;
      app.globalData.utils.request({
        url: "/get/code",
        method: "POST",
        data: {
          tel: validMobile.phone
        },
        sucess: (res) => {
          common_vendor.index.showToast({
            title: "验证码发送成功，请尽快验证",
            icon: "none",
            duration: 1e3
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none",
            duration: 1e3
          });
        }
      });
    };
    const createOrder = () => {
      app.globalData.utils.request({
        url: "/pay/createOrder",
        method: "POST",
        header: {
          token: common_vendor.index.getStorageSync("token")
        },
        data: orderData,
        sucess: (res) => {
          qrcodePopup.value.open("center");
          const qr = new common_vendor.UQRCode();
          qr.data = res.wx_code;
          qr.size = 150;
          qr.make();
          var canvasContext = common_vendor.index.createCanvasContext("qrcode");
          qr.canvasContext = canvasContext;
          qr.drawCanvas();
        },
        fail: (res) => {
        }
      });
    };
    const payment = () => {
      common_vendor.index.switchTab({
        //跳转到tabBar标签  要用switchTab
        url: "/pages/order/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: service.value.icon_image ? service.value.icon_image_url : "../../static/resource/images/avatar.jpg",
        b: common_vendor.t(service.value.name),
        c: common_vendor.t(service.value.name),
        d: common_vendor.o(handleTap),
        e: service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20
      }, service.value.stype == 10 || service.value.stype == 15 || service.value.stype == 20 ? common_vendor.e({
        f: hospitals.value[hospital_index.value].name,
        g: common_vendor.o(onHospitalChange),
        h: hospital_index.value,
        i: hospitals.value,
        j: common_vendor.o(onStartTimeChanged),
        k: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择就诊时间"
        }),
        l: client.name,
        m: common_vendor.o(onClientChange),
        n: service.value.stype == 15
      }, service.value.stype == 15 ? {
        o: order.receiveAddress,
        p: common_vendor.o(($event) => order.receiveAddress = $event.detail.value)
      } : {}, {
        q: order.tel,
        r: common_vendor.o(($event) => order.tel = $event.detail.value),
        s: order.demand,
        t: common_vendor.o(($event) => order.demand = $event.detail.value)
      }) : {}, {
        v: service.value.stype == 30 || service.value.stype == 40
      }, service.value.stype == 30 || service.value.stype == 40 ? {
        w: hospitals.value[hospital_index.value].name,
        x: common_vendor.o(onHospitalChange),
        y: hospital_index.value,
        z: hospitals.value,
        A: common_vendor.o(onStartTimeChanged),
        B: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        C: order.address.userName ? order.address.userName + "(" + order.address.cityName + order.address.countyName + order.address.detailInfo + ")" : "",
        D: common_vendor.o(onAddressChange),
        E: order.tel,
        F: common_vendor.o(($event) => order.tel = $event.detail.value),
        G: order.demand,
        H: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        I: service.value.stype == 110
      }, service.value.stype == 110 ? {
        J: common_vendor.o(onStartTimeChanged),
        K: common_vendor.p({
          timestamp: order.starttime,
          placeholder: "请选择期望服务时间"
        }),
        L: client.name,
        M: common_vendor.o(onClientChange),
        N: order.receiveAddress,
        O: common_vendor.o(($event) => order.receiveAddress = $event.detail.value),
        P: order.tel,
        Q: common_vendor.o(($event) => order.tel = $event.detail.value),
        R: order.demand,
        S: common_vendor.o(($event) => order.demand = $event.detail.value)
      } : {}, {
        T: common_vendor.n("is_xieyi " + (is_xieyi.value ? "is_xieyi_on" : "")),
        U: common_vendor.o(onXieyiChange),
        V: cfg.page_xy,
        W: cfg.page_fw,
        X: order.price > 0
      }, order.price > 0 ? {
        Y: common_vendor.t(order.price)
      } : {}, {
        Z: common_vendor.n("btnp " + (is_xieyi.value ? "" : "btnp-disabled")),
        aa: common_vendor.o(submit),
        ab: validMobile.phone,
        ac: common_vendor.o(($event) => validMobile.phone = $event.detail.value),
        ad: validMobile.validCode,
        ae: common_vendor.o(($event) => validMobile.validCode = $event.detail.value),
        af: common_vendor.t(countdown.validText),
        ag: common_vendor.o(countdownChange),
        ah: common_vendor.o(cancal),
        ai: common_vendor.o(ok),
        aj: common_vendor.sr(popup, "47c0ce7a-3", {
          "k": "popup"
        }),
        ak: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        }),
        al: common_vendor.o(payment),
        am: common_vendor.sr(qrcodePopup, "47c0ce7a-4", {
          "k": "qrcodePopup"
        }),
        an: common_vendor.p({
          type: "center",
          ["is-mask-click"]: false,
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp-prj/yitong/pages/service/index.vue"]]);
wx.createPage(MiniProgramPage);

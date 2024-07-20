"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "navbar",
  props: {
    background: {
      type: String,
      default: "rgba(255, 255, 255 1)"
    },
    color: {
      type: String,
      default: "rgba(0, 0, 0 1)"
    },
    fontSize: {
      type: String,
      default: 32
    },
    iconWidth: {
      type: String,
      default: 116
    },
    iconHeight: {
      type: String,
      default: 38
    },
    titleText: {
      type: String,
      default: ""
    },
    isHome: {
      type: Boolean,
      default: false
    }
  },
  emits: "navBarAttached",
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    common_vendor.onBeforeMount(() => {
      setNavSize();
      setStyle();
      emit("navBarAttached", {
        detail: {
          statusHeight: status.value,
          navHeight: navHeight.value,
          navBarHeight: status.value + navHeight.value
        }
      });
    });
    const status = common_vendor.ref(0);
    const navHeight = common_vendor.ref(0);
    const containerStyle = common_vendor.ref("");
    const textStyle = common_vendor.ref("");
    const iconStyle = common_vendor.ref("");
    const pages = common_vendor.ref(getCurrentPages().length);
    const menu = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    const setNavSize = () => {
      const { system, statusBarHeight } = common_vendor.index.getSystemInfoSync();
      status.value = statusBarHeight * 2;
      const isIos = system.indexOf("ios") > -1;
      if (!isIos) {
        navHeight.value = 96;
      } else {
        navHeight.value = 88;
      }
    };
    const setStyle = () => {
      containerStyle.value = ["background:" + props.background].join(";");
      textStyle.value = ["color:" + props.color, "font-size:" + props.fontSize + "rpx"].join(";");
      iconStyle.value = ["width:" + props.iconWidth + "rpx", "height:" + props.iconHeight + "rpx"];
    };
    const backOrHome = () => {
      console.log(pages, "hhhhhhh");
      if (pages.value > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/user/index"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + status.value + "rpx;" + containerStyle.value),
        b: __props.isHome
      }, __props.isHome ? {
        c: common_vendor.s("height:" + menu.height * 2 + "rpx;line-height:" + menu.height * 2 + "rpx;margin-top: " + (menu.top * 2 - status.value) + "rpx;margin-left: 32rpx;margin-right: " + (menu.width * 2 + 24) + "rpx;background: #f4f4f4;border-radius: 200rpx;text-align: center;background: #f4f4f4;"),
        d: common_vendor.s("height:" + navHeight.value + "rpx;line-height:" + navHeight.value + "rpx;padding-left: 20rpx;" + containerStyle.value)
      } : common_vendor.e({
        e: pages.value > 1
      }, pages.value > 1 ? {} : {}, {
        f: common_vendor.o(($event) => backOrHome()),
        g: __props.titleText
      }, __props.titleText ? {
        h: common_vendor.t(__props.titleText),
        i: common_vendor.s("height:" + navHeight.value + "rpx; line-height:" + navHeight.value + "rpx;" + textStyle.value)
      } : {}, {
        j: common_vendor.s("height:" + navHeight.value + "rpx;" + containerStyle.value)
      }));
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp-prj/yitong/components/navbar/navbar.vue"]]);
wx.createComponent(Component);

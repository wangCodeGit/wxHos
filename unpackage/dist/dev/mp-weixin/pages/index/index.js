"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_utils_hooks_topbar = require("../utils/hooks/topbar.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  _easycom_navbar2();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
if (!Math) {
  _easycom_navbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const { navHeight } = pages_utils_hooks_topbar.setNavSize();
    const app = getApp();
    const slides = common_vendor.ref([]);
    const nav2s = common_vendor.ref([]);
    const navs = common_vendor.ref([]);
    const hospitals = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      app.globalData.utils.request({
        url: "/app/init",
        sucess: (res) => {
          const { id } = res.data.area;
          app.globalData.utils.request({
            url: "/Index/index",
            data: {
              aid: id
            },
            sucess: ({ data }) => {
              console.log(data);
              slides.value = data.slides;
              nav2s.value = data.nav2s;
              navs.value = data.navs;
              hospitals.value = data.hospitals;
            }
          });
        }
      });
    });
    function onNav2Tap(event, nav2Item) {
      console.log(nav2Item);
      if (nav2Item.stype == 1) {
        common_vendor.index.navigateTo({
          url: nav2Item.stype_link
        });
      }
    }
    const onNavTap = (event, navItem) => {
      console.log(navItem);
      if (navItem.stype == 1) {
        common_vendor.index.navigateTo({
          url: navItem.stype_link
        });
      }
    };
    const toHospital = (event, navItem) => {
      common_vendor.index.navigateTo({
        url: "/pages/hospital/index?hid=" + navItem.id
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          isHome: true
        }),
        b: common_vendor.s("margin-top:" + (common_vendor.unref(navHeight) + 30) + "rpx;"),
        c: slides.value && slides.value.length > 0
      }, slides.value && slides.value.length > 0 ? {
        d: common_vendor.f(slides.value, (s, index, i0) => {
          return {
            a: s.pic_image_url,
            b: index,
            c: index
          };
        })
      } : {}, {
        e: nav2s.value && nav2s.value.length > 0
      }, nav2s.value && nav2s.value.length > 0 ? {
        f: common_vendor.f(nav2s.value, (n, index, i0) => {
          return {
            a: n.pic_image_url,
            b: common_vendor.o(($event) => onNav2Tap($event, n), index),
            c: index,
            d: index
          };
        })
      } : {}, {
        g: navs.value && navs.value.length > 0
      }, navs.value && navs.value.length > 0 ? {
        h: common_vendor.f(navs.value, (n, index, i0) => {
          return {
            a: n.pic_image_url,
            b: common_vendor.t(n.title),
            c: common_vendor.s("color:" + (n.tcolor ? n.tcolor : "")),
            d: common_vendor.o(($event) => onNavTap($event, n), index),
            e: index,
            f: index
          };
        })
      } : {}, {
        i: common_vendor.f(hospitals.value, (h, index, i0) => {
          return {
            a: h.avatar_url ? h.avatar_url : "../../static/resource/images/avatar.jpg",
            b: common_vendor.t(h.name),
            c: common_vendor.t(h.rank),
            d: common_vendor.t(h.label),
            e: common_vendor.t(h.intro),
            f: h.id,
            g: h.id,
            h: common_vendor.o(($event) => toHospital($event, h), h.id)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uniapp-prj/yitong/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

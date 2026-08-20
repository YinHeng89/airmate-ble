var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../@babel/runtime/helpers/defineProperty"),
  i = "0000ae20-0000-1000-8000-00805f9b34fb";

function t(e) {
  var n = e.fun,
    a = e.byte1,
    i = e.byte2,
    t = e.byte3,
    o = ["aa", "08", "02", n, a, i, t].reduce((function(e, n) {
      return e = parseInt(n, 16) + e
    }), 0).toString(16),
    c = o.substring(o.length - 2);
  return "aa0802".concat(n).concat(a).concat(i).concat(t).concat(c)
}
var o = "00",
  c = "00",
  s = "00",
  l = "00";
Page({
  data: {
    styleConfig: {
      themeColor: "#4186fa",
      slider: {
        activeColor: "#bdd6f7",
        inactiveColor: "#eeeeee"
      }
    },
    uiJson: [{
      type: "mode",
      label: "功能",
      children: [{
        hexStr: "01",
        label: "功能",
        displayName: "妇洗",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/fuxi_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/fuxi_s.svg"
      }, {
        hexStr: "02",
        label: "功能",
        displayName: "臀洗",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/tunxi_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/tunxi_s.svg"
      }, {
        hexStr: "03",
        label: "功能",
        displayName: "童洗",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/tongxi_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/tongxi_s.svg"
      }, {
        hexStr: "04",
        label: "功能",
        displayName: "烘干",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/honggan_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/honggan_s.svg"
      }, {
        hexStr: "05",
        label: "功能",
        displayName: "翻盖",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/fangai_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/fangai_s.svg"
      }, {
        hexStr: "06",
        label: "功能",
        displayName: "翻圈",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/fanquan_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/fanquan_s.svg"
      }, {
        hexStr: "07",
        label: "功能",
        displayName: "冲水",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/chongshui_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/chongshui_s.svg"
      }, {
        hexStr: "08",
        label: "功能",
        displayName: "自动",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/zidong_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/zidong_s.svg"
      }, {
        hexStr: "11",
        label: "功能",
        displayName: "自洁",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/zijie_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/zijie_s.svg"
      }, {
        hexStr: "14",
        label: "功能",
        displayName: "按摩",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/anmo_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/anmo_s.svg"
      }]
    }, {
      type: "mode",
      label: "功能2",
      children: [{
        hexStr: "0f",
        displayName: "夜灯",
        label: "功能2",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/yedeng_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/yedeng_s.svg"
      }, {
        hexStr: "13",
        displayName: "节能",
        label: "功能2",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/jieneng_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/jieneng_s.svg"
      }, {
        hexStr: "12",
        displayName: "泡沫",
        label: "功能2",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/paomo_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/paomo_s.svg"
      }]
    }, {
      type: "mode",
      label: "功能3",
      children: [{
        hexStr: "21",
        displayName: "水压",
        label: "功能3",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/shuiya_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/shuiya_s.svg"
      }, {
        hexStr: "22",
        displayName: "管位",
        label: "功能3",
        icon_bg_on: "/V2/image/fan/icon_btn_on.svg",
        icon_bg_off: "/V2/image/fan/icon_btn_off.svg",
        icon_on: "/pages/xinlianke/toilet/image/guanwei_o.svg",
        icon_off: "/pages/xinlianke/toilet/image/guanwei_s.svg"
      }]
    }, {
      type: "counter",
      label: "水温",
      children: [{
        hexStr: "00",
        type: "counter",
        label: "水温",
        displayName: "关闭",
        value: 0
      }, {
        hexStr: "01",
        type: "counter",
        label: "水温",
        displayName: "一档",
        value: 1
      }, {
        hexStr: "02",
        type: "counter",
        label: "水温",
        displayName: "二档",
        value: 2
      }, {
        hexStr: "03",
        type: "counter",
        label: "水温",
        displayName: "三档",
        value: 3
      }]
    }, {
      type: "counter",
      label: "风温",
      children: [{
        hexStr: "00",
        type: "counter",
        label: "风温",
        displayName: "关闭",
        value: 0
      }, {
        hexStr: "01",
        type: "counter",
        label: "风温",
        displayName: "一档",
        value: 1
      }, {
        hexStr: "02",
        type: "counter",
        label: "风温",
        displayName: "二档",
        value: 2
      }, {
        hexStr: "03",
        type: "counter",
        label: "风温",
        displayName: "三档",
        value: 3
      }]
    }, {
      type: "counter",
      label: "座温",
      children: [{
        hexStr: "00",
        type: "counter",
        label: "座温",
        displayName: "关闭",
        value: 0
      }, {
        hexStr: "01",
        type: "counter",
        label: "座温",
        displayName: "一档",
        value: 1
      }, {
        hexStr: "02",
        type: "counter",
        label: "座温",
        displayName: "二档",
        value: 2
      }, {
        hexStr: "03",
        type: "counter",
        label: "座温",
        displayName: "三档",
        value: 3
      }]
    }],
    deviceStatus: {
      mainSwitch: {
        status: !1
      },
      mode: {
        "功能": {
          "妇洗": !1,
          "臀洗": !1,
          "童洗": !1,
          "烘干": !1,
          "翻盖": !1,
          "翻圈": !1,
          "冲水": !1,
          "自动": !1,
          "停止": !1,
          "电源": !1,
          "夜灯": !1,
          "水温档位": !1,
          "自洁": !1,
          "泡沫盾": !1,
          "节能": !1,
          "按摩": !1
        },
        "功能2": {
          "夜灯": !1,
          "节能": !1,
          "泡沫": !1
        },
        "功能3": {
          "水压": !1,
          "管位": !1
        }
      },
      counter: {
        "水温": {
          value: 0
        },
        "风温": {
          value: 0
        },
        "座温": {
          value: 0
        }
      }
    },
    connectStatus: "noConnected"
  },
  deviceId: "",
  handleMainSwitchChange: function() {
    var e = !this.data.deviceStatus.mainSwitch.status,
      n = t({
        fun: o = e ? "0e" : "09",
        byte1: c,
        byte2: s,
        byte3: l
      });
    this.setData({
      "deviceStatus.mainSwitch.status": e
    }), this.sendDp({
      dpValue: n
    })
  },
  handleModeChange: function(e) {
    var n = this,
      i = e.detail,
      g = i.hexStr,
      _ = i.status,
      f = i.displayName,
      r = i.label,
      u = "deviceStatus.mode.".concat(r, ".").concat(f);
    this.setData(a({}, u, _)), setTimeout((function() {
      n.setData(a({}, u, !1))
    }), 100), o = g, console.log({
      fun: o,
      byte1: c,
      byte2: s,
      byte3: l
    });
    var b = t({
      fun: o,
      byte1: c,
      byte2: s,
      byte3: l
    });
    this.sendDp({
      dpValue: b
    }), o = "00"
  },
  handleCounterChange: function(e) {
    var n = e.detail,
      i = n.type,
      g = n.label,
      _ = n.hexStr,
      f = n.value,
      r = "deviceStatus.".concat(i, ".").concat(g, ".value");
    this.setData(a({}, r, f)), "水温" === g ? c = _ : "风温" === g ? s = _ : "座温" === g && (l = _);
    var u = t({
      fun: o,
      byte1: c,
      byte2: s,
      byte3: l
    });
    this.sendDp({
      dpValue: u
    })
  },
  sendDp: function(a) {
    var t = this;
    return n(e().mark((function n() {
      var o, c, s, l, g, _;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return o = a.dpValue, e.prev = 1, c = o.trim(), console.log("要发送的数据:", c), s = c.split(" ").map((function(e) {
              return parseInt(e, 16)
            })), l = new ArrayBuffer(s.length), g = new DataView(l), s.forEach((function(e, n) {
              g.setUint8(n, e)
            })), _ = t.deviceId, e.next = 2, wx.writeBLECharacteristicValue({
              characteristicId: "0000ae21-0000-1000-8000-00805f9b34fb",
              deviceId: _,
              serviceId: i,
              value: l
            });
          case 2:
            e.next = 4;
            break;
          case 3:
            throw e.prev = 3, e.catch(1);
          case 4:
          case "end":
            return e.stop()
        }
      }), n, null, [
        [1, 3]
      ])
    })))()
  },
  onLoad: function(a) {
    var t = this;
    return n(e().mark((function n() {
      var o, c;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, wx.showLoading({
              title: "开始连接"
            }), o = a.deviceId, t.deviceId = o, wx.onBLEConnectionStateChange((function(e) {
              e.deviceId === t.deviceId && e.connected ? t.setData({
                connectStatus: "connected"
              }) : e.deviceId !== t.deviceId || e.connected || t.setData({
                connectStatus: "noConnected"
              })
            })), e.next = 1, wx.createBLEConnection({
              deviceId: o
            });
          case 1:
            return e.next = 2, wx.getBLEDeviceServices({
              deviceId: o
            });
          case 2:
            return e.next = 3, wx.getBLEDeviceCharacteristics({
              deviceId: o,
              serviceId: i
            });
          case 3:
            return e.next = 4, wx.notifyBLECharacteristicValueChange({
              characteristicId: "0000ae22-0000-1000-8000-00805f9b34fb",
              deviceId: o,
              serviceId: i,
              state: !0
            });
          case 4:
            return e.next = 5, wx.onBLECharacteristicValueChange((function(e) {
              console.log("result", e)
            }));
          case 5:
            wx.hideLoading(), console.log("连接成功"), wx.showToast({
              title: "连接成功"
            }), e.next = 7;
            break;
          case 6:
            e.prev = 6, c = e.catch(0), wx.showToast({
              title: c
            }), wx.hideLoading();
          case 7:
          case "end":
            return e.stop()
        }
      }), n, null, [
        [0, 6]
      ])
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var a = this;
    return n(e().mark((function n() {
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return o = "00", c = "00", s = "00", l = "00", e.next = 1, wx.closeBLEConnection({
              deviceId: a.deviceId
            });
          case 1:
            wx.offBLECharacteristicValueChange(), wx.offBLEConnectionStateChange();
          case 2:
          case "end":
            return e.stop()
        }
      }), n)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
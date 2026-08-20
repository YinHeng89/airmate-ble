var t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../utils/util"),
  o = require("../../utils/protocol"),
  i = require("../../../api/request"),
  s = (0, n.debounce)();
Page({
  data: {
    showNavDefaultBg: !1,
    uiJson: [],
    deviceStatus: {},
    styleConfig: null,
    style: "",
    type: "",
    commandWords: null,
    title: ""
  },
  onPageScroll: function(t) {
    var e = this;
    s((function() {
      var a = t.scrollTop;
      Math.abs(a) < 1 ? e.setData({
        showNavDefaultBg: !1
      }) : e.setData({
        showNavDefaultBg: !0
      })
    }), 100)
  },
  handleMainSwitchChange: function() {
    var t = !this.data.deviceStatus.mainSwitch.status;
    this.setData({
      "deviceStatus.mainSwitch.status": t
    })
  },
  handleSliderChange: function(t) {
    var e = t.detail,
      n = e.type,
      o = e.label,
      i = e.value,
      s = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, s, i))
  },
  handleCounterChange: function(t) {
    var e = t.detail,
      n = e.label,
      o = e.value,
      i = "deviceStatus.counter.".concat(n, ".value");
    this.setData(a({}, i, o))
  },
  handleSwitchChange: function(t) {
    var e = t.detail,
      n = e.type,
      o = e.displayName,
      i = e.status,
      s = "deviceStatus.".concat(n, ".").concat(o);
    this.setData(a({}, s, i))
  },
  handleMidSwitchChange: function(t) {
    var e = t.detail,
      n = e.type,
      o = e.label,
      i = e.protocol,
      s = e.status,
      c = e.value,
      u = (i.find((function(t) {
        return t.key === s
      })), "deviceStatus.".concat(n, ".").concat(o, ".").concat(c)),
      l = "open" === s;
    this.setData(a({}, u, l))
  },
  handleModeChange: function(t) {
    var e = this,
      n = t.detail,
      o = n.type,
      i = n.label,
      s = n.protocol,
      c = n.status,
      u = n.displayName,
      l = c ? "open" : "close";
    if (s.find((function(t) {
        return t.key === l
      }))) {
      var r = this.data.deviceStatus[o][i];
      Object.keys(r).forEach((function(t) {
        var a = c;
        if (t === u) r[t] = a;
        else if (a) {
          var n = e.data.uiJson.find((function(t) {
            return t.type === o && t.label === i
          })).children;
          if (n) {
            var s = n.find((function(e) {
              return e.displayName === t
            }));
            s && s.isMutex && (r[t] = !1)
          }
        }
      }));
      var d = "deviceStatus.".concat(o, ".").concat(i);
      this.setData(a({}, d, r))
    }
  },
  handleFanSwitchChange: function(t) {
    var e = t.detail.status,
      n = t.detail.label,
      o = "deviceStatus.fanYaoTou.".concat(n, ".status");
    this.setData(a({}, o, e))
  },
  handleFanModeChange: function(t) {
    var e = t.detail,
      n = e.label,
      o = e.displayName,
      i = e.status,
      s = "deviceStatus.fanYaoTou.".concat(n, ".children.").concat(o);
    if (i) {
      var c = "deviceStatus.fanYaoTou.".concat(n, ".children"),
        u = this.data.deviceStatus.fanYaoTou[n].children;
      Object.keys(u).forEach((function(t) {
        u[t] = t === o
      })), this.setData(a({}, c, u))
    } else this.setData(a({}, s, i))
  },
  handleTemChange: function(t) {
    var e = t.detail,
      n = e.type,
      o = e.label,
      i = e.value,
      s = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, s, i))
  },
  handleFanYaoTouChange: function(t) {
    var e = t.detail,
      n = e.label,
      o = (e.protocol, e.newStatus),
      i = "deviceStatus.fanYaoTou.".concat(n);
    this.setData(a({}, i, o))
  },
  handleTapBtn: function(t) {},
  onLoad: function(a) {
    var n = this;
    return e(t().mark((function e() {
      var s, c, u, l, r, d, h, f, v, p, S, y, g, b;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.prev = 0, s = decodeURIComponent(a.scene), c = s.split("=")[1], console.log(c), t.next = 1, (0, i.getPreviewData)(c);
          case 1:
            u = t.sent, l = JSON.parse(u.data), r = l.protocolJson, d = l.styleConfig, h = l.style, f = l.type, v = l.commandWords, p = l.title, S = (0, o.convertProtocolJson)(r), y = S.uiJson, g = S.statusJson, console.log("uiJson", y), console.log("statusJson", g), n.setData({
              uiJson: y,
              deviceStatus: g,
              styleConfig: d,
              style: h.toLowerCase(),
              type: f,
              commandWords: v,
              title: p
            }), t.next = 3;
            break;
          case 2:
            t.prev = 2, b = t.catch(0), console.error(b), wx.showToast({
              title: "获取预览数据失败",
              icon: "error"
            });
          case 3:
          case "end":
            return t.stop()
        }
      }), e, null, [
        [0, 2]
      ])
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
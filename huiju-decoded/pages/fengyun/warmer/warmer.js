var e, t = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../@babel/runtime/helpers/defineProperty"),
  i = require("../../../protocol/fengyun/warmer"),
  a = t(require("../../../behavior/mixin"));
Page({
  behaviors: [a.default],
  data: {
    commandWords: i.commandWords,
    sliderConfig: {
      activeColor: " #fc753b",
      inactiveColor: "#eeeeee",
      themeColor: "#fc753b"
    },
    counterConfig: {
      themeColor: "#fc753b"
    },
    modeGroupConfig: {
      themeColor: " #fc753b"
    }
  },
  handleModeChange: function(e) {
    var t = e.detail,
      n = t.type,
      r = t.label,
      i = (t.title, t.protocol),
      a = t.status,
      u = t.value,
      c = i.find((function(e) {
        return e.key === a
      }));
    if (c) {
      var s = this.data.deviceStatus[n][r];
      Object.keys(s).forEach((function(e) {
        var t = "open" === a;
        e === u ? s[e] = t : t && (s[e] = !1)
      }));
      var l = "deviceStatus.".concat(n, ".").concat(r);
      this.setData(o({}, l, s)), this.sendDp({
        dpValue: c.value
      })
    }
  },
  onLoad: function(t) {
    e = t
  },
  onReady: function() {
    var t = this;
    return r(n().mark((function r() {
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            return n.next = 1, t.init({
              options: e,
              defaultTitleName: "取暖器",
              protocolJson: i.protocolJson,
              specialJson: i.specialJson,
              initialRules: i.initialRules,
              attributeRules: i.attributeRules,
              judgeRules: i.judgeRules
            });
          case 1:
          case "end":
            return n.stop()
        }
      }), r)
    })))()
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return r(n().mark((function t() {
      var r, o;
      return n().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return r = i.specialJson.find((function(e) {
              return "disconnect" === e.type
            })), o = r.value, t.next = 1, e.destroy(o);
          case 1:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});
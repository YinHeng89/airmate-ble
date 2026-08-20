var e, n = require("../../@babel/runtime/helpers/interopRequireDefault").default,
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../@babel/runtime/helpers/defineProperty"),
  a = require("../../protocol/teaBar/index"),
  i = n(require("../../behavior/mixin")),
  u = require("../../utils/util");
Page({
  behaviors: [i.default],
  data: {
    commandWords: a.commandWords
  },
  handleModeChange: function(e) {
    console.log(e);
    var n = e.detail,
      t = n.type,
      r = n.label,
      a = n.title,
      i = n.protocol,
      c = n.status,
      s = n.value,
      l = i.find((function(e) {
        return e.key === c
      }));
    if (l) {
      var d = "open" === c,
        f = a ? "deviceStatus.".concat(t, ".").concat(r, ".").concat(a) : "deviceStatus.".concat(t, ".").concat(r),
        p = f.split(".").reduce((function(e, n) {
          if (n in e) return e[n]
        }), this.data),
        h = (0, u.deepClone)(p);
      for (var m in p) s === m ? h[s] = d : h[m] = !1;
      this.sendDp({
        dpValue: l.value
      }), this.setData(o({}, f, h))
    }
  },
  onLoad: function(n) {
    e = n
  },
  onReady: function() {
    var n = this;
    return r(t().mark((function r() {
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 1, n.init({
              options: e,
              defaultTitleName: "茶吧机",
              protocolJson: a.protocolJson
            });
          case 1:
          case "end":
            return t.stop()
        }
      }), r)
    })))()
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return r(t().mark((function n() {
      return t().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            return n.next = 1, e.destroy();
          case 1:
          case "end":
            return n.stop()
        }
      }), n)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});
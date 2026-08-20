var e, n = require("../../@babel/runtime/helpers/interopRequireDefault").default,
  r = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../protocol/light/index"),
  i = n(require("../../behavior/mixin"));
Page({
  behaviors: [i.default],
  data: {},
  onLoad: function(n) {
    e = n
  },
  onReady: function() {
    var n = this;
    return t(r().mark((function t() {
      return r().wrap((function(r) {
        for (;;) switch (r.prev = r.next) {
          case 0:
            return r.next = 1, n.init({
              options: e,
              defaultTitleName: "照明灯",
              protocolJson: o.protocolJson
            });
          case 1:
          case "end":
            return r.stop()
        }
      }), t)
    })))()
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return t(r().mark((function n() {
      return r().wrap((function(n) {
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
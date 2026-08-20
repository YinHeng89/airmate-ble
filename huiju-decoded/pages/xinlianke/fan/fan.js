var e, r = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = r(require("../../../protocol/xinlianke/fan/fan")),
  a = r(require("../../../protocol/xinlianke/warmer/warmer")),
  i = r(require("../../../behavior/mixinV2"));
Page({
  behaviors: [i.default],
  data: {},
  onLoad: function(r) {
    e = r
  },
  onReady: function() {
    var r = this;
    return t(n().mark((function t() {
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            return n.next = 1, r.init({
              options: e,
              defaultTitleName: "风扇",
              fanProtocol: o.default,
              warmerProtocol: a.default
            });
          case 1:
          case "end":
            return n.stop()
        }
      }), t)
    })))()
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return t(n().mark((function r() {
      return n().wrap((function(r) {
        for (;;) switch (r.prev = r.next) {
          case 0:
            return r.next = 1, e.destroy();
          case 1:
          case "end":
            return r.stop()
        }
      }), r)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});
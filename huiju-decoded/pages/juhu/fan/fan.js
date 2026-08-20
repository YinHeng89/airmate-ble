var e, n = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../protocol/juhu/fan/fan"),
  u = n(require("../../../behavior/mixin"));
Page({
  behaviors: [u.default],
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
              defaultTitleName: "风扇",
              protocolJson: o.protocolJson,
              specialJson: o.specialJson,
              attributeRules: o.attributeRules,
              judgeRules: o.judgeRules,
              user: "juhu"
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
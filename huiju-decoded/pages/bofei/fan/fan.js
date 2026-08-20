var e, n = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../protocol/bofei/fan"),
  i = require("../../../protocol/bofei/commandWords"),
  a = n(require("../../../behavior/mixin"));
Page({
  behaviors: [a.default],
  data: {
    fanCommandWords: i.fanCommandWords
  },
  onLoad: function(n) {
    e = n
  },
  onReady: function() {
    var n = this;
    return o(r().mark((function o() {
      return r().wrap((function(r) {
        for (;;) switch (r.prev = r.next) {
          case 0:
            return r.next = 1, n.init({
              options: e,
              defaultTitleName: "风扇",
              protocolJson: t.protocolJson,
              specialJson: t.specialJson,
              initialRules: t.initialRules,
              attributeRules: t.attributeRules,
              judgeRules: t.judgeRules,
              commandWords: i.fanCommandWords,
              user: "bofei"
            });
          case 1:
          case "end":
            return r.stop()
        }
      }), o)
    })))()
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return o(r().mark((function n() {
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
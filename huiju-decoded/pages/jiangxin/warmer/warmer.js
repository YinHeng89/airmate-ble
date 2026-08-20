var e, r = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../protocol/jiangxin/warmer/warmer"),
  i = r(require("../../../behavior/mixin"));
Page({
  behaviors: [i.default],
  data: {
    commandWords: t.commandWords,
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
  onLoad: function(r) {
    e = r
  },
  onReady: function() {
    var r = this;
    return o(n().mark((function o() {
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            return n.next = 1, r.init({
              options: e,
              defaultTitleName: "取暖器",
              protocolJson: t.protocolJson,
              specialJson: t.specialJson,
              initialRules: t.initialRules,
              attributeRules: t.attributeRules,
              judgeRules: t.judgeRules
            });
          case 1:
          case "end":
            return n.stop()
        }
      }), o)
    })))()
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return o(n().mark((function r() {
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
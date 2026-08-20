var e, o = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../protocol/bofei/warmer_25"),
  i = require("../../../protocol/bofei/commandWords"),
  a = o(require("../../../behavior/mixin"));
Page({
  behaviors: [a.default],
  data: {
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
    },
    warmerCommandWords: i.warmerCommandWords
  },
  onLoad: function(o) {
    return n(r().mark((function n() {
      return r().wrap((function(r) {
        for (;;) switch (r.prev = r.next) {
          case 0:
            e = o;
          case 1:
          case "end":
            return r.stop()
        }
      }), n)
    })))()
  },
  onReady: function() {
    this.init({
      options: e,
      defaultTitleName: "取暖器",
      protocolJson: t.protocolJson,
      specialJson: t.specialJson,
      initialRules: t.initialRules,
      attributeRules: t.attributeRules,
      judgeRules: t.judgeRules,
      commandWords: i.warmerCommandWords,
      user: "bofei"
    })
  },
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return n(r().mark((function o() {
      return r().wrap((function(o) {
        for (;;) switch (o.prev = o.next) {
          case 0:
            return o.next = 1, e.destroy();
          case 1:
          case "end":
            return o.stop()
        }
      }), o)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});
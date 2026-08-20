var e, t = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../protocol/ruide/fan/index"),
  i = t(require("../../../behavior/mixin"));
Page({
  behaviors: [i.default],
  data: {
    commandWords: o.commandWords
  },
  handleGotoOTA: function() {
    this.isGoToOTA = !0, wx.offBLEConnectionStateChange(), wx.offBLECharacteristicValueChange(), wx.offBluetoothAdapterStateChange(), wx.navigateTo({
      url: "/pages/OTA/OTA?device=".concat(JSON.stringify(this.data.device), "&cuiVersion=").concat(this.CuiVersion, "&buildTime=").concat(this.buildTime)
    })
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
              defaultTitleName: "风扇",
              protocolJson: o.protocolJson,
              specialJson: o.specialJson,
              initialRules: o.initialRules,
              attributeRules: o.attributeRules,
              judgeRules: o.judgeRules,
              user: "ruide"
            });
          case 1:
          case "end":
            return n.stop()
        }
      }), r)
    })))()
  },
  onShow: function() {
    this.isGoToOTA = !1
  },
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return r(n().mark((function t() {
      return n().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (!e.isGoToOTA) {
              t.next = 1;
              break
            }
            return t.abrupt("return");
          case 1:
            return t.next = 2, e.destroy();
          case 2:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
});
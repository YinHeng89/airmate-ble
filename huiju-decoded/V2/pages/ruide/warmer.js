var e = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = e(require("../../behavior/behavior")),
  i = require("../../../protocol/ruide/warmer/index");
Page({
  behaviors: [n.default],
  data: {},
  onLoad: function(e) {
    this.initWithoutCuiVersion(o(o({}, e), {}, {
      data: i.data
    }))
  },
  onReady: function() {},
  onShow: function() {
    this.onShowCb()
  },
  onHide: function() {},
  onUnload: function() {
    this.destroy()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
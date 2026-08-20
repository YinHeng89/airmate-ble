var n = (0, require("../../../@babel/runtime/helpers/interopRequireDefault").default)(require("../../behavior/behavior"));
Page({
  behaviors: [n.default],
  data: {},
  onLoad: function(n) {
    this.init(n)
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
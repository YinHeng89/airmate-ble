Page({
  data: {},
  handleLogin: function(n) {
    wx.navigateTo({
      url: "/pages/deviceList/deviceList"
    })
  },
  onLoad: function(n) {
    wx.getStorageSync("userPhoneNumber") && wx.navigateTo({
      url: "/pages/deviceList/deviceList"
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
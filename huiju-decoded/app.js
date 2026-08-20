var t = (0, require("./@babel/runtime/helpers/interopRequireDefault").default)(require("./sdk/index"));
App({
  onLaunch: function() {
    console.log("launch"), wx.getStorageSync("commandWordList") || wx.setStorageSync("commandWordList", {});
    var e = new t.default;
    e.init(), this.globalData.bleService = e;
    var a = wx.getStorageSync("deviceList") || [];
    this.globalData.deviceList = a;
    var i = wx.getWindowInfo().statusBarHeight,
      n = wx.getMenuButtonBoundingClientRect(),
      r = 2 * (n.top - i) + n.height;
    this.globalData.statusBarHeight = i, this.globalData.navigationBarHeight = r
  },
  onHide: function() {
    var t = this.globalData.deviceList.filter((function(t) {
      return t
    }));
    wx.setStorageSync("deviceList", t)
  },
  globalData: {
    userInfo: null,
    bleService: null,
    deviceList: [],
    statusBarHeight: null,
    navigationBarHeight: null,
    currentDeviceId: ""
  }
});
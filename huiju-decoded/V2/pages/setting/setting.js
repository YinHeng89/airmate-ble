Page({
  data: {
    cuiVersion: "",
    device: null,
    buildTime: "",
    showOTA: "",
    showEditCommand: !1,
    showAllWords: !1,
    showEditWakeWords: !1,
    showEditCmdWords: !1,
    productId: "",
    mac: "",
    otaVersion: ""
  },
  handleGoToEditCommand: function() {
    var o = this.data.cuiVersion,
      i = this.data.device.deviceId;
    wx.navigateTo({
      url: "/pages/editCommand/EditCommand?cuiVersion=".concat(o, "&deviceId=").concat(i, "&type=all")
    })
  },
  handleGoToEditSceWords: function() {
    var o = this.data.cuiVersion,
      i = this.data.device.deviceId;
    wx.navigateTo({
      url: "/pages/editScene/editScene?cuiVersion=".concat(o, "&deviceId=").concat(i, "&type=all")
    })
  },
  handleGoToEditWakeWords: function() {
    var o = this.data.cuiVersion,
      i = this.data.device.deviceId;
    wx.navigateTo({
      url: "/pages/editCommand/EditCommand?cuiVersion=".concat(o, "&deviceId=").concat(i, "&type=wake")
    })
  },
  handleGoToEditCmdWords: function() {
    var o = this.data.cuiVersion,
      i = this.data.device.deviceId;
    wx.navigateTo({
      url: "/pages/editCommand/EditCommand?cuiVersion=".concat(o, "&deviceId=").concat(i, "&type=cmd")
    })
  },
  handleGoToOTA: function() {
    wx.offBLEConnectionStateChange(), wx.offBLECharacteristicValueChange(), wx.offBluetoothAdapterStateChange(), wx.navigateTo({
      url: "/pages/OTA/OTA?device=".concat(JSON.stringify(this.data.device), "&cuiVersion=").concat(this.data.cuiVersion, "&buildTime=").concat(this.data.buildTime, "&productId=").concat(this.data.productId, "&mac=").concat(this.data.mac, "&otaVersion=").concat(this.data.otaVersion)
    })
  },
  handleTapFuture: function() {
    wx.showToast({
      title: "敬请期待"
    })
  },
  handleViewWords: function() {
    wx.navigateTo({
      url: "/V2/pages/allCommandWords/allCommandWords?cuiVersion=".concat(this.data.cuiVersion)
    })
  },
  onLoad: function(o) {
    var i = o.device,
      d = o.cuiVersion,
      a = void 0 === d ? "" : d,
      e = o.buildTime,
      t = void 0 === e ? "" : e,
      n = o.showOTA,
      c = void 0 !== n && n,
      s = o.showAllWords,
      r = void 0 !== s && s,
      u = o.showEditCommand,
      h = void 0 !== u && u,
      l = o.showEditWakeWords,
      m = void 0 !== l && l,
      v = o.showEditCmdWords,
      w = void 0 !== v && v,
      p = o.showEditSceWords,
      T = void 0 !== p && p,
      f = o.productId,
      V = void 0 === f ? "" : f,
      C = o.mac,
      W = void 0 === C ? "" : C,
      E = o.otaVersion,
      g = void 0 === E ? "" : E;
    this.setData({
      device: JSON.parse(i),
      cuiVersion: a,
      buildTime: t,
      showOTA: JSON.parse(c),
      showEditCommand: JSON.parse(h),
      showAllWords: JSON.parse(r),
      showEditWakeWords: JSON.parse(m),
      showEditCmdWords: JSON.parse(w),
      productId: V,
      mac: W,
      otaVersion: g,
      showEditSceWords: T
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
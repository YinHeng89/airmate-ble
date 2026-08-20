var a = getApp(),
  t = a.globalData.statusBarHeight,
  e = a.globalData.navigationBarHeight;
Component({
  properties: {
    title: {
      type: String,
      value: ""
    },
    showNavDefaultBg: {
      type: Boolean,
      value: !1
    },
    logo: {
      type: String,
      value: ""
    }
  },
  data: {
    statusBarHeight: t,
    navigationBarHeight: e
  },
  methods: {
    handleGoBack: function() {
      wx.navigateBack()
    }
  }
});
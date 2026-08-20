var e = getApp(),
  t = e.globalData.statusBarHeight,
  a = e.globalData.navigationBarHeight;
Component({
  properties: {
    title: {
      type: null,
      value: ""
    },
    showNavDefaultBg: {
      type: Boolean,
      value: !1
    },
    logo: {
      type: null,
      value: ""
    },
    theme: {
      type: String,
      value: "dark"
    }
  },
  data: {
    statusBarHeight: t,
    navigationBarHeight: a
  },
  methods: {
    handleGoBack: function() {
      var e = getCurrentPages();
      e.length > 1 && "pages/deviceList/deviceList" === e[e.length - 2].route ? wx.navigateBack() : wx.redirectTo({
        url: "/pages/deviceList/deviceList"
      })
    }
  }
});
Component({
  observers: {
    uiJson: function(e) {
      var t = e.find((function(e) {
        return "special" === e.type
      }));
      t && this.setData({
        showSpecial: !0,
        label: t.label
      })
    },
    deviceStatus: function(e) {
      var t = e.customizeXiaoyiBtn["灯光"].children;
      for (var i in t) {
        if (Object.hasOwnProperty.call(t, i)) t[i] && ("红色" === i ? this.setData({
          imageUrl: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/warmer/fire_on.gif",
          themeClass: "red"
        }) : "蓝色" === i ? this.setData({
          imageUrl: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/warmer/fire-blue.gif",
          themeClass: "blue"
        }) : "绿色" === i && this.setData({
          imageUrl: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/warmer/fire-green.gif",
          themeClass: "green"
        }))
      }
    }
  },
  properties: {
    deviceStatus: Object,
    uiJson: Object
  },
  data: {
    showSpecial: !1,
    label: "",
    imageUrl: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/warmer/fire_on.gif",
    themeClass: "red"
  },
  methods: {}
});
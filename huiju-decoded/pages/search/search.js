var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  c = getApp(),
  r = c.globalData.bleService,
  i = c.globalData.deviceList;
Page({
  data: {
    deviceList: []
  },
  handleTapDevice: function(e) {
    var a, c = e.currentTarget.dataset.device,
      r = i.findIndex((function(e) {
        return (null == e ? void 0 : e.deviceId) === (null == c ? void 0 : c.deviceId)
      }));
    switch (-1 == r ? i.push(c) : i.splice(r, 1, c), null === (a = c.advertisServiceUUIDs[0]) || void 0 === a ? void 0 : a.substring(0, 8)) {
      case "0000AF30":
        wx.redirectTo({
          url: "/pages/xinlianke/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF31":
        wx.redirectTo({
          url: "/pages/xinlianke/fourWaySwitch/fourWaySwitch?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF32":
        wx.redirectTo({
          url: "/pages/xinlianke/toilet/toilet?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF33":
        wx.navigateTo({
          url: "/pages/xinlianke/yuba/yuba?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF34":
        wx.navigateTo({
          url: "/pages/xinlianke/threeWaySwitch/threeWaySwitch?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF40":
        wx.redirectTo({
          url: "/pages/teaBar/teaBar?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF50":
        wx.redirectTo({
          url: "/pages/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF51":
        wx.redirectTo({
          url: "/pages/bofei/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF52":
        wx.redirectTo({
          url: "/pages/zhihengtong/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF53":
        wx.redirectTo({
          url: "/pages/ruide/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF54":
        wx.redirectTo({
          url: "/pages/xinlian/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF55":
        wx.redirectTo({
          url: "/pages/chenglixin/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF56":
        wx.redirectTo({
          url: "/pages/yadixin/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF57":
        wx.redirectTo({
          url: "/pages/zhihengtong/fanV2/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF58":
        wx.redirectTo({
          url: "/pages/juhu/fan/fan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF60":
        wx.redirectTo({
          url: "/pages/warmer/warmer?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF61":
        wx.redirectTo({
          url: "/pages/bofei/warmer/warmer?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF62":
        wx.redirectTo({
          url: "/pages/fengyun/warmer/warmer?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF63":
        wx.redirectTo({
          url: "/pages/jiangxin/warmer/warmer?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF64":
        wx.redirectTo({
          url: "/pages/bofei/warmer25/warmer25?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF65":
        wx.navigateTo({
          url: "/V2/pages/customize/julianxin/ruihe/shuinuantan?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF66":
        wx.navigateTo({
          url: "/V2/pages/ruide/warmer?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000AF70":
        wx.redirectTo({
          url: "/pages/light/light?deviceId=".concat(c.deviceId)
        });
        break;
      case "0000BF10":
        wx.redirectTo({
          url: "/V2/pages/deviceDetail/deviceDetail?deviceId=".concat(c.deviceId)
        })
    }
  },
  onLoad: function(c) {
    var i = this;
    return a(e().mark((function a() {
      var c, n;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return c = function(e) {
              var a = e.devices;
              a.length > 0 && a.forEach((function(e) {
                var a = i.data.deviceList;
                if (!a.find((function(a) {
                    return a.deviceId == e.deviceId
                  }))) {
                  a.push(e);
                  var c = a.filter((function(e) {
                    var a;
                    return null === (a = e.name) || void 0 === a ? void 0 : a.trim()
                  }));
                  i.setData({
                    deviceList: c
                  })
                }
              }))
            }, e.prev = 1, e.next = 2, r.scan({
              services: ["AF30", "AF31", "AF32", "AF33", "AF34", "AF40", "AF50", "AF51", "AF52", "AF53", "AF54", "AF55", "AF56", "AF57", "AF58", "AF60", "AF61", "AF62", "AF63", "AF64", "AF65", "AF66", "AF70", "BF10"],
              allowDuplicatesKey: !0,
              foundCb: c
            });
          case 2:
            e.next = 4;
            break;
          case 3:
            e.prev = 3, 10001 === (n = e.catch(1)).errCode ? wx.showModal({
              title: "手机蓝牙未开启",
              content: '请前往"设置 > 蓝牙"中打开',
              showCancel: !1
            }) : 1e4 === n.errCode ? wx.showModal({
              title: "搜索失败",
              content: "蓝牙适配器未打开，请尝试重启小程序",
              showCancel: !1
            }) : wx.showModal({
              title: "搜索失败",
              content: n.errMsg,
              showCancel: !1
            });
          case 4:
          case "end":
            return e.stop()
        }
      }), a, null, [
        [1, 3]
      ])
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    return a(e().mark((function a() {
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return console.log("searchUnLoad"), e.next = 1, r.stopScan();
          case 1:
          case "end":
            return e.stop()
        }
      }), a)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return {
      title: "慧居管家",
      path: "pages/login/login"
    }
  }
});
var e = require("../../@babel/runtime/helpers/interopRequireDefault").default,
  a = require("../../@babel/runtime/helpers/defineProperty"),
  i = require("../../utils/util"),
  t = e(require("@vant/weapp/dialog/dialog")),
  c = getApp(),
  n = c.globalData.deviceList,
  d = c.globalData.bleService;
Page(a(a(a(a(a(a(a(a(a(a({
  data: {
    deviceList: n,
    showPopup: !1,
    editDevice: ""
  },
  handleAdd: function() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  handleTapItem: function(e) {
    var a, i = e.currentTarget.dataset.item;
    switch (null === (a = i.advertisServiceUUIDs[0]) || void 0 === a ? void 0 : a.substring(0, 8)) {
      case "0000AF30":
        wx.navigateTo({
          url: "/pages/xinlianke/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF31":
        wx.navigateTo({
          url: "/pages/xinlianke/fourWaySwitch/fourWaySwitch?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF32":
        wx.navigateTo({
          url: "/pages/xinlianke/toilet/toilet?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF33":
        wx.navigateTo({
          url: "/pages/xinlianke/yuba/yuba?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF34":
        wx.navigateTo({
          url: "/pages/xinlianke/threeWaySwitch/threeWaySwitch?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF40":
        wx.navigateTo({
          url: "/pages/teaBar/teaBar?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF50":
        wx.navigateTo({
          url: "/pages/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF51":
        wx.navigateTo({
          url: "/pages/bofei/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF52":
        wx.navigateTo({
          url: "/pages/zhihengtong/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF53":
        wx.navigateTo({
          url: "/pages/ruide/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF54":
        wx.navigateTo({
          url: "/pages/xinlian/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF55":
        wx.redirectTo({
          url: "/pages/chenglixin/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF56":
        wx.redirectTo({
          url: "/pages/yadixin/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF57":
        wx.redirectTo({
          url: "/pages/zhihengtong/fanV2/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF58":
        wx.redirectTo({
          url: "/pages/juhu/fan/fan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF60":
        wx.navigateTo({
          url: "/pages/warmer/warmer?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF61":
        wx.navigateTo({
          url: "/pages/bofei/warmer/warmer?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF62":
        wx.navigateTo({
          url: "/pages/fengyun/warmer/warmer?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF63":
        wx.navigateTo({
          url: "/pages/jiangxin/warmer/warmer?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF64":
        wx.navigateTo({
          url: "/pages/bofei/warmer25/warmer25?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF65":
        wx.navigateTo({
          url: "/V2/pages/customize/julianxin/ruihe/shuinuantan?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF66":
        wx.navigateTo({
          url: "/V2/pages/ruide/warmer?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000AF70":
        wx.navigateTo({
          url: "/pages/light/light?deviceId=".concat(i.deviceId)
        });
        break;
      case "0000BF10":
        wx.navigateTo({
          url: "/V2/pages/deviceDetail/deviceDetail?deviceId=".concat(i.deviceId)
        })
    }
  },
  handleDelTap: function(e) {
    var a = this,
      i = e.currentTarget.dataset.item;
    wx.showModal({
      title: "确认",
      content: "确认删除该设备吗",
      success: function(e) {
        if (e.confirm) {
          var t = n.findIndex((function(e) {
            return e.deviceId == i.deviceId
          }));
          t >= 0 && (n.splice(t, 1), a.setData({
            deviceList: n
          }))
        }
      }
    })
  },
  handleSet: function(e) {
    var a = e.currentTarget.dataset.item;
    this.setData({
      showPopup: !0,
      editDevice: a
    })
  },
  handleClosePopup: function() {
    this.setData({
      showPopup: !1
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      "editDevice.name": e.detail.value
    })
  },
  handleRename: function() {
    var e = this;
    this.handleClosePopup(), t.default.confirm({
      title: "修改名称"
    }).then((function() {
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9\_\-\.\(\)\（\）]+$/.test(e.data.editDevice.name)) return wx.showToast({
        title: "只支持中英文、数字和符号- _（）.()",
        icon: "none"
      }), !1;
      var a = n.findIndex((function(a) {
        return a.deviceId === e.data.editDevice.deviceId
      }));
      c.globalData.deviceList[a].name = e.data.editDevice.name, e.setData({
        deviceList: n
      })
    })).catch((function() {}))
  }
}, "bindKeyInput", (function(e) {
  this.setData({
    "editDevice.name": e.detail.value
  })
})), "handleDel", (function() {
  var e = this;
  this.handleClosePopup(), wx.showModal({
    title: "确认",
    content: "确认删除该设备吗",
    success: function(a) {
      if (a.confirm) {
        var i = n.findIndex((function(a) {
          return a.deviceId == e.data.editDevice.deviceId
        }));
        i >= 0 && (n.splice(i, 1), e.setData({
          deviceList: n
        }))
      } else a.cancel && console.log("用户点击取消")
    }
  })
})), "onLoad", (function() {
  (0, i.checkAcl)(), wx.getSetting({
    success: function(e) {
      e.authSetting["scope.bluetooth"] || wx.authorize({
        scope: "scope.bluetooth",
        success: function() {
          console.log("success")
        },
        fail: function() {
          wx.showModal({
            title: "前往设置页",
            content: "请前往设置页授权蓝牙权限后，重新进入小程序",
            complete: function(e) {
              e.cancel, e.confirm && wx.openSetting({
                success: function(e) {
                  console.log("openSetting成功的回调函数", e.authSetting), e.authSetting["scope.bluetooth"] && d.init()
                }
              })
            }
          })
        }
      })
    }
  })
})), "onReady", (function() {})), "onShow", (function() {
  this.setData({
    deviceList: n
  })
})), "onHide", (function() {})), "onUnload", (function() {})), "onPullDownRefresh", (function() {})), "onReachBottom", (function() {})), "onShareAppMessage", (function() {
  return {
    title: "慧居管家",
    path: "pages/login/login"
  }
})));
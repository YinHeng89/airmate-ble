Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BluetoothUIImpl = void 0;
var o = require("../@babel/runtime/helpers/classCallCheck"),
  t = require("../@babel/runtime/helpers/createClass"),
  e = require("../@babel/runtime/helpers/possibleConstructorReturn"),
  c = require("../@babel/runtime/helpers/get"),
  n = require("../@babel/runtime/helpers/getPrototypeOf"),
  l = require("../@babel/runtime/helpers/inherits"),
  i = require("./bluetooth");
exports.BluetoothUIImpl = function(i) {
  function u() {
    return o(this, u), t = this, l = arguments, c = n(c = u), e(t, function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
      } catch (o) {
        return !1
      }
    }() ? Reflect.construct(c, l || [], n(t).constructor) : c.apply(t, l));
    var t, c, l
  }
  return l(u, i), t(u, [{
    key: "startScan",
    value: function(o) {
      this._checkLocation(o)
    }
  }, {
    key: "_checkLocation",
    value: function(o) {
      var t = this;
      this.checkLocation().then((function(e) {
        e && (console.log("_checkLocation 位置信息可用"), t._checkBluetooth(o))
      })).catch((function(o) {
        return console.log("locationInfo", o), 0 == o.locationEnabled ? (console.log(" _checkLocation 位置信息未打开"), void wx.showModal({
          title: "位置信息未打开",
          content: "请先打开位置信息，打开后请重新扫描",
          showCancel: !1
        })) : (console.log(" _checkLocation 位置信息已打开"), 0 == o.locationAuthorized ? (console.log(" _checkLocation GPS-微信未授权"), void wx.showModal({
          title: "未授权微信[位置信息]权限",
          content: "搜索蓝牙设备，需要给微信授权[位置信息]权限",
          success: function(o) {}
        })) : (console.log(" _checkLocation GPS-微信已授权"), 0 == o.locationSetting ? (console.log(" _checkLocation GPS-小程序未授权"), void t.authorizeLocation().then((function(o) {
          0 == o && wx.showModal({
            title: "小程序使用[位置信息]权限",
            content: "搜索蓝牙设备，需要给小程序授权[位置信息]权限",
            success: function(o) {
              o.confirm && wx.openSetting({
                success: function(o) {
                  var t = "授权失败";
                  1 == o.authSetting["scope.userLocation"] && (t = "授权成功，请重新扫描"), wx.showToast({
                    icon: "none",
                    title: t
                  })
                }
              })
            }
          })
        })).catch((function(o) {
          console.log("授权小程序蓝牙失败", o)
        }))) : void console.log(" _checkLocation GPS-小程序已授权")))
      }))
    }
  }, {
    key: "_checkBluetooth",
    value: function(o) {
      var t = this;
      this.checkBluetoothAdapter().then((function(e) {
        e ? (console.log("checkBluetoothAdapter， 蓝牙可用"), c(n(u.prototype), "startScan", t).call(t, o)) : console.log("checkBluetoothAdapter， 蓝牙不可用")
      })).catch((function(e) {
        if (0 != e.bluetoothSupport) {
          if (console.log(" checkBluetoothAdapter， 支持蓝牙"), 0 == e.bluetoothEnabled) return console.log(" checkBluetoothAdapter， 蓝牙未打开"), void("android" === t._platform ? wx.showModal({
            title: "蓝牙未打开",
            content: "跳转系统蓝牙设置页",
            success: function(o) {
              o.confirm && t.openSystemBluetoothSetting({
                success: function(o) {
                  console.log("openSystemBluetoothSetting ", o)
                }
              })
            }
          }) : wx.showModal({
            title: "蓝牙未打开",
            content: "请先打开蓝牙",
            showCancel: !1
          }));
          if (console.log(" checkBluetoothAdapter， 蓝牙已打开"), 0 == e.bluetoothSetting) return console.log(" checkBluetoothAdapter， 蓝牙-小程序未授权"), void t.authorizeBluetooth().then((function(o) {
            0 == o && wx.showModal({
              title: "小程序使用[蓝牙]权限",
              content: "搜索蓝牙设备，需要给小程序授权[蓝牙]权限",
              success: function(o) {
                o.confirm && wx.openSetting({
                  success: function(o) {
                    var t = "授权失败";
                    1 == o.authSetting["scope.bluetooth"] && (t = "授权成功，请重新扫描"), wx.showToast({
                      icon: "none",
                      title: t
                    })
                  }
                })
              }
            })
          })).catch((function(o) {
            console.log("授权小程序蓝牙失败", o)
          }));
          if (console.log(" checkBluetoothAdapter， 蓝牙-小程序已授权"), 0 == e.bluetoothInit) return console.log(" checkBluetoothAdapter， 蓝牙-适配器未初始化"), void t._openBluetoothAdapter(o);
          console.log(" checkBluetoothAdapter， 蓝牙-适配器已初始化")
        } else console.log(" checkBluetoothAdapter， 不支持蓝牙")
      }))
    }
  }, {
    key: "_openBluetoothAdapter",
    value: function(o) {
      var t = this;
      this.openBluetoothAdapter({
        success: function() {
          console.log("打开适配器成功"), c(n(u.prototype), "startScan", t).call(t, o)
        },
        fail: function() {
          console.log("打开适配器失败")
        }
      })
    }
  }])
}(i.BluetoothImpl);
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0, require("../@babel/runtime/helpers/Arrayincludes");
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../@babel/runtime/helpers/classCallCheck"),
  n = require("../@babel/runtime/helpers/createClass"),
  c = require("../utils/logger"),
  i = "0000AE20-0000-1000-8000-00805F9B34FB",
  a = "0000AE21-0000-1000-8000-00805F9B34FB",
  o = "0000AE22-0000-1000-8000-00805F9B34FB",
  s = "0000AE00-0000-1000-8000-00805F9B34FB",
  u = wx.getDeviceInfo().platform,
  h = function() {
    return n((function e() {
      r(this, e), this.instance = null
    }), [{
      key: "init",
      value: (u = t(e().mark((function t() {
        var r;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.prev = 0, e.next = 1, this.checkWxEnv();
            case 1:
              return e.next = 2, this.openBluetoothAdapter();
            case 2:
              e.next = 4;
              break;
            case 3:
              throw e.prev = 3, r = e.catch(0), c.logger.error("initError", r), r;
            case 4:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [0, 3]
        ])
      }))), function() {
        return u.apply(this, arguments)
      })
    }, {
      key: "reOpen",
      value: (s = t(e().mark((function t() {
        var r;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.prev = 0, e.next = 1, wx.closeBluetoothAdapter();
            case 1:
              return e.next = 2, wx.openBluetoothAdapter({
                mode: "central"
              });
            case 2:
              e.next = 4;
              break;
            case 3:
              throw e.prev = 3, r = e.catch(0), console.error(r), r;
            case 4:
            case "end":
              return e.stop()
          }
        }), t, null, [
          [0, 3]
        ])
      }))), function() {
        return s.apply(this, arguments)
      })
    }, {
      key: "setNewInstance",
      value: function(e) {
        return this.instance = new l({
          deviceId: e
        }), this.instance
      }
    }, {
      key: "scan",
      value: (o = t(e().mark((function t() {
        var r, n, c, i, a, o, s, u = arguments;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return n = (r = u.length > 0 && void 0 !== u[0] ? u[0] : {}).services, c = r.allowDuplicatesKey, i = r.interval, r.timeout, a = r.deviceName, o = r.containName, s = r.foundCb, e.next = 1, wx.startBluetoothDevicesDiscovery({
                services: n,
                allowDuplicatesKey: c,
                interval: i
              });
            case 1:
              wx.onBluetoothDeviceFound((function(e) {
                var t = e.devices.filter((function(e) {
                  var t = e.name;
                  return a ? t === a : !o || t.includes(o)
                }));
                s({
                  devices: t
                })
              }));
            case 2:
            case "end":
              return e.stop()
          }
        }), t)
      }))), function() {
        return o.apply(this, arguments)
      })
    }, {
      key: "stopScan",
      value: (a = t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", wx.stopBluetoothDevicesDiscovery().then((function() {
                wx.offBluetoothDeviceFound()
              })));
            case 1:
            case "end":
              return e.stop()
          }
        }), t)
      }))), function() {
        return a.apply(this, arguments)
      })
    }, {
      key: "openBluetoothAdapter",
      value: function() {
        return wx.openBluetoothAdapter({
          mode: "central"
        })
      }
    }, {
      key: "getConnectedBluetoothDevices",
      value: (i = t(e().mark((function t(r) {
        var n, c;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 1, wx.getConnectedBluetoothDevices(r);
            case 1:
              return n = e.sent, c = n.devices, e.abrupt("return", c);
            case 2:
            case "end":
              return e.stop()
          }
        }), t)
      }))), function(e) {
        return i.apply(this, arguments)
      })
    }, {
      key: "destroyInstance",
      value: function() {
        this.instance && (this.instance.destroy(), this.instance = void 0)
      }
    }, {
      key: "checkWxEnv",
      value: function() {
        return new Promise((function(e, t) {
          "undefined" != typeof wx && wx.getSystemInfo ? e("在微信小程序环境中") : t("不在微信小程序环境中")
        }))
      }
    }]);
    var i, a, o, s, u
  }(),
  l = function() {
    return n((function e(t) {
      var n = t.deviceId;
      if (r(this, e), !n) throw Error("实例化失败，未传入设备ID");
      this.deviceId = n, this.bleCbs = [], this.bleErrCbs = [], this.retryCount = 0, this.connectStatus = "initial", this.app = getApp()
    }), [{
      key: "init",
      value: (y = t(e().mark((function t() {
        var r;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.prev = 0, e.next = 1, this.checkWxEnv();
            case 1:
              return e.next = 2, this.openBluetoothAdapter();
            case 2:
              this.onBLEConnectionStateChange(), this.onBluetoothAdapterStateChange(), e.next = 4;
              break;
            case 3:
              throw e.prev = 3, r = e.catch(0), this.publishErr(r), r;
            case 4:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [0, 3]
        ])
      }))), function() {
        return y.apply(this, arguments)
      })
    }, {
      key: "openBluetoothAdapter",
      value: function() {
        return wx.openBluetoothAdapter({
          mode: "central"
        })
      }
    }, {
      key: "onBluetoothAdapterStateChange",
      value: function() {
        var e = this;
        return wx.onBluetoothAdapterStateChange((function(t) {
          console.log("蓝牙适配器状态变化", t), c.logger.info("蓝牙适配器状态变化", t), e.publish({
            wxMessage: t,
            type: "adapterStateChange"
          })
        }))
      }
    }, {
      key: "checkWxEnv",
      value: function() {
        return new Promise((function(e, t) {
          "undefined" != typeof wx && wx.getSystemInfo ? e("在微信小程序环境中") : t("不在微信小程序环境中")
        }))
      }
    }, {
      key: "publish",
      value: function(e) {
        this.bleCbs.forEach((function(t) {
          new Promise((function() {
            t(e)
          }))
        }))
      }
    }, {
      key: "publishErr",
      value: function(e) {
        c.logger.error("sdkError", e), this.bleErrCbs.forEach((function(t) {
          t(e)
        }))
      }
    }, {
      key: "onBLEConnectionStateChange",
      value: function() {
        var e = this;
        wx.onBLEConnectionStateChange((function(t) {
          console.log("蓝牙连接状态改变", t), t.deviceId != e.deviceId ? c.logger.info("onBLEConnectionStateChange", "非当前设备触发，当前设备：".concat(e.deviceId, ",触发设备：").concat(t.deviceId, "，connect：").concat(t.connected)) : (c.logger.info("onBLEConnectionStateChange", t), e.publish({
            wxMessage: t,
            type: "connect"
          }))
        }))
      }
    }, {
      key: "onBLECharacteristicValueChange",
      value: function() {
        var e = this;
        wx.onBLECharacteristicValueChange((function(t) {
          var r = t.serviceId.toUpperCase(),
            n = t.characteristicId.toUpperCase();
          t.deviceId === e.deviceId && r === i && n === o ? e.publish({
            wxMessage: t,
            type: "characteristicChange"
          }) : t.deviceId != e.deviceId ? (console.error("监听特征值变化的deviceId错误"), c.logger.error("监听特征值变化的deviceId错误")) : r != i ? (console.log(t), console.error("监听特征值变化的serviceId错误"), c.logger.error("监听特征值变化的serviceId错误")) : n != o && (console.error("监听特征值变化的characteristicId错误"), c.logger.error("监听特征值变化的characteristicId错误"))
        }))
      }
    }, {
      key: "connect",
      value: (w = t(e().mark((function t() {
        var r, n;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.prev = 0, this.connectStatus = "connecting", r = this.deviceId, e.next = 1, wx.createBLEConnection({
                deviceId: r,
                timeout: 1e4
              });
            case 1:
              c.logger.info("wx.createBLEConnection调用成功", {
                deviceId: r,
                retryCount: this.retryCount
              }), this.retryCount = 0, this.connectStatus = "connected", e.next = 6;
              break;
            case 2:
              if (e.prev = 2, n = e.catch(0), !(this.retryCount < 3)) {
                e.next = 5;
                break
              }
              if (-1 != n.errCode) {
                e.next = 3;
                break
              }
              return console.log("catch了已连接"), c.logger.error("catch了已连接,连接时发现该设备已经连接"), e.abrupt("return");
            case 3:
              return this.retryCount++, console.error("重连".concat(this.retryCount, "次"), n), c.logger.warn("重连".concat(this.retryCount, "次"), n), e.next = 4, this.connect();
            case 4:
              return e.abrupt("return");
            case 5:
              if (console.log("retryCount", this.retryCount), this.retryCount = 0, this.connectStatus = "connected", this.deviceId !== this.app.globalData.currentDeviceId) {
                e.next = 6;
                break
              }
              throw this.publishErr(n), n;
            case 6:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [0, 2]
        ])
      }))), function() {
        return w.apply(this, arguments)
      })
    }, {
      key: "checkIsLoader",
      value: (x = t(e().mark((function t() {
        var r, n, c;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 1, wx.getBLEDeviceServices({
                deviceId: this.deviceId
              });
            case 1:
              if (r = e.sent, n = r.services, !(2 === (c = n.map((function(e) {
                  return e.uuid
                }))).length && c.includes("00001800-0000-1000-8000-00805F9B34FB") && c.includes(s) || 1 === c.length && c.includes(s))) {
                e.next = 2;
                break
              }
              return e.abrupt("return", !0);
            case 2:
              return e.abrupt("return", !1);
            case 3:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return x.apply(this, arguments)
      })
    }, {
      key: "connectBlue",
      value: (f = t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 1, this.connect();
            case 1:
              if ("ios" !== u) {
                e.next = 3;
                break
              }
              return e.next = 2, wx.getBLEDeviceServices({
                deviceId: this.deviceId
              });
            case 2:
              return e.next = 3, wx.getBLEDeviceCharacteristics({
                deviceId: this.deviceId,
                serviceId: i
              });
            case 3:
              return e.next = 4, wx.notifyBLECharacteristicValueChange({
                characteristicId: o,
                deviceId: this.deviceId,
                serviceId: i,
                state: !0
              });
            case 4:
              this.onBLECharacteristicValueChange(), console.log("连接成功！");
            case 5:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return f.apply(this, arguments)
      })
    }, {
      key: "connectionBreak",
      value: (v = t(e().mark((function t() {
        var r, n;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.prev = 0, r = this.deviceId, e.next = 1, wx.closeBLEConnection({
                deviceId: r
              });
            case 1:
              e.next = 3;
              break;
            case 2:
              throw e.prev = 2, n = e.catch(0), this.publishErr(n), n;
            case 3:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [0, 2]
        ])
      }))), function() {
        return v.apply(this, arguments)
      })
    }, {
      key: "sendStr",
      value: (d = t(e().mark((function t(r) {
        var n, c, o, s, u, h, l;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              for (n = r.dpValue, e.prev = 1, c = n.trim(), console.log("要发送的数据:", c), o = [], s = 0; s < c.length; s++) o.push(c.charCodeAt(s));
              return u = new Uint8Array(o).buffer, h = this.deviceId, e.next = 2, wx.writeBLECharacteristicValue({
                characteristicId: a,
                deviceId: h,
                serviceId: i,
                value: u
              });
            case 2:
              e.next = 4;
              break;
            case 3:
              throw e.prev = 3, l = e.catch(1), this.publishErr(l), l;
            case 4:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [1, 3]
        ])
      }))), function(e) {
        return d.apply(this, arguments)
      })
    }, {
      key: "sendDp",
      value: (p = t(e().mark((function t(r) {
        var n, c, o, s, u, h, l;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return n = r.dpValue, e.prev = 1, c = n.trim(), console.log("要发送的数据:", c), o = c.split(" ").map((function(e) {
                return parseInt(e, 16)
              })), s = new ArrayBuffer(o.length), u = new DataView(s), o.forEach((function(e, t) {
                u.setUint8(t, e)
              })), h = this.deviceId, e.next = 2, wx.writeBLECharacteristicValue({
                characteristicId: a,
                deviceId: h,
                serviceId: i,
                value: s
              });
            case 2:
              e.next = 4;
              break;
            case 3:
              throw e.prev = 3, l = e.catch(1), this.publishErr(l), l;
            case 4:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [1, 3]
        ])
      }))), function(e) {
        return p.apply(this, arguments)
      })
    }, {
      key: "setBLEMTU",
      value: (l = t(e().mark((function t(r) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", wx.setBLEMTU({
                deviceId: this.deviceId,
                mtu: r
              }));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return l.apply(this, arguments)
      })
    }, {
      key: "onReceivePackage",
      value: function(e) {
        this.bleCbs.push(e)
      }
    }, {
      key: "offReceivePackage",
      value: function(e) {
        var t = this.bleCbs.findIndex((function(t) {
          return t === e
        }));
        this.bleCbs.splice(t, 1)
      }
    }, {
      key: "onError",
      value: function(e) {
        this.bleErrCbs.push(e)
      }
    }, {
      key: "offError",
      value: function(e) {
        var t = this.bleErrCbs.findIndex((function(t) {
          return t === e
        }));
        this.bleErrCbs.splice(t, 1)
      }
    }, {
      key: "destroy",
      value: (h = t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return wx.offBLEConnectionStateChange(), wx.offBLECharacteristicValueChange(), wx.offBluetoothAdapterStateChange(), e.next = 1, wx.closeBLEConnection({
                deviceId: this.deviceId
              });
            case 1:
              console.log("蓝牙已成功断开");
            case 2:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return h.apply(this, arguments)
      })
    }]);
    var h, l, p, d, v, f, x, w, y
  }();
exports.default = h;
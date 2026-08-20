var e = require("../@babel/runtime/helpers/interopRequireWildcard").default;
require("../@babel/runtime/helpers/Arrayincludes"), require("../@babel/runtime/helpers/Arrayincludes"), Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OTAWrapper = void 0, exports.hex2Mac = s, require("../@babel/runtime/helpers/Arrayincludes");
var n = require("../@babel/runtime/helpers/classCallCheck"),
  t = require("../@babel/runtime/helpers/createClass"),
  c = require("./jl_lib/jl_ota_2.1.1"),
  i = require("./bluetooth"),
  o = require("./reconnect"),
  a = require("./jl_lib/jl_auth_2.0.0"),
  r = e(require("./jl_lib/jl_rcsp_ota_2.1.1")),
  l = require("./util");
exports.OTAWrapper = function() {
  return t((function e(t) {
    n(this, e), this._RcspOTAManagerMap = new Map, this._RcspImplMap = new Map, this._ReconnectMap = new Map, this._AuthMap = new Map, this._RcspCallbackManager = new r.RcspCallbackManager, this._OTAWrapperOption = void 0, this._OTAWrapperOption = t
  }), [{
    key: "isRCSPInit",
    value: function(e) {
      var n = this;
      return new Promise((function(t, c) {
        var i = n._getRCSPImpl(e.deviceId);
        i ? i.getDeviceInfo(e) ? t(!0) : c(new r.RCSPError(r.RCSPErrorCode.ERR_OTHER, "No DeviceInfo.")) : c(new r.RCSPError(r.RCSPErrorCode.ERR_OTHER, "No has RCSPImpl."))
      }))
    }
  }, {
    key: "isNeedMandatoryUpgrade",
    value: function(e) {
      var n = this;
      return new Promise((function(t, c) {
        var i = n._getRCSPImpl(e.deviceId);
        if (i) {
          var o = i.getDeviceInfo(e);
          o ? t(o.mandatoryUpgradeFlag == r.CmdGetTargetInfo.FLAG_MANDATORY_UPGRADE) : c(new r.RCSPError(r.RCSPErrorCode.ERR_OTHER, "No DeviceInfo."))
        } else c(new r.RCSPError(r.RCSPErrorCode.ERR_OTHER, "No has RCSPImpl."))
      }))
    }
  }, {
    key: "startOTA",
    value: function(e, n, t) {
      var a = this,
        u = this._getRCSPImpl(e.deviceId);
      if (null != u) {
        var p = u.getUsingDevice();
        if (null != p)
          if (null != u.getDeviceInfo(p)) {
            if (null != n.updateFileData && 0 != n.updateFileData.length) {
              var v = new c.RcspOTAManager(u);
              this._RcspOTAManagerMap.set(e.deviceId, v);
              try {
                v.startOTA(n, {
                  onStartOTA: function() {
                    t.onStartOTA()
                  },
                  onNeedReconnect: function(n) {
                    var i = {
                      onResult: function(e) {
                        a._ReconnectMap.delete(e);
                        var n = a._getRCSPImpl(e);
                        n && v.updateRcspOpImpl(n)
                      },
                      onError: function(e, n) {}
                    };
                    if (t.onNeedReconnect(n, i), console.log("this._OTAWrapperOption.isInnerReconnect()", a._OTAWrapperOption.isInnerReconnect()), a._OTAWrapperOption.isInnerReconnect()) {
                      var r, u, p, d = null === (r = n.deviceBleMac) || void 0 === r ? void 0 : r.toUpperCase().replace(/:/g, ""),
                        R = null == d || null === (u = d.split("")) || void 0 === u || null === (p = u.reverse()) || void 0 === p ? void 0 : p.join(""),
                        h = null == d ? void 0 : d.substring(0, 10);
                      console.log(" oldDeviceMac " + d);
                      var _ = {
                          startScanDevice: function() {
                            a.sanDevice()
                          },
                          isReconnectDevice: function(e) {
                            var t, c, i, o = !1,
                              a = null == v ? void 0 : v.getCurrentOTADevice();
                            if (n.isSupportNewReconnectADV)
                              if (null != d && "" !== d) {
                                var r = (0, l.ab2hex)(e.advertisData).toUpperCase(),
                                  u = r.indexOf("D60541544F4C4A");
                                if (-1 != u && e.advertisData) {
                                  var p = new Uint8Array(e.advertisData).slice(u / 2 + 8, u / 2 + 14).reverse();
                                  console.log("新回连广播包 newMAC : " + (0, l.ab2hex)(p).toUpperCase()), o = d == s(p).toUpperCase()
                                }(r.includes(d) || null != R && r.includes(R) || null != h && e.deviceId.toUpperCase().includes(h)) && console.log("newReconnect,mac:" + e.deviceId + ", result: " + o + ",rawData:" + (0, l.ab2hex)(e.advertisData))
                              } else console.log("RCSP协议未拿到设备的BLE地址");
                            else if (null != a) {
                              a.deviceId == e.deviceId && (o = !0);
                              var _ = a.deviceId.substring(0, 10);
                              null != _ && e.deviceId.toUpperCase().includes(_) && console.log("oldReconnect,mac:" + e.deviceId + ", result: " + o)
                            }
                            var f = null == e || null === (t = e.name) || void 0 === t || null === (c = t.split("")) || void 0 === c || null === (i = c.reverse()) || void 0 === i ? void 0 : i.join("");
                            return (f.startsWith("etadpu_") || f.startsWith("ETADPU_EL_")) && (o = !0), o
                          },
                          connectDevice: function(e) {
                            a.connectDevice(e)
                          }
                        },
                        f = {
                          onReconnectSuccess: function(e) {
                            console.log("onReconnectSuccess : " + e), i.onResult(e.deviceId)
                          },
                          onReconnectFailed: function() {
                            console.log("onReconnectFailed : "), a._ReconnectMap.delete(e.deviceId), i.onError(c.OTAError.ERROR_OTA_RECONNECT_DEVICE_TIMEOUT, getErrorDesc(c.OTAError.ERROR_OTA_RECONNECT_DEVICE_TIMEOUT, ""))
                          },
                          onDeviceConnectFailed: function(e) {
                            a.sanDevice()
                          },
                          onDeviceConnectDisconnected: function(e) {
                            a.sanDevice()
                          }
                        },
                        C = new o.Reconnect(_, f);
                      a._ReconnectMap.set(e.deviceId, C), C.startReconnect(c.OTAImpl.RECONNECT_DEVICE_TIMEOUT)
                    }
                  },
                  onProgress: function(e, n) {
                    t.onProgress(e, n)
                  },
                  onStopOTA: function() {
                    var n;
                    t.onStopOTA(), v.release();
                    var c = null === (n = v.getCurrentOTADevice()) || void 0 === n ? void 0 : n.deviceId;
                    c && a.disconnectDevice(new i.BluetoothDevice(c)), a.sanDevice(), a._RcspOTAManagerMap.delete(e.deviceId)
                  },
                  onCancelOTA: function() {
                    var n;
                    t.onCancelOTA(), v.release();
                    var c = null === (n = v.getCurrentOTADevice()) || void 0 === n ? void 0 : n.deviceId;
                    c && a.disconnectDevice(new i.BluetoothDevice(c)), a.sanDevice(), a._RcspOTAManagerMap.delete(e.deviceId)
                  },
                  onError: function(n, c) {
                    var o;
                    t.onError(n, c);
                    var l = a._ReconnectMap.get(e.deviceId);
                    null == l || l.stopReconnect(), console.log("升级失败: 错误code：" + r.toHexWithPrefix(n) + " 信息：" + c);
                    var s = null === (o = v.getCurrentOTADevice()) || void 0 === o ? void 0 : o.deviceId;
                    s && a.disconnectDevice(new i.BluetoothDevice(s)), v.release(), a._RcspOTAManagerMap.delete(e.deviceId)
                  }
                })
              } catch (e) {
                var d = e.stack;
                console.log("升级异常闪退，" + d)
              }
            }
          } else console.log("rcspImpl 没有初始化成功")
      } else console.log("rcspImpl undefined")
    }
  }, {
    key: "cancelOTA",
    value: function(e) {
      var n = this._RcspOTAManagerMap.get(e.deviceId);
      null == n || n.cancelOTA()
    }
  }, {
    key: "isOTA",
    value: function(e) {
      var n = this._RcspOTAManagerMap.get(e.deviceId);
      return null == n ? void 0 : n.isOTA()
    }
  }, {
    key: "sendCustomCmd",
    value: function(e, n, t) {
      var c = this._getRCSPImpl(e.deviceId);
      if (null == c) return !1;
      var i = c.getUsingDevice();
      if (null == i) return !1;
      if (null == c.getDeviceInfo(i)) return console.log("rcspImpl 没有初始化成功"), !1;
      var o = new r.ParamBase;
      o.setData(n);
      var a = new r.CmdCustom(o);
      return c.sendRCSPCommand(i, a, 2e4, t), !0
    }
  }, {
    key: "getDeviceInfo",
    value: function(e) {
      var n = this._getRCSPImpl(e.deviceId);
      return null == n ? void 0 : n.getDeviceInfo(e)
    }
  }, {
    key: "registerRcspCallback",
    value: function(e) {
      this._RcspCallbackManager.registerRcspCallback(e)
    }
  }, {
    key: "unregisterRcspCallback",
    value: function(e) {
      this._RcspCallbackManager.unregisterRcspCallback(e)
    }
  }, {
    key: "release",
    value: function() {
      this._RcspOTAManagerMap.forEach((function(e) {
        e.release()
      })), this._RcspOTAManagerMap.clear(), null == this._OTAWrapperOption.getRCSPImpl && (this._RcspImplMap.forEach((function(e) {
        e.destroy()
      })), this._RcspImplMap.clear()), this._ReconnectMap.forEach((function(e) {
        e.stopReconnect()
      })), this._ReconnectMap.clear(), this._AuthMap.clear(), this._RcspCallbackManager.release()
    }
  }, {
    key: "isUseAuth",
    value: function() {
      return this._OTAWrapperOption.isUseAuth()
    }
  }, {
    key: "isInnerReconnect",
    value: function() {
      return this._OTAWrapperOption.isInnerReconnect()
    }
  }, {
    key: "sanDevice",
    value: function() {
      this._OTAWrapperOption.sanDevice()
    }
  }, {
    key: "connectDevice",
    value: function(e) {
      this._OTAWrapperOption.connectDevice(e)
    }
  }, {
    key: "disconnectDevice",
    value: function(e) {
      this._OTAWrapperOption.disconnectDevice(e)
    }
  }, {
    key: "sendData",
    value: function(e, n) {
      var t, c;
      null === (t = (c = this._OTAWrapperOption).sendData) || void 0 === t || t.call(c, e, n)
    }
  }, {
    key: "onSanDeviceStop",
    value: function() {
      this._ReconnectMap.forEach((function(e) {
        e.onScanStop()
      }))
    }
  }, {
    key: "onScanFound",
    value: function(e) {
      this._ReconnectMap.forEach((function(n) {
        n.onDiscoveryDevices(e)
      }))
    }
  }, {
    key: "onConnectStateSuccess",
    value: function(e) {
      var n = this;
      if (this.isUseAuth()) {
        if (console.log("使用了认证"), null == this._AuthMap.get(e.deviceId)) {
          var t = new a.Auth;
          this._AuthMap.set(e.deviceId, t);
          var c = {
            onSendData: function(e, t) {
              console.log("发送消息", t), n.sendData(new i.BluetoothDevice(e), new Uint8Array(t))
            },
            onAuthSuccess: function() {
              console.log("认证成功！"), console.log(" 认证成功"), n._onDeviceConnected(e), n._AuthMap.delete(e.deviceId)
            },
            onAuthFailed: function() {
              console.log("认证失败"), n._onDeviceConnected(e), n._AuthMap.delete(e.deviceId)
            }
          };
          console.log("开始认证"), t.startAuth(e.deviceId, c)
        }
      } else console.log("没有使用认证"), this._onDeviceConnected(e)
    }
  }, {
    key: "onConnectStateDisconnect",
    value: function(e) {
      this._onDeviceDisconnected(e), null == this._OTAWrapperOption.getRCSPImpl && Array.from(this._RcspImplMap.values()).forEach((function(n) {
        n.transmitDeviceStatus(new r.Device(e.deviceId), r.Connection.CONNECTION_DISCONNECT)
      })), this._ReconnectMap.forEach((function(n) {
        n.onDeviceConnectDisconnected(e)
      }))
    }
  }, {
    key: "onConnectStateFailed",
    value: function(e) {
      this._ReconnectMap.forEach((function(n) {
        n.onDeviceConnectFailed(e)
      }))
    }
  }, {
    key: "onRcspInitSuccess",
    value: function(e) {
      var n;
      null != this._OTAWrapperOption.getRCSPImpl && (null === (n = this._getRCSPImpl(e.deviceId)) || void 0 === n || n.addOnRcspCallback(this._RcspCallbackManager), this._onRcspInit(e, !0))
    }
  }, {
    key: "onReceiveData",
    value: function(e, n) {
      var t;
      console.log("onReceiveData", n), this._AuthMap.forEach((function(t) {
        t.handlerAuth(e.deviceId, n)
      })), null === (t = this._getRCSPImpl(e.deviceId)) || void 0 === t || t.transmitDeviceData(new r.Device(e.deviceId), new Uint8Array(n))
    }
  }, {
    key: "_getRCSPImpl",
    value: function(e) {
      return null == this._OTAWrapperOption.getRCSPImpl ? this._RcspImplMap.get(e) : this._OTAWrapperOption.getRCSPImpl(new i.BluetoothDevice(e))
    }
  }, {
    key: "_onDeviceConnected",
    value: function(e) {
      var n = this;
      if (null == this._OTAWrapperOption.getRCSPImpl) {
        var t = new r.RcspImpl;
        this._RcspImplMap.set(e.deviceId, t), t.setOnSendDataCallback({
          sendDataToDevice: function(e, t) {
            return n.sendData(new i.BluetoothDevice(e.deviceId), t), !0
          }
        });
        var c = new r.OnRcspCallback;
        c.onRcspInit = function(e, t) {
          n._onRcspInit(e, t)
        }, t.addOnRcspCallback(c), t.addOnRcspCallback(this._RcspCallbackManager), t.transmitDeviceStatus(new r.Device(e.deviceId, e.name), r.Connection.CONNECTION_CONNECTED)
      }
    }
  }, {
    key: "_onDeviceDisconnected",
    value: function(e) {
      if (null == this._OTAWrapperOption.getRCSPImpl) {
        var n = this._RcspImplMap.get(e.deviceId);
        n && (n.transmitDeviceStatus(new r.Device(e.deviceId, e.name), r.Connection.CONNECTION_DISCONNECT), n.setOnSendDataCallback(void 0), n.destroy(), this._RcspImplMap.delete(e.deviceId)), this._AuthMap.delete(e.deviceId)
      }
    }
  }, {
    key: "_onRcspInit",
    value: function(e, n) {
      var t = null == e ? void 0 : e.deviceId;
      if (t && e) {
        var c = new i.BluetoothDevice(t);
        if (1 == n) {
          var o = this._getRCSPImpl(t);
          if (o) {
            var a = null == o ? void 0 : o.getDeviceInfo(e);
            console.log(" Rcsp回调-初始化成功" + JSON.stringify(a)), this._ReconnectMap.forEach((function(e) {
              e.onDeviceConnected(c)
            }))
          } else console.log(" Rcsp初始化失败，没有设备信息,断开设备"), this.disconnectDevice(c)
        } else console.log(" Rcsp初始化失败，断开设备"), this.disconnectDevice(c)
      }
    }
  }])
}();

function s(e) {
  return Array.prototype.map.call(new Uint8Array(e), (function(e) {
    return ("00" + e.toString(16)).slice(-2)
  })).join("")
}
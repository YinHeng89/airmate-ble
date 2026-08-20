Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ScanSettingConfigure = exports.ScanImpl = exports.ScanCallback = exports.LocationAdapterInfo = exports.ConnectSettingConfigure = exports.ConnectImplCallback = exports.ConnectImpl = exports.ConnectCallback = exports.BluetoothService = exports.BluetoothImpl = exports.BluetoothErrorConstant = exports.BluetoothError = exports.BluetoothDeviceInfo = exports.BluetoothDevice = exports.BluetoothCharacteristic = exports.BluetoothAdapter = exports.BTAdapterInfo = void 0;
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  n = require("../@babel/runtime/helpers/asyncToGenerator"),
  i = require("../@babel/runtime/helpers/classCallCheck"),
  o = require("../@babel/runtime/helpers/createClass"),
  c = require("./util"),
  a = exports.BluetoothDevice = function() {
    return o((function e(t) {
      i(this, e), this.RSSI = 0, this.advertisData = void 0, this.advertisServiceUUIDs = void 0, this.connectable = !0, this.deviceId = "", this.localName = "", this.name = void 0, this.serviceData = void 0, this.isSystem = !1, this.deviceId = t
    }), [{
      key: "equals",
      value: function(e) {
        return null != e && (this == e || this.deviceId == e.deviceId)
      }
    }])
  }(),
  s = exports.BluetoothError = o((function e(t, n) {
    i(this, e), this.errCode = r.ERROR_NONE, this.errMsg = void 0, this.errCode = t, this.errMsg = n
  })),
  r = exports.BluetoothErrorConstant = {
    ERROR_NONE: 0,
    ERROR_CONNECTED: -1,
    ERROR_ADAPTER_NOT_INIT: 1e4,
    ERROR_ADAPTER_NOT_AVAILABLE: 10001,
    ERROR_NO_DEV: 10002,
    ERROR_CONNECTION_FAIL: 10003,
    ERROR_NO_SERVICE: 10004,
    ERROR_NO_CHARACTERISTIC: 10005,
    ERROR_NO_CONNECTION: 10006,
    ERROR_PROPERTY_NOT_SUPOORT: 10007,
    ERROR_SYSTEM_ERROR: 10008,
    ERROR_SYSTEM_NOT_SUPPORT: 10009,
    ERROR_EPERATE_TIME_OUT: 10012,
    ERROR_INVALID_DATA: 10013,
    ERROR_INIT_MTU_FAIL: 2e4,
    ERROR_GET_SERVICE_FAIL: 20001,
    ERROR_NOTIFY_NECESSRY_CHARATERISTIC_FAIL: 20002,
    ERROR_IS_CONNECTING: 20003
  },
  u = exports.ConnectSettingConfigure = o((function e() {
    i(this, e), this.timeout = void 0, this.mtu = 512, this.notifyServiceArray = new Array
  })),
  l = exports.BluetoothService = o((function e() {
    i(this, e), this.UUID = "", this.isPrimary = !1, this.characteristicInfos = new Array
  })),
  h = exports.BluetoothCharacteristic = o((function e() {
    i(this, e), this.UUID = "", this.properties = {
      indicate: !1,
      notify: !1,
      read: !1,
      write: !1,
      writeDefault: !1,
      writeNoResponse: !1
    }, this.isNotify = !1, this.isNecessary = !1
  })),
  v = exports.BluetoothDeviceInfo = o((function e() {
    i(this, e), this.mtu = -1, this.bluetoothServices = new Array
  })),
  f = (exports.ConnectImplCallback = o((function e() {
    i(this, e), this.onMTUChange = void 0, this.onConnectSuccess = void 0, this.onConnectFailed = void 0, this.onConnectDisconnect = void 0
  })), exports.ConnectCallback = o((function e() {
    i(this, e), this.onMTUChange = void 0, this.onConnectSuccess = void 0, this.onConnectFailed = void 0
  })), exports.ConnectImpl = function() {
    return o((function e(t) {
      i(this, e), this._platform = "android", this._connectConfigure = new u, this._callbacks = new Array, this._connectingDeviceArray = new Array, this._connectedDeviceArray = new Array, this._bluetoothDeviceInfoMap = new Map, this._platform = t, this._registerConnStatusListener(), this._registerMTUChangeListener()
    }), [{
      key: "setConnectSettingConfigure",
      value: function(e) {
        this._connectConfigure = e
      }
    }, {
      key: "addConnectCallback",
      value: function(e) {
        -1 == this._callbacks.indexOf(e) && this._callbacks.push(e)
      }
    }, {
      key: "removeConnectCallback",
      value: function(e) {
        var t = this._callbacks.indexOf(e); - 1 != t && this._callbacks.splice(t, 1)
      }
    }, {
      key: "connect",
      value: function(e) {
        var t, n = this,
          i = e.device;
        if (this.isConnected(i)) null === (t = e.success) || void 0 === t || t.call(e, this.getConnectedDeviceInfo(i));
        else if (this.isConnecting(i)) {
          var o, c = {
            errCode: r.ERROR_IS_CONNECTING,
            errMsg: "is connecting"
          };
          null === (o = e.fail) || void 0 === o || o.call(e, c)
        } else {
          this._addConnectingDeviceId(i);
          var a = {
            deviceId: i.deviceId
          };
          this._connectConfigure.timeout && (a.timeout = this._connectConfigure.timeout);
          var s = function(t) {
              n._updateDeviceIdMtu(i.deviceId, t.mtu) && n._onMTUChange(i, t.mtu), n._getBLEDeviceServices(i).then((function(t) {
                var o;
                n._updateDeviceBluetoothService(i.deviceId, t), null === (o = e.success) || void 0 === o || o.call(e, n.getConnectedDeviceInfo(i)), n._onConnectSuccess(i)
              })).catch((function(t) {
                var o;
                n.disconnect(i), null === (o = e.fail) || void 0 === o || o.call(e, t), n._onConnectFailed(i, t)
              }))
            },
            u = function() {
              var t = {
                deviceId: i.deviceId,
                success: function(e) {
                  console.log("调节MTU成功，" + JSON.stringify(e.mtu)), s(e)
                },
                fail: function(t) {
                  var o;
                  console.log("调节MTU失败，" + JSON.stringify(t)), n.disconnect(i);
                  var c = {
                    errCode: r.ERROR_INIT_MTU_FAIL,
                    errMsg: "init mtu fail"
                  };
                  null === (o = e.fail) || void 0 === o || o.call(e, c), n._onConnectFailed(i, c)
                }
              };
              "android" !== n._platform && (t.writeType = "writeNoResponse"), wx.getBLEMTU(t)
            };
          a.success = function() {
            "android" == n._platform ? (console.log("this._connectConfigure.mtu", n._connectConfigure.mtu), wx.setBLEMTU({
              deviceId: i.deviceId,
              mtu: n._connectConfigure.mtu,
              success: function(e) {
                console.log("调节MTU成功，" + e.mtu), s(e)
              },
              fail: function(e) {
                u()
              }
            })) : setTimeout((function() {
              u()
            }), 100)
          }, a.fail = function(t) {
            var o;
            (console.log("连接失败，" + JSON.stringify(t)), n.isConnecting(i)) && (null === (o = e.fail) || void 0 === o || o.call(e, t), n._onConnectFailed(i, t))
          }, console.log("连接参数", a), i.isConnected ? a.success() : wx.createBLEConnection(a)
        }
      }
    }, {
      key: "disconnect",
      value: function(e) {
        console.log("杰理的sdk调用了disconnect"), wx.closeBLEConnection({
          deviceId: e.deviceId
        })
      }
    }, {
      key: "getConnectedDeviceInfo",
      value: function(e) {
        return this._getBluetoothDeviceInfo(e.deviceId)
      }
    }, {
      key: "getConnectedDevice",
      value: function() {
        return this._connectedDeviceArray
      }
    }, {
      key: "getMTU",
      value: function(e) {
        var t;
        if (this.isConnected(e)) return null === (t = this._bluetoothDeviceInfoMap.get(e.deviceId)) || void 0 === t ? void 0 : t.mtu
      }
    }, {
      key: "isConnecting",
      value: function(e) {
        for (var t = -1, n = 0; n < this._connectingDeviceArray.length; n++) {
          if (this._connectingDeviceArray[n].deviceId.toLowerCase() === e.deviceId.toLowerCase()) {
            t = n;
            break
          }
        }
        return -1 != t
      }
    }, {
      key: "isConnected",
      value: function(e) {
        for (var t = -1, n = 0; n < this._connectedDeviceArray.length; n++) {
          if (this._connectedDeviceArray[n].deviceId.toLowerCase() === e.deviceId.toLowerCase()) {
            t = n;
            break
          }
        }
        return -1 != t
      }
    }, {
      key: "_registerConnStatusListener",
      value: function() {
        var e = this;
        console.log("注册连接状态回调");
        var t = this;
        wx.onBLEConnectionStateChange((function(n) {
          if (console.log("OTASDK监听到蓝牙连接状态变化" + JSON.stringify(n)), 0 == n.connected) {
            var i = new a;
            i.deviceId = n.deviceId, e.isConnected(i) && t._onConnectDisconnect(i)
          }
        }))
      }
    }, {
      key: "_registerMTUChangeListener",
      value: function() {
        var e = this;
        wx.onBLEMTUChange((function(t) {
          var n = new a;
          n.deviceId = t.deviceId, e.isConnected(n) && e._updateDeviceIdMtu(t.deviceId, t.mtu) && e._onMTUChange(n, t.mtu)
        }))
      }
    }, {
      key: "_getBLEDeviceServices",
      value: function(i) {
        var o = this;
        return console.log("获取所有服务的 uuid:" + i.deviceId), new Promise((function(c, a) {
          var u;
          wx.getBLEDeviceServices({
            deviceId: i.deviceId,
            success: (u = n(e().mark((function n(u) {
              var h, v, f, d, _, g, C, p, S, y, I, k, b, D, A, m, R, w, E, x, B;
              return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (console.log("获取到服务的res", u), !(u.services.length <= 0)) {
                      e.next = 1;
                      break
                    }
                    return a(new s(r.ERROR_NO_SERVICE, "no service")), e.abrupt("return");
                  case 1:
                    h = new Map, v = new Array, f = t(u.services), e.prev = 2, f.s();
                  case 3:
                    if ((d = f.n()).done) {
                      e.next = 11;
                      break
                    }
                    _ = d.value, (g = new l).UUID = _.uuid, g.isPrimary = _.isPrimary, C = new Array, p = 0;
                  case 4:
                    if (!(p < o._connectConfigure.notifyServiceArray.length)) {
                      e.next = 6;
                      break
                    }
                    if (S = o._connectConfigure.notifyServiceArray[p], _.uuid.toLowerCase() !== S.UUID.toLowerCase()) {
                      e.next = 5;
                      break
                    }
                    return C = S.characteristicInfos, e.abrupt("continue", 6);
                  case 5:
                    p++, e.next = 4;
                    break;
                  case 6:
                    return e.prev = 6, e.next = 7, o._getBLEDeviceCharacteristics(i, _.uuid, C);
                  case 7:
                    y = e.sent, g.characteristicInfos = y, I = t(y);
                    try {
                      for (I.s(); !(k = I.n()).done;) b = k.value, D = _.uuid + "_" + b.UUID, h.set(D.toLocaleUpperCase(), !0)
                    } catch (e) {
                      I.e(e)
                    } finally {
                      I.f()
                    }
                    e.next = 9;
                    break;
                  case 8:
                    return e.prev = 8, x = e.catch(6), e.abrupt("return", a(x));
                  case 9:
                    v.push(g);
                  case 10:
                    e.next = 3;
                    break;
                  case 11:
                    e.next = 13;
                    break;
                  case 12:
                    e.prev = 12, B = e.catch(2), f.e(B);
                  case 13:
                    return e.prev = 13, f.f(), e.finish(13);
                  case 14:
                    A = 0;
                  case 15:
                    if (!(A < o._connectConfigure.notifyServiceArray.length)) {
                      e.next = 19;
                      break
                    }
                    m = o._connectConfigure.notifyServiceArray[A], R = 0;
                  case 16:
                    if (!(R < m.characteristicInfos.length)) {
                      e.next = 18;
                      break
                    }
                    if (!(w = m.characteristicInfos[R]).isNecessary) {
                      e.next = 17;
                      break
                    }
                    if (E = m.UUID + "_" + w.UUID, 1 == h.get(E.toLocaleUpperCase())) {
                      e.next = 17;
                      break
                    }
                    return e.abrupt("return", a(new s(r.ERROR_NOTIFY_NECESSRY_CHARATERISTIC_FAIL, "notify necessary charateristic fail")));
                  case 17:
                    R++, e.next = 16;
                    break;
                  case 18:
                    A++, e.next = 15;
                    break;
                  case 19:
                    c(v);
                  case 20:
                  case "end":
                    return e.stop()
                }
              }), n, null, [
                [2, 12, 13, 14],
                [6, 8]
              ])
            }))), function(e) {
              return u.apply(this, arguments)
            }),
            fail: function(e) {
              console.log("获取设备服务失败，错误码：" + e.errCode), a(new s(r.ERROR_GET_SERVICE_FAIL, "get service fail"))
            }
          })
        }))
      }
    }, {
      key: "_getBLEDeviceCharacteristics",
      value: function(i, o, c) {
        var a = this;
        return console.log("获取某个服务下的所有特征值\tdeviceId=" + i.deviceId + "\tserviceId=" + o), new Promise((function(u, l) {
          var v, f = new Array;
          wx.getBLEDeviceCharacteristics({
            deviceId: i.deviceId,
            serviceId: o,
            success: (v = n(e().mark((function n(v) {
              var d, _, g, C, p, S, y, I;
              return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    console.log("getBLEDeviceCharacteristics\tlist=" + JSON.stringify(v.characteristics)), d = t(v.characteristics), e.prev = 1, d.s();
                  case 2:
                    if ((_ = d.n()).done) {
                      e.next = 8;
                      break
                    }
                    g = _.value, (C = new h).UUID = g.uuid, Object.assign(C.properties, g.properties), p = 0;
                  case 3:
                    if (!(p < c.length)) {
                      e.next = 6;
                      break
                    }
                    if ((S = c[p]).UUID !== g.uuid.toLowerCase()) {
                      e.next = 5;
                      break
                    }
                    return e.next = 4, a._notifyBLECharacteristicValueChange({
                      deviceId: i.deviceId,
                      serviceId: o,
                      characteristicId: g.uuid
                    });
                  case 4:
                    if (y = e.sent, C.isNotify = y, y || 1 != S.isNecessary) {
                      e.next = 5;
                      break
                    }
                    return e.abrupt("return", l(new s(r.ERROR_NOTIFY_NECESSRY_CHARATERISTIC_FAIL, "notify necessary charateristic fail")));
                  case 5:
                    p++, e.next = 3;
                    break;
                  case 6:
                    f.push(C);
                  case 7:
                    e.next = 2;
                    break;
                  case 8:
                    e.next = 10;
                    break;
                  case 9:
                    e.prev = 9, I = e.catch(1), d.e(I);
                  case 10:
                    return e.prev = 10, d.f(), e.finish(10);
                  case 11:
                    u(f);
                  case 12:
                  case "end":
                    return e.stop()
                }
              }), n, null, [
                [1, 9, 10, 11]
              ])
            }))), function(e) {
              return v.apply(this, arguments)
            }),
            fail: function(e) {
              console.log("获取特征值失败，错误码：" + e.errCode);
              for (var t = 0; t < c.length; t++) {
                if (1 == c[t].isNecessary) return l(new s(r.ERROR_NOTIFY_NECESSRY_CHARATERISTIC_FAIL, "notify necessary charateristic fail"))
              }
              u(f)
            }
          })
        }))
      }
    }, {
      key: "_notifyBLECharacteristicValueChange",
      value: function(e) {
        return new Promise((function(t, n) {
          wx.notifyBLECharacteristicValueChange({
            state: !0,
            deviceId: e.deviceId,
            serviceId: e.serviceId,
            characteristicId: e.characteristicId,
            success: function(n) {
              console.log("使能通知成功：" + JSON.stringify(n) + " characteristicId : " + e.characteristicId), t(!0)
            },
            fail: function(e) {
              console.log("使能通知失败" + JSON.stringify(e)), t(!1)
            }
          })
        }))
      }
    }, {
      key: "_addConnectingDeviceId",
      value: function(e) {
        this._connectingDeviceArray.push(e)
      }
    }, {
      key: "_deleteConnectingDeviceId",
      value: function(e) {
        for (var t = -1, n = 0; n < this._connectingDeviceArray.length; n++) {
          if (this._connectingDeviceArray[n].deviceId.toLowerCase() === e.deviceId.toLowerCase()) {
            t = n;
            break
          }
        } - 1 != t && this._connectingDeviceArray.splice(t, 1)
      }
    }, {
      key: "_addConnectedDeviceId",
      value: function(e) {
        this._connectedDeviceArray.push(e)
      }
    }, {
      key: "_deleteConnectedDeviceId",
      value: function(e) {
        for (var t = -1, n = 0; n < this._connectedDeviceArray.length; n++) {
          if (this._connectedDeviceArray[n].deviceId.toLowerCase() === e.deviceId.toLowerCase()) {
            t = n;
            break
          }
        } - 1 != t && this._connectedDeviceArray.splice(t, 1)
      }
    }, {
      key: "_getBluetoothDeviceInfo",
      value: function(e) {
        return this._bluetoothDeviceInfoMap.get(e)
      }
    }, {
      key: "_updateDeviceBluetoothService",
      value: function(e, t) {
        var n = this._getBluetoothDeviceInfo(e);
        null == n && (n = new v, this._bluetoothDeviceInfoMap.set(e, n)), n.bluetoothServices = t
      }
    }, {
      key: "_updateDeviceIdMtu",
      value: function(e, t) {
        var n = this._getBluetoothDeviceInfo(e);
        if (null == n) n = new v, this._bluetoothDeviceInfoMap.set(e, n);
        else if (n.mtu == t) return !1;
        return n.mtu = t, !0
      }
    }, {
      key: "_deleteDeviceInfo",
      value: function(e) {
        this._bluetoothDeviceInfoMap.delete(e)
      }
    }, {
      key: "_onMTUChange",
      value: function(e, t) {
        this._callbacks.forEach((function(n) {
          n.onMTUChange && n.onMTUChange(e, t)
        }))
      }
    }, {
      key: "_onConnectSuccess",
      value: function(e) {
        console.log("_onConnectSuccess : " + e.deviceId), this._deleteConnectingDeviceId(e), this._addConnectedDeviceId(e), this._callbacks.forEach((function(t) {
          t.onConnectSuccess && t.onConnectSuccess(e)
        }))
      }
    }, {
      key: "_onConnectFailed",
      value: function(e, t) {
        this._deleteConnectingDeviceId(e), this._callbacks.forEach((function(n) {
          n.onConnectFailed && n.onConnectFailed(e, t)
        }))
      }
    }, {
      key: "_onConnectDisconnect",
      value: function(e) {
        this._deleteConnectedDeviceId(e), this._deleteDeviceInfo(e.deviceId), this._callbacks.forEach((function(t) {
          t.onConnectDisconnect && t.onConnectDisconnect(e)
        }))
      }
    }])
  }()),
  d = (exports.ScanCallback = o((function e() {
    i(this, e), this.onScanStart = void 0, this.onScanFailed = void 0, this.onScanFinish = void 0, this.onFound = void 0
  })), exports.ScanSettingConfigure = o((function e() {
    i(this, e), this.isContainSystemsConnectedDevice = !1, this.isOpenScanTimeout = !0, this.scanTimeOut = 3e4, this.filterServic = void 0, this.allowDuplicatesKey = !0, this.interval = 0, this.powerLevel = "medium"
  }))),
  _ = exports.ScanImpl = function() {
    return o((function e(t) {
      i(this, e), this._platform = "android", this._isScanning = !1, this._scanSettingConfigure = void 0, this._callbacks = new Array, this._scanDevList = new Array, this._scanTimeoutID = void 0, this._scanSystemConnectedDevInterval = void 0, this._platform = t, this._scanSettingConfigure = new d
    }), [{
      key: "isScanning",
      value: function() {
        return this._isScanning
      }
    }, {
      key: "addScanCallback",
      value: function(e) {
        -1 == this._callbacks.indexOf(e) && this._callbacks.push(e)
      }
    }, {
      key: "removeScanCallback",
      value: function(e) {
        var t = this._callbacks.indexOf(e); - 1 != t && this._callbacks.splice(t, 1)
      }
    }, {
      key: "startScan",
      value: function(e) {
        e && (this._scanSettingConfigure.scanTimeOut = e), this._isScanning ? this.refreshScan() : (this._scanDevList = new Array, this._stopTiming(), this._startTiming(), this._startScan())
      }
    }, {
      key: "refreshScan",
      value: function() {
        this._isScanning && (this._scanDevList = new Array, this._stopTiming(), this._startTiming())
      }
    }, {
      key: "stopScan",
      value: function() {
        this._stopTiming(), this._scanSystemConnectedDevInterval && clearInterval(this._scanSystemConnectedDevInterval), this._stopScan()
      }
    }, {
      key: "getScanSettingConfigure",
      value: function() {
        return this._scanSettingConfigure
      }
    }, {
      key: "setScanSettingConfigure",
      value: function(e) {
        this._scanSettingConfigure = e
      }
    }, {
      key: "_startScan",
      value: function() {
        var e = this;
        console.log("开始搜索蓝牙设备"), wx.startBluetoothDevicesDiscovery({
          services: this._scanSettingConfigure.filterServic,
          allowDuplicatesKey: this._scanSettingConfigure.allowDuplicatesKey,
          interval: this._scanSettingConfigure.interval,
          powerLevel: this._scanSettingConfigure.powerLevel,
          success: function(t) {
            console.log("开始搜索蓝牙设备成功:" + t.errMsg), e._isScanning = !0, e._onScanStart(), e._onBluetoothDeviceFound(), e._scanSettingConfigure.isContainSystemsConnectedDevice && e._onSystemConnectedDeviceFound()
          },
          fail: function(t) {
            console.log("搜索蓝牙设备失败，错误码：" + t.errCode), e._stopTiming(), e._onScanFailed(t)
          }
        })
      }
    }, {
      key: "_stopScan",
      value: function() {
        this._isScanning = !1, wx.stopBluetoothDevicesDiscovery(), wx.offBluetoothDeviceFound(), this._onScanFinish()
      }
    }, {
      key: "_onBluetoothDeviceFound",
      value: function() {
        var e = this;
        wx.onBluetoothDeviceFound((function(t) {
          var n = new Array;
          t.devices.forEach((function(e) {
            n.push(Object.assign(new a, e))
          })), e._handlerFoundDevcie(n)
        }))
      }
    }, {
      key: "_handlerFoundDevcie",
      value: function(e) {
        for (var t = !1, n = 0; n < e.length; n++) {
          for (var i = e[n], o = !1, a = 0; a < this._scanDevList.length; a++) {
            var s = this._scanDevList[a];
            if (i.deviceId === s.deviceId) {
              o = !0, i.RSSI === s.RSSI && (0, c.ab2hex)(i.advertisData) === (0, c.ab2hex)(s.advertisData) || (this._scanDevList[a] = i, t = !0);
              break
            }
          }
          o || (t = !0, this._scanDevList.push(i))
        }
        t && this._onFound(this._scanDevList)
      }
    }, {
      key: "_onSystemConnectedDeviceFound",
      value: function() {
        var e = this;
        this._scanSystemConnectedDevInterval = setInterval((function() {
          e._getSystemConnectedDevice({
            success: function(t) {
              e._handlerFoundDevcie(t)
            },
            fail: function(e) {
              console.log("_onSystemConnectedDeviceFound errCode: " + e.errCode + "  errMsg:" + e.errMsg)
            }
          })
        }), 500)
      }
    }, {
      key: "_getSystemConnectedDevice",
      value: function(e) {
        var t = {
          services: []
        };
        null != this._scanSettingConfigure.filterServic ? t.services = this._scanSettingConfigure.filterServic : "ios" == this._platform ? t.services = ["1800"] : t.services = new Array, t.success = function(t) {
          for (var n = new Array, i = 0; i < t.devices.length; i++) {
            var o = t.devices[i],
              c = new a;
            c.deviceId = o.deviceId, c.localName = o.name, c.name = o.name, c.serviceData = {}, c.advertisData = new ArrayBuffer(0), c.advertisServiceUUIDs = [], c.isSystem = !0, n.push(c)
          }
          e.success(n)
        }, t.fail = function(t) {
          e.fail(t)
        }, wx.getConnectedBluetoothDevices(t)
      }
    }, {
      key: "_stopTiming",
      value: function() {
        this._scanTimeoutID && clearTimeout(this._scanTimeoutID), this._scanTimeoutID = void 0
      }
    }, {
      key: "_startTiming",
      value: function() {
        var e = this,
          t = !1;
        return this._scanTimeoutID || (this._scanTimeoutID = setTimeout((function() {
          e._scanSystemConnectedDevInterval && clearInterval(e._scanSystemConnectedDevInterval), e._stopScan()
        }), this._scanSettingConfigure.scanTimeOut), t = !0), t
      }
    }, {
      key: "_onScanStart",
      value: function() {
        console.log("_onScanStart"), this._callbacks.forEach((function(e) {
          e.onScanStart && e.onScanStart()
        }))
      }
    }, {
      key: "_onScanFailed",
      value: function(e) {
        console.log("_onScanFailed:" + JSON.stringify(e)), this._callbacks.forEach((function(t) {
          t.onScanFailed && t.onScanFailed(e)
        }))
      }
    }, {
      key: "_onScanFinish",
      value: function() {
        console.log("_onScanFinish"), this._callbacks.forEach((function(e) {
          e.onScanFinish && e.onScanFinish()
        }))
      }
    }, {
      key: "_onFound",
      value: function(e) {
        this._callbacks.forEach((function(t) {
          t.onFound && t.onFound(e)
        }))
      }
    }])
  }(),
  g = (exports.LocationAdapterInfo = o((function e() {
    i(this, e), this.locationEnabled = !1, this.locationAuthorized = !1, this.locationSetting = !1
  })), exports.BTAdapterInfo = o((function e(t, n) {
    i(this, e), this.bluetoothSupport = !0, this.bluetoothInit = !0, this.bluetoothEnabled = !1, this.bluetoothSetting = !1, this.bluetoothEnabled = t, this.bluetoothSetting = n
  }))),
  C = exports.BluetoothAdapter = function() {
    return o((function e() {
      i(this, e), this._availableBluetooth = !1, this._availableLocation = !1, this._listeners = new Array, this._registerAdapterStatusListener()
    }), [{
      key: "registerBluetoothAdapterListener",
      value: function(e) {
        -1 == this._listeners.indexOf(e) && this._listeners.push(e)
      }
    }, {
      key: "unregisterBluetoothAdapterListener",
      value: function(e) {
        var t = this._listeners.indexOf(e); - 1 != t && this._listeners.splice(t, 1)
      }
    }, {
      key: "checkBluetoothAdapter",
      value: function() {
        var t = this;
        return new Promise((function(i, o) {
          var c, a, s = function() {
            var i = n(e().mark((function n() {
              var i, o, c;
              return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return (i = wx.getSystemSetting()).bluetoothEnabled, e.next = 1, t._getBluetoothSettingStatus();
                  case 1:
                    return o = e.sent, c = new g(i.bluetoothEnabled, o), e.abrupt("return", c);
                  case 2:
                  case "end":
                    return e.stop()
                }
              }), n)
            })));
            return function() {
              return i.apply(this, arguments)
            }
          }();
          wx.getBluetoothAdapterState({
            success: (a = n(e().mark((function n(c) {
              var a;
              return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    if (!c.available) {
                      e.next = 1;
                      break
                    }
                    t._onBluetoothAdapter(!0), i(!0), e.next = 3;
                    break;
                  case 1:
                    return e.next = 2, s();
                  case 2:
                    a = e.sent, t._onBluetoothAdapter(!1, a), o(a);
                  case 3:
                  case "end":
                    return e.stop()
                }
              }), n)
            }))), function(e) {
              return a.apply(this, arguments)
            }),
            fail: (c = n(e().mark((function n(i) {
              var c;
              return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 1, s();
                  case 1:
                    c = e.sent, 1e4 == i.errCode ? c.bluetoothInit = !1 : null == i.errCode && (c.bluetoothSupport = !1), t._onBluetoothAdapter(!1, c), o(c);
                  case 2:
                  case "end":
                    return e.stop()
                }
              }), n)
            }))), function(e) {
              return c.apply(this, arguments)
            })
          })
        }))
      }
    }, {
      key: "openBluetoothAdapter",
      value: function(e) {
        wx.openBluetoothAdapter({
          success: function() {
            null == e || e.success()
          },
          fail: function(t) {
            null == e || e.fail()
          }
        })
      }
    }, {
      key: "closeBluetoothAdapter",
      value: function(e) {
        wx.closeBluetoothAdapter({
          success: function() {
            null == e || e.success()
          },
          fail: function(t) {
            null == e || e.fail()
          }
        })
      }
    }, {
      key: "checkLocation",
      value: function() {
        var e = this;
        return new Promise((function(t, n) {
          t(!0), e._onLocation(!0)
        }))
      }
    }, {
      key: "authorizeBluetooth",
      value: function() {
        return this._authorizeSetting("scope.bluetooth")
      }
    }, {
      key: "authorizeLocation",
      value: function() {
        return this._authorizeSetting("scope.userLocation")
      }
    }, {
      key: "_authorizeSetting",
      value: function(e) {
        var t = this;
        return new Promise((function(n, i) {
          t._getSettingStatus(e).then((function(t) {
            0 == t ? wx.authorize({
              scope: e,
              success: function() {
                n(!0)
              },
              fail: function(e) {
                n(!1)
              }
            }) : n(!0)
          })).catch((function(e) {
            i(e)
          }))
        }))
      }
    }, {
      key: "_registerAdapterStatusListener",
      value: function() {
        var e = this;
        wx.onBluetoothAdapterStateChange((function(t) {
          console.log("onBluetoothAdapterStateChange, available=" + t.available), 0 == t.available ? e.checkBluetoothAdapter() : e._onBluetoothAdapter(!0)
        }))
      }
    }, {
      key: "_getBluetoothSettingStatus",
      value: function() {
        return this._getSettingStatus("scope.bluetooth")
      }
    }, {
      key: "_getLocationSettingStatus",
      value: function() {
        return this._getSettingStatus("scope.userLocation")
      }
    }, {
      key: "_getSettingStatus",
      value: function(e) {
        return new Promise((function(t, n) {
          wx.getSetting({
            success: function(n) {
              var i = n.authSetting[e];
              t(i || !1)
            },
            fail: function(e) {
              n(e)
            }
          })
        }))
      }
    }, {
      key: "_onBluetoothAdapter",
      value: function(e, t) {
        e != this._availableBluetooth && (this._availableBluetooth = e, this._listeners.forEach((function(n) {
          n.onBluetoothAdapter(e, t)
        })))
      }
    }, {
      key: "_onLocation",
      value: function(e, t) {
        e != this._availableLocation && (this._availableLocation = e, this._listeners.forEach((function(n) {
          n.onLocation(e, t)
        })))
      }
    }])
  }();
exports.BluetoothImpl = function() {
  return o((function e() {
    i(this, e), this._btScan = void 0, this._btConnect = void 0, this._btAdapter = void 0, this._platform = void 0, this._platform = wx.getDeviceInfo().platform, this._btScan = new _(this._platform), this._btConnect = new f(this._platform), this._btAdapter = new C
  }), [{
    key: "isScanning",
    value: function() {
      return this._btScan.isScanning()
    }
  }, {
    key: "addScanCallback",
    value: function(e) {
      this._btScan.addScanCallback(e)
    }
  }, {
    key: "removeScanCallback",
    value: function(e) {
      this._btScan.removeScanCallback(e)
    }
  }, {
    key: "startScan",
    value: function(e) {
      var t = this;
      this._btAdapter.checkBluetoothAdapter().then((function(n) {
        n && t._btScan.startScan(e)
      })).catch((function(e) {
        throw e
      }))
    }
  }, {
    key: "refreshScan",
    value: function() {
      var e = this;
      this._btAdapter.checkBluetoothAdapter().then((function(t) {
        t && e._btScan.refreshScan()
      })).catch((function(e) {
        throw e
      }))
    }
  }, {
    key: "stopScan",
    value: function() {
      this._btScan.stopScan()
    }
  }, {
    key: "getScanSettingConfigure",
    value: function() {
      return this._btScan.getScanSettingConfigure()
    }
  }, {
    key: "setScanSettingConfigure",
    value: function(e) {
      this._btScan.setScanSettingConfigure(e)
    }
  }, {
    key: "setConnectSettingConfigure",
    value: function(e) {
      this._btConnect.setConnectSettingConfigure(e)
    }
  }, {
    key: "addConnectCallback",
    value: function(e) {
      this._btConnect.addConnectCallback(e)
    }
  }, {
    key: "removeConnectCallback",
    value: function(e) {
      this._btConnect.removeConnectCallback(e)
    }
  }, {
    key: "connect",
    value: function(e) {
      var t = this;
      this._btAdapter.checkBluetoothAdapter().then((function(n) {
        n && t._btConnect.connect(e)
      })).catch((function(e) {
        throw e
      }))
    }
  }, {
    key: "disconnect",
    value: function(e) {
      this._btConnect.disconnect(e)
    }
  }, {
    key: "getConnectedDevice",
    value: function() {
      return this._btConnect.getConnectedDevice()
    }
  }, {
    key: "getMTU",
    value: function(e) {
      return this._btConnect.getMTU(e)
    }
  }, {
    key: "isConnecting",
    value: function(e) {
      return this._btConnect.isConnecting(e)
    }
  }, {
    key: "isConnected",
    value: function(e) {
      return this._btConnect.isConnected(e)
    }
  }, {
    key: "registerBluetoothAdapterListenner",
    value: function(e) {
      this._btAdapter.registerBluetoothAdapterListener(e)
    }
  }, {
    key: "unregisterBluetoothAdapterListenner",
    value: function(e) {
      this._btAdapter.unregisterBluetoothAdapterListener(e)
    }
  }, {
    key: "openBluetoothAdapter",
    value: function(e) {
      return this._btAdapter.openBluetoothAdapter(e)
    }
  }, {
    key: "checkBluetoothAdapter",
    value: function() {
      return this._btAdapter.checkBluetoothAdapter()
    }
  }, {
    key: "checkLocation",
    value: function() {
      return this._btAdapter.checkLocation()
    }
  }, {
    key: "authorizeBluetooth",
    value: function() {
      return this._btAdapter.authorizeBluetooth()
    }
  }, {
    key: "authorizeLocation",
    value: function() {
      return this._btAdapter.authorizeLocation()
    }
  }, {
    key: "openAppAuthorizeSetting",
    value: function(e) {
      wx.openAppAuthorizeSetting(e)
    }
  }, {
    key: "openSystemBluetoothSetting",
    value: function(e) {
      wx.openSystemBluetoothSetting(e)
    }
  }])
}();
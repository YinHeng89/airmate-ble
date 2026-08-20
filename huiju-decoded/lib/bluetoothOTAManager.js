Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BluetoothOTAManager = exports.BluetoothEventCallback = exports.BluetoothConfigure = exports.BluetoothCallbackManager = void 0;
var t = require("../@babel/runtime/helpers/classCallCheck"),
  e = require("../@babel/runtime/helpers/createClass"),
  n = require("./ble-data-handler"),
  o = require("./bluetooth"),
  a = require("./bluetoothUi"),
  i = require("./otaWrapper"),
  c = (exports.BluetoothOTAManager = function() {
    return e((function e(s) {
      var l = this;
      t(this, e), this._Platform = "android", this._BluetoothCallbackManager = new u, this._BluetoothConfigure = new c, this._ConnectSettingConfigure = new o.ConnectSettingConfigure, this._ScanSettingConfigure = new o.ScanSettingConfigure, this._bluetoothInstance = new a.BluetoothUIImpl, this._OTAWrapper = void 0, this.UUID_SERVICE = "0000ae00-0000-1000-8000-00805f9b34fb", this.UUID_WRITE = "0000ae01-0000-1000-8000-00805f9b34fb", this.UUID_NOTIFY = "0000ae02-0000-1000-8000-00805f9b34fb", this._Platform = s, n.BleDataHandler.init(), this._ConnectSettingConfigure.mtu = 512, this._ConnectSettingConfigure.timeout = void 0;
      var r = new o.BluetoothService;
      r.UUID = this.UUID_SERVICE;
      var h = new o.BluetoothCharacteristic;
      h.UUID = this.UUID_NOTIFY, h.isNecessary = !0, r.characteristicInfos.push(h), this._ConnectSettingConfigure.notifyServiceArray.push(r), this._bluetoothInstance.setConnectSettingConfigure(this._ConnectSettingConfigure), this._ScanSettingConfigure.isContainSystemsConnectedDevice = !0, this._bluetoothInstance.setScanSettingConfigure(this._ScanSettingConfigure), this._initBluetooth();
      var f = {
        isUseAuth: function() {
          return l._BluetoothConfigure.isUseAuth
        },
        isInnerReconnect: function() {
          return !0
        },
        sanDevice: function() {
          l.sanDevice()
        },
        connectDevice: function(t) {
          var e = new o.BluetoothDevice;
          Object.assign(e, t), l.connectDevice(e)
        },
        disconnectDevice: function(t) {
          var e = new o.BluetoothDevice;
          Object.assign(e, t), l.disconnectDevice(e)
        },
        sendData: function(t, e) {
          var a = new o.BluetoothDevice;
          Object.assign(a, t), l._bluetoothInstance.isConnected(a) && n.BleSendDataHandler.sendData(t.deviceId, l.UUID_SERVICE, l.UUID_WRITE, e)
        }
      };
      this._OTAWrapper = new i.OTAWrapper(f)
    }), [{
      key: "_initBluetooth",
      value: function() {
        var t = this;
        this._bluetoothInstance.addConnectCallback({
          onMTUChange: function(e, o) {
            n.BleSendDataHandler.setMtu(e.deviceId, o), t._onConnectStateMTUChange(e, o)
          },
          onConnectSuccess: function(e) {
            t._OTAWrapper.onConnectStateSuccess(e), t._onConnectStateSuccess(e)
          },
          onConnectFailed: function(e, n) {
            t._OTAWrapper.onConnectStateFailed(e), t._onConnectStateFailed(e)
          },
          onConnectDisconnect: function(e) {
            t._OTAWrapper.onConnectStateDisconnect(e), t._onConnectStateDisconnect(e)
          }
        }), this._bluetoothInstance.addScanCallback({
          onFound: function(e) {
            t._OTAWrapper.onScanFound(e), t._onScanFound(e)
          },
          onScanStart: function() {
            t._onScanStart()
          },
          onScanFailed: function(e) {
            t._onScanFailed(e)
          },
          onScanFinish: function() {
            t._OTAWrapper.onSanDeviceStop(), t._onScanFinish()
          }
        }), this._bluetoothInstance.registerBluetoothAdapterListenner({
          onBluetoothAdapter: function(e, n) {
            t._BluetoothCallbackManager.onBluetoothAdapter(e, n)
          },
          onLocation: function(e, n) {
            t._BluetoothCallbackManager.onLocation(e, n)
          }
        });
        var e = {
          onReceiveData: function(e) {
            t._OTAWrapper.onReceiveData(t._toDevice(e.deviceId), e.value)
          }
        };
        n.BleDataHandler.addCallbacks(e)
      }
    }, {
      key: "startOTA",
      value: function(t, e, n) {
        this._OTAWrapper.startOTA(t, e, n)
      }
    }, {
      key: "isOTA",
      value: function(t) {
        return this._OTAWrapper.isOTA(t)
      }
    }, {
      key: "registerRcspCallback",
      value: function(t) {
        this._OTAWrapper.registerRcspCallback(t)
      }
    }, {
      key: "unregisterRcspCallback",
      value: function(t) {
        this._OTAWrapper.unregisterRcspCallback(t)
      }
    }, {
      key: "sendCustomCmd",
      value: function(t, e, n) {
        return this._OTAWrapper.sendCustomCmd(t, e, n)
      }
    }, {
      key: "addBluetoothEventCallback",
      value: function(t) {
        this._BluetoothCallbackManager.addCallbacks(t)
      }
    }, {
      key: "removeBluetoothEventCallback",
      value: function(t) {
        this._BluetoothCallbackManager.removeCallbacks(t)
      }
    }, {
      key: "setConfigure",
      value: function(t) {
        this._BluetoothConfigure = t, this.UUID_SERVICE = t.serviceUUID, this.UUID_NOTIFY = t.notifyCharacteristicUUID, this.UUID_WRITE = t.writeCharacteristicUUID, this._ConnectSettingConfigure.mtu = t.changeMTU, this._ConnectSettingConfigure.notifyServiceArray = new Array;
        var e = new o.BluetoothService;
        e.UUID = this.UUID_SERVICE;
        var n = new o.BluetoothCharacteristic;
        n.UUID = this.UUID_NOTIFY, n.isNecessary = !0, e.characteristicInfos.push(n), this._ConnectSettingConfigure.notifyServiceArray.push(e), this._bluetoothInstance.setConnectSettingConfigure(this._ConnectSettingConfigure)
      }
    }, {
      key: "getConfigure",
      value: function() {
        return this._BluetoothConfigure
      }
    }, {
      key: "sanDevice",
      value: function() {
        this._bluetoothInstance.startScan(1e4)
      }
    }, {
      key: "isConnected",
      value: function(t) {
        return this._bluetoothInstance.isConnected(this._toDevice(t))
      }
    }, {
      key: "getConnectedDevice",
      value: function() {
        return this._bluetoothInstance.getConnectedDevice()
      }
    }, {
      key: "connectDevice",
      value: function(t) {
        return this._bluetoothInstance.connect({
          device: this._toDevice(t),
          fail: function(t) {}
        })
      }
    }, {
      key: "disconnectDevice",
      value: function(t) {
        this._bluetoothInstance.disconnect(this._toDevice(t))
      }
    }, {
      key: "_toDevice",
      value: function(t) {
        var e;
        return "string" == typeof t ? (e = new o.BluetoothDevice).deviceId = t : e = t, e
      }
    }, {
      key: "_onScanFound",
      value: function(t) {
        this._BluetoothCallbackManager.onFoundDev(t)
      }
    }, {
      key: "_onScanStart",
      value: function() {
        this._BluetoothCallbackManager.onScanStart()
      }
    }, {
      key: "_onScanFinish",
      value: function() {
        this._BluetoothCallbackManager.onScanFinish()
      }
    }, {
      key: "_onScanFailed",
      value: function(t) {
        console.log(" _onScanFailed _Platform : " + this._Platform), this._BluetoothCallbackManager.onScanFailed(t)
      }
    }, {
      key: "_onConnectStateDisconnect",
      value: function(t) {
        this._BluetoothCallbackManager.onDevStatusDisconnect(t)
      }
    }, {
      key: "_onConnectStateFailed",
      value: function(t) {
        this._BluetoothCallbackManager.onDevStatusFailed(t)
      }
    }, {
      key: "_onConnectStateSuccess",
      value: function(t) {
        this._BluetoothCallbackManager.onDevStatusSuccess(t)
      }
    }, {
      key: "_onConnectStateMTUChange",
      value: function(t, e) {
        this._BluetoothCallbackManager.onDevStatusMTUChange(t, e)
      }
    }])
  }(), exports.BluetoothConfigure = e((function e() {
    t(this, e), this.isUseAuth = !0, this.isAutoTestOTA = !1, this.autoTestOTACount = 1, this.changeMTU = 512, this.serviceUUID = "0000ae00-0000-1000-8000-00805f9b34fb", this.notifyCharacteristicUUID = "0000ae02-0000-1000-8000-00805f9b34fb", this.writeCharacteristicUUID = "0000ae01-0000-1000-8000-00805f9b34fb"
  }))),
  u = exports.BluetoothCallbackManager = function() {
    return e((function e() {
      t(this, e), this.callbacks = Array()
    }), [{
      key: "addCallbacks",
      value: function(t) {
        -1 == this.callbacks.indexOf(t) && this.callbacks.push(t)
      }
    }, {
      key: "removeCallbacks",
      value: function(t) {
        var e = this.callbacks.indexOf(t); - 1 != e && this.callbacks.splice(e, 1)
      }
    }, {
      key: "onBluetoothAdapter",
      value: function(t, e) {
        this._doAction({
          action: function(n) {
            n.onBluetoothAdapter && n.onBluetoothAdapter(t, e)
          }
        })
      }
    }, {
      key: "onLocation",
      value: function(t, e) {
        this._doAction({
          action: function(n) {
            n.onLocation && n.onLocation(t, e)
          }
        })
      }
    }, {
      key: "onFoundDev",
      value: function(t) {
        this._doAction({
          action: function(e) {
            e.onFoundDev && e.onFoundDev(t)
          }
        })
      }
    }, {
      key: "onScanStart",
      value: function() {
        this._doAction({
          action: function(t) {
            t.onScanStart && t.onScanStart()
          }
        })
      }
    }, {
      key: "onScanFinish",
      value: function() {
        this._doAction({
          action: function(t) {
            t.onScanFinish && t.onScanFinish()
          }
        })
      }
    }, {
      key: "onScanFailed",
      value: function(t) {
        this._doAction({
          action: function(e) {
            e.onScanFailed && e.onScanFailed(t)
          }
        })
      }
    }, {
      key: "onDevStatusDisconnect",
      value: function(t) {
        this._doAction({
          action: function(e) {
            e.onDevStatusDisconnect && e.onDevStatusDisconnect(t)
          }
        })
      }
    }, {
      key: "onDevStatusFailed",
      value: function(t) {
        this._doAction({
          action: function(e) {
            e.onDevStatusFailed && e.onDevStatusFailed(t)
          }
        })
      }
    }, {
      key: "onDevStatusSuccess",
      value: function(t) {
        this._doAction({
          action: function(e) {
            e.onDevStatusSuccess && e.onDevStatusSuccess(t)
          }
        })
      }
    }, {
      key: "onDevStatusMTUChange",
      value: function(t, e) {
        this._doAction({
          action: function(n) {
            n.onDevStatusMTUChange && n.onDevStatusMTUChange(t, e)
          }
        })
      }
    }, {
      key: "_doAction",
      value: function(t) {
        this.callbacks.forEach((function(e) {
          t.action(e)
        }))
      }
    }])
  }();
exports.BluetoothEventCallback = function() {
  return e((function e() {
    t(this, e)
  }), [{
    key: "onBluetoothAdapter",
    value: function(t, e) {}
  }, {
    key: "onLocation",
    value: function(t, e) {}
  }, {
    key: "onFoundDev",
    value: function(t) {}
  }, {
    key: "onScanStart",
    value: function() {}
  }, {
    key: "onScanFinish",
    value: function() {}
  }, {
    key: "onScanFailed",
    value: function(t) {}
  }, {
    key: "onDevStatusDisconnect",
    value: function(t) {}
  }, {
    key: "onDevStatusFailed",
    value: function(t) {}
  }, {
    key: "onDevStatusSuccess",
    value: function(t) {}
  }, {
    key: "onDevStatusMTUChange",
    value: function(t, e) {}
  }])
}();
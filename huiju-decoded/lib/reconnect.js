Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Reconnect = void 0;
var e = require("../@babel/runtime/helpers/classCallCheck"),
  n = require("../@babel/runtime/helpers/createClass");
exports.Reconnect = function() {
  return n((function n(i, c) {
    e(this, n), this.reconnectOp = void 0, this.reconnectCallback = void 0, this.isFinished = !1, this.connectingDevice = void 0, this.timeoutNumber = void 0, this.reconnectOp = i, this.reconnectCallback = c
  }), [{
    key: "startReconnect",
    value: function(e) {
      var n = this;
      this.timeoutNumber = setTimeout((function() {
        clearTimeout(n.timeoutNumber), n.reconnectCallback.onReconnectFailed()
      }), e), this.reconnectOp.startScanDevice()
    }
  }, {
    key: "stopReconnect",
    value: function() {
      this.isFinished = !0, clearTimeout(this.timeoutNumber)
    }
  }, {
    key: "onScanStop",
    value: function() {
      console.log("上层扫描暂停通知 : " + this.isFinishedReconnect()), this.isFinishedReconnect() || this.reconnectOp.startScanDevice()
    }
  }, {
    key: "onDiscoveryDevices",
    value: function(e) {
      var n = this;
      e.forEach((function(e) {
        n.onDiscoveryDevice(e)
      }))
    }
  }, {
    key: "onDiscoveryDevice",
    value: function(e) {
      this.isFinishedReconnect() || this.reconnectOp.isReconnectDevice(e) && (this.connectingDevice = e, this.reconnectOp.connectDevice(e))
    }
  }, {
    key: "onDeviceConnected",
    value: function(e) {
      var n, i;
      this.isFinishedReconnect() || (console.log("onDeviceConnected : " + e.deviceId + " deviceId :" + (null === (n = this.connectingDevice) || void 0 === n ? void 0 : n.deviceId)), null != this.connectingDevice && e.deviceId == (null === (i = this.connectingDevice) || void 0 === i ? void 0 : i.deviceId) && (clearTimeout(this.timeoutNumber), this.reconnectCallback.onReconnectSuccess(e), this.isFinished = !0))
    }
  }, {
    key: "onDeviceConnectFailed",
    value: function(e) {
      var n, i;
      this.isFinishedReconnect() || (console.log("onDeviceConnectFailed : " + e.deviceId + " deviceId :" + (null === (n = this.connectingDevice) || void 0 === n ? void 0 : n.deviceId)), null != this.connectingDevice && e.deviceId == (null === (i = this.connectingDevice) || void 0 === i ? void 0 : i.deviceId) && this.reconnectCallback.onDeviceConnectFailed(e))
    }
  }, {
    key: "onDeviceConnectDisconnected",
    value: function(e) {
      var n, i;
      this.isFinishedReconnect() || (console.log("onDeviceConnectDisconnected : " + e.deviceId + " deviceId :" + (null === (n = this.connectingDevice) || void 0 === n ? void 0 : n.deviceId)), null != this.connectingDevice && e.deviceId == (null === (i = this.connectingDevice) || void 0 === i ? void 0 : i.deviceId) && this.reconnectCallback.onDeviceConnectDisconnected(e))
    }
  }, {
    key: "isFinishedReconnect",
    value: function() {
      return this.isFinished
    }
  }])
}();
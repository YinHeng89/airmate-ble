Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BleSendDataHandler = exports.BleDataHandler = void 0;
var e = require("../@babel/runtime/helpers/createClass"),
  t = require("../@babel/runtime/helpers/classCallCheck"),
  a = require("./util"),
  n = (exports.BleDataHandler = {
    callbacks: Array(),
    init: function() {
      var e = this;
      wx.onBLECharacteristicValueChange((function(t) {
        e._handlerData(t)
      }))
    },
    addCallbacks: function(e) {
      -1 == this.callbacks.indexOf(e) && this.callbacks.push(e)
    },
    removeCallbacks: function(e) {
      var t = this.callbacks.indexOf(e); - 1 != t && this.callbacks.splice(t, 1)
    },
    _handlerData: function(e) {
      this._doAction({
        action: function(t) {
          t.onReceiveData && t.onReceiveData(e)
        }
      })
    },
    _handlerConnectState: function(e) {
      this._doAction({
        action: function(t) {
          t.onConnectStateChange && t.onConnectStateChange(e)
        }
      })
    },
    _doAction: function(e) {
      this.callbacks.forEach((function(t) {
        e.action(t)
      }))
    }
  }, exports.BleSendDataHandler = {
    mtuMap: new Map,
    sendInfoArray: new Array,
    retryNum: 0,
    setMtu: function(e, t) {
      this.mtuMap.set(e, t)
    },
    sendData: function(e, t, a, n) {
      var r = this.mtuMap.get(e),
        i = 20;
      null != r && r > 512 ? i = 509 : null != r && (i = r - 3);
      for (var c = n.byteLength, s = Math.floor(c / i), l = !1, o = 0; o < s; o++) {
        var d = new Uint8Array(i);
        d.set(n.slice(o * i, o * i + d.length)), l = this._addSendData(e, t, a, d)
      }
      if (0 != c % i) {
        var u = new Uint8Array(c % i);
        u.set(n.slice(c - c % i, c)), l = this._addSendData(e, t, a, u)
      }
      return l
    },
    _addSendData: function(e, t, a, r) {
      var i = this,
        c = new n(e, t, a, r);
      if (this.sendInfoArray.push(c), this.sendInfoArray.length > 1) return !0;
      var s = {
        complete: function() {
          i._writeDataToDevice(i.sendInfoArray, s)
        }
      };
      return this._writeDataToDevice(this.sendInfoArray, s), !0
    },
    _writeDataToDevice: function(e, t) {
      var a = e.shift();
      if (null != a) this._sendData(a, t);
      else {
        var n;
        if (0 == e.length) return;
        null === (n = t.complete) || void 0 === n || n.call(t)
      }
    },
    _sendData: function(e, t) {
      var n = this;
      return console.log("开始发送数据：->" + (0, a.ab2hex)(e.data.buffer) + " serviceId:" + e.serviceId), wx.writeBLECharacteristicValue({
        deviceId: e.deviceId,
        serviceId: e.serviceId.toLocaleUpperCase(),
        characteristicId: e.characteristicId.toLocaleUpperCase(),
        value: e.data.buffer,
        fail: function(a) {
          var r;
          (n.retryNum++, n.retryNum <= 3) ? n._sendData(e, t): (n.retryNum = 0, null === (r = t.complete) || void 0 === r || r.call(t))
        },
        success: function() {
          var e;
          n.retryNum = 0, null === (e = t.complete) || void 0 === e || e.call(t)
        }
      }), !0
    }
  }, e((function e(a, n, r, i) {
    t(this, e), this.deviceId = a, this.serviceId = n, this.characteristicId = r, this.data = i
  })));
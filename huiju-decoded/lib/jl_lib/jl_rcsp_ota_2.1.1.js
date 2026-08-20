var t = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  e = require("../../@babel/runtime/helpers/wrapNativeSuper"),
  n = require("../../@babel/runtime/helpers/possibleConstructorReturn"),
  i = require("../../@babel/runtime/helpers/get"),
  r = require("../../@babel/runtime/helpers/getPrototypeOf"),
  s = require("../../@babel/runtime/helpers/inherits"),
  a = require("../../@babel/runtime/helpers/createClass"),
  u = require("../../@babel/runtime/helpers/classCallCheck");

function o(t, e, i) {
  return e = r(e), n(t, function() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
    } catch (t) {
      return !1
    }
  }() ? Reflect.construct(e, i || [], r(t).constructor) : e.apply(t, i))
}
var l, c, h = "JLRCSP",
  f = 1;

function R() {
  for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
  f <= 1 && null != l && (t = l).logv.apply(t, [h].concat(n))
}

function v() {
  for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
  f <= 3 && null != l && (t = l).logi.apply(t, [h].concat(n))
}

function E() {
  for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
  f <= 4 && null != l && (t = l).logw.apply(t, [h].concat(n))
}

function _() {
  for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
  f <= 5 && null != l && (t = l).loge.apply(t, [h].concat(n))
}

function p(t) {
  return Array.prototype.map.call(new Uint8Array(t), (function(t) {
    return ("00" + t.toString(16)).slice(-2)
  })).join("")
}

function g(t) {
  for (var e = "", n = 0; n < t.length; n++) e += ("00" + t[n].toString(16)).slice(-2), n != t.length - 1 && (e += ":");
  return e.toUpperCase()
}

function d(t) {
  return function(t) {
    for (var e = new DataView(t), n = new Uint8Array(t.byteLength), i = 0; i < n.length; i++) n[i] = e.getUint8(i);
    var r = "",
      s = n;
    for (i = 0; i < s.length; i++) {
      var a = s[i].toString(2),
        u = a.match(/^1+?(?=0)/);
      if (u && 8 == a.length) {
        for (var o = u[0].length, l = s[i].toString(2).slice(7 - o), c = 1; c < o; c++) try {
          l += s[c + i].toString(2).slice(2)
        } catch (t) {}
        r += String.fromCharCode(parseInt(l, 2)), i += o - 1
      } else r += String.fromCharCode(s[i])
    }
    return r
  }(new Uint8Array(t).buffer)
}

function y(t) {
  var e = (t < 0 ? -t : t).toString(16).toUpperCase();
  return "" === e ? "0x00" : t < 0 ? "-0x" + e : "0x" + e
}
var C = a((function t() {
  u(this, t)
}));
C.DEFAULT_SEND_CMD_TIMEOUT = 3e3, C.DEFAULT_PROTOCOL_MTU = 530, exports.Connection = void 0, (c = exports.Connection || (exports.Connection = {}))[c.CONNECTION_DISCONNECT = 0] = "CONNECTION_DISCONNECT", c[c.CONNECTION_CONNECTING = 1] = "CONNECTION_CONNECTING", c[c.CONNECTION_CONNECTED = 2] = "CONNECTION_CONNECTED";
var O = function() {
  function t() {
    u(this, t)
  }
  return a(t, null, [{
    key: "getErrorDesc1",
    value: function(t) {
      return this.getErrorDesc2(t, "")
    }
  }, {
    key: "getErrorDesc2",
    value: function(e, n) {
      var i = "";
      switch (e) {
        case t.ERROR_UNKNOWN:
          i = "Unknown error.";
          break;
        case t.ERROR_NONE:
          i = "Success";
          break;
        case t.ERROR_INVALID_PARAM:
          i = "Invalid parameter.";
          break;
        case t.ERROR_DATA_FORMAT:
          i = "Data formatting error.";
          break;
        case t.ERROR_NOT_FOUND_RESOURCE:
          i = "No resources found.";
          break;
        case t.ERROR_UNKNOWN_DEVICE:
          i = "Unknown device.";
          break;
        case t.ERROR_DEVICE_OFFLINE:
          i = "Device went offline.";
          break;
        case t.ERROR_IO_EXCEPTION:
          i = "I/O exceptions occur.";
          break;
        case t.ERROR_REPEAT_STATUS:
          i = "Repeat state.";
          break;
        case t.ERROR_RESPONSE_TIMEOUT:
          i = "Waiting for reply command timed out.";
          break;
        case t.ERROR_REPLY_BAD_STATUS:
          i = "Device returned a bad status.";
          break;
        case t.ERROR_REPLY_BAD_RESULT:
          i = "Device returned an error result.";
          break;
        case t.ERROR_NONE_PARSER:
          i = "There is no associated parser."
      }
      return "" == i || null == n || 0 == n.length ? i : i + t.SEPARATOR + n
    }
  }])
}();
O.ERROR_UNKNOWN = 255, O.ERROR_NONE = 0, O.ERROR_INVALID_PARAM = -1, O.ERROR_DATA_FORMAT = -2, O.ERROR_NOT_FOUND_RESOURCE = -3, O.ERROR_UNKNOWN_DEVICE = -32, O.ERROR_DEVICE_OFFLINE = -33, O.ERROR_IO_EXCEPTION = -35, O.ERROR_REPEAT_STATUS = -36, O.ERROR_RESPONSE_TIMEOUT = -64, O.ERROR_REPLY_BAD_STATUS = -65, O.ERROR_REPLY_BAD_RESULT = -66, O.ERROR_NONE_PARSER = -67, O.SEPARATOR = "&_&";
var T = function() {
    return a((function t() {
      u(this, t)
    }), [{
      key: "t",
      value: function(t) {
        if (null == t) return null;
        var e = this.i();
        if (null == e || e.getOpCode() != t.getOpCode()) return null;
        e.setCommand(t.isCommand()), e.setNeedResponse(t.isNeedResponse()), e.setReserve(t.getReserve());
        var n = t.h();
        if (null != n && (e.o(n), (t.isCommand() ? e.getParam().l(n) : null != e.getResponse() ? e.getResponse().l(n) : O.ERROR_NONE_PARSER) >= O.ERROR_NONE)) return e;
        return null
      }
    }])
  }(),
  A = function() {
    function t() {
      u(this, t), this.u = !1, this.p = !1, this.D = 0, this.C = 0, this.m = -1
    }
    return a(t, [{
      key: "isCommand",
      value: function() {
        return this.u
      }
    }, {
      key: "setCommand",
      value: function(t) {
        return this.u = t, t || (this.p = !1), this
      }
    }, {
      key: "isNeedResponse",
      value: function() {
        return this.p
      }
    }, {
      key: "setNeedResponse",
      value: function(t) {
        return this.p = t, this
      }
    }, {
      key: "getReserve",
      value: function() {
        return this.D
      }
    }, {
      key: "setReserve",
      value: function(t) {
        return this.D = t, this
      }
    }, {
      key: "getOpCode",
      value: function() {
        return this.C
      }
    }, {
      key: "setOpCode",
      value: function(t) {
        return this.C = t, this
      }
    }, {
      key: "getSn",
      value: function() {
        return this.m
      }
    }, {
      key: "h",
      value: function() {
        return this.A
      }
    }, {
      key: "o",
      value: function(t) {
        if (this.A = t, 0 != t.byteLength) {
          var e = 0;
          this.u || e++, t.byteLength > e && (this.m = t[e])
        }
      }
    }, {
      key: "v",
      value: function() {
        var t = 8,
          e = 0;
        null != this.A && (t += this.A.byteLength, e = this.A.byteLength);
        var n = new Uint8Array(t);
        n[0] = 254, n[1] = 220, n[2] = 186, n[t - 1] = 239;
        var i = 0;
        this.u && (i |= 128), this.p && (i |= 64), n[3] = i, n[4] = this.C;
        var r = this.u ? 1 : 2;
        if (1 == this.C && r++, e < r) return _("RcspPacket: toData error: payload error."), null;
        if (n[5] = e >> 8, n[6] = 255 & e, null != this.A) {
          var s = new Uint8Array(this.A);
          n.set(s, 7)
        }
        return n
      }
    }, {
      key: "l",
      value: function(e) {
        if (null == e || e.byteLength <= 8) return _("RcspPacket: parseData : data is invalid param."), O.ERROR_INVALID_PARAM;
        for (var n = 0; n < t.RCSP_HEAD.length; n++)
          if (t.RCSP_HEAD[n] != e[n]) return _("RcspPacket: parseData : head error, it is not rcsp data."), O.ERROR_DATA_FORMAT;
        var i = 3,
          r = (255 & e[i + 2]) << 8 | 255 & e[i + 3];
        if (r < 1 || r > e.byteLength - 8) return _("RcspPacket: parseData : len error, it is not rcsp data."), O.ERROR_DATA_FORMAT;
        if (e[i + 4 + r] != t.RCSP_END) return _("RcspPacket: parseData : end error, it is not rcsp data."), O.ERROR_DATA_FORMAT;
        var s = e[i];
        i++, this.u = 128 == (128 & s), this.p = 64 == (64 & s), this.D = 63 & s, this.C = e[i];
        var a = (255 & e[++i]) << 8 | 255 & e[i + 1];
        i += 2;
        for (var u = new Uint8Array(a), o = i; o < e.length; o++) u[o - i] = e[o];
        return this.o(u), i += a, ++i
      }
    }])
  }();
A.RCSP_HEAD = [254, 220, 186], A.RCSP_END = 239;
var D = function(t) {
    function e(t, n, i) {
      var r;
      return u(this, e), (r = o(this, e)).R = null, r.setOpCode(t), r.k = n, r.setResponse(i), r.setCommand(!0), r
    }
    return s(e, A), a(e, [{
      key: "getParam",
      value: function() {
        return this.k
      }
    }, {
      key: "getResponse",
      value: function() {
        return this.R
      }
    }, {
      key: "getSn",
      value: function() {
        if (-1 == i(r(e.prototype), "getSn", this).call(this)) {
          if (this.isCommand()) return this.getParam().getSn();
          if (null != this.getResponse()) return this.getResponse().getSn()
        }
        return i(r(e.prototype), "getSn", this).call(this)
      }
    }, {
      key: "setParam",
      value: function(t) {
        this.k = t
      }
    }, {
      key: "setResponse",
      value: function(t) {
        this.R = t, this.setNeedResponse(null != t)
      }
    }, {
      key: "setSn",
      value: function(t) {
        var e;
        this.isCommand() ? this.getParam().setSn(t) : null != this.getResponse() && (null === (e = this.getResponse()) || void 0 === e || e.setSn(t))
      }
    }, {
      key: "setStatus",
      value: function(t) {
        var e;
        null != this.getResponse() && (null === (e = this.getResponse()) || void 0 === e || e.setStatus(t))
      }
    }, {
      key: "getStatus",
      value: function() {
        return null != this.getResponse() ? this.getResponse().getStatus() : -1
      }
    }, {
      key: "v",
      value: function() {
        var t;
        return this.isCommand() || this.setNeedResponse(!1), t = this.isCommand() ? null == this.k ? new Uint8Array(0) : this.k.v() : null == this.R ? new Uint8Array(0) : this.R.v(), this.o(t), i(r(e.prototype), "v", this).call(this)
      }
    }])
  }(),
  S = function() {
    return a((function t() {
      u(this, t), this.m = -1
    }), [{
      key: "setSn",
      value: function(t) {
        this.m = t
      }
    }, {
      key: "getSn",
      value: function() {
        return this.m
      }
    }, {
      key: "getData",
      value: function() {
        return this.U
      }
    }, {
      key: "setData",
      value: function(t) {
        this.U = t
      }
    }, {
      key: "v",
      value: function() {
        var t = 1;
        null != this.U && (t += this.U.byteLength);
        var e = new Uint8Array(t);
        if (null != this.m ? e[0] = this.m : e[0] = 0, null != this.U)
          for (var n = 0; n < this.U.byteLength; n++) e[n + 1] = this.U[n];
        return e
      }
    }, {
      key: "l",
      value: function(t) {
        if (null == t || t.byteLength < 1) return O.ERROR_INVALID_PARAM;
        if (this.m = t[0], t.byteLength > 1) {
          for (var e = new Uint8Array(t.length - 1), n = 1; n < t.length; n++) e[n - 1] = t[n];
          this.U = e
        }
        return 1
      }
    }])
  }(),
  k = function() {
    return a((function t() {
      u(this, t), this.S = -1, this.m = -1
    }), [{
      key: "getStatus",
      value: function() {
        return this.S
      }
    }, {
      key: "getSn",
      value: function() {
        return this.m
      }
    }, {
      key: "h",
      value: function() {
        return this.A
      }
    }, {
      key: "setStatus",
      value: function(t) {
        this.S = t
      }
    }, {
      key: "setSn",
      value: function(t) {
        this.m = t
      }
    }, {
      key: "o",
      value: function(t) {
        this.A = t
      }
    }, {
      key: "v",
      value: function() {
        var t = 2;
        null != this.A && (t += this.A.byteLength);
        var e = new Uint8Array(t);
        if (e[0] = this.S, e[1] = this.m, null != this.A)
          for (var n = 0; n < this.A.length; n++) e[n + 2] = this.A[n];
        return e
      }
    }, {
      key: "l",
      value: function(t) {
        return t.byteLength < 2 ? O.ERROR_INVALID_PARAM : (this.S = t[0], this.m = t[1], t.byteLength > 2 && (this.A = new Uint8Array(t.length - 2), this.A.set(t.slice(2))), 2)
      }
    }])
  }();
k.STATUS_UNKNOWN = 255, k.STATUS_SUCCESS = 0, k.STATUS_FAILED = 1, k.STATUS_UNKNOWN_CMD = 2, k.STATUS_BUSY = 3, k.STATUS_NONE_RESOURCE = 4, k.STATUS_CRC_ERROR = 5, k.STATUS_ALL_DATA_CRC_ERROR = 6, k.STATUS_INVALID_PARAM = 7, k.STATUS_RESPONSE_DATA_OVER_LIMIT = 8;
var m = function(t) {
  function e() {
    var t;
    return u(this, e), (t = o(this, e, arguments)).result = e.RESULT_OK, t
  }
  return s(e, k), a(e, [{
    key: "l",
    value: function(t) {
      var n = i(r(e.prototype), "l", this).call(this, t);
      return n < O.ERROR_NONE || t.length >= n + 1 && (this.result = 255 & t[n], n++), n
    }
  }, {
    key: "v",
    value: function() {
      var t = 0,
        n = i(r(e.prototype), "v", this).call(this),
        s = new Uint8Array(n.byteLength + 1);
      return s.set(n, t), s[t += n.length] = this.result, t += 1, s
    }
  }])
}();
m.RESULT_OK = 0, m.RESULT_FAIL = 1;
var N = a((function t(e, n) {
  u(this, t), this.device = e, this.type = n
}));
N.I = 0, N.P = 1;
var I = function(t) {
    function e(t, n, i, r) {
      var s;
      return u(this, e), (s = o(this, e, [t, N.I]))._ = 0, s.O = 0, s.command = n, s.timeoutMs = i, s.callback = r, s
    }
    return s(e, N), a(e)
  }(),
  M = function(t) {
    function e(t, n) {
      var i;
      return u(this, e), (i = o(this, e, [t, N.P])).data = n, i
    }
    return s(e, N), a(e)
  }(),
  U = function(t) {
    function n() {
      return u(this, n), o(this, n, arguments)
    }
    return s(n, e(Array)), a(n)
  }(),
  P = function() {
    return a((function t(e, n, i, r) {
      u(this, t), this.T = 3, this.M = !1, this.ioProxy = e, this.listener = r, this.deviceMtuManager = n, this.N = new U, this.V = new w(i), this.H = new Array, this.F = new Array, this.G = new Map
    }), [{
      key: "L",
      value: function() {
        this.M = !0, this.V.q()
      }
    }, {
      key: "J",
      value: function() {
        this.M = !1, this.N.length > 0 && this.N.forEach((function(t) {
          var e = t.callback;
          if (null != e) {
            var n = O.ERROR_IO_EXCEPTION;
            e.onError(t.device, n, O.getErrorDesc1(n))
          }
        })), this.G.size > 0 && this.G.forEach((function(t) {
          clearTimeout(t)
        })), this.N.length = 0, this.H.length = 0, this.F.length = 0, this.G.clear()
      }
    }, {
      key: "W",
      value: function(t) {
        var e = this;
        if (this.B(t)) {
          if (this.H.push(t), this.H.length > 1) return void R("RCSPDataHandler: 放入数据缓冲区，等待发送");
          var n = {
            complete: function() {
              e.X(e.H, n)
            }
          };
          this.X(this.H, n)
        }
      }
    }, {
      key: "K",
      value: function(t) {
        var e = this;
        if (this.B(t)) {
          if (this.F.push(t), this.F.length > 1) return void R("RCSPDataHandler: 放入数据缓冲区，等待解析");
          var n = {
            complete: function() {
              e.j(e.F, n)
            }
          };
          this.j(this.F, n)
        }
      }
    }, {
      key: "destroy",
      value: function() {
        this.J()
      }
    }, {
      key: "B",
      value: function(t) {
        if (null == t) {
          var e = O.ERROR_INVALID_PARAM;
          return this.listener.onError(null, e, O.getErrorDesc2(e, "DataInfo is null")), !1
        }
        if (!this.Y()) {
          var n = O.ERROR_IO_EXCEPTION;
          return this.listener.onError(t.device, n, O.getErrorDesc2(n, "The processing thread is not working.")), !1
        }
        return !0
      }
    }, {
      key: "Y",
      value: function() {
        return this.M
      }
    }, {
      key: "X",
      value: function(t, e) {
        var n, i, r, s, a = this,
          u = t.shift();
        if (null == u) {
          var o, l;
          if (0 == t.length) return;
          return null !== (o = e.fail) && void 0 !== o && o.call(e), void(null === (l = e.complete) || void 0 === l || l.call(e))
        }
        if (!this.Z(u)) return _("RCSPDataHandler: send data failed. Please check whether the device is connected."), this.$(u, O.ERROR_IO_EXCEPTION, "send data failed."), null !== (n = e.fail) && void 0 !== n && n.call(e), void(null === (i = e.complete) || void 0 === i || i.call(e));
        var c = new Date;
        if (u.O = c.getMilliseconds(), u.command.isNeedResponse()) {
          -1 == this.N.indexOf(u) && this.N.push(u);
          var h = setTimeout((function(t) {
              var e = t,
                n = e._;
              E("RCSPDataHandler: " + e.command + ", reSendCount: " + n + ", limit: " + a.T);
              var i = a.N.indexOf(e);
              if (i > -1 && a.N.splice(i, 1), n < a.T) e._ = n + 1, a.W(e);
              else {
                var r = "Command[" + y(e.command.getOpCode()) + "]";
                a.$(e, O.ERROR_RESPONSE_TIMEOUT, r)
              }
            }), u.timeoutMs, u),
            f = this.tt(u);
          this.G.set(f, h)
        } else this.st(u);
        null !== (r = e.success) && void 0 !== r && r.call(e), null === (s = e.complete) || void 0 === s || s.call(e)
      }
    }, {
      key: "Z",
      value: function(t) {
        var e = t.command.v();
        if (null == e || 0 == e.byteLength) return R("RCSPDataHandler: sendData : data is null."), !1;
        if (e.byteLength > this.et(t.device)) return _("RCSPDataHandler: sendData : data over limit. RCSP mtu = " + this.et(t.device)), !1;
        for (var n = !1, i = 0; i < 3 && !(n = this.ioProxy.sendDataToDevice(t.device, e)); i++);
        return n
      }
    }, {
      key: "j",
      value: function(t, e) {
        var n, i, r = this,
          s = t.shift();
        if (null == s) {
          var a, u;
          if (0 == t.length) return;
          return null !== (a = e.fail) && void 0 !== a && a.call(e), void(null === (u = e.complete) || void 0 === u || u.call(e))
        }
        var o = this.V.rt(this.nt(s.device), s.data);
        if (0 == o.length) return null !== (n = e.fail) && void 0 !== n && n.call(e), void(null === (i = e.complete) || void 0 === i || i.call(e));
        o.forEach((function(t) {
          if (t.isCommand()) {
            var e = r.V.t(t);
            if (null == e) {
              var n = O.ERROR_NONE_PARSER;
              r.listener.onError(s.device, n, O.getErrorDesc2(n, " Command op code = " + y(t.getOpCode())))
            } else r.listener.onRcspCommand(s.device, e)
          } else {
            var i = r.it(r.N, t);
            if (null == i) R("RCSPDataHandler: MSG_RECEIVE_DATA : no found cacheDataInfo.");
            else {
              R("RCSPDataHandler: MSG_RECEIVE_DATA : " + i);
              var a = r.tt(i),
                u = r.G.get(a);
              null != u && (clearTimeout(u), r.G.delete(a));
              var o = i.command;
              if (null == o.getResponse()) R("RCSPDataHandler: MSG_RECEIVE_DATA : no found command response.");
              else {
                var l = o.getResponse().l(t.h());
                if (R("RCSPDataHandler: MSG_RECEIVE_DATA : ret = " + l), l >= O.ERROR_NONE) r.listener.onRcspResponse(s.device, o), r.st(i);
                else {
                  var c = "The response of the command" + y(t.getOpCode()) + " parse error. reason : " + l;
                  R("RCSPDataHandler: " + c), r.$(i, O.ERROR_DATA_FORMAT, c)
                }
              }
            }
          }
        }))
      }
    }, {
      key: "$",
      value: function(t, e, n) {
        null != t.callback && t.callback.onError(t.device, e, O.getErrorDesc2(e, n)), this.listener.onError(t.device, e, O.getErrorDesc1(e))
      }
    }, {
      key: "st",
      value: function(t) {
        null != t.callback && t.callback.onCmdResponse(t.device, t.command)
      }
    }, {
      key: "et",
      value: function(t) {
        var e = this.deviceMtuManager.getReceiveMtu(t);
        return null != e && e > 0 ? e : C.DEFAULT_PROTOCOL_MTU
      }
    }, {
      key: "nt",
      value: function(t) {
        var e = this.deviceMtuManager.getSendMtu(t);
        return null != e && e > 0 ? e : C.DEFAULT_PROTOCOL_MTU
      }
    }, {
      key: "tt",
      value: function(t) {
        return null == t ? Number.MAX_VALUE : t.command.getOpCode() << 16 | t.command.getParam().getSn()
      }
    }, {
      key: "it",
      value: function(t, e) {
        if (0 == t.length) return null;
        var n = null;
        if (t.forEach((function(t) {
            e.isCommand() || t.command.getOpCode() != e.getOpCode() || e.getSn() != t.command.getParam().getSn() || (n = t)
          })), null != n) {
          var i = t.indexOf(n);
          i > -1 && t.splice(i, 1)
        }
        return n
      }
    }])
  }(),
  w = function() {
    return a((function t(e) {
      u(this, t), this.ht = null, this.ct = 0, this.ot = e
    }), [{
      key: "lt",
      value: function() {
        return this.ot
      }
    }, {
      key: "t",
      value: function(t) {
        if (null == t) return null;
        var e = this.ut(t.getOpCode());
        return null == e ? null : e.t(t)
      }
    }, {
      key: "ut",
      value: function(t) {
        return this.lt().get(t)
      }
    }, {
      key: "q",
      value: function() {
        this.ct > 0 && (this.ct = 0)
      }
    }, {
      key: "rt",
      value: function(t, e) {
        if (0 == t || null == e || 0 == e.length) return new Array;
        for (var n = new Array, i = this.dt(e), r = i.length, s = 0, a = 0; a < r;) {
          if (-1 == (s = this.ft(i, a, t))) {
            v("RcspParser: findPacketData : not find head data.");
            break
          }
          for (var u = (255 & i[s + 5]) << 8 | 255 & i[s + 6], o = new Uint8Array(8 + u), l = 0; l < o.length; l++) o[l] = i[s + l];
          var c = new A,
            h = c.l(o);
          h > O.ERROR_NONE ? (n.push(c), a = s + o.length) : (_("RcspParser: findPacketData : parse data error.  code = " + h + ", skip"), a++)
        }
        return n
      }
    }, {
      key: "ft",
      value: function(t, e, n) {
        if (null == t || 0 == t.byteLength) return -1;
        var i = t.byteLength,
          r = i - e;
        if (r <= 8) return R("RcspParser: findValidRcspHeadIndex : data is not enough. put data in cache."), this.wt(t, e, r), -1;
        for (var s = -1, a = e; a < i; a++)
          if (t[a] == A.RCSP_HEAD[0]) {
            if ((r = i - a) <= 8) {
              this.wt(t, a, r);
              break
            }
            for (var u = !0, o = 0; o < A.RCSP_HEAD.length; o++) t[o + a] != A.RCSP_HEAD[o] && (u = !1);
            if (u) {
              var l = a + A.RCSP_HEAD.length,
                c = (255 & t[l + 2]) << 8 | 255 & t[l + 3];
              if (c < 1 || c > n - 8) R("RcspParser: findPacketData :: data length[" + c + "] over MAX_RECEIVE_MTU[" + n + "], cast away"), a = l - 1;
              else {
                if (r < c + 8) {
                  this.wt(t, a, r);
                  break
                }
                if (t[l + 4 + c] == A.RCSP_END) {
                  s = a;
                  break
                }
                a = l - 1
              }
            }
          } return s
      }
    }, {
      key: "dt",
      value: function(t) {
        if (null == t) return new Uint8Array(0);
        var e, n = t.byteLength;
        if (this.ct > 0) e = new Uint8Array(this.ct + n), this.ht && e.set(this.ht), e.set(t, this.ct), this.ct = 0;
        else {
          e = new Uint8Array(n);
          for (var i = 0; i < t.length; i++) e[i] = t[i]
        }
        return e
      }
    }, {
      key: "wt",
      value: function(t, e, n) {
        if (null != t && t.byteLength > 0 && e >= 0 && n > 0 && e + n <= t.byteLength) {
          var i = t.slice(e, e + n);
          this.ht = i, this.ct = n
        }
      }
    }])
  }(),
  b = a((function t() {
    u(this, t)
  })),
  L = a((function t() {
    u(this, t)
  }));
L.CMD_UNKNOWN = 0, L.CMD_DATA = 1, L.CMD_GET_TARGET_FEATURE_MAP = 2, L.CMD_GET_TARGET_INFO = 3, L.CMD_DISCONNECT_CLASSIC_BLUETOOTH = 6, L.CMD_GET_SYS_INFO = 7, L.CMD_SET_SYS_INFO = 8, L.CMD_SYS_INFO_AUTO_UPDATE = 9, L.CMD_SWITCH_DEVICE_REQUEST = 11, L.CMD_CUSTOM = 240, L.CMD_EXTRA_CUSTOM = 255, L.CMD_NOTIFY_DEVICE_APP_INFO = 208, L.CMD_SETTINGS_COMMUNICATION_MTU = 209, L.CMD_GET_DEV_MD5 = 212;
var F = function() {
    return a((function t() {
      u(this, t), this.ot = new Map, this.ot.set(L.CMD_DATA, new x), this.ot.set(L.CMD_SYS_INFO_AUTO_UPDATE, new V), this.ot.set(L.CMD_SETTINGS_COMMUNICATION_MTU, new G), this.ot.set(L.CMD_CUSTOM, new B), this.ot.set(L.CMD_EXTRA_CUSTOM, new H)
    }), [{
      key: "lt",
      value: function() {
        return this.ot
      }
    }])
  }(),
  x = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new Q(new W)
      }
    }])
  }(),
  V = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new Y(new X)
      }
    }])
  }(),
  G = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new j(new Z)
      }
    }])
  }(),
  B = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new nt(new S)
      }
    }])
  }(),
  H = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new et(new S)
      }
    }])
  }(),
  Q = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [L.CMD_DATA, t, null])
    }
    return s(e, D), a(e)
  }(),
  W = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, S), a(e, [{
      key: "v",
      value: function() {
        var t, n = 0,
          s = i(r(e.prototype), "v", this).call(this),
          a = null === (t = this.payload) || void 0 === t ? void 0 : t.byteLength;
        null == a && (a = 0);
        var u = new Uint8Array(s.byteLength + 1 + a);
        return u.set(s, n), n += s.length, null != this.responseOpCode && (u[n] = this.responseOpCode, n += 1), a > 0 && (u.set(this.payload, n), n += this.payload.length), u
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        if (t.length < n + 1) return O.ERROR_DATA_FORMAT;
        if (this.responseOpCode = 255 & t[n], n++, t.length > n) {
          var s = new Uint8Array(t.length - n);
          s.set(t.slice(n)), n += s.length, this.payload = s
        }
        return n
      }
    }])
  }(),
  Y = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [L.CMD_SYS_INFO_AUTO_UPDATE, t, null])
    }
    return s(e, D), a(e)
  }(),
  q = function() {
    return a((function t() {
      u(this, t)
    }), [{
      key: "getLen",
      value: function() {
        var t = 0;
        return null != this.value && null != this.value && (t = this.value.byteLength + 1), t
      }
    }, {
      key: "v",
      value: function() {
        var t, e = (null === (t = this.value) || void 0 === t ? void 0 : t.length) || 0,
          n = new Uint8Array(e + 2);
        return n[0] = this.getLen(), n[1] = null == this.type ? 0 : this.type, e > 0 && n.set(this.value, 2), n
      }
    }, {
      key: "l",
      value: function(t) {
        if (null == t || t.length < 2) return O.ERROR_INVALID_PARAM;
        var e = 0,
          n = 255 & t[e];
        if (e++, n < 1 || n > t.length - e) return O.ERROR_DATA_FORMAT;
        if (this.type = 255 & t[e], e++, n - 1 > 0) {
          var i = new Uint8Array(n - 1);
          i.set(t.slice(e, e + n - 1)), e += i.length, this.value = i
        }
        return e
      }
    }])
  }(),
  X = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, S), a(e, [{
      key: "v",
      value: function() {
        var t = 0,
          n = i(r(e.prototype), "v", this).call(this),
          s = new Uint8Array(n.byteLength + 1);
        return s.set(n), t += n.length, s[t] = null == this.function ? 0 : this.function, t++, null != this.dataList && this.dataList.forEach((function(e) {
          var n = e.v(),
            i = s,
            r = new Uint8Array(i.byteLength + n.byteLength);
          r.set(i, 0), r.set(n, i.byteLength), t += n.length, s = r
        })), s
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        if (t.length < n + 1) return O.ERROR_DATA_FORMAT;
        this.function = 255 & t[n], n++;
        var s = t.length - n;
        if (s > 0) {
          var a = new Uint8Array(s);
          a.set(t.slice(n)), n += a.length;
          for (var u = 0, o = new Array; u + 2 <= a.length;) {
            var l = new Uint8Array(a.length - u);
            l.set(a.slice(u, u + l.length));
            var c = new q,
              h = c.l(l);
            if (h <= 0) break;
            o.push(c), u += h
          }
          this.dataList = o
        }
        return n
      }
    }])
  }(),
  K = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, k), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        if (t.length < n + 1) return O.ERROR_DATA_FORMAT;
        this.function = 255 & t[n], n++;
        var s = t.length - n;
        if (s > 0) {
          var a = new Uint8Array(s);
          a.set(t.slice(n)), n += a.length;
          var u = 0;
          for (this.dataList = new Array; u + 2 <= a.length;) {
            var o = new Uint8Array(a.length - u);
            o.set(a.slice(u, u + o.length));
            var l = new q,
              c = l.l(o);
            if (c <= 0) break;
            this.dataList.push(l), u += c
          }
        }
        return n
      }
    }])
  }(),
  z = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [L.CMD_GET_TARGET_INFO, t, new $])
    }
    return s(e, D), a(e)
  }();
z.FLAG_MANDATORY_UPGRADE = 1;
var J = function(t) {
    function e(t, n) {
      var i;
      return u(this, e), (i = o(this, e)).mask = t, i.platform = n, i
    }
    return s(e, S), a(e, [{
      key: "v",
      value: function() {
        var t = i(r(e.prototype), "v", this).call(this),
          n = new Uint8Array(t.length + 5),
          s = 0;
        return n.set(t, 0), n[s += t.length] = this.mask >> 24, n[s + 1] = this.mask >> 16 & 255, n[s + 2] = this.mask >> 8 & 255, n[s + 3] = 255 & this.mask, n[s + 4] = this.platform, n
      }
    }])
  }(),
  $ = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).versionCode = 0, t.sendMtu = C.DEFAULT_PROTOCOL_MTU, t.receiveMtu = C.DEFAULT_PROTOCOL_MTU, t.edrStatus = 0, t.edrProfile = 0, t.platform = -1, t.volume = 0, t.maxVol = 0, t.quantity = 0, t.functionMask = 0, t.curFunction = 0, t.btEnable = !1, t.devMusicEnable = !1, t.rtcEnable = !1, t.lineInEanble = !1, t.fmEnable = !1, t.lightEnable = !1, t.fmTXEnable = !1, t.eqEnable = !1, t.supportOfflineShow = !1, t.supportUsb = !0, t.supportSd0 = !0, t.supportSd1 = !0, t.hideNetRadio = !1, t.sdkType = 0, t.pid = 0, t.vid = 0, t.uid = 0, t.mandatoryUpgradeFlag = 0, t.requestOtaFlag = 0, t.ubootVersionCode = 0, t.isSupportDoubleBackup = !1, t.isNeedBootLoader = !1, t.singleBackupOtaWay = 0, t.expandMode = 0, t.allowConnectFlag = 0, t.bleOnly = !1, t.emitterSupport = !1, t.emitterStatus = 0, t.isSupportMD5 = !1, t.isGameMode = !1, t.isSupportSearchDevice = !1, t.supportVolumeSync = !1, t.supportSoundCard = !1, t.supportExternalFlashTransfer = !1, t.supportAnc = !1, t.banEq = !1, t.supportPackageCrc16 = !1, t.getFileByNameWithDev = !1, t.contactsTransferBySmallFile = !1, t.watchSettingMask = 0, t
    }
    return s(e, k), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n <= O.ERROR_NONE) return n;
        if (t.length < n + 2) return O.ERROR_INVALID_PARAM;
        var s = new Uint8Array(t.length - 2);
        s.set(t.slice(2));
        var a = 0,
          u = s.length;
        do {
          var o = 255 & s[a];
          if (a++, o <= 0 || o > u - a) return R("ResponseTargetInfo: parseData : data len over limit. It is a abnormal data."), O.ERROR_DATA_FORMAT;
          var l = 255 & s[a];
          a++;
          var c = new Uint8Array(o - 1);
          0 != c.length ? (c.set(s.slice(a, a + c.length)), a += c.length, this.xt(l, c)) : R("ResponseTargetInfo: parseData : type = " + l + ", data is empty! Skip it.")
        } while (a + 2 <= u);
        return n + a
      }
    }, {
      key: "xt",
      value: function(t, e) {
        switch (R("fillTargetInfo: number:" + t + " value: " + p(e)), t) {
          case 16:
            this.name = String.fromCharCode.apply(null, Array.from(e));
            break;
          case 0:
            var n = e[0] >> 4 & 15,
              i = 15 & e[0];
            this.protocolVersion = "V" + n + "." + i;
            break;
          case 1:
            this.quantity = 255 & e[0], e.length > 2 && (this.volume = 255 & e[1], this.maxVol = 255 & e[2]), e.length > 3 && (this.supportVolumeSync = 1 == (1 & e[3]));
            break;
          case 10:
            e.length >= 6 ? (this.vid = (255 & e[0]) << 8 | e[1], this.pid = (255 & e[2]) << 8 | e[3], this.uid = (255 & e[4]) << 8 | e[5]) : 4 == e.length && (this.vid = 1494, this.uid = (255 & e[0]) << 8 | e[1], this.pid = (255 & e[2]) << 8 | e[3]);
            break;
          case 2:
            if (e.length >= 6) {
              var r = new Uint8Array(6);
              r.set(e.slice(0, r.length)), this.edrAddr = g(r)
            }
            e.length >= 8 && (this.edrProfile = 255 & e[6], this.edrStatus = 255 & e[7]);
            break;
          case 3:
            e.length > 1 && (this.platform = e[0], this.license = p(e.slice(1)));
            break;
          case 4:
            if (e.length >= 5 && (this.functionMask = e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3], this.btEnable = 1 == (1 & this.functionMask), this.devMusicEnable = 2 == (2 & this.functionMask), this.rtcEnable = 4 == (4 & this.functionMask), this.lineInEanble = 8 == (8 & this.functionMask), this.fmEnable = 16 == (16 & this.functionMask), this.lightEnable = 32 == (32 & this.functionMask), this.fmTXEnable = 64 == (64 & this.functionMask), this.eqEnable = 128 == (128 & this.functionMask), this.curFunction = e[4], e.length > 5)) {
              var s = e[5];
              this.supportOfflineShow = 1 == (1 & s), this.supportUsb = 2 == (2 & s), this.supportSd0 = 4 == (4 & s), this.supportSd1 = 8 == (8 & s), this.hideNetRadio = 16 == (16 & s)
            }
            break;
          case 5:
            if (e.length >= 2) {
              var a = (255 & e[0]) << 8 | e[1],
                u = "V_" + (a >> 12 & 15) + "." + (a >> 8 & 15) + "." + (a >> 4 & 15) + "." + (15 & a);
              this.versionCode = a, this.versionName = u
            }
            break;
          case 6:
            this.sdkType = e[0], this.supportVolumeSync || (this.supportVolumeSync = 2 == this.sdkType || 4 == this.sdkType);
            break;
          case 9:
            this.mandatoryUpgradeFlag = e[0], e.length >= 2 && (this.requestOtaFlag = e[1]), e.length >= 3 && (this.expandMode = e[2]);
            break;
          case 7:
            if (2 == e.length) {
              var o = (255 & e[0]) << 8 | e[1],
                l = "V_" + (o >> 12 & 15) + "." + (o >> 8 & 15) + "." + (o >> 4 & 15) + "." + (15 & o);
              this.ubootVersionCode = o, this.ubootVersionName = l
            }
            break;
          case 8:
            this.isSupportDoubleBackup = 1 == (255 & e[0]), e.length >= 2 && (this.isNeedBootLoader = 1 == (255 & e[1])), e.length >= 3 && (this.singleBackupOtaWay = e[2]);
            break;
          case 11:
            this.authKey = String.fromCharCode.apply(null, Array.from(e));
            break;
          case 12:
            this.projectCode = String.fromCharCode.apply(null, Array.from(e));
            break;
          case 13:
            e.length >= 4 ? (this.sendMtu = (255 & e[0]) << 8 | e[1], this.receiveMtu = (255 & e[2]) << 8 | e[3]) : 2 == e.length && (this.sendMtu = (255 & e[0]) << 8 | e[1], this.receiveMtu = this.sendMtu);
            break;
          case 14:
            this.allowConnectFlag = e[0];
            break;
          case 31:
            this.customVersionMsg = p(e);
            break;
          case 17:
            if (this.bleOnly = 1 == e[0], e.length > 6) {
              var c = new Uint8Array(6);
              c.set(e.slice(1, 1 + c.length)), this.bleAddr = g(c)
            }
            break;
          case 18:
            this.emitterStatus = e[0] >> 4 & 15, this.emitterSupport = 1 == (15 & e[0]);
            break;
          case 19:
            var h = e[0];
            this.isSupportMD5 = 1 == (1 & h), this.isGameMode = 1 == (h >> 1 & 1), this.isSupportSearchDevice = 1 == (h >> 2 & 1), this.supportSoundCard = 1 == (h >> 3 & 1), this.banEq = 1 == (h >> 4 & 1), this.supportExternalFlashTransfer = 1 == (h >> 5 & 1), this.supportAnc = 1 == (h >> 6 & 1);
            break;
          case 20:
            break;
          case 21:
            e.length >= 4 && (this.supportPackageCrc16 = 1 == (1 & e[0]), this.getFileByNameWithDev = 2 == (2 & e[0]), this.contactsTransferBySmallFile = 4 == (4 & e[0]))
        }
      }
    }])
  }(),
  j = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [L.CMD_SETTINGS_COMMUNICATION_MTU, t, new tt])
    }
    return s(e, D), a(e)
  }(),
  Z = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).protocolMtu = 0, t
    }
    return s(e, S), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        return n < O.ERROR_NONE ? n : t.length < n + 2 ? O.ERROR_DATA_FORMAT : (this.protocolMtu = (255 & t[1]) << 8 | t[0], n += 2)
      }
    }, {
      key: "v",
      value: function() {
        return i(r(e.prototype), "v", this).call(this)
      }
    }])
  }(),
  tt = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).realProtocolMtu = 0, t
    }
    return s(e, k), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        return n < O.ERROR_NONE ? n : t.length < n + 2 ? O.ERROR_DATA_FORMAT : (this.realProtocolMtu = (255 & t[1]) << 8 | t[0], n += 2)
      }
    }, {
      key: "v",
      value: function() {
        return i(r(e.prototype), "v", this).call(this)
      }
    }])
  }(),
  et = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [L.CMD_EXTRA_CUSTOM, t, new k])
    }
    return s(e, D), a(e)
  }(),
  nt = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [L.CMD_CUSTOM, t, new k])
    }
    return s(e, D), a(e)
  }(),
  it = a((function t() {
    u(this, t)
  }));
it.CMD_OTA_GET_DEVICE_UPDATE_FILE_INFO_OFFSET = 225, it.CMD_OTA_INQUIRE_DEVICE_IF_CAN_UPDATE = 226, it.CMD_OTA_ENTER_UPDATE_MODE = 227, it.CMD_OTA_EXIT_UPDATE_MODE = 228, it.CMD_OTA_SEND_FIRMWARE_UPDATE_BLOCK = 229, it.CMD_OTA_GET_DEVICE_REFRESH_FIRMWARE_STATUS = 230, it.CMD_REBOOT_DEVICE = 231, it.CMD_OTA_NOTIFY_UPDATE_CONTENT_SIZE = 232;
var rt = function() {
    return a((function t() {
      u(this, t), this.cmdParserMap = new Map, this.cmdParserMap.set(it.CMD_OTA_EXIT_UPDATE_MODE, new st), this.cmdParserMap.set(it.CMD_OTA_SEND_FIRMWARE_UPDATE_BLOCK, new at), this.cmdParserMap.set(it.CMD_OTA_NOTIFY_UPDATE_CONTENT_SIZE, new ut)
    }), [{
      key: "lt",
      value: function() {
        return this.cmdParserMap
      }
    }])
  }(),
  st = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new lt
      }
    }])
  }(),
  at = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new Rt(new vt)
      }
    }])
  }(),
  ut = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new ct(new ht)
      }
    }])
  }(),
  ot = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).result = m.RESULT_OK, t
    }
    return s(e, k), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        var s = t.length - n,
          a = new Uint8Array(s);
        return a.set(t.slice(n, n + a.length)), n += a.length, this.result = a[0], n
      }
    }, {
      key: "v",
      value: function() {
        var t = 0,
          n = i(r(e.prototype), "v", this).call(this),
          s = new Uint8Array(n.byteLength + 1);
        return s.set(n, t), s[t += n.length] = this.result, t += 1, s
      }
    }])
  }(),
  lt = function(t) {
    function e() {
      return u(this, e), o(this, e, [it.CMD_OTA_EXIT_UPDATE_MODE, new S, new m])
    }
    return s(e, D), a(e)
  }(),
  ct = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [it.CMD_OTA_NOTIFY_UPDATE_CONTENT_SIZE, t, new k])
    }
    return s(e, D), a(e)
  }(),
  ht = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).totalSize = 0, t.currentSize = 0, t
    }
    return s(e, S), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        return n < O.ERROR_NONE ? n : t.length < n + 4 ? O.ERROR_DATA_FORMAT : (this.totalSize = t[n + 0] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3], n += 4, t.length >= n + 4 && (this.currentSize = t[n + 0] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3], n += 4), n)
      }
    }, {
      key: "v",
      value: function() {
        var t, n = i(r(e.prototype), "v", this).call(this);
        t = this.currentSize > 0 ? n.length + 8 : n.length + 4;
        var s = new Uint8Array(t),
          a = 0;
        return s.set(n, a), s[a += n.length] = this.totalSize >> 24, s[a + 1] = this.totalSize >> 16 & 255, s[a + 2] = this.totalSize >> 8 & 255, s[a + 3] = 255 & this.totalSize, a += 4, this.currentSize > 0 && (s[a] = this.totalSize >> 24, s[a + 1] = this.totalSize >> 16 & 255, s[a + 2] = this.totalSize >> 8 & 255, s[a + 3] = 255 & this.totalSize, a += 4), s
      }
    }])
  }(),
  ft = function(t) {
    function e() {
      return u(this, e), o(this, e, [it.CMD_OTA_GET_DEVICE_REFRESH_FIRMWARE_STATUS, new S, new m])
    }
    return s(e, D), a(e)
  }();
ft.UPGRADE_RESULT_COMPLETE = 0, ft.UPGRADE_RESULT_DATA_CHECK_ERROR = 1, ft.UPGRADE_RESULT_FAIL = 2, ft.UPGRADE_RESULT_ENCRYPTED_KEY_NOT_MATCH = 3, ft.UPGRADE_RESULT_UPGRADE_FILE_ERROR = 4, ft.UPGRADE_RESULT_UPGRADE_TYPE_ERROR = 5, ft.UPGRADE_RESULT_ERROR_LENGTH = 6, ft.UPGRADE_RESULT_FLASH_READ = 7, ft.UPGRADE_RESULT_CMD_TIMEOUT = 8, ft.UPGRADE_RESULT_DOWNLOAD_BOOT_LOADER_SUCCESS = 128;
var Rt = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [it.CMD_OTA_SEND_FIRMWARE_UPDATE_BLOCK, t, new Et])
    }
    return s(e, D), a(e)
  }(),
  vt = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).offset = 0, t.len = 0, t
    }
    return s(e, S), a(e, [{
      key: "v",
      value: function() {
        var t = i(r(e.prototype), "v", this).call(this),
          n = new Uint8Array(t.length + 6),
          s = 0;
        return n.set(t, s), n[s += t.length] = this.offset >> 24, n[s + 1] = this.offset >> 16 & 255, n[s + 2] = this.offset >> 8 & 255, n[s + 3] = 255 & this.offset, n[s += 4] = this.len >> 8 & 255, n[s + 1] = 255 & this.len, s += 2, n
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        return n < O.ERROR_NONE ? n : t.length < n + 4 + 2 ? O.ERROR_DATA_FORMAT : (this.offset = t[n + 0] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3], n += 4, this.len = t[n + 0] << 8 | t[n + 1], n += 2)
      }
    }])
  }(),
  Et = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, k), a(e, [{
      key: "v",
      value: function() {
        var t = i(r(e.prototype), "v", this).call(this);
        if (null != this.block && this.block.length > 0) {
          var n = new Uint8Array(t.length + this.block.length),
            s = 0;
          return n.set(t, s), s += t.length, n.set(this.block, s), s += this.block.length, n
        }
        return t
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        var s = t.length - n;
        if (0 == s) return this.block = new Uint8Array(1), this.block[0] = 0, n;
        var a = new Uint8Array(s);
        return a.set(t.slice(n, n + a.length)), n += a.length, this.block = a, n
      }
    }])
  }(),
  _t = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).offset = 0, t.len = 0, t
    }
    return s(e, k), a(e, [{
      key: "v",
      value: function() {
        var t = i(r(e.prototype), "v", this).call(this),
          n = new Uint8Array(t.length + 6),
          s = 0;
        return n.set(t, s), n[s += t.length] = this.offset >> 24, n[s + 1] = this.offset >> 16 & 255, n[s + 2] = this.offset >> 8 & 255, n[s + 3] = 255 & this.offset, n[s += 4] = this.len >> 8 & 255, n[s + 1] = 255 & this.len, s += 2, n
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        return n < O.ERROR_NONE ? n : t.length < n + 4 + 2 ? O.ERROR_DATA_FORMAT : (this.offset = t[n + 0] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3], n += 4, this.len = t[n + 0] << 8 | t[n + 1], n += 2)
      }
    }])
  }(),
  pt = function(t) {
    function e(t) {
      var n;
      return u(this, e), (n = o(this, e)).op = t, n
    }
    return s(e, S), a(e, [{
      key: "v",
      value: function() {
        var t = i(r(e.prototype), "v", this).call(this),
          n = new Uint8Array(t.length + 1),
          s = 0;
        return n.set(t, s), n[s += t.length] = 255 & this.op, s += 1, n
      }
    }])
  }();
pt.OP_REBOOT = 0, pt.OP_CLOSE = 1;
var gt = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [it.CMD_OTA_INQUIRE_DEVICE_IF_CAN_UPDATE, t, new m])
  }
  return s(e, D), a(e)
}();
gt.RESULT_CAN_UPDATE = 0, gt.RESULT_DEVICE_LOW_VOLTAGE_EQUIPMENT = 1, gt.RESULT_FIRMWARE_INFO_ERROR = 2, gt.RESULT_FIRMWARE_VERSION_NO_CHANGE = 3, gt.RESULT_TWS_NOT_CONNECT = 4, gt.RESULT_HEADSET_NOT_IN_CHARGING_BIN = 5;
var dt = a((function t() {
  u(this, t)
}));
dt.CMD_ADV_SETTINGS = 192, dt.CMD_ADV_GET_INFO = 193, dt.CMD_ADV_DEVICE_NOTIFY = 194, dt.CMD_ADV_NOTIFY_SETTINGS = 195, dt.CMD_ADV_DEV_REQUEST_OPERATION = 196;
var yt = function() {
    return a((function t() {
      u(this, t), this.ot = new Map, this.ot.set(dt.CMD_ADV_DEVICE_NOTIFY, new Ot), this.ot.set(dt.CMD_ADV_DEV_REQUEST_OPERATION, new Ct)
    }), [{
      key: "lt",
      value: function() {
        return this.ot
      }
    }])
  }(),
  Ct = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new It
      }
    }])
  }(),
  Ot = function(t) {
    function e() {
      return u(this, e), o(this, e, arguments)
    }
    return s(e, T), a(e, [{
      key: "i",
      value: function() {
        return new St
      }
    }])
  }(),
  Tt = function() {
    return a((function t() {
      u(this, t), this.keyNum = 0, this.action = 0, this.function = 0
    }), [{
      key: "v",
      value: function() {
        var t = new Uint8Array(3);
        return t[0] = 255 & this.keyNum, t[1] = 255 & this.action, t[2] = 255 & this.function, t
      }
    }])
  }(),
  At = function() {
    return a((function t() {
      u(this, t), this.scene = 0, this.effect = 0
    }), [{
      key: "v",
      value: function() {
        var t = new Uint8Array(2);
        return t[0] = 255 & this.scene, t[1] = 255 & this.effect, t
      }
    }])
  }(),
  Dt = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).pid = 0, t.vid = 0, t.uid = 0, t.leftDeviceQuantity = 0, t.isLeftCharging = !1, t.rightDeviceQuantity = 0, t.isRightCharging = !1, t.chargingBinQuantity = 0, t.isDeviceCharging = !1, t.micChannel = 0, t.workModel = 0, t.inEarSettings = 0, t
    }
    return s(e, k), a(e, [{
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        var s = t;
        if (null != s && s.length > 0)
          for (var a = n, u = s.length; a + 2 <= u;) {
            var o = s[a];
            if (!(o > 0)) return _("parseADVInfo :: data length" + o + " over MAX_COMMUNICATION_MTU, cast away"), O.ERROR_DATA_FORMAT;
            var l = s[a + 1],
              c = new Uint8Array(o - 1);
            if (!(c.length > 0 && c.length + a + 2 <= u)) {
              if (0 == c.length) {
                a += 2;
                continue
              }
              return O.ERROR_DATA_FORMAT
            }
            switch (a += 2 + (c = s.slice(a + 2, a + 2 + c.length)).length, l) {
              case 0:
                var h = c[0] >> 7 & 1,
                  f = 127 & c[0];
                if (this.isLeftCharging = 1 == h, this.leftDeviceQuantity = f, c.length >= 2) {
                  var R = c[1] >> 7 & 1,
                    v = 127 & c[1];
                  if (this.isRightCharging = 1 == R, this.rightDeviceQuantity = v, c.length >= 3) {
                    var p = c[2] >> 7 & 1,
                      g = 127 & c[2];
                    this.isDeviceCharging = 1 == p, this.chargingBinQuantity = g
                  }
                }
                continue;
              case 1:
                this.deviceName = d(c);
                continue;
              case 2:
                var y = void 0;
                if (null != c && c.length >= 3)
                  for (var C = 0, T = new Uint8Array(3); C < c.length && C + 3 <= c.length;) {
                    C += (T = c.slice(C, C + 3)).length;
                    var A = new Tt;
                    A.keyNum = T[0], A.action = T[1], A.function = T[2], null == y && (y = new Array), y.push(A)
                  }
                this.keySettingsList = y;
                continue;
              case 3:
                var D = void 0;
                if (null != c && c.length >= 2)
                  for (var S = 0; S < c.length;) {
                    var k = c.slice(S, S + 2);
                    S += 2;
                    var m = new At;
                    m.scene = k[0], m.effect = k[1], null == D && (D = new Array), D.push(m)
                  }
                this.ledSettingsList = D;
                continue;
              case 4:
                this.micChannel = c[0];
                continue;
              case 5:
                this.workModel = c[0];
                continue;
              case 6:
                c.length >= 6 && (this.vid = ((255 & c[0]) << 8) + (255 & c[1]), this.uid = ((255 & c[2]) << 8) + (255 & c[3]), this.pid = ((255 & c[4]) << 8) + (255 & c[5]));
                continue;
              case 8:
                this.inEarSettings = c[0];
                continue;
              case 9:
                this.language = d(c);
                continue;
              case 10:
                if (c.length >= 4) {
                  for (var N = (255 & c[0]) << 24 | (255 & c[1]) << 16 | (255 & c[2]) << 8 | 255 & c[3], I = new Array, M = 0; M < 32; M++) 1 == (N >> M & 1) && I.push(M);
                  if (0 != I.length) {
                    for (var U = new Uint8Array(I.length), P = 0; P < I.length; P++) {
                      var w = I[P];
                      null != w && (U[P] = w)
                    }
                    this.modes = U
                  }
                }
                continue;
              default:
                E("-parseADVInfo- unknown type = " + l)
            }
          }
        return n = t.length
      }
    }])
  }(),
  St = function(t) {
    function e() {
      return u(this, e), o(this, e, [dt.CMD_ADV_DEVICE_NOTIFY, new kt, null])
    }
    return s(e, D), a(e)
  }(),
  kt = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).vid = 0, t.pid = 0, t.uid = 0, t.deviceType = 0, t.version = 0, t.showDialog = !1, t.edrAddr = "", t.seq = 0, t.action = 0, t.leftDeviceQuantity = 0, t.leftCharging = !1, t.rightDeviceQuantity = 0, t.rightCharging = !1, t.chargingBinQuantity = 0, t.deviceCharging = !1, t
    }
    return s(e, S), a(e, [{
      key: "getVid",
      value: function() {
        return this.vid
      }
    }, {
      key: "setVid",
      value: function(t) {
        return this.vid = t, this
      }
    }, {
      key: "getPid",
      value: function() {
        return this.pid
      }
    }, {
      key: "setPid",
      value: function(t) {
        return this.pid = t, this
      }
    }, {
      key: "getUid",
      value: function() {
        return this.uid
      }
    }, {
      key: "setUid",
      value: function(t) {
        return this.uid = t, this
      }
    }, {
      key: "getDeviceType",
      value: function() {
        return this.deviceType
      }
    }, {
      key: "setDeviceType",
      value: function(t) {
        return this.deviceType = t, this
      }
    }, {
      key: "getVersion",
      value: function() {
        return this.version
      }
    }, {
      key: "setVersion",
      value: function(t) {
        return this.version = t, this
      }
    }, {
      key: "isShowDialog",
      value: function() {
        return this.showDialog
      }
    }, {
      key: "setShowDialog",
      value: function(t) {
        return this.showDialog = t, this
      }
    }, {
      key: "getEdrAddr",
      value: function() {
        return this.edrAddr
      }
    }, {
      key: "setEdrAddr",
      value: function(t) {
        return this.edrAddr = t, this
      }
    }, {
      key: "getSeq",
      value: function() {
        return this.seq
      }
    }, {
      key: "setSeq",
      value: function(t) {
        return this.seq = t, this
      }
    }, {
      key: "getAction",
      value: function() {
        return this.action
      }
    }, {
      key: "setAction",
      value: function(t) {
        return this.action = t, this
      }
    }, {
      key: "getLeftDeviceQuantity",
      value: function() {
        return this.leftDeviceQuantity
      }
    }, {
      key: "setLeftDeviceQuantity",
      value: function(t) {
        return this.leftDeviceQuantity = t, this
      }
    }, {
      key: "isLeftCharging",
      value: function() {
        return this.leftCharging
      }
    }, {
      key: "setLeftCharging",
      value: function(t) {
        return this.leftCharging = t, this
      }
    }, {
      key: "getRightDeviceQuantity",
      value: function() {
        return this.rightDeviceQuantity
      }
    }, {
      key: "setRightDeviceQuantity",
      value: function(t) {
        return this.rightDeviceQuantity = t, this
      }
    }, {
      key: "isRightCharging",
      value: function() {
        return this.rightCharging
      }
    }, {
      key: "setRightCharging",
      value: function(t) {
        return this.rightCharging = t, this
      }
    }, {
      key: "getChargingBinQuantity",
      value: function() {
        return this.chargingBinQuantity
      }
    }, {
      key: "setChargingBinQuantity",
      value: function(t) {
        return this.chargingBinQuantity = t, this
      }
    }, {
      key: "isDeviceCharging",
      value: function() {
        return this.deviceCharging
      }
    }, {
      key: "setDeviceCharging",
      value: function(t) {
        return this.deviceCharging = t, this
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        if (n < O.ERROR_NONE) return n;
        if (t.length < n + 18) return O.ERROR_DATA_FORMAT;
        var s = new Uint8Array(18);
        return s.set(t.slice(n, n + 18)), n += 18, this.Dt(s), n
      }
    }, {
      key: "Dt",
      value: function(t) {
        this.setVid((t[0] << 8) + t[1]).setUid((t[2] << 8) + t[3]).setPid((t[4] << 8) + t[5]), this.setDeviceType(t[6] >> 4 & 255).setVersion(15 & t[6]);
        var e = new Uint8Array(6);
        e.set(t.slice(7, 7 + e.length)), this.setEdrAddr(g(e)).setAction(t[13]), this.setLeftCharging(1 == (t[14] >> 7 & 1)).setLeftDeviceQuantity(127 & t[14]), this.setRightCharging(1 == (t[15] >> 7 & 1)).setRightDeviceQuantity(127 & t[15]), this.setDeviceCharging(1 == (t[16] >> 7 & 1)).setChargingBinQuantity(127 & t[16]), this.setSeq(t[17])
      }
    }])
  }(),
  mt = function(t) {
    function e(t) {
      var n;
      return u(this, e), (n = o(this, e)).op = -1, null != t && (n.op = t), n
    }
    return s(e, S), a(e, [{
      key: "v",
      value: function() {
        var t = i(r(e.prototype), "v", this).call(this),
          n = new Uint8Array(t.length + 1),
          s = 0;
        return n.set(t, s), n[s += t.length] = this.op, n
      }
    }, {
      key: "l",
      value: function(t) {
        var n = i(r(e.prototype), "l", this).call(this, t);
        return n < O.ERROR_NONE ? n : t.length < n + 1 ? O.ERROR_DATA_FORMAT : (this.op = 255 & t[n], ++n)
      }
    }])
  }(),
  Nt = function(t) {
    function e(t) {
      return u(this, e), o(this, e, [dt.CMD_ADV_NOTIFY_SETTINGS, new mt(t), new m])
    }
    return s(e, D), a(e)
  }();
Nt.CTRL_OP_CLOSE = 0, Nt.CTRL_OP_OPEN = 1;
var It = function(t) {
  function e() {
    return u(this, e), o(this, e, [dt.CMD_ADV_DEV_REQUEST_OPERATION, new mt, new k])
  }
  return s(e, D), a(e)
}();
It.REQUEST_OP_SYNC_SETTINGS = 0, It.REQUEST_OP_UPDATE_SETTINGS_AND_REBOOT = 1, It.REQUEST_OP_SYNC_CONNECTION_TIME = 2, It.REQUEST_OP_RECONNECT_DEVICE = 3, It.REQUEST_OP_SYNC_DEVICE_INFO = 4;
var Mt = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).deviceInfoMap = new Map, t
    }
    return s(e, b), a(e, [{
      key: "release",
      value: function() {
        this.deviceInfoMap.clear()
      }
    }, {
      key: "getReceiveMtu",
      value: function(t) {
        var e = this.getDeviceInfo(t);
        return null != e && e.receiveMtu > 0 ? e.receiveMtu : null
      }
    }, {
      key: "getSendMtu",
      value: function(t) {
        var e = this.getDeviceInfo(t);
        return null != e && e.sendMtu > 0 ? e.sendMtu : null
      }
    }, {
      key: "getDeviceInfo",
      value: function(t) {
        return this.deviceInfoMap.get(t.deviceId)
      }
    }, {
      key: "removeDeviceInfo",
      value: function(t) {
        if (0 != this.deviceInfoMap.size) return this.deviceInfoMap.delete(t.deviceId)
      }
    }, {
      key: "updateDeviceInfo",
      value: function(t, e) {
        this.deviceInfoMap.set(t.deviceId, e)
      }
    }])
  }(),
  Ut = function() {
    return a((function t() {
      u(this, t)
    }), [{
      key: "onRcspInit",
      value: function(t, e) {}
    }, {
      key: "onRcspCommand",
      value: function(t, e) {}
    }, {
      key: "onRcspResponse",
      value: function(t, e) {}
    }, {
      key: "onRcspDataCmd",
      value: function(t, e) {}
    }, {
      key: "onRcspError",
      value: function(t, e, n) {}
    }, {
      key: "onMandatoryUpgrade",
      value: function(t) {}
    }, {
      key: "onConnectStateChange",
      value: function(t, e) {}
    }])
  }(),
  Pt = function() {
    return a((function t() {
      u(this, t), this.cmdSn = 0, this.cmdSnMap = new Map, this.cmdSn = parseInt(256 * Math.random() + "")
    }), [{
      key: "getRcspCmdSeq",
      value: function(t) {
        return this.autoIncSN(t)
      }
    }, {
      key: "autoIncSN",
      value: function(t) {
        var e = this.getCmdSn(t),
          n = (e + 1) % 256;
        return null == t ? this.cmdSn = n : this.cmdSnMap.set(t.deviceId, n), e
      }
    }, {
      key: "resetCmdSeq",
      value: function(t) {
        null == t ? this.cmdSn = 0 : this.cmdSnMap.delete(t.deviceId)
      }
    }, {
      key: "release",
      value: function() {
        this.cmdSn = 0, this.cmdSnMap.clear()
      }
    }, {
      key: "getCmdSn",
      value: function(t) {
        if (null == t) return this.cmdSn;
        var e = this.cmdSnMap.get(t.deviceId);
        return null == e ? this.cmdSn : e
      }
    }])
  }(),
  wt = function(t) {
    function e() {
      var t;
      return u(this, e), (t = o(this, e, arguments)).Ct = new Array, t
    }
    return s(e, Ut), a(e, [{
      key: "registerRcspCallback",
      value: function(t) {
        null != t && this.Ct.push(t)
      }
    }, {
      key: "unregisterRcspCallback",
      value: function(t) {
        if (null != t) {
          var e = this.Ct.indexOf(t); - 1 != e && this.Ct.splice(e, 1)
        }
      }
    }, {
      key: "release",
      value: function() {
        this.Ct.length = 0
      }
    }, {
      key: "onRcspInit",
      value: function(t, e) {
        this.yt({
          onCallback: function(n) {
            n.onRcspInit(t, e)
          }
        })
      }
    }, {
      key: "onRcspCommand",
      value: function(t, e) {
        this.yt({
          onCallback: function(n) {
            n.onRcspCommand(t, e)
          }
        })
      }
    }, {
      key: "onRcspResponse",
      value: function(t, e) {
        this.yt({
          onCallback: function(n) {
            n.onRcspResponse(t, e)
          }
        })
      }
    }, {
      key: "onRcspDataCmd",
      value: function(t, e) {
        this.yt({
          onCallback: function(n) {
            n.onRcspDataCmd(t, e)
          }
        })
      }
    }, {
      key: "onRcspError",
      value: function(t, e, n) {
        this.yt({
          onCallback: function(i) {
            i.onRcspError(t, e, n)
          }
        })
      }
    }, {
      key: "onMandatoryUpgrade",
      value: function(t) {
        this.yt({
          onCallback: function(e) {
            e.onMandatoryUpgrade(t)
          }
        })
      }
    }, {
      key: "onConnectStateChange",
      value: function(t, e) {
        this.yt({
          onCallback: function(n) {
            n.onConnectStateChange(t, e)
          }
        })
      }
    }, {
      key: "yt",
      value: function(t) {
        0 != this.Ct.length && this.Ct.forEach((function(e) {
          t.onCallback(e)
        }))
      }
    }])
  }(),
  bt = function() {
    return a((function t() {
      var e = this;
      u(this, t), this.mTargetDevice = null, this.mCmdSnGenerator = new Pt, this.mRcspCallbackManager = new wt, this.mDeviceInfoManager = new Mt;
      var n = {
        onRcspCommand: function(t, n) {
          e.gt(t, n)
        },
        onRcspResponse: function(t, n) {
          e.At(t, n)
        },
        onError: function(t, n, i) {
          e.mRcspCallbackManager.onRcspError(t, n, i)
        }
      };
      this.mRCSPDataHandler = new P(this, this.mDeviceInfoManager, this.getNotifyCmdParser(), n)
    }), [{
      key: "getUsingDevice",
      value: function() {
        return this.mTargetDevice
      }
    }, {
      key: "setOnSendDataCallback",
      value: function(t) {
        this.mOnSendDataCallback = t
      }
    }, {
      key: "isDeviceConnected",
      value: function() {
        return null != this.getUsingDevice() && null != this.getDeviceInfo(this.getUsingDevice())
      }
    }, {
      key: "getDeviceInfo",
      value: function(t) {
        return this.mDeviceInfoManager.getDeviceInfo(t)
      }
    }, {
      key: "addOnRcspCallback",
      value: function(t) {
        this.mRcspCallbackManager.registerRcspCallback(t)
      }
    }, {
      key: "removeOnRcspCallback",
      value: function(t) {
        this.mRcspCallbackManager.unregisterRcspCallback(t)
      }
    }, {
      key: "transmitDeviceStatus",
      value: function(t, e) {
        this.mRcspCallbackManager.onConnectStateChange(t, e), this.vt(t, e)
      }
    }, {
      key: "transmitDeviceData",
      value: function(t, e) {
        this.Rt(t, e)
      }
    }, {
      key: "sendDataToDevice",
      value: function(t, e) {
        return null == this.mOnSendDataCallback ? (_("RcspImpl: OnSendDataCallback is null,so sendDataToDevice failed"), !1) : this.mOnSendDataCallback.sendDataToDevice(t, e)
      }
    }, {
      key: "sendRCSPCommand",
      value: function(t, e, n, i) {
        if (this.kt(t, i))
          if (null != e) {
            e.isCommand() && e.setSn(this.mCmdSnGenerator.getRcspCmdSeq(t));
            var r = new I(t, e, n, i);
            this.mRCSPDataHandler.W(r)
          } else {
            var s = O.ERROR_INVALID_PARAM;
            this.Ut(i, t, s, O.getErrorDesc2(s, "Command is null."))
          }
      }
    }, {
      key: "syncDeviceInfo",
      value: function(t, e, n) {
        var i = new z(e);
        this.bt(t, i, {
          onCmdResponse: function(t, e) {
            if (e.getStatus() == k.STATUS_SUCCESS) {
              var i = e.getResponse();
              if (null != i) R("RcspOpImpl: syncDeviceInfo : " + e), null != n && n.onResult(t, i);
              else {
                var r = O.ERROR_DATA_FORMAT;
                this.onError(t, r, O.getErrorDesc2(r, "Get targetInfo is null."))
              }
            } else {
              var s = O.ERROR_REPLY_BAD_STATUS;
              this.onError(t, s, O.getErrorDesc2(s, "" + e.getStatus()))
            }
          },
          onError: function(t, e, i) {
            null != n && n.onError(t, e, i)
          }
        })
      }
    }, {
      key: "destroy",
      value: function() {
        this.mCmdSnGenerator.release(), this.mRcspCallbackManager.release(), this.mTargetDevice = null, this.mRCSPDataHandler.destroy()
      }
    }, {
      key: "getDeviceInfoManager",
      value: function() {
        return this.mDeviceInfoManager
      }
    }, {
      key: "Ut",
      value: function(t, e, n, i) {
        null != t && t.onError(e, n, O.getErrorDesc2(n, i))
      }
    }, {
      key: "$",
      value: function(t, e, n) {
        var i = O.getErrorDesc2(e, n);
        _("RcspOpImpl: callbackError : device[" + t + "] has an exception: " + y(e) + ", " + i), this.mRCSPDataHandler.listener.onError(t, e, i)
      }
    }, {
      key: "bt",
      value: function(t, e, n) {
        this.sendRCSPCommand(t, e, C.DEFAULT_SEND_CMD_TIMEOUT, n)
      }
    }, {
      key: "vt",
      value: function(t, e) {
        if (null != e) switch (e) {
          case exports.Connection.CONNECTION_DISCONNECT:
            t.equals(this.mTargetDevice) && (this.mTargetDevice = null, this.getDeviceInfoManager().removeDeviceInfo(t), this.mRCSPDataHandler.J());
            break;
          case exports.Connection.CONNECTION_CONNECTED:
            if (null != this.mTargetDevice) {
              var n = "Device is Connected. device : " + t + ", connected Device : " + this.mTargetDevice;
              return R("RcspOpImpl: " + n), void this.$(t, O.ERROR_REPEAT_STATUS, n)
            }
            this.mTargetDevice = t, this.mRCSPDataHandler.L(), this.St(t)
        }
      }
    }, {
      key: "St",
      value: function(t) {
        var e = this.getDeviceInfo(t);
        if (R("RcspOpImpl: handleDeviceConnectedEvent : " + JSON.stringify(e)), null == e) {
          var n = new J(4294967295, 2),
            i = this;
          this.syncDeviceInfo(t, n, {
            onResult: function(t, e) {
              i.getDeviceInfoManager().updateDeviceInfo(t, e), R("RcspOpImpl: handleDeviceConnectedEvent : onResult ===> " + JSON.stringify(e)), i.St(t)
            },
            onError: function(t, e, n) {
              i.mRcspCallbackManager.onRcspInit(t, !1), _("RcspOpImpl:  Init RCSP protocol failed. so callback the device is disconnected.\ncode = " + e + ", " + n), i.vt(t, exports.Connection.CONNECTION_DISCONNECT)
            }
          })
        } else e.mandatoryUpgradeFlag ? (e.receiveMtu < C.DEFAULT_PROTOCOL_MTU && (e.receiveMtu = C.DEFAULT_PROTOCOL_MTU), this.getDeviceInfoManager().updateDeviceInfo(t, e), R("RcspOpImpl: handleDeviceConnectedEvent : device[" + JSON.stringify(t) + "] need update."), this.mRcspCallbackManager.onRcspInit(t, !0), this.mRcspCallbackManager.onMandatoryUpgrade(t)) : (R("RcspOpImpl: handleDeviceConnectedEvent : init success."), this.mRcspCallbackManager.onRcspInit(t, !0))
      }
    }, {
      key: "kt",
      value: function(t, e) {
        return !!t.equals(this.mTargetDevice) || (null != e ? this.Ut(e, t, O.ERROR_DEVICE_OFFLINE, "") : this.$(t, O.ERROR_DEVICE_OFFLINE, ""), !1)
      }
    }, {
      key: "Rt",
      value: function(t, e) {
        null != t && null != e && 0 != e.length && this.kt(t, null) && this.mRCSPDataHandler.K(new M(t, e))
      }
    }, {
      key: "gt",
      value: function(t, e) {
        if (this.kt(t, null))
          if (e.getOpCode() == L.CMD_DATA) this.mRcspCallbackManager.onRcspDataCmd(t, e);
          else switch (this.mRcspCallbackManager.onRcspCommand(t, e), e.getOpCode()) {
            case L.CMD_DATA:
              this.mRcspCallbackManager.onRcspDataCmd(t, e);
              break;
            case L.CMD_SETTINGS_COMMUNICATION_MTU:
              var n = e,
                i = n.getParam().protocolMtu,
                r = this.getDeviceInfo(t);
              if (null != r && (r.receiveMtu = i, this.getDeviceInfoManager().updateDeviceInfo(t, r)), n.isNeedResponse()) {
                var s = n.getResponse();
                null != s && (s.setSn(e.getSn()), s.setStatus(k.STATUS_SUCCESS), s.realProtocolMtu = i), n.setCommand(!1), this.bt(t, n, null)
              }
            case L.CMD_SYS_INFO_AUTO_UPDATE:
          }
      }
    }, {
      key: "At",
      value: function(t, e) {
        if (this.kt(t, null) && e.getStatus() == k.STATUS_SUCCESS && (this.mRcspCallbackManager.onRcspResponse(t, e), e.getOpCode() === L.CMD_SETTINGS_COMMUNICATION_MTU)) {
          var n = e.getResponse().realProtocolMtu,
            i = this.getDeviceInfo(t);
          null != i && (i.receiveMtu = n, this.getDeviceInfoManager().updateDeviceInfo(t, i))
        }
      }
    }])
  }(),
  Lt = function() {
    function t() {
      u(this, t)
    }
    return a(t, null, [{
      key: "getErrorDesc",
      value: function(e) {
        switch (e) {
          case t.ERR_NONE:
            return "Success";
          case t.ERR_INVALID_PARAMETER:
            return "Invalid Parameter.";
          case t.ERR_CANCEL_OP:
            return "Cancel Operation.";
          case t.ERR_OPERATION_TIMEOUT:
            return "Operation timeout.";
          case t.ERR_REMOTE_NOT_CONNECT:
            return "The remote device is not connected.";
          case t.ERR_DEVICE_NOT_MATCH:
            return "The device is not the same as the device in use.";
          case t.ERR_USE_SYSTEM_API:
            return "Failed to use system reflection function.";
          case t.ERR_AUTH_DEVICE:
            return "Failed to auth device.";
          case t.ERR_CMD_SEND:
            return "Command sending failed.";
          case t.ERR_PARSE_DATA:
            return "Failed to parse RCSP data.";
          case t.ERR_RESPONSE_TIMEOUT:
            return "Waiting for a reply packet timed out.";
          case t.ERR_SYSTEM_BUSY:
            return "System is busy.";
          case t.ERR_RESPONSE_BAD_STATUS:
            return "Device returns a failed state.";
          case t.ERR_RESPONSE_BAD_RESULT:
            return "Device returns a failure result.";
          case t.ERR_STORAGE_OFFLINE:
            return "Storage offline.";
          case t.ERR_FILE_BROWSING:
            return "File browsing.";
          case t.ERR_DATA_LOAD_COMPLETE:
            return "File data is loaded.";
          case t.ERR_MISSING_FILE_DATA:
            return "Missing file data.";
          case t.ERR_DIR_TOO_DEEP:
            return "Directory hierarchy is too deep.";
          case t.ERR_IO_EXCEPTION:
            return "IO Exception.";
          case t.ERR_FILE_NOT_IN_STORAGE:
            return "File does not match storage";
          default:
            return "Unknown Code : " + e
        }
      }
    }])
  }();
Lt.ERR_NONE = 0, Lt.ERR_INVALID_PARAMETER = 4097, Lt.ERR_CANCEL_OP = 4098, Lt.ERR_OPERATION_TIMEOUT = 4099, Lt.ERR_OTHER = 4100, Lt.ERR_REMOTE_NOT_CONNECT = 8192, Lt.ERR_DEVICE_NOT_MATCH = 8193, Lt.ERR_USE_SYSTEM_API = 8194, Lt.ERR_AUTH_DEVICE = 8195, Lt.ERR_CMD_SEND = 12288, Lt.ERR_PARSE_DATA = 12289, Lt.ERR_RESPONSE_TIMEOUT = 12290, Lt.ERR_SYSTEM_BUSY = 12291, Lt.ERR_RESPONSE_BAD_STATUS = 12292, Lt.ERR_RESPONSE_BAD_RESULT = 12293, Lt.ERR_STORAGE_OFFLINE = 16384, Lt.ERR_FILE_BROWSING = 16385, Lt.ERR_DATA_LOAD_COMPLETE = 16386, Lt.ERR_MISSING_FILE_DATA = 16387, Lt.ERR_DIR_TOO_DEEP = 16388, Lt.ERR_IO_EXCEPTION = 16389, Lt.ERR_FILE_NOT_IN_STORAGE = 16390, exports.CmdChangeCommunicationWay = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [L.CMD_SWITCH_DEVICE_REQUEST, t, new m])
  }
  return s(e, D), a(e)
}(), exports.CmdControlADVStream = Nt, exports.CmdCustom = et, exports.CmdData = Q, exports.CmdDeviceRequestOp = It, exports.CmdEnterUpdateMode = function(t) {
  function e() {
    return u(this, e), o(this, e, [it.CMD_OTA_ENTER_UPDATE_MODE, new S, new ot])
  }
  return s(e, D), a(e)
}(), exports.CmdExitUpdateMode = lt, exports.CmdGetADVInfo = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [dt.CMD_ADV_GET_INFO, t, new Dt])
  }
  return s(e, D), a(e)
}(), exports.CmdGetSysInfo = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [L.CMD_GET_SYS_INFO, t, new K])
  }
  return s(e, D), a(e)
}(), exports.CmdGetTargetInfo = z, exports.CmdInnerCustom = nt, exports.CmdNotifyADVInfo = St, exports.CmdNotifySysInfo = Y, exports.CmdNotifyUpdateFileSize = ct, exports.CmdOpCodeBase = L, exports.CmdOpCodeHeadSet = dt, exports.CmdOpCodeOta = it, exports.CmdQueryUpdateResult = ft, exports.CmdReadFileBlock = Rt, exports.CmdReadFileOffset = function(t) {
  function e() {
    return u(this, e), o(this, e, [it.CMD_OTA_GET_DEVICE_UPDATE_FILE_INFO_OFFSET, new S, new _t])
  }
  return s(e, D), a(e)
}(), exports.CmdRebootDevice = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [it.CMD_REBOOT_DEVICE, t, new m])
  }
  return s(e, D), a(e)
}(), exports.CmdRequestUpdate = gt, exports.CmdSetADVInfo = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [dt.CMD_ADV_SETTINGS, t, new m])
  }
  return s(e, D), a(e)
}(), exports.CmdSetMtu = j, exports.CmdSetSysInfo = function(t) {
  function e(t) {
    return u(this, e), o(this, e, [L.CMD_SET_SYS_INFO, t, new k])
  }
  return s(e, D), a(e)
}(), exports.Command = D, exports.CommandBase = function(t) {
  function e() {
    return u(this, e), o(this, e, arguments)
  }
  return s(e, D), a(e)
}(), exports.Device = function() {
  return a((function t(e, n) {
    u(this, t), this.deviceId = e, n && (this.name = n)
  }), [{
    key: "equals",
    value: function(t) {
      return null != t && (this == t || this.deviceId == t.deviceId)
    }
  }])
}(), exports.DeviceInfo = function(t) {
  function e() {
    return u(this, e), o(this, e, arguments)
  }
  return s(e, $), a(e)
}(), exports.DeviceInfoManager = Mt, exports.ErrorCode = O, exports.KeySettings = Tt, exports.LedSettings = At, exports.LtvBean = q, exports.OnRcspCallback = Ut, exports.ParamADVInfo = kt, exports.ParamBase = S, exports.ParamCommunicationWay = function(t) {
  function e(t, n) {
    var i;
    return u(this, e), (i = o(this, e)).isSupportNewRebootWay = !1, i.communicationWay = t, n && (i.isSupportNewRebootWay = n), i
  }
  return s(e, S), a(e, [{
    key: "v",
    value: function() {
      var t = i(r(e.prototype), "v", this).call(this),
        n = new Uint8Array(t.length + 2),
        s = 0;
      return n.set(t, s), n[s += t.length] = this.communicationWay, n[s + 1] = this.isSupportNewRebootWay ? 1 : 0, n
    }
  }])
}(), exports.ParamData = W, exports.ParamFileBlock = vt, exports.ParamGetADVInfo = function(t) {
  function e(t) {
    var n;
    return u(this, e), (n = o(this, e)).mask = t, n
  }
  return s(e, S), a(e, [{
    key: "v",
    value: function() {
      var t = i(r(e.prototype), "v", this).call(this),
        n = new Uint8Array(t.length + 4),
        s = 0;
      return n.set(t, s), n[s += t.length] = this.mask >> 24 & 255, n[s + 1] = this.mask >> 16 & 255, n[s + 2] = this.mask >> 8 & 255, n[s + 3] = 255 & this.mask, s += 4, n
    }
  }, {
    key: "l",
    value: function(t) {
      var n = i(r(e.prototype), "l", this).call(this, t);
      return n < O.ERROR_NONE ? n : t.length < n + 4 ? O.ERROR_DATA_FORMAT : (this.mask = t[n] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3], n += 4)
    }
  }])
}(), exports.ParamGetSysInfo = function(t) {
  function e() {
    var t;
    return u(this, e), (t = o(this, e, arguments)).function = 0, t.mask = 0, t
  }
  return s(e, S), a(e, [{
    key: "v",
    value: function() {
      var t = 0,
        n = i(r(e.prototype), "v", this).call(this),
        s = new Uint8Array(n.byteLength + 5);
      s.set(n), s[t += n.length] = null == this.function ? 0 : this.function, t++;
      var a = null == this.mask ? 0 : this.mask;
      return s[t] = a >> 24, s[t + 1] = a >> 16 & 255, s[t + 2] = a >> 8 & 255, s[t + 3] = 255 & a, s
    }
  }])
}(), exports.ParamMtu = Z, exports.ParamOperation = mt, exports.ParamRebootDevice = pt, exports.ParamRequestUpdate = function(t) {
  function e(t) {
    var n;
    return u(this, e), (n = o(this, e)).data = t, n
  }
  return s(e, S), a(e, [{
    key: "v",
    value: function() {
      var t = i(r(e.prototype), "v", this).call(this);
      if (null != this.data && this.data.length > 0) {
        var n = new Uint8Array(t.length + this.data.length),
          s = 0;
        return n.set(t, s), s += t.length, n.set(this.data, s), s += 1, n
      }
      return t
    }
  }])
}(), exports.ParamSetADVInfo = function(t) {
  function e(t) {
    var n;
    return u(this, e), (n = o(this, e)).payload = t, n
  }
  return s(e, S), a(e, [{
    key: "v",
    value: function() {
      var t = i(r(e.prototype), "v", this).call(this),
        n = new Uint8Array(t.length + this.payload.length),
        s = 0;
      return n.set(t, s), s += t.length, n.set(this.payload, s), n
    }
  }, {
    key: "l",
    value: function(t) {
      var n = i(r(e.prototype), "l", this).call(this, t);
      return n < O.ERROR_NONE ? n : t.length < n ? O.ERROR_DATA_FORMAT : (this.payload = t.slice(n), n = t.length)
    }
  }])
}(), exports.ParamSysInfo = X, exports.ParamTargetInfo = J, exports.ParamUpdateFileSize = ht, exports.RCSPError = a((function t(e, n) {
  u(this, t), this.errorCode = e, this.message = null == n ? Lt.getErrorDesc(e) : n
})), exports.RCSPErrorCode = Lt, exports.RcspCallbackManager = wt, exports.RcspConstant = C, exports.RcspImpl = function(e) {
  function n() {
    return u(this, n), o(this, n, arguments)
  }
  return s(n, bt), a(n, [{
    key: "getNotifyCmdParser",
    value: function() {
      var e, n = new Map,
        i = (new F).lt(),
        r = t(i);
      try {
        for (r.s(); !(e = r.n()).done;) {
          var s = e.value;
          n.set(s[0], s[1])
        }
      } catch (t) {
        r.e(t)
      } finally {
        r.f()
      }
      var a, u = (new rt).lt(),
        o = t(u);
      try {
        for (o.s(); !(a = o.n()).done;) {
          var l = a.value;
          n.set(l[0], l[1])
        }
      } catch (t) {
        o.e(t)
      } finally {
        o.f()
      }
      var c, h = (new yt).lt(),
        f = t(h);
      try {
        for (f.s(); !(c = f.n()).done;) {
          var R = c.value;
          n.set(R[0], R[1])
        }
      } catch (t) {
        f.e(t)
      } finally {
        f.f()
      }
      return n
    }
  }])
}(), exports.ResponseBase = k, exports.ResponseData = function(t) {
  function e() {
    return u(this, e), o(this, e, arguments)
  }
  return s(e, k), a(e, [{
    key: "v",
    value: function() {
      var t = 0,
        n = i(r(e.prototype), "v", this).call(this),
        s = new Uint8Array(n.byteLength + 1);
      return s.set(n, t), t += n.length, null != this.responseOpCode && (s[t] = this.responseOpCode, t += 1), s
    }
  }, {
    key: "l",
    value: function(t) {
      var n = i(r(e.prototype), "l", this).call(this, t);
      return n < O.ERROR_NONE ? n : t.length < n + 1 ? O.ERROR_DATA_FORMAT : (this.responseOpCode = 255 & t[n], ++n)
    }
  }])
}(), exports.ResponseFileBlock = Et, exports.ResponseFileOffset = _t, exports.ResponseGetADVInfo = Dt, exports.ResponseMtu = tt, exports.ResponseResult = m, exports.ResponseSysInfo = K, exports.ResponseTargetInfo = $, exports.ab2hex = p, exports.bigBytes2ToInt = function(t) {
  return t[0] << 8 | t[1]
}, exports.bigBytes4ToInt = function(t) {
  return t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3]
}, exports.gbkToString = function(t) {
  var e = Array.from(new Uint16Array(t));
  return decodeURIComponent(escape(String.fromCharCode.apply(String, e)))
}, exports.hexDataCovetToAddress = g, exports.intToBigBytes2 = function(t) {
  var e = new Uint8Array(2);
  return e[1] = 255 & t, e[0] = t >> 8 & 255, e
}, exports.intToBigBytes4 = function(t) {
  var e = new Uint8Array(4);
  return e[3] = 255 & t, e[2] = t >> 8 & 255, e[1] = t >> 16 & 255, e[0] = t >> 24 & 255, e
}, exports.logd = function() {
  for (var t, e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
  f <= 2 && null != l && (t = l).logd.apply(t, [h].concat(n))
}, exports.loge = _, exports.logi = v, exports.logv = R, exports.logw = E, exports.setLogGrade = function(t) {
  f = t
}, exports.setLogger = function(t) {
  l = t
}, exports.toHexWithPrefix = y, exports.utf8ToString = d;
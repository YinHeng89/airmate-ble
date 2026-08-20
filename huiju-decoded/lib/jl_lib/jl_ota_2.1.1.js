var e = require("../../@babel/runtime/helpers/possibleConstructorReturn"),
  t = require("../../@babel/runtime/helpers/getPrototypeOf"),
  n = require("../../@babel/runtime/helpers/inherits"),
  i = require("../../@babel/runtime/helpers/createClass"),
  s = require("../../@babel/runtime/helpers/classCallCheck");
var a, o, r = require("./jl_rcsp_ota_2.1.1.js"),
  u = "JLOTASDK",
  l = 1;

function R() {
  for (var e, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
  l <= 1 && null != a && (e = a).logv.apply(e, [u].concat(n))
}

function c() {
  for (var e, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
  l <= 3 && null != a && (e = a).logi.apply(e, [u].concat(n))
}

function E() {
  for (var e, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
  l <= 5 && null != a && (e = a).loge.apply(e, [u].concat(n))
}
var _ = i((function e() {
  s(this, e)
}));

function O(e, t) {
  var n = "";
  switch (e) {
    case _.ERROR_UNKNOWN:
      n = "Unknown error.";
      break;
    case _.ERROR_NONE:
      n = "Success";
      break;
    case _.ERROR_INVALID_PARAM:
      n = "Invalid parameter.";
      break;
    case _.ERROR_DATA_FORMAT:
      n = "Data formatting error.";
      break;
    case _.ERROR_NOT_FOUND_RESOURCE:
      n = "No resources found.";
      break;
    case _.ERROR_UNKNOWN_DEVICE:
      n = "Unknown device.";
      break;
    case _.ERROR_DEVICE_OFFLINE:
      n = "Device went offline.";
      break;
    case _.ERROR_IO_EXCEPTION:
      n = "I/O exceptions occur.";
      break;
    case _.ERROR_REPEAT_STATUS:
      n = "Repeat state.";
      break;
    case _.ERROR_RESPONSE_TIMEOUT:
      n = "Waiting for reply command timed out.";
      break;
    case _.ERROR_REPLY_BAD_STATUS:
      n = "Device returned a bad status.";
      break;
    case _.ERROR_REPLY_BAD_RESULT:
      n = "Device returned an error result.";
      break;
    case _.ERROR_NONE_PARSER:
      n = "There is no associated parser.";
      break;
    case _.ERROR_OTA_LOW_POWER:
      n = "Low power of equipment.";
      break;
    case _.ERROR_OTA_UPDATE_FILE:
      n = "Upgrading firmware information is error.";
      break;
    case _.ERROR_OTA_FIRMWARE_VERSION_NO_CHANGE:
      n = "Upgrade File version must be consistent with the firmware version.";
      break;
    case _.ERROR_OTA_TWS_NOT_CONNECT:
      n = "TWS is disconnect.";
      break;
    case _.ERROR_OTA_HEADSET_NOT_IN_CHARGING_BIN:
      n = "The earphone is not in the charging bin.";
      break;
    case _.ERROR_OTA_DATA_CHECK_ERROR:
      n = "Check upgrade data error.";
      break;
    case _.ERROR_OTA_FAIL:
      n = "ota failed.";
      break;
    case _.ERROR_OTA_ENCRYPTED_KEY_NOT_MATCH:
      n = "The encryption key does not match";
      break;
    case _.ERROR_OTA_UPGRADE_FILE_ERROR:
      n = "The upgrade file is damaged.";
      break;
    case _.ERROR_OTA_UPGRADE_TYPE_ERROR:
      n = "Upgrade type error.";
      break;
    case _.ERROR_OTA_LENGTH_OVER:
      n = "A length error occurred during upgrade.";
      break;
    case _.ERROR_OTA_FLASH_IO_EXCEPTION:
      n = "Flash read/write errors occur.";
      break;
    case _.ERROR_OTA_CMD_TIMEOUT:
      n = "Device timed out waiting for a command.";
      break;
    case _.ERROR_OTA_IN_PROGRESS:
      n = "OTA is in progress.";
      break;
    case _.ERROR_OTA_COMMAND_TIMEOUT:
      n = "SDK timed out waiting for a command.";
      break;
    case _.ERROR_OTA_RECONNECT_DEVICE_TIMEOUT:
      n = "Waiting for reconnect device timeout.";
      break;
    case _.ERROR_OTA_USE_CANCEL:
      n = "Canceling the upgrade";
      break;
    case _.ERROR_OTA_SAME_FILE:
      n = "Same upgrade file."
  }
  return null == t || 0 == t.length ? n : n + "\n" + t
}
_.ERROR_UNKNOWN = -1, _.ERROR_NONE = 0, _.ERROR_INVALID_PARAM = -2, _.ERROR_DATA_FORMAT = -3, _.ERROR_NOT_FOUND_RESOURCE = -4, _.ERROR_UNKNOWN_DEVICE = -32, _.ERROR_DEVICE_OFFLINE = -33, _.ERROR_IO_EXCEPTION = -35, _.ERROR_REPEAT_STATUS = -36, _.ERROR_RESPONSE_TIMEOUT = -64, _.ERROR_REPLY_BAD_STATUS = -65, _.ERROR_REPLY_BAD_RESULT = -66, _.ERROR_NONE_PARSER = -67, _.ERROR_OTA_LOW_POWER = -97, _.ERROR_OTA_UPDATE_FILE = -98, _.ERROR_OTA_FIRMWARE_VERSION_NO_CHANGE = -99, _.ERROR_OTA_TWS_NOT_CONNECT = -100, _.ERROR_OTA_HEADSET_NOT_IN_CHARGING_BIN = -101, _.ERROR_OTA_DATA_CHECK_ERROR = -102, _.ERROR_OTA_FAIL = -103, _.ERROR_OTA_ENCRYPTED_KEY_NOT_MATCH = -104, _.ERROR_OTA_UPGRADE_FILE_ERROR = -105, _.ERROR_OTA_UPGRADE_TYPE_ERROR = -106, _.ERROR_OTA_LENGTH_OVER = -107, _.ERROR_OTA_FLASH_IO_EXCEPTION = -108, _.ERROR_OTA_CMD_TIMEOUT = -109, _.ERROR_OTA_IN_PROGRESS = -110, _.ERROR_OTA_COMMAND_TIMEOUT = -111, _.ERROR_OTA_RECONNECT_DEVICE_TIMEOUT = -112, _.ERROR_OTA_USE_CANCEL = -113, _.ERROR_OTA_SAME_FILE = -114, exports.UpgradeType = void 0, (o = exports.UpgradeType || (exports.UpgradeType = {}))[o.UPGRADE_TYPE_UNKNOWN = -1] = "UPGRADE_TYPE_UNKNOWN", o[o.UPGRADE_TYPE_CHECK_FILE = 0] = "UPGRADE_TYPE_CHECK_FILE", o[o.UPGRADE_TYPE_FIRMWARE = 1] = "UPGRADE_TYPE_FIRMWARE";
var h = function() {
    return i((function e(t, n) {
      s(this, e), this.offset = 0, this.len = 0, null != t && (this.offset = t), null != n && (this.len = n)
    }), [{
      key: "toString",
      value: function() {
        return "FileOffset{offset=" + this.offset + ", len=" + this.len + "}"
      }
    }])
  }(),
  T = function() {
    return i((function e() {
      s(this, e), this.communicationWay = e.COMMUNICATION_WAY_BLE, this.isSupportNewRebootWay = !1
    }), [{
      key: "toString",
      value: function() {
        var e;
        return "OTAConfig{communicationWay=" + this.communicationWay + ", isSupportNewRebootWay=" + this.isSupportNewRebootWay + ", updateFileDataSize=" + (null === (e = this.updateFileData) || void 0 === e ? void 0 : e.length) + "}"
      }
    }])
  }();
T.COMMUNICATION_WAY_BLE = 0, T.COMMUNICATION_WAY_SPP = 1, T.COMMUNICATION_WAY_USB = 2;
var f = function() {
    function e() {
      s(this, e)
    }
    return i(e, [{
      key: "copy",
      value: function() {
        var t = new e;
        return t.deviceBleMac = this.deviceBleMac, t.isSupportNewReconnectADV = this.isSupportNewReconnectADV, t
      }
    }, {
      key: "toString",
      value: function() {
        return "ReConnectMsg{ isSupportNewReconnectADV=" + this.isSupportNewReconnectADV + "}"
      }
    }])
  }(),
  A = i((function e(t, n, i) {
    s(this, e), this.isSupportDoubleBackup = !1, this.isNeedBootLoader = !1, this.isMandatoryUpgrade = !1, this.isSupportDoubleBackup = t, this.isNeedBootLoader = n, this.isMandatoryUpgrade = i
  })),
  v = function() {
    return i((function e() {
      s(this, e)
    }), [{
      key: "release",
      value: function() {
        this.callback = null
      }
    }, {
      key: "onStartOTA",
      value: function() {
        this.cbUpgradeEvent({
          onCallback: function(e) {
            e.onStartOTA()
          }
        })
      }
    }, {
      key: "onNeedReconnect",
      value: function(e) {
        this.cbUpgradeEvent({
          onCallback: function(t) {
            t.onNeedReconnect(e)
          }
        })
      }
    }, {
      key: "onProgress",
      value: function(e, t) {
        this.cbUpgradeEvent({
          onCallback: function(n) {
            n.onProgress(e, t)
          }
        })
      }
    }, {
      key: "onStopOTA",
      value: function() {
        this.cbUpgradeEvent({
          onCallback: function(e) {
            e.onStopOTA()
          }
        })
      }
    }, {
      key: "onCancelOTA",
      value: function() {
        this.cbUpgradeEvent({
          onCallback: function(e) {
            e.onCancelOTA()
          }
        })
      }
    }, {
      key: "onError",
      value: function(e, t) {
        this.cbUpgradeEvent({
          onCallback: function(n) {
            n.onError(e, t)
          }
        })
      }
    }, {
      key: "cbUpgradeEvent",
      value: function(e) {
        null != this.callback && e.onCallback(this.callback)
      }
    }])
  }(),
  d = function() {
    function e(t) {
      s(this, e), this.t = null, this.i = 0, this.l = 0, this.h = null, this.o = null, this.u = null, this.p = void 0, this.k = null, this.T = null, this.R = null, this.A = t, this.m = new v
    }
    return i(e, [{
      key: "release",
      value: function() {
        E("release >>> OTA"), this.isOTA() && (this.cancelOTA(), this.v(null)), this.O(), this.m.release()
      }
    }, {
      key: "isOTA",
      value: function() {
        return null != this.h
      }
    }, {
      key: "startOTA",
      value: function(e, t) {
        if (null == e || null == e.updateFileData || null != e.updateFileData && 0 == e.updateFileData.length) {
          var n = _.ERROR_INVALID_PARAM;
          null != t && t.onError(n, O(n, ""))
        } else if (this.A.isDeviceConnected())
          if (this.isOTA()) {
            var i = _.ERROR_OTA_IN_PROGRESS;
            null != t && t.onError(i, O(i, "OTA is in progress. Please stop ota at first."))
          } else this.v(e), this.m.callback = t, this._(), null != e.updateFileData && e.updateFileData.length > 0 ? this.C(e.updateFileData) : this.D(_.ERROR_OTA_UPGRADE_FILE_ERROR, "startOTA : updateFileData is null or size is 0");
        else {
          var s = _.ERROR_DEVICE_OFFLINE;
          null != t && t.onError(s, O(s, ""))
        }
      }
    }, {
      key: "cancelOTA",
      value: function() {
        if (this.U("cancelOTA")) return !1;
        if (!this.A.isDeviceConnected()) {
          var e = _.ERROR_DEVICE_OFFLINE;
          return this.D(e, O(e, "")), !1
        }
        if (null != this.u && this.u.isSupportDoubleBackup) {
          var t = this,
            n = {
              onResult: function() {
                t.S()
              },
              onError: function(e, n) {
                e == _.ERROR_REPLY_BAD_STATUS || e == _.ERROR_REPLY_BAD_RESULT ? t.D(e, n) : t.S()
              }
            };
          return this.A.exitUpdateMode(n), !0
        }
        return E("cancelOTA : device is single flash ota, so ota progress cannot be interrupted."), !1
      }
    }, {
      key: "onDeviceInit",
      value: function(e, t) {
        t && null != e && (this.u = e), this.isOTA() && null != this.T && (t && null != e ? (this.F(), e.isMandatoryUpgrade ? (this.I(exports.UpgradeType.UPGRADE_TYPE_FIRMWARE, 0), this.N()) : this.q()) : this.D(_.ERROR_IO_EXCEPTION, O(_.ERROR_IO_EXCEPTION, "init device failed.")))
      }
    }, {
      key: "onDeviceDisconnect",
      value: function() {
        this.isOTA() && (null != this.o ? (c("device is offline. ready to reconnect device"), this.M(), null == this.T && this.P(300)) : this.D(_.ERROR_DEVICE_OFFLINE, O(_.ERROR_DEVICE_OFFLINE, "")))
      }
    }, {
      key: "notifyUpgradeSize",
      value: function(e, t) {
        E("设备通知文件大小,totalSize : " + e + " currentSize: " + t), this.i = e, this.l = t, this.W(this.L(e, t))
      }
    }, {
      key: "gainFileBlock",
      value: function(e, t) {
        this.V();
        var n = this.B(e, t),
          i = this,
          s = {
            onResult: function() {
              if (0 == e && 0 == t) i.G();
              else {
                if (i.i > 0) {
                  var n = i.l;
                  n += t, i.l = n, i.W(i.L(i.i, i.l))
                }
                i.J()
              }
            },
            onError: function(e, t) {
              i.D(e, t)
            }
          };
        this.A.receiveFileBlock(e, t, n, s)
      }
    }, {
      key: "setDeviceBLEMac",
      value: function(e) {
        this.p = e
      }
    }, {
      key: "v",
      value: function(e) {
        this.h = e
      }
    }, {
      key: "C",
      value: function(e) {
        if (this.t = e, this.A.isDeviceConnected()) this.K();
        else {
          var t = _.ERROR_DEVICE_OFFLINE;
          this.D(t, O(t, ""))
        }
      }
    }, {
      key: "K",
      value: function() {
        if (!this.U("_readUpgradeFileFlag")) {
          var e = this,
            t = {
              onResult: function(t) {
                var n;
                if (0 == t.offset && 0 == t.len) {
                  var i;
                  n = new Uint8Array(1);
                  var s = null === (i = e.h) || void 0 === i ? void 0 : i.communicationWay;
                  n[0] = null != s ? s : 0
                } else n = e.B(t.offset, t.len);
                0 != n.length ? e.Y(n) : this.onError(_.ERROR_INVALID_PARAM, "Read Data over Limit. offset = " + t.offset + ", len = " + t.len)
              },
              onError: function(t, n) {
                e.D(t, n)
              }
            };
          e.A.readUpgradeFileFlag(t)
        }
      }
    }, {
      key: "Y",
      value: function(e) {
        if (!this.U("_inquiryDeviceCanOTA")) {
          c("inquiryDeviceCanOTA : >>>>>>>>>>>>");
          var t = this,
            n = {
              onResult: function(e) {
                if (c("inquiryDeviceCanOTA : onResult :  result = " + e), e != p.j) {
                  var n, i = "";
                  switch (e) {
                    case p.X:
                      n = _.ERROR_OTA_LOW_POWER;
                      break;
                    case p.Z:
                      n = _.ERROR_OTA_UPDATE_FILE;
                      break;
                    case p.$:
                      n = _.ERROR_OTA_FIRMWARE_VERSION_NO_CHANGE;
                      break;
                    case p.tt:
                      n = _.ERROR_OTA_TWS_NOT_CONNECT;
                      break;
                    case p.et:
                      n = _.ERROR_OTA_HEADSET_NOT_IN_CHARGING_BIN;
                      break;
                    default:
                      n = _.ERROR_UNKNOWN, i = "" + e
                  }
                  this.onError(n, O(n, i))
                } else t.H()
              },
              onError: function(e, n) {
                t.D(e, n)
              }
            };
          t.A.inquiryDeviceCanOTA(e, n)
        }
      }
    }, {
      key: "H",
      value: function() {
        this.U("_checkUpdateEnvironment") || (null != this.u ? this.u.isSupportDoubleBackup ? (this.st(null), this.N()) : this.u.isNeedBootLoader ? (this.A.changeReceiveMtu(), this.J()) : this.u.isMandatoryUpgrade ? this.N() : this.it() : this.D(_.ERROR_DEVICE_OFFLINE, O(_.ERROR_DEVICE_OFFLINE, "")))
      }
    }, {
      key: "B",
      value: function(e, t) {
        if (null != this.t && this.t.length > 0 && e + t <= this.t.length) {
          var n = new Uint8Array(t);
          return n.set(this.t.slice(e, e + t)), n
        }
        return new Uint8Array(0)
      }
    }, {
      key: "G",
      value: function() {
        if (!this.U("queryUpdateResult")) {
          c("queryUpdateResult : >>>>>>>>>>>>");
          var e = this,
            t = {
              onResult: function(t) {
                c("queryUpdateResult : onResult :  result = " + t);
                var n = 0,
                  i = "";
                switch (t) {
                  case C.nt:
                    return e.A.rebootDevice(null), e.v(null), e.O(), void setTimeout((function() {
                      e.q()
                    }), 100);
                  case C.rt:
                    return void e.it();
                  case C.lt:
                    n = _.ERROR_OTA_DATA_CHECK_ERROR;
                    break;
                  case C.ht:
                    n = _.ERROR_OTA_FAIL;
                    break;
                  case C.ot:
                    n = _.ERROR_OTA_ENCRYPTED_KEY_NOT_MATCH;
                    break;
                  case C.ct:
                    n = _.ERROR_OTA_UPGRADE_FILE_ERROR;
                    break;
                  case C.ut:
                    n = _.ERROR_OTA_UPGRADE_TYPE_ERROR;
                    break;
                  case C.dt:
                    n = _.ERROR_OTA_LENGTH_OVER;
                    break;
                  case C.ft:
                    n = _.ERROR_OTA_FLASH_IO_EXCEPTION;
                    break;
                  case C.kt:
                    n = _.ERROR_OTA_CMD_TIMEOUT;
                    break;
                  case C.Tt:
                    n = _.ERROR_OTA_SAME_FILE;
                    break;
                  default:
                    n = _.ERROR_UNKNOWN, i = "" + t
                }
                this.onError(n, O(n, i))
              },
              onError: function(t, n) {
                e.D(t, n)
              }
            };
          this.A.queryUpdateResult(t)
        }
      }
    }, {
      key: "N",
      value: function() {
        if (!this.U("enterUpdateMode")) {
          var e = this,
            t = {
              onResult: function(t) {
                if (0 == t) e.J();
                else {
                  var n = _.ERROR_REPLY_BAD_RESULT;
                  this.onError(n, O(n, "" + t))
                }
              },
              onError: function(t, n) {
                e.D(t, n)
              }
            };
          this.A.enterUpdateMode(t)
        }
      }
    }, {
      key: "it",
      value: function() {
        if (!this.U("readyToReconnectDevice"))
          if (null != this.h) {
            var t = new f;
            t.deviceBleMac = this.p, this.st(t), this.P(e.WAITING_DEVICE_OFFLINE_TIMEOUT);
            var n = this,
              i = {
                onResult: function(e) {
                  t.isSupportNewReconnectADV = 0 != e
                },
                onError: function(e, t) {
                  e != _.ERROR_REPLY_BAD_STATUS && e != _.ERROR_REPLY_BAD_RESULT || n.D(e, t)
                }
              };
            this.A.changeCommunicationWay(this.h.communicationWay, this.h.isSupportNewRebootWay, i)
          } else this.D(_.ERROR_OTA_FAIL, " readyToReconnectDevice found OTACofig is null")
      }
    }, {
      key: "U",
      value: function(e) {
        return !this.isOTA() && (E(e + ": Ota progress has not started yet."), !0)
      }
    }, {
      key: "st",
      value: function(e) {
        this.o = e
      }
    }, {
      key: "O",
      value: function() {
        this.i = 0, this.l = 0, this.st(null), this.bt()
      }
    }, {
      key: "bt",
      value: function() {
        this.F(), this.V(), this.M()
      }
    }, {
      key: "P",
      value: function(e) {
        var t = this;
        this.M();
        var n = this;
        this.R = setTimeout((function() {
          if (t.R = null, E("MSG_WAIT_DEVICE_OFFLINE : timeout. isOTA = " + n.isOTA() + ", " + n.o), null != n.o && n.isOTA() && (E("MSG_RECONNECT_DEVICE : start reconnect >>>> isOTA = " + n.isOTA() + ", " + n.o), n.isOTA() && null != n.o)) {
            n.i = 0, n.l = 0;
            var e = n.o.copy();
            n.Rt(e), n.gt(e), n.st(null)
          }
        }), e)
      }
    }, {
      key: "M",
      value: function() {
        null != this.R && (clearTimeout(this.R), this.R = null)
      }
    }, {
      key: "J",
      value: function() {
        var t = this;
        this.V(), this.k = setTimeout((function() {
          if (t.k = null, t.isOTA()) {
            var e = _.ERROR_OTA_COMMAND_TIMEOUT;
            t.D(e, O(e, ""))
          }
        }), e.WAITING_CMD_TIMEOUT)
      }
    }, {
      key: "V",
      value: function() {
        null != this.k && (clearTimeout(this.k), this.k = null)
      }
    }, {
      key: "gt",
      value: function(t) {
        var n = this;
        this.F(), this.T = setTimeout((function() {
          if (n.T = null, n.isOTA()) {
            var e = _.ERROR_OTA_RECONNECT_DEVICE_TIMEOUT;
            n.D(e, O(e, ""))
          }
        }), e.RECONNECT_DEVICE_TIMEOUT)
      }
    }, {
      key: "F",
      value: function() {
        null != this.T && (clearTimeout(this.T), this.T = null)
      }
    }, {
      key: "_",
      value: function() {
        this.m.onStartOTA()
      }
    }, {
      key: "W",
      value: function(e) {
        var t = null == this.u || this.u.isNeedBootLoader ? 0 : 1;
        this.I(this.At(t), e)
      }
    }, {
      key: "I",
      value: function(e, t) {
        this.m.onProgress(e, t)
      }
    }, {
      key: "Rt",
      value: function(e) {
        this.m.onNeedReconnect(e)
      }
    }, {
      key: "q",
      value: function() {
        this.v(null), this.W(100), this.O(), E("_callbackOTAStop "), this.m.onStopOTA(), this.m.callback = null
      }
    }, {
      key: "S",
      value: function() {
        this.v(null), this.O(), E("_callbackOTACancel "), this.m.onCancelOTA(), this.m.callback = null
      }
    }, {
      key: "D",
      value: function(e, t) {
        this.v(null), this.O(), E("callbackOTAError :  has an exception, code = " + function(e) {
          var t = (e < 0 ? -e : e).toString(16).toUpperCase();
          return "" === t ? "0x00" : e < 0 ? "-0x" + t : "0x" + t
        }(e) + ", " + t), this.m.onError(e, t), this.m.callback = null
      }
    }, {
      key: "L",
      value: function(e, t) {
        if (e <= 0) return 0;
        var n = 100 * t / e;
        return n >= 100 && (n = 99.9), n
      }
    }, {
      key: "At",
      value: function(e) {
        var t;
        switch (e) {
          case 0:
            t = exports.UpgradeType.UPGRADE_TYPE_CHECK_FILE;
            break;
          case 1:
            t = exports.UpgradeType.UPGRADE_TYPE_FIRMWARE;
            break;
          default:
            t = exports.UpgradeType.UPGRADE_TYPE_UNKNOWN
        }
        return t
      }
    }])
  }();
d.WAITING_CMD_TIMEOUT = 2e4, d.WAITING_DEVICE_OFFLINE_TIMEOUT = 6e3, d.RECONNECT_DEVICE_DELAY = 1e3, d.RECONNECT_DEVICE_TIMEOUT = 8e4;
var p = i((function e() {
  s(this, e)
}));
p.j = 0, p.X = 1, p.Z = 2, p.$ = 3, p.tt = 4, p.et = 5;
var C = i((function e() {
  s(this, e)
}));
C.nt = 0, C.lt = 1, C.ht = 2, C.ot = 3, C.ct = 4, C.ut = 5, C.dt = 6, C.ft = 7, C.kt = 8, C.Tt = 9, C.rt = 128;
var D = function() {
    return i((function e(t) {
      s(this, e), this.vt = new Array, this.Ot = d.WAITING_CMD_TIMEOUT, this.wt = !1, this._t = null, this.Ct = void 0, this.Dt = 0, this.minSameCmdE5Time = 50, this.yt = new d(this), this.Ut = t;
      var n = this;
      this.Et = {
        onRcspInit: function(e, t) {
          if (c("onRcspInit:1" + JSON.stringify(n._t) + " :device " + JSON.stringify(e)), null != e && (null == n._t || n._t.equals(e))) {
            var i, s = n.Ut.getDeviceInfo(e);
            c("onRcspInit:2" + JSON.stringify(s)), null != s && (i = new A(s.isSupportDoubleBackup, s.isNeedBootLoader, s.mandatoryUpgradeFlag == r.CmdGetTargetInfo.FLAG_MANDATORY_UPGRADE)), n.yt.setDeviceBLEMac(null == s ? void 0 : s.bleAddr), n.yt.onDeviceInit(i, t)
          }
        },
        onRcspCommand: function(e, t) {
          if (null != e)
            if (t instanceof r.CmdReadFileBlock) {
              var i = t,
                s = (new Date).getTime();
              if (i.getSn() == n.Ct && s - n.Dt < n.minSameCmdE5Time) return;
              n.Ct = i.getSn(), n.Dt = s;
              var a = i.getParam().offset,
                o = i.getParam().len;
              n.xt(i), n.yt.gainFileBlock(a, o)
            } else if (t instanceof r.CmdNotifyUpdateFileSize) {
            var u, l, c = t,
              E = c.getParam().totalSize,
              _ = c.getParam().currentSize;
            n.yt.notifyUpgradeSize(E, _), null != c.getResponse() && (null !== (u = c.getResponse()) && void 0 !== u && u.setStatus(r.ResponseBase.STATUS_SUCCESS), null !== (l = c.getResponse()) && void 0 !== l && l.setSn(c.getSn()), c.setCommand(!1), n.Ut.sendRCSPCommand(e, c, n.Ot, new N("Response ", null)))
          } else if (t instanceof r.CmdNotifyADVInfo && (R("onRcspCommand : 设备广播ADV信息"), !n.wt)) {
            var O = new r.CmdControlADVStream(r.CmdControlADVStream.CTRL_OP_CLOSE);
            n.Ut.sendRCSPCommand(e, O, n.Ot, new N("stopNotifyADV", null)), n.wt = !0
          }
        },
        onRcspDataCmd: function(e, t) {},
        onConnectStateChange: function(e, t) {
          null != e && t == r.Connection.CONNECTION_DISCONNECT && n.yt.onDeviceDisconnect()
        },
        onRcspError: function(e, t, n) {},
        onMandatoryUpgrade: function(e) {},
        onRcspResponse: function(e, t) {}
      }, t.addOnRcspCallback(this.Et)
    }), [{
      key: "getOTAImpl",
      value: function() {
        return this.yt
      }
    }, {
      key: "updateRcspOpImpl",
      value: function(e) {
        this.Ut = e, e.addOnRcspCallback(this.Et);
        var t = this.Ut.getUsingDevice();
        if (this.setOTADevice(t), null != t) {
          var n = this.Ut.getDeviceInfo(t);
          if (null != n) {
            var i = new A(n.isSupportDoubleBackup, n.isNeedBootLoader, n.mandatoryUpgradeFlag == r.CmdGetTargetInfo.FLAG_MANDATORY_UPGRADE);
            this.yt.onDeviceInit(i, !0)
          }
        }
      }
    }, {
      key: "startOTA",
      value: function(e, t) {
        var n;
        this._t = this.Ut.getUsingDevice(), null != this._t && this.yt.setDeviceBLEMac(null === (n = this.Ut.getDeviceInfo(this._t)) || void 0 === n ? void 0 : n.bleAddr), this.Ct = void 0, this.yt.startOTA(e, t)
      }
    }, {
      key: "cancelOTA",
      value: function() {
        this.yt.cancelOTA()
      }
    }, {
      key: "getOTADevice",
      value: function() {
        return this._t
      }
    }, {
      key: "setOTADevice",
      value: function(e) {
        this._t = e
      }
    }, {
      key: "release",
      value: function() {
        this.yt.release(), this.Ut.removeOnRcspCallback(this.Et)
      }
    }, {
      key: "isDeviceConnected",
      value: function() {
        return this.Ut.isDeviceConnected() && null != this._t && this._t.equals(this.Ut.getUsingDevice())
      }
    }, {
      key: "changeCommunicationWay",
      value: function(e, t, n) {
        if (this.isDeviceConnected()) {
          var i = new r.ParamCommunicationWay(e, t),
            s = new U("changeCommunicationWay", n, {
              hasResult: function() {
                return 0
              },
              handleResult: function(e, t) {
                var n;
                return null === (n = t.getResponse()) || void 0 === n ? void 0 : n.result
              }
            });
          this.Ut.sendRCSPCommand(this._t, new r.CmdChangeCommunicationWay(i), this.Ot, s)
        }
      }
    }, {
      key: "readUpgradeFileFlag",
      value: function(e) {
        if (this.isDeviceConnected()) {
          var t = new U("readUpgradeFileFlag", e, {
            hasResult: function() {
              return 0
            },
            handleResult: function(e, t) {
              var n, i;
              return new h(null === (n = t.getResponse()) || void 0 === n ? void 0 : n.offset, null === (i = t.getResponse()) || void 0 === i ? void 0 : i.len)
            }
          });
          this.Ut.sendRCSPCommand(this._t, new r.CmdReadFileOffset, this.Ot, t)
        }
      }
    }, {
      key: "inquiryDeviceCanOTA",
      value: function(e, t) {
        if (this.isDeviceConnected()) {
          var n = new r.CmdRequestUpdate(new r.ParamRequestUpdate(e)),
            i = new U("inquiryDeviceCanOTA", t, {
              hasResult: function() {
                return 0
              },
              handleResult: function(e, t) {
                var n;
                return null === (n = t.getResponse()) || void 0 === n ? void 0 : n.result
              }
            });
          this.Ut.sendRCSPCommand(this._t, n, this.Ot, i)
        }
      }
    }, {
      key: "changeReceiveMtu",
      value: function() {
        if (this.isDeviceConnected()) {
          var e = this.Ut.getDeviceInfo(this._t);
          null != e && e.receiveMtu < r.RcspConstant.DEFAULT_PROTOCOL_MTU && (e.receiveMtu = r.RcspConstant.DEFAULT_PROTOCOL_MTU, this.Ut.getDeviceInfoManager().updateDeviceInfo(this._t, e))
        }
      }
    }, {
      key: "enterUpdateMode",
      value: function(e) {
        if (this.isDeviceConnected()) {
          var t = new r.CmdEnterUpdateMode,
            n = new U("enterUpdateMode", e, {
              hasResult: function() {
                return 0
              },
              handleResult: function(e, t) {
                var n;
                return null === (n = t.getResponse()) || void 0 === n ? void 0 : n.result
              }
            });
          this.Ut.sendRCSPCommand(this._t, t, this.Ot, n)
        }
      }
    }, {
      key: "exitUpdateMode",
      value: function(e) {
        if (this.isDeviceConnected()) {
          var t = new r.CmdExitUpdateMode,
            n = new U("exitUpdateMode", e, {
              hasResult: function() {
                return 0
              },
              handleResult: function(e, t) {
                var n;
                return null === (n = t.getResponse()) || void 0 === n ? void 0 : n.result
              }
            });
          this.Ut.sendRCSPCommand(this._t, t, this.Ot, n)
        }
      }
    }, {
      key: "queryUpdateResult",
      value: function(e) {
        if (this.isDeviceConnected()) {
          var t = new r.CmdQueryUpdateResult,
            n = new U("queryUpdateResult", e, {
              hasResult: function() {
                return 0
              },
              handleResult: function(e, t) {
                var n;
                return null === (n = t.getResponse()) || void 0 === n ? void 0 : n.result
              }
            });
          this.Ut.sendRCSPCommand(this._t, t, this.Ot, n)
        }
      }
    }, {
      key: "rebootDevice",
      value: function(e) {
        if (this.isDeviceConnected()) {
          var t = new r.CmdRebootDevice(new r.ParamRebootDevice(r.ParamRebootDevice.OP_REBOOT)),
            n = new N("rebootDevice", e);
          this.Ut.sendRCSPCommand(this._t, t, this.Ot, n)
        }
      }
    }, {
      key: "stopNotifyADV",
      value: function(e) {
        if (this.isDeviceConnected()) {
          var t = new r.CmdControlADVStream(r.CmdControlADVStream.CTRL_OP_CLOSE),
            n = new N("stopNotifyADV", e);
          this.Ut.sendRCSPCommand(this._t, t, this.Ot, n)
        }
      }
    }, {
      key: "receiveFileBlock",
      value: function(e, t, n, i) {
        if (this.isDeviceConnected()) {
          var s = this.St(e, t);
          if (null != s) {
            var a = r.ResponseResult.STATUS_SUCCESS;
            0 == n.length && e > 0 && t > 0 && (a = r.ResponseResult.STATUS_INVALID_PARAM);
            var o = s.getResponse();
            null != o && (o.setSn(s.getSn()), o.block = n, o.setStatus(a), s.setCommand(!1));
            var u = new N("receiveFileBlock", i);
            this.Ut.sendRCSPCommand(this._t, s, this.Ot, u)
          }
        }
      }
    }, {
      key: "St",
      value: function(e, t) {
        for (var n = 0; n < this.vt.length; n++) {
          var i = this.vt[n];
          if (i.getParam().offset == e && i.getParam().len == t) return this.vt.splice(n, 1), i
        }
        return null
      }
    }, {
      key: "xt",
      value: function(e) {
        this.vt.push(e)
      }
    }])
  }(),
  U = function() {
    return i((function e(t, n, i) {
      s(this, e), null == i && E("IHandleResult is null."), this.funcName = t, this.callback = n, this.handle = i
    }), [{
      key: "onCmdResponse",
      value: function(e, t) {
        var n, i;
        if (t.getStatus() == r.ResponseBase.STATUS_SUCCESS) {
          var s = this.handle.hasResult(e, t);
          if (0 == s) {
            var a, o = this.handle.handleResult(e, t);
            return void(null === (a = this.callback) || void 0 === a || a.onResult(o))
          }
          n = r.ErrorCode.ERROR_REPLY_BAD_RESULT, i = "" + s
        } else n = r.ErrorCode.ERROR_REPLY_BAD_STATUS, i = "" + t.getStatus();
        this.onError(e, n, r.ErrorCode.getErrorDesc2(n, i))
      }
    }, {
      key: "onError",
      value: function(e, t, n) {
        var i;
        n = this.funcName + ":" + n, null === (i = this.callback) || void 0 === i || i.onError(t, n)
      }
    }])
  }(),
  N = function(a) {
    function o(n, i) {
      return s(this, o), a = this, u = [n, i, {
        hasResult: function() {
          return 0
        },
        handleResult: function() {
          return !0
        }
      }], r = t(r = o), e(a, function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
        } catch (e) {
          return !1
        }
      }() ? Reflect.construct(r, u || [], t(a).constructor) : r.apply(a, u));
      var a, r, u
    }
    return n(o, U), i(o)
  }();
exports.FileOffset = h, exports.OTAConfig = T, exports.OTAError = _, exports.OTAImpl = d, exports.RcspOTAManager = function() {
  return i((function e(t) {
    if (s(this, e), this.Ut = t, this.Ft = new D(this.Ut), this.yt = this.Ft.getOTAImpl(), null != t) {
      var n = this.Ut.getUsingDevice();
      if (null != n) {
        var i = this.Ut.getDeviceInfo(n);
        if (null != i) {
          var a = new A(i.isSupportDoubleBackup, i.isNeedBootLoader, i.mandatoryUpgradeFlag == r.CmdGetTargetInfo.FLAG_MANDATORY_UPGRADE);
          this.yt.onDeviceInit(a, !0)
        }
      }
    }
  }), [{
    key: "release",
    value: function() {
      this.Ft.release()
    }
  }, {
    key: "startOTA",
    value: function(e, t) {
      this.Ft.startOTA(e, t)
    }
  }, {
    key: "cancelOTA",
    value: function() {
      this.Ft.cancelOTA()
    }
  }, {
    key: "isOTA",
    value: function() {
      return this.Ft.getOTAImpl().isOTA()
    }
  }, {
    key: "getCurrentOTADevice",
    value: function() {
      return this.Ft.getOTADevice()
    }
  }, {
    key: "updateRcspOpImpl",
    value: function(e) {
      return this.Ft.updateRcspOpImpl(e)
    }
  }])
}(), exports.ReConnectMsg = f, exports.ab2hex = function(e) {
  return e ? Array.prototype.map.call(new Uint8Array(e), (function(e) {
    return ("00" + e.toString(16)).slice(-2)
  })).join("") : ""
}, exports.getErrorDesc = O, exports.logd = function() {
  for (var e, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
  l <= 2 && null != a && (e = a).logd.apply(e, [u].concat(n))
}, exports.loge = E, exports.logi = c, exports.logv = R, exports.logw = function() {
  for (var e, t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
  l <= 4 && null != a && (e = a).logw.apply(e, [u].concat(n))
}, exports.setLogGrade = function(e) {
  l = e
}, exports.setLogger = function(e) {
  a = e
};
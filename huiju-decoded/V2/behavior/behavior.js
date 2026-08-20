var e = require("../../@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var t = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../@babel/runtime/helpers/defineProperty"),
  s = require("../utils/util"),
  i = require("../utils/protocol"),
  r = require("../../api/request"),
  c = require("../../utils/logger"),
  u = require("../../lib/bluetoothOTAManager"),
  l = e(require("../../lib/jl_lib/jl_rcsp_ota_2.1.1")),
  d = getApp(),
  h = d.globalData.deviceList,
  v = d.globalData.bleService,
  p = (0, s.debounce)(),
  w = (0, s.debounce)(),
  f = (0, s.debounce)();
exports.default = Behavior({
  data: {
    device: null,
    title: "",
    uiJson: null,
    deviceStatus: null,
    showNavDefaultBg: !1,
    connectStatus: "noConnected",
    type: "",
    style: "",
    styleConfig: null,
    commandWords: null,
    showSkeleton: !1,
    showSettingBtn: !1,
    showOTA: !1,
    showEditCommand: !1,
    showAllWords: !1,
    showEditWakeWords: !1,
    showEditCmdWords: !1,
    user: null,
    sendDebounceTimeout: 500,
    attributeDebounceTimeout: 0
  },
  waitReply: !1,
  statePd: "",
  bleInstance: null,
  mtu: 20,
  checkAuthTimeOutFlag: "",
  sign: "",
  checkCuiVersionTimeOutFlag: !0,
  CuiVersion: null,
  buildTime: "",
  isGoToSetting: !1,
  isGoToOTA: !1,
  waitReplyTimer: null,
  productId: "",
  mac: "",
  otaVersion: "",
  methods: {
    onPageScroll: function(e) {
      var t = this;
      p((function() {
        var n = e.scrollTop;
        Math.abs(n) < 1 ? t.setData({
          showNavDefaultBg: !1
        }) : t.setData({
          showNavDefaultBg: !0
        })
      }), 100)
    },
    sendDp: function(e) {
      var t = this,
        n = e.dpValue,
        o = this.data.sendDebounceTimeout ? this.data.sendDebounceTimeout : 500;
      this.waitReply = !0, w((function() {
        t.bleInstance.sendDp({
          dpValue: n
        })
      }), o);
      var a = this.data.attributeDebounceTimeout ? this.data.attributeDebounceTimeout : 0;
      this.waitReplyTimer && clearTimeout(this.waitReplyTimer), this.waitReplyTimer = setTimeout((function() {
        t.waitReply = !1
      }), a + o)
    },
    handleMainSwitchChange: function() {
      var e, t = !this.data.deviceStatus.mainSwitch.status,
        n = this.data.uiJson.find((function(e) {
          return "mainSwitch" === e.type
        })).protocol;
      e = t ? n.find((function(e) {
        return "open" === e.key
      })).value : n.find((function(e) {
        return "close" === e.key
      })).value, this.setData({
        "deviceStatus.mainSwitch.status": t
      }), this.sendDp({
        dpValue: e
      })
    },
    handleSliderChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.protocol,
        i = t.value,
        r = "deviceStatus.".concat(n, ".").concat(o, ".value");
      this.setData(a({}, r, i)), s && this.sendDp({
        dpValue: s
      })
    },
    handleScaleSliderChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.protocol,
        i = t.value,
        r = "deviceStatus.".concat(n, ".").concat(o, ".value");
      this.setData(a({}, r, i)), s && this.sendDp({
        dpValue: s
      })
    },
    handleCounterChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.protocol,
        i = t.value,
        r = "deviceStatus.".concat(n, ".").concat(o);
      this.setData(a({}, r, {
        value: i
      })), s && this.sendDp({
        dpValue: s
      })
    },
    handleModeChange: function(e) {
      var t = this,
        n = e.detail,
        o = n.type,
        s = n.label,
        i = n.protocol,
        r = n.status,
        c = n.displayName,
        u = r ? "open" : "close",
        l = i.find((function(e) {
          return e.key === u
        }));
      if (l) {
        var d = this.data.deviceStatus[o][s];
        Object.keys(d).forEach((function(e) {
          var a = r;
          if (e === c) d[e] = a;
          else if (a) {
            var i = t.data.uiJson.find((function(e) {
              return e.type === o && e.label === s
            })).children;
            if (i) {
              var u = i.find((function(t) {
                return t.displayName === e
              }));
              u && u.isMutex && n.isMutex && (d[e] = !1)
            }
          }
        }));
        var h = "deviceStatus.".concat(o, ".").concat(s);
        this.setData(a({}, h, d)), this.sendDp({
          dpValue: l.value
        })
      }
    },
    handleMidSwitchChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.displayName,
        i = t.key,
        r = t.protocol.find((function(e) {
          return e.key === i
        }));
      if (r) {
        var c = "deviceStatus.".concat(n, ".").concat(o, ".").concat(s),
          u = "open" === i;
        this.setData(a({}, c, u)), this.sendDp({
          dpValue: r.value
        })
      }
    },
    handleModeExcludeChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.protocol,
        i = t.status,
        r = t.displayName,
        c = s.find((function(e) {
          return e.key === i
        }));
      if (c) {
        var u = this.data.deviceStatus[n][o];
        Object.keys(u).forEach((function(e) {
          var t = "open" === i;
          e === r ? u[e] = t : t && (u[e] = !1)
        }));
        var l = "deviceStatus.".concat(n, ".").concat(o);
        this.setData(a({}, l, u)), this.sendDp({
          dpValue: c.value
        })
      }
    },
    handleSwitchChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.protocol,
        s = t.status,
        i = t.displayName,
        r = o.find((function(e) {
          var t = s ? "open" : "close";
          return e.key === t
        })),
        c = "deviceStatus.".concat(n, ".").concat(i);
      this.setData(a({}, c, s)), this.sendDp({
        dpValue: r.value
      })
    },
    handlePopupPickerChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.protocol,
        i = t.value,
        r = "deviceStatus.".concat(n, ".").concat(o, ".value");
      this.setData(a({}, r, i)), this.sendDp({
        dpValue: s
      })
    },
    handleTemChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.value,
        i = t.protocol,
        r = "deviceStatus.".concat(n, ".").concat(o, ".value");
      this.setData(a({}, r, s)), this.sendDp({
        dpValue: i
      })
    },
    handleFanYaoTouChange: function(e) {
      var t = this,
        n = e.detail,
        o = n.label,
        s = n.protocol,
        i = n.newStatus,
        r = n.type,
        c = void 0 === r ? "fanYaoTou" : r,
        u = this.data.uiJson.find((function(e) {
          return e.type === c && e.label === o
        }));
      u && u.isMutex && i.checked && this.data.uiJson.forEach((function(e) {
        if (e.type === c && e.isMutex && e.label !== o) {
          var n = t.data.deviceStatus[c][e.label];
          n && n.checked && t.setData(a({}, "deviceStatus.".concat(c, ".").concat(e.label, ".checked"), !1))
        }
      }));
      var l = "deviceStatus.".concat(c, ".").concat(o);
      this.setData(a({}, l, i)), this.sendDp({
        dpValue: s
      })
    },
    handleWaterTemperatureChange: function(e) {
      var t = e.detail,
        n = t.type,
        o = t.label,
        s = t.value,
        i = t.protocol,
        r = "deviceStatus.".concat(n, ".").concat(o, ".value");
      this.setData(a({}, r, s)), this.sendDp({
        dpValue: i
      })
    },
    handleTapBtn: function(e) {
      var t = e.detail.protocol;
      this.sendDp({
        dpValue: t
      })
    },
    handleQuickAdjust: function(e) {
      var t = e.detail,
        n = t.protocol,
        o = t.changes,
        a = {};
      (o || []).forEach((function(e) {
        var t = e.label,
          n = e.value;
        a["deviceStatus.slider.".concat(t, ".value")] = n
      })), Object.keys(a).length && this.setData(a), n && this.sendDp({
        dpValue: n
      })
    },
    reConnect: function() {
      var e = this;
      return o(n().mark((function t() {
        return n().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (t.prev = 0, e.bleInstance) {
                t.next = 1;
                break
              }
              return console.error("bleInstance不存在"), t.abrupt("return");
            case 1:
              return wx.showLoading({
                title: "重新连接中"
              }), t.next = 2, e.bleInstance.connectBlue();
            case 2:
              return t.next = 3, e.setMTU();
            case 3:
              wx.hideLoading(), wx.showToast({
                title: "连接成功"
              }), e.statePd && e.sendDp({
                dpValue: e.statePd
              }), t.next = 5;
              break;
            case 4:
              t.prev = 4, t.catch(0), wx.hideLoading(), wx.showToast({
                title: "操作失败，请尝试退出并重新连接"
              });
            case 5:
            case "end":
              return t.stop()
          }
        }), t, null, [
          [0, 4]
        ])
      })))()
    },
    setMTU: function() {
      var e = this;
      return o(n().mark((function t() {
        var o, a, s, i, r, u, l;
        return n().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (t.prev = 0, o = wx.getDeviceInfo(), a = o.platform, c.logger.info("用户的手机平台", a), "ios" !== a) {
                t.next = 2;
                break
              }
              return t.next = 1, wx.getBLEMTU({
                deviceId: e.data.device.deviceId,
                writeType: "writeNoResponse"
              });
            case 1:
              s = t.sent, i = s.mtu, console.log("IOSmtu", i), e.mtu = i, t.next = 4;
              break;
            case 2:
              return t.next = 3, e.bleInstance.setBLEMTU(128);
            case 3:
              r = t.sent, u = r.mtu, console.log("androidMtu", u), e.mtu = u;
            case 4:
              t.next = 6;
              break;
            case 5:
              t.prev = 5, l = t.catch(0), console.log("MTU初始化失败", l), c.logger.error("MTU初始化失败", l);
            case 6:
            case "end":
              return t.stop()
          }
        }), t, null, [
          [0, 5]
        ])
      })))()
    },
    init: function(e) {
      var t = this;
      return o(n().mark((function a() {
        var r, u, l, p, g, b, m, T, x, C, S, D, y, k, I, E, V, W, M, A, O, L, J, B, R, P, U, N, q, _, j, G, F, Y, Q, z, H, K, X, Z, $, ee;
        return n().wrap((function(a) {
          for (;;) switch (a.prev = a.next) {
            case 0:
              if (t.buildTime = "未获取到", 1 !== getCurrentPages().length) {
                a.next = 1;
                break
              }
              return wx.redirectTo({
                url: "/pages/login/login"
              }), a.abrupt("return");
            case 1:
              return r = e.deviceId, d.globalData.currentDeviceId = r, u = h.find((function(e) {
                return e.deviceId === r
              })), t.setData({
                device: u,
                title: u.name || defaultTitleName
              }), t.bleInstance = v.setNewInstance(r), t.bleInstance.onError((function(e) {
                c.logger.error("bleInstanceOnError", e), wx.hideLoading(), w(o(n().mark((function o() {
                  var a;
                  return n().wrap((function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        a = e.errno, n.next = 1500102 === a ? 1 : 1509003 === a ? 2 : 1509001 === a ? 3 : 1500103 === a ? 4 : 6;
                        break;
                      case 1:
                        return wx.showModal({
                          title: "手机蓝牙未开启",
                          content: '请前往"设置 > 蓝牙"中打开',
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 2:
                        return wx.showModal({
                          title: "未连接上该BLE设备",
                          content: "请尝试退出并重新连接",
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 3:
                        return wx.showModal({
                          title: "连接BLE设备失败",
                          content: "请尝试退出并重新连接",
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 4:
                        return n.next = 5, t.bleInstance.checkIsLoader();
                      case 5:
                        return n.sent ? wx.showModal({
                          content: "该设备当前是Loader系统，请继续升级",
                          showCancel: !1
                        }) : wx.showModal({
                          content: "当前BLE设备获取不到Service/获取不到对应UUID的Service",
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 6:
                        return wx.showModal({
                          content: e.errMsg,
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 7:
                        console.log("sdk报错了", e);
                      case 8:
                      case "end":
                        return n.stop()
                    }
                  }), o)
                }))), 100)
              })), a.next = 2, t.bleInstance.init();
            case 2:
              return t.bleInstance.onReceivePackage((function(e) {
                if ("connect" === e.type)
                  if (e.wxMessage.connected) wx.hideLoading(), t.setData({
                    connectStatus: "connected"
                  }), wx.showToast({
                    title: "连接成功"
                  });
                  else {
                    if ("connecting" === t.bleInstance.connectStatus) return;
                    wx.hideLoading(), t.setData({
                      connectStatus: "noConnected"
                    }), w((function() {
                      wx.showModal({
                        content: "蓝牙已断开，是否尝试重新连接？",
                        confirmText: "重新连接",
                        success: function(e) {
                          var n = e.confirm;
                          e.cancel;
                          n && t.reConnect()
                        }
                      })
                    }), 100)
                  }
              })), a.prev = 3, wx.showLoading({
                title: "连接设备中"
              }), a.next = 4, t.bleInstance.connectBlue();
            case 4:
              a.next = 6;
              break;
            case 5:
              a.prev = 5, $ = a.catch(3), c.logger.error("connectBlueError", $), wx.showToast({
                title: $.errMsg
              });
            case 6:
              return a.next = 7, t.setMTU();
            case 7:
              return c.logger.info("setMTU", t.mtu), a.prev = 8, t.setData({
                showSkeleton: !0
              }), a.next = 9, t.getCuiVersion();
            case 9:
              return a.next = 10, t.checkAuth();
            case 10:
              l = a.sent, a.next = 12;
              break;
            case 11:
              return a.prev = 11, ee = a.catch(8), c.logger.error("getCuiVersionError,checkAuthError", ee), wx.showToast({
                title: ee,
                icon: "error"
              }), t.setData({
                showSkeleton: !1
              }), a.abrupt("return");
            case 12:
              l = JSON.parse(l), console.log("data", l), g = (p = l).type, b = p.style, m = p.styleConfig, T = p.showSettingBtn, x = void 0 !== T && T, C = p.showOTA, S = void 0 !== C && C, D = p.showEditCommand, y = void 0 !== D && D, k = p.showEditSceWords, I = void 0 !== k && k, E = p.showAllWords, V = void 0 !== E && E, W = p.showEditWakeWords, M = void 0 !== W && W, A = p.showEditCmdWords, O = void 0 !== A && A, L = p.protocolJson, J = p.specialJson, B = p.initialRules, R = p.attributeRules, P = p.judgeRules, U = p.commandWords, N = p.user, q = p.attributeDebounceTimeout, _ = void 0 === q ? 0 : q, j = p.sendDebounceTimeout, G = void 0 === j ? 500 : j, F = p.attributeDelayTimeout, Y = void 0 === F ? 0 : F, u.type = g, wx.setStorageSync("deviceList", h), t.bleInstance.onReceivePackage((function(e) {
                console.log("接收到数据", e);
                var n = e.type;
                if ("adapterStateChange" === n) e.wxMessage.available || (t.setData({
                  connectStatus: "noConnected"
                }), wx.showModal({
                  title: "手机蓝牙未开启",
                  content: '请前往"设置 > 蓝牙"中打开',
                  showCancel: !1
                }));
                else if ("characteristicChange" === n) {
                  var o = e.wxMessage,
                    a = (0, s.ab2hex)(o.value);
                  if (c.logger.info("characteristicChange", {
                      deviceId: t.data.device.deviceId,
                      hexStr: a
                    }), console.log("hexStr", a), !P) return;
                  var r = P.find((function(e) {
                    var t = e.position,
                      n = e.value;
                    return a.substr(2 * t, 2) == n
                  }));
                  if (r)
                    if ("attribute" === r.type) {
                      if (t.waitReply) return;
                      var u = (0, i.parsrAttributeRules)({
                        rules: R,
                        str: a,
                        deviceStatus: t.data.deviceStatus
                      });
                      f((function() {
                        t.setData({
                          deviceStatus: u
                        })
                      }), Y || 0)
                    } else {
                      clearTimeout(Q);
                      var l = (0, i.initialData)({
                          protocols: L,
                          initialRules: B,
                          str: a
                        }),
                        d = (0, i.convertProtocolJson)(l),
                        h = d.statusJson,
                        v = d.uiJson;
                      console.log("statusJson", h), console.log("uiJson", v), t.setData({
                        showSkeleton: !1,
                        uiJson: v,
                        deviceStatus: h,
                        type: g,
                        style: b.toLowerCase(),
                        styleConfig: m,
                        commandWords: U,
                        showSettingBtn: x,
                        showOTA: S,
                        showAllWords: V,
                        showEditWakeWords: M,
                        showEditCmdWords: O,
                        showEditCommand: y,
                        showEditSceWords: I,
                        user: N,
                        sendDebounceTimeout: G,
                        attributeDebounceTimeout: _
                      }, (function() {
                        t.bleInstance.sendDp({
                          dpValue: H.value
                        })
                      }))
                    }
                  else c.logger.error("不识别的报文", e), console.error("不识别的报文")
                }
              })), z = null == J ? void 0 : J.find((function(e) {
                return "initial" === e.type
              })), H = null == J ? void 0 : J.find((function(e) {
                return "searchState" === e.type
              })), t.statePd = null == H ? void 0 : H.value, z ? (t.bleInstance.sendDp({
                dpValue: z.value
              }), Q = setTimeout((function() {
                wx.showModal({
                  title: "超时",
                  content: "等待初始化超时，请退出然后重新连接",
                  showCancel: !1
                })
              }), 1e4)) : (K = (0, i.convertProtocolJson)(L), X = K.statusJson, Z = K.uiJson, console.log("statusJson", X), console.log("uiJson", Z), t.setData({
                showSkeleton: !1,
                uiJson: Z,
                deviceStatus: X,
                type: g,
                style: b.toLowerCase(),
                styleConfig: m,
                commandWords: U,
                showSettingBtn: x,
                showOTA: S,
                showAllWords: V,
                showEditWakeWords: M,
                showEditCmdWords: O,
                showEditCommand: y,
                showEditSceWords: I,
                user: N,
                sendDebounceTimeout: G,
                attributeDebounceTimeout: _
              }, (function() {
                H && t.bleInstance.sendDp({
                  dpValue: H.value
                })
              })));
            case 13:
            case "end":
              return a.stop()
          }
        }), a, null, [
          [3, 5],
          [8, 11]
        ])
      })))()
    },
    initWithoutCuiVersion: function(e) {
      var t = this;
      return o(n().mark((function a() {
        var r, u, l, p, g, b, m, T, x, C, S, D, y, k, I, E, V, W, M, A, O, L, J, B, R, P, U, N, q, _, j, G, F, Y, Q, z, H, K, X, Z, $;
        return n().wrap((function(a) {
          for (;;) switch (a.prev = a.next) {
            case 0:
              if (t.setData({
                  showSkeleton: !0
                }), t.buildTime = "未获取到", 1 !== getCurrentPages().length) {
                a.next = 1;
                break
              }
              return wx.redirectTo({
                url: "/pages/login/login"
              }), a.abrupt("return");
            case 1:
              return r = e.deviceId, d.globalData.currentDeviceId = r, u = h.find((function(e) {
                return e.deviceId === r
              })), t.setData({
                device: u,
                title: u.name || defaultTitleName
              }), t.bleInstance = v.setNewInstance(r), t.bleInstance.onError((function(e) {
                c.logger.error("bleInstanceOnError", e), wx.hideLoading(), w(o(n().mark((function o() {
                  var a;
                  return n().wrap((function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        a = e.errno, n.next = 1500102 === a ? 1 : 1509003 === a ? 2 : 1509001 === a ? 3 : 1500103 === a ? 4 : 6;
                        break;
                      case 1:
                        return wx.showModal({
                          title: "手机蓝牙未开启",
                          content: '请前往"设置 > 蓝牙"中打开',
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 2:
                        return wx.showModal({
                          title: "未连接上该BLE设备",
                          content: "请尝试退出并重新连接",
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 3:
                        return wx.showModal({
                          title: "连接BLE设备失败",
                          content: "请尝试退出并重新连接",
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 4:
                        return n.next = 5, t.bleInstance.checkIsLoader();
                      case 5:
                        return n.sent ? wx.showModal({
                          content: "该设备当前是Loader系统，请继续升级",
                          showCancel: !1
                        }) : wx.showModal({
                          content: "当前BLE设备获取不到Service/获取不到对应UUID的Service",
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 6:
                        return wx.showModal({
                          content: e.errMsg,
                          showCancel: !1
                        }), n.abrupt("continue", 7);
                      case 7:
                        console.log("sdk报错了", e);
                      case 8:
                      case "end":
                        return n.stop()
                    }
                  }), o)
                }))), 100)
              })), a.next = 2, t.bleInstance.init();
            case 2:
              return t.bleInstance.onReceivePackage((function(e) {
                if ("connect" === e.type)
                  if (e.wxMessage.connected) wx.hideLoading(), t.setData({
                    connectStatus: "connected"
                  }), wx.showToast({
                    title: "连接成功"
                  });
                  else {
                    if ("connecting" === t.bleInstance.connectStatus) return;
                    wx.hideLoading(), t.setData({
                      connectStatus: "noConnected"
                    }), w((function() {
                      wx.showModal({
                        content: "蓝牙已断开，是否尝试重新连接？",
                        confirmText: "重新连接",
                        success: function(e) {
                          var n = e.confirm;
                          e.cancel;
                          n && t.reConnect()
                        }
                      })
                    }), 100)
                  }
              })), a.prev = 3, wx.showLoading({
                title: "连接设备中"
              }), a.next = 4, t.bleInstance.connectBlue();
            case 4:
              a.next = 6;
              break;
            case 5:
              a.prev = 5, $ = a.catch(3), c.logger.error("connectBlueError", $), wx.showToast({
                title: $.errMsg
              });
            case 6:
              return a.next = 7, t.setMTU();
            case 7:
              c.logger.info("setMTU", t.mtu), l = e.data, console.log("data", l), g = (p = l).type, b = p.style, m = p.styleConfig, T = p.showSettingBtn, x = void 0 !== T && T, C = p.showOTA, S = void 0 !== C && C, D = p.showEditCommand, y = void 0 !== D && D, k = p.showEditSceWords, I = void 0 !== k && k, E = p.showAllWords, V = void 0 !== E && E, W = p.showEditWakeWords, M = void 0 !== W && W, A = p.showEditCmdWords, O = void 0 !== A && A, L = p.protocolJson, J = p.specialJson, B = p.initialRules, R = p.attributeRules, P = p.judgeRules, U = p.commandWords, N = p.user, q = p.attributeDebounceTimeout, _ = void 0 === q ? 0 : q, j = p.sendDebounceTimeout, G = void 0 === j ? 500 : j, F = p.attributeDelayTimeout, Y = void 0 === F ? 0 : F, u.type = g, wx.setStorageSync("deviceList", h), t.bleInstance.onReceivePackage((function(e) {
                console.log("接收到数据", e);
                var n = e.type;
                if ("adapterStateChange" === n) e.wxMessage.available || (t.setData({
                  connectStatus: "noConnected"
                }), wx.showModal({
                  title: "手机蓝牙未开启",
                  content: '请前往"设置 > 蓝牙"中打开',
                  showCancel: !1
                }));
                else if ("characteristicChange" === n) {
                  var o = e.wxMessage,
                    a = (0, s.ab2hex)(o.value);
                  if (c.logger.info("characteristicChange", {
                      deviceId: t.data.device.deviceId,
                      hexStr: a
                    }), console.log("hexStr", a), !P) return;
                  var r = P.find((function(e) {
                    var t = e.position,
                      n = e.value;
                    return a.substr(2 * t, 2) == n
                  }));
                  if (r)
                    if ("attribute" === r.type) {
                      if (t.waitReply) return;
                      var u = (0, i.parsrAttributeRules)({
                        rules: R,
                        str: a,
                        deviceStatus: t.data.deviceStatus
                      });
                      f((function() {
                        t.setData({
                          deviceStatus: u
                        })
                      }), Y || 0)
                    } else {
                      clearTimeout(Q);
                      var l = (0, i.initialData)({
                          protocols: L,
                          initialRules: B,
                          str: a
                        }),
                        d = (0, i.convertProtocolJson)(l),
                        h = d.statusJson,
                        v = d.uiJson;
                      console.log("statusJson", h), console.log("uiJson", v), t.setData({
                        showSkeleton: !1,
                        uiJson: v,
                        deviceStatus: h,
                        type: g,
                        style: b.toLowerCase(),
                        styleConfig: m,
                        commandWords: U,
                        showSettingBtn: x,
                        showOTA: S,
                        showAllWords: V,
                        showEditWakeWords: M,
                        showEditCmdWords: O,
                        showEditCommand: y,
                        showEditSceWords: I,
                        user: N,
                        sendDebounceTimeout: G,
                        attributeDebounceTimeout: _
                      }, (function() {
                        t.bleInstance.sendDp({
                          dpValue: H.value
                        })
                      }))
                    }
                  else c.logger.error("不识别的报文", e), console.error("不识别的报文")
                }
              })), z = null == J ? void 0 : J.find((function(e) {
                return "initial" === e.type
              })), H = null == J ? void 0 : J.find((function(e) {
                return "searchState" === e.type
              })), t.statePd = null == H ? void 0 : H.value, z ? (t.bleInstance.sendDp({
                dpValue: z.value
              }), Q = setTimeout((function() {
                wx.showModal({
                  title: "超时",
                  content: "等待初始化超时，请退出然后重新连接",
                  showCancel: !1
                })
              }), 1e4)) : (K = (0, i.convertProtocolJson)(L), X = K.statusJson, Z = K.uiJson, console.log("statusJson", X), console.log("uiJson", Z), t.setData({
                showSkeleton: !1,
                uiJson: Z,
                deviceStatus: X,
                type: g,
                style: b.toLowerCase(),
                styleConfig: m,
                commandWords: U,
                showSettingBtn: x,
                showOTA: S,
                showAllWords: V,
                showEditWakeWords: M,
                showEditCmdWords: O,
                showEditCommand: y,
                showEditSceWords: I,
                user: N,
                sendDebounceTimeout: G,
                attributeDebounceTimeout: _
              }, (function() {
                H && t.bleInstance.sendDp({
                  dpValue: H.value
                })
              })));
            case 8:
            case "end":
              return a.stop()
          }
        }), a, null, [
          [3, 5]
        ])
      })))()
    },
    getCuiVersion: function() {
      var e = this;
      return new Promise(function() {
        var t = o(n().mark((function t(a, s) {
          var i;
          return n().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                e.bleInstance || s("bleInstance未初始化"), i = function(t) {
                    console.log("接收到CuiVersion数据", t);
                    for (var n = t.wxMessage, o = new Uint8Array(n.value), a = "", s = 0; s < o.length; s++) a += String.fromCharCode(o[s]);
                    if (console.log("receivedString", a), a.startsWith("cui_version")) {
                      var i = a.split(",");
                      console.log("splitArr", i);
                      var r = i[0],
                        c = i[1],
                        u = i[2],
                        l = i[3],
                        d = i[4];
                      r && r.startsWith("cui_version") && (e.CuiVersion = r.substring(12), console.log("cuiVserion", e.CuiVersion)), c && c.startsWith("date") && (e.buildTime = c.substring(5), console.log("buildTime", e.buildTime)), u && u.startsWith("product_id") && (e.productId = u.substring(11), console.log("productId", e.productId)), l && l.startsWith("mac") && (e.mac = l.substring(4), console.log("mac", e.mac)), d && d.startsWith("ota_v") && (e.otaVersion = d.substring(7), console.log("otaVersion", e.otaVersion))
                    }
                  }, e.bleInstance.onReceivePackage(i), e.bleInstance.sendStr({
                    dpValue: "get_cui_version"
                  }), e.checkCuiVersionTimeOutFlag = !1, setTimeout((function() {
                    e.checkCuiVersionTimeOutFlag = !0
                  }), 1e3),
                  function() {
                    return new Promise((function(t) {
                      var n = function() {
                        e.CuiVersion || e.checkCuiVersionTimeOutFlag ? t() : setTimeout(n, 0)
                      };
                      n()
                    }))
                  }().then(o(n().mark((function t() {
                    return n().wrap((function(t) {
                      for (;;) switch (t.prev = t.next) {
                        case 0:
                          e.bleInstance.offReceivePackage(i), e.CuiVersion ? (console.log("this.CuiVersion", e.CuiVersion), a(e.CuiVersion)) : (e.judgeLoader(), s("未拿到CUI的版本号"), c.logger.error("未拿到CUI的版本号"));
                        case 1:
                        case "end":
                          return t.stop()
                      }
                    }), t)
                  }))));
              case 1:
              case "end":
                return t.stop()
            }
          }), t)
        })));
        return function(e, n) {
          return t.apply(this, arguments)
        }
      }())
    },
    checkAuth: function() {
      var e = this;
      return new Promise(function() {
        var t = o(n().mark((function t(a, i) {
          var c, u, l, d;
          return n().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return e.bleInstance || i("bleInstance未初始化"), t.next = 1, (0, r.getToken)();
              case 1:
                if (0 == (c = t.sent).code) {
                  t.next = 2;
                  break
                }
                return i(c.message), t.abrupt("return");
              case 2:
                u = c.data, l = function(t) {
                  var n = t.wxMessage,
                    o = (0, s.ab2hex)(n.value);
                  console.log("接收到加密数据", o), o.startsWith("746f6b656e5f6275663a") && (e.sign = o.substring(20))
                }, e.bleInstance.onReceivePackage(l), e.bleInstance.sendStr({
                  dpValue: "get_tk:".concat(u)
                }), e.checkAuthTimeOutFlag = !1, setTimeout((function() {
                  e.checkAuthTimeOutFlag = !0
                }), 1e3), d = function() {
                  return new Promise((function(t) {
                    var n = function() {
                      e.sign || e.checkAuthTimeOutFlag ? t() : setTimeout(n, 0)
                    };
                    n()
                  }))
                }, d().then(o(n().mark((function t() {
                  var o, s, c, d;
                  return n().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (e.bleInstance.offReceivePackage(l), e.sign) {
                          t.next = 1;
                          break
                        }
                        i("芯片未烧录key"), t.next = 4;
                        break;
                      case 1:
                        return t.next = 2, (0, r.verifyToken)(e.CuiVersion, u, e.sign);
                      case 2:
                        if (o = t.sent, s = o.data, c = o.code, d = o.message, 0 == c) {
                          t.next = 3;
                          break
                        }
                        return i(d), t.abrupt("return");
                      case 3:
                        a(s);
                      case 4:
                      case "end":
                        return t.stop()
                    }
                  }), t)
                }))));
              case 3:
              case "end":
                return t.stop()
            }
          }), t)
        })));
        return function(e, n) {
          return t.apply(this, arguments)
        }
      }())
    },
    handleGoToOTA: function() {
      "connected" === this.data.connectStatus ? (this.isGoToOTA = !0, wx.offBLEConnectionStateChange(), wx.offBLECharacteristicValueChange(), wx.offBluetoothAdapterStateChange(), wx.redirectTo({
        url: "/pages/OTA/OTA?device=".concat(JSON.stringify(this.data.device), "&cuiVersion=").concat(this.CuiVersion, "&buildTime=").concat(this.buildTime)
      })) : wx.showToast({
        title: "请先连接上设备"
      })
    },
    handleTapSetting: function() {
      "connected" === this.data.connectStatus ? (d.globalData.bleInstance = this.bleInstance, this.isGoToSetting = !0, wx.navigateTo({
        url: "/V2/pages/setting/setting?cuiVersion=".concat(this.CuiVersion, "&device=").concat(JSON.stringify(this.data.device), "&buildTime=").concat(this.buildTime, "&showOTA=").concat(this.data.showOTA, "&showEditCommand=").concat(this.data.showEditCommand, "&showEditSceWords=").concat(this.data.showEditSceWords, "&showAllWords=").concat(this.data.showAllWords, "&showEditWakeWords=").concat(this.data.showEditWakeWords, "&showEditCmdWords=").concat(this.data.showEditCmdWords, "&productId=").concat(this.productId, "&mac=").concat(this.mac, "&otaVersion=").concat(this.otaVersion)
      })) : wx.showToast({
        title: "请先连接上设备"
      })
    },
    handleGoToEditCommand: function() {
      "connected" === this.data.connectStatus ? (d.globalData.bleInstance = this.bleInstance, this.isGoToEditCommand = !0, wx.navigateTo({
        url: "/pages/editCommand/EditCommand?cuiVersion=".concat(this.CuiVersion, "&deviceId=").concat(this.data.device.deviceId)
      })) : wx.showToast({
        title: "请先连接上设备"
      })
    },
    destroy: function() {
      var e = arguments,
        t = this;
      return o(n().mark((function o() {
        var a;
        return n().wrap((function(n) {
          for (;;) switch (n.prev = n.next) {
            case 0:
              if (!((a = e.length > 0 && void 0 !== e[0] ? e[0] : {}).noDestroy || t.isGoToSetting || t.isGoToOTA)) {
                n.next = 1;
                break
              }
              return n.abrupt("return");
            case 1:
              if (console.log("disconnect"), a.disconnectProtocol && t.bleInstance.sendDp({
                  dpValue: a.disconnectProtocol
                }), !t.bleInstance) {
                n.next = 3;
                break
              }
              return n.next = 2, t.bleInstance.destroy();
            case 2:
              t.bleInstance = void 0;
            case 3:
              d.globalData.currentDeviceId = "";
            case 4:
            case "end":
              return n.stop()
          }
        }), o)
      })))()
    },
    judgeLoader: function() {
      wx.offBLEConnectionStateChange(), wx.offBLECharacteristicValueChange(), wx.offBluetoothAdapterStateChange();
      var e = wx.getDeviceInfo(),
        n = new u.BluetoothOTAManager(e.platform),
        o = n.getConfigure();
      o.isUseAuth = !0, o.changeMTU = 512, o.isAutoTestOTA = !1, o.autoTestOTACount = 20, n.setConfigure(o);
      var a = this.data.device,
        s = new l.OnRcspCallback;
      s.onMandatoryUpgrade = function(e) {
        e.deviceId === a.deviceId && (wx.showToast({
          title: "检测到当前设备是需要强制升级的设备，即将跳转OTA页"
        }), n.unregisterRcspCallback(s), wx.offBLEConnectionStateChange(), wx.offBLEMTUChange(), wx.offBLECharacteristicValueChange(), n = void 0, wx.navigateTo({
          url: "/pages/OTA/OTA?device=".concat(JSON.stringify(a))
        }))
      }, n.registerRcspCallback(s), n.connectDevice(t(t({}, a), {}, {
        isConnected: !0
      }))
    },
    onShowCb: function() {
      this.isGoToSetting = !1, this.isGoToOTA = !1
    },
    onShareAppMessage: function() {
      return {
        title: "慧居管家",
        path: "pages/login/login"
      }
    }
  }
});
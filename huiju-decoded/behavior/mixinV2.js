Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../@babel/runtime/helpers/defineProperty"),
  a = require("../V2/utils/util"),
  o = require("../V2/utils/protocol"),
  s = require("../utils/logger"),
  i = getApp(),
  r = i.globalData.deviceList,
  c = i.globalData.bleService,
  l = (0, a.debounce)(),
  u = (0, a.debounce)();
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
    commandWordsConfig: null,
    category: "",
    showSkeleton: !0
  },
  statePd: "",
  bleInstance: null,
  mtu: 20,
  checkAuthTimeOutFlag: "",
  sign: "",
  checkCuiVersionTimeOutFlag: !0,
  CuiVersion: null,
  methods: {
    onPageScroll: function(e) {
      var t = this;
      l((function() {
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
        n = e.dpValue;
      u((function() {
        t.bleInstance.sendDp({
          dpValue: n
        })
      }), 500)
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
        a = t.type,
        o = t.label,
        s = t.protocol,
        i = t.value,
        r = "deviceStatus.".concat(a, ".").concat(o, ".value");
      this.setData(n({}, r, i)), this.sendDp({
        dpValue: s
      })
    },
    handleCounterChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.label,
        s = t.protocol,
        i = t.value,
        r = "deviceStatus.".concat(a, ".").concat(o, ".value");
      this.setData(n({}, r, i)), this.sendDp({
        dpValue: s
      })
    },
    handleModeChange: function(e) {
      var t = this,
        a = e.detail,
        o = a.type,
        s = a.label,
        i = a.protocol,
        r = a.status,
        c = a.displayName,
        l = r ? "open" : "close",
        u = i.find((function(e) {
          return e.key === l
        }));
      if (u) {
        var d = this.data.deviceStatus[o][s];
        Object.keys(d).forEach((function(e) {
          var n = r;
          if (e === c) d[e] = n;
          else if (n) {
            var i = t.data.uiJson.find((function(e) {
              return e.type === o && e.label === s
            })).children;
            if (i) {
              var l = i.find((function(t) {
                return t.displayName === e
              }));
              l && l.isMutex && a.isMutex && (d[e] = !1)
            }
          }
        }));
        var f = "deviceStatus.".concat(o, ".").concat(s);
        this.setData(n({}, f, d)), this.sendDp({
          dpValue: u.value
        })
      }
    },
    handleModeExcludeChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.label,
        s = t.protocol,
        i = t.status,
        r = t.displayName,
        c = s.find((function(e) {
          return e.key === i
        }));
      if (c) {
        var l = this.data.deviceStatus[a][o];
        Object.keys(l).forEach((function(e) {
          var t = "open" === i;
          e === r ? l[e] = t : t && (l[e] = !1)
        }));
        var u = "deviceStatus.".concat(a, ".").concat(o);
        this.setData(n({}, u, l)), this.sendDp({
          dpValue: c.value
        })
      }
    },
    handleSwitchChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.protocol,
        s = t.status,
        i = t.displayName,
        r = o.find((function(e) {
          var t = s ? "open" : "close";
          return e.key === t
        })),
        c = "deviceStatus.".concat(a, ".").concat(i);
      this.setData(n({}, c, s)), this.sendDp({
        dpValue: r.value
      })
    },
    reConnect: function() {
      var n = this;
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (e.prev = 0, n.bleInstance) {
                e.next = 1;
                break
              }
              return console.error("bleInstance不存在"), e.abrupt("return");
            case 1:
              return wx.showLoading({
                title: "重新连接中"
              }), e.next = 2, n.bleInstance.connectBlue();
            case 2:
              wx.hideLoading(), wx.showToast({
                title: "连接成功"
              }), n.statePd && n.sendDp({
                dpValue: n.statePd
              }), e.next = 4;
              break;
            case 3:
              e.prev = 3, e.catch(0), wx.hideLoading(), wx.showToast({
                title: "操作失败，请尝试退出并重新连接"
              });
            case 4:
            case "end":
              return e.stop()
          }
        }), t, null, [
          [0, 3]
        ])
      })))()
    },
    init: function(n) {
      var l = this;
      return t(e().mark((function t() {
        var d, f, h, p, v, g, w, b, x, m, y, D, S, C, I, k, J, M, V, P, T;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (d = n.options, f = n.defaultTitleName, h = n.fanProtocol, p = n.warmerProtocol, v = h.specialJson, g = void 0 === v ? [] : v, w = h.judgeRules, b = void 0 === w ? [] : w, S = [], C = [], 1 !== getCurrentPages().length) {
                e.next = 1;
                break
              }
              return wx.redirectTo({
                url: "/pages/login/login"
              }), e.abrupt("return");
            case 1:
              return I = d.deviceId, i.globalData.currentDeviceId = I, k = r.find((function(e) {
                return e.deviceId === I
              })), l.setData({
                device: k,
                title: k.name || f
              }), l.bleInstance = c.setNewInstance(I), l.bleInstance.onError((function(e) {
                s.logger.error("bleInstanceOnError", e), wx.hideLoading(), u((function() {
                  switch (e.errno) {
                    case 1500102:
                      wx.showModal({
                        title: "手机蓝牙未开启",
                        content: '请前往"设置 > 蓝牙"中打开',
                        showCancel: !1
                      });
                      break;
                    case 1509003:
                      wx.showModal({
                        title: "未连接上该BLE设备",
                        content: "请尝试退出并重新连接",
                        showCancel: !1
                      });
                      break;
                    case 1509001:
                      wx.showModal({
                        title: "连接BLE设备失败",
                        content: "请尝试退出并重新连接",
                        showCancel: !1
                      });
                      break;
                    default:
                      wx.showModal({
                        content: e.errMsg,
                        showCancel: !1
                      })
                  }
                  console.log("sdk报错了", e)
                }), 100)
              })), l.bleInstance.onReceivePackage((function(e) {
                console.log("接收到数据", e);
                var t = e.type;
                if ("connect" === t)
                  if (e.wxMessage.connected) wx.hideLoading(), l.setData({
                    connectStatus: "connected"
                  }), wx.showToast({
                    title: "连接成功"
                  });
                  else {
                    if ("connecting" === l.bleInstance.connectStatus) return;
                    wx.hideLoading(), l.setData({
                      connectStatus: "noConnected"
                    }), u((function() {
                      wx.showModal({
                        content: "蓝牙已断开，是否尝试重新连接？",
                        confirmText: "重新连接",
                        success: function(e) {
                          var t = e.confirm;
                          e.cancel;
                          t && l.reConnect()
                        }
                      })
                    }), 100)
                  }
                else if ("adapterStateChange" === t) {
                  e.wxMessage.available || (l.setData({
                    connectStatus: "noConnected"
                  }), wx.showModal({
                    title: "手机蓝牙未开启",
                    content: '请前往"设置 > 蓝牙"中打开',
                    showCancel: !1
                  }))
                } else if ("characteristicChange" === t) {
                  var n = e.wxMessage,
                    i = (0, a.ab2hex)(n.value);
                  s.logger.info("characteristicChange", {
                    deviceId: l.data.device.deviceId,
                    hexStr: i
                  }), console.log("hexStr", i);
                  var r = b.find((function(e) {
                    var t = e.position,
                      n = e.value;
                    return i.substr(2 * t, 2) == n
                  }));
                  if (console.log("judgeRules", b), r)
                    if ("attribute" === r.type) {
                      if (!C) return void wx.showToast({
                        title: "未发送初始化协议"
                      });
                      var c = (0, o.parsrAttributeRules)({
                        rules: C,
                        str: i,
                        deviceStatus: l.data.deviceStatus
                      });
                      l.setData({
                        deviceStatus: c
                      })
                    } else {
                      var d = {
                        "00": "fan",
                        "01": "warmer"
                      } [i.substr(6, 2)] || "unknown";
                      if ("fan" === d) x = h.protocolJson, S = h.initialRules, C = h.attributeRules, m = h.commandWords, y = h.style, D = h.styleConfig;
                      else {
                        if ("warmer" !== d) return void wx.showToast({
                          title: "初始化协议错误"
                        });
                        x = p.protocolJson, S = p.initialRules, C = p.attributeRules, m = p.commandWords, y = p.style, D = p.styleConfig
                      }
                      var f = (0, o.initialData)({
                          protocols: x,
                          initialRules: S,
                          str: i
                        }),
                        v = (0, o.convertProtocolJson)(f),
                        g = v.statusJson,
                        w = v.uiJson,
                        I = w.find((function(e) {
                          return "commandWordsConfig" === e.type
                        }));
                      console.log("statusJson", g), console.log("uiJson", w), console.log("commandWords", m), l.setData({
                        uiJson: w,
                        deviceStatus: g,
                        commandWordsConfig: I,
                        commandWords: m,
                        type: d,
                        showSkeleton: !1,
                        style: y,
                        styleConfig: D
                      }, (function() {
                        l.bleInstance.sendDp({
                          dpValue: M.value
                        })
                      }))
                    }
                  else s.logger.error("不识别的报文", e), console.error("不识别的报文"), wx.showToast({
                    title: "不识别的报文"
                  })
                }
              })), e.next = 2, l.bleInstance.init();
            case 2:
              return wx.showLoading({
                title: "连接设备中"
              }), e.next = 3, l.bleInstance.connectBlue();
            case 3:
              J = g.find((function(e) {
                return "initial" === e.type
              })), M = g.find((function(e) {
                return "searchState" === e.type
              })), l.statePd = M.value, J ? l.bleInstance.sendDp({
                dpValue: J.value
              }) : (V = (0, o.convertProtocolJson)(x), P = V.statusJson, T = V.uiJson, console.log("statusJson", P), console.log("uiJson", T), l.setData({
                uiJson: T,
                deviceStatus: P
              }, (function() {
                M && l.bleInstance.sendDp({
                  dpValue: M.value
                })
              })));
            case 4:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    destroy: function(n) {
      var a = this;
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (console.log("disconnect"), n && a.bleInstance.sendDp({
                  dpValue: n
                }), !a.bleInstance) {
                e.next = 2;
                break
              }
              return e.next = 1, a.bleInstance.destroy();
            case 1:
              a.bleInstance = void 0;
            case 2:
              i.globalData.currentDeviceId = "";
            case 3:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    onShareAppMessage: function() {
      return {
        title: "慧居管家",
        path: "pages/login/login"
      }
    }
  }
});
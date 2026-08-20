require("../@babel/runtime/helpers/Arrayincludes"), require("../@babel/runtime/helpers/Arrayincludes"), require("../@babel/runtime/helpers/Arrayincludes"), Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/asyncToGenerator");
require("../@babel/runtime/helpers/Arrayincludes");
var a, n = require("../@babel/runtime/helpers/defineProperty"),
  o = require("../utils/util"),
  i = require("../utils/logger"),
  s = getApp(),
  c = s.globalData.deviceList,
  r = s.globalData.bleService,
  l = (0, o.debounce)(),
  u = (0, o.debounce)(),
  d = (0, o.debounce)();
exports.default = Behavior({
  data: {
    device: null,
    title: "",
    protocolJson: null,
    deviceStatus: null,
    showNavDefaultBg: !1,
    connectStatus: "noConnected",
    userCommandWords: {},
    isAllAttributeUp: !1
  },
  user: "",
  waitReply: !1,
  statePd: "",
  mtu: 20,
  methods: {
    onPageScroll: function(e) {
      var t = this;
      l((function() {
        var a = e.scrollTop;
        Math.abs(a) < 1 ? t.setData({
          showNavDefaultBg: !1
        }) : t.setData({
          showNavDefaultBg: !0
        })
      }), 100)
    },
    sendDp: function(e) {
      var t = this,
        n = e.dpValue;
      d((function() {}), 0), u((function() {
        t.waitReply = !0, a.sendDp({
          dpValue: n
        })
      }), 300)
    },
    handleMainSwitchChange: function() {
      var e, t = !this.data.deviceStatus.mainSwitch.status,
        a = this.data.protocolJson.mainSwitch.protocol;
      e = t ? a.find((function(e) {
        return "open" === e.key
      })).value : a.find((function(e) {
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
        i = t.title,
        s = t.protocol,
        c = t.value,
        r = i ? "deviceStatus.".concat(a, ".").concat(o, ".").concat(i, ".value") : "deviceStatus.".concat(a, ".").concat(o, ".value");
      this.setData(n({}, r, c)), this.sendDp({
        dpValue: s
      })
    },
    handleCounterChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.label,
        i = t.title,
        s = t.protocol,
        c = t.value,
        r = i ? "deviceStatus.".concat(a, ".").concat(o, ".").concat(i, ".value") : "deviceStatus.".concat(a, ".").concat(o, ".value");
      this.setData(n({}, r, c)), this.sendDp({
        dpValue: s
      })
    },
    handleModeChange: function(e) {
      var t, a, o = e.detail,
        i = o.type,
        s = o.label,
        c = o.title,
        r = o.protocol,
        l = o.status,
        u = o.value,
        d = r.find((function(e) {
          return e.key === l
        }));
      if (("close" !== l || "lenfeng" !== u || !["HP21241SR", "HP21242SR"].includes(null == this || null === (t = this.data) || void 0 === t || null === (a = t.device) || void 0 === a ? void 0 : a.localName)) && ("wengan" === u && "FB15178DR" === this.data.protocolJson.commandWordsConfig.value && ("open" === l ? this.setData({
          "deviceStatus.slider.档位.disabled": !0
        }) : this.setData({
          "deviceStatus.slider.档位.disabled": !1
        })), d)) {
        var v = c ? "deviceStatus.".concat(i, ".").concat(s, ".").concat(c, ".").concat(u) : "deviceStatus.".concat(i, ".").concat(s, ".").concat(u),
          h = "open" === l;
        this.setData(n({}, v, h)), this.sendDp({
          dpValue: d.value
        })
      }
    },
    handleModeExcludeChange: function(e) {
      var t, a, o = e.detail,
        i = o.type,
        s = o.label,
        c = o.protocol,
        r = o.status,
        l = o.value,
        u = c.find((function(e) {
          return e.key === r
        }));
      if (("close" !== r || "lenfeng" !== l || !["HP21241SR", "HP21242SR"].includes(null == this || null === (t = this.data) || void 0 === t || null === (a = t.device) || void 0 === a ? void 0 : a.localName)) && ("wengan" === l && "FB15178DR" === this.data.protocolJson.commandWordsConfig.value && ("open" === r ? this.setData({
          "deviceStatus.slider.档位.disabled": !0
        }) : this.setData({
          "deviceStatus.slider.档位.disabled": !1
        })), u)) {
        var d = this.data.deviceStatus[i][s];
        Object.keys(d).forEach((function(e) {
          var t = "open" === r;
          e === l ? d[e] = t : t && (d[e] = !1)
        }));
        var v = "deviceStatus.".concat(i, ".").concat(s);
        this.setData(n({}, v, d)), "open" === r && "ruide" === this.user && this.setData({
          "deviceStatus.bofeiFanYaoTou.空调风.status": !1,
          "deviceStatus.bofeiFanYaoTou.自然风.status": !1
        }), "bofei" === this.user && ("冷风" === s ? this.setData({
          "deviceStatus.modeExclude.暖风": {
            yidang: !1,
            erdang: !1,
            sandang: !1
          }
        }) : "暖风" === s && this.setData({
          "deviceStatus.modeExclude.冷风": {
            yidang: !1,
            erdang: !1,
            sandang: !1
          }
        })), this.sendDp({
          dpValue: u.value
        })
      }
    },
    handleSwitchChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.label,
        i = t.protocol,
        s = t.status,
        c = t.value,
        r = i.find((function(e) {
          return e.key === s
        })),
        l = "deviceStatus.".concat(a, ".").concat(o, ".").concat(c),
        u = "open" === s;
      this.setData(n({}, l, u)), this.sendDp({
        dpValue: r.value
      })
    },
    handleMidSwitchChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.label,
        i = t.protocol,
        s = t.status,
        c = t.value,
        r = i.find((function(e) {
          return e.key === s
        })),
        l = "deviceStatus.".concat(a, ".").concat(o, ".").concat(c),
        u = "open" === s;
      this.setData(n({}, l, u)), this.sendDp({
        dpValue: r.value
      })
    },
    handleLightSliderChange: function(e) {
      var t = e.protocol;
      this.sendDp({
        dpValue: t
      })
    },
    handleFanSwitchChange: function(e) {
      var t = e.detail.status,
        a = e.detail.label,
        o = e.detail.type,
        i = e.detail.protocol.find((function(e) {
          return e.key === t
        }));
      if (i) {
        var s = "deviceStatus.".concat(o, ".").concat(a, ".status"),
          c = "open" === t;
        if ("自然风" === a) {
          var r = "deviceStatus.".concat(o, ".").concat(a, ".children"),
            l = this.data.deviceStatus[o][a].children;
          Object.keys(l).forEach((function(e) {
            l[e] = "yidang" === e
          })), this.setData(n({}, r, l))
        }
        "ruide" === this.user && ["空调风", "自然风"].includes(a) && "open" === t && ("空调风" === a && this.setData({
          "deviceStatus.modeExclude.风模式.normal": !1,
          "deviceStatus.modeExclude.风模式.sleep": !1,
          "deviceStatus.modeExclude.风模式.loop": !1,
          "deviceStatus.modeExclude.风模式.intelligence": !1,
          "deviceStatus.modeExclude.风模式.yingerfeng": !1,
          "deviceStatus.modeExclude.风模式.jingyin": !1,
          "deviceStatus.modeExclude.风模式.baofeng": !1,
          "deviceStatus.bofeiFanYaoTou.自然风.status": !1
        }), "自然风" === a && this.setData({
          "deviceStatus.modeExclude.风模式.normal": !1,
          "deviceStatus.modeExclude.风模式.sleep": !1,
          "deviceStatus.modeExclude.风模式.loop": !1,
          "deviceStatus.modeExclude.风模式.intelligence": !1,
          "deviceStatus.modeExclude.风模式.yingerfeng": !1,
          "deviceStatus.modeExclude.风模式.jingyin": !1,
          "deviceStatus.modeExclude.风模式.baofeng": !1,
          "deviceStatus.bofeiFanYaoTou.空调风.status": !1
        })), this.setData(n({}, s, c));
        var u = i.value;
        this.sendDp({
          dpValue: u
        })
      }
    },
    handleFanModeChange: function(e) {
      console.log("handleFanModeChange", e);
      var t = e.detail,
        a = t.label,
        o = t.value,
        i = t.protocol,
        s = t.status,
        c = t.type,
        r = "deviceStatus.".concat(c, ".").concat(a, ".children.").concat(o),
        l = s ? "open" : "close",
        u = i.find((function(e) {
          return e.key === l
        }));
      if (u) {
        var d, v;
        if (s) {
          var h = "deviceStatus.".concat(c, ".").concat(a, ".children"),
            p = this.data.deviceStatus[c][a].children;
          Object.keys(p).forEach((function(e) {
            p[e] = e === o
          })), this.setData(n({}, h, p))
        } else this.setData(n({}, r, s));
        "FB15178DR" === (null === (d = this.data.protocolJson) || void 0 === d || null === (v = d.commandWordsConfig) || void 0 === v ? void 0 : v.value) && "AA 01 07 04 55" === u.value && (u.value = "AA 01 07 02 55"), this.sendDp({
          dpValue: u.value
        })
      }
    },
    handleYuYinChange: function(e) {
      var t = e.detail,
        a = t.protocol,
        n = t.status;
      this.setData({
        "deviceStatus.yuyin.status": n
      }), this.sendDp({
        dpValue: a
      })
    },
    handlePickerChange: function(e) {
      var t = e.detail,
        a = t.type,
        o = t.label,
        i = t.text,
        s = t.protocol,
        c = this.data.deviceStatus[a][o];
      Object.keys(c).forEach((function(e) {
        c[e] = e === i
      }));
      var r = "deviceStatus.".concat(a, ".").concat(o);
      this.setData(n({}, r, c)), this.sendDp({
        dpValue: s
      })
    },
    reConnect: function() {
      var n = this;
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (e.prev = 0, a) {
                e.next = 1;
                break
              }
              return console.error("bleInstance不存在"), e.abrupt("return");
            case 1:
              return wx.showLoading({
                title: "重新连接中"
              }), e.next = 2, a.connectBlue();
            case 2:
              wx.hideLoading(), wx.showToast({
                title: "连接成功"
              }), n.statePd && a.sendDp({
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
      return t(e().mark((function v() {
        var h, p, f, g, b, S, w, D, x, m, y, C, k, E, R, A, J, V, M, T, P, B, I, q;
        return e().wrap((function(v) {
          for (;;) switch (v.prev = v.next) {
            case 0:
              if (h = n.options, p = n.defaultTitleName, f = n.protocolJson, g = n.specialJson, b = void 0 === g ? [] : g, S = n.initialRules, w = void 0 === S ? [] : S, D = n.attributeRules, x = void 0 === D ? [] : D, m = n.judgeRules, y = void 0 === m ? [] : m, C = n.commandWords, k = void 0 === C ? {} : C, E = n.user, R = void 0 === E ? "" : E, 1 !== getCurrentPages().length) {
                v.next = 1;
                break
              }
              return wx.redirectTo({
                url: "/pages/login/login"
              }), v.abrupt("return");
            case 1:
              return l.user = R, A = b.find((function(e) {
                return "initial" === e.type
              })), J = b.find((function(e) {
                return "searchState" === e.type
              })), V = b.find((function(e) {
                return "queryBinding" === e.type
              })), l.statePd = null == J ? void 0 : J.value, M = h.deviceId, s.globalData.currentDeviceId = M, T = c.find((function(e) {
                return e.deviceId === M
              })), l.setData({
                device: T,
                title: T.name || p
              }), console.log("device", T), "bofei" === R && (P = k[T.localName] || [], console.log("commandWords", P), l.setData({
                userCommandWords: P
              })), (a = r.setNewInstance(M)).onError((function(e) {
                i.logger.error("bleInstanceOnError", e), wx.hideLoading(), u((function() {
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
              })), a.onReceivePackage((function(n) {
                console.log("接收到数据", n);
                var s = n.type;
                if ("connect" === s)
                  if (n.wxMessage.connected) wx.hideLoading(), l.setData({
                    connectStatus: "connected"
                  }), wx.showToast({
                    title: "连接成功"
                  });
                  else {
                    if ("connecting" === a.connectStatus) return;
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
                else if ("adapterStateChange" === s) {
                  n.wxMessage.available || (l.setData({
                    connectStatus: "noConnected"
                  }), wx.showModal({
                    title: "手机蓝牙未开启",
                    content: '请前往"设置 > 蓝牙"中打开',
                    showCancel: !1
                  }))
                } else if ("characteristicChange" === s) {
                  var c = n.wxMessage,
                    r = (0, o.ab2hex)(c.value);
                  i.logger.info("characteristicChange", {
                    deviceId: l.data.device.deviceId,
                    hexStr: r
                  }), console.log("hexStr", r);
                  var v = y.find((function(e) {
                    var t = e.position,
                      a = e.value;
                    return r.substr(2 * t, 2) == a
                  }));
                  if (v)
                    if ("attribute" === v.type) {
                      var h, p = (0, o.parsrAttributeRules)({
                        rules: x,
                        str: r,
                        deviceStatus: l.data.deviceStatus
                      });
                      h = "bofei" === R || "ruide" === R || "zhihengtong" === R ? 500 : "juhu" === R ? 1e3 : 500;
                      var g = l.waitReply ? h : 0;
                      d((function() {
                        var e, t, a;
                        l.setData({
                          deviceStatus: p,
                          isAllAttributeUp: !0
                        }), console.log("res", p), "FB15178DR" === (null === (e = l.data) || void 0 === e || null === (t = e.protocolJson) || void 0 === t || null === (a = t.commandWordsConfig) || void 0 === a ? void 0 : a.value) && (null != p && p.mode["风类模式"].wengan ? l.setData({
                          "deviceStatus.slider.档位.disabled": !0
                        }) : l.setData({
                          "deviceStatus.slider.档位.disabled": !1
                        })), l.waitReply = !1
                      }), g)
                    } else if ("queryBindingReport" === v.type) {
                    var b = (0, o.parsrAttributeRules)({
                      rules: x,
                      str: r,
                      deviceStatus: l.data.deviceStatus
                    });
                    b.bindingIdents && (l.setData({
                      "deviceStatus.bindingIdents": b.bindingIdents
                    }), console.log("灯绑定上报", b.bindingIdents), "function" == typeof l.onAttributeReport && l.onAttributeReport(b))
                  } else {
                    var S = (0, o.initialData)({
                        protocols: f,
                        initialRules: w,
                        str: r
                      }),
                      D = (0, o.convertProtocolJson)(S),
                      m = D.statusJson,
                      C = D.resJson;
                    console.log("statusJson", m), console.log("resJson", C), l.setData({
                      protocolJson: C,
                      deviceStatus: m
                    }, t(e().mark((function t() {
                      return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 1, a.sendDp({
                              dpValue: J.value
                            });
                          case 1:
                            if (!V) {
                              e.next = 2;
                              break
                            }
                            return e.next = 2, a.sendDp({
                              dpValue: V.value
                            });
                          case 2:
                          case "end":
                            return e.stop()
                        }
                      }), t)
                    }))))
                  } else i.logger.error("不识别的报文", n), console.error("不识别的报文")
                }
              })), v.next = 2, a.init();
            case 2:
              return wx.showLoading({
                title: "连接设备中"
              }), v.next = 3, a.connectBlue();
            case 3:
              A ? a.sendDp({
                dpValue: A.value
              }) : (B = (0, o.convertProtocolJson)(f), I = B.statusJson, q = B.resJson, console.log("statusJson", I), console.log("resJson", q), l.setData({
                protocolJson: q,
                deviceStatus: I
              }, t(e().mark((function t() {
                return e().wrap((function(e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      if (!J) {
                        e.next = 1;
                        break
                      }
                      return e.next = 1, a.sendDp({
                        dpValue: J.value
                      });
                    case 1:
                      if (!V) {
                        e.next = 2;
                        break
                      }
                      return e.next = 2, a.sendDp({
                        dpValue: V.value
                      });
                    case 2:
                    case "end":
                      return e.stop()
                  }
                }), t)
              })))));
            case 4:
            case "end":
              return v.stop()
          }
        }), v)
      })))()
    },
    destroy: function(n) {
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (n && a.sendDp({
                  dpValue: n
                }), !a) {
                e.next = 2;
                break
              }
              return console.log("触发了destroy"), e.next = 1, a.destroy();
            case 1:
              a = void 0;
            case 2:
              s.globalData.currentDeviceId = "";
            case 3:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    },
    handleGotoOTA: function() {
      var a = this;
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (a.data.device) {
                e.next = 1;
                break
              }
              return wx.showToast({
                title: "缺少目标设备",
                icon: "error"
              }), e.abrupt("return");
            case 1:
              wx.redirectTo({
                url: "/pages/OTA/OTA?device=".concat(JSON.stringify(a.data.device))
              });
            case 2:
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
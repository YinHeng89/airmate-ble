var e = require("../../../../../@babel/runtime/helpers/interopRequireDefault").default,
  t = require("../../../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../../../@babel/runtime/helpers/defineProperty"),
  o = e(require("../../../../../protocol/julianxin/ruihe/shuinuantan")),
  s = require("../../../../utils/util"),
  i = require("../../../../utils/protocol"),
  c = require("../../../../../utils/logger"),
  r = getApp(),
  l = r.globalData.deviceList,
  u = r.globalData.bleService,
  d = (0, s.debounce)(),
  h = (0, s.debounce)(),
  p = (0, s.debounce)();
Page(a({
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
    showEditCmdWords: !1
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
  timer: null,
  productId: "",
  mac: "",
  otaVersion: "",
  syncTime: function() {
    var e = new Date,
      t = e.getDay().toString(16).padStart(2, 0),
      n = e.getHours().toString(16).padStart(2, 0),
      a = e.getMinutes().toString(16).padStart(2, 0),
      o = e.getSeconds().toString(16).padStart(2, 0),
      s = "A5FC5509".concat(o).concat(a).concat(n).concat(t, "000000"),
      i = (s + function(e) {
        for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
        for (var a = 0, o = 0, s = t; o < s.length; o++) {
          a += s[o]
        }
        var i = a.toString(16);
        return i.substring(i.length - 2).padStart(2, "0")
      }(s)).replace(/(.{2})/g, "$1 ");
    this.bleInstance.sendDp({
      dpValue: i
    })
  },
  onPageScroll: function(e) {
    var t = this;
    d((function() {
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
    p((function() {}), 0), h((function() {
      t.waitReply = !0, t.bleInstance.sendDp({
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
      n = t.type,
      o = t.label,
      s = t.protocol,
      i = t.value,
      c = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, c, i)), this.sendDp({
      dpValue: s
    })
  },
  handleCounterChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.label,
      s = t.protocol,
      i = t.value,
      c = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, c, i)), this.sendDp({
      dpValue: s
    })
  },
  handleModeChange: function(e) {
    var t = this,
      n = e.detail,
      o = n.type,
      s = n.label,
      i = n.protocol,
      c = n.status,
      r = n.displayName,
      l = c ? "open" : "close",
      u = i.find((function(e) {
        return e.key === l
      }));
    if (u) {
      var d = this.data.deviceStatus[o][s];
      Object.keys(d).forEach((function(e) {
        var a = c;
        if (e === r) d[e] = a;
        else if (a) {
          var i = t.data.uiJson.find((function(e) {
            return e.type === o && e.label === s
          })).children;
          if (i) {
            var l = i.find((function(t) {
              return t.displayName === e
            }));
            l && l.isMutex && n.isMutex && (d[e] = !1)
          }
        }
      }));
      var h = "deviceStatus.".concat(o, ".").concat(s);
      this.setData(a({}, h, d)), this.sendDp({
        dpValue: u.value
      })
    }
  },
  handleMidSwitchChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.label,
      s = t.displayName,
      i = t.key,
      c = t.protocol.find((function(e) {
        return e.key === i
      }));
    if (c) {
      var r = "deviceStatus.".concat(n, ".").concat(o, ".").concat(s),
        l = "open" === i;
      this.setData(a({}, r, l)), this.sendDp({
        dpValue: c.value
      })
    }
  },
  handleModeExcludeChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.label,
      s = t.protocol,
      i = t.status,
      c = t.displayName,
      r = s.find((function(e) {
        return e.key === i
      }));
    if (r) {
      var l = this.data.deviceStatus[n][o];
      Object.keys(l).forEach((function(e) {
        var t = "open" === i;
        e === c ? l[e] = t : t && (l[e] = !1)
      }));
      var u = "deviceStatus.".concat(n, ".").concat(o);
      this.setData(a({}, u, l)), this.sendDp({
        dpValue: r.value
      })
    }
  },
  handleSwitchChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.protocol,
      s = t.status,
      i = t.displayName,
      c = o.find((function(e) {
        var t = s ? "open" : "close";
        return e.key === t
      })),
      r = "deviceStatus.".concat(n, ".").concat(i);
    this.setData(a({}, r, s)), this.sendDp({
      dpValue: c.value
    })
  },
  handlePopupPickerChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.label,
      s = t.protocol,
      i = t.value,
      c = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, c, i)), this.sendDp({
      dpValue: s
    })
  },
  handleTemChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.label,
      s = t.value,
      i = t.protocol,
      c = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, c, s)), this.sendDp({
      dpValue: i
    })
  },
  handleFanYaoTouChange: function(e) {
    var t = e.detail,
      n = t.label,
      o = t.protocol,
      s = t.newStatus,
      i = t.type,
      c = "deviceStatus.".concat(void 0 === i ? "fanYaoTou" : i, ".").concat(n);
    this.setData(a({}, c, s)), this.sendDp({
      dpValue: o
    })
  },
  handleWaterTemperatureChange: function(e) {
    var t = e.detail,
      n = t.type,
      o = t.label,
      s = t.value,
      i = t.protocol,
      c = "deviceStatus.".concat(n, ".").concat(o, ".value");
    this.setData(a({}, c, s)), this.sendDp({
      dpValue: i
    })
  },
  reConnect: function() {
    var e = this;
    return n(t().mark((function n() {
      return t().wrap((function(t) {
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
      }), n, null, [
        [0, 4]
      ])
    })))()
  },
  setMTU: function() {
    var e = this;
    return n(t().mark((function n() {
      var a, o, s, i, r, l, u;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (t.prev = 0, a = wx.getDeviceInfo(), "android" !== (o = a.platform) && "ohos" !== o) {
              t.next = 2;
              break
            }
            return t.next = 1, e.bleInstance.setBLEMTU(512);
          case 1:
            s = t.sent, i = s.mtu, console.log("androidMtu", i), e.mtu = i, t.next = 4;
            break;
          case 2:
            return t.next = 3, wx.getBLEMTU({
              deviceId: e.data.device.deviceId,
              writeType: "writeNoResponse"
            });
          case 3:
            r = t.sent, l = r.mtu, console.log("IOSmtu", l), e.mtu = l;
          case 4:
            t.next = 6;
            break;
          case 5:
            t.prev = 5, u = t.catch(0), console.log("MTU初始化失败", u), c.logger.error("MTU初始化失败", u);
          case 6:
          case "end":
            return t.stop()
        }
      }), n, null, [
        [0, 5]
      ])
    })))()
  },
  init: function(e) {
    var a = this;
    return n(t().mark((function d() {
      var f, v, w, g, b, S, m, y, x, D, C, I, k, T, M, E, V, W, L, J, P, R, A, B, N, O, U, q, F, j;
      return t().wrap((function(d) {
        for (;;) switch (d.prev = d.next) {
          case 0:
            if (1 !== getCurrentPages().length) {
              d.next = 1;
              break
            }
            return wx.redirectTo({
              url: "/pages/login/login"
            }), d.abrupt("return");
          case 1:
            return f = e.deviceId, r.globalData.currentDeviceId = f, v = l.find((function(e) {
              return e.deviceId === f
            })), a.setData({
              device: v,
              title: v.name || defaultTitleName
            }), a.bleInstance = u.setNewInstance(f), a.bleInstance.onError((function(e) {
              c.logger.error("bleInstanceOnError", e), wx.hideLoading(), h(n(t().mark((function n() {
                var o;
                return t().wrap((function(t) {
                  for (;;) switch (t.prev = t.next) {
                    case 0:
                      o = e.errno, t.next = 1500102 === o ? 1 : 1509003 === o ? 2 : 1509001 === o ? 3 : 1500103 === o ? 4 : 6;
                      break;
                    case 1:
                      return wx.showModal({
                        title: "手机蓝牙未开启",
                        content: '请前往"设置 > 蓝牙"中打开',
                        showCancel: !1
                      }), t.abrupt("continue", 7);
                    case 2:
                      return wx.showModal({
                        title: "未连接上该BLE设备",
                        content: "请尝试退出并重新连接",
                        showCancel: !1
                      }), t.abrupt("continue", 7);
                    case 3:
                      return wx.showModal({
                        title: "连接BLE设备失败",
                        content: "请尝试退出并重新连接",
                        showCancel: !1
                      }), t.abrupt("continue", 7);
                    case 4:
                      return t.next = 5, a.bleInstance.checkIsLoader();
                    case 5:
                      return t.sent ? wx.showModal({
                        content: "该设备当前是Loader系统，请继续升级",
                        showCancel: !1
                      }) : wx.showModal({
                        content: "当前BLE设备获取不到Service/获取不到对应UUID的Service",
                        showCancel: !1
                      }), t.abrupt("continue", 7);
                    case 6:
                      return wx.showModal({
                        content: e.errMsg,
                        showCancel: !1
                      }), t.abrupt("continue", 7);
                    case 7:
                      console.log("sdk报错了", e);
                    case 8:
                    case "end":
                      return t.stop()
                  }
                }), n)
              }))), 100)
            })), d.next = 2, a.bleInstance.init();
          case 2:
            return a.bleInstance.onReceivePackage((function(e) {
              if ("connect" === e.type)
                if (e.wxMessage.connected) wx.hideLoading(), a.setData({
                  connectStatus: "connected"
                }), wx.showToast({
                  title: "连接成功"
                });
                else {
                  if ("connecting" === a.bleInstance.connectStatus) return;
                  wx.hideLoading(), a.setData({
                    connectStatus: "noConnected"
                  }), h((function() {
                    wx.showModal({
                      content: "蓝牙已断开，是否尝试重新连接？",
                      confirmText: "重新连接",
                      success: function(e) {
                        var t = e.confirm;
                        e.cancel;
                        t && a.reConnect()
                      }
                    })
                  }), 100)
                }
            })), d.prev = 3, wx.showLoading({
              title: "连接设备中"
            }), d.next = 4, a.bleInstance.connectBlue();
          case 4:
            d.next = 6;
            break;
          case 5:
            d.prev = 5, j = d.catch(3), c.logger.error("connectBlueError", j), wx.showToast({
              title: j.errMsg
            });
          case 6:
            return d.next = 7, a.setMTU();
          case 7:
            console.log("data", o.default), w = o.default.type, g = o.default.style, b = o.default.styleConfig, S = o.default.showSettingBtn, m = void 0 !== S && S, y = o.default.showOTA, x = void 0 !== y && y, D = o.default.showEditCommand, C = void 0 !== D && D, I = o.default.showAllWords, k = void 0 !== I && I, T = o.default.showEditWakeWords, M = void 0 !== T && T, E = o.default.showEditCmdWords, V = void 0 !== E && E, W = o.default.protocolJson, L = o.default.specialJson, J = o.default.initialRules, P = o.default.attributeRules, R = o.default.judgeRules, A = o.default.commandWords, v.type = w, wx.setStorageSync("deviceList", l), a.bleInstance.onReceivePackage((function(e) {
              console.log("接收到数据", e);
              var t = e.type;
              if ("adapterStateChange" === t) e.wxMessage.available || (a.setData({
                connectStatus: "noConnected"
              }), wx.showModal({
                title: "手机蓝牙未开启",
                content: '请前往"设置 > 蓝牙"中打开',
                showCancel: !1
              }));
              else if ("characteristicChange" === t) {
                var n = e.wxMessage,
                  o = (0, s.ab2hex)(n.value);
                if (c.logger.info("characteristicChange", {
                    deviceId: a.data.device.deviceId,
                    hexStr: o
                  }), console.log("hexStr", o), !R) return;
                var r = R.find((function(e) {
                  var t = e.position,
                    n = e.value;
                  return o.substr(2 * t, 2) == n
                }));
                if (r)
                  if ("attribute" === r.type) {
                    var l = (0, i.parsrAttributeRules)({
                        rules: P,
                        str: o,
                        deviceStatus: a.data.deviceStatus
                      }),
                      u = a.waitReply ? 500 : 0;
                    p((function() {
                      a.setData({
                        deviceStatus: l
                      }), a.waitReply = !1
                    }), u)
                  } else {
                    clearTimeout(B);
                    var d = (0, i.initialData)({
                        protocols: W,
                        initialRules: J,
                        str: o
                      }),
                      h = (0, i.convertProtocolJson)(d),
                      f = h.statusJson,
                      v = h.uiJson;
                    console.log("statusJson", f), console.log("uiJson", v), a.setData({
                      showSkeleton: !1,
                      uiJson: v,
                      deviceStatus: f,
                      type: w,
                      style: g.toLowerCase(),
                      styleConfig: b,
                      commandWords: A,
                      showSettingBtn: m,
                      showOTA: x,
                      showAllWords: k,
                      showEditWakeWords: M,
                      showEditCmdWords: V,
                      showEditCommand: C
                    }, (function() {
                      a.bleInstance.sendDp({
                        dpValue: O.value
                      })
                    }))
                  }
                else c.logger.error("不识别的报文", e), console.error("不识别的报文")
              }
            })), N = null == L ? void 0 : L.find((function(e) {
              return "initial" === e.type
            })), O = null == L ? void 0 : L.find((function(e) {
              return "searchState" === e.type
            })), a.statePd = null == O ? void 0 : O.value, N ? (a.bleInstance.sendDp({
              dpValue: N.value
            }), B = setTimeout((function() {
              wx.showModal({
                title: "超时",
                content: "等待初始化超时，请退出然后重新连接",
                showCancel: !1
              })
            }), 1e4)) : (U = (0, i.convertProtocolJson)(W), q = U.statusJson, F = U.uiJson, console.log("statusJson", q), console.log("uiJson", F), a.setData({
              showSkeleton: !1,
              uiJson: F,
              deviceStatus: q,
              type: w,
              style: g.toLowerCase(),
              styleConfig: b,
              commandWords: A,
              showSettingBtn: m,
              showOTA: x,
              showAllWords: k,
              showEditWakeWords: M,
              showEditCmdWords: V,
              showEditCommand: C
            }, (function() {
              O && a.bleInstance.sendDp({
                dpValue: O.value
              })
            }))), a.syncTime();
          case 8:
          case "end":
            return d.stop()
        }
      }), d, null, [
        [3, 5]
      ])
    })))()
  },
  destroy: function() {
    var e = arguments,
      a = this;
    return n(t().mark((function n() {
      var o;
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (o = e.length > 0 && void 0 !== e[0] ? e[0] : {}, console.log("disconnect"), o.disconnectProtocol && a.bleInstance.sendDp({
                dpValue: o.disconnectProtocol
              }), !a.bleInstance) {
              t.next = 2;
              break
            }
            return a.timer && clearInterval(a.timer), a.bleInstance.sendDp({
              dpValue: "A5 FC 55 09 00 00 00 00 00 00 00 FF"
            }), t.next = 1, a.bleInstance.destroy();
          case 1:
            a.bleInstance = void 0;
          case 2:
            r.globalData.currentDeviceId = "";
          case 3:
          case "end":
            return t.stop()
        }
      }), n)
    })))()
  },
  onShareAppMessage: function() {
    return {
      title: "慧居管家",
      path: "pages/login/login"
    }
  },
  onLoad: function(e) {
    this.init(e)
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    this.destroy()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {}
}, "onShareAppMessage", (function() {})));
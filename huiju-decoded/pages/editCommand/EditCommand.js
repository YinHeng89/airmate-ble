var e, t = require("../../@babel/runtime/helpers/toConsumableArray"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../utils/util"),
  i = require("../../api/request"),
  o = getApp(),
  d = (0, r.debounce)();
Page({
  data: {
    wkp: [],
    cmd: [],
    show: !1,
    editObj: {
      value: "",
      words: "",
      spellList: [],
      activePro: [],
      index: 0,
      type: ""
    },
    activeWordIndex: 0,
    deviceId: "",
    mtu: 0,
    btnDisabled: !0,
    btnText: "下一步",
    type: "all",
    rule: "",
    titleMap: {
      wkp: "编辑唤醒词",
      cmd: "编辑命令词"
    },
    placeholderMap: {
      wkp: "中文，3-6个字符",
      cmd: "中文，2-10个字符"
    }
  },
  cuiVersion: "",
  deviceId: "",
  handleInputChange: function(e) {
    var t = this;
    d(a(n().mark((function a() {
      var r, o, d, s, c, u, l;
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            if (r = e.detail.value) {
              n.next = 1;
              break
            }
            return t.setData({
              "editObj.words": "",
              "editObj.spellList": [],
              "editObj.activePro": [],
              btnDisabled: !0,
              activeWordIndex: 0
            }), n.abrupt("return");
          case 1:
            if (/^[\u4e00-\u9fa5]+$/.test(r)) {
              n.next = 2;
              break
            }
            return t.setData({
              rule: "rule"
            }), n.abrupt("return");
          case 2:
            if ("wkp" !== t.data.editObj.type || !(r.length < 3 || r.length > 6)) {
              n.next = 3;
              break
            }
            return t.setData({
              rule: "rule1"
            }), n.abrupt("return");
          case 3:
            if ("cmd" !== t.data.editObj.type || !(r.length < 2 || r.length > 10)) {
              n.next = 4;
              break
            }
            return t.setData({
              rule: "rule2"
            }), n.abrupt("return");
          case 4:
            t.setData({
              rule: ""
            });
          case 5:
            return n.next = 6, (0, i.getPro)(r);
          case 6:
            o = n.sent, d = o.data, s = d.words, c = d.spellList, (u = c.map((function(e) {
              return 1 === e.spell.length ? e.spell[0].tone : e.spell.length > 1 ? "" : "err"
            }))).some((function(e) {
              return !e
            })) ? t.setData({
              btnText: "下一步"
            }) : t.setData({
              btnText: "确定"
            }), c.forEach((function(e) {
              1 === e.spell.length ? e.activeSpell = e.spell[0].tone : e.spell.length > 1 && (e.activeSpell = "")
            })), l = c.findIndex((function(e) {
              return e.spell.length > 1
            })), t.setData({
              "editObj.words": s,
              "editObj.spellList": c,
              "editObj.activePro": u,
              btnDisabled: !1,
              activeWordIndex: l
            });
          case 7:
          case "end":
            return n.stop()
        }
      }), a)
    }))), 100)
  },
  handleTapPro: function(e) {
    var t = e.currentTarget.dataset.index;
    1 !== this.data.editObj.spellList[t].spell.length && this.setData({
      activeWordIndex: t
    })
  },
  switchCmd: function(t, o, d) {
    var s = this;
    return a(n().mark((function a() {
      var c, u, l, f, p, w, x, h, v, b, m, g, I, k, y, L, D, j, O, S;
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            return console.log("params", o), n.next = 1, (0, i.getData)({
              versionNo: t,
              params: o
            });
          case 1:
            if (200 == (c = n.sent).statusCode) {
              n.next = 2;
              break
            }
            throw Error("请求server出错");
          case 2:
            if (u = s.deviceId, l = wx.getDeviceInfo(), "ios" !== l.platform) {
              n.next = 4;
              break
            }
            return n.next = 3, wx.getBLEMTU({
              deviceId: u,
              writeType: "writeNoResponse"
            });
          case 3:
            p = n.sent, f = p.mtu, n.next = 6;
            break;
          case 4:
            return n.next = 5, wx.getBLEMTU({
              deviceId: u
            });
          case 5:
            w = n.sent, f = w.mtu;
          case 6:
            if (f > 512 && (f = 512), console.log("mtu", f), x = function(e) {
                for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                for (var a = 0, r = 0, i = t; r < i.length; r++) {
                  a += i[r]
                }
                var o = a.toString(16);
                return o.substring(o.length - 4).padStart(4, "0")
              }, h = f - 3 - 6, v = c.data.byteLength.toString(16).padStart(8, "0"), b = "", "wkp" !== d) {
              n.next = 7;
              break
            }
            b = "aa01".concat(v), n.next = 9;
            break;
          case 7:
            if ("cmd" !== d) {
              n.next = 8;
              break
            }
            b = "aa02".concat(v), n.next = 9;
            break;
          case 8:
            return wx.showToast({
              title: "未知类型",
              icon: "error"
            }), n.abrupt("return");
          case 9:
            for (m = x(b), console.log("crcHex", m), g = (b + m).replace(/(.{2})/g, "$1 "), e.sendDp({
                dpValue: g
              }), I = Math.trunc(c.data.byteLength / h) + 1, k = (0, r.ab2hex)(c.data), y = 0; y < I; y++) L = k.substr(y * h * 2, 2 * h), console.log(L.length / 2), D = parseInt(L.length / 2).toString(16).padStart(4, "0"), j = "aa".concat(y.toString(16).padStart(2, "0")).concat(D).concat(L), O = x(j), S = (j + O).replace(/(.{2})/g, "$1 "), e.sendDp({
              dpValue: S
            });
          case 10:
          case "end":
            return n.stop()
        }
      }), a)
    })))()
  },
  handleDelete: function(e) {
    var r = this;
    return a(n().mark((function i() {
      return n().wrap((function(i) {
        for (;;) switch (i.prev = i.next) {
          case 0:
            wx.showModal({
              title: "提示",
              content: "确定删除自学习的词？",
              complete: function() {
                var i = a(n().mark((function a(i) {
                  var o, d, s, c, u, l, f, p, w, x, h, v;
                  return n().wrap((function(n) {
                    for (;;) switch (n.prev = n.next) {
                      case 0:
                        if (!i.cancel) {
                          n.next = 1;
                          break
                        }
                        return n.abrupt("return");
                      case 1:
                        if (!i.confirm) {
                          n.next = 6;
                          break
                        }
                        return n.prev = 2, o = e.target.dataset.item, d = o.fwIndex, s = o.type, c = r.data.versionNo, wx.showLoading({
                          title: "删除中",
                          mask: !0
                        }), u = {
                          spellList: []
                        }, l = "", f = "", [].concat(t(r.data.wkp), t(r.data.cmd)).forEach((function(e) {
                          e.fwIndex === d || e.studyedWord && "无" != e.studyedWord && u.spellList.push({
                            tone: e.tone,
                            seq: e.seq,
                            index: e.fwIndex
                          })
                        })), n.next = 3, r.switchCmd(c, u, s);
                      case 3:
                        return n.next = 4, r.checkTimeout();
                      case 4:
                        wx.hideLoading(), wx.showToast({
                          title: "删除成功"
                        }), p = r.data.wkp, w = r.data.cmd, "wkp" === s && (p.find((function(e) {
                          return e.fwIndex === d
                        })).studyedWord = "", p.find((function(e) {
                          return e.fwIndex === d
                        })).tone = l, p.find((function(e) {
                          return e.fwIndex === d
                        })).seq = f, r.setData({
                          wkp: p
                        })), "cmd" === s && (w.find((function(e) {
                          return e.fwIndex === d
                        })).studyedWord = "", w.find((function(e) {
                          return e.fwIndex === d
                        })).tone = l, w.find((function(e) {
                          return e.fwIndex === d
                        })).seq = f, r.setData({
                          cmd: w
                        })), (x = wx.getStorageSync("commandWordList"))[r.deviceId] || (x[r.deviceId] = {}), h = [].concat(t(p), t(w)).filter((function(e) {
                          return e.editFlag
                        })).reduce((function(e, t, n) {
                          return t.studyedWord && t.seq && t.tone ? (e["fwIndex-".concat(t.fwIndex)] = {
                            words: t.studyedWord,
                            tone: t.tone,
                            seq: t.seq
                          }, e) : e
                        }), {}), console.log("result", h), x[r.deviceId] = h, wx.setStorageSync("commandWordList", x), n.next = 6;
                        break;
                      case 5:
                        n.prev = 5, v = n.catch(2), wx.hideLoading(), wx.showToast({
                          title: v,
                          icon: "none"
                        });
                      case 6:
                      case "end":
                        return n.stop()
                    }
                  }), a, null, [
                    [2, 5]
                  ])
                })));
                return function(e) {
                  return i.apply(this, arguments)
                }
              }()
            });
          case 1:
          case "end":
            return i.stop()
        }
      }), i)
    })))()
  },
  handleEdit: function(e) {
    var t = e.target.dataset.item,
      n = t.fwIndex,
      a = t.type;
    this.setData({
      show: !0,
      activeWordIndex: -1,
      "editObj.index": n,
      "editObj.value": "",
      "editObj.words": "",
      "editObj.spellList": [],
      "editObj.activePro": [],
      "editObj.type": a,
      rule: ""
    })
  },
  onRadioChange: function(e) {
    var t = e.detail,
      n = this.data.editObj.spellList;
    n[this.data.activeWordIndex].activeSpell = t;
    var a = this.data.editObj.spellList.map((function(e) {
      return e.activeSpell
    }));
    a.some((function(e) {
      return !e
    })) ? this.setData({
      btnText: "下一步"
    }) : this.setData({
      btnText: "确定"
    }), this.setData({
      "editObj.spellList": n,
      "editObj.activePro": a
    })
  },
  handleConfirm: function() {
    var e = this;
    return a(n().mark((function a() {
      var r, i, o, d, s, c, u, l, f, p, w, x;
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            if (!e.data.editObj.activePro.some((function(e) {
                return !e
              }))) {
              n.next = 1;
              break
            }
            return r = e.data.editObj.activePro.findIndex((function(e) {
              return !e
            })), e.setData({
              activeWordIndex: r
            }), n.abrupt("return");
          case 1:
            return n.prev = 1, wx.showLoading({
              title: "切换中",
              mask: !0
            }), i = e.data.editObj.index, o = e.data.versionNo, d = e.data.editObj.spellList.map((function(e) {
              var t = e.activeSpell,
                n = e.spell.find((function(e) {
                  return e.tone == t
                }));
              return {
                tone: n.tone,
                value: n.value
              }
            })), s = d.map((function(e) {
              return e.tone
            })).join(" "), c = d.map((function(e) {
              return e.value
            })).join(" "), u = {
              spellList: []
            }, [].concat(t(e.data.wkp), t(e.data.cmd)).forEach((function(e) {
              e.fwIndex === i ? u.spellList.push({
                tone: s,
                seq: c,
                index: i
              }) : e.studyedWord && "无" != e.studyedWord && u.spellList.push({
                tone: e.tone,
                seq: e.seq,
                index: e.fwIndex
              })
            })), n.next = 2, e.switchCmd(o, u, e.data.editObj.type);
          case 2:
            return n.next = 3, e.checkTimeout();
          case 3:
            wx.hideLoading(), wx.showToast({
              title: "切换成功"
            }), l = e.data.wkp, f = e.data.cmd, "wkp" === e.data.editObj.type && (l.find((function(e) {
              return e.fwIndex === i
            })).studyedWord = e.data.editObj.words, l.find((function(e) {
              return e.fwIndex === i
            })).tone = s, l.find((function(e) {
              return e.fwIndex === i
            })).seq = c, e.setData({
              wkp: l
            })), "cmd" === e.data.editObj.type && (f.find((function(e) {
              return e.fwIndex === i
            })).studyedWord = e.data.editObj.words, f.find((function(e) {
              return e.fwIndex === i
            })).tone = s, f.find((function(e) {
              return e.fwIndex === i
            })).seq = c, e.setData({
              cmd: f
            })), (p = wx.getStorageSync("commandWordList"))[e.deviceId] || (p[e.deviceId] = {}), w = [].concat(t(l), t(f)).filter((function(e) {
              return e.editFlag
            })).reduce((function(e, t, n) {
              return t.studyedWord && t.seq && t.tone ? (e["fwIndex-".concat(t.fwIndex)] = {
                words: t.studyedWord,
                tone: t.tone,
                seq: t.seq
              }, e) : e
            }), {}), console.log("result", w), p[e.deviceId] = w, wx.setStorageSync("commandWordList", p), n.next = 5;
            break;
          case 4:
            n.prev = 4, x = n.catch(1), wx.hideLoading(), wx.showToast({
              title: x,
              icon: "none"
            });
          case 5:
            return n.prev = 5, e.setData({
              btnDisabled: !0,
              show: !1
            }), n.finish(5);
          case 6:
          case "end":
            return n.stop()
        }
      }), a, null, [
        [1, 4, 5, 6]
      ])
    })))()
  },
  checkTimeout: function() {
    return new Promise((function(t, n) {
      var a = !1,
        i = !1;
      setTimeout((function() {
        a = !0
      }), 5e3);
      var o = function(e) {
        var t = e.wxMessage,
          n = (0, r.ab2hex)(t.value);
        console.log("接收到flash写入的报文", n), "aabbcc" == n && (i = !0)
      };
      e.onReceivePackage(o);
      new Promise((function(e, t) {
        var n = function() {
          a ? t("固件切换超时") : a || i ? e("固件切换成功") : setTimeout(n, 0)
        };
        n()
      })).then((function(n) {
        e.offReceivePackage(o), t(n)
      })).catch((function(t) {
        e.offReceivePackage(o), n(t)
      }))
    }))
  },
  onLoad: function() {
    var t = arguments,
      r = this;
    return a(n().mark((function a() {
      var d, s, c, u, l, f, p, w, x, h;
      return n().wrap((function(n) {
        for (;;) switch (n.prev = n.next) {
          case 0:
            return d = t.length > 0 && void 0 !== t[0] ? t[0] : {}, r.cuiVersion = d.cuiVersion, r.deviceId = d.deviceId, s = d.type, r.setData({
              type: s
            }), "all" === s ? c = "自定义唤醒词/命令词" : "wake" === s ? c = "自定义唤醒词" : "cmd" === s && (c = "自定义命令词"), wx.setNavigationBarTitle({
              title: c
            }), e = o.globalData.bleInstance, n.next = 1, (0, i.getCommandWordsByVsersion)(r.cuiVersion);
          case 1:
            u = n.sent, l = u.data, console.log("在CUI获取的词表", l), (f = wx.getStorageSync("commandWordList"))[r.deviceId] || (f[r.deviceId] = {}, wx.setStorageSync("commandWordList", f)), p = wx.getStorageSync("commandWordList"), console.log("_commandWordList", p), (w = l.filter((function(e) {
              return e.editFlag
            }))).forEach((function(e, t) {
              e.fwIndex = t;
              var n = "fwIndex-".concat(t);
              p[r.deviceId][n] && (e.studyedWord = p[r.deviceId][n].words, e.seq = p[r.deviceId][n].seq, e.tone = p[r.deviceId][n].tone)
            })), x = w.filter((function(e) {
              return "wkp" === e.type
            })), h = w.filter((function(e) {
              return "cmd" === e.type
            })), r.setData({
              wkp: x,
              cmd: h,
              versionNo: r.cuiVersion
            });
          case 2:
          case "end":
            return n.stop()
        }
      }), a)
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    e = null
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
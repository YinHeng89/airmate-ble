var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../utils/util"),
  a = require("../../api/request"),
  r = getApp(),
  o = r.globalData.bleInstance,
  c = wx.getRecorderManager();
wx.getFileSystemManager();
Page({
  data: {
    hxc: [],
    mlc: [],
    mtu: 0,
    activeIndex: 0,
    recording: !1
  },
  cuiVersion: "",
  deviceId: "",
  activeType: "",
  initRecordManager: function() {
    var e = this;
    c.onStart((function() {
      e.setData({
        recording: !0
      })
    })), c.onStop((function(t) {
      var n = t.tempFilePath,
        a = t.duration,
        r = t.fileSize;
      console.log("录音结束了,录音文件".concat(n, ",文件大小").concat(r, ",录音时间").concat(a)), e.sendDataToFw(n, e.data.activeIndex), e.setData({
        recording: !1
      })
    }))
  },
  handleTapYuyin: function(e) {
    var t = this;
    console.log("e", e);
    var n = e.currentTarget.dataset.fwindex;
    this.activeType = e.currentTarget.dataset.type, this.setData({
      activeIndex: n
    }), c.start({
      duration: 3e4,
      sampleRate: 16e3,
      numberOfChannels: 1,
      format: "wav",
      encodeBitRate: 96e3
    }), wx.showModal({
      title: "录音提示",
      content: "正在录音",
      showCancel: !0,
      confirmText: "录音完成",
      complete: function(e) {
        e.cancel && t.setData({
          recording: !1,
          activeIndex: 0
        }), e.confirm && (t.setData({
          recording: !1
        }), c.stop())
      }
    })
  },
  sendDataToFw: function(r, c) {
    var i = this;
    return t(e().mark((function t() {
      var s, u, l, d, f, g, p, h, v, x, m, w, b, T, I, k, y, D, S, R;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.prev = 0, s = "wkp" === i.activeType ? 1 : 0, console.log(r, {
              index: c,
              learn_mode: s
            }), e.next = 1, (0, a.getDataByVoice)(r, {
              index: c,
              learn_mode: s
            });
          case 1:
            if (u = e.sent, console.log("res", u), 200 == u.statusCode) {
              e.next = 2;
              break
            }
            throw Error("请求server出错");
          case 2:
            return l = i.deviceId, e.next = 3, wx.getBLEMTU({
              deviceId: l
            });
          case 3:
            if (d = e.sent, f = d.mtu, g = function(e) {
                for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                for (var a = 0, r = 0, o = t; r < o.length; r++) {
                  a += o[r]
                }
                var c = a.toString(16);
                return c.substring(c.length - 4).padStart(4, "0")
              }, p = f - 3 - 6, h = u.data.byteLength.toString(16).padStart(8, "0"), v = "", "wkp" !== i.activeType) {
              e.next = 4;
              break
            }
            v = "aa01".concat(h), e.next = 6;
            break;
          case 4:
            if ("cmd" !== i.activeType) {
              e.next = 5;
              break
            }
            v = "aa02".concat(h), e.next = 6;
            break;
          case 5:
            return wx.showToast({
              title: "未知类型",
              icon: "error"
            }), e.abrupt("return");
          case 6:
            for (x = g(v), console.log("crcHex", x), m = (v + x).replace(/(.{2})/g, "$1 "), console.log("this.bleInstance", i.bleInstance), console.log("this.deviceId", i.deviceId), o.sendDp({
                dpValue: m
              }), w = Math.trunc(u.data.byteLength / p) + 1, b = (0, n.ab2hex)(u.data), T = 0; T < w; T++) I = b.substr(T * p * 2, 2 * p), console.log(I.length / 2), k = parseInt(I.length / 2).toString(16).padStart(4, "0"), y = "aa".concat(T.toString(16).padStart(2, "0")).concat(k).concat(I), D = g(y), S = (y + D).replace(/(.{2})/g, "$1 "), o.sendDp({
              dpValue: S
            });
            return e.next = 7, i.checkTimeout();
          case 7:
            wx.showToast({
              title: "切换成功"
            }), e.next = 9;
            break;
          case 8:
            e.prev = 8, R = e.catch(0), console.log(R), wx.showToast({
              title: R,
              icon: "none"
            });
          case 9:
          case "end":
            return e.stop()
        }
      }), t, null, [
        [0, 8]
      ])
    })))()
  },
  checkTimeout: function() {
    return new Promise((function(e, t) {
      var a = !1,
        r = !1;
      setTimeout((function() {
        a = !0
      }), 3e3);
      var c = function(e) {
        var t = e.wxMessage,
          a = (0, n.ab2hex)(t.value);
        console.log("接收到flash写入的报文", a), "aabbcc" == a && (r = !0)
      };
      o.onReceivePackage(c);
      new Promise((function(e, t) {
        var n = function() {
          a ? t("固件切换超时") : a || r ? e("固件切换成功") : setTimeout(n, 0)
        };
        n()
      })).then((function(t) {
        o.offReceivePackage(c), e(t)
      })).catch((function(e) {
        o.offReceivePackage(c), t(e)
      }))
    }))
  },
  onLoad: function() {
    var n = arguments,
      r = this;
    return t(e().mark((function t() {
      var o, c, i, s, u;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return o = n.length > 0 && void 0 !== n[0] ? n[0] : {}, r.cuiVersion = o.cuiVersion, r.deviceId = o.deviceId, e.next = 1, (0, a.getCommandWordsByVsersion)(r.cuiVersion);
          case 1:
            c = e.sent, (i = c.data).filter((function(e) {
              return e.editFlag
            })).forEach((function(e, t) {
              e.fwIndex = t
            })), s = i.filter((function(e) {
              return "wkp" === e.type
            })), u = i.filter((function(e) {
              return "cmd" === e.type
            })), r.setData({
              hxc: s,
              mlc: u,
              versionNo: r.cuiVersion
            }), r.initRecordManager();
          case 2:
          case "end":
            return e.stop()
        }
      }), t)
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    r.globalData.bleInstance = null, c.stop()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
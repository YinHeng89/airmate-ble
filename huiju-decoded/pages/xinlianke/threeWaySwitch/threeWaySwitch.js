var t = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  i = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../@babel/runtime/helpers/typeof"),
  a = require("../../../@babel/runtime/helpers/defineProperty"),
  o = t(require("../../../behavior/mixin")),
  r = require("../../../protocol/xinlianke/threeWaySwitch/threeWaySwitch");
Page({
  behaviors: [o.default],
  onAttributeReport: function(t) {
    var e = null == t ? void 0 : t.bindingIdents;
    if (e) {
      var i = JSON.stringify(e);
      i !== this._lastIdentsKey && (this._lastIdentsKey = i, this.restoreBindingsFromIdents())
    }
  },
  data: {
    bindings: {},
    lightList: r.lightList,
    showPicker: !1,
    activeChannel: "",
    commandWords: {
      "唤醒词": ["小牛小牛"],
      "开关": ["打开所有开关", "关闭所有开关"],
      "灯光": ["打开灯光", "关闭灯光", "打开一路灯|打开二路灯|打开三路灯", "关闭一路灯|关闭二路灯|关闭三路灯"]
    }
  },
  handleOpenAll: function() {
    wx.vibrateShort({
      type: "medium"
    }), this.setAllChannels(!0), this.sendDp({
      dpValue: "55 AA 01 02 03 A5"
    })
  },
  handleCloseAll: function() {
    wx.vibrateShort({
      type: "medium"
    }), this.setAllChannels(!1), this.sendDp({
      dpValue: "55 AA 01 03 04 A5"
    })
  },
  setAllChannels: function(t) {
    var e, i, n = (null === (e = this.data.protocolJson) || void 0 === e || null === (i = e.waySwitch) || void 0 === i ? void 0 : i["线路"]) || [],
      a = {};
    n.forEach((function(e) {
      a["deviceStatus.waySwitch.线路.".concat(e.displayName)] = t
    })), this.setData(a)
  },
  handleTapSwitch: function(t) {
    var e, i, n, o, r, s;
    wx.vibrateShort({
      type: "medium"
    });
    var l = t.currentTarget.dataset.item,
      d = null === (e = this.data.protocolJson) || void 0 === e || null === (i = e.waySwitch) || void 0 === i || null === (n = i["线路"]) || void 0 === n ? void 0 : n[l];
    if (d) {
      var c = d.displayName,
        u = this.data.bindings[c],
        h = u ? u.openProtocol : d.openProtocol,
        v = u ? u.closeProtocol : d.closeProtocol,
        p = !(null === (o = this.data.deviceStatus) || void 0 === o || null === (r = o.waySwitch) || void 0 === r || null === (s = r["线路"]) || void 0 === s || !s[c]),
        f = p ? v : h;
      this.setData(a({}, "deviceStatus.waySwitch.线路.".concat(c), !p)), this.sendDp({
        dpValue: f
      })
    }
  },
  handleLongPressSwitch: function(t) {
    var e, i, n;
    wx.vibrateShort({
      type: "heavy"
    });
    var a = t.currentTarget.dataset.item,
      o = null === (e = this.data.protocolJson) || void 0 === e || null === (i = e.waySwitch) || void 0 === i || null === (n = i["线路"]) || void 0 === n ? void 0 : n[a];
    o && this.setData({
      showPicker: !0,
      activeChannel: o.displayName
    })
  },
  bindingKey: function() {
    var t, e = null === (t = this.data.device) || void 0 === t ? void 0 : t.deviceId;
    return e ? "threeWaySwitch_bindings_".concat(e) : ""
  },
  restoreBindings: function() {
    var t = this,
      e = this.bindingKey();
    if (e) try {
      var i = wx.getStorageSync(e);
      if (i && "object" === n(i)) {
        var a = {};
        Object.keys(i).forEach((function(e) {
          var n, o = t.buildBinding(e, null === (n = i[e]) || void 0 === n ? void 0 : n.name);
          a[e] = o || i[e]
        })), this.setData({
          bindings: a
        })
      }
    } catch (t) {
      console.error("恢复绑定失败", t)
    }
  },
  restoreBindingsFromIdents: function() {
    var t, e = this,
      i = null === (t = this.data.deviceStatus) || void 0 === t ? void 0 : t.bindingIdents;
    if (i) {
      var n = {};
      Object.keys(i).forEach((function(t) {
        var a = i[t];
        if (null != a && 0 !== a) {
          var o = Number(a).toString(16).toUpperCase().padStart(2, "0"),
            r = e.data.lightList.find((function(t) {
              return t.ident.toUpperCase() === o
            }));
          if (r) {
            var s = e.buildBinding(t, r.name);
            s && (n[t] = s)
          }
        }
      })), this.setData({
        bindings: n
      }), console.log("从设备恢复绑定", n)
    }
  },
  buildBinding: function(t, e) {
    var i, n, a;
    if (!t || !e) return null;
    var o = this.data.lightList.find((function(t) {
        return t.name === e
      })),
      r = null === (i = this.data.protocolJson) || void 0 === i || null === (n = i.waySwitch) || void 0 === n || null === (a = n["线路"]) || void 0 === a ? void 0 : a.find((function(e) {
        return e.displayName === t
      }));
    return o && r ? {
      name: o.name,
      openProtocol: this.replaceLastByte(r.openProtocol, o.ident),
      closeProtocol: this.replaceLastByte(r.closeProtocol, this.identPlusOne(o.ident))
    } : null
  },
  saveBindings: function() {
    var t = this.bindingKey();
    if (t) try {
      wx.setStorageSync(t, this.data.bindings)
    } catch (t) {
      console.error("保存绑定失败", t)
    }
  },
  replaceLastByte: function(t, e) {
    var i = t.trim().split(/\s+/);
    return i[i.length - 1] = e, i.join(" ")
  },
  identPlusOne: function(t) {
    return (parseInt(t, 16) + 1).toString(16).toUpperCase().padStart(2, "0")
  },
  handleSelectLight: function(t) {
    var e = t.currentTarget.dataset.index,
      i = this.data.lightList[e],
      n = this.data.activeChannel,
      a = this.buildBinding(n, null == i ? void 0 : i.name);
    if (a) {
      var o = this.data.bindings;
      o[n] = a, this.setData({
        bindings: o,
        showPicker: !1,
        activeChannel: ""
      }), this.saveBindings();
      var r = a.openProtocol.trim().split(/\s+/);
      this.sendDp({
        dpValue: r.slice(3, 6).join(" ")
      })
    } else this.handleClosePicker()
  },
  handleClosePicker: function() {
    this.setData({
      showPicker: !1,
      activeChannel: ""
    })
  },
  noop: function() {},
  onLoad: function(t) {
    var n = this;
    return i(e().mark((function i() {
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 1, n.init({
              options: t,
              defaultTitleName: "智能开关",
              protocolJson: r.protocolJson,
              initialRules: r.initialRules,
              attributeRules: r.attributeRules,
              judgeRules: r.judgeRules,
              specialJson: r.specialJson,
              user: "threeWaySwitch"
            });
          case 1:
          case "end":
            return e.stop()
        }
      }), i)
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var t = this;
    return i(e().mark((function i() {
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 1, t.destroy();
          case 1:
          case "end":
            return e.stop()
        }
      }), i)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
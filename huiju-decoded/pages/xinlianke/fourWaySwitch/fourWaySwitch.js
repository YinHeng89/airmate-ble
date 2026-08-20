var e = require("../../../@babel/runtime/helpers/interopRequireDefault").default,
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../@babel/runtime/helpers/defineProperty"),
  i = e(require("../../../behavior/mixin")),
  a = require("../../../protocol/xinlianke/bathHeater/index");
Page({
  behaviors: [i.default],
  data: {
    commandWords: {
      "唤醒词": ["小爱小爱|小科小科|小华小华|小牧小牧"],
      "开关": ["打开全部开关|打开所有开关|全开|打开浴霸|打开所有功能|打开全部功能", "关闭全部开关|关闭所有开关|全关|关闭浴霸|关闭所有功能|关闭全部功能"],
      "开关控制": ["打开加热一|打开取暖一|打开风暖一", "关闭加热一|关闭取暖一|关闭风暖一", "打开加热二|打开取暖二|打开风暖二", "关闭加热二|关闭取暖二|关闭风暖二", "打开加热三|打开取暖三|打开风暖三", "关闭加热三|关闭取暖三|关闭风暖三"],
      "模式控制": ["打开摆风|关闭摆风", "打开照明|开灯|打开灯光", "关闭照明|关灯|关闭灯光", "打开吹风|开吹风|吹风", "关闭吹风|关吹风", "打开换气|开换气|换气", "关闭换气|关换气", "打开风暖|开风暖|风暖", "关闭风暖|关风暖", "打开高温模式|高温模式|打开强暖|强暖", "打开低温模式|低温模式|打开弱暖|弱暖", "打开恒温模式|恒温模式|恒温", "打开加热|加热", "关闭加热", "打开取暖|取暖", "关闭取暖", "打开暖风机|打开暖风|暖风", "关闭暖风机|关闭暖风"],
      "音量控制": ["增大音量|音量增大", "减小音量|音量减小", "音量最大|最大音量", "音量最小|最小音量", "打开播报|打开语音", "关闭播报|关闭语音"],
      "预约": ["半小时后开机|半小时开机|三十分钟后开机|三十分钟开机", "一小时后开机|六十分钟后开机"]
    }
  },
  timer1: null,
  timer2: null,
  handleModeChange: function(e) {
    var t = e.currentTarget.dataset.item,
      n = t.type,
      i = t.label,
      a = t.protocol,
      r = t.value,
      s = this.data.deviceStatus[n][i][r] ? "close" : "open",
      u = a.find((function(e) {
        return e.key === s
      }));
    if (u) {
      var c = "deviceStatus.".concat(n, ".").concat(i, ".").concat(r),
        l = "open" === s;
      this.setData(o({}, c, l)), this.sendDp({
        dpValue: u.value
      })
    }
  },
  handleTapSwitch: function(e) {
    wx.vibrateShort({
      type: "medium"
    });
    var t = e.currentTarget.dataset.item,
      n = this.data.protocolJson.waySwitch["线路"][t].protocol[0].value;
    this.sendDp({
      dpValue: n
    })
  },
  handleOpen: function() {
    var e = this,
      t = this.data.protocolJson.mode["总开关"].find((function(e) {
        return "open" === e.value
      })).protocol;
    this.sendDp({
      dpValue: t
    });
    var n = "deviceStatus.mode.总开关.open";
    this.setData(o({}, n, !0)), this.timer1 && clearTimeout(this.timer1), this.timer1 = setTimeout((function() {
      e.setData(o({}, n, !1))
    }), 1e3)
  },
  handleClose: function() {
    var e = this,
      t = this.data.protocolJson.mode["总开关"].find((function(e) {
        return "close" === e.value
      })).protocol;
    this.sendDp({
      dpValue: t
    });
    var n = "deviceStatus.mode.总开关.close";
    this.setData(o({}, n, !0)), this.timer2 && clearTimeout(this.timer2), this.timer2 = setTimeout((function() {
      e.setData(o({}, n, !1))
    }), 1e3)
  },
  onLoad: function(e) {
    this.init({
      options: e,
      defaultTitleName: "四路开关",
      protocolJson: a.protocolJson,
      attributeRules: a.attributeRules,
      judgeRules: a.judgeRules,
      specialJson: a.specialJson
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {
    var e = this;
    return n(t().mark((function n() {
      return t().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.next = 1, e.destroy();
          case 1:
          case "end":
            return t.stop()
        }
      }), n)
    })))()
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
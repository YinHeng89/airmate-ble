var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../api/request");
Page({
  data: {
    wkp: [],
    cmd: []
  },
  onLoad: function() {
    var t = arguments,
      o = this;
    return n(e().mark((function n() {
      var i, a, u, c, s;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return i = (t.length > 0 && void 0 !== t[0] ? t[0] : {}).cuiVersion, console.log("cuiVersion", i), e.next = 1, (0, r.getCommandWordsByVsersion)(i);
          case 1:
            a = e.sent, u = a.data, console.log("在CUI获取的词表", u), c = u.filter((function(e) {
              return "wkp" === e.type
            })), s = u.filter((function(e) {
              return "cmd" === e.type
            })), o.setData({
              wkp: c,
              cmd: s
            });
          case 2:
          case "end":
            return e.stop()
        }
      }), n)
    })))()
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});
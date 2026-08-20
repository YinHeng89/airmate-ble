var t = require("../../../../@babel/runtime/helpers/objectSpread2"),
  e = [{
    key: "leftFront",
    label: "左前取暖",
    pos: "lt"
  }, {
    key: "rightFront",
    label: "右前取暖",
    pos: "rt"
  }, {
    key: "leftBack",
    label: "左后取暖",
    pos: "lb"
  }, {
    key: "rightBack",
    label: "右后取暖",
    pos: "rb"
  }],
  r = 345,
  a = 165,
  i = 180 * Math.atan2(165, 345) / Math.PI,
  n = {
    lt: 180 + i,
    rt: 360 - i,
    lb: 180 - i,
    rb: i
  },
  o = 22,
  l = 16,
  s = 22;

function c(t, e) {
  for (var i = [], n = [], c = 0; c <= s; c++) {
    var u = c / s,
      h = (t - o + 2 * u * o) * Math.PI / 180,
      d = l / 2 * Math.cos((u - .5) * Math.PI),
      f = Math.cos(h),
      v = Math.sin(h);
    i.push([r + (e + d) * f, a + (e + d) * v]), n.push([r + (e - d) * f, a + (e - d) * v])
  }
  for (var b = "M" + i[0][0].toFixed(1) + " " + i[0][1].toFixed(1), g = 1; g < i.length; g++) b += "L" + i[g][0].toFixed(1) + " " + i[g][1].toFixed(1);
  for (var p = n.length - 1; p >= 0; p--) b += "L" + n[p][0].toFixed(1) + " " + n[p][1].toFixed(1);
  return b + "Z"
}

function u(t, e) {
  var r = "";
  return t.forEach((function(t) {
    if (t.exist)
      for (var a = n[t.pos], i = 0; i < 5; i++) {
        var o = 78 + 30 * i,
          l = i < t.value ? e || "#fc753b" : "#c2c8d0";
        r += '<path d="' + c(a, o) + '" fill="' + l + '"/>'
      }
  })), "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 330">' + r + "</svg>")
}
Component({
  observers: {
    "uiJson, deviceStatus, styleConfig": function(r, a, i) {
      if (r && a) {
        var n = a.slider || {},
          o = (i || {}).themeColor,
          l = e.map((function(e) {
            var a = r.find((function(t) {
                return "slider" === t.type && t.label === e.label
              })),
              i = Number((n[e.label] || {}).value || 0);
            return t(t({}, e), {}, {
              exist: !!a,
              value: i
            })
          })),
          s = [];
        r.forEach((function(t) {
          "mode" === t.type && t.inHead && Array.isArray(t.children) && t.children.forEach((function(t) {
            t.isBtn && s.push(t)
          }))
        })), this.setData({
          corners: l,
          boardSvg: u(l, o),
          quickBtns: s
        })
      }
    }
  },
  properties: {
    deviceStatus: Object,
    uiJson: Object,
    styleConfig: Object,
    mainSwitchItem: Object
  },
  data: {
    corners: [],
    boardSvg: "",
    quickBtns: [],
    quickGear: 0
  },
  methods: {
    handleMainSwitch: function() {
      this.triggerEvent("mainSwitchChange")
    },
    handleTapQuickBtn: function(t) {
      var e = t.currentTarget.dataset.btn;
      if (e && Array.isArray(e.gearProtocols)) {
        var r = Number(e.step) || 0,
          a = this.data.quickGear + r;
        if (a < 0 && (a = 0), a > 5 && (a = 5), a !== this.data.quickGear) {
          var i = e.gearProtocols[a];
          if (i) {
            this.setData({
              quickGear: a
            });
            var n = this.data.corners.filter((function(t) {
              return t.exist
            })).map((function(t) {
              return {
                label: t.label,
                value: String(a)
              }
            }));
            this.triggerEvent("quickAdjust", {
              protocol: i,
              changes: n
            })
          }
        }
      }
    },
    handleTapCorner: function(t) {
      var e = t.currentTarget.dataset.label,
        r = (this.data.uiJson || []).find((function(t) {
          return "slider" === t.type && t.label === e
        }));
      if (r && r.children) {
        var a = Number(((this.data.deviceStatus.slider || {})[e] || {}).value || 0),
          i = a >= 5 ? 0 : a + 1,
          n = r.children.find((function(t) {
            return Number(t.value) === i
          }));
        n && this.triggerEvent("sliderChange", {
          type: "slider",
          label: e,
          value: n.value,
          protocol: n.protocol
        })
      }
    }
  }
});
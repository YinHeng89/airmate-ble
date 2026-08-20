Component({
  observers: {
    "currentValue,currentDisplayName": function(t, a) {
      if (a || 0 == a) {
        if ("HH:mm" === this.data.displayFormat) {
          var e = parseInt(a),
            i = Math.floor(e / 60),
            s = e % 60,
            n = i < 10 ? "0" + i : "" + i,
            r = s < 10 ? "0" + s : "" + s;
          this.setData({
            displayName: n + ":" + r
          })
        } else this.setData({
          displayName: a + "分钟"
        })
      } else {
        var l = this.data.list.find((function(a) {
          return a.value == t
        }));
        l && this.setData({
          displayName: l.displayName,
          counterValue: t
        })
      }
    },
    list: function(t) {
      var a = t.find((function(t) {
        var a;
        return "left" === (null == t || null === (a = t.special) || void 0 === a ? void 0 : a.position)
      }));
      a && this.setData({
        showLeft: !0,
        leftDisplayName: a.special.displayName
      }), t && t.length > 0 && t[0].displayFormat && this.setData({
        displayFormat: t[0].displayFormat
      })
    }
  },
  properties: {
    list: {
      type: null,
      value: []
    },
    currentValue: {
      type: Number,
      value: 0
    },
    themeColor: {
      type: String,
      value: "#4186fa"
    },
    disabled: {
      type: Boolean,
      value: !1
    },
    currentDisplayName: {
      type: null,
      value: ""
    }
  },
  data: {
    displayName: "",
    leftDisplayName: "",
    showLeft: !1,
    counterValue: "0",
    displayFormat: ""
  },
  methods: {
    handleCounterClose: function() {
      var t = this.data.list.find((function(t) {
        return "left" === t.special.position
      }));
      t && this.triggerEvent("change", t)
    },
    handleCounterMinus: function() {
      var t = this;
      if (this.data.currentDisplayName || 0 == this.data.currentDisplayName) {
        var a = parseInt(this.data.currentDisplayName),
          e = this.data.list.findIndex((function(t) {
            return a <= t.value
          }));
        e - 1 > -1 && this.triggerEvent("change", this.data.list[e - 1])
      } else {
        var i, s = this.data.list.findIndex((function(a) {
          return a.value == t.data.counterValue
        })) - 1;
        s > -1 && (i = this.data.list[s]), i && this.triggerEvent("change", i)
      }
    },
    handleCounterAdd: function() {
      var t = this;
      if (this.data.currentDisplayName || 0 == this.data.currentDisplayName) {
        var a = parseInt(this.data.currentDisplayName),
          e = this.data.list.findIndex((function(t) {
            return a < t.value
          }));
        e > -1 && this.triggerEvent("change", this.data.list[e])
      } else {
        var i = this.data.list.findIndex((function(a) {
          return a.value == t.data.counterValue
        }));
        if (i > -1) {
          var s = i + 1,
            n = this.data.list[s];
          n && this.triggerEvent("change", n)
        }
      }
    }
  }
});
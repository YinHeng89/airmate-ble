Component({
  observers: {
    currentValue: function(t) {
      var e = this.data.list.find((function(e) {
        return e.value == t
      }));
      e && this.setData({
        displayName: e.displayName,
        counterValue: t
      })
    },
    list: function(t) {
      var e = t.find((function(t) {
        var e;
        return "left" === (null == t || null === (e = t.special) || void 0 === e ? void 0 : e.position)
      }));
      e && this.setData({
        showLeft: !0,
        leftDisplayName: e.special.displayName
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
      value: "#5086FE"
    },
    disabled: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    displayName: "",
    leftDisplayName: "",
    showLeft: !1,
    counterValue: "0"
  },
  methods: {
    handleCounterClose: function() {
      var t = this.data.list.find((function(t) {
        return "left" === t.special.position
      }));
      t && this.triggerEvent("change", t)
    },
    handleCounterMinus: function() {
      var t, e = this,
        a = this.data.list.findIndex((function(t) {
          return t.value == e.data.counterValue
        })) - 1;
      a > -1 && (t = this.data.list[a]), t && this.triggerEvent("change", t)
    },
    handleCounterAdd: function() {
      var t = this,
        e = this.data.list.findIndex((function(e) {
          return e.value == t.data.counterValue
        }));
      if (e > -1) {
        var a = e + 1,
          i = this.data.list[a];
        i && this.triggerEvent("change", i)
      }
    }
  }
});
Component({
  properties: {
    themeColor: {
      type: String,
      value: "#5086FE"
    },
    item: {
      type: Object,
      value: {}
    },
    checked: {
      type: Boolean,
      value: !1
    },
    modeData: {
      type: Array,
      value: []
    },
    modeStatus: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    handleSwitchChange: function() {
      var e = !this.data.checked,
        t = e ? "open" : "close",
        a = this.data.item,
        o = a.protocol,
        n = a.label,
        i = o.find((function(e) {
          return e.key === t
        }));
      if (i) {
        var r = {
          checked: e,
          children: this.data.modeStatus
        };
        this.triggerEvent("fanYaoTouChange", {
          protocol: i.value,
          label: n,
          newStatus: r,
          type: "customizeXiaoyiBtn"
        })
      }
    },
    handleModeChange: function(e) {
      var t = e.currentTarget.dataset.child,
        a = !e.currentTarget.dataset.status,
        o = a ? "open" : "close",
        n = t.protocol.find((function(e) {
          return e.key === o
        }));
      if (n) {
        var i = t.displayName,
          r = {};
        for (var c in this.data.modeStatus) Object.hasOwnProperty.call(this.data.modeStatus, c) && (a ? r[c] = c === i && a : c === i && (r[c] = !1));
        var l = {
          checked: this.data.checked,
          children: r
        };
        this.triggerEvent("fanYaoTouChange", {
          protocol: n.value,
          label: this.data.item.label,
          newStatus: l,
          type: "customizeXiaoyiBtn"
        })
      }
    }
  }
});
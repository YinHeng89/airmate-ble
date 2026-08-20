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
      var t = !this.data.checked,
        e = t ? "open" : "close",
        a = this.data.item,
        o = a.protocol,
        n = a.label,
        r = o.find((function(t) {
          return t.key === e
        }));
      if (r) {
        var i = {
          checked: t,
          children: this.data.modeStatus
        };
        this.triggerEvent("fanYaoTouChange", {
          protocol: r.value,
          label: n,
          newStatus: i
        })
      }
    },
    handleModeChange: function(t) {
      var e = t.currentTarget.dataset.child,
        a = !t.currentTarget.dataset.status,
        o = a ? "open" : "close",
        n = e.protocol.find((function(t) {
          return t.key === o
        }));
      if (n) {
        var r = e.displayName,
          i = this.data.modeStatus;
        for (var c in this.data.modeStatus) Object.hasOwnProperty.call(this.data.modeStatus, c) && (a ? i[c] = c === r && a : c === r && (i[c] = !1));
        var d = {
          checked: this.data.checked,
          children: i
        };
        this.triggerEvent("fanYaoTouChange", {
          protocol: n.value,
          label: this.data.item.label,
          newStatus: d
        })
      }
    },
    handleTapBtn: function(t) {
      var e = t.currentTarget.dataset.child.protocol.find((function(t) {
        return "open" === t.key
      }));
      this.triggerEvent("tapBtn", {
        protocol: e.value
      })
    }
  }
});
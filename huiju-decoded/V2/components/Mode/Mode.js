var e = require("../../../@babel/runtime/helpers/objectSpread2");
require("../../../@babel/runtime/helpers/Arrayincludes"), Component({
  observers: {
    currentStatus: function(e) {
      var t = [];
      for (var a in e) e[a] && t.push(a);
      this.setData({
        activeKeys: t
      }), this.calcDisabledKeys(t)
    }
  },
  properties: {
    list: {
      type: null,
      value: []
    },
    currentStatus: {
      type: Object,
      value: null
    },
    themeColor: {
      type: String,
      value: "#5086FE"
    }
  },
  data: {
    activeKeys: [],
    disabledKeys: []
  },
  methods: {
    calcDisabledKeys: function(e) {
      var t = [];
      (this.data.list || []).forEach((function(a) {
        a.disabledModes && e.includes(a.displayName) && a.disabledModes.forEach((function(e) {
          t.includes(e) || t.push(e)
        }))
      })), this.setData({
        disabledKeys: t
      })
    },
    handleTap: function(t) {
      var a = t.currentTarget.dataset.item;
      if (!a.disabled && !this.data.disabledKeys.includes(a.displayName)) {
        var s = !this.data.activeKeys.includes(a.displayName);
        this.triggerEvent("change", e(e({}, a), {}, {
          status: s
        }))
      }
    },
    handleTapBtn: function(e) {
      var t = e.currentTarget.dataset.child.protocol.find((function(e) {
        return "open" === e.key
      }));
      this.triggerEvent("tapBtn", {
        protocol: t.value
      })
    }
  }
});
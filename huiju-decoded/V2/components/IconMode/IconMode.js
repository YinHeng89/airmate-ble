var e = require("../../../@babel/runtime/helpers/objectSpread2");
Component({
  observers: {
    currentStatus: function(e) {
      var t = [];
      for (var a in e) e[a] && t.push(a);
      this.setData({
        activeKeys: t
      })
    }
  },
  properties: {
    list: {
      type: null,
      value: []
    },
    label: String,
    currentStatus: {
      type: Object,
      value: null
    },
    themeColor: {
      type: String,
      value: "#5086FE"
    },
    customStyle: {
      type: null,
      value: function() {
        return {}
      }
    },
    deviceStatus: {
      type: Object,
      value: null
    }
  },
  data: {
    activeKeys: []
  },
  methods: {
    handleTap: function(t) {
      var a, r, l = t.currentTarget.dataset.item;
      r = (1 !== (null === (a = l.protocol) || void 0 === a ? void 0 : a.length) || "close" !== l.protocol[0].key) && !this.data.activeKeys.includes(l.displayName), this.triggerEvent("change", e(e({}, l), {}, {
        type: "iconMode",
        status: r
      }))
    }
  }
});
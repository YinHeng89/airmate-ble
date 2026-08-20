var e = require("../../@babel/runtime/helpers/objectSpread2");
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
    activeKeys: []
  },
  methods: {
    handleTap: function(t) {
      var a = t.currentTarget.dataset.item,
        r = this.data.activeKeys.includes(a.value) ? "close" : "open";
      this.triggerEvent("change", e(e({}, a), {}, {
        status: r
      }))
    },
    handleBtnTap: function(t) {
      var a = t.currentTarget.dataset.item;
      this.triggerEvent("change", e(e({}, a), {}, {
        status: "open"
      }))
    }
  }
});
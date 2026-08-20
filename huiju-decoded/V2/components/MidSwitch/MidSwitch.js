var e = require("../../../@babel/runtime/helpers/objectSpread2");
Component({
  observers: {
    currentStatus: function(e) {
      var t = [];
      for (var r in e) e[r] && t.push(r);
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
  data: {},
  methods: {
    handleOpen: function(t) {
      var r = t.currentTarget.dataset.item;
      this.triggerEvent("change", e(e({}, r), {}, {
        key: "open"
      }))
    },
    handleClose: function(t) {
      var r = t.currentTarget.dataset.item;
      this.triggerEvent("change", e(e({}, r), {}, {
        key: "close"
      }))
    }
  }
});
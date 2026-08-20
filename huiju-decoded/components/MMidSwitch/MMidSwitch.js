var e = require("../../@babel/runtime/helpers/objectSpread2");
Component({
  properties: {
    item: {
      type: Object,
      value: null
    },
    active: {
      type: Boolean,
      value: !1
    }
  },
  data: {},
  methods: {
    handleOpen: function() {
      var t = this.data.item;
      this.triggerEvent("change", e(e({}, t), {}, {
        status: "open"
      }))
    },
    handleClose: function() {
      var t = this.data.item;
      this.triggerEvent("change", e(e({}, t), {}, {
        status: "close"
      }))
    }
  }
});
var e = require("../../../@babel/runtime/helpers/objectSpread2");
Component({
  properties: {
    checked: {
      type: Boolean,
      value: !1
    },
    displayName: {
      type: String,
      value: ""
    },
    item: {
      type: Object,
      value: null
    },
    themeColor: {
      type: String,
      value: "#1989fa"
    }
  },
  data: {},
  methods: {
    handleSwitchChange: function(t) {
      var a = !this.data.checked,
        i = this.data.item;
      console.log("switchItem", i), this.triggerEvent("change", e(e({}, i), {}, {
        status: a
      }))
    }
  }
});
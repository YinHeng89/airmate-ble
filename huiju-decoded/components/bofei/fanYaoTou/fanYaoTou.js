var t = require("../../../@babel/runtime/helpers/objectSpread2");
Component({
  properties: {
    label: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: null
    },
    status: {
      type: Object,
      value: {}
    },
    activeColor: {
      type: String,
      default: "5086FE"
    },
    type: String
  },
  data: {},
  methods: {
    handleSwitchChange: function() {
      var e = !this.data.status.status ? "open" : "close",
        a = this.data.item;
      console.log("switchItem", a), this.triggerEvent("switchChange", t(t({}, a), {}, {
        status: e,
        label: this.data.label,
        type: this.data.type
      }))
    },
    handleTap: function(e) {
      var a = e.currentTarget.dataset.child,
        s = !e.currentTarget.dataset.status;
      this.triggerEvent("modeChange", t(t({
        label: this.data.label
      }, a), {}, {
        status: s,
        type: this.data.type
      }))
    }
  }
});
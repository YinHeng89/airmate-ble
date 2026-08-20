Component({
  observers: {
    uiJson: function(e) {
      var t = e.find((function(e) {
        return "special" === e.type
      }));
      t && this.setData({
        showSpecial: !0,
        label: t.label
      })
    }
  },
  properties: {
    deviceStatus: Object,
    uiJson: Object
  },
  data: {
    showSpecial: !1,
    label: ""
  },
  methods: {}
});
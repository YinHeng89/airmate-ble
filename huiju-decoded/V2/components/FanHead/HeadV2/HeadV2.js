Component({
  observers: {
    protocolJson: function(e) {
      if (Array.isArray(e)) {
        var n = e.find((function(e) {
          return e.isFanSpeed
        }));
        if (n) {
          var t = n.type,
            a = n.label,
            i = n.children;
          this.setData({
            fanSpeedLabel: a,
            fanSpeedChildren: i,
            fanSpeedType: t
          })
        }
      }
    }
  },
  properties: {
    deviceStatus: Object,
    protocolJson: Object
  },
  data: {
    fanSpeedLabel: "",
    fanSpeedChildren: null,
    fanSpeedType: ""
  },
  methods: {
    handleMainSwitchChange: function() {
      this.triggerEvent("mainSwitchChange")
    }
  }
});
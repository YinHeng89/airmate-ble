Component({
  observers: {
    uiJson: function(e) {
      var t = e.find((function(e) {
        return "waterTemperature" === e.type
      }));
      if (t) {
        var r = t.children;
        this.setData({
          waterTemperatureArr: r
        })
      }
    }
  },
  properties: {
    deviceStatus: Object,
    uiJson: Object
  },
  data: {
    waterTemperatureArr: null
  },
  methods: {
    handleMainSwitchChange: function() {
      this.triggerEvent("mainSwitchChange")
    },
    handleMinusWaterTemperature: function() {
      var e = this.data.deviceStatus.waterTemperature["水温设置"].value,
        t = this.data.waterTemperatureArr.findIndex((function(t) {
          return t.value === e
        })),
        r = this.data.waterTemperatureArr[t - 1];
      r && this.triggerEvent("waterTemperatureChange", r)
    },
    handlePlusWaterTemperature: function() {
      var e = this.data.deviceStatus.waterTemperature["水温设置"].value,
        t = this.data.waterTemperatureArr.findIndex((function(t) {
          return t.value === e
        })),
        r = this.data.waterTemperatureArr[t + 1];
      r && this.triggerEvent("waterTemperatureChange", r)
    }
  }
});
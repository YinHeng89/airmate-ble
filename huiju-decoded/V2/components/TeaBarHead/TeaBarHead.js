Component({
  properties: {
    uiJson: Object,
    deviceStatus: Object,
    style: String,
    styleConfig: Object
  },
  data: {},
  methods: {
    handleWaterTemperatureChange: function(e) {
      this.triggerEvent("waterTemperatureChange", e.detail)
    },
    handleMainSwitchChange: function() {
      this.triggerEvent("mainSwitchChange")
    }
  }
});
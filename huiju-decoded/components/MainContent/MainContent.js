var e = (0, require("../../utils/util").getEnAbleLabelWithCLosedStatus)();
Component({
  properties: {
    protocolJson: {
      type: Object,
      value: null
    },
    deviceStatus: {
      type: Object,
      value: null
    },
    sliderConfig: {
      type: Object,
      value: {
        activeColor: "#BDD6F7",
        inactiveColor: "#eeeeee",
        themeColor: "#4186fa"
      }
    },
    counterConfig: {
      type: Object,
      value: {
        themeColor: "#4186fa"
      }
    },
    modeGroupConfig: {
      type: Object,
      value: {
        themeColor: "#4186fa"
      }
    }
  },
  data: {
    enableLabel: e
  },
  methods: {
    handleSliderChange: function(e) {
      this.triggerEvent("sliderChange", e.detail)
    },
    handleCounterChange: function(e) {
      this.triggerEvent("counterChange", e.detail)
    },
    handleModeChange: function(e) {
      this.triggerEvent("modeChange", e.detail)
    },
    handleSwitchChange: function(e) {
      this.triggerEvent("switchChange", e.detail)
    },
    handleChangeMidSwitch: function(e) {
      this.triggerEvent("midSwitchChange", e.detail)
    },
    handleFanSwitchChange: function(e) {
      this.triggerEvent("fanSwitchChange", e.detail)
    },
    handleFanModeChange: function(e) {
      this.triggerEvent("fanModeChange", e.detail)
    },
    handleModeExcludeChange: function(e) {
      this.triggerEvent("modeExcludeChange", e.detail)
    },
    handleYuYinchange: function(e) {
      this.triggerEvent("yuYinChange", e.detail)
    },
    handlePickerChange: function(e) {
      this.triggerEvent("pickerChange", e.detail)
    }
  }
});
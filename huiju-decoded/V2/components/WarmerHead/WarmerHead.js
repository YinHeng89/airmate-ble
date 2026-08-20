Component({
  properties: {
    uiJson: Object,
    deviceStatus: Object,
    style: String,
    styleConfig: Object,
    mainSwitchItem: Object
  },
  data: {},
  methods: {
    handleTemChange: function(t) {
      this.triggerEvent("temChange", t.detail)
    },
    handleMainSwitchChange: function(t) {
      this.triggerEvent("mainSwitchChange", t.detail)
    },
    handleSliderChange: function(t) {
      this.triggerEvent("sliderChange", t.detail)
    },
    handleTapBtn: function(t) {
      this.triggerEvent("tapBtn", t.detail)
    },
    handleQuickAdjust: function(t) {
      this.triggerEvent("quickAdjust", t.detail)
    }
  }
});
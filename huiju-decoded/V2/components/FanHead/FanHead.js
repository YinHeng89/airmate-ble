Component({
  properties: {
    uiJson: Object,
    deviceStatus: Object,
    style: String
  },
  data: {},
  methods: {
    handleMainSwitchChange: function() {
      this.triggerEvent("mainSwitchChange")
    }
  }
});
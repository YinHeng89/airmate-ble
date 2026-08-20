Component({
  properties: {
    uiJson: Object,
    deviceStatus: Object,
    style: String,
    styleConfig: Object
  },
  data: {},
  methods: {
    handleMainSwitchChange: function() {
      this.triggerEvent("mainSwitchChange")
    }
  }
});
Component({
  properties: {
    deviceStatus: Object
  },
  data: {},
  methods: {
    handleMainSwitchChange: function() {
      this.triggerEvent("mainSwitchChange")
    }
  }
});
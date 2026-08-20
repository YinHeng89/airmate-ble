Component({
  properties: {
    device: Object
  },
  data: {},
  methods: {
    handleGoToOTA: function() {
      this.triggerEvent("goToOTA")
    }
  }
});
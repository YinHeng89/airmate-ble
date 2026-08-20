Component({
  properties: {
    protocolList: {
      type: Array,
      value: []
    },
    max: {
      type: Number,
      value: 6
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    }
  },
  data: {
    value: 3
  },
  methods: {
    handleSliderChange: function(t) {
      var a = t.detail;
      if (!(a > this.data.max || a < this.data.min)) {
        if (a > this.data.value) {
          var i = this.data.protocolList.find((function(t) {
            return "plus" === t.action
          }));
          a === this.data.max && (i = this.data.protocolList.find((function(t) {
            return "max" === t.action
          }))), this.triggerEvent("change", i), console.log("增加了")
        } else if (a < this.data.value) {
          var e = this.data.protocolList.find((function(t) {
            return "minus" === t.action
          }));
          a === this.data.max && (e = this.data.protocolList.find((function(t) {
            return "min" === t.action
          }))), this.triggerEvent("change", e), console.log("减少了")
        }
        this.setData({
          value: a
        })
      }
    }
  }
});
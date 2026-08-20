Component({
  observers: {
    currentValue: function(e) {
      var t = this.data.list.find((function(t) {
        return e == t.value
      }));
      t && this.setData({
        showValue: t.displayName,
        sliderValue: e
      })
    },
    list: function(e) {
      if (e) {
        var t = e.sort((function(e, t) {
            return e - t
          })),
          a = t[0].value,
          i = t[t.length - 1].value;
        this.setData({
          min: a,
          max: i
        })
      }
    }
  },
  properties: {
    step: {
      type: Number,
      value: 1
    },
    disabled: {
      type: Boolean,
      value: !1
    },
    currentValue: {
      type: Number,
      value: 0
    },
    activeColor: {
      type: String,
      value: "#BDD6F7"
    },
    inactiveColor: {
      type: String,
      value: "#eeeeee"
    },
    list: {
      type: null,
      value: null
    },
    themeColor: {
      type: String,
      value: "#4186fa"
    }
  },
  data: {
    showValue: 0,
    min: 0,
    max: 100,
    sliderValue: 0
  },
  methods: {
    handleChangeSlider: function(e) {
      var t = e.detail,
        a = this.data.list.find((function(e) {
          return t == e.value
        }));
      this.triggerEvent("change", a)
    },
    handleDragSlider: function(e) {
      var t = e.detail.value,
        a = this.data.list.find((function(e) {
          return t == e.value
        }));
      this.setData({
        showValue: a.displayName
      }), this.triggerEvent("change", a)
    },
    handleMinus: function() {
      if (!(this.data.sliderValue <= this.data.min)) {
        var e = this.data.sliderValue - 1,
          t = this.data.list.find((function(t) {
            return e == t.value
          }));
        this.triggerEvent("change", t)
      }
    },
    handleAdd: function() {
      if (!(this.data.sliderValue >= this.data.max)) {
        var e = this.data.sliderValue + 1,
          t = this.data.list.find((function(t) {
            return e == t.value
          }));
        this.triggerEvent("change", t)
      }
    }
  }
});
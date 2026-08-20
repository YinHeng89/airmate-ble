var t = require("../../../@babel/runtime/helpers/objectSpread2");
Component({
  observers: {
    currentValue: function(t) {
      var e = this.data.list.find((function(e) {
        return t == e.value
      }));
      e && this.setData({
        showValue: e.displayName,
        sliderValue: t
      })
    },
    list: function(t) {
      if (t) {
        var e = t.sort((function(t, e) {
            return t - e
          })),
          a = e[0].value,
          i = e[e.length - 1].value,
          l = e[e.length - 2].value,
          n = 1;
        i && l && (n = i - l), this.setData({
          min: a,
          max: i,
          step: n || 1
        })
      }
    }
  },
  properties: {
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
    },
    type: String,
    label: String
  },
  data: {
    showValue: 0,
    min: 0,
    max: 100,
    step: 1,
    sliderValue: 0
  },
  methods: {
    handleChangeSlider: function(e) {
      var a = e.detail,
        i = this.data.list.find((function(t) {
          return a == t.value
        }));
      this.triggerEvent("change", t(t({}, i), {}, {
        type: this.data.type,
        label: this.data.label
      }))
    },
    handleDragSlider: function(e) {
      var a = e.detail.value,
        i = this.data.list.find((function(t) {
          return a == t.value
        }));
      this.setData({
        showValue: i.displayName
      }), this.triggerEvent("change", t(t({}, i), {}, {
        type: this.data.type,
        label: this.data.label
      }))
    },
    handleMinus: function() {
      var e = this;
      if (!(this.data.sliderValue <= this.data.min)) {
        var a, i = this.data.list.findIndex((function(t) {
          return t.value == e.data.sliderValue
        })) - 1;
        i > -1 && (a = this.data.list[i]), a && this.triggerEvent("change", t(t({}, a), {}, {
          type: this.data.type,
          label: this.data.label
        }))
      }
    },
    handleAdd: function() {
      var e = this;
      if (!(this.data.sliderValue >= this.data.max)) {
        var a = this.data.list.findIndex((function(t) {
          return t.value == e.data.sliderValue
        }));
        if (a > -1) {
          var i = a + 1,
            l = this.data.list[i];
          l && this.triggerEvent("change", t(t({}, l), {}, {
            type: this.data.type,
            label: this.data.label
          }))
        }
      }
    }
  }
});
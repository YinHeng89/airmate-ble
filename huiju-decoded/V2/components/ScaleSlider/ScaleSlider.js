var t = require("../../../@babel/runtime/helpers/objectSpread2");
Component({
  observers: {
    currentValue: function(t) {
      var a = this.data.list;
      if (a) {
        var e = a.findIndex((function(a) {
          return a.value == t
        }));
        e >= 0 && this.setData({
          currentIndex: e
        })
      }
    },
    list: function(t) {
      t && this.setData({
        total: t.length
      })
    }
  },
  properties: {
    disabled: {
      type: Boolean,
      value: !1
    },
    currentValue: {
      type: null,
      value: 0
    },
    list: {
      type: Array,
      value: []
    },
    themeColor: {
      type: String,
      value: "#4186fa"
    },
    type: String,
    label: String
  },
  data: {
    currentIndex: 0,
    total: 0
  },
  methods: {
    handleMinus: function() {
      if (!(this.data.disabled || this.data.currentIndex <= 0)) {
        var a = this.data.currentIndex - 1;
        this.setData({
          currentIndex: a
        });
        var e = this.data.list[a];
        this.triggerEvent("change", t(t({}, e), {}, {
          type: this.data.type,
          label: this.data.label
        }))
      }
    },
    handleAdd: function() {
      if (!(this.data.disabled || this.data.currentIndex >= this.data.total - 1)) {
        var a = this.data.currentIndex + 1;
        this.setData({
          currentIndex: a
        });
        var e = this.data.list[a];
        this.triggerEvent("change", t(t({}, e), {}, {
          type: this.data.type,
          label: this.data.label
        }))
      }
    },
    handleTap: function(a) {
      if (!this.data.disabled) {
        var e = a.currentTarget.dataset.index;
        if (e !== this.data.currentIndex) {
          this.setData({
            currentIndex: e
          });
          var i = this.data.list[e];
          this.triggerEvent("change", t(t({}, i), {}, {
            type: this.data.type,
            label: this.data.label
          }))
        }
      }
    },
    handleTrackTap: function(a) {
      var e = this;
      if (!this.data.disabled) {
        var i = this.data.total;
        if (!(i <= 1)) this.createSelectorQuery().select(".track").boundingClientRect((function(r) {
          if (r) {
            var n = (a.detail.x - r.left) / r.width,
              d = Math.round(n * (i - 1));
            if ((d = Math.max(0, Math.min(i - 1, d))) !== e.data.currentIndex) {
              e.setData({
                currentIndex: d
              });
              var s = e.data.list[d];
              e.triggerEvent("change", t(t({}, s), {}, {
                type: e.data.type,
                label: e.data.label
              }))
            }
          }
        })).exec()
      }
    }
  }
});
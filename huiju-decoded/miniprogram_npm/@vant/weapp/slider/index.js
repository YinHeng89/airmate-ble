Object.defineProperty(exports, "__esModule", {
  value: !0
});
var t = require("../common/component"),
  a = require("../mixins/touch"),
  e = require("../common/version"),
  i = require("../common/utils"),
  n = "start",
  s = "moving",
  r = "end";
(0, t.VantComponent)({
  mixins: [a.touch],
  props: {
    range: Boolean,
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: null,
      value: 0,
      observer: function(t) {
        t !== this.value && this.updateValue(t)
      }
    },
    vertical: Boolean,
    barHeight: null
  },
  created: function() {
    this.updateValue(this.data.value)
  },
  methods: {
    onTouchStart: function(t) {
      var a = this;
      if (!this.data.disabled) {
        var e = t.currentTarget.dataset.index;
        "number" == typeof e && (this.buttonIndex = e), this.touchStart(t), this.startValue = this.format(this.value), this.newValue = this.value, this.isRange(this.newValue) ? this.startValue = this.newValue.map((function(t) {
          return a.format(t)
        })) : this.startValue = this.format(this.newValue), this.dragStatus = n
      }
    },
    onTouchMove: function(t) {
      var a = this;
      this.data.disabled || (this.dragStatus === n && this.$emit("drag-start"), this.touchMove(t), this.dragStatus = s, (0, i.getRect)(this, ".van-slider").then((function(t) {
        var e = a.data.vertical,
          i = (e ? a.deltaY : a.deltaX) / (e ? t.height : t.width) * a.getRange();
        a.isRange(a.startValue) ? a.newValue[a.buttonIndex] = a.startValue[a.buttonIndex] + i : a.newValue = a.startValue + i, a.updateValue(a.newValue, !1, !0)
      })))
    },
    onTouchEnd: function() {
      var t = this;
      this.data.disabled || this.dragStatus === s && (this.dragStatus = r, (0, i.nextTick)((function() {
        t.updateValue(t.newValue, !0), t.$emit("drag-end")
      })))
    },
    onClick: function(t) {
      var a = this;
      if (!this.data.disabled) {
        var e = this.data.min;
        (0, i.getRect)(this, ".van-slider").then((function(i) {
          var n = a.data.vertical,
            s = t.touches[0],
            r = n ? s.clientY - i.top : s.clientX - i.left,
            u = n ? i.height : i.width,
            h = Number(e) + r / u * a.getRange();
          if (a.isRange(a.value)) {
            var o = a.value,
              c = o[0],
              l = o[1];
            h <= (c + l) / 2 ? a.updateValue([h, l], !0) : a.updateValue([c, h], !0)
          } else a.updateValue(h, !0)
        }))
      }
    },
    isRange: function(t) {
      return this.data.range && Array.isArray(t)
    },
    handleOverlap: function(t) {
      return t[0] > t[1] ? t.slice(0).reverse() : t
    },
    updateValue: function(t, a, n) {
      var s = this;
      t = this.isRange(t) ? this.handleOverlap(t).map((function(t) {
        return s.format(t)
      })) : this.format(t), this.value = t;
      var r = this.data.vertical,
        u = r ? "height" : "width";
      this.setData({
        wrapperStyle: "\n          background: ".concat(this.data.inactiveColor || "", ";\n          ").concat(r ? "width" : "height", ": ").concat((0, i.addUnit)(this.data.barHeight) || "", ";\n        "),
        barStyle: "\n          ".concat(u, ": ").concat(this.calcMainAxis(), ";\n          left: ").concat(r ? 0 : this.calcOffset(), ";\n          top: ").concat(r ? this.calcOffset() : 0, ";\n          ").concat(n ? "transition: none;" : "", "\n        ")
      }), n && this.$emit("drag", {
        value: t
      }), a && this.$emit("change", t), (n || a) && (0, e.canIUseModel)() && this.setData({
        value: t
      })
    },
    getScope: function() {
      return Number(this.data.max) - Number(this.data.min)
    },
    getRange: function() {
      var t = this.data;
      return t.max - t.min
    },
    getOffsetWidth: function(t, a) {
      var e = this.getScope();
      return "".concat(Math.max(100 * (t - a) / e, 0), "%")
    },
    calcMainAxis: function() {
      var t = this.value,
        a = this.data.min;
      return this.isRange(t) ? this.getOffsetWidth(t[1], t[0]) : this.getOffsetWidth(t, Number(a))
    },
    calcOffset: function() {
      var t = this.value,
        a = this.data.min,
        e = this.getScope();
      return this.isRange(t) ? "".concat(100 * (t[0] - Number(a)) / e, "%") : "0%"
    },
    format: function(t) {
      var a = +this.data.min,
        e = +this.data.max,
        n = +this.data.step;
      t = (0, i.clamp)(t, a, e);
      var s = Math.round((t - a) / n) * n;
      return (0, i.addNumber)(a, s)
    }
  }
});
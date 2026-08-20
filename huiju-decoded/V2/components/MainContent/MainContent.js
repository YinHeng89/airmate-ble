var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../@babel/runtime/helpers/createForOfIteratorHelper");
Component({
  observers: {
    "deviceStatus.switch": function(e) {
      if (e) {
        var a, i = this.data.uiJson || [],
          n = !1,
          r = t(i);
        try {
          for (r.s(); !(a = r.n()).done;) {
            var l = a.value;
            if ("switch" === l.type && l.isChildLock && e[l.displayName]) {
              n = !0;
              break
            }
          }
        } catch (e) {
          r.e(e)
        } finally {
          r.f()
        }
        this.setData({
          childLocked: n
        })
      }
    },
    "deviceStatus.mode": function(e) {
      if (e) {
        var t = [];
        for (var a in e) {
          var i = e[a];
          for (var n in i) i[n] && t.push(n)
        }
        this.setData({
          activeModes: t
        })
      }
    }
  },
  properties: {
    uiJson: {
      type: Object,
      value: null
    },
    deviceStatus: {
      type: Object,
      value: null
    },
    styleConfig: {
      type: Object,
      value: {
        themeColor: "#4186fa",
        slider: {
          activeColor: "#BDD6F7",
          inactiveColor: "#eeeeee"
        }
      }
    }
  },
  data: {
    enableLabel: ["预约"],
    childLocked: !1,
    activeModes: []
  },
  methods: {
    handleSliderChange: function(e) {
      this.triggerEvent("sliderChange", e.detail)
    },
    handleCounterChange: function(t) {
      var a = t.currentTarget.dataset.label;
      this.triggerEvent("counterChange", e(e({}, t.detail), {}, {
        label: a
      }))
    },
    handleModeChange: function(e) {
      this.triggerEvent("modeChange", e.detail)
    },
    handleSwitchChange: function(e) {
      this.triggerEvent("switchChange", e.detail)
    },
    handleMidSwitchChange: function(e) {
      this.triggerEvent("midSwitchChange", e.detail)
    },
    handleFanYaoTouChange: function(e) {
      this.triggerEvent("fanYaoTouChange", e.detail)
    },
    handleTapBtn: function(e) {
      this.triggerEvent("tapBtn", e.detail)
    },
    handlePopupPickerChange: function(e) {
      this.triggerEvent("popupPickerChange", e.detail)
    },
    handleScaleSliderChange: function(e) {
      this.triggerEvent("scaleSliderChange", e.detail)
    }
  }
});
var e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator");
require("../../../@babel/runtime/helpers/Arrayincludes"), Component({
  observers: {
    uiJson: function(e) {
      if (e) {
        var t = e.find((function(e) {
          return "mainSwitch" === e.type
        }));
        t && this.setData({
          mainSwitchItem: t
        });
        var n = e.find((function(e) {
          return "commandWordsConfig" === e.type
        }));
        n && this.setData({
          commandWordsConfigTar: n
        })
      }
    },
    user: function(e) {
      ["mainan", "ruide"].includes(e) ? this.setData({
        logo: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/logo/logo.svg"
      }) : this.setData({
        logo: null
      })
    }
  },
  properties: {
    uiJson: Object,
    deviceStatus: Object,
    showNavDefaultBg: Boolean,
    title: String,
    commandWords: Object,
    styleConfig: Object,
    connectStatus: String,
    style: String,
    type: String,
    showSettingBtn: Boolean,
    showOTA: Boolean,
    showEditCommand: Boolean,
    device: Object,
    user: null
  },
  data: {
    mainSwitchItem: null,
    commandWordsConfigTar: null,
    logo: null
  },
  methods: {
    handleMainSwitchChange: function(e) {
      this.triggerEvent("mainSwitchChange", e.detail)
    },
    handleSliderChange: function(e) {
      this.triggerEvent("sliderChange", e.detail)
    },
    handleCounterChange: function(e) {
      this.triggerEvent("counterChange", e.detail)
    },
    handleModeChange: function(e) {
      this.triggerEvent("modeChange", e.detail)
    },
    handleSwitchChange: function(e) {
      this.triggerEvent("switchChange", e.detail)
    },
    handleTemChange: function(e) {
      this.triggerEvent("temChange", e.detail)
    },
    handleWaterTemperatureChange: function(e) {
      this.triggerEvent("waterTemperatureChange", e.detail)
    },
    handleFanYaoTouChange: function(e) {
      this.triggerEvent("fanYaoTouChange", e.detail)
    },
    handleMidSwitchChange: function(e) {
      this.triggerEvent("midSwitchChange", e.detail)
    },
    handleGoToEditCommand: function() {
      this.triggerEvent("goToEditCommand")
    },
    handleTapSetting: function() {
      this.triggerEvent("tapSetting")
    },
    handlePopupPickerChange: function(e) {
      this.triggerEvent("popupPickerChange", e.detail)
    },
    handleScaleSliderChange: function(e) {
      this.triggerEvent("scaleSliderChange", e.detail)
    },
    handleTapBtn: function(e) {
      this.triggerEvent("tapBtn", e.detail)
    },
    handleQuickAdjust: function(e) {
      this.triggerEvent("quickAdjust", e.detail)
    },
    handleGotoOTA: function() {
      var n = this;
      return t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (n.data.device) {
                e.next = 1;
                break
              }
              return wx.showToast({
                title: "缺少目标设备",
                icon: "error"
              }), e.abrupt("return");
            case 1:
              n.triggerEvent("goToOTA");
            case 2:
            case "end":
              return e.stop()
          }
        }), t)
      })))()
    }
  }
});
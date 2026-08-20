module.exports = {
  protocolJson: [{
    id: "1",
    type: "mainSwitch",
    displayName: "",
    protocol: [{
      key: "open",
      value: "5A 0C 01"
    }, {
      key: "close",
      value: "5A 0C 02"
    }]
  }, {
    id: "4",
    type: "lightSlider",
    label: "亮度",
    action: "min",
    displayName: "",
    protocol: "5A 0C 04"
  }, {
    id: "3",
    type: "lightSlider",
    label: "亮度",
    action: "plus",
    displayName: "",
    protocol: "5A 0C 05"
  }, {
    id: "2",
    type: "lightSlider",
    label: "亮度",
    action: "minus",
    displayName: "",
    protocol: "5A 0C 06"
  }, {
    id: "5",
    type: "lightSlider",
    label: "亮度",
    action: "max",
    displayName: "",
    protocol: "5A 0C 03"
  }, {
    id: "6",
    type: "sliderV2",
    label: "色温",
    action: "minus",
    displayName: "",
    protocol: "5A 0C 09"
  }, {
    id: "7",
    type: "sliderV2",
    label: "色温",
    action: "plus",
    displayName: "",
    protocol: "5A 0C 0A"
  }, {
    id: "8",
    type: "sliderV2",
    label: "色温",
    action: "min",
    displayName: "",
    protocol: "5A 0C 07"
  }, {
    id: "9",
    type: "sliderV2",
    label: "色温",
    action: "max",
    displayName: "",
    protocol: "5A 0C 08"
  }, {
    id: "10",
    type: "mode",
    label: "模式选择",
    displayName: "夜灯",
    value: "yedeng",
    protocol: [{
      key: "open",
      value: "5A 0C 0B"
    }, {
      key: "close",
      value: "5A 0C 0C"
    }]
  }, {
    id: "11",
    type: "mode",
    label: "模式选择",
    displayName: "氛围灯",
    value: "fenweideng",
    protocol: [{
      key: "open",
      value: "5A 0C 0D"
    }, {
      key: "close",
      value: "5A 0C 0E"
    }]
  }]
};
module.exports = {
  protocolJson: [{
    id: "2",
    type: "waySwitch",
    label: "线路",
    displayName: "照明",
    value: "1",
    protocol: [{
      key: "open",
      value: "55 AA 01 96 97 A5"
    }]
  }, {
    id: "3",
    type: "waySwitch",
    label: "线路",
    displayName: "换气",
    value: "2",
    protocol: [{
      key: "open",
      value: "55 AA 01 97 98 A5"
    }]
  }, {
    id: "4",
    type: "waySwitch",
    label: "线路",
    displayName: "吹风",
    value: "3",
    protocol: [{
      key: "open",
      value: "55 AA 01 98 99 A5"
    }]
  }, {
    id: "5",
    type: "waySwitch",
    label: "线路",
    displayName: "加热1",
    value: "5",
    protocol: [{
      key: "open",
      value: "55 AA 01 99 9A A5"
    }]
  }, {
    id: "5",
    type: "waySwitch",
    label: "线路",
    displayName: "加热2",
    value: "6",
    protocol: [{
      key: "open",
      value: "55 AA 01 99 9A A5"
    }]
  }, {
    id: "5",
    type: "waySwitch",
    label: "线路",
    displayName: "加热3",
    value: "7",
    protocol: [{
      key: "open",
      value: "55 AA 01 99 9A A5"
    }]
  }, {
    id: "5",
    type: "waySwitch",
    label: "线路",
    displayName: "加热0",
    value: "4",
    protocol: [{
      key: "open",
      value: "55 AA 01 99 9A A5"
    }]
  }, {
    id: "10",
    type: "mode",
    label: "模式",
    displayName: "语音",
    value: "jingyin",
    protocol: [{
      key: "open",
      value: "55 AA 01 CF D0 A5"
    }, {
      key: "close",
      value: "55 AA 01 D0 D1 A5"
    }],
    icon_on: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/yuyin/yuyin_on.svg",
    icon_off: "https://static.duiopen.com/CUIexample/yt-miniprogram/image/yuyin/yuyin_off.svg"
  }],
  attributeRules: [{
    type: "direct",
    position: "3",
    path: "model"
  }, {
    type: "bit",
    position: "4",
    children: [{
      type: "direct",
      position: "0",
      path: "waySwitch.线路.照明"
    }, {
      type: "direct",
      position: "1",
      path: "waySwitch.线路.换气"
    }, {
      type: "direct",
      position: "2",
      path: "waySwitch.线路.吹风"
    }]
  }, {
    type: "bit",
    position: "5",
    children: [{
      type: "direct",
      position: "0",
      path: "waySwitch.线路.加热1"
    }, {
      type: "direct",
      position: "1",
      path: "waySwitch.线路.加热2"
    }, {
      type: "direct",
      position: "2",
      path: "waySwitch.线路.加热3"
    }]
  }, {
    type: "map",
    position: "6",
    map: {
      "01": !0,
      "00": !1
    },
    path: "mode.模式.jingyin"
  }],
  judgeRules: [{
    type: "attribute",
    position: "2",
    value: "04"
  }],
  specialJson: [{
    type: "searchState",
    value: "55 AA 04 00 04 A5"
  }]
};
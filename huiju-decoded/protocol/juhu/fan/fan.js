module.exports = {
  protocolJson: [{
    id: "1",
    type: "mainSwitch",
    displayName: "",
    protocol: [{
      key: "open",
      value: "55 AA 01 01 02 A5"
    }, {
      key: "close",
      value: "55 AA 01 02 03 A5"
    }]
  }, {
    id: "2",
    type: "slider",
    label: "风速设置",
    value: "1",
    displayName: "1档",
    protocol: "55 AA 01 09 0A A5"
  }, {
    id: "3",
    type: "slider",
    label: "风速设置",
    value: "2",
    displayName: "2档",
    protocol: "55 AA 01 0B 0C A5"
  }, {
    id: "4",
    type: "slider",
    label: "风速设置",
    value: "3",
    displayName: "3档",
    protocol: "55 AA 01 0C 0D A5"
  }, {
    id: "5",
    type: "slider",
    label: "风速设置",
    value: "4",
    displayName: "4档",
    protocol: "55 AA 01 0D 0E A5"
  }, {
    id: "6",
    type: "slider",
    label: "风速设置",
    value: "5",
    displayName: "5档",
    protocol: "55 AA 01 0E 0F A5"
  }, {
    id: "7",
    type: "slider",
    label: "风速设置",
    value: "6",
    displayName: "6档",
    protocol: "55 AA 01 0F 10 A5"
  }, {
    id: "8",
    type: "slider",
    label: "风速设置",
    value: "7",
    displayName: "7档",
    protocol: "55 AA 01 10 11 A5"
  }, {
    id: "9",
    type: "slider",
    label: "风速设置",
    value: "8",
    displayName: "8档",
    protocol: "55 AA 01 11 12 A5"
  }, {
    id: "10",
    type: "slider",
    label: "风速设置",
    value: "9",
    displayName: "9档",
    protocol: "55 AA 01 12 13 A5"
  }, {
    id: "21",
    type: "counter",
    label: "定时",
    value: "0",
    displayName: "0小时",
    protocol: "55 AA 01 54 55 A5",
    special: {
      position: "left",
      displayName: "取消定时"
    }
  }, {
    id: "22",
    type: "counter",
    label: "定时",
    value: "1",
    displayName: "1小时",
    protocol: "55 AA 01 44 45 A5"
  }, {
    id: "23",
    type: "counter",
    label: "定时",
    value: "2",
    displayName: "2小时",
    protocol: "55 AA 01 45 46 A5"
  }, {
    id: "24",
    type: "counter",
    label: "定时",
    value: "3",
    displayName: "3小时",
    protocol: "55 AA 01 47 48 A5"
  }, {
    id: "25",
    type: "counter",
    label: "定时",
    value: "4",
    displayName: "4小时",
    protocol: "55 AA 01 48 49 A5"
  }, {
    id: "26",
    type: "counter",
    label: "定时",
    value: "5",
    displayName: "5小时",
    protocol: "55 AA 01 49 4A A5"
  }, {
    id: "27",
    type: "counter",
    label: "定时",
    value: "6",
    displayName: "6小时",
    protocol: "55 AA 01 4A 4B A5"
  }, {
    id: "28",
    type: "counter",
    label: "定时",
    value: "7",
    displayName: "7小时",
    protocol: "55 AA 01 4B 4C A5"
  }, {
    id: "29",
    type: "counter",
    label: "定时",
    value: "8",
    displayName: "8小时",
    protocol: "55 AA 01 4C 4D A5"
  }, {
    id: "30",
    type: "counter",
    label: "定时",
    value: "9",
    displayName: "9小时",
    protocol: "55 AA 01 4D 4E A5"
  }, {
    id: "32",
    type: "counter",
    label: "预约",
    value: "0",
    displayName: "0小时",
    protocol: "55 AA 01 8F 90 A5",
    special: {
      position: "left",
      displayName: "取消预约"
    }
  }, {
    id: "33",
    type: "counter",
    label: "预约",
    value: "1",
    displayName: "1小时",
    protocol: "55 AA 01 80 81 A5"
  }, {
    id: "34",
    type: "counter",
    label: "预约",
    value: "2",
    displayName: "2小时",
    protocol: "55 AA 01 81 82 A5"
  }, {
    id: "35",
    type: "counter",
    label: "预约",
    value: "3",
    displayName: "3小时",
    protocol: "55 AA 01 82 83 A5"
  }, {
    id: "36",
    type: "counter",
    label: "预约",
    value: "4",
    displayName: "4小时",
    protocol: "55 AA 01 83 84 A5"
  }, {
    id: "37",
    type: "counter",
    label: "预约",
    value: "5",
    displayName: "5小时",
    protocol: "55 AA 01 84 85 A5"
  }, {
    id: "38",
    type: "counter",
    label: "预约",
    value: "6",
    displayName: "6小时",
    protocol: "55 AA 01 85 86 A5"
  }, {
    id: "39",
    type: "counter",
    label: "预约",
    value: "7",
    displayName: "7小时",
    protocol: "55 AA 01 86 87 A5"
  }, {
    id: "40",
    type: "counter",
    label: "预约",
    value: "8",
    displayName: "8小时",
    protocol: "55 AA 01 87 88 A5"
  }, {
    id: "41",
    type: "counter",
    label: "预约",
    value: "9",
    displayName: "9小时",
    protocol: "55 AA 01 88 89 A5"
  }, {
    id: "42",
    type: "counter",
    label: "预约",
    value: "10",
    displayName: "10小时",
    protocol: "55 AA 01 89 8A A5"
  }, {
    id: "43",
    type: "counter",
    label: "预约",
    value: "11",
    displayName: "11小时",
    protocol: "55 AA 01 8A 8B A5"
  }, {
    id: "44",
    type: "counter",
    label: "预约",
    value: "12",
    displayName: "12小时",
    protocol: "55 AA 01 8B 8C A5"
  }, {
    id: "45",
    type: "counter",
    label: "预约",
    value: "13",
    displayName: "13小时",
    protocol: "55 AA 01 8C 8D A5"
  }, {
    id: "46",
    type: "counter",
    label: "预约",
    value: "14",
    displayName: "14小时",
    protocol: "55 AA 01 8D 8E A5"
  }, {
    id: "47",
    type: "counter",
    label: "预约",
    value: "15",
    displayName: "15小时",
    protocol: "55 AA 01 8E 8F A5"
  }, {
    id: "13",
    type: "bofeiFanYaoTou",
    label: "睡眠风",
    value: "shuimian",
    protocol: [{
      key: "open",
      value: "55 AA 01 30 31 A5"
    }, {
      key: "close",
      value: "55 AA 01 31 32 A5"
    }]
  }, {
    id: "11",
    type: "switch",
    label: "左右摆头",
    value: "zuoyoubaitou",
    protocol: [{
      key: "open",
      value: "55 AA 01 05 06 A5"
    }, {
      key: "close",
      value: "55 AA 01 06 07 A5"
    }]
  }, {
    id: "31",
    type: "switch",
    label: "屏幕",
    value: "pingmu",
    protocol: [{
      key: "open",
      value: "55 AA 01 5F 60 A5"
    }, {
      key: "close",
      value: "55 AA 01 5E 5F A5"
    }]
  }, {
    id: "48",
    type: "switch",
    label: "语音播报",
    value: "yuyinbobao",
    level: 0,
    protocol: [{
      key: "open",
      value: "55 AA 01 63 64 A5"
    }, {
      key: "close",
      value: "55 AA 01 64 65 A5"
    }]
  }],
  attributeRules: [{
    type: "map",
    position: "3",
    map: {
      "01": !0,
      "00": !1
    },
    path: "mainSwitch.status"
  }, {
    type: "bit",
    position: "4",
    children: [{
      type: "direct",
      position: "0",
      path: "switch.左右摆头.zuoyoubaitou"
    }]
  }, {
    type: "bit",
    position: "5",
    children: [{
      type: "direct",
      position: "0",
      path: "bofeiFanYaoTou.睡眠风.status"
    }]
  }, {
    type: "direct",
    position: "6",
    path: "slider.风速设置.value"
  }, {
    type: "value",
    isDirect: !0,
    position: "8",
    start: "0",
    end: "4",
    path: "counter.定时.value"
  }, {
    type: "value",
    isDirect: !0,
    position: "8",
    start: "4",
    end: "8",
    path: "counter.预约.value"
  }, {
    type: "bit",
    position: "9",
    children: [{
      type: "direct",
      position: "0",
      path: "switch.屏幕.pingmu"
    }]
  }, {
    type: "bit",
    position: "10",
    children: [{
      type: "direct",
      position: "0",
      path: "switch.语音播报.yuyinbobao"
    }]
  }],
  specialJson: [{
    type: "searchState",
    value: "55 AA 03 00 03 A5"
  }],
  judgeRules: [{
    type: "attribute",
    position: "2",
    value: "03"
  }]
};
module.exports = {
  protocolJson: [{
    id: "1",
    type: "mainSwitch",
    displayName: "",
    protocol: [{
      key: "open",
      value: "AA 01 01 01 55"
    }, {
      key: "close",
      value: "AA 01 01 00 55"
    }],
    commandWords: ["打开暖器", "开机", "开启暖器", "关暖器", "关机", "关闭暖器"]
  }, {
    id: "10",
    type: "counter",
    label: "定时",
    value: "0",
    displayName: "0小时",
    protocol: "AA 01 10 00 55",
    special: {
      position: "left",
      displayName: "取消定时"
    },
    commandWords: ["取消定时"]
  }, {
    id: "11",
    type: "counter",
    label: "定时",
    value: "1",
    displayName: "1小时",
    protocol: "AA 01 10 01 55",
    commandWords: ["定时1小时"]
  }, {
    id: "12",
    type: "counter",
    label: "定时",
    value: "2",
    displayName: "2小时",
    protocol: "AA 01 10 02 55",
    commandWords: ["定时2小时"]
  }, {
    id: "13",
    type: "counter",
    label: "定时",
    value: "3",
    displayName: "3小时",
    protocol: "AA 01 10 03 55",
    commandWords: ["定时3小时"]
  }, {
    id: "14",
    type: "counter",
    label: "定时",
    value: "4",
    displayName: "4小时",
    protocol: "AA 01 10 04 55",
    commandWords: ["定时4小时"]
  }, {
    id: "15",
    type: "counter",
    label: "定时",
    value: "5",
    displayName: "5小时",
    protocol: "AA 01 10 05 55",
    commandWords: ["定时5小时"]
  }, {
    id: "16",
    type: "counter",
    label: "定时",
    value: "6",
    displayName: "6小时",
    protocol: "AA 01 10 06 55",
    commandWords: ["定时6小时"]
  }, {
    id: "17",
    type: "counter",
    label: "定时",
    value: "7",
    displayName: "7小时",
    protocol: "AA 01 10 07 55",
    commandWords: ["定时7小时"]
  }, {
    id: "18",
    type: "counter",
    label: "定时",
    value: "8",
    displayName: "8小时",
    protocol: "AA 01 10 08 55",
    commandWords: ["定时8小时"]
  }, {
    id: "19",
    type: "counter",
    label: "定时",
    value: "9",
    displayName: "9小时",
    protocol: "AA 01 10 09 55",
    commandWords: ["定时9小时"]
  }, {
    id: "20",
    type: "counter",
    label: "定时",
    value: "10",
    displayName: "10小时",
    protocol: "AA 01 10 0A 55",
    commandWords: ["定时10小时"]
  }, {
    id: "21",
    type: "counter",
    label: "定时",
    value: "11",
    displayName: "11小时",
    protocol: "AA 01 10 0B 55",
    commandWords: ["定时11小时"]
  }, {
    id: "22",
    type: "counter",
    label: "定时",
    value: "12",
    displayName: "12小时",
    protocol: "AA 01 10 0C 55",
    commandWords: ["定时12小时"]
  }, {
    id: "23",
    type: "counter",
    label: "定时",
    value: "13",
    displayName: "13小时",
    protocol: "AA 01 10 0D 55",
    commandWords: ["定时13小时"]
  }, {
    id: "24",
    type: "counter",
    label: "定时",
    value: "14",
    displayName: "14小时",
    protocol: "AA 01 10 0E 55",
    commandWords: ["定时14小时"]
  }, {
    id: "25",
    type: "counter",
    label: "定时",
    value: "15",
    displayName: "15小时",
    protocol: "AA 01 10 0F 55",
    commandWords: ["定时15小时"]
  }, {
    id: "26",
    type: "counter",
    label: "定时",
    value: "16",
    displayName: "16小时",
    protocol: "AA 01 10 10 55",
    commandWords: ["定时16小时"]
  }, {
    id: "27",
    type: "counter",
    label: "定时",
    value: "17",
    displayName: "17小时",
    protocol: "AA 01 10 11 55",
    commandWords: ["定时17小时"]
  }, {
    id: "28",
    type: "counter",
    label: "定时",
    value: "18",
    displayName: "18小时",
    protocol: "AA 01 10 12 55",
    commandWords: ["定时18小时"]
  }, {
    id: "29",
    type: "counter",
    label: "定时",
    value: "19",
    displayName: "19小时",
    protocol: "AA 01 10 13 55",
    commandWords: ["定时19小时"]
  }, {
    id: "30",
    type: "counter",
    label: "定时",
    value: "20",
    displayName: "20小时",
    protocol: "AA 01 10 14 55",
    commandWords: ["定时20小时"]
  }, {
    id: "31",
    type: "counter",
    label: "定时",
    value: "21",
    displayName: "21小时",
    protocol: "AA 01 10 15 55",
    commandWords: ["定时21小时"]
  }, {
    id: "32",
    type: "counter",
    label: "定时",
    value: "22",
    displayName: "22小时",
    protocol: "AA 01 10 16 55",
    commandWords: ["定时22小时"]
  }, {
    id: "33",
    type: "counter",
    label: "定时",
    value: "23",
    displayName: "23小时",
    protocol: "AA 01 10 17 55",
    commandWords: ["定时23小时"]
  }, {
    id: "34",
    type: "counter",
    label: "定时",
    value: "24",
    displayName: "24小时",
    protocol: "AA 01 10 18 55",
    commandWords: ["定时24小时"]
  }, {
    id: "35",
    type: "counter",
    label: "预约",
    value: "0",
    displayName: "0小时",
    protocol: "AA 01 19 00 55",
    special: {
      position: "left",
      displayName: "取消预约"
    },
    commandWords: ["取消预约"]
  }, {
    id: "36",
    type: "counter",
    label: "预约",
    value: "1",
    displayName: "1小时",
    protocol: "AA 01 19 01 55",
    commandWords: ["预约1小时"]
  }, {
    id: "37",
    type: "counter",
    label: "预约",
    value: "2",
    displayName: "2小时",
    protocol: "AA 01 19 02 55",
    commandWords: ["预约2小时"]
  }, {
    id: "38",
    type: "counter",
    label: "预约",
    value: "3",
    displayName: "3小时",
    protocol: "AA 01 19 03 55",
    commandWords: ["预约3小时"]
  }, {
    id: "39",
    type: "counter",
    label: "预约",
    value: "4",
    displayName: "4小时",
    protocol: "AA 01 19 04 55",
    commandWords: ["预约4小时"]
  }, {
    id: "40",
    type: "counter",
    label: "预约",
    value: "5",
    displayName: "5小时",
    protocol: "AA 01 19 05 55",
    commandWords: ["预约5小时"]
  }, {
    id: "41",
    type: "counter",
    label: "预约",
    value: "6",
    displayName: "6小时",
    protocol: "AA 01 19 06 55",
    commandWords: ["预约6小时"]
  }, {
    id: "42",
    type: "counter",
    label: "预约",
    value: "7",
    displayName: "7小时",
    protocol: "AA 01 19 07 55",
    commandWords: ["预约7小时"]
  }, {
    id: "43",
    type: "counter",
    label: "预约",
    value: "8",
    displayName: "8小时",
    protocol: "AA 01 19 08 55",
    commandWords: ["预约8小时"]
  }, {
    id: "44",
    type: "counter",
    label: "预约",
    value: "9",
    displayName: "9小时",
    protocol: "AA 01 19 09 55",
    commandWords: ["预约9小时"]
  }, {
    id: "45",
    type: "counter",
    label: "预约",
    value: "10",
    displayName: "10小时",
    protocol: "AA 01 19 0A 55",
    commandWords: ["预约10小时"]
  }, {
    id: "46",
    type: "counter",
    label: "预约",
    value: "11",
    displayName: "11小时",
    protocol: "AA 01 19 0B 55",
    commandWords: ["预约11小时"]
  }, {
    id: "47",
    type: "counter",
    label: "预约",
    value: "12",
    displayName: "12小时",
    protocol: "AA 01 19 0C 55",
    commandWords: ["预约12小时"]
  }, {
    id: "48",
    type: "counter",
    label: "预约",
    value: "13",
    displayName: "13小时",
    protocol: "AA 01 19 0D 55",
    commandWords: ["预约13小时"]
  }, {
    id: "49",
    type: "counter",
    label: "预约",
    value: "14",
    displayName: "14小时",
    protocol: "AA 01 19 0E 55",
    commandWords: ["预约14小时"]
  }, {
    id: "50",
    type: "counter",
    label: "预约",
    value: "15",
    displayName: "15小时",
    protocol: "AA 01 19 0F 55",
    commandWords: ["预约15小时"]
  }, {
    id: "51",
    type: "counter",
    label: "预约",
    value: "16",
    displayName: "16小时",
    protocol: "AA 01 19 10 55",
    commandWords: ["预约16小时"]
  }, {
    id: "52",
    type: "counter",
    label: "预约",
    value: "17",
    displayName: "17小时",
    protocol: "AA 01 19 11 55",
    commandWords: ["预约17小时"]
  }, {
    id: "53",
    type: "counter",
    label: "预约",
    value: "18",
    displayName: "18小时",
    protocol: "AA 01 19 12 55",
    commandWords: ["预约18小时"]
  }, {
    id: "54",
    type: "counter",
    label: "预约",
    value: "19",
    displayName: "19小时",
    protocol: "AA 01 19 13 55",
    commandWords: ["预约19小时"]
  }, {
    id: "55",
    type: "counter",
    label: "预约",
    value: "20",
    displayName: "20小时",
    protocol: "AA 01 19 14 55",
    commandWords: ["预约20小时"]
  }, {
    id: "56",
    type: "counter",
    label: "预约",
    value: "21",
    displayName: "21小时",
    protocol: "AA 01 19 15 55",
    commandWords: ["预约21小时"]
  }, {
    id: "57",
    type: "counter",
    label: "预约",
    value: "22",
    displayName: "22小时",
    protocol: "AA 01 19 16 55",
    commandWords: ["预约22小时"]
  }, {
    id: "58",
    type: "counter",
    label: "预约",
    value: "23",
    displayName: "23小时",
    protocol: "AA 01 19 17 55",
    commandWords: ["预约23小时"]
  }, {
    id: "59",
    type: "counter",
    label: "预约",
    value: "24",
    displayName: "24小时",
    protocol: "AA 01 19 18 55",
    commandWords: ["预约24小时"]
  }, {
    id: "60",
    type: "slider",
    label: "温度设置",
    value: "15",
    displayName: "15度",
    protocol: "AA 01 13 0F 55",
    commandWords: ["温度调到15度"]
  }, {
    id: "61",
    type: "slider",
    label: "温度设置",
    value: "16",
    displayName: "16度",
    protocol: "AA 01 13 10 55",
    commandWords: ["温度调到16度"]
  }, {
    id: "62",
    type: "slider",
    label: "温度设置",
    value: "17",
    displayName: "17度",
    protocol: "AA 01 13 11 55",
    commandWords: ["温度调到17度"]
  }, {
    id: "63",
    type: "slider",
    label: "温度设置",
    value: "18",
    displayName: "18度",
    protocol: "AA 01 13 12 55",
    commandWords: ["温度调到18度"]
  }, {
    id: "64",
    type: "slider",
    label: "温度设置",
    value: "19",
    displayName: "19度",
    protocol: "AA 01 13 13 55",
    commandWords: ["温度调到19度"]
  }, {
    id: "65",
    type: "slider",
    label: "温度设置",
    value: "20",
    displayName: "20度",
    protocol: "AA 01 13 14 55",
    commandWords: ["温度调到20度"]
  }, {
    id: "66",
    type: "slider",
    label: "温度设置",
    value: "21",
    displayName: "21度",
    protocol: "AA 01 13 15 55",
    commandWords: ["温度调到21度"]
  }, {
    id: "67",
    type: "slider",
    label: "温度设置",
    value: "22",
    displayName: "22度",
    protocol: "AA 01 13 16 55",
    commandWords: ["温度调到22度"]
  }, {
    id: "68",
    type: "slider",
    label: "温度设置",
    value: "23",
    displayName: "23度",
    protocol: "AA 01 13 17 55",
    commandWords: ["温度调到23度"]
  }, {
    id: "69",
    type: "slider",
    label: "温度设置",
    value: "24",
    displayName: "24度",
    protocol: "AA 01 13 18 55",
    commandWords: ["温度调到24度"]
  }, {
    id: "70",
    type: "slider",
    label: "温度设置",
    value: "25",
    displayName: "25度",
    protocol: "AA 01 13 19 55",
    commandWords: ["温度调到25度"]
  }, {
    id: "71",
    type: "slider",
    label: "温度设置",
    value: "26",
    displayName: "26度",
    protocol: "AA 01 13 1A 55",
    commandWords: ["温度调到26度"]
  }, {
    id: "72",
    type: "slider",
    label: "温度设置",
    value: "27",
    displayName: "27度",
    protocol: "AA 01 13 1B 55",
    commandWords: ["温度调到27度"]
  }, {
    id: "73",
    type: "slider",
    label: "温度设置",
    value: "28",
    displayName: "28度",
    protocol: "AA 01 13 1C 55",
    commandWords: ["温度调到28度"]
  }, {
    id: "74",
    type: "slider",
    label: "温度设置",
    value: "29",
    displayName: "29度",
    protocol: "AA 01 13 1D 55",
    commandWords: ["温度调到29度"]
  }, {
    id: "75",
    type: "slider",
    label: "温度设置",
    value: "30",
    displayName: "30度",
    protocol: "AA 01 13 1E 55",
    commandWords: ["温度调到30度"]
  }, {
    id: "76",
    type: "slider",
    label: "温度设置",
    value: "31",
    displayName: "31度",
    protocol: "AA 01 13 1F 55",
    commandWords: ["温度调到31度"]
  }, {
    id: "77",
    type: "slider",
    label: "温度设置",
    value: "32",
    displayName: "32度",
    protocol: "AA 01 13 20 55",
    commandWords: ["温度调到32度"]
  }, {
    id: "78",
    type: "slider",
    label: "温度设置",
    value: "33",
    displayName: "33度",
    protocol: "AA 01 13 21 55",
    commandWords: ["温度调到33度"]
  }, {
    id: "79",
    type: "slider",
    label: "温度设置",
    value: "34",
    displayName: "34度",
    protocol: "AA 01 13 22 55",
    commandWords: ["温度调到34度"]
  }, {
    id: "80",
    type: "slider",
    label: "温度设置",
    value: "35",
    displayName: "35度",
    protocol: "AA 01 13 23 55",
    commandWords: ["温度调到35度"]
  }, {
    id: "99",
    type: "slider",
    label: "温度设置",
    value: "36",
    displayName: "36度",
    protocol: "AA 01 13 24 55",
    commandWords: ["温度调到36度"]
  }, {
    id: "92",
    type: "modeExclude",
    label: "冷风",
    displayName: "一档",
    value: "yidang",
    protocol: [{
      key: "open",
      value: "AA 01 03 A0 55"
    }]
  }, {
    id: "93",
    type: "modeExclude",
    label: "冷风",
    displayName: "二档",
    value: "erdang",
    protocol: [{
      key: "open",
      value: "AA 01 03 A1 55"
    }]
  }, {
    id: "94",
    type: "modeExclude",
    label: "冷风",
    displayName: "三档",
    value: "sandang",
    protocol: [{
      key: "open",
      value: "AA 01 03 A2 55"
    }]
  }, {
    id: "96",
    type: "modeExclude",
    label: "暖风",
    displayName: "一档",
    value: "yidang",
    protocol: [{
      key: "open",
      value: "AA 01 03 A3 55"
    }]
  }, {
    id: "97",
    type: "modeExclude",
    label: "暖风",
    displayName: "二档",
    value: "erdang",
    protocol: [{
      key: "open",
      value: "AA 01 03 A4 55"
    }]
  }, {
    id: "98",
    type: "modeExclude",
    label: "暖风",
    displayName: "三档",
    value: "sandang",
    protocol: [{
      key: "open",
      value: "AA 01 03 A5 55"
    }]
  }, {
    id: "2",
    type: "switch",
    label: "摇头",
    value: "yaotou",
    protocol: [{
      key: "open",
      value: "AA 01 02 01 55"
    }, {
      key: "close",
      value: "AA 01 02 00 55"
    }],
    commandWords: ["打开摆头", "打开摇头", "开摆头", "开摇头", "关闭摆头", "关闭摇头", "关摆头", "关摇头"]
  }, {
    id: "81",
    type: "mode",
    label: "模式",
    displayName: "节能",
    value: "jieneng",
    protocol: [{
      key: "open",
      value: "AA 01 15 00 55"
    }, {
      key: "close",
      value: "AA 01 15 F0 55"
    }],
    commandWords: ["打开节能模式", "节能模式", "关闭节能模式", "关节能模式"]
  }, {
    id: "82",
    type: "mode",
    label: "模式",
    displayName: "睡眠",
    value: "shuimian",
    protocol: [{
      key: "open",
      value: "AA 01 15 01 55"
    }, {
      key: "close",
      value: "AA 01 15 F1 55"
    }],
    commandWords: ["打开睡眠模式", "睡眠模式", "关闭睡眠模式", "关睡眠模式"]
  }, {
    id: "83",
    type: "mode",
    label: "模式",
    displayName: "智能",
    value: "zhineng",
    protocol: [{
      key: "open",
      value: "AA 01 15 04 55"
    }],
    commandWords: ["打开智能模式", "智能模式", "关闭智能模式", "关智能模式"]
  }, {
    id: "90",
    type: "switch",
    label: "声控",
    value: "shengkong",
    protocol: [{
      key: "open",
      value: "AA 01 0C 11 55"
    }, {
      key: "close",
      value: "AA 01 0C F1 55"
    }]
  }, {
    id: "6",
    type: "switch",
    label: "屏幕",
    value: "pingmu",
    protocol: [{
      key: "open",
      value: "AA 01 0A 00 55"
    }, {
      key: "close",
      value: "AA 01 0A 01 55"
    }],
    commandWords: ["打开屏幕", "点亮屏幕", "关闭屏幕", "熄灭屏幕", "熄屏"]
  }, {
    id: "7",
    type: "switch",
    label: "小太阳",
    value: "xiaotaiyang",
    protocol: [{
      key: "open",
      value: "AA 01 1A 00 55"
    }, {
      key: "close",
      value: "AA 01 1A 01 55"
    }]
  }, {
    id: "8",
    type: "switch",
    label: "语音",
    value: "yuyin",
    level: 0,
    protocol: [{
      key: "open",
      value: "AA 01 0C F0 55"
    }, {
      key: "close",
      value: "AA 01 0C 00 55"
    }],
    commandWords: ["开启语音", "关闭语音"]
  }, {
    id: "9",
    type: "switch",
    label: "童锁",
    value: "tongsuo",
    protocol: [{
      key: "open",
      value: "AA 01 0E 01 55"
    }, {
      key: "close",
      value: "AA 01 0E 00 55"
    }],
    commandWords: ["取消童锁", "打开童锁"]
  }, {
    id: "84",
    type: "switch",
    label: "加湿",
    value: "jiashi",
    protocol: [{
      key: "open",
      value: "AA 01 16 01 55"
    }, {
      key: "close",
      value: "AA 01 16 00 55"
    }],
    commandWords: ["打开加湿", "开启加湿", "关闭加湿", "关掉加湿"]
  }, {
    id: "85",
    type: "switch",
    label: "灯光",
    value: "dengguang",
    protocol: [{
      key: "open",
      value: "AA 01 17 01 55"
    }, {
      key: "close",
      value: "AA 01 17 00 55"
    }],
    commandWords: ["打开灯光", "关闭灯光"]
  }, {
    id: "86",
    type: "special",
    label: "环境温度"
  }],
  initialRules: [{
    type: "initialMark",
    position: "2",
    value: "04"
  }, {
    type: "showCommand",
    position: "3",
    detail: [{
      type: "HP30262R",
      value: "10"
    }]
  }, {
    type: "max",
    position: "4",
    associatedIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
  }, {
    type: "show",
    position: "4",
    hiddenValue: "00",
    associatedIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
  }, {
    type: "max",
    position: "5",
    associatedIds: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  }, {
    type: "show",
    position: "5",
    hiddenValue: "00",
    associatedIds: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  }, {
    type: "min",
    position: "6",
    associatedIds: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 99]
  }, {
    type: "max",
    position: "7",
    associatedIds: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 99]
  }, {
    type: "multipleControl",
    children: [{
      type: "show",
      position: "6",
      hiddenValue: "00",
      associatedIds: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 99]
    }, {
      type: "show",
      position: "7",
      hiddenValue: "00",
      associatedIds: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 99]
    }]
  }, {
    type: "show",
    position: "8",
    hiddenValue: "00",
    associatedIds: [86]
  }, {
    type: "bit",
    position: "9",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [2]
    }]
  }, {
    type: "bit",
    position: "10",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [90]
    }, {
      type: "show",
      position: "1",
      hiddenValue: "0",
      associatedIds: [8]
    }, {
      type: "show",
      position: "2",
      hiddenValue: "0",
      associatedIds: [7]
    }, {
      type: "show",
      position: "3",
      hiddenValue: "0",
      associatedIds: [9]
    }, {
      type: "show",
      position: "5",
      hiddenValue: "0",
      associatedIds: [6]
    }, {
      type: "show",
      position: "6",
      hiddenValue: "0",
      associatedIds: [85]
    }, {
      type: "show",
      position: "7",
      hiddenValue: "0",
      associatedIds: [84]
    }]
  }, {
    type: "bit",
    position: "11",
    children: [{
      type: "show",
      position: "1",
      hiddenValue: "0",
      associatedIds: [92]
    }, {
      type: "show",
      position: "2",
      hiddenValue: "0",
      associatedIds: [93]
    }, {
      type: "show",
      position: "3",
      hiddenValue: "0",
      associatedIds: [94]
    }, {
      type: "show",
      position: "5",
      hiddenValue: "0",
      associatedIds: [96]
    }, {
      type: "show",
      position: "6",
      hiddenValue: "0",
      associatedIds: [97]
    }, {
      type: "show",
      position: "7",
      hiddenValue: "0",
      associatedIds: [98]
    }]
  }, {
    type: "bit",
    position: "12",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [81]
    }, {
      type: "show",
      position: "1",
      hiddenValue: "0",
      associatedIds: [83]
    }, {
      type: "show",
      position: "2",
      hiddenValue: "0",
      associatedIds: [82]
    }]
  }],
  attributeRules: [{
    type: "attribute",
    position: "2",
    value: "03"
  }, {
    type: "map",
    position: "3",
    map: {
      "01": !0,
      "00": !1
    },
    path: "mainSwitch.status"
  }, {
    type: "direct",
    position: "4",
    path: "counter.定时.value"
  }, {
    type: "direct",
    position: "5",
    path: "counter.预约.value"
  }, {
    type: "direct",
    position: "6",
    path: "slider.温度设置.value"
  }, {
    type: "direct",
    position: "7",
    path: "special.环境温度.value"
  }, {
    type: "bit",
    position: "8",
    children: [{
      type: "direct",
      position: "0",
      path: "switch.摇头.yaotou"
    }]
  }, {
    type: "bit",
    position: "9",
    children: [{
      type: "direct",
      position: "0",
      path: "switch.声控.shengkong"
    }, {
      type: "direct",
      position: "1",
      path: "switch.语音.yuyin"
    }, {
      type: "direct",
      position: "2",
      path: "switch.小太阳.xiaotaiyang"
    }, {
      type: "direct",
      position: "3",
      path: "switch.童锁.tongsuo"
    }, {
      type: "direct",
      position: "5",
      path: "switch.屏幕.pingmu"
    }, {
      type: "direct",
      position: "6",
      path: "switch.灯光.dengguang"
    }, {
      type: "direct",
      position: "7",
      path: "switch.加湿.jiashi"
    }]
  }, {
    type: "bit",
    position: "10",
    children: [{
      type: "direct",
      position: "1",
      path: "modeExclude.冷风.yidang"
    }, {
      type: "direct",
      position: "2",
      path: "modeExclude.冷风.erdang"
    }, {
      type: "direct",
      position: "3",
      path: "modeExclude.冷风.sandang"
    }, {
      type: "direct",
      position: "5",
      path: "modeExclude.暖风.yidang"
    }, {
      type: "direct",
      position: "6",
      path: "modeExclude.暖风.erdang"
    }, {
      type: "direct",
      position: "7",
      path: "modeExclude.暖风.sandang"
    }]
  }, {
    type: "bit",
    position: "11",
    children: [{
      type: "direct",
      position: "0",
      path: "mode.模式.jieneng"
    }, {
      type: "direct",
      position: "1",
      path: "mode.模式.zhineng"
    }, {
      type: "direct",
      position: "2",
      path: "mode.模式.shuimian"
    }]
  }],
  specialJson: [{
    type: "initial",
    value: "AA FC 03 02 55"
  }, {
    type: "searchState",
    value: "AA FC 03 01 55"
  }],
  judgeRules: [{
    type: "attribute",
    position: "2",
    value: "03"
  }, {
    type: "initialMark",
    position: "2",
    value: "04"
  }]
};
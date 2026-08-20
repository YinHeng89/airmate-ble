module.exports = {
  protocolJson: [{
    id: "1",
    type: "mainSwitch",
    displayName: "",
    protocol: [{
      key: "open",
      value: "55 AA 01 02 03 A5"
    }, {
      key: "close",
      value: "55 AA 01 03 04 A5"
    }]
  }, {
    id: "111",
    type: "mode",
    label: "风量调节",
    displayName: "增大风量",
    value: "increaseWind",
    isBtn: !0,
    protocol: [{
      key: "open",
      value: "55 AA 01 0A 0B A5"
    }]
  }, {
    id: "112",
    type: "mode",
    label: "风量调节",
    displayName: "减小风量",
    value: "decreaseWind",
    isBtn: !0,
    protocol: [{
      key: "open",
      value: "55 AA 01 0B 0C A5"
    }]
  }, {
    id: "2",
    type: "slider",
    label: "风速设置",
    value: "1",
    displayName: "1档",
    protocol: "55 AA 01 0B 0C A5"
  }, {
    id: "3",
    type: "slider",
    label: "风速设置",
    value: "2",
    displayName: "2档",
    protocol: "55 AA 01 0C 0D A5"
  }, {
    id: "4",
    type: "slider",
    label: "风速设置",
    value: "3",
    displayName: "3档",
    protocol: "55 AA 01 0D 0E A5"
  }, {
    id: "5",
    type: "slider",
    label: "风速设置",
    value: "4",
    displayName: "4档",
    protocol: "55 AA 01 0E 0F A5"
  }, {
    id: "6",
    type: "slider",
    label: "风速设置",
    value: "5",
    displayName: "5档",
    protocol: "55 AA 01 0F 10 A5"
  }, {
    id: "7",
    type: "slider",
    label: "风速设置",
    value: "6",
    displayName: "6档",
    protocol: "55 AA 01 10 11 A5"
  }, {
    id: "8",
    type: "slider",
    label: "风速设置",
    value: "7",
    displayName: "7档",
    protocol: "55 AA 01 11 12 A5"
  }, {
    id: "9",
    type: "slider",
    label: "风速设置",
    value: "8",
    displayName: "8档",
    protocol: "55 AA 01 12 13 A5"
  }, {
    id: "10",
    type: "slider",
    label: "风速设置",
    value: "9",
    displayName: "9档",
    protocol: "55 AA 01 13 14 A5"
  }, {
    id: "11",
    type: "slider",
    label: "风速设置",
    value: "10",
    displayName: "10档",
    protocol: "55 AA 01 14 15 A5"
  }, {
    id: "12",
    type: "slider",
    label: "风速设置",
    value: "11",
    displayName: "11档",
    protocol: "55 AA 01 15 16 A5"
  }, {
    id: "13",
    type: "slider",
    label: "风速设置",
    value: "12",
    displayName: "12档",
    protocol: "55 AA 01 16 17 A5"
  }, {
    id: "14",
    type: "slider",
    label: "风速设置",
    value: "13",
    displayName: "13档",
    protocol: "55 AA 01 17 18 A5"
  }, {
    id: "15",
    type: "slider",
    label: "风速设置",
    value: "14",
    displayName: "14档",
    protocol: "55 AA 01 18 19 A5"
  }, {
    id: "16",
    type: "slider",
    label: "风速设置",
    value: "15",
    displayName: "15档",
    protocol: "55 AA 01 19 1A A5"
  }, {
    id: "17",
    type: "slider",
    label: "风速设置",
    value: "16",
    displayName: "16档",
    protocol: "55 AA 01 1A 1B A5"
  }, {
    id: "18",
    type: "slider",
    label: "风速设置",
    value: "17",
    displayName: "17档",
    protocol: "55 AA 01 1B 1C A5"
  }, {
    id: "19",
    type: "slider",
    label: "风速设置",
    value: "18",
    displayName: "18档",
    protocol: "55 AA 01 1C 1D A5"
  }, {
    id: "20",
    type: "slider",
    label: "风速设置",
    value: "19",
    displayName: "19档",
    protocol: "55 AA 01 1D 1E A5"
  }, {
    id: "21",
    type: "slider",
    label: "风速设置",
    value: "20",
    displayName: "20档",
    protocol: "55 AA 01 1E 1F A5"
  }, {
    id: "22",
    type: "slider",
    label: "风速设置",
    value: "21",
    displayName: "21档",
    protocol: "55 AA 01 1F 20 A5"
  }, {
    id: "23",
    type: "slider",
    label: "风速设置",
    value: "22",
    displayName: "22档",
    protocol: "55 AA 01 20 21 A5"
  }, {
    id: "24",
    type: "slider",
    label: "风速设置",
    value: "23",
    displayName: "23档",
    protocol: "55 AA 01 21 22 A5"
  }, {
    id: "25",
    type: "slider",
    label: "风速设置",
    value: "24",
    displayName: "24档",
    protocol: "55 AA 01 22 23 A5"
  }, {
    id: "26",
    type: "slider",
    label: "风速设置",
    value: "25",
    displayName: "25档",
    protocol: "55 AA 01 23 24 A5"
  }, {
    id: "27",
    type: "slider",
    label: "风速设置",
    value: "26",
    displayName: "26档",
    protocol: "55 AA 01 24 25 A5"
  }, {
    id: "28",
    type: "slider",
    label: "风速设置",
    value: "27",
    displayName: "27档",
    protocol: "55 AA 01 25 26 A5"
  }, {
    id: "29",
    type: "slider",
    label: "风速设置",
    value: "28",
    displayName: "28档",
    protocol: "55 AA 01 26 27 A5"
  }, {
    id: "30",
    type: "slider",
    label: "风速设置",
    value: "29",
    displayName: "29档",
    protocol: "55 AA 01 27 28 A5"
  }, {
    id: "31",
    type: "slider",
    label: "风速设置",
    value: "30",
    displayName: "30档",
    protocol: "55 AA 01 28 29 A5"
  }, {
    id: "32",
    type: "slider",
    label: "风速设置",
    value: "31",
    displayName: "31档",
    protocol: "55 AA 01 29 2A A5"
  }, {
    id: "33",
    type: "slider",
    label: "风速设置",
    value: "32",
    displayName: "32档",
    protocol: "55 AA 01 2A 2B A5"
  }, {
    id: "34",
    type: "slider",
    label: "风速设置",
    value: "33",
    displayName: "33档",
    protocol: "55 AA 01 2B 2C A5"
  }, {
    id: "35",
    type: "slider",
    label: "风速设置",
    value: "34",
    displayName: "34档",
    protocol: "55 AA 01 2C 2D A5"
  }, {
    id: "36",
    type: "slider",
    label: "风速设置",
    value: "35",
    displayName: "35档",
    protocol: "55 AA 01 2D 2E A5"
  }, {
    id: "37",
    type: "slider",
    label: "风速设置",
    value: "36",
    displayName: "36档",
    protocol: "55 AA 01 2E 2F A5"
  }, {
    id: "38",
    type: "counter",
    label: "定时",
    value: "0",
    displayName: "0小时",
    protocol: "55 AA 01 32 33 A5",
    special: {
      position: "left",
      displayName: "取消定时"
    }
  }, {
    id: "39",
    type: "counter",
    label: "定时",
    value: "1",
    displayName: "1小时",
    protocol: "55 AA 01 33 34 A5"
  }, {
    id: "40",
    type: "counter",
    label: "定时",
    value: "2",
    displayName: "2小时",
    protocol: "55 AA 01 34 35 A5"
  }, {
    id: "41",
    type: "counter",
    label: "定时",
    value: "3",
    displayName: "3小时",
    protocol: "55 AA 01 35 36 A5"
  }, {
    id: "42",
    type: "counter",
    label: "定时",
    value: "4",
    displayName: "4小时",
    protocol: "55 AA 01 36 37 A5"
  }, {
    id: "43",
    type: "counter",
    label: "定时",
    value: "5",
    displayName: "5小时",
    protocol: "55 AA 01 37 38 A5"
  }, {
    id: "44",
    type: "counter",
    label: "定时",
    value: "6",
    displayName: "6小时",
    protocol: "55 AA 01 38 39 A5"
  }, {
    id: "45",
    type: "counter",
    label: "定时",
    value: "7",
    displayName: "7小时",
    protocol: "55 AA 01 39 3A A5"
  }, {
    id: "46",
    type: "counter",
    label: "定时",
    value: "8",
    displayName: "8小时",
    protocol: "55 AA 01 3A 3B A5"
  }, {
    id: "47",
    type: "counter",
    label: "定时",
    value: "9",
    displayName: "9小时",
    protocol: "55 AA 01 3B 3C A5"
  }, {
    id: "48",
    type: "counter",
    label: "定时",
    value: "10",
    displayName: "10小时",
    protocol: "55 AA 01 3C 3D A5"
  }, {
    id: "49",
    type: "counter",
    label: "定时",
    value: "11",
    displayName: "11小时",
    protocol: "55 AA 01 3D 3E A5"
  }, {
    id: "50",
    type: "counter",
    label: "定时",
    value: "12",
    displayName: "12小时",
    protocol: "55 AA 01 3E 3F A5"
  }, {
    id: "51",
    type: "counter",
    label: "定时",
    value: "13",
    displayName: "13小时",
    protocol: "55 AA 01 3F 40 A5"
  }, {
    id: "52",
    type: "counter",
    label: "定时",
    value: "14",
    displayName: "14小时",
    protocol: "55 AA 01 40 41 A5"
  }, {
    id: "53",
    type: "counter",
    label: "定时",
    value: "15",
    displayName: "15小时",
    protocol: "55 AA 01 41 42 A5"
  }, {
    id: "54",
    type: "counter",
    label: "定时",
    value: "16",
    displayName: "16小时",
    protocol: "55 AA 01 42 43 A5"
  }, {
    id: "55",
    type: "counter",
    label: "定时",
    value: "17",
    displayName: "17小时",
    protocol: "55 AA 01 43 44 A5"
  }, {
    id: "56",
    type: "counter",
    label: "定时",
    value: "18",
    displayName: "18小时",
    protocol: "55 AA 01 44 45 A5"
  }, {
    id: "57",
    type: "counter",
    label: "定时",
    value: "19",
    displayName: "19小时",
    protocol: "55 AA 01 45 46 A5"
  }, {
    id: "58",
    type: "counter",
    label: "定时",
    value: "20",
    displayName: "20小时",
    protocol: "55 AA 01 46 47 A5"
  }, {
    id: "59",
    type: "counter",
    label: "定时",
    value: "21",
    displayName: "21小时",
    protocol: "55 AA 01 47 48 A5"
  }, {
    id: "60",
    type: "counter",
    label: "定时",
    value: "22",
    displayName: "22小时",
    protocol: "55 AA 01 48 49 A5"
  }, {
    id: "61",
    type: "counter",
    label: "定时",
    value: "23",
    displayName: "23小时",
    protocol: "55 AA 01 49 4A A5"
  }, {
    id: "62",
    type: "counter",
    label: "定时",
    value: "24",
    displayName: "24小时",
    protocol: "55 AA 01 4A 4B A5"
  }, {
    id: "63",
    type: "counter",
    label: "预约",
    value: "0",
    displayName: "0小时",
    protocol: "55 AA 01 5A 5B A5",
    special: {
      position: "left",
      displayName: "取消预约"
    }
  }, {
    id: "64",
    type: "counter",
    label: "预约",
    value: "1",
    displayName: "1小时",
    protocol: "55 AA 01 5B 5C A5"
  }, {
    id: "65",
    type: "counter",
    label: "预约",
    value: "2",
    displayName: "2小时",
    protocol: "55 AA 01 5C 5D A5"
  }, {
    id: "66",
    type: "counter",
    label: "预约",
    value: "3",
    displayName: "3小时",
    protocol: "55 AA 01 5D 5E A5"
  }, {
    id: "67",
    type: "counter",
    label: "预约",
    value: "4",
    displayName: "4小时",
    protocol: "55 AA 01 5E 5F A5"
  }, {
    id: "68",
    type: "counter",
    label: "预约",
    value: "5",
    displayName: "5小时",
    protocol: "55 AA 01 5F 60 A5"
  }, {
    id: "69",
    type: "counter",
    label: "预约",
    value: "6",
    displayName: "6小时",
    protocol: "55 AA 01 60 61 A5"
  }, {
    id: "70",
    type: "counter",
    label: "预约",
    value: "7",
    displayName: "7小时",
    protocol: "55 AA 01 61 62 A5"
  }, {
    id: "71",
    type: "counter",
    label: "预约",
    value: "8",
    displayName: "8小时",
    protocol: "55 AA 01 62 63 A5"
  }, {
    id: "72",
    type: "counter",
    label: "预约",
    value: "9",
    displayName: "9小时",
    protocol: "55 AA 01 63 64 A5"
  }, {
    id: "73",
    type: "counter",
    label: "预约",
    value: "10",
    displayName: "10小时",
    protocol: "55 AA 01 64 65 A5"
  }, {
    id: "74",
    type: "counter",
    label: "预约",
    value: "11",
    displayName: "11小时",
    protocol: "55 AA 01 65 66 A5"
  }, {
    id: "75",
    type: "counter",
    label: "预约",
    value: "12",
    displayName: "12小时",
    protocol: "55 AA 01 66 67 A5"
  }, {
    id: "76",
    type: "counter",
    label: "预约",
    value: "13",
    displayName: "13小时",
    protocol: "55 AA 01 67 68 A5"
  }, {
    id: "77",
    type: "counter",
    label: "预约",
    value: "14",
    displayName: "14小时",
    protocol: "55 AA 01 68 69 A5"
  }, {
    id: "78",
    type: "counter",
    label: "预约",
    value: "15",
    displayName: "15小时",
    protocol: "55 AA 01 69 6A A5"
  }, {
    id: "79",
    type: "counter",
    label: "预约",
    value: "16",
    displayName: "16小时",
    protocol: "55 AA 01 6A 6B A5"
  }, {
    id: "80",
    type: "counter",
    label: "预约",
    value: "17",
    displayName: "17小时",
    protocol: "55 AA 01 6B 6C A5"
  }, {
    id: "81",
    type: "counter",
    label: "预约",
    value: "18",
    displayName: "18小时",
    protocol: "55 AA 01 6C 6D A5"
  }, {
    id: "82",
    type: "counter",
    label: "预约",
    value: "19",
    displayName: "19小时",
    protocol: "55 AA 01 6D 6E A5"
  }, {
    id: "83",
    type: "counter",
    label: "预约",
    value: "20",
    displayName: "20小时",
    protocol: "55 AA 01 6E 6F A5"
  }, {
    id: "84",
    type: "counter",
    label: "预约",
    value: "21",
    displayName: "21小时",
    protocol: "55 AA 01 6F 70 A5"
  }, {
    id: "85",
    type: "counter",
    label: "预约",
    value: "22",
    displayName: "22小时",
    protocol: "55 AA 01 70 71 A5"
  }, {
    id: "86",
    type: "counter",
    label: "预约",
    value: "23",
    displayName: "23小时",
    protocol: "55 AA 01 71 72 A5"
  }, {
    id: "87",
    type: "counter",
    label: "预约",
    value: "24",
    displayName: "24小时",
    protocol: "55 AA 01 72 73 A5"
  }, {
    id: "88",
    type: "mode",
    label: "风模式",
    displayName: "正常风",
    value: "normal",
    protocol: [{
      key: "open",
      value: "55 AA 01 82 83 A5"
    }, {
      key: "close",
      value: "55 AA 01 83 84 A5"
    }]
  }, {
    id: "89",
    type: "mode",
    label: "风模式",
    displayName: "自然风",
    value: "nature",
    protocol: [{
      key: "open",
      value: "55 AA 01 84 85 A5"
    }, {
      key: "close",
      value: "55 AA 01 85 86 A5"
    }]
  }, {
    id: "90",
    type: "mode",
    label: "风模式",
    displayName: "睡眠风",
    value: "sleep",
    protocol: [{
      key: "open",
      value: "55 AA 01 86 87 A5"
    }, {
      key: "close",
      value: "55 AA 01 87 88 A5"
    }]
  }, {
    id: "91",
    type: "mode",
    label: "风模式",
    displayName: "循环风",
    value: "loop",
    protocol: [{
      key: "open",
      value: "55 AA 01 88 89 A5"
    }, {
      key: "close",
      value: "55 AA 01 89 8A A5"
    }]
  }, {
    id: "92",
    type: "mode",
    label: "风模式",
    displayName: "智能风",
    value: "intelligence",
    protocol: [{
      key: "open",
      value: "55 AA 01 8A 8B A5"
    }, {
      key: "close",
      value: "55 AA 01 8B 8C A5"
    }]
  }, {
    id: "93",
    type: "mode",
    label: "摇头模式",
    displayName: "摇头",
    value: "yaotou",
    protocol: [{
      key: "open",
      value: "55 AA 01 8C 8D A5"
    }, {
      key: "close",
      value: "55 AA 01 8D 8E A5"
    }]
  }, {
    id: "94",
    type: "mode",
    label: "摇头模式",
    displayName: "左右摇头",
    value: "leftYaotou",
    protocol: [{
      key: "open",
      value: "55 AA 01 8E 8F A5"
    }, {
      key: "close",
      value: "55 AA 01 8F 90 A5"
    }]
  }, {
    id: "95",
    type: "mode",
    label: "摇头模式",
    displayName: "上下摇头",
    value: "upYaotou",
    protocol: [{
      key: "open",
      value: "55 AA 01 90 91 A5"
    }, {
      key: "close",
      value: "55 AA 01 91 92 A5"
    }]
  }, {
    id: "108",
    type: "mode",
    label: "摇头模式",
    displayName: "八字摇头",
    value: "baziYaotou",
    protocol: [{
      key: "open",
      value: "55 AA 01 9E 9F A5"
    }, {
      key: "close",
      value: "55 AA 01 9F A0 A5"
    }]
  }, {
    id: "110",
    type: "mode",
    label: "摇头模式",
    displayName: "前后摇头",
    value: "frontBackYaotou",
    protocol: [{
      key: "open",
      value: "55 AA 01 10 11 A5"
    }, {
      key: "close",
      value: "55 AA 01 11 12 A5"
    }]
  }, {
    id: "96",
    type: "mode",
    label: "特殊模式",
    displayName: "童锁",
    value: "tongsuo",
    protocol: [{
      key: "open",
      value: "55 AA 01 92 93 A5"
    }, {
      key: "close",
      value: "55 AA 01 93 94 A5"
    }]
  }, {
    id: "97",
    type: "mode",
    label: "特殊模式",
    displayName: "负离子",
    value: "fulizi",
    protocol: [{
      key: "open",
      value: "55 AA 01 94 95 A5"
    }, {
      key: "close",
      value: "55 AA 01 95 96 A5"
    }]
  }, {
    id: "98",
    type: "mode",
    label: "特殊模式",
    displayName: "屏显",
    value: "pingxian",
    protocol: [{
      key: "open",
      value: "55 AA 01 96 97 A5"
    }, {
      key: "close",
      value: "55 AA 01 97 98 A5"
    }]
  }, {
    id: "99",
    type: "mode",
    label: "特殊模式",
    displayName: "灯光",
    value: "dengguang",
    protocol: [{
      key: "open",
      value: "55 AA 01 98 99 A5"
    }, {
      key: "close",
      value: "55 AA 01 99 9A A5"
    }]
  }, {
    id: "100",
    type: "mode",
    label: "特殊模式",
    displayName: "加湿",
    value: "jiashi",
    protocol: [{
      key: "open",
      value: "55 AA 01 9A 9B A5"
    }, {
      key: "close",
      value: "55 AA 01 9B 9C A5"
    }]
  }, {
    id: "101",
    type: "mode",
    label: "特殊模式",
    displayName: "冷风",
    value: "lengfeng",
    protocol: [{
      key: "open",
      value: "55 AA 01 9C 9D A5"
    }, {
      key: "close",
      value: "55 AA 01 9D 9E A5"
    }]
  }, {
    id: "102",
    type: "mode",
    label: "风模式",
    displayName: "婴儿风",
    value: "yingerfeng",
    protocol: [{
      key: "open",
      value: "55 AA 01 A2 A3 A5"
    }, {
      key: "close",
      value: "55 AA 01 A3 A4 A5"
    }]
  }, {
    id: "103",
    type: "mode",
    label: "风模式",
    displayName: "静音",
    value: "jingyin",
    protocol: [{
      key: "open",
      value: "55 AA 01 A4 A5 A5"
    }, {
      key: "close",
      value: "55 AA 01 A5 A6 A5"
    }]
  }, {
    id: "104",
    type: "mode",
    label: "风模式",
    displayName: "暴风",
    value: "baofeng",
    protocol: [{
      key: "open",
      value: "55 AA 01 A6 A7 A5"
    }, {
      key: "close",
      value: "55 AA 01 A7 A8 A5"
    }]
  }, {
    id: "105",
    type: "mode",
    label: "特殊模式",
    displayName: "驱蚊",
    value: "quwen",
    protocol: [{
      key: "open",
      value: "55 AA 01 A8 A9 A5"
    }, {
      key: "close",
      value: "55 AA 01 A9 AA A5"
    }]
  }, {
    id: "106",
    type: "mode",
    label: "特殊模式",
    displayName: "去甲醛",
    value: "qujiaquan",
    protocol: [{
      key: "open",
      value: "55 AA 01 AA AB A5"
    }, {
      key: "close",
      value: "55 AA 01 AB AC A5"
    }]
  }, {
    id: "107",
    type: "mode",
    label: "特殊模式",
    displayName: "暖光",
    value: "nuanguang",
    protocol: [{
      key: "open",
      value: "55 AA 01 AC AD A5"
    }, {
      key: "close",
      value: "55 AA 01 AD AE A5"
    }]
  }, {
    id: "109",
    type: "switch",
    label: "语音",
    level: 0,
    value: "yuyin",
    protocol: [{
      key: "open",
      value: "55 AA 01 AC AD A5"
    }, {
      key: "close",
      value: "55 AA 01 AD AE A5"
    }]
  }],
  initialRules: [{
    type: "initialMark",
    position: "2",
    value: "04"
  }, {
    type: "show",
    position: "4",
    hiddenValue: "00",
    associatedIds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
  }, {
    type: "max",
    position: "4",
    associatedIds: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
  }, {
    type: "bit",
    position: "5",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [96]
    }, {
      type: "show",
      position: "1",
      hiddenValue: "0",
      associatedIds: [97]
    }, {
      type: "show",
      position: "2",
      hiddenValue: "0",
      associatedIds: [98]
    }, {
      type: "show",
      position: "3",
      hiddenValue: "0",
      associatedIds: [99]
    }, {
      type: "show",
      position: "4",
      hiddenValue: "0",
      associatedIds: [100]
    }, {
      type: "show",
      position: "5",
      hiddenValue: "0",
      associatedIds: [101]
    }, {
      type: "show",
      position: "6",
      hiddenValue: "0",
      associatedIds: [105]
    }, {
      type: "show",
      position: "7",
      hiddenValue: "0",
      associatedIds: [106]
    }]
  }, {
    type: "show",
    position: "6",
    hiddenValue: "00",
    associatedIds: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62]
  }, {
    type: "max",
    position: "6",
    associatedIds: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62]
  }, {
    type: "show",
    position: "7",
    hiddenValue: "00",
    associatedIds: [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
  }, {
    type: "max",
    position: "7",
    associatedIds: [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
  }, {
    type: "bit",
    position: "8",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [88]
    }, {
      type: "show",
      position: "1",
      hiddenValue: "0",
      associatedIds: [89]
    }, {
      type: "show",
      position: "2",
      hiddenValue: "0",
      associatedIds: [90]
    }, {
      type: "show",
      position: "3",
      hiddenValue: "0",
      associatedIds: [91]
    }, {
      type: "show",
      position: "4",
      hiddenValue: "0",
      associatedIds: [92]
    }, {
      type: "show",
      position: "5",
      hiddenValue: "0",
      associatedIds: [102]
    }, {
      type: "show",
      position: "6",
      hiddenValue: "0",
      associatedIds: [103]
    }, {
      type: "show",
      position: "7",
      hiddenValue: "0",
      associatedIds: [104]
    }]
  }, {
    type: "bit",
    position: "9",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [93]
    }, {
      type: "show",
      position: "1",
      hiddenValue: "0",
      associatedIds: [94]
    }, {
      type: "show",
      position: "3",
      hiddenValue: "0",
      associatedIds: [95]
    }, {
      type: "show",
      position: "4",
      hiddenValue: "0",
      associatedIds: [108]
    }, {
      type: "show",
      position: "5",
      hiddenValue: "0",
      associatedIds: [110]
    }, {
      type: "show",
      position: "7",
      hiddenValue: "0",
      associatedIds: [107]
    }]
  }, {
    type: "bit",
    position: "11",
    children: [{
      type: "show",
      position: "0",
      hiddenValue: "0",
      associatedIds: [109]
    }, {
      type: "show",
      position: "3",
      hiddenValue: "0",
      associatedIds: [111]
    }, {
      type: "show",
      position: "4",
      hiddenValue: "0",
      associatedIds: [112]
    }]
  }, {
    type: "showCommand",
    position: "12",
    detail: [{
      type: "show",
      value: "00"
    }, {
      type: "hidden",
      value: "FF"
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
    path: "slider.风速设置.value"
  }, {
    type: "bit",
    position: "5",
    children: [{
      type: "direct",
      position: "0",
      path: "mode.特殊模式.tongsuo"
    }, {
      type: "direct",
      position: "1",
      path: "mode.特殊模式.fulizi"
    }, {
      type: "direct",
      position: "2",
      path: "mode.特殊模式.pingxian"
    }, {
      type: "direct",
      position: "3",
      path: "mode.特殊模式.dengguang"
    }, {
      type: "direct",
      position: "4",
      path: "mode.特殊模式.jiashi"
    }, {
      type: "direct",
      position: "5",
      path: "mode.特殊模式.lengfeng"
    }, {
      type: "direct",
      position: "6",
      path: "mode.特殊模式.quwen"
    }, {
      type: "direct",
      position: "7",
      path: "mode.特殊模式.qujiaquan"
    }]
  }, {
    type: "direct",
    position: "6",
    path: "counter.定时.value"
  }, {
    type: "direct",
    position: "7",
    path: "counter.预约.value"
  }, {
    type: "bit",
    position: "8",
    children: [{
      type: "direct",
      position: "0",
      path: "mode.风模式.normal"
    }, {
      type: "direct",
      position: "1",
      path: "mode.风模式.nature"
    }, {
      type: "direct",
      position: "2",
      path: "mode.风模式.sleep"
    }, {
      type: "direct",
      position: "3",
      path: "mode.风模式.loop"
    }, {
      type: "direct",
      position: "4",
      path: "mode.风模式.intelligence"
    }, {
      type: "direct",
      position: "5",
      path: "mode.风模式.yingerfeng"
    }, {
      type: "direct",
      position: "6",
      path: "mode.风模式.jingyin"
    }, {
      type: "direct",
      position: "7",
      path: "mode.风模式.baofeng"
    }]
  }, {
    type: "bit",
    position: "9",
    children: [{
      type: "direct",
      position: "0",
      path: "mode.摇头模式.yaotou"
    }, {
      type: "direct",
      position: "1",
      path: "mode.摇头模式.leftYaotou"
    }, {
      type: "direct",
      position: "3",
      path: "mode.摇头模式.upYaotou"
    }, {
      type: "direct",
      position: "4",
      path: "mode.摇头模式.baziYaotou"
    }, {
      type: "direct",
      position: "5",
      path: "mode.摇头模式.frontBackYaotou"
    }, {
      type: "direct",
      position: "7",
      path: "mode.特殊模式.nuanguang"
    }]
  }, {
    type: "bit",
    position: "10",
    children: [{
      type: "direct",
      position: "0",
      path: "switch.语音.yuyin"
    }]
  }],
  specialJson: [{
    type: "initial",
    value: "55 AA 04 00 04 A5"
  }, {
    type: "searchState",
    value: "55 AA 03 00 03 A5"
  }],
  judgeRules: [{
    type: "attribute",
    position: "2",
    value: "03"
  }, {
    type: "initialMark",
    position: "2",
    value: "04"
  }],
  commandWords: {
    "唤醒词": ["小爱小爱"],
    "开关": ["打开风扇|打开电风扇|开机", "关闭风扇|关闭电风扇|关机"],
    "风速设置": ["风速X档"],
    "定时": ["关闭定时|取消定时", "定时X小时"],
    "预约": ["关闭预约|取消预约", "预约X小时"],
    "摇头": ["打开摇头", "关闭摇头", "打开左右摇头|左右摇头", "关闭左右摇头", "打开上下摇头|上下摇头", "关闭上下摇头", "打开前后摇头|前后摇头", "关闭前后摇头"],
    "风模式": ["正常风", "关闭正常风", "自然风", "关闭正常风", "睡眠风", "关闭睡眠风", "循环风", "关闭循环风", "智能风", "关闭智能风"],
    "特殊模式": ["打开童锁", "关闭童锁", "打开负离子", "关闭负离子", "打开显示|打开屏显", "关闭显示|关闭屏显", "打开灯光", "关闭灯光", "打开加湿", "关闭加湿", "打开冷风", "关闭冷风", "婴儿风模式", "关闭婴儿风模式", "静音模式", "关闭静音模式", "暴风模式", "关闭暴风模式", "打开驱蚊", "关闭驱蚊", "打开去甲醛", "关闭去甲醛", "打开暖光", "关闭暖光"],
    "风量": ["调大风量|风大点|增大风量", "调小风量|风小点|减小风量"],
    "音量调节": ["增大音量|音量增大", "减小音量|音量减小", "音量最大|最大音量", "音量最小|最小音量"],
    "语音控制": ["打开播报|打开语音", "关闭播报|关闭语音"]
  }
};
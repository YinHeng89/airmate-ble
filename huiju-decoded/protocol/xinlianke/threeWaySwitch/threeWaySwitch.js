module.exports = {
  protocolJson: [{
    id: "1",
    type: "waySwitch",
    label: "线路",
    displayName: "1路",
    value: "1",
    openProtocol: "55 AA 01 06 07 A5",
    closeProtocol: "55 AA 01 07 08 A5"
  }, {
    id: "2",
    type: "waySwitch",
    label: "线路",
    displayName: "2路",
    value: "2",
    openProtocol: "55 AA 01 08 09 A5",
    closeProtocol: "55 AA 01 09 0A A5"
  }, {
    id: "3",
    type: "waySwitch",
    label: "线路",
    displayName: "3路",
    value: "3",
    openProtocol: "55 AA 01 0A 0B A5",
    closeProtocol: "55 AA 01 0B 0C A5"
  }],
  initialRules: [{
    type: "max",
    position: "4",
    associatedIds: [1, 2, 3]
  }],
  lightList: [{
    name: "主灯",
    ident: "14"
  }, {
    name: "铜灯",
    ident: "18"
  }, {
    name: "灯带",
    ident: "1A"
  }, {
    name: "玄关灯",
    ident: "1C"
  }, {
    name: "卧室灯",
    ident: "1E"
  }, {
    name: "背景灯",
    ident: "20"
  }, {
    name: "氛围灯",
    ident: "22"
  }, {
    name: "卫生间灯",
    ident: "24"
  }, {
    name: "排气扇",
    ident: "26"
  }, {
    name: "射灯",
    ident: "28"
  }, {
    name: "壁灯",
    ident: "2A"
  }, {
    name: "床头灯",
    ident: "2C"
  }, {
    name: "吧台灯",
    ident: "2E"
  }, {
    name: "酒柜灯",
    ident: "30"
  }, {
    name: "阳台灯",
    ident: "32"
  }, {
    name: "窗帘",
    ident: "34"
  }, {
    name: "客厅窗帘",
    ident: "36"
  }, {
    name: "客厅灯",
    ident: "38"
  }, {
    name: "客厅灯带",
    ident: "3A"
  }, {
    name: "客厅壁灯",
    ident: "3C"
  }, {
    name: "客厅铜灯",
    ident: "3E"
  }, {
    name: "过道灯",
    ident: "40"
  }, {
    name: "楼道灯",
    ident: "42"
  }],
  attributeRules: [{
    type: "bit",
    position: "4",
    children: [{
      type: "direct",
      position: "0",
      path: "waySwitch.线路.1路"
    }, {
      type: "direct",
      position: "1",
      path: "waySwitch.线路.2路"
    }, {
      type: "direct",
      position: "2",
      path: "waySwitch.线路.3路"
    }],
    prerequisites: [{
      position: "2",
      value: "03"
    }]
  }, {
    type: "direct",
    position: "3",
    path: "bindingIdents.1路",
    prerequisites: [{
      position: "2",
      value: "05"
    }]
  }, {
    type: "direct",
    position: "4",
    path: "bindingIdents.2路",
    prerequisites: [{
      position: "2",
      value: "05"
    }]
  }, {
    type: "direct",
    position: "5",
    path: "bindingIdents.3路",
    prerequisites: [{
      position: "2",
      value: "05"
    }]
  }],
  judgeRules: [{
    type: "init",
    position: "2",
    value: "04"
  }, {
    type: "attribute",
    position: "2",
    value: "03"
  }, {
    type: "queryBindingReport",
    position: "2",
    value: "05"
  }],
  specialJson: [{
    type: "initial",
    value: "55 AA 04 00 04 A5"
  }, {
    type: "searchState",
    value: "55 AA 03 00 03 A5"
  }, {
    type: "queryBinding",
    value: "55 AA 05 00 05 A5"
  }]
};
function e(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  wx.showModal({
    title: "提示",
    content: e,
    showCancel: t
  })
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ab2hex = function(e) {
  return Array.prototype.map.call(new Uint8Array(e), (function(e) {
    return ("00" + e.toString(16)).slice(-2)
  })).join("")
}, exports.byte2Int = function(e, t) {
  return (255 & e) << 8 | t
}, exports.bytesToInt = function(e) {
  if (4 != e.length) return 0;
  return e[0] << 24 | e[1] << 16 | e[2] << 8 | e[3]
}, exports.convertLtvDataToLtvObjArray = function(e) {
  for (var t = [], r = 0, n = 0; n < e.length;) {
    var a = 255 & e[n],
      o = e[n + 1],
      c = e.slice(n + 2, n + a + 1);
    t[r++] = {
      size: a,
      type: o,
      data: c
    }, n = n + a + 1
  }
  return t
}, exports.hex2Mac = function(e) {
  return Array.prototype.map.call(new Uint8Array(e), (function(e) {
    return ("00" + e.toString(16)).slice(-2)
  })).join(":")
}, exports.hexToBytes = function(e) {
  for (var t = [], r = 0; r < e.length; r += 2) t.push(parseInt(e.substr(r, 2), 16));
  return t
}, exports.isDeviceEqual = function(e, t) {
  if (!e || !t) return !1;
  return e.name == t.name && e.deviceId == t.deviceId
}, exports.removeRepeatDevice = function(e, t) {
  if (e && e.name) return t.forEach((function(t) {
    if (t.name == e.name && t.deviceId == e.deviceId) return null
  })), e;
  return null
}, exports.showBtStatusMsg = function(t, r) {
  switch (t) {
    case 1e4:
      e("未初始化蓝牙适配器");
      break;
    case 10001:
      e("未检测到蓝牙，请打开蓝牙重试！");
      break;
    case 10002:
      e("没有找到指定设备");
      break;
    case 10003:
      e("连接失败");
      break;
    case 10004:
      e("没有找到指定服务");
      break;
    case 10005:
      e("没有找到指定特征值");
      break;
    case 10006:
      e("当前连接已断开");
      break;
    case 10007:
      e("当前特征值不支持此操作");
      break;
    case 10008:
      e("其余所有系统上报的异常");
      break;
    case 10009:
      e("Android 系统特有，系统版本低于 4.3 不支持 BLE");
      break;
    default:
      e(r)
  }
}, exports.toast = e;
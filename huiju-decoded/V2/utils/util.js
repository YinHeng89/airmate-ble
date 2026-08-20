Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ab2hex = function(e) {
  return Array.prototype.map.call(new Uint8Array(e), (function(e) {
    return ("00" + e.toString(16)).slice(-2)
  })).join("").toLocaleLowerCase()
}, exports.debounce = function() {
  var e;
  return function(t) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
    e && (clearTimeout(e), e = null), e = setTimeout(t, r)
  }
}, exports.deepClone = function t(r) {
  var o = Array.isArray(r) ? [] : {};
  if (r && "object" === e(r))
    for (var a in r) r.hasOwnProperty(a) && (r[a] && "object" === e(r[a]) ? o[a] = t(r[a]) : o[a] = r[a]);
  return o
}, exports.formatTime = exports.formatNumber = void 0, exports.hex_to_bin = function(e) {
  for (var t = [{
      key: 0,
      val: "0000"
    }, {
      key: 1,
      val: "0001"
    }, {
      key: 2,
      val: "0010"
    }, {
      key: 3,
      val: "0011"
    }, {
      key: 4,
      val: "0100"
    }, {
      key: 5,
      val: "0101"
    }, {
      key: 6,
      val: "0110"
    }, {
      key: 7,
      val: "0111"
    }, {
      key: 8,
      val: "1000"
    }, {
      key: 9,
      val: "1001"
    }, {
      key: "a",
      val: "1010"
    }, {
      key: "b",
      val: "1011"
    }, {
      key: "c",
      val: "1100"
    }, {
      key: "d",
      val: "1101"
    }, {
      key: "e",
      val: "1110"
    }, {
      key: "f",
      val: "1111"
    }], r = "", o = 0; o < e.length; o++)
    for (var a = 0; a < t.length; a++)
      if (e.charAt(o).toLowerCase() == t[a].key) {
        r = r.concat(t[a].val);
        break
      } return r
}, exports.set = function(e, t, r) {
  for (var o = e, a = t.split("."), n = 0; n < a.length; n++) {
    var l = a[n];
    n === a.length - 1 ? o[l] = r : (o[l] = o[l] || {}, o = o[l])
  }
};
var e = require("../../@babel/runtime/helpers/typeof");
exports.formatTime = function(e) {
  var r = e.getFullYear(),
    o = e.getMonth() + 1,
    a = e.getDate(),
    n = e.getHours(),
    l = e.getMinutes(),
    i = e.getSeconds();
  return "".concat([r, o, a].map(t).join("/"), " ").concat([n, l, i].map(t).join(":"))
};
var t = exports.formatNumber = function(e) {
  return (e = e.toString())[1] ? e : "0".concat(e)
};
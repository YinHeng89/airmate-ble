var e = require("../@babel/runtime/helpers/regeneratorRuntime");
require("../@babel/runtime/helpers/Arrayincludes");
var a = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  t = require("../@babel/runtime/helpers/typeof"),
  r = require("../@babel/runtime/helpers/asyncToGenerator"),
  n = require("./logger");

function i() {
  return (i = r(e().mark((function a() {
    var t, r, i, s, o, l, c;
    return e().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          if (e.prev = 0, t = wx.getSystemSetting(), r = t.bluetoothEnabled, i = t.locationEnabled, s = wx.getAppAuthorizeSetting(), o = s.bluetoothAuthorized, l = s.locationAuthorized, console.log("authorizeSetting", s), r || wx.showModal({
              title: "系统权限不足",
              content: "系统未开启蓝牙权限",
              showCancel: !1
            }), i || wx.showModal({
              title: "系统权限不足",
              content: "系统未开启定位权限",
              showCancel: !1
            }), "denied" !== o) {
            e.next = 2;
            break
          }
          return e.next = 1, wx.getBluetoothAdapterState();
        case 1:
          e.sent.available || wx.showModal({
            title: "微信权限不足",
            content: "未授权微信蓝牙权限，请前往应用设置中设置，若应用设置中无法设置蓝牙权限，请忽略此提示",
            confirmText: "前往",
            success: function(e) {
              e.confirm && wx.openAppAuthorizeSetting()
            }
          });
        case 2:
          "denied" === l && wx.showModal({
            title: "微信权限不足",
            content: "未授权微信位置权限，请前往应用设置中设置",
            confirmText: "前往",
            success: function(e) {
              e.confirm && wx.openAppAuthorizeSetting()
            }
          }), e.next = 4;
          break;
        case 3:
          e.prev = 3, c = e.catch(0), console.error(c), n.logger.error("checkAcl", c);
        case 4:
        case "end":
          return e.stop()
      }
    }), a, null, [
      [0, 3]
    ])
  })))).apply(this, arguments)
}
var s = function(e) {
  return (e = e.toString())[1] ? e : "0".concat(e)
};

function o(e) {
  for (var a = [{
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
    }], t = "", r = 0; r < e.length; r++)
    for (var n = 0; n < a.length; n++)
      if (e.charAt(r).toLowerCase() == a[n].key) {
        t = t.concat(a[n].val);
        break
      } return t
}

function l(e, a, t) {
  for (var r = e, n = a.split("."), i = 0; i < n.length; i++) {
    var s = n[i];
    i === n.length - 1 ? r[s] = t : (r[s] = r[s] || {}, r = r[s])
  }
}
module.exports = {
  formatTime: function(e) {
    var a = e.getFullYear(),
      t = e.getMonth() + 1,
      r = e.getDate(),
      n = e.getHours(),
      i = e.getMinutes(),
      o = e.getSeconds();
    return "".concat([a, t, r].map(s).join("/"), " ").concat([n, i, o].map(s).join(":"))
  },
  convertProtocolJson: function(e) {
    var a = e.reduce((function(a, t) {
        var r = t.type;
        switch (r) {
          case "mainSwitch":
            a.mainSwitch || (a.mainSwitch = {}), a.mainSwitch = t;
            break;
          case "slider":
          case "counter":
          case "midSwitch":
          case "switch":
          case "lightSlider":
          case "sliderV2":
            a[r] || (a[r] = {}), t.label && (a[r][t.label] || (a[r][t.label] = []), a[r][t.label].push(t));
            break;
          case "mode":
            a.mode || (a.mode = {}), t.label && (t.title ? (a.mode[t.label] || (a.mode[t.label] = {}), a.mode[t.label][t.title] || (a.mode[t.label][t.title] = []), a.mode[t.label][t.title].push(t)) : (a.mode[t.label] || (a.mode[t.label] = []), a.mode[t.label].push(t)));
            break;
          case "modeExclude":
            a.modeExclude || (a.modeExclude = {}), t.label && (t.title ? (a.modeExclude[t.label] || (a.modeExclude[t.label] = {}), a.modeExclude[t.label][t.title] || (a.modeExclude[t.label][t.title] = []), a.modeExclude[t.label][t.title].push(t)) : (a.modeExclude[t.label] || (a.modeExclude[t.label] = []), a.modeExclude[t.label].push(t)));
            break;
          case "special":
            a.special || (a.special = {}), a.special[t.label] = {};
            break;
          case "commandWordsConfig":
            a.commandWordsConfig || (a.commandWordsConfig = {
              value: t.value
            });
            break;
          case "fanYaoTou":
          case "bofeiFanYaoTou":
          case "ziranfeng":
            if (a[r] || (a[r] = {}), t.fatherId) {
              var n = e.find((function(e) {
                return e.id === t.fatherId
              }));
              if (!n) break;
              a[r][n.label] || (a[r][n.label] = {}, 0 == n.level && (a[r][n.label].level = n.level)), Array.isArray(a[r][n.label].children) || (a[r][n.label].children = []), a[r][n.label].children.push(t)
            } else {
              var i = t.label,
                s = t.value,
                o = t.protocol;
              a[r][i] || (a[r][i] = {}), a[r][i].value = s, a[r][i].protocol = o, 0 == t.level && (a[r][i].level = t.level)
            }
            break;
          case "yuyin":
            a[r] || (a[r] = {}), a[r] = t;
            break;
          case "popupPicker":
            a[r] || (a[r] = {}), a[r][t.label] || (a[r][t.label] = {
              children: []
            }), a[r][t.label].children.push(t);
            break;
          case "waySwitch":
            a[r] || (a[r] = {}), a[r][t.label] || (a[r][t.label] = []), a[r][t.label].push(t)
        }
        return a
      }), {}),
      t = {},
      r = function(e) {
        switch (e) {
          case "mainSwitch":
            t[e] = {
              status: !1
            };
            break;
          case "counter":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              t[e][r] = {
                value: a[e][r][0].value
              }
            }));
            break;
          case "mode":
          case "modeExclude":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              Array.isArray(a[e][r]) ? (t[e][r] || (t[e][r] = {}), a[e][r].forEach((function(a) {
                t[e][r][a.value] = !1
              }))) : (t[e][r] || (t[e][r] = {}), Object.keys(a[e][r]).forEach((function(n) {
                t[e][r][n] || (t[e][r][n] = {}), a[e][r][n].forEach((function(a) {
                  t[e][r][n][a.value] = !1
                }))
              })))
            }));
            break;
          case "slider":
          case "lightSlider":
          case "sliderV2":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              t[e][r] = {
                value: a[e][r][0].value
              }
            }));
            break;
          case "midSwitch":
          case "switch":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              t[e][r] || (t[e][r] = {}), a[e][r].forEach((function(a) {
                t[e][r][a.value] = !1
              }))
            }));
            break;
          case "special":
            t[e] || (t[e] = {}), t[e]["环境温度"] = {
              value: "__"
            };
            break;
          case "fanYaoTou":
          case "bofeiFanYaoTou":
          case "ziranfeng":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              t[e][r] || (t[e][r] = {});
              var n = a[e][r];
              t[e][r].status = !1, t[e][r].children || (t[e][r].children = {}), n.children && n.children.forEach((function(a) {
                t[e][r].children[a.value] = !1
              }))
            }));
            break;
          case "yuyin":
            t[e] || (t[e] = {}), t[e] = {
              status: !1
            };
            break;
          case "popupPicker":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              t[e][r] || (t[e][r] = {}), a[e][r].children.forEach((function(a) {
                t[e][r][a.text] = !1
              }))
            }));
            break;
          case "waySwitch":
            t[e] || (t[e] = {}), Object.keys(a[e]).forEach((function(r) {
              t[e][r] || (t[e][r] = {}), a[e][r].forEach((function(a) {
                t[e][r][a.displayName] = !1
              }))
            }))
        }
      };
    for (var n in a) r(n);
    return {
      resJson: a,
      statusJson: t
    }
  },
  ab2hex: function(e) {
    return Array.prototype.map.call(new Uint8Array(e), (function(e) {
      return ("00" + e.toString(16)).slice(-2)
    })).join("").toLocaleLowerCase()
  },
  parsrAttributeRules: function(e) {
    var a = e.rules,
      t = e.str,
      r = e.deviceStatus,
      n = JSON.parse(JSON.stringify(r));
    return a.forEach((function(e) {
      var a = e.type;
      if (Array.isArray(e.prerequisites) && !e.prerequisites.every((function(e) {
          return t.substr(2 * e.position, 2).toUpperCase() === String(e.value).toUpperCase()
        }))) return;
      switch (a) {
        case "map":
          var r = t.substr(2 * e.position, 2).toUpperCase(),
            i = e.map[r];
          l(n, e.path, i);
          break;
        case "direct":
          var s = t.substr(2 * e.position, 2).toUpperCase(),
            c = parseInt(s, 16);
          l(n, e.path, c);
          break;
        case "bit":
          var u = o(t.substr(2 * e.position, 2).toUpperCase()).split("").reverse().join("");
          e.children.forEach((function(e) {
            var a = e.position,
              t = e.path,
              r = e.type;
            if ("direct" == r) {
              var i = a.split(",");
              if (1 === i.length) {
                var s = i[0],
                  o = "1" == u[s];
                l(n, t, o)
              } else {
                var c = i[0],
                  d = i[1],
                  p = u.substring(c, d).split("").reverse().join("");
                console.log("binData", p);
                var f = parseInt(p, 2);
                console.log("value", f), l(n, t, f)
              }
            } else if ("fengyunMode" == r) {
              var b = a.split(","),
                v = b[0],
                h = b[1],
                m = u.substring(v, h).split("").reverse().join("");
              console.log("binData", m);
              for (var y = parseInt(m, 2), k = 0; k < 8; k++) {
                var g = t + "index";
                l(n, g, y == k)
              }
              l(n, t, y)
            }
          }));
          break;
        case "value":
          var d = o(t.substr(2 * e.position, 2).toUpperCase()).split("").reverse().join(""),
            p = parseInt(d.substring(e.start, e.end).split("").reverse().join(""), 2);
          e.isDirect ? l(n, e.path, p) : e.detail.forEach((function(e) {
            e.value == p ? l(n, e.path, !0) : l(n, e.path, !1)
          }))
      }
    })), n
  },
  initialData: function(e) {
    var t, r = e.protocols,
      n = e.initialRules,
      i = e.str,
      s = JSON.parse(JSON.stringify(r)),
      l = a(n);
    try {
      var c = function() {
        var e, a = t.value,
          r = a.position;
        switch (a.type) {
          case "show":
            i.substr(2 * r, 2).toUpperCase() == a.hiddenValue && (s = s.filter((function(e) {
              return !a.associatedIds.includes(parseInt(e.id))
            })));
            break;
          case "max":
            var n = i.substr(2 * r, 2).toUpperCase(),
              l = parseInt(n, 16);
            s = s.filter((function(e) {
              return !(a.associatedIds.includes(parseInt(e.id)) && parseInt(e.value) > l)
            }));
            break;
          case "maxWith7Bit":
            var c = o(i.substr(2 * r, 2).toUpperCase()),
              u = c.substring(0, 1),
              d = c.substring(1);
            "0" == u && (s = s.filter((function(e) {
              return "0.5小时" !== e.displayName
            })));
            var p = parseInt(d, 2);
            s = s.filter((function(e) {
              return !(a.associatedIds.includes(parseInt(e.id)) && parseInt(e.value) > p)
            }));
            break;
          case "min":
            var f = i.substr(2 * r, 2).toUpperCase(),
              b = parseInt(f, 16);
            s = s.filter((function(e) {
              return !(a.associatedIds.includes(parseInt(e.id)) && parseInt(e.value) < b)
            }));
            break;
          case "bit":
            var v = o(i.substr(2 * r, 2).toUpperCase()).split("").reverse().join("");
            a.children.forEach((function(e) {
              if ("show" === e.type) {
                var a = e.position,
                  t = e.hiddenValue,
                  r = e.associatedIds,
                  n = a.split(",");
                if (1 === n.length) {
                  v[a] == t && (s = s.filter((function(e) {
                    return !r.includes(parseInt(e.id))
                  })))
                } else {
                  var i = n[0],
                    o = n[1],
                    l = v.substring(i, o).split("").reverse().join("");
                  parseInt(l, 2) == t && (s = s.filter((function(e) {
                    return !r.includes(parseInt(e.id))
                  })))
                }
              } else if ("max" === e.type) {
                var c = e.position.split(","),
                  u = c[0],
                  d = c[1],
                  p = v.substring(u, d).split("").reverse().join(""),
                  f = parseInt(p, 2);
                s = s.filter((function(a) {
                  return !(e.associatedIds.includes(parseInt(a.id)) && parseInt(a.value) > f)
                }))
              }
            }));
            break;
          case "multipleControl":
            var h = a.children;
            h.every((function(e) {
              if ("show" === e.type) {
                var a = e.position;
                return e.hiddenValue === i.substr(2 * a, 2).toUpperCase()
              }
            })) && h.forEach((function(e) {
              "show" === e.type && (s = s.filter((function(a) {
                return !e.associatedIds.includes(parseInt(a.id))
              })))
            }));
            break;
          case "showCommand":
            var m = i.substr(2 * r, 2).toUpperCase(),
              y = null === (e = a.detail.find((function(e) {
                return e.value === m
              }))) || void 0 === e ? void 0 : e.type;
            if (!y) break;
            s.push({
              type: "commandWordsConfig",
              value: y
            });
            break;
          case "value":
            var k = a.start,
              g = a.end,
              w = a.detail,
              I = a.associatedIds,
              x = o(i.substr(2 * r, 2).toUpperCase()).split("").reverse().join("").substring(k, g).split("").reverse().join(""),
              E = parseInt(x, 2),
              S = w.find((function(e) {
                return e.value == E
              }));
            s = s.filter((function(e) {
              return !I.includes(parseInt(e.id)) || !!S && (console.log("x.id", e.id), console.log("target.associatedIds", S.associatedIds), !!S.associatedIds.includes(parseInt(e.id)))
            }))
        }
      };
      for (l.s(); !(t = l.n()).done;) c()
    } catch (e) {
      l.e(e)
    } finally {
      l.f()
    }
    return s
  },
  debounce: function() {
    var e;
    return function(a) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
      e && (clearTimeout(e), e = null), e = setTimeout(a, t)
    }
  },
  deepClone: function e(a) {
    var r = Array.isArray(a) ? [] : {};
    if (a && "object" === t(a))
      for (var n in a) a.hasOwnProperty(n) && (a[n] && "object" === t(a[n]) ? r[n] = e(a[n]) : r[n] = a[n]);
    return r
  },
  checkAcl: function() {
    return i.apply(this, arguments)
  },
  getEnAbleLabelWithCLosedStatus: function() {
    return ["预约"]
  }
};
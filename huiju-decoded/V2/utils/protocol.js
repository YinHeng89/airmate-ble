require("../../@babel/runtime/helpers/Arrayincludes"), require("../../@babel/runtime/helpers/Arrayincludes"), Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.convertProtocolJson = void 0, exports.getEnAbleLabelWithCLosedStatus = function() {
  return ["预约"]
}, exports.initialData = void 0, exports.parsrAttributeRules = function(e) {
  var r = e.rules,
    a = e.str,
    i = e.deviceStatus,
    n = JSON.parse(JSON.stringify(i));
  return r.forEach((function(e) {
    switch (e.type) {
      case "map":
        var r = a.substr(2 * e.position, 2).toUpperCase(),
          i = e.map[r];
        (0, s.set)(n, e.path, i);
        break;
      case "direct":
        if (e.isMultiByte) {
          var o = 2 * parseInt(e.position[0]),
            u = 2 * (parseInt(e.position[1]) + 1),
            l = a.substring(o, u).toUpperCase();
          console.log("str2", l);
          var p = parseInt(l, 16);
          console.log("value2", p), (0, s.set)(n, e.path, p);
          break
        }
        if (e.prerequisites && !t(a, e.prerequisites)) break;
        var c = a.substr(2 * e.position, 2).toUpperCase(),
          d = parseInt(c, 16);
        (0, s.set)(n, e.path, d);
        break;
      case "bit":
        var f = a.substr(2 * e.position, 2).toUpperCase(),
          b = (0, s.hex_to_bin)(f).split("").reverse().join("");
        e.children.forEach((function(e) {
          var r = e.position,
            t = e.path,
            a = e.type;
          if ("direct" == a) {
            var i = r.split(",");
            if (1 === i.length) {
              var o = i[0],
                u = "1" == b[o];
              (0, s.set)(n, t, u)
            } else {
              var l = i[0],
                p = i[1],
                c = b.substring(l, p).split("").reverse().join(""),
                d = parseInt(c, 2);
              (0, s.set)(n, t, d)
            }
          } else if ("fengyunMode" == a) {
            for (var f = r.split(","), v = f[0], h = f[1], y = b.substring(v, h).split("").reverse().join(""), m = parseInt(y, 2), I = 0; I < 8; I++) {
              var k = t + "index";
              m == I ? (0, s.set)(n, k, !0) : (0, s.set)(n, k, !1)
            }(0, s.set)(n, t, m)
          }
        }));
        break;
      case "valueEquals":
        if (e.prerequisites)
          if (!t(a, e.prerequisites)) break;
        var v = a.substr(2 * e.position, 2).toUpperCase(),
          h = parseInt(v, 16);
        e.isReverse ? h == e.value ? (0, s.set)(n, e.path, !1) : (0, s.set)(n, e.path, !0) : h == e.value ? (0, s.set)(n, e.path, !0) : (0, s.set)(n, e.path, !1)
    }
  })), n
}, require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  r = require("../../@babel/runtime/helpers/objectSpread2"),
  s = require("./util");

function t(e, r) {
  return r.every((function(r) {
    if ("valueEquals" === r.type) {
      var s = r.position,
        t = r.value,
        a = r.isReverse,
        i = e.substr(2 * s, 2).toUpperCase(),
        n = parseInt(i, 16),
        o = Number(t);
      return a ? n != o : n == o
    }
    return !0
  }))
}
exports.convertProtocolJson = function(e) {
  var s = e.reduce((function(s, t, a) {
      var i = t.type;
      switch (i) {
        case "mainSwitch":
        default:
          s.push(t);
          break;
        case "slider":
        case "temDashboard":
        case "mode":
        case "iconMode":
        case "counter":
        case "switch":
        case "waterTemperature":
        case "midSwitch":
        case "popupPicker":
        case "scaleSlider":
          var n = t.label;
          if (n) {
            var o, u = s.find((function(e) {
              return e.type === i && e.label === n
            }));
            if (u) u.children.push(t);
            else o = r(r({}, t), {}, {
              children: [t]
            }), s.push(o)
          } else {
            var l = r({}, t);
            s.push(l)
          }
          break;
        case "fanYaoTou":
        case "customizeXiaoyiBtn":
          if (t.fatherId) {
            var p = e.find((function(e) {
              return e.id === t.fatherId
            }));
            if (!p) break;
            var c = s.find((function(e) {
              return e.type === i && e.label === p.label
            }));
            if (c) c.children.push(t);
            else {
              var d = {
                type: p.type,
                label: p.label,
                protocol: p.protocol,
                isMutex: p.isMutex,
                children: [t]
              };
              s.push(d)
            }
          } else {
            var f = t.type,
              b = t.label,
              v = t.protocol,
              h = t.isMutex;
            if (s.find((function(e) {
                return e.type === f && e.label === b
              }))) break;
            var y = {
              type: f,
              label: b,
              protocol: v,
              isMutex: h,
              children: []
            };
            s.push(y)
          }
          break;
        case "commandWordsConfig":
          s.push({
            type: "commandWordsConfig",
            value: t.value
          });
          break;
        case "special":
          s.push({
            type: i,
            label: t.label
          })
      }
      return s
    }), []),
    t = {};
  return s.forEach((function(e) {
    var r = e.type;
    switch (r) {
      case "mainSwitch":
        t[r] = {
          status: !1
        };
        break;
      case "mode":
      case "iconMode":
      case "midSwitch":
        t[r] || (t[r] = {});
        var s = e.label,
          a = e.children;
        t[r][s] || (t[r][s] = {}), a.forEach((function(e) {
          var a = e.displayName;
          t[r][s][a] = !1
        }));
        break;
      case "slider":
      case "counter":
      case "temDashboard":
      case "waterTemperature":
      case "popupPicker":
      case "scaleSlider":
        t[r] || (t[r] = {});
        var i = e.label,
          n = e.children;
        t[r][i] || (t[r][i] = {
          value: n[0].value
        });
        break;
      case "switch":
        t[r] || (t[r] = {});
        var o = e.displayName;
        t[r][o] || (t[r][o] = !1);
        break;
      case "special":
        t[r] || (t[r] = {}), t[r][e.label] = {
          value: "__"
        };
        break;
      case "fanYaoTou":
      case "customizeXiaoyiBtn":
        t[r] || (t[r] = {});
        var u = e.label,
          l = e.children.reduce((function(e, r, s) {
            return e[r.displayName] = !1, e
          }), {});
        t[r][u] = {
          checked: !1,
          children: l
        }
    }
  })), {
    uiJson: s,
    statusJson: t
  }
}, exports.initialData = function(r) {
  var t, a = r.protocols,
    i = r.initialRules,
    n = r.str,
    o = JSON.parse(JSON.stringify(a)),
    u = e(i);
  try {
    var l = function() {
      var e = t.value,
        r = e.position;
      switch (e.type) {
        case "show":
          n.substr(2 * r, 2).toUpperCase() == e.hiddenValue && (o = o.filter((function(r) {
            return !e.associatedIds.includes(parseInt(r.id))
          })));
          break;
        case "max":
          var a = n.substr(2 * r, 2).toUpperCase(),
            i = parseInt(a, 16);
          o = o.filter((function(r) {
            return !(e.associatedIds.includes(parseInt(r.id)) && parseInt(r.value) > i)
          }));
          break;
        case "maxWith7Bit":
          var u = n.substr(2 * r, 2).toUpperCase(),
            l = (0, s.hex_to_bin)(u),
            p = l.substring(0, 1),
            c = l.substring(1);
          "0" == p && (o = o.filter((function(e) {
            return "0.5小时" !== e.displayName
          })));
          var d = parseInt(c, 2);
          o = o.filter((function(r) {
            return !(e.associatedIds.includes(parseInt(r.id)) && parseInt(r.value) > d)
          }));
          break;
        case "min":
          var f = n.substr(2 * r, 2).toUpperCase(),
            b = parseInt(f, 16);
          o = o.filter((function(r) {
            return !(e.associatedIds.includes(parseInt(r.id)) && parseInt(r.value) < b)
          }));
          break;
        case "bit":
          var v = n.substr(2 * r, 2).toUpperCase(),
            h = (0, s.hex_to_bin)(v).split("").reverse().join("");
          e.children.forEach((function(e) {
            if ("show" === e.type) {
              var r = e.position,
                s = e.hiddenValue,
                t = e.associatedIds,
                a = r.split(",");
              if (1 === a.length) {
                h[r] == s && (o = o.filter((function(e) {
                  return !t.includes(parseInt(e.id))
                })))
              } else {
                var i = a[0],
                  n = a[1],
                  u = h.substring(i, n).split("").reverse().join("");
                parseInt(u, 2) == s && (o = o.filter((function(e) {
                  return !t.includes(parseInt(e.id))
                })))
              }
            } else if ("max" === e.type) {
              var l = e.position.split(","),
                p = l[0],
                c = l[1],
                d = h.substring(p, c).split("").reverse().join(""),
                f = parseInt(d, 2);
              o = o.filter((function(r) {
                return !(e.associatedIds.includes(parseInt(r.id)) && parseInt(r.value) > f)
              }))
            }
          }));
          break;
        case "multipleControl":
          var y = e.children;
          y.every((function(e) {
            if ("show" === e.type) {
              var r = e.position;
              return e.hiddenValue === n.substr(2 * r, 2).toUpperCase()
            }
          })) && y.forEach((function(e) {
            "show" === e.type && (o = o.filter((function(r) {
              return !e.associatedIds.includes(parseInt(r.id))
            })))
          }));
          break;
        case "showCommand":
          var m = n.substr(2 * r, 2).toUpperCase(),
            I = e.detail.find((function(e) {
              return e.value === m
            }));
          if (!I) break;
          o.push({
            type: "commandWordsConfig",
            value: I.type
          })
      }
    };
    for (u.s(); !(t = u.n()).done;) l()
  } catch (e) {
    u.e(e)
  } finally {
    u.f()
  }
  return o
};
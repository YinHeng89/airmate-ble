var t = require("../../@babel/runtime/helpers/classCallCheck"),
  e = require("../../@babel/runtime/helpers/createClass"),
  a = [17, 34, 51, 51, 34, 17],
  i = [6, 119, 95, 135, 145, 141, 212, 35, 0, 93, 241, 216, 207, 12, 20, 43],
  r = [
    [119, 241, 86, 36, 126, 71, 27, 134, 189, 112, 142, 30, 59, 115, 22, 3],
    [100, 172, 40, 90, 201, 179, 55, 197, 10, 16, 183, 163, 186, 177, 151, 70],
    [61, 5, 220, 102, 110, 246, 154, 248, 13, 88, 149, 103, 198, 170, 171, 236],
    [160, 104, 155, 150, 212, 235, 191, 67, 73, 54, 233, 106, 137, 216, 195, 138],
    [148, 99, 153, 188, 123, 190, 193, 34, 187, 92, 113, 213, 31, 146, 87, 93],
    [143, 68, 65, 29, 81, 230, 64, 23, 251, 253, 25, 50, 52, 184, 97, 42],
    [202, 35, 111, 218, 57, 247, 162, 1, 127, 214, 49, 231, 222, 128, 4, 221],
    [44, 89, 130, 175, 168, 224, 15, 205, 161, 18, 62, 48, 209, 28, 208, 58],
    [51, 114, 46, 79, 144, 2, 19, 6, 117, 206, 135, 194, 239, 178, 173, 125],
    [56, 21, 225, 82, 159, 122, 108, 47, 39, 196, 226, 129, 169, 207, 141, 192],
    [215, 223, 255, 96, 118, 20, 140, 94, 85, 9, 228, 8, 199, 66, 32, 252],
    [210, 80, 145, 217, 76, 98, 158, 232, 185, 166, 249, 26, 0, 33, 11, 250],
    [53, 156, 78, 75, 105, 72, 203, 14, 200, 164, 91, 234, 132, 7, 180, 24],
    [244, 174, 107, 219, 167, 204, 63, 139, 74, 12, 60, 37, 229, 84, 77, 69],
    [131, 237, 17, 240, 176, 83, 147, 242, 116, 38, 181, 157, 109, 124, 243, 45],
    [241, 86, 36, 126, 71, 27, 134, 189, 112, 142, 30, 59, 115, 22, 3, 182],
    [172, 40, 90, 201, 179, 55, 197, 10, 16, 183, 163, 186, 177, 151, 70, 136]
  ],
  s = [1, 45, 226, 147, 190, 69, 21, 174, 120, 3, 135, 164, 184, 56, 207, 63, 8, 103, 9, 148, 235, 38, 168, 107, 189, 24, 52, 27, 187, 191, 114, 247, 64, 53, 72, 156, 81, 47, 59, 85, 227, 192, 159, 216, 211, 243, 141, 177, 255, 167, 62, 220, 134, 119, 215, 166, 17, 251, 244, 186, 146, 145, 100, 131, 241, 51, 239, 218, 44, 181, 178, 43, 136, 209, 153, 203, 140, 132, 29, 20, 129, 151, 113, 202, 95, 163, 139, 87, 60, 130, 196, 82, 92, 28, 232, 160, 4, 180, 133, 74, 246, 19, 84, 182, 223, 12, 26, 142, 222, 224, 57, 252, 32, 155, 36, 78, 169, 152, 158, 171, 242, 96, 208, 108, 234, 250, 199, 217, 0, 212, 31, 110, 67, 188, 236, 83, 137, 254, 122, 93, 73, 201, 50, 194, 249, 154, 248, 109, 22, 219, 89, 150, 68, 233, 205, 230, 70, 66, 143, 10, 193, 204, 185, 101, 176, 210, 198, 172, 30, 65, 98, 41, 46, 14, 116, 80, 2, 90, 195, 37, 123, 138, 42, 91, 240, 6, 13, 71, 111, 112, 157, 126, 16, 206, 18, 39, 213, 76, 79, 214, 121, 48, 104, 54, 117, 125, 228, 237, 128, 106, 144, 55, 162, 94, 118, 170, 197, 127, 61, 175, 165, 229, 25, 97, 253, 77, 124, 183, 11, 238, 173, 75, 34, 245, 231, 115, 35, 33, 200, 5, 225, 102, 221, 179, 88, 105, 99, 86, 15, 161, 49, 149, 23, 7, 58, 40],
  n = [128, 0, 176, 9, 96, 239, 185, 253, 16, 18, 159, 228, 105, 186, 173, 248, 192, 56, 194, 101, 79, 6, 148, 252, 25, 222, 106, 27, 93, 78, 168, 130, 112, 237, 232, 236, 114, 179, 21, 195, 255, 171, 182, 71, 68, 1, 172, 37, 201, 250, 142, 65, 26, 33, 203, 211, 13, 110, 254, 38, 88, 218, 50, 15, 32, 169, 157, 132, 152, 5, 156, 187, 34, 140, 99, 231, 197, 225, 115, 198, 175, 36, 91, 135, 102, 39, 247, 87, 244, 150, 177, 183, 92, 139, 213, 84, 121, 223, 170, 246, 62, 163, 241, 17, 202, 245, 209, 23, 123, 147, 131, 188, 189, 82, 30, 235, 174, 204, 214, 53, 8, 200, 138, 180, 226, 205, 191, 217, 208, 80, 89, 63, 77, 98, 52, 10, 72, 136, 181, 86, 76, 46, 107, 158, 210, 61, 60, 3, 19, 251, 151, 81, 117, 74, 145, 113, 35, 190, 118, 42, 95, 249, 212, 85, 11, 220, 55, 49, 22, 116, 215, 119, 167, 230, 7, 219, 164, 47, 70, 243, 97, 69, 103, 227, 12, 162, 59, 28, 133, 24, 4, 29, 41, 160, 143, 178, 90, 216, 166, 126, 238, 141, 83, 75, 161, 154, 193, 14, 122, 73, 165, 44, 129, 196, 199, 54, 43, 127, 67, 149, 51, 242, 108, 104, 109, 240, 2, 40, 206, 221, 155, 234, 94, 153, 124, 20, 134, 207, 229, 66, 184, 64, 120, 45, 58, 233, 100, 31, 146, 144, 125, 57, 111, 224, 137, 48];

function u(t) {
  for (var e, a = 0, i = 0; i < 8; i++) e = (t[a] << 1) + t[a + 1] & 255, t[a + 1] = t[a] + t[a + 1] & 255, t[a] = e, a += 2
}

function h(t) {
  for (var e = new Array, a = 0; a < 16; a++) e[a] = t[a];
  t[0] = e[8], t[1] = e[11], t[2] = e[12], t[3] = e[15], t[4] = e[2], t[5] = e[1], t[6] = e[6], t[7] = e[5], t[8] = e[10], t[9] = e[9], t[10] = e[14], t[11] = e[13], t[12] = e[0], t[13] = e[7], t[14] = e[4], t[15] = e[3]
}

function c(t) {
  for (var e, a = 0; a < 17; a++) e = t[a] >>> 5 & 255, t[a] = t[a] << 3 & 255, t[a] = t[a] + e & 255
}

function o(t, e) {
  for (var a, i = new Array, s = new Array, n = 0; n < 17; n++)
    for (var u = 0; u < 16; u++) e[n][u] = 0;
  for (i[16] = 0, n = 0; n < 16; n++) i[n] = t[n], i[16] = i[16] ^ i[n];
  for (n = 0; n < 16; n++) e[0][n] = i[n], s[n] = i[n];
  for (s[16] = i[16], n = 0; n < 16; n++)
    for (c(s), a = n + 1, u = 0; u < 16; u++) e[n + 1][u] = s[a] + r[n + 1][15 - u] & 255, ++a > 16 && (a = 0)
}

function f(t, e, a) {
  for (var i, r = e, c = 0; c < 16; c++) switch (c) {
    case 0:
    case 3:
    case 4:
    case 7:
    case 8:
    case 11:
    case 12:
    case 15:
      r[c] = 255 & (r[c] ^ a[2 * t][c]);
      break;
    default:
      r[c] = r[c] + a[2 * t][c] & 255
  }
  for ((i = r)[0] = s[i[0]], i[3] = s[i[3]], i[4] = s[i[4]], i[7] = s[i[7]], i[8] = s[i[8]], i[11] = s[i[11]], i[12] = s[i[12]], i[15] = s[i[15]], i[1] = n[i[1]], i[2] = n[i[2]], i[5] = n[i[5]], i[6] = n[i[6]], i[9] = n[i[9]], i[10] = n[i[10]], i[13] = n[i[13]], i[14] = n[i[14]], c = 0; c < 16; c++) switch (c) {
    case 0:
    case 3:
    case 4:
    case 7:
    case 8:
    case 11:
    case 12:
    case 15:
      r[c] = r[c] + a[2 * t + 1][c] & 255;
      break;
    default:
      r[c] = 255 & (r[c] ^ a[2 * t + 1][c])
  }
  u(r), h(r), u(r), h(r), u(r), h(r), u(r)
}

function l(t, e, a) {
  for (var i = new Array, r = 0; r < 16; r++) i[r] = t[r];
  for (var s = 0; s < 8; s++) {
    if (2 == s && a)
      for (var n = 0; n < 16; n++) switch (n) {
        case 0:
        case 3:
        case 4:
        case 7:
        case 8:
        case 11:
        case 12:
        case 15:
          t[n] = 255 & (i[n] ^ t[n]);
          break;
        default:
          t[n] = i[n] + t[n] & 255
      }
    f(s, t, e)
  }
  for (n = 0; n < 16; n++) switch (n) {
    case 0:
    case 3:
    case 4:
    case 7:
    case 8:
    case 11:
    case 12:
    case 15:
      t[n] = 255 & (t[n] ^ e[16][n]);
      break;
    default:
      t[n] = t[n] + e[16][n] & 255
  }
}

function v(t) {
  var e = new Array,
    r = new Uint8Array(17);
  r[0] = 1,
    function(t, e, a, i, r) {
      for (var s = new Array, n = new Array, u = 0, h = new Array, c = 0; c < 17; c++) h[c] = new Array;
      for (var f = 0; f < 16; f++) s[f] = t[u], ++u > 5 && (u = 0);
      for (f = 0; f < 16; f++) r[f] = e[f];
      for (o(a, h), l(r, h, 0), f = 0; f < 16; f++) r[f] = r[f] ^ e[f], r[f] = r[f] + s[f] & 255;
      n[0] = a[0] + 233 & 255, n[1] = 229 ^ a[1], n[2] = a[2] + 223 & 255, n[3] = 193 ^ a[3], n[4] = a[4] + 179 & 255, n[5] = 167 ^ a[5], n[6] = a[6] + 149 & 255, n[7] = 131 ^ a[7], n[8] = 233 ^ a[8], n[9] = a[9] + 229 & 255, n[10] = 223 ^ a[10], n[11] = a[11] + 193 & 255, n[12] = 179 ^ a[12], n[13] = a[13] + 167 & 255, n[14] = 149 ^ a[14], n[15] = a[15] + 131 & 255, o(n, h), l(r, h, 1)
    }(a, t, i, 0, e);
  for (var s = 1; s < r.byteLength; s++) r[s] = e[s - 1];
  return r
}
exports.Auth = function() {
  return e((function e() {
    t(this, e), this.authing = !1, this.authed = !1, this.authDeviceId = null, this.timeoutTaskId = -1, this.authTime = 0, this.callback = null
  }), [{
    key: "startAuth",
    value: function(t, e) {
      this.authDeviceId = t, this.callback = e, this.authed = !1, this.authing = !0;
      for (var a = new Uint8Array(17), i = new Array(a.byteLength), r = 1; r < a.byteLength; r++) a[r] = Math.round(255 * Math.random()), i[r - 1] = a[r];
      v(i), this._writeAuthData(a.buffer)
    }
  }, {
    key: "handlerAuth",
    value: function(t, e) {
      if (!this.authing || t == this.authDeviceId) {
        var a = new DataView(e);
        if (0 == a.getUint8(0)) {
          this._stopTimeoutTask();
          for (var i = new Array(a.byteLength), r = 1; r < i.length; r++) i[r - 1] = a.getUint8(r);
          var s = v(i);
          this._writeAuthData(s.buffer)
        } else if (1 == a.getUint8(0) && 17 == a.byteLength) {
          this._stopTimeoutTask();
          var n = new Uint8Array(5);
          n[0] = 2, n[1] = 112, n[2] = 97, n[3] = 115, n[4] = 115, this._writeAuthData(n.buffer)
        } else 2 == a.getUint8(0) && 5 == a.byteLength && (this._stopTimeoutTask(), function(t) {
          for (var e = [2, 112, 97, 115, 115], a = new DataView(t), i = 0; i < a.byteLength; i++) {
            var r = a.getUint8(i);
            if (e[i] != r) return !1
          }
          return !0
        }(e) ? (this._onAuthSuccess(this.authDeviceId), this.authed = !0) : this._onAuthFailed(this.authDeviceId))
      }
    }
  }, {
    key: "_writeAuthData",
    value: function(t) {
      var e;
      this.authDeviceId && (null !== (e = this.callback) && void 0 !== e && e.onSendData(this.authDeviceId, t), this._startTimeoutTask())
    }
  }, {
    key: "_stopTimeoutTask",
    value: function() {
      clearTimeout(this.timeoutTaskId)
    }
  }, {
    key: "_startTimeoutTask",
    value: function() {
      var t = this;
      this.timeoutTaskId = setTimeout((function() {
        t._onAuthFailed(t.authDeviceId)
      }), 5e3)
    }
  }, {
    key: "_onAuthSuccess",
    value: function(t) {
      var e;
      this.authing = !1, null != t && (null === (e = this.callback) || void 0 === e || e.onAuthSuccess(t))
    }
  }, {
    key: "_onAuthFailed",
    value: function(t) {
      var e;
      this.authing = !1, null != t && (null === (e = this.callback) || void 0 === e || e.onAuthFailed(t))
    }
  }])
}(), exports.setLinkKey = function(t) {
  t.length == i.length && (i = t)
};
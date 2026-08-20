Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getCommandWordsByVsersion = function(t) {
  return new Promise((function(n, o) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/wechat/api/").concat(t),
      method: "GET",
      success: function(e) {
        0 == e.data.code && (e.data.data.sort((function(e, t) {
          return null === e.studyOrder ? 1 : null === t.studyOrder ? -1 : e.studyOrder - t.studyOrder
        })), e.data.data.sort((function(e, t) {
          return "wkp" === e.type && "cmd" === t.type ? -1 : "cmd" === e.type && "wkp" === t.type ? 1 : 0
        }))), n(e.data)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.getData = function(t) {
  var n = t.versionNo,
    o = t.params;
  return new Promise((function(t, c) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/wechat/api/").concat(n, "/audio/data"),
      data: o,
      method: "POST",
      responseType: "arraybuffer",
      success: function(e) {
        t(e)
      },
      fail: function(e) {
        c(e)
      }
    })
  }))
}, exports.getDataByVoice = function(e, t) {
  return new Promise((function(n, o) {
    wx.uploadFile({
      filePath: e,
      name: "file",
      formData: t,
      responseType: "",
      url: "http://172.16.202.125:5000/getDataByVoice",
      success: function(e) {
        var t = e.data;
        e.data = function(e) {
          for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
          return t.buffer
        }(t), n(e)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.getOTAFile = function(t) {
  return new Promise((function(n, o) {
    var c = t.pvNo,
      a = t.majorVersion,
      r = t.minorVersion,
      i = t.patchVersion;
    wx.request({
      url: "".concat(e, "/ezsc/mobile/ota/download?pvNo=").concat(c, "&majorVersion=").concat(a, "&minorVersion=").concat(r, "&patchVersion=").concat(i),
      dataType: "其他",
      responseType: "arraybuffer",
      success: function(e) {
        n(e)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.getOtaVersion = function(t) {
  return new Promise((function(n, o) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/ota/list"),
      method: "POST",
      data: t,
      success: function(e) {
        n(e.data.data)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.getPreviewData = function(t) {
  return new Promise((function(n, o) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/wechat/config/").concat(t),
      success: function(e) {
        n(e.data)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.getPro = function(t) {
  return new Promise((function(n, o) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/wechat/api/pron"),
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        words: t
      },
      method: "POST",
      success: function(e) {
        n(e.data)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.getToken = function() {
  return new Promise((function(t, n) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/wechat/token"),
      success: function(e) {
        t(e.data)
      },
      fail: function(e) {
        n(e)
      }
    })
  }))
}, exports.updateOTARecord = function(t) {
  return new Promise((function(n, o) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/ota/upgrade/state"),
      method: "POST",
      data: t,
      success: function(e) {
        n(e)
      },
      fail: function(e) {
        o(e)
      }
    })
  }))
}, exports.verifyToken = function(t, n, o) {
  return new Promise((function(c, a) {
    wx.request({
      url: "".concat(e, "/ezsc/mobile/wechat/config/load/").concat(t, "?token=").concat(n, "&sign=").concat(o),
      header: {
        Cookie: "".concat(n)
      },
      success: function(e) {
        c(e.data)
      },
      fail: function(e) {
        a(e)
      }
    })
  }))
};
var e = {
  develop: "https://beta.duiopen.com",
  trial: "https://beta.duiopen.com",
  release: "https://www.duiopen.com"
} [wx.getAccountInfoSync().miniProgram.envVersion];
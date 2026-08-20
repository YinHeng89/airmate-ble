var e, t = require("../../@babel/runtime/helpers/interopRequireWildcard").default,
  n = require("../../@babel/runtime/helpers/defineProperty"),
  o = require("../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../@babel/runtime/helpers/createForOfIteratorHelper"),
  i = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  s = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../lib/jl_lib/jl_ota_2.1.1"),
  c = require("../../lib/bluetoothOTAManager"),
  u = t(require("../../lib/jl_lib/jl_rcsp_ota_2.1.1")),
  l = require("../../api/request"),
  d = wx.getFileSystemManager();

function h(e) {
  return new Promise((function(t) {
    setTimeout((function() {
      t()
    }), e)
  }))
}
var f, g = getApp();
Page((n(n(n(n(n(n(n(n(n(n(e = {
  data: {
    connectedDevice: null,
    device: null,
    cuiVersion: "",
    buildTime: "",
    productId: "",
    mac: "",
    otaVersion: "",
    remoteVersion: "",
    files: [],
    radio: null,
    fileLoaded: !1,
    countDown: 3,
    isShowProgress: !1,
    mValue: 0,
    mOtaFile: "update.ufw",
    mFailReason: "ota Fail",
    mOtaResult: 0,
    mStatus: 0,
    isShowLoading: !1,
    mLoadingText: "加载升级文件",
    show: !1,
    isNeedUpdate: !1,
    selectedRadioValue: "",
    isUseRemoteOTA: !1
  },
  upgradeData: null,
  bluetoothManager: null,
  onOtaProgressViewConfirm: function() {
    var e = this;
    return s(i().mark((function t() {
      return i().wrap((function(t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            e.setData({
              isShowProgress: !1
            });
          case 1:
          case "end":
            return t.stop()
        }
      }), t)
    })))()
  },
  _onDevDisconnect: function(e) {
    this.setData({
      connectedDevice: null
    })
  },
  _onDevConnectFailed: function(e) {
    var t = this;
    this.setData({
      connectedDevice: null
    }), wx.hideLoading({
      success: function() {
        wx.showModal({
          content: "连接失败，是否重新连接？",
          confirmText: "重新连接",
          success: function(e) {
            if (e.confirm) {
              var n = t.data.device;
              wx.showLoading({
                title: "连接中"
              }), t.bluetoothManager.connectDevice(n)
            }
          }
        })
      }
    })
  },
  _onDevConnectSuccess: function(e) {
    this.setData({
      connectedDevice: e
    })
  },
  handleChooseFile: function() {
    var e = this;
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      extension: ["ufw"],
      success: function(t) {
        var n = t.tempFiles;
        e.setData({
          files: n,
          radio: null,
          fileLoaded: !1,
          isUseRemoteOTA: !1
        }, (function() {
          e.onChange({
            detail: 0
          })
        }))
      }
    })
  },
  onChange: function(e) {
    var t = this;
    if (this.data.isUseRemoteOTA) return wx.showToast({
      title: "加载成功",
      icon: "none"
    }), void this.setData({
      radio: e.detail
    });
    var n = e.detail;
    this.setData({
      radio: n
    });
    var o = this.data.files[n],
      a = o.path,
      i = o.size,
      s = o.name,
      r = d.openSync({
        filePath: a
      }),
      c = new Uint8Array(i);
    d.read({
      fd: r,
      arrayBuffer: c.buffer,
      length: i,
      success: function(e) {
        t.upgradeData = c, wx.showToast({
          title: "加载成功",
          icon: "none"
        }), t.setData({
          fileLoaded: !0,
          mOtaFile: s
        })
      },
      fail: function(e) {
        wx.showToast({
          title: "加载失败",
          icon: "none"
        }), t.setData({
          fileLoaded: !1
        })
      },
      complete: function() {
        d.closeSync({
          fd: r
        })
      }
    })
  },
  handleUpdate: function() {
    var e = this;
    if (this.data.connectedDevice) {
      var t = new r.OTAConfig;
      t.isSupportNewRebootWay = !1, t.updateFileData = this.upgradeData, console.log("connectedDevice", this.data.connectedDevice);
      var n, o = this.data.connectedDevice;
      this.bluetoothManager.startOTA(o, t, {
        onStartOTA: function() {
          console.log("onStartOTA"), e.setData({
            isShowProgress: !0,
            mStatus: 0
          })
        },
        onNeedReconnect: function(t) {
          console.log("reConnectMsg", t), e.setData({
            mValue: 0,
            mStatus: 2
          })
        },
        onProgress: function(t, n) {
          t == r.UpgradeType.UPGRADE_TYPE_CHECK_FILE && e.setData({
            mValue: n,
            mStatus: 0
          }), t == r.UpgradeType.UPGRADE_TYPE_FIRMWARE && e.setData({
            mValue: n,
            mStatus: 1
          })
        },
        onStopOTA: (n = s(i().mark((function t() {
          var n, o, a, s, r, c, u, d, f, g;
          return i().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (console.log("停止OTA"), !e.data.isUseRemoteOTA) {
                  t.next = 4;
                  break
                }
                return t.prev = 1, n = e.data.selectedRadioValue.split("-"), o = n[0], a = n[1], s = a.split(".")[0], r = a.split(".")[1], c = a.split(".")[2], u = e.data.mac, d = {
                  pvNo: o,
                  majorVersion: s,
                  minorVersion: r,
                  patchVersion: c,
                  mac: u
                }, t.next = 2, (0, l.updateOTARecord)(d);
              case 2:
                t.next = 4;
                break;
              case 3:
                t.prev = 3, g = t.catch(1), console.error(g);
              case 4:
                e.setData({
                  mValue: 0,
                  mOtaResult: 0,
                  mStatus: 3
                }), f = 3;
              case 5:
                if (!(f > 0)) {
                  t.next = 7;
                  break
                }
                return e.setData({
                  countDown: f
                }), t.next = 6, h(1e3);
              case 6:
                f--, t.next = 5;
                break;
              case 7:
                e.clear(), wx.reLaunch({
                  url: "/pages/deviceList/deviceList"
                });
              case 8:
              case "end":
                return t.stop()
            }
          }), t, null, [
            [1, 3]
          ])
        }))), function() {
          return n.apply(this, arguments)
        }),
        onCancelOTA: function() {
          console.log("升级取消"), e.setData({
            mValue: 0,
            mOtaResult: 1,
            mStatus: 4,
            mFailReason: "升级被取消."
          })
        },
        onError: function(t, n) {
          console.log(t, n), e.setData({
            mValue: 0,
            mOtaResult: 1,
            mStatus: 4,
            mFailReason: n
          })
        }
      })
    } else wx.showToast({
      title: "未连接设备，请退出重连",
      icon: "none"
    })
  }
}, "onOtaProgressViewConfirm", (function() {
  this.setData({
    isShowProgress: !1
  })
})), "handleRedirectIndex", (function() {
  this.clear(), wx.reLaunch({
    url: "/pages/deviceList/deviceList"
  })
})), "reconnect", (function() {
  var e = this,
    t = this.data.device;
  if (t) {
    var n = this.bluetoothManager.getConnectedDevice();
    if (console.log("connectedDevices", n), null != n && n.length > 0) {
      if (!this.bluetoothManager.isConnected(t)) return void wx.showToast({
        title: "请先断开已连接的设备",
        icon: "none"
      });
      wx.showModal({
        title: "提示",
        content: "是否要断开该设备",
        success: function(e) {
          e.confirm && this.bluetoothManager.disconnectDevice(t)
        }
      })
    } else wx.showLoading({
      title: "连接中"
    }), setTimeout((function() {
      console.log(" 连接中", t), e.bluetoothManager.connectDevice(t)
    }), 2e3)
  }
})), "clear", (function() {
  var e = this.bluetoothManager.getConnectedDevice();
  if (e.length > 0) {
    var t, n = a(e);
    try {
      for (n.s(); !(t = n.n()).done;) {
        var o = t.value;
        this.bluetoothManager.disconnectDevice(o)
      }
    } catch (e) {
      n.e(e)
    } finally {
      n.f()
    }
  }
  wx.offBLEConnectionStateChange(), wx.offBLEMTUChange(), wx.offBLECharacteristicValueChange(), this.bluetoothManager = void 0, f = void 0, g.globalData.bleInstance = void 0
})), "handleOpenDialog", (function() {
  this.setData({
    show: !0
  })
})), "handleCloseDialog", (function() {
  this.setData({
    show: !1
  })
})), "onRadioChange", (function(e) {
  this.setData({
    selectedRadioValue: e.detail
  })
})), "handleConfirm", (function() {
  var e = this;
  return s(i().mark((function t() {
    var n, o, a, s, r, c, u, d, h;
    return i().wrap((function(t) {
      for (;;) switch (t.prev = t.next) {
        case 0:
          return n = e.data.selectedRadioValue.split("-"), o = n[0], a = n[1], s = a.split(".")[0], r = a.split(".")[1], c = a.split(".")[2], u = {
            pvNo: o,
            majorVersion: s,
            minorVersion: r,
            patchVersion: c
          }, t.next = 1, (0, l.getOTAFile)(u);
        case 1:
          d = t.sent, h = {
            name: "".concat(e.data.selectedRadioValue, ".ufw")
          }, e.setData({
            files: [h],
            fileLoaded: !0,
            isUseRemoteOTA: !0
          }, (function() {
            e.onChange({
              detail: 0
            })
          })), e.upgradeData = new Uint8Array(d.data);
        case 2:
        case "end":
          return t.stop()
      }
    }), t)
  })))()
})), "onLoad", (function(e) {
  var t = this;
  return s(i().mark((function n() {
    var a, s, r, d, h, p, v, m, w, D, b, x, C, V, T;
    return i().wrap((function(n) {
      for (;;) switch (n.prev = n.next) {
        case 0:
          if (f = g.globalData.bleInstance, t.upgradeData = new Uint8Array(0), a = wx.getDeviceInfo(), t.bluetoothManager = new c.BluetoothOTAManager(a.platform), (s = t.bluetoothManager.getConfigure()).isUseAuth = !0, s.changeMTU = 256, s.isAutoTestOTA = !1, s.autoTestOTACount = 20, t.bluetoothManager.setConfigure(s), r = new c.BluetoothEventCallback, d = new u.OnRcspCallback, wx.showLoading({
              title: "Rcsp初始化中"
            }), d.onRcspInit = function(e, t) {
              console.log("rcsp初始化完成", t), wx.hideLoading()
            }, r.onDevStatusSuccess = t._onDevConnectSuccess, r.onDevStatusDisconnect = t._onDevDisconnect, r.onDevStatusFailed = t._onDevConnectFailed, t.bluetoothManager.addBluetoothEventCallback(r), t.bluetoothManager.registerRcspCallback(d), h = JSON.parse(e.device), p = e.cuiVersion, v = e.buildTime, !(e.productId && e.mac && e.otaVersion)) {
            n.next = 2;
            break
          }
          return m = e.productId, w = e.mac, D = e.otaVersion || "1.0.0", n.next = 1, (0, l.getOtaVersion)({
            pvNo: p,
            mac: w
          });
        case 1:
          b = n.sent, x = b.reduce((function(e, t, n) {
            var o = t.pvNo,
              a = t.majorVersion,
              i = t.minorVersion,
              s = t.patchVersion,
              r = t.description,
              c = e.find((function(e) {
                return e.cuiVersion === o
              })),
              u = {
                fullVersion: a + "." + i + "." + s,
                description: r
              };
            if (c) c.otaVersion.push(u);
            else {
              var l = {
                cuiVersion: o,
                otaVersion: [u]
              };
              e.push(l)
            }
            return e
          }), []), C = x.find((function(e) {
            return e.cuiVersion === p
          })), V = !1, C && (V = C.otaVersion.some((function(e) {
            return e.fullVersion > D
          }))), t.setData({
            productId: m,
            mac: w,
            otaVersion: D,
            remoteVersion: x,
            isNeedUpdate: V
          });
        case 2:
          if (t.setData({
              device: h,
              cuiVersion: p,
              buildTime: v
            }), !h) {
            n.next = 6;
            break
          }
          if (T = t.bluetoothManager.getConnectedDevice(), console.log("connectedDevices", T), !(null != T && T.length > 0)) {
            n.next = 5;
            break
          }
          if (t.bluetoothManager.isConnected(h)) {
            n.next = 3;
            break
          }
          return wx.showToast({
            title: "请先断开已连接的设备",
            icon: "none"
          }), n.abrupt("return");
        case 3:
          wx.showModal({
            title: "提示",
            content: "是否要断开该设备",
            success: function(e) {
              e.confirm && this.bluetoothManager.disconnectDevice(h)
            }
          });
        case 4:
          n.next = 6;
          break;
        case 5:
          !0, t.bluetoothManager.connectDevice(o(o({}, h), {}, {
            isConnected: true
          }));
        case 6:
        case "end":
          return n.stop()
      }
    }), n)
  })))()
})), "onReady", (function() {})), n(n(n(n(n(n(e, "onShow", (function() {})), "onHide", (function() {})), "onUnload", (function() {
  wx.offBLEConnectionStateChange(), wx.offBLEMTUChange(), wx.offBLECharacteristicValueChange(), this.bluetoothManager = void 0, f && (f.onBLEConnectionStateChange(), f.onBLECharacteristicValueChange())
})), "onPullDownRefresh", (function() {})), "onReachBottom", (function() {})), "onShareAppMessage", (function() {
  return {
    title: "慧居管家",
    path: "pages/login/login"
  }
}))));
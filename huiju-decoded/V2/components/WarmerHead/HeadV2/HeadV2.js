var t = require("../../../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../../../@babel/runtime/helpers/asyncToGenerator");
Component({
  observers: {
    "uiJson,deviceStatus": function(a, i) {
      if (a) {
        var n = a.find((function(t) {
          return "special" === t.type
        }));
        n ? this.setData({
          showSpecial: !0,
          label: n.label
        }) : this.setData({
          showSpecial: !1,
          label: ""
        })
      }
      if (a && i) {
        var s = a.find((function(t) {
          return "temDashboard" === t.type
        }));
        if (s) {
          var r = s.type,
            h = s.label,
            c = s.children.sort((function(t) {
              return t.value
            })),
            l = c[0].value,
            u = c[(0 === c.length ? 1 : c.length) - 1].value,
            o = i[r][h].value,
            d = this;
          this.data.min === l && this.data.max === u ? this.setData({
            currentValue: o
          }, this.drawCircleByCurrentValue(Number(o))) : this.setData({
            currentValue: o,
            min: Number(l),
            max: Number(u)
          }, e(t().mark((function e() {
            return t().wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 1, d.renderCanvas();
                case 1:
                  return t.next = 2, d.drawCircleByCurrentValue(Number(o));
                case 2:
                case "end":
                  return t.stop()
              }
            }), e)
          }))))
        }
      }
    }
  },
  properties: {
    uiJson: Object,
    deviceStatus: Object,
    styleConfig: Object
  },
  data: {
    showSpecial: !0,
    currentValue: 0,
    min: 0,
    max: 0
  },
  canvas: null,
  canvasLeft: 0,
  canvasTop: 0,
  ctx: null,
  canDrag: !1,
  centerX: 0,
  centerY: 0,
  outerRadius: 0,
  innerRadius: 0,
  angle: 0,
  methods: {
    handleTouchStart: function() {
      this.canDrag = !0
    },
    handleTouchMove: function(t) {
      if (this.canDrag) {
        var e = t.changedTouches[0].clientX - this.canvasLeft,
          a = t.changedTouches[0].clientY - this.canvasTop;
        if (this.angle = Math.atan2(a - this.centerY, e - this.centerX), this.angle > .06111111111111111 * Math.PI * 2 && this.angle < 158 / 360 * Math.PI * 2) return;
        this.drawCircle()
      }
    },
    handleTouchEnd: function() {
      var t = this;
      this.canDrag = !1;
      var e = this.data.uiJson.find((function(t) {
        return "temDashboard" === t.type
      }));
      if (e) {
        var a = e.children.find((function(e) {
          return e.value == t.data.currentValue
        }));
        this.triggerEvent("temChange", a)
      }
    },
    drawCircleByCurrentValue: function(t) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, 0, 2 * Math.PI);
      var e = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      e.addColorStop(0, "#F6F8FA"), e.addColorStop(1, "#E2E6EC"), this.ctx.fillStyle = e, this.ctx.fill();
      var a = this.data.max,
        i = this.data.min,
        n = t - i;
      this.angle = n / (a - i) * 224 / 360 * Math.PI * 2 + 158 / 360 * Math.PI * 2, this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, 158 / 360 * Math.PI * 2, this.angle);
      var s = this.ctx.createLinearGradient(this.centerX - this.outerRadius, this.centerY, this.centerX + this.outerRadius, this.centerY);
      s.addColorStop(0, "#FFA54D"), s.addColorStop(1, "#FE5932"), this.ctx.strokeStyle = s, this.ctx.lineWidth = 8, this.ctx.stroke();
      var r = this.centerX + this.outerRadius * Math.cos(this.angle),
        h = this.centerY + this.outerRadius * Math.sin(this.angle);
      this.ctx.beginPath(), this.ctx.arc(r, h, 10, 0, 2 * Math.PI), this.ctx.fillStyle = "#FFFFFF", this.ctx.fill()
    },
    drawCircle: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, 0, 2 * Math.PI);
      var t, e = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      e.addColorStop(0, "#F6F8FA"), e.addColorStop(1, "#E2E6EC"), this.ctx.fillStyle = e, this.ctx.fill(), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, 158 / 360 * Math.PI * 2, this.angle), this.angle <= 0 ? t = .06111111111111111 * Math.PI * 2 + (.5 * Math.PI * 2 + this.angle) : this.angle - 158 / 360 * Math.PI * 2 >= 0 ? t = this.angle - 158 / 360 * Math.PI * 2 : this.angle > 0 && this.angle <= .06111111111111111 * Math.PI * 2 && (t = this.angle + 202 / 360 * Math.PI * 2);
      var a = t / (224 / 360 * Math.PI * 2),
        i = (this.data.max - this.data.min) * a + this.data.min;
      this.setData({
        currentValue: Math.round(i)
      });
      var n = this.ctx.createLinearGradient(this.centerX - this.outerRadius, this.centerY, this.centerX + this.outerRadius, this.centerY);
      n.addColorStop(0, "#FFA54D"), n.addColorStop(1, "#FE5932"), this.ctx.strokeStyle = n, this.ctx.lineWidth = 8, this.ctx.stroke();
      var s = this.centerX + this.outerRadius * Math.cos(this.angle),
        r = this.centerY + this.outerRadius * Math.sin(this.angle);
      this.ctx.beginPath(), this.ctx.arc(s, r, 10, 0, 2 * Math.PI), this.ctx.fillStyle = "#FFFFFF", this.ctx.fill()
    },
    renderCanvas: function() {
      var a = this;
      return e(t().mark((function e() {
        var i, n, s, r;
        return t().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              return t.next = 1, new Promise((function(t) {
                a.createSelectorQuery().select("#canvas").fields({
                  node: !0,
                  size: !0
                }).exec((function(e) {
                  i = e[0].node, n = i.getContext("2d"), s = e[0].width, r = e[0].height, a.centerX = s / 2, a.centerY = r / 2, a.outerRadius = Math.min(s, r) / 2 - 50;
                  i.width = 2 * s, i.height = 2 * r, n.scale(2, 2), t()
                }))
              }));
            case 1:
              a.createSelectorQuery().select("#canvas").boundingClientRect((function(t) {
                a.canvasLeft = t.left, a.canvasTop = t.top
              })).exec(), a.angle = 158 / 360 * Math.PI * 2, a.canvas = i, a.ctx = n;
            case 2:
            case "end":
              return t.stop()
          }
        }), e)
      })))()
    }
  }
});
var t = require("../../../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../../../@babel/runtime/helpers/asyncToGenerator");
Component({
  observers: {
    "uiJson,deviceStatus": function(a, i) {
      if (a && i) {
        var n = a.find((function(t) {
          return "temDashboard" === t.type
        }));
        if (n) {
          var s = n.type,
            r = n.label,
            h = n.children.sort((function(t) {
              return t.value
            })),
            c = h[0].value,
            u = h[(0 === h.length ? 1 : h.length) - 1].value,
            o = i[s][r].value,
            l = this;
          this.data.min === c && this.data.max === u ? this.setData({
            currentValue: o
          }, this.drawCircleByCurrentValue(Number(o))) : this.setData({
            currentValue: o,
            min: Number(c),
            max: Number(u)
          }, e(t().mark((function e() {
            return t().wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return t.next = 1, l.renderCanvas();
                case 1:
                  return t.next = 2, l.drawCircleByCurrentValue(Number(o));
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
    deviceStatus: Object
  },
  data: {
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
        if (this.angle = Math.atan2(a - this.centerY, e - this.centerX), this.angle > .125 * Math.PI * 2 && this.angle < .375 * Math.PI * 2) return;
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
        console.log("child", a), this.triggerEvent("temChange", a)
      }
    },
    drawCircleByCurrentValue: function(t) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, .375 * Math.PI * 2, .125 * Math.PI * 2), this.ctx.strokeStyle = "#39475C", this.ctx.lineWidth = 6, this.ctx.stroke();
      var e = this.data.max,
        a = this.data.min,
        i = t - a;
      this.angle = i / (e - a) * 270 / 360 * Math.PI * 2 + .375 * Math.PI * 2, this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, .375 * Math.PI * 2, this.angle);
      var n = this.ctx.createLinearGradient(this.centerX - this.outerRadius, this.centerY, this.centerX + this.outerRadius, this.centerY);
      n.addColorStop(0, "#995FE1"), n.addColorStop(1, "#FF666D"), this.ctx.strokeStyle = n, this.ctx.lineWidth = 6, this.ctx.stroke();
      var s = this.centerX + this.outerRadius * Math.cos(this.angle),
        r = this.centerY + this.outerRadius * Math.sin(this.angle);
      this.ctx.beginPath(), this.ctx.arc(s, r, 10, 0, 2 * Math.PI), this.ctx.fillStyle = "#DADFE4", this.ctx.fill()
    },
    drawCircle: function() {
      var t;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, .375 * Math.PI * 2, .125 * Math.PI * 2), this.ctx.strokeStyle = "#39475C", this.ctx.lineWidth = 6, this.ctx.stroke(), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, .375 * Math.PI * 2, this.angle), this.angle <= 0 ? t = .125 * Math.PI * 2 + (.5 * Math.PI * 2 + this.angle) : this.angle - .375 * Math.PI * 2 >= 0 ? t = this.angle - .375 * Math.PI * 2 : this.angle > 0 && this.angle <= .125 * Math.PI * 2 && (t = this.angle + .625 * Math.PI * 2);
      var e = t / (.75 * Math.PI * 2),
        a = (this.data.max - this.data.min) * e + this.data.min;
      this.setData({
        currentValue: Math.round(a)
      });
      var i = this.ctx.createLinearGradient(this.centerX - this.outerRadius, this.centerY, this.centerX + this.outerRadius, this.centerY);
      i.addColorStop(0, "#995FE1"), i.addColorStop(1, "#FF666D"), this.ctx.strokeStyle = i, this.ctx.lineWidth = 6, this.ctx.stroke();
      var n = this.centerX + this.outerRadius * Math.cos(this.angle),
        s = this.centerY + this.outerRadius * Math.sin(this.angle);
      this.ctx.beginPath(), this.ctx.arc(n, s, 10, 0, 2 * Math.PI), this.ctx.fillStyle = "#DADFE4", this.ctx.fill()
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
                  i = e[0].node, n = i.getContext("2d"), s = e[0].width, r = e[0].height, a.centerX = s / 2, a.centerY = r / 2, a.outerRadius = Math.min(s, r) / 2 - 30;
                  i.width = 2 * s, i.height = 2 * r, n.scale(2, 2), t()
                }))
              }));
            case 1:
              a.createSelectorQuery().select("#canvas").boundingClientRect((function(t) {
                a.canvasLeft = t.left, a.canvasTop = t.top
              })).exec(), a.angle = .375 * Math.PI * 2, a.canvas = i, a.ctx = n;
            case 2:
            case "end":
              return t.stop()
          }
        }), e)
      })))()
    }
  }
});
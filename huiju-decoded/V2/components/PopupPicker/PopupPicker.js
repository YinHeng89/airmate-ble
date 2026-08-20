Component({
  observers: {
    list: function(t) {
      if (t && 0 !== t.length) {
        var e = t.map((function(t) {
          return {
            text: t.displayName,
            value: t.value,
            protocol: t.protocol,
            type: t.type,
            label: t.label
          }
        }));
        this.setData({
          columns: e
        })
      } else this.setData({
        columns: []
      })
    },
    currentValue: function(t) {
      var e = this.data.columns.find((function(e) {
        return t == e.value
      }));
      e && this.setData({
        value: e.text,
        pickerValue: t
      })
    },
    status: function(t) {
      var e = Object.keys(t).find((function(e) {
        return t[e]
      }));
      e ? this.setData({
        value: e
      }) : this.setData({
        value: ""
      })
    }
  },
  properties: {
    disabled: {
      type: Boolean,
      value: !1
    },
    currentValue: {
      type: Number,
      value: 0
    },
    themeColor: {
      type: String,
      value: "#4186fa"
    },
    label: String,
    list: Array,
    status: Object
  },
  data: {
    show: !1,
    value: "",
    columns: []
  },
  methods: {
    handleConfirm: function(t) {
      this.triggerEvent("change", t.detail.value), this.handleClosePopup()
    },
    handleShowPopup: function() {
      this.setData({
        show: !0
      })
    },
    handleClosePopup: function() {
      this.setData({
        show: !1
      })
    }
  }
});
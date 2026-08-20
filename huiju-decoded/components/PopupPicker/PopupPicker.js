Component({
  observers: {
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
    label: String,
    columns: Array,
    status: Object
  },
  data: {
    show: !1,
    value: ""
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
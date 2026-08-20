Component({
  properties: {
    themeColor: {
      type: String,
      value: "#3b89fc"
    },
    text: {}
  },
  data: {
    show: !1
  },
  methods: {
    handleOpenPopUp: function() {
      this.setData({
        show: !0
      })
    },
    onClose: function() {
      this.setData({
        show: !1
      })
    }
  }
});
Component({
  properties: {
    bgColor: {
      type: String,
      value: "#E1E4ED"
    },
    textColor: {
      type: String,
      value: "#787B8D"
    },
    themeColor: {
      type: String,
      value: "#3b89fc"
    },
    commandWords: {
      type: null,
      value: null
    }
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
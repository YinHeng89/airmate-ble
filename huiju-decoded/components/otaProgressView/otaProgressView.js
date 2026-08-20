Component({
  properties: {
    pShow: Boolean,
    pValue: Number,
    pNumber: Number,
    pTimes: Number,
    pOtaFile: String,
    pFailReason: String,
    pOtaResult: Number,
    pStatus: Number,
    countDown: Number
  },
  data: {
    otaBgHeight: 400
  },
  observers: {
    "pTimes,pStatus": function(t, e) {
      t > 1 ? e > 2 ? this.setData({
        otaBgHeight: 500
      }) : this.setData({
        otaBgHeight: 400
      }) : e > 2 ? this.setData({
        otaBgHeight: 370
      }) : this.setData({
        otaBgHeight: 270
      })
    }
  },
  methods: {
    onOtaViewConfirm: function() {
      this.triggerEvent("OnConfirm")
    }
  }
});
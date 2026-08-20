Object.defineProperty(exports, "__esModule", {
  value: !0
});
var o = require("../common/component"),
  t = require("../mixins/button"),
  e = require("../common/color"),
  n = require("../common/utils");
(0, o.VantComponent)({
  mixins: [t.button],
  classes: ["cancle-button-class", "confirm-button-class"],
  props: {
    show: {
      type: Boolean,
      observer: function(o) {
        !o && this.stopLoading()
      }
    },
    title: String,
    message: String,
    theme: {
      type: String,
      value: "default"
    },
    confirmButtonId: String,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    beforeClose: null,
    overlayStyle: String,
    useSlot: Boolean,
    useTitleSlot: Boolean,
    useConfirmButtonSlot: Boolean,
    useCancelButtonSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: null,
    zIndex: {
      type: Number,
      value: 2e3
    },
    confirmButtonText: {
      type: String,
      value: "确认"
    },
    cancelButtonText: {
      type: String,
      value: "取消"
    },
    confirmButtonColor: {
      type: String,
      value: e.RED
    },
    cancelButtonColor: {
      type: String,
      value: e.GRAY
    },
    showConfirmButton: {
      type: Boolean,
      value: !0
    },
    overlay: {
      type: Boolean,
      value: !0
    },
    transition: {
      type: String,
      value: "scale"
    },
    rootPortal: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    loading: {
      confirm: !1,
      cancel: !1
    },
    callback: function() {}
  },
  methods: {
    onConfirm: function() {
      this.handleAction("confirm")
    },
    onCancel: function() {
      this.handleAction("cancel")
    },
    onClickOverlay: function() {
      this.close("overlay")
    },
    close: function(o) {
      var t = this;
      this.setData({
        show: !1
      }), wx.nextTick((function() {
        t.$emit("close", o);
        var e = t.data.callback;
        e && e(o, t)
      }))
    },
    stopLoading: function() {
      this.setData({
        loading: {
          confirm: !1,
          cancel: !1
        }
      })
    },
    handleAction: function(o) {
      var t, e = this;
      this.$emit(o, {
        dialog: this
      });
      var l = this.data,
        a = l.asyncClose,
        i = l.beforeClose;
      a || i ? (this.setData(((t = {})["loading.".concat(o)] = !0, t)), i && (0, n.toPromise)(i(o)).then((function(t) {
        t ? e.close(o) : e.stopLoading()
      }))) : this.close(o)
    }
  }
});
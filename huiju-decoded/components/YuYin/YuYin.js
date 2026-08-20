Component({
  properties: {
    item: Object,
    status: Boolean
  },
  data: {},
  methods: {
    handleChange: function() {
      var t = this.data.item.protocol,
        e = !this.data.status,
        o = e ? "open" : "close",
        a = t.find((function(t) {
          return t.key === o
        })).value;
      this.triggerEvent("change", {
        protocol: a,
        status: e
      })
    }
  }
});
Component({
  properties: {
    connectStatus: {
      type: String,
      value: "noConnected"
    }
  },
  data: {
    connectStatusMap: {
      noConnected: "未连接",
      connected: "已连接"
    }
  },
  methods: {}
});
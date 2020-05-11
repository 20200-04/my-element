<template>
  <div class="scTelemeteringCode">
    <table border="1" style="border-collapse:collapse; border-color: #909399;">
      <thead>
        <tr style="border-color:#C0C4CC">
          <th>时间</th>
          <th>源码</th>
        </tr>
      </thead>
      <tbody style="font-size: 14px;">
        <tr v-for="(item,index) in paraOriginal" :key="index">
          <td style="width: 160px;">{{item.devTime}}</td>
          <td>
            <span
              v-for="(item1,index1) in item.originalData"
              :key="index1"
              style="display: inline-block; width: 180px;background:#F2F6FC;"
            >
              <span
                v-for="(item,index2) in item1"
                :key="index2"
                style="display: inline-block; width: 20px;height: 20px;"
              >{{item}}</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import WebSocketProxy from "@/utils/socketProxy";
let item = ["1a", "cf", "fc", "1d", "40", "41", "00", "02"];
export default {
  data() {
    return {
      websock: null,
      paraOriginal: []
    };
  },
  mounted() {
    // this.initWebSocket();
    this.paraOriginal = [
      {
        devTime: "2020-04-28 12:23:39",
        originalData: Array(128).fill(item)
      },
      {
        devTime: "2020-04-28 16:23:39",
        originalData: Array(128).fill(item)
      }
    ];
  },
  destroyed() {
    // this.websock.close(); // 离开路由之后断开websocket连接
  },
  methods: {
    // initWebSocket() {
    //   let _this = this;
    //   //初始化WebSocket
    //   this.websock = new WebSocketProxy("ws://localhost:6001");
    //   this.websock.onopen = () => {
    //     this.websock.subscribe("task");
    //   };
    //   const listener = function(msg) {
    //     console.log(msg);
    //   };
    //   this.websock.on("task", listener);
    // }
  }
};
</script>

<style>
.card {
  height: 400px;
  margin-bottom: 16px;
}
.scTelemeteringCode {
  padding: 40px;
}
</style>
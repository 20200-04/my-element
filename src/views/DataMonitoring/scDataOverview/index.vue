<template>
  <div style="padding:10px 20px">
    <!-- <el-select
      v-model="searchObj.scName"
      size="mini"
      filterable
      clearable
      @change="currentScNameId"
      placeholder="请选择卫星名称"
      style="margin:10px 0 10px 34px;"
    >
      <el-option
        v-for="item in searchObj.scNames"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>-->
    <div class="title">
      <div>
        <svg-icon iconClass="scid" />
        <span>{{searchObj.scName}}</span>
      </div>
      <div>
        <svg-icon iconClass="state" />
        <span>运行中</span>
      </div>
    </div>
    <div class="surround">
      <div class="left">
        <BasicInfo :basicInfo="basicInfo" />
        <NewTaskPlanning :newTaskPlanning="newTaskPlanning" />
      </div>
      <div class="right">
        <SoundCode :soundCode="soundCode" :paraOriginal="paraOriginal" />
        <NewTelecommand :newTelecommand="newTelecommand" />
        <NewPolice :newPolice="newPolice" />
      </div>
    </div>
  </div>
</template>

<script>
let item = ["1a", "cf", "fc", "1d", "40", "41", "00", "02"];
import BasicInfo from "./components/BasicInfo"; //基础信息
import NewPolice from "./components/NewPolice"; //最新报警
import NewTaskPlanning from "./components/NewTaskPlanning"; //最新任务计划
import NewTelecommand from "./components/NewTelecommand"; //最新遥控指令
import Parameter from "./components/Parameter"; //参数
import RealTimeStatus from "./components/RealTimeStatus"; //实时状态
import SoundCode from "./components/SoundCode"; //源码
import { getScId, setScId } from "@/utils/auth";
// import WebSocketProxy from "@/utils/socketProxy";
import { log } from "util";
export default {
  components: {
    BasicInfo,
    NewPolice,
    NewTaskPlanning,
    NewTelecommand,
    Parameter,
    RealTimeStatus,
    SoundCode
  },
  data() {
    return {
      websock: null,
      newScId: "",
      searchObj: {
        scName: "",
        scNames: [
          { name: "卫星测试1", id: 1 },
          { name: "卫星测试2", id: 2 },
          { name: "卫星测试3", id: 3 },
          { name: "卫星测试4", id: 4 },
          { name: "卫星测试5", id: 5 },
          { name: "卫星测试6", id: 6 }
        ]
      },
      // ---基础信息
      basicInfo: {
        scId: 1, // 卫星id
        scName: "卫星一", // 卫星名称
        scCode: "测试卫星代号", // 卫星代号
        scType: "测试卫星类型", // 卫星类型
        orbitInclination: "70°", // 轨道倾角
        orbitType: "弱类型", // 轨道类型
        orbitAltitude: "100km", // 卫星高度
        launchTime: "2020-04-27 09:30:10" // 发射时间
      },
      //--遥测参数
      parameter: [
        // 代号、参数名称、状态、数据、源码
      ],
      // --最新任务信息
      newTaskPlanning: [
        // 任务代号、卫星名称、执行时间
      ],
      RealTimeStatus: [],
      soundCode: [],
      // --最新告警信息
      newPolice: [
        // {
        //   // 分系统名称、参数代号、参数名称、星上时间、地面时间、报警值、报警级别、报警上下线
        // }
        {
          apId: "系统三号",
          idName: "参数3",
          scTime: "2020-04-21 17:01:21",
          apTime: "2020-1-2",
          bjId: 3,
          bjClass: "三级",
          bjName: 121
        },
        {
          apId: "系统四号",
          idCode: 4,
          idName: "参数4",
          scTime: "2020-02-21 12:11:24",
          apTime: "2020-1-2",
          bjId: 3,
          bjClass: "二级",
          bjName: 453,
          type: "ok"
        }
      ],
      // --最新遥控指令
      newTelecommand: [
        {
          Time: "2010-04-05",
          Send: "某某0",
          Content: "发射卫星"
        },
        {
          Time: "2010-02-15",
          Send: "某某1",
          Content: "卫星拍照"
        },
        {
          Time: "2010-02-15",
          Send: "某某1",
          Content: "卫星拍照"
        }
      ],
      paraOriginal: []
    };
  },
  mounted() {
    this.init();
    this.initScId();
    // this.initWebSocket();
    this.paraOriginal = [
      {
        devTime: "2020-04-28 12:23:39",
        originalData: Array(128).fill(item)
      }
    ];
  },
  destroyed() {
    // this.websock.close(); // 离开路由之后断开websocket连接
  },
  methods: {
    init() {
      for (let a = 0; a < 6; a++) {
        this.newTaskPlanning.push({
          commandName: "代号" + a, // 任务代号
          survey: "某某测站" + a,
          createTime: "2020-02-11 11:01:11-2020-04-21 17:01:21" // 执行时间
        });
      }
      for (let a = 0; a < 5; a++) {
        this.RealTimeStatus.push({
          scName: "卫星" + a,
          scCode: "卫星代号" + a,
          state: a % 2 ? 0 : 1
        });
      }
      for (let a = 0; a < 7; a++) {
        this.soundCode.push({
          paraName: "X测控单元定时清零计数",
          original: "aa",
          data: 22,
          state: "ok"
        });
      }
      for (var a = 1; a < 4; a++) {
        this.parameter.push({
          scCode: "代号" + a, // 卫星代号
          paraName: "遥测参数" + a,
          state: a % 2 ? 0 : 1,
          data: Math.floor(Math.random() * 1000),
          soundCode: Math.floor(Math.random() * 10000) // 源码
        });
      }
    },
    initScId() {
      //改变scid的值
      const { scId, scName } = this.$route.params.obj || "";
      console.log(this.$route.params.obj);
      this.searchObj.scName = scName;
      if (scId) {
        this.$store.dispatch("sc/ChangeScId", scId);
      } else {
        this.searchObj.scName = `卫星${Number(getScId())}`;
      }
      // console.log(this.$store.state.sc.scid);
    },
    currentScNameId(scId) {
      this.$store.dispatch("sc/ChangeScId", scId);
      this.newScId = this.$store.state.sc.scid;
      console.log(this.newScId);
    }
    // initWebSocket() {
    //   let _this = this;
    //   //初始化WebSocket
    //   this.websock = new WebSocketProxy("ws://localhost:6001");
    //   this.websock.onopen = () => {
    //     this.websock.subscribe("task");
    //   };
    //   const listener = function(msg) {
    //     const list = _this.newTelecommand;
    //     if (list.length === 3) {
    //       list.shift();
    //     }
    //     list.push(msg);
    //   };
    //   this.websock.on("task", listener);
    // }
  }
};
</script>

<style scoped>
.surround {
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: #333;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 30%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}
.right {
  width: 68%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
}
</style>
<template>
  <div style="padding:20px;">
    <div class="fun-head">
      <p></p>
      <div>
        <el-input
          v-model="searchObj.paraID"
          placeholder="请输入卫星名称"
          style="width:180px;margin-bottom:6px;"
        ></el-input>
        <el-button type="primary" :disabled="disabled" @click="search">搜索</el-button>
      </div>
    </div>

    <el-table :data="tableConstCopy" border>
      <el-table-column align="center" prop="paraID" label="代号"></el-table-column>
      <el-table-column align="center" prop="paraName" label="名称"></el-table-column>
      <el-table-column align="center" prop="state" label="状态"></el-table-column>
      <el-table-column align="center" prop="data" label="数据"></el-table-column>
      <el-table-column align="center" prop="original" label="源码"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { log } from "util";
  // 参数
  export default {
    data() {
      return {
        searchObj: {
          paraID: ""
        },
        tableConst: [],
        tableConstCopy: [],
        disabled: false,
        objList: {
          ["164B11"]: {
            paraID: "164B11",
            paraName: "X测控单元定时清零计数",
            data: 22,
            time: "2020:04:28 13:03:28",
            Level: "1级",
            state: "ok",
            original: "aa"
          },
          ["164B13"]: {
            paraID: "164B13",
            paraName: "遥控注数门开/关状态",
            data: 33,
            time: "2020:04:28 13:04:28",
            Level: "2级",
            state: "no",
            original: "bb"
          },
          ["164B12"]: {
            paraID: "164B12",
            paraName: "信号处理FPGA加载计数",
            data: 44,
            time: "2020:04:28 13:08:28",
            Level: "3级",
            state: "ok",
            original: "cc"
          },
          ["164B15"]: {
            paraID: "164B15",
            paraName: "信号处理de加载计数",
            data: 55,
            time: "2020:04:28 13:08:28",
            Level: "4级",
            state: "no",
            original: "dd"
          },
          ["164B17"]: {
            paraID: "164B17",
            paraName: "信号处理suo加载计数",
            data: 66,
            time: "2020:04:28 13:08:28",
            Level: "5级",
            state: "ok",
            original: "ee"
          }
        }
      };
    },
    mounted() {
      // this.getList();
    },
    watch: {
      searchObj: {
        handler(newValue, oldValue) {
          if (newValue) {
            if (newValue.paraID === "") {
              this.disabled = true;
              this.getList();
            } else {
              this.disabled = false;
            }
          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      // 处理数据
      getList() {
        console.log(11);
        this.objList = JSON.parse(JSON.stringify(this.objList));
        console.log(this.objList);
        // console.log(Object.keys(this.objList));
        // es6过滤得到满足搜索条件的展示数据list
        this.tableConstCopy = Object.values(this.objList)
      },
      // 搜索过滤数据
      search() {
        this.tableConstCopy = Object.values(this.tableConstCopy).filter(item => {
          return item.paraID.includes(this.searchObj.paraID);
        });
      }
    }
  };
</script>

<style scoped>
  .fun-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>

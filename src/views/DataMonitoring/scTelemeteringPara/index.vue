<template>
  <div>
    <div class="fun-head">
      <div>
        <el-input
          v-model="searchObj.paraID"
          size="mini"
          placeholder="请输入卫星名称"
          style="width:180px;margin-bottom:6px;"
        ></el-input>
        <el-button type="primary" :disabled="disabled" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="publicpage_tableL" style="padding: 10px 5px 10px 10px">
      <table class="table table-striped m-b-none">
        <thead>
          <tr class="publicpage_tabletrbg">
            <th>代号</th>
            <th>名称</th>
            <th>状态</th>
            <th>数据</th>
            <th>源码</th>
          </tr>
        </thead>
        <tbody>
          <tr class="alarm_0" v-for="x in objCopy" :key="x.paraID">
            <td class="publicpage_noborder ng-binding">{{x.paraID}}</td>
            <td class="publicpage_noborder ng-binding">{{x.paraName}}</td>
            <td class="publicpage_noborder ng-binding">{{x.state}}</td>
            <td class="publicpage_noborder ng-binding">{{x.data}}</td>
            <td class="publicpage_noborder ng-binding">{{x.original}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
// 参数
export default {
  data() {
    return {
      searchObj: {
        paraID: ""
      },
      disabled: false,
      objList: {
        "164B11": {
          paraID: "164B11",
          paraName: "X测控单元定时清零计数",
          data: 22,
          time: "2020:04:28 13:03:28",
          Level: "1级",
          state: "ok",
          original: "aa"
        },
        "163B13": {
          paraID: "163B13",
          paraName: "遥控注数门开/关状态",
          data: 33,
          time: "2020:04:28 13:04:28",
          Level: "2级",
          state: "no",
          original: "bb"
        },
        "164B12": {
          paraID: "164B12",
          paraName: "信号处理FPGA加载计数",
          data: 44,
          time: "2020:04:28 13:08:28",
          Level: "3级",
          state: "ok",
          original: "cc"
        },
        "163B15": {
          paraID: "163B15",
          paraName: "信号处理de加载计数",
          data: 55,
          time: "2020:04:28 13:08:28",
          Level: "4级",
          state: "no",
          original: "dd"
        },
        "164B17": {
          paraID: "164B17",
          paraName: "信号处理suo加载计数",
          data: 66,
          time: "2020:04:28 13:08:28",
          Level: "5级",
          state: "ok",
          original: "ee"
        }
      },
      objCopy: {}
    };
  },
  created() {
    this.getList();
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.paraID === "") {
            this.disabled = true;
            this.objCopy = this.objList;
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
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.objList;
      // 发请求拿到数据并暂存全部数据,方便之后操作
      console.log(this.data);

      this.getList();
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      this.objCopy = this.objList;
    },
    // 搜索过滤数据
    search() {
      this.objCopy = {};
      for (const key in this.objList) {
        if (key.includes(this.searchObj.paraID)) {
          this.objCopy[key] = this.objList[key];
        }
      }
      console.log(this.objCopy);
    }
  }
};
</script>

<style>
.fun-head {
  padding: 20px;
  display: flex;
  float: right;
  justify-content: space-between;
  vertical-align: top;
  margin-bottom: 20px;
}
.m-b-none {
  margin-bottom: 0 !important;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
table {
  background-color: transparent;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
.publicpage_tabletrbg {
  background-color: #ffffff;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > thead > tr > th {
  padding: 8px 15px;
  border-bottom: 1px solid #eaeff0;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #999;
}
th {
  text-align: left;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: oldlace;
}
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px 15px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.publicpage_noborder {
  border: none !important;
}
td,
th {
  padding: 0;
}
td {
  display: table-cell;
  vertical-align: inherit;
}
</style>

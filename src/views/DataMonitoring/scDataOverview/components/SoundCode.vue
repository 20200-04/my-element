<template>
  <div>
    <div class="fun-head">
      <div>
        <el-input
          v-model="searchObj.scCode"
          size="mini"
          placeholder="请输入卫星名称"
          style="width:180px;margin-bottom:6px;"
        ></el-input>
        <el-button type="primary" :disabled="disabled" size="mini" @click="search">搜索</el-button>
      </div>
    </div>
    <el-table :data="data" :row-class-name="tableRowClassName">
      <el-table-column label="卫星源码" align="center">
        <el-table-column prop="scCode" label="卫星代号" align="center" sortable></el-table-column>
        <el-table-column prop="scName" label="卫星名称" sortable align="center"></el-table-column>
        <el-table-column prop="state" label="源码" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 卫星源码
export default {
  data() {
    return {
      // 数据整体存储
      data: [],
      searchObj: {
        scCode: ""
      },
      tableConst: [],
      disabled: false
    };
  },
  props: {
    soundCode: {
      type: Array
    }
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.scCode === "") {
            this.disabled = true;
            this.data = this.tableConst;
          } else {
            this.disabled = false;
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.pageList();
  },
  methods: {
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.soundCode;
      this.tableConst = this.soundCode;
      console.log(this.tableConst);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 处理数据
    getList() {
      this.data = this.soundCode;
      // es6过滤得到满足搜索条件的展示数据list
      this.data = this.data.filter((item, index) =>
        item.scCode.includes(this.searchObj.scCode)
      );
    },
    //搜索过滤数据
    search() {
      this.getList();
    }
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>

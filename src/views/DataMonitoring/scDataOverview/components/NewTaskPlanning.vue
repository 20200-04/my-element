
<template>
  <div class="container">
    <el-table :data="newTaskPlanning" :row-class-name="tableRowClassName">
      <el-table-column label="最新任务计划" align="center">
        <el-table-column prop="commandName" label="任务代号" sortable align="center"></el-table-column>
        <el-table-column prop="scName" label="卫星名称" sortable align="center"></el-table-column>
        <el-table-column prop="createTime" label="发送时间" align="center" sortable></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 最新任务计划
export default {
  props: {
    newTaskPlanning: {
      type: Array
    }
  },
  mounted() {
    console.log(this.newTaskPlanning);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>

<style>
.container {
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>

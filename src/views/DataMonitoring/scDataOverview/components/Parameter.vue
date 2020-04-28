<template>
  <div class="dashboard-container">
    <el-table :data="parameter" :row-class-name="tableRowClassName">
      <el-table-column label="遥测参数" align="center">
        <el-table-column prop="scCode" label="卫星代号" align="center" sortable></el-table-column>
        <el-table-column prop="paraName" label="参数名称" sortable align="center"></el-table-column>
        <el-table-column prop="state" label="状态" sortable align="center"></el-table-column>
        <el-table-column prop="data" label="数据" sortable align="center"></el-table-column>
        <el-table-column prop="soundCode" label="参数" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 参数
export default {
  data() {
    return {
      disabled: false,
      searchObj: {
        scCode: ""
      },
      table: [],
      tableConst: []
    };
  },
  props: {
    parameter: {
      type: Array
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 1) {
        return "success-row";
      }
      return "";
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

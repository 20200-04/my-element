<template>
  <el-table :data="RealTimeStatus">
    <el-table-column label="实时状态" align="center">
      <el-table-column prop="scCode" label="卫星代号"></el-table-column>
      <el-table-column prop="scName" label="卫星名称"></el-table-column>
      <el-table-column prop="state" label="实时状态"></el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
// 实时状态
export default {
  props: {
    RealTimeStatus: {
      type: Array
    }
  },
  mounted() {
    console.log(this.parameter);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      } else if (rowIndex === 2) {
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

<template>
  <el-table :data="tableData" border style="width:100%">
    <el-table-column align="center" prop="apId" label="分系统名称"></el-table-column>
    <el-table-column align="center" prop="idCode" label="参数代号"></el-table-column>
    <el-table-column align="center" prop="idName" label="参数名称"></el-table-column>
    <el-table-column align="center" prop="scTime" label="星上时间"></el-table-column>
    <el-table-column align="center" prop="apTime" label="地面时间"></el-table-column>
    <el-table-column align="center" prop="bjId" label="报警值"></el-table-column>
    <el-table-column align="center" prop="bjClass" label="报警级别"></el-table-column>
    <el-table-column align="center" prop="bjName" label="报警上下线"></el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.tableData);
  },
  props: {
    tableData: Array
  }
};
</script>
<style scoped>
</style>

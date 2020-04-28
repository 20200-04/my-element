<template>
  <div :basicInfo="basicInfo" class="container">
    <el-table
      :data="basicInfo"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width:100%"
    >
      <el-table-column align="center" prop="scId" label="卫星id"></el-table-column>
      <el-table-column align="center" prop="scName" label="卫星名称"></el-table-column>
      <el-table-column align="center" prop="scCode" label="卫星代号"></el-table-column>
      <el-table-column align="center" prop="scType" label="卫星类型"></el-table-column>
      <el-table-column align="center" prop="orbitInclination" label="轨道倾角"></el-table-column>
      <el-table-column align="center" prop="orbitType" label="轨道类型"></el-table-column>
      <el-table-column align="center" prop="orbitAltitude" label="卫星高度"></el-table-column>
      <el-table-column align="center" prop="launchTime" label="发射时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 基础信息
export default {
  props: {
    basicInfo: {
      type: Array
    }
  },

  mounted() {
    console.log(this.basicInfo);
  }
};
</script>

<style  scoped>
.container {
  width: 100%;
}
</style>

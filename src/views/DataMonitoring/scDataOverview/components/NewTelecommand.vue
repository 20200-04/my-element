<template>
  <div class="container">
    <el-table
      :data="newTelecommand"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width:100%"
    >
      <el-table-column align="center" prop="Time" label="时间"></el-table-column>
      <el-table-column align="center" prop="Send" label="发送人"></el-table-column>
      <el-table-column align="center" prop="Content" label="指令内容"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// 最新遥控指令
export default {
  props: {
    newTelecommand: {
      type: Array
    }
  },
  mounted() {
    console.log(this.newTelecommand);
  },
  data() {
    return {};
  }
};
</script>

<style  scoped>
.container {
  width: 100%;
}
</style>

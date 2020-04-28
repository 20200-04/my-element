<template>
  <div class="type-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-question"></i> 未确认
        </span>
        <el-table :data="oneArray" border style="width:100%">
          <el-table-column align="center" prop="apId" label="分系统名称"></el-table-column>
          <el-table-column align="center" prop="idCode" label="参数代号"></el-table-column>
          <el-table-column align="center" prop="idName" label="参数名称"></el-table-column>
          <el-table-column align="center" prop="scTime" label="星上时间"></el-table-column>
          <el-table-column align="center" prop="apTime" label="地面时间"></el-table-column>
          <el-table-column align="center" prop="bjId" label="报警值"></el-table-column>
          <el-table-column align="center" prop="bjClass" label="报警级别"></el-table-column>
          <el-table-column align="center" prop="bjName" label="报警上下线"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane type="border-card">
        <span slot="label">
          <i class="el-icon-warning"></i> 已确认
        </span>
        <el-table :data="twoArray" border style="width:100%">
          <el-table-column align="center" prop="apId" label="分系统名称"></el-table-column>
          <el-table-column align="center" prop="idCode" label="参数代号"></el-table-column>
          <el-table-column align="center" prop="idName" label="参数名称"></el-table-column>
          <el-table-column align="center" prop="scTime" label="星上时间"></el-table-column>
          <el-table-column align="center" prop="apTime" label="地面时间"></el-table-column>
          <el-table-column align="center" prop="bjId" label="报警值"></el-table-column>
          <el-table-column align="center" prop="bjClass" label="报警级别"></el-table-column>
          <el-table-column align="center" prop="bjName" label="报警上下线"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane type="border-card">
        <span slot="label">
          <i class="el-icon-info"></i> 全部
        </span>
        <el-table :data="newPolice" border style="width:100%">
          <el-table-column align="center" prop="apId" label="分系统名称"></el-table-column>
          <el-table-column align="center" prop="idCode" label="参数代号"></el-table-column>
          <el-table-column align="center" prop="idName" label="参数名称"></el-table-column>
          <el-table-column align="center" prop="scTime" label="星上时间"></el-table-column>
          <el-table-column align="center" prop="apTime" label="地面时间"></el-table-column>
          <el-table-column align="center" prop="bjId" label="报警值"></el-table-column>
          <el-table-column align="center" prop="bjClass" label="报警级别"></el-table-column>
          <el-table-column align="center" prop="bjName" label="报警上下线"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 最新报警
export default {
  data() {
    return {};
  },
  mounted() {},
  props: {
    newPolice: {
      type: Array
    }
  },
  computed: {
    oneArray() {
      return this.newPolice.filter(function(item) {
        return item.type === "no";
      });
    },
    twoArray() {
      return this.newPolice.filter(function(item) {
        return item.type === "ok";
      });
    }
  }
};
</script>

<style  scoped>
.type-container {
  width: 100%;
}
</style>

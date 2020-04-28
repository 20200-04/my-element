
<template>
  <div class="type-container">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-question"></i> 未确认
        </span>
        <police-table :tableData="tableData" v-if="tableData.length" />
      </el-tab-pane>
      <el-tab-pane type="border-card">
        <span slot="label">
          <i class="el-icon-warning"></i> 已确认
        </span>
        <police-table :tableData="tableData" v-if="tableData.length" />
      </el-tab-pane>
      <el-tab-pane type="border-card">
        <span slot="label">
          <i class="el-icon-info"></i> 全部
        </span>
        <police-table :tableData="tableData" v-if="tableData.length" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import policeTable from "./components/policeTable";
// 最新报警
export default {
  data() {
    return {
      currentClick: "0",
      tableData: []
    };
  },
  mounted() {
    this.getData(this.currentClick);
    console.log(this.tableData);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.index);
      this.currentClick = tab.index;
      this.getData(this.currentClick);
    },
    getData(index) {
      if (index === "0") {
        this.tableData = this.newPolice.filter(item => {
          return item.type === "no";
        });
        console.log(this.tableData);
      } else if (index === "1") {
        this.tableData = this.newPolice.filter(item => {
          return item.type === "ok";
        });
      } else {
        this.tableData = this.newPolice.filter(item => {
          return item;
        });
      }
    }
  },
  props: {
    newPolice: {
      type: Array
    }
  },
  computed: {
    // oneArray () {
    //   return this.newPolice.filter(function (item) {
    //     return item.type === 'no'
    //   })
    // },
    //  twoArray () {
    //   return this.newPolice.filter(function (item) {
    //     return item.type === 'ok'
    //   })
    // }
  },
  components: {
    policeTable
  }
};
</script>

<style  scoped>
.type-container {
  width: 100%;
}
</style>
<template>
  <div class="type-container" style="padding:20px;">
    <div class="fun-head">
      <p></p>
      <div>
        <el-input v-model="searchObj.idCode" placeholder="请输入参数代号" style="width:180px;"></el-input>
        <el-select v-model="searchObj.bjClass" filterable clearable placeholder="请选择报警级别">
          <el-option v-for="item in  bjClassName" :key="item.id" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
    <el-tabs type="border-card" @tab-click="handleClick" style="margin-top:2rem;">
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
import policeTable from "../scDataOverview/components/components/policeTable";
import filterFun from "../../../utils/filter.js";

// 最新报警
export default {
  data() {
    return {
      currentClick: "0",
      tableData: [],
      tableConst: [],
      searchObj: {
        idCode: "",
        bjClass: ""
      },
      bjClassName: {
        bjClassone: "三级",
        bjClasstwo: "四级"
      },
      newPolice: [
        {
          apId: "系统三号",
          idCode: 3,
          idName: "参数3",
          scTime: "2020-1-2",
          apTime: "2020-1-2",
          bjId: 3,
          bjClass: "三级",
          bjName: 121,
          type: "no"
        },
        {
          apId: "系统1号",
          idCode: 4,
          idName: "参数3",
          scTime: "2020-1-2",
          apTime: "2020-1-2",
          bjId: 3,
          bjClass: "三级",
          bjName: 121,
          type: "no"
        },
        {
          apId: "系统四号",
          idCode: 4,
          idName: "参数4",
          scTime: "2020-1-5",
          apTime: "2020-1-2",
          bjId: 3,
          bjClass: "二级",
          bjName: 453,
          type: "ok"
        }
      ]
    };
  },
  mounted() {
    this.getData(this.currentClick);
    console.log(this.tableData);
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.idCode === "" && newValue.bjClass === "") {
            this.disabled = true;
            this.getData(this.currentClick);
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
    searchData() {
      //this.tableData = this.tableConst;
      this.tableData = filterFun(this.tableData, this.searchObj);
    },
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
  // props: {
  //   newPolice: {
  //     type: Array
  //   }
  // },
  computed: {},
  components: {
    policeTable
  }
};
</script>

<style  scoped>
.fun-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
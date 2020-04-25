<template>
  <div class="dashboard-container">
    <div class="fun-head">
      <el-button size="mini" type="success" @click="openModel(false)">添加卫星</el-button>
      <div>
        <el-select v-model="searchObj.typeName" filterable clearable placeholder="请选择卫星类型">
          <el-option
            v-for="item in transmitObj.satelliteType"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-input v-model="searchObj.scName" placeholder="请输入卫星名称" style="width:180px;"></el-input>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableDataCopy" border style="width: 100%">
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column align="center" prop="scId" label="卫星ID" width="180"></el-table-column>
      <el-table-column align="center" prop="typeName" label="卫星类型" width="180"></el-table-column>
      <el-table-column align="center" prop="scName" label="卫星名称"></el-table-column>
      <el-table-column align="center" prop="scCode" label="卫星代号"></el-table-column>
      <el-table-column align="center" prop="orbitInclination" label="轨道倾角"></el-table-column>
      <el-table-column align="center" prop="orbitType" label="轨道类型"></el-table-column>
      <el-table-column align="center" prop="orbitAltitude" label="卫星高度"></el-table-column>
      <el-table-column align="center" label="发射时间" width="160">
        <template slot-scope="scope">{{scope.row.launchTime | time}}</template>
      </el-table-column>
      <el-table-column align="center" prop="update_time" label="修改时间" width="160">
        <template slot-scope="scope">{{scope.row.updateTime | time}}</template>
      </el-table-column>
      <el-table-column align="center" prop="create_time" label="入库时间" width="160">
        <template slot-scope="scope">{{scope.row.createTime | time}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openModel(scope)">修改</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
          <el-button type="warning" size="mini" @click="goItem(scope.row)">go</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <Dialog
      ref="ruleForm"
      :title="title"
      :visible.sync="createModel"
      :form="form"
      :transmitObj="transmitObj"
      @submitDom="submitDom"
    />
    <!-- 分页 -->
    <div class="footer">
      <pagination
        :pageTotal="paginations.pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
// 公共的搜索栏组件
import SearchBar from "../../../components/SearchBar/index.vue";
import { mapGetters, mapActions } from "vuex";
import scInfo from "../../../api/modules/scInfo";
import scType from "../../../api/modules/scType";
import scOribitType from "../../../api/modules/scOribitType";
import USER from "../../../api/modules/user.js";
import Dialog from "./components/Dialog";
import filterFun from "../../../utils/filter";
// 分页组件
import pagination from "../../../components/pagination";
import { log } from "util";

export default {
  name: "scInfo",
  inject: ["layout"],
  components: {
    SearchBar,
    Dialog,
    pagination
  },
  data() {
    return {
      disabled: false,
      title: "",
      createModel: false, // 弹框显示隐藏
      editIndex: -1,
      form: {},
      searchObj: {
        scName: "",
        typeName: ""
      },
      transmitObj: {
        satelliteType: [],
        pathwayType: []
      },
      // 数据整体存储
      tableData: [],
      tableDataCopy: [],
      tableConst: [],
      paginations: {
        //分页
        page: 1,
        limit: 14,
        pageTotal: 0
      }
    };
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.scName === "" && newValue.typeName === "") {
            this.disabled = true;
            this.tableData = this.tableConst;
            this.getListAll();
          } else {
            this.disabled = false;
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.layout.showLoading();
    this.getList();
    this.layout.hideLoading();
  },
  methods: {
    async getList() {
      this.layout.showLoading();
      const { data } = await scInfo.getScInfo();
      this.getSatelliteType();
      this.getPathwayType();
      this.tableData = data;
      this.tableConst = JSON.parse(JSON.stringify(this.tableData));
      this.getListAll();
      this.layout.hideLoading();
    },
    // 查询卫星类型
    async getSatelliteType() {
      const { data } = await scType.getScType();
      let res = data.map(item => {
        return {
          id: item.typeId,
          name: item.typeName
        };
      });
      this.transmitObj.satelliteType = res;
    },
    // 查询轨道类型
    async getPathwayType() {
      const { data } = await scOribitType.getScOribitType();
      let res = data.map(item => {
        return {
          id: item.orbitId,
          name: item.orbitType
        };
      });
      this.transmitObj.pathwayType = res;
    },
    async addInfo(obj) {
      const data = await scInfo.postScInfo(obj);
      console.log(data);
    },
    async puteScInfo(obj) {
      console.log(obj);
      const { data } = await scInfo.putScInfoId(obj);
    },
    async deleteSingle(id) {
      const { data } = await scInfo.deleteScInfoId(id);
    },
    // 打开模态框
    openModel(e = false) {
      // 增加
      if (!e) {
        this.title = "添加卫星基础信息";
        // 初始化表单
        this.form = {
          scId: "",
          scType: "",
          orbitId: "",
          typeName: "",
          scCode: "",
          orbitInclination: "",
          orbitType: "",
          orbitAltitude: "",
          launchTime: ""
        };
        this.editIndex = -1;
        this.$nextTick(() => {
          this.clearVali("ruleForm");
        });
      } else {
        // 修改
        this.title = "修改卫星基础信息";
        this.form = {
          scId: e.row.scId,
          scType: e.row.scType,
          orbitId: e.row.orbitId,
          scName: e.row.scName,
          scCode: e.row.scCode,
          orbitInclination: e.row.orbitInclination,
          orbitAltitude: e.row.orbitAltitude,
          launchTime: e.row.launchTime
        };
        this.editIndex = e.$index;
      }
      // 打开dialog
      this.createModel = true;
    },
    // 提交
    submitDom(formName) {
      this.$refs.ruleForm.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.editIndex !== -1) {
            const id = this.tableData[this.editIndex].typeId;
            console.log(id, this.form);
            await this.puteScInfo(this.form);
            this.getList();
            this.$message({
              message: "修改成功",
              type: "success"
            });
            return (this.createModel = false);
          }
          await this.addInfo(this.form);
          this.getList();
          this.$message({
            message: "添加成功",
            type: "success"
          });
          // 关闭模态框
          this.createModel = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除单个
    deleteItem(item) {
      this.$confirm(`是否要删除${item.scName}?`, "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.deleteSingle(item.scId);
        this.getList();
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    },
    clearVali(formName) {
      this.$refs.ruleForm.$refs[formName].clearValidate();
    },
    // 搜索
    searchData() {
      this.tableData = this.tableConst;
      this.tableData = filterFun(this.tableData, this.searchObj);
      this.getListAll();
    },
    getListAll() {
      this.paginations.pageTotal = this.tableData.length;
      this.tableDataCopy = this.tableData.filter(
        (item, index) =>
          index < this.paginations.limit * this.paginations.page &&
          index >= this.paginations.limit * (this.paginations.page - 1)
      );
    },
    handleCurrentChange(val) {
      this.paginations.page = val;
      this.getListAll();
    },
    handleSizeChange(val) {
      this.paginations.limit = val;
      this.getListAll();
    },
    // 配置页面
    goItem(val) {
      this.$router.push({
        name: "scSubsytemType",
        params: {
          obj: val
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.fun-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.footer {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 200px;
  bottom: 0;
  right: 0;
  z-index: 100;
  border-top: 1px solid #ccc;
}
</style>












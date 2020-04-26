<template>
  <div class="dashboard-container">
    <div class="fun-head">
      <el-button size="mini" type="success" @click="openModel(false)">添加卫星</el-button>
      <div>
        <el-select
          v-model="searchObj.scId"
          filterable
          clearable
          @change="currentScNameId"
          placeholder="请选择卫星名称"
        >
          <el-option
            v-for="item in transmitObj.satelliteName"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="searchObj.apId" filterable clearable placeholder="请选择应用识别过程">
          <el-option
            v-for="item in transmitObj.satelliteScApInfo"
            :key="item.id + Math.random()"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select v-model="searchObj.subsystemId" filterable clearable placeholder="请选择卫星分系统">
          <el-option
            v-for="item in transmitObj.satelliteSubsystemType"
            :key="item.id  + Math.random()"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input v-model="searchObj.paraName" placeholder="请输入卫星参数名称" style="width:180px;"></el-input>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableDataCopy" border style="width: 100%">
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column align="center" prop="paraId" label="参数ID" width="180"></el-table-column>
      <el-table-column align="center" prop="scId" label="卫星ID" width="180"></el-table-column>
      <el-table-column align="center" prop="apId" label="识别过程ID"></el-table-column>
      <el-table-column align="center" prop="subsytemName" label="所属分系统"></el-table-column>

      <el-table-column align="center" prop="paraName" label="参数名称"></el-table-column>
      <el-table-column align="center" prop="startPos" label="参数起始位置"></el-table-column>
      <el-table-column align="center" prop="length" label="参数长度"></el-table-column>
      <el-table-column align="center" prop="funcName" label="处理方法名称"></el-table-column>
      <el-table-column align="center" prop="funcPara" label="处理方法参数"></el-table-column>
      <el-table-column align="center" prop="scName" label="卫星名称"></el-table-column>
      <el-table-column align="center" prop="apName" label="应用识别名称"></el-table-column>
      <el-table-column align="center" prop="subsytemName" label="分系统名称"></el-table-column>
      <el-table-column align="center" prop="thresholdU1" label="一级阈值上限"></el-table-column>
      <el-table-column align="center" prop="thresholdL1" label="一级阈值下限"></el-table-column>
      <el-table-column align="center" prop="thresholdU2" label="二级阈值上限"></el-table-column>
      <el-table-column align="center" prop="thresholdL2" label="二级阈值下限"></el-table-column>
      <el-table-column align="center" prop="thresholdU3" label="三级阈值上限"></el-table-column>
      <el-table-column align="center" prop="thresholdL3" label="三级阈值下限"></el-table-column>
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
      @currentScNameId="currentScNameId"
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
import scParaInfo from "../../../api/modules/scParaInfo";
import scSubsytem from "../../../api/modules/scSubsytem";
import scApTnfo from "../../../api/modules/scApInfo";
import ScTeleCommands from "../../../api/modules/scTelecommand";
import ScParaFunc from "../../../api/modules/scParaFunc";
import USER from "../../../api/modules/user.js";
import Dialog from "./components/Dialog";
import filterFun from "../../../utils/filter";
// 分页组件
import pagination from "../../../components/pagination";
import { log } from "util";

export default {
  name: "Dashboard",
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
        scId: "",
        apId: "",
        subsystemId: "",
        paraName: ""
      },
      // 搜索
      inputs: [
        {
          model: "input",
          placeholder: "查询卫星名称"
        }
      ],
      transmitObj: {
        satelliteName: [],
        satelliteSubsystemType: [],
        satelliteScApInfo: [],
        satelliteInstruct: []
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
  computed: {},
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (
            newValue.scId === "" &&
            newValue.apId === "" &&
            newValue.subsytemId === "" &&
            newValue.paraId === ""
          ) {
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
      const { data } = await scParaInfo.getScParaInfo();
      console.log(data);
      this.tableData = data;
      this.tableConst = JSON.parse(JSON.stringify(this.tableData));
      this.getScInfo();
      this.getListAll();
      this.layout.hideLoading();
    },
    // 查询卫星名称
    async getScInfo() {
      const { data } = await scInfo.getScInfo();
      let res = data.map(item => {
        return {
          id: item.scId,
          name: item.scName
        };
      });
      this.transmitObj.satelliteName = res;
    },
    // 卫星分系统类型
    async getSubSytems(val) {
      const { data } = await scSubsytem.getScSubSytemsId(val);
      let res = data.map(item => {
        return {
          id: item.subsytemId,
          name: item.subsytemName
        };
      });
      this.transmitObj.satelliteSubsystemType = res;
    },
    // 请选择应用识别过程
    async getScApTnfo(val) {
      const { data } = await scApTnfo.getscApInfoId(val);
      let res = data.map(item => {
        return {
          id: item.apId,
          name: item.apName
        };
      });
      this.transmitObj.satelliteScApInfo = res;
    },
    // 处理方法
    async getScParaFunc(val) {
      const { data } = await ScParaFunc.getScParaFunc(val);
      let res = data.map(item => {
        return {
          id: item.funcId,
          name: item.funcName
        };
      });
      this.transmitObj.satelliteInstruct = res;
    },

    async addParaInfo(obj) {
      const data = await scParaInfo.postScParaInfo(obj);
      console.log(data);
    },
    async puteScParaInfoId(obj) {
      console.log(obj);
      const { data } = await scParaInfo.putScParaInfoId(obj);
    },
    async deleteSingle(id) {
      const { data } = await scParaInfo.deleteScParaInfoId(id);
    },
    // 打开模态框
    openModel(e = false) {
      // 增加
      if (!e) {
        this.title = "添加卫星遥测参数";
        // 初始化表单
        this.form = {
          apId: "",
          funcId: "",
          funcPara: "",
          //   paraId: "",
          scId: "",
          startPos: "",
          subsystemId: "",
          thresholdL1: "",
          thresholdL2: "",
          thresholdL3: "",
          thresholdU1: "",
          thresholdU2: "",
          thresholdU3: ""
        };
        this.editIndex = -1;
        this.$nextTick(() => {
          this.clearVali("ruleForm");
        });
      } else {
        // 修改
        this.title = "修改卫星遥测参数";
        this.form = {
          paraId: e.row.paraId,
          scId: e.row.scId,
          subsystemId: e.row.subsystemId,
          apId: e.row.apId,
          funcId: e.row.funcId,
          paraName: e.row.paraName,
          length: e.row.length,
          startPos: e.row.startPos,
          funcPara: e.row.funcPara,
          thresholdU1: e.row.thresholdU1,
          thresholdL1: e.row.thresholdL1,
          thresholdU2: e.row.thresholdU2,
          thresholdL2: e.row.thresholdL2,
          thresholdU3: e.row.thresholdU3,
          thresholdL3: e.row.thresholdL3
        };
        console.log(11111);

        console.log(this.form);
        this.currentScNameId(this.form.scId);
        this.editIndex = e.$index;
      }
      // 打开dialog
      this.createModel = true;
    },
    currentScNameId(val) {
      console.log(val);

      this.getSubSytems(val);
      this.getScApTnfo(val);
      this.getScParaFunc();
    },
    // 提交
    submitDom(formName) {
      this.$refs.ruleForm.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.editIndex !== -1) {
            const id = this.tableData[this.editIndex].typeId;
            console.log(id, this.form);
            await this.puteScParaInfoId(this.form);
            this.getList();
            this.$message({
              message: "修改成功",
              type: "success"
            });
            return (this.createModel = false);
          }
          await this.addParaInfo(this.form);
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
      console.log(this.searchObj);
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
      console.log(this.tableDataCopy);
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












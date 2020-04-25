<template>
  <div class="type-container">
    <div class="fun-head">
      <el-button size="mini" type="success" @click="openModel(false)">添加卫星指令</el-button>
      <div>
        <el-select v-model="searchObj.commandName" filterable clearable placeholder="请选择卫星类型">
          <el-option
            v-for="item in scTeleCommandType"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-input v-model="searchObj.scName" placeholder="请输入卫星名称" style="width:180px;"></el-input>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
    <el-scrollbar wrapClass="scrollbar-wrap" :style="{height:scrollHeight}"  ref="scrollbarContainer">
      <el-table :data="tableDataCopy" border @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column align="center" prop="scId" label="卫星ID" width="65"></el-table-column>
        <el-table-column align="center" prop="commandId" label="指令ID" width="65"></el-table-column>
        <el-table-column align="center" prop="scName" label="卫星名称" width="100"></el-table-column>
        <el-table-column align="center" prop="commandCode" label="指令编号" width="100"></el-table-column>
        <el-table-column align="center" prop="commandName" label="指令名称" width="150"></el-table-column>
        <el-table-column align="center" prop="commandDescription" label="指令发送" width="150"></el-table-column>
        <el-table-column align="center" prop="commandData" label="指令数据" width="150"></el-table-column>
        <el-table-column align="center" prop="updateTime" label="修改时间">
          <template slot-scope="scope">{{scope.row.updateTime | time}}</template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | time}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="openModel(scope)">修改</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    </el-scrollbar>
    <!-- 分页 -->
    <div class="footer">
      <pagination
        :pageTotal="paginations.pageTotal"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
    <!-- 弹出框 -->
    <Dialog
      ref="ruleForm"
      :title="title"
      :visible.sync="createModel"
      :satelliteType="satelliteType"
      :form="form"
      @submitDom="submitDom"
    />
  </div>
</template>

<script>
import ScTeleCommands from "../../../api/modules/scTelecommand";
// 公共的搜索栏组件
import SearchBar from "../../../components/SearchBar/index.vue";
import scInfo from "../../../api/modules/scInfo";
import Dialog from "./components/Dialog";
import filterFun from "../../../utils/filter";


//分页
import pagination from "../../../components/pagination";

export default {
  inject: ["layout"],
  components: {
    SearchBar,
    Dialog,
    pagination
  },
  data() {
    return {
      scrollHeight:'0px',
      title: "",
      createModel: false, // 弹框显示隐藏
      form: {},
      tableData: [],
      tableDataCopy: [],
      multipleSelection: [],
      scParams: [],
      paginations: {
        page: 1,
        limit: 13,
        pageTotal: 0
      },
      searchObj: {
        scName: "",
        commandName: ""
      },
      satelliteType: [],
      scTeleCommandType: [],
      inputs: [
        {
          model: "input",
          placeholder: "卫星指令名称"
        }
      ],
      selects: []
    };
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.scName === "" && newValue.commandName === "") {
            this.disabled = true;
            this.tableData = this.tableConst;
            // console.log(this.tableData);
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
    if (this.$route.params.obj && this.$route.params.obj.scId) {
      this.layout.showLoading();
      this.getListId(this.$route.params.obj.scId);
      console.log(this.$route.params.obj.scId);
      this.layout.hideLoading();
    } else {
      this.getList()
    }
    this.scrollHeight = window.innerHeight * 0.8 + 'px';
  },
  methods: {
    async getList() {
      this.layout.showLoading();
      const { data } = await ScTeleCommands.getScTeleCommandLists();
      this.tableData = data;
      this.tableConst = JSON.parse(JSON.stringify(this.tableData));
      this.getListAll();
      this.getsatelliteType();
      let res = data.map(item => {
        return {
          id: item.commandId,
          name: item.commandName
        };
      });
      this.scTeleCommandType = res;
      this.layout.hideLoading();
    },
    // 查询卫星id
    async getsatelliteType() {
      const { data } = await scInfo.getScInfo();
      console.log(data);
      let res = data.map(item => {
        return {
          id: item.scId,
          name: item.scName
        };
      });
      this.satelliteType = res;
      console.log(res);
    },
    async addType(obj) {
      const { data } = await ScTeleCommands.postScTeleCommands(obj);
    },
    async deleteSingle(id) {
      const { data } = await ScTeleCommands.deleteScTeleCommandsId(id);
    },
    async puteScType(obj) {
      console.log(obj);
      const { data } = await ScTeleCommands.putScTeleCommandsId(obj);
    },
    async getListId(str) {
      const { data } = await ScTeleCommands.getScTeleCommandsId(str);
      this.tableData = data;
      this.getListAll();
      this.getsatelliteType();
    },
    openModel(e = false) {
      if (!e) {
        this.title = "添加指令";
        this.form = {
          scId:"",
          commandId: "",
          commandCode: "",
          commandName: "",
          commandDescription: "",
          commandData: "",
          scName: ""
        };
        this.editIndex = -1;
        this.$nextTick(() => {
          this.clearVali("ruleForm");
        });
      } else {
        this.title = "修改指令";
        this.form = {
          commandId: e.row.commandId,
          scId: e.row.scId,
          commandCode: e.row.commandCode,
          commandName: e.row.commandName,
          commandDescription: e.row.commandDescription,
          commandData: e.row.commandData,
          scName: e.row.scName
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
            const id = this.tableData[this.editIndex].commandId;
            console.log(id, this.form);
            await this.puteScType(this.form);
            this.getList();
            this.$message({
              message: "修改成功",
              type: "success"
            });
            return (this.createModel = false);
          }
          await this.addType(this.form);
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
      this.$confirm(`是否要删除${item.commandName}卫星指令?`, "提示", {
        confirmButtonText: "删除11",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async() => {
        await this.deleteSingle(item.commandId);
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
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getListAll() {
      console.log(this.tableData);
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
  .el-scrollbar{
    height: 100%;
    .scrollbar-wrap{
      overflow-x: hidden;
      width: calc(100% + 17px);
    }
    .el-scrollbar__bar{

    }
  }
  .type {
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
  height: 45px;
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

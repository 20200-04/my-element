<template>
  <div class="type-container">
    <div class="fun-head">
      <el-button size="mini" type="success" @click="openModel(false)">添加卫星轨道类型</el-button>
      <div>
        <el-input v-model="searchObj.funcName" placeholder="请输入卫星轨道名称" style="width:180px;"></el-input>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableDataCopy"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column align="center" prop="funcId" label="ID" width="180"></el-table-column>
      <el-table-column align="center" prop="funcName" label="方法" width="180"></el-table-column>
      <el-table-column align="center" prop="funcDescription" label="方法的描述" width="180"></el-table-column>
      <el-table-column align="center" prop="paraDescription" label="参数的描述" width="180"></el-table-column>
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
      :form="form"
      @submitDom="submitDom"
    />
  </div>
</template>

<script>
import scParaFunc from "../../../api/modules/scParaFunc";
// 公共的搜索栏组件
import SearchBar from "../../../components/SearchBar/index.vue";
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
      title: "",
      createModel: false, // 弹框显示隐藏
      form: {},
      tableData: [],
      tableDataCopy: [],
      tableConst: [],
      multipleSelection: [],
      searchObj: {
        funcName: ""
      },
      paginations: {
        page: 1,
        limit: 16,
        pageTotal: 0
      }
    };
  },
  mounted() {
    this.layout.showLoading();
    this.getList();
    this.layout.hideLoading();
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.funcName === "") {
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
  methods: {
    async getList() {
      this.layout.showLoading();
      const { data } = await scParaFunc.getScParaFunc();
      this.tableData = data;
      this.tableConst = JSON.parse(JSON.stringify(this.tableData));
      this.getListAll();
      this.layout.hideLoading();
    },
    async addType(obj) {
      const { data } = await scParaFunc.postScParaFunc(obj);
    },
    async deleteSingle(id) {
      const { data } = await scParaFunc.deleteScParaFuncId(id);
    },
    async puteScType(obj) {
      console.log(obj);
      const { data } = await scParaFunc.putScParaFuncId(obj);
    },
    async getListId(str) {
      this.layout.showLoading();
      const { data } = await scParaFunc.getScParaFuncId(str);
      if (!data) {
        this.tableData = [];
      } else {
        const arrData = [];
        arrData.push(data);
        this.tableData = arrData;
      }
      this.layout.hideLoading();
    },
    openModel(e = false) {
      if (!e) {
        this.title = "添加方法配置";
        this.form = {
          funcId: "",
          funcName: "",
          funcDescription: "",
          paraDescription: ""
        };
        this.editIndex = -1;
        this.$nextTick(() => {
          this.clearVali("ruleForm");
        });
      } else {
        this.title = "修改方法配置";
        this.form = {
          funcId: e.row.funcId,
          funcName: e.row.funcName,
          funcDescription: e.row.funcDescription,
          paraDescription: e.row.paraDescription
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
            const id = this.tableData[this.editIndex].funcId;
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
      this.$confirm(`是否要删除${item.funcName}卫星轨道类型?`, "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.deleteSingle(item.funcId);
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
      this.paginations.pageTotal = this.tableData.length;
      console.log(this.paginations);
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
  height: 60px;
  display: flex;
  align-items: center;
  background: #fff;
  position: fixed;
  left: 0;
  padding-left:200px;
  bottom: 0;
  right: 0;
  z-index: 100;
  border-top: 1px solid #ccc;
}
</style>

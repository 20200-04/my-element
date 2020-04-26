<template>
  <div class="type-container">
    <div class="fun-head">
      <el-button size="mini" type="success" @click="openModel(false)">添加卫星指令</el-button>
      <div>
        <el-select v-model="searchObj.subsytemName" filterable clearable placeholder="请选择卫星类型">
          <el-option
            v-for="item in transmitObj.scSubSytemType"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-input v-model="searchObj.scName" placeholder="请输入卫星名称" style="width:180px;"></el-input>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
      <el-table :data="tableDataCopy" border @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column type="selection" width="45" align="center"></el-table-column>
        <el-table-column align="center" prop="scid" label="卫星ID" width="65"></el-table-column>
        <el-table-column align="center" prop="scName" label="卫星名称" width="100"></el-table-column>
        <el-table-column align="center" prop="subsytemId" label="分系统ID" width="65"></el-table-column>
        <el-table-column align="center" prop="subsytemTypeId" label="分系统类型ID" width="100"></el-table-column>
        <el-table-column align="center" prop="subsytemName" label="分系统名称" width="150"></el-table-column>
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
      :transmitObj="transmitObj"
      :form="form"
      @submitDom="submitDom"
    />
  </div>
</template>

<script>
import scSubSytem from "../../../api/modules/scSubsytem";
// 公共的搜索栏组件
import SearchBar from "../../../components/SearchBar/index.vue";
import scSubsytemType from "../../../api/modules/scSubsytemType";
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
      title: "",
      createModel: false, // 弹框显示隐藏
      form: {},
      // 数据整体存储
      tableData: [],
      tableDataCopy: [],
      multipleSelection: [],
      searchObj: {
        scName: "",
        typeName: ""
      },
      transmitObj: {
        satelliteType: [],
        scSubSytemType: []
      },
      //分页
      paginations: {
        page: 1,
        limit: 13,
        pageTotal: 0
      }
    };
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.scName === "" && newValue.subsytemName === "") {
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
      const { data } = await scSubSytem.getScSubSytem();
      this.tableData = data;
      this.getsatelliteType();
      this.getscSubsystemType()
      this.tableConst = JSON.parse(JSON.stringify(this.tableData));
      this.getListAll();
      this.layout.hideLoading();
    },
    // 查询卫星id
    async getsatelliteType() {
      const { data } = await scInfo.getScInfo();
      let res = data.map(item => {
        return {
          id: item.scId,
          name: item.scName
        };
      });
      this.transmitObj.satelliteType = res;
      console.log(res);
    },
    // 查询卫星分系统设置id
    async getscSubsystemType() {
      const { data } = await scSubsytemType.getScSubsystemType();
      let res = data.map(item => {
        return {
          id: item.subsytemTypeId,
          name: item.subsytemName
        };
      });
      this.transmitObj.scSubSytemType = res;
      console.log(res);
    },
    async addType(obj) {
      const { data } = await scSubSytem.postScSubSytem(obj);
    },
    async deleteSingle(id) {
      const { data } = await scSubSytem.deleteScSubSytemId(id);
    },
    async puteScType(obj) {
      console.log(obj);
      const { data } = await scSubSytem.putScSubSytemId(obj);
    },
    async getListId(str) {
      this.layout.showLoading();
      console.log(str);
      const { data } = await scSubSytem.getScSubSytemId(str);
      console.log(data);
      this.layout.hideLoading();
    },
    openModel(e = false) {
      if (!e) {
        this.title = "添加分系统配置";
        this.form = {
          scid:"",
          subsytemId: "",
          subsytemTypeId: "",
          subsytemName: "",
          scName: ""
        };
        this.editIndex = -1;
        this.$nextTick(() => {
          this.clearVali("ruleForm");
        });
      } else {
        this.title = "修改分系统配置";
        this.form = {
          subsytemId: e.row.subsytemId,
          scid: e.row.scid,
          subsytemTypeId: e.row.subsytemTypeId,
          subsytemName: e.row.subsytemName,
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
            const id = this.tableData[this.editIndex].subsytemId;
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
      this.$confirm(`是否要删除${item.subsytemName}卫星分系统配置?`, "提示", {
        confirmButtonText: "删除11",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async() => {
        await this.deleteSingle(item.subsytemId);
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

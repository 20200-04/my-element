<template>
  <div class="type-container">
    <div class="fun-head">
      <el-button size="mini" type="success" @click="openModel(false)">添加应用识别过程</el-button>
      <div>
        <el-button type="info" plain @click="dataAll" v-if="disabledScName">全部识别过程</el-button>
        <el-input v-model="searchObj.apName" placeholder="请输入应用识别过程名称" style="width:190px;"></el-input>
        <el-select
          v-model="searchObj.scName"
          filterable
          clearable
          :disabled="disabledScName"
          placeholder="请选择卫星类型"
        >
          <el-option
            v-for="item in satellite_scname"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-button type="primary" :disabled="disabled" @click="searchData">搜索</el-button>
      </div>
    </div>
    <el-table :data="tableDataCopy" border style="width:100%">
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column align="center" prop="apId" label="应用过程识别ID"></el-table-column>
      <el-table-column align="center" prop="scId" label="卫星ID"></el-table-column>
      <el-table-column align="center" prop="apName" label="应用过程识别名称"></el-table-column>
      <el-table-column align="center" prop="scName" label="卫星名称"></el-table-column>
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
    <!-- 弹出框 -->
    <Dialog
      ref="ruleForm"
      :title="title"
      :type="type"
      :visible.sync="createModel"
      :form="form"
      :satellite_scname="satellite_scname"
      :satellite_apname="satellite_apname"
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
import filterFun from "../../../utils/filter.js";
import scApInfo from "../../../api/modules/scApInfo";
// 公共搜索栏组件
import SearchBar from "../../../components/SearchBar/index.vue";
import scInfo from "../../../api/modules/scInfo";
import Dialog from "./components/Dialog";
import { log } from "util";
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
      disabledScName: false,
      satellite_scname: [],
      satellite_apname: [],
      paginations: {
        page: 1,
        limit: 16,
        pageTotal: 0
      },
      title: "",
      type: "",
      createModel: false, // 弹框显示隐藏
      form: {},
      searchObj: {
        apName: "",
        scName: ""
      },
      transmitObj: {
        satelliteType: []
      },
      tableData: [],
      tableDataCopy: [],
      tableConst: [],
      inputs: [
        {
          model: "input",
          placeholder: "卫星id"
        }
      ],
      selects: []
    };
  },
  watch: {
    searchObj: {
      handler(newValue, oldValue) {
        if (newValue) {
          if (newValue.scName === "" && newValue.apName === "") {
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
    const obj = this.$route.params.obj;
    if (obj && obj.scId) {
      this.getListId(obj.scId);
      this.getSatelliteType();
      this.searchObj.scName = obj.scName;
      this.disabledScName = true;
    } else {
      this.getList();
    }
  },
  methods: {
    init() {
      this.tableConst = JSON.parse(JSON.stringify(this.tableData));
      this.searchObj.apName = "";
      this.searchObj.scName = "";
      this.getListAll();
    },
    async getList() {
      this.layout.showLoading();
      const { data } = await scApInfo.getscApInfo();
      this.getSatelliteType();
      this.getSatelliteName();
      this.tableData = data;
      this.init();
      this.disabledScName = false;
      this.searchObj.scName = "";
      this.layout.hideLoading();
    },
    //查询卫星名称
    async getSatelliteType() {
      const { data } = await scInfo.getScInfo();
      let res = data.map(item => {
        return {
          id: item.scId,
          name: item.scName
        };
      });
      this.satellite_scname = res;
    },
    //查询应用过程识别名称
    async getSatelliteName() {
      const { data } = await scApInfo.getscApInfo();
      let res = data.map(item => {
        return {
          id: item.apId,
          name: item.apName
        };
      });
      this.transmitObj.satelliteType = res;
    },
    async addType(obj) {
      const { data } = await scApInfo.postscApInfo(obj);
    },
    async deleteSingle(obj) {
      const { data } = await scApInfo.deletescApInfoId(obj);
    },
    async putscApInfoId(obj) {
      console.log(obj);
      const { data } = await scApInfo.putscApInfoId(obj);
    },
    async getListId(str) {
      this.layout.showLoading();
      const { data } = await scApInfo.getscApInfoId(str);
      this.tableData = data;
      this.init();
      this.layout.hideLoading();
    },
    //恢复数据
    dataAll() {
      this.getList();
      this.$message({
        message: "全部识别过程已开启",
        type: "success"
      });
    },
    openModel(e = false) {
      if (!e) {
        this.title = "添加应用识别过程";
        this.type = "add";
        this.form = {
          apId: "",
          scId: "",
          apName: ""
        };
        this.editIndex = -1;
        console.log(this.form);
        this.$nextTick(() => {
          this.clearVali("ruleForm");
        });
      } else {
        this.title = "修改应用识别过程";
        this.type = "edit";
        this.form = {
          apId: e.row.apId,
          scId: e.row.scId,
          apName: e.row.apName,
          scName: e.row.scName,
          createTime: e.row.createTime,
          updateTime: e.row.updateTime
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
            const id = this.tableData[this.editIndex].apId;
            console.log(id, this.form);
            await this.putscApInfoId(this.form);
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
      this.$confirm(`是否要删除${item.apName}应用识别过程?`, "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.deleteSingle(item);
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

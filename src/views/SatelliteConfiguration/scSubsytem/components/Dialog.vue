<template>
  <!-- 新增/修改模态框 -->
  <div class="dialog">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="modalClose"
      width="30%"
      top="5vh"
    >
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="200px"
        class="form-class"
      >
        <el-form-item label="卫星名称" prop="scId">
          <el-select v-model="form.scid" size="mini" style="width: 53%;" placeholder="请选择卫星名称">
            <el-option
              v-for="(item,index) in transmitObj.satelliteType"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分系统配置名称" prop="subsytemTypeId">
          <el-select
            v-model="form.subsytemTypeId"
            size="mini"
            style="width: 53%;"
            placeholder="请选择分系统配置"
          >
            <el-option
              v-for="(item,index) in transmitObj.scSubSytemType"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="modalClose">取 消</el-button>
        <el-button type="primary" @click="submitD('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean
    },
    form: {
      type: Object
    },
    transmitObj: {
      type: Object
    }
  },
  mounted() {
    console.log(this.visible);
  },
  data() {
    return {
      rules: {
        scid: [{ required: true, message: "请选择卫星", trigger: "change" }],
        subsytemTypeId: [
          { required: true, message: "分系统配置名称", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    modalClose() {
      this.$emit("update:visible", false); // 直接修改父组件的属性
    },
    submitD(formName) {
      this.$emit("submitDom", formName);
    }
  }
};
</script>

<style>
</style>

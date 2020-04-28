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
          <el-select
            v-model="form.scId"
            size="mini"
            placeholder="请输入卫星名称"
            :disabled="type === 'edit'"
          >
            <el-option
              v-for="(item,index) in satellite_scname"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用识别过程名称" prop="apName">
          <el-input size="mini" v-model="form.apName" placeholder="请输入应用识别过程名称" style="width:43%"></el-input>
        </el-form-item>
        <el-form-item label="应用识别过程id" prop="apId">
          <el-input
            size="mini"
            v-model="form.apId"
            placeholder="请输入应用识别过程名称"
            :disabled="type === 'edit'"
            style="width:43%"
          ></el-input>
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
    type: {
      type: String
    },
    visible: {
      type: Boolean
    },
    form: {
      type: Object
    },
    satellite_scname: {
      type: Array
    }
  },
  mounted() {
    console.log(this.form);
    console.log(this.satellite_scname);

    console.log(this.visible);
  },
  data() {
    return {
      rules: {
        scId: [
          { required: true, message: "请选择卫星名称", trigger: "change" }
        ],
        apName: [
          {
            required: true,
            message: "请选择应用识别过程名称",
            trigger: "change"
          }
        ],
        apId: [
          { required: true, message: "请填写应用识别过程id", trigger: "change" }
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
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
        <el-form-item label="分系统名称" prop="subsytemName">
          <el-input v-model="form.subsytemName" placeholder="分系统名称" size="mini" style="width: 45%;"></el-input>
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
    }
  },
  mounted() {
    console.log(this.form);

    console.log(this.visible);
  },
  data() {
    return {
      rules: {
        subsytemName: [
          { required: true, message: "请选择分系统名称", trigger: "change" }
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
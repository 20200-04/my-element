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
        <el-form-item label="方法" prop="funcName">
          <el-input v-model="form.funcName" placeholder="方法" size="mini" style="width: 45%;"></el-input>
        </el-form-item>
        <el-form-item label="方法描述" prop="funcDescription">
          <el-input
            v-model="form.funcDescription"
            placeholder="方法描述"
            size="mini"
            style="width: 45%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="参数描述" prop="paraDescription">
          <el-input
            v-model="form.paraDescription"
            placeholder="参数描述"
            size="mini"
            style="width: 45%;"
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
    visible: {
      type: Boolean
    },
    form: {
      type: Object
    }
  },
  mounted() {
    console.log(1111);

    console.log(this.visible);
  },
  data() {
    return {
      rules: {
        funcName: [
          { required: true, message: "请选择方法", trigger: "change" }
        ],
        funcDescription: [
          { required: true, message: "请选择方法描述", trigger: "change" }
        ],
        paraDescription: [
          { required: true, message: "请选择参数描述", trigger: "change" }
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

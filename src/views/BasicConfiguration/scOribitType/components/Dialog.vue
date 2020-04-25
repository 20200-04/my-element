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
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100" class="form-class">
        <el-form-item label="卫星轨道类型" prop="orbitType">
          <el-input v-model="form.orbitType" placeholder="卫星轨道类型" size="mini" style="width: 35%;"></el-input>
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
        orbitType: [
          { required: true, message: "请选择卫星类型", trigger: "change" }
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

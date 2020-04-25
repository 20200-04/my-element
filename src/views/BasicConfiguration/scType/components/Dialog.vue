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
        <el-form-item label="卫星类型" prop="typeName">
          <el-input v-model="form.typeName" placeholder="卫星类型" size="mini" style="width: 35%;"></el-input>
        </el-form-item>
        <el-form-item label="卫星供应商" prop="producer">
          <el-input v-model="form.producer" placeholder="卫星供应商" size="mini" style="width: 35%;"></el-input>
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
        typeName: [
          { required: true, message: "请选择卫星类型", trigger: "change" }
        ],
        producer: [
          { required: true, message: "请选择卫星供应商", trigger: "change" }
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
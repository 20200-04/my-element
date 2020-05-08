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
        <el-form-item label="卫星ID" prop="scId">
          <el-select v-model="form.scId" size="mini" placeholder="请选择卫星名称" style="width: 72%;">
            <el-option
              v-for="(item,index) in satelliteType"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指令编号" prop="commandCode">
          <el-input v-model="form.commandCode" placeholder="指令编号" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="指令名称" prop="commandName">
          <el-input v-model="form.commandName" placeholder="指令名称" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="指令发送" prop="commandDescription">
          <el-input
            v-model="form.commandDescription"
            placeholder="指令发送"
            size="mini"
            style="width: 72%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="指令数据" prop="commandData">
          <el-input v-model="form.commandData" placeholder="指令数据" size="mini" style="width: 72%;"></el-input>
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
    satelliteType: {
      type: Array
    }
  },
  mounted() {
    console.log(1111);
    console.log(this.visible);
  },
  data() {
    return {
      rules: {
        scId: [{ required: true, message: "请选择卫星", trigger: "change" }],
        commandCode: [
          { required: true, message: "请选择指令编号", trigger: "change" }
        ],
        commandName: [
          { required: true, message: "请选择指令名称", trigger: "change" }
        ],
        commandDescription: [
          { required: true, message: "请选择指令发送", trigger: "change" }
        ],
        commandData: [
          { required: true, message: "请选择指令数据", trigger: "change" }
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

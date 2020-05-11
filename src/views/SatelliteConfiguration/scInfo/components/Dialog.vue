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
      <!-- 表单内容 -->
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="200px"
        class="form-class"
      >
        <el-form-item label="卫星类型" prop="scType">
          <el-select v-model="form.scType" size="mini" placeholder="请选择卫星类型">
            <el-option
              v-for="(item,index) in transmitObj.satelliteType"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轨道类型" prop="orbitId">
          <el-select v-model="form.orbitId" size="mini" placeholder="请选择轨道类型">
            <el-option
              v-for="(item,index) in transmitObj.pathwayType"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卫星名称" prop="scName">
          <el-input v-model="form.scName" placeholder="卫星名称" size="mini" style="width: 53%;"></el-input>
        </el-form-item>
        <el-form-item label="卫星代号" prop="scCode">
          <el-input v-model="form.scCode" placeholder="卫星代号" size="mini" style="width: 53%;"></el-input>
        </el-form-item>
        <el-form-item label="轨道倾角" prop="orbitInclination">
          <el-input
            v-model="form.orbitInclination"
            placeholder="轨道倾角"
            size="mini"
            style="width: 53%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="卫星高度" prop="orbitAltitude">
          <el-input v-model="form.orbitAltitude" placeholder="卫星高度" size="mini" style="width: 53%;"></el-input>
        </el-form-item>
        <el-form-item label="发射时间" prop="launchTime">
          <div class="block">
            <el-date-picker
              v-model="form.launchTime"
              size="mini"
              type="datetime"
              placeholder="选择日期时间"
              style="width: 53%;"
            ></el-date-picker>
          </div>
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
  data() {
    return {
      rules: {
        scType: [
          { required: true, message: "请选择卫星类型", trigger: "change" }
        ],
        orbitId: [
          { required: true, message: "请选择轨道类型", trigger: "change" }
        ],
        scName: [
          { required: true, message: "请选择卫星名称", trigger: "change" }
        ],
        scCode: [
          { required: true, message: "请选择卫星代码", trigger: "change" }
        ],
        orbitInclination: [
          { required: true, message: "请选择轨道倾角", trigger: "change" }
        ],
        orbitAltitude: [
          { required: true, message: "请选择卫星高度", trigger: "change" }
        ],
        launchTime: [
          {
            required: true,
            message: "请选择发射时间",
            trigger: "change"
          }
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
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
        label-position="right"
        label-width="200px"
        :model="form"
        :rules="rules"
        class="form-class"
      >
        <el-form-item label="卫星名称" prop="scId">
          <el-select
            v-model="form.scId"
            size="mini"
            placeholder="请选择卫星名称"
            @visible-change="isTrue"
            @change="currentScId"
            style="width: 72%;"
          >
            <el-option
              v-for="(item,index) in transmitObj.satelliteName"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卫星分系统类型" prop="subsystemId">
          <el-select v-model="form.subsystemId" size="mini" placeholder="请选择卫星分系统类型" style="width: 72%;">
            <el-option
              v-for="(item,index) in transmitObj.satelliteSubsystemType"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应用识别过程" prop="apId">
          <el-select v-model="form.apId" size="mini" placeholder="请选择应用识别过程" style="width: 72%;">
            <el-option
              v-for="(item,index) in transmitObj.satelliteScApInfo"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方法名称" prop="funcId">
          <el-select v-model="form.funcId" size="mini" placeholder="请选择指方法称" style="width: 72%;">
            <el-option
              v-for="(item,index) in transmitObj.satelliteInstruct"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卫星遥测参数名称" prop="paraName">
          <el-input v-model="form.paraName" placeholder="卫星遥测参数名称" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="处理方法参数" prop="funcPara">
          <el-input v-model="form.funcPara" placeholder="处理方法参数" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="参数长度" prop="length">
          <el-input v-model="form.length" placeholder="参数长度" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="参数起始位置" prop="startPos">
          <el-input v-model="form.startPos" placeholder="参数长度" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <!-- 一级阈值上限   一级阈值下限 二级阈值上限 二级阈值下限 三级阈值上限 三级阈值下限 -->
        <el-form-item label="一级阈值上限" prop="thresholdU1">
          <el-input v-model="form.thresholdU1" placeholder="一级阈值上限" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="一级阈值下限" prop="thresholdL1">
          <el-input v-model="form.thresholdL1" placeholder="一级阈值下限" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="二级阈值上限" prop="thresholdU2">
          <el-input v-model="form.thresholdU2" placeholder="二级阈值上限" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="二级阈值下限" prop="thresholdL2">
          <el-input v-model="form.thresholdL2" placeholder="二级阈值下限" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="三级阈值上限" prop="thresholdU3">
          <el-input v-model="form.thresholdU3" placeholder="三级阈值上限" size="mini" style="width: 72%;"></el-input>
        </el-form-item>
        <el-form-item label="三级阈值下限" prop="thresholdL3">
          <el-input v-model="form.thresholdL3" placeholder="三级阈值下限" size="mini" style="width: 72%;"></el-input>
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
      // default: false
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
        scId: [
          { required: true, message: "请选择卫星名称", trigger: "change" }
        ],
        subsystemId: [
          { required: true, message: "请选择卫星分系统类型", trigger: "change" }
        ],
        apId: [
          {
            required: true,
            message: "请选择遥测应用过程信息",
            trigger: "change"
          }
        ],
        funcId: [
          {
            required: true,
            message: "请选择卫星指令信息",
            trigger: "change"
          }
        ],
        paraName: [
          {
            required: true,
            message: "请选择卫星遥测参数名称",
            trigger: "change"
          }
        ],
        funcPara: [
          {
            required: true,
            message: "处理方法参数",
            trigger: "change"
          }
        ],
        length: [
          {
            required: true,
            message: "参数长度",
            trigger: "change"
          }
        ],
        startPos: [
          {
            required: true,
            message: "参数起始位置",
            trigger: "change"
          }
        ],

        thresholdU1: [
          { required: true, message: "一级阈值上限", trigger: "change" }
        ],
        thresholdL1: [
          { required: true, message: "一级阈值下限", trigger: "change" }
        ],
        thresholdU2: [
          { required: true, message: "二级阈值上限", trigger: "change" }
        ],
        thresholdL2: [
          { required: true, message: "二级阈值下限", trigger: "change" }
        ],
        thresholdU3: [
          { required: true, message: "三级阈值上限", trigger: "change" }
        ],
        thresholdL3: [
          { required: true, message: "三级阈值下限", trigger: "change" }
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
    },
    //卫星名称
    currentScId(val) {
      this.$emit("currentScNameId", val);
    },
    // 卫星名称重新选择后 清除分系统和应用过程
    isTrue(val) {
      if (!val) {
        this.form.subsystemId = "";
        this.form.apId = "";
        this.form.funcId = "";
      }
    }
  }
};
</script>

<style>
</style>

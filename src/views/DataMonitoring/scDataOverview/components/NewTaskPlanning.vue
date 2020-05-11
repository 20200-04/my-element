
<template>
  <div class="plan">
    <div class="head">
      <span class="leftBg"></span>
      <span>载荷工作计划</span>
    </div>
    <div class="content">
      <li v-for="(item,index) in newTaskPlanning" :key="index">
        <span>{{item.commandName}}</span>
        <span>{{item.survey}}</span>
        <span>{{item.createTime}}</span>
      </li>
    </div>
  </div>
</template>

<script>
// 最新任务计划
export default {
  props: {
    newTaskPlanning: {
      type: Array
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style>
.plan {
  width: 100%;
}
.plan .head {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background: #dcdfe6;
  display: flex;
  border: 1px solid #ebeef5;
}
.plan .head .leftBg {
  display: block;
  width: 4px;
  height: 100%;
  background: #606266;
  margin-right: 15px;
}
.plan .content li {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #ebeef5;
  border-top: none;
  font-size: 13px;
}
.plan .content li span {
  padding: 0 25px;
}
</style>

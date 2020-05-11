
<template>
  <div class="basicInfo">
    <div class="head">
      <span class="leftBg"></span>
      <span>基础信息</span>
    </div>
    <div class="content">
      <li>
        <span>卫星id：</span>
        <span>{{basicInfo.scId}}</span>
      </li>
      <li>
        <span>卫星名称：</span>
        <span>{{basicInfo.scName}}</span>
      </li>
      <li>
        <span>卫星代号：</span>
        <span>{{basicInfo.scCode}}</span>
      </li>
      <li>
        <span>卫星类型：</span>
        <span>{{basicInfo.scType}}</span>
      </li>
      <li>
        <span>轨道倾角：</span>
        <span>{{basicInfo.orbitInclination}}</span>
      </li>
      <li>
        <span>轨道类型：</span>
        <span>{{basicInfo.orbitType}}</span>
      </li>
      <li>
        <span>卫星高度：</span>
        <span>{{basicInfo.orbitAltitude}}</span>
      </li>
      <li>
        <span>发射时间：</span>
        <span>{{basicInfo.launchTime}}</span>
      </li>
    </div>
  </div>
</template>

<script>
// 基础信息
export default {
  props: {
    basicInfo: {
      type: Object
    }
  },
  mounted() {}
};
</script>

<style  scoped>
.basicInfo {
  width: 100%;
}
.basicInfo .head {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background: #dcdfe6;
  display: flex;
  border: 1px solid #ebeef5;
}
.basicInfo .head .leftBg {
  display: block;
  width: 4px;
  height: 100%;
  background: #606266;
  margin-right: 15px;
}
.basicInfo .content li {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #ebeef5;
  border-top: none;
  font-size: 13px;
}
.basicInfo .content li span:nth-child(1) {
  color: #999999;
  margin-left: 20px;
}
.basicInfo .content li span:nth-child(2) {
  color: #333;
}
</style>
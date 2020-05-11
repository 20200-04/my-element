
<template>
  <div class="monitor">
    <div class="head">
      <div class="left">
        <span class="leftBg"></span>
        <span>遥控监视</span>
      </div>
      <div class="details">
        <!-- <a title="遥控监视">
          <svg-icon iconClass="details" />
        </a>-->
      </div>
    </div>
    <div class="content">
      <li v-for="(item,index) in newTelecommand" :key="index">
        <span>{{item.Time}}</span>
        <span>{{item.Send}}</span>
        <span>{{item.Content}}</span>
      </li>
    </div>
  </div>
</template>

<script>
// 最新遥控指令
export default {
  props: {
    newTelecommand: {
      type: Array
    }
  }
};
</script>

<style  scoped>
.monitor {
  width: 100%;
}

.monitor .head .left {
  display: flex;
}
.details {
  margin-right: 20px;
  cursor: pointer;
}
.monitor .head {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background: #dcdfe6;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ebeef5;
}
.monitor .head .leftBg {
  display: block;
  width: 4px;
  height: 100%;
  background: #606266;
  margin-right: 15px;
}
.monitor .content li {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #ebeef5;
  border-top: none;
  font-size: 13px;
}
.monitor .content li span {
  padding: 35px;
}
</style>
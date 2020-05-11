
<template>
  <div class="call">
    <div class="head">
      <div class="left">
        <span class="leftBg"></span>
        <span>最新报警</span>
      </div>
      <div class="details">
        <a title="最新报警" @click="goItem">
          <svg-icon iconClass="details" />
        </a>
      </div>
    </div>
    <div class="content">
      <li v-for="(item,index) in newPolice" :key="index">
        <span>{{item.apId}}</span>
        <span>{{item.scTime}}</span>
        <span>{{item.bjName}}</span>
      </li>
    </div>
  </div>
</template>

<script>
// 最新报警
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goItem() {
      this.$router.push({
        name: "scTelemeteringAlarm",
        params: {
          obj: "参数"
        }
      });
    }
  },
  props: {
    newPolice: {
      type: Array
    }
  },
  components: {}
};
</script>

<style  scoped>
.call {
  width: 100%;
}
.call .head {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background: #dcdfe6;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ebeef5;
}
.call .head .left {
  display: flex;
}
.details {
  margin-right: 20px;
  cursor: pointer;
}
.call .head .leftBg {
  display: block;
  width: 4px;
  height: 100%;
  background: #606266;
  margin-right: 15px;
}
.call .content li {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #ebeef5;
  border-top: none;
  font-size: 13px;
}
.call .content li span {
  padding: 35px;
}
</style>
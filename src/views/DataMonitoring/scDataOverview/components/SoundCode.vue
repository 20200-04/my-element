<template>
  <div class="paraCode">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="first" class="itemHeight">
        <span slot="label">
          <a :title="index === 0?'更多源码':'更多参数'">
            <svg-icon iconClass="details" class="iconItem" @click="goItem" />
          </a>
          源码
        </span>
        <table border="0" style="border-collapse:collapse; border-color: #909399;">
          <!-- <thead>
            <tr style="border-color:#C0C4CC">
              <th>时间</th>
              <th>源码</th>
            </tr>
          </thead>-->
          <tbody style="font-size: 12px;background:#F2F6FC;">
            <tr v-for="(item,index) in paraOriginal" :key="index">
              <!-- <td style="width: 80px;">{{item.devTime}}</td> -->
              <td style="text-align: center;">
                <span
                  v-for="(item1,index1) in item.originalData"
                  :key="index1"
                  style="display: inline-block; width: 180px;padding:0px;"
                >
                  <span
                    v-for="(item,index2) in item1"
                    :key="index2"
                    style="display: inline-block; width: 14px;height: 14px;"
                  >{{item}}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="参数" name="second" class="content itemHeight">
        <li v-for="(item,index) in soundCode" :key="index">
          <span>{{item.paraName}}</span>
          <span>{{item.original}}</span>
          <span>{{item.data}}</span>
          <span>{{item.state}}</span>
        </li>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { log } from "util";
// 卫星源码
export default {
  data() {
    return {
      activeName: "first",
      index: 0
    };
  },
  props: {
    soundCode: {
      type: Array
    },
    paraOriginal: {
      type: Array
    }
  },
  watch: {
    index(val) {
      console.log(val);
    }
  },
  mounted() {},
  created() {},
  methods: {
    handleClick(tab, event) {
      const { index } = tab;
      this.index = index;
    },
    goItem() {
      this.$router.push({
        name: this.index === 0 ? "scTelemeteringCode" : "scTelemeteringPara",
        params: {
          obj: "参数"
        }
      });
    }
  }
};
</script>

<style>
.iconItem {
  position: absolute;
  left: 1090px;
  top: 10px;
  z-index: 999999999 !important;
}
.paraCode {
  width: 100%;
}
.paraCode .itemHeight {
  height: 300px;
}
.paraCode .content li {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #ebeef5;
  border-top: none;
  font-size: 13px;
}
.paraCode .content li:nth-child(1) {
  border-top: 1px solid #ebeef5;
}
.paraCode .content li span {
  padding: 0 35px;
}

.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #171819;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #171819;
}
</style>

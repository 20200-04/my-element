<template>
  <div class="suSum">
    <el-row :gutter="30">
      <el-col :span="6" v-for="(item, index) in scData" :key="index">
        <div @click="goItem(item)">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <img :src="item.scImage" class="image" />
            <div class="wrap">
              <div class="left">
                <div class="chunk">
                  <span>名称：</span>
                  <el-link type="primary">{{item.scName}}</el-link>
                </div>
                <div class="chunk">
                  <span>代号：</span>
                  <el-link type="primary">{{item.scCode}}</el-link>
                </div>
                <div class="chunk">
                  <span>类型：</span>
                  <el-link type="primary">{{item.scType}}</el-link>
                </div>
              </div>
              <div class="right">
                <div>
                  <span>健康状态：</span>
                  <el-button
                    size="mini"
                    disabled
                    :type="item.scHealth?'primary':'danger'"
                  >{{item.scHealth?'健康':"异常"}}</el-button>
                </div>
                <div>
                  <span>告警数量：</span>
                  <el-link :type="item.alarmNum>0?'danger':'primary'">{{`${item.alarmNum}处`}}</el-link>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { log } from "util";
export default {
  data() {
    return {
      scData: [
        //  scId: "", // 卫星id
        // scName: "", // 卫星名称
        // scCode: "", // 卫星代号
        // scType: "", // 卫星类型
        // scImage: "", // 卫星图片
        // scHealth: "", // 健康状态
        // alarmNum: "" // 告警数量等
      ],
      currentDate: new Date()
    };
  },
  computed: {
    ...mapGetters(["scid"])
  },
  mounted() {
    this.init();
    console.log(this.scid);
  },
  methods: {
    init() {
      for (var i = 0; i < 6; i++) {
        this.scData.push({
          scId: i,
          scName: "卫星" + i,
          scCode: "卫星代号" + i,
          scType: "卫星类型" + i,
          scImage:
            "http://img3.imgtn.bdimg.com/it/u=3964335244,3236047029&fm=26&gp=0.jpg",
          scHealth: i % 2 ? 0 : 1,
          alarmNum: i
        });
      }
    },
    goItem(val) {
      this.$router.push({
        name: "scDataOverview",
        params: {
          obj: val
        }
      });
    }
  }
};
</script>

<style scoped>
.suSum {
  padding: 20px;
}
.card {
  margin-bottom: 15px;
  cursor: pointer;
}
.card .chunk {
  padding: 4px 0;
}
.card .chunk span:nth-child(1),
.right span {
  font-size: 14px;
  color: #999;
}
.image {
  width: 100%;
  height: 260px;
  display: block;
}
.card .wrap {
  padding: 14px;
  display: flex;
  justify-content: space-between;
}
</style>